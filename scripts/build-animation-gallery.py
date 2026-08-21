#!/usr/bin/env python3
"""Rebuild mobile-animation-export/gallery.html from manifest.json.

Run after export-mobile-animation-sources.mjs so the gallery stays in sync
with whatever the export actually produced.
"""

import html
import json
import pathlib

EXPORT_DIR = pathlib.Path(__file__).resolve().parent.parent / "mobile-animation-export"


def build() -> str:
    manifest = json.loads((EXPORT_DIR / "manifest.json").read_text())
    groups = manifest["groups"]

    nav, sections = [], []
    for group in groups:
        gid = group["folder"]
        nav.append(f'<a href="#{gid}">{html.escape(group["title"])} <span>{len(group["items"])}</span></a>')

        cards = []
        for item in group["items"]:
            cards.append(f"""
      <figure class="card">
        <div class="frame" data-src="{item['previewHtml']}">
          <button class="replay" title="Replay">&#8635;</button>
        </div>
        <figcaption>
          <strong>{html.escape(item['title'])}</strong>
          <span class="meta">{html.escape(item['sourceKind'])} &middot; {html.escape(item['recommendedFormat'])}</span>
          <span class="slug">{html.escape(item['slug'])}</span>
          <a class="open" href="{item['previewHtml']}" target="_blank">open full &rarr;</a>
        </figcaption>
      </figure>""")

        sections.append(f"""
    <section class="group" id="{gid}">
      <h2>{html.escape(group['title'])}<span class="count">{len(group['items'])}</span></h2>
      <div class="grid">{''.join(cards)}
      </div>
    </section>""")

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>UBA Mobile Animation Gallery</title>
<style>
  :root {{ color-scheme: dark; }}
  * {{ box-sizing: border-box; }}
  body {{
    margin: 0; background: #050605; color: #f2f3f1;
    font: 15px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }}
  header {{
    position: sticky; top: 0; z-index: 10; padding: 18px 28px 14px;
    background: rgba(5,6,5,.94); backdrop-filter: blur(12px);
    border-bottom: 1px solid #1c1e1c;
  }}
  h1 {{ margin: 0 0 4px; font-size: 19px; letter-spacing: -.01em; }}
  .sub {{ color: #8b908a; font-size: 13px; }}
  nav {{ display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }}
  nav a {{
    color: #d6d9d4; text-decoration: none; font-size: 12px;
    padding: 4px 10px; border: 1px solid #262926; border-radius: 999px;
  }}
  nav a span {{ color: #ff2438; }}
  nav a:hover {{ border-color: #ff2438; }}
  main {{ padding: 24px 28px 60px; }}
  .group {{ margin-bottom: 44px; scroll-margin-top: 132px; }}
  .group h2 {{
    font-size: 13px; text-transform: uppercase; letter-spacing: .09em;
    color: #9aa098; margin: 0 0 14px; display: flex; align-items: center; gap: 8px;
  }}
  .count {{
    font-size: 11px; color: #ff2438; border: 1px solid #33201f;
    border-radius: 999px; padding: 1px 7px; letter-spacing: 0;
  }}
  .grid {{ display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }}
  .card {{
    margin: 0; background: #0c0e0c; border: 1px solid #1c1f1c;
    border-radius: 14px; overflow: hidden;
  }}
  .card:hover {{ border-color: #333832; }}
  .frame {{ position: relative; aspect-ratio: 1/1; background: #080907; }}
  .frame iframe {{ width: 100%; height: 100%; border: 0; display: block; }}
  .replay {{
    position: absolute; top: 8px; right: 8px; z-index: 2;
    width: 26px; height: 26px; border-radius: 50%; cursor: pointer;
    border: 1px solid #2b2f2a; background: rgba(10,12,10,.75); color: #d6d9d4;
    font-size: 14px; line-height: 1; opacity: 0; transition: opacity .15s;
  }}
  .card:hover .replay {{ opacity: 1; }}
  .replay:hover {{ border-color: #ff2438; color: #ff5a68; }}
  figcaption {{ padding: 11px 13px 13px; display: grid; gap: 3px; border-top: 1px solid #1c1f1c; }}
  figcaption strong {{ font-size: 14px; font-weight: 600; }}
  .meta {{ font-size: 11.5px; color: #8b908a; }}
  .slug {{ font-size: 11px; color: #5d635c; font-family: ui-monospace, monospace; }}
  .open {{ font-size: 11.5px; color: #ff5a68; text-decoration: none; margin-top: 3px; }}
  .open:hover {{ text-decoration: underline; }}
</style>
</head>
<body>
<header>
  <h1>UBA Mobile Animation Gallery</h1>
  <div class="sub">{manifest['totalAnimations']} animations &middot; live web sources from <code>mobile-animation-export</code> &middot; exported {manifest['generatedAt']}</div>
  <nav>{''.join(nav)}</nav>
</header>
<main>{''.join(sections)}
</main>
<script>
  // Mount previews only while visible so every animation never runs at once.
  const mount = (frame) => {{
    if (frame.querySelector("iframe")) return;
    const iframe = document.createElement("iframe");
    iframe.src = frame.dataset.src;
    iframe.title = frame.dataset.src;
    frame.appendChild(iframe);
  }};
  const unmount = (frame) => {{
    const iframe = frame.querySelector("iframe");
    if (iframe) iframe.remove();
  }};

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => (e.isIntersecting ? mount : unmount)(e.target)),
    {{ rootMargin: "200px 0px" }}
  );
  document.querySelectorAll(".frame").forEach((frame) => observer.observe(frame));

  document.addEventListener("click", (event) => {{
    const button = event.target.closest(".replay");
    if (!button) return;
    const frame = button.closest(".frame");
    unmount(frame);
    requestAnimationFrame(() => mount(frame));
  }});
</script>
</body>
</html>"""


if __name__ == "__main__":
    target = EXPORT_DIR / "gallery.html"
    target.write_text(build())
    print(f"wrote {target}")
