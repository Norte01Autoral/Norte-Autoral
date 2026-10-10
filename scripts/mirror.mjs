import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

// Rebuilds a bounded, local mirror from the captured public frontend sources.
// It does not crawl outbound links or contact the original form/analytics services.
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(project, 'public');
const sourceRoot = path.join(project, 'references', 'source');
const cacheRoot = path.join(project, 'references', 'assets-cache');
const manifestPath = path.join(project, 'references', 'assets-manifest.json');
const inventory = JSON.parse(await readFile(path.join(sourceRoot, 'inventory.json'), 'utf8'));
let bundles = [];
try { bundles = JSON.parse(await readFile(path.join(sourceRoot, 'bundle-inventory.json'), 'utf8')).bundles; } catch {}
const origin = 'https://www.sabec.dev';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const limits = { files: 500, perFileBytes: 100 * 1024 * 1024, totalBytes: 256 * 1024 * 1024, concurrency: 6 };
// Targeted regeneration avoids overwriting subsequent edits to other pages.
const onlyPaths = process.argv.filter(arg => arg.startsWith('--only=')).map(arg => arg.slice(7));
const shouldWrite = (relative) => !onlyPaths.length || onlyPaths.includes(relative);
const resources = new Map();
const pages = new Map();
let totalBytes = 0;
const sha = (data) => createHash('sha256').update(data).digest('hex');
const decode = (s) => s.replaceAll('&amp;', '&').replaceAll('&#38;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const quotedStrings = /(?:"((?:\\.|[^"\\\r\n])*)"|'((?:\\.|[^'\\\r\n])*)'|`((?:\\.|[^`\\\r\n])*)`)/g;
const isLocalOrigin = (u) => u.hostname === 'sabec.dev' || u.hostname === 'www.sabec.dev';
function normalize(value, base) {
  value = decode(value.trim());
  if (!value || /^(?:data:|blob:|javascript:|mailto:|tel:|#)/i.test(value)) return null;
  try {
    const u = new URL(value, base);
    if (!['http:', 'https:'].includes(u.protocol)) return null;
    if (isLocalOrigin(u)) { u.protocol = 'https:'; u.hostname = 'www.sabec.dev'; }
    u.hash = '';
    return u.href;
  } catch { return null; }
}
function localPath(url, kind = 'asset') {
  const u = new URL(url);
  if (isLocalOrigin(u)) {
    let pathname = decodeURIComponent(u.pathname);
    if (pathname === '/') return '/index.html';
    if (kind === 'page' && !path.posix.extname(pathname)) pathname += '.html';
    if (u.search) {
      const ext = path.posix.extname(pathname);
      pathname = pathname.slice(0, pathname.length - ext.length) + '-' + sha(url).slice(0, 12) + ext;
    }
    return pathname;
  }
  let ext = path.posix.extname(u.pathname);
  if (u.hostname === 'fonts.googleapis.com') ext = '.css';
  if (u.hostname === 'images.higgs.ai') ext = '.webp';
  if (u.hostname === 'images.unsplash.com') ext = '.jpg';
  if (!ext || ext.length > 8) ext = '.bin';
  const basename = path.posix.basename(u.pathname, path.posix.extname(u.pathname)).replace(/[^a-zA-Z0-9._-]/g, '-') || 'asset';
  return '/vendor/' + u.hostname + '/' + basename.slice(0, 100) + '-' + sha(url).slice(0, 12) + ext;
}
function safeDiskPath(relative) {
  const target = path.resolve(publicRoot, '.' + relative);
  if (!target.startsWith(publicRoot + path.sep)) throw new Error('Path outside public root: ' + relative);
  return target;
}
async function writePublic(relative, bytes) {
  const target = safeDiskPath(relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, bytes);
}
function add(value, base, kind, from) {
  const url = normalize(value, base);
  if (!url || pages.has(url) || resources.has(url)) return;
  if (resources.size >= limits.files) throw new Error('Mirror file limit exceeded');
  resources.set(url, { url, path: localPath(url), kind, from: [from], status: 'pending' });
}
function assetish(value) {
  return /\.(?:css|m?js|png|jpe?g|webp|avif|gif|svg|ico|mp4|webm|mov|woff2?|ttf|otf|eot|glb|gltf|json)(?:[?#].*)?$/i.test(value)
    || /^https:\/\/(?:fonts\.googleapis\.com\/css|images\.higgs\.ai\/|images\.unsplash\.com\/)/i.test(value);
}
function scanCss(text, base, from) {
  for (const match of text.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/gi)) {
    const value = match[1] ?? match[2] ?? match[3];
    if (/^(?:data:|#)/i.test(value) || value.includes('${')) continue;
    add(value, base, 'css-url', from);
  }
  for (const match of text.matchAll(/@import\s+(?:url\(\s*)?["']([^"']+)["']/gi)) add(match[1], base, 'css-import', from);
}
function scanJs(text, base, from) {
  for (const match of text.matchAll(quotedStrings)) {
    const value = match[1] ?? match[2] ?? match[3];
    if (value.includes('${') || !assetish(value)) continue;
    add(value, base, 'js-asset', from);
  }
  for (const match of text.matchAll(/(?:\bimport\s*(?:[^;\n]*?\bfrom\s*)?|\bexport\s+[^;\n]*?\bfrom\s*|\bimport\s*\()\s*["']([^"']+)["']/g)) {
    if (/^(?:\.|\/|https?:\/\/)/.test(match[1])) add(match[1], base, 'js-import', from);
  }
}
function scanHtml(text, base, from) {
  for (const match of text.matchAll(/<([a-z][\w:-]*)\b([^<>]*?)>/gi)) {
    const tag = match[1].toLowerCase(), attrs = match[2];
    const get = (name) => attrs.match(new RegExp('\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i'))?.slice(1).find(v => v !== undefined);
    for (const attribute of ['src', 'poster', 'data-src']) {
      const value = get(attribute);
      if (value) add(value, base, tag + '-' + attribute, from);
    }
    if (tag === 'link' && /(?:stylesheet|preload|modulepreload|icon)/i.test(get('rel') || '')) {
      const value = get('href');
      if (value) add(value, base, 'link-' + (get('rel') || ''), from);
    }
    if (tag === 'meta' && /(?:og:image|twitter:image)/i.test(get('property') || '')) {
      const value = get('content');
      if (value) add(value, base, 'meta-image', from);
    }
    const srcset = get('srcset');
    if (srcset && !srcset.startsWith('data:')) for (const item of srcset.split(',')) add(item.trim().split(/\s/)[0], base, 'srcset', from);
  }
  scanCss(text, base, from);
  for (const match of text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) scanJs(match[1], base, from);
}
function stripTrackingAndForm(text) {
  text = text.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs, body) => {
    if (/googletagmanager\.com|connect\.facebook\.net|Central WhatsApp Ads Conversion Tracking/.test(body)) return '<!-- Original analytics omitted in the local mirror. -->';
    return full;
  });
  // The home page combines contact tracking and visual behaviors in one script.
  text = text.replace(/\/\* ============ conversão:[\s\S]*?(?=\/\* ============ formulário)/i, '');
  text = text.replace(/\s*(?:var|const) ACCESS_KEY\s*=\s*['"][^'"]*['"];?/g, '');
  text = text.replace(/\s*access_key:\s*ACCESS_KEY\s*,/g, '');
  text = text.replaceAll('https://api.web3forms.com/submit', '/api/lead');
  text = text.replace("btn.textContent = 'Não foi. Tenta de novo?';", "btn.textContent = result.code === 'LOCAL_FORM_NOT_CONFIGURED' ? 'Configure seu envio' : 'Não foi. Tenta de novo?';");
  text = text.replace("btn.textContent = 'Erro. Tenta de novo?';", "btn.textContent = result.code === 'LOCAL_FORM_NOT_CONFIGURED' ? 'Configure seu envio' : 'Erro. Tenta de novo?';");
  text = text.replace(/^\s*if \(window\.(?:gtag|fbq)\).*;\s*$/gm, '');
  text = text.replace(/<link\b[^>]*\brel\s*=\s*["'](?:preconnect|dns-prefetch)["'][^>]*>\s*/gi, '');
  return text;
}
function localUrl(value, base) {
  const url = normalize(value, base);
  if (!url) return value;
  const record = resources.get(url);
  if (record) return record.path;
  const u = new URL(decode(value), base);
  if (isLocalOrigin(u)) return u.pathname + u.search + u.hash;
  return value;
}
function rewrite(text, base, isHtml) {
  // Replaces full external references without changing executable animation code.
  for (const record of resources.values()) {
    if (!isLocalOrigin(new URL(record.url))) {
      text = text.replaceAll(record.url, record.path).replaceAll(record.url.replaceAll('&', '&amp;'), record.path);
    }
  }
  if (isHtml) {
    text = text.replace(/\b(src|href|poster|data-src)\s*=\s*(["'])(.*?)\2/gi, (full, attr, quote, value) => attr + '=' + quote + localUrl(value, base) + quote);
    text = text.replace(/\bsrcset\s*=\s*(["'])(.*?)\1/gi, (full, quote, values) => {
      if (values.startsWith('data:')) return full;
      return 'srcset=' + quote + values.split(',').map(item => { const [u, ...descriptor] = item.trim().split(/\s+/); return [localUrl(u, base), ...descriptor].join(' '); }).join(', ') + quote;
    });
  }
  text = text.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/gi, (full, double, single, bare) => {
    const value = double ?? single ?? bare;
    // Template literals in the bundled React demos contain live expressions,
    // e.g. url(${image}) or url(${maskDataUrl}). Keep those expressions intact.
    if (/^(?:data:|#)/i.test(value) || value.includes('${')) return full;
    return 'url("' + localUrl(value, base) + '")';
  });
  if (!isHtml) {
    text = text.replace(quotedStrings, (full, double, single, template) => {
      const value = double ?? single ?? template;
      if (!assetish(value) || value.includes('${')) return full;
      return full[0] + localUrl(value, base) + full.at(-1);
    });
  }
  return text;
}
async function download(record) {
  const cacheFile = path.join(cacheRoot, sha(record.url) + '.bin');
  const cacheMeta = cacheFile + '.json';
  try {
    const [bytes, rawMeta] = await Promise.all([readFile(cacheFile), readFile(cacheMeta, 'utf8')]);
    const meta = JSON.parse(rawMeta);
    if (sha(bytes) === meta.sha256) {
      Object.assign(record, meta, { status: 'downloaded', cached: true, bytes: bytes.length, buffer: bytes });
      totalBytes += bytes.length;
      return;
    }
  } catch {}
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(record.url, { headers: { 'User-Agent': userAgent, 'Accept': '*/*' }, signal: AbortSignal.timeout(45000) });
      record.httpStatus = response.status;
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const expected = Number(response.headers.get('content-length'));
      if (expected > limits.perFileBytes) throw new Error('Resource exceeds per-file limit');
      const chunks = []; let length = 0;
      for await (const chunk of response.body) {
        length += chunk.length;
        if (length > limits.perFileBytes || length + totalBytes > limits.totalBytes) throw new Error('Download byte limit exceeded');
        chunks.push(chunk);
      }
      const bytes = Buffer.concat(chunks);
      const meta = { sha256: sha(bytes), bytes: bytes.length, contentType: response.headers.get('content-type'), finalUrl: response.url, httpStatus: response.status };
      totalBytes += bytes.length;
      Object.assign(record, meta, { status: 'downloaded', buffer: bytes, cached: false });
      await mkdir(cacheRoot, { recursive: true });
      await Promise.all([writeFile(cacheFile, bytes), writeFile(cacheMeta, JSON.stringify(meta))]);
      return;
    } catch (error) {
      record.error = error.message;
      if (record.httpStatus >= 400 && record.httpStatus < 500 && record.httpStatus !== 429) break;
    }
  }
  record.status = 'failed';
  console.error('Failed:', record.url, record.error);
}

await mkdir(publicRoot, { recursive: true });
for (const page of inventory.pages) {
  const url = normalize(page.url, origin);
  const source = await readFile(path.join(sourceRoot, page.localReference), 'utf8');
  pages.set(url, { url, path: localPath(url, 'page'), localReference: page.localReference, source, sourceSha256: sha(source) });
}
for (const page of pages.values()) scanHtml(stripTrackingAndForm(page.source), page.url, page.url);
for (const bundle of bundles) {
  add(bundle.url, origin, 'captured-bundle', bundle.url);
  // Minified JS contains escaped strings; supplement discovery from the public
  // bundle inspection so all media literals are included without broad crawling.
  for (const value of new Set([...(bundle.assetStrings || []), ...(bundle.absoluteUrls || [])])) {
    if (assetish(value)) add(value, bundle.url, 'captured-bundle-asset', bundle.url);
  }
}
// Captured bundles can be consumed directly and preserve the exact public build.
for (const bundle of bundles) {
  const record = resources.get(normalize(bundle.url, origin));
  if (!record) continue;
  const bytes = await readFile(path.join(sourceRoot, bundle.localReference));
  Object.assign(record, { buffer: bytes, bytes: bytes.length, sha256: sha(bytes), status: 'downloaded', httpStatus: 200, cached: true, contentType: bundle.url.endsWith('.css') ? 'text/css' : 'text/javascript', sourceReference: bundle.localReference });
}
while (true) {
  const pending = [...resources.values()].filter(r => r.status === 'pending');
  if (pending.length) {
    let position = 0;
    await Promise.all(Array.from({ length: Math.min(limits.concurrency, pending.length) }, async () => {
      while (position < pending.length) await download(pending[position++]);
    }));
  }
  const unscanned = [...resources.values()].filter(r => r.status === 'downloaded' && !r.scanned);
  for (const record of unscanned) {
    record.scanned = true;
    if (/\.css(?:\?|$)/i.test(record.url) || /text\/css/.test(record.contentType || '')) scanCss(record.buffer.toString('utf8'), record.url, record.url);
    else if (/\.m?js(?:\?|$)/i.test(record.url) || /javascript/.test(record.contentType || '')) scanJs(record.buffer.toString('utf8'), record.url, record.url);
  }
  if (![...resources.values()].some(r => r.status === 'pending')) break;
}
for (const record of resources.values()) {
  if (record.status !== 'downloaded') continue;
  const textual = /\.(?:css|m?js)(?:\?|$)/i.test(record.url) || /(?:text\/css|javascript)/.test(record.contentType || '');
  const bytes = textual ? Buffer.from(rewrite(record.buffer.toString('utf8'), record.url, false)) : record.buffer;
  if (shouldWrite(record.path)) await writePublic(record.path, bytes);
  const finalBytes = shouldWrite(record.path) ? bytes : await readFile(safeDiskPath(record.path));
  record.localBytes = finalBytes.length;
  record.localSha256 = sha(finalBytes);
}
for (const page of pages.values()) {
  const text = rewrite(stripTrackingAndForm(page.source), page.url, true);
  if (shouldWrite(page.path)) await writePublic(page.path, text);
  const finalBytes = shouldWrite(page.path) ? Buffer.from(text) : await readFile(safeDiskPath(page.path));
  page.localSha256 = sha(finalBytes);
  page.bytes = finalBytes.length;
}
const failures = [...resources.values()].filter(r => r.status === 'failed');
const manifest = {
  capturedAt: new Date().toISOString(), sourceOrigin: origin,
  strategy: 'Public frontend mirror with original CSS, JavaScript, animations, React builds and local assets.',
  limits, pages: [...pages.values()].map(({ source, ...page }) => page),
  resources: [...resources.values()].map(({ buffer, scanned, ...record }) => record),
  failures: failures.map(({ buffer, scanned, ...record }) => record),
  integrations: { analytics: 'Removed from local HTML', leadForms: '/api/lead (local unavailable response; original Web3Forms key removed)', outboundLinks: 'Preserved; third-party websites are not mirrored' },
  totals: { pages: pages.size, resources: resources.size, downloaded: resources.size - failures.length, failed: failures.length, sourceBytes: [...resources.values()].reduce((sum, r) => sum + (r.bytes || 0), 0) }
};
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(manifest.totals, null, 2));
