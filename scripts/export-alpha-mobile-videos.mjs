import { mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { basename, dirname, join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const chromeBin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputRoot = join(rootDir, "mobile-animation-export", "alpha-video-export");
const frameRoot = join(outputRoot, "_frames");
const fps = 30;
const keepFrames = process.env.KEEP_ALPHA_EXPORT_FRAMES === "1";
const viewport = { width: 720, height: 720, deviceScaleFactor: 1 };

const jobs = [
  {
    id: "uba-card-rotation",
    title: "Card rotation",
    durationMs: 5800,
    selector: '.animation-only-motion-slot[data-motion-source^="uba-card-rotation"]',
    htmlByTheme: {
      dark: join(rootDir, "mobile-animation-export", "01-core-spinners", "04-card-rotation", "preview-dark.html"),
      light: join(rootDir, "mobile-animation-export", "01-core-spinners", "04-card-rotation", "preview-light.html"),
    },
    videoBitrate: "1000k",
    alphaQuality: "1.00",
    vp9Crf: "34",
  },
  {
    id: "uba-coin-flip",
    title: "Coin flip",
    durationMs: 5400,
    selector: '.animation-only-motion-slot[data-motion-source^="uba-coin-flip"]',
    htmlByTheme: {
      dark: join(rootDir, "mobile-animation-export", "01-core-spinners", "05-coin-flip", "preview-dark.html"),
      light: join(rootDir, "mobile-animation-export", "01-core-spinners", "05-coin-flip", "preview-light.html"),
    },
    videoBitrate: "1000k",
    alphaQuality: "1.00",
    vp9Crf: "36",
  },
];

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
    if (this.ws.readyState === WebSocket.OPEN) {
      return;
    }

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
    if (!callbacks) {
      return;
    }
    callbacks.delete(callback);
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  await rm(frameRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });

  const port = await getFreePort();
  const profileDir = join(outputRoot, ".chrome-profile");
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
  ], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  try {
    await waitForChrome(port);
    const outputs = [];

    for (const job of jobs) {
      for (const theme of ["dark", "light"]) {
        const framesDir = join(frameRoot, job.id, theme);
        await mkdir(framesDir, { recursive: true });
        await renderFrames({ port, job, theme, framesDir });

        const outputDir = join(outputRoot, job.id);
        await mkdir(outputDir, { recursive: true });

        const webmPath = join(outputDir, `${job.id}-${theme}-android-vp9-alpha.webm`);
        const movPath = join(outputDir, `${job.id}-${theme}-ios-hevc-alpha.mov`);

        await encodeVp9({ framesDir, outputPath: webmPath, job });
        await encodeHevc({ framesDir, outputPath: movPath, job });

        outputs.push({
          animation: job.title,
          theme,
          fps,
          durationMs: job.durationMs,
          dimensions: "420x420",
          androidVp9Alpha: relativeToRoot(webmPath),
          iosHevcAlpha: relativeToRoot(movPath),
        });
      }
    }

    const manifestPath = join(outputRoot, "manifest.json");
    await writeFile(manifestPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), outputs }, null, 2)}\n`);
  } finally {
    await stopChrome(chrome);
    if (!keepFrames) {
      await rm(frameRoot, { recursive: true, force: true });
    }
    await rm(profileDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
  }
}

async function renderFrames({ port, job, theme, framesDir }) {
  const target = await createTarget(port, pathToFileURL(job.htmlByTheme[theme]).href);
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

    const loadEvent = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url: pathToFileURL(job.htmlByTheme[theme]).href });
    await loadEvent;
    await preparePage(client, job.selector);

    const clip = await getClip(client, job.selector);
    const frameCount = Math.round((job.durationMs / 1000) * fps);

    for (let index = 0; index < frameCount; index += 1) {
      const elapsedMs = (index * 1000) / fps;
      await freezeAt(client, elapsedMs);
      const screenshot = await client.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
        omitBackground: true,
        clip,
      });
      const frameName = `${String(index + 1).padStart(4, "0")}.png`;
      await writeFile(join(framesDir, frameName), Buffer.from(screenshot.data, "base64"));
    }
  } finally {
    client.close();
    await closeTarget(port, target.id);
  }
}

async function preparePage(client, selector) {
  const expression = `
    (async () => {
      const baseStyle = document.createElement("style");
      baseStyle.id = "alpha-export-base";
      baseStyle.textContent = \`
        html,
        body {
          width: 720px !important;
          height: 720px !important;
          margin: 0 !important;
          overflow: hidden !important;
          background: transparent !important;
        }

        body {
          display: grid !important;
          place-items: center !important;
        }

        .app-shell,
        .export-preview-shell {
          width: 720px !important;
          height: 720px !important;
          min-height: 720px !important;
          background: transparent !important;
          overflow: visible !important;
        }

        .export-preview-shell .stage-band,
        .stage-band {
          width: 620px !important;
          height: 620px !important;
          min-height: 620px !important;
          background: transparent !important;
          overflow: visible !important;
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
      \`;
      document.head.appendChild(baseStyle);
      document.documentElement.style.background = "transparent";
      document.body.style.background = "transparent";

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await Promise.all(Array.from(document.images).map((image) => {
        if (image.complete) {
          return Promise.resolve();
        }
        return new Promise((resolveImage) => {
          image.addEventListener("load", resolveImage, { once: true });
          image.addEventListener("error", resolveImage, { once: true });
        });
      }));

      if (!document.querySelector(${JSON.stringify(selector)})) {
        throw new Error("Export target not found.");
      }

      await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
      const transparentValues = new Set(["rgba(0, 0, 0, 0)", "transparent"]);
      const backgrounds = [
        getComputedStyle(document.documentElement).backgroundColor,
        getComputedStyle(document.body).backgroundColor,
        getComputedStyle(document.querySelector(".app-shell")).backgroundColor,
        getComputedStyle(document.querySelector(".stage-band")).backgroundColor,
      ];
      if (!backgrounds.every((value) => transparentValues.has(value))) {
        throw new Error(\`Export backgrounds are not transparent: \${backgrounds.join(", ")}\`);
      }
      return true;
    })()
  `;

  await evaluate(client, {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
}

async function freezeAt(client, elapsedMs) {
  const expression = `
    (async () => {
      let freezeStyle = document.getElementById("alpha-export-freeze");
      if (!freezeStyle) {
        freezeStyle = document.createElement("style");
        freezeStyle.id = "alpha-export-freeze";
        document.head.appendChild(freezeStyle);
      }

      freezeStyle.textContent = \`
        *,
        *::before,
        *::after {
          animation-play-state: paused !important;
          animation-delay: -${elapsedMs.toFixed(3)}ms !important;
        }
      \`;

      await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
      return true;
    })()
  `;

  await evaluate(client, {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
}

async function getClip(client, selector) {
  const expression = `
    (() => {
      const target = document.querySelector(${JSON.stringify(selector)});
      const stage = target.closest(".stage-band")?.getBoundingClientRect();
      if (!target || !stage) {
        throw new Error("Could not find centered export stage.");
      }

      const size = 420;
      return {
        x: Math.round(stage.x + ((stage.width - size) / 2)),
        y: Math.round(stage.y + ((stage.height - size) / 2)),
        width: size,
        height: size,
        scale: 1
      };
    })()
  `;
  const result = await evaluate(client, {
    expression,
    returnByValue: true,
  });
  const clip = result.value;

  if (clip.width % 2 !== 0 || clip.height % 2 !== 0) {
    throw new Error(`Clip must have even dimensions for mobile video encoders: ${JSON.stringify(clip)}`);
  }

  return clip;
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

async function encodeVp9({ framesDir, outputPath, job }) {
  await run("ffmpeg", [
    "-hide_banner",
    "-loglevel", "error",
    "-y",
    "-framerate", String(fps),
    "-i", join(framesDir, "%04d.png"),
    "-an",
    "-vf", "format=yuva420p",
    "-c:v", "libvpx-vp9",
    "-pix_fmt", "yuva420p",
    "-b:v", "0",
    "-crf", job.vp9Crf,
    "-deadline", "good",
    "-cpu-used", "4",
    "-row-mt", "1",
    "-auto-alt-ref", "0",
    "-metadata:s:v:0", "alpha_mode=1",
    outputPath,
  ]);
}

async function encodeHevc({ framesDir, outputPath, job }) {
  const intermediatePath = outputPath.replace(/\.mov$/i, ".prores4444-source.mov");

  await run("ffmpeg", [
    "-hide_banner",
    "-loglevel", "error",
    "-y",
    "-framerate", String(fps),
    "-i", join(framesDir, "%04d.png"),
    "-an",
    "-vf", "format=yuva444p10le",
    "-c:v", "prores_ks",
    "-profile:v", "4",
    "-pix_fmt", "yuva444p10le",
    intermediatePath,
  ]);

  await run("avconvert", [
    "--source", intermediatePath,
    "--preset", "PresetHEVCHighestQualityWithAlpha",
    "--output", outputPath,
    "--replace",
  ]);

  await rm(intermediatePath, { force: true });
}

async function createTarget(port, url) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  if (!response.ok) {
    throw new Error(`Failed to create Chrome target: ${response.status} ${response.statusText}`);
  }
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
      if (response.ok) {
        return;
      }
    } catch {
      // Chrome is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error("Chrome did not start its remote debugging endpoint in time.");
}

async function stopChrome(chrome) {
  if (chrome.exitCode !== null || chrome.signalCode !== null) {
    return;
  }

  const closed = new Promise((resolveClose) => {
    chrome.once("close", resolveClose);
  });
  chrome.kill("SIGTERM");

  const terminated = await Promise.race([
    closed,
    new Promise((resolveTimeout) => setTimeout(() => resolveTimeout(false), 2500)),
  ]);

  if (terminated === false && chrome.exitCode === null && chrome.signalCode === null) {
    chrome.kill("SIGKILL");
    await Promise.race([
      closed,
      new Promise((resolveTimeout) => setTimeout(resolveTimeout, 2500)),
    ]);
  }
}

async function run(command, args) {
  await new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", rejectRun);
    child.on("close", (code) => {
      if (code === 0) {
        resolveRun();
      } else {
        rejectRun(new Error(`${command} ${args.map((arg) => basename(arg) === arg ? arg : `"${arg}"`).join(" ")} failed with ${code}\n${stderr}`));
      }
    });
  });
}

function relativeToRoot(path) {
  return path.replace(`${rootDir}/`, "");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
