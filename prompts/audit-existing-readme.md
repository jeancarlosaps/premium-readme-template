# Audit an existing README

> **For the person:** open your coding agent at the root of the project and paste:
>
> ```text
> Read https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/prompts/audit-existing-readme.md and audit this project's README.
> ```
>
> Everything below is written for the agent.

Audit the README of the repository in the current working directory against the Premium README standard. **An audit is not a redesign.** If the README is accurate and clear, say so and change little or nothing.

Load the guidelines first, as described in [step 1 of apply-to-project.md](apply-to-project.md#1-load-the-template). The [ground rules](apply-to-project.md#0-ground-rules) apply here too.

## Checklist

Work through each area. For every finding, record **file:line, problem, evidence, severity** (`error` = wrong or broken, `warn` = misleading or degraded, `note` = improvement).

| Area | What to check |
|---|---|
| Technical accuracy | Each feature, version, architecture statement and status against the code. See [technical-accuracy.md](../guidelines/technical-accuracy.md) |
| Freshness | Versions vs. manifests and lockfiles; removed scripts or folders still documented; status tables vs. issues |
| Commands | Each command exists; run the safe ones; flag ones that fail or were not run |
| Links | Run the validator for local links and anchors; spot-check external links |
| Badges | Each one points to something real and current; CI badges match existing workflows and branches |
| Assets | Files exist, are referenced, have alt text, are reasonably sized, are original |
| SVG | Validator checks; animation has a reduced-motion rule and a static twin |
| Mermaid | Each diagram renders on GitHub (view the page) and matches the code |
| Accessibility | Heading order, alt text quality, colour-only meaning, contrast, mobile width. See [accessibility.md](../guidelines/accessibility.md) |
| Visual quality | Hierarchy, consistency, noise (badge walls, emoji, decoration). See [visual-design.md](../guidelines/visual-design.md) |
| Security | Secrets, internal URLs, personal data. See the [security sweep](../guidelines/validation.md#security-review) |

Validator:

```bash
curl -fsSL https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/scripts/validate-readme.mjs -o /tmp/validate-readme.mjs
node /tmp/validate-readme.mjs .
```

## Then

1. Present the findings, grouped by severity, **before** changing anything.
2. With approval, fix `error` and `warn` items on a branch, keeping the existing structure and identity. Propose larger redesigns separately; apply them only if asked (then follow [apply-to-project.md](apply-to-project.md)).
3. Validate, review the diff, open a pull request as in [steps 7–9 of apply-to-project.md](apply-to-project.md#7-validate).

## Report

```text
README AUDIT — REPORT
Verdict:            <adequate | needs fixes | needs redesign>
Findings:           <n errors · n warnings · n notes>
Fixed:              <list, with files>
Not fixed:          <list, with reason>
Validations run:    <validator line · commands · pages viewed>
Limitations:        <what could not be verified and why>
PR:                 <URL or "none, no changes needed">
```
