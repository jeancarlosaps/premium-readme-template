<!--
  PREMIUM README — SECTION CATALOGUE
  Every section is optional. Keep a section only when the repository gives it real content.
  Each comment says when to include it. Delete the comments and every unused section.
  Replace every {{PLACEHOLDER}}. The validator fails on leftovers outside templates/.
  Rules: guidelines/technical-accuracy.md · guidelines/visual-design.md · guidelines/accessibility.md
-->

<a id="top"></a>

<!-- 01 · HERO — always. Animated hero + static twin. alt states the message, not "banner". -->
<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="docs/assets/readme/hero-still.svg" />
    <img src="docs/assets/readme/hero.svg" alt="{{PROJECT_NAME}} — {{PROPOSITION}}. {{WHAT_THE_HERO_SHOWS}}" width="1600" />
  </picture>
</p>

<!-- 02 · NAME AND PROPOSITION — always. One sentence of value, one of scope. -->
<h1 align="center">{{PROJECT_NAME}}</h1>

<p align="center">
  <strong>{{PROPOSITION}}</strong><br />
  {{ONE_SENTENCE_SCOPE}}
</p>

<!-- 03 · BADGES — only real signals: CI that exists, published version, licence, platform. Max five. Delete the block if none apply. -->
<p align="center">
  <a href="{{CI_WORKFLOW_URL}}"><img src="{{CI_BADGE_URL}}" alt="CI status on {{DEFAULT_BRANCH}}" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-{{LICENSE}}-{{ACCENT_HEX}}" alt="License: {{LICENSE}}" /></a>
</p>

<!-- 04 · NAVIGATION — when the README has four or more sections. 3–7 links, all anchors must exist. -->
<p align="center">
  <a href="#quick-start"><strong>QUICK START →</strong></a>
  &nbsp;·&nbsp;
  <a href="#architecture">ARCHITECTURE</a>
  &nbsp;·&nbsp;
  <a href="#status">STATUS</a>
  &nbsp;·&nbsp;
  <a href="CONTRIBUTING.md">CONTRIBUTE</a>
</p>

---

<!-- 05 · OVERVIEW — always. Problem, who it is for, what it does and does not do. No marketing superlatives. -->
## Overview

{{PROBLEM_AND_AUDIENCE}}

{{WHAT_IT_DOES_AND_DOES_NOT_DO}}

<!-- 06 · FEATURES — when features exist in code. Each row links to where it lives. Planned items say so. -->
<a id="status"></a>

## Features

| Feature | Status | Where |
|---|---|---|
| {{FEATURE}} | Done | `{{PATH}}` |
| {{FEATURE}} | Planned · {{ISSUE_LINK}} | — |

<!-- 07 · ARCHITECTURE — when there is structure worth explaining. Figure (SVG or Mermaid) + responsibilities table. -->
<a id="architecture"></a>

## Architecture

<p align="center">
  <img src="docs/assets/readme/architecture.svg" alt="{{ARCHITECTURE_ALT}}" width="1600" />
</p>

| Component | Responsibility | Lives in |
|---|---|---|
| {{COMPONENT}} | {{RESPONSIBILITY}} | `{{PATH}}` |

<!-- 08 · STACK — when choices are not obvious from the name. Versions from manifests/lockfiles. "Why" only if known. -->
## Stack

| Layer | Choice | Version |
|---|---|---|
| {{LAYER}} | {{CHOICE}} | {{VERSION_FROM_LOCKFILE}} |

<!-- 09 · DIRECTORY STRUCTURE — for apps and monorepos. Real tree, two or three levels, comments for non-obvious folders. -->
## Project structure

```text
{{REAL_TREE}}
```

<a id="quick-start"></a>

<!-- 10–13 · REQUIREMENTS, INSTALLATION, CONFIGURATION, RUNNING — merge into one section when short. Every command was run or is marked "not executed". -->
## Quick start

### Requirements

- {{TOOL}} {{VERSION}}

### Install

```bash
{{INSTALL_COMMANDS}}
```

### Configure

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `{{ENV_VAR}}` | {{YES_NO}} | `{{DEFAULT}}` | {{PURPOSE}} |

Copy `.env.example` to `.env` and fill it in. Never commit `.env`.

### Run

```bash
{{RUN_COMMAND}}
```

<!-- 14 · TESTS — when tests exist. Commands, what they cover, how many ran (with date or commit) if you ran them. -->
## Tests

| Command | What it does |
|---|---|
| `{{TEST_COMMAND}}` | {{WHAT_IT_COVERS}} |

<!-- 15 · CI/CD — only when workflow files exist. Describe what really runs. -->
## CI

The workflow [`{{WORKFLOW_PATH}}`]({{WORKFLOW_PATH}}) runs on {{EVENTS}}:

```text
{{STEP}} → {{STEP}} → {{STEP}}
```

<!-- 16 · ROADMAP — only with a real source (issues, milestones, ROADMAP.md, the maintainer). Never invented. -->
## Roadmap

| Milestone | Scope | Status | Source |
|---|---|---|---|
| {{MILESTONE}} | {{SCOPE}} | {{STATUS}} | {{LINK}} |

<!-- 17 · CONTRIBUTING — when outside contributions are welcome. Short version here, full flow in CONTRIBUTING.md. -->
## Contributing

{{SHORT_FLOW}} The full guide is in [CONTRIBUTING.md](CONTRIBUTING.md).

<!-- 18 · LICENSE — when a LICENSE file exists. -->
## License

{{LICENSE}}. See [LICENSE](LICENSE).

<!-- 19 · RELATED LINKS — sibling repositories, docs site, design files that are public. -->
## Links

- {{LINK_DESCRIPTION}}: <{{URL}}>

<p align="right"><a href="#top">Back to top ↑</a></p>
