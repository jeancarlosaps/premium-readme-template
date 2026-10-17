@AGENTS.md

## Claude Code notes

The line above imports [AGENTS.md](AGENTS.md), the single source of instructions for every agent. This file only adds what is specific to Claude Code.

**This file is loaded only when Claude Code runs inside this repository.** In any other project it is invisible. To use the template elsewhere, pick one:

| Option | How |
|---|---|
| Prompt by URL | In the target project: `Read https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/prompts/apply-to-project.md and apply it to this project.` Claude fetches the file and follows it. |
| Skill | Install [`.claude/skills/premium-readme/SKILL.md`](.claude/skills/premium-readme/SKILL.md) into `~/.claude/skills/premium-readme/` (see the README). Then say "Use the Premium README Template on this project" in any repository. |
| Local clone | Clone this repository, start Claude Code in the target project with `claude --add-dir ~/premium-readme-template`, and ask it to follow `prompts/apply-to-project.md` from that directory. |

When applying the standard:

- Use the browser tools you have to render the README on github.com after pushing; if none are available, say the visual check was not done.
- Use `gh` with `-R <owner>/<repo>` for every GitHub command, so the right repository is targeted.
