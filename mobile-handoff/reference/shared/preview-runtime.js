let prototypeTheme = document.querySelector(".app-shell")?.dataset.prototypeTheme || "dark";
let ubaLottieSpinnerFrame = 0;
let ubaLottieOrganicId = 0;
let ubaIconLoopGeneration = 0;
let otpErrorHapticsGeneration = 0;
let successConfettiLottieInstances = [];

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



window.addEventListener("DOMContentLoaded", () => {
  initUbaLottieSpinners();
  initSuccessConfettiLotties();
  initUbaIconLoopScenes();
});
