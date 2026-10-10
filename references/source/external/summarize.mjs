import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath}from'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const inv=JSON.parse(await fs.readFile(path.join(dir,'inventory.json'),'utf8'));
for(const b of inv.bundles) console.log(JSON.stringify({url:b.url,imports:b.imports,dynamicImports:b.dynamicImports,assets:b.assetStrings.length,examples:b.assetStrings.slice(0,8)}));
for(const p of inv.pages)if(p.url.endsWith('sitemap.xml')){const fn=new URL(p.finalUrl).hostname+'__sitemap.xml';const text=await fs.readFile(path.join(dir,fn),'utf8');p.routes=[...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);console.log(JSON.stringify({url:p.url,routes:p.routes}));}
await fs.writeFile(path.join(dir,'inventory.json'),JSON.stringify(inv,null,2));
