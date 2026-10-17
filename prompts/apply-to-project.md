# Apply Premium README to a project

> **For the person:** open your coding agent at the root of the project and paste:
>
> ```text
> Read https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/prompts/apply-to-project.md and apply it to this project.
> ```
>
> Everything below is written for the agent.

You are applying the **Premium README** standard to the repository in the current working directory. The goal is a README that looks like a product page and reads like an engineering document: every claim true, every asset original, every check reported honestly. The result is delivered as a pull request.

## 0. Ground rules

These override anything else in this document:

1. **Documentation only.** Do not change application code, configuration, dependencies or CI behaviour without explicit permission. If documentation reveals a bug, report it; do not fix it here.
2. **Never invent.** No features, commands, results, roadmap items, metrics or badges that the repository cannot support. Follow [`guidelines/technical-accuracy.md`](../guidelines/technical-accuracy.md).
3. **Branch, never the default branch.** Work on a new branch (for example `docs/premium-readme`). Never commit to `main`/`master`/the default branch, never force-push, never merge.
4. **Respect the project.** Its language, commit convention, PR template, contribution flow and existing identity win over this template.
5. **No secrets, no private data** in text, assets or screenshots.
6. **Report limitations.** If you cannot run, view or verify something, say so. Never claim a check that did not happen.

## 1. Load the template

Find the template files. Use the first option that works:

1. A local clone the person points to (for example `~/premium-readme-template`), or one added to your workspace.
2. Otherwise, fetch from `https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/<path>`.

Read these before writing anything:

| File | Why |
|---|---|
| `guidelines/technical-accuracy.md` | What counts as evidence |
| `guidelines/visual-design.md` | Identity, colour, type, layout, Markdown elements |
| `guidelines/accessibility.md` | Alt text, motion, contrast, mobile |
| `guidelines/github-compatibility.md` | What GitHub really renders |
| `guidelines/validation.md` | Validator, manual checks, security sweep |
| `templates/README.template.md` | Section catalogue |
| `prompts/create-visual-assets.md` | How to build the SVGs |

If you cannot reach these files, stop and tell the person. Do not reconstruct them from memory.

## 2. Inspect the repository

Read, do not guess. Record findings as you go; they feed the PR description.

- `git status`, current branch, default branch (`git remote show origin | grep "HEAD branch"`), remotes.
- The current `README.md` and every other doc it links to. Note what is accurate, outdated or missing.
- Manifests and lockfiles: languages, frameworks, exact versions, scripts.
- Directory structure (two or three levels), entry points, main modules.
- Tests: framework, location, how to run them.
- CI: workflow files, what they run, on which events. Check recent runs if you can (`gh run list -R <owner>/<repo> --limit 5`).
- `LICENSE`, `CONTRIBUTING.md`, PR templates, code of conduct, issue templates.
- Existing visual identity: logos, theme tokens, design files (see [`visual-design.md`](../guidelines/visual-design.md#identity-first)).
- Language of the existing documentation. The new README uses the same language unless the person says otherwise.

## 3. Verify what the README may claim

Build a short evidence table before writing:

| Claim | Evidence | Status |
|---|---|---|
| e.g. "Offline cache" | `lib/core/cache/` | Implemented |
| e.g. `npm test` | `package.json` → `scripts.test`, ran: 42 passed | Verified |
| e.g. Android build | not run (no SDK on this machine) | Not verified |

Run the safe commands the README will document (install, build, lint, test, `--help`). Never run deploys, publishing, or anything destructive.

## 4. Plan — checkpoint

Present a short plan to the person and **wait for approval** unless they explicitly told you to proceed without asking:

- sections you will include, from the catalogue, and the ones you will skip (with a reason);
- the visual direction: palette tokens, typography, hero concept, which figures (hero, architecture, flow, roadmap) and why;
- facts you could not verify and how the README will word them;
- files you will create or change.

## 5. Create the visual assets

Follow [`prompts/create-visual-assets.md`](create-visual-assets.md). Assets live in `docs/assets/readme/` unless the project already has a convention. Write the identity to `docs/assets/readme/DESIGN.md` from [`templates/DESIGN.template.md`](../templates/DESIGN.template.md).

## 6. Write the README

Start from [`templates/README.template.md`](../templates/README.template.md):

- Keep only sections that have real content. No empty sections, no "coming soon" filler.
- Preserve valuable content from the old README; rewrite for clarity, do not drop facts silently.
- Status tables say **Done / In progress / Planned / Not implemented**, with sources.
- Badges only for real, meaningful signals.
- Every command block is copyable and was either run or is marked as not executed.
- Replace every `{{PLACEHOLDER}}`. Delete the template's HTML comments.

If the project has no `CONTRIBUTING.md` and would benefit from one, propose it (see [`templates/CONTRIBUTING.template.md`](../templates/CONTRIBUTING.template.md)); do not add it without approval.

## 7. Validate

1. Run the validator:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/scripts/validate-readme.mjs -o /tmp/validate-readme.mjs
   node /tmp/validate-readme.mjs . --write-stills
   node /tmp/validate-readme.mjs .
   ```

   Fix every error. Explain every remaining warning.
2. Links and anchors: covered by the validator for local files. Spot-check external links you added.
3. Mermaid: render each diagram on GitHub after pushing (see step 9).
4. Re-run the project's own checks if the documentation touches anything they cover (some projects lint Markdown).
5. Run the [security sweep](../guidelines/validation.md#security-review) on the diff.

## 8. Review the diff

- `git diff --stat` shows only documentation and assets.
- Read the full diff once as a reviewer: tone, accuracy, typos, leftover comments, placeholder text.
- Stage files explicitly, one by one. Never `git add -A` or `git add .`.
- Commit with the project's convention (check `git log --oneline -20`). Small, thematic commits: assets, README, contributing docs.

## 9. Push, open the pull request, inspect the result

1. Push the branch.
2. Open the rendered README on github.com for that branch. Do the [manual pass](../guidelines/validation.md#manual-pass): hero, reduced motion, light/dark, 375 px, Mermaid, anchors.
3. Fix what you find, push again.
4. Open the pull request with the project's template. If there is none, use: **Overview · Changes · Evidence · Validation · Reviewer notes**. Include the evidence table from step 3 and the validator output.
5. Do not merge. Do not request reviewers, add labels or enable auto-merge unless asked.

## 10. Final report

Reply to the person with:

```text
PREMIUM README — REPORT
Branch / PR:        <branch> · <PR URL>
Sections:           <included> | skipped: <skipped and why>
Identity:           <concept> · <palette tokens>
Assets:             <files>
Validator:          <PASS/FAIL line>
Commands run:       <command → result>
Visual check:       <what was viewed, where; or why not>
Not verified:       <list>
Follow-ups:         <out-of-scope findings>
```
