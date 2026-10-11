import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const qa = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(qa, '../..');
const deployId = process.argv[2];
if (!deployId || !/^[a-f0-9]{24}$/.test(deployId)) throw new Error('Pass the confirmed production deploy ID');
const base = 'https://norteautoral.site';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
async function get(url, crawler = 'Googlebot') {
  const r = await fetch(url, { headers: { 'User-Agent': crawler, 'Cache-Control': 'no-cache' }, signal: AbortSignal.timeout(25000) });
  const bytes = Buffer.from(await r.arrayBuffer());
  return { url: r.url, status: r.status, redirected: r.redirected, headers: Object.fromEntries(['content-type','x-robots-tag','cache-control'].map(k => [k,r.headers.get(k)])), sha256: sha(bytes), bytes };
}
const targets = [base+'/', base+'/assets/norte-autoral/favicon.png', base+'/assets/norte-autoral/favicon.ico', base+'/robots.txt', base+'/sitemap.xml', `https://${deployId}--rococo-liger-832df6.netlify.app/`];
const pages = await Promise.all(targets.map((url,i) => get(url, i===1 || i===2 ? 'Googlebot-Image' : 'Googlebot')));
const [home,png,ico,robots,sitemap,permalink] = pages;
const html = home.bytes.toString('utf8');
const source = await fs.readFile(path.join(root,'public/index.html'));
const stage = await fs.readFile(path.resolve(root,'../clone-v1-netlify-favicon-2026-10-10/index.html'));
const sourceHtml = source.toString('utf8');
const transformed = sourceHtml.replace(/<a\b[^>]*href="\/marketing\/portfolio\/[^"<>]*\/index\.html"[^>]*>/g, tag => tag.replace(/="([^"]*)"/g, (_, value) => "='"+value.replace(/\/index\.html$/, '/')+"'"));
const icons = [...html.matchAll(/<link\b[^>]*\brel="(?:icon|shortcut icon)"[^>]*>/g)].map(m => m[0]);
const checks = {
  homeHttp200: home.status === 200,
  sourceAndStageIdentical: sha(source) === sha(stage),
  publishedAndPermalinkIdentical: home.sha256 === permalink.sha256,
  publishedMatchesSourceWithDocumentedPrettyUrls: transformed === html,
  primaryPngDeclaration: icons[0] === '<link rel="icon" type="image/png" sizes="256x256" href="/assets/norte-autoral/favicon.png">',
  pngHttp200: png.status === 200,
  pngCorrectMime: png.headers['content-type']?.split(';')[0] === 'image/png',
  pngSquare256: png.bytes.length > 24 && png.bytes.readUInt32BE(16)===256 && png.bytes.readUInt32BE(20)===256,
  pngBytesUnchanged: png.sha256 === sha(await fs.readFile(path.join(root,'public/assets/norte-autoral/favicon.png'))),
  icoHttp200: ico.status === 200,
  iconsNoNoindexHeader: [png,ico].every(p => !/noindex/i.test(p.headers['x-robots-tag'] ?? '')),
  homeCanonicalPreserved: html.includes('<link rel="canonical" href="https://norteautoral.site/">'),
  homeIndexAllowed: html.includes('<meta name="robots" content="index, follow, max-image-preview:large">') && !/noindex/i.test(home.headers['x-robots-tag'] ?? ''),
  websiteNodePreserved: (html.match(/"@type": "WebSite"/g) ?? []).length===1 && html.includes('"alternateName": "NorteAutoral"'),
  robotsAllowsCrawling: robots.status===200 && robots.bytes.toString('utf8').includes('Allow: /') && !/^Disallow:\s*\S/m.test(robots.bytes.toString('utf8')),
  sitemapUnchanged: sitemap.status===200 && sitemap.sha256 === sha(await fs.readFile(path.join(root,'public/sitemap.xml')))
};
const report = { checkedAtUtc: new Date().toISOString(), deployId, changes: 'Only home favicon declarations; original N logo and all other public files preserved', icons, checks,
  errors: Object.entries(checks).filter(([,value])=>!value).map(([key])=>key),
  limitation: 'HTTP requests using crawler User-Agent values check accessibility, not actual Google crawling or favicon display. Google display has not been confirmed. Existing indexing request not repeated.',
  sourceIndexSha256: sha(source), publishedIndexSha256: home.sha256,
  requests: pages.map(({bytes,...p})=>({...p,bytes:bytes.length})),
  googleGuidance: 'https://developers.google.com/search/docs/appearance/favicon-in-search?hl=pt-br' };
await fs.writeFile(path.join(qa,'published-audit.json'), JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({ deployId,checks,errors:report.errors }));
if (report.errors.length) process.exitCode=1;
