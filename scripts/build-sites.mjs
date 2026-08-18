import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const dist = join(root, "dist");
const client = join(dist, "client");
const server = join(dist, "server");

const staticEntries = [
  "index.html",
  "app.js",
  "styles.css",
  "splash-animation.html",
  "assets",
  "mobile-handoff",
];

const workerSource = `
const cacheableExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".lottie",
  ".mov",
  ".mp4",
  ".png",
  ".webm",
  ".webp",
  ".woff2",
]);

function extensionFor(pathname) {
  const match = pathname.match(/\\.[a-z0-9]+$/i);
  return match ? match[0].toLowerCase() : "";
}

function addHeaders(response, pathname) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (response.status === 200 && cacheableExtensions.has(extensionFor(pathname))) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    headers.set("Cache-Control", "no-cache");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function assetCandidates(pathname) {
  const cleanPath = pathname.replace(/\\/+$/, "") || "/";
  const candidates = [];

  if (cleanPath === "/") {
    candidates.push("/index.html");
  } else {
    candidates.push(cleanPath);
    candidates.push(cleanPath + "/index.html");
  }

  candidates.push("/index.html");

  return [...new Set(candidates.flatMap((path) => [path, "/client" + path]))];
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    for (const pathname of assetCandidates(url.pathname)) {
      const assetUrl = new URL(pathname, url.origin);
      const response = await env.ASSETS.fetch(new Request(assetUrl, request));

      if (response.status !== 404) {
        return addHeaders(response, pathname);
      }
    }

    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
};
`.trimStart();

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

for (const entry of staticEntries) {
  const source = join(root, entry);
  if (existsSync(source)) {
    await cp(source, join(client, entry), { recursive: true });
  }
}

await writeFile(join(server, "index.js"), workerSource);
