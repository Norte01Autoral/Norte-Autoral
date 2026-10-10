import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../public');
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await walk(path); else files.push(path);
  }
}
await walk(root);
const missing = [];
let references = 0;
async function exists(path) {
  for (const candidate of [path, path + '.html', resolve(path, 'index.html')]) {
    try { if ((await stat(candidate)).isFile()) return true; } catch {}
  }
  return false;
}
for (const file of files.filter(path => ['.html', '.css'].includes(extname(path)))) {
  // O SVG de ruído inclui url(%23n) dentro de data URI; é uma referência
  // ao filtro do próprio SVG, não um arquivo a baixar.
  const source = (await readFile(file, 'utf8')).replace(/url\(\s*(["'])data:[\s\S]*?\1\s*\)/gi, 'url(data:)');
  const expressions = extname(file) === '.html'
    ? [/\b(?:src|poster)\s*=\s*["']([^"']+)["']/gi, /<link\b[^>]*href\s*=\s*["']([^"']+)["']/gi, /\burl\(\s*["']?([^"')\s]+)["']?\s*\)/gi]
    : [/\burl\(\s*["']?([^"')\s]+)["']?\s*\)/gi];
  for (const expression of expressions) {
    for (const match of source.matchAll(expression)) {
      const ref = match[1].replaceAll('&amp;', '&');
      if (/^(?:https?:|data:|blob:|mailto:|tel:|#|\/\/)/i.test(ref)) continue;
      const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
      const path = clean.startsWith('/') ? resolve(root, '.' + clean) : resolve(dirname(file), clean);
      if (!path.startsWith(root + sep) && path !== root) { missing.push({file, ref, reason:'fora da pasta public'}); continue; }
      references++;
      if (!await exists(path)) missing.push({ file: file.slice(root.length + 1), ref });
    }
  }
}
console.log(JSON.stringify({ files: files.length, htmlPages: files.filter(f => extname(f) === '.html').length, localReferences: references, missing }, null, 2));
if (missing.length) process.exitCode = 1;
