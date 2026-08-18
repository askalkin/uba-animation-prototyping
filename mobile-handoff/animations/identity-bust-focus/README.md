# User focus scan

**Group:** Identity verification  
**Slug:** `identity-bust-focus`  
**Status:** Ready + image  
**Target format:** Lottie + image

## Playback contract

loop, `loop`, cycle 5200ms

## Required images

Ship these alongside the animation file at @2x/@3x:

- `shared/assets/identity-user-bust.webp`
- `shared/assets/identity-user-bust-red.webp`

## Notes

Scan line and reveal mask verified aligned to 0px across the sweep. The mask keyframes use px insets so they interpolate in the same space as the line's translateY; expressing one in calc(100% - Npx) made the edge drift up to 16.5px.

## Web reference

`reference/preview.html` — open in a browser to see the exact source motion.
