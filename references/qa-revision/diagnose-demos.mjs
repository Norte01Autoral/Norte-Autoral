import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
console.log('Imported Playwright; launching Chromium');
const browser = await chromium.launch({headless:true, executablePath:process.env.LOCALAPPDATA+'/ms-playwright/chromium-1243/chrome-win64/chrome.exe',args:['--enable-unsafe-swiftshader']});
console.log('Chromium launched');
const context = await browser.newContext({viewport:{width:1440,height:900}});
const page = await context.newPage();
await page.goto('http://127.0.0.1:4173/');
await page.waitForTimeout(1800);
const cards = await page.locator('#gallery .gcard').evaluateAll(xs=>xs.map(x=>({name:x.querySelector('.cap b')?.textContent,href:x.getAttribute('href'),target:x.target,thumb:x.querySelector('img')?.getAttribute('src')})));
const results=[];
for(const card of cards){
  console.log('Checking '+card.name);
  const p = await context.newPage(); const errors=[],failed=[],bad=[];
  p.on('pageerror',e=>errors.push(e.message));
  p.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  p.on('response',r=>{if(r.status()>=400)bad.push({url:r.url(),status:r.status()});});
  const response=await p.goto('http://127.0.0.1:4173'+card.href,{waitUntil:'domcontentloaded'});
  await p.waitForTimeout(3300);
  const content = await p.evaluate(()=>({title:document.title,bodyChars:document.body.innerText.length,h1:[...document.querySelectorAll('h1')].map(x=>({text:x.innerText,opacity:getComputedStyle(x).opacity})),anchors:[...document.querySelectorAll('a[href^="#"]')].map(x=>({text:x.textContent.trim(),href:x.getAttribute('href'),targetExists:!!document.getElementById(x.getAttribute('href').slice(1))})),buttons:[...document.querySelectorAll('button')].map(x=>({text:x.textContent.trim(),aria:x.getAttribute('aria-label')})),images:[...document.querySelectorAll('img')].map(x=>({src:x.getAttribute('src'),complete:x.complete,width:x.naturalWidth,visible:!!x.getClientRects().length})),video:[...document.querySelectorAll('video')].map(x=>({poster:x.getAttribute('poster'),src:x.currentSrc,readyState:x.readyState,paused:x.paused,currentTime:x.currentTime})),loader:[...document.querySelectorAll('[class*=preload],[id*=preload],[class*=loader],[id*=loader]')].map(x=>({tag:x.tagName,id:x.id,class:x.className,text:x.textContent.trim(),display:getComputedStyle(x).display,opacity:getComputedStyle(x).opacity}))}));
  await p.screenshot({path:fileURLToPath(new URL('./demo-'+card.name.replaceAll(/[^\w]/g,'-')+'.png',import.meta.url)),fullPage:false});
  results.push({card,status:response.status(),errors,failed,bad,content});
  await p.close();
}
const clickResults=[];
for(const card of cards.filter(x=>x.href.includes('marketing'))){
  const locator=page.locator('#gallery .gcard').filter({has:page.locator(`.cap b`,{hasText:card.name})});
  await locator.evaluate(el=>el.scrollIntoView({block:'center',inline:'center',behavior:'instant'}));
  await page.waitForTimeout(500);
  const popupPromise=page.waitForEvent('popup',{timeout:3000}).catch(()=>null);
  await locator.click();
  const popup=await popupPromise;
  clickResults.push({name:card.name,opened:!!popup,url:popup?.url()});
  await popup?.close();
}
await writeFile(new URL('./demo-diagnostics.json',import.meta.url),JSON.stringify({cards,results,clickResults},null,2));
console.log(JSON.stringify({routes:results.map(x=>({name:x.card.name,status:x.status,errors:x.errors,failed:x.failed,bad:x.bad,bodyChars:x.content.bodyChars,h1:x.content.h1,missingAnchors:x.content.anchors.filter(a=>!a.targetExists)})),clickResults},null,2));
await browser.close();
