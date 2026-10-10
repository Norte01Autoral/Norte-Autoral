import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '../../node_modules/playwright/index.mjs';
const output=path.resolve('public/assets/norte-autoral/cases');
const cards=path.resolve('public/assets/norte-autoral/cards');
const browser=await chromium.launch({headless:true,executablePath:path.join(process.env.LOCALAPPDATA,'ms-playwright/chromium-1243/chrome-win64/chrome.exe'),args:['--enable-unsafe-swiftshader']});
const results=[];
try {
for(const slug of ['helena-vasques','vex-fitness','vex-construtora']){
 for(const mode of ['desktop','mobile']){
  const viewport=mode==='desktop'?{width:1440,height:900}:{width:390,height:844};
  const context=await browser.newContext({viewport,deviceScaleFactor:1,isMobile:mode==='mobile',hasTouch:mode==='mobile'});
  const page=await context.newPage(),errors=[],missing=[],checks=[];
  await context.route('**/*',async route=>!['GET','HEAD'].includes(route.request().method())?route.abort():route.continue());
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)missing.push({status:response.status(),url:response.url()});});
  const url=`http://127.0.0.1:4173/cases/${slug}.html`;
  await page.goto(url,{waitUntil:'networkidle'});await page.waitForTimeout(1700);
  await page.screenshot({path:path.join(output,`${slug}-${mode}.png`),scale:'css'});
  if(mode==='desktop')await page.screenshot({path:path.join(cards,`${slug}.jpg`),type:'jpeg',quality:90,scale:'css'});
  const fit=await page.evaluate(()=>({title:document.title,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.src),concept:document.body.textContent.includes('Projeto conceito'),videos:[...document.querySelectorAll('video')].map(e=>({src:e.currentSrc,ready:e.readyState,error:e.error?.code||null})),returnLinks:[...document.querySelectorAll('a')].filter(a=>a.textContent.includes('Norte Autoral')).map(a=>a.getAttribute('href'))}));
  checks.push({name:'startup-fit',pass:fit.scrollWidth===fit.width&&fit.brokenImages.length===0&&fit.concept});
  if(slug==='helena-vasques'){
    if(mode==='desktop'){
      await page.screenshot({path:path.join(output,'helena-vasques-01-hero.jpg'),type:'jpeg',quality:90,scale:'css'});
      for(const [id,label,file] of [['situacoes','Quando procurar','helena-vasques-02-situacoes.jpg'],['atuacao','Áreas','helena-vasques-03-atuacao.jpg'],['advogada','Quem atende','helena-vasques-04-advogada.jpg']]){
        await page.getByRole('banner').getByRole('link',{name:label,exact:true}).click();await page.waitForTimeout(1200);
        checks.push({name:`nav-${id}`,pass:page.url().endsWith('#'+id)});
        await page.screenshot({path:path.join(output,file),type:'jpeg',quality:90,scale:'css'});
      }
    }
    const faq=page.locator('#duvidas details').first();await faq.locator('summary').click();checks.push({name:'faq-open',pass:await faq.getAttribute('open')!==null});await faq.locator('summary').click();checks.push({name:'faq-close',pass:await faq.getAttribute('open')===null});
  }
  if(slug==='vex-fitness'){
    await page.getByRole('button',{name:'Lutas',exact:true}).click();
    const filter=await page.locator('#horarios').evaluate(e=>({selected:e.querySelector('button[aria-pressed="true"]')?.textContent.trim(),visible:[...e.querySelectorAll('ul.border-t>li')].filter(x=>getComputedStyle(x).display!=='none').length,total:e.querySelectorAll('ul.border-t>li').length}));
    checks.push({name:'filter-lutas',pass:filter.selected==='Lutas'&&filter.visible>0&&filter.visible<filter.total,state:filter});
    await page.getByRole('button',{name:'Tudo',exact:true}).click();
    checks.push({name:'filter-reset',pass:await page.getByRole('button',{name:'Tudo',exact:true}).getAttribute('aria-pressed')==='true'});
    const priceState=()=>page.locator('#planos').evaluate(e=>({active:e.querySelector('button[aria-pressed="true"]')?.textContent.trim(),text:e.textContent}));
    await page.getByRole('button',{name:'12 meses',exact:true}).click();const annual=await priceState();
    checks.push({name:'annual-prices',pass:annual.active==='12 meses'&&annual.text.includes('77')&&annual.text.includes('129')&&annual.text.includes('224')});
    await page.screenshot({path:path.join(output,`vex-fitness-planos-${mode}.png`),scale:'css'});
    await page.getByRole('button',{name:'Sem fidelidade',exact:true}).click();const monthly=await priceState();
    checks.push({name:'monthly-prices',pass:monthly.active==='Sem fidelidade'&&monthly.text.includes('89')&&monthly.text.includes('149')&&monthly.text.includes('259')});
    const faq=page.locator('#duvidas details').first();await faq.locator('summary').click();checks.push({name:'faq-open',pass:await faq.getAttribute('open')!==null});await faq.locator('summary').click();checks.push({name:'faq-close',pass:await faq.getAttribute('open')===null});
    await page.keyboard.press('Home');await page.waitForTimeout(1000);const before=await page.locator('#topo .transition-opacity').evaluateAll(els=>els.map(e=>({src:e.querySelector('img')?.getAttribute('src'),opacity:getComputedStyle(e).opacity})));await page.waitForTimeout(6000);const after=await page.locator('#topo .transition-opacity').evaluateAll(els=>els.map(e=>({src:e.querySelector('img')?.getAttribute('src'),opacity:getComputedStyle(e).opacity})));checks.push({name:'hero-carousel',pass:JSON.stringify(before)!==JSON.stringify(after),before,after});
  }
  if(slug==='vex-construtora'){
    await page.getByRole('tab',{name:'Em obra',exact:true}).click();
    const filtered=await page.locator('#empreendimentos').evaluate(e=>({selected:e.querySelector('[aria-selected="true"]')?.textContent.trim(),visible:[...e.querySelectorAll('.grid.gap-6>*')].filter(x=>getComputedStyle(x).display!=='none').length,total:e.querySelectorAll('.grid.gap-6>*').length}));
    checks.push({name:'empreendimentos-filter',pass:filtered.selected==='Em obra'&&filtered.visible===2,state:filtered});
    await page.getByRole('tab',{name:'Todos',exact:true}).click();checks.push({name:'empreendimentos-reset',pass:await page.getByRole('tab',{name:'Todos',exact:true}).getAttribute('aria-selected')==='true'});
    await page.getByRole('button',{name:/Tipo B/}).click();await page.waitForTimeout(900);
    checks.push({name:'3d-type-b',pass:await page.getByRole('button',{name:/Tipo B/}).getAttribute('aria-pressed')==='true'});
    await page.screenshot({path:path.join(output,`vex-construtora-planta-${mode}.png`),scale:'css'});
    await page.getByRole('button',{name:/Tipo A/}).click();checks.push({name:'3d-type-a',pass:await page.getByRole('button',{name:/Tipo A/}).getAttribute('aria-pressed')==='true'});
    const canvas=page.locator('#canvas-3d-container canvas');checks.push({name:'3d-canvas',pass:await canvas.count()===1});
    if(mode==='desktop'){
      const room=page.getByRole('button',{name:/^Quarto 1/});await room.hover();checks.push({name:'3d-room-focus',pass:(await page.locator('#label-comodo-3d').textContent())==='Quarto 1'});
      const bounds=await canvas.boundingBox();await page.mouse.move(bounds.x+bounds.width/2,bounds.y+bounds.height/2);await page.mouse.down();await page.mouse.move(bounds.x+bounds.width/2+90,bounds.y+bounds.height/2+30,{steps:8});await page.mouse.up();checks.push({name:'3d-drag',pass:true});
    }
  }
  await page.keyboard.press('End');await page.waitForTimeout(1100);await page.screenshot({path:path.join(output,`${slug}-footer-${mode}.png`),scale:'css'});
  await page.reload({waitUntil:'networkidle'});await page.waitForTimeout(900);checks.push({name:'route-reload',pass:await page.locator('h1').count()===1});
  const result={slug,mode,url,fit,checks,errors,missing};results.push(result);console.log(slug,mode,'checks:',checks.filter(x=>!x.pass).map(x=>x.name),'errors:',errors.length,'missing:',missing.length);
  await context.close();
 }
}
} finally { await browser.close(); }
fs.writeFileSync('references/qa-revision/OWN-CASES-final.json',JSON.stringify(results,null,2));
if(results.some(r=>r.errors.length||r.missing.length||r.checks.some(c=>!c.pass)))process.exitCode=1;
