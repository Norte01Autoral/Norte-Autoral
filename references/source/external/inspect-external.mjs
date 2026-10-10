import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const roots=['https://jdandrade.art/','https://draanascatolin.com.br/'];
const seen=new Set(); const pages=[];const bundles=[];
const dec=s=>s.replaceAll('&amp;','&');
function refs(body,url){
 const normal=[...body.matchAll(/(?:href|src|poster|data-src)\s*=\s*["']([^"']+)["']/g)].map(m=>dec(m[1]));
 const sets=[...body.matchAll(/(?:srcset|data-srcset)\s*=\s*["']([^"']+)["']/g)].flatMap(m=>m[1].split(',').map(s=>dec(s.trim().split(/\s+/)[0])));
 const css=[...body.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g)].map(m=>dec(m[1]));
 return [...new Set([...normal,...sets,...css].filter(s=>s&&!s.startsWith('data:')&&!s.startsWith('#')).map(s=>{try{return new URL(s,url).href}catch{return s}}))];
}
async function save(url,kind){
 if(seen.has(url))return null;seen.add(url);
 try{const res=await fetch(url);const body=await res.text();const u=new URL(res.url);const name=u.hostname+'__'+u.pathname.slice(1).replaceAll('/','__');const local=name||(u.hostname+'__index.html');await fs.writeFile(path.join(dir,local.endsWith('__')?local+'index.html':local),body,'utf8');
 const item={url,finalUrl:res.url,status:res.status,bytes:Buffer.byteLength(body),type:res.headers.get('content-type'),title:body.match(/<title>([^<]+)<\/title>/)?.[1],urls:refs(body,res.url)};
 if(kind==='bundle'){
 item.imports=[...new Set([...body.matchAll(/(?:from|import)\s*["'`]([^"'`\s]+\.(?:js|css))["'`]/g)].map(m=>new URL(m[1],res.url).href))];
 item.dynamicImports=[...new Set([...body.matchAll(/import\(["'`]([^"'`\s]+\.(?:js|css))["'`]\)/g)].map(m=>new URL(m[1],res.url).href))];
 item.assetStrings=[...new Set([...body.matchAll(/(["'`])((?:\/|\.\.?\/|https?:\/\/)[^\s"'`]+\.(?:png|jpe?g|webp|avif|svg|gif|mp4|webm|woff2?|ttf|json)(?:\?[^\s"'`]*)?)\1/gi)].map(m=>m[2]))];
 item.fetches=[...new Set([...body.matchAll(/fetch\(["'`]([^"'`]+)["'`]/g)].map(m=>m[1]))];bundles.push(item);
 }else pages.push(item);
 console.log(JSON.stringify({kind,url:res.url,status:res.status,bytes:item.bytes,title:item.title,resources:item.urls.length,imports:item.imports?.length,fetches:item.fetches}));return item;
 }catch(e){const item={url,error:e.message};pages.push(item);return null}
}
for(const url of roots){const item=await save(url,'page');if(!item)continue;const origin=new URL(item.finalUrl).origin;
 const q=item.urls.filter(u=>u.startsWith(origin)&&/\.(?:js|css)$/.test(u));
 for(let i=0;i<q.length&&i<24;i++){const b=await save(q[i],'bundle');if(b)for(const ref of [...b.imports,...b.dynamicImports])if(ref.startsWith(origin)&&/\.(?:js|css)$/.test(ref)&&!seen.has(ref)&&!q.includes(ref))q.push(ref)}
 await Promise.all(['/robots.txt','/sitemap.xml'].map(p=>save(origin+p,'page')));
}
await fs.writeFile(path.join(dir,'inventory.json'),JSON.stringify({captured:'2026-10-09',pages,bundles},null,2));
