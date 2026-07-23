const pages = [
  {
    slug: "progressive-blur-spinner",
    title: "Progressive Blur Spinner",
    accent: "red",
    label: "Layered neon spinner with a stretching trimmed stroke.",
    scene: () => `
      <div class="loader-scene progressive-scene" role="img" aria-label="Progressive red blur spinner">
        <span class="ambient-orbit orbit-a"></span>
        <span class="ambient-orbit orbit-b"></span>
        ${cometSvg("progressive")}
      </div>
    `,
  },
  {
    slug: "progressive-blur-spinner-solo",
    title: "Progressive Blur Spinner Solo",
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
    title: "Minimalist-Spinner",
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
    slug: "pull-to-refresh-blob-capsule",
    title: "Pull-to-refresh Blob Capsule",
    accent: "uba",
    themeable: true,
    label: "Frosted capsule with UBA gradient blobs moving through pull states.",
    scene: () => `
      ${pullRefreshPrototype("blob")}
    `,
  },
  {
    slug: "pull-to-refresh-glass-capsule",
    title: "Pull-to-refresh Glass Capsule",
    accent: "red",
    themeable: true,
    label: "Frosted capsule with a clean red pull indicator.",
    scene: () => `
      ${pullRefreshPrototype("clean")}
    `,
  },
  {
    slug: "pull-to-refresh-neutral-capsule",
    title: "Pull-to-refresh Neutral Capsule",
    accent: "ink",
    themeable: true,
    label: "Neutral frosted capsule pull indicator in light and dark themes.",
    scene: () => `
      ${pullRefreshPrototype("neutral")}
    `,
  },
  {
    slug: "pull-to-refresh-neutral-capsule-2",
    title: "Pull-to-refresh Neutral Capsule 2",
    accent: "ink",
    themeable: true,
    label: "Neutral frosted capsule resolving into a top bounce and check state.",
    scene: () => `
      ${pullRefreshPrototype("neutral-complete")}
    `,
  },
  {
    slug: "success-wheel-2",
    title: "success-wheel-2",
    accent: "violet",
    label: "Circular loader line filling into a red success confirmation.",
    scene: () => `
      ${successWheelTwoPrototype()}
    `,
  },
  {
    slug: "uba-media-blob-prototype",
    title: "UBA Media Blob Prototype",
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
    title: "UBA-loader-gradient-blob prototype",
    accent: "uba",
    themeable: true,
    label: "Gradient blob loader transitioning from PIN entry to successful payment.",
    scene: () => `
      <div class="alty-flow-scene" role="img" aria-label="UBA gradient blob loader prototype over payment confirmation flow">
        ${ubaLoaderGradientBlobPrototype()}
      </div>
    `,
  },
];

const routeAliases = {
  "alty-marketing-transition-loader": "uba-loader-gradient-blob-prototype",
  "frosted-glass-pull-to-refresh-blob": "pull-to-refresh-blob-capsule",
  "pull-to-refresh-minimalist": "pull-to-refresh-glass-capsule",
  "uba-media-transition-loader": "uba-loader-gradient-blob-prototype",
};

const app = document.getElementById("app");
let prototypeTheme = "dark";

try {
  prototypeTheme = window.localStorage.getItem("loader-motion-theme") || prototypeTheme;
} catch {
  prototypeTheme = "dark";
}

if (prototypeTheme !== "light") {
  prototypeTheme = "dark";
}

function cometSvg(id) {
  return `
    <svg class="comet-svg" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-trail" x1="88" y1="18" x2="23" y2="93" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="rgba(255, 36, 56, 1)"></stop>
          <stop offset="48%" stop-color="rgba(255, 36, 56, 0.55)"></stop>
          <stop offset="100%" stop-color="rgba(255, 36, 56, 0)"></stop>
        </linearGradient>
        <filter id="${id}-glow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="4" result="blur"></feGaussianBlur>
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0.9  0 0.22 0 0 0.02  0 0 0.18 0 0.03  0 0 0 1 0"
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

function pullRefreshPrototype(variant) {
  const labels = {
    blob: "Blob pull-to-refresh capsule",
    clean: "Clean pull-to-refresh capsule",
    neutral: "Neutral pull-to-refresh capsule",
    "neutral-complete": "Neutral pull-to-refresh capsule with final check",
  };
  const variantClasses = {
    blob: "ptr-blob-capsule",
    clean: "ptr-clean-capsule",
    neutral: "ptr-neutral-capsule",
    "neutral-complete": "ptr-neutral-capsule ptr-neutral-complete-capsule",
  };
  const hasSuccessCheck = variant === "blob" || variant === "neutral-complete";

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
          <span class="ptr-indicator"></span>
          ${hasSuccessCheck ? pullRefreshSuccessCheck() : ""}
        </div>
      </div>
    </div>
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

function successWheelTwoPrototype() {
  return `
    <div class="loader-scene success-wheel-two-scene" role="img" aria-label="Success wheel loader filling red and resolving into a check">
      <div class="success-wheel-two-mark">
        <svg class="success-wheel-two-svg" viewBox="0 0 120 120" aria-hidden="true">
          <g class="success-wheel-two-rotor">
            <circle class="success-wheel-two-line" cx="60" cy="60" r="34" pathLength="100"></circle>
          </g>
          <circle class="success-wheel-two-fill" cx="60" cy="60" r="34"></circle>
          <path class="success-wheel-two-check" d="M42 61 L55 73 L79 45"></path>
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
          <div class="uba-seed-state uba-state-logo">${ubaLogoSvg("uba-logo-shape")}</div>
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

function ubaLogoSvg(className = "") {
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
    <article class="alty-flow-frame uba-gradient-flow-frame" aria-label="UBA gradient blob payment transition loading state">
      <div class="alty-section-label">UBA-loader-gradient-blob prototype</div>
      <div class="uba-gradient-device-stage">
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
    </article>
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

function getCurrentSlug() {
  const rawSlug = window.location.hash.replace("#", "");
  const slug = routeAliases[rawSlug] || rawSlug;
  return pages.some((page) => page.slug === slug) ? slug : pages[0].slug;
}

function render() {
  const currentSlug = getCurrentSlug();
  const activePage = pages.find((page) => page.slug === currentSlug) || pages[0];
  const activeIndex = pages.indexOf(activePage);
  const previousPage = pages[(activeIndex - 1 + pages.length) % pages.length];
  const nextPage = pages[(activeIndex + 1) % pages.length];
  const headerControls = activePage.themeable
    ? `
      <div class="theme-pager theme-toggle" aria-label="Prototype theme">
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
    `
    : `
      <nav class="number-pager" aria-label="Page pagination">
        <a class="pager-step" href="#${previousPage.slug}" aria-label="Previous page">Prev</a>
        ${pages
          .map(
            (page, index) => `
              <a
                class="pager-number ${page.slug === activePage.slug ? "is-active" : ""}"
                href="#${page.slug}"
                aria-label="Go to page ${index + 1}: ${page.title}"
                aria-current="${page.slug === activePage.slug ? "page" : "false"}"
              >
                ${String(index + 1).padStart(2, "0")}
              </a>
            `,
          )
          .join("")}
        <a class="pager-step" href="#${nextPage.slug}" aria-label="Next page">Next</a>
      </nav>
    `;

  app.dataset.accent = activePage.accent;
  app.dataset.prototypeTheme = prototypeTheme === "light" ? "light" : "dark";
  app.innerHTML = `
    <aside class="side-rail" aria-label="Loader pages">
      <a class="brand-mark" href="#${pages[0].slug}" aria-label="Loader Motion Lab home">
        <span></span>
        <strong>Loader Motion Lab</strong>
      </a>
      <nav class="page-nav">
        ${pages
          .map(
            (page, index) => `
              <a
                class="page-link ${page.slug === activePage.slug ? "is-active" : ""}"
                href="#${page.slug}"
                aria-current="${page.slug === activePage.slug ? "page" : "false"}"
              >
                <span>${String(index + 1).padStart(2, "0")}</span>
                ${page.title}
              </a>
            `,
          )
          .join("")}
      </nav>
    </aside>
    <main class="page-view">
      <section class="page-heading" aria-labelledby="page-title">
        <div class="heading-top ${activePage.themeable ? "has-theme-pager" : ""}">${headerControls}</div>
        <h1 id="page-title">${activePage.title}</h1>
      </section>
      <section class="stage-band">
        ${activePage.scene()}
      </section>
    </main>
  `;

  initPullZones();
  initThemeSwitchers();
}

function initThemeSwitchers() {
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.getAttribute("data-theme-choice") === "light" ? "light" : "dark";
      prototypeTheme = theme;
      app.dataset.prototypeTheme = theme;

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
