# UBA spinner 1

**Group:** Core spinners  
**Slug:** `uba-spinner-1`  
**Status:** Ready  
**Target format:** Lottie

## Playback contract

loop, `ping-pong`, cycle 10000ms

## Delivered assets

- `shared/lottie/uba-spinner-1.json`

## Notes

The delivered .json contains a single 5s forward pass and nothing else. Every playback pattern in this set is applied by the web runtime, which sets the frame manually rather than letting the player run: this scene reverses at the end (ping-pong), while the green-check and red-X scenes play the same file once and hold. Loading the file with default player settings gives a 5s forward loop, which matches none of them.

## Web reference

`reference/preview.html` — open in a browser to see the exact source motion.
