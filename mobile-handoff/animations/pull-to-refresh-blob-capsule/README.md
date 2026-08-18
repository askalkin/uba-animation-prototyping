# Blob capsule

**Group:** Pull to refresh  
**Slug:** `pull-to-refresh-blob-capsule`  
**Status:** Built in app code  
**Target format:** Rive state machine

## Playback contract

gesture, `driven-by-drag-distance`

## Blockers

- Progress is tied to pull distance, not a timeline.
- 9 keyframes animate blur (1-16px) in the capsule dissolve.

## Notes

Needs enter / loop / exit as three segments driven by a Rive input.

## Web reference

`reference/preview.html` — open in a browser to see the exact source motion.
