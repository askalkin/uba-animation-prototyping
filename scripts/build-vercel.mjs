import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const output = join(root, "public");
const staticEntries = ["index.html", "app.js", "styles.css", "splash-animation.html", "assets"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of staticEntries) {
  const source = join(root, entry);

  if (existsSync(source)) {
    await cp(source, join(output, entry), { recursive: true });
  }
}
