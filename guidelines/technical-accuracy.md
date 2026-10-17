# Technical accuracy

The look of a README earns attention; its accuracy keeps trust. **Every statement must be traceable to the repository or to an output you observed.** When it cannot be traced, it does not go in, or it goes in clearly labelled.

## Evidence for each kind of claim

| Claim | Acceptable evidence | Not acceptable |
|---|---|---|
| "Feature X exists" | A code path you read (file and symbol) | The project name, a ticket title, a plan |
| Language, framework, version | Manifest or lockfile (`package.json`, `pubspec.lock`, `go.mod`, `Package.resolved`, `build.gradle*`, `.tool-versions`) | Memory of what is "usual" |
| "Run `npm test`" | The script exists, and you ran it or say you did not | A command copied from a similar project |
| Test count, coverage | Output of a run you executed, with date or commit | Counting test files by eye |
| CI behaviour | The workflow file **and** a recent run | A badge alone |
| Performance numbers | A benchmark you ran, with environment | Anything else. Prefer omitting |
| Roadmap | Issues, milestones, a roadmap file, or explicit input from the maintainer | Plausible next steps you imagined |
| Architecture | The import graph and directory structure you inspected | The pattern the folder names suggest |

## Language for uncertain or future things

Separate what is, what is planned and what is unknown:

| State | Wording |
|---|---|
| Implemented and verified | Plain present tense: "The client retries on 5xx." |
| Implemented, not verified by you | "Implemented in `src/retry.ts`; not exercised during this review." |
| Planned | "**Planned:**" prefix, and a source (issue, roadmap file) |
| Not implemented | Say so. An honest "not implemented yet" row beats a missing row |
| Unknown | Leave it out, or ask the maintainer |

Never present an inference as a fact. "Uses MVVM" is a claim; "ViewModels in `lib/features/*/` own screen state" is evidence.

## Commands

1. List every command the README will show.
2. Confirm each one exists (script in a manifest, a Makefile target, a documented CLI flag).
3. Run the safe ones: install, build, lint, test, `--help`. Do not run deploys, migrations against shared databases, or anything that publishes.
4. Record what you ran and the result for the pull request description.
5. For commands you could not run (missing toolchain, platform, credentials), keep them only if their source is clear, and say they were not executed.

## Badges and CI

- A CI badge must point at a workflow file that exists, for the branch shown, and you should have seen a recent run.
- Version badges come from the registry the project actually publishes to.
- No coverage badge without a coverage service configured.
- Shield badges with static text are statements; they follow the same evidence rules as prose.

## Things that never go in

- Invented features, screenshots of features that do not exist, fake metrics.
- Test or benchmark results that were not produced.
- Secrets, tokens, internal hostnames, personal data, real `.env` values — see [validation.md](validation.md#security-review).
- Claims about third-party behaviour without a link to its documentation.

## Keeping it true

- Prefer statements that age well: link to the file that holds a list instead of copying the list.
- Put dated facts in dated form: "Status on 2026-10-16".
- When the project changes, the README changes in the same pull request. A status table is a contract.
