import fs from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = dirname(fileURLToPath(import.meta.url));
let source = await fs.readFile(join(dir, 'responsive-qa.mjs'), 'utf8');
source = source.replace(/const result = \{ executedAt:[^\n]+;/,
  "const result = JSON.parse(await fs.readFile(path.join(qaDir, 'RESPONSIVE.json'), 'utf8')); result.resumedAt = new Date().toISOString(); delete result.fatal;");
source = source.replace('for (const [width,height] of [[320,740],[360,800],[390,844],[412,915],[768,1024],[820,1180],[1024,768],[1280,800],[1440,900],[1920,1080],[844,390]])',
  'for (const [width,height] of [])');
source = source.replace("const routes=await p.locator('a[href*=\"marketing/portfolio\"]').evaluateAll(xs=>xs.map(e=>e.getAttribute('href')));",
  "await p.goto(origin, { waitUntil: 'domcontentloaded' }); const routes=await p.locator('a[href*=\"marketing/portfolio\"]').evaluateAll(xs=>xs.map(e=>e.getAttribute('href')));");
source = source.replace('for(const width of [390,1440]) {\n      await p.setViewportSize',
  'for(const width of [390,1440]) {\n      if(result.templates.some(x => x.route === route && x.width === width)) continue;\n      await p.setViewportSize');
await fs.writeFile(join(dir, 'responsive-resume.mjs'), source);
console.log('Prepared continuation: preserve completed matrix and template checks.');
