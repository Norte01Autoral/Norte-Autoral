import fs from 'node:fs';import path from 'node:path';import {chromium} from '../../node_modules/playwright/index.mjs';
const browser=await chromium.launch({headless:true,executablePath:path.join(process.env.LOCALAPPDATA,'ms-playwright/chromium-1243/chrome-win64/chrome.exe'),args:['--enable-unsafe-swiftshader']});
try {
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto('http://127.0.0.1:4173/cases/helena-vasques.html',{waitUntil:'networkidle'});await page.waitForTimeout(1500);
for(const [id,label,file] of [['situacoes','Quando procurar','helena-vasques-02-situacoes.jpg'],['atuacao','Áreas','helena-vasques-03-atuacao.jpg'],['advogada','Quem atende','helena-vasques-04-advogada.jpg']]){
 await page.getByRole('banner').getByRole('link',{name:label,exact:true}).click();await page.waitForTimeout(2000);
 await page.screenshot({path:'public/assets/norte-autoral/cases/'+file,type:'jpeg',quality:90,scale:'css'});
 console.log(id,await page.locator('#'+id+' h2').first().evaluate(e=>({visible:e.getBoundingClientRect().top>=100&&e.getBoundingClientRect().bottom<=innerHeight,transforms:[...e.querySelectorAll('span[style*=transform]')].map(x=>getComputedStyle(x).transform)})));
}
await page.close();
for(const mode of ['desktop','mobile']){
 const context=await browser.newContext({viewport:mode==='desktop'?{width:1440,height:900}:{width:390,height:844},isMobile:mode==='mobile',hasTouch:mode==='mobile'});const page=await context.newPage();
 await page.goto('http://127.0.0.1:4173/cases/vex-construtora.html',{waitUntil:'networkidle'});await page.waitForTimeout(1300);
 await page.getByRole('button',{name:/Tipo B/}).click();
 await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';const el=document.querySelector('#canvas-3d-container');window.scrollTo(0,el.getBoundingClientRect().top+scrollY-160);});
 await page.waitForTimeout(1300);await page.screenshot({path:`public/assets/norte-autoral/cases/vex-construtora-planta-${mode}.png`,scale:'css'});
 console.log(mode,await page.locator('#canvas-3d-container').evaluate(e=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,fits:b.x>=0&&b.y>=130&&b.right<=innerWidth&&b.bottom<=innerHeight};}));
 await context.close();
}
}finally{await browser.close();}
