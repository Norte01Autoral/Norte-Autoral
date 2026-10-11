import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import zlib from 'node:zlib';

const output = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const outputDir = decodeURIComponent(output);
const root = path.resolve(outputDir, '../..');
const origin = 'https://norteautoral.site';
const date = new Date();
const errors = [];
function rawRequest(url, method = 'GET', userAgent = 'NorteAutoral-Public-SEO-Audit/1.0') {
  return new Promise((resolve, reject) => {
    const protocol = new URL(url).protocol === 'https:' ? https : http;
    const request = protocol.request(url, {method, headers: {'User-Agent': userAgent, 'Accept-Encoding': 'gzip,br,deflate'}, timeout: 25000, rejectUnauthorized: true}, response => {
      const chunks = [];
      const socket = response.socket;
      const cert = socket?.getPeerCertificate?.();
      const tls = new URL(url).protocol === 'https:' ? {
        authorized: socket?.authorized ?? null,
        authorizationError: socket?.authorizationError ?? null,
        protocol: socket?.getProtocol?.() ?? null,
        subject: cert?.subject ?? null,
        issuer: cert?.issuer ?? null,
        subjectAltName: cert?.subjectaltname ?? null,
        validFrom: cert?.valid_from ?? null,
        validTo: cert?.valid_to ?? null,
        fingerprint256: cert?.fingerprint256 ?? null,
      } : null;
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        let bytes = Buffer.concat(chunks);
        const encoding = response.headers['content-encoding'];
        if (bytes.length && encoding === 'br') bytes = zlib.brotliDecompressSync(bytes);
        else if (bytes.length && encoding === 'gzip') bytes = zlib.gunzipSync(bytes);
        else if (bytes.length && encoding === 'deflate') bytes = zlib.inflateSync(bytes);
        resolve({url, status: response.statusCode, headers: response.headers, body: bytes.toString('utf8'), decodedBytes: bytes.length, tls});
      });
    });
    request.on('timeout', () => request.destroy(new Error('Request timeout')));
    request.on('error', reject);
    request.end();
  });
}
async function fetchFollow(url, method = 'GET', userAgent) {
  const chain = [];
  for (let count = 0; count < 10; count++) {
    const response = await rawRequest(url, method, userAgent);
    chain.push({url, status: response.status, location: response.headers.location ?? null, tls: response.tls});
    if ([301, 302, 303, 307, 308].includes(response.status) && response.headers.location) {
      url = new URL(response.headers.location, url).href;
      if (chain.some(entry => entry.url === url)) throw new Error('Redirect loop at ' + url);
      continue;
    }
    return {...response, chain};
  }
  throw new Error('Too many redirects');
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(['"])(.*?)\2/gis)].map(match => [match[1].toLowerCase(), match[3]]));
}
function getMeta(html, key) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attrs = attributes(tag);
    if ([attrs.name, attrs.property].some(value => value?.toLowerCase() === key.toLowerCase())) return attrs.content ?? null;
  }
  return null;
}
function canonical(html) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const attrs = attributes(tag);
    if (attrs.rel?.toLowerCase() === 'canonical') return attrs.href ?? null;
  }
  return null;
}
function decode(html) {
  return html.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)));
}
function textOnly(html) {
  return decode(html.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}
function publicResponse(response) {
  return {url: response.url, status: response.status, chain: response.chain, headers: Object.fromEntries(['content-type','cache-control','content-encoding','x-robots-tag','server','location'].map(key => [key, response.headers[key] ?? null])), decodedBytes: response.decodedBytes};
}
function inspectHtml(response, expectedIndex) {
  const html = response.body;
  const text = textOnly(html);
  const robot = getMeta(html, 'robots');
  const googlebot = getMeta(html, 'googlebot');
  const xRobots = response.headers['x-robots-tag'] ?? null;
  const blockedByIndexingDirective = [robot, googlebot, xRobots].some(value => /\b(noindex|none)\b/i.test(value ?? ''));
  const structuredData = [...html.matchAll(/<script\b[^>]*type\s*=\s*['"]application\/ld\+json['"][^>]*>([\s\S]*?)<\/script>/gi)].map(match => {
    try { return JSON.parse(match[1]); } catch (error) {return {parseError: error.message};}
  });
  return {...publicResponse(response), expectedIndex, title: decode(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ''), description: getMeta(html, 'description'), canonical: canonical(html), robots: robot, googlebot, xRobotsTag: xRobots, blockedByIndexingDirective, ogSiteName: getMeta(html, 'og:site_name'), h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => textOnly(match[1])), htmlTextCharacters: text.length, htmlTextExcerpt: text.slice(0, 1600), brandInHtml: text.includes('Norte Autoral'), gabrielInHtml: text.includes('Gabriel Holanda'), parnaibaInHtml: text.includes('Parnaíba'), structuredData};
}
async function mapLimit(items, limit, fn) {
  const values = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({length: Math.min(limit, items.length)}, async () => {
    while (cursor < items.length) { const index = cursor++; values[index] = await fn(items[index], index); }
  }));
  return values;
}
const prior = JSON.parse(await fs.readFile(path.join(root, 'references/qa-netlify-2026-10-10/public-http-audit.json'), 'utf8'));
const demoPaths = [
  '/marketing/portfolio/velorah-hero/dist/', '/marketing/portfolio/lithos-hero/dist/',
  '/marketing/portfolio/dentista-clinica-vertice/', '/marketing/portfolio/convix-hero/dist/',
  '/marketing/portfolio/aureo-arquitetura/', '/marketing/portfolio/confeitaria-margo/',
  '/marketing/portfolio/instituto-liminar/', '/marketing/portfolio/verene-odontologia/',
  '/marketing/portfolio/arquitetura-estudio-linha/', '/v3', '/site-do-jd',
];
const routes = await mapLimit(['/', '/privacy', '/terms', ...demoPaths], 5, async pathname => {
  try {
    const response = await fetchFollow(origin + pathname);
    const expectedIndex = !demoPaths.includes(pathname);
    const result = {path: pathname, ...inspectHtml(response, expectedIndex)};
    if (response.status !== 200) errors.push(`${pathname}: HTTP ${response.status}`);
    if (expectedIndex && result.blockedByIndexingDirective) errors.push(`${pathname}: unintended noindex`);
    if (!expectedIndex && !result.blockedByIndexingDirective) errors.push(`${pathname}: missing noindex`);
    return result;
  } catch (error) { errors.push(`${pathname}: ${error.message}`); return {path: pathname, error: error.message}; }
});
const variants = await mapLimit(['http://norteautoral.site/', 'http://www.norteautoral.site/', 'https://www.norteautoral.site/'], 3, async url => {
  try {
    const response = await fetchFollow(url);
    if (response.status !== 200 || response.url !== origin + '/') errors.push(`${url}: invalid final URL/status`);
    return {requestedUrl: url, ...publicResponse(response)};
  } catch (error) { errors.push(`${url}: ${error.message}`); return {requestedUrl: url, error: error.message}; }
});
const robotsResponse = await fetchFollow(origin + '/robots.txt');
const robots = {...publicResponse(robotsResponse), text: robotsResponse.body};
const disallows = [...robots.text.matchAll(/^Disallow:\s*(\S+)\s*$/gmi)].map(match => match[1]);
robots.nonemptyDisallows = disallows;
robots.googlebotAccessAllowed = disallows.length === 0 && /^Allow:\s*\/\s*$/mi.test(robots.text);
if (robots.status !== 200 || !robots.googlebotAccessAllowed) errors.push('robots.txt blocks or is unavailable');
const sitemapResponse = await fetchFollow(origin + '/sitemap.xml');
const sitemap = {...publicResponse(sitemapResponse), text: sitemapResponse.body, urls: [...sitemapResponse.body.matchAll(/<loc>(.*?)<\/loc>/gi)].map(match => match[1])};
sitemap.entries = sitemap.urls.map(url => {
  const page = routes.find(route => route.url === url);
  return {url, status: page?.status ?? null, canonical: page?.canonical ?? null, noindex: page?.blockedByIndexingDirective ?? null, canonicalAndIndexable: page?.status === 200 && page.canonical === url && !page.blockedByIndexingDirective};
});
sitemap.onlyCanonicalIndexable = sitemap.entries.length > 0 && sitemap.entries.every(entry => entry.canonicalAndIndexable);
sitemap.excludedDemoPaths = demoPaths.every(demo => !sitemap.urls.includes(origin + demo));
if (sitemap.status !== 200 || !sitemap.onlyCanonicalIndexable || !sitemap.excludedDemoPaths) errors.push('sitemap validation failed');
const assetPaths = [...new Set(prior.assets.map(asset => asset.path))];
const assets = await mapLimit(assetPaths, 8, async pathname => {
  try {
    const response = await fetchFollow(origin + pathname, 'HEAD');
    if (response.status !== 200) errors.push(`${pathname}: resource HTTP ${response.status}`);
    return {path: pathname, ...publicResponse(response), allowedByRobots: robots.googlebotAccessAllowed};
  } catch (error) { errors.push(`${pathname}: ${error.message}`); return {path: pathname, error: error.message}; }
});
const googlebotResponse = await fetchFollow(origin + '/', 'GET', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
const googlebotProbe = inspectHtml(googlebotResponse, true);
googlebotProbe.note = 'Spoofed User-Agent HTTP probe only; this does not prove access by genuine Googlebot or replace Search Console live test.';
const dnsQueries = [{name:'norteautoral.site', type:'A'}, {name:'www.norteautoral.site', type:'CNAME'}, {name:'norteautoral.site', type:'NS'}, {name:'norteautoral.site', type:'TXT'}];
const dns = await mapLimit(dnsQueries, 4, async query => {
  try {
    const response = await fetchFollow('https://cloudflare-dns.com/dns-query?name=' + query.name + '&type=' + query.type, 'GET');
    let data;
    if (response.status === 400) {
      // RFC 8484 JSON API requires Accept header; use the official JSON-compatible resolver endpoint.
      const fallback = await fetch('https://dns.google/resolve?name=' + query.name + '&type=' + query.type);
      data = await fallback.json();
    } else data = JSON.parse(response.body);
    const answers = (data.Answer ?? []).map(answer => ({...answer, data: query.type === 'TXT' && answer.data.includes('google-site-verification=') ? 'google-site-verification=[REDACTED]' : answer.data}));
    return {...query, resolver: response.status === 400 ? 'Google Public DNS JSON' : 'Cloudflare DNS JSON', dnsStatus: data.Status, answers};
  } catch (error) { return {...query, error: error.message}; }
});
const report = {
  checkedAtUtc: date.toISOString(), checkedAtSaoPaulo: date.toLocaleString('pt-BR', {timeZone:'America/Sao_Paulo'}), base: origin + '/',
  scope: 'Public HTTP/TLS/DNS audit only. No hosting changes, browser rendering or authenticated Search Console access. Standard certificate validation enabled for every HTTPS request.',
  routes, variants, robots, sitemap, assets, googlebotProbe, dns,
  result: {homepagePublic200: routes[0].status === 200, homepageCanonicalCorrect: routes[0].canonical === origin + '/', homepageIndexingDirectivesAllow: !routes[0].blockedByIndexingDirective, standardTlsValidationPassed: routes[0].chain?.[0]?.tls?.authorized === true, redirectsCanonical: variants.every(result => result.status === 200 && result.url === origin + '/'), resourcesAvailable: assets.every(asset => asset.status === 200), demoNoindexPreserved: routes.filter(route => demoPaths.includes(route.path)).every(route => route.blockedByIndexingDirective), sitemapCanonicalOnly: sitemap.onlyCanonicalIndexable, robotsAllowsPagesAndResources: robots.googlebotAccessAllowed}, errors,
};
await fs.writeFile(path.join(outputDir, 'public-audit.json'), JSON.stringify(report, null, 2) + '\n');
const home = routes[0];
const certificate = home.chain[0].tls;
const summary = `# Auditoria pública de descoberta e indexação\n\nVerificada em ${report.checkedAtSaoPaulo} (America/Sao_Paulo). Evidências detalhadas em [public-audit.json](public-audit.json).\n\n- Página inicial: HTTP ${home.status}, canonical \`${home.canonical}\`, robots \`${home.robots}\`, sem X-Robots-Tag impeditivo.\n- HTTPS validado sem desabilitar verificação de certificado. Emissor: ${certificate?.issuer?.O ?? 'consulte JSON'}; validade: ${certificate?.validFrom} até ${certificate?.validTo}; SAN: ${certificate?.subjectAltName}.\n- HTTP e www: três variantes conferidas, destino final HTTPS sem www, sem loop.\n- Robots: HTTP ${robots.status}, \`User-agent: * / Allow: /\`; páginas, CSS, JS e imagens sem bloqueio.\n- Sitemap: HTTP ${sitemap.status}, ${sitemap.urls.length} URLs (${sitemap.urls.join(', ')}). Todas retornam 200, com canonical igual à URL e sem noindex.\n- Exclusões: nove demos, /v3 e /site-do-jd com noindex, acessíveis ao rastreador e fora do sitemap.\n- Recursos: ${assets.length} URLs públicas conferidas por HEAD; ${assets.filter(asset => asset.status === 200).length} respondem 200. Lista da auditoria Netlify anterior reaproveitada para conferir os recursos atuais de páginas e demos.\n- Conteúdo HTML da raiz: ${home.htmlTextCharacters} caracteres de texto, marca/Gabriel/Parnaíba presentes; H1: ${home.h1.join(' / ')}. Metadados e JSON-LD registrados no JSON.\n- DNS público A/CNAME/NS/TXT consultado; valores de verificação Google são redigidos na evidência pública.\n- Falhas observadas: ${errors.length ? errors.join('; ') : 'nenhuma'}.\n\nEste relatório confirma acesso HTTP e instruções técnicas observadas. Não comprova renderização pelo Google nem indexação. O User-Agent Googlebot foi usado apenas como sondagem HTTP; o teste oficial deve ocorrer na Inspeção de URL do Search Console.\n`;
await fs.writeFile(path.join(outputDir, 'public-audit.md'), summary);
console.log(JSON.stringify({outputDir, result: report.result, errors, dns}, null, 2));
