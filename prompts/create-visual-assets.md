# Create visual assets

> **For the person:** to create or refresh only the illustrations, paste:
>
> ```text
> Read https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/prompts/create-visual-assets.md and create the README illustrations for this project.
> ```
>
> Everything below is written for the agent.

Create original SVG illustrations for the README of the project in the current working directory. Read [visual-design.md](../guidelines/visual-design.md), [accessibility.md](../guidelines/accessibility.md) and [github-compatibility.md](../guidelines/github-compatibility.md#svg-served-as-an-image) first.

## 1. Decide what deserves a figure

| Figure | Make it when | Skip it when |
|---|---|---|
| `hero.svg` + `hero-still.svg` | Always, for a premium README | — |
| `architecture.svg` | The structure is stable and composition matters | It changes weekly: use Mermaid |
| `flow.svg` | There is a user or data journey worth seeing | It is a straight line of two steps |
| `roadmap.svg` | A real, sourced roadmap exists | There is no roadmap. Never invent one |

Fewer, better figures. Two strong images beat five average ones.

## 2. Define the identity

Write it to `docs/assets/readme/DESIGN.md` using [`templates/DESIGN.template.md`](../templates/DESIGN.template.md): concept in one sentence, palette tokens with hex values and roles, type stacks, shape language, motion rules, file list.

The concept should come from the project. Ask: what does this software *do* that can be drawn? Data moving through lanes, layers composing, a request crossing boundaries, a screen assembling. Draw that, in the project's colours.

## 3. Build the hero

Structure that works:

- 1600 × 600–800 canvas, `viewBox` set, frame radius 20–28 px, own background.
- Left: project name (large, `textLength`-fixed), one-line proposition, at most one supporting line.
- Right: the concept drawing.
- Optional thin header row (project mark, a label) and a bottom detail row.

Required markup:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="680" viewBox="0 0 1600 680"
     role="img" aria-labelledby="title desc">
  <title id="title">Project — proposition</title>
  <desc id="desc">What the image shows, in one or two sentences.</desc>
  <!-- motion:start -->
  <style>
    .m-in { animation: m-in .8s ease-out both; }
    @keyframes m-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
  </style>
  <!-- motion:end -->
  …
</svg>
```

Motion rules:

- One run, total ≤ 4 s, no loops, no flashing.
- Animate *into* the natural state (`both` fill mode), so the file without its `<style>` is the final frame.
- CSS `transform` replaces an element's `transform` attribute. Put the animation class on a wrapper `<g>` and the geometry transform on a child.
- Generate the still, never hand-edit it:

  ```bash
  curl -fsSL https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/scripts/validate-readme.mjs -o /tmp/validate-readme.mjs
  node /tmp/validate-readme.mjs . --write-stills
  ```

Serve it in the README:

```html
<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="docs/assets/readme/hero-still.svg" />
    <img src="docs/assets/readme/hero.svg" alt="Project — proposition. What the illustration shows." width="1600" />
  </picture>
</p>
```

## 4. Build the other figures

- Same frame, margins, type stacks and tokens as the hero. They are one family.
- Static. No animation outside the hero.
- Diagrams show real components with real names from the code. Solid lines for what exists, dashed for planned or failure paths, with a legend.
- Every figure's `<desc>` and the README `alt` describe the content, so the page reads without images.

## 5. Quality bar

- Hand-written, readable SVG: grouped, commented sections, shared attributes on `<g>`, no editor metadata.
- Typically under 30 KB each. Never embed bitmaps unless they are real screenshots.
- No `<script>`, `<foreignObject>`, external fonts or external images.
- No copied assets: no third-party logos unless the project is entitled to use them, no illustrations from other repositories, no stock packs.
- Inspect each file rendered in a browser at full size **and** scaled to ~375 px wide. Fix collisions and fallback-font overflow before moving on.
- Run the validator; it must pass.
