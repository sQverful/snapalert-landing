// Post-build: promote default locale (en) from /en/* to root, so the site serves:
//   /<basePath>/          → English (was /en)
//   /<basePath>/ua        → Ukrainian
// /en paths are removed. /ua paths are unchanged.
//
// next-intl + static export requires localePrefix: 'always', so the [locale] dir
// structure always emits /en/*. This script rewrites the static output.

import {cpSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const OUT = 'out';
const DEFAULT_LOCALE = 'en';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

// 1. Copy en.html → index.html (overwrites the build-time redirect page)
cpSync(join(OUT, `${DEFAULT_LOCALE}.html`), join(OUT, 'index.html'));

// 2. Merge en/* contents into out/ root (privacy.html, terms.html, privacy/, terms/)
cpSync(join(OUT, DEFAULT_LOCALE), OUT, {recursive: true});

// 3. Remove the original /en paths (html, txt metadata, and dir)
rmSync(join(OUT, DEFAULT_LOCALE), {recursive: true, force: true});
rmSync(join(OUT, `${DEFAULT_LOCALE}.html`), {force: true});
rmSync(join(OUT, `${DEFAULT_LOCALE}.txt`), {force: true});

// 4. Rewrite all URL references in .html / .xml / .txt files.
//    Handles plain HTML attributes and JSON-escaped RSC hydration payloads.
//      {prefix}/en/  → {prefix}/          (nested paths, collapse double slash)
//      {prefix}/en<terminator> → {prefix}/<terminator>  (root, keep trailing slash)
//        where terminator ∈ ", #, ?, \ (escape char in JSON strings)
const replacements = [];
function buildLocalePatterns(prefix) {
  const esc = escapeRegex(`${prefix}/${DEFAULT_LOCALE}`);
  return [
    [new RegExp(`${esc}/`, 'g'), `${prefix}/`],
    [new RegExp(`${esc}(?=["#?\\\\])`, 'g'), `${prefix}/`],
  ];
}
if (BASE_PATH) replacements.push(...buildLocalePatterns(BASE_PATH));
if (SITE_URL) replacements.push(...buildLocalePatterns(SITE_URL));
// Also handle bare `/en` refs (no basePath) in RSC hydration payloads —
// Next.js stores Link hrefs pre-basePath, which it prepends at client runtime.
replacements.push(...buildLocalePatterns(''));

for (const file of walk(OUT)) {
  let content = readFileSync(file, 'utf8');
  let changed = false;
  for (const [re, to] of replacements) {
    const next = content.replace(re, to);
    if (next !== content) {
      content = next;
      changed = true;
    }
  }
  if (changed) writeFileSync(file, content);
}

console.log(`[postbuild] promoted /${DEFAULT_LOCALE}/* to root`);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (/\.(html|xml|txt)$/.test(p)) out.push(p);
  }
  return out;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
