# Premium README Template — README visual system

The identity of **this repository only**. Projects that adopt the template derive their own; see [visual-design.md](../../../guidelines/visual-design.md#identity-first).

## Concept

**Proof.** A printer's proof sheet is the last check before something is published; a proof is also evidence. The illustrations look like marked-up proofs: paper, ink, crop marks, a single cobalt correction colour, numbered callouts.

Derived from: no prior identity; derived from the project's two promises, design and verification.

## Palette

| Token | Hex | Role | Contrast on paper |
|---|---|---|---|
| paper | `#F4F2EC` | Illustration background | — |
| sheet | `#FFFFFF` | Cards and stacked sheets | — |
| ink | `#101114` | Primary text, strokes | 16.9 : 1 |
| graphite | `#555A66` | Secondary text | 6.2 : 1 |
| rule | `#D8D4CA` | Hairlines, dividers | decorative |
| cobalt | `#2340F5` | Accent: emphasis, callouts, the caret | 6.0 : 1 |
| cobalt soft | `#E3E7FE` | Tinted fills | decorative |
| cobalt light | `#9AA8FF` | Accent on ink backgrounds | 8.5 : 1 on ink |

Measured with the WCAG 2.2 relative-luminance formula.

## Typography

| Role | Stack | Size at 1600 px |
|---|---|---|
| Display | `'Helvetica Neue', Helvetica, Arial, 'Segoe UI', Roboto, 'Liberation Sans', sans-serif`, 800, `textLength`-fixed | 140 |
| Editorial | `'Iowan Old Style', 'Palatino Linotype', Palatino, Charter, Georgia, 'Times New Roman', serif`, italic | 28–40 |
| Technical | `'SF Mono', SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace`, tracking 1.6–2.4 | 13–16 |
| Body in figures | Display stack, 400 | 17 |

## Shape and line

- Frame radius 24 px, outer margin 80 px, header rule at y = 96 with a 112 px cobalt lead.
- Crop marks in the corners of the hero; dot grid at 24 px, ink at 9% opacity.
- Isometric sheets use `matrix(.7794 .45 -.7794 .45 x y)` on flat 320 × 320 artwork.
- Cobalt is the only colour that carries emphasis. Dashed cobalt = construction guide.

## Motion

- `hero.svg` only. Sheets drop into the stack one by one, callouts and the caret follow; the last animation ends at 3.0 s.
- Disabled by `prefers-reduced-motion: reduce`.
- `hero-still.svg` is generated from `hero.svg` with `node scripts/validate-readme.mjs --write-stills`.

## Files

| File | Shows | Update when |
|---|---|---|
| `hero.svg` / `hero-still.svg` | Name, tagline and the code → architecture → documentation → experience stack | The name or the proposition changes |
| `workflow.svg` | The steps of `prompts/apply-to-project.md`, grouped into five phases | The procedure changes its phases |
