import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const qaDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(qaDir, '../..');
const require = createRequire(path.join(projectDir, 'package.json'));
const { chromium } = require('playwright');
const origin = 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe' });
const result = { executedAt: new Date().toISOString(), origin, final: [], templates: [], functional: [], errors: [], failedRequests: [], screenshots: [] };

function hook(page) {
  page.on('pageerror', e => result.errors.push({ url: page.url(), error: String(e) }));
  page.on('response', r => { if (r.url().startsWith(origin) && r.status() >= 400) result.failedRequests.push({url:r.url(),status:r.status()}); });
}
function dimensions() {
  const visible = [...document.querySelectorAll('h1,h2,h3,h4,h5,nav a,.hero-sub,.form input,.form textarea,.presence-copy,.photo .frame')].filter(e => {
    const r = e.getBoundingClientRect(), s = getComputedStyle(e);
    return r.width > 0 && s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0 && r.top < innerHeight && r.bottom > 0 && (r.left < -2 || r.right > innerWidth + 2);
  });
  return { innerWidth, innerHeight, client:document.documentElement.clientWidth, scroll:document.documentElement.scrollWidth, body:document.body.scrollWidth,
    clipped:visible.map(e => ({ selector:e.id||e.className, text:e.textContent.trim().slice(0,80), left:e.getBoundingClientRect().left, right:e.getBoundingClientRect().right })) };
}
async function capture(page, file) {
  await page.screenshot({path:path.join(qaDir,file),scale:'css'});
  result.screenshots.push(file);
}
async function wheelTo(page, selector, align=120) {
  const r = await page.locator(selector).first().boundingBox();
  await page.mouse.wheel(0,r.y-align);
  await page.waitForTimeout(1100);
}
async function save() { await fs.writeFile(path.join(qaDir,'RESPONSIVE.json'),JSON.stringify(result,null,2)); }

try {
  const reduced = await browser.newContext({ reducedMotion:'reduce', viewport:{width:320,height:740} });
  const p = await reduced.newPage(); hook(p);
  for (const [width,height] of [[320,740],[360,800],[390,844],[412,915],[768,1024],[820,1180],[1024,768],[1280,800],[1440,900],[1920,1080],[844,390]]) {
    await p.setViewportSize({width,height});
    await p.goto(origin,{waitUntil:'domcontentloaded'});
    await p.keyboard.press('Home');
    await p.waitForTimeout(450);
    const row={viewport:[width,height],hero:await p.evaluate(dimensions),sections:[]};
    if(width===320) await capture(p,'final-320-hero.png');
    if(width===768) await capture(p,'final-768-hero.png');
    if(width===844) await capture(p,'final-844-horizontal-hero.png');
    const ids=await p.locator('main > section').evaluateAll(xs=>xs.map(e=>'#'+e.id));
    for (const selector of [...ids,'footer']) {
      await p.locator(selector).scrollIntoViewIfNeeded(); await p.waitForTimeout(130);
      row.sections.push({id:selector,...await p.evaluate(dimensions)});
      if(selector==='#quem') {
        await p.locator('#quem img').scrollIntoViewIfNeeded();await p.waitForTimeout(150);
        row.portrait=await p.locator('#quem img').evaluate(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return{currentSrc:e.currentSrc,natural:[e.naturalWidth,e.naturalHeight],box:[r.width,r.height],fit:s.objectFit,position:s.objectPosition};});
        if(width===320) await capture(p,'final-320-retrato.png');
      }
    }
    row.ads=await p.locator('.hero-sub').innerText();
    result.final.push(row);
    console.log(`Matrix ${width}x${height}: overflow ${[row.hero,...row.sections].filter(x=>x.scroll>x.innerWidth).length}, clipped ${row.sections.filter(x=>x.clipped.length).length}`);
  }
  const routes=await p.locator('a[href*="marketing/portfolio"]').evaluateAll(xs=>xs.map(e=>e.getAttribute('href')));
  for(const route of routes) {
    for(const width of [390,1440]) {
      await p.setViewportSize({width,height:width===390?844:900});
      const response=await p.goto(origin+route,{waitUntil:'domcontentloaded'});await p.waitForTimeout(400);
      const row={route,width,status:response.status(),top:await p.evaluate(dimensions)};
      await p.keyboard.press('End');await p.waitForTimeout(400);
      row.bottom=await p.evaluate(dimensions);
      row.oldCredit=await p.locator('body').innerText().then(t=>/Site demonstrativo.*Sabec|Sabec°/.test(t));
      const credit=p.locator('footer a[href="/"]').filter({hasText:'Norte Autoral · Gabriel Holanda'}).first();
      if(await credit.count()) { await credit.scrollIntoViewIfNeeded();await p.waitForTimeout(350); row.creditVisible=await credit.isVisible();row.returnHidden=await p.locator('.mazy-demo-return').evaluate(e=>e.hidden); }
      result.templates.push(row);
    }
    console.log(`Template ${route}: 390 and 1440 checked`);
  }
  await reduced.close();

  for(const width of [390,1440]) {
    const context=await browser.newContext({ viewport:{width,height:width===390?844:900}, ...(width===390?{isMobile:true,hasTouch:true}:{}) });
    const page=await context.newPage(); hook(page);
    await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1200);
    await capture(page,`final-${width}-hero.png`);
    const motion=[];
    await wheelTo(page,'#hoje');motion.push({section:'hoje',...await page.evaluate(dimensions)});
    for(const name of ['jd','os']) {
      for(const step of [1,2,3,4,3]) {
        await wheelTo(page,`#${name}-steps .step[data-s="${step}"]`,380);
        motion.push({section:name,expected:step,active:await page.locator(name==='jd'?'.feat-frame':'.os-wrap').first().getAttribute('data-s'),...await page.evaluate(dimensions)});
      }
      if(name==='os'&&width===1440) await capture(page,'final-1440-norte-os.png');
    }
    result.functional.push({type:'normal-motion',width,checks:motion});
    await wheelTo(page,'#quem img',130);await capture(page,`final-${width}-retrato.png`);
    if(width===390) {
      await wheelTo(page,'#app',100);await capture(page,'final-390-aplicativo.png');
      await wheelTo(page,'#lead-form',135);await capture(page,'final-390-formulario.png');
      await page.evaluate(()=>{window.__qaOpened=[];window.open=(...args)=>{window.__qaOpened.push(args);return{opener:null};};});
      await page.locator('#lead-form button[type="submit"]').click();
      const invalid=await page.evaluate(()=>({focused:document.activeElement.name,opened:window.__qaOpened.length,marked:[...document.querySelectorAll('#lead-form [required]')].filter(e=>e.style.borderColor).length}));
      await page.locator('#lead-form label').filter({hasText:'Norte/OS'}).click();
      await page.locator('input[name="nome"]').fill('Teste de verificação');
      await page.locator('input[name="whatsapp"]').fill('(86) 99999-0000');
      await page.locator('input[name="instagram"]').fill('@teste.qa');
      await page.locator('textarea[name="negocio"]').fill('Dados fictícios para verificar apenas o rascunho.');
      await page.locator('#lead-form button[type="submit"]').click();
      await page.locator('#lead-form label').filter({hasText:'Meta Ads e Google Ads'}).click();
      await page.locator('#lead-form button[type="submit"]').click();
      const drafts=await page.evaluate(()=>window.__qaOpened.map(x=>({url:x[0],target:x[1]})));
      result.functional.push({type:'form',invalid,drafts,externalMessagesSent:0});
      await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForTimeout(700);
      await wheelTo(page,'.gcard[href*="velorah"]',180);
      const pagesBefore=context.pages().length;
      await page.locator('.gcard[href*="velorah"]').click();await page.waitForURL('**/velorah-hero/dist/index.html');await page.waitForTimeout(500);
      const card={type:'same-tab-card',url:page.url(),pagesBefore,pagesAfter:context.pages().length};
      await page.getByRole('button',{name:'Iniciar Jornada',exact:true}).first().click();
      card.dialog={open:await page.locator('.mazy-demo-dialog').evaluate(e=>e.open),bounds:await page.locator('.mazy-demo-dialog').boundingBox()};
      await page.getByRole('button',{name:'Fechar demonstração'}).click();card.dialog.closed=await page.locator('.mazy-demo-dialog').evaluate(e=>!e.open);
      await page.locator('.mazy-demo-return').click();await page.waitForURL('**/#sites');card.returned=page.url();result.functional.push(card);
    } else {
      await page.setViewportSize({width:390,height:844});await page.waitForTimeout(700);
      result.functional.push({type:'resize-1440-to-390',...await page.evaluate(dimensions)});
    }
    console.log(`Normal motion and controls ${width} finished`);
    await context.close();
  }
  await save();
  console.log(JSON.stringify({matrix:result.final.length,templateChecks:result.templates.length,errors:result.errors,failedRequests:result.failedRequests,screenshots:result.screenshots},null,2));
} catch(error) { result.fatal=String(error.stack||error);await save();console.error(error);process.exitCode=1; }
finally { await browser.close(); }
