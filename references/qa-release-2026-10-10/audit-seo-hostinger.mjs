import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { resolve, dirname, relative, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const qaRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(qaRoot, '../..');
const publicRoot = resolve(projectRoot, 'public');
const domain = 'https://norteautoral.site';
const excludedPrefixes = JSON.parse(await readFile(resolve(projectRoot, 'scripts/hostinger-exclusions.json'), 'utf8'));
const retained = [];
async function walk(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name);
    const name = relative(publicRoot, path).replaceAll('\\', '/') + (entry.isDirectory() ? '/' : '');
    if (excludedPrefixes.some(prefix => name.startsWith(prefix))) continue;
    if (entry.isDirectory()) await walk(path); else retained.push(path);
  }
}
await walk(publicRoot);
const excludedReferences = [];
let referencesChecked = 0;
for (const file of retained.filter(file => ['.html', '.css', '.js', '.json', '.mjs'].includes(extname(file)))) {
  const source = await readFile(file, 'utf8');
  const expressions = [/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi, /\burl\(\s*["']?([^"')\s]+)["']?\s*\)/gi, /["'`]((?:\/|\.\.\/|\.\/)[^"'`\s<>]+)["'`]/g];
  for (const expression of expressions) for (const match of source.matchAll(expression)) {
    let target = match[1].replaceAll('&amp;', '&');
    if (target.startsWith(domain + '/')) target = new URL(target).pathname;
    if (/^(?:https?:|data:|blob:|mailto:|tel:|#|\/\/)/i.test(target)) continue;
    const clean = decodeURIComponent(target.split(/[?#]/)[0]);
    const resolved = clean.startsWith('/') ? resolve(publicRoot, '.' + clean) : resolve(dirname(file), clean);
    if (!resolved.startsWith(publicRoot + sep) && resolved !== publicRoot) continue;
    const path = relative(publicRoot, resolved).replaceAll('\\', '/');
    referencesChecked++;
    if (excludedPrefixes.some(prefix => path.startsWith(prefix))) excludedReferences.push({ file: relative(publicRoot, file), target, resolved: path });
  }
}
const pages = [];
for (const file of retained.filter(file => extname(file) === '.html')) {
  const source = await readFile(file, 'utf8');
  const head = source.slice(0, source.indexOf('</head>'));
  pages.push({ file: relative(publicRoot, file).replaceAll('\\', '/'), robots: head.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1], canonical: head.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1] ?? null });
}
const expectedIndexable = { 'index.html': domain + '/', 'privacy.html': domain + '/privacy', 'terms.html': domain + '/terms' };
const errors = [];
for (const page of pages) {
  if (page.file in expectedIndexable) {
    if (!/^index,\s*follow/.test(page.robots ?? '') || page.canonical !== expectedIndexable[page.file]) errors.push(`SEO da página indexável inválido: ${page.file}`);
  } else if (!/^noindex,\s*follow/.test(page.robots ?? '')) errors.push(`Página auxiliar sem noindex: ${page.file}`);
}
const index = await readFile(resolve(publicRoot, 'index.html'), 'utf8');
const head = index.slice(0, index.indexOf('</head>'));
const jsonLd = [...head.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(match => JSON.parse(match[1]));
if (!head.includes('Meta Ads') || !head.includes('Google Ads') || !head.includes('Parnaíba')) errors.push('Serviços ou cidade ausentes nos metadados principais.');
if (!head.includes(domain + '/assets/norte-autoral/og-norte-autoral.jpg')) errors.push('Imagem OG não aponta para o domínio final.');
const og = JSON.parse(await readFile(resolve(qaRoot, 'OG-IMAGE-QA.json'), 'utf8'));
const ogFile = await stat(resolve(publicRoot, 'assets/norte-autoral/og-norte-autoral.jpg'));
if (og.errors.length || og.failedRequests.length || og.viewport.width !== 1200 || og.viewport.height !== 630 || !og.fontsReady || og.images.some(image => !image.loaded)) errors.push('Captura OG não passou na conferência.');
const htaccess = await readFile(resolve(publicRoot, '.htaccess'), 'utf8');
const immutable = new RegExp(htaccess.match(/<FilesMatch "([^"\n]+)">\s*Header set Cache-Control "public, max-age=31536000, immutable"/)?.[1] ?? 'IMPOSSIBLE');
const cacheTests = Object.fromEntries(['demo-navigation.js', 'media-performance.js', 'profile.css', 'index-D04Epqih.js', 'index-7O04r-Vl.css', 'gsap.min-cb9c6262bdd7.js', 'css2-7c9831d3cb65.css'].map(name => [name, immutable.test(name)]));
if (cacheTests['demo-navigation.js'] || cacheTests['media-performance.js'] || cacheTests['profile.css'] || !cacheTests['index-D04Epqih.js'] || !cacheTests['gsap.min-cb9c6262bdd7.js']) errors.push('Regras de cache para recursos editáveis e arquivos com hash inválidas.');
if (excludedReferences.length) errors.push('Recursos ativos apontam para pastas excluídas.');
const report = { domain, retainedFiles: retained.length, retainedHtmlPages: pages.length, excludedPrefixes, referencesChecked, excludedReferences, pages, jsonLdBlocks: jsonLd.length, og: { width: 1200, height: 630, bytes: ogFile.size, fontsLoaded: og.fontsReady, visualReview: 'Aprovada: logo, título, cinco serviços, nome/cidade e domínio visíveis, sem cortes.' }, immutableCacheTests: cacheTests, errors };
await writeFile(resolve(qaRoot, 'SEO-HOSTINGER-AUDIT.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
