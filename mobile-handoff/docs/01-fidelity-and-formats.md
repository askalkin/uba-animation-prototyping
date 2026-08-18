# Fidelity and Formats

What survives the port from web to mobile, what changes, and why each animation was
assigned the format it was.

## What the web sources use, and how it travels

| Web technique | Ports to Lottie / Rive? | Notes |
|---|---|---|
| Transforms, opacity, scale | **Yes, exactly** | The bulk of the set. |
| Stroke draw (`stroke-dashoffset`) | **Yes, exactly** | Maps onto Lottie trim paths. Every check and X mark uses this. |
| Gradients, gradient strokes | **Yes** | Author as gradient strokes, do not approximate by eye. |
| Static blur / soft glow | **Yes** | Bake the soft edge into the artwork, then animate the transform. |
| Raster images (`.webp`) | **Yes** | Ship as image layers at @2x/@3x. |
| **Animated blur radius** | Unreliable | Support varies by renderer; commonly dropped or rendered differently. |
| **`backdrop-filter`** | **No equivalent** | It samples what is *behind* it. Must be a native OS effect. |
| **3D (`preserve-3d`)** | **No** | Both formats are 2D. Fake it, or ship alpha video. |
| **Live text** | **No** | Fonts do not embed. Use real text views. |
| **Gesture-driven progress** | Rive only | Needs a state machine input, not a timeline. |

## Format decisions

**Lottie** — anything whose motion is transforms, opacity, and path draws. This is most
of the set, and two animations already exist as Lottie sources.

**Alpha video** — the animations with true 3D rotation, where faking it in 2D loses the
perspective shading. Delivered as HEVC-with-alpha for iOS and VP9-with-alpha WebM for
Android, in both themes. Note this means four encodes per animation and no runtime
recolouring — acceptable for a small number of pieces, not as a general policy.

**Rive** — gesture-driven motion, where progress follows the user's finger rather than a
clock. Also the right choice where several independent loops run at different periods,
which is free in a state machine and expensive in a baked file.

**Native** — anything containing live text, sampling the background behind it, or
animating the app UI itself rather than a standalone graphic.

## Where fidelity is genuinely compromised

Two places, both already assigned to native or Rive for other reasons:

1. **Pull-to-refresh** — the capsule dissolve animates blur between 1px and 16px. Rebuilt
   as a Rive state machine, the dissolve will be re-authored rather than converted.
2. **Page transition** — animates a full-screen blur from 18px to 64px *and* uses
   `backdrop-filter`. Built natively, the blur becomes a platform effect and will not be
   pixel-identical to the web render.

Everywhere else, a faithful result is achievable. Where it is not achieved, that is an
implementation gap rather than a format limitation.

## How to check a delivered asset

Approving by eye in a review meeting is how drift gets accepted silently. Instead:

1. Open the animation's `reference/preview.html` at the same display size as the target.
2. Play the delivered file beside it, matched on duration and playback mode.
3. Compare the start pose, the end pose, and the loop seam specifically — seams are where
   baked exports break, and they are easy to miss at full speed.

## A note on file weight

`uploaded-confetti.json` is 659KB across 108 layers, authored at 1242×2688 — a phone
screen in pixels rather than a resolution-independent artboard. It also runs at 30fps
while `uba-spinner-1.json` runs at 100fps. Mixed frame rates drift when animations play
together. Worth standardising on 60fps and square artboards before these spread.

## Canonical mark sizes

Every success/error mark in the set must resolve to the **same final circle diameter**.
Reviewers cannot reliably spot a 15% difference across separate screens, so it is stated
here as a number rather than left to the eye.

| Family | Container | Final circle |
|---|---|---|
| `success-wheel-two` marks — fill-to-check, fill-to-X, badge fill, confetti, stars | `.success-wheel-two-mark` at `min(178px, 42vmin)` | **~101px** |
| Lottie-driven resolve spinners — green check spinner, red X spinner | `.uba-lottie-*` at 260px | **~198px** |

The `success-wheel-two` family is now consistent: the confetti-scatter scene previously
overrode its mark to `min(150px, 34vmin)`, rendering 15% smaller, and has been aligned to
the base size.

**Still inconsistent:** the two Lottie-driven resolve spinners land at roughly double the
diameter of the wheel family. Equalising them means resizing their container — a design
decision, since it rescales those two animations as a whole.

When exporting, verify the delivered files against these numbers rather than against each
other; drift between separately-authored assets is otherwise invisible until integration.
