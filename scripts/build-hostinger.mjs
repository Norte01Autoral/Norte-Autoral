import { readFile, writeFile, mkdir, stat, readdir } from 'node:fs/promises';
import { resolve, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(projectRoot, 'public');
const origin = 'https://norteautoral.site';
const archivePath = resolve(projectRoot, '..', 'clone-v1-hostinger.zip');
const exclusionsPath = resolve(projectRoot, 'scripts/hostinger-exclusions.json');
const excludedPrefixes = JSON.parse(await readFile(exclusionsPath, 'utf8'));
if (!Array.isArray(excludedPrefixes) || excludedPrefixes.some(prefix => typeof prefix !== 'string' || !prefix.endsWith('/') || prefix.startsWith('/') || prefix.includes('..') || prefix.includes('\\') || prefix.length < 2)) {
  throw new Error('O manifesto de exclusões deve usar somente prefixos relativos de pastas públicas.');
}
const publicFiles = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = resolve(dir, entry.name);
    const rel = relative(publicRoot, file).replaceAll('\\', '/') + (entry.isDirectory() ? '/' : '');
    if (excludedPrefixes.some(prefix => rel.startsWith(prefix))) continue;
    if (entry.isDirectory()) await walk(file); else publicFiles.push(file);
  }
}
await walk(publicRoot);
for (const file of publicFiles.filter(file => ['.html', '.css', '.js', '.json', '.mjs'].includes(extname(file)))) {
  const source = await readFile(file, 'utf8');
  const expressions = [/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi, /\burl\(\s*["']?([^"')\s]+)["']?\s*\)/gi, /["'`]((?:\/|\.\.\/|\.\/)[^"'`\s<>]+)["'`]/g];
  for (const expression of expressions) for (const match of source.matchAll(expression)) {
    let target = match[1].replaceAll('&amp;', '&');
    if (target.startsWith(origin + '/')) target = new URL(target).pathname;
    if (/^(?:https?:|data:|blob:|mailto:|tel:|#|\/\/)/i.test(target)) continue;
    const clean = decodeURIComponent(target.split(/[?#]/)[0]);
    const resolved = clean.startsWith('/') ? resolve(publicRoot, '.' + clean) : resolve(dirname(file), clean);
    const path = relative(publicRoot, resolved).replaceAll('\\', '/');
    if (excludedPrefixes.some(prefix => path.startsWith(prefix))) {
      throw new Error(`Uma página ou recurso atual aponta para um arquivo histórico excluído: ${relative(publicRoot, file)} → ${path}`);
    }
  }
}
const requiredFiles = [
  'index.html', '.htaccess', 'robots.txt', 'sitemap.xml', '404.html',
  'privacy.html', 'terms.html', 'v3.html', 'site-do-jd.html',
  'assets/norte-autoral/og-norte-autoral.jpg',
];
for (const relative of requiredFiles) {
  if (!(await stat(resolve(publicRoot, relative))).isFile()) throw new Error(`Arquivo necessário ausente: ${relative}`);
}

const index = await readFile(resolve(publicRoot, 'index.html'), 'utf8');
const head = index.slice(0, index.indexOf('</head>'));
if (!head.includes(`<link rel="canonical" href="${origin}/">`)) throw new Error('Canonical principal não corresponde ao domínio configurado.');
if (!/<meta\s+name="robots"\s+content="index,\s*follow/i.test(head)) throw new Error('A página principal precisa estar liberada para indexação.');
if (!head.includes('Meta Ads') || !head.includes('Google Ads')) throw new Error('Os serviços de anúncios estão ausentes dos metadados.');
for (const match of head.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
const sitemap = await readFile(resolve(publicRoot, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const expectedUrls = ['/', '/trafego-pago/', '/automacao/', '/privacy', '/terms'].map(path => origin + path);
if (urls.length !== expectedUrls.length || expectedUrls.some(url => !urls.includes(url)) || urls.some(url => new URL(url).origin !== origin)) throw new Error('Sitemap inesperado para o domínio final.');
const robots = await readFile(resolve(publicRoot, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`) || /Disallow:\s*\/\s*$/m.test(robots)) throw new Error('robots.txt impede a configuração de produção.');
const demos = [
  'velorah-hero/dist', 'lithos-hero/dist', 'dentista-clinica-vertice',
  'convix-hero/dist', 'aureo-arquitetura', 'confeitaria-margo',
  'instituto-liminar', 'verene-odontologia', 'arquitetura-estudio-linha',
];
for (const demo of demos) {
  const html = await readFile(resolve(publicRoot, 'marketing/portfolio', demo, 'index.html'), 'utf8');
  if (!/<meta\s+name="robots"\s+content="noindex,\s*follow"/i.test(html.slice(0, html.indexOf('</head>')))) {
    throw new Error(`Template demonstrativo sem noindex: ${demo}`);
  }
}
const verification = spawnSync(process.execPath, [resolve(projectRoot, 'scripts/verify.mjs')], { encoding: 'utf8' });
if (verification.status !== 0) throw new Error(`Referências locais inválidas:\n${verification.stdout}\n${verification.stderr}`);
if (process.platform !== 'win32') throw new Error('O empacotador nativo desta cópia usa PowerShell no Windows. Os arquivos de public também podem ser compactados diretamente, com .htaccess incluído e index.html na raiz.');

console.log('Referências locais e SEO conferidos. Criando ZIP de hospedagem...');
const packed = spawnSync('powershell.exe', [
  '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass',
  '-File', resolve(projectRoot, 'scripts/package-hostinger.ps1'),
  '-PublicRoot', publicRoot, '-ArchivePath', archivePath,
  '-ExclusionsPath', exclusionsPath,
], { encoding: 'utf8', windowsHide: true });
if (packed.status !== 0) throw new Error(`Falha ao gerar ZIP:\n${packed.stdout}\n${packed.stderr}`);
const result = JSON.parse(packed.stdout.trim());
if (result.Entries !== publicFiles.length) throw new Error('O número de arquivos compactados difere do manifesto conferido.');
const reportPath = resolve(projectRoot, 'references/qa-release-2026-10-10/HOSTINGER-PACKAGE.json');
await mkdir(dirname(reportPath), { recursive: true });
await writeFile(reportPath, JSON.stringify({ domain: origin, ...result }, null, 2) + '\n');
await writeFile(archivePath + '.sha256', `${result.SHA256}  clone-v1-hostinger.zip\n`);
console.log(JSON.stringify({ domain: origin, ...result }, null, 2));
