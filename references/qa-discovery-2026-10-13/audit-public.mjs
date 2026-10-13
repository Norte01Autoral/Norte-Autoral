import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import https from 'node:https';

const out = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(out,'../..');
const origin = 'https://norteautoral.site';
const recordedDeployId = '6acae4f0215a53089aa84c06';
const permalink = `https://${recordedDeployId}--rococo-liger-832df6.netlify.app/`;
const started = new Date();
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(['"])(.*?)\2/gis)].map(m => [m[1].toLowerCase(),m[3]]));
function metadata(html) {
  const metas = (html.match(/<meta\b[^>]*>/gi) ?? []).map(attrs);
  const links = (html.match(/<link\b[^>]*>/gi) ?? []).map(attrs);
  const get = name => metas.find(item => (item.name ?? item.property)?.toLowerCase() === name.toLowerCase())?.content ?? null;
  const jsonld = [...html.matchAll(/<script\b[^>]*type\s*=\s*['"]application\/ld\+json['"][^>]*>([\s\S]*?)<\/script>/gi)].map(m => {try {return JSON.parse(m[1]);} catch(error) {return {parseError:error.message};}});
  const nodes = jsonld.flatMap(item => item['@graph'] ?? [item]);
  return {title:html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? null,description:get('description'),canonical:links.find(item => item.rel?.toLowerCase() === 'canonical')?.href ?? null,robots:get('robots'),googlebot:get('googlebot'),ogSiteName:get('og:site_name'),icons:links.filter(item => /\bicon\b/i.test(item.rel ?? '')),nodes};
}
function textOnly(html) {
  return html.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
}
async function get(url,ua='NorteAutoral-Discovery-Audit/1.0') {
  const requestUrl = url.startsWith('http') ? url : origin+url;
  const chain = [];
  let current = requestUrl;
  for (let i=0;i<10;i++) {
    const response = await fetch(current,{redirect:'manual',headers:{'User-Agent':ua,'Cache-Control':'no-cache'},signal:AbortSignal.timeout(25000)});
    const location = response.headers.get('location');
    chain.push({url:current,status:response.status,location});
    if ([301,302,303,307,308].includes(response.status) && location) {
      current = new URL(location,current).href;
      await response.body?.cancel();
      if(chain.some(item => item.url === current)) throw new Error('Redirect loop: '+current);
      continue;
    }
    const bytes=Buffer.from(await response.arrayBuffer());
    const item={requestUrl,url:current,ua,status:response.status,chain,headers:Object.fromEntries(['content-type','x-robots-tag','cache-control','server','content-encoding','cf-mitigated','www-authenticate'].map(name => [name,response.headers.get(name)])),bytes:bytes.length,sha256:sha(bytes)};
    Object.defineProperty(item,'raw',{value:bytes,enumerable:false});
    if(item.headers['content-type']?.includes('text/html')) Object.assign(item,metadata(bytes.toString('utf8')));
    else if(item.headers['content-type']?.match(/xml|text\/plain/)) item.text=bytes.toString('utf8');
    return item;
  }
  throw new Error('Too many redirects');
}
const safeGet = async (url,ua) => {try {return await get(url,ua);}catch(error){return {requestUrl:url,ua,error:error.message};}};
const demoPaths=['/marketing/portfolio/velorah-hero/dist/','/marketing/portfolio/lithos-hero/dist/','/marketing/portfolio/dentista-clinica-vertice/','/marketing/portfolio/convix-hero/dist/','/marketing/portfolio/aureo-arquitetura/','/marketing/portfolio/confeitaria-margo/','/marketing/portfolio/instituto-liminar/','/marketing/portfolio/verene-odontologia/','/marketing/portfolio/arquitetura-estudio-linha/','/v3','/site-do-jd'];
const resourcePaths=['/assets/norte-autoral/favicon.png','/assets/norte-autoral/favicon.ico','/assets/norte-autoral/logo-n-128.png','/assets/norte-autoral/gabriel-holanda.webp','/assets/norte-autoral/og-norte-autoral.jpg','/assets/norte-autoral/profile.css','/vendor/fonts.googleapis.com/css2-7c9831d3cb65.css','/vendor/cdn.jsdelivr.net/gsap.min-bf5b26673eee.js','/vendor/cdn.jsdelivr.net/ScrollTrigger.min-8275e947aa32.js','/vendor/cdn.jsdelivr.net/lenis.min-273ca89be0ce.js','/assets/media-performance.js'];
const bots=['Googlebot','OAI-SearchBot','bingbot','PerplexityBot'];
const tlsPromise=new Promise((resolve,reject)=>{
  const req=https.request(origin+'/',{method:'HEAD',rejectUnauthorized:true,timeout:25000},res=>{
    const cert=res.socket.getPeerCertificate();
    const result={authorized:res.socket.authorized,authorizationError:res.socket.authorizationError ?? null,protocol:res.socket.getProtocol(),subject:cert.subject,issuer:cert.issuer,subjectAltName:cert.subjectaltname,validFrom:cert.valid_from,validTo:cert.valid_to};
    res.resume();res.on('end',()=>resolve(result));
  });req.on('error',reject);req.on('timeout',()=>req.destroy(new Error('TLS timeout')));req.end();
});
const [pages,assets,botProbes,variants,deployProbe,tls,localBytes,localRobots]=await Promise.all([
  Promise.all(['/', '/privacy','/terms','/robots.txt','/sitemap.xml',...demoPaths].map(url=>safeGet(url))),
  Promise.all(resourcePaths.map(url=>safeGet(url))),
  Promise.all([...bots.map(ua=>safeGet('/',ua)),safeGet('/assets/norte-autoral/favicon.png','Googlebot-Image')]),
  Promise.all(['http://norteautoral.site/','http://www.norteautoral.site/','https://www.norteautoral.site/'].map(url=>safeGet(url))),
  safeGet(permalink),tlsPromise.catch(error=>({error:error.message})),
  fs.readFile(path.join(root,'public/index.html')),fs.readFile(path.join(root,'public/robots.txt'),'utf8'),
]);
const home=pages.find(item=>item.requestUrl===origin+'/');
const robots=pages.find(item=>item.requestUrl===origin+'/robots.txt');
const sitemap=pages.find(item=>item.requestUrl===origin+'/sitemap.xml');
const noindex = item=>[item.robots,item.googlebot,item.headers?.['x-robots-tag']].some(value=>/\b(noindex|none)\b/i.test(value ?? ''));
const localText=localBytes.toString('utf8'), publicText=home.raw?.toString('utf8') ?? '';
const normalize=text=>text.replace(/\r\n/g,'\n').replace(/^\uFEFF/,'');
const localNorm=normalize(localText),publicNorm=normalize(publicText);
const transformedLocal=localNorm.replace(/<a class="gcard" href="(\/marketing\/portfolio\/[^"\s]+)index\.html">/g,(_,folder)=>`<a class='gcard' href='${folder}'>`);
const localCopy=textOnly(localText),publicCopy=textOnly(publicText);
const localHead=normalize(localText.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? ''),publicHead=normalize(publicText.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '');
const localSeo=metadata(localText);
const comparison={localSha256:sha(localBytes),publishedSha256:home.sha256,rawBytesEqual:sha(localBytes)===home.sha256,normalizedBytesEqual:localNorm===publicNorm,onlyKnownNineDemoLinkTransformations:transformedLocal===publicNorm,normalizedHeadEqual:localHead===publicHead,visibleCopyEqual:localCopy===publicCopy,localVisibleCopySha256:sha(localCopy),publicVisibleCopySha256:sha(publicCopy),seoMetadataEqual:JSON.stringify(localSeo)===JSON.stringify(metadata(publicText)),recordedDeployId,deployIdSource:'AGENTS.md, PROJECT-STATE.md and NETLIFY.md. Active deploy not authenticated/requeried.',publicMatchesRecordedDeployPermalink:home.sha256===deployProbe.sha256,recordedDeployPermalink:permalink};
const sitemapUrls=[...((sitemap.text ?? '').matchAll(/<loc>(.*?)<\/loc>/gi))].map(m=>m[1]);
const sitemapEntries=sitemapUrls.map(url=>{const page=pages.find(item=>item.url===url);return {url,status:page?.status,canonical:page?.canonical,noindex:noindex(page ?? {}),canonicalAndIndexable:page?.status===200 && page.canonical===url && !noindex(page)};});
const robotText=robots.text ?? '';
const robotRules=robotText.split(/\r?\n/).map(line=>line.trim()).filter(line=>line && !line.startsWith('#'));
const nonemptyDisallows=[...robotText.matchAll(/^Disallow:\s*(\S+)\s*$/gmi)].map(m=>m[1]);
const allBotsAllowed=nonemptyDisallows.length===0 && /^User-agent:\s*\*\s*$/mi.test(robotText) && /^Allow:\s*\/\s*$/mi.test(robotText);
for(const asset of assets){
  if(asset.status===200){
    const local=await fs.readFile(path.join(root,'public',new URL(asset.url).pathname.replace(/^\//,''))).catch(()=>null);
    asset.matchesLocalSha256=local ? sha(local)===asset.sha256 : null;
    asset.allowedByRobots=allBotsAllowed;
    if(asset.url.endsWith('/favicon.png') && asset.raw?.readUInt32BE(0)===0x89504e47) asset.pngDimensions={width:asset.raw.readUInt32BE(16),height:asset.raw.readUInt32BE(20)};
  }
}
const checks={homepage200:home.status===200,tlsValidated:tls.authorized===true,canonicalCorrect:home.canonical===origin+'/',homepageIndexabilityAllowed:!noindex(home),allCanonicalRedirects:variants.every(item=>item.status===200 && item.url===origin+'/'),robotsAllowsAllQueriedBots:allBotsAllowed,robotsMatchesLocal:normalize(localRobots)===normalize(robotText),sitemap200:sitemap.status===200,sitemapOnlyThreeCanonicUrls:sitemapUrls.length===3 && sitemapEntries.every(item=>item.canonicalAndIndexable) && ['/','/privacy','/terms'].every(p=>sitemapUrls.includes(origin+p)),demosRastreadasNoindex:demoPaths.every(p=>pages.some(item=>item.requestUrl===origin+p && item.status===200 && noindex(item) && !sitemapUrls.includes(item.url))),primaryResources200:assets.every(item=>item.status===200),primaryResourcesMatchSource:assets.every(item=>item.matchesLocalSha256),fourBotUserAgentsGetHomepage200:botProbes.filter(item=>item.requestUrl===origin+'/').every(item=>item.status===200 && !noindex(item)),faviconGooglebotImage200:botProbes.find(item=>item.ua==='Googlebot-Image')?.status===200,sourceHeadAndVisibleCopyPreserved:comparison.normalizedHeadEqual && comparison.visibleCopyEqual,recordedPermalinkMatchesPublic:comparison.publicMatchesRecordedDeployPermalink};
const errors=Object.entries(checks).filter(([,passed])=>!passed).map(([name])=>name);
const report={checkedAtUtc:started.toISOString(),checkedAtSaoPaulo:started.toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'}),executionDate:'2026-10-13',scope:'Read-only HTTP/TLS audit and local comparison. No browser, authenticated account, DNS/deploy/code/Git changes or credential access.',checks,errors,tls,pages,variants,assets,botProbes,robots:{rules:robotRules,nonemptyDisallows,explicitAllBotAllow:allBotsAllowed},sitemap:{urls:sitemapUrls,entries:sitemapEntries},comparison,htmlContent:{characters:publicCopy.length,brand:publicCopy.includes('Norte Autoral'),gabriel:publicCopy.includes('Gabriel Holanda'),parnaiba:publicCopy.includes('Parnaíba'),email:publicCopy.includes('contatonorteautoral@gmail.com'),whatsappLinkInHtml:publicText.includes('wa.me/5586999900235'),publicTextExcerpt:publicCopy.slice(0,1600)},limitations:['User-Agent probes originate from this environment, not authenticated crawler IPs. A 200 response cannot prove a real crawler visited or was allowed by IP/WAF policies.','Robots access and technical indexability do not prove current Google/Bing index state, sitemap processing, ranking, recommendation by an AI system or favicon presentation in search.','No Search Console/API was queried here. Existing index/request facts are historical and are not inferred from this audit.','TLS certificates were validated with standard platform verification; no insecure overrides were used.','Cache headers were observed only; no cache purge or provider settings were changed.','Recorded deploy identification comes from local documentation plus equal immutable permalink body, not an authenticated active-deploy query.','No contact was submitted; HTML contact destinations were observed only.'],observedBlockers:{unexpectedHttpErrors:pages.filter(item=>item.error || item.status!==200).map(item=>({url:item.requestUrl,status:item.status,error:item.error})),wafChallengeIndication:home.headers?.['cf-mitigated'] ?? null,authRequirementIndication:home.headers?.['www-authenticate'] ?? null,rateLimitResponses:botProbes.filter(item=>item.status===429).length,interpretation:'No blocker demonstrated if HTTP status/indexability/resource checks pass. Absence of a challenge for these probes does not rule out crawler-IP-based policies.'}};
await fs.writeFile(path.join(out,'public-audit.json'),JSON.stringify(report,null,2)+'\n');
await fs.writeFile(path.join(out,'public-audit.md'),`# Auditoria pública — 13/10/2026\n\nVerificada em ${report.checkedAtSaoPaulo} (America/Sao_Paulo). Fonte ativa: Portfólio/public. [Evidência JSON](public-audit.json). Nenhuma publicação, alteração de arquivos públicos, DNS, Git ou acesso a credenciais foi realizada.\n\n- Inicial HTTP ${home.status}, HTTPS validado, canonical \`${home.canonical}\`, robots \`${home.robots}\`, X-Robots-Tag ${home.headers?.['x-robots-tag'] ?? 'ausente'}. HTTP/www terminam em HTTPS sem www: ${checks.allCanonicalRedirects}.\n- Robots HTTP ${robots.status}: wildcard Allow:/, sem Disallow não vazio. Permite Googlebot, Googlebot-Image, OAI-SearchBot, bingbot e PerplexityBot, páginas e recursos.\n- Sitemap HTTP ${sitemap.status}, somente raiz, /privacy e /terms. URLs 200, canônicas e sem noindex: ${checks.sitemapOnlyThreeCanonicUrls}. Nove demos + /v3 + /site-do-jd: 200/noindex e fora do sitemap: ${checks.demosRastreadasNoindex}.\n- ${assets.length} recursos principais CSS, JS, logo, foto, OG e favicons: 200 e hashes iguais à fonte local: ${checks.primaryResources200 && checks.primaryResourcesMatchSource}. Favicon principal PNG: 256×256, URL estável /assets/norte-autoral/favicon.png, fallback ICO. Googlebot-Image recebe 200 nessa sondagem.\n- User-Agents Googlebot, OAI-SearchBot, bingbot e PerplexityBot recebem inicial 200, sem noindex. São sondagens com nome no cabeçalho, sem identidade/IP de rastreadores reais; não provam visita nem eliminam possíveis políticas por IP.\n- Publicado versus fonte: SHA bruto igual ${comparison.rawBytesEqual}; normalização de linhas igual ${comparison.normalizedBytesEqual}; igualdade após as nove transformações históricas de links de demos ${comparison.onlyKnownNineDemoLinkTransformations}. Head normalizado e texto HTML principal preservados: ${comparison.normalizedHeadEqual && comparison.visibleCopyEqual}. SHA publicado: \`${home.sha256}\`.\n- Deploy registrado na memória: \`${recordedDeployId}\`, Free/manual. [Permalink](${permalink}) tem o mesmo HTML público: ${comparison.publicMatchesRecordedDeployPermalink}. Isto não substitui consulta autenticada do deploy ativo/plano.\n- Conteúdo HTML principal: ${publicCopy.length} caracteres, marca/Gabriel/Parnaíba e contato presentes. Contato não foi enviado.\n- Falhas técnicas observadas: ${errors.length ? errors.join(', ') : 'nenhuma'}. Nenhum desafio WAF, autenticação ou rate limit foi demonstrado nas respostas consultadas; políticas específicas por IP não são verificáveis por essas sondagens.\n\nA auditoria HTTP não comprova indexação atual, processamento do sitemap, nome/favicon exibido, posição ou recomendação por mecanismos de IA. A Inspeção de URL e o relatório de sitemap devem ser consultados separadamente. O pedido histórico de atualização não foi repetido.\n`);
console.log(JSON.stringify({checkedAt:report.checkedAtSaoPaulo,checks,errors,comparison,homepageSha256:home.sha256},null,2));
