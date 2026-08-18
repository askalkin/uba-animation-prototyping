# Scanner float

**Group:** Biometrics  
**Slug:** `biometric-scanner-device-plain-float`  
**Status:** Ready + image  
**Target format:** Lottie + image

## Playback contract

loop, `loop`, cycle 5600ms

## Required images

Ship these alongside the animation file at @2x/@3x:

- `shared/assets/identity-scanner-device.webp`

## Notes

2D image plus CSS motion — no animated 3D. `preserve-3d` is set on the shell but its animated transform is a plain 2D matrix; the device screen carries a static matrix3d skew that belongs in the artwork. Ports as an image layer with a vertical translate plus stroke-draw fingerprint lines. Device float harmonised from 4.8s to 3.3s, half the 6.6s line draw, so the scene loops every 6.6s.

## Loop periods in the web source

3.3s, 6.6s — these run independently and do not realign quickly.

## Web reference

`reference/preview.html` — open in a browser to see the exact source motion.
