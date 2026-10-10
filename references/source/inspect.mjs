import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const routes = ['/', '/v3', '/site-do-jd', '/privacy', '/terms',
 '/marketing/portfolio/velorah-hero/dist/index.html', '/marketing/portfolio/lithos-hero/dist/index.html',
 '/marketing/portfolio/dentista-clinica-vertice/index.html', '/marketing/portfolio/convix-hero/dist/index.html',
 '/marketing/portfolio/aureo-arquitetura/index.html', '/marketing/portfolio/confeitaria-margo/index.html',
 '/marketing/portfolio/instituto-liminar/index.html', '/marketing/portfolio/verene-odontologia/index.html',
 '/marketing/portfolio/arquitetura-estudio-linha/index.html'];
const pages = [];
const decode = s => s.replaceAll('&amp;', '&');
await Promise.all(routes.map(async (route, i) => {
 const url = 'https://www.sabec.dev' + route;
 try {
  const res = await fetch(url); const html = await res.text();
  const name = i === 0 ? 'www-root.html' : route.replace(/^\//, '').replaceAll('/', '__') + (route.endsWith('.html') ? '' : '.html');
  await fs.writeFile(path.join(dir, name), html, 'utf8');
  const attrs = [...html.matchAll(/(?:href|src|poster)\s*=\s*["']([^"']+)["']/g)].map(m=>decode(m[1]));
  const css = [...html.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g)].map(m=>decode(m[1]));
  const urls = [...new Set([...attrs, ...css].filter(s=>!s.startsWith('data:')&&!s.startsWith('#')).map(s=> {try{return new URL(s,url).href}catch{return s}}))];
  const page = {url, status:res.status, localReference:name, title:html.match(/<title>([^<]+)<\/title>/)?.[1], bytes:Buffer.byteLength(html), urls, scripts:[...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m=>m[1])};
  pages.push(page);
  console.log(JSON.stringify({route,status:res.status,title:page.title,bytes:page.bytes,resources:urls.length,scripts:page.scripts}));
 } catch(e) {pages.push({url,error:e.message});console.error(route,e.message);}
}));
pages.sort((a,b)=>a.url.localeCompare(b.url));
await fs.writeFile(path.join(dir,'inventory.json'), JSON.stringify({captured:'2026-10-09',pages},null,2));
