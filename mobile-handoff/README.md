# START HERE — UBA Mobile Animation Handoff

Everything the iOS and Android teams need to build the UBA animation set.

**25 animations** · web sources exported 2026-08-17

- **Ready** — 14
- **Built in app code** — 7
- **Ready + image** — 4

## Open this first

**Open `gallery.html`.** It is the main interface for this handoff: every animation
running live, filterable by status, with a **Go to specs** button on each card that tells
you exactly what to build, which files to bundle, and how to play it.

> **Serve the folder rather than double-clicking.** Opened straight from disk
> (`file://`), Chrome blocks a page from reading inside its own preview frames, so
> animations are not scaled to fit and the **In prototype** view cannot hide the
> prototype's navigation. Everything still opens, it just looks wrong. From this folder:
>
> ```
> python3 -m http.server 8080
> ```
>
> then visit <http://localhost:8080/gallery.html>. Safari is more permissive than Chrome
> here, so double-clicking may work for you — if previews look cropped or oversized,
> that is this issue.

Everything below is the same information as files, if you prefer reading them directly.

1. **`gallery.html`** — start here.
2. **`docs/`** — cross-cutting specifications and the open decisions list.
3. **`animations/<slug>/`** — one folder per animation.
4. **`handoff.json`** — the same data, machine-readable. Use it to script asset
   bundling, generate constants, or assert in CI that every `status: ready`
   animation has a file in `files.bundle`.

## What is in an animation folder

| Path | Use it for |
|---|---|
| `README.md` | the same spec the gallery shows |
| `assets/` | files to bundle into the app — video, images |
| `reference/preview.html` | open in a browser to watch the exact source motion |
| `reference/source.html` | the exact markup, SVG paths and geometry to copy from |

If a folder has no `assets/`, no exported file has been produced yet — build from the
reference, or wait for motion design to deliver it. The card in the gallery says which.

## Read before implementing

**Playback behaviour is not carried by the asset files.** A Lottie file played on a
plain forward loop can be visibly different from what was approved, with nothing to
indicate an error. Every animation folder states its playback contract — loop,
ping-pong, play-once-hold, gesture-driven, or event-driven. Follow it.

**Loaders are network-bound.** They run until a request resolves, so they need three
segments: enter, loop, and exit into the result state. A loader must also look correct
if it is cut off at any moment — the server may answer in 200ms.

## Layout

```
README.md              this file
gallery.html           all animations, live, in one page
docs/                  specifications and decisions
animations/<slug>/
  README.md            status, playback contract, blockers
  assets/              delivered files (video, lottie, rive)
  reference/           the original web source
reference/shared/      shared CSS, runtime, fonts, images
```

## Index

| Animation | Group | Status | Target format |
|---|---|---|---|
| [Red comet arc](animations/progressive-blur-spinner-solo/) | Core spinners | Ready | Lottie |
| [UBA spinner 1](animations/uba-spinner-1/) | Core spinners | Ready | Lottie |
| [Banking icons loader](animations/uba-icon-loop/) | Core spinners | Ready | Lottie |
| [Card rotation](animations/uba-card-rotation/) | Core spinners | Ready | alpha video |
| [Coin flip](animations/uba-coin-flip/) | Core spinners | Ready | alpha video |
| [Green check spinner](animations/uba-spinner-1-circle-resolve-green/) | Standard feedback | Ready | Lottie |
| [Green verification badge](animations/verification-badge-green/) | Standard feedback | Ready | Lottie |
| [Green fill to check](animations/success-spinner-green/) | Standard feedback | Ready | Lottie |
| [Red X spinner](animations/uba-spinner-1-circle-resolve-error/) | Standard feedback | Ready | Lottie |
| [Red fill to X](animations/failure-wheel-red/) | Standard feedback | Ready | Lottie |
| [Badge fill to X](animations/failure-verification-badge/) | Standard feedback | Ready | Lottie |
| [Uploaded success confetti green](animations/uploaded-success-confetti-green/) | Standard feedback | Ready | Lottie |
| [Green check confetti scatter](animations/green-success-confetti/) | Standard feedback | Ready | Lottie |
| [Green check star sprinkle](animations/green-success-stars/) | Standard feedback | Ready | Lottie |
| [Blob capsule](animations/pull-to-refresh-blob-capsule/) | Pull to refresh | Built in app code | Rive state machine |
| [Line fill](animations/pull-to-refresh-line-fill/) | Pull to refresh | Built in app code | Rive state machine |
| [Line fill red](animations/pull-to-refresh-line-fill-red/) | Pull to refresh | Built in app code | Rive state machine |
| [Scanner float](animations/biometric-scanner-device-plain-float/) | Biometrics | Ready + image | Lottie + image |
| [Red magnifier](animations/search-red-magnifier-loader/) | Search | Ready + image | Lottie + image |
| [Orbit magnifier](animations/search-red-orbit-magnifier/) | Search | Ready + image | Lottie + image |
| [6-digit code green](animations/otp-green/) | Code entry | Built in app code | native screen |
| [SecurePass green](animations/securepass-green/) | Code entry | Built in app code | native screen |
| [Code error](animations/otp-error/) | Code entry | Built in app code | native screen |
| [User focus scan](animations/identity-bust-focus/) | Identity verification | Ready + image | Lottie + image |
| [UBA gradient blob transition](animations/uba-loader-gradient-blob-prototype/) | Page transitions | Built in app code | native transition |
