# Validation

Validation has two halves: a script for what can be checked mechanically, and a short manual pass for what only eyes can judge. Report both honestly in the pull request.

## The validator

[`scripts/validate-readme.mjs`](../scripts/validate-readme.mjs) is a single file with no dependencies. It needs Node.js 18 or newer and, for SVG well-formedness, `xmllint` (preinstalled on macOS; `libxml2-utils` on Debian/Ubuntu).

Run it in this repository:

```bash
node scripts/validate-readme.mjs
```

Run it in any other project, without adding it to that project:

```bash
curl -fsSL https://raw.githubusercontent.com/jeancarlosaps/premium-readme-template/main/scripts/validate-readme.mjs -o /tmp/validate-readme.mjs
node /tmp/validate-readme.mjs .
```

Options:

| Option | Effect |
|---|---|
| `[root]` | Directory to check (default: current directory) |
| `--require a,b` | Files that must exist |
| `--templates a,b` | Directories whose Markdown may keep `{{PLACEHOLDERS}}` (default: `templates`) |
| `--write-stills` | Regenerate `*-still.svg` from animated SVGs that use `<!-- motion:start -->` / `<!-- motion:end -->` markers |

Exit code `0` means no errors; warnings are printed but do not fail.

### What it checks

| Area | Check |
|---|---|
| Files | Markdown files tracked by Git (or all files when the folder is not a repository), `--require` list |
| Links | Every relative link, image, `href`, `src` and `srcset` in Markdown points to an existing file |
| Anchors | `file.md#anchor` and `#anchor` match a heading slug or an explicit `id` / `name` |
| Alt text | Markdown images and `<img>` tags have non-empty `alt` |
| Placeholders | No `{{PLACEHOLDER}}` or `lorem ipsum` outside template directories |
| Mermaid | Each block starts with a known diagram type |
| SVG (referenced from Markdown) | Well-formed XML (via `xmllint`), `<title>`, `role="img"`, `viewBox`, no `<script>`, `<foreignObject>` or event handlers, no remote images, size limits |
| Motion | Animated SVGs have a `prefers-reduced-motion: reduce` rule and a `-still.svg` twin with the same `viewBox` and no animation; with motion markers, the twin must equal the animated file minus the motion block; the Markdown should serve the twin through `<picture>` |

Links inside code blocks, inline code and HTML comments are ignored on purpose: they are examples.

### What it cannot check

- **Rendering.** It does not know how GitHub, a phone or dark mode will display the page.
- **Mermaid syntax** beyond the first line. A diagram can still fail to render.
- **External links.** URLs are not fetched (no network, no flakiness). Use a link checker such as `lychee` if you need it.
- **Truth.** It cannot tell whether a feature, command or number is real. That is [technical-accuracy.md](technical-accuracy.md).
- **Setext headings** (`Title` underlined with `===`) are not parsed for anchors. Use ATX headings (`#`).
- **Contrast** inside SVGs.

## Markdown lint

The repository also runs [markdownlint](https://github.com/DavidAnson/markdownlint) in CI with [`.markdownlint-cli2.jsonc`](../.markdownlint-cli2.jsonc). Rules that conflict with centred HTML heroes (inline HTML, first-line heading, line length) are disabled there with a comment explaining why. Locally:

```bash
npx --yes markdownlint-cli2@0.23.3
```

## Manual pass

Do these after pushing the branch, on the rendered page at `github.com/<owner>/<repo>/blob/<branch>/README.md`:

1. **Hero:** plays once, ends on the same frame as the still, nothing collides.
2. **Reduced motion:** enable it in the OS (or emulate `prefers-reduced-motion` in devtools) and reload; the still is shown.
3. **Themes:** check GitHub light and dark. Illustrations keep their own background; Mermaid nodes stay readable.
4. **Mobile:** 375 px wide. Navigation wraps cleanly, tables are readable, no essential text lives only in images.
5. **Mermaid:** every diagram renders (no "Unable to render rich display").
6. **Anchors:** click every navigation link.
7. **Commands:** the ones you ran match the ones you documented.

If you cannot view the page (private repository without access, no browser), say so in the report. Do not claim a visual check that did not happen.

## Security review

Before publishing, search the diff for:

- tokens, keys, passwords, certificates, `.env` files with real values;
- internal hostnames, private IPs, VPN or staging URLs;
- personal data (emails, phone numbers, addresses) that the project does not already publish;
- screenshots that show any of the above.

A quick sweep:

```bash
git diff --cached | grep -nEi '(api[_-]?key|secret|token|passw|BEGIN [A-Z ]*PRIVATE KEY|\.env)'
```

Treat a match as a question, not a verdict, and remove anything that should not be public.
