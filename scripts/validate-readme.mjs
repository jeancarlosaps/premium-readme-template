#!/usr/bin/env node
// Premium README validator — structural checks for README-style documentation.
//
// Zero dependencies, Node.js 18+. Works on any repository:
//
//   node validate-readme.mjs [root] [options]
//
// Options:
//   --require a,b,c     files that must exist (relative to root)
//   --templates a,b     directories whose Markdown may keep {{PLACEHOLDERS}} (default: templates)
//   --write-stills      regenerate *-still.svg from animated SVGs that use motion markers
//
// What it checks, and what it cannot check, is documented in guidelines/validation.md.

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
};
const flag = (name) => args.includes(name);
const valued = new Set(["--require", "--templates"]);
const positional = args.filter((arg, i) => !arg.startsWith("--") && !valued.has(args[i - 1]));

const root = path.resolve(positional[0] ?? ".");
const required = (option("--require") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const templateDirs = (option("--templates") ?? "templates").split(",").map((s) => s.trim().replace(/\/$/, "")).filter(Boolean);
const writeStills = flag("--write-stills");

const MOTION_BLOCK = /[ \t]*<!-- motion:start -->[\s\S]*?<!-- motion:end -->\r?\n?/;
const ANIMATED = /@keyframes|<animate\b|<animateTransform\b|<animateMotion\b|<set\b/;
const MERMAID_TYPES = /^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(-v2)?|erDiagram|journey|gantt|pie|quadrantChart|requirementDiagram|gitGraph|mindmap|timeline|sankey-beta|xychart-beta|block-beta|packet-beta|kanban|architecture-beta|radar-beta|C4Context|C4Container|C4Component|C4Dynamic|C4Deployment)\b/;
const IGNORED_DIRS = new Set([".git", "node_modules", "vendor", "Pods", "build", "dist", ".dart_tool", ".gradle", "target", ".next", "DerivedData"]);

const errors = [];
const warnings = [];
const error = (file, message) => errors.push(`${file}: ${message}`);
const warn = (file, message) => warnings.push(`${file}: ${message}`);
const stats = { markdown: 0, links: 0, anchors: 0, svgs: 0, mermaid: 0, stills: 0 };

// ---------------------------------------------------------------- files

function listFiles() {
  try {
    const out = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return [...new Set(out.split("\0").filter(Boolean))].filter((f) => existsSync(path.join(root, f)));
  } catch {
    const found = [];
    const walk = (dir) => {
      for (const entry of readdirSync(path.join(root, dir), { withFileTypes: true })) {
        if (IGNORED_DIRS.has(entry.name)) continue;
        const rel = dir ? `${dir}/${entry.name}` : entry.name;
        if (entry.isDirectory()) walk(rel);
        else found.push(rel);
      }
    };
    walk("");
    return found;
  }
}

const files = listFiles().map((f) => f.split(path.sep).join("/"));
const markdownFiles = files.filter((f) => /\.(md|mdc)$/i.test(f));
const isTemplate = (file) => templateDirs.some((dir) => file === dir || file.startsWith(`${dir}/`));
const read = (rel) => readFileSync(path.join(root, rel), "utf8");

// ---------------------------------------------------------------- markdown helpers

const FENCE = /^( {0,3})(`{3,}|~{3,})([^\n]*)\n([\s\S]*?)^\1\2[ \t]*$/gm;

function fencedBlocks(text) {
  return [...text.matchAll(FENCE)].map((m) => ({ info: m[3].trim().split(/\s+/)[0].toLowerCase(), body: m[4] }));
}

// Removes fenced blocks, inline code and HTML comments so examples are not mistaken for real links.
function prose(text) {
  return text
    .replace(FENCE, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/`[^`\n]+`/g, "");
}

// GitHub heading anchors (github-slugger algorithm, ATX headings only).
function slug(heading) {
  return heading
    .replace(/<[^>]+>/g, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|__|\*|~~)/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, "")
    .replace(/ /g, "-");
}

const anchorCache = new Map();
function anchorsOf(rel) {
  if (anchorCache.has(rel)) return anchorCache.get(rel);
  const text = read(rel);
  const ids = new Set();
  for (const m of text.matchAll(/<[a-z][^>]*\s(?:id|name)=["']([^"']+)["']/gi)) ids.add(m[1]);
  const seen = new Map();
  for (const m of text.replace(FENCE, "").matchAll(/^ {0,3}#{1,6}[ \t]+(.+?)[ \t#]*$/gm)) {
    const base = slug(m[1]);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    ids.add(count ? `${base}-${count}` : base);
  }
  anchorCache.set(rel, ids);
  return ids;
}

function linkTargets(text) {
  const targets = [];
  for (const m of text.matchAll(/!?\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^)]*["'])?\s*\)/g)) targets.push(m[1]);
  for (const m of text.matchAll(/^ {0,3}\[[^\]]+\]:\s*<?(\S+?)>?(?:\s|$)/gm)) targets.push(m[1]);
  for (const m of text.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)) targets.push(m[1]);
  for (const m of text.matchAll(/\ssrcset=["']([^"']+)["']/gi)) {
    for (const candidate of m[1].split(",")) targets.push(candidate.trim().split(/\s+/)[0]);
  }
  return targets.filter(Boolean);
}

const isExternal = (target) => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target);

function resolveTarget(file, target) {
  const clean = target.split("?")[0];
  const [relative, anchor] = clean.split("#");
  let resolved;
  if (!relative) resolved = file;
  else if (relative.startsWith("/")) resolved = path.posix.normalize(relative.slice(1));
  else resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), decodeURIComponent(relative)));
  return { resolved, anchor: anchor ? decodeURIComponent(anchor) : undefined };
}

// ---------------------------------------------------------------- stills (before link checks, so new twins resolve)

if (writeStills) {
  for (const svgFile of files.filter((f) => /\.svg$/i.test(f) && !/-still\.svg$/i.test(f))) {
    const svg = read(svgFile);
    if (!ANIMATED.test(svg) || !MOTION_BLOCK.test(svg)) continue;
    const stillFile = svgFile.replace(/\.svg$/i, "-still.svg");
    const still = svg.replace(MOTION_BLOCK, "");
    if (!existsSync(path.join(root, stillFile)) || read(stillFile) !== still) {
      writeFileSync(path.join(root, stillFile), still);
      console.log(`wrote ${stillFile}`);
    }
  }
}

// ---------------------------------------------------------------- markdown checks

const referencedSvgs = new Map(); // svg path -> markdown files referencing it
const stillSources = new Map(); // markdown file -> set of paths used in srcset

for (const file of markdownFiles) {
  stats.markdown++;
  const text = read(file);
  const body = prose(text);

  for (const target of linkTargets(body)) {
    if (isExternal(target)) continue;
    // Templates link to paths of the project they will be copied into; only same-file anchors are checkable.
    if (isTemplate(file) && !target.startsWith("#")) continue;
    const { resolved, anchor } = resolveTarget(file, target);
    const absolute = path.join(root, resolved);
    stats.links++;
    if (resolved.startsWith("..") || !existsSync(absolute)) {
      error(file, `broken local link → ${target}`);
      continue;
    }
    if (/\.svg$/i.test(resolved)) {
      if (!referencedSvgs.has(resolved)) referencedSvgs.set(resolved, new Set());
      referencedSvgs.get(resolved).add(file);
    }
    if (anchor && /\.(md|mdc)$/i.test(resolved) && statSync(absolute).isFile()) {
      stats.anchors++;
      if (!anchorsOf(resolved).has(anchor)) error(file, `missing anchor → ${target}`);
    }
  }

  const srcsets = new Set();
  for (const m of body.matchAll(/\ssrcset=["']([^"']+)["']/gi)) {
    for (const c of m[1].split(",")) srcsets.add(resolveTarget(file, c.trim().split(/\s+/)[0]).resolved);
  }
  stillSources.set(file, srcsets);

  for (const m of body.matchAll(/!\[([^\]]*)\]\(/g)) {
    if (!m[1].trim()) error(file, "Markdown image without alt text");
  }
  for (const m of body.matchAll(/<img\b[^>]*>/gi)) {
    const alt = m[0].match(/\salt=["']([^"']*)["']/i);
    if (!alt || !alt[1].trim()) error(file, `<img> without alt text → ${m[0].slice(0, 80)}`);
  }

  if (!isTemplate(file)) {
    for (const m of body.matchAll(/\{\{\s*[A-Za-z0-9_.\- ]+\s*\}\}/g)) error(file, `unresolved placeholder ${m[0]}`);
    if (/lorem ipsum/i.test(body)) error(file, "filler text (lorem ipsum)");
  }

  for (const block of fencedBlocks(text)) {
    if (block.info !== "mermaid") continue;
    stats.mermaid++;
    const lines = block.body.split("\n").map((l) => l.trim());
    let i = 0;
    if (lines[0] === "---") i = lines.indexOf("---", 1) + 1;
    const first = lines.slice(i).find((l) => l && !l.startsWith("%%"));
    if (!first || !MERMAID_TYPES.test(first)) error(file, `Mermaid block does not start with a known diagram type → "${first ?? ""}"`);
  }
}

// ---------------------------------------------------------------- svg checks

let xmllint = true;
try {
  execFileSync("xmllint", ["--version"], { stdio: "ignore" });
} catch {
  xmllint = false;
  warnings.push("xmllint not found: SVG well-formedness was NOT verified (install libxml2-utils)");
}

const viewBox = (svg) => svg.match(/<svg\b[^>]*\sviewBox=["']([^"']+)["']/)?.[1];

for (const [svgFile, sources] of referencedSvgs) {
  stats.svgs++;
  const svg = read(svgFile);
  const bytes = Buffer.byteLength(svg);

  if (xmllint) {
    try {
      execFileSync("xmllint", ["--noout", path.join(root, svgFile)], { stdio: ["ignore", "ignore", "pipe"] });
    } catch (e) {
      error(svgFile, `invalid XML\n${String(e.stderr ?? "").trim()}`);
    }
  }
  if (!/<svg\b/.test(svg)) error(svgFile, "no <svg> root element");
  if (!viewBox(svg)) warn(svgFile, "no viewBox: the image will not scale cleanly");
  if (!/<title\b[^>]*>[^<]+<\/title>/.test(svg)) error(svgFile, "missing <title> (accessible name)");
  if (!/role=["']img["']/.test(svg)) warn(svgFile, 'missing role="img" on the root element');
  if (/<script\b/i.test(svg)) error(svgFile, "contains <script>; GitHub will not run it and it is unsafe");
  if (/<foreignObject\b/i.test(svg)) error(svgFile, "contains <foreignObject>; rendering is unreliable on GitHub");
  if (/\son[a-z]+\s*=/i.test(svg)) error(svgFile, "contains event handler attributes");
  if (/<image\b[^>]*href=["']https?:/i.test(svg)) warn(svgFile, "embeds a remote image; it will not load when served as <img>");
  if (bytes > 1_000_000) error(svgFile, `${Math.round(bytes / 1024)} KB; keep README illustrations well under 1 MB`);
  else if (bytes > 300_000) warn(svgFile, `${Math.round(bytes / 1024)} KB; consider simplifying`);

  const animated = ANIMATED.test(svg);
  const isStill = /-still\.svg$/i.test(svgFile);
  if (isStill && animated) error(svgFile, "static fallback contains animation");
  if (!animated || isStill) continue;

  if (!/prefers-reduced-motion\s*:\s*reduce/.test(svg)) error(svgFile, "animated SVG without a prefers-reduced-motion: reduce rule");
  const stillFile = svgFile.replace(/\.svg$/i, "-still.svg");
  const expected = MOTION_BLOCK.test(svg) ? svg.replace(MOTION_BLOCK, "") : undefined;

  if (!existsSync(path.join(root, stillFile))) {
    error(svgFile, `animated SVG without static fallback ${stillFile}`);
    continue;
  }
  stats.stills++;
  const still = read(stillFile);
  if (viewBox(still) !== viewBox(svg)) error(stillFile, "viewBox differs from the animated version");
  if (expected !== undefined && still !== expected) {
    error(stillFile, `out of sync with ${path.posix.basename(svgFile)} (run with --write-stills)`);
  }
  for (const md of sources) {
    if (!stillSources.get(md)?.has(stillFile)) {
      warn(md, `uses animated ${svgFile} without a <picture> reduced-motion <source> for ${stillFile}`);
    }
  }
}

// ---------------------------------------------------------------- required files

for (const rel of required) {
  if (!existsSync(path.join(root, rel))) error(rel, "required file is missing");
}

// ---------------------------------------------------------------- report

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`error ${e}`);
const summary = `${stats.markdown} Markdown files · ${stats.links} local links · ${stats.anchors} anchors · ${stats.svgs} SVGs · ${stats.stills} static fallbacks · ${stats.mermaid} Mermaid blocks`;
if (errors.length) {
  console.log(`\nFAIL  ${errors.length} error(s), ${warnings.length} warning(s) — ${summary}`);
  process.exit(1);
}
console.log(`\nPASS  ${warnings.length} warning(s) — ${summary}`);
