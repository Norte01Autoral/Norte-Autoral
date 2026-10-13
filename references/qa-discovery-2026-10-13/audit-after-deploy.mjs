import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import https from 'node:https';

// Read-only verification. Run only after the coordinating agent supplies a ready deploy ID.
// Usage: node references/qa-discovery-2026-10-13/audit-after-deploy.mjs DEPLOY_ID
const deployId=process.argv[2];
if(!/^[a-f0-9]{24}$/i.test(deployId ?? '')) {
  console.error('Provide the confirmed Netlify deploy ID as the first argument. No audit/report was executed.');
  process.exit(1);
}
const out=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(out,'../..');
const stage=path.resolve(root,'../publicacao-seo-ia-2026-10-13');
const origin='https://norteautoral.site';
const permalinkOrigin=`https://${deployId}--rococo-liger-832df6.netlify.app`;
const checkedAt=new Date();
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const norm=text=>text.replace(/\r\n/g,'\n').replace(/^\uFEFF/,'');
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(['"])(.*?)\2/gis)].map(m=>[m[1].toLowerCase(),m[3]]));
function textOnly(html) {
  return html.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
}
function inspectHtml(html) {
  const metas=(html.match(/<meta\b[^>]*>/gi) ?? []).map(attrs);
  const links=(html.match(/<link\b[^>]*>/gi) ?? []).map(attrs);
  const meta=name=>metas.find(item=>(item.name ?? item.property)?.toLowerCase()===name.toLowerCase())?.content ?? null;
  const structuredData=[...html.matchAll(/<script\b[^>]*type\s*=\s*['"]application\/ld\+json['"][^>]*>([\s\S]*?)<\/script>/gi)].map(m=>{try{return JSON.parse(m[1]);}catch(error){return {parseError:error.message};}});
  return {title:html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? null,description:meta('description'),robots:meta('robots'),googlebot:meta('googlebot'),canonical:links.find(item=>item.rel?.toLowerCase()==='canonical')?.href ?? null,ogSiteName:meta('og:site_name'),structuredData,nodes:structuredData.flatMap(item=>item['@graph'] ?? [item]),h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>textOnly(m[1])),htmlTextCharacters:textOnly(html).length,hasWhatsapp:html.includes('https://wa.me/5586999900235'),hasEmail:html.includes('mailto:contatonorteautoral@gmail.com'),anchors:(html.match(/<a\b[^>]*>/gi) ?? []).map(attrs).map(item=>item.href).filter(Boolean),icons:links.filter(item=>/\bicon\b/i.test(item.rel ?? ''))};
}
async function get(url,ua='NorteAutoral-Post-Deploy-Audit/1.0') {
  const requestedUrl=url.startsWith('http') ? url : origin+url;
  const chain=[];
  let current=requestedUrl;
  for(let i=0;i<10;i++) {
    const response=await fetch(current,{redirect:'manual',headers:{'User-Agent':ua,'Cache-Control':'no-cache'},signal:AbortSignal.timeout(25000)});
    const location=response.headers.get('location');
    chain.push({url:current,status:response.status,location});
    if([301,302,303,307,308].includes(response.status) && location) {
      current=new URL(location,current).href;
      await response.body?.cancel();
      if(chain.some(item=>item.url===current)) throw new Error('Redirect loop');
      continue;
    }
    const bytes=Buffer.from(await response.arrayBuffer());
    const item={requestedUrl,url:current,ua,status:response.status,chain,bytes:bytes.length,sha256:sha(bytes),headers:Object.fromEntries(['content-type','x-robots-tag','cache-control','server','cf-mitigated','www-authenticate'].map(name=>[name,response.headers.get(name)]))};
    Object.defineProperty(item,'raw',{value:bytes,enumerable:false});
    if(item.headers['content-type']?.includes('text/html')) Object.assign(item,inspectHtml(bytes.toString('utf8')));
    else if(item.headers['content-type']?.match(/text\/plain|xml/)) item.text=bytes.toString('utf8');
    return item;
  }
  throw new Error('Too many redirects');
}
const safeGet=async(url,ua)=>{try{return await get(url,ua);}catch(error){return {requestedUrl:url.startsWith('http') ? url : origin+url,ua,error:error.message};}};
async function mapLimit(items,limit,fn) {
  const results=new Array(items.length);let cursor=0;
  await Promise.all(Array.from({length:Math.min(limit,items.length)},async()=>{while(cursor<items.length){const i=cursor++;results[i]=await fn(items[i],i);}}));
  return results;
}
function allObjects(value) {
  if(!value || typeof value!=='object') return [];
  return [value,...Object.values(value).flatMap(allObjects)];
}
const hasType=(node,type)=>node['@type']===type || Array.isArray(node['@type']) && node['@type'].includes(type);
const directives=item=>[item.robots,item.googlebot,item.headers?.['x-robots-tag']].filter(Boolean).join(',');
const noindex=item=>/\b(noindex|none)\b/i.test(directives(item));
const nosnippet=item=>/\bnosnippet\b|\bmax-snippet\s*:\s*0\b/i.test(directives(item));
const mainPaths=['/','/trafego-pago/','/automacao/'];
const canonicalPaths=[...mainPaths,'/privacy','/terms'];
const demoPaths=['/marketing/portfolio/velorah-hero/dist/','/marketing/portfolio/lithos-hero/dist/','/marketing/portfolio/dentista-clinica-vertice/','/marketing/portfolio/convix-hero/dist/','/marketing/portfolio/aureo-arquitetura/','/marketing/portfolio/confeitaria-margo/','/marketing/portfolio/instituto-liminar/','/marketing/portfolio/verene-odontologia/','/marketing/portfolio/arquitetura-estudio-linha/','/v3','/site-do-jd'];
const botNames=['Googlebot','OAI-SearchBot','bingbot','PerplexityBot'];
const indexNowConfig=JSON.parse(await fs.readFile(path.join(out,'indexnow-config.json'),'utf8'));
const proofUrl=new URL(indexNowConfig.keyLocation);
if(proofUrl.origin!==origin || !/^\/[a-f0-9]+\.txt$/i.test(proofUrl.pathname)) throw new Error('Invalid public proof location in config');
const proofSource=await fs.readFile(path.join(root,'public',proofUrl.pathname.slice(1)));
const fontCssPath='/vendor/fonts.googleapis.com/css2-7c9831d3cb65.css';
const fontCss=await fs.readFile(path.join(root,'public',fontCssPath.slice(1)),'utf8');
const fontPaths=[...new Set([...fontCss.matchAll(/url\(["']?(\/vendor\/fonts\.gstatic\.com\/[^"')]+)["']?\)/g)].map(m=>m[1]))];
const assetPaths=[...new Set(['/assets/norte-autoral/servicos.css','/assets/norte-autoral/profile.css',fontCssPath,...fontPaths,'/assets/norte-autoral/favicon.png','/assets/norte-autoral/favicon.ico','/assets/norte-autoral/logo-n-128.png','/assets/norte-autoral/logo-n.png','/assets/norte-autoral/gabriel-holanda.webp','/assets/norte-autoral/og-norte-autoral.jpg','/assets/media-performance.js','/vendor/cdn.jsdelivr.net/gsap.min-bf5b26673eee.js','/vendor/cdn.jsdelivr.net/ScrollTrigger.min-8275e947aa32.js','/vendor/cdn.jsdelivr.net/lenis.min-273ca89be0ce.js'])];
const tlsPromise=new Promise((resolve,reject)=>{
  const req=https.request(origin+'/',{method:'HEAD',rejectUnauthorized:true,timeout:25000},res=>{const cert=res.socket.getPeerCertificate();const result={authorized:res.socket.authorized,authorizationError:res.socket.authorizationError ?? null,protocol:res.socket.getProtocol(),subject:cert.subject,issuer:cert.issuer,subjectAltName:cert.subjectaltname,validFrom:cert.valid_from,validTo:cert.valid_to};res.resume();res.on('end',()=>resolve(result));});
  req.on('error',reject);req.on('timeout',()=>req.destroy(new Error('TLS timeout')));req.end();
});
const [pages,assets,botProbes,permalinks,redirects,proof,tls]=await Promise.all([
  mapLimit([...canonicalPaths,'/robots.txt','/sitemap.xml',...demoPaths],6,url=>safeGet(url)),
  mapLimit(assetPaths,8,url=>safeGet(url)),
  mapLimit(botNames.flatMap(ua=>mainPaths.map(url=>({url,ua}))),6,item=>safeGet(item.url,item.ua)),
  Promise.all(mainPaths.map(url=>safeGet(permalinkOrigin+url))),
  Promise.all(['http://norteautoral.site/','http://www.norteautoral.site/','https://www.norteautoral.site/','/trafego-pago/index.html','/automacao/index.html'].map(url=>safeGet(url))),
  safeGet(proofUrl.href),tlsPromise.catch(error=>({error:error.message})),
]);
const home=pages.find(item=>item.requestedUrl===origin+'/');
const robots=pages.find(item=>item.requestedUrl===origin+'/robots.txt');
const sitemap=pages.find(item=>item.requestedUrl===origin+'/sitemap.xml');
const sitemapUrls=[...((sitemap.text ?? '').matchAll(/<loc>(.*?)<\/loc>/gi))].map(m=>m[1]);
const robotsText=robots.text ?? '';
const robotsAllowAll=robots.status===200 && /^User-agent:\s*\*\s*$/mi.test(robotsText) && /^Allow:\s*\/\s*$/mi.test(robotsText) && !/^Disallow:\s*\S/m.test(robotsText);
const sourceComparisons=await Promise.all(mainPaths.map(async pagePath=>{
  const page=pages.find(item=>item.requestedUrl===origin+pagePath);
  const deployed=permalinks.find(item=>item.requestedUrl===permalinkOrigin+pagePath);
  const file=pagePath==='/' ? 'index.html' : pagePath.slice(1)+'index.html';
  const local=await fs.readFile(path.join(root,'public',file));
  const staged=await fs.readFile(path.join(stage,file)).catch(()=>null);
  const localText=local.toString('utf8');
  const publicText=page.raw?.toString('utf8') ?? '';
  const normalizedLocal=norm(localText),normalizedPublic=norm(publicText);
  const knownHomeTransform=normalizedLocal.replace(/<a class="gcard" href="(\/marketing\/portfolio\/[^"\s]+)index\.html">/g,(_,folder)=>`<a class='gcard' href='${folder}'>`);
  const localLines=normalizedLocal.split('\n'),publicLines=normalizedPublic.split('\n');
  const changes=localLines.map((line,i)=>line===publicLines[i] ? null : {line:i+1,local:line,published:publicLines[i]}).filter(Boolean);
  return {path:pagePath,localSha256:sha(local),stageSha256:staged ? sha(staged) : null,publishedSha256:page.sha256,permalinkSha256:deployed?.sha256,stageEqualsLocal:staged ? sha(staged)===sha(local) : false,rawSourceEqualsPublished:sha(local)===page.sha256,normalizedSourceEqualsPublished:normalizedLocal===normalizedPublic,onlyKnownHomeDemoLinkProcessing:pagePath==='/' && knownHomeTransform===normalizedPublic,seoMetadataEqual:JSON.stringify(inspectHtml(localText).nodes)===JSON.stringify(page.nodes) && inspectHtml(localText).title===page.title && inspectHtml(localText).description===page.description && inspectHtml(localText).canonical===page.canonical,headNormalizedEqual:norm(localText.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '')===norm(publicText.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? ''),htmlCopyEqual:textOnly(localText)===textOnly(publicText),publicEqualsPermalink:page.sha256===deployed?.sha256,changedLineCount:changes.length,changedLines:changes.slice(0,15)};
}));
const serviceChecks=mainPaths.slice(1).map(pagePath=>{
  const page=pages.find(item=>item.requestedUrl===origin+pagePath);
  const services=(page.nodes ?? []).filter(node=>hasType(node,'Service'));
  const breadcrumbs=(page.nodes ?? []).filter(node=>hasType(node,'BreadcrumbList'));
  const service=services[0] ?? {};
  const providerId=service.provider?.['@id'];
  const provider=(page.nodes ?? []).find(node=>hasType(node,'Organization') && node['@id']===providerId);
  const rootProvider=(home.nodes ?? []).find(node=>hasType(node,'Organization') && node['@id']===providerId);
  const list=breadcrumbs[0]?.itemListElement ?? [];
  const webpage=(page.nodes ?? []).find(node=>hasType(node,'WebPage'));
  const checks={serviceUnique:services.length===1,serviceIdAndUrlCorrect:service['@id']===origin+pagePath+'#servico' && service.url===origin+pagePath,serviceReadableFields:!!service.name && !!service.serviceType && !!service.description && !!service.areaServed,providerIdCorrect:providerId===origin+'/#negocio',providerResolves:provider?.name==='Norte Autoral' && rootProvider?.name==='Norte Autoral',breadcrumbUnique:breadcrumbs.length===1,breadcrumbItemsCorrect:list.length===2 && list.every((item,i)=>hasType(item,'ListItem') && item.position===i+1 && !!item.name) && list[0]?.item===origin+'/' && list[1]?.item===origin+pagePath,webpageReferencesResolve:webpage?.mainEntity?.['@id']===service['@id'] && webpage?.breadcrumb?.['@id']===breadcrumbs[0]?.['@id']};
  return {path:pagePath,service,breadcrumb:breadcrumbs[0] ?? null,checks,allPassed:Object.values(checks).every(Boolean)};
});
for(const asset of assets) {
  const relativePath=asset.requestedUrl.startsWith(origin) ? new URL(asset.requestedUrl).pathname.slice(1) : null;
  const local=relativePath ? await fs.readFile(path.join(root,'public',relativePath)).catch(()=>null) : null;
  asset.matchesLocalSha256=local ? sha(local)===asset.sha256 : false;
  asset.allowedByRobots=robotsAllowAll;
  if(asset.requestedUrl===origin+'/assets/norte-autoral/favicon.png' && asset.raw?.length>=24 && asset.raw.readUInt32BE(0)===0x89504e47) asset.pngDimensions={width:asset.raw.readUInt32BE(16),height:asset.raw.readUInt32BE(20)};
}
const before=JSON.parse(await fs.readFile(path.join(out,'public-audit.json'),'utf8'));
const oldFavicon=before.assets?.find(item=>item.requestUrl===origin+'/assets/norte-autoral/favicon.png');
const favicon=assets.find(item=>item.requestedUrl===origin+'/assets/norte-autoral/favicon.png');
const sitemapEntries=sitemapUrls.map(url=>{const page=pages.find(item=>item.url===url);return {url,status:page?.status,canonical:page?.canonical,noindex:noindex(page ?? {}),canonicalAndIndexable:page?.status===200 && page.canonical===url && !noindex(page)};});
const canonicalChecks=canonicalPaths.map(pagePath=>{
  const page=pages.find(item=>item.requestedUrl===origin+pagePath);
  return {path:pagePath,status:page?.status,url:page?.url,canonical:page?.canonical,robots:page?.robots,xRobotsTag:page?.headers?.['x-robots-tag'],direct200:page?.status===200 && page?.chain?.length===1 && page.url===origin+pagePath,canonicalSelf:page?.canonical===origin+pagePath,indexingAllowed:!noindex(page ?? {}),snippetAllowed:!nosnippet(page ?? {}),htmlReadable:page?.htmlTextCharacters>300,h1Present:!!page?.h1?.length,contactLinks:mainPaths.includes(pagePath) ? page?.hasWhatsapp && page?.hasEmail : null};
});
const nestedHomeServices=allObjects(home.structuredData).filter(node=>hasType(node,'Service'));
const proofChecks={status200:proof.status===200,directCanonicalLocation:proof.url===proofUrl.href && proof.chain?.length===1,bodyExact:proof.raw?.equals(proofSource) ?? false,textPlain:/^text\/plain/i.test(proof.headers?.['content-type'] ?? ''),noindex:/\bnoindex\b/i.test(proof.headers?.['x-robots-tag'] ?? ''),outsideSitemap:!sitemapUrls.includes(proofUrl.href),accessibleByRobots:robotsAllowAll};
const checks={tlsValidated:tls.authorized===true,canonicalPagesDirect200:canonicalChecks.every(item=>item.direct200),canonicalSelfAndIndexing:canonicalChecks.every(item=>item.canonicalSelf && item.indexingAllowed && item.snippetAllowed),mainHtmlH1ContactReadable:canonicalChecks.filter(item=>mainPaths.includes(item.path)).every(item=>item.htmlReadable && item.h1Present && item.contactLinks),serviceAndBreadcrumbFields:serviceChecks.every(item=>item.allPassed),homeCatalogServicesLinked:mainPaths.slice(1).every(pagePath=>nestedHomeServices.some(node=>node.url===origin+pagePath && node.provider?.['@id']===origin+'/#negocio')),homeAnchorsNewServices:mainPaths.slice(1).every(pagePath=>home.anchors?.includes(pagePath)),sitemapExactlyFiveCanonicalUrls:sitemap.status===200 && sitemapUrls.length===canonicalPaths.length && canonicalPaths.every(pagePath=>sitemapUrls.includes(origin+pagePath)) && sitemapEntries.every(item=>item.canonicalAndIndexable),robotsAllowAll:robotsAllowAll,robotsUnchangedFromSource:norm(robotsText)===norm(await fs.readFile(path.join(root,'public/robots.txt'),'utf8')),demos200NoindexExcluded:demoPaths.every(pagePath=>pages.some(item=>item.requestedUrl===origin+pagePath && item.status===200 && noindex(item) && !sitemapUrls.includes(item.url))),botsThreeMainPages200:botProbes.length===12 && botProbes.every(item=>item.status===200 && !noindex(item) && !nosnippet(item)),assets200AndLocalHash:assets.every(item=>item.status===200 && item.matchesLocalSha256),faviconOriginalUnchanged:!!oldFavicon && oldFavicon.sha256===favicon?.sha256 && favicon?.pngDimensions?.width===256 && favicon?.pngDimensions?.height===256,publicEqualsDeployPermalinks:sourceComparisons.every(item=>item.publicEqualsPermalink),stageEqualsSource:sourceComparisons.every(item=>item.stageEqualsLocal),sourceSeoAndHtmlCopyPreserved:sourceComparisons.every(item=>item.seoMetadataEqual && item.headNormalizedEqual && item.htmlCopyEqual),serviceCacheHeadersCorrect:canonicalChecks.filter(item=>mainPaths.slice(1).includes(item.path)).every(item=>/\bno-cache\b/.test(pages.find(page=>page.requestedUrl===origin+item.path)?.headers?.['cache-control'] ?? '')) && /max-age\s*=\s*604800/.test(assets.find(item=>item.requestedUrl===origin+'/assets/norte-autoral/servicos.css')?.headers?.['cache-control'] ?? ''),newIndexAliases301:redirects.filter(item=>/\/(trafego-pago|automacao)\/index\.html$/.test(item.requestedUrl)).every(item=>item.chain?.[0]?.status===301 && item.status===200 && /^https:\/\/norteautoral\.site\/(trafego-pago|automacao)\/$/.test(item.url)),httpWwwCanonicalRedirects:redirects.filter(item=>!item.requestedUrl.endsWith('index.html')).every(item=>item.status===200 && item.url===origin+'/'),proofAllChecksPassed:Object.values(proofChecks).every(Boolean)};
const errors=Object.entries(checks).filter(([,passed])=>!passed).map(([name])=>name);
const report={checkedAtUtc:checkedAt.toISOString(),checkedAtSaoPaulo:checkedAt.toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'}),deployId,deployIdSource:'ID supplied by coordinating agent after deployment; confirmed here by matching immutable permalink HTML.',scope:'Read-only post-deploy HTTP/TLS and source/stage checks. No submissions to sitemap, IndexNow, Google or other search engines. No browser or credentials.',checks,errors,tls,canonicalChecks,serviceChecks,sourceComparisons,pages,assets,botProbes,redirects,sitemap:{urls:sitemapUrls,entries:sitemapEntries},robots:{text:robotsText,allowAll:robotsAllowAll},indexNowProof:{keyLocation:proofUrl.href,status:proof.status,headers:proof.headers,bytes:proof.bytes,publishedBodySha256:proof.sha256,sourceBodySha256:sha(proofSource),checks:proofChecks,bodyValueNotPrinted:true,submitted:false},limitations:['User-Agent probes are requests from this environment, not authenticated crawler identities or IP ranges; they do not prove real crawler access.','HTTP 200, robots allowance, sitemap shape and structured fields do not prove indexing, successful sitemap processing, ranking, search favicon or AI recommendation.','The structured data field checks are local semantic checks, not official Schema Markup Validator or Google Rich Results Test outputs.','Raw source and published HTML may differ because Netlify post-processes equivalent links. Exact source, normalized metadata/copy and immutable permalink hashes are recorded individually; no unconditional byte-equivalence promise is made.','IndexNow public proof access is verified only. This script never sends an IndexNow submission.','TLS certificate verification remains enabled. No code, DNS, configuration, credentials or Git mutation is performed.']};
await fs.writeFile(path.join(out,'post-deploy-audit.json'),JSON.stringify(report,null,2)+'\n');
await fs.writeFile(path.join(out,'post-deploy-audit.md'),`# Auditoria pública após publicação — 13/10/2026\n\nVerificada em ${report.checkedAtSaoPaulo} (America/Sao_Paulo). Deploy informado: \`${deployId}\`. [Evidência JSON](post-deploy-audit.json).\n\n- Raiz, /trafego-pago/, /automacao/, /privacy e /terms: acesso direto HTTP 200, canonical próprio, indexação e snippets permitidos: ${checks.canonicalPagesDirect200 && checks.canonicalSelfAndIndexing}.\n- Raiz e duas páginas de serviço: H1, HTML compreensível, WhatsApp/e-mail e links internos verificados. Service, provider Organization e BreadcrumbList das novas páginas resolvem IDs e campos esperados: ${checks.serviceAndBreadcrumbFields}. São verificações locais do markup, não resultados dos validadores oficiais.\n- Sitemap HTTP ${sitemap.status}, exatamente cinco URLs canônicas indexáveis; nove demos, /v3 e /site-do-jd continuam 200/noindex e fora dele: ${checks.sitemapExactlyFiveCanonicalUrls && checks.demos200NoindexExcluded}. Robots Allow:/ preservado.\n- Doze sondagens: Googlebot, OAI-SearchBot, bingbot e PerplexityBot nas três páginas principais, todas 200 e sem instruções de bloqueio: ${checks.botsThreeMainPages200}. Não comprovam identidade/IP de bots reais.\n- ${assets.length} recursos CSS, fontes, JavaScript, logo, foto, OG e favicons: 200 e SHA iguais às fontes locais: ${checks.assets200AndLocalHash}. PNG256 original preservado: ${checks.faviconOriginalUnchanged}.\n- Rotas de serviço com revalidação, CSS servicos com sete dias de cache, /index.html das duas novas páginas redirecionam 301 para diretório canônico: ${checks.serviceCacheHeadersCorrect && checks.newIndexAliases301}. HTTPS e redirecionamentos HTTP/www: ${checks.tlsValidated && checks.httpWwwCanonicalRedirects}.\n- Fonte/stage, metadados, head, texto HTML e permalinks foram comparados por página. HTML público coincide com os permalinks do deploy: ${checks.publicEqualsDeployPermalinks}; metadados/texto preservados: ${checks.sourceSeoAndHtmlCopyPreserved}. As diferenças de bytes, quando existem, estão enumeradas no JSON; não são omitidas por uma promessa de igualdade bruta.\n- Arquivo público de prova IndexNow: 200, corpo exato da fonte, text/plain, X-Robots-Tag noindex, permitido no robots e fora do sitemap: ${checks.proofAllChecksPassed}. Nenhuma submissão IndexNow/sitemap foi realizada pelo script; corpo da chave não foi impresso.\n- Falhas observadas: ${errors.length ? errors.join(', ') : 'nenhuma'}.\n\nEsta auditoria não comprova indexação, processamento de sitemap, posição, recomendação por IA ou exibição de favicon. Testes oficiais, índice e solicitações precisam ser registrados separadamente. A auditoria anterior a esta publicação foi preservada em [public-audit.json](public-audit.json).\n`);
console.log(JSON.stringify({deployId,checkedAt:report.checkedAtSaoPaulo,checks,errors,assets:assets.length,botProbes:botProbes.length,sourceComparisons:sourceComparisons.map(item=>({path:item.path,rawSourceEqualsPublished:item.rawSourceEqualsPublished,normalizedSourceEqualsPublished:item.normalizedSourceEqualsPublished,onlyKnownHomeDemoLinkProcessing:item.onlyKnownHomeDemoLinkProcessing,publicEqualsPermalink:item.publicEqualsPermalink,changedLineCount:item.changedLineCount}))},null,2));
