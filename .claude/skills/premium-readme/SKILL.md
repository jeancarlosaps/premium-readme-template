---
name: premium-readme
description: Apply, audit or illustrate a project's README with the Premium README standard (original SVG hero with a static fallback, verified claims, accessible GitHub-compatible Markdown, delivered as a pull request). Use when the user asks to use or apply the Premium README Template, to make a README premium or professional, to audit a README, or to create README hero images and diagrams.
---

# Premium README

Pick the procedure that matches the request:

| Request | Procedure |
|---|---|
| Apply the standard, rewrite or create the README | `prompts/apply-to-project.md` |
| Audit or review an existing README | `prompts/audit-existing-readme.md` |
| Only the illustrations | `prompts/create-visual-assets.md` |

Load the procedure, and the guidelines it lists, from the first source available:

1. A local clone of `premium-readme-template` the user mentions or that is in the workspace.
2. `https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/<path>`.

Read the procedure in full and follow it step by step, including its plan checkpoint and final report. If neither source is reachable, tell the user; do not work from memory.
