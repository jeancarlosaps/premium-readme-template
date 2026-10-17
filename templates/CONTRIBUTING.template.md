# Contributing to {{PROJECT_NAME}}

<!-- Keep it short. Describe the flow the project really uses; remove anything that does not apply. -->

Thanks for helping. This guide covers how to propose a change and what a pull request needs.

## Flow

```text
issue → branch from {{DEFAULT_BRANCH}} → small commits → local checks → pull request → CI → review → merge
```

1. Open or pick an issue: {{ISSUE_TRACKER_LINK}}.
2. Create a branch from `{{DEFAULT_BRANCH}}`: `{{BRANCH_PATTERN}}`.
3. Keep the change focused. Unrelated findings become new issues.
4. Run the checks below.
5. Open a pull request using the template. A maintainer reviews it.

## Local checks

```bash
{{FORMAT_COMMAND}}
{{LINT_COMMAND}}
{{TEST_COMMAND}}
```

## Commits

{{COMMIT_CONVENTION}} <!-- e.g. "Conventional Commits: feat:, fix:, docs:, chore:, test:" -->

- One coherent change per commit.
- Stage files explicitly.
- Never commit secrets, `.env` files or personal configuration.

## Documentation

If your change affects behaviour, commands or status shown in the README, update the README in the same pull request.
