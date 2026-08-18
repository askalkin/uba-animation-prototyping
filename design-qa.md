# Notification Bell Design QA

Final result: passed

Reference:
- Screenshot: `/var/folders/0v/snvn77vs0vl7287gmnrl8lsm0000gp/T/codex-clipboard-c7450941-28a3-4f9c-8eab-6a2268d8c47b.png`
- Figma CSS export: `/Users/alinaskalkina/.codex/attachments/00abb77d-94d9-488d-b209-cd0663425985/pasted-text.txt`

Prototype:
- URL: `http://localhost:8017/#notification-bell`
- Phone capture: `/tmp/notification-bell-prototype-phone-final-v3.png`
- Side-by-side comparison: `/tmp/notification-bell-comparison-final-v3.png`

Checks:
- Matched the mobile frame at 393 x 852.
- Matched the notification sheet geometry at x=8, y=420, 377 x 392, with 38px corner radius.
- Verified the dimmed UBA account home state, action carousel peek, update timestamp, wallet artwork, copy, and two-button CTA layout against the supplied screenshot.
- Ran `node --check app.js`, `git diff --check`, and confirmed the local preview responds with HTTP 200.

Note:
- The Figma file itself was access-gated, so this implementation is grounded in the attached screenshot and pasted Figma CSS.

## Notification Bell Asset Update

Final result: passed

Reference:
- Red bell PNG: `/var/folders/0v/snvn77vs0vl7287gmnrl8lsm0000gp/T/codex-clipboard-39747e91-adee-4674-ae8f-0187f9d78115.png`

Prototype:
- Direct animation URL: `http://localhost:8017/?mode=animation&bellImage=final#notification-bell`
- Rendered animation capture: `/tmp/notification-bell-red-animation-final.png`
- Source-to-render comparison: `/tmp/notification-bell-red-animation-comparison.png`

Checks:
- Replaced the drawn placeholder bell with the supplied transparent PNG as `assets/notification-bell-red.png`.
- Verified the direct URL opens in animation-only mode.
- Verified the image loads at 240 x 240 natural size.
- Verified motion is active by checking changing transform matrices while the bell rings.
- Ran `node --check app.js`, `git diff --check`, and confirmed the local preview responds with HTTP 200.

## Notification Sheet Bell Swap

Final result: passed

Reference:
- Requested target: replace the notification sheet's wallet/upload artwork with the approved animated red bell icon.
- Sheet screenshot with old artwork: `/var/folders/0v/snvn77vs0vl7287gmnrl8lsm0000gp/T/TemporaryItems/NSIRD_screencaptureui_ozJV5F/Screenshot 2026-08-18 at 19.44.40.png`

Prototype:
- URL: `http://localhost:8017/?mode=prototype&sheetBell=final#notification-bell`
- Rendered sheet capture: `/tmp/notification-sheet-bell-animation-final.png`

Checks:
- Verified the wallet artwork is no longer present in `.alty-notification-art-frame`.
- Verified the modal now renders `.notification-bell-mark.is-sheet-icon` using `assets/notification-bell-red.png`.
- Verified the red bell image loads at 240 x 240 natural size.
- Verified the bell is animated inside the sheet by checking changing transform matrices across frames.
