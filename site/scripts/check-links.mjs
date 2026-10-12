// Verifies every internal href/src in dist/*.html resolves to a built file and every #anchor exists.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');

if (!existsSync(dist)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));
const idsByFile = new Map();
const idsOf = (file) => {
  if (!idsByFile.has(file)) {
    const html = readFileSync(file, 'utf8');
    idsByFile.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsByFile.get(file);
};

const resolveTarget = (pathname) => {
  let p = decodeURIComponent(pathname);
  if (!p.startsWith(base)) return null;
  p = p.slice(base.length);
  const candidates = [join(dist, p), join(dist, p, 'index.html'), join(dist, `${p}.html`)];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
};

const errors = [];
let checked = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const pagePath =
    '/' +
    relative(dist, file)
      .replace(/index\.html$/, '')
      .replace(/\.html$/, '');
  for (const [, attr, value] of html.matchAll(/\s(href|src|srcset)="([^"]*)"/g)) {
    const refs =
      attr === 'srcset' ? value.split(',').map((s) => s.trim().split(/\s+/)[0]) : [value];
    for (const ref of refs) {
      if (!ref || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(ref) || ref.startsWith('//'))
        continue;
      checked++;
      const u = new URL(ref, `http://x${base.slice(0, -1)}${pagePath}`);
      const target = ref.startsWith('#') ? file : resolveTarget(u.pathname);
      if (!target) {
        errors.push(`${relative(dist, file)}: broken link ${ref}`);
        continue;
      }
      if (u.hash && u.hash.length > 1 && target.endsWith('.html')) {
        const id = decodeURIComponent(u.hash.slice(1));
        if (!idsOf(target).has(id)) errors.push(`${relative(dist, file)}: missing anchor ${ref}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`✘ ${errors.length} broken link(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(
  `✓ Link check: ${checked} internal references across ${htmlFiles.length} pages OK (base ${base}).`,
);
