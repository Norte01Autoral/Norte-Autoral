import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '../../node_modules/playwright/index.mjs';
const publicRoot=path.resolve('public');
const screenshotDir=path.join(publicRoot,'assets/norte-autoral/cases');
const browser=await chromium.launch({headless:true,executablePath:path.join(process.env.LOCALAPPDATA,'ms-playwright/chromium-1243/chrome-win64/chrome.exe'),args:['--enable-unsafe-swiftshader']});
const results=[];
for(const slug of ['helena-vasques','vex-fitness','vex-construtora']){
 for(const mode of ['desktop','mobile']){
  const viewport=mode==='desktop'?{width:1440,height:900}:{width:390,height:844};
  const context=await browser.newContext({viewport,deviceScaleFactor:1,isMobile:mode==='mobile',hasTouch:mode==='mobile'});
  const page=await context.newPage();const errors=[],missing=[];
  await context.route('**/*',async route=>{if(!['GET','HEAD'].includes(route.request().method())) await route.abort();else await route.continue();});
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)missing.push({status:response.status(),url:response.url()});});
  await page.goto(`http://127.0.0.1:4173/cases/${slug}.html`,{waitUntil:'networkidle'});
  await page.waitForTimeout(1500);
  const shot=`${slug}-${mode}.png`;
  await page.screenshot({path:path.join(screenshotDir,shot),scale:'css'});
  const check=await page.evaluate(()=>({title:document.title,w:innerWidth,scrollW:document.documentElement.scrollWidth,ids:[...document.querySelectorAll('section[id]')].map(e=>e.id),brokenImages:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.src),buttons:[...document.querySelectorAll('button')].map(e=>({text:e.textContent.trim(),aria:e.getAttribute('aria-label')})),videos:[...document.querySelectorAll('video')].map(e=>({src:e.currentSrc,error:e.error?.code,ready:e.readyState}))}));
  results.push({slug,mode,...check,errors,missing,screenshot:shot});
  await context.close();
 }
}
await browser.close();
fs.writeFileSync('references/qa-revision/OWN-CASES-initial.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
