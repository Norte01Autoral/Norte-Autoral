import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const inventory=JSON.parse(await fs.readFile(path.join(dir,'inventory.json'),'utf8'));
const bundles=inventory.pages.flatMap(p=>p.urls.filter(u=>u.startsWith('https://www.sabec.dev/')&&/\.(?:js|css)$/.test(u)));
const report=[];
await Promise.all(bundles.map(async url=>{
 const res=await fetch(url);const body=await res.text();const name=new URL(url).pathname.slice(1).replaceAll('/','__');
 await fs.writeFile(path.join(dir,name),body,'utf8');
 const absoluteUrls=[...new Set([...body.matchAll(/https?:\/\/[^\s"'`<>]+/g)].map(m=>m[0]))];
 const assetStrings=[...new Set([...body.matchAll(/["'`]([^"'`\n]*(?:\.(?:png|jpe?g|webp|avif|svg|gif|mp4|webm|woff2?|ttf|glb|gltf|hdr))[^"'`\n]*)["'`]/gi)].map(m=>m[1]))];
 const imports=[...new Set([...body.matchAll(/(?:import|from)\s*(?:[^;]*?\sfrom\s*)?["']([^"']+)["']/g)].map(m=>m[1]))];
 const mapUrl=url+'.map'; const map=await fetch(mapUrl);
 const item={url,status:res.status,bytes:Buffer.byteLength(body),localReference:name,absoluteUrls,assetStrings,imports,sourceMapStatus:map.status};
 if(map.ok){await fs.writeFile(path.join(dir,name+'.map'),await map.text(),'utf8');}
 report.push(item); console.log(JSON.stringify(item));
}));
await fs.writeFile(path.join(dir,'bundle-inventory.json'),JSON.stringify({bundles:report},null,2));
