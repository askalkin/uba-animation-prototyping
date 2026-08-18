# Playback Contracts

## Why this document exists

**Playback behaviour is not stored in the asset files.** In the web prototype it lives in
JavaScript. If you play a delivered file with default settings, you may get motion that
is visibly different from what was approved — and nothing will error, log, or crash.

This is the single most likely way for the port to drift silently.

### The concrete case

`uba-spinner-1.json` is played **ping-pong** by the web gallery — forward, then backward,
repeating. That behaviour is set in `preview-runtime.js`, not in the JSON. Play the same
file on a normal forward loop and you get a different animation that looks entirely
plausible.

## The five fields

Every animation folder states these. Implement to them, not to the file's defaults.

| Field | Why it matters |
|---|---|
| **Playback mode** | `loop`, `ping-pong`, `play-once-hold`, gesture-driven, or event-driven |
| **In / out frames** | which range to play |
| **Cycle time *or* total duration** | see below — a bare number is ambiguous |
| **Exit transition** | what the animation resolves into when the awaited condition ends |
| **Cut-off safe** | whether it reads correctly when interrupted mid-loop |

## Cycle time vs total duration

These are different things and confusing them produces very different user experiences.

**Cycle time** applies to loaders. The animation repeats until something else stops it —
a network response, a user action. The number is how fast one revolution takes, *not* how
long the user waits. A 5.8s cycle does not mean a 5.8s wait; it means one slow revolution.

> Watch for tempo. System spinners on both platforms cycle in roughly a second. A
> multi-second revolution reads as *stalled* rather than *working*.

**Total duration** applies to one-shot animations — success marks, error states, confetti.
The number **is** wall-clock time the user spends watching, usually *after* the app already
has the answer. These are the ones with real user cost.

## Loaders need three segments

Loaders are network-bound. A request might resolve in 200ms against a multi-second loop.
So a loader is not one clip:

```
enter  ──>  loop (until resolved)  ──>  exit into result
```

Two requirements follow, regardless of format:

1. The animation must look correct **cut off at any moment** — no pose that reads as broken.
2. It needs a defined **exit into the result state**, not a hard cut.

With Rive these are states. With Lottie they are frame ranges you sequence in code. With
video they are separate files.

## A note on the source timings

The durations in the web stylesheet are **gallery pacing** — built to be watched
unattended, not to be used in a product. Where an animation's duration has not yet been
decided, its folder says so explicitly rather than repeating the demo number as if it
were a specification. See `04-open-decisions.md`.
