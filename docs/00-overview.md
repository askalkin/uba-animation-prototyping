# Overview

## What this package is

The UBA animation set as it exists on web, prepared for rebuilding on iOS and Android.

It is **not** a folder of drop-in assets. Some animations ship as finished files; others
are specifications for work that has to be built in app code. Every animation folder
states which it is.

## How to use it

1. Open `gallery.html` — all animations running live, filterable by status.
2. Find the animation you are implementing under `animations/<slug>/`.
3. Read its `README.md` first. It states the playback contract, delivered assets, and
   any blocker or open decision.
4. Open `reference/preview.html` in that folder to see the exact source motion.

## Status meanings

| Status | Meaning |
|---|---|
| **Ready** | Motion converts 1:1. Deliverable is an animation file. |
| **Ready + image** | Same, but a raster image must ship alongside it at @2x/@3x. |
| **Needs a decision** | Blocked on a design call — a loop period, or a 3D approach. |
| **Built in app code** | Not deliverable as an animation file. Gesture-driven, text-bearing, or screen-level. |

## Where things come from

This package is **generated**. Do not edit anything inside it — changes are erased on
the next build. The three sources are:

| Source | Contains | Regenerated? |
|---|---|---|
| `mobile-animation-export/` | web reference sources | yes, by `export-mobile-animation-sources.mjs` |
| `docs/` | specifications, `animation-status.json` | no — hand-written |
| `media/` | delivered assets (alpha video, future `.riv` / `.json`) | no — hand-made |

To rebuild:

```
python3 scripts/build-mobile-handoff.py
```

To add a delivered asset, put it in `media/<kind>/<slug>/` and rebuild. To change an
animation's status or playback contract, edit `docs/animation-status.json`.

## Known gaps

- **Light theme.** The web export currently captures the dark theme only, though the
  stylesheet carries light-theme rules and the alpha videos exist in both. Lottie files
  bake their colours, so light-mode variants need either a second export or a runtime
  colour-swap map.
- **Fonts.** Shipped as `.woff2`, which neither platform loads directly. Convert to
  `.ttf`/`.otf` before bundling.
- **Reduced motion.** The stylesheet has `prefers-reduced-motion` rules that are not yet
  captured per animation. Each animation needs a defined reduced-motion fallback.
