# UBA gradient blob transition

**Group:** Page transitions  
**Slug:** `uba-loader-gradient-blob-prototype`  
**Status:** Built in app code  
**Target format:** native transition

## Playback contract

screen-transition, `one-shot`

## Blockers

- The only remaining animation using backdrop-filter (18px, 5px, plus a 0->20px keyframe). No animation format samples what is behind it.
- Animates a full-screen blur 18->64px.
- Animates the app UI itself, not a standalone graphic.

## Open decision

Blob render cost: the 56px and 64px steps happen at 8% and 0% opacity. Capping the ramp at 42px is visually free.

## Loop periods in the web source

3.4s, 3.8s, 4.2s, 4.8s, 6.4s — these run independently and do not realign quickly.

## Web reference

`reference/preview.html` — open in a browser to see the exact source motion.
