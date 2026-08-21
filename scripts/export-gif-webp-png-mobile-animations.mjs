import { mkdir, rm, writeFile, readdir, readFile, stat, copyFile } from "node:fs/promises";
import { createServer } from "node:net";
import { dirname, join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const exportRoot = join(rootDir, "mobile-animation-export");
const manifestPath = join(exportRoot, "manifest.json");
const outputRoot = join(exportRoot, "gif-webp-export");
const frameRoot = join(outputRoot, "_frames");
const chromeBin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const outFps = 30;
const canvasSize = 900;
const viewport = { width: canvasSize, height: canvasSize, deviceScaleFactor: 1 };
const cropPadding = 14;
const keepFrames = process.env.KEEP_EXPORT_FRAMES === "1";

const policyArg = process.argv.find((arg) => arg.startsWith("--policy="));
const policy = policyArg ? policyArg.slice("--policy=".length) : "category";
const guardArg = process.argv.find((arg) => arg.startsWith("--guard="));
const guardRatio = guardArg ? Number(guardArg.slice("--guard=".length)) : 1.5;
const selectOnly = process.argv.includes("--select-only");
const deliveryRoot = join(exportRoot, "animation-media");
const scratchRoot = "/private/tmp/claude-502/-Users-alinaskalkina-Documents-UBA-animations-mobile-animation-export/19d30c7b-9f9d-4fa6-a4e1-d53f2c5f5a5d/scratchpad";

const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const onlySlugs = onlyArg ? new Set(onlyArg.slice("--only=".length).split(",")) : null;
const themesArg = process.argv.find((arg) => arg.startsWith("--themes="));
const themes = themesArg ? themesArg.slice("--themes=".length).split(",") : ["dark", "light"];
const force = process.argv.includes("--force");

// Verified static in the preview: its motion needs gesture state the export page
// never applies, so every frame is identical. Ships as a still instead of a
// 204-frame animation of nothing.
const stillOnlySlugs = new Set(["pull-to-refresh-line-fill"]);

// Position (fraction of timeline) to take the poster from, for animations where
// the automatic pick is misleading. The gradient blob spends its opening third as
// a flat black panel that scores as well as the real content, so it is pinned to
// the middle of the red sweep instead.
const posterPositionOverrides = new Map([
  ["uba-loader-gradient-blob-prototype", 0.45],
]);

// The 10-splash package was generated without its stylesheet: its markup uses
// .uba-splash-brand / -top-mask / -icon-stroke, but the shared/styles.css shipped
// beside it defines none of them, so the scene renders as a flat red screen. These
// stand-ins are the same markup pointed at the root styles.css, which does carry
// the six splash keyframe sets. Remove once the source export ships the CSS.
const previewOverrides = new Map([
  ["uba-splash-reveal", {
    dark: join(scratchRoot, "splash-fixed", "preview-dark.html"),
    light: join(scratchRoot, "splash-fixed", "preview-light.html"),
  }],
]);

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();

    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve: done, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) {
          reject(new Error(`${message.error.message}: ${message.error.data || ""}`));
        } else {
          done(message.result || {});
        }
        return;
      }
      const callbacks = this.listeners.get(message.method);
      if (callbacks) {
        callbacks.forEach((callback) => callback(message.params || {}));
      }
    });
  }

  async open() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolveOpen, rejectOpen) => {
      this.ws.addEventListener("open", resolveOpen, { once: true });
      this.ws.addEventListener("error", rejectOpen, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params });
    return new Promise((resolveSend, rejectSend) => {
      this.pending.set(id, { resolve: resolveSend, reject: rejectSend });
      this.ws.send(payload);
    });
  }

  once(method) {
    return new Promise((resolveEvent) => {
      const callback = (params) => {
        this.off(method, callback);
        resolveEvent(params);
      };
      this.on(method, callback);
    });
  }

  on(method, callback) {
    const callbacks = this.listeners.get(method) || new Set();
    callbacks.add(callback);
    this.listeners.set(method, callbacks);
  }

  off(method, callback) {
    const callbacks = this.listeners.get(method);
    if (!callbacks) return;
    callbacks.delete(callback);
  }

  close() {
    this.ws.close();
  }
}

// The export tree is regenerated by another script, and a newly added package can
// land on disk before the top-level manifest lists it. Any package folder with a
// metadata.json that the manifest does not mention is picked up from its own
// metadata, which carries the same fields.
async function discoverUnlistedItems(known) {
  const found = [];
  for (const groupDir of await readdir(exportRoot, { withFileTypes: true })) {
    if (!groupDir.isDirectory() || !/^\d\d-/.test(groupDir.name)) continue;
    for (const packDir of await readdir(join(exportRoot, groupDir.name), { withFileTypes: true })) {
      if (!packDir.isDirectory()) continue;
      const metaPath = join(exportRoot, groupDir.name, packDir.name, "metadata.json");
      try {
        const meta = JSON.parse(await readFile(metaPath, "utf8"));
        if (known.has(meta.canonicalAssetId)) continue;

        // Manifest entries store preview paths relative to the export root, but a
        // package's own metadata stores bare filenames relative to its folder.
        // Normalise to the manifest's shape so both sources build the same paths.
        const folderId = meta.folderId || join(groupDir.name, packDir.name);
        const previewHtmlByTheme = {};
        for (const [theme, path] of Object.entries(meta.previewHtmlByTheme || {})) {
          previewHtmlByTheme[theme] = path.includes("/") ? path : join(folderId, path);
        }

        found.push({
          groupFolder: groupDir.name,
          item: { ...meta, folder: folderId, previewHtmlByTheme },
        });
      } catch {
        // Not a package folder.
      }
    }
  }
  return found;
}

async function loadJobs() {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const listed = new Set();
  const entries = [];
  for (const group of manifest.groups) {
    for (const item of group.items) {
      listed.add(item.canonicalAssetId);
      entries.push({ groupFolder: group.folder, item });
    }
  }

  for (const extra of await discoverUnlistedItems(listed)) {
    console.log(`Found package not in manifest: ${extra.item.slug} (${extra.groupFolder})`);
    entries.push(extra);
  }

  const jobs = [];
  for (const { groupFolder, item } of entries) {
    if (onlySlugs && !onlySlugs.has(item.slug) && !onlySlugs.has(item.canonicalAssetId)) continue;
    jobs.push({
      slug: item.slug,
      canonicalAssetId: item.canonicalAssetId,
      title: item.title,
      groupFolder,
      folder: item.folder || item.folderId,
      sourceKind: item.sourceKind,
      // Photo-backed animations (a raster texture under the motion) band badly
      // in GIF's 256-color palette; pure vector/Lottie sources do not.
      hasRaster: (item.rasterAssets || []).length > 0,
      htmlByTheme: previewOverrides.get(item.canonicalAssetId) || {
        dark: join(exportRoot, item.previewHtmlByTheme.dark),
        light: join(exportRoot, item.previewHtmlByTheme.light),
      },
      durationMs: item.duration.demoMs,
      mode: item.playback.mode,
      selector: `.export-preview-shell[data-preview-motion-source="${item.canonicalAssetId}"]`,
    });
  }
  return jobs;
}

async function launchChrome() {
  const port = await getFreePort();
  const profileDir = join(outputRoot, `.chrome-profile-${port}`);
  await rm(profileDir, { recursive: true, force: true });
  await mkdir(profileDir, { recursive: true });

  const chrome = spawn(chromeBin, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--run-all-compositor-stages-before-draw",
    "about:blank",
  ], { stdio: ["ignore", "pipe", "pipe"] });

  await waitForChrome(port);
  return { chrome, port, profileDir };
}

async function shutdownChrome(session) {
  await stopChrome(session.chrome);
  await rm(session.profileDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
}

// Chrome is relaunched per render because a single long-lived headless instance
// accumulates memory across hundreds of full-page screenshots and gets killed
// mid-batch, taking the whole run down with it.
async function renderFramesWithFreshChrome({ job, theme, framesDir }) {
  const maxAttempts = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const session = await launchChrome();
    try {
      return await renderFrames({ port: session.port, job, theme, framesDir });
    } catch (error) {
      lastError = error;
      console.log(`  attempt ${attempt}/${maxAttempts} failed: ${error.message.split("\n")[0]}`);
      await rm(framesDir, { recursive: true, force: true });
      await mkdir(framesDir, { recursive: true });
    } finally {
      await shutdownChrome(session);
    }
  }

  throw lastError;
}

async function readExistingResults() {
  try {
    const existing = JSON.parse(await readFile(join(outputRoot, "manifest.json"), "utf8"));
    return Array.isArray(existing.results) ? existing.results : [];
  } catch {
    return [];
  }
}

// Builds the shipped folder: one animated file per animation+theme plus its
// poster PNG. Rebuilt from scratch each time so a policy change cannot leave a
// stale file of the losing format behind.
async function buildDelivery(results) {
  await rm(deliveryRoot, { recursive: true, force: true });
  const summary = [];

  // Results accumulate across resumed runs, so a re-rendered animation appears
  // more than once. Keep the last entry per slug+theme and drop entries written
  // before both formats were retained (no gifBytes/webpBytes to compare).
  const deduped = new Map();
  for (const entry of results) {
    if (typeof entry.gifBytes !== "number" || typeof entry.webpBytes !== "number") continue;
    deduped.set(`${entry.slug}::${entry.theme}`, entry);
  }

  for (const entry of deduped.values()) {
    const srcDir = join(outputRoot, entry.slug);
    const gifPath = join(srcDir, `${entry.slug}-${entry.theme}.gif`);
    const webpPath = join(srcDir, `${entry.slug}-${entry.theme}.webp`);
    const pngPath = join(srcDir, `${entry.slug}-${entry.theme}.png`);

    if (!(await exists(gifPath)) || !(await exists(webpPath)) || !(await exists(pngPath))) {
      console.log(`  SKIP delivery ${entry.slug} [${entry.theme}] (missing rendered files)`);
      continue;
    }

    const outDir = join(deliveryRoot, entry.slug);
    await mkdir(outDir, { recursive: true });
    await copyFile(pngPath, join(outDir, `${entry.slug}-${entry.theme}.png`));

    if (stillOnlySlugs.has(entry.slug)) {
      summary.push({
        ...entry,
        chosenAnimatedFormat: "none",
        chosenReason: "static in preview (gesture-driven); still image only",
        chosenBytes: 0,
      });
      continue;
    }

    const { chosen, reason } = selectFormat({
      hasRaster: entry.hasRaster,
      gifBytes: entry.gifBytes,
      webpBytes: entry.webpBytes,
      policy,
      guardRatio,
    });

    const animatedSrc = chosen === "gif" ? gifPath : webpPath;
    await copyFile(animatedSrc, join(outDir, `${entry.slug}-${entry.theme}.${chosen}`));

    summary.push({
      ...entry,
      chosenAnimatedFormat: chosen,
      chosenReason: reason,
      chosenBytes: chosen === "gif" ? entry.gifBytes : entry.webpBytes,
    });
  }

  await writeFile(
    join(deliveryRoot, "manifest.json"),
    `${JSON.stringify({
      generatedAt: new Date().toISOString(),
      fps: outFps,
      policy,
      guardRatio,
      animations: summary,
    }, null, 2)}\n`,
  );

  return summary;
}

async function main() {
  const jobs = await loadJobs();
  console.log(`Loaded ${jobs.length} animation job(s), ${themes.length} theme(s) each.`);
  console.log(`Format policy: ${policy}${policy === "category" ? ` (guard ratio ${guardRatio})` : ""}`);

  await mkdir(outputRoot, { recursive: true });

  if (selectOnly) {
    const existing = await readExistingResults();
    const summary = await buildDelivery(existing);
    console.log(`\nDelivery rebuilt: ${summary.length} file set(s) in ${deliveryRoot}`);
    reportSelection(summary);
    return;
  }

  // --force re-renders the selected jobs, but must not discard results for jobs
  // outside the selection, or the delivery folder loses everything not re-rendered.
  // Fresh entries are pushed after loaded ones and win during dedupe.
  const results = force && !onlySlugs ? [] : await readExistingResults();
  const failures = [];

  const writeManifest = async () => {
    await writeFile(
      join(outputRoot, "manifest.json"),
      `${JSON.stringify({ generatedAt: new Date().toISOString(), fps: outFps, results }, null, 2)}\n`,
    );
  };

  try {
    for (const job of jobs) {
      // Pass 1: render every theme's frames and measure each one's bounding box.
      // The encode waits until all themes are measured so they can share a crop.
      const rendered = [];
      for (const theme of themes) {
        const outDir = join(outputRoot, job.slug);
        const pngPath = join(outDir, `${job.slug}-${theme}.png`);
        const gifPath = join(outDir, `${job.slug}-${theme}.gif`);
        const webpPath = join(outDir, `${job.slug}-${theme}.webp`);

        // Both formats must exist to skip, so runs from before the keep-both
        // change get re-rendered rather than leaving one format missing.
        if (!force && (await exists(pngPath)) && (await exists(gifPath)) && (await exists(webpPath))) {
          console.log(`SKIP  ${job.slug} [${theme}] (already exported)`);
          if (!results.some((entry) => entry.slug === job.slug && entry.theme === theme)) {
            results.push({
              slug: job.slug,
              title: job.title,
              theme,
              mode: job.mode,
              sourceKind: job.sourceKind,
              hasRaster: job.hasRaster,
              durationMs: job.durationMs,
              fps: outFps,
              gifBytes: (await stat(gifPath)).size,
              webpBytes: (await stat(webpPath)).size,
              pngBytes: (await stat(pngPath)).size,
              recoveredFromDisk: true,
            });
          }
          continue;
        }

        console.log(`RENDER ${job.slug} [${theme}] duration=${job.durationMs}ms mode=${job.mode}`);
        const framesDir = join(frameRoot, job.slug, theme);
        await rm(framesDir, { recursive: true, force: true });
        await mkdir(framesDir, { recursive: true });

        try {
          const frameCount = await renderFramesWithFreshChrome({ job, theme, framesDir });
          await mkdir(outDir, { recursive: true });
          const crop = await detectCrop(framesDir, frameCount);
          console.log(`  measured crop=${JSON.stringify(crop)} frames=${frameCount}`);
          rendered.push({ theme, framesDir, frameCount, crop, pngPath, gifPath, webpPath });
        } catch (error) {
          console.log(`  FAILED ${job.slug} [${theme}]: ${error.message.split("\n")[0]}`);
          failures.push({ slug: job.slug, theme, error: error.message.split("\n")[0] });
          await rm(framesDir, { recursive: true, force: true });
        }
      }

      // Pass 2: encode every theme at the shared crop.
      if (rendered.length > 0) {
        const sharedCrop = unionCrops(rendered.map((entry) => entry.crop));
        const varied = rendered.some(
          (entry) => entry.crop.width !== sharedCrop.width || entry.crop.height !== sharedCrop.height,
        );
        if (varied) {
          console.log(`  themes differed; using shared crop ${sharedCrop.width}x${sharedCrop.height}`);
        }

        for (const entry of rendered) {
          try {
            const posterFrameIndex = await pickPosterFrame(entry.framesDir, entry.frameCount, job.slug);
            await cropPng({
              inputPath: join(entry.framesDir, `${String(posterFrameIndex).padStart(4, "0")}.png`),
              outputPath: entry.pngPath,
              crop: sharedCrop,
            });

            const { gifBytes, webpBytes } = await encodeAnimated({
              framesDir: entry.framesDir,
              crop: sharedCrop,
              gifPath: entry.gifPath,
              webpPath: entry.webpPath,
            });

            results.push({
              slug: job.slug,
              title: job.title,
              theme: entry.theme,
              mode: job.mode,
              sourceKind: job.sourceKind,
              hasRaster: job.hasRaster,
              durationMs: job.durationMs,
              fps: outFps,
              frameCount: entry.frameCount,
              crop: sharedCrop,
              posterFrameIndex,
              gifBytes,
              webpBytes,
              pngBytes: (await stat(entry.pngPath)).size,
            });

            console.log(`  done [${entry.theme}]: gif=${gifBytes}B webp=${webpBytes}B poster=frame ${posterFrameIndex}`);
          } catch (error) {
            console.log(`  FAILED encode ${job.slug} [${entry.theme}]: ${error.message.split("\n")[0]}`);
            failures.push({ slug: job.slug, theme: entry.theme, error: error.message.split("\n")[0] });
          } finally {
            if (!keepFrames) {
              await rm(entry.framesDir, { recursive: true, force: true });
            }
            await writeManifest();
          }
        }
      }
    }
  } finally {
    await writeManifest();
    if (!keepFrames) {
      await rm(frameRoot, { recursive: true, force: true });
    }
  }

  console.log(`\nCompleted ${results.length} export(s), ${failures.length} failure(s).`);
  for (const failure of failures) {
    console.log(`  FAILED ${failure.slug} [${failure.theme}]: ${failure.error}`);
  }

  const summary = await buildDelivery(results);
  console.log(`\nDelivery: ${summary.length} file set(s) in ${deliveryRoot}`);
  reportSelection(summary);

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

function reportSelection(summary) {
  const gifs = summary.filter((entry) => entry.chosenAnimatedFormat === "gif");
  const webps = summary.filter((entry) => entry.chosenAnimatedFormat === "webp");
  const totalBytes = summary.reduce((sum, entry) => sum + entry.chosenBytes + entry.pngBytes, 0);
  console.log(`  GIF: ${gifs.length}   WebP: ${webps.length}   total ${(totalBytes / 1048576).toFixed(1)} MB`);
  for (const entry of summary.filter((item) => item.chosenReason.includes("gradient-heavy"))) {
    console.log(`  guard applied: ${entry.slug} [${entry.theme}] -> webp (${entry.chosenReason})`);
  }
}

async function renderFrames({ port, job, theme, framesDir }) {
  const url = pathToFileURL(job.htmlByTheme[theme]).href;
  const target = await createTarget(port, url);
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.open();

  try {
    await Promise.all([
      client.send("Page.enable"),
      client.send("Runtime.enable"),
      client.send("DOM.enable"),
      client.send("Animation.enable"),
    ]);

    await client.send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor,
      mobile: false,
      screenWidth: viewport.width,
      screenHeight: viewport.height,
    });
    await client.send("Emulation.setDefaultBackgroundColorOverride", {
      color: { r: 0, g: 0, b: 0, a: 0 },
    });
    await client.send("Emulation.setEmulatedMedia", {
      media: "screen",
      features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
    });

    // The target was already opened at this URL, so navigating again races the
    // first load: the load event we wake on can be the earlier one, leaving
    // preparePage to query a document that the second navigation is still
    // rebuilding. Wait for the real thing to be present instead.
    await waitForTarget(client, job.selector);
    await preparePage(client, job.selector);

    const frameCount = Math.max(1, Math.round((job.durationMs / 1000) * outFps));

    for (let index = 0; index < frameCount; index += 1) {
      const elapsedMs = (index * 1000) / outFps;
      await freezeAt(client, elapsedMs);
      const screenshot = await client.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
        omitBackground: true,
      });
      const frameName = `${String(index + 1).padStart(4, "0")}.png`;
      await writeFile(join(framesDir, frameName), Buffer.from(screenshot.data, "base64"));
    }

    return frameCount;
  } finally {
    client.close();
    await closeTarget(port, target.id);
  }
}

async function waitForTarget(client, selector, timeoutMs = 15000) {
  const startedAt = Date.now();
  let lastState = "unknown";

  while (Date.now() - startedAt < timeoutMs) {
    const result = await client.send("Runtime.evaluate", {
      expression: `JSON.stringify({
        state: document.readyState,
        found: !!document.querySelector(${JSON.stringify(selector)})
      })`,
      returnByValue: true,
    });

    if (result.result?.value) {
      const status = JSON.parse(result.result.value);
      lastState = status.state;
      if (status.state === "complete" && status.found) return;
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }

  throw new Error(`Timed out waiting for ${selector} (readyState=${lastState})`);
}

async function preparePage(client, selector) {
  const expression = `
    (async () => {
      const baseStyle = document.createElement("style");
      baseStyle.id = "export-transparency-base";
      baseStyle.textContent = \`
        html, body {
          margin: 0 !important;
          overflow: hidden !important;
          background: transparent !important;
        }
        .app-shell,
        .export-preview-shell,
        .stage-band {
          background: transparent !important;
        }
        .stage-band::before,
        .stage-band::after,
        .app-shell::before,
        .app-shell::after,
        .export-preview-shell::before,
        .export-preview-shell::after {
          opacity: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        /* Presentation chrome from the prototype: the drop shadow and outline that
           make a scene look like a device on a page. Removed by selector rather
           than a blanket filter/box-shadow reset, which would also strip effects
           that are part of the motion (the progressive blur spinner, for one). */
        .uba-gradient-device-stage {
          filter: none !important;
        }

        .alty-mock-phone {
          box-shadow: none !important;
          border-color: transparent !important;
        }
      \`;
      document.head.appendChild(baseStyle);
      document.documentElement.style.background = "transparent";
      document.body.style.background = "transparent";

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await Promise.all(Array.from(document.images).map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolveImage) => {
          image.addEventListener("load", resolveImage, { once: true });
          image.addEventListener("error", resolveImage, { once: true });
        });
      }));

      const target = document.querySelector(${JSON.stringify(selector)});
      if (!target) {
        throw new Error("Export target not found for selector " + ${JSON.stringify(selector)});
      }

      await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));

      const transparentValues = new Set(["rgba(0, 0, 0, 0)", "transparent"]);
      const backgrounds = [
        getComputedStyle(document.documentElement).backgroundColor,
        getComputedStyle(document.body).backgroundColor,
      ];
      if (!backgrounds.every((value) => transparentValues.has(value))) {
        throw new Error(\`Export backgrounds are not transparent: \${backgrounds.join(", ")}\`);
      }
      return true;
    })()
  `;

  await evaluate(client, { expression, awaitPromise: true, returnByValue: true });
}

async function freezeAt(client, elapsedMs) {
  const expression = `
    (async () => {
      let freezeStyle = document.getElementById("export-freeze");
      if (!freezeStyle) {
        freezeStyle = document.createElement("style");
        freezeStyle.id = "export-freeze";
        document.head.appendChild(freezeStyle);
      }
      freezeStyle.textContent = \`
        *, *::before, *::after {
          animation-play-state: paused !important;
          animation-delay: -${elapsedMs.toFixed(3)}ms !important;
        }
      \`;
      await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
      return true;
    })()
  `;
  await evaluate(client, { expression, awaitPromise: true, returnByValue: true });
}

async function evaluate(client, params) {
  const result = await client.send("Runtime.evaluate", params);
  if (result.exceptionDetails) {
    const details = result.exceptionDetails;
    const message = details.exception?.description || details.text || "Browser evaluation failed.";
    throw new Error(message);
  }
  return result.result || {};
}

async function detectCrop(framesDir, frameCount) {
  const args = [
    "-hide_banner", "-loglevel", "info",
    "-framerate", String(outFps),
    "-i", join(framesDir, "%04d.png"),
    "-vf", "alphaextract,cropdetect=limit=0:round=2:reset=0",
    "-f", "null", "-",
  ];
  const stderr = await runCapture("ffmpeg", args);
  const matches = [...stderr.matchAll(/crop=(\d+):(\d+):(\d+):(\d+)/g)];
  if (matches.length === 0) {
    return { x: 0, y: 0, width: canvasSize, height: canvasSize };
  }
  const last = matches[matches.length - 1];
  let [, w, h, x, y] = last.map(Number);
  x = Math.max(0, x - cropPadding);
  y = Math.max(0, y - cropPadding);
  w = Math.min(canvasSize - x, w + cropPadding * 2);
  h = Math.min(canvasSize - y, h + cropPadding * 2);
  w -= w % 2;
  h -= h % 2;
  return { x, y, width: w, height: h };
}

// Dark and light renders of the same animation can bound differently (a glow that
// only shows on one theme, particles that scatter further), which shipped the two
// themes at different pixel sizes. Union the boxes so one animation has one size.
function unionCrops(crops) {
  const x = Math.min(...crops.map((c) => c.x));
  const y = Math.min(...crops.map((c) => c.y));
  const right = Math.max(...crops.map((c) => c.x + c.width));
  const bottom = Math.max(...crops.map((c) => c.y + c.height));
  let width = right - x;
  let height = bottom - y;
  width -= width % 2;
  height -= height % 2;
  return { x, y, width, height };
}

// Frame 1 is a poor poster for anything that fades in or starts on a flat panel.
// Score each frame by opaque coverage x luminance spread: coverage alone rates a
// solid black start panel as full, and spread alone rates a blank white one as
// busy, so the product is what actually finds a frame with visible content.
async function measurePerFrame(framesDir, filter, key) {
  const stderr = await runCapture("ffmpeg", [
    "-hide_banner", "-loglevel", "info",
    "-i", join(framesDir, "%04d.png"),
    "-vf", `${filter},metadata=print:key=lavfi.signalstats.${key}`,
    "-f", "null", "-",
  ]);
  return [...stderr.matchAll(new RegExp(`${key}=([0-9.]+)`, "g"))].map((match) => Number(match[1]));
}

async function pickPosterFrame(framesDir, frameCount, slug) {
  const override = posterPositionOverrides.get(slug);
  if (override !== undefined) {
    return Math.min(frameCount, Math.max(1, Math.round(frameCount * override)));
  }

  const coverage = await measurePerFrame(framesDir, "alphaextract,signalstats", "YAVG");
  const spread = await measurePerFrame(framesDir, "signalstats", "YSTD");
  if (coverage.length === 0) return 1;

  // Skip the opening tenth: that is the fade-in / empty-backdrop stretch, and a
  // flat start panel can otherwise score as well as the real content. The tail is
  // left eligible because play-once animations hold their meaningful final state.
  const firstCandidate = Math.floor(coverage.length * 0.1);

  let bestIndex = firstCandidate;
  let bestScore = -1;
  for (let index = firstCandidate; index < coverage.length; index += 1) {
    const score = coverage[index] * (spread[index] ?? 1);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }
  return Math.min(frameCount, bestIndex + 1);
}

async function cropPng({ inputPath, outputPath, crop }) {
  await run("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", inputPath,
    "-vf", `crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`,
    outputPath,
  ]);
}

async function encodeAnimated({ framesDir, crop, gifPath, webpPath, frameCount }) {
  const croppedDir = `${framesDir}-cropped`;
  await mkdir(croppedDir, { recursive: true });
  await run("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", join(framesDir, "%04d.png"),
    "-vf", `crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`,
    join(croppedDir, "%04d.png"),
  ]);

  const palettePath = `${gifPath}.palette.png`;
  await run("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    "-framerate", String(outFps),
    "-i", join(croppedDir, "%04d.png"),
    "-vf", "split[a][b];[a]palettegen=reserve_transparent=1:stats_mode=full[p];[b][p]paletteuse=alpha_threshold=128:dither=sierra2_4a",
    "-loop", "0",
    gifPath,
  ]);
  await rm(palettePath, { force: true });

  const frameFiles = (await readdir(croppedDir)).filter((name) => name.endsWith(".png")).sort();
  const delayMs = Math.round(1000 / outFps);
  const img2webpArgs = ["-loop", "0", "-lossy", "-q", "80", "-m", "6", "-d", String(delayMs)];
  for (const frameFile of frameFiles) {
    img2webpArgs.push(join(croppedDir, frameFile));
  }
  img2webpArgs.push("-o", webpPath);
  await run("img2webp", img2webpArgs);

  await rm(croppedDir, { recursive: true, force: true });

  // Both formats are kept on disk; selectFormat() decides which one ships, so the
  // policy can be changed later without re-rendering any frames.
  const gifBytes = (await stat(gifPath)).size;
  const webpBytes = (await stat(webpPath)).size;
  return { gifBytes, webpBytes };
}

// Default policy: raster-backed motion ships as WebP, pure vector/Lottie ships as
// GIF. guardRatio overrides the vector->GIF pick when GIF is disproportionately
// larger, which is the signature of heavy gradients that GIF cannot encode well.
function selectFormat({ hasRaster, gifBytes, webpBytes, policy, guardRatio }) {
  if (policy === "size") {
    return gifBytes <= webpBytes
      ? { chosen: "gif", reason: "smaller" }
      : { chosen: "webp", reason: "smaller" };
  }

  // The guard runs in both directions: the category rule is overridden whenever
  // the other format is disproportionately smaller, so neither rule branch can
  // ship a file several times larger than its alternative.
  if (hasRaster) {
    if (guardRatio > 0 && gifBytes > 0 && webpBytes / gifBytes > guardRatio) {
      return {
        chosen: "gif",
        reason: `raster source, but WebP is ${(webpBytes / gifBytes).toFixed(1)}x larger (flat-color raster)`,
      };
    }
    return { chosen: "webp", reason: "raster-backed source" };
  }
  if (guardRatio > 0 && webpBytes > 0 && gifBytes / webpBytes > guardRatio) {
    return {
      chosen: "webp",
      reason: `vector source, but GIF is ${(gifBytes / webpBytes).toFixed(1)}x larger (gradient-heavy)`,
    };
  }
  return { chosen: "gif", reason: "vector source" };
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function createTarget(port, url) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  if (!response.ok) throw new Error(`Failed to create Chrome target: ${response.status} ${response.statusText}`);
  return response.json();
}

async function closeTarget(port, id) {
  await fetch(`http://127.0.0.1:${port}/json/close/${encodeURIComponent(id)}`).catch(() => {});
}

async function getFreePort() {
  return new Promise((resolvePort, rejectPort) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolvePort(port));
    });
    server.on("error", rejectPort);
  });
}

async function waitForChrome(port) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 10000) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      // Chrome is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error("Chrome did not start its remote debugging endpoint in time.");
}

async function stopChrome(chrome) {
  if (chrome.exitCode !== null || chrome.signalCode !== null) return;
  const closed = new Promise((resolveClose) => chrome.once("close", resolveClose));
  chrome.kill("SIGTERM");
  const terminated = await Promise.race([
    closed,
    new Promise((resolveTimeout) => setTimeout(() => resolveTimeout(false), 2500)),
  ]);
  if (terminated === false && chrome.exitCode === null && chrome.signalCode === null) {
    chrome.kill("SIGKILL");
    await Promise.race([closed, new Promise((resolveTimeout) => setTimeout(resolveTimeout, 2500))]);
  }
}

async function run(command, args) {
  await new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", rejectRun);
    child.on("close", (code) => {
      if (code === 0) resolveRun();
      else rejectRun(new Error(`${command} ${args.join(" ")} failed with ${code}\n${stderr}`));
    });
  });
}

async function runCapture(command, args) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", rejectRun);
    child.on("close", () => resolveRun(stderr));
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
