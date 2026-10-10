import {chromium} from 'playwright';import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:process.env.LOCALAPPDATA+'/ms-playwright/chromium-1243/chrome-win64/chrome.exe',args:['--enable-unsafe-swiftshader']});
const rows=[];
const defaults=await browser.newContext({viewport:{width:1440,height:900}});const d=await defaults.newPage();await d.goto('http://127.0.0.1:4173/');await d.waitForTimeout(4000);
rows.push({name:'default OS preference',reduced:await d.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),ready:await d.evaluate(()=>window.sabecReady)});await defaults.close();
for(const [name,url]of [['reference','https://www.sabec.dev/'],['local','http://127.0.0.1:4173/']]){
 const c=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'no-preference',isMobile:true,hasTouch:true});const p=await c.newPage();await p.goto(url);await p.waitForTimeout(2500);
 const initial=await p.evaluate(()=>({ready:window.sabecReady,hojeOn:document.getElementById('hoje').classList.contains('on'),wordCount:document.querySelectorAll('.wi').length,triggers:window.ScrollTrigger?.getAll().length}));
 const steps=[];
 for(let i=0;i<4;i++){
  const y=await p.locator('#jd-steps .step').nth(i).evaluate(el=>{const r=el.getBoundingClientRect();return scrollY+r.top+r.height/2-innerHeight*.685});await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(1800);
  steps.push(await p.evaluate(()=>({s:document.getElementById('jd').getAttribute('data-s'),active:[...document.querySelectorAll('#jd-steps .on')].map(x=>x.getAttribute('data-s')),images:[...document.querySelectorAll('#jd .feat-shots img')].map(x=>({opacity:getComputedStyle(x).opacity,width:x.naturalWidth})),stickyTop:document.querySelector('#jd').getBoundingClientRect().top,overflow:document.documentElement.scrollWidth-innerWidth})));
 }
 rows.push({name,viewport:[390,844],initial,steps});await c.close();
}
await writeFile(new URL('./motion-mobile-default.json',import.meta.url),JSON.stringify(rows,null,2));console.log(JSON.stringify(rows,null,2));await browser.close();
