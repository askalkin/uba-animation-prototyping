# Splash lockup reveal

**Group:** Splash  
**Slug:** `uba-splash-reveal`  
**Status:** Needs a decision  
**Target format:** undecided

## Playback contract

one-shot, `play-once-hold`, total 5260ms

## Notes

Built from the approved Figma spec (node 273:3201), pixel-exact. Pure CSS: percentage keyframes over one shared 5260ms animation-duration per element, no JS state machine, so it converts cleanly to a Lottie/Rive timeline. Target format is the open question: Lottie can do the stroke-draw and fill via shape trims but the two clip-path line-wipes and the exit collapse need rebuilding as mask/position keyframes; Rive would model the five-phase sequence more directly and suits it if the app needs to react to phase boundaries (e.g. timing a data fetch against the reveal); native is straightforward given the geometry is fully specified below and there is no gesture or live-text dependency.

## Web reference

`reference/preview.html` — open in a browser to see the exact source motion.
