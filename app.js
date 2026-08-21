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
    slug: "uba-icon-loop",
    title: "UBA icon loop",
    accent: "ink",
    label: "White loader-icon set (bank, card, earth, naira, security, wallet) drawing in, then reverse-erasing, one after another in an infinite loop.",
    scene: () => `
      ${ubaIconLoopScene()}
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
    slug: "account-opening-almost-there",
    title: "Core spinners",
    accent: "ink",
    section: "prototypes",
    themeable: true,
    label: "Almost-there onboarding mockup with glass footer actions.",
    scene: () => `
      ${altyMockupPrototype("almost")}
    `,
  },
  {
    slug: "core-spinners-02",
    title: "Standard success",
    accent: "ink",
    section: "prototypes",
    themeable: true,
    label: "Standard success feedback variants inside a phone mockup.",
    scene: () => `
      ${altyMockupPrototype("standard-success", { variantType: "core-spinner-02" })}
    `,
  },
  {
    slug: "account-opening-success",
    title: "Account Opened Success",
    accent: "green",
    section: "prototypes",
    themeable: true,
    label: "Successful account-opening mockup with details cards.",
    scene: () => `
      ${altyMockupPrototype("success")}
    `,
  },
  {
    slug: "account-opening-success-lift",
    title: "Account Opened Success (lift)",
    accent: "green",
    section: "prototypes",
    themeable: true,
    label: "Success mockup where each checkmark dissolves and the content beneath lifts into its place.",
    scene: () => `
      ${altyMockupPrototype("success", { lift: true })}
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
    slug: "couldnt-load-results",
    title: "Standard error",
    accent: "red",
    section: "prototypes",
    themeable: true,
    label: "Couldn't load results mockup using error feedback variants resolved with an X.",
    scene: () => `
      ${altyMockupPrototype("failed")}
    `,
  },
  {
    slug: "code-error",
    title: "Code error",
    accent: "red",
    section: "prototypes",
    themeable: true,
    label: "6-digit code mockup where an invalid code shakes the input row, turns the border red, and fires an error haptic.",
    scene: () => `
      ${altyMockupPrototype("otp-error")}
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
    slug: "searching-keyboard",
    title: "Searching",
    accent: "ink",
    section: "prototypes",
    themeable: true,
    label: "Search screen mockup with active keyboard and empty searching state.",
    scene: () => `
      ${altyMockupPrototype("searching")}
    `,
  },
  {
    slug: "notification-bell",
    title: "Notification bell",
    accent: "red",
    section: "prototypes",
    themeable: true,
    label: "Enable-notifications permission sheet over a dimmed UBA account home screen.",
    scene: () => `
      ${altyMockupPrototype("notification")}
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
    slug: "verify-securepass",
    title: "Verify with SecurePass",
    accent: "red",
    section: "prototypes",
    themeable: true,
    label: "SecurePass verification mockup: empty 6-digit code entry, new-limit summary, and numeric keyboard.",
    scene: () => `
      ${altyMockupPrototype("securepass")}
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
    slug: "uba-splash-reveal",
    title: "Splash lockup reveal",
    accent: "uba",
    section: "prototypes",
    themeable: true,
    label: "App launch splash: UBA and United Bank for Africa reveal, UBA slides left to align with it, the graphic mark draws in and fills, then everything collapses to a shared centerline and disappears.",
    scene: () => `
      ${splashScreenPrototype()}
    `,
  },
  {
    slug: "uba-loader-gradient-blob-prototype",
    title: "Page transition",
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
  "account-opened-success": "account-opening-success",
  "account-opened-success-lift": "account-opening-success-lift",
  "alty-marketing-transition-loader": "uba-loader-gradient-blob-prototype",
  "frosted-glass-pull-to-refresh-blob": "pull-to-refresh-blob-capsule",
  "pull-to-refresh-minimalist": "pull-to-refresh-glass-capsule",
  "search-spinner-2-white": "search-spinner-2-white-ripple",
  "search-spinner-3": "search-icon-animation",
  "standard-error": "couldnt-load-results",
  "standard-success": "core-spinners-02",
  "uba-media-transition-loader": "uba-loader-gradient-blob-prototype",
};

const animationOnlySceneBySlug = {
  "account-opening-almost-there": () => renderPrototypeAnimationOnlyScene("almost"),
  "core-spinners-02": () => renderPrototypeAnimationOnlyScene("core-spinner-02"),
  "account-opening-success": () => renderPrototypeAnimationOnlyScene("success"),
  "account-opening-success-lift": () => renderSuccessLiftAnimationOnlyScene(),
  "transaction-history-pull-refresh": () => renderPrototypeAnimationOnlyScene("pull"),
  "couldnt-load-results": () => renderPrototypeAnimationOnlyScene("failed"),
  "code-error": () => renderOtpErrorAnimationOnlyScene(),
  "enable-biometrics": () => renderPrototypeAnimationOnlyScene("biometrics"),
  "searching-keyboard": () => renderPrototypeAnimationOnlyScene("searching"),
  "notification-bell": () => renderPrototypeAnimationOnlyScene("notification"),
  "six-digit-code": () => renderOtpCodeAnimationOnlyScene("otp"),
  "verify-securepass": () => renderOtpCodeAnimationOnlyScene("securepass"),
  "identity-verification": () => renderPrototypeAnimationOnlyScene("identity"),
  "uba-splash-reveal": () => splashScreenAnimationOnly(),
  "uba-loader-gradient-blob-prototype": () => ubaLoaderGradientBlobAnimationOnly(),
};

// Toggle to bring the "Motion elements" section back into the nav/routing.
const MOTION_ELEMENTS_VISIBLE = false;
const visibleSections = MOTION_ELEMENTS_VISIBLE ? ["motion", "prototypes"] : ["prototypes"];
const visiblePages = MOTION_ELEMENTS_VISIBLE
  ? pages
  : pages.filter((page) => getPageSection(page) !== "motion");
const defaultPage = visiblePages[0];

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
        "uba-icon-loop",
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
      title: "Splash",
      slugs: ["uba-splash-reveal"],
    },
    {
      title: "Core spinners",
      slugs: ["account-opening-almost-there"],
    },
    {
      title: "Standard feedback",
      slugs: [
        "core-spinners-02",
        "couldnt-load-results",
        "account-opening-success",
        "account-opening-success-lift",
      ],
    },
    {
      title: "Pull to refresh",
      slugs: ["transaction-history-pull-refresh"],
    },
    {
      title: "Biometrics",
      slugs: ["enable-biometrics"],
    },
    {
      title: "Search",
      slugs: ["searching-keyboard"],
    },
    {
      title: "Notifications",
      slugs: ["notification-bell"],
    },
    {
      title: "Code entry",
      slugs: ["six-digit-code", "verify-securepass", "code-error"],
    },
    {
      title: "Identity verification",
      slugs: ["identity-verification"],
    },
    {
      title: "Page transitions",
      slugs: ["uba-loader-gradient-blob-prototype"],
    },
  ],
};

const prototypeMotionVariantSets = {
  pending: {
    title: "Core spinners",
    variants: [
      { slug: "uba-card-rotation", title: "Card rotation" },
      { slug: "uba-coin-flip", title: "Coin flip" },
      { slug: "uba-card-rotation-red", title: "Card rotation (red shadow)" },
      { slug: "uba-coin-flip-red", title: "Coin flip (red shadow)" },
    ],
  },
  otp: {
    title: "Colorway",
    variants: [
      { slug: "otp-green", title: "Green", colorway: "green" },
    ],
  },
  securepass: {
    title: "Colorway",
    variants: [
      { slug: "securepass-green", title: "Green", colorway: "green" },
    ],
  },
  almost: {
    title: "Core spinners",
    variants: [
      { slug: "progressive-blur-spinner-solo", title: "Red comet arc" },
      { slug: "uba-spinner-1", title: "UBA spinner 1" },
      { slug: "uba-icon-loop", title: "Banking icons loader" },
      { slug: "uba-card-rotation", title: "Card rotation" },
      { slug: "uba-coin-flip", title: "Coin flip" },
    ],
  },
  "core-spinner-02": {
    title: "Standard success",
    variants: [
      { slug: "uba-spinner-1-circle-resolve-green", title: "Green check" },
      { slug: "verification-badge-green", title: "Green verification badge" },
      { slug: "success-spinner-green", title: "Green fill to check" },
    ],
  },
  searching: {
    title: "Search loaders",
    variants: [
      { slug: "search-red-magnifier-loader", title: "Red magnifier" },
      { slug: "search-red-orbit-magnifier", title: "Orbit magnifier" },
    ],
  },
  notification: {
    title: "Notification bell",
    variants: [
      { slug: "notification-bell-ring", title: "Bell ring" },
    ],
  },
  biometrics: {
    title: "Biometrics",
    variants: [
      { slug: "biometric-scanner-device-plain-float", title: "Scanner float" },
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
      { slug: "uploaded-success-confetti-green", title: "Green uploaded confetti" },
      { slug: "green-success-confetti", title: "Green check confetti scatter" },
      { slug: "green-success-stars", title: "Green check star sprinkle" },
    ],
  },
  failed: {
    title: "Error feedback",
    variants: [
      { slug: "uba-spinner-1-circle-resolve-error", title: "Red X spinner" },
      { slug: "failure-wheel-red", title: "Red fill to X" },
      { slug: "failure-verification-badge", title: "Badge fill to X" },
    ],
  },
  pull: {
    title: "Refresh gestures",
    variants: [
      { slug: "pull-to-refresh-blob-capsule", title: "Blob capsule" },
      { slug: "pull-to-refresh-line-fill", title: "Line fill" },
      { slug: "pull-to-refresh-line-fill-red", title: "Line fill (red)" },
    ],
  },
};

const app = document.getElementById("app");
let prototypeTheme = "dark";
let showOnlyAnimation = false;
const prototypeVariantState = {};
let ubaLottieSpinnerFrame = 0;
let ubaLottieOrganicId = 0;
let ubaIconLoopGeneration = 0;
let otpErrorHapticsGeneration = 0;
let successConfettiLottieInstances = [];
const initialModeParam = new URLSearchParams(window.location.search).get("mode");
const initialAnimationMode =
  initialModeParam === "animation" || initialModeParam === "only"
    ? true
    : initialModeParam === "prototype"
      ? false
      : null;

try {
  prototypeTheme = window.localStorage.getItem("loader-motion-theme") || prototypeTheme;
  showOnlyAnimation = window.localStorage.getItem("loader-show-only-animation") === "true";
} catch {
  prototypeTheme = "dark";
  showOnlyAnimation = false;
}

if (initialAnimationMode !== null) {
  showOnlyAnimation = initialAnimationMode;
}

if (prototypeTheme !== "light") {
  prototypeTheme = "dark";
}

document.documentElement.dataset.prototypeTheme = prototypeTheme;
document.documentElement.dataset.animationMode = showOnlyAnimation ? "only" : "prototype";

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
        <circle cx="10.75" cy="10.75" r="5.05" fill="none" stroke="url(#${gradientId})" stroke-width="1.5"></circle>
        <path d="M14.35 14.35L20 20" fill="none" stroke="url(#${gradientId})" stroke-width="1.5" stroke-linecap="round"></path>
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

function searchOrbitScannerRings() {
  // Each orbit is a single explicit arc path (no dashing), so it is always one line.
  const orbitArc = (r, sweepDeg) => {
    const rad = (d) => (d * Math.PI) / 180;
    const start = 0;
    const end = start + sweepDeg;
    const x1 = (60 + r * Math.cos(rad(start))).toFixed(2);
    const y1 = (60 + r * Math.sin(rad(start))).toFixed(2);
    const x2 = (60 + r * Math.cos(rad(end))).toFixed(2);
    const y2 = (60 + r * Math.sin(rad(end))).toFixed(2);
    const largeArc = sweepDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };
  const rings = [
    { cls: "orbit-ring-inner", r: 26, sweep: 165 },
    { cls: "orbit-ring-mid", r: 34, sweep: 150 },
    { cls: "orbit-ring-outer", r: 42, sweep: 185 },
  ];
  const groups = rings
    .map(
      (ring) => `
      <g class="orbit-ring ${ring.cls}">
        <path d="${orbitArc(ring.r, ring.sweep)}"></path>
      </g>`
    )
    .join("");
  return `
    <svg class="orbit-scanner-svg" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id="orbit-line-gradient" class="orbit-line-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop class="orbit-stop-bright" offset="0%"></stop>
          <stop class="orbit-stop-fade" offset="100%"></stop>
        </linearGradient>
      </defs>
      ${groups}
    </svg>
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

function ubaLottieSpinnerScene(spinnerKey, label, variant = "neutral", options = {}) {
  const { mode = "pingpong", result = "", resultTone = "" } = options;
  const isCircleResolve = mode === "circle-resolve";
  const modeAttribute = mode !== "pingpong" ? ` data-uba-lottie-mode="${mode}"` : "";
  const resultAttribute = result ? ` data-uba-lottie-result="${result}"` : "";
  const colorClass =
    variant === "red" ? "uba-lottie-red-scene" : variant === "green" ? "uba-lottie-green-scene" : "";
  const resultToneClass =
    resultTone === "red"
      ? "uba-lottie-result-red-scene"
      : resultTone === "green"
        ? "uba-lottie-result-green-scene"
        : "";
  const sceneClasses = [colorClass, resultToneClass].filter(Boolean).join(" ");

  if (isCircleResolve) {
    return `
      <div class="loader-scene uba-lottie-scene uba-lottie-circle-resolve-scene ${sceneClasses}" role="img" aria-label="${label}">
        <div class="uba-lottie-resolve-wrap">
          <div class="uba-lottie-spinner" data-uba-lottie-spinner="${spinnerKey}"${modeAttribute}${resultAttribute}>
            <span class="uba-lottie-fallback" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="loader-scene uba-lottie-scene ${sceneClasses}" role="img" aria-label="${label}">
      <div class="uba-lottie-spinner" data-uba-lottie-spinner="${spinnerKey}"${modeAttribute}>
        <span class="uba-lottie-fallback" aria-hidden="true"></span>
      </div>
    </div>
  `;
}

const ubaIconLoopIcons = [
  {
    key: "bank",
    viewBox: "0 0 24 24",
    paths: [
      "M10 18V11",
      "M11.119 2.20498C11.3932 2.07044 11.6946 2.00049 12 2.00049C12.3054 2.00049 12.6068 2.07044 12.881 2.20498L20.721 6.05098C20.8225 6.10073 20.9042 6.18342 20.9527 6.28557C21.0012 6.38771 21.0136 6.50327 20.988 6.61339C20.9623 6.72351 20.9001 6.82168 20.8115 6.8919C20.7229 6.96211 20.6131 7.00021 20.5 6.99998H3.5C3.38702 6.99998 3.27737 6.96172 3.18892 6.89143C3.10047 6.82114 3.03843 6.72296 3.01292 6.6129C2.9874 6.50284 2.99992 6.38738 3.04842 6.28534C3.09692 6.1833 3.17855 6.10069 3.28 6.05098L11.119 2.20498Z",
      "M14 18V11",
      "M18 18V11",
      "M3 22H21",
      "M6 18V11",
    ],
  },
  {
    key: "card",
    viewBox: "0 0 24 24",
    paths: [
      "M20 5H4C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5Z",
      "M2 10H22",
    ],
  },
  {
    key: "earth",
    viewBox: "0 0 24 24",
    paths: [
      "M21.54 15H17C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17V21.54",
      "M7 3.33984V4.99984C7 5.79549 7.31607 6.55855 7.87868 7.12116C8.44129 7.68377 9.20435 7.99984 10 7.99984C10.5304 7.99984 11.0391 8.21056 11.4142 8.58563C11.7893 8.9607 12 9.46941 12 9.99984C12 11.0998 12.9 11.9998 14 11.9998C14.5304 11.9998 15.0391 11.7891 15.4142 11.4141C15.7893 11.039 16 10.5303 16 9.99984C16 8.89984 16.9 7.99984 18 7.99984H21.17",
      "M11 21.95V18C11 17.4696 10.7893 16.9609 10.4142 16.5858C10.0391 16.2107 9.53042 16 8.99999 16C8.46955 16 7.96085 15.7893 7.58577 15.4142C7.2107 15.0391 6.99999 14.5304 6.99999 14V13C6.99999 12.4696 6.78927 11.9609 6.4142 11.5858C6.03913 11.2107 5.53042 11 4.99999 11H2.04999",
      "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
    ],
  },
  {
    key: "naira",
    viewBox: "0 0 26 24",
    paths: [
      "M8.55554 19.1668V5.8335L18.3333 19.1668V5.8335",
      "M5 10.7002H21",
      "M5 14.2559H21",
    ],
  },
  {
    key: "security",
    viewBox: "0 0 24 24",
    paths: [
      "M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0202 11.67 21.94C7.5 20.5 4 18 4 13V5.99996C4 5.73474 4.10536 5.48039 4.29289 5.29285C4.48043 5.10532 4.73478 4.99996 5 4.99996C7 4.99996 9.5 3.79996 11.24 2.27996C11.4519 2.09896 11.7214 1.99951 12 1.99951C12.2786 1.99951 12.5481 2.09896 12.76 2.27996C14.51 3.80996 17 4.99996 19 4.99996C19.2652 4.99996 19.5196 5.10532 19.7071 5.29285C19.8946 5.48039 20 5.73474 20 5.99996V13Z",
      "M9 12L11 14L15 10",
    ],
  },
  {
    key: "wallet",
    viewBox: "0 0 24 24",
    paths: [
      "M3 11H6.75C7.06049 11 7.36672 11.0723 7.64443 11.2111C7.92214 11.35 8.16371 11.5516 8.35 11.8L8.8 12.4C9.17259 12.8968 9.65572 13.3 10.2111 13.5777C10.7666 13.8554 11.379 14 12 14C12.621 14 13.2334 13.8554 13.7889 13.5777C14.3443 13.3 14.8274 12.8968 15.2 12.4L15.65 11.8C15.8363 11.5516 16.0779 11.35 16.3556 11.2111C16.6333 11.0723 16.9395 11 17.25 11H21",
      "M3 7H21",
      "M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z",
    ],
  },
];

function ubaIconLoopScene() {
  const icons = ubaIconLoopIcons
    .map(
      (icon) => `
        <span class="uba-icon-loop-icon" data-uba-icon-loop-key="${icon.key}">
          <svg viewBox="${icon.viewBox}" aria-hidden="true">
            ${icon.paths.map((d) => `<path d="${d}"></path>`).join("")}
          </svg>
        </span>
      `,
    )
    .join("");

  return `
    <div class="loader-scene uba-icon-loop-scene" role="img" aria-label="White UBA loader icons drawing in and reverse-erasing in a continuous loop" data-uba-icon-loop>
      <div class="uba-icon-loop-stack">
        ${icons}
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

function ubaCoinLogoStack() {
  return `
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
            ${ubaCoinLogoStack()}
          </span>
        </div>
      </div>
    </div>
  `;
}

function ubaCoinCylinderEdge(segments = 48) {
  const bands = Array.from({ length: segments }, (_, index) => {
    const angle = (360 / segments) * index;
    return `<span class="uba-coin-cyl-seg" style="--seg-angle:${angle}deg;"></span>`;
  }).join("");

  return `<span class="uba-coin-cyl-edge" aria-hidden="true">${bands}</span>`;
}

function ubaCoinFlipPrototype() {
  return `
    <div class="loader-scene uba-silver-coin-scene uba-coin-flip-scene" role="img" aria-label="Silver UBA coin flipping horizontally, UBA mark on one side">
      <span class="uba-coin-shadow" aria-hidden="true"></span>
      <div class="uba-coin-flip-float">
        <div class="uba-coin-flip">
          ${ubaCoinCylinderEdge()}
          <span class="uba-coin-flip-face uba-coin-face is-front">
            ${ubaCoinLogoStack()}
          </span>
          <span class="uba-coin-flip-face uba-coin-face is-back"></span>
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

function successWheelTwoMark(result = "success") {
  const isError = result === "error";
  const resultPath = isError ? "M43 43 L77 77 M77 43 L43 77" : "M42 61 L55 73 L79 45";

  return `
    <div class="success-wheel-two-mark">
      <svg class="success-wheel-two-svg" viewBox="0 0 120 120" aria-hidden="true">
        <g class="success-wheel-two-rotor">
          <circle class="success-wheel-two-line" cx="60" cy="60" r="34" pathLength="100"></circle>
        </g>
        <circle class="success-wheel-two-fill" cx="60" cy="60" r="34"></circle>
        <path class="success-wheel-two-check ${isError ? "is-error" : ""}" d="${resultPath}" pathLength="78"></path>
      </svg>
    </div>
  `;
}

function successWheelTwoPrototype(variant = "red", result = "success") {
  const isGreen = variant === "green";
  const isNeutral = variant === "neutral";
  const isError = result === "error";
  const resultLabel = isError ? "an X" : "a check";

  return `
    <div class="loader-scene success-wheel-two-scene ${isGreen ? "success-wheel-two-green-scene" : ""} ${isNeutral ? "success-wheel-two-neutral-scene" : ""} ${isError ? "success-wheel-two-error-scene" : ""}" role="img" aria-label="Circular loader filling ${isNeutral ? "neutral" : isGreen ? "green" : "red"} and resolving into ${resultLabel}">
      ${successWheelTwoMark(result)}
    </div>
  `;
}

function successConfettiPieces() {
  const pieces = [
    { x: -148, y: -92, w: 8, h: 16, tone: "green", shape: "rect", rotate: -250, drift: -18, delay: 0 },
    { x: -112, y: -132, w: 9, h: 9, tone: "white", shape: "dot", rotate: 180, drift: -24, delay: 25 },
    { x: -70, y: -154, w: 6, h: 20, tone: "green", shape: "ribbon", rotate: -140, drift: -12, delay: 55 },
    { x: -26, y: -166, w: 10, h: 10, tone: "white", shape: "spark", rotate: 160, drift: -8, delay: 10 },
    { x: 22, y: -164, w: 7, h: 18, tone: "green", shape: "rect", rotate: 210, drift: 8, delay: 45 },
    { x: 72, y: -150, w: 8, h: 8, tone: "white", shape: "dot", rotate: 260, drift: 12, delay: 80 },
    { x: 116, y: -122, w: 6, h: 21, tone: "green", shape: "ribbon", rotate: 135, drift: 22, delay: 35 },
    { x: 150, y: -84, w: 10, h: 10, tone: "white", shape: "spark", rotate: 240, drift: 26, delay: 0 },
    { x: -166, y: -30, w: 6, h: 18, tone: "green", shape: "rect", rotate: -210, drift: -20, delay: 95 },
    { x: -142, y: 28, w: 11, h: 11, tone: "white", shape: "dot", rotate: -90, drift: -28, delay: 30 },
    { x: -118, y: 82, w: 7, h: 18, tone: "green", shape: "ribbon", rotate: -160, drift: -14, delay: 75 },
    { x: -58, y: 122, w: 10, h: 10, tone: "white", shape: "spark", rotate: 210, drift: -10, delay: 55 },
    { x: 0, y: 138, w: 8, h: 17, tone: "green", shape: "rect", rotate: 180, drift: 0, delay: 100 },
    { x: 60, y: 120, w: 9, h: 9, tone: "white", shape: "dot", rotate: 310, drift: 10, delay: 65 },
    { x: 118, y: 82, w: 6, h: 18, tone: "green", shape: "ribbon", rotate: 150, drift: 16, delay: 90 },
    { x: 146, y: 28, w: 9, h: 9, tone: "white", shape: "spark", rotate: 280, drift: 28, delay: 40 },
    { x: 168, y: -28, w: 7, h: 17, tone: "green", shape: "rect", rotate: 210, drift: 22, delay: 105 },
    { x: -92, y: -68, w: 7, h: 7, tone: "white", shape: "dot", rotate: -120, drift: -16, delay: 120 },
    { x: -42, y: -104, w: 5, h: 16, tone: "green", shape: "ribbon", rotate: -200, drift: -8, delay: 135 },
    { x: 42, y: -104, w: 7, h: 7, tone: "white", shape: "dot", rotate: 220, drift: 8, delay: 115 },
    { x: 94, y: -66, w: 5, h: 18, tone: "green", shape: "ribbon", rotate: 160, drift: 18, delay: 130 },
    { x: -92, y: 50, w: 8, h: 8, tone: "white", shape: "spark", rotate: -230, drift: -18, delay: 150 },
    { x: 92, y: 52, w: 8, h: 15, tone: "green", shape: "rect", rotate: 250, drift: 18, delay: 145 },
    { x: 0, y: -118, w: 11, h: 11, tone: "white", shape: "spark", rotate: 180, drift: 0, delay: 165 },
  ];
  return pieces
    .map(
      ({ x, y, w, h, tone, shape, rotate, drift, delay }) => `
        <span
          class="success-confetti success-confetti-${shape}"
          style="--confetti-x:${x}px; --confetti-y:${y}px; --confetti-w:${w}px; --confetti-h:${h}px; --confetti-color:var(--success-confetti-${tone}); --confetti-rotate:${rotate}deg; --confetti-drift:${drift}px; --confetti-delay:${delay}ms;"
        ></span>
      `,
    )
    .join("");
}

function greenSuccessConfettiPrototype() {
  return `
    <div class="loader-scene success-wheel-two-scene success-wheel-two-green-scene green-success-confetti-scene" role="img" aria-label="Green circular loader filling and resolving into a check with confetti">
      <div class="success-confetti-field" aria-hidden="true">
        ${successConfettiPieces()}
      </div>
      ${successWheelTwoMark()}
    </div>
  `;
}

function successRayLines() {
  const rays = [
    { angle: 0, delay: 0 },
    { angle: 45, delay: 45 },
    { angle: 90, delay: 80 },
    { angle: 135, delay: 35 },
    { angle: 180, delay: 110 },
    { angle: 225, delay: 60 },
    { angle: 270, delay: 95 },
    { angle: 315, delay: 20 },
  ];

  return rays
    .map(
      ({ angle, delay }) => `
        <span
          class="success-ray-line"
          style="--ray-angle:${angle}deg; --ray-delay:${delay}ms;"
        ></span>
      `,
    )
    .join("");
}

function greenSuccessRaysPrototype() {
  return `
    <div class="loader-scene success-wheel-two-scene success-wheel-two-green-scene green-success-rays-scene" role="img" aria-label="Green circular loader filling and resolving into a check with rounded radial highlight lines">
      <div class="success-ray-field" aria-hidden="true">
        ${successRayLines()}
      </div>
      ${successWheelTwoMark()}
    </div>
  `;
}

function successStarPieces() {
  const stars = [
    { x: 32, y: -30, size: 13, rotate: 10, tone: "white", delay: 0 },
    { x: -34, y: 6, size: 9, rotate: -16, tone: "green", delay: 130 },
    { x: 14, y: 34, size: 10, rotate: 20, tone: "white", delay: 260 },
  ];

  return stars
    .map(
      ({ x, y, size, rotate, tone, delay }) => `
        <span
          class="success-star"
          style="--star-x:${x}px; --star-y:${y}px; --star-size:${size}px; --star-rotate:${rotate}deg; --star-color:var(--success-star-${tone}); --star-delay:${delay}ms;"
        ></span>
      `,
    )
    .join("");
}

function greenSuccessStarsPrototype() {
  return `
    <div class="loader-scene success-wheel-two-scene success-wheel-two-green-scene green-success-stars-scene" role="img" aria-label="Green circular loader filling and resolving into a check with a sprinkle of four-pointed stars">
      <div class="success-star-field" aria-hidden="true">
        ${successStarPieces()}
      </div>
      ${successWheelTwoMark()}
    </div>
  `;
}

function uploadedSuccessConfettiPrototype(palette = "") {
  const isGreenPalette = palette === "green";
  const delayAttribute = isGreenPalette ? ' data-success-confetti-delay-ms="5050" data-success-confetti-start-frame="30"' : "";

  return `
    <div class="loader-scene success-lottie-confetti-scene ${isGreenPalette ? "success-lottie-confetti-green-scene" : ""}" role="img" aria-label="${isGreenPalette ? "Green and white uploaded confetti animation" : "Uploaded confetti animation"} on a transparent background">
      <div class="success-lottie-confetti" data-success-confetti-lottie${isGreenPalette ? ' data-success-confetti-palette="green"' : ""}${delayAttribute}>
        <span class="success-lottie-fallback" aria-hidden="true"></span>
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

function verificationBadgePrototype(result = "success", colorway = "") {
  const badgePath = roundedStarPath(60, 60, 49, 36, 8, 8.5);
  const isError = result === "error";
  const resultLabel = isError ? "an X" : "a check";
  const resultPath = isError ? "M40 40 L80 80 M80 40 L40 80" : "M36 62 L52 77 L84 43";
  const colorwayClass = colorway ? `verification-badge-${colorway}-scene` : "";
  const colorLabel = colorway === "green" ? "Green" : "White";

  return `
    <div class="loader-scene verification-badge-scene ${isError ? "verification-badge-error-scene" : ""} ${colorwayClass}" role="img" aria-label="${colorLabel} verification badge drawing, filling, and resolving into ${resultLabel}">
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

function notificationBellPrototype() {
  return `
    <div class="loader-scene notification-bell-scene" role="img" aria-label="Red notification bell ringing">
      ${notificationBellMark()}
    </div>
  `;
}

function notificationBellMark(modifier = "") {
  return `
    <div class="notification-bell-mark${modifier ? ` ${modifier}` : ""}">
      <span class="notification-bell-pulse pulse-a" aria-hidden="true"></span>
      <span class="notification-bell-pulse pulse-b" aria-hidden="true"></span>
      <span class="notification-bell-pulse pulse-c" aria-hidden="true"></span>
      <span class="notification-bell-shadow" aria-hidden="true"></span>
      <img class="notification-bell-image" src="./assets/notification-bell-red.png" alt="">
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

        ${ubaGradientTransitionOverlay()}
      </div>
  `;
}

function ubaGradientTransitionOverlay() {
  return `
    <div class="alty-transition-overlay uba-gradient-transition-overlay" aria-hidden="true">
      <div class="alty-transition-blob-field">
        <span class="uba-blob uba-blob-main"></span>
        <span class="uba-blob uba-blob-red"></span>
        <span class="uba-blob uba-blob-yellow"></span>
        <span class="uba-blob uba-blob-lift"></span>
      </div>
      <div class="alty-transition-loader">
        <div class="uba-transition-lottie-spinner uba-lottie-spinner" data-uba-lottie-spinner="uba-spinner-1">
          <span class="uba-lottie-fallback" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  `;
}

function ubaLoaderGradientBlobAnimationOnly() {
  return `
    <div class="animation-only-scene animation-only-transition-scene" role="img" aria-label="UBA gradient blob transition loader animation">
      <div class="uba-gradient-device-stage uba-gradient-flow-frame uba-gradient-animation-only-frame">
        <div class="animation-only-transition-backdrop" aria-hidden="true"></div>
        ${ubaGradientTransitionOverlay()}
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

function renderAnimationModeToggle(extraClass = "") {
  return `
    <label class="animation-mode-toggle ${extraClass}">
      <input
        type="checkbox"
        data-animation-mode-toggle
        ${showOnlyAnimation ? "checked" : ""}
        aria-label="${showOnlyAnimation ? "Show prototype" : "Show just animation"}"
      >
      <span class="animation-mode-label">${showOnlyAnimation ? "Prototype" : "Just animation"}</span>
    </label>
  `;
}

function renderPrototypeVariantPager(type, variantSet, activeIndex) {
  if (!variantSet || variantSet.variants.length <= 1) {
    return "";
  }

  const activeVariant = variantSet.variants[activeIndex];

  return `
    <div class="prototype-variant-pager" aria-label="${variantSet.title} variants">
      <span class="prototype-variant-context">${variantSet.title}</span>
      <div class="prototype-variant-action-row">
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
                  ${variant.number || String(index + 1).padStart(2, "0")}
                </button>
              `,
            )
            .join("")}
        </div>
        ${renderAnimationModeToggle("is-pager-control")}
      </div>
      <strong>${activeVariant.title}</strong>
    </div>
  `;
}

function coreSpinnerStandalonePrototype(type) {
  const variantSet = prototypeMotionVariantSets[type];

  if (!variantSet) {
    return "";
  }

  const activeIndex = getPrototypeVariantIndex(type);
  const activeVariant = variantSet.variants[activeIndex];

  return `
    <div class="core-spinner-standalone" role="group" aria-label="${variantSet.title}">
      ${renderPrototypeVariantPager(type, variantSet, activeIndex)}
      <div class="core-spinner-only-slot" data-motion-source="${activeVariant.slug}" aria-hidden="true">
        ${renderPrototypeMotionElement(activeVariant.slug, type)}
      </div>
    </div>
  `;
}

function renderAnimationOnlyShell(options = {}) {
  const { ariaLabel = "Animation only preview", classes = "", controls = "", content = "" } = options;

  return `
    <div class="animation-only-scene animation-only-prototype alty-mockup-prototype ${classes}" role="group" aria-label="${ariaLabel}">
      ${controls}
      ${content}
    </div>
  `;
}

function renderPrototypeAnimationOnlyScene(type) {
  const variantSet = prototypeMotionVariantSets[type];

  if (!variantSet) {
    return "";
  }

  const activeIndex = getPrototypeVariantIndex(type);
  const activeVariant = variantSet.variants[activeIndex];
  const motionSource = activeVariant?.slug || "";

  return renderAnimationOnlyShell({
    ariaLabel: `${variantSet.title} animation only preview`,
    classes: `animation-only-${type}`,
    controls: renderPrototypeVariantPager(type, variantSet, activeIndex),
    content: renderAnimationOnlyMotionSlot(type, motionSource),
  });
}

function renderAnimationOnlyMotionSlot(type, motionSource) {
  if (!motionSource) {
    return "";
  }

  if (type === "success" && motionSource.startsWith("uploaded-success-confetti")) {
    const underlaySource = motionSource.endsWith("-green") ? "success-spinner-green" : "success-wheel-2";

    return `
      <div class="animation-only-success-combo" data-motion-source="${motionSource}" aria-hidden="true">
        <div class="animation-only-success-underlay">
          ${renderPrototypeMotionElement(underlaySource, type)}
        </div>
        <div class="animation-only-success-confetti">
          ${renderPrototypeMotionElement(motionSource, type)}
        </div>
      </div>
    `;
  }

  return `
    <div class="animation-only-motion-slot animation-only-motion-${type}" data-motion-source="${motionSource}" aria-hidden="true">
      ${renderPrototypeMotionElement(motionSource, type)}
    </div>
  `;
}

function renderSuccessLiftAnimationOnlyScene() {
  const variantSet = prototypeMotionVariantSets.success;
  const activeIndex = getPrototypeVariantIndex("success");
  const activeVariant = variantSet.variants[activeIndex];

  return renderAnimationOnlyShell({
    ariaLabel: "Account success checkmark and confetti animation only preview",
    classes: "animation-only-success animation-only-success-lift",
    controls: renderPrototypeVariantPager("success", variantSet, activeIndex),
    content: renderAnimationOnlyMotionSlot("success", activeVariant.slug),
  });
}

function renderOtpCodeAnimationOnlyScene(type) {
  const variantSet = prototypeMotionVariantSets[type];
  const activeIndex = getPrototypeVariantIndex(type);
  const colorway = getPrototypeVariantColorway(type);
  const colorwayClass = colorway ? `is-${colorway}` : "";

  return renderAnimationOnlyShell({
    ariaLabel: `${variantSet?.title || "Code entry"} animation only preview`,
    classes: `animation-only-otp animation-only-${type}`,
    controls: variantSet ? renderPrototypeVariantPager(type, variantSet, activeIndex) : "",
    content: `
      <div class="animation-only-otp-slot ${colorwayClass}" aria-hidden="true">
        ${altyMockupOtpCells({ colorway })}
      </div>
    `,
  });
}

function renderOtpErrorAnimationOnlyScene() {
  const digits = ["1", "2", "3", "5", "3", "3"];

  return renderAnimationOnlyShell({
    ariaLabel: "Invalid code animation only preview",
    classes: "animation-only-otp animation-only-otp-error",
    content: `
      <div class="animation-only-otp-slot is-error" aria-hidden="true">
        <div class="alty-mock-otp-cells is-error" data-otp-error-cells>
          ${digits
            .map(
              (digit, index) => `
                <span style="--otp-index:${index};">
                  <b>${digit}</b>
                </span>
              `,
            )
            .join("")}
        </div>
      </div>
    `,
  });
}

const FINGERPRINT_PATHS = [
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

// A white copy of the fingerprint strokes, masked by a diagonal band that sweeps
// across once, so a skeleton-shimmer highlight travels through the print. The
// strokes are held fully drawn; only the moving mask reveals them.
function fingerprintShineLayer(id = "fingerprint-shine") {
  return `
    <div class="fingerprint-shine-layer" aria-hidden="true">
      <svg class="fingerprint-shine-svg" viewBox="0 0 293 485">
        <g class="fingerprint-shine-lines">
          ${FINGERPRINT_PATHS.map(
            (path) => `
              <path
                class="fingerprint-shine-line ${path.className}"
                d="${path.d}"
                stroke="#fff4ec"
              ></path>
            `,
          ).join("")}
        </g>
      </svg>
    </div>
  `;
}

function fingerprintIdentityLoader(id = "fingerprint-loader", options = {}) {
  const useShield = Boolean(options.shield);
  const hasStaticFingerprintBase = Boolean(options.staticFingerprintBase);
  const glowStaticBase = Boolean(options.glowStaticBase);
  // 'all' renders both the resting base and the active lines in one svg; 'base'
  // and 'active' render just one, so the active layer can be clipped on its own.
  const layer = options.layer || "all";
  const gradientId = `${id}-gradient`;
  const staticGradientId = `${id}-static-gradient`;
  const glowId = `${id}-glow`;
  const paths = FINGERPRINT_PATHS;

  return `
    <div class="loader-scene fingerprint-loader-scene" role="img" aria-label="Animated fingerprint identity verification loader">
      ${useShield ? '<div class="fingerprint-shield-composite" aria-hidden="true"><img class="fingerprint-shield-image" src="./assets/identity-shield.png" alt="">' : ""}
      <svg class="fingerprint-loader-svg" viewBox="0 0 293 485" aria-hidden="true">
          <defs>
            ${
              hasStaticFingerprintBase
                ? `
                  <linearGradient id="${staticGradientId}" x1="35" y1="20" x2="255" y2="466" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#ff6b58"></stop>
                    <stop offset="42%" stop-color="#f11b12"></stop>
                    <stop offset="74%" stop-color="#d51709"></stop>
                    <stop offset="100%" stop-color="#8f0802"></stop>
                  </linearGradient>
                `
                : ""
            }
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
          ${
            hasStaticFingerprintBase && layer !== "active"
              ? `
                <g class="fingerprint-loader-lines fingerprint-loader-lines-static"${glowStaticBase ? ` filter="url(#${glowId})"` : ""}>
                  ${paths
                    .map(
                      (path) => `
                        <path
                          class="fingerprint-loader-line ${path.className}"
                          d="${path.d}"
                          pathLength="100"
                          stroke="url(#${staticGradientId})"
                        ></path>
                      `,
                    )
                    .join("")}
                </g>
              `
              : ""
          }
          ${
            layer !== "base"
              ? `
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
              `
              : ""
          }
      </svg>
      ${useShield ? "</div>" : ""}
    </div>
  `;
}

function biometricScannerDevicePrototype(mode = "reveal") {
  const isFloat = mode === "plain-float";
  const isParallax = mode === "plain-parallax";
  const baseMode = isFloat || isParallax ? "plain" : mode;
  const isReveal = baseMode === "reveal";
  // 'plain-shine' draws the print once, holds it, then sweeps a skeleton
  // shimmer highlight through it a single time.
  const isShine = baseMode === "plain-shine";
  const effectClass = isFloat ? "is-device-floating" : isParallax ? "is-device-parallax" : "";
  const modeClass = isReveal
    ? `is-scan-reveal ${effectClass}`
    : isShine
      ? `is-plain-draw is-shine-once ${effectClass}`
      : `is-plain-draw ${effectClass}`;
  const id = isReveal
    ? "prototype-scanner-fingerprint"
    : isShine
      ? "prototype-scanner-fingerprint-shine"
      : "prototype-scanner-fingerprint-plain";
  const label = isReveal
    ? "Fingerprint scanner device with a scan line that reveals the print"
    : "Fingerprint scanner device with an animated fingerprint";

  const printHtml = isReveal
    ? `
        <div class="fingerprint-scanner-print is-base">
          ${fingerprintIdentityLoader(`${id}-base`, { staticFingerprintBase: true, glowStaticBase: true, layer: "base" })}
        </div>
        <div class="fingerprint-scanner-print is-active">
          ${fingerprintIdentityLoader(`${id}-active`, { layer: "active" })}
        </div>
      `
    : `
        <div class="fingerprint-scanner-print">
          ${fingerprintIdentityLoader(id, { staticFingerprintBase: true, glowStaticBase: true })}
          ${isShine ? fingerprintShineLayer(id) : ""}
        </div>
      `;

  return `
    <div class="loader-scene fingerprint-scanner-scene ${modeClass}" role="img" aria-label="${label}">
      <div class="fingerprint-scanner-composite" aria-hidden="true">
        <div class="fingerprint-scanner-motion-shell">
          <img class="fingerprint-scanner-device" src="./assets/identity-scanner-device.webp" alt="">
          <div class="fingerprint-scanner-screen">
            <div class="fingerprint-scanner-plate">
              ${printHtml}
              ${isReveal ? '<span class="fingerprint-scanner-line"></span>' : ""}
            </div>
          </div>
        </div>
      </div>
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
        <span class="alty-identity-bust-scan"></span>
      </div>
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
    "search-red-orbit-magnifier": `
      <div class="loader-scene search-red-magnifier-scene search-red-orbit-magnifier-scene" role="img" aria-label="Compact red magnifier inside orbit scanner">
        ${searchOrbitScannerRings()}
        ${searchRedMagnifierIllustration()}
      </div>
    `,
    "notification-bell-ring": notificationBellPrototype(),
    "identity-verification-motion": fingerprintIdentityLoader("prototype-fingerprint", { shield: true }),
    "identity-verification-motion-layered": fingerprintIdentityLoader("prototype-fingerprint-layered", {
      shield: true,
      staticFingerprintBase: true,
    }),
    "biometric-scanner-device": biometricScannerDevicePrototype("reveal"),
    "biometric-scanner-device-plain": biometricScannerDevicePrototype("plain"),
    "biometric-scanner-device-plain-float": biometricScannerDevicePrototype("plain-float"),
    "biometric-scanner-device-plain-parallax": biometricScannerDevicePrototype("plain-parallax"),
    "biometric-scanner-device-plain-shine": biometricScannerDevicePrototype("plain-shine"),
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
    "uba-spinner-1-circle-resolve": ubaLottieSpinnerScene(
      "uba-spinner-1",
      "Compact UBA spinner 1 resolving into a neutral check",
      "neutral",
      { mode: "circle-resolve", result: "success" },
    ),
    "uba-spinner-1-circle-resolve-green": ubaLottieSpinnerScene(
      "uba-spinner-1",
      "Compact UBA spinner 1 resolving into a green check",
      "green",
      { mode: "circle-resolve", result: "success" },
    ),
    "uba-spinner-1-circle-resolve-error": ubaLottieSpinnerScene(
      "uba-spinner-1",
      "Compact UBA spinner 1 resolving into a red X",
      "red",
      { mode: "circle-resolve", result: "error" },
    ),
    "uba-spinner-1-circle-resolve-neutral-green": ubaLottieSpinnerScene(
      "uba-spinner-1",
      "Compact neutral UBA spinner 1 resolving into a green check",
      "neutral",
      { mode: "circle-resolve", result: "success", resultTone: "green" },
    ),
    "uba-spinner-1-circle-resolve-neutral-error": ubaLottieSpinnerScene(
      "uba-spinner-1",
      "Compact neutral UBA spinner 1 resolving into a red X",
      "neutral",
      { mode: "circle-resolve", result: "error", resultTone: "red" },
    ),
    "uba-spinner-2": ubaLottieSpinnerScene("uba-spinner-2", "Compact UBA spinner 2"),
    "uba-spinner-2-red": ubaLottieSpinnerScene("uba-spinner-2", "Compact UBA spinner 2 red", "red"),
    "uba-icon-loop": ubaIconLoopScene(),
    "silver-uba-coin": silverUbaCoinPrototype(),
    "uba-card-rotation": ubaCardRotationPrototype(),
    "uba-coin-flip": ubaCoinFlipPrototype(),
    "uba-card-rotation-red": ubaCardRotationPrototype(),
    "uba-coin-flip-red": ubaCoinFlipPrototype(),
    "success-wheel-2": successWheelTwoPrototype(),
    "success-spinner-neutral": successWheelTwoPrototype("neutral"),
    "success-spinner-green": successWheelTwoPrototype("green"),
    "green-success-confetti": greenSuccessConfettiPrototype(),
    "green-success-rays": greenSuccessRaysPrototype(),
    "green-success-stars": greenSuccessStarsPrototype(),
    "verification-badge": verificationBadgePrototype(),
    "verification-badge-green": verificationBadgePrototype("success", "green"),
    "uploaded-success-confetti": uploadedSuccessConfettiPrototype(),
    "uploaded-success-confetti-green": uploadedSuccessConfettiPrototype("green"),
    "failure-wheel-red": successWheelTwoPrototype("red", "error"),
    "failure-wheel-neutral": successWheelTwoPrototype("neutral", "error"),
    "failure-verification-badge": verificationBadgePrototype("error"),
    "pull-to-refresh-blob-capsule": renderPrototypeRefreshGesture("blob"),
    "pull-to-refresh-glass-capsule": renderPrototypeRefreshGesture("clean"),
    "pull-to-refresh-neutral-capsule": renderPrototypeRefreshGesture("neutral"),
    "pull-to-refresh-neutral-capsule-2": renderPrototypeRefreshGesture("neutral-complete"),
    "flip-coin-pull-to-refresh-red": renderPrototypeRefreshGesture("flip-red"),
    "flip-coin-pull-to-refresh-white": renderPrototypeRefreshGesture("flip-white"),
    "pull-to-refresh-line-fill": renderPrototypeRefreshGesture("line-fill"),
    "pull-to-refresh-line-fill-red": renderPrototypeRefreshGesture("line-fill-red"),
  };

  return `<div class="prototype-motion-render">${motionMarkup[slug] || ""}</div>`;
}

function renderPrototypeRefreshGesture(variant) {
  if (variant === "line-fill" || variant === "line-fill-red") {
    const redClass = variant === "line-fill-red" ? " ptr-line-fill-red-gesture" : "";
    return `
      <div class="prototype-refresh-gesture ptr-line-fill-gesture${redClass}" aria-hidden="true">
        ${pullRefreshLineFillMark()}
      </div>
    `;
  }

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

function pullRefreshLineFillMark() {
  const paths = [
    "M101.755 160.74L113.692 104.994C119.867 117.203 126.039 129.527 132.145 141.852C133.298 144.809 134.269 147.765 134.264 150.49C134.258 153.494 133.23 155.582 131.432 157.096C129.571 158.664 126.753 159.727 122.993 160.327C122.363 160.405 121.468 160.519 120.688 160.614C120.294 160.662 119.937 160.705 119.666 160.735C119.334 160.772 119.253 160.775 119.303 160.776Z",
    "M162.389 89.5L150.565 145.271C144.364 133.074 138.168 120.762 132.037 108.449C130.878 105.495 129.901 102.541 129.901 99.8154C129.901 96.8113 130.924 94.7222 132.719 93.2041C134.577 91.6325 137.393 90.5634 141.151 89.9561C141.782 89.8769 142.675 89.7609 143.456 89.6641C143.849 89.6153 144.206 89.5719 144.478 89.541C144.809 89.5032 144.89 89.5 144.84 89.5Z",
  ];

  return `
    <svg class="ptr-line-fill-mark" viewBox="72 68 124 112" aria-hidden="true" focusable="false">
      ${paths
        .map(
          (path) => `
            <path class="ptr-line-fill-guide" d="${path}" pathLength="100"></path>
            <path class="ptr-line-fill-draw" d="${path}" pathLength="100"></path>
          `,
        )
        .join("")}
    </svg>
  `;
}

function getActivePrototypeMotionSlug(type) {
  const variantSet = prototypeMotionVariantSets[type];

  if (!variantSet) {
    return "";
  }

  return variantSet.variants[getPrototypeVariantIndex(type)]?.slug || "";
}

function getPrototypeVariantColorway(type) {
  const variantSet = prototypeMotionVariantSets[type];

  if (!variantSet) {
    return "";
  }

  return variantSet.variants[getPrototypeVariantIndex(type)]?.colorway || "";
}

function altyMockupMotionSlot(type, slotStyle = "", overrideSlug = "") {
  const variantSet = prototypeMotionVariantSets[type];

  if (!variantSet) {
    return "";
  }

  const activeIndex = getPrototypeVariantIndex(type);
  const activeVariant = overrideSlug
    ? variantSet.variants.find((variant) => variant.slug === overrideSlug) || { slug: overrideSlug }
    : variantSet.variants[activeIndex];

  return `
    <div class="alty-mock-motion-slot is-${type} ${slotStyle ? `is-${slotStyle}` : ""}" data-motion-source="${activeVariant.slug}" aria-hidden="true">
      ${renderPrototypeMotionElement(activeVariant.slug, type)}
    </div>
  `;
}

function altyMockupPrototype(type, options = {}) {
  const { lift = false, variantType = type } = options;
  const labels = {
    pending: "Pending account-opening screen",
    almost: "Almost there onboarding screen",
    "standard-success": "Standard success feedback screen",
    biometrics: "Enable biometrics onboarding screen",
    identity: "Identity verification onboarding screen",
    otp: "6-digit verification code login screen",
    "otp-error": "6-digit verification code login screen with an invalid-code error state",
    "otp-loading": "Static 6-digit verification code screen with a scrim and banking-icons loader overlay",
    securepass: "Verify with SecurePass screen with empty 6-digit code entry and numeric keyboard",
    searching: "Searching screen with keyboard",
    notification: "Notification alert opt-in screen",
    success: "Successful account-opening screen",
    failed: "Could not load results screen",
    pull: "Pull-to-refresh transaction history screen",
  };
  const variantSet = prototypeMotionVariantSets[variantType];
  const activeIndex = getPrototypeVariantIndex(variantType);
  const activeVariant = variantSet?.variants[activeIndex];
  const activeMotionSource = activeVariant ? ` data-active-motion-source="${activeVariant.slug}"` : "";
  const hasVisibleVariantPager = Boolean(variantSet && variantSet.variants.length > 1);

  return `
    <div class="alty-mockup-prototype alty-mockup-${type}-prototype${lift ? " is-lift-mode" : ""}"${activeMotionSource} role="group" aria-label="${labels[type]}">
      <article class="alty-mockup-stage ${hasVisibleVariantPager ? "has-prototype-variant-pager" : ""}">
        ${hasVisibleVariantPager ? renderPrototypeVariantPager(variantType, variantSet, activeIndex) : ""}
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
    "otp-error": altyMockupOtpErrorScreen,
    "otp-loading": altyMockupOtpLoadingScreen,
    securepass: altyMockupSecurePassScreen,
    searching: altyMockupSearchingScreen,
    notification: altyMockupNotificationScreen,
    "standard-success": altyMockupStandardSuccessScreen,
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

function splashScreenMarkup() {
  return `
    <div class="uba-splash-brand">
      <div class="uba-splash-top-mask">
        <div class="uba-splash-top-row">
          <div class="uba-splash-row1-wrap">
            <svg class="uba-splash-row1-svg" viewBox="31.7888 0 138.1412 49.2172" xmlns="http://www.w3.org/2000/svg">
              <g fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M122.013 9.54619C122.013 4.06891 118.74 0.782579 111.728 4.95911e-05L90.8473 0L80.7965 48.4347H100.664C101.565 48.4347 103.845 48.0082 104.877 47.8153C105.095 47.7744 105.258 47.7441 105.339 47.7304C115.468 45.4613 120.143 38.4191 120.143 30.8292C120.143 26.0561 116.403 23.0046 111.183 22.2222C111.105 22.2222 110.949 22.2222 110.871 22.1439C117.961 19.7965 122.013 15.4147 122.013 9.54619ZM110.637 32.3158C110.637 28.7165 108.612 26.1343 104.015 25.1172C103.158 24.9607 101.599 24.8043 101.444 24.8043L95.5222 24.9608C95.3664 25.039 95.2885 25.1172 95.2885 25.2738C94.6399 28.2045 94.0336 31.1988 93.4256 34.2015C92.8648 36.9708 92.3026 39.7473 91.7044 42.4878H99.4958C102.223 42.4878 106.622 40.1274 108.923 37.1671C109.664 36.2151 110.092 35.5239 110.326 34.7414C110.56 33.959 110.637 32.4723 110.637 32.3158ZM111.847 11.8074C111.912 11.4492 111.962 11.1737 111.962 11.1111C111.962 7.51174 108.066 6.18159 105.573 6.18159L99.7296 6.33804C99.0333 6.30366 99.0293 6.33977 98.9239 7.29662C98.9094 7.42837 98.893 7.57758 98.8725 7.74647C98.7037 8.95934 98.6388 9.38963 98.4829 10.1722C98.4287 10.717 98.2989 11.2997 98.1725 11.8675C98.1173 12.1152 98.0628 12.3601 98.0154 12.5978C97.9612 13.1425 97.8314 13.7253 97.705 14.2931C97.6498 14.5408 97.5953 14.7857 97.5479 15.0234C97.4937 15.5682 97.364 16.151 97.2375 16.7188C97.1823 16.9665 97.1278 17.2114 97.0805 17.449C96.9638 18.0739 96.8472 18.7182 96.7305 19.3625C96.6134 20.0092 96.4963 20.656 96.3792 21.2832H103.314C103.781 21.2832 106.975 19.4053 107.755 18.9358C109.936 17.6056 111.417 15.1799 111.572 13.5368C111.619 13.0673 111.75 12.3444 111.847 11.8074Z"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M169.93 48.2781L158.243 4.95911e-05H154.814L122.247 48.2781H130.973L137.206 38.8103H157.541L159.411 48.2781H169.93ZM155.671 31.6898H141.569L151.854 15.8841L155.671 31.6898Z"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M46.885 7.48645C47.39 5.04383 47.9021 2.56692 48.3844 4.95911e-05L38.7231 0.000118256C37.5936 5.47621 36.4641 10.9719 35.3346 16.4675C34.2046 21.9655 33.0746 27.4635 31.9447 32.9419C31.9069 33.2452 31.8874 33.5485 31.8685 33.8429C31.8484 34.1561 31.829 34.4592 31.7888 34.7415V36.6194C31.7888 40.923 34.1262 46.7132 40.1256 48.1999C40.9826 48.4347 41.9176 48.6694 42.7747 48.8259C43.6317 48.9824 44.6446 49.1389 45.5796 49.2172H50.3322C50.5014 49.2172 51.1194 49.1352 51.6843 49.0602C51.9 49.0316 52.1079 49.004 52.2801 48.9824C57.6561 48.3564 63.8891 46.2437 68.564 39.7493C68.6829 39.5907 68.7961 39.4428 68.9052 39.3002C69.7788 38.1584 70.3906 37.3587 71.6026 34.1938C73.1875 27.2481 74.6837 20.2728 76.1822 13.286C77.1147 8.93852 78.0481 4.58664 79.0045 0.234747V1.90735e-05H70.1223C69.4726 3.07592 68.8367 6.15878 68.2003 9.24443C66.6996 16.5201 65.1957 23.8113 63.4996 31.0639C61.6297 39.045 55.7862 42.9574 49.8647 42.9574C43.7096 42.9574 42.1513 38.6539 42.1513 33.8808C42.1513 30.7309 42.7955 27.6619 43.4472 24.5574C43.702 23.3433 43.958 22.1238 44.1771 20.8919C44.7224 17.9186 45.3458 14.8669 45.969 11.9718C46.2659 10.481 46.5741 8.99022 46.885 7.48645Z"/>
              </g>
            </svg>
          </div>

          <div class="uba-splash-icon-slot">
            <svg class="uba-splash-icon-svg" viewBox="-2.1454 -2.5 68.6342 79.2755" xmlns="http://www.w3.org/2000/svg">
              <path class="uba-splash-icon-stroke" pathLength="1"
                d="M1.8546 72.74 L13.7918 16.9935 C19.9672 29.2028 26.1388 41.527 32.2445 53.8523 C33.3976 56.8087 34.3692 59.7652 34.3637 62.4904 C34.3576 65.4945 33.3295 67.5815 31.532 69.096 C29.671 70.6639 26.8529 71.7272 23.0928 72.3269 C22.4625 72.4048 21.5684 72.519 20.7875 72.6143 C20.3942 72.6622 20.0371 72.7049 19.7658 72.7352 C19.4343 72.7724 19.353 72.7754 19.4034 72.7755 L1.8546 72.74 Z"></path>
              <path class="uba-splash-icon-stroke" pathLength="1"
                d="M62.4888 1.5 L50.6646 57.2705 C44.4644 45.0738 38.2678 32.7621 32.1372 20.4492 C30.9781 17.4952 30.0006 14.5406 30.0005 11.8154 C30.0005 8.81133 31.0244 6.72221 32.8189 5.2041 C34.6767 3.63247 37.4926 2.56342 41.2515 1.95605 C41.8816 1.87692 42.7754 1.76088 43.5562 1.66406 C43.9493 1.6153 44.3064 1.57195 44.5776 1.54101 C44.9091 1.50321 44.9903 1.5 44.9399 1.5 L62.4888 1.5 Z"></path>
              <path class="uba-splash-icon-fill"
                d="M13.7918 16.9935C19.9672 29.2028 26.1388 41.527 32.2445 53.8523C33.3976 56.8087 34.3692 59.7652 34.3637 62.4904C34.3576 65.4945 33.3295 67.5815 31.532 69.096C29.671 70.6639 26.8529 71.7272 23.0928 72.3269C22.4625 72.4048 21.5684 72.519 20.7875 72.6143C20.3942 72.6622 20.0371 72.7049 19.7658 72.7352C19.4343 72.7724 19.353 72.7754 19.4034 72.7755L1.8546 72.74L13.7918 16.9935Z"></path>
              <path class="uba-splash-icon-fill"
                d="M50.6646 57.2705C44.4644 45.0738 38.2678 32.7621 32.1372 20.4492C30.9781 17.4952 30.0006 14.5406 30.0005 11.8154C30.0005 8.81133 31.0244 6.72221 32.8189 5.2041C34.6767 3.63247 37.4926 2.56342 41.2515 1.95605C41.8816 1.87692 42.7754 1.76088 43.5562 1.66406C43.9493 1.6153 44.3064 1.57195 44.5776 1.54101C44.9091 1.50321 44.9903 1.5 44.9399 1.5L62.4888 1.5L50.6646 57.2705Z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="uba-splash-bottom-mask">
        <div class="uba-splash-row2-wrap">
          <svg class="uba-splash-row2-svg" viewBox="0 62.2173 201.718 15.4929" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M198.757 72.1546L198.835 72.0764V74.815C197.822 75.754 197.277 76.067 196.342 76.067C195.251 76.067 194.472 75.6757 194.472 74.4238C194.472 72.5459 196.498 72.0764 197.589 72.0764C197.744 72.0764 198.368 72.1546 198.757 72.1546ZM84.536 72.1546C84.614 72.2328 84.6919 72.2329 84.7698 72.0764V74.7368C83.9127 75.754 82.9778 76.067 82.1987 76.067C81.1858 76.067 80.4066 75.754 80.4066 74.502C80.4066 72.6241 82.2765 72.0764 83.4453 72.0764C83.6012 72.0764 84.1465 72.0764 84.536 72.1546ZM74.5631 72.8589C74.5631 75.441 72.6152 75.754 70.9012 75.754C70.7453 75.754 69.9663 75.754 69.5766 75.6757V70.1202C70.0441 70.1985 70.8232 70.1202 71.057 70.1202C73.0049 70.1202 74.5631 70.5114 74.5631 72.8589ZM56.4092 69.1812V75.128C55.8638 75.754 54.9288 75.9887 54.4613 75.9887C51.8122 75.9887 51.111 74.1107 51.111 72.1546C51.111 70.3549 52.046 68.1641 54.3834 68.1641C55.0067 68.1641 55.8638 68.3206 56.4092 69.1812ZM43.7871 68.2423C44.4104 68.3206 45.6571 69.6507 45.6571 70.3549V70.7462H39.8914V70.5114C40.3589 68.8683 41.4498 68.1641 42.8522 68.1641C43.008 68.1641 43.4755 68.164 43.7871 68.2423ZM132.141 71.9981C132.141 73.5631 131.674 75.9887 129.258 75.9887C126.765 75.9887 126.531 73.4848 126.531 72.0764C126.531 70.6679 126.921 68.0858 129.336 68.0858C131.752 68.0858 132.141 70.5114 132.141 71.9981ZM179.824 66.6773V77.4754H177.954V68.2423H176.474V66.6773H179.824ZM27.2698 66.6773V77.4754H25.322V68.2423H23.8416V66.6773H27.2698ZM156.061 72.7806H151.932L154.113 66.5991L156.061 72.7806ZM199.147 66.9904C200.16 67.3816 200.861 69.3377 200.861 70.1984V75.2844C200.939 75.754 201.095 76.3017 201.718 76.6929V77.6319H200.783C200.16 77.4754 199.225 76.9276 199.069 76.3017C198.524 77.2407 196.498 77.7101 195.641 77.7101C193.693 77.7101 192.525 76.067 192.525 74.4238C192.525 71.5286 195.641 70.5115 197.511 70.5115C197.667 70.5115 198.368 70.6679 198.836 70.7462C198.913 70.6679 198.913 70.5115 198.913 70.3549C198.913 68.6336 197.589 68.1641 196.498 68.1641C195.719 68.1641 194.55 68.3988 193.927 69.103C193.615 68.6336 193.07 67.7728 193.07 67.538C193.07 67.3816 193.771 66.9904 194.083 66.9121C194.395 66.7556 194.862 66.5991 195.407 66.5209C195.641 66.4426 196.264 66.4426 196.42 66.4426C197.277 66.4426 198.368 66.6773 199.147 66.9904ZM190.966 67.538C190.732 67.9293 190.421 68.3988 190.109 68.8683C189.018 68.2423 188.473 68.0858 187.538 68.0858C184.811 68.0858 184.188 70.4332 184.188 72.1546C184.188 74.4237 185.278 76.067 187.616 76.067C188.395 76.067 189.564 75.5975 190.265 75.0497L191.044 76.6147C190.421 77.1624 188.239 77.7101 187.226 77.7101C185.201 77.7101 182.941 76.4581 182.24 73.5631C182.24 73.4065 182.162 73.0936 182.162 72.937V71.4504C182.474 67.7727 185.123 66.4426 187.616 66.4426C188.629 66.4426 190.031 66.9121 190.966 67.538ZM175.617 66.5991L174.916 68.477C174.526 68.3205 173.747 68.0858 173.591 68.0858C172.345 68.0858 171.098 69.4943 171.098 70.5897V77.4754H169.15V66.6773H171.098C171.098 67.1469 171.098 67.6946 171.176 68.1641C171.799 66.8338 173.202 66.4426 174.137 66.4426C174.371 66.4426 175.15 66.5209 175.617 66.5991ZM142.816 66.7556C142.582 67.3816 142.348 67.9293 142.114 68.477C141.725 68.3205 140.946 68.0858 140.79 68.0858C139.543 68.0858 138.297 69.4943 138.297 70.5897V77.4754H136.349V66.6773H138.297C138.297 67.1469 138.297 67.6946 138.374 68.1641C138.998 66.8338 140.4 66.4426 141.335 66.4426C141.803 66.4426 142.816 66.7556 142.816 66.7556ZM134.167 71.9981C134.167 74.7368 132.998 77.7101 129.337 77.7101C125.752 77.7101 124.428 74.7368 124.428 71.9981C124.428 69.103 126.064 66.4426 129.337 66.4426C133.076 66.4426 134.167 69.3377 134.167 71.9981ZM95.678 66.5209C97.0025 66.5209 98.2491 68.477 98.2491 69.6507V77.4754H96.3792V70.3549C96.3013 68.7117 95.3663 68.0858 94.1976 68.0858C93.9638 68.0858 93.8081 68.0076 93.7301 68.0858C93.2627 68.1641 91.6264 68.8683 91.6264 69.4943V77.4754H89.7565V66.6773H91.081C91.2369 67.0686 91.4706 67.538 91.6264 67.9293C92.4056 66.8338 93.6522 66.4426 94.743 66.4426C94.8988 66.4426 95.3663 66.5209 95.678 66.5209ZM86.3283 68.5553C86.4062 68.9465 86.7179 69.5725 86.7179 69.8073V74.8933C86.8737 75.3627 86.7958 76.2234 87.575 76.6929V77.6319H86.7179C86.1724 77.5537 85.1596 77.0842 85.0037 76.3017C84.5363 77.2407 82.2768 77.7101 81.4976 77.7101C79.6277 77.7101 78.3811 76.067 78.3811 74.4238C78.3811 71.5286 81.4976 70.5115 83.3675 70.5115C83.5234 70.5115 84.3025 70.6679 84.77 70.7462C84.8479 70.6679 84.8479 70.6679 84.8479 70.4332C84.8479 68.8683 83.7572 68.1641 82.4326 68.1641C81.4976 68.1641 80.7186 68.3206 79.8614 69.103C79.4719 68.8683 79.0824 67.9293 78.9265 67.538C79.7056 66.9121 81.264 66.4426 82.3547 66.4426C83.4455 66.4426 85.7829 66.7556 86.3283 68.5553ZM47.6052 71.0592C47.6052 71.2157 47.6052 71.8416 47.5273 72.2329H39.7359V72.8589C39.8917 75.0497 41.5279 76.067 43.1641 76.067C44.0212 76.067 44.8003 75.8322 45.8132 75.128C46.1249 75.5192 46.3586 75.9887 46.6702 76.4582C46.1249 77.1624 43.7095 77.7101 42.7746 77.7101C39.3464 77.7101 37.7102 74.8933 37.7102 72.1546C37.7102 69.2595 39.5022 66.4426 42.7746 66.4426C45.6574 66.4426 47.6052 68.0858 47.6052 71.0592ZM19.868 66.7556C20.1017 66.8339 20.725 67.4599 20.9588 67.7728C21.0367 67.7728 21.66 69.3378 21.66 69.6507V77.4754H19.7901V70.3549C19.4785 68.5553 18.8551 68.0858 17.6085 68.0858C16.7514 68.0858 15.8944 68.3989 15.0374 69.4943V77.4754H13.1675V66.6774H14.492C14.6477 67.0686 14.8815 67.538 15.0374 67.9293C15.8165 66.8339 17.0631 66.4426 18.1539 66.4426C18.3098 66.4426 19.3226 66.5209 19.868 66.7556ZM73.7842 66.2862C73.7842 68.3206 72.0701 68.5553 70.7455 68.5553H69.5769V64.33H70.8235C71.9922 64.33 73.7842 64.33 73.7842 66.2862ZM32.8795 66.6773H35.8403V68.1641H32.8795V74.2673C33.2692 75.6758 33.8145 76.067 34.7495 76.067C34.9832 76.067 35.8403 75.8322 36.3078 75.6758C36.3857 76.2234 36.5416 76.8495 36.6194 77.3971C35.7624 77.5537 34.2042 77.7102 33.9704 77.7102C32.3342 77.7102 30.9317 76.1453 30.9317 74.6586V68.1641H29.6851V66.6774H30.9317V64.4083C31.555 64.1735 32.2563 63.8605 32.8795 63.704L32.8795 66.6773ZM1.94786 62.6868V72.7023C2.25948 75.0497 3.50608 75.9105 5.06436 75.9105C6.38897 75.9105 7.63552 75.2845 8.25887 73.4849V62.6868H10.2846V73.7196C9.81709 77.0059 7.09016 77.7102 5.06436 77.7102C3.42818 77.7102 1.24666 77.2407 0.31168 75.128C0.155781 74.6586 0 73.876 0 73.7196V62.6868H1.94786ZM180.136 63.704C180.136 64.4864 179.669 64.9559 178.967 64.9559C178.188 64.9559 177.799 64.2517 177.799 63.7822C177.799 62.9998 178.188 62.6085 178.967 62.6085C179.669 62.6085 180.136 62.9998 180.136 63.704ZM27.5816 63.704C27.5816 64.4864 26.8803 64.9559 26.3349 64.9559C25.5558 64.9559 25.1662 64.2517 25.1662 63.7822C25.1662 62.9998 25.7896 62.6085 26.3349 62.6085C27.0362 62.6085 27.5816 62.9998 27.5816 63.704ZM75.888 66.1296C75.888 67.2251 75.3427 68.3206 73.7844 69.103L73.7065 69.2595C75.9659 69.729 76.823 71.4504 76.823 73.1718C76.823 73.3283 76.6672 74.0326 76.5892 74.4238C76.3555 76.1453 73.6285 77.4754 72.304 77.4754H67.4733V62.5303H71.1353C73.239 62.5303 75.888 63.1563 75.888 66.1296ZM154.425 62.452L160.035 77.4754H157.775C157.464 76.4581 157.074 75.3627 156.684 74.3455H151.386C150.919 75.3627 150.529 76.4581 150.218 77.4754H147.958C149.906 72.4676 151.932 67.4599 153.88 62.452H154.425ZM167.748 62.5303C167.67 62.6868 167.203 63.9387 167.125 63.9387C166.891 63.9387 166.346 63.7822 166.112 63.7822C164.71 63.7822 164.086 65.0342 164.086 66.1296C164.086 66.2861 164.164 66.4426 164.164 66.6773H166.346V68.2423H164.164V77.4754H162.294V68.2423H160.736V66.6773H162.294C162.216 64.0952 163.541 62.2173 165.956 62.2173C166.112 62.2173 167.125 62.3737 167.748 62.5303ZM123.883 62.5303L123.415 63.9387C123.104 63.8605 122.558 63.7822 122.324 63.7822C121.467 63.7822 120.299 64.643 120.299 65.5819V66.6773H122.558V68.2423H120.299V77.4754H118.429V68.2423H116.87V66.6773H118.429C118.429 64.017 119.753 62.2173 122.091 62.2173C122.324 62.2173 123.337 62.3737 123.883 62.5303ZM102.924 62.2173V71.5286L106.975 66.6773H109.235L105.885 70.7462L110.014 77.4754H107.91L104.56 72.0764C104.093 72.6241 103.469 73.25 102.924 73.7979V77.4754H100.976V62.2173L102.924 62.2173ZM58.3573 62.2173V77.4754H56.4874C56.4874 77.2407 56.4874 77.0059 56.4095 76.7712C55.4746 77.4754 54.5396 77.6319 53.6046 77.6319C50.1764 77.6319 49.0077 74.7368 49.0077 72.3112C49.0077 69.8855 50.6439 66.4426 53.9941 66.4426C54.5396 66.4426 55.8641 66.6774 56.4874 67.1469V62.2173L58.3573 62.2173Z"></path>
          </svg>
        </div>
      </div>
    </div>
  `;
}

function splashScreenPrototype() {
  return `
    <div class="alty-mockup-prototype alty-mockup-splash-prototype" role="group" aria-label="Splash screen animation">
      <article class="alty-mockup-stage">
        <section class="alty-mock-phone alty-mock-phone-splash" aria-hidden="true">
          ${splashScreenMarkup()}
          ${altyMockupHomeIndicator()}
        </section>
      </article>
    </div>
  `;
}

function splashScreenAnimationOnly() {
  return `
    <div class="animation-only-scene animation-only-splash-scene" role="img" aria-label="UBA splash screen: UBA and United Bank for Africa reveal, UBA aligns left, the graphic mark draws in and fills, then everything collapses to a shared centerline and disappears">
      <section class="alty-mock-phone alty-mock-phone-splash" aria-hidden="true">
        ${splashScreenMarkup()}
        ${altyMockupHomeIndicator()}
      </section>
    </div>
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

function altyMockupOtpCells(options = {}) {
  const { isStatic = false, colorway = "" } = options;
  const digits = ["1", "2", "3", "5", "3", "3"];
  const otpOffsets = [154, 92, 31, -31, -92, -154];
  const colorwayClass = colorway ? `is-${colorway}` : "";

  return `
    <div class="alty-mock-otp-cells ${isStatic ? "is-static" : ""} ${colorwayClass}" aria-hidden="true">
      ${digits
        .map(
          (digit, index) => `
            <span style="--otp-index:${index}; --otp-shift:${otpOffsets[index]}px;">
              <b>${digit}</b>
            </span>
          `,
        )
        .join("")}
      ${
        isStatic
          ? ""
          : `
        <svg class="alty-mock-otp-success" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="25"></circle>
          <path d="M20 33.5 29 42 45 23"></path>
        </svg>
      `
      }
    </div>
  `;
}

function altyMockupOtpScreen(options = {}) {
  const { isStatic = false } = options;
  const colorway = isStatic ? "" : getPrototypeVariantColorway("otp");
  const colorwayClass = colorway ? `alty-otp-${colorway}` : "";

  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-otp-content ${colorwayClass}">
      <div class="alty-mock-copy-block">
        <h2>6-digit code</h2>
        <p>We've sent a 6-digit verification code to mobile phone <strong>+234 ** *** 4000</strong>.</p>
      </div>
      <div class="alty-mock-otp-stack" aria-label="Verification code 1 2 3 5 3 3">
        ${altyMockupOtpCells({ isStatic, colorway })}
        <p class="alty-mock-resend">Didn't get the code? <a href="#six-digit-code">Resend code</a></p>
      </div>
    </main>
  `;
}

function altyMockupOtpErrorScreen() {
  const digits = ["1", "2", "3", "5", "3", "3"];

  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-otp-content">
      <div class="alty-mock-copy-block">
        <h2>6-digit code</h2>
        <p>We've sent a 6-digit verification code to mobile phone <strong>+234 ** *** 4000</strong>.</p>
      </div>
      <div class="alty-mock-otp-stack" aria-label="Verification code 1 2 3 5 3 3">
        <div class="alty-mock-otp-cells is-error" data-otp-error-cells aria-hidden="true">
          ${digits
            .map(
              (digit, index) => `
                <span style="--otp-index:${index};">
                  <b>${digit}</b>
                </span>
              `,
            )
            .join("")}
        </div>
        <p class="alty-mock-resend">Didn't get the code? <a href="#six-digit-code">Resend code</a></p>
      </div>
    </main>
  `;
}

function altyMockupOtpLoadingScreen() {
  return `
    ${altyMockupOtpScreen({ isStatic: true })}
    <div class="alty-mock-scrim" aria-hidden="true">
      <div class="alty-mock-scrim-loader">
        ${ubaIconLoopScene()}
      </div>
    </div>
  `;
}

function altyMockupSecurePassScreen() {
  const colorway = getPrototypeVariantColorway("securepass");
  const colorwayClass = colorway ? `alty-otp-${colorway}` : "";

  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-securepass-content ${colorwayClass}">
      <div class="alty-mock-copy-block">
        <h2>Verify with SecurePass</h2>
        <p>Open the SecurePass app and enter the 6-digit code to confirm this change.</p>
      </div>
      <div class="alty-mock-otp-stack" aria-label="Verification code 1 2 3 5 3 3">
        ${altyMockupOtpCells({ colorway })}
      </div>
      <p class="alty-mock-resend alty-mock-securepass-hint">Don't have a code? <a href="#verify-securepass">Download the SecurePass app</a></p>
      <div class="alty-mock-securepass-actions">
        <div class="alty-mock-limit-card">
          <span>New limit</span>
          <strong>₦500,000</strong>
        </div>
        ${altyMockupButton("Update limit", "primary")}
      </div>
    </main>
    ${altyMockupNumericKeyboard()}
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupNumericKeyboard() {
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "del"],
  ];

  return `
    <div class="alty-mock-keyboard alty-mock-keyboard-numeric" aria-hidden="true">
      <div class="alty-mock-key-rows">
        ${keys
          .map(
            (row) => `
              <div class="alty-mock-key-row">
                ${row
                  .map((key) => {
                    if (key === "") {
                      return `<span class="alty-mock-key is-blank"></span>`;
                    }
                    if (key === "del") {
                      return `<span class="alty-mock-key is-action" aria-label="Delete">⌫</span>`;
                    }
                    return `<span class="alty-mock-key">${key}</span>`;
                  })
                  .join("")}
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
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

function altyMockupNotificationScreen() {
  return `
    ${altyMockupStatusBar()}
    <div class="alty-notification-home" aria-hidden="true">
      <section class="alty-notification-accounts">
        <span class="alty-notification-red-glow"></span>
        <div class="alty-notification-account-card">
          <div class="alty-notification-top-nav">
            <span class="alty-notification-avatar">
              <img src="./assets/notification-avatar.png" alt="">
            </span>
            <span class="alty-notification-currency">
              <span class="alty-notification-flag"></span>
              <strong>NGN</strong>
              <span class="alty-notification-chevron"></span>
            </span>
            <span class="alty-notification-card-bell">
              ${altyMockupSmallBellGlyph()}
            </span>
          </div>
          <div class="alty-notification-balance">
            <p>Total balance &bull; 10 accounts</p>
            <strong>₦98,865,229,204.00 ${altyMockupEyeSlashGlyph()}</strong>
          </div>
          <span class="alty-notification-swipe"></span>
        </div>
      </section>
      <section class="alty-notification-actions">
        ${altyMockupNotificationAction("card", "Cards")}
        ${altyMockupNotificationAction("plus", "Fund")}
        ${altyMockupNotificationAction("arrow", "Transfer")}
        ${altyMockupNotificationAction("phone", "Airtime")}
        ${altyMockupNotificationAction("card", "")}
      </section>
      <div class="alty-notification-updated">
        ${altyMockupRefreshGlyph()}
        <span>Last updated 2:27 PM</span>
      </div>
    </div>
    <div class="alty-notification-backdrop" aria-hidden="true"></div>
    <section class="alty-notification-sheet" aria-label="Enable notifications">
      <div class="alty-notification-art-frame">
        ${notificationBellMark("is-sheet-icon")}
      </div>
      <div class="alty-notification-sheet-copy">
        <h2>Enable notifications</h2>
        <p>Enable notifications to track your spending, incoming transactions, and receive security alerts to help keep your money safe.</p>
      </div>
      <div class="alty-notification-sheet-actions">
        <button class="alty-notification-sheet-button is-secondary" type="button">Not now</button>
        <button class="alty-notification-sheet-button is-primary" type="button">Enable</button>
      </div>
    </section>
  `;
}

function altyMockupStandardSuccessScreen() {
  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-standard-success-content">
      ${altyMockupMotionSlot("core-spinner-02", "success")}
      <div class="alty-mock-copy-block">
        <h2>Successful</h2>
        <p>Your request has been completed.</p>
      </div>
    </main>
    <footer class="alty-mock-footer is-single">
      ${altyMockupButton("Done", "primary")}
    </footer>
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupSuccessScreen() {
  const activeSuccessMotion = getActivePrototypeMotionSlug("success");
  const showGreenSpinnerUnderConfetti = activeSuccessMotion === "uploaded-success-confetti-green";

  return `
    ${altyMockupStatusBar()}
    ${altyMockupTopBar()}
    <main class="alty-mock-content alty-mock-success-content">
      <div class="alty-mock-copy-block">
        <h2>Your account<br>successfully opened!</h2>
        <p>Your <span class="alty-mock-text-accent">Tier 1 Savings</span> account is ready. You can start funding your account and enjoy banking with UBA.</p>
      </div>
      ${showGreenSpinnerUnderConfetti ? altyMockupMotionSlot("success", "success", "success-spinner-green") : ""}
      ${altyMockupMotionSlot("success", "success")}
      <div class="alty-mock-details-stack">
        <section class="alty-mock-detail-card">
          ${altyMockupDetailRow("Name", "Balogun Seyi")}
          ${altyMockupDetailRow("Account number", "0123456789")}
        </section>
        <section class="alty-mock-upgrade-card" aria-label="Get higher limits">
          <div class="alty-mock-upgrade-glow" aria-hidden="true"></div>
          <div class="alty-mock-upgrade-content">
            <div class="alty-mock-upgrade-copy">
              <h3>Get higher limits</h3>
              <p>Upgrade your account to increase your transaction limits.</p>
              <button class="alty-mock-upgrade-button" type="button"><span>Upgrade account</span></button>
            </div>
            ${altyMockupCoinStack()}
          </div>
        </section>
      </div>
    </main>
    <footer class="alty-mock-footer is-single">
      ${altyMockupButton("Go to Home", "primary")}
    </footer>
    ${altyMockupHomeIndicator()}
  `;
}

function altyMockupCoinStack() {
  return `
    <div class="alty-mock-upgrade-art" aria-hidden="true">
      <img class="alty-mock-upgrade-coins" src="./assets/account-success-upgrade-coins.png" alt="">
    </div>
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

function altyMockupSmallBellGlyph() {
  return `
    <svg class="alty-mock-small-bell" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 17H16C15.15 16.05 15 14.95 15 13.25V10.4C15 8.05 13.72 6.5 12 6.5C10.28 6.5 9 8.05 9 10.4V13.25C9 14.95 8.85 16.05 8 17Z"></path>
      <path d="M10.2 18.4C10.55 19.05 11.18 19.45 12 19.45C12.82 19.45 13.45 19.05 13.8 18.4"></path>
      <path d="M11 6.7C11.05 5.9 11.43 5.45 12 5.45C12.57 5.45 12.95 5.9 13 6.7"></path>
    </svg>
  `;
}

function altyMockupEyeSlashGlyph() {
  return `
    <svg class="alty-mock-eye-slash" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.4 12.2C5.45 8.65 8.35 6.85 12 6.85C15.65 6.85 18.55 8.65 20.6 12.2C19.72 13.72 18.7 14.92 17.56 15.78"></path>
      <path d="M14.1 14.25C13.52 14.78 12.82 15.05 12 15.05C10.2 15.05 8.95 13.8 8.95 12C8.95 11.16 9.22 10.46 9.75 9.9"></path>
      <path d="M4.8 4.8L19.2 19.2"></path>
    </svg>
  `;
}

function altyMockupRefreshGlyph() {
  return `
    <svg class="alty-mock-refresh-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.7 7.1A7.2 7.2 0 0 0 5.35 10.8"></path>
      <path d="M17.7 7.1V3.8"></path>
      <path d="M17.7 7.1H14.4"></path>
      <path d="M6.3 16.9A7.2 7.2 0 0 0 18.65 13.2"></path>
      <path d="M6.3 16.9V20.2"></path>
      <path d="M6.3 16.9H9.6"></path>
    </svg>
  `;
}

function altyMockupNotificationAction(type, label) {
  return `
    <div class="alty-notification-action-item">
      <span class="alty-notification-action-circle">${altyMockupNotificationActionGlyph(type)}</span>
      <span>${label}</span>
    </div>
  `;
}

function altyMockupNotificationActionGlyph(type) {
  const paths = {
    card: `
      <rect x="4" y="6" width="16" height="12" rx="2.2"></rect>
      <path d="M4 10H20"></path>
      <path d="M7.2 14.2H11.4"></path>
    `,
    plus: `
      <circle cx="12" cy="12" r="7.2"></circle>
      <path d="M12 8.2V15.8"></path>
      <path d="M8.2 12H15.8"></path>
    `,
    arrow: `
      <circle cx="12" cy="12" r="7.2"></circle>
      <path d="M9.1 14.9L15 9"></path>
      <path d="M10.3 9H15V13.7"></path>
    `,
    phone: `
      <rect x="7.3" y="3.8" width="9.4" height="16.4" rx="2.2"></rect>
      <path d="M10.5 17.1H13.5"></path>
    `,
  };

  return `
    <svg class="alty-notification-action-glyph is-${type}" viewBox="0 0 24 24" aria-hidden="true">
      ${paths[type] || paths.card}
    </svg>
  `;
}

function altyMockupNotificationItem(title, detail, time, unread = false) {
  return `
    <article class="alty-mock-notification-item ${unread ? "is-unread" : ""}">
      <span class="alty-mock-notification-item-icon" aria-hidden="true">${altyMockupSmallBellGlyph()}</span>
      <div>
        <strong>${title}</strong>
        <p>${detail}</p>
      </div>
      <time>${time}</time>
    </article>
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
  return visiblePages.some((page) => page.slug === slug) ? slug : defaultPage.slug;
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
  const sectionBySlug = new Map(sectionPages.map((page) => [page.slug, page]));
  const groups = navGroups[activeSection] || [
    {
      title: activeSection === "prototypes" ? "Prototypes" : "Motion elements",
      slugs: sectionPages.map((page) => page.slug),
    },
  ];
  const usedSlugs = new Set();
  // Number pages by the order they appear in the nav, so the count stays a
  // clean, gap-free sequence regardless of how the pages are defined.
  let order = 0;
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
              .map((page) => renderPageLink(page, order++, activePage))
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
            .map((page) => renderPageLink(page, order++, activePage))
            .join("")}
        </div>
      </section>
    `
    : "";

  return `${renderedGroups}${ungroupedGroup}`;
}

function renderActivePageScene(activePage) {
  if (!showOnlyAnimation) {
    return activePage.scene();
  }

  const animationOnlyScene = animationOnlySceneBySlug[activePage.slug];
  return animationOnlyScene ? animationOnlyScene() : activePage.scene();
}

function render() {
  const currentSlug = getCurrentSlug();
  const activePage = pages.find((page) => page.slug === currentSlug) || defaultPage;
  const activeSection = getPageSection(activePage);
  const sectionPages = pages.filter((page) => getPageSection(page) === activeSection);
  const modeControls = `
    <nav class="section-switch dev-switch" aria-label="Gallery mode">
      <a class="section-choice" href="./mobile-handoff/gallery.html">Dev</a>
    </nav>
  `;
  const sectionControls = MOTION_ELEMENTS_VISIBLE && visibleSections.length > 1
    ? `
    <nav class="section-switch" aria-label="Prototype section">
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
  `
    : "";
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
  const animationOnlyControls = renderAnimationModeToggle("is-header-control");
  const headerControls = `
    <div class="header-control-row">
      ${modeControls}
      ${sectionControls}
      ${animationOnlyControls}
      ${themeControls}
    </div>
  `;

  app.dataset.accent = activePage.accent;
  app.dataset.prototypeTheme = prototypeTheme === "light" ? "light" : "dark";
  app.dataset.animationMode = showOnlyAnimation ? "only" : "prototype";
  document.documentElement.dataset.prototypeTheme = prototypeTheme === "light" ? "light" : "dark";
  document.documentElement.dataset.animationMode = showOnlyAnimation ? "only" : "prototype";
  app.innerHTML = `
    <aside class="side-rail" aria-label="Loader pages">
      <a class="brand-mark" href="#${defaultPage.slug}" aria-label="UBA-animations-prototypes home">
        <span></span>
        <strong>UBA-animations-prototypes</strong>
      </a>
      <nav class="page-nav">
        ${renderPageNav(sectionPages, activePage, activeSection)}
      </nav>
    </aside>
    <main class="page-view">
      <section class="page-heading" aria-labelledby="page-title">
        <div class="heading-top">
          <h1 id="page-title">${activePage.title}</h1>
          ${headerControls}
        </div>
      </section>
      <section class="stage-band" data-animation-only-page="${showOnlyAnimation ? activePage.slug : ""}">
        ${renderActivePageScene(activePage)}
      </section>
    </main>
  `;

  initPullZones();
  initAnimationModeSwitchers();
  initThemeSwitchers();
  initPrototypeVariantPagers();
  initUbaLottieSpinners();
  initSuccessConfettiLotties();
  initUbaIconLoopScenes();
  initOtpErrorHaptics();
}

function initAnimationModeSwitchers() {
  document.querySelectorAll("[data-animation-mode-toggle]").forEach((toggle) => {
    toggle.addEventListener("change", () => {
      showOnlyAnimation = toggle.checked;

      try {
        window.localStorage.setItem("loader-show-only-animation", String(showOnlyAnimation));
      } catch {
        // Animation mode persistence is optional.
      }

      render();
    });
  });
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

      initSuccessConfettiLotties();
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
    let shouldContinue = false;

    instances.forEach((instance) => {
      const duration = instance.durationMs || 1000;
      const elapsed = now - startTime;
      let progressFrame;

      if (instance.mode === "circle-resolve" || instance.mode === "forward-hold") {
        progressFrame = Math.min(1, elapsed / duration);
        shouldContinue = shouldContinue || progressFrame < 1;
      } else {
        const loopElapsed = elapsed % (duration * 2);
        progressFrame = loopElapsed <= duration ? loopElapsed / duration : 2 - loopElapsed / duration;
        shouldContinue = true;
      }

      const frame = instance.ip + progressFrame * (instance.op - instance.ip);
      updateUbaLottieSpinnerInstance(instance, frame);
    });

    if (shouldContinue) {
      ubaLottieSpinnerFrame = window.requestAnimationFrame(tick);
    } else {
      ubaLottieSpinnerFrame = 0;
    }
  };

  tick(startTime);
}

function initSuccessConfettiLotties() {
  successConfettiLottieInstances.forEach((instance) => instance.destroy());
  successConfettiLottieInstances = [];

  const containers = Array.from(document.querySelectorAll("[data-success-confetti-lottie]"));
  if (!containers.length) {
    return;
  }

  if (!window.lottie || !window.confettiLottieData) {
    containers.forEach((container) => {
      container.dataset.lottieState = "missing";
    });
    return;
  }

  containers.forEach((container) => {
    const delayMs = Number(container.dataset.successConfettiDelayMs || 0);
    const hasDelay = Number.isFinite(delayMs) && delayMs > 0;
    const startFrame = Number(container.dataset.successConfettiStartFrame || 0);

    container.dataset.lottieState = hasDelay ? "waiting" : "loading";
    container.style.opacity = hasDelay ? "0" : "";

    const animationData = cloneLottieData(window.confettiLottieData);
    const successPalette = getSuccessConfettiLottiePalette(container);

    if (successPalette) {
      recolorSuccessConfettiLottie(animationData, successPalette);
    }

    try {
      const instance = window.lottie.loadAnimation({
        animationData,
        autoplay: !hasDelay,
        container,
        loop: false,
        renderer: "svg",
        rendererSettings: {
          hideOnTransparent: true,
          preserveAspectRatio: "xMidYMid slice",
          progressiveLoad: true,
        },
      });
      let hasStarted = !hasDelay;

      instance.addEventListener("DOMLoaded", () => {
        container.dataset.lottieState = hasStarted ? "loaded" : "waiting";
      });
      instance.addEventListener("data_failed", () => {
        container.dataset.lottieState = "missing";
      });

      if (hasDelay) {
        const timeoutId = window.setTimeout(() => {
          hasStarted = true;
          container.style.opacity = "";
          container.dataset.lottieState = "loaded";
          instance.goToAndPlay(Number.isFinite(startFrame) ? startFrame : 0, true);
        }, delayMs);

        successConfettiLottieInstances.push({
          destroy() {
            window.clearTimeout(timeoutId);
            instance.destroy();
          },
        });
      } else {
        successConfettiLottieInstances.push(instance);
      }
    } catch {
      container.style.opacity = "";
      container.dataset.lottieState = "missing";
    }
  });
}

function getSuccessConfettiLottiePalette(container) {
  if (container.dataset.successConfettiPalette !== "green") {
    return null;
  }

  const green = [0.133, 0.773, 0.369, 1];
  const white = [1, 1, 1, 1];

  return prototypeTheme === "light" ? [green] : [green, white];
}

function recolorSuccessConfettiLottie(animationData, palette) {
  let colorIndex = 0;
  const nextColor = () => palette[colorIndex++ % palette.length].slice();
  const isStaticColor = (value) => (
    Array.isArray(value)
    && value.length >= 3
    && value.slice(0, 4).every((channel) => Number.isFinite(Number(channel)))
  );
  const setFlatColor = (colorProperty) => {
    if (isStaticColor(colorProperty?.k)) {
      colorProperty.k = nextColor();
    }
  };
  const setGradientColors = (gradientProperty) => {
    const stopCount = Number(gradientProperty?.p || 0);
    const value = gradientProperty?.k?.k;

    if (!stopCount || !Array.isArray(value)) {
      return;
    }

    const applyStops = (stops) => {
      if (!Array.isArray(stops)) {
        return;
      }

      for (let index = 0; index < stopCount; index += 1) {
        const offset = index * 4;
        const color = nextColor();
        stops[offset + 1] = color[0];
        stops[offset + 2] = color[1];
        stops[offset + 3] = color[2];
      }
    };

    if (value.every((channel) => Number.isFinite(Number(channel)))) {
      applyStops(value);
      return;
    }

    value.forEach((keyframe) => {
      applyStops(keyframe.s);
      applyStops(keyframe.e);
    });
  };
  const walk = (node) => {
    if (!node || typeof node !== "object") {
      return;
    }

    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (node.ty === "fl" || node.ty === "st") {
      setFlatColor(node.c);
    }

    if (node.ty === "gf" || node.ty === "gs") {
      setGradientColors(node.g);
    }

    Object.values(node).forEach(walk);
  };

  walk(animationData);
}

function cloneLottieData(data) {
  if (typeof structuredClone === "function") {
    return structuredClone(data);
  }

  return JSON.parse(JSON.stringify(data));
}

function initUbaIconLoopScenes() {
  ubaIconLoopGeneration += 1;
  const generation = ubaIconLoopGeneration;

  const scene = document.querySelector("[data-uba-icon-loop]");
  if (!scene) {
    return;
  }

  const DRAW_MS = 850;
  const HOLD_MS = 500;
  const ERASE_MS = 850;
  const GAP_MS = 300;
  // Draw starts fast so short, just-begun strokes (which render as a round-cap
  // dot until they gain some length) pass by almost instantly instead of lingering.
  const DRAW_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const ERASE_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

  const iconPathGroups = Array.from(scene.querySelectorAll(".uba-icon-loop-icon")).map((icon) => {
    const paths = Array.from(icon.querySelectorAll("path"));
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.dataset.len = length;
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      path.style.opacity = "0";
    });
    return paths;
  });

  if (!iconPathGroups.length) {
    return;
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Belt-and-braces: force every icon other than the active one back to fully
  // hidden before each turn, cancelling any animation still attached to it, so a
  // stray path can never remain partway drawn while a different icon is showing.
  function forceHidden(paths) {
    paths.forEach((path) => {
      path.getAnimations().forEach((anim) => anim.cancel());
      path.style.strokeDashoffset = path.dataset.len;
      path.style.opacity = "0";
    });
  }

  function animatePaths(paths, direction, duration) {
    const anims = paths.map((path) => {
      const length = Number(path.dataset.len);
      const revealLength = Math.min(8, Math.max(4.5, length * 0.28));
      const revealOffset = Math.max(length - revealLength, 0);
      const keyframes =
        direction === "draw"
          ? [
              { strokeDashoffset: length, opacity: 0, offset: 0 },
              { strokeDashoffset: revealOffset, opacity: 0, offset: 0.12 },
              { strokeDashoffset: revealOffset, opacity: 1, offset: 0.121 },
              { strokeDashoffset: 0, opacity: 1, offset: 1 },
            ]
          : [
              { strokeDashoffset: 0, opacity: 1, offset: 0 },
              { strokeDashoffset: revealOffset, opacity: 1, offset: 0.84 },
              { strokeDashoffset: revealOffset, opacity: 0, offset: 0.841 },
              { strokeDashoffset: length, opacity: 0, offset: 1 },
            ];
      const easing = direction === "draw" ? DRAW_EASE : ERASE_EASE;
      return path.animate(keyframes, { duration, easing, fill: "forwards" });
    });

    return Promise.all(anims.map((anim) => anim.finished)).then(() => {
      anims.forEach((anim) => {
        try {
          anim.commitStyles();
        } catch {
          // Element may have been detached by a subsequent render.
        }
        anim.cancel();
      });
    });
  }

  (async function loop() {
    let index = 0;

    while (ubaIconLoopGeneration === generation) {
      const paths = iconPathGroups[index];
      iconPathGroups.forEach((group, groupIndex) => {
        if (groupIndex !== index) {
          forceHidden(group);
        }
      });
      await animatePaths(paths, "draw", DRAW_MS);
      if (ubaIconLoopGeneration !== generation) break;
      await delay(HOLD_MS);
      if (ubaIconLoopGeneration !== generation) break;
      await animatePaths(paths, "erase", ERASE_MS);
      if (ubaIconLoopGeneration !== generation) break;
      await delay(GAP_MS);
      index = (index + 1) % iconPathGroups.length;
    }
  })();
}

function initOtpErrorHaptics() {
  otpErrorHapticsGeneration += 1;
  const generation = otpErrorHapticsGeneration;

  const cells = document.querySelector("[data-otp-error-cells]");
  if (!cells || typeof navigator.vibrate !== "function") {
    return;
  }

  // Mirrors the otp-error-shake keyframe timing below: the row starts shaking at 39% of the 7.2s loop.
  const CYCLE_MS = 7200;
  const SHAKE_AT_MS = CYCLE_MS * 0.39;
  const ERROR_HAPTIC_PATTERN = [24, 48, 18];
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  (async function loop() {
    while (otpErrorHapticsGeneration === generation) {
      await delay(SHAKE_AT_MS);
      if (otpErrorHapticsGeneration !== generation) break;
      navigator.vibrate(ERROR_HAPTIC_PATTERN);
      await delay(CYCLE_MS - SHAKE_AT_MS);
    }
  })();
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
  const mode = container.dataset.ubaLottieMode || "pingpong";
  const result = container.dataset.ubaLottieResult || "";
  const fanGroup = mode === "circle-resolve" ? document.createElementNS(svgNamespace, "g") : svg;

  if (mode === "circle-resolve") {
    const fanId = `uba-organic-fan-${++ubaLottieOrganicId}`;
    const resultPath =
      result === "error"
        ? "M372 372 L828 828 M828 372 L372 828"
        : "M358.588 613.412 L532.941 774.353 L854.824 398.824";

    svg.classList.add("uba-lottie-organic-svg");
    const circle = document.createElementNS(svgNamespace, "circle");
    const resultMark = result ? document.createElementNS(svgNamespace, "path") : null;

    circle.classList.add("uba-lottie-organic-circle");
    circle.setAttribute("cx", formatLottieNumber(width / 2));
    circle.setAttribute("cy", formatLottieNumber(height / 2));
    circle.setAttribute("r", formatLottieNumber(Math.min(width, height) * 0.38));
    if (resultMark) {
      resultMark.classList.add("uba-lottie-organic-result-mark");
      resultMark.setAttribute("d", resultPath);
      resultMark.setAttribute("pathLength", "78");

      if (result === "error") {
        resultMark.classList.add("is-error");
      }
    }
    fanGroup.classList.add("uba-lottie-organic-fan");
    fanGroup.setAttribute("id", fanId);
    svg.appendChild(fanGroup);

    [-15, 15, -30, 30, -45, 45].forEach((rotation, index) => {
      const ghost = document.createElementNS(svgNamespace, "use");
      const distance = Math.abs(rotation);
      const opacity = distance === 15 ? 0.42 : distance === 30 ? 0.28 : 0.16;

      ghost.classList.add("uba-lottie-organic-ghost");
      ghost.style.setProperty("--organic-ghost-rotation", `${rotation}deg`);
      ghost.style.setProperty("--organic-ghost-index", String(index));
      ghost.style.setProperty("--organic-ghost-max-opacity", String(opacity));
      ghost.setAttribute("href", `#${fanId}`);
      ghost.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${fanId}`);
      svg.appendChild(ghost);
    });

    svg.appendChild(circle);
    if (resultMark) {
      svg.appendChild(resultMark);
    }
  }

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

    fanGroup.appendChild(layerGroup);
  });

  container.replaceChildren(svg);
  const durationMs = (((Number(data.op) || 500) - (Number(data.ip) || 0)) / (Number(data.fr) || 60)) * 1000;
  container.closest(".uba-lottie-resolve-wrap")?.style.setProperty("--uba-lottie-duration", `${durationMs}ms`);

  return {
    animatedTransforms,
    durationMs,
    ip: Number(data.ip) || 0,
    mode,
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
  window.location.hash = defaultPage.slug;
}

render();
