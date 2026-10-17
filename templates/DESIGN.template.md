# {{PROJECT_NAME}} — README visual system

<!-- Keep this file next to the assets (docs/assets/readme/DESIGN.md). It is the contract that keeps future figures consistent. -->

## Concept

{{ONE_SENTENCE_CONCEPT}}

Derived from: {{SOURCE_OF_IDENTITY}} <!-- e.g. "lib/app/theme/colors.dart", "the app icon", "no prior identity; derived from the domain" -->

## Palette

| Token | Hex | Role | Contrast on surface |
|---|---|---|---|
| surface | `{{HEX}}` | Illustration background | — |
| ink | `{{HEX}}` | Primary text, strokes | {{RATIO}} |
| muted | `{{HEX}}` | Secondary text | {{RATIO}} |
| rule | `{{HEX}}` | Borders, grids | decorative |
| accent | `{{HEX}}` | Brand, emphasis | {{RATIO}} |
| {{STATUS_TOKEN}} | `{{HEX}}` | {{MEANING}} | {{RATIO}} |

## Typography

| Role | Stack | Size at 1600 px |
|---|---|---|
| Display | {{STACK}} | {{SIZE}} |
| Labels | {{STACK}} | {{SIZE}} |
| Technical | {{STACK}} | {{SIZE}} |

## Shape and line

- {{FRAME_RADIUS_AND_MARGINS}}
- {{LINE_LANGUAGE}} <!-- e.g. "solid = exists, dashed = planned" -->
- {{MOTIF}}

## Motion

- Hero only, one run, {{DURATION}} ≤ 4 s, disabled by `prefers-reduced-motion`.
- `hero-still.svg` is generated from `hero.svg` (`--write-stills`), never edited by hand.

## Files

| File | Shows | Update when |
|---|---|---|
| `hero.svg` / `hero-still.svg` | {{HERO_CONTENT}} | {{TRIGGER}} |
| `{{FIGURE}}.svg` | {{CONTENT}} | {{TRIGGER}} |
