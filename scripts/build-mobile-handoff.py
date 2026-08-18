#!/usr/bin/env python3
"""Assemble mobile-handoff/ — the package handed to the iOS/Android team.

Pulls from three places:
  mobile-animation-export/  web reference sources (regenerated, safe to re-read)
  docs/                     hand-written specs and animation-status.json
  media/                    hand-made deliverables (alpha video, future .riv/.json)

mobile-handoff/ is fully generated: it is deleted and rebuilt on every run, so
never put anything by hand inside it. Put it in docs/ or media/ instead.
"""

import json
import pathlib
import re
import shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXPORT = ROOT / "mobile-animation-export"
DOCS = ROOT / "docs"
MEDIA = ROOT / "media"
OUT = ROOT / "mobile-handoff"

STATUS_LABEL = {
    "ready": "Ready",
    "ready-with-asset": "Ready + image",
    "decision-needed": "Needs a decision",
    "engineering": "Built in app code",
}


def load():
    manifest = json.loads((EXPORT / "manifest.json").read_text())
    status = json.loads((DOCS / "animation-status.json").read_text())
    by_slug = {a["slug"]: a for a in status["animations"]}
    items = []
    for group in manifest["groups"]:
        for item in group["items"]:
            meta_path = EXPORT / item["folder"] / "metadata.json"
            meta = json.loads(meta_path.read_text()) if meta_path.exists() else {}
            pages = meta.get("sourcePages") or ([meta["sourcePage"]] if meta.get("sourcePage") else [])
            items.append({**item, "group": group["title"], "prototypes": pages,
                          "status": by_slug.get(item["slug"], {})})
    slot_pages = json.loads((DOCS / "slot-pages.json").read_text()) \
        if (DOCS / "slot-pages.json").exists() else {}
    slots, labels = load_slots()
    for it in items:
        it["slots"] = [{"key": k, "label": labels.get(k, k), "candidates": v,
                        "page": slot_pages.get(k, ""),
                        "index": v.index(it["slug"])}
                       for k, v in slots.items() if it["slug"] in v]
        # Animations outside a variant set still have a screen they came from, so
        # every card can offer the in-prototype view.
        if not any(sl["page"] for sl in it["slots"]) and it["prototypes"]:
            it["slots"].append({"key": "", "label": "", "candidates": [it["slug"]],
                                "page": it["prototypes"][0], "index": 0})
    return manifest, status, items


def copy_sources(items):
    """Web reference + shared assets, per animation."""
    shutil.copytree(EXPORT / "shared", OUT / "reference" / "shared")
    for item in items:
        dest = OUT / "animations" / item["slug"] / "reference"
        dest.mkdir(parents=True, exist_ok=True)
        # metadata.json is build-time input only — everything a dev needs is in
        # README.md and the gallery, so it does not ship.
        for name in ("source.html", "preview.html"):
            src = EXPORT / item["folder"] / name
            if not src.exists():
                continue
            if name.endswith(".html"):
                # The export nests previews two levels deep; here they sit three levels
                # below the package root, so shared/ references need one more hop.
                dest.joinpath(name).write_text(
                    src.read_text().replace("../../shared/", "../../../reference/shared/")
                )
            else:
                shutil.copy2(src, dest / name)


def copy_media(items):
    """Deliverable assets that already exist."""
    video_src = MEDIA / "alpha-video"
    for item in items:
        folder = video_src / item["slug"]
        if video_src.exists() and folder.is_dir():
            dest = OUT / "animations" / item["slug"] / "assets" / "video"
            dest.mkdir(parents=True, exist_ok=True)
            for f in sorted(folder.iterdir()):
                if f.is_file():
                    shutil.copy2(f, dest / f.name)

        # Raster dependencies travel with the animation, not just in a doc line —
        # a referenced-but-unshipped image arrives as a hole in the animation.
        for rel in item["status"].get("rasterAssets", []):
            src = EXPORT / rel
            if src.exists():
                dest = OUT / "animations" / item["slug"] / "assets" / "images"
                dest.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dest / src.name)


def playback_line(pb):
    if not pb:
        return "not specified"
    kind = pb.get("kind", "?")
    mode = pb.get("mode", "?")
    if kind == "loop":
        ms = pb.get("cycleMs")
        return f"loop, `{mode}`, cycle {ms}ms" if ms else f"loop, `{mode}`, **cycle time undecided**"
    if kind == "one-shot":
        ms = pb.get("totalMs")
        return f"one-shot, `{mode}`, total {ms}ms" if ms else f"one-shot, `{mode}`, **duration undecided**"
    if kind == "sequence":
        return (f"enter {pb.get('enterMs')}ms → settle {pb.get('settleMs')}ms → "
                f"loop {pb.get('cycleMs')}ms")
    return f"{kind}, `{mode}`"


def write_animation_readme(item):
    s = item["status"]
    lines = [
        f"# {item['title']}",
        "",
        f"**Group:** {item['group']}  ",
        f"**Slug:** `{item['slug']}`  ",
        f"**Status:** {STATUS_LABEL.get(s.get('status'), '—')}  ",
        f"**Target format:** {s.get('targetFormat', '—')}",
        "",
        "## Playback contract",
        "",
        playback_line(s.get("playback")),
        "",
    ]
    if s.get("verified"):
        lines += ["## Verified", "", s["verified"], ""]
    delivered = s.get("delivered") or []
    if delivered:
        lines += ["## Delivered assets", ""] + [f"- `{d}`" for d in delivered] + [""]
    raster = s.get("rasterAssets") or []
    if raster:
        lines += ["## Required images", "",
                  "Ship these alongside the animation file at @2x/@3x:", ""]
        lines += [f"- `{r}`" for r in raster] + [""]
    if s.get("blockers"):
        lines += ["## Blockers", ""] + [f"- {b}" for b in s["blockers"]] + [""]
    if s.get("decision"):
        lines += ["## Open decision", "", s["decision"], ""]
    if s.get("spec"):
        lines += ["## Full specification", "", f"See `{s['spec']}`.", ""]
    if s.get("notes"):
        lines += ["## Notes", "", s["notes"], ""]
    if s.get("loopPeriods") and len(s["loopPeriods"]) > 1:
        p = ", ".join(f"{x}s" for x in s["loopPeriods"])
        lines += ["## Loop periods in the web source", "",
                  f"{p} — these run independently and do not realign quickly.", ""]
    lines += ["## Web reference", "",
              "`reference/preview.html` — open in a browser to see the exact source motion.", ""]
    (OUT / "animations" / item["slug"] / "README.md").write_text("\n".join(lines))


def write_index(manifest, items):
    rows = []
    for item in items:
        s = item["status"]
        rows.append(
            f"| [{item['title']}](animations/{item['slug']}/) | {item['group']} | "
            f"{STATUS_LABEL.get(s.get('status'), '—')} | {s.get('targetFormat', '—')} |"
        )
    counts = {}
    for item in items:
        k = item["status"].get("status", "unclassified")
        counts[k] = counts.get(k, 0) + 1

    summary = "\n".join(
        f"- **{STATUS_LABEL.get(k, k)}** — {v}" for k, v in sorted(counts.items(), key=lambda kv: -kv[1])
    )

    (OUT / "README.md").write_text(f"""# START HERE — UBA Mobile Animation Handoff

Everything the iOS and Android teams need to build the UBA animation set.

**{len(items)} animations** · web sources exported {manifest['generatedAt']}

{summary}

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
{chr(10).join(rows)}
""")


def write_docs(items, status):
    dest = OUT / "docs"
    dest.mkdir(parents=True, exist_ok=True)
    for f in sorted(DOCS.glob("*.md")):
        shutil.copy2(f, dest / f.name)

    decisions = [i for i in items if i["status"].get("decision")]
    lines = ["# Open Decisions", "",
             "Each of these blocks or degrades a deliverable. Owner is noted per item.", ""]
    for item in decisions:
        s = item["status"]
        owner = "Design" if s.get("status") == "decision-needed" else "Engineering"
        lines += [f"## {item['title']}", "",
                  f"**Owner:** {owner}  ",
                  f"**Slug:** `{item['slug']}`", "",
                  s["decision"], ""]

    undecided = [i for i in items
                 if (i["status"].get("playback") or {}).get("kind") in ("loop", "one-shot")
                 and not (i["status"]["playback"].get("cycleMs") or i["status"]["playback"].get("totalMs"))]
    if undecided:
        lines += ["## Durations still to be set", "",
                  "The web source uses gallery pacing (6-7s loops) rather than product timing. "
                  "These need a number before handover:", "",
                  "| Animation | Kind |", "|---|---|"]
        for item in undecided:
            lines.append(f"| {item['title']} | {item['status']['playback']['kind']} |")
        lines.append("")
    (dest / "04-open-decisions.md").write_text("\n".join(lines))


def load_slots():
    """Motion slots from app.js: each screen slot offers N alternative animations."""
    app = (ROOT / "app.js").read_text()
    i = app.find("const prototypeMotionVariantSets")
    if i == -1:
        return {}, {}
    k = app.index("{", i)
    depth, start = 0, k
    while k < len(app):
        if app[k] == "{":
            depth += 1
        elif app[k] == "}":
            depth -= 1
            if depth == 0:
                break
        k += 1
    block = app[start:k + 1]

    slots = {}
    for m in re.finditer(r"\n  ([\w\"-]+):\s*\{", block):
        key = m.group(1).strip('"')
        j, d, q = m.end() - 1, 0, m.end() - 1
        while q < len(block):
            if block[q] == "{":
                d += 1
            elif block[q] == "}":
                d -= 1
                if d == 0:
                    break
            q += 1
        slots[key] = re.findall(r'slug:\s*"([^"]+)"', block[j:q + 1])

    labels = {}
    # app.js has several `const labels` objects; the slot names live in the one
    # inside altyMockupPrototype, so anchor the search to that function.
    anchor = app.find("function altyMockupPrototype")
    li = app.find("const labels = {", anchor if anchor != -1 else 0)
    if li != -1:
        lend = app.index("};", li)
        for m in re.finditer(r'"?([\w-]+)"?:\s*"([^"]+)"', app[li:lend]):
            labels[m.group(1)] = m.group(2)
    # core-spinner-02 is a standalone prototype rather than a phone mockup, so it
    # has no entry in altyMockupPrototype's label map.
    labels.setdefault("core-spinner-02", "Standard success feedback, shown without a screen")
    return slots, labels


def dev_instructions(item):
    """What the mobile developer should actually do with this animation."""
    st = item["status"]
    if st.get("devInstructions"):
        return st["devInstructions"]

    fmt = (st.get("targetFormat") or "").lower()
    pb = st.get("playback") or {}
    delivered = st.get("delivered") or []

    if "alpha video" in fmt and delivered:
        return ("Use the video files in <code>assets/video/</code>. Play the <code>.mov</code> "
                "(HEVC with alpha) on iOS and the <code>.webm</code> (VP9 with alpha) on Android — "
                "both carry a real alpha channel, so composite them straight over your background "
                "with no matte work. Pick the dark or light file from the active theme. The clips "
                "are seam-checked, so a plain repeat loops cleanly.")
    if fmt.startswith("native"):
        return ("Build this in app code — it cannot ship as an animation file. Follow the "
                "specification linked below for states, durations and easing, and use "
                "<code>reference/preview.html</code> to check the result.")
    if "rive" in fmt:
        return ("Build this as a Rive state machine driven by an input, not a timeline — its "
                "progress follows the user's gesture. Model it as three states: enter, loop while "
                "the request is in flight, and exit into the result.")
    if delivered:
        return ("Bundle the delivered file listed below and play it per the playback contract. "
                "Do not rely on the player's defaults.")
    return ("No exported file has been delivered yet — expect a Lottie <code>.json</code> from "
            "motion design. When it arrives, check it against <code>reference/preview.html</code> "
            "at the same size and duration before merging, paying attention to the loop seam.")


def playback_instruction(pb):
    """The playback contract phrased as an instruction."""
    if not pb:
        return ""
    kind, mode = pb.get("kind"), pb.get("mode")
    if kind == "loop":
        ms = pb.get("cycleMs")
        if mode == "ping-pong":
            p = pb.get("passMs")
            return (f"Play it <strong>ping-pong</strong>: {p}ms forward, then the same "
                    f"{p}ms in reverse — a {ms}ms round trip. The file contains only the "
                    "forward pass, so a default forward loop is different motion and will "
                    "not raise an error.")
        return f"Loop continuously. One cycle is {ms}ms." if ms else "Loop continuously."
    if kind == "one-shot":
        ms = pb.get("totalMs")
        return (f"Play once and hold the final frame. Total {ms}ms." if ms
                else "Play once and hold the final frame.")
    if kind == "sequence":
        return (f"Play the enter clip ({pb.get('enterMs')}ms), then settle "
                f"({pb.get('settleMs')}ms), then loop at {pb.get('cycleMs')}ms.")
    if kind == "gesture":
        return "Drive progress from the drag distance, not from a clock."
    if kind == "event":
        return "Trigger each state from an app event — typing, autofill, or the server response."
    if kind == "screen-transition":
        return "Run once as a screen transition."
    return ""


def gallery_payload(items):
    """Per-animation data the gallery renders in its spec panel."""
    payload = {}
    for item in items:
        s = item["status"]
        payload[item["slug"]] = {
            "title": item["title"],
            "group": item["group"],
            "status": s.get("status", ""),
            "statusLabel": STATUS_LABEL.get(s.get("status"), "—"),
            "format": s.get("targetFormat", "—"),
            "playback": playback_line(s.get("playback")),
            "delivered": s.get("delivered") or [],
            "images": s.get("rasterAssets") or [],
            "blockers": s.get("blockers") or [],
            "decision": s.get("decision", ""),
            "durationReview": s.get("durationReview", ""),
            "verified": s.get("verified", ""),
            "notes": s.get("notes", ""),
            "spec": s.get("spec", ""),
            "todo": dev_instructions(item),
            "howToPlay": playback_instruction(s.get("playback")),
            "prototypes": item.get("prototypes", []),
            "slots": item.get("slots", []),
        }
    return payload


def copy_prototype_app(items):
    """Ship the running prototype so a card can show its animation inside the mockup.

    app.js chooses the screen from location.hash but keeps the chosen variant in an
    in-memory object, so a small patch is added to read it from ?variant=slot:index.
    """
    dest = OUT / "prototype"
    dest.mkdir(parents=True, exist_ok=True)
    for name in ("index.html", "styles.css"):
        shutil.copy2(ROOT / name, dest / name)
    if (ROOT / "assets").exists():
        shutil.copytree(ROOT / "assets", dest / "assets", dirs_exist_ok=True)

    app = (ROOT / "app.js").read_text()
    anchor = "const prototypeVariantState = {};"
    if anchor in app:
        app = app.replace(anchor, anchor + """
// Added by build-mobile-handoff.py: let the handoff gallery deep-link a variant.
(() => {
  const apply = (v) => {
    if (!v) return false;
    const [slot, index] = v.split(":");
    if (!slot) return false;
    prototypeVariantState[slot] = Number(index) || 0;
    return true;
  };
  // ?variant=slot:index — works when the server keeps the query string
  apply(new URLSearchParams(location.search).get("variant"));
  // #page&variant=slot:index — survives file:// and index rewrites
  const raw = location.hash.replace("#", "");
  if (raw.includes("&")) {
    const [page, ...rest] = raw.split("&");
    const part = rest.find((x) => x.startsWith("variant="));
    if (apply(part && part.slice("variant=".length))) {
      // Leave a clean hash so the app's own routing still matches the page.
      try {
        history.replaceState(null, "", location.pathname + location.search + "#" + page);
      } catch (e) {
        location.hash = page;   // file:// may refuse replaceState
      }
    }
  }
})();""", 1)
    (dest / "app.js").write_text(app)


def write_data(manifest, items):
    """Machine-readable twin of the docs, for bundling scripts and CI checks."""
    out = []
    for item in items:
        st = item["status"]
        slug = item["slug"]
        base = f"animations/{slug}"
        assets = OUT / "animations" / slug / "assets"
        files = []
        if assets.exists():
            files = sorted(
                str(f.relative_to(OUT)) for f in assets.rglob("*") if f.is_file()
            )
        out.append({
            "slug": slug,
            "title": item["title"],
            "group": item["group"],
            "status": st.get("status"),
            "targetFormat": st.get("targetFormat"),
            "playback": st.get("playback", {}),
            "files": {
                "bundle": files,
                "preview": f"{base}/reference/preview.html",
                "source": f"{base}/reference/source.html",
                "spec": f"{base}/README.md",
            },
            "requiredImages": st.get("rasterAssets", []),
            "slots": item.get("slots", []),
            "blockers": st.get("blockers", []),
            "decision": st.get("decision", ""),
            "durationReview": st.get("durationReview", ""),
            "detailedSpec": st.get("spec", ""),
        })

    (OUT / "handoff.json").write_text(json.dumps({
        "generated": manifest["generatedAt"],
        "count": len(out),
        "statusMeanings": {
            "ready": "Motion converts 1:1. Deliverable is an animation file.",
            "ready-with-asset": "Same, plus a raster image must ship alongside at @2x/@3x.",
            "decision-needed": "Blocked on a design decision.",
            "engineering": "Not deliverable as an animation file; built in app code.",
        },
        "playbackKinds": {
            "loop": "Repeats until stopped. cycleMs is one revolution, not a wait time.",
            "one-shot": "Plays once and holds. totalMs is real time the user waits.",
            "sequence": "enterMs, then settleMs, then loops at cycleMs.",
            "gesture": "Progress is driven by drag distance, not a clock.",
            "event": "States are triggered by app events.",
            "screen-transition": "Runs once as a screen transition.",
        },
        "animations": out,
    }, indent=2) + "\n")


def write_gallery(items):
    groups = []
    for item in items:
        if not groups or groups[-1][0] != item["group"]:
            groups.append((item["group"], []))
        groups[-1][1].append(item)

    sections = []
    for title, members in groups:
        cards = []
        for item in members:
            st = item["status"]
            cards.append(f"""
        <figure class="card" data-status="{st.get('status','')}" data-slug="{item['slug']}">
          <div class="frame" data-src="animations/{item['slug']}/reference/preview.html">
            <span class="badge b-{st.get('status','')}">{STATUS_LABEL.get(st.get('status'), '—')}</span>
            <button class="replay" title="Replay">&#8635;</button>
          </div>
          <figcaption>
            <strong>{item['title']}</strong>
            <span class="meta">{st.get('targetFormat','—')}</span>
            <button class="spec-btn">Go to specs</button>
          </figcaption>
        </figure>""")
        sections.append(f"""
    <section class="group" data-group="{title}">
      <h2>{title}</h2>
      <div class="grid">{''.join(cards)}
      </div>
    </section>""")

    payload = json.dumps(gallery_payload(items), indent=1)

    (OUT / "gallery.html").write_text(f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>UBA Animation Handoff</title>
<style>
  :root {{
    color-scheme: dark;
    --ease: cubic-bezier(.32,.72,0,1);   /* long tail, no overshoot */
    --dur: .58s;
    --bg:#050605; --fg:#f2f3f1; --dim:#8b908a; --line:#1c1f1c;
    --card:#0c0e0c; --chip-bg:rgba(10,12,10,.5); --sel-bg:#1b1f19; --scrim:rgba(4,5,4,.9);
  }}
  html[data-ui-theme="light"] {{
    color-scheme: light;
    --bg:#f4f5f2; --fg:#14170f; --dim:#5f665b; --line:#dfe2da;
    --card:#ffffff; --chip-bg:rgba(255,255,255,.7); --sel-bg:#14170f; --scrim:rgba(244,245,242,.9);
  }}
  html[data-ui-theme="light"] .theme button[aria-pressed="true"] {{ color:#fff; }}
  * {{ box-sizing: border-box; }}
  body {{ margin:0; background:var(--bg); color:var(--fg);
         font:15px/1.45 -apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",sans-serif;
         -webkit-font-smoothing:antialiased; }}
  body.focused {{ overflow:hidden; }}

  header {{ position:sticky; top:0; z-index:20; padding:18px 28px 14px;
            background:var(--bg); backdrop-filter:blur(12px);
            border-bottom:1px solid var(--line);
            transition:opacity .34s var(--ease), transform .34s var(--ease); }}
  body.focused header {{ opacity:0; transform:translateY(-10px); pointer-events:none; }}
  h1 {{ margin:0; font-size:19px; letter-spacing:-.015em; }}
  .head-row {{ display:flex; align-items:center; justify-content:space-between; gap:16px; }}
  .head-actions {{ display:flex; align-items:center; gap:10px; }}
  .mode-link {{ font:inherit; font-size:12px; font-weight:600; padding:8px 16px; border-radius:999px;
               border:1px solid var(--line); background:var(--chip-bg); color:var(--dim);
               text-decoration:none; transition:all .2s var(--ease); }}
  .mode-link:hover {{ border-color:#3a3f38; color:var(--fg); background:var(--sel-bg); }}
  .theme {{ display:inline-flex; gap:3px; padding:3px; border-radius:999px;
            border:1px solid var(--line); background:var(--chip-bg); }}
  .theme button {{ font:inherit; font-size:12px; padding:5px 13px; border-radius:999px;
                   border:0; background:none; color:var(--dim); cursor:pointer;
                   transition:all .2s var(--ease); }}
  .theme button[aria-pressed="true"] {{ background:var(--sel-bg); color:var(--fg); }}
  .chips {{ display:flex; gap:8px; margin-top:13px; flex-wrap:wrap; }}
  .chip {{ --c:#c3c8c0;
           font:inherit; font-size:12px; padding:5px 14px; border-radius:999px; cursor:pointer;
           background:none; color:var(--c);
           border:1px solid color-mix(in srgb, var(--c) 38%, transparent);
           transition:background-color .18s var(--ease), color .18s var(--ease),
                      border-color .18s var(--ease); }}
  .chip:hover {{ border-color:color-mix(in srgb, var(--c) 70%, transparent); }}
  /* Selected reads as the status colour filled in, with the page ground as the text. */
  .chip[aria-pressed="true"] {{ background:var(--c); border-color:var(--c); color:#060806; }}
  .c-ready {{ --c:#6ee7a0; }}
  .c-ready-with-asset {{ --c:#8ec6ff; }}
  .c-decision-needed {{ --c:#ffc46b; }}
  .c-engineering {{ --c:#ff8a94; }}

  main {{ padding:24px 28px 80px; }}
  .group {{ margin-bottom:40px; transition:opacity .34s var(--ease); }}
  .group[hidden] {{ display:none; }}
  .group h2 {{ color:var(--dim); font-size:12px; text-transform:uppercase; letter-spacing:.09em;
               color:#9aa098; margin:0 0 14px; }}
  .grid {{ display:grid; gap:16px; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); }}

  .card {{ margin:0; cursor:pointer; background:var(--card); border:1px solid var(--line); border-radius:14px;
           overflow:hidden; transition:border-color .18s var(--ease),
           opacity .38s var(--ease), transform .38s var(--ease); }}
  .card:hover {{ border-color:#3a3f38; }}
  .card[hidden] {{ display:none; }}
  /* Everything except the focused card recedes. */
  body.focused .card.is-dimmed {{ opacity:0; transform:scale(.965); pointer-events:none; }}
  /* The focused card keeps its slot in the grid so nothing reflows underneath. */
  .card.is-focused {{ background:none; border-color:transparent; }}
  body.focused .card.is-focused figcaption {{ opacity:0; pointer-events:none; }}

  .frame {{ position:relative; aspect-ratio:1/1; background:var(--card); overflow:hidden;
            border-radius:0; transition:background .3s var(--ease); }}
  .frame iframe {{ width:620px; height:620px; border:0; display:block;
                   transform-origin:top left; pointer-events:none; opacity:0;
                   transition:transform var(--dur) var(--ease), opacity .22s linear; }}
  /* Lifted out of the grid and animated to the focus rect. */
  .frame.is-lifted {{ position:fixed; z-index:36; border-radius:20px;
                      box-shadow:0 40px 90px rgba(0,0,0,.6);
                      transition:left var(--dur) var(--ease), top var(--dur) var(--ease),
                                 width var(--dur) var(--ease), height var(--dur) var(--ease),
                                 border-radius var(--dur) var(--ease); }}

  .badge {{ position:absolute; top:9px; right:9px; z-index:2; font-size:10.5px;
            padding:3px 9px; border-radius:999px; background:rgba(8,10,8,.82);
            border:1px solid #2b2f2a; color:#9aa098; backdrop-filter:blur(6px);
            transition:opacity .26s var(--ease); }}
  body.focused .badge {{ opacity:0; }}
  .b-ready {{ color:#6ee7a0; border-color:#24402f; }}
  .b-ready-with-asset {{ color:#8ec6ff; border-color:#22384d; }}
  .b-decision-needed {{ color:#ffc46b; border-color:#4d3a1a; }}
  .b-engineering {{ color:#ff8a94; border-color:#4d2427; }}

  .replay {{ position:absolute; top:9px; left:9px; z-index:3; width:28px; height:28px;
             border-radius:50%; cursor:pointer; border:1px solid #2b2f2a;
             background:rgba(8,10,8,.75); color:#d6d9d4; font-size:14px; line-height:1;
             opacity:0; transition:opacity .18s var(--ease); backdrop-filter:blur(6px); }}
  .card:hover .replay, body.focused .frame.is-lifted .replay {{ opacity:1; }}
  body.focused .frame.is-lifted .replay {{ left:auto; right:14px; top:14px; }}
  body.focused .frame.is-lifted {{ background:transparent; box-shadow:none; }}
  .replay:hover {{ border-color:#ff2438; color:#ff5a68; }}

  figcaption {{ padding:11px 13px 13px; display:grid; gap:3px; border-top:1px solid #1c1f1c;
                transition:opacity .26s var(--ease); }}
  figcaption strong {{ font-size:13.5px; font-weight:600; }}
  .meta {{ font-size:11.5px; color:#8b908a; }}
  .spec-btn {{ margin-top:8px; justify-self:start; font:inherit; font-size:12px;
               padding:6px 14px; border-radius:999px; cursor:pointer;
               border:1px solid #2f342d; background:#12150f; color:#e6e9e3;
               transition:all .18s var(--ease); }}
  .spec-btn:hover {{ border-color:#ff2438; color:#ff5a68; }}

  /* ---- focus mode ---- */
  .scrim {{ position:fixed; inset:0; z-index:30; background:var(--scrim);
            backdrop-filter:blur(30px) saturate(1.1); opacity:0; pointer-events:none;
            transition:opacity .44s var(--ease); }}
  body.focused .scrim {{ opacity:1; pointer-events:auto; }}

  .panel {{ position:fixed; z-index:37; top:0; right:0; height:100vh;
            width:min(460px, 40vw); padding:76px 40px 48px; overflow-y:auto;
            opacity:0; transform:translateX(28px); pointer-events:none;
            transition:opacity .42s var(--ease) .08s, transform .5s var(--ease) .08s; }}
  body.focused .panel {{ opacity:1; transform:none; pointer-events:auto; }}
  .panel h3 {{ color:var(--fg); margin:0 0 6px; font-size:26px; letter-spacing:-.02em; font-weight:600; }}
  .panel .eyebrow {{ font-size:12px; color:#8b908a; margin-bottom:26px;
                     display:flex; align-items:center; gap:8px; }}
  .panel .eyebrow .pill {{ border:1px solid #2b2f2a; border-radius:999px; padding:2px 9px; }}

  .close {{ position:fixed; z-index:38; top:24px; left:28px; height:36px; padding:0 16px 0 12px;
            display:inline-flex; align-items:center; gap:8px;
            border-radius:999px; border:1px solid #2b2f2a; background:rgba(10,12,10,.7);
            color:#c9cec6; cursor:pointer; font:inherit; font-size:13px;
            opacity:0; pointer-events:none; backdrop-filter:blur(8px);
            transition:opacity .3s var(--ease) .12s, border-color .18s, color .18s; }}
  .close svg {{ width:15px; height:15px; }}

  /* Animation / In prototype switch, sits under the focused preview */
  .vtoggle {{ position:fixed; z-index:38; display:none; gap:4px; padding:4px;
              border-radius:999px; border:1px solid #23271f; background:rgba(10,12,10,.8);
              backdrop-filter:blur(8px); transform:translateX(-50%); }}
  body.focused .vtoggle.is-on {{ display:inline-flex; }}
  .vtoggle button {{ font:inherit; font-size:12.5px; padding:6px 15px; border-radius:999px;
                     border:0; background:none; color:#9aa098; cursor:pointer;
                     transition:all .2s var(--ease); }}
  .vtoggle button[aria-pressed="true"] {{ background:#1b1f19; color:#fff; }}
  body.focused .close {{ opacity:1; pointer-events:auto; }}
  .close:hover {{ border-color:#ff2438; color:#ff5a68; }}

  .row {{ margin-bottom:22px; }}
  .row h4 {{ margin:0 0 7px; font-size:11px; text-transform:uppercase;
             letter-spacing:.08em; color:#7e847c; font-weight:600; }}
  .row p {{ margin:0; font-size:14px; line-height:1.5; color:var(--fg); }}
  .row ul {{ margin:0; padding-left:17px; font-size:13px; color:#dfe3dc; }}
  .row li {{ margin-bottom:4px; }}
  .row code {{ font-size:12px; color:#ffc46b; word-break:break-all; }}
  .flag {{ border-left:2px solid #ffc46b; padding-left:12px; }}
  .flag.blocker {{ border-color:#ff8a94; }}
  .flag.ok {{ border-color:#6ee7a0; }}
  .actions {{ display:flex; gap:8px; flex-wrap:wrap; }}
  .actions {{ margin-top:26px; }}
  .actions a.primary {{ font-size:13px; font-weight:600; text-decoration:none;
                        padding:10px 20px; border-radius:999px; border:0;
                        background:#e9ece7; color:#0a0c0a;
                        transition:transform .18s var(--ease), background .18s var(--ease); }}
  .actions a.primary:hover {{ background:#fff; transform:translateY(-1px); }}
  .sib {{ display:flex; flex-wrap:wrap; gap:6px; margin-top:7px; }}
  .sib button {{ font:inherit; font-size:12px; padding:5px 11px; border-radius:999px;
                 cursor:pointer; border:1px solid #2b2f2a; background:none; color:#b9beb6;
                 transition:all .18s var(--ease); }}
  .sib button:hover {{ border-color:#8ec6ff; color:#cfe4ff; }}
  .sib button.self {{ border-color:#3f453d; background:#141714; color:#fff; cursor:default; }}

  @media (max-width: 900px) {{
    .head-row {{ align-items:flex-start; flex-direction:column; }}
    .head-actions {{ width:100%; justify-content:space-between; }}
    .panel {{ width:100vw; height:46vh; top:auto; bottom:0; padding:24px 24px 40px;
              background:rgba(6,8,6,.96); border-top:1px solid #23271f;
              transform:translateY(28px); }}
    .panel h3 {{ font-size:21px; }}
  }}
  @media (prefers-reduced-motion: reduce) {{
    * {{ transition-duration:.01ms !important; }}
  }}
</style></head>
<body>
<header>
  <div class="head-row">
    <h1>UBA Animation Handoff</h1>
    <div class="head-actions">
      <a class="mode-link" href="../">Client</a>
      <div class="theme" id="theme">
        <button data-theme="dark" aria-pressed="true">Dark</button>
        <button data-theme="light" aria-pressed="false">Light</button>
      </div>
    </div>
  </div>
  <div class="chips" id="chips"></div>
</header>

<main>{''.join(sections)}
</main>

<div class="scrim" id="scrim"></div>
<button class="close" id="close" title="Back (Esc)">
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round"><path d="M10 3 5 8l5 5"/></svg>
  Back to all
</button>
<div class="vtoggle" id="vtoggle">
  <button data-view="animation" aria-pressed="true">Animation</button>
  <button data-view="prototype" aria-pressed="false">In prototype</button>
</div>
<aside class="panel" id="panel" aria-hidden="true">
  <h3 id="p-title"></h3>
  <div class="eyebrow"><span id="p-group"></span><span class="pill" id="p-status"></span></div>
  <div id="p-body"></div>
</aside>

<script>
const DATA = {payload};
const LABELS = {{
  "": "All", "ready": "Ready", "ready-with-asset": "Ready + image",
  "decision-needed": "Needs a decision", "engineering": "Built in app code"
}};

/* ---- filter chips ---- */
const chipBox = document.getElementById("chips");
const counts = {{}};
Object.values(DATA).forEach((d) => {{ counts[d.status] = (counts[d.status] || 0) + 1; }});
Object.keys(LABELS).forEach((key, i) => {{
  if (key && !counts[key]) return;
  const b = document.createElement("button");
  b.className = "chip" + (key ? " c-" + key : "");
  b.dataset.f = key;
  b.setAttribute("aria-pressed", String(i === 0));
  b.textContent = LABELS[key];
  chipBox.appendChild(b);
}});
chipBox.addEventListener("click", (e) => {{
  const b = e.target.closest(".chip");
  if (!b) return;
  [...chipBox.children].forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
  const want = b.dataset.f;
  document.querySelectorAll(".card").forEach((c) => {{
    c.hidden = Boolean(want) && c.dataset.status !== want;
  }});
  document.querySelectorAll(".group").forEach((g) => {{
    g.hidden = ![...g.querySelectorAll(".card")].some((c) => !c.hidden);
  }});
}});

/* ---- previews: mount when visible, fit content to the frame ---- */
const FIT = 620, INSET = 0.86;
const contentBox = (doc) => {{
  const el = doc.querySelector(".prototype-motion-render") || doc.querySelector(".loader-scene")
          || doc.querySelector(".animation-only-scene") || doc.querySelector(".stage-band");
  if (!el) return null;
  const b = el.getBoundingClientRect();
  return b.width && b.height ? b : null;
}};
const fit = (frame, w, h) => {{
  const iframe = frame.querySelector("iframe");
  if (!iframe) return;
  const W = w || frame.clientWidth, H = h || frame.clientHeight;
  let box = null;
  try {{ box = iframe.contentDocument && contentBox(iframe.contentDocument); }} catch {{}}
  if (!box) {{ iframe.style.transform = "scale(" + W / FIT + ")"; return; }}
  const s = (Math.min(W, H) * INSET) / Math.max(box.width, box.height);
  iframe.style.transform =
    `translate(${{W / 2 - s * (box.left + box.width / 2)}}px, ` +
    `${{H / 2 - s * (box.top + box.height / 2)}}px) scale(${{s}})`;
}};
/* The correct scale is only knowable once the document inside has laid out, so the
   frame starts hidden and fades in already fitted — otherwise it appears unscaled in
   the corner for a frame and visibly jumps into place. */
const prep = (frame, iframe) => {{
  try {{ iframe.contentDocument.body.style.background = "transparent"; }} catch {{}}
  themeFrame(iframe);
  fit(frame);
  iframe.style.opacity = "1";
}};
const mount = (frame, w, h) => {{
  if (frame.querySelector("iframe")) return;
  const iframe = document.createElement("iframe");
  iframe.src = frame.dataset.src;
  iframe.setAttribute("scrolling", "no");
  iframe.style.opacity = "0";
  iframe.addEventListener("load", () => prep(frame, iframe), {{ once: true }});
  frame.appendChild(iframe);
  if (w) fit(frame, w, h);
}};
const unmount = (frame) => frame.querySelector("iframe")?.remove();
const io = new IntersectionObserver(
  (es) => es.forEach((e) => {{
    if (e.target.classList.contains("is-lifted")) return;   // never unmount the focused one
    (e.isIntersecting ? mount : unmount)(e.target);
  }}),
  {{ rootMargin: "220px 0px" }}
);
document.querySelectorAll(".frame").forEach((f) => io.observe(f));
addEventListener("resize", () => document.querySelectorAll(".frame").forEach((f) => fit(f)));

document.addEventListener("click", (e) => {{
  const b = e.target.closest(".replay");
  if (!b) return;
  e.stopPropagation();
  const frame = b.closest(".frame");
  const w = frame.clientWidth, h = frame.clientHeight;
  unmount(frame);
  requestAnimationFrame(() => mount(frame, w, h));
}});

/* ---- focus mode ---------------------------------------------------------
   The frame is never re-parented — it is pinned in place and animated to the
   focus rect — so the running animation inside the iframe is not interrupted. */
const panel = document.getElementById("panel");
const scrim = document.getElementById("scrim");
const body  = document.getElementById("p-body");
let current = null;

const focusRect = () => {{
  const W = innerWidth, H = innerHeight;
  if (W < 900) {{
    const size = Math.min(W - 44, H * 0.44);
    return {{ left: (W - size) / 2, top: 26, width: size, height: size }};
  }}
  const panelW = Math.min(460, W * 0.4);
  const availW = W - panelW - 96;
  const size = Math.min(availW, H - 128);
  return {{ left: 48 + (availW - size) / 2, top: (H - size) / 2, width: size, height: size }};
}};

const list = (title, arr) => arr.length
  ? `<div class="row"><h4>${{title}}</h4><ul>` +
    arr.map((x) => `<li><code>${{x}}</code></li>`).join("") + `</ul></div>` : "";
const para = (title, text, cls) => text
  ? `<div class="row"><h4>${{title}}</h4><p class="${{cls || ""}}">${{text}}</p></div>` : "";

function usedIn(d) {{
  if (!d.slots.length) {{
    return para("Where it is used",
      "Not part of a screen variant set — this is a standalone component.");
  }}
  const named = d.slots.filter((s) => s.label);
  if (!named.length) {{
    return para("Where it is used",
      `<span style="color:#8b908a;font-size:12.5px">Switch the preview to
       <strong>In prototype</strong> to see the screen it came from.</span>`);
  }}
  const lines = named.map((s) => {{
    const n = s.candidates.length;
    return `${{s.label}}${{n > 1 ? ` — one of ${{n}} alternatives in that slot, all of which ship` : ""}}`;
  }}).join("<br>");
  return para("Where it is used", lines +
    (d.slots.some((s) => s.page)
      ? `<br><span style="color:#8b908a;font-size:12.5px">Switch the preview to
         <strong>In prototype</strong> to see it in the screen.</span>` : ""));
}}

function render(slug) {{
  const d = DATA[slug];
  document.getElementById("p-title").textContent = d.title;
  document.getElementById("p-group").textContent = d.group;
  document.getElementById("p-status").textContent = d.statusLabel;
  body.innerHTML =
    para("What to implement", d.todo) +
    para("How to play it", d.howToPlay) +
    list("Files to bundle", d.delivered) +
    list("Ship these images at @2x/@3x", d.images) +
    usedIn(d) +
    (d.spec ? para("Follow this specification", `<code>${{d.spec}}</code>`) : "") +
    (d.blockers.length
      ? `<div class="row"><h4>Watch out for</h4><ul class="flag blocker">` +
        d.blockers.map((b) => `<li>${{b}}</li>`).join("") + `</ul></div>` : "") +
    para("Check your build against this", d.verified ||
      "Open the reference preview at the same size and compare the start pose, the end pose, " +
      "and the loop seam.", "flag ok") +
    (d.decision ? para("Still being decided", d.decision, "flag") : "") +
    `<div class="actions"><a class="primary" href="animations/${{slug}}/"
        target="_blank">Open folder</a></div>`;
}}

const PROTO = {{ w: 480, h: 940 }};
let view = "animation";

function frameSrc(slug) {{
  const d = DATA[slug];
  if (view === "prototype") {{
    const s = d.slots.find((x) => x.page);
    // file:// cannot resolve a directory to index.html, while some static servers
    // rewrite "/index.html" away and break the page's relative asset paths. Pick the
    // form that works for the protocol in use; the variant rides in the hash, which
    // survives both.
    if (s) {{
      const base = location.protocol === "file:" ? "prototype/index.html" : "prototype/";
      return s.key ? `${{base}}#${{s.page}}&variant=${{s.key}}:${{s.index}}`
                   : `${{base}}#${{s.page}}`;
    }}
  }}
  return `animations/${{slug}}/reference/preview.html`;
}}

function applyView(frame, slug, w, h) {{
  const iframe = frame.querySelector("iframe");
  if (!iframe) return;
  const want = frameSrc(slug);
  if (!iframe.getAttribute("src").endsWith(want)) iframe.setAttribute("src", want);
  if (view === "prototype") {{
    iframe.style.width = PROTO.w + "px";
    iframe.style.height = PROTO.h + "px";
    // Fit the phone itself rather than the iframe viewport, so the screen fills the
    // pane the same way an animation does instead of floating in dead space.
    const place = () => {{
      let b = null;
      try {{ b = iframe.contentDocument?.querySelector(".alty-mock-phone")?.getBoundingClientRect(); }} catch {{}}
      const sc = b && b.height
        ? (Math.min(w, h) * 0.96) / Math.max(b.width, b.height)
        : Math.min(w / PROTO.w, h / PROTO.h) * 0.98;
      const cx = b && b.height ? b.left + b.width / 2 : PROTO.w / 2;
      const cy = b && b.height ? b.top + b.height / 2 : PROTO.h / 2;
      iframe.style.transform =
        `translate(${{w / 2 - sc * cx}}px, ${{h / 2 - sc * cy}}px) scale(${{sc}})`;
    }};
    place();
    iframe.addEventListener("load", () => setTimeout(place, 120), {{ once: true }});
    // The prototype app renders its own navigation rail; strip it so the card
    // shows the screen alone.
    const strip = () => {{
      try {{
        const doc = iframe.contentDocument;
        if (!doc || doc.getElementById("handoff-strip")) return;
        const st = doc.createElement("style");
        st.id = "handoff-strip";
        // Strip the prototype app's own chrome — nav rail, page heading, view
        // switches and the variant pager — so only the phone screen remains.
        st.textContent = `
          .side-rail, .page-heading, .prototype-variant-pager {{ display:none !important; }}
          #app {{ display:block !important; }}
          .page-view {{ padding:0 !important; margin:0 auto !important; }}
          .stage-band {{ min-height:0 !important; padding:0 !important; }}
          .alty-mockup-prototype {{ min-height:0 !important; }}
          body {{ background:transparent !important; }}`;
        doc.head.appendChild(st);
      }} catch {{}}
    }};
    iframe.addEventListener("load", strip, {{ once: true }});
    strip();
  }} else {{
    iframe.style.width = FIT + "px";
    iframe.style.height = FIT + "px";
    iframe.addEventListener("load", () => fit(frame, w, h), {{ once: true }});
    fit(frame, w, h);
  }}
}}

function positionToggle(rect, slug) {{
  const t = document.getElementById("vtoggle");
  const hasPage = DATA[slug].slots.some((s) => s.page);
  t.classList.toggle("is-on", hasPage);
  if (!hasPage) return;
  t.style.left = (rect.left + rect.width / 2) + "px";
  t.style.top = (rect.top + rect.height + 18) + "px";
}}

function openSpec(slug) {{
  const card = document.querySelector(`.card[data-slug="${{slug}}"]`);
  if (!card) return;
  const frame = card.querySelector(".frame");
  mount(frame);

  if (current && current !== slug) {{            // swapping between siblings
    const prev = document.querySelector(".frame.is-lifted");
    if (prev) drop(prev);
  }}
  current = slug;

  const from = frame.getBoundingClientRect();
  Object.assign(frame.style, {{
    left: from.left + "px", top: from.top + "px",
    width: from.width + "px", height: from.height + "px"
  }});
  frame.classList.add("is-lifted");
  card.classList.add("is-focused");
  void frame.offsetWidth;                        // commit the start rect

  const to = focusRect();
  Object.assign(frame.style, {{
    left: to.left + "px", top: to.top + "px",
    width: to.width + "px", height: to.height + "px"
  }});
  fit(frame, to.width, to.height);
  view = "animation";
  document.querySelectorAll("#vtoggle button").forEach(
    (b) => b.setAttribute("aria-pressed", String(b.dataset.view === "animation")));
  positionToggle(to, slug);

  document.querySelectorAll(".card").forEach((c) => {{
    if (c !== card) c.classList.add("is-dimmed");
  }});
  document.body.classList.add("focused");
  panel.setAttribute("aria-hidden", "false");
  render(slug);
}}

function drop(frame) {{
  const card = frame.closest(".card");
  card.classList.remove("is-focused");
  frame.classList.remove("is-lifted");
  frame.style.cssText = "";
  fit(frame);
}}

function closeSpec() {{
  const frame = document.querySelector(".frame.is-lifted");
  if (frame) {{
    const card = frame.closest(".card");
    document.querySelectorAll(".card").forEach((c) => c.classList.remove("is-dimmed"));
    document.body.classList.remove("focused");
    const back = (() => {{                        // measure the resting slot
      frame.style.visibility = "hidden";
      frame.classList.remove("is-lifted");
      frame.style.cssText = "visibility:hidden";
      const r = frame.getBoundingClientRect();
      frame.classList.add("is-lifted");
      Object.assign(frame.style, {{
        visibility: "", left: frame.style.left, top: frame.style.top
      }});
      return r;
    }})();
    const to = focusRect();
    Object.assign(frame.style, {{
      left: to.left + "px", top: to.top + "px",
      width: to.width + "px", height: to.height + "px"
    }});
    void frame.offsetWidth;
    Object.assign(frame.style, {{
      left: back.left + "px", top: back.top + "px",
      width: back.width + "px", height: back.height + "px"
    }});
    fit(frame, back.width, back.height);
    setTimeout(() => {{ if (!document.body.classList.contains("focused")) drop(frame); }}, 600);
    card.classList.remove("is-focused");
  }} else {{
    document.body.classList.remove("focused");
  }}
  panel.setAttribute("aria-hidden", "true");
  current = null;
}}

document.addEventListener("click", (e) => {{
  const goto = e.target.closest("[data-goto]");
  if (goto) {{ openSpec(goto.dataset.goto); return; }}
  if (e.target.closest(".replay") || document.body.classList.contains("focused")) return;
  const card = e.target.closest(".card");        // the whole card is the target
  if (card) openSpec(card.dataset.slug);
}});
/* The previews carry their own theme attribute, so flipping the shell alone would
   leave every animation in dark. Same-origin, so set it inside each frame too. */
let uiTheme = "dark";
const themeFrame = (iframe) => {{
  try {{
    const doc = iframe.contentDocument;
    if (!doc) return;
    doc.documentElement.dataset.prototypeTheme = uiTheme;
    doc.querySelectorAll("[data-prototype-theme]").forEach(
      (el) => (el.dataset.prototypeTheme = uiTheme));
  }} catch {{}}
}};
const applyTheme = (t) => {{
  uiTheme = t;
  document.documentElement.dataset.uiTheme = t;
  document.querySelectorAll("#theme button").forEach(
    (b) => b.setAttribute("aria-pressed", String(b.dataset.theme === t)));
  document.querySelectorAll(".frame iframe").forEach(themeFrame);
}};
document.getElementById("theme").addEventListener("click", (e) => {{
  const b = e.target.closest("button");
  if (b) applyTheme(b.dataset.theme);
}});

document.getElementById("vtoggle").addEventListener("click", (e) => {{
  const b = e.target.closest("button");
  if (!b || !current) return;
  view = b.dataset.view;
  [...b.parentElement.children].forEach(
    (x) => x.setAttribute("aria-pressed", String(x === b)));
  const frame = document.querySelector(".frame.is-lifted");
  const r = focusRect();
  applyView(frame, current, r.width, r.height);
}});
document.getElementById("close").addEventListener("click", closeSpec);
scrim.addEventListener("click", closeSpec);
addEventListener("keydown", (e) => {{ if (e.key === "Escape") closeSpec(); }});
addEventListener("resize", () => {{
  const frame = document.querySelector(".frame.is-lifted");
  if (!frame) return;
  const to = focusRect();
  Object.assign(frame.style, {{
    left: to.left + "px", top: to.top + "px",
    width: to.width + "px", height: to.height + "px"
  }});
  applyView(frame, current, to.width, to.height);
  positionToggle(to, current);
}});
</script>
</body></html>""")


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    manifest, status, items = load()
    copy_sources(items)
    copy_media(items)
    copy_prototype_app(items)
    for item in items:
        write_animation_readme(item)
    write_docs(items, status)
    write_gallery(items)
    write_data(manifest, items)
    write_index(manifest, items)

    unclassified = [i["slug"] for i in items if not i["status"]]
    print(f"built {OUT.relative_to(ROOT)}  ({len(items)} animations)")
    if unclassified:
        print(f"  WARNING unclassified in animation-status.json: {unclassified}")


if __name__ == "__main__":
    main()
