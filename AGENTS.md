# AGENTS.md

Instructions for coding agents (Claude Code, Cursor, Codex, Copilot, Gemini and any tool that reads `AGENTS.md`).

This repository is **Premium README Template**: guidelines, prompts, templates and a validator for writing READMEs that are visually strong and technically exact. It contains no application code.

## What were you asked to do?

| Request | Follow |
|---|---|
| "Use the Premium README Template on this project", "apply the Premium README standard", "make this README premium" | [`prompts/apply-to-project.md`](prompts/apply-to-project.md) |
| "Audit / review this README" | [`prompts/audit-existing-readme.md`](prompts/audit-existing-readme.md) |
| "Create the README illustrations / hero" | [`prompts/create-visual-assets.md`](prompts/create-visual-assets.md) |
| Change this template repository itself | [Working on this repository](#working-on-this-repository) below |

When you are working in **another** project, this file is not loaded automatically. The person points you here with a URL or a local path; read the prompt from `https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/<path>` or from the local clone.

## Sources of truth

Each topic has one owner. Prompts reference these files; they do not restate them.

| Topic | File |
|---|---|
| Evidence, wording, commands, badges | [`guidelines/technical-accuracy.md`](guidelines/technical-accuracy.md) |
| Identity, colour, type, layout, Markdown elements | [`guidelines/visual-design.md`](guidelines/visual-design.md) |
| Alt text, motion, contrast, mobile | [`guidelines/accessibility.md`](guidelines/accessibility.md) |
| What GitHub renders and strips | [`guidelines/github-compatibility.md`](guidelines/github-compatibility.md) |
| Validator, manual checks, security sweep | [`guidelines/validation.md`](guidelines/validation.md) |
| Section catalogue | [`templates/README.template.md`](templates/README.template.md) |

Non-negotiables when applying the standard anywhere are the [ground rules in apply-to-project.md](prompts/apply-to-project.md#0-ground-rules): documentation only, never invent, never commit to the default branch, never merge, no secrets, report limitations.

## Working on this repository

- **Validate before every commit:**

  ```bash
  node scripts/validate-readme.mjs --write-stills
  node scripts/validate-readme.mjs --require README.md,LICENSE,CONTRIBUTING.md,AGENTS.md,CLAUDE.md
  npx --yes markdownlint-cli2@0.23.3
  ```

- `hero-still.svg` files are **generated** from their animated twin. Edit `hero.svg`, then run `--write-stills`.
- Render every SVG you touch in a browser, at full width and at ~375 px, before committing.
- The template's own identity ("Proof") is documented in [`docs/assets/readme/DESIGN.md`](docs/assets/readme/DESIGN.md). It belongs to this repository only; never apply it to other projects.
- The validator stays a single dependency-free file. A new check must be documented in [`guidelines/validation.md`](guidelines/validation.md#what-it-checks).
- One topic, one owner: extend an existing guideline instead of adding a parallel document.
- The example in [`examples/sample-project/`](examples/sample-project/) is fictional and must stay clearly labelled as such.
- Commits: short, imperative, Conventional Commits prefixes (`docs:`, `feat:`, `fix:`, `chore:`, `ci:`). Stage files explicitly.
- Pull requests use [`.github/pull_request_template.md`](.github/pull_request_template.md). CI must be green.

## Security

This repository is public. Never add tokens, keys, `.env` files, internal URLs, personal data or assets copied from other projects. Run the [security sweep](guidelines/validation.md#security-review) on every diff.
