# Code Entry — Animation Specification

Covers the three code-entry animations in `mobile-animation-export/06-code-entry/`:

| Export folder | Slug | What it shows |
|---|---|---|
| `01-six-digit-code-green` | `alty-otp-green` | 6-digit code, successful verification |
| `02-securepass-green` | `alty-securepass-green` | SecurePass wording, same motion |
| `03-code-error` | `alty-otp-error` | 6-digit code, failed verification |

> **These are screens, not animation files.** They contain live digits in the Fixel
> typeface, so they cannot ship as a single Lottie or Rive asset. Build them as a
> normal native screen and apply the motion below to real views.

---

## 1. Read this first: the prototype loop is not the product timing

In the web prototype every element runs on one shared **7.2s infinite loop**, because
the gallery needs to replay the whole story unattended. The real screen is
**event-driven**: digits appear when the user types or when SMS autofill fires, and the
result state arrives when the server answers.

So implement the **state machine** below. The 7.2s timeline is reference only
(Appendix A) — do not reproduce it.

---

## 2. States

```
    empty ──type/autofill──> filling ──all 6 entered──> verifying
                                                            │
                                              ┌─────────────┴─────────────┐
                                          success                       error
                                              │                           │
                                          (dismiss)          ──> back to filling
```

| State | What is on screen |
|---|---|
| `empty` | six cells, no digits, no border highlight |
| `filling` | digits appear one per entry; cell borders stay neutral |
| `verifying` | animated gradient ring sweeps around the cell borders |
| `success` | ring stops, coloured circle pops in centre, check mark draws |
| `error` | cell borders turn red, row shakes, digits stay until cleared |

---

## 3. Geometry

| Property | Value |
|---|---|
| Row container max width | `361px` (mockup width `393px`) |
| Layout | 6 equal columns, `10px` gap |
| Cell size | full column width × `56px` high |
| Cell corner radius | `12px` |
| Cell border | `1px` idle, **`2px` while verifying** |
| Success mark | `64×64` viewBox, centred over the row |
| Success circle | radius `25` |
| Check path | `M20 33.5 29 42 45 23`, stroke width `5.5`, round caps and joins |

---

## 4. Motion specs

All easing values are taken from the source. Durations marked **(proposed)** are
converted from demo pacing to product pacing and need design sign-off — see §6.

### 4.1 Digit appears (`filling`)

| | |
|---|---|
| Duration | **180ms (proposed)** |
| Easing | `cubic-bezier(0.42, 0, 0.2, 1)` |
| Stagger between cells | `90ms` (only relevant for autofill, when six digits land at once) |
| From | `opacity 0`, `translateY(+4px)`, `scale(0.96)` |
| To | `opacity 1`, `translateY(0)`, `scale(1)` |

On single-key entry there is no stagger — each digit animates as it is typed.

### 4.2 Verifying ring

A conic-gradient sweep travelling around the cell border.

| | |
|---|---|
| Behaviour | **loops until the server answers** (indeterminate) |
| Border width | animates `1px → 2px` on entry, back to `1px` on exit |
| Sweep | `680°` per cycle, continuing to `780°` as it fades out |
| Fade in | ring opacity `0 → 1` |
| Fade out | ring opacity `1 → 0` |

Ring gradient (green colorway), as conic stops:

| Stop | Colour |
|---|---|
| 0–8% | transparent |
| 15% | `rgba(134, 239, 172, 0.72)` |
| 27% | `rgba(74, 222, 128, 1)` |
| 43% | `rgba(22, 163, 74, 1)` |
| 57% | `rgba(34, 197, 94, 0.94)` |
| 72% | `rgba(134, 239, 172, 0.74)` |
| 86–100% | transparent |

Outer glow while active:
`0 0 10px rgba(22, 163, 74, 0.24)`, `0 0 22px rgba(74, 222, 128, 0.16)`.

### 4.3 Success

Two overlapping animations. The check begins drawing **while the circle is still
settling** — do not run them back to back.

**Circle pop**

| | |
|---|---|
| Duration | **560ms (proposed)** |
| Easing | `cubic-bezier(0.54, 0, 0.18, 1)` |
| Keyframes | `scale 0.64, opacity 0` → `scale 1.1, opacity 1` (overshoot) → `scale 1.0` |
| Fill | `#22c55e` |
| Shadow | `0 14px 28px rgba(34, 197, 94, 0.26)`, `0 0 18px rgba(34, 197, 94, 0.16)` |

**Check draw**

| | |
|---|---|
| Duration | **700ms (proposed)** |
| Easing | `ease-in-out` |
| Start offset | begins at ~**45%** through the circle pop |
| Technique | stroke dash: `dasharray 38`, `dashoffset 38 → 0` |
| Stroke | `#fffaf3` |

### 4.4 Error

**Border turns red**, then the row shakes.

| | |
|---|---|
| Border colour | `#d51709`, applied on a single frame (no fade) |
| Border glow | `0 0 7px rgba(213, 23, 9, 0.32)` |
| Shake duration | **520ms (proposed)** |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |

Shake offsets, evenly spaced across the duration — a decaying oscillation on `translateX`:

```
-3.5px → +3.0px → -2.4px → +1.8px → -1.1px → +0.5px → 0
```

Digits remain visible in the error state until the user clears or retypes them.

### 4.5 Caret

The prototype draws its own blinking caret (`1.1s`, hard on/off, no fade).
**Do not reproduce it** — use the platform text cursor on both iOS and Android.

---

## 5. Colorways

The three exports differ only in colorway and wording — the motion is identical.

| Variant | Success circle | Ring gradient |
|---|---|---|
| Green (default) | `#22c55e` | green stops, §4.2 |
| Error | `#d51709` | red — `rgba(255,128,116,.72)`, `rgba(255,56,45,1)`, `rgba(241,35,25,.94)` |
| Monochrome | follows theme text colour (black on light, white on dark) | — |

SecurePass differs from the 6-digit screen by wording only (`animation-only-securepass`
vs `animation-only-otp`); no motion differences.

---

## 6. Open decisions

The durations marked **(proposed)** above were derived from the demo loop by taking each
segment's share of 7.2s and scaling to product-sensible values. They need a decision:

| Motion | Demo share | Proposed | Decided |
|---|---|---|---|
| Digit appear | ~580ms | 180ms | |
| Circle pop | ~580ms | 560ms | |
| Check draw | ~720ms | 700ms | |
| Error shake | ~520ms | 520ms | |

Also to confirm: whether the verifying ring has a **minimum display time**. If the server
answers in 200ms the ring would flash. A common floor is 400–600ms.

---

## 7. Platform notes

- **Fonts** — the digits use Fixel. The export ships `.woff2`, which neither iOS nor
  Android can load directly. Convert to `.ttf`/`.otf` before bundling.
- **Reduced motion** — with `Reduce Motion` enabled, skip the shake and the check draw;
  show the end state directly. Fade the success mark in rather than popping it.
- **The ring is the only indeterminate piece.** Everything else is a discrete transition
  triggered by an event.

---

## Appendix A — the raw prototype timeline

For reference only. All percentages are of the shared **7.2s** loop; multiply by 7200ms
for absolute times.

| % | ms | Event |
|---|---|---|
| 0–10 | 0–720 | cells empty |
| 10–18 | 720–1296 | digits fade/slide in (per-cell delay `index × 90ms`) |
| 18–52 | 1296–3744 | digits held |
| 28–34 | 2016–2448 | ring fades in, border `1px → 2px` |
| 34–55 | 2448–3960 | ring sweeps to `680°` |
| 55–62 | 3960–4464 | ring fades out, continues to `780°` |
| 60–100 | 4320–7200 | digits fade out *(success variant)* |
| 64–72 | 4608–5184 | success circle pops (`0.64 → 1.1`) |
| 72–82 | 5184–5904 | check draws (`dashoffset 38 → 0`) |
| 80–92 | 5760–6624 | success mark held at `scale 1` |
| 92–100 | 6624–7200 | success mark fades out |

Error variant diverges from 38.8%:

| % | ms | Event |
|---|---|---|
| 38.8–39 | 2794–2808 | borders turn `#d51709` |
| 40–47.2 | 2880–3398 | shake oscillation |
| 47.2–71 | 3398–5112 | red border held |
| 71–79 | 5112–5688 | digits fade out |
| 79–100 | 5688–7200 | borders return to transparent |

---

## Appendix B — source files

| | |
|---|---|
| Markup | `mobile-animation-export/06-code-entry/*/source.html` |
| Runnable preview | `mobile-animation-export/06-code-entry/*/preview.html` |
| Styles | `mobile-animation-export/shared/styles.css` |
| Keyframes | `otp-digit-fill`, `otp-digit-fill-error`, `otp-border-loader`, `otp-success-pop`, `otp-success-check-draw`, `otp-error-shake` |
