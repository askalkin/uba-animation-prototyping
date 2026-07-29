const pages = [
  {
    slug: "progressive-blur-spinner",
    title: "Red orbit scanner",
    accent: "red",
    label: "Layered red orbit lines with a stretching trimmed stroke.",
    scene: () => `
      <div class="loader-scene progressive-scene" role="img" aria-label="Progressive red blur spinner">
        <span class="ambient-orbit orbit-a"></span>
        <span class="ambient-orbit orbit-b"></span>
        ${cometSvg("progressive")}
      </div>
    `,
  },
  {
    slug: "search-spinner-2",
    title: "Gradient magnifier scanner",
    accent: "red",
    label: "Neutral orbit lines with an animated gradient magnifier.",
    scene: () => `
      <div class="loader-scene progressive-scene search-spinner-2-scene" role="img" aria-label="Progressive neutral blur spinner 2">
        <span class="ambient-orbit orbit-a"></span>
        <span class="ambient-orbit orbit-b"></span>
        ${cometSvg("progressive-2", "neutral")}
        ${searchSpinnerIcon("neutral")}
      </div>
    `,
  },
  {
    slug: "search-spinner-2-white-ripple",
    title: "Magnifier ripple pulse",
    accent: "ink",
    label: "Static white search icon with soft water-like pulse rings.",
    scene: () => `
      <div class="loader-scene progressive-scene search-spinner-2-white-ripple-scene" role="img" aria-label="White static search icon with dissolving ripple rings">
        ${searchSpinnerRippleField()}
        ${searchSpinnerWhiteIcon()}
      </div>
    `,
  },
  {
    slug: "search-icon-animation",
    title: "Floating magnifier icon",
    accent: "ink",
    label: "Magnifying glass illustration with a subtle searching motion.",
    scene: () => `
      <div class="loader-scene search-icon-animation-scene search-spinner-3-scene" role="img" aria-label="Search icon animation">
        ${searchSpinnerIllustration()}
      </div>
    `,
  },
  {
    slug: "search-red-magnifier-loader",
    title: "Red magnifier loader",
    accent: "red",
    label: "Red magnifying glass illustration as a focused search loading state.",
    scene: () => `
      <div class="loader-scene search-icon-animation-scene search-red-magnifier-scene" role="img" aria-label="Red magnifier search loader">
        ${searchRedMagnifierIllustration()}
      </div>
    `,
  },
  {
    slug: "progressive-blur-spinner-solo",
    title: "Red comet arc",
    accent: "red",
    label: "The same soft red spinner without external orbit circles.",
    scene: () => `
      <div class="loader-scene progressive-solo-scene" role="img" aria-label="Solo progressive red blur spinner">
        ${cometSvg("progressive-solo")}
      </div>
    `,
  },
  {
    slug: "minimalist-spinner",
    title: "White single-arc loader",
    accent: "ink",
    label: "Sparse circular loader with one precise chasing segment.",
    scene: () => `
      <div class="loader-scene minimalist-scene" role="img" aria-label="Minimal circular spinner">
        <svg class="minimal-svg" viewBox="0 0 120 120" aria-hidden="true">
          <g class="svg-spin medium-spin">
            <circle class="minimal-trail" cx="60" cy="60" r="34" pathLength="100"></circle>
          </g>
        </svg>
      </div>
    `,
  },
  {
    slug: "uba-spinner-1",
    title: "UBA spinner 1",
    accent: "ink",
    label: "Imported UBA core spinner variant from the supplied Lottie JSON.",
    scene: () => `
      ${ubaLottieSpinnerScene("uba-spinner-1", "UBA spinner 1")}
    `,
  },
  {
    slug: "uba-spinner-1-red",
    title: "UBA spinner 1 red",
    accent: "red",
    label: "Red colorway of imported UBA core spinner variant 1.",
    scene: () => `
      ${ubaLottieSpinnerScene("uba-spinner-1", "UBA spinner 1 red", "red")}
    `,
  },
  {
    slug: "uba-spinner-2",
    title: "UBA spinner 2",
    accent: "ink",
    label: "Imported UBA core spinner variant from the supplied Lottie JSON.",
    scene: () => `
      ${ubaLottieSpinnerScene("uba-spinner-2", "UBA spinner 2")}
    `,
  },
  {
    slug: "uba-spinner-2-red",
    title: "UBA spinner 2 red",
    accent: "red",
    label: "Red colorway of imported UBA core spinner variant 2.",
    scene: () => `
      ${ubaLottieSpinnerScene("uba-spinner-2", "UBA spinner 2 red", "red")}
    `,
  },
  {
    slug: "silver-uba-coin",
    title: "Silver UBA coin",
    accent: "ink",
    label: "Floating silver coin with a softly extruded UBA mark and blurred ellipse shadow.",
    scene: () => `
      ${silverUbaCoinPrototype()}
    `,
  },
  {
    slug: "uba-card-rotation",
    title: "UBA card rotation",
    accent: "red",
    label: "Red UBA card rotating between front and back sides.",
    scene: () => `
      ${ubaCardRotationPrototype()}
    `,
  },
  {
    slug: "identity-verification-motion",
    title: "Identity verification",
    accent: "red",
    label: "Fingerprint loader with red gradient line drawing and staggered biometric scan strokes.",
    scene: () => `
      ${fingerprintIdentityLoader("motion-fingerprint", { shield: true })}
    `,
  },
  {
    slug: "identity-bust-focus",
    title: "Identity user scan",
    accent: "red",
    label: "Minimal user icon scan with a thin red horizontal sweep.",
    scene: () => `
      ${identityBustFocusPrototype()}
    `,
  },
  {
    slug: "success-wheel-2",
    title: "Red fill-to-check",
    accent: "violet",
    label: "Circular loader line filling into a red success confirmation.",
    scene: () => `
      ${successWheelTwoPrototype()}
    `,
  },
  {
    slug: "success-spinner-neutral",
    title: "Neutral fill-to-check",
    accent: "ink",
    label: "Duplicate of the success spinner using an inverted neutral colorway.",
    scene: () => `
      ${successWheelTwoPrototype("neutral")}
    `,
  },
  {
    slug: "success-spinner-green",
    title: "Green fill-to-check",
    accent: "green",
    label: "Duplicate of the success spinner using the #22C55E green colorway.",
    scene: () => `
      ${successWheelTwoPrototype("green")}
    `,
  },
  {
    slug: "pull-to-refresh-blob-capsule",
    title: "Blob capsule refresh",
    accent: "uba",
    themeable: true,
    label: "Frosted capsule with UBA gradient blobs moving through pull states.",
    scene: () => `
      ${pullRefreshPrototype("blob")}
    `,
  },
  {
    slug: "pull-to-refresh-glass-capsule",
    title: "Red sphere refresh",
    accent: "red",
    themeable: true,
    label: "Frosted capsule with a clean red pull indicator resolving into a checkmark.",
    scene: () => `
      ${pullRefreshPrototype("clean")}
    `,
  },
  {
    slug: "pull-to-refresh-neutral-capsule-2",
    title: "Neutral check refresh",
    accent: "ink",
    themeable: true,
    label: "Neutral frosted capsule resolving into a top bounce and check state.",
    scene: () => `
      ${pullRefreshPrototype("neutral-complete")}
    `,
  },
  {
    slug: "flip-coin-pull-to-refresh-white",
    title: "White coin flip refresh",
    accent: "ink",
    themeable: true,
    label: "White glass coin flipping through a pull-to-refresh gesture.",
    scene: () => `
      ${pullRefreshPrototype("flip-white")}
    `,
  },
  {
    slug: "uba-media-blob-prototype",
    title: "UBA blob field study",
    accent: "uba",
    label: "Light and dark blob loader studies for the UBA Media flow.",
    scene: () => `
      <div class="uba-prototype-scene" role="img" aria-label="UBA Media blob loader prototypes in light and dark themes">
        ${ubaBlobPrototype("dark")}
        ${ubaBlobPrototype("light")}
      </div>
    `,
  },
  {
    slug: "uba-loader-gradient-blob-prototype",
    title: "Payment gradient transition",
    accent: "uba",
    section: "prototypes",
    themeable: true,
    label: "Gradient blob loader transitioning from PIN entry to successful payment.",
    scene: () => `
      <div class="alty-flow-scene" role="img" aria-label="UBA gradient blob loader prototype over payment confirmation flow">
        ${ubaLoaderGradientBlobPrototype()}
      </div>
    `,
  },
  {
    slug: "account-opening-pending",
    title: "Account pending screen",
    accent: "ink",
    section: "prototypes",
    themeable: true,
    label: "Pending account-opening mockup from the supplied Figma specs.",
    scene: () => `
      ${altyMockupPrototype("pending")}
    `,
  },
  {
    slug: "account-opening-almost-there",
    title: "Account setup wait",
    accent: "ink",
    section: "prototypes",
    themeable: true,
    label: "Almost-there onboarding mockup with glass footer actions.",
    scene: () => `
      ${altyMockupPrototype("almost")}
    `,
  },
  {
    slug: "enable-biometrics",
    title: "Enable biometrics",
    accent: "red",
    section: "prototypes",
    themeable: true,
    label: "Biometrics onboarding mockup with fingerprint verification motion.",
    scene: () => `
      ${altyMockupPrototype("biometrics")}
    `,
  },
  {
    slug: "identity-verification",
    title: "Identity verification",
    accent: "red",
    section: "prototypes",
    themeable: true,
    label: "Identity verification mockup with user scan motion.",
    scene: () => `
      ${altyMockupPrototype("identity")}
    `,
  },
  {
    slug: "six-digit-code",
    title: "6-digit code",
    accent: "red",
    section: "prototypes",
    themeable: true,
    label: "Login verification code mockup with filled OTP fields.",
    scene: () => `
      ${altyMockupPrototype("otp")}
    `,
  },
  {
    slug: "searching-keyboard",
    title: "searching",
    accent: "ink",
    section: "prototypes",
    themeable: true,
    label: "Search screen mockup with active keyboard and empty searching state.",
    scene: () => `
      ${altyMockupPrototype("searching")}
    `,
  },
  {
    slug: "account-opening-success",
    title: "Account details success",
    accent: "green",
    section: "prototypes",
    themeable: true,
    label: "Successful account-opening mockup with details cards.",
    scene: () => `
      ${altyMockupPrototype("success")}
    `,
  },
  {
    slug: "couldnt-load-results",
    title: "Couldn't load results",
    accent: "red",
    section: "prototypes",
    themeable: true,
    label: "Failed results mockup using success-loader motion variants resolved with an X.",
    scene: () => `
      ${altyMockupPrototype("failed")}
    `,
  },
  {
    slug: "transaction-history-pull-refresh",
    title: "Transaction refresh list",
    accent: "ink",
    section: "prototypes",
    themeable: true,
    label: "Pull-to-refresh transaction history mockup from the supplied Figma specs.",
    scene: () => `
      ${altyMockupPrototype("pull")}
    `,
  },
  {
    slug: "verification-badge",
    title: "Filled verification badge",
    accent: "ink",
    label: "White verification badge contour drawing into a filled success state.",
    scene: () => `
      ${verificationBadgePrototype()}
    `,
  },
];

const routeAliases = {
  "alty-marketing-transition-loader": "uba-loader-gradient-blob-prototype",
  "frosted-glass-pull-to-refresh-blob": "pull-to-refresh-blob-capsule",
  "pull-to-refresh-minimalist": "pull-to-refresh-glass-capsule",
  "search-spinner-2-white": "search-spinner-2-white-ripple",
  "search-spinner-3": "search-icon-animation",
  "uba-media-transition-loader": "uba-loader-gradient-blob-prototype",
};

const navGroups = {
  motion: [
    {
      title: "Search loaders",
      slugs: [
        "progressive-blur-spinner",
        "search-spinner-2",
        "search-spinner-2-white-ripple",
        "search-icon-animation",
        "search-red-magnifier-loader",
      ],
    },
    {
      title: "Core spinners",
      slugs: [
        "progressive-blur-spinner-solo",
        "minimalist-spinner",
        "uba-spinner-1",
        "uba-spinner-1-red",
        "uba-spinner-2",
        "uba-spinner-2-red",
        "silver-uba-coin",
        "uba-card-rotation",
      ],
    },
    {
      title: "Identity loaders",
      slugs: ["identity-verification-motion", "identity-bust-focus"],
    },
    {
      title: "Success loaders",
      slugs: ["success-wheel-2", "success-spinner-neutral", "success-spinner-green", "verification-badge"],
    },
    {
      title: "Refresh gestures",
      slugs: [
        "pull-to-refresh-blob-capsule",
        "pull-to-refresh-glass-capsule",
        "pull-to-refresh-neutral-capsule-2",
        "flip-coin-pull-to-refresh-white",
      ],
    },
    {
      title: "Blob studies",
      slugs: ["uba-media-blob-prototype"],
    },
  ],
  prototypes: [
    {
      title: "Payment flow",
      slugs: ["uba-loader-gradient-blob-prototype"],
    },
    {
      title: "Account onboarding",
      slugs: [
        "account-opening-pending",
        "account-opening-almost-there",
        "enable-biometrics",
        "identity-verification",
        "six-digit-code",
      ],
    },
    {
      title: "Search",
      slugs: ["searching-keyboard"],
    },
    {
      title: "Success",
      slugs: ["account-opening-success", "couldnt-load-results"],
    },
    {
      title: "History",
      slugs: ["transaction-history-pull-refresh"],
    },
  ],
};

const prototypeMotionVariantSets = {
  pending: {
    title: "Core spinners",
    variants: [
      { slug: "progressive-blur-spinner-solo", title: "Red comet arc" },
      { slug: "minimalist-spinner", title: "Single arc" },
      { slug: "uba-spinner-1", title: "UBA spinner 1" },
      { slug: "uba-spinner-1-red", title: "UBA spinner 1 red" },
      { slug: "uba-spinner-2", title: "UBA spinner 2" },
      { slug: "uba-spinner-2-red", title: "UBA spinner 2 red" },
      { slug: "uba-card-rotation", title: "Card rotation" },
    ],
  },
  almost: {
    title: "Core spinners",
    variants: [
      { slug: "progressive-blur-spinner-solo", title: "Red comet arc" },
      { slug: "minimalist-spinner", title: "Single arc" },
      { slug: "uba-spinner-1", title: "UBA spinner 1" },
      { slug: "uba-spinner-1-red", title: "UBA spinner 1 red" },
      { slug: "uba-spinner-2", title: "UBA spinner 2" },
      { slug: "uba-spinner-2-red", title: "UBA spinner 2 red" },
      { slug: "silver-uba-coin", title: "Silver UBA coin" },
    ],
  },
  searching: {
    title: "Search loaders",
    variants: [
      { slug: "progressive-blur-spinner", title: "Red orbit scanner" },
      { slug: "search-spinner-2", title: "Gradient magnifier" },
      { slug: "search-spinner-2-white-ripple", title: "Ripple pulse" },
      { slug: "search-icon-animation", title: "Floating magnifier" },
      { slug: "search-red-magnifier-loader", title: "Red magnifier" },
    ],
  },
  biometrics: {
    title: "Biometrics",
    variants: [
      { slug: "identity-verification-motion", title: "Fingerprint" },
    ],
  },
  identity: {
    title: "Identity loaders",
    variants: [
      { slug: "identity-bust-focus", title: "User focus scan" },
    ],
  },
  success: {
    title: "Success loaders",
    variants: [
      { slug: "success-wheel-2", title: "Red fill to check" },
      { slug: "success-spinner-neutral", title: "Neutral fill to check" },
      { slug: "success-spinner-green", title: "Green fill to check" },
      { slug: "verification-badge", title: "Verification badge" },
    ],
  },
  failed: {
    title: "Failure loaders",
    variants: [
      { slug: "failure-wheel-red", title: "Red fill to X" },
      { slug: "failure-wheel-neutral", title: "Neutral fill to X" },
      { slug: "failure-verification-badge", title: "Badge fill to X" },
    ],
  },
  pull: {
    title: "Refresh gestures",
    variants: [
      { slug: "pull-to-refresh-blob-capsule", title: "Blob capsule" },
      { slug: "pull-to-refresh-glass-capsule", title: "Red sphere" },
      { slug: "pull-to-refresh-neutral-capsule-2", title: "Neutral check" },
      { slug: "flip-coin-pull-to-refresh-white", title: "White coin flip" },
    ],
  },
};

const app = document.getElementById("app");
let prototypeTheme = "dark";
const prototypeVariantState = {};
let ubaLottieSpinnerFrame = 0;

try {
  prototypeTheme = window.localStorage.getItem("loader-motion-theme") || prototypeTheme;
} catch {
  prototypeTheme = "dark";
}

if (prototypeTheme !== "light") {
  prototypeTheme = "dark";
}

document.documentElement.dataset.prototypeTheme = prototypeTheme;

function getPageSection(page) {
  return page.section || "motion";
}

function cometSvg(id, variant = "red") {
  const isNeutral = variant === "neutral";
  const trailStops = isNeutral
    ? `
          <stop offset="0%" stop-color="var(--search-neutral-a, rgba(255, 255, 255, 0.96))"></stop>
          <stop offset="44%" stop-color="var(--search-neutral-b, rgba(128, 124, 118, 0.78))"></stop>
          <stop offset="100%" stop-color="var(--search-neutral-c, rgba(255, 255, 255, 0.08))"></stop>
        `
    : `
          <stop offset="0%" stop-color="rgba(255, 36, 56, 1)"></stop>
          <stop offset="48%" stop-color="rgba(255, 36, 56, 0.55)"></stop>
          <stop offset="100%" stop-color="rgba(255, 36, 56, 0)"></stop>
        `;
  const glowMatrix = isNeutral
    ? "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
    : "1 0 0 0 0.9  0 0.22 0 0 0.02  0 0 0.18 0 0.03  0 0 0 1 0";

  return `
    <svg class="comet-svg" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-trail" x1="88" y1="18" x2="23" y2="93" gradientUnits="userSpaceOnUse">
          ${trailStops}
        </linearGradient>
        <filter id="${id}-glow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="4" result="blur"></feGaussianBlur>
          <feColorMatrix
            in="blur"
            type="matrix"
            values="${glowMatrix}"
          ></feColorMatrix>
        </filter>
      </defs>
      <g class="svg-spin">
        <circle
          class="comet-glow comet-trim"
          cx="60"
          cy="60"
          r="34"
          pathLength="100"
          stroke="url(#${id}-trail)"
          filter="url(#${id}-glow)"
        ></circle>
        <circle
          class="comet-stroke comet-trim"
          cx="60"
          cy="60"
          r="34"
          pathLength="100"
          stroke="url(#${id}-trail)"
        ></circle>
      </g>
    </svg>
  `;
}

function searchSpinnerIcon(variant = "red") {
  const gradientId = `search-icon-gradient-${variant}`;
  const stops = variant === "neutral"
    ? `
            <stop offset="0%" stop-color="var(--search-neutral-c, rgba(255, 255, 255, 0.12))"></stop>
            <stop offset="46%" stop-color="var(--search-neutral-b, rgba(128, 124, 118, 0.92))"></stop>
            <stop offset="100%" stop-color="var(--search-neutral-a, rgba(255, 255, 255, 0.98))"></stop>
          `
    : `
            <stop offset="0%" stop-color="rgba(255, 36, 56, 0.18)"></stop>
            <stop offset="46%" stop-color="rgba(255, 36, 56, 1)"></stop>
            <stop offset="100%" stop-color="rgba(255, 250, 242, 0.96)"></stop>
          `;

  return `
    <div class="search-spinner-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="${gradientId}" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            ${stops}
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="3.2s"
              repeatCount="indefinite"
            ></animateTransform>
          </linearGradient>
        </defs>
        <path fill="url(#${gradientId})" d="M10.75 17.5C7.02 17.5 4 14.48 4 10.75S7.02 4 10.75 4s6.75 3.02 6.75 6.75a6.72 6.72 0 0 1-1.42 4.14L20 18.81 18.81 20l-3.92-3.92a6.72 6.72 0 0 1-4.14 1.42Zm0-1.7a5.05 5.05 0 1 0 0-10.1 5.05 5.05 0 0 0 0 10.1Z"></path>
      </svg>
    </div>
  `;
}

function searchSpinnerIllustration() {
  return `
    <span class="search-spinner-illustration" aria-hidden="true">
      <img class="search-illustration-dark" src="./assets/search-magnifier.png" alt="">
      <img class="search-illustration-light" src="./assets/search-magnifier-light.png" alt="">
    </span>
  `;
}

function searchRedMagnifierIllustration() {
  return `
    <span class="search-spinner-illustration search-red-magnifier-illustration" aria-hidden="true">
      <img src="./assets/search-magnifier-red.png" alt="">
    </span>
  `;
}

function searchSpinnerRippleField() {
  return `
    <span class="search-ripple-field" aria-hidden="true">
      <span class="search-ripple search-ripple-a"></span>
      <span class="search-ripple search-ripple-b"></span>
      <span class="search-ripple search-ripple-c"></span>
      <span class="search-ripple search-ripple-d"></span>
    </span>
  `;
}

function searchSpinnerWhiteIcon() {
  return `
    <div class="search-spinner-icon search-spinner-white-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.75 17.5C7.02 17.5 4 14.48 4 10.75S7.02 4 10.75 4s6.75 3.02 6.75 6.75a6.72 6.72 0 0 1-1.42 4.14L20 18.81 18.81 20l-3.92-3.92a6.72 6.72 0 0 1-4.14 1.42Zm0-1.7a5.05 5.05 0 1 0 0-10.1 5.05 5.05 0 0 0 0 10.1Z"></path>
      </svg>
    </div>
  `;
}

function ubaLottieSpinnerScene(spinnerKey, label, variant = "neutral") {
  return `
    <div class="loader-scene uba-lottie-scene ${variant === "red" ? "uba-lottie-red-scene" : ""}" role="img" aria-label="${label}">
      <div class="uba-lottie-spinner" data-uba-lottie-spinner="${spinnerKey}">
        <span class="uba-lottie-fallback" aria-hidden="true"></span>
      </div>
    </div>
  `;
}

function ubaCardRotationPrototype() {
  return `
    <div class="loader-scene uba-card-rotation-scene" role="img" aria-label="UBA debit card rotating from front to back">
      <span class="uba-card-shadow" aria-hidden="true"></span>
      <div class="uba-card-flip">
        <div class="uba-card-flip-face is-front">
          <img src="./assets/uba-card-front.png" alt="">
        </div>
        <div class="uba-card-flip-face is-back">
          <img src="./assets/uba-card-back.png" alt="">
        </div>
      </div>
    </div>
  `;
}

function ubaLogoSvg(className) {
  return `
    <svg class="${className}" viewBox="0 0 65 75" aria-hidden="true">
      <path d="M19.4005 74.2758C19.6342 74.2762 22.0501 73.9681 23.297 73.8141C31.091 72.5779 35.8504 69.3012 35.8642 62.4937C35.8703 59.4421 34.7861 56.2318 33.6234 53.2561C26.8725 39.6276 20.0436 25.9988 13.2146 12.5265L-3.90683e-06 74.2364L19.4005 74.2758Z"></path>
      <path d="M44.9398 5.93335e-06C44.7061 5.91292e-06 42.2908 0.313082 41.0441 0.469526C33.2527 1.72151 28.5 5.00794 28.5 11.8154C28.5 14.867 29.5908 18.0751 30.7595 21.0485C37.538 34.6632 44.3944 48.2781 51.2508 61.7366L64.3403 7.62939e-06L44.9398 5.93335e-06Z"></path>
    </svg>
  `;
}

function silverUbaCoinPrototype() {
  return `
    <div class="loader-scene uba-silver-coin-scene" role="img" aria-label="Floating silver coin with extruded UBA logo">
      <span class="uba-coin-shadow" aria-hidden="true"></span>
      <div class="uba-coin-float">
        <div class="uba-coin-model">
          <span class="uba-coin-depth depth-one"></span>
          <span class="uba-coin-face">
            <span class="uba-coin-logo-stack">
              <svg width="0" height="0" style="position:absolute" aria-hidden="true">
                <defs>
                  <linearGradient id="uba-coin-logo-metal" gradientUnits="userSpaceOnUse" x1="2" y1="0" x2="63" y2="75">
                    <stop offset="0%" stop-color="#faf9f4"></stop>
                    <stop offset="55%" stop-color="#d8d6cf"></stop>
                    <stop offset="100%" stop-color="#a9a69e"></stop>
                  </linearGradient>
                </defs>
              </svg>
              ${ubaLogoSvg("uba-coin-logo-layer logo-depth logo-depth-3")}
              ${ubaLogoSvg("uba-coin-logo-layer logo-depth logo-depth-2")}
              ${ubaLogoSvg("uba-coin-logo-layer logo-depth logo-depth-1")}
              ${ubaLogoSvg("uba-coin-logo-layer logo-top")}
            </span>
          </span>
        </div>
      </div>
    </div>
  `;
}

function pullRefreshPrototype(variant) {
  const labels = {
    blob: "Blob pull-to-refresh capsule",
    clean: "Clean pull-to-refresh capsule",
    neutral: "Neutral pull-to-refresh capsule",
    "neutral-complete": "Neutral pull-to-refresh capsule with final check",
    "flip-red": "Red flip coin pull-to-refresh capsule",
    "flip-white": "White flip coin pull-to-refresh capsule",
  };
  const variantClasses = {
    blob: "ptr-blob-capsule",
    clean: "ptr-clean-capsule",
    neutral: "ptr-neutral-capsule",
    "neutral-complete": "ptr-neutral-capsule ptr-neutral-complete-capsule",
    "flip-red": "ptr-clean-capsule ptr-flip-capsule ptr-flip-red-capsule",
    "flip-white": "ptr-neutral-capsule ptr-flip-capsule ptr-flip-white-capsule",
  };
  const hasSuccessCheck = variant === "blob" || variant === "clean" || variant === "neutral-complete";
  const isFlipCoin = variant === "flip-red" || variant === "flip-white";

  return `
    <div class="pull-refresh-prototype ${variantClasses[variant]}" role="img" aria-label="${labels[variant]}">
      <div class="ptr-demo-frame">
        <div class="ptr-feed-surface" aria-hidden="true">
          <span class="ptr-top-line"></span>
          <span class="ptr-avatar"></span>
          <span class="ptr-feed-line line-one"></span>
          <span class="ptr-feed-line line-two"></span>
          <span class="ptr-feed-card card-one"></span>
          <span class="ptr-feed-card card-two"></span>
        </div>
        <div class="ptr-capsule">
          ${variant === "blob" ? pullRefreshBlobField() : ""}
          ${isFlipCoin ? pullRefreshFlipCoin() : '<span class="ptr-indicator"></span>'}
          ${hasSuccessCheck ? pullRefreshSuccessCheck() : ""}
        </div>
      </div>
    </div>
  `;
}

function pullRefreshFlipCoin() {
  return `
    <span class="ptr-indicator">
      <span class="ptr-coin">
        <span class="ptr-coin-face ptr-coin-front"></span>
        <span class="ptr-coin-face ptr-coin-back"></span>
      </span>
      <span class="ptr-coin-edge"></span>
    </span>
    <svg class="ptr-coin-check" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M14 25.5 L21 32 L34 16"></path>
    </svg>
  `;
}

function pullRefreshBlobField() {
  return `
    <span class="ptr-blob-field">
      <span class="ptr-blob ptr-blob-main"></span>
      <span class="ptr-blob ptr-blob-red"></span>
      <span class="ptr-blob ptr-blob-yellow"></span>
    </span>
  `;
}

function pullRefreshSuccessCheck() {
  return `
    <svg class="ptr-success-check" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M11 21 L18 28 L30 13"></path>
    </svg>
  `;
}

function successWheelTwoPrototype(variant = "red", result = "success") {
  const isGreen = variant === "green";
  const isNeutral = variant === "neutral";
  const isError = result === "error";
  const resultLabel = isError ? "an X" : "a check";
  const resultPath = isError ? "M43 43 L77 77 M77 43 L43 77" : "M42 61 L55 73 L79 45";

  return `
    <div class="loader-scene success-wheel-two-scene ${isGreen ? "success-wheel-two-green-scene" : ""} ${isNeutral ? "success-wheel-two-neutral-scene" : ""} ${isError ? "success-wheel-two-error-scene" : ""}" role="img" aria-label="Circular loader filling ${isNeutral ? "neutral" : isGreen ? "green" : "red"} and resolving into ${resultLabel}">
      <div class="success-wheel-two-mark">
        <svg class="success-wheel-two-svg" viewBox="0 0 120 120" aria-hidden="true">
          <g class="success-wheel-two-rotor">
            <circle class="success-wheel-two-line" cx="60" cy="60" r="34" pathLength="100"></circle>
          </g>
          <circle class="success-wheel-two-fill" cx="60" cy="60" r="34"></circle>
          <path class="success-wheel-two-check ${isError ? "is-error" : ""}" d="${resultPath}" pathLength="78"></path>
        </svg>
      </div>
    </div>
  `;
}

function roundedStarPath(cx, cy, outerRadius, innerRadius, points, cornerRadius) {
  const vertices = Array.from({ length: points * 2 }, (_, index) => {
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + (index * Math.PI) / points;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    };
  });
  const pointAlong = (from, to, distance) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy) || 1;
    const ratio = Math.min(distance / length, 0.42);
    return {
      x: from.x + dx * ratio,
      y: from.y + dy * ratio,
    };
  };
  const fmt = (value) => Number(value.toFixed(2));
  const first = pointAlong(vertices[0], vertices[1], cornerRadius);
  const commands = [`M${fmt(first.x)} ${fmt(first.y)}`];

  vertices.slice(1).forEach((vertex, offset) => {
    const index = offset + 1;
    const next = vertices[(index + 1) % vertices.length];
    const previous = vertices[(index - 1 + vertices.length) % vertices.length];
    const before = pointAlong(vertex, previous, cornerRadius);
    const after = pointAlong(vertex, next, cornerRadius);
    commands.push(`L${fmt(before.x)} ${fmt(before.y)}`);
    commands.push(`Q${fmt(vertex.x)} ${fmt(vertex.y)} ${fmt(after.x)} ${fmt(after.y)}`);
  });

  const topBefore = pointAlong(vertices[0], vertices[vertices.length - 1], cornerRadius);
  commands.push(`L${fmt(topBefore.x)} ${fmt(topBefore.y)}`);
  commands.push(`Q${fmt(vertices[0].x)} ${fmt(vertices[0].y)} ${fmt(first.x)} ${fmt(first.y)}`);
  commands.push("Z");
  return commands.join(" ");
}

function verificationBadgePrototype(result = "success") {
  const badgePath = roundedStarPath(60, 60, 49, 36, 8, 8.5);
  const isError = result === "error";
  const resultLabel = isError ? "an X" : "a check";
  const resultPath = isError ? "M40 40 L80 80 M80 40 L40 80" : "M36 62 L52 77 L84 43";

  return `
    <div class="loader-scene verification-badge-scene ${isError ? "verification-badge-error-scene" : ""}" role="img" aria-label="White verification badge drawing, filling, and resolving into ${resultLabel}">
      <div class="verification-badge-mark">
        <svg class="verification-badge-svg" viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <linearGradient id="verification-badge-fill-gradient" x1="22" y1="18" x2="94" y2="103" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="var(--verification-badge-fill-color, #ffffff)" stop-opacity="1"></stop>
              <stop offset="56%" stop-color="var(--verification-badge-fill-color, #ffffff)" stop-opacity="1"></stop>
              <stop offset="100%" stop-color="var(--verification-badge-fill-color, #ffffff)" stop-opacity="1"></stop>
            </linearGradient>
            <filter id="verification-badge-soft-glow" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="3.2" result="blur"></feGaussianBlur>
              <feMerge>
                <feMergeNode in="blur"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>
          </defs>
          <g class="verification-badge-rotor">
            <path class="verification-badge-trace" d="${badgePath}" pathLength="100"></path>
          </g>
          <path class="verification-badge-fill" d="${badgePath}"></path>
          <path class="verification-badge-outline" d="${badgePath}" pathLength="100"></path>
          <path class="verification-badge-check ${isError ? "is-error" : ""}" d="${resultPath}" pathLength="100"></path>
        </svg>
      </div>
    </div>
  `;
}

function altyBrandStory(type) {
  const labels = {
    dense: "UBA seed dense loader storyboard animation",
    radius: "UBA seed radius loader storyboard animation",
    "success-wheel-two": "UBA seed success wheel storyboard animation",
  };
  const isSuccess = type === "success-wheel-two";

  return `
    <div class="loader-scene alty-story-scene uba-seed-story uba-seed-${type}-story" role="img" aria-label="${labels[type]}">
      <div class="alty-story-panel uba-seed-panel">
        <div class="uba-seed-stage">
          <div class="uba-seed-state uba-state-logo">${ubaSeedLogoSvg("uba-logo-shape")}</div>
          <div class="uba-seed-state uba-state-hourglass">${ubaHourglassMark()}</div>
          <div class="uba-seed-state uba-state-fan">${ubaFanMark()}</div>
          <div class="uba-seed-state uba-state-flower">${ubaFlowerMark()}</div>
          ${
            isSuccess
              ? `
                <div class="uba-seed-state uba-state-success-dot"><span class="uba-success-dot"></span></div>
                <div class="uba-seed-state uba-state-success-check">
                  <span class="uba-success-dot uba-success-check">
                    <svg viewBox="0 0 80 80" aria-hidden="true">
                      <path d="M22 42 L35 55 L59 27"></path>
                    </svg>
                  </span>
                </div>
              `
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

function ubaSeedLogoSvg(className = "") {
  return `
    <svg class="uba-logo-svg ${className}" viewBox="0 0 65 75" aria-hidden="true">
      <path d="M19.4005 74.2561C19.6342 74.2561 22.0495 73.943 23.2961 73.7866C31.0875 72.5346 35.8403 69.2482 35.8403 62.4407C35.8403 59.3891 34.7495 56.181 33.5808 53.2076C26.8023 39.5929 19.9458 25.978 13.0895 12.5195L0 74.2561H19.4005Z"></path>
      <path d="M39.3464 38.4192C43.2421 46.1656 47.2157 53.9901 51.1893 61.7366L64.3567 0L44.9561 0.000075489C39.8139 0.391365 31.1654 1.09562 28.828 8.52902C28.5943 9.23319 28.5165 10.1722 28.4385 10.9546V12.5979C28.4385 14.867 29.9967 19.64 30.698 21.2049C31.3213 22.6134 32.1004 23.9436 32.8017 25.4303C34.9832 29.6556 37.1649 34.1156 39.3464 38.4192Z"></path>
    </svg>
  `;
}

function ubaSeedSvg(className = "") {
  return `
    <svg class="uba-seed-svg ${className}" viewBox="0 0 41 61" aria-hidden="true">
      <path d="M17.1904 57.6287C17.3975 57.737 19.6827 58.5792 20.8599 59.0185C28.344 61.5208 34.0787 60.812 37.2343 54.7801C38.6489 52.0761 39.1694 48.7279 39.5122 45.5515C39.817 30.3457 40.0529 15.1036 40.2164 0.000237887L0.000210718 48.6356L17.1904 57.6287Z"></path>
    </svg>
  `;
}

function ubaHourglassMark() {
  return `
    <div class="uba-hourglass-mark">
      <span class="uba-hourglass-seed is-top">${ubaSeedSvg()}</span>
      <span class="uba-hourglass-seed is-bottom">${ubaSeedSvg()}</span>
    </div>
  `;
}

function ubaFanMark() {
  const fanAngles = [-76, -48, -22, 0, 22, 48, 76];

  return `
    <div class="uba-fan-mark">
      ${fanAngles
        .map(
          (angle, index) => `
            <span class="uba-fan-petal" style="--fan-angle:${angle}deg; --fan-opacity:${(0.28 + index * 0.08).toFixed(2)};">
              ${ubaSeedSvg()}
            </span>
          `,
        )
        .join("")}
    </div>
  `;
}

function ubaFlowerMark() {
  return `
    <div class="uba-flower-mark">
      ${Array.from(
        { length: 12 },
        (_, index) => `
          <span class="uba-flower-petal" style="--petal-angle:${index * 30}deg;">
            ${ubaSeedSvg()}
          </span>
        `,
      ).join("")}
    </div>
  `;
}

function ubaBlobPrototype(theme) {
  const isLight = theme === "light";
  const label = isLight ? "Light" : "Dark";

  return `
    <article class="uba-phone uba-${theme}" aria-label="UBA Media ${label} theme loader prototype">
      <div class="uba-status">
        <span></span>
        <span></span>
      </div>
      <div class="uba-screen">
        <div class="uba-blob-field">
          <span class="uba-blob uba-blob-main"></span>
          <span class="uba-blob uba-blob-red"></span>
          <span class="uba-blob uba-blob-yellow"></span>
          <span class="uba-blob uba-blob-lift"></span>
        </div>
        <div class="uba-loader-shell">
          <span class="uba-loader-dot dot-one"></span>
          <span class="uba-loader-dot dot-two"></span>
          <span class="uba-loader-dot dot-three"></span>
        </div>
      </div>
      <footer class="uba-caption">
        <span>${label}</span>
        <strong>UBA Media</strong>
      </footer>
    </article>
  `;
}

function ubaLoaderGradientBlobPrototype() {
  return `
      <div class="uba-gradient-device-stage uba-gradient-flow-frame" aria-label="UBA gradient blob payment transition loading state">
        <div class="uba-gradient-screen uba-gradient-pin-screen">
          ${altyPhonePin({ animated: true })}
        </div>
        <div class="uba-gradient-screen uba-gradient-success-screen">
          ${altyPhoneResult(true)}
        </div>

        <div class="alty-transition-overlay uba-gradient-transition-overlay" aria-hidden="true">
          <div class="alty-transition-blob-field">
            <span class="uba-blob uba-blob-main"></span>
            <span class="uba-blob uba-blob-red"></span>
            <span class="uba-blob uba-blob-yellow"></span>
            <span class="uba-blob uba-blob-lift"></span>
          </div>
          <div class="alty-transition-loader">
            <svg class="uba-transition-minimal-spinner" viewBox="0 0 120 120" aria-hidden="true">
              <g class="uba-transition-minimal-spin">
                <circle class="uba-transition-minimal-trail" cx="60" cy="60" r="34" pathLength="100"></circle>
              </g>
            </svg>
          </div>
        </div>
      </div>
  `;
}

function altyStatusBar() {
  return `
    <div class="alty-statusbar" aria-hidden="true">
      <span>9:41</span>
      <span class="alty-signal">
        <i></i>
        <i></i>
        <i></i>
      </span>
    </div>
  `;
}

function altyPhonePin(options = {}) {
  const { animated = false } = options;
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "scan", "0", "⌫"];
  const pinDots = Array.from(
    { length: 6 },
    (_, index) => `<span class="${animated ? "is-animated" : index < 2 ? "is-filled" : ""}" style="--dot:${index};"></span>`,
  ).join("");

  return `
    <section class="alty-phone" aria-label="Airtime passcode screen">
      <p class="alty-screen-note">Airtime • passcode</p>
      <div class="alty-device">
        ${altyStatusBar()}
        <button class="alty-icon-button" type="button" aria-label="Back">‹</button>
        <h2>Enter transaction PIN</h2>
        <p class="alty-subtitle">for confirmation</p>
        <div class="alty-pin-dots" aria-hidden="true">
          ${pinDots}
        </div>
        <div class="alty-keypad" aria-hidden="true">
          ${keys
            .map(
              (key) => `
                <span class="${key === "scan" || key === "⌫" ? "is-soft-key" : ""}">
                  ${key === "scan" ? "⌗" : key}
                </span>
              `,
            )
            .join("")}
        </div>
        <a class="alty-forgot" href="#uba-loader-gradient-blob-prototype">Forgot passcode?</a>
      </div>
    </section>
  `;
}

function altyPhoneResult(isPaid) {
  return `
    <section class="alty-phone" aria-label="${isPaid ? "Paid" : "Pending"} airtime result screen">
      <p class="alty-screen-note">Airtime • Result</p>
      <div class="alty-device">
        ${altyStatusBar()}
        <div class="alty-result-top">
          <button class="alty-icon-button" type="button" aria-label="Close">×</button>
          <span>12 Jul 2026, 12:30</span>
        </div>
        <div class="alty-avatar"></div>
        <h2 class="alty-amount">-₦300</h2>
        <p class="alty-transfer-copy">To Bayo • +234 03 456 7890 • 9Mobile</p>
        <p class="alty-transfer-copy">From Current • 7359475637</p>
        ${
          isPaid
            ? `<span class="alty-paid-badge">✓ Paid</span>
               <div class="alty-actions">
                 <button type="button">Receipt</button>
                 <button class="is-primary" type="button">Done</button>
               </div>`
            : ""
        }
        <span class="alty-home-indicator"></span>
      </div>
    </section>
  `;
}

function getPrototypeVariantIndex(type) {
  const variantSet = prototypeMotionVariantSets[type];
  const index = Number(prototypeVariantState[type] || 0);

  if (!variantSet) {
    return 0;
  }

  return Math.max(0, Math.min(variantSet.variants.length - 1, index));
}

function renderPrototypeVariantPager(type, variantSet, activeIndex) {
  const activeVariant = variantSet.variants[activeIndex];

  return `
    <div class="prototype-variant-pager" aria-label="${variantSet.title} variants">
      <span class="prototype-variant-context">${variantSet.title}</span>
      <div class="prototype-variant-buttons">
        ${variantSet.variants
          .map(
            (variant, index) => `
              <button
                class="prototype-variant-button ${index === activeIndex ? "is-active" : ""}"
                type="button"
                data-prototype-variant-type="${type}"
                data-prototype-variant-index="${index}"
                aria-label="Show ${variant.title}"
                aria-pressed="${index === activeIndex}"
              >
                ${String(index + 1).padStart(2, "0")}
              </button>
            `,
          )
          .join("")}
      </div>
      <strong>${activeVariant.title}</strong>
    </div>
  `;
}

function fingerprintIdentityLoader(id = "fingerprint-loader", options = {}) {
  const useShield = Boolean(options.shield);
  const gradientId = `${id}-gradient`;
  const glowId = `${id}-glow`;
  const paths = [
    {
      className: "line-a",
      d: "M283.063 96.4064C283.063 96.4064 241.109 4.60537 153.769 10.1284C106.798 13.0986 57.4328 37.8102 32.3086 79.3485",
    },
    {
      className: "line-b",
      d: "M9.8891 224.71C16.8106 127.806 91.3865 58.2669 163.072 69.017C234.757 79.7671 281.952 161.285 268.484 251.093",
    },
    {
      className: "line-c",
      d: "M12.6089 288.249C12.6089 288.249 50.2168 282.099 58.0426 228.662C67.4907 164.147 104.709 125.248 148.152 129.888C191.596 134.529 222.989 177.002 214.831 238.064C214.831 292.204 256.363 309.015 256.363 309.015M186.895 312.723C193.241 326.072 212.705 355.59 239.799 366.863",
    },
    {
      className: "line-d",
      d: "M122.373 474.402C131.19 467.727 151.396 451.757 161.68 441.275",
    },
    {
      className: "line-e",
      d: "M78.6155 444.273C102.513 429.275 152.434 390.775 160.938 356.758C164.069 368.295 177.65 396.461 206.92 416.832M43.0166 404.224C43.0166 404.224 122.018 348.331 145.611 294.676C160.938 259.819 183.682 193.565 141.655 191.619C99.6288 189.673 114.281 236.595 94.4373 275.642C63.7826 335.963 22.9922 348.041 22.9922 348.041",
    },
  ];

  return `
    <div class="loader-scene fingerprint-loader-scene" role="img" aria-label="Animated fingerprint identity verification loader">
      ${useShield ? '<div class="fingerprint-shield-composite" aria-hidden="true"><img class="fingerprint-shield-image" src="./assets/identity-shield.png" alt="">' : ""}
      <svg class="fingerprint-loader-svg" viewBox="0 0 293 485" aria-hidden="true">
          <defs>
            <linearGradient id="${gradientId}" x1="35" y1="20" x2="255" y2="466" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ff6b58"></stop>
              <stop offset="42%" stop-color="#f11b12"></stop>
              <stop offset="74%" stop-color="#d51709"></stop>
              <stop offset="100%" stop-color="#8f0802"></stop>
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                from="0 146.5 242.5"
                to="360 146.5 242.5"
                dur="4.8s"
                repeatCount="indefinite"
              ></animateTransform>
            </linearGradient>
            <filter id="${glowId}" x="-24%" y="-16%" width="148%" height="132%">
              <feGaussianBlur stdDeviation="6" result="blur"></feGaussianBlur>
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0.55  0 0.18 0 0 0.03  0 0 0.13 0 0.02  0 0 0 0.82 0"
              ></feColorMatrix>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>
          </defs>
          <g class="fingerprint-loader-lines" filter="url(#${glowId})">
            ${paths
              .map(
                (path) => `
                  <path
                    class="fingerprint-loader-line ${path.className}"
                    d="${path.d}"
                    pathLength="100"
                    stroke="url(#${gradientId})"
                  ></path>
                `,
              )
              .join("")}
          </g>
      </svg>
      ${useShield ? "</div>" : ""}
    </div>
  `;
}

function identityScanRevealPrototype() {
  return `
    <div class="alty-identity-motion alty-identity-scan-motion" aria-hidden="true">
      <div class="alty-identity-scan">
        <div class="alty-identity-reveal">
          <img class="alty-identity-scan-user" src="./assets/identity-scan-user.png" alt="">
        </div>
        <img class="alty-identity-scan-frame" src="./assets/identity-scan-frame.png" alt="">
        <img class="alty-identity-scan-bar" src="./assets/identity-scan-bar.png" alt="">
      </div>
    </div>
  `;
}

function identityBustFocusPrototype() {
  return `
    <div class="alty-identity-motion alty-identity-bust-motion" aria-hidden="true">
      <div class="alty-identity-bust-stack">
        <img class="alty-identity-bust-image is-white" src="./assets/identity-user-bust.png" alt="">
        <span class="alty-identity-bust-red-layer">
          <span class="alty-identity-bust-red-fill"></span>
          <img class="alty-identity-bust-image is-red" src="./assets/identity-user-bust-red.png" alt="">
        </span>
      </div>
      <span class="alty-identity-bust-scan"></span>
    </div>
  `;
}

function renderPrototypeMotionElement(slug, contextType = "") {
  const motionMarkup = {
    "progressive-blur-spinner": `
      <div class="loader-scene progressive-scene" role="img" aria-label="Compact red orbit scanner">
        <span class="ambient-orbit orbit-a"></span>
        <span class="ambient-orbit orbit-b"></span>
        ${cometSvg("prototype-red-orbit")}
      </div>
    `,
    "search-spinner-2": `
      <div class="loader-scene progressive-scene search-spinner-2-scene" role="img" aria-label="Compact gradient magnifier spinner">
        <span class="ambient-orbit orbit-a"></span>
        <span class="ambient-orbit orbit-b"></span>
        ${cometSvg("prototype-gradient-search", "neutral")}
        ${searchSpinnerIcon("neutral")}
      </div>
    `,
    "search-spinner-2-white-ripple": `
      <div class="loader-scene progressive-scene search-spinner-2-white-ripple-scene" role="img" aria-label="Compact magnifier ripple pulse">
        ${searchSpinnerRippleField()}
        ${searchSpinnerWhiteIcon()}
      </div>
    `,
    "search-icon-animation": `
      <div class="loader-scene search-icon-animation-scene search-spinner-3-scene" role="img" aria-label="Compact floating magnifier icon">
        ${searchSpinnerIllustration()}
      </div>
    `,
    "search-red-magnifier-loader": `
      <div class="loader-scene search-icon-animation-scene search-red-magnifier-scene" role="img" aria-label="Compact red magnifier loader">
        ${searchRedMagnifierIllustration()}
      </div>
    `,
    "identity-verification-motion": fingerprintIdentityLoader("prototype-fingerprint", { shield: true }),
    "identity-scan-reveal": identityScanRevealPrototype(),
    "identity-bust-focus": identityBustFocusPrototype(),
    "progressive-blur-spinner-solo": `
      <div class="loader-scene progressive-solo-scene" role="img" aria-label="Compact red comet arc">
        ${cometSvg("prototype-core-comet")}
      </div>
    `,
    "minimalist-spinner": `
      <div class="loader-scene minimalist-scene" role="img" aria-label="Compact minimalist spinner">
        <svg class="minimal-svg" viewBox="0 0 120 120" aria-hidden="true">
          <g class="svg-spin medium-spin">
            <circle class="minimal-trail" cx="60" cy="60" r="34" pathLength="100"></circle>
          </g>
        </svg>
      </div>
    `,
    "uba-spinner-1": ubaLottieSpinnerScene("uba-spinner-1", "Compact UBA spinner 1"),
    "uba-spinner-1-red": ubaLottieSpinnerScene("uba-spinner-1", "Compact UBA spinner 1 red", "red"),
    "uba-spinner-2": ubaLottieSpinnerScene("uba-spinner-2", "Compact UBA spinner 2"),
    "uba-spinner-2-red": ubaLottieSpinnerScene("uba-spinner-2", "Compact UBA spinner 2 red", "red"),
    "silver-uba-coin": silverUbaCoinPrototype(),
    "uba-card-rotation": ubaCardRotationPrototype(),
    "success-wheel-2": successWheelTwoPrototype(),
    "success-spinner-neutral": successWheelTwoPrototype("neutral"),
    "success-spinner-green": successWheelTwoPrototype("green"),
    "verification-badge": verificationBadgePrototype(),
    "failure-wheel-red": successWheelTwoPrototype("red", "error"),
    "failure-wheel-neutral": successWheelTwoPrototype("neutral", "error"),
    "failure-verification-badge": verificationBadgePrototype("error"),
    "pull-to-refresh-blob-capsule": renderPrototypeRefreshGesture("blob"),
    "pull-to-refresh-glass-capsule": renderPrototypeRefreshGesture("clean"),
    "pull-to-refresh-neutral-capsule": renderPrototypeRefreshGesture("neutral"),
    "pull-to-refresh-neutral-capsule-2": renderPrototypeRefreshGesture("neutral-complete"),
    "flip-coin-pull-to-refresh-red": renderPrototypeRefreshGesture("flip-red"),
    "flip-coin-pull-to-refresh-white": renderPrototypeRefreshGesture("flip-white"),
  };

  return `<div class="prototype-motion-render">${motionMarkup[slug] || ""}</div>`;
}

function renderPrototypeRefreshGesture(variant) {
  const variantClasses = {
    blob: "ptr-blob-capsule",
    clean: "ptr-clean-capsule",
    neutral: "ptr-neutral-capsule",
    "neutral-complete": "ptr-neutral-capsule ptr-neutral-complete-capsule",
    "flip-red": "ptr-clean-capsule ptr-flip-capsule ptr-flip-red-capsule",
    "flip-white": "ptr-neutral-capsule ptr-flip-capsule ptr-flip-white-capsule",
  };
  const hasSuccessCheck = variant === "blob" || variant === "clean" || variant === "neutral-complete";
  const isFlipCoin = variant === "flip-red" || variant === "flip-white";

  return `
    <div class="prototype-refresh-gesture ${variantClasses[variant]}" aria-hidden="true">
      <div class="ptr-capsule">
        ${variant === "blob" ? pullRefreshBlobField() : ""}
        ${isFlipCoin ? pullRefreshFlipCoin() : '<span class="ptr-indicator"></span>'}
        ${hasSuccessCheck ? pullRefreshSuccessCheck() : ""}
      </div>
    </div>
  `;
}

function altyMockupMotionSlot(type, slotStyle = "") {
  const variantSet = prototypeMotionVariantSets[type];

  if (!variantSet) {
    return "";
  }

  const activeIndex = getPrototypeVariantIndex(type);
  const activeVariant = variantSet.variants[activeIndex];

  return `
    <div class="alty-mock-motion-slot is-${type} ${slotStyle ? `is-${slotStyle}` : ""}" data-motion-source="${activeVariant.slug}" aria-hidden="true">
      ${renderPrototypeMotionElement(activeVariant.slug, type)}
    </div>
  `;
}

function altyMockupPrototype(type) {
  const labels = {
    pending: "Pending account-opening screen",
    almost: "Almost there onboarding screen",
    biometrics: "Enable biometrics onboarding screen",
    identity: "Identity verification onboarding screen",
    otp: "6-digit verification code login screen",
    searching: "Searching screen with keyboard",
    success: "Successful account-opening screen",
    failed: "Could not load results screen",
    pull: "Pull-to-refresh transaction history screen",
  };
  const variantSet = prototypeMotionVariantSets[type];
  const activeIndex = getPrototypeVariantIndex(type);

  return `
    <div class="alty-mockup-prototype alty-mockup-${type}-prototype" role="group" aria-label="${labels[type]}">
      <article class="alty-mockup-stage ${variantSet ? "has-prototype-variant-pager" : ""}">
        ${variantSet ? renderPrototypeVariantPager(type, variantSet, activeIndex) : ""}
        ${altyMockupPhone(type)}
      </article>
    </div>
  `;
}

function altyMockupPhone(type) {
  const screens = {
    pending: altyMockupPendingScreen,
    almost: altyMockupAlmostScreen,
    biometrics: altyMockupBiometricsScreen,
    identity: altyMockupIdentityScreen,
    otp: altyMockupOtpScreen,
    searching: altyMockupSearchingScreen,
    success: altyMockupSuccessScreen,
    failed: altyMockupFailedScreen,
    pull: altyMockupPullScreen,
  };

  return `
    <section class="alty-mock-phone alty-mock-phone-${type}">
      ${screens[type]()}
    </section>
  `;
}

function altyMockupStatusBar() {
  return `
    <div class="alty-mock-statusbar" aria-hidden="true">
      <span>9:41</span>
      <span class="alty-mock-system-icons">
        <span class="alty-mock-cellular"><i></i><i></i><i></i></span>
        <svg class="alty-mock-wifi" viewBox="0 0 18 13" aria-hidden="true" focusable="false">
          <path d="M1.5 3.8C5.8 0.8 12.2 0.8 16.5 3.8"></path>
          <path d="M4.5 7C7.1 5.2 10.9 5.2 13.5 7"></path>
          <path d="M7.3 10C8.3 9.3 9.7 9.3 10.7 10"></path>
          <circle cx="9" cy="11.4" r="1"></circle>
        </svg>
        <span class="alty-mock-battery"><i></i></span>
      </span>
    </div>
  `;
}

function altyMockupTopBar(options = {}) {
  const { action = "", backLabel = "Back", quiet = false } = options;

  return `
    <div class="alty-mock-topbar ${quiet ? "is-quiet" : ""}">
      <button class="alty-mock-icon-button" type="button" aria-label="${backLabel}">
        <span aria-hidden="true">←</span>
      </button>
      ${action ? `<a class="alty-mock-top-action" href="#${getCurrentSlug()}">${action}</a>` : ""}
    </div>
  `;
}

function altyMockupPendingScreen() {
  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-pending-content">
      ${altyMockupMotionSlot("pending", "hero")}
      <div class="alty-mock-copy-block">
        <h2>We're opening your account</h2>
        <p>This usually takes up to N hours. We'll notify you as soon as it's ready.</p>
      </div>
    </main>
    <footer class="alty-mock-footer is-single">
      ${altyMockupButton("Go home", "primary")}
    </footer>
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupAlmostScreen() {
  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-onboarding-content">
      <div class="alty-mock-copy-block">
        <h2>Almost there...</h2>
        <p>We're setting up your account, this usually takes a couple of minutes. We'll let you know the moment it's ready.</p>
      </div>
      ${altyMockupMotionSlot("almost", "center")}
    </main>
    <footer class="alty-mock-footer">
      ${altyMockupButton("Notify me", "secondary")}
      ${altyMockupButton("Go to Home", "primary")}
    </footer>
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupBiometricsScreen() {
  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-identity-content alty-mock-biometric-content">
      <div class="alty-mock-copy-block">
        <h2>Enable biometrics</h2>
        <p>You can turn on biometrics for a faster login.</p>
      </div>
      ${altyMockupMotionSlot("biometrics", "biometric")}
    </main>
    <footer class="alty-mock-footer">
      ${altyMockupButton("Set it up later", "secondary")}
      ${altyMockupButton("Start", "primary")}
    </footer>
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupIdentityScreen() {
  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-identity-content alty-mock-verification-content">
      <div class="alty-mock-copy-block">
        <h2>Identity verification</h2>
        <p>Now, find a well-lit spot and take a photo of your face so we know it’s really you. To proceed, click “Start” or select another method if you are unable to take a photo.</p>
      </div>
      ${altyMockupMotionSlot("identity", "verification")}
    </main>
    <footer class="alty-mock-footer is-single">
      ${altyMockupButton("Continue with phone number", "primary")}
    </footer>
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupOtpScreen() {
  const digits = ["1", "2", "3", "5", "3", "3"];
  const otpOffsets = [154, 92, 31, -31, -92, -154];

  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-otp-content">
      <div class="alty-mock-copy-block">
        <h2>6-digit code</h2>
        <p>We've sent a 6-digit verification code to mobile phone <strong>+234 ** *** 4000</strong>.</p>
      </div>
      <div class="alty-mock-otp-stack" aria-label="Verification code 1 2 3 5 3 3">
        <div class="alty-mock-otp-cells" aria-hidden="true">
          ${digits
            .map(
              (digit, index) => `
                <span style="--otp-index:${index}; --otp-shift:${otpOffsets[index]}px;">
                  <b>${digit}</b>
                </span>
              `,
            )
            .join("")}
          <svg class="alty-mock-otp-success" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="25"></circle>
            <path d="M20 33.5 29 42 45 23"></path>
          </svg>
        </div>
        <p class="alty-mock-resend">Didn't get the code? <a href="#six-digit-code">Resend code</a></p>
      </div>
    </main>
  `;
}

function altyMockupSearchingScreen() {
  return `
    ${altyMockupStatusBar()}
    <div class="alty-mock-search-top">
      <label class="alty-mock-search-field">
        ${altyMockupSearchGlyph()}
        <span>Vod</span>
        <i aria-hidden="true"></i>
        <button type="button" aria-label="Clear search">×</button>
      </label>
      <button class="alty-mock-round-action" type="button" aria-label="Close">×</button>
    </div>
    <main class="alty-mock-search-body">
      ${altyMockupMotionSlot("searching", "search")}
    </main>
    ${altyMockupKeyboard()}
  `;
}

function altyMockupSuccessScreen() {
  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-success-content">
      <div class="alty-mock-copy-block">
        <h2>Your account<br>successfully opened!</h2>
        <p>Your account details are below. Go to the Home screen to fund your account and start using it.</p>
      </div>
      ${altyMockupMotionSlot("success", "success")}
      <div class="alty-mock-details-stack">
        <section class="alty-mock-detail-card">
          ${altyMockupDetailRow("Name", "Balogun Seyi")}
          ${altyMockupDetailRow("Account number", "0123456789")}
        </section>
        <section class="alty-mock-detail-card is-large">
          <header>
            <span>Additional account details</span>
            <i aria-hidden="true">⌃</i>
          </header>
          ${altyMockupDetailRow("Tier", "1")}
          ${altyMockupDetailRow("Account type", "Savings")}
          ${altyMockupDetailRow("Currency", "Naira")}
        </section>
      </div>
    </main>
    <footer class="alty-mock-footer">
      ${altyMockupButton("Open card", "secondary")}
      ${altyMockupButton("Go to Home", "primary")}
    </footer>
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupFailedScreen() {
  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-failed-content">
      ${altyMockupMotionSlot("failed", "success")}
      <div class="alty-mock-copy-block">
        <h2>Couldn't load results</h2>
        <p>Check your connection and try again.</p>
      </div>
    </main>
    <footer class="alty-mock-footer is-single">
      ${altyMockupButton("Try again", "primary")}
    </footer>
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupPullScreen() {
  return `
    <div class="alty-mock-pull-header">
      ${altyMockupStatusBar()}
      ${altyMockupTopBar()}
      <div class="alty-mock-title-row">
        <h2>Transaction history</h2>
      </div>
      <div class="alty-mock-filter-row">
        <label class="alty-mock-search-field is-placeholder">
          ${altyMockupSearchGlyph()}
          <span>Search...</span>
        </label>
        <button class="alty-mock-round-action" type="button" aria-label="Filter">
          <span aria-hidden="true">≡</span>
        </button>
      </div>
    </div>
    <main class="alty-mock-transaction-list">
      ${altyMockupMotionSlot("pull", "pull")}
      <div class="alty-mock-transaction-content">
        ${altyMockupTransactionGroup("Today", "₦ 2,000.00", [
          ["airtel", "Airtel", "- ₦ 1,200.00", "Data • 3:45 PM", "From • 7890"],
          ["eko", "Eko Electricity", "- ₦ 650.00", "Electricity • 11:05 AM", "From • 7890"],
          ["mtn", "MTN", "- ₦ 150.00", "Airtime • 9:30 AM", "From • 7890"],
        ], altyMockupRefreshTransaction())}
        ${altyMockupTransactionGroup("Yesterday", "₦ 54,900.00", [
          ["chinedu", "Chinedu Okafor", "- ₦ 3,500.00", "Money transfer • 4:20 PM", "From • 7890"],
          ["bolt-green", "Bolt", "- ₦ 1,200.00", "Taxi • 2:15 PM", "From • 7890"],
          ["ngozi", "Ngozi Nwosu", "+ ₦ 50,000.00", "Money transfer • 9:00 AM", "To • 7890"],
          ["mobile", "9mobile", "- ₦ 200.00", "Airtime • 10:45 AM", "From • 7890"],
        ])}
        ${altyMockupTransactionGroup("Jul 12", "₦ 1,850.00", [
          ["eko", "Eko Electricity", "- ₦ 650.00", "Electricity • 11:05 AM", "From • 7890"],
        ])}
      </div>
    </main>
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupHourglass() {
  return `
    <div class="alty-mock-hourglass" aria-hidden="true">
      <span class="alty-hourglass-cap is-top"></span>
      <span class="alty-hourglass-cap is-bottom"></span>
      <span class="alty-hourglass-column is-left"></span>
      <span class="alty-hourglass-column is-right"></span>
      <span class="alty-hourglass-glass">
        <span class="alty-hourglass-sand is-upper"></span>
        <span class="alty-hourglass-sand is-lower"></span>
        <span class="alty-hourglass-stream"></span>
      </span>
      <span class="alty-hourglass-badge">•••</span>
    </div>
  `;
}

function altyMockupButton(label, variant) {
  return `
    <button class="alty-mock-liquid-button is-${variant}" type="button">
      <span>${label}</span>
    </button>
  `;
}

function altyMockupHomeIndicator() {
  return `<span class="alty-mock-home-indicator" aria-hidden="true"></span>`;
}

function altyMockupDetailRow(label, value) {
  return `
    <div class="alty-mock-detail-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function altyMockupSearchGlyph() {
  return `
    <svg class="alty-mock-search-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="5.8"></circle>
      <path d="M15.2 15.2 L20 20"></path>
    </svg>
  `;
}

function altyMockupSearchIllustration() {
  return `
    <div class="alty-mock-empty-search" aria-hidden="true">
      <img src="./assets/search-magnifier.png" alt="">
      <span></span>
    </div>
  `;
}

function altyMockupKeyboard() {
  const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  return `
    <div class="alty-mock-keyboard" aria-hidden="true">
      <div class="alty-mock-suggestions">
        <span>"The"</span>
        <span>the</span>
        <span>to</span>
      </div>
      <div class="alty-mock-key-rows">
        ${rows
          .map(
            (row, index) => `
              <div class="alty-mock-key-row row-${index + 1}">
                ${index === 2 ? '<span class="alty-mock-key is-wide">⇧</span>' : ""}
                ${row
                  .split("")
                  .map((key) => `<span class="alty-mock-key">${key}</span>`)
                  .join("")}
                ${index === 2 ? '<span class="alty-mock-key is-wide">⌫</span>' : ""}
              </div>
            `,
          )
          .join("")}
        <div class="alty-mock-key-row row-4">
          <span class="alty-mock-key is-control">ABC</span>
          <span class="alty-mock-key is-space"></span>
          <span class="alty-mock-key is-return">↵</span>
        </div>
      </div>
      <div class="alty-mock-keyboard-tools">
        <span></span>
        <span></span>
      </div>
    </div>
  `;
}

function altyMockupLoadingState() {
  return `
    <div class="alty-mock-loading-state" aria-hidden="true">
      <span class="alty-mock-loading-spinner"></span>
      <span>loading...</span>
    </div>
  `;
}

function altyMockupRefreshTransaction() {
  return `
    <article class="alty-mock-transaction-item alty-mock-refresh-transaction">
      <span class="alty-mock-transaction-icon is-mobile" aria-hidden="true"></span>
      <div class="alty-mock-transaction-copy">
        <div>
          <strong>9mobile</strong>
          <b>- ₦ 300.00</b>
        </div>
        <div>
          <p>Airtime • Just now</p>
          <p>From • 7890</p>
        </div>
      </div>
    </article>
  `;
}

function altyMockupTransactionGroup(title, total, items, leadingMarkup = "") {
  return `
    <section class="alty-mock-transaction-group">
      <header>
        <span>${title}</span>
        <strong>${total}</strong>
      </header>
      ${leadingMarkup}
      ${items
        .map(
          ([icon, name, amount, meta, direction]) => `
            <article class="alty-mock-transaction-item">
              <span class="alty-mock-transaction-icon is-${icon}" aria-hidden="true"></span>
              <div class="alty-mock-transaction-copy">
                <div>
                  <strong>${name}</strong>
                  <b class="${amount.startsWith("+") ? "is-positive" : ""}">${amount}</b>
                </div>
                <div>
                  <p>${meta}</p>
                  <p>${direction}</p>
                </div>
              </div>
            </article>
          `,
        )
        .join("")}
    </section>
  `;
}

function getCurrentSlug() {
  const rawSlug = window.location.hash.replace("#", "");
  const slug = routeAliases[rawSlug] || rawSlug;
  return pages.some((page) => page.slug === slug) ? slug : pages[0].slug;
}

function renderPageLink(page, index, activePage) {
  return `
    <a
      class="page-link ${page.slug === activePage.slug ? "is-active" : ""}"
      href="#${page.slug}"
      aria-current="${page.slug === activePage.slug ? "page" : "false"}"
    >
      <span>${String(index + 1).padStart(2, "0")}</span>
      ${page.title}
    </a>
  `;
}

function renderPageNav(sectionPages, activePage, activeSection) {
  const sectionIndex = new Map(sectionPages.map((page, index) => [page.slug, index]));
  const sectionBySlug = new Map(sectionPages.map((page) => [page.slug, page]));
  const groups = navGroups[activeSection] || [
    {
      title: activeSection === "prototypes" ? "Prototypes" : "Motion elements",
      slugs: sectionPages.map((page) => page.slug),
    },
  ];
  const usedSlugs = new Set();
  const renderedGroups = groups
    .map((group) => {
      const groupPages = group.slugs
        .map((slug) => sectionBySlug.get(slug))
        .filter(Boolean);

      groupPages.forEach((page) => usedSlugs.add(page.slug));

      if (!groupPages.length) {
        return "";
      }

      const isActiveGroup = groupPages.some((page) => page.slug === activePage.slug);

      return `
        <section class="page-nav-group ${isActiveGroup ? "is-active" : ""}">
          <h2 class="page-nav-heading">${group.title}</h2>
          <div class="page-nav-children">
            ${groupPages
              .map((page) => renderPageLink(page, sectionIndex.get(page.slug), activePage))
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
  const ungroupedPages = sectionPages.filter((page) => !usedSlugs.has(page.slug));
  const ungroupedGroup = ungroupedPages.length
    ? `
      <section class="page-nav-group">
        <h2 class="page-nav-heading">Other</h2>
        <div class="page-nav-children">
          ${ungroupedPages
            .map((page) => renderPageLink(page, sectionIndex.get(page.slug), activePage))
            .join("")}
        </div>
      </section>
    `
    : "";

  return `${renderedGroups}${ungroupedGroup}`;
}

function render() {
  const currentSlug = getCurrentSlug();
  const activePage = pages.find((page) => page.slug === currentSlug) || pages[0];
  const activeSection = getPageSection(activePage);
  const sectionPages = pages.filter((page) => getPageSection(page) === activeSection);
  const sectionControls = `
    <nav class="section-switch" aria-label="Gallery section">
      <a
        class="section-choice ${activeSection === "motion" ? "is-active" : ""}"
        href="#${pages.find((page) => getPageSection(page) === "motion").slug}"
        aria-current="${activeSection === "motion" ? "page" : "false"}"
      >
        Motion elements
      </a>
      <a
        class="section-choice ${activeSection === "prototypes" ? "is-active" : ""}"
        href="#${pages.find((page) => getPageSection(page) === "prototypes").slug}"
        aria-current="${activeSection === "prototypes" ? "page" : "false"}"
      >
        Prototypes
      </a>
    </nav>
  `;
  const themeControls = `
    <div class="theme-pager theme-toggle" aria-label="Website theme">
      <button
        class="theme-choice theme-choice-dark ${prototypeTheme === "dark" ? "is-active" : ""}"
        type="button"
        data-theme-choice="dark"
        aria-label="Black theme"
        aria-pressed="${prototypeTheme === "dark"}"
      >
        <span aria-hidden="true"></span>
      </button>
      <button
        class="theme-choice theme-choice-light ${prototypeTheme === "light" ? "is-active" : ""}"
        type="button"
        data-theme-choice="light"
        aria-label="White theme"
        aria-pressed="${prototypeTheme === "light"}"
      >
        <span aria-hidden="true"></span>
      </button>
    </div>
  `;
  const headerControls = `
    <div class="header-control-row">
      ${sectionControls}
      ${themeControls}
    </div>
  `;

  app.dataset.accent = activePage.accent;
  app.dataset.prototypeTheme = prototypeTheme === "light" ? "light" : "dark";
  document.documentElement.dataset.prototypeTheme = prototypeTheme === "light" ? "light" : "dark";
  app.innerHTML = `
    <aside class="side-rail" aria-label="Loader pages">
      <a class="brand-mark" href="#${pages[0].slug}" aria-label="Loader Motion Lab home">
        <span></span>
        <strong>Loader Motion Lab</strong>
      </a>
      <nav class="page-nav">
        ${renderPageNav(sectionPages, activePage, activeSection)}
      </nav>
    </aside>
    <main class="page-view">
      <section class="page-heading" aria-labelledby="page-title">
        <div class="heading-top">${headerControls}</div>
        <h1 id="page-title">${activePage.title}</h1>
      </section>
      <section class="stage-band">
        ${activePage.scene()}
      </section>
    </main>
  `;

  initPullZones();
  initThemeSwitchers();
  initPrototypeVariantPagers();
  initUbaLottieSpinners();
}

function initThemeSwitchers() {
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.getAttribute("data-theme-choice") === "light" ? "light" : "dark";
      prototypeTheme = theme;
      app.dataset.prototypeTheme = theme;
      document.documentElement.dataset.prototypeTheme = theme;

      try {
        window.localStorage.setItem("loader-motion-theme", theme);
      } catch {
        // Theme persistence is optional.
      }

      document.querySelectorAll("[data-theme-choice]").forEach((themeButton) => {
        const isActive = themeButton.getAttribute("data-theme-choice") === theme;
        themeButton.classList.toggle("is-active", isActive);
        themeButton.setAttribute("aria-pressed", String(isActive));
      });
    });
  });
}

function initPrototypeVariantPagers() {
  document.querySelectorAll("[data-prototype-variant-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.getAttribute("data-prototype-variant-type");
      const index = Number(button.getAttribute("data-prototype-variant-index"));

      if (!type || Number.isNaN(index)) {
        return;
      }

      prototypeVariantState[type] = index;
      render();
    });
  });
}

function initUbaLottieSpinners() {
  if (ubaLottieSpinnerFrame) {
    window.cancelAnimationFrame(ubaLottieSpinnerFrame);
    ubaLottieSpinnerFrame = 0;
  }

  const containers = Array.from(document.querySelectorAll("[data-uba-lottie-spinner]"));
  if (!containers.length) {
    return;
  }

  const spinnerData = window.ubaSpinnerData || {};
  const instances = containers
    .map((container) => createUbaLottieSpinnerInstance(container, spinnerData[container.dataset.ubaLottieSpinner]))
    .filter(Boolean);

  if (!instances.length) {
    return;
  }

  const startTime = window.performance.now();

  const tick = (now) => {
    instances.forEach((instance) => {
      const duration = instance.durationMs || 1000;
      const elapsed = (now - startTime) % (duration * 2);
      const progressFrame = elapsed <= duration ? elapsed / duration : 2 - elapsed / duration;
      const frame = instance.ip + progressFrame * (instance.op - instance.ip);
      updateUbaLottieSpinnerInstance(instance, frame);
    });

    ubaLottieSpinnerFrame = window.requestAnimationFrame(tick);
  };

  tick(startTime);
}

function createUbaLottieSpinnerInstance(container, data) {
  if (!data) {
    container.dataset.lottieState = "missing";
    return null;
  }

  const svgNamespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNamespace, "svg");
  const animatedTransforms = [];
  const width = Number(data.w) || 1200;
  const height = Number(data.h) || 1200;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("uba-lottie-svg");

  data.layers.forEach((layer) => {
    const layerGroup = document.createElementNS(svgNamespace, "g");
    const layerOpacity = sampleLottieProperty(layer.ks?.o, 0, 100);
    layerGroup.style.opacity = String(Number(layerOpacity) / 100);

    (layer.shapes || []).forEach((shape) => {
      const child = createUbaLottieShapeNode(shape, animatedTransforms, svgNamespace);
      if (child) {
        layerGroup.appendChild(child);
      }
    });

    svg.appendChild(layerGroup);
  });

  container.replaceChildren(svg);

  return {
    animatedTransforms,
    durationMs: (((Number(data.op) || 500) - (Number(data.ip) || 0)) / (Number(data.fr) || 60)) * 1000,
    ip: Number(data.ip) || 0,
    op: Number(data.op) || 500,
  };
}

function createUbaLottieShapeNode(item, animatedTransforms, svgNamespace) {
  if (!item) {
    return null;
  }

  if (item.ty === "gr") {
    const group = document.createElementNS(svgNamespace, "g");
    const transform = (item.it || []).find((child) => child.ty === "tr");
    const pendingPaths = [];

    if (transform) {
      animatedTransforms.push({ node: group, transform });
      applyUbaLottieTransform(group, transform, 0);
    }

    (item.it || []).forEach((child) => {
      if (child.ty === "tr") {
        return;
      }

      if (child.ty === "sh") {
        const path = document.createElementNS(svgNamespace, "path");
        path.setAttribute("d", lottiePathToSvgPath(child.ks?.k));
        path.setAttribute("fill", "currentColor");
        group.appendChild(path);
        pendingPaths.push(path);
        return;
      }

      if (child.ty === "fl") {
        const fill = lottieColorToCss(child.c?.k);
        pendingPaths.splice(0).forEach((path) => {
          path.setAttribute("fill", fill || "currentColor");
          path.style.opacity = String((Number(child.o?.k) || 100) / 100);
        });
        return;
      }

      const nested = createUbaLottieShapeNode(child, animatedTransforms, svgNamespace);
      if (nested) {
        group.appendChild(nested);
      }
    });

    return group;
  }

  return null;
}

function updateUbaLottieSpinnerInstance(instance, frame) {
  instance.animatedTransforms.forEach(({ node, transform }) => {
    applyUbaLottieTransform(node, transform, frame);
  });
}

function applyUbaLottieTransform(node, transform, frame) {
  const position = sampleLottieProperty(transform.p, frame, [0, 0]);
  const anchor = sampleLottieProperty(transform.a, frame, [0, 0]);
  const scale = sampleLottieProperty(transform.s, frame, [100, 100]);
  const rotation = sampleLottieProperty(transform.r, frame, [0]);
  const opacity = sampleLottieProperty(transform.o, frame, 100);
  const positionX = lottieValueAt(position, 0, 0);
  const positionY = lottieValueAt(position, 1, 0);
  const anchorX = lottieValueAt(anchor, 0, 0);
  const anchorY = lottieValueAt(anchor, 1, 0);
  const scaleX = lottieValueAt(scale, 0, 100) / 100;
  const scaleY = lottieValueAt(scale, 1, lottieValueAt(scale, 0, 100)) / 100;
  const rotationValue = lottieValueAt(rotation, 0, rotation);

  node.setAttribute(
    "transform",
    [
      `translate(${formatLottieNumber(positionX)} ${formatLottieNumber(positionY)})`,
      `rotate(${formatLottieNumber(rotationValue)})`,
      `scale(${formatLottieNumber(scaleX)} ${formatLottieNumber(scaleY)})`,
      `translate(${formatLottieNumber(-anchorX)} ${formatLottieNumber(-anchorY)})`,
    ].join(" "),
  );
  node.style.opacity = String(Math.max(0, Math.min(1, Number(opacity) / 100)));
}

function sampleLottieProperty(property, frame, fallback) {
  const value = property?.k ?? property ?? fallback;

  if (!Array.isArray(value)) {
    return value ?? fallback;
  }

  if (!value.length || typeof value[0] !== "object" || value[0] === null || !("t" in value[0])) {
    return value;
  }

  if (frame <= value[0].t) {
    return value[0].s ?? fallback;
  }

  for (let index = 0; index < value.length - 1; index += 1) {
    const current = value[index];
    const next = value[index + 1];

    if (frame >= current.t && frame <= next.t) {
      const span = Math.max(1, next.t - current.t);
      const rawProgress = (frame - current.t) / span;
      const easedProgress = easeLottieKeyframe(current, next, rawProgress);
      return interpolateLottieValue(current.s ?? fallback, next.s ?? current.e ?? current.s ?? fallback, easedProgress);
    }
  }

  return value[value.length - 1].s ?? fallback;
}

function easeLottieKeyframe(current, next, progress) {
  if (current.h === 1) {
    return 0;
  }

  const outX = lottieValueAt(current.o?.x, 0, 0.42);
  const outY = lottieValueAt(current.o?.y, 0, 0);
  const inX = lottieValueAt(current.i?.x ?? next.i?.x, 0, 0.58);
  const inY = lottieValueAt(current.i?.y ?? next.i?.y, 0, 1);

  return cubicBezierY(progress, outX, outY, inX, inY);
}

function cubicBezierY(progress, x1, y1, x2, y2) {
  const sample = (t, a1, a2) => {
    const inverse = 1 - t;
    return 3 * inverse * inverse * t * a1 + 3 * inverse * t * t * a2 + t * t * t;
  };
  const derivative = (t, a1, a2) =>
    3 * (1 - t) * (1 - t) * a1 + 6 * (1 - t) * t * (a2 - a1) + 3 * t * t * (1 - a2);

  let t = progress;
  for (let index = 0; index < 6; index += 1) {
    const x = sample(t, x1, x2) - progress;
    const d = derivative(t, x1, x2);
    if (Math.abs(x) < 0.00001 || Math.abs(d) < 0.00001) {
      break;
    }
    t = Math.min(1, Math.max(0, t - x / d));
  }

  return sample(t, y1, y2);
}

function interpolateLottieValue(start, end, progress) {
  if (Array.isArray(start) || Array.isArray(end)) {
    const startValues = Array.isArray(start) ? start : [Number(start) || 0];
    const endValues = Array.isArray(end) ? end : [Number(end) || 0];
    const length = Math.max(startValues.length, endValues.length);
    return Array.from({ length }, (_, index) => {
      const from = Number(startValues[index] ?? startValues[0] ?? 0);
      const to = Number(endValues[index] ?? endValues[0] ?? from);
      return from + (to - from) * progress;
    });
  }

  return Number(start) + (Number(end) - Number(start)) * progress;
}

function lottiePathToSvgPath(shape) {
  if (!shape?.v?.length) {
    return "";
  }

  const { v: vertices, i: inTangents, o: outTangents, c: closed } = shape;
  const commands = [`M ${formatLottiePoint(vertices[0])}`];
  const segmentCount = closed ? vertices.length : vertices.length - 1;

  for (let index = 0; index < segmentCount; index += 1) {
    const nextIndex = (index + 1) % vertices.length;
    const current = vertices[index];
    const next = vertices[nextIndex];
    const out = outTangents?.[index] || [0, 0];
    const inn = inTangents?.[nextIndex] || [0, 0];
    const cp1 = [current[0] + out[0], current[1] + out[1]];
    const cp2 = [next[0] + inn[0], next[1] + inn[1]];

    commands.push(`C ${formatLottiePoint(cp1)} ${formatLottiePoint(cp2)} ${formatLottiePoint(next)}`);
  }

  if (closed) {
    commands.push("Z");
  }

  return commands.join(" ");
}

function lottieColorToCss(color) {
  if (!Array.isArray(color)) {
    return "currentColor";
  }

  const [red, green, blue, alpha = 1] = color;

  if (red === 1 && green === 1 && blue === 1) {
    return "currentColor";
  }

  return `rgba(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(blue * 255)}, ${alpha})`;
}

function lottieValueAt(value, index, fallback) {
  if (Array.isArray(value)) {
    return Number(value[index] ?? fallback ?? 0);
  }

  return Number(value ?? fallback ?? 0);
}

function formatLottiePoint(point) {
  return `${formatLottieNumber(point[0])} ${formatLottieNumber(point[1])}`;
}

function formatLottieNumber(value) {
  return Number(value).toFixed(3).replace(/\.?0+$/, "");
}

function initPullZones() {
  document.querySelectorAll("[data-pull-zone]").forEach((zone) => {
    let startY = 0;
    let active = false;

    const setPull = (value) => {
      const pull = Math.max(0, Math.min(100, value));
      zone.style.setProperty("--pull", String(pull));
      zone.dataset.ready = pull > 68 ? "true" : "false";
    };

    const reset = () => {
      setPull(0);
    };

    const refresh = () => {
      zone.classList.add("is-refreshing");
      zone.dataset.ready = "true";
      setPull(74);
      window.setTimeout(() => {
        zone.classList.remove("is-refreshing");
        reset();
      }, 1200);
    };

    zone.addEventListener("pointerdown", (event) => {
      if (event.target.closest("[data-trigger-refresh]")) {
        return;
      }

      active = true;
      startY = event.clientY;
      zone.setPointerCapture(event.pointerId);
      zone.classList.add("is-pulling");
    });

    zone.addEventListener("pointermove", (event) => {
      if (!active) {
        return;
      }

      setPull((event.clientY - startY) * 0.78);
    });

    const finishPull = () => {
      if (!active) {
        return;
      }

      active = false;
      zone.classList.remove("is-pulling");
      const pull = Number(zone.style.getPropertyValue("--pull") || 0);
      if (pull > 68) {
        refresh();
      } else {
        reset();
      }
    };

    zone.addEventListener("pointerup", finishPull);
    zone.addEventListener("pointercancel", finishPull);

    zone.querySelector("[data-trigger-refresh]")?.addEventListener("click", refresh);
  });
}

window.addEventListener("hashchange", render);

if (!window.location.hash) {
  window.location.hash = pages[0].slug;
}

render();
