import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const browser=await chromium.launch({headless:true,executablePath:process.env.LOCALAPPDATA+'/ms-playwright/chromium-1243/chrome-win64/chrome.exe',args:['--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:900}});
const entries=[['velorah-hero','dist/'],['lithos-hero','dist/'],['dentista-clinica-vertice',''],['convix-hero','dist/'],['aureo-arquitetura',''],['confeitaria-margo',''],['instituto-liminar',''],['verene-odontologia',''],['arquitetura-estudio-linha','']];
const result=[];
for(const [slug,sub]of entries){
  console.log('Checking '+slug);
  const p=await context.newPage(),errors=[],bad=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)bad.push(r.url());});
  await p.goto(`http://127.0.0.1:4173/marketing/portfolio/${slug}/${sub}index.html`,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3800);
  const originalURL=p.url();
  const back=await p.locator('.mazy-demo-return').evaluate(el=>({href:el.getAttribute('href'),label:el.getAttribute('aria-label'),width:el.getBoundingClientRect().width,visible:!!el.getClientRects().length}));
  const actions=[];
  if(sub){
    const locator=p.locator('#root button, #root a[href="#"], #root [data-mazy-demo-nav]');
    for(let i=0;i<await locator.count();i++){
      const element=locator.nth(i);if(!await element.isVisible())continue;
      const aria=await element.getAttribute('aria-label'),label=(await element.innerText()).trim()||aria;
      if(aria==='Abrir menu'||label==='Início')continue;
      await element.click();
      const open=await p.locator('.mazy-demo-dialog').evaluate(el=>el.open).catch(()=>false);
      const title=await p.locator('.mazy-demo-dialog h2').innerText().catch(()=>'');
      actions.push({label,open,title});
      if(open){await p.keyboard.press('Escape');if(await p.locator('.mazy-demo-dialog').evaluate(el=>el.open))throw Error('Escape did not close '+slug);}
    }
    if(slug==='convix-hero'){
      await p.locator('[data-mazy-demo-nav]').filter({hasText:'Recursos'}).focus();await p.keyboard.press('Enter');
      actions.push({label:'Keyboard: Recursos',open:await p.locator('.mazy-demo-dialog').evaluate(el=>el.open)});await p.keyboard.press('Escape');
    }
  }else{
    const contacts=p.locator('a[href^="https://wa.me"],a[href^="mailto:"],a[href^="tel:"]');
    for(let i=0;i<await contacts.count();i++){
      const element=contacts.nth(i);if(!await element.isVisible())continue;
      if(!await element.evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.top<innerHeight&&r.left>=0&&r.left<innerWidth&&Number(getComputedStyle(el).opacity)>.2;}))continue;
      await element.click();
      const open=await p.locator('.mazy-demo-dialog').evaluate(el=>el.open).catch(()=>false);
      actions.push({label:(await element.innerText()).trim(),open,sameURL:p.url()===originalURL});
      if(open)await p.keyboard.press('Escape');
      break;
    }
  }
  const invite=await p.locator('.mazy-demo-dialog').count() ? await p.locator('.mazy-demo-dialog .mazy-demo-actions a').first().getAttribute('href') : null;
  result.push({slug,back,errors,bad,actions,invite});
  await writeFile(new URL('./demo-navigation-results.json',import.meta.url),JSON.stringify(result,null,2));
  await p.close();
}
for(const slug of ['lithos-hero','convix-hero']){
  const p=await context.newPage();await p.setViewportSize({width:390,height:844});
  await p.goto(`http://127.0.0.1:4173/marketing/portfolio/${slug}/dist/index.html`);await p.waitForTimeout(1500);
  await p.getByRole('button',{name:'Abrir menu',exact:true}).click();
  let mobile;
  if(slug==='lithos-hero'){
    mobile={slug,menuOpen:await p.locator('.mazy-demo-dialog').evaluate(el=>el.open),choices:await p.locator('.mazy-demo-menu button').count()};
    await p.getByRole('button',{name:'Curso',exact:true}).last().click();mobile.courseTitle=await p.locator('.mazy-demo-dialog h2').innerText();
  }else{
    mobile={slug,menuOpen:await p.getByRole('button',{name:'Abrir menu'}).getAttribute('aria-expanded'),nav:await p.locator('[data-mazy-demo-nav]').evaluateAll(xs=>xs.map(x=>x.innerText))};
  }
  mobile.overflow=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  await p.screenshot({path:fileURLToPath(new URL('./mobile-demo-'+slug+'.png',import.meta.url))});
  result.push({mobile});await p.close();
}
await writeFile(new URL('./demo-navigation-results.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
await context.close();await browser.close();
if(result.some(x=>x.errors?.length||x.bad?.length||x.actions?.some(a=>!a.open||a.sameURL===false)))process.exitCode=1;
