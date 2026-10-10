import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const output=fileURLToPath(new URL('./',import.meta.url));
await mkdir(output,{recursive:true});
const liveResponse=await fetch('https://www.sabec.dev/');
const liveSource=await liveResponse.text();
await writeFile(new URL('./live-root.html',import.meta.url),liveSource);
const savedSource=await readFile(new URL('../source/www-root.html',import.meta.url),'utf8');
const localSource=await readFile(new URL('../../public/index.html',import.meta.url),'utf8');
const hash=s=>createHash('sha256').update(s).digest('hex');
function sourceInfo(source){
 const inline=[...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(x=>x[1]);
 const motion=inline.find(x=>x.includes('function sabecInit()'));
 const scene=inline.find(x=>x.includes("scene('jd-steps', 'jd')"))?.split('/* ============ cenas guiadas')[1]?.split('/* ============ galeria')[0];
 const style=[...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>x[1]).join('\n');
 const scripts=[...source.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*>/gi)].map(x=>x[1]);
 return {motionHash:hash(motion||''),sceneHash:hash(scene||''),mainStyleHash:hash(style),motionChars:motion?.length,sceneChars:scene?.length,scripts,hasHoje:source.includes('id="hoje"'),hasJD:source.includes('id="jd"')};
}
const sources={live:{status:liveResponse.status,info:sourceInfo(liveSource)},saved:{info:sourceInfo(savedSource)},local:{info:sourceInfo(localSource)}};
await writeFile(new URL('./source-comparison.json',import.meta.url),JSON.stringify(sources,null,2));
console.log(JSON.stringify(sources,null,2));
const browser=await chromium.launch({headless:true,executablePath:process.env.LOCALAPPDATA+'/ms-playwright/chromium-1243/chrome-win64/chrome.exe',args:['--enable-unsafe-swiftshader']});
const scenarios=[['reference','https://www.sabec.dev/','no-preference',false],['local','http://127.0.0.1:4173/','no-preference',false],['local-reduced','http://127.0.0.1:4173/','reduce',false],['local-no-libs','http://127.0.0.1:4173/','no-preference',true]];
const results=[];
for(const [name,url,reducedMotion,block]of scenarios){
 console.log('Scenario '+name);
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion});
 if(block)await context.route('**/*',route=>/\/(?:gsap|ScrollTrigger)\.min-/.test(route.request().url())?route.abort():route.continue());
 const p=await context.newPage();const errors=[],failed=[],bad=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));p.on('response',r=>{if(r.status()>=400)bad.push({url:r.url(),status:r.status()});});
 await p.goto(url,{waitUntil:'domcontentloaded'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(4200);
 const initial=await p.evaluate(()=>({title:document.title,sabecReady:window.sabecReady,js:document.documentElement.classList.contains('js'),reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,gsap:!!window.gsap,ScrollTrigger:!!window.ScrollTrigger,Lenis:!!window.Lenis,hojeOn:document.getElementById('hoje').classList.contains('on'),wordCount:document.querySelectorAll('.wi').length,triggers:window.ScrollTrigger?.getAll().map(t=>({trigger:t.trigger?.id||t.trigger?.className||'',start:t.start,end:t.end,pin:!!t.pin,scrub:t.vars.scrub}))}));
 async function scroll(y){await p.evaluate(y=>{window.scrollTo({top:y,behavior:'instant'});window.ScrollTrigger?.update();},y);await p.waitForTimeout(1300);}
 async function state(){return p.evaluate(()=>{
  const get=s=>{const el=document.querySelector(s);if(!el)return null;const r=el.getBoundingClientRect(),cs=getComputedStyle(el);return {rect:{x:r.x,y:r.y,width:r.width,height:r.height},opacity:cs.opacity,transform:cs.transform,position:cs.position};};
  return {scrollY,hoje:get('#hoje'),beatA:get('#hoje .beat-a'),beatB:get('#hoje .beat-b'),frag:get('#hoje .fr'),hcards:[...document.querySelectorAll('#hoje .hcard')].map(el=>({opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform})),jdState:document.getElementById('jd').getAttribute('data-s'),jdImages:[...document.querySelectorAll('#jd .feat-shots img')].map(el=>({class:el.className,src:el.getAttribute('src'),complete:el.complete,naturalWidth:el.naturalWidth,opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform})),stepStates:[...document.querySelectorAll('#jd-steps .step')].map(el=>({s:el.getAttribute('data-s'),on:el.classList.contains('on'),opacity:getComputedStyle(el).opacity})),words:[...document.querySelectorAll('#sites .shead .wi')].slice(0,5).map(el=>({text:el.innerText,transform:getComputedStyle(el).transform})),caseDesk:get('.case-desk'),photo:get('.photo img')};
 });}
 const hoje=[];
 const range=await p.evaluate(()=>{const t=window.ScrollTrigger?.getAll().find(t=>t.trigger?.id==='hoje');const el=document.getElementById('hoje');return t?{start:t.start,end:t.end}:{start:el.getBoundingClientRect().top+scrollY,end:el.getBoundingClientRect().bottom+scrollY};});
 for(const progress of [0,.2,.45,.7,1]){await scroll(range.start+(range.end-range.start)*progress);const s=await state();hoje.push({progress,state:s});if(['reference','local'].includes(name)&&[0,.45,1].includes(progress))await p.screenshot({path:output+name+'-hoje-'+Math.round(progress*100)+'.png'});}
 const jd=[];
 for(let i=0;i<4;i++){
  const target=await p.locator('#jd-steps .step').nth(i).evaluate(el=>{const r=el.getBoundingClientRect();return scrollY+r.top+r.height/2-innerHeight/2;});
  await scroll(target);const s=await state();jd.push({step:i+1,state:s});if(['reference','local'].includes(name))await p.screenshot({path:output+name+'-jd-'+(i+1)+'.png'});
 }
 results.push({name,url,initial,errors,failed,bad,hojeRange:range,hoje,jd});
 await writeFile(new URL('./motion-browser-results.json',import.meta.url),JSON.stringify(results,null,2));
 await context.close();
}
await browser.close();
console.log(JSON.stringify(results.map(r=>({name:r.name,initial:{...r.initial,triggers:r.initial.triggers?.length},errors:r.errors,failed:r.failed,bad:r.bad,hoje:r.hoje.map(x=>({p:x.progress,y:x.state.scrollY,frag:x.state.frag.transform,card:x.state.hcards[0]})),jd:r.jd.map(x=>({requested:x.step,actual:x.state.jdState,active:x.state.stepStates.filter(x=>x.on).map(x=>x.s)}))})),null,2));
