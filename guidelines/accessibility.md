# Accessibility

A premium README works for someone on a phone, in dark mode, with reduced motion, or with a screen reader. Images illustrate; **the Markdown carries the information**.

## Text alternatives

- Every `<img>` and Markdown image has an `alt` that states what the image **says**, not what it is. "Pipeline: inspect, verify, design, write, prove" beats "workflow diagram".
- Keep `alt` under ~250 characters. Longer explanations belong in the surrounding text.
- Every SVG has `role="img"`, `aria-labelledby` pointing to a `<title>` and a `<desc>`. The `<title>` is the accessible name if the SVG is opened directly.
- Badges have `alt` text that reads as a sentence fragment: "CI status on main", not "badge".

## Structure

- Real headings in order (H1 → H2 → H3). No bold paragraphs pretending to be headings.
- Tables have a header row. Do not use tables for layout.
- Link text is meaningful out of context.
- Code blocks have a language tag; screen readers and copy buttons both benefit.

## Contrast and colour

- Body text in SVGs: at least 4.5:1 against its background, measured at the colours used. Large text: 3:1.
- Never encode meaning in colour alone. Pair status colours with words, icons or line style (solid for implemented, dashed for planned).
- Illustrations paint their own background so they work on GitHub's light and dark themes.

## Motion

- Animate only the hero, and only when motion explains something (assembly, flow, arrival).
- One run, no loop, **four seconds or less**, no flashing (never more than three flashes per second).
- Inside the SVG: `@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }`.
- Elements animate *from* hidden *to* their natural state with `animation-fill-mode: both`, so disabling animation shows the final frame.
- Ship a static twin, `hero-still.svg`, equal to the final frame, and serve it with `<picture>`:

  ```html
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="docs/assets/readme/hero-still.svg" />
    <img src="docs/assets/readme/hero.svg" alt="…" width="1600" />
  </picture>
  ```

- Generate the still from the animated file instead of maintaining two copies: wrap the `<style>` that holds the animation in `<!-- motion:start -->` / `<!-- motion:end -->` and run `node scripts/validate-readme.mjs --write-stills`. The validator then fails if the two drift apart.
- No essential information may appear only during the animation.

## Small screens

- On a 375 px phone, a 1600 px illustration renders at about 21%. Treat anything smaller than ~40 px in the source as decoration.
- Do not put essential text in images. Repeat it in Markdown.
- Avoid wide tables with more than four columns of prose; split them or move detail into lists.
- Keep code lines under ~100 characters where possible so they do not force horizontal scrolling on every line.

## Verify

- View the rendered README at desktop width and at 375 px.
- Toggle the operating system's dark mode and reduced-motion setting, or emulate them in browser devtools, and reload.
- Read the alt texts aloud. If the README still makes sense with images removed, it passes.
