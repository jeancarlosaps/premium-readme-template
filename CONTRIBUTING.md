# Contributing

Thanks for helping make documentation better. This is a small project; the process is short.

## What is welcome

- Sharper guidelines, backed by evidence (a GitHub rendering observation, a WCAG reference, a real failure you hit).
- Prompt improvements that make agents more accurate or reduce steps.
- Validator checks that catch real problems without adding dependencies.
- Fixes to the example, the templates or the illustrations.

Open an issue first for larger changes, such as a new prompt, a new guideline file or a second example, so we can agree on the shape.

## Flow

```text
issue (for larger changes) → branch from main → change → validate → pull request → CI → review → merge
```

1. Fork or branch from `main`: `docs/<topic>`, `feat/<topic>`, `fix/<topic>`.
2. Keep one topic per pull request.
3. Validate (below).
4. Open the pull request with the [template](.github/pull_request_template.md).

## Validate

```bash
node scripts/validate-readme.mjs --write-stills
node scripts/validate-readme.mjs --require README.md,LICENSE,CONTRIBUTING.md,AGENTS.md,CLAUDE.md
npx --yes markdownlint-cli2@0.23.3
```

CI runs the same checks on every pull request and on `main`.

## Reviewing templates and guidelines

- **One owner per topic.** Extend the file that owns a topic (see the table in [AGENTS.md](AGENTS.md#sources-of-truth)) instead of repeating a rule elsewhere.
- **Observed, not assumed.** Statements about GitHub behaviour name how and when they were observed.
- **Tool-neutral.** Rules describe behaviour, not a specific agent. Tool-specific notes go in `CLAUDE.md`, `.claude/skills/` or `.cursor/rules/`.
- **Templates stay optional.** Every template section says when to include it.

## Illustrations

- Original work only. No assets copied from other projects, no third-party logos, no stock packs.
- Follow [prompts/create-visual-assets.md](prompts/create-visual-assets.md) and the repository's identity in [docs/assets/readme/DESIGN.md](docs/assets/readme/DESIGN.md).
- Edit `hero.svg`, never `hero-still.svg`; regenerate the still with `--write-stills`.
- Attach a screenshot of each changed SVG, rendered at full width and at ~375 px, to the pull request.

## The example

There is one example on purpose. Improving it is welcome; a second example needs an issue first and must show a clearly different kind of project and identity. Examples stay fictional and labelled as such.

## Commits

Short, imperative, with a Conventional Commits prefix: `docs:`, `feat:`, `fix:`, `chore:`, `ci:`. Stage files explicitly. Never commit secrets or personal configuration.
