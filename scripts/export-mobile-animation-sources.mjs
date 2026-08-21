import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "mobile-animation-export");
const SHARED_DIR = path.join(OUT_DIR, "shared");
const SHARED_ASSETS_DIR = path.join(SHARED_DIR, "assets");
const SHARED_LOTTIE_DIR = path.join(SHARED_DIR, "lottie");
const RECORDINGS_DIR = path.join(ROOT, "prototype-recordings");
const RECORDING_THEMES = ["dark", "light"];
const EXPORT_THEMES = ["dark", "light"];
const METADATA_SCHEMA_VERSION = 3;
const MOBILE_TARGET_FPS = 60;

const animationGroups = [
  {
    title: "Splash",
    folder: "10-splash",
    items: [
      item("Splash lockup reveal", "uba-splash-reveal", "splash", "01-splash-lockup-reveal", {
        recommendedFormat: "Lottie, Rive, or native — undecided",
        sourceKind: "svg-css",
        sourcePage: "uba-splash-reveal",
        implementationNote: "Pure CSS: percentage keyframes over one shared 5260ms animation-duration per element (reveal, align, draw, fill, exit), no JS state machine. Plays once and holds on the empty frame. See docs/animation-status.json for the full geometry breakdown and the open target-format decision.",
      }),
    ],
  },
  {
    title: "Core spinners",
    folder: "01-core-spinners",
    items: [
      item("Red comet arc", "progressive-blur-spinner-solo", "almost", "01-red-comet-arc", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "svg-css",
      }),
      item("UBA spinner 1", "uba-spinner-1", "almost", "02-uba-spinner-1", {
        recommendedFormat: "Lottie",
        sourceKind: "existing-lottie",
        sourceLottie: "shared/lottie/uba-spinner-1.json",
      }),
      item("Banking icons loader", "uba-icon-loop", "almost", "03-banking-icons-loader", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "svg-js-css",
        implementationNote: "The path draw/erase timing is controlled by shared/preview-runtime.js, using the same stroke lengths as the web prototype.",
      }),
      item("Card rotation", "uba-card-rotation", "almost", "04-card-rotation", {
        recommendedFormat: "Rive",
        sourceKind: "html-css-webp",
        rasterAssets: ["shared/assets/uba-card-front.webp", "shared/assets/uba-card-back.webp"],
        implementationNote: "Use WebP textures for the card faces and recreate the 3D flip/shadow motion from the CSS keyframes.",
      }),
      item("Coin flip", "uba-coin-flip", "almost", "05-coin-flip", {
        recommendedFormat: "Rive",
        sourceKind: "html-css-svg",
        implementationNote: "The coin body is CSS/SVG, including the cylindrical edge panels and 3D transforms.",
      }),
    ],
  },
  {
    title: "Standard feedback",
    folder: "02-standard-feedback",
    items: [
      item("Green check spinner", "uba-spinner-1-circle-resolve-green", "core-spinner-02", "01-green-check-spinner", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "existing-lottie-plus-css",
        sourceLottie: "shared/lottie/uba-spinner-1.json",
      }),
      item("Green verification badge", "verification-badge-green", "core-spinner-02", "02-green-verification-badge", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "svg-css",
      }),
      item("Green fill to check", "success-spinner-green", "core-spinner-02", "03-green-fill-to-check", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "svg-css",
      }),
      item("Red X spinner", "uba-spinner-1-circle-resolve-error", "failed", "04-red-x-spinner", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "existing-lottie-plus-css",
        sourceLottie: "shared/lottie/uba-spinner-1.json",
      }),
      item("Red fill to X", "failure-wheel-red", "failed", "05-red-fill-to-x", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "svg-css",
      }),
      item("Badge fill to X", "failure-verification-badge", "failed", "06-badge-fill-to-x", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "svg-css",
      }),
      item("Uploaded success confetti green", "uploaded-success-confetti-green", "success", "07-uploaded-success-confetti-green", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "existing-lottie-plus-css",
        sourceLottie: "shared/lottie/uploaded-confetti.json",
        sourcePages: ["account-opening-success", "account-opening-success-lift"],
        implementationNote: "The web prototype overlays the supplied confetti Lottie over the green success mark after a delay.",
      }),
      item("Green check confetti scatter", "green-success-confetti", "core-spinner-02", "08-green-check-confetti-scatter", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "svg-css-particles",
        implementationNote: "Hand-built 24-piece confetti burst. Use metadata.visualElements.confettiScatter as the source of truth for piece positions, sizes, colors, rotation, drift, and stagger.",
      }),
      item("Green check star sprinkle", "green-success-stars", "core-spinner-02", "09-green-check-star-sprinkle", {
        recommendedFormat: "Lottie or Rive",
        sourceKind: "svg-css-particles",
        implementationNote: "Hand-built 3-star sprinkle. Use metadata.visualElements.starSprinkle as the source of truth for star positions, sizes, colors, rotation, and stagger.",
      }),
    ],
  },
  {
    title: "Pull to refresh",
    folder: "03-pull-to-refresh",
    items: [
      item("Blob capsule", "pull-to-refresh-blob-capsule", "pull", "01-blob-capsule", {
        recommendedFormat: "Rive",
        sourceKind: "html-css",
        implementationNote: "Best rebuilt as a Rive state machine because this is gesture/state-driven motion.",
      }),
      item("Line fill", "pull-to-refresh-line-fill", "pull", "02-line-fill", {
        recommendedFormat: "Rive or Lottie",
        sourceKind: "svg-css",
      }),
      item("Line fill red", "pull-to-refresh-line-fill-red", "pull", "03-line-fill-red", {
        recommendedFormat: "Rive or Lottie",
        sourceKind: "svg-css",
      }),
    ],
  },
  {
    title: "Biometrics",
    folder: "04-biometrics",
    items: [
      item("Scanner float", "biometric-scanner-device-plain-float", "biometrics", "01-scanner-float", {
        recommendedFormat: "Rive",
        sourceKind: "html-css-svg-webp",
        rasterAssets: ["shared/assets/identity-scanner-device.webp"],
        implementationNote: "Use the WebP scanner shell and recreate the fingerprint SVG draw/floating motion from the source.",
      }),
    ],
  },
  {
    title: "Search",
    folder: "05-search",
    items: [
      item("Red magnifier", "search-red-magnifier-loader", "searching", "01-red-magnifier", {
        recommendedFormat: "Rive",
        sourceKind: "html-css-webp",
        rasterAssets: ["shared/assets/search-magnifier-red.webp"],
      }),
      item("Orbit magnifier", "search-red-orbit-magnifier", "searching", "02-orbit-magnifier", {
        recommendedFormat: "Rive",
        sourceKind: "html-css-svg-webp",
        rasterAssets: ["shared/assets/search-magnifier-red.webp"],
      }),
    ],
  },
  {
    title: "Notifications",
    folder: "09-notifications",
    items: [
      item("Bell ring", "notification-bell-ring", "notification", "01-bell-ring", {
        recommendedFormat: "Lottie",
        sourceKind: "html-css-webp",
        rasterAssets: ["shared/assets/notification-bell-red.webp"],
        implementationNote: "Bell artwork is a raster image; the swing, the ground shadow and the three expanding rings are all CSS transforms over it.",
      }),
    ],
  },
  {
    title: "Code entry",
    folder: "06-code-entry",
    items: [
      item("6-digit code green", "otp-green", "otp", "01-six-digit-code-green", {
        recommendedFormat: "Rive",
        sourceKind: "html-css",
        sourcePage: "six-digit-code",
        implementationNote: "Recreate text as outlined/vector digits in mobile animation tooling to avoid font runtime differences.",
      }),
      item("SecurePass green", "securepass-green", "securepass", "02-securepass-green", {
        recommendedFormat: "Rive",
        sourceKind: "html-css",
        sourcePage: "verify-securepass",
        implementationNote: "Same motion as the 6-digit code animation; label is kept separate because it appears as a separate navbar item.",
      }),
      item("Code error", "otp-error", "otp-error", "03-code-error", {
        recommendedFormat: "Rive",
        sourceKind: "html-css",
        sourcePage: "code-error",
      }),
    ],
  },
  {
    title: "Identity verification",
    folder: "07-identity-verification",
    items: [
      item("User focus scan", "identity-bust-focus", "identity", "01-user-focus-scan", {
        recommendedFormat: "Rive",
        sourceKind: "html-css-webp",
        sourcePage: "identity-verification",
        rasterAssets: ["shared/assets/identity-user-bust.webp", "shared/assets/identity-user-bust-red.webp"],
      }),
    ],
  },
  {
    title: "Page transitions",
    folder: "08-page-transitions",
    items: [
      item("UBA gradient blob transition", "uba-loader-gradient-blob-prototype", "transition", "01-uba-gradient-blob-transition", {
        recommendedFormat: "Rive",
        sourceKind: "html-css-existing-lottie",
        sourceLottie: "shared/lottie/uba-spinner-1.json",
        sourcePage: "uba-loader-gradient-blob-prototype",
        implementationNote: "Best rebuilt as a Rive state machine: entering blobs, loader state, exit into success.",
      }),
    ],
  },
];

function item(title, slug, contextType, folder, extra = {}) {
  return {
    title,
    slug,
    contextType,
    folder,
    sourcePage: extra.sourcePage,
    sourcePages: extra.sourcePages,
    recommendedFormat: extra.recommendedFormat,
    sourceKind: extra.sourceKind,
    sourceLottie: extra.sourceLottie,
    rasterAssets: extra.rasterAssets || [],
    implementationNote: extra.implementationNote || "",
    intendedDurationMs: extra.intendedDurationMs ?? null,
    targetFps: extra.targetFps || MOBILE_TARGET_FPS,
  };
}

function recording(basename, match = "exact") {
  return { basename, match };
}

const referenceRecordingsBySlug = {
  "progressive-blur-spinner-solo": [
    recording("06-progressive-blur-spinner-solo", "exact animation-only source"),
    recording("26-account-opening-almost-there", "source page default"),
  ],
  "uba-spinner-1": [
    recording("08-uba-spinner-1", "exact animation-only source"),
    recording("26c-account-opening-almost-there-uba-spinner-1", "source page variant"),
  ],
  "uba-card-rotation": [recording("13-uba-card-rotation", "exact animation-only source")],
  "uba-coin-flip": [recording("12-silver-uba-coin", "closest available coin source")],
  "verification-badge-green": [recording("34-verification-badge", "closest available badge source")],
  "success-spinner-green": [recording("18-success-spinner-green", "exact animation-only source")],
  "uba-spinner-1-circle-resolve-error": [recording("32-couldnt-load-results", "source page default")],
  "failure-wheel-red": [recording("32b-failure-wheel-neutral", "closest available wheel source")],
  "failure-verification-badge": [recording("32c-failure-verification-badge", "exact animation-only source")],
  "uploaded-success-confetti-green": [recording("31-account-opening-success", "source page default")],
  "pull-to-refresh-blob-capsule": [
    recording("19-pull-to-refresh-blob-capsule", "exact animation-only source"),
    recording("33-transaction-history-pull-refresh", "source page default"),
  ],
  "biometric-scanner-device-plain-float": [recording("27-enable-biometrics", "source page default")],
  "search-red-magnifier-loader": [recording("05-search-red-magnifier-loader", "exact animation-only source")],
  "search-red-orbit-magnifier": [recording("30-searching-keyboard", "source page default")],
  "otp-green": [recording("29-six-digit-code", "source page default")],
  "identity-bust-focus": [
    recording("15-identity-bust-focus", "exact animation-only source"),
    recording("28-identity-verification", "source page default"),
  ],
  "uba-loader-gradient-blob-prototype": [
    recording("24-uba-loader-gradient-blob-prototype", "exact animation-only source"),
  ],
};

const scriptedMotionBySlug = {
  "uba-icon-loop": {
    source: "shared/preview-runtime.js initUbaIconLoopScenes",
    mode: "scripted-loop",
    loop: true,
    direction: "sequential-icon-draw-hold-erase",
    drawMs: 850,
    holdMs: 500,
    eraseMs: 850,
    gapMs: 300,
    iconCount: 6,
    easing: [
      "cubic-bezier(0.16, 1, 0.3, 1)",
      "cubic-bezier(0.65, 0, 0.35, 1)",
    ],
  },
};

Object.values(scriptedMotionBySlug).forEach((motionSpec) => {
  motionSpec.segmentMs = motionSpec.drawMs + motionSpec.holdMs + motionSpec.eraseMs + motionSpec.gapMs;
  motionSpec.demoMs = motionSpec.segmentMs * motionSpec.iconCount;
  motionSpec.inFrame = 0;
  motionSpec.outFrame = Math.round((motionSpec.demoMs / 1000) * MOBILE_TARGET_FPS);
});

function fakeElement() {
  return {
    dataset: {},
    style: {
      setProperty() {},
      getPropertyValue() {
        return "";
      },
    },
    classList: {
      add() {},
      remove() {},
    },
    querySelectorAll() {
      return [];
    },
    querySelector() {
      return null;
    },
    addEventListener() {},
    setPointerCapture() {},
    closest() {
      return null;
    },
    innerHTML: "",
  };
}

function loadGalleryExports() {
  const appJs = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const context = {
    console,
    navigator: {},
    document: {
      documentElement: { dataset: {} },
      getElementById() {
        return fakeElement();
      },
      querySelectorAll() {
        return [];
      },
      querySelector() {
        return null;
      },
      createElementNS() {
        return fakeElement();
      },
    },
    window: {
      localStorage: {
        getItem() {
          return null;
        },
        setItem() {},
      },
      addEventListener() {},
      location: { hash: "#account-opening-almost-there", search: "" },
      setTimeout() {},
      clearTimeout() {},
      requestAnimationFrame() {
        return 0;
      },
      cancelAnimationFrame() {},
      performance: {
        now() {
          return 0;
        },
      },
    },
    URLSearchParams,
  };
  context.globalThis = context;

  vm.runInNewContext(`${appJs}
globalThis.__ubaExport = {
  prototypeVariantState,
  renderAnimationOnlyMotionSlot,
  ubaLoaderGradientBlobAnimationOnly,
  altyMockupOtpCells,
  splashScreenAnimationOnly,
};`, context);

  return context.__ubaExport;
}

function buildSnippet(api, itemSpec) {
  if (itemSpec.slug === "otp-green" || itemSpec.slug === "securepass-green") {
    return `
      <div class="animation-only-scene animation-only-prototype alty-mockup-prototype animation-only-otp animation-only-${itemSpec.contextType}" role="group" aria-label="${escapeHtml(itemSpec.title)} animation only preview">
        <div class="animation-only-otp-slot is-green" aria-hidden="true">
          ${api.altyMockupOtpCells({ colorway: "green" })}
        </div>
      </div>
    `;
  }

  if (itemSpec.slug === "otp-error") {
    const digits = ["1", "2", "3", "5", "3", "3"];
    return `
      <div class="animation-only-scene animation-only-prototype alty-mockup-prototype animation-only-otp animation-only-otp-error" role="group" aria-label="Invalid code animation only preview">
        <div class="animation-only-otp-slot is-error" aria-hidden="true">
          <div class="alty-mock-otp-cells is-error" data-otp-error-cells>
            ${digits.map((digit, index) => `
              <span style="--otp-index:${index};">
                <b>${digit}</b>
              </span>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  if (itemSpec.slug === "uba-loader-gradient-blob-prototype") {
    return api.ubaLoaderGradientBlobAnimationOnly();
  }

  if (itemSpec.slug === "uba-splash-reveal") {
    return api.splashScreenAnimationOnly();
  }

  return api.renderAnimationOnlyMotionSlot(itemSpec.contextType, itemSpec.slug);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanOutput() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(SHARED_ASSETS_DIR, { recursive: true });
  fs.mkdirSync(SHARED_LOTTIE_DIR, { recursive: true });
}

function convertPngToWebp(source, destination) {
  execFileSync("cwebp", ["-quiet", "-q", "98", "-alpha_q", "100", source, "-o", destination]);
}

function copySharedAssets() {
  const sourceAssets = path.join(ROOT, "assets");
  const pngRasterDependencies = [
    "identity-user-bust.png",
    "identity-user-bust-red.png",
    "notification-bell-red.png",
    "search-magnifier-red.png",
    "uba-card-back.png",
    "uba-card-front.png",
  ];
  const directDependencies = [
    "confetti-lottie-data.js",
    "confetti-on-transparent-background.lottie",
    "identity-scanner-device.webp",
    "lottie-svg.min.js",
    "lottie-web-LICENSE.md",
    "uba-spinner-1.json",
    "uba-spinner-2.json",
    "uba-spinner-data.js",
  ];

  fs.cpSync(path.join(sourceAssets, "fonts"), path.join(SHARED_ASSETS_DIR, "fonts"), { recursive: true });

  pngRasterDependencies.forEach((fileName) => {
    convertPngToWebp(
      path.join(sourceAssets, fileName),
      path.join(SHARED_ASSETS_DIR, fileName.replace(/\.png$/i, ".webp")),
    );
  });

  directDependencies.forEach((fileName) => {
    fs.copyFileSync(path.join(sourceAssets, fileName), path.join(SHARED_ASSETS_DIR, fileName));
  });

  fs.copyFileSync(path.join(ROOT, "assets", "uba-spinner-1.json"), path.join(SHARED_LOTTIE_DIR, "uba-spinner-1.json"));
  fs.copyFileSync(path.join(ROOT, "assets", "uba-spinner-2.json"), path.join(SHARED_LOTTIE_DIR, "uba-spinner-2.json"));
  writeJson(path.join(SHARED_LOTTIE_DIR, "uploaded-confetti.json"), readWindowAssignedJson("confetti-lottie-data.js", "confettiLottieData"));
}

function readWindowAssignedJson(fileName, globalName) {
  const script = fs.readFileSync(path.join(ROOT, "assets", fileName), "utf8");
  const context = { window: {} };
  vm.runInNewContext(script, context);
  return context.window[globalName];
}

function writeSharedCss() {
  const css = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8")
    .replace(/\.png(?=["')])/g, ".webp");
  fs.writeFileSync(path.join(SHARED_DIR, "styles.css"), css);
}

function writePreviewRuntime() {
  const appJs = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const start = appJs.indexOf("function initUbaLottieSpinners()");
  const end = appJs.indexOf("function initPullZones()");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Could not locate preview runtime functions in app.js");
  }

  const runtimeFunctions = appJs.slice(start, end);
  const runtime = `let prototypeTheme = document.querySelector(".app-shell")?.dataset.prototypeTheme || "dark";
let ubaLottieSpinnerFrame = 0;
let ubaLottieOrganicId = 0;
let ubaIconLoopGeneration = 0;
let otpErrorHapticsGeneration = 0;
let successConfettiLottieInstances = [];

${runtimeFunctions}

window.addEventListener("DOMContentLoaded", () => {
  initUbaLottieSpinners();
  initSuccessConfettiLotties();
  initUbaIconLoopScenes();
});
`;
  fs.writeFileSync(path.join(SHARED_DIR, "preview-runtime.js"), runtime);
}

function rewriteSnippetAssetPaths(html) {
  return html
    .replace(/\.\/assets\/([^"')]+?)\.png/g, "../../shared/assets/$1.webp")
    .replace(/\.\/assets\/([^"')]+?)\.webp/g, "../../shared/assets/$1.webp")
    .replace(/\.\/assets\/([^"')]+?)\.json/g, "../../shared/assets/$1.json")
    .trim();
}

const sourcePageByContext = {
  almost: "account-opening-almost-there",
  "core-spinner-02": "core-spinners-02",
  failed: "couldnt-load-results",
  success: "account-opening-success",
  pull: "transaction-history-pull-refresh",
  biometrics: "enable-biometrics",
  searching: "searching-keyboard",
  identity: "identity-verification",
};

function getPreviewPageSlug(itemSpec) {
  return itemSpec.sourcePage || itemSpec.sourcePages?.[0] || sourcePageByContext[itemSpec.contextType] || itemSpec.slug;
}

function sourcePreviewHtml(itemSpec, snippet, themeName = "dark") {
  const theme = themeName === "light" ? "light" : "dark";
  const pageSlug = getPreviewPageSlug(itemSpec);
  const escapedTitle = escapeHtml(itemSpec.title);
  const escapedSlug = escapeHtml(itemSpec.slug);
  const escapedPageSlug = escapeHtml(pageSlug);
  const previewBackground = theme === "light" ? "#f5f5f4" : "#080907";
  const colorScheme = theme === "light" ? "light" : "dark";

  return `<!doctype html>
<html lang="en" data-prototype-theme="${theme}" data-animation-mode="only">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapedTitle}</title>
    <link rel="stylesheet" href="../../shared/styles.css">
    <style>
      :root { color-scheme: ${colorScheme}; }

      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        background: ${previewBackground};
      }

      .export-preview-shell {
        width: min(720px, 100vw);
        min-height: min(720px, 100vh);
        display: grid;
        place-items: center;
        overflow: visible;
      }

      .export-preview-shell .stage-band {
        width: min(620px, 96vw);
        min-height: min(620px, 96vh);
        overflow: visible;
      }

      .export-preview-shell[data-preview-motion-source="identity-bust-focus"] {
        min-height: min(760px, 100vh);
      }

      .export-preview-shell[data-preview-motion-source="identity-bust-focus"] .stage-band {
        min-height: min(700px, 96vh);
      }

      /* Code-entry mockups size themselves from the viewport (calc(100vw - 96px)).
         Inside a narrow preview frame that squeezes six 56px-tall cells into a
         fraction of their width, so they render as tall pills instead of cells.
         Pin them to the design width and scale the whole scene down instead. */
      .export-preview-shell .animation-only-otp.alty-mockup-prototype,
      .export-preview-shell .animation-only-securepass.alty-mockup-prototype,
      .export-preview-shell .animation-only-otp-slot {
        width: 361px;
        max-width: none;
      }

      @media (max-width: 460px) {
        .export-preview-shell .animation-only-otp.alty-mockup-prototype,
        .export-preview-shell .animation-only-securepass.alty-mockup-prototype {
          transform: scale(0.62);
          transform-origin: 50% 50%;
        }
      }
    </style>
  </head>
  <body>
    <div class="app-shell export-preview-shell" data-prototype-theme="${theme}" data-animation-mode="only" data-preview-motion-source="${escapedSlug}">
      <section class="stage-band" data-animation-only-page="${escapedPageSlug}">
${indent(snippet, 8)}
      </section>
    </div>
    <script src="../../shared/assets/lottie-svg.min.js"></script>
    <script src="../../shared/assets/confetti-lottie-data.js"></script>
    <script src="../../shared/assets/uba-spinner-data.js"></script>
    <script src="../../shared/preview-runtime.js"></script>
  </body>
</html>
`;
}

function indent(value, spaces) {
  const prefix = " ".repeat(spaces);
  return value.split("\n").map((line) => (line.trim() ? `${prefix}${line}` : line)).join("\n");
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function buildPreviewHtmlByTheme(prefix = "") {
  return Object.fromEntries(EXPORT_THEMES.map((theme) => [theme, `${prefix}preview-${theme}.html`]));
}

let cssAnalysisCache = null;

const genericSelectorClasses = new Set([
  "app-shell",
  "stage-band",
  "loader-scene",
  "prototype-motion-render",
  "animation-only-scene",
  "animation-only-prototype",
  "animation-only-motion-slot",
  "alty-mockup-prototype",
]);

function getCssAnalysis() {
  if (cssAnalysisCache) {
    return cssAnalysisCache;
  }

  const css = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");
  cssAnalysisCache = {
    blocks: extractCssBlocks(css),
    definedCustomProperties: extractDefinedCustomProperties(css),
    reducedMotionBlocks: extractReducedMotionBlocks(css),
  };

  return cssAnalysisCache;
}

function stripCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function extractCssBlocks(css) {
  const strippedCss = stripCssComments(css);
  const blocks = [];
  const blockPattern = /([^{}]+)\{([^{}]*)\}/g;
  let match;

  while ((match = blockPattern.exec(strippedCss))) {
    const selector = normalizeCssValue(match[1]);
    const declarations = match[2].trim();

    if (!selector || selector.startsWith("@") || isKeyframeSelector(selector)) {
      continue;
    }

    blocks.push({
      selector,
      declarations: normalizeCssValue(declarations),
      declarationMap: parseDeclarations(declarations),
    });
  }

  return blocks;
}

function extractReducedMotionBlocks(css) {
  const marker = "@media (prefers-reduced-motion: reduce)";
  const reducedBlocks = [];
  let searchIndex = 0;

  while (searchIndex < css.length) {
    const mediaIndex = css.indexOf(marker, searchIndex);
    if (mediaIndex === -1) {
      break;
    }

    const openBraceIndex = css.indexOf("{", mediaIndex);
    if (openBraceIndex === -1) {
      break;
    }

    const closeBraceIndex = findMatchingBrace(css, openBraceIndex);
    if (closeBraceIndex === -1) {
      break;
    }

    const mediaBody = css.slice(openBraceIndex + 1, closeBraceIndex);
    reducedBlocks.push(...extractCssBlocks(mediaBody));
    searchIndex = closeBraceIndex + 1;
  }

  return reducedBlocks;
}

function findMatchingBrace(value, openBraceIndex) {
  let depth = 0;

  for (let index = openBraceIndex; index < value.length; index += 1) {
    if (value[index] === "{") {
      depth += 1;
    } else if (value[index] === "}") {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}

function isKeyframeSelector(selector) {
  return selector === "from"
    || selector === "to"
    || /^[\d.,%\s]+$/.test(selector)
    || selector.includes("@keyframes");
}

function parseDeclarations(declarations) {
  return declarations
    .split(";")
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .reduce((map, declaration) => {
      const colonIndex = declaration.indexOf(":");
      if (colonIndex === -1) {
        return map;
      }

      const property = declaration.slice(0, colonIndex).trim();
      const value = normalizeCssValue(declaration.slice(colonIndex + 1));
      if (property && value) {
        map[property] = value;
      }
      return map;
    }, {});
}

function normalizeCssValue(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function extractDefinedCustomProperties(css) {
  return new Set(Array.from(css.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g), (match) => match[1]));
}

function extractItemCssDetails(itemSpec, snippet) {
  const cssAnalysis = getCssAnalysis();
  const classNames = extractClassNames(snippet);
  const blocks = cssAnalysis.blocks.filter((block) => selectorMatchesItem(block.selector, itemSpec, classNames));
  const reducedMotionBlocks = cssAnalysis.reducedMotionBlocks.filter((block) =>
    selectorMatchesItem(block.selector, itemSpec, classNames)
  );
  const cssVariables = extractCssVariables(blocks);
  const inlineCustomProperties = extractInlineCustomProperties(snippet);
  const customProperties = extractCustomPropertyUsage(blocks, snippet, inlineCustomProperties, cssAnalysis.definedCustomProperties);
  const animationTracks = dedupeObjects(blocks.flatMap((block) => extractAnimationTracks(block, cssVariables)));

  return {
    blocks,
    reducedMotionBlocks,
    cssVariables,
    inlineCustomProperties,
    customProperties,
    animationTracks,
  };
}

function extractClassNames(html) {
  const classNames = new Set();
  for (const match of html.matchAll(/\bclass="([^"]+)"/g)) {
    match[1]
      .split(/\s+/)
      .map((className) => className.trim())
      .filter(Boolean)
      .forEach((className) => classNames.add(className));
  }
  return classNames;
}

function selectorMatchesItem(selector, itemSpec, classNames) {
  return splitCssList(selector).some((selectorPart) => selectorPartMatchesItem(selectorPart, itemSpec, classNames));
}

function selectorPartMatchesItem(selector, itemSpec, classNames) {
  if (selectorDataAttributeMatchesItem(selector, itemSpec.slug)) {
    return true;
  }

  const selectorClasses = Array.from(selector.matchAll(/\.([_a-zA-Z][-_a-zA-Z0-9]*)/g), (match) => match[1])
    .filter((className) => !genericSelectorClasses.has(className));

  return selectorClasses.length > 0 && selectorClasses.every((className) => classNames.has(className));
}

function selectorDataAttributeMatchesItem(selector, slug) {
  for (const match of selector.matchAll(/\[(data-[a-zA-Z0-9-]+)([*^$|~]?=)"([^"]+)"\]/g)) {
    const [, attributeName, operator, value] = match;
    if (!["data-motion-source", "data-preview-motion-source"].includes(attributeName)) {
      continue;
    }

    if (operator === "=" && value === slug) {
      return true;
    }
    if (operator === "^=" && slug.startsWith(value)) {
      return true;
    }
    if (operator === "$=" && slug.endsWith(value)) {
      return true;
    }
    if (operator === "*=" && slug.includes(value)) {
      return true;
    }
  }

  return false;
}

function extractCssVariables(blocks) {
  const variables = { default: {}, light: {} };

  blocks.forEach((block) => {
    const themeKey = block.selector.includes('data-prototype-theme="light"') ? "light" : "default";

    Object.entries(block.declarationMap).forEach(([property, value]) => {
      if (!property.startsWith("--")) {
        return;
      }

      if (!variables[themeKey][property]) {
        variables[themeKey][property] = [];
      }
      variables[themeKey][property].push(value);
    });
  });

  return pruneEmptyObject({
    default: collapseValueArrays(variables.default),
    light: collapseValueArrays(variables.light),
  });
}

function collapseValueArrays(valuesByKey) {
  return Object.fromEntries(
    Object.entries(valuesByKey).map(([key, values]) => [key, Array.from(new Set(values))]),
  );
}

function extractInlineCustomProperties(html) {
  const properties = {};

  for (const match of html.matchAll(/\bstyle="([^"]+)"/g)) {
    const declarations = parseDeclarations(match[1]);
    Object.entries(declarations).forEach(([property, value]) => {
      if (!property.startsWith("--")) {
        return;
      }

      if (!properties[property]) {
        properties[property] = [];
      }
      properties[property].push(value);
    });
  }

  return collapseValueArrays(properties);
}

function extractCustomPropertyUsage(blocks, snippet, inlineCustomProperties, globallyDefinedCustomProperties) {
  const cssText = `${blocks.map((block) => block.declarations).join("\n")}\n${snippet}`;
  const referenced = unique(Array.from(cssText.matchAll(/var\((--[a-zA-Z0-9-]+)/g), (match) => match[1]));
  const definedInMatchedCss = new Set(
    blocks.flatMap((block) =>
      Object.keys(block.declarationMap).filter((property) => property.startsWith("--")),
    ),
  );
  const definedInline = new Set(Object.keys(inlineCustomProperties));
  const runtimeRequired = referenced.filter((property) =>
    !definedInMatchedCss.has(property)
      && !definedInline.has(property)
      && !globallyDefinedCustomProperties.has(property)
  );

  return pruneEmptyObject({
    referenced,
    definedInMatchedCss: Array.from(definedInMatchedCss).sort(),
    definedInline: Array.from(definedInline).sort(),
    runtimeRequired: runtimeRequired.sort(),
  });
}

function extractAnimationTracks(block, cssVariables) {
  const tracks = [];
  const map = block.declarationMap;

  if (map.animation && map.animation !== "none") {
    splitCssList(map.animation).forEach((animationValue) => {
      const parsed = parseAnimationShorthand(animationValue);
      if (parsed.name && parsed.name !== "none") {
        tracks.push(buildAnimationTrack(block.selector, parsed, cssVariables, animationValue));
      }
    });
  }

  if (map["animation-name"] && map["animation-name"] !== "none") {
    const parsed = {
      name: map["animation-name"],
      duration: map["animation-duration"],
      easing: map["animation-timing-function"],
      delay: map["animation-delay"],
      iterationCount: map["animation-iteration-count"],
      fillMode: map["animation-fill-mode"],
      direction: map["animation-direction"],
    };
    tracks.push(buildAnimationTrack(block.selector, parsed, cssVariables, null));
  }

  return tracks.filter((track) => track.name && track.name !== "none");
}

function buildAnimationTrack(selector, parsed, cssVariables, raw) {
  const durationMs = resolveCssTimeToMs(parsed.duration, cssVariables);
  const delayMs = resolveCssTimeToMs(parsed.delay, cssVariables);

  return pruneEmptyObject({
    selector,
    name: parsed.name,
    duration: parsed.duration,
    durationMs,
    delay: parsed.delay,
    delayMs,
    totalMs: durationMs === null && delayMs === null ? null : (durationMs || 0) + (delayMs || 0),
    easing: parsed.easing,
    iterationCount: parsed.iterationCount,
    fillMode: parsed.fillMode,
    direction: parsed.direction,
    raw: raw ? normalizeCssValue(raw) : undefined,
  });
}

function parseAnimationShorthand(value) {
  const tokens = tokenizeCssValue(value);
  const parsed = {};

  tokens.forEach((token) => {
    if (isTimeLikeToken(token)) {
      if (!parsed.duration) {
        parsed.duration = token;
      } else if (!parsed.delay) {
        parsed.delay = token;
      }
      return;
    }

    if (isEasingToken(token)) {
      parsed.easing = token;
      return;
    }

    if (token === "infinite" || /^\d+(?:\.\d+)?$/.test(token)) {
      parsed.iterationCount = token;
      return;
    }

    if (["none", "forwards", "backwards", "both"].includes(token)) {
      parsed.fillMode = token;
      return;
    }

    if (["normal", "reverse", "alternate", "alternate-reverse"].includes(token)) {
      parsed.direction = token;
      return;
    }

    if (["running", "paused"].includes(token)) {
      parsed.playState = token;
      return;
    }

    if (!parsed.name) {
      parsed.name = token;
    }
  });

  return parsed;
}

function tokenizeCssValue(value) {
  return String(value).match(/(?:cubic-bezier\([^)]*\)|steps\([^)]*\)|var\([^)]*\)|calc\([^)]*\)|[^\s]+)/g) || [];
}

function splitCssList(value) {
  const items = [];
  let current = "";
  let depth = 0;

  for (const character of String(value)) {
    if (character === "(") {
      depth += 1;
    } else if (character === ")") {
      depth = Math.max(0, depth - 1);
    }

    if (character === "," && depth === 0) {
      items.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }

  if (current.trim()) {
    items.push(current.trim());
  }

  return items;
}

function isTimeLikeToken(token) {
  return /^(?:\d*\.?\d+|\.\d+)(?:ms|s)$/.test(token)
    || /^var\(--[a-zA-Z0-9-]+/.test(token)
    || /^calc\(/.test(token);
}

function isEasingToken(token) {
  return token === "linear"
    || token === "ease"
    || token === "ease-in"
    || token === "ease-out"
    || token === "ease-in-out"
    || token.startsWith("cubic-bezier(")
    || token.startsWith("steps(");
}

function resolveCssTimeToMs(value, cssVariables, seen = new Set()) {
  if (!value) {
    return null;
  }

  const normalizedValue = normalizeCssValue(value);
  const timeMatch = normalizedValue.match(/^(-?\d*\.?\d+|-?\.\d+)(ms|s)$/);
  if (timeMatch) {
    const number = Number(timeMatch[1]);
    return timeMatch[2] === "s" ? number * 1000 : number;
  }

  const variableMatch = normalizedValue.match(/^var\((--[a-zA-Z0-9-]+)(?:,\s*([^)]+))?\)$/);
  if (variableMatch) {
    const [, variableName, fallback] = variableMatch;
    if (seen.has(variableName)) {
      return null;
    }
    seen.add(variableName);

    const variableValue = getCssVariableValue(variableName, cssVariables) || fallback;
    return variableValue ? resolveCssTimeToMs(variableValue, cssVariables, seen) : null;
  }

  const calcMatch = normalizedValue.match(/^calc\((.+)\)$/);
  if (calcMatch) {
    return resolveCalcTimeToMs(calcMatch[1], cssVariables);
  }

  return null;
}

function getCssVariableValue(variableName, cssVariables) {
  const defaultValues = cssVariables.default?.[variableName];
  const lightValues = cssVariables.light?.[variableName];
  const values = defaultValues || lightValues;
  return Array.isArray(values) ? values.at(-1) : values;
}

function resolveCalcTimeToMs(expression, cssVariables) {
  const terms = expression.match(/[+-]?\s*(?:var\([^)]*\)|(?:\d*\.?\d+|\.\d+)(?:ms|s))/g);
  if (!terms?.length) {
    return null;
  }

  return terms.reduce((total, term) => {
    const sign = term.trim().startsWith("-") ? -1 : 1;
    const cleanTerm = term.replace(/^[+-]\s*/, "").trim();
    const value = resolveCssTimeToMs(cleanTerm, cssVariables);
    return value === null ? total : total + sign * value;
  }, 0);
}

function readLottieSpec(itemSpec) {
  if (!itemSpec.sourceLottie) {
    return null;
  }

  const lottiePath = path.join(OUT_DIR, itemSpec.sourceLottie);
  if (!fs.existsSync(lottiePath)) {
    return {
      source: itemSpec.sourceLottie,
      status: "missing",
    };
  }

  const data = JSON.parse(fs.readFileSync(lottiePath, "utf8"));
  const inFrame = Number(data.ip) || 0;
  const outFrame = Number(data.op) || 0;
  const frameRate = Number(data.fr) || null;
  const durationMs = frameRate ? ((outFrame - inFrame) / frameRate) * 1000 : null;

  return pruneEmptyObject({
    source: itemSpec.sourceLottie,
    version: data.v,
    width: Number(data.w) || null,
    height: Number(data.h) || null,
    frameRate,
    inFrame,
    outFrame,
    durationMs,
    layerCount: Array.isArray(data.layers) ? data.layers.length : null,
  });
}

function buildMotionMetadata(groupSpec, itemSpec, snippet) {
  const cssDetails = extractItemCssDetails(itemSpec, snippet);
  const lottie = readLottieSpec(itemSpec);
  const scriptedMotion = scriptedMotionBySlug[itemSpec.slug] || null;
  const playback = buildPlaybackSpec(itemSpec, snippet, cssDetails, lottie, scriptedMotion);
  const duration = buildDurationSpec(itemSpec, cssDetails, lottie, playback, scriptedMotion);
  const folderId = `${groupSpec.folder}/${itemSpec.folder}`;

  return {
    metadataSchemaVersion: METADATA_SCHEMA_VERSION,
    canonicalAssetId: itemSpec.slug,
    folderId,
    themeSupport: buildThemeSupportSpec(folderId),
    duration,
    fps: buildFpsSpec(itemSpec, lottie),
    playback,
    canvas: buildCanvasSpec(snippet, cssDetails, lottie),
    easing: buildEasingSpec(cssDetails, scriptedMotion),
    colors: buildColorSpec(snippet, cssDetails),
    visualElements: buildVisualElementSpec(snippet, cssDetails),
    reducedMotion: buildReducedMotionSpec(cssDetails),
    runtimeInputs: buildRuntimeInputSpec(snippet, cssDetails, scriptedMotion),
  };
}

function buildThemeSupportSpec(folderId) {
  return {
    themes: EXPORT_THEMES,
    defaultTheme: "dark",
    previewHtml: buildPreviewHtmlByTheme(`${folderId}/`),
    sourceWrapper: "Each preview wraps source.html with .app-shell[data-prototype-theme], matching the original prototype theme switch.",
  };
}

function buildDurationSpec(itemSpec, cssDetails, lottie, playback, scriptedMotion) {
  const cssTotals = cssDetails.animationTracks
    .map((track) => track.totalMs)
    .filter((value) => typeof value === "number" && Number.isFinite(value));
  const cssMaxMs = cssTotals.length ? Math.max(...cssTotals) : null;
  const lottieForwardMs = lottie?.durationMs ?? null;
  const loopPeriodMs = playback.mode === "ping-pong-loop" && lottieForwardMs ? lottieForwardMs * 2 : null;
  const scriptedMs = scriptedMotion?.demoMs ?? null;
  const demoMs = maxNullable([cssMaxMs, loopPeriodMs, lottieForwardMs, scriptedMs]);

  return pruneEmptyObject({
    demoMs,
    intendedMs: itemSpec.intendedDurationMs,
    cssMaxTrackMs: cssMaxMs,
    lottieForwardMs,
    loopPeriodMs,
    scriptedMs,
    note: itemSpec.intendedDurationMs === null
      ? "Demo timing is extracted from the prototype; product timing still needs explicit sign-off."
      : undefined,
    source: scriptedMotion
      ? "Extracted from preview runtime constants."
      : "Extracted from matched CSS animation declarations and Lottie header data.",
  });
}

function buildFpsSpec(itemSpec, lottie) {
  return pruneEmptyObject({
    target: itemSpec.targetFps,
    source: lottie?.frameRate,
    sourceMismatch: lottie?.frameRate && lottie.frameRate !== itemSpec.targetFps
      ? `Source Lottie is ${lottie.frameRate}fps; mobile target is ${itemSpec.targetFps}fps.`
      : undefined,
  });
}

function buildPlaybackSpec(itemSpec, snippet, cssDetails, lottie, scriptedMotion) {
  if (scriptedMotion) {
    return pruneEmptyObject({
      mode: scriptedMotion.mode,
      inFrame: scriptedMotion.inFrame,
      outFrame: scriptedMotion.outFrame,
      loop: scriptedMotion.loop,
      direction: scriptedMotion.direction,
      source: scriptedMotion.source,
    });
  }

  const lottieMode = snippet.includes("data-uba-lottie-spinner")
    ? extractAttribute(snippet, "data-uba-lottie-mode") || "pingpong"
    : null;
  const hasDelayedConfetti = snippet.includes("data-success-confetti-lottie");
  const hasInfiniteCss = cssDetails.animationTracks.some((track) => track.iterationCount === "infinite");
  const hasOneShotCss = cssDetails.animationTracks.some((track) =>
    track.iterationCount === "1" || ["forwards", "both"].includes(track.fillMode)
  );
  const hasNonFallbackCssMotion = cssDetails.animationTracks.some((track) =>
    track.name !== "rotate" && !track.selector.includes(".uba-lottie-fallback")
  );

  let mode = "static-or-scripted";
  if (lottieMode === "pingpong" && hasNonFallbackCssMotion) {
    mode = "composite-loop";
  } else if (lottieMode === "pingpong") {
    mode = "ping-pong-loop";
  } else if (lottieMode === "circle-resolve" || lottieMode === "forward-hold") {
    mode = "play-once-hold";
  } else if (hasDelayedConfetti) {
    mode = "composite-delayed-play-once";
  } else if (hasInfiniteCss) {
    mode = "loop";
  } else if (hasOneShotCss) {
    mode = "play-once-hold";
  }

  const inFrame = lottie?.inFrame ?? 0;
  const outFrame = lottie?.outFrame
    ?? (cssDetails.animationTracks.length
      ? Math.round((maxNullable(cssDetails.animationTracks.map((track) => track.totalMs)) || 0) / 1000 * itemSpec.targetFps)
      : null);

  return pruneEmptyObject({
    mode,
    sourceRuntimeMode: lottieMode,
    lottieResult: extractAttribute(snippet, "data-uba-lottie-result"),
    inFrame,
    outFrame,
    holdFrame: ["play-once-hold", "composite-delayed-play-once"].includes(mode) ? outFrame : undefined,
    loop: ["loop", "ping-pong-loop", "composite-loop"].includes(mode),
    direction: mode === "ping-pong-loop" ? "forward-then-reverse" : mode === "composite-loop" ? "mixed" : "forward",
    confettiDelayMs: extractNumberAttribute(snippet, "data-success-confetti-delay-ms"),
    confettiStartFrame: extractNumberAttribute(snippet, "data-success-confetti-start-frame"),
    source: lottieMode
      ? "data-uba-lottie-mode plus preview-runtime.js"
      : "CSS animation declarations",
  });
}

function buildCanvasSpec(snippet, cssDetails, lottie) {
  const viewBoxes = extractSvgViewBoxes(snippet);
  const cssStage = cssDetails.blocks
    .map((block) => {
      const dimensions = pickProperties(block.declarationMap, [
        "width",
        "height",
        "min-width",
        "min-height",
        "max-width",
        "max-height",
        "aspect-ratio",
        "inset",
      ]);

      return Object.keys(dimensions).length ? { selector: block.selector, ...dimensions } : null;
    })
    .filter(Boolean)
    .slice(0, 12);

  return pruneEmptyObject({
    sourceLottie: lottie ? pickProperties(lottie, ["width", "height", "source"]) : undefined,
    svgViewBoxes: viewBoxes,
    cssStage,
  });
}

function buildEasingSpec(cssDetails, scriptedMotion) {
  const values = unique([
    ...cssDetails.animationTracks.map((track) => track.easing).filter(Boolean),
    ...(scriptedMotion?.easing || []),
  ]);
  const cubicBezierValues = values.filter((value) => value.startsWith("cubic-bezier("));
  const namedValues = values.filter((value) => !value.startsWith("cubic-bezier("));

  return pruneEmptyObject({
    values,
    cubicBezierValues,
    namedValues,
    note: cubicBezierValues.length > 6
      ? "This animation set still has many near-duplicate cubic-bezier curves; consolidate before hand-entry."
      : undefined,
  });
}

function buildColorSpec(snippet, cssDetails) {
  const defaultBlocks = cssDetails.blocks.filter((block) => !block.selector.includes('data-prototype-theme="light"'));
  const lightBlocks = cssDetails.blocks.filter((block) => block.selector.includes('data-prototype-theme="light"'));

  return pruneEmptyObject({
    inline: extractColorsFromText(snippet),
    cssDefault: extractColorsFromText(defaultBlocks.map((block) => block.declarations).join("\n")),
    cssLightOverrides: extractColorsFromText(lightBlocks.map((block) => block.declarations).join("\n")),
    cssVariables: cssDetails.cssVariables,
  });
}

function buildReducedMotionSpec(cssDetails) {
  return pruneEmptyObject({
    globalFallback: {
      animationDuration: "0.001ms",
      animationIterationCount: "1",
      transitionDuration: "0.001ms",
      source: "styles.css @media (prefers-reduced-motion: reduce)",
    },
    specificOverrides: cssDetails.reducedMotionBlocks.map((block) => ({
      selector: block.selector,
      declarations: block.declarationMap,
    })),
  });
}

function buildRuntimeInputSpec(snippet, cssDetails, scriptedMotion) {
  return pruneEmptyObject({
    dataAttributes: extractDataAttributes(snippet),
    customProperties: cssDetails.customProperties,
    cssAnimationTracks: cssDetails.animationTracks,
    scriptedMotion,
  });
}

function buildVisualElementSpec(snippet, cssDetails) {
  const confettiPieces = extractConfettiPieces(snippet);
  const starPieces = extractStarPieces(snippet);

  return pruneEmptyObject({
    confettiScatter: confettiPieces.length
      ? {
          count: confettiPieces.length,
          fieldSelector: ".success-confetti-field",
          fieldInset: getCssProperty(cssDetails, ".success-confetti-field", "inset"),
          coordinateSpace: "CSS pixel offsets from the center of .success-confetti-field. Each piece starts at left/top 50% with translate(-50%, -50%), then keyframes add x/y offsets.",
          pieces: confettiPieces,
        }
      : undefined,
    starSprinkle: starPieces.length
      ? {
          count: starPieces.length,
          fieldSelector: ".success-star-field",
          fieldInset: getCssProperty(cssDetails, ".success-star-field", "inset"),
          coordinateSpace: "CSS pixel offsets from the center of .success-star-field. Each star starts at left/top 50% with translate(-50%, -50%), then keyframes add x/y offsets.",
          pieces: starPieces,
        }
      : undefined,
  });
}

function extractConfettiPieces(snippet) {
  return extractSpanStyleRecords(snippet, "success-confetti")
    .map(({ classes, styles }, index) => {
      const shapeClass = classes.find((className) => className.startsWith("success-confetti-") && className !== "success-confetti");
      const colorToken = extractCssVariableName(styles["--confetti-color"]);

      return pruneEmptyObject({
        index,
        shape: shapeClass ? shapeClass.replace("success-confetti-", "") : undefined,
        xPx: parseCssPx(styles["--confetti-x"]),
        yPx: parseCssPx(styles["--confetti-y"]),
        widthPx: parseCssPx(styles["--confetti-w"]),
        heightPx: parseCssPx(styles["--confetti-h"]),
        colorToken,
        tone: colorToken?.replace("--success-confetti-", ""),
        rotateDeg: parseCssDeg(styles["--confetti-rotate"]),
        driftPx: parseCssPx(styles["--confetti-drift"]),
        delayMs: parseCssMs(styles["--confetti-delay"]),
      });
    });
}

function extractStarPieces(snippet) {
  return extractSpanStyleRecords(snippet, "success-star")
    .map(({ styles }, index) => {
      const colorToken = extractCssVariableName(styles["--star-color"]);

      return pruneEmptyObject({
        index,
        shape: "four-point-star",
        xPx: parseCssPx(styles["--star-x"]),
        yPx: parseCssPx(styles["--star-y"]),
        sizePx: parseCssPx(styles["--star-size"]),
        colorToken,
        tone: colorToken?.replace("--success-star-", ""),
        rotateDeg: parseCssDeg(styles["--star-rotate"]),
        delayMs: parseCssMs(styles["--star-delay"]),
      });
    });
}

function extractSpanStyleRecords(snippet, requiredClass) {
  const records = [];

  for (const match of snippet.matchAll(/<span\b([^>]*)>/g)) {
    const attributes = match[1];
    const classMatch = attributes.match(/\bclass="([^"]*)"/);
    const classes = classMatch?.[1]?.split(/\s+/).filter(Boolean) || [];
    if (!classes.includes(requiredClass)) {
      continue;
    }

    const styleMatch = attributes.match(/\bstyle="([^"]*)"/);
    records.push({
      classes,
      styles: parseDeclarations(styleMatch?.[1] || ""),
    });
  }

  return records;
}

function getCssProperty(cssDetails, selector, property) {
  return cssDetails.blocks.find((block) => block.selector === selector)?.declarationMap[property];
}

function extractCssVariableName(value) {
  const match = String(value || "").match(/var\((--[a-zA-Z0-9-]+)/);
  return match?.[1] || undefined;
}

function parseCssPx(value) {
  const match = String(value || "").match(/^(-?\d*\.?\d+)px$/);
  return match ? Number(match[1]) : undefined;
}

function parseCssDeg(value) {
  const match = String(value || "").match(/^(-?\d*\.?\d+)deg$/);
  return match ? Number(match[1]) : undefined;
}

function parseCssMs(value) {
  const text = String(value || "");
  const match = text.match(/^(-?\d*\.?\d+)(ms|s)$/);
  if (!match) {
    return undefined;
  }
  return match[2] === "s" ? Number(match[1]) * 1000 : Number(match[1]);
}

function extractAttribute(html, attributeName) {
  const match = html.match(new RegExp(`\\b${attributeName}="([^"]+)"`));
  return match?.[1] || null;
}

function extractNumberAttribute(html, attributeName) {
  const value = extractAttribute(html, attributeName);
  return value === null ? null : Number(value);
}

function extractDataAttributes(html) {
  const attributes = {};
  for (const match of html.matchAll(/\b(data-[a-zA-Z0-9-]+)(?:="([^"]*)")?/g)) {
    const [, attribute, value = ""] = match;
    if (!attributes[attribute]) {
      attributes[attribute] = [];
    }
    attributes[attribute].push(value);
  }
  return collapseValueArrays(attributes);
}

function extractSvgViewBoxes(html) {
  return unique(Array.from(html.matchAll(/\bviewBox="([^"]+)"/g), (match) => {
    const parts = match[1].trim().split(/\s+/).map(Number);
    const [, , width, height] = parts;
    return Number.isFinite(width) && Number.isFinite(height)
      ? { value: match[1], width, height, unit: "svg user units" }
      : { value: match[1] };
  }), (value) => JSON.stringify(value));
}

function extractColorsFromText(value) {
  const text = String(value);
  const colors = [
    ...Array.from(text.matchAll(/#[0-9a-fA-F]{3,8}\b/g), (match) => match[0]),
    ...Array.from(text.matchAll(/\brgba?\([^)]*\)/g), (match) => normalizeCssValue(match[0])),
    ...Array.from(text.matchAll(/\bhsla?\([^)]*\)/g), (match) => normalizeCssValue(match[0])),
    ...Array.from(text.matchAll(/\b(currentColor|transparent)\b/g), (match) => match[1]),
  ];

  return unique(colors).sort();
}

function copyReferenceRecordings(itemSpec, itemDir) {
  const recordingSpecs = getReferenceRecordingSpecs(itemSpec);
  const copied = [];
  const missing = [];

  recordingSpecs.forEach((recordingSpec) => {
    RECORDING_THEMES.forEach((theme) => {
      const fileName = `${recordingSpec.basename}-${theme}.webm`;
      const sourcePath = path.join(RECORDINGS_DIR, fileName);
      if (!fs.existsSync(sourcePath)) {
        missing.push({
          theme,
          source: path.relative(ROOT, sourcePath),
          match: recordingSpec.match,
        });
        return;
      }

      const relativeFile = path.join("reference-recordings", fileName);
      const destinationPath = path.join(itemDir, relativeFile);
      fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
      fs.copyFileSync(sourcePath, destinationPath);
      copied.push({
        theme,
        file: relativeFile,
        source: path.relative(ROOT, sourcePath),
        match: recordingSpec.match,
      });
    });
  });

  return pruneEmptyObject({
    copied,
    missing,
    note: copied.length
      ? undefined
      : "No matching dark/light recording was found in prototype-recordings for this exported variant.",
  });
}

function getReferenceRecordingSpecs(itemSpec) {
  const explicitSpecs = referenceRecordingsBySlug[itemSpec.slug] || [];
  if (explicitSpecs.length) {
    return explicitSpecs;
  }

  if (!fs.existsSync(RECORDINGS_DIR)) {
    return [];
  }

  const exactBases = fs.readdirSync(RECORDINGS_DIR)
    .filter((fileName) => fileName.endsWith(".webm"))
    .map((fileName) => fileName.replace(/-(dark|light)\.webm$/i, ""))
    .filter((basename) => basename.endsWith(itemSpec.slug));

  return unique(exactBases).map((basename) => recording(basename, "auto filename match"));
}

function pickProperties(source, keys) {
  return keys.reduce((picked, key) => {
    if (source?.[key] !== undefined && source[key] !== null) {
      picked[key] = source[key];
    }
    return picked;
  }, {});
}

function maxNullable(values) {
  const finiteValues = values.filter((value) => typeof value === "number" && Number.isFinite(value));
  return finiteValues.length ? Math.max(...finiteValues) : null;
}

function pruneEmptyObject(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (entry === undefined || entry === null) {
        return false;
      }
      if (Array.isArray(entry)) {
        return entry.length > 0;
      }
      if (typeof entry === "object") {
        return Object.keys(entry).length > 0;
      }
      return true;
    }),
  );
}

function unique(values, keyFn = (value) => value) {
  const seen = new Set();
  const result = [];

  values.forEach((value) => {
    const key = keyFn(value);
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    result.push(value);
  });

  return result;
}

function dedupeObjects(values) {
  return unique(values, (value) => JSON.stringify(value));
}

function writeItem(groupSpec, itemSpec, snippet) {
  const itemDir = path.join(OUT_DIR, groupSpec.folder, itemSpec.folder);
  fs.mkdirSync(itemDir, { recursive: true });

  fs.writeFileSync(path.join(itemDir, "source.html"), `${snippet}\n`);
  EXPORT_THEMES.forEach((theme) => {
    fs.writeFileSync(path.join(itemDir, `preview-${theme}.html`), sourcePreviewHtml(itemSpec, snippet, theme));
  });
  fs.writeFileSync(path.join(itemDir, "preview.html"), sourcePreviewHtml(itemSpec, snippet, "dark"));
  const referenceRecordings = copyReferenceRecordings(itemSpec, itemDir);
  const motionMetadata = buildMotionMetadata(groupSpec, itemSpec, snippet);
  const metadata = {
    ...motionMetadata,
    title: itemSpec.title,
    slug: itemSpec.slug,
    sourcePage: getPreviewPageSlug(itemSpec),
    sourcePages: itemSpec.sourcePages,
    navbarGroup: groupSpec.title,
    recommendedFormat: itemSpec.recommendedFormat,
    sourceKind: itemSpec.sourceKind,
    sourceLottie: itemSpec.sourceLottie,
    rasterAssets: itemSpec.rasterAssets,
    implementationNote: itemSpec.implementationNote,
    sharedCss: "shared/styles.css",
    previewRuntime: "shared/preview-runtime.js",
    previewHtmlByTheme: buildPreviewHtmlByTheme(),
    sourceLottieMetadata: readLottieSpec(itemSpec) || undefined,
    referenceRecordings,
  };
  writeJson(path.join(itemDir, "metadata.json"), metadata);
  return metadata;
}

function writeReadme(total) {
  const readme = `# Mobile Animation Export

This is a source-preserving export of the current "Show only animation" gallery.

The previous approximation-based Lottie export was intentionally replaced. These folders keep the real HTML/SVG/CSS/keyframe sources and existing Lottie data so iOS and Android animations can be rebuilt precisely.

- Use Lottie where the source is already Lottie or simple SVG/CSS timing.
- Use Rive for gesture/state-heavy motion such as pull-to-refresh, code entry, and page transitions.
- WebP is included only as a source asset dependency for image-based pieces, not as frame-sequence fallback.
- Open \`preview-dark.html\` or \`preview-light.html\` in any package to inspect the exact web source animation in each supported theme. \`preview.html\` is kept as a dark-theme compatibility alias.
- Treat each \`metadata.json\` as the implementation contract: it now includes canonical asset id, supported themes, demo timing, intended timing placeholder, fps, playback mode, in/out frames, canvas/artboard data, easing, colors, exact particle/star geometry where used, runtime CSS inputs, reduced-motion behavior, and copied reference recordings where available.

Generated animations: ${total}
Generated by: \`scripts/export-mobile-animation-sources.mjs\`
`;
  fs.writeFileSync(path.join(OUT_DIR, "README.md"), readme);
}

function writeImplementationPlan() {
  const plan = `# Implementation Plan

Use this export as the visual source of truth.

## Convert to Lottie

Good candidates:
- Existing Lottie sources in \`shared/lottie/\`
- SVG-only loaders and feedback marks
- One-shot line, check, X, badge, ring, confetti scatter, and star sprinkle animations

For these, map SVG paths and CSS keyframes directly into Lottie shape layers. Do not simplify shapes by eye.

## Theme Coverage

Every animation package includes both \`preview-dark.html\` and \`preview-light.html\`. Build and QA both themes when the app surface supports light mode.

## Particle Geometry

For hand-built embellishments such as confetti scatter and star sprinkle, use the \`visualElements\` section in each \`metadata.json\`. Those arrays are the exact source coordinates, sizes, colors, rotation, drift, and delay values from the prototype.

## Rebuild in Rive

Best candidates:
- Pull-to-refresh
- Code entry success/error
- Page transitions
- 3D-feeling card, coin, and scanner motion

These contain state, gesture, sequencing, or transform-heavy behavior that Rive handles better than Lottie on iOS and Android.

## WebP Policy

WebP files in \`shared/assets/\` are source textures only. They are included because those visuals come from raster images in the original gallery:
- card front/back
- red search magnifier
- scanner device
- identity user bust

Do not export CSS/SVG animations as WebP frame sequences unless a mobile platform limitation forces a deliberate exception.
`;
  fs.writeFileSync(path.join(OUT_DIR, "IMPLEMENTATION_PLAN.md"), plan);
}

function galleryItemHtml(groupSpec, itemSpec) {
  const folder = `${groupSpec.folder}/${itemSpec.folder}`;
  return `      <figure class="card">
        <div class="frame" data-motion-source="${escapeHtml(itemSpec.slug)}" data-src="${folder}/preview-dark.html" data-src-dark="${folder}/preview-dark.html" data-src-light="${folder}/preview-light.html">
          <button class="replay" type="button" title="Replay">&#8635;</button>
        </div>
        <figcaption>
          <strong>${escapeHtml(itemSpec.title)}</strong>
          <span class="meta">${escapeHtml(itemSpec.sourceKind)} &middot; ${escapeHtml(itemSpec.recommendedFormat)}</span>
          <span class="slug">${escapeHtml(itemSpec.slug)}</span>
          <span class="preview-links">
            <a class="open" href="${folder}/preview-dark.html" target="_blank">dark &rarr;</a>
            <a class="open" href="${folder}/preview-light.html" target="_blank">light &rarr;</a>
          </span>
        </figcaption>
      </figure>`;
}

function writeGallery(total) {
  const nav = animationGroups
    .map((groupSpec) => `<a href="#${groupSpec.folder}">${escapeHtml(groupSpec.title)} <span>${groupSpec.items.length}</span></a>`)
    .join("");
  const groups = animationGroups
    .map((groupSpec) => `    <section class="group" id="${groupSpec.folder}">
      <h2>${escapeHtml(groupSpec.title)}<span class="count">${groupSpec.items.length}</span></h2>
      <div class="grid">
${groupSpec.items.map((itemSpec) => galleryItemHtml(groupSpec, itemSpec)).join("\n")}
      </div>
    </section>`)
    .join("\n");
  const gallery = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>UBA Mobile Animation Gallery</title>
<style>
  :root { color-scheme: dark; }
  :root[data-gallery-theme="light"] { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #050605;
    color: #f2f3f1;
    font: 15px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  :root[data-gallery-theme="light"] body {
    background: #f5f5f4;
    color: #171717;
  }
  header {
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 18px 28px 14px;
    background: rgba(5, 6, 5, 0.94);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #1c1e1c;
  }
  :root[data-gallery-theme="light"] header {
    background: rgba(245, 245, 244, 0.94);
    border-bottom-color: #dededb;
  }
  .header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  h1 {
    margin: 0 0 4px;
    font-size: 19px;
  }
  .sub {
    color: #8b908a;
    font-size: 13px;
  }
  :root[data-gallery-theme="light"] .sub {
    color: #666b64;
  }
  .theme-switch {
    display: inline-flex;
    gap: 2px;
    padding: 3px;
    border: 1px solid #262926;
    border-radius: 999px;
    background: #0a0c0a;
  }
  :root[data-gallery-theme="light"] .theme-switch {
    border-color: #d4d4d0;
    background: #ffffff;
  }
  .theme-switch button {
    border: 0;
    border-radius: 999px;
    padding: 5px 10px;
    background: transparent;
    color: #8b908a;
    cursor: pointer;
    font: inherit;
    font-size: 12px;
  }
  .theme-switch button.is-active {
    background: #ff2438;
    color: #fff;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
  }
  nav a {
    color: #d6d9d4;
    text-decoration: none;
    font-size: 12px;
    padding: 4px 10px;
    border: 1px solid #262926;
    border-radius: 999px;
  }
  :root[data-gallery-theme="light"] nav a {
    color: #363a34;
    border-color: #d4d4d0;
  }
  nav a span {
    color: #ff2438;
  }
  nav a:hover {
    border-color: #ff2438;
  }
  main {
    padding: 24px 28px 60px;
  }
  .group {
    margin-bottom: 44px;
    scroll-margin-top: 132px;
  }
  .group h2 {
    margin: 0 0 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #9aa098;
    font-size: 13px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
  .count {
    padding: 1px 7px;
    border: 1px solid #33201f;
    border-radius: 999px;
    color: #ff2438;
    font-size: 11px;
    letter-spacing: 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }
  .card {
    margin: 0;
    overflow: hidden;
    background: #0c0e0c;
    border: 1px solid #1c1f1c;
    border-radius: 14px;
  }
  :root[data-gallery-theme="light"] .card {
    background: #ffffff;
    border-color: #dededb;
  }
  .card:hover {
    border-color: #333832;
  }
  :root[data-gallery-theme="light"] .card:hover {
    border-color: #bdbdb8;
  }
  .frame {
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #080907;
  }
  :root[data-gallery-theme="light"] .frame {
    background: #f5f5f4;
  }
  .frame[data-motion-source="identity-bust-focus"] {
    aspect-ratio: 359 / 490;
  }
  .frame iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
  .replay {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 2;
    width: 26px;
    height: 26px;
    border: 1px solid #2b2f2a;
    border-radius: 50%;
    background: rgba(10, 12, 10, 0.75);
    color: #d6d9d4;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .card:hover .replay {
    opacity: 1;
  }
  .replay:hover {
    border-color: #ff2438;
    color: #ff5a68;
  }
  figcaption {
    padding: 11px 13px 13px;
    display: grid;
    gap: 3px;
    border-top: 1px solid #1c1f1c;
  }
  :root[data-gallery-theme="light"] figcaption {
    border-top-color: #dededb;
  }
  figcaption strong {
    font-size: 14px;
    font-weight: 600;
  }
  .meta {
    color: #8b908a;
    font-size: 11.5px;
  }
  .slug {
    color: #5d635c;
    font: 11px ui-monospace, monospace;
  }
  .open {
    margin-top: 3px;
    color: #ff5a68;
    font-size: 11.5px;
    text-decoration: none;
  }
  .preview-links {
    display: flex;
    gap: 10px;
  }
  .open:hover {
    text-decoration: underline;
  }
</style>
</head>
<body>
<header>
  <div class="header-row">
    <div>
      <h1>UBA Mobile Animation Gallery</h1>
      <div class="sub">${total} animations &middot; live web sources from <code>mobile-animation-export</code> &middot; exported 2026-08-17</div>
    </div>
    <div class="theme-switch" aria-label="Preview theme">
      <button class="is-active" type="button" data-gallery-theme-choice="dark" aria-pressed="true">Dark</button>
      <button type="button" data-gallery-theme-choice="light" aria-pressed="false">Light</button>
    </div>
  </div>
  <nav>${nav}</nav>
</header>
<main>
${groups}
</main>
<script>
  let activeTheme = "dark";
  const frameSrc = (frame) => activeTheme === "light" ? frame.dataset.srcLight : frame.dataset.srcDark;
  const mount = (frame) => {
    if (frame.querySelector("iframe")) return;
    const iframe = document.createElement("iframe");
    iframe.src = frameSrc(frame) || frame.dataset.src;
    iframe.title = iframe.src;
    frame.appendChild(iframe);
  };
  const unmount = (frame) => {
    const iframe = frame.querySelector("iframe");
    if (iframe) iframe.remove();
  };
  const frames = document.querySelectorAll(".frame");
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => (entry.isIntersecting ? mount : unmount)(entry.target)),
    { rootMargin: "200px 0px" }
  );
  frames.forEach((frame) => observer.observe(frame));
  document.querySelectorAll(".replay").forEach((button) => {
    button.addEventListener("click", () => {
      const frame = button.closest(".frame");
      if (!frame) return;
      unmount(frame);
      requestAnimationFrame(() => mount(frame));
    });
  });
  document.querySelectorAll("[data-gallery-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTheme = button.dataset.galleryThemeChoice === "light" ? "light" : "dark";
      document.documentElement.dataset.galleryTheme = activeTheme;
      document.querySelectorAll("[data-gallery-theme-choice]").forEach((themeButton) => {
        const isActive = themeButton.dataset.galleryThemeChoice === activeTheme;
        themeButton.classList.toggle("is-active", isActive);
        themeButton.setAttribute("aria-pressed", String(isActive));
      });
      frames.forEach((frame) => {
        const iframe = frame.querySelector("iframe");
        if (iframe) iframe.src = frameSrc(frame) || frame.dataset.src;
      });
    });
  });
</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT_DIR, "gallery.html"), gallery);
}

function exportAll() {
  cleanOutput();
  copySharedAssets();
  writeSharedCss();
  writePreviewRuntime();

  const api = loadGalleryExports();
  const manifest = {
    generatedAt: "2026-08-17",
    source: "UBA-animations-prototypes show only animation mode",
    purpose: "Precise source export for iOS/Android Lottie or Rive recreation",
    webpPolicy: "WebP is used only for raster source assets where the original gallery depends on images.",
    themeSupport: {
      themes: EXPORT_THEMES,
      defaultTheme: "dark",
      note: "Every package includes preview-dark.html and preview-light.html. preview.html remains the dark preview for backwards compatibility.",
    },
    shared: {
      css: "shared/styles.css",
      runtime: "shared/preview-runtime.js",
      assets: "shared/assets",
      lottie: "shared/lottie",
    },
    groups: [],
  };

  let total = 0;
  animationGroups.forEach((groupSpec) => {
    const groupManifest = {
      title: groupSpec.title,
      folder: groupSpec.folder,
      items: [],
    };

    groupSpec.items.forEach((itemSpec) => {
      const snippet = rewriteSnippetAssetPaths(buildSnippet(api, itemSpec));
      const metadata = writeItem(groupSpec, itemSpec, snippet);
      total += 1;
      groupManifest.items.push({
        canonicalAssetId: metadata.canonicalAssetId,
        title: itemSpec.title,
        slug: itemSpec.slug,
        folder: `${groupSpec.folder}/${itemSpec.folder}`,
        sourceHtml: `${groupSpec.folder}/${itemSpec.folder}/source.html`,
        previewHtml: `${groupSpec.folder}/${itemSpec.folder}/preview.html`,
        previewHtmlByTheme: buildPreviewHtmlByTheme(`${groupSpec.folder}/${itemSpec.folder}/`),
        metadata: `${groupSpec.folder}/${itemSpec.folder}/metadata.json`,
        sourcePage: getPreviewPageSlug(itemSpec),
        recommendedFormat: itemSpec.recommendedFormat,
        sourceKind: itemSpec.sourceKind,
        sourceLottie: itemSpec.sourceLottie,
        rasterAssets: itemSpec.rasterAssets,
        duration: metadata.duration,
        fps: metadata.fps,
        playback: metadata.playback,
        referenceRecordings: metadata.referenceRecordings?.copied || [],
      });
    });

    manifest.groups.push(groupManifest);
  });

  manifest.totalAnimations = total;
  writeJson(path.join(OUT_DIR, "manifest.json"), manifest);
  writeReadme(total);
  writeImplementationPlan();
  writeGallery(total);
  return total;
}

const total = exportAll();
console.log(`Exported ${total} precise animation source packages to ${path.relative(ROOT, OUT_DIR)}`);
