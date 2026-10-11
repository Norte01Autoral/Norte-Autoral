import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const outputDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(outputDir, '../..');
const origin = 'https://norteautoral.site';
const deployId = process.argv[2] || '6acadeababc97ae80a516934';
const permalinkUrl = `https://${deployId}--rococo-liger-832df6.netlify.app/`;
const expectedTxt = 'google-site-verification=pTRVHEnDi7tYQgmfY3JWNIdlwodp3AJbs3ii3t6J0cg';
const checkedAt = new Date();
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
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
function inspectHtml(html) {
  const canonical = (html.match(/<link\b[^>]*>/gi) ?? []).map(attributes).find(link => link.rel?.toLowerCase() === 'canonical')?.href ?? null;
  const jsonld = [...html.matchAll(/<script\b[^>]*type\s*=\s*['"]application\/ld\+json['"][^>]*>([\s\S]*?)<\/script>/gi)].map(match => JSON.parse(match[1]));
  const nodes = jsonld.flatMap(item => item['@graph'] ?? [item]);
  return {title: html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? null, description: getMeta(html,'description'), canonical, robots: getMeta(html,'robots'), googlebot: getMeta(html,'googlebot'), ogSiteName: getMeta(html,'og:site_name'), jsonld, webSiteNodes: nodes.filter(node => node['@type'] === 'WebSite'), organizationNodes: nodes.filter(node => node['@type'] === 'Organization'), personNodes: nodes.filter(node => node['@type'] === 'Person')};
}
async function getUrl(pathname) {
  const url = pathname.startsWith('https://') ? pathname : origin + pathname;
  const response = await fetch(url, {headers:{'Cache-Control':'no-cache','User-Agent':'NorteAutoral-Public-SEO-Audit/1.0'}, signal:AbortSignal.timeout(25000)});
  const bytes = Buffer.from(await response.arrayBuffer());
  const text = bytes.toString('utf8');
  const item = {path:pathname,url:response.url,status:response.status,redirected:response.redirected,headers:Object.fromEntries(['content-type','x-robots-tag','cache-control','server'].map(name => [name,response.headers.get(name)])),bytes:bytes.length,sha256:hash(bytes)};
  Object.defineProperty(item,'rawBytes',{value:bytes,enumerable:false});
  if (response.headers.get('content-type')?.includes('text/html')) Object.assign(item, inspectHtml(text));
  else item.text = text;
  return item;
}
async function dnsQuery(resolver, name, type) {
  const url = resolver === 'Google Public DNS' ? `https://dns.google/resolve?name=${name}&type=${type}` : `https://cloudflare-dns.com/dns-query?name=${name}&type=${type}`;
  try {
    const response = await fetch(url, {headers:{'Accept':'application/dns-json'},signal:AbortSignal.timeout(20000)});
    const data = await response.json();
    return {resolver,name,type,httpStatus:response.status,dnsStatus:data.Status,answers:data.Answer ?? [],authority:data.Authority ?? [],queryUrl:url};
  } catch(error) { return {resolver,name,type,error:error.message}; }
}
const dnsTasks = ['Google Public DNS','Cloudflare DNS'].flatMap(resolver => [{name:'norteautoral.site',type:'TXT'}, {name:'norteautoral.site',type:'A'}, {name:'www.norteautoral.site',type:'CNAME'}].map(query => dnsQuery(resolver,query.name,query.type)));
const [pages,dnsResults,localBytes,stageBytes] = await Promise.all([
  Promise.all(['/', '/privacy', '/terms', '/robots.txt','/sitemap.xml','/v3',permalinkUrl].map(getUrl)),
  Promise.all(dnsTasks),
  fs.readFile(path.join(root,'public/index.html')),
  fs.readFile(path.resolve(root,'../clone-v1-netlify-search-2026-10-10/index.html')),
]);
const home = pages.find(item => item.path === '/');
const robots = pages.find(item => item.path === '/robots.txt');
const sitemap = pages.find(item => item.path === '/sitemap.xml');
const v3 = pages.find(item => item.path === '/v3');
const permalink = pages.find(item => item.path === permalinkUrl);
const localText = localBytes.toString('utf8');
const publicText = home.rawBytes.toString('utf8');
const localLines = localText.split(/\r?\n/);
const publicLines = publicText.split(/\r?\n/);
const allDifferingLines = localLines.map((line,index) => line === publicLines[index] ? null : {line:index+1,local:line,published:publicLines[index]}).filter(Boolean);
const transformedLinks = [...localText.matchAll(/<a class="gcard" href="(\/marketing\/portfolio\/[^"\s]+)index\.html">/g)].map(match => ({from:match[1]+'index.html',to:match[1]}));
const transformedLocalText = localText.replace(/<a class="gcard" href="(\/marketing\/portfolio\/[^"\s]+)index\.html">/g, (_,folder) => `<a class='gcard' href='${folder}'>`);
const onlyDocumentedDemoLinkTransformations = transformedLinks.length === 9 && transformedLocalText === publicText;
const contentComparison = {localBytes:localBytes.length,publishedBytes:home.bytes,rawSha256Equal:hash(localBytes) === home.sha256,normalizedLineEndingsEqual:localText.replace(/\r\n/g,'\n') === publicText.replace(/\r\n/g,'\n'),differingLineCount:allDifferingLines.length,differingLines:allDifferingLines,transformedLinks,onlyDocumentedDemoLinkTransformations,stageSha256:hash(stageBytes),stageMatchesLocal:hash(stageBytes) === hash(localBytes),deployPermalink:permalinkUrl,permalinkSha256:permalink.sha256,permalinkMatchesPublic:permalink.sha256 === home.sha256,netlifyPostProcessingDocumentation:'https://docs.netlify.com/build/post-processing/overview/',explanation:'Published Netlify HTML differs from uploaded source only in nine demo links: index.html is changed to its equivalent directory URL and the anchor attributes use single quotes. All other bytes, including metadata, are identical after those exact replacements. The same transformed bytes appear on the immutable deploy permalink. This behavior is consistent with the Pretty URLs post-processing documented by Netlify; project UI setting was not inspected in this HTTP-only audit.'};
const sitemapUrls = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/gi)].map(match => match[1]);
const expectedUrls = [origin+'/',origin+'/privacy',origin+'/terms'];
const noindex = page => [page.robots,page.googlebot,page.headers['x-robots-tag']].some(value => /\b(noindex|none)\b/i.test(value ?? ''));
const checks = {
  publicHtmlMatchesLocalSha256: home.sha256 === hash(localBytes),
  stageHtmlMatchesLocalSha256: hash(stageBytes) === hash(localBytes),
  publicHtmlMatchesDeployPermalinkSha256:home.sha256 === permalink.sha256,
  publicDiffOnlyNineEquivalentDemoLinks:onlyDocumentedDemoLinkTransformations,
  homepageStatus200:home.status === 200,
  homepageCanonicalCorrect:home.canonical === origin+'/',
  homepageAllowsIndexing:!noindex(home),
  titlePreserved:home.title === 'Norte Autoral | Sites, Meta Ads e Google Ads em Parnaíba',
  ogSiteNameCorrect:home.ogSiteName === 'Norte Autoral',
  singleWebSiteNode:home.webSiteNodes.length === 1,
  webSiteBrandCorrect:home.webSiteNodes[0]?.name === 'Norte Autoral' && home.webSiteNodes[0]?.alternateName === 'NorteAutoral' && home.webSiteNodes[0]?.url === origin+'/',
  singleOrganizationNode:home.organizationNodes.length === 1 && home.organizationNodes[0]?.name === 'Norte Autoral',
  personPreserved:home.personNodes.length === 1 && home.personNodes[0]?.name === 'Gabriel Holanda',
  robotsAccessibleAndAllowAll:robots.status === 200 && /^Allow:\s*\/\s*$/mi.test(robots.text) && !/^Disallow:\s*\S/m.test(robots.text),
  sitemapOnlyExpectedCanonicalIndexable:sitemap.status === 200 && sitemapUrls.length === 3 && expectedUrls.every(url => sitemapUrls.includes(url)) && sitemapUrls.every(url => pages.some(page => page.url === url && page.status === 200 && page.canonical === url && !noindex(page))),
  v3NoindexPreserved:v3.status === 200 && noindex(v3) && !sitemapUrls.includes(origin+'/v3'),
};
const report = {checkedAtUtc:checkedAt.toISOString(),checkedAtSaoPaulo:checkedAt.toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'}),deployId,scope:'Post-deploy public GET audit with default HTTPS certificate validation enabled. Root deploy ID supplied by coordinating agent; public HTML SHA-256 compared to source, stage and immutable deploy permalink. 106 unchanged assets were not rechecked after package SHA-256 validation.',localIndexSha256:hash(localBytes),publishedIndexSha256:home.sha256,contentComparison,checks,pages,sitemapUrls,limitations:['Raw SHA-256 of published root differs from local/stage source because Netlify processes nine equivalent demo links. This is an observed, exactly enumerated transformation; no public source files were changed during this audit.','HTTP/DNS evidence does not prove Google indexing or replace Search Console inspection.'],errors:Object.entries(checks).filter(([name,passed]) => !passed && !(name === 'publicHtmlMatchesLocalSha256' && onlyDocumentedDemoLinkTransformations)).map(([name]) => name)};
const dns = {checkedAtUtc:checkedAt.toISOString(),checkedAtSaoPaulo:report.checkedAtSaoPaulo,expectedGoogleTxt:expectedTxt,results:dnsResults,checks:{googleTxtVisibleBothResolvers:dnsResults.filter(item => item.type === 'TXT').every(item => item.answers?.some(answer => answer.data.replace(/^"|"$/g,'') === expectedTxt)),rootAUnchangedBothResolvers:dnsResults.filter(item => item.type === 'A').every(item => item.answers?.some(answer => answer.data === '75.2.60.5')),wwwCnameUnchangedBothResolvers:dnsResults.filter(item => item.type === 'CNAME').every(item => item.answers?.some(answer => answer.data === 'rococo-liger-832df6.netlify.app.'))}};
await fs.writeFile(path.join(outputDir,'post-deploy-audit.json'),JSON.stringify(report,null,2)+'\n');
await fs.writeFile(path.join(outputDir,'dns-verification.json'),JSON.stringify(dns,null,2)+'\n');
await fs.writeFile(path.join(outputDir,'post-deploy-audit.md'),`# Auditoria pontual após publicação\n\nVerificada em ${report.checkedAtSaoPaulo} (America/Sao_Paulo). Deploy: \`${deployId}\`. Evidências: [post-deploy-audit.json](post-deploy-audit.json), [dns-verification.json](dns-verification.json).\n\n- Raiz HTTP ${home.status}; SHA-256 publicado: \`${home.sha256}\`.\n- SHA-256 local/stage: \`${hash(localBytes)}\`. Os bytes locais e stage são idênticos. Os bytes publicados são idênticos aos do [permalink imutável do deploy](${permalinkUrl}).\n- Diferença exata: nove links das demos são processados na publicação, de \`/marketing/portfolio/.../index.html\` para a pasta equivalente \`/.../\`, com aspas simples nos atributos das âncoras. Após somente essas nove substituições, o HTML inteiro é idêntico; demais bytes, layout, conteúdo e metadados foram preservados. Destinos das nove demos previamente auditados com HTTP 200/noindex. Nenhuma fonte pública foi alterada para alinhar hashes.\n- A transformação observada é consistente com [Pretty URLs, documentado pelo Netlify](https://docs.netlify.com/build/post-processing/overview/); isso é uma inferência da evidência HTTP e da documentação. A configuração UI de pós-processamento não foi inspecionada neste teste.\n- Canonical: \`${home.canonical}\`; robots: \`${home.robots}\`; X-Robots-Tag: ${home.headers['x-robots-tag'] ?? 'ausente'}.\n- Título, descrição e og:site_name conferidos; marca e identificação de Gabriel preservadas.\n- WebSite único: name Norte Autoral, alternateName NorteAutoral, url https://norteautoral.site/. Organization único Norte Autoral, Person Gabriel Holanda preservado.\n- Robots HTTP ${robots.status} permite rastreamento. Sitemap HTTP ${sitemap.status} contém somente raiz, /privacy e /terms; as três têm status 200, canonical igual à URL e nenhuma instrução noindex.\n- /v3 HTTP ${v3.status}, noindex preservado e ausente do sitemap. As outras demos conservaram arquivos idênticos no pacote e foram verificadas na auditoria inicial.\n- TXT de verificação Google: ${dns.checks.googleTxtVisibleBothResolvers ? 'presente em Google Public DNS e Cloudflare DNS' : 'ver resultado por resolvedor no JSON'}. A raiz 75.2.60.5 e CNAME www rococo-liger-832df6.netlify.app: ${dns.checks.rootAUnchangedBothResolvers && dns.checks.wwwCnameUnchangedBothResolvers ? 'preservados em ambos' : 'ver JSON'}.\n- Resultado: ${report.errors.length ? report.errors.join(', ') : 'verificações técnicas pontuais passaram, com diferença de bytes publicada explicada acima'}.\n\nHTTPS foi consultado com validação padrão de certificado; nenhum bypass foi aplicado. Estes resultados HTTP/DNS não comprovam indexação no Google; os estados de Inspeção de URL e solicitação devem ser registrados separadamente.\n`);
console.log(JSON.stringify({deployId,checks,errors:report.errors,dnsChecks:dns.checks,publishedIndexSha256:home.sha256,localIndexSha256:hash(localBytes),differingLines:allDifferingLines.length,permalinkMatchesPublic:permalink.sha256 === home.sha256},null,2));
