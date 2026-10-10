import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const dir=fileURLToPath(new URL('./',import.meta.url));await mkdir(dir,{recursive:true});
const entries=[['velorah-hero','dist/'],['lithos-hero','dist/'],['dentista-clinica-vertice',''],['convix-hero','dist/'],['aureo-arquitetura',''],['confeitaria-margo',''],['instituto-liminar',''],['verene-odontologia',''],['arquitetura-estudio-linha','']];
const browser=await chromium.launch({headless:true,executablePath:process.env.LOCALAPPDATA+'/ms-playwright/chromium-1243/chrome-win64/chrome.exe',args:['--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const result=[];
for(const [slug,sub]of entries){
 console.log('Checking '+slug);const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 const response=await p.goto(`http://127.0.0.1:4173/marketing/portfolio/${slug}/${sub}index.html`,{waitUntil:'domcontentloaded'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
 const data=await p.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content||null,oldVisible:/sabec|diogo|sabec\.dev/i.test(document.body.innerText),credits:[...document.querySelectorAll('a')].filter(x=>x.textContent.trim()==='Norte Autoral · Gabriel Holanda').map(x=>({text:x.textContent.trim(),href:x.getAttribute('href'),target:x.getAttribute('target'),parentText:x.parentElement.innerText.trim()})),overflow:document.documentElement.scrollWidth-innerWidth}));
 if(!sub){
  const credit=p.getByRole('link',{name:'Norte Autoral · Gabriel Holanda',exact:true});await credit.scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('.mazy-demo-return').hidden);
  data.footerReturnHidden=await p.locator('.mazy-demo-return').evaluate(x=>x.hidden);
  const footer=p.locator('footer').filter({has:credit});
  await (await footer.count()?footer:credit.locator('..')).screenshot({path:dir+slug+'-footer-desktop.png'});
  if(['aureo-arquitetura','instituto-liminar','arquitetura-estudio-linha'].includes(slug)){
   await p.setViewportSize({width:390,height:844});await p.waitForTimeout(200);await credit.scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('.mazy-demo-return').hidden);
   data.mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,footerReturnHidden:document.querySelector('.mazy-demo-return').hidden}));
   await (await footer.count()?footer:credit.locator('..')).screenshot({path:dir+slug+'-footer-mobile.png'});
  }
  await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await p.waitForFunction(()=>!document.querySelector('.mazy-demo-return').hidden);
  data.returnRestored=await p.locator('.mazy-demo-return').isVisible();
  if(slug==='arquitetura-estudio-linha'){
   await credit.click();await p.waitForURL('http://127.0.0.1:4173/');data.creditNavigation=p.url();
  }
 }
 result.push({slug,status:response.status(),errors,...data});await p.close();
}
await writeFile(new URL('./templates-credit-results.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));await context.close();await browser.close();
if(result.some(x=>x.status!==200||x.errors.length||x.oldVisible||x.overflow>0||x.mobile?.overflow>0||x.footerReturnHidden===false||x.mobile?.footerReturnHidden===false||x.returnRestored===false))process.exitCode=1;
