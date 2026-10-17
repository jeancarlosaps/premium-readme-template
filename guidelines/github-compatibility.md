# GitHub compatibility

GitHub does not render a README the way a browser renders a web page. HTML is sanitised, images are served through `<img>`, and some features are rendered client-side. This page lists what was **observed**, how, and when.

Observations from 2026-10-16, using the official renderer (`POST /markdown`, mode `gfm`, through `gh api markdown`) and the rendered repository page on github.com. Re-check anything critical: GitHub changes without notice.

## HTML that survives

| Markup | Result | Use it for |
|---|---|---|
| `<picture>` + `<source media="…" srcset="…">` + `<img>` | Kept (wrapped in GitHub's `<themed-picture>`) | Reduced-motion fallback, light/dark variants |
| `media="(prefers-reduced-motion: reduce)"` | Kept | Static hero |
| `media="(prefers-color-scheme: dark)"` | Kept | Dark-theme artwork, if you make one |
| `<img src alt width height>` | Kept | All images |
| `<p align="center">`, `<h1 align="center">`, `<div align="center">` | `align` kept | Centred hero, title and navigation |
| `<a id="…">`, `id` on headings | Kept, prefixed with `user-content-` | Stable anchors; `#name` links still resolve on the page |
| `<details>`, `<summary>`, `<kbd>`, `<sup>`, `<sub>`, `<br>` | Kept | Collapsible detail, keys, footnotes |
| `<table>` with `width` / `valign` on cells | Kept | Rarely needed; Markdown tables are simpler |

## HTML that is removed or neutralised

| Markup | Result |
|---|---|
| `style="…"`, `class="…"` | Stripped. You cannot style README HTML |
| `loading="lazy"` on `<img>` | Stripped (harmless, but it does nothing) |
| Inline `<svg>` | Removed entirely. Reference an `.svg` file instead |
| `<script>` | Escaped and shown as text |
| External images | Proxied through `camo.githubusercontent.com` |

## SVG served as an image

Inside a README, an SVG is loaded with `<img>`. Browsers apply "secure animated mode" to SVG images:

| Feature inside the SVG | Works |
|---|---|
| CSS `@keyframes` animations | Yes |
| `@media (prefers-reduced-motion)` inside the SVG | Yes, follows the visitor's OS setting |
| Embedded `<style>` | Yes |
| JavaScript | No |
| Web fonts (`@font-face` with URLs), external images, external `<use>` | No. Only same-file references |
| `<foreignObject>` (HTML inside SVG) | Unreliable; avoid |
| System fonts | Yes, but they differ per visitor; see [visual-design.md](visual-design.md#typography) |

## Mermaid

- Fenced ` ```mermaid ` blocks are rendered client-side in an iframe served from `viewscreen.githubusercontent.com`. `POST /markdown` returns only a placeholder, so **the API cannot validate a diagram**; open the page on github.com.
- Diagrams follow the visitor's light or dark theme. Set `fill`, `stroke` **and** `color` in `classDef` to control contrast.
- Not every place that shows a README renders Mermaid (package registries and IDE previews vary). If the README is published elsewhere, check that renderer, or prefer SVG for essential diagrams.

## Anchors

- Heading anchors are lowercase, with punctuation removed and each space turned into a hyphen. `## 01 · Quick start` becomes `#01--quick-start` (the `·` disappears, leaving two hyphens).
- Duplicate headings get `-1`, `-2` suffixes.
- For links that must survive heading edits, add an explicit `<a id="quick-start"></a>` before the heading and link to that.

## Links and paths

- Relative links and image paths resolve against the file's location on the current branch.
- A leading `/` resolves against the repository root.
- The same README is shown on forks and in other branches with paths relative to them, so relative links are preferred over absolute `github.com/…/blob/main/…` URLs for repository files.

## Other renderers

The same `README.md` may also be shown by package registries and IDEs. Most of them drop `<picture>`, ignore `align`, and do not render Mermaid. A README built with this template degrades to: the default `<img>` (the animated hero), left-aligned text and a raw Mermaid code block. Keep the information in text so it survives.
