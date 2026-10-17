# Visual design

A design system for READMEs that is meant to be **re-derived for every project**. The rules below describe structure, proportion and restraint. Colours, motifs and tone come from the project being documented, never from this repository.

- [Identity first](#identity-first)
- [Colour](#colour)
- [Typography](#typography)
- [Canvas, spacing and grid](#canvas-spacing-and-grid)
- [Illustrations](#illustrations)
- [Diagrams: SVG or Mermaid](#diagrams-svg-or-mermaid)
- [Markdown elements](#markdown-elements)
- [What to avoid](#what-to-avoid)

## Identity first

Before drawing anything, collect the identity the project already has. Use the first source that exists:

| Source | Where to look |
|---|---|
| Brand files | `brand/`, `design/`, `docs/assets/`, logo SVGs, a `DESIGN.md` |
| Product UI tokens | Theme files: `*Colors.swift`, `colors.xml`, `theme.dart`, `tailwind.config.*`, CSS custom properties |
| Store or web presence | App icon, landing page linked from `package.json`, `pubspec.yaml`, `Cargo.toml` and similar manifests |
| The domain itself | What the software does and who uses it |

When there is no visual identity, derive one from the domain and write it down in a `DESIGN.md` next to the assets (see [`templates/DESIGN.template.md`](../templates/DESIGN.template.md)). Never reuse another project's palette, logo or illustration.

Domain sets the tone, not the cliché:

| Domain | Direction | Avoid |
|---|---|---|
| Finance, payments | Restraint, precision, generous whitespace, one confident accent | Gold coins, dollar signs, stock-chart clip art |
| Food, hospitality | Warmth, tactile shapes, softer contrast | Cartoon food, emoji |
| Testing, QA, reliability | Grids, checks, measured rhythm, status colours with clear meaning | Bugs-with-legs mascots |
| Developer tools, CLIs | Terminal and typographic cues, monospace accents, high contrast | Fake terminal screenshots with invented output |
| Mobile apps | The app's own theme; device frames only when they show real screens or honest concepts | Generic phone mockups with `lorem ipsum` |
| Libraries and SDKs | The API shape: types, calls, composition | Rockets, lightning bolts |
| Academic projects | Editorial clarity, citations, honest status | Corporate marketing tone |

## Colour

Define a small token set and use it everywhere: SVGs, Mermaid `classDef`, badges.

| Token | Role | Rule |
|---|---|---|
| `surface` | Illustration background | Every SVG paints its own background, so it reads on GitHub light **and** dark themes |
| `ink` | Primary text and strokes | Contrast against `surface` ≥ 7:1 |
| `muted` | Secondary text | Contrast against `surface` ≥ 4.5:1 |
| `rule` | Borders, dividers, grids | Decorative only, never the only carrier of meaning |
| `accent` | Brand, primary emphasis | One accent. A second accent needs a reason |
| `status-*` | Done, in progress, planned, failure | Always paired with a word or a shape, never colour alone |

Checks:

- Text contrast follows WCAG 2.2: **4.5:1** for body text, **3:1** for text at or above 24 px (or 18.66 px bold) in the rendered size.
- Gradients are allowed for depth, not decoration. One subtle gradient per illustration is a good ceiling.
- Light or dark hero is a project decision. Either works because the illustration carries its own background; pick the one that matches the product.

## Typography

GitHub serves README images through `<img>`, so SVGs **cannot load web fonts**. Text renders in the visitor's system fonts. Design for that:

| Role | Stack | Size at 1600 px width |
|---|---|---|
| Display / wordmark | `'Helvetica Neue', Helvetica, Arial, 'Segoe UI', Roboto, 'Liberation Sans', sans-serif` | 96–160, weight 700–800 |
| Editorial accent | `'Iowan Old Style', 'Palatino Linotype', Palatino, Charter, Georgia, 'Times New Roman', serif` | 28–48, often italic |
| Labels | Sans, weight 600–700 | 17–24 |
| Technical detail | `'SF Mono', SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace` | 12–16, tracking 1.2–2.4 |

Rules:

- Fix the width of display words with `textLength` and `lengthAdjust="spacingAndGlyphs"`, so a wider fallback font cannot collide with the artwork.
- Leave at least 15% horizontal slack around any other text for fallback fonts.
- Do not convert text to paths to "fix" fonts unless it is a logo: paths are not selectable, not translatable and inflate the file.
- Keep essential words large. A 1600 px SVG shown in an 830 px README column renders at about 52%; on a 375 px phone, about 21%. Anything under ~40 px in the source is decoration on mobile. The Markdown must carry the information.

## Canvas, spacing and grid

| Asset | Size | Notes |
|---|---|---|
| Hero | 1600 × 600–800 | One composition, one message |
| Section figure | 1600 × 400–800 | Workflow, architecture, roadmap |
| Inline badge or chip | Use Markdown or shields.io instead | — |

- 8 px base unit. Outer margin 80 px. Corner radius 20–28 px on the frame, 8–16 px on cards.
- Use a visible structure: a header rule, a 12-column rhythm, aligned baselines. Editorial layouts read as intentional because things line up.
- Each figure gets a small header row (project mark, figure name) only if it helps orientation. It is a pattern, not a requirement.

## Illustrations

- **Original vector work.** Built from the project's own concepts: its pipeline, its data, its screens, its domain objects.
- **One idea per figure.** If the caption needs "and", consider two figures.
- **Honest abstraction.** Concept art is fine when labelled as such; fake UI with invented features is not.
- **Motion with purpose.** Heroes may animate once, in under four seconds, with a static twin. Rules in [accessibility.md](accessibility.md#motion).
- **Small files.** Hand-written SVG under 30 KB is typical. No embedded bitmaps unless they are real screenshots.

## Diagrams: SVG or Mermaid

| Use | When |
|---|---|
| Mermaid | Architecture that changes often, sequence diagrams, state machines. Reviewable as text, rendered by GitHub. |
| SVG | Hero, overviews where composition matters, diagrams that must match the project identity exactly |

Mermaid inherits GitHub's theme. Give nodes explicit `classDef` colours (fill, stroke **and** text colour) from the token set so they stay readable in both themes. Keep labels short; Mermaid wraps unpredictably.

## Markdown elements

| Element | Rule |
|---|---|
| Headings | One H1 (often the centred `<h1 align="center">`). H2 for sections, H3 inside. Numbered sections (`01 · Overview`) are optional; if used, use them everywhere |
| Navigation | One centred row of 3–7 uppercase links under the hero. Each target must exist |
| Badges | At most five, each answering a question: does CI pass, which version, which licence, which platform. Only CI badges for workflows that exist |
| Tables | For comparisons, status and reference. Never for layout. Header row always present |
| Status | Words first: **Done**, **In progress**, **Planned**. Symbols such as ✅ ⬜ only alongside the words |
| Separators | `---` between major sections, not between every heading |
| Links | Descriptive text: "the contract", not "here". Relative links for files in the repository |
| Code blocks | Always a language tag. Commands copyable as-is: no `$` prompt, placeholders in `<angle-brackets>` and explained |
| Callouts | GitHub alerts (`> [!NOTE]`, `> [!WARNING]`) for real caveats, sparingly |
| Emoji | Not as decoration. A section heading never starts with one |

## What to avoid

- Generic "documentation look": a wall of badges, a centered logo and nothing else.
- Random icon packs, stock illustrations, AI-looking abstract blobs.
- Gradients on everything, glows, glass effects, drop shadows on text.
- A palette copied from another project, including the template's own.
- Sections that exist only because the template had them.
