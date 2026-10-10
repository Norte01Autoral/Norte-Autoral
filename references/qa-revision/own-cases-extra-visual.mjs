import path from 'node:path';import {chromium} from '../../node_modules/playwright/index.mjs';
const browser=await chromium.launch({headless:true,executablePath:path.join(process.env.LOCALAPPDATA,'ms-playwright/chromium-1243/chrome-win64/chrome.exe'),args:['--enable-unsafe-swiftshader']});
try{
for(const mode of ['desktop','mobile']){
 const context=await browser.newContext({viewport:mode==='desktop'?{width:1440,height:900}:{width:390,height:844},isMobile:mode==='mobile',hasTouch:mode==='mobile'});const page=await context.newPage();
 await page.goto('http://127.0.0.1:4173/cases/vex-fitness.html',{waitUntil:'networkidle'});await page.waitForTimeout(1300);
 await page.getByRole('button',{name:'12 meses',exact:true}).click();await page.waitForTimeout(1400);await page.screenshot({path:`public/assets/norte-autoral/cases/vex-fitness-planos-${mode}.png`,scale:'css'});
 console.log(mode,'price tabs',await page.locator('#planos button').evaluateAll(elements=>elements.map(e=>({text:e.textContent,background:getComputedStyle(e).backgroundColor,color:getComputedStyle(e).color}))));
 await page.goto('http://127.0.0.1:4173/cases/vex-construtora.html',{waitUntil:'networkidle'});await page.waitForTimeout(1200);await page.getByRole('button',{name:/Tipo B/}).click();
 await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';const el=document.querySelector('#canvas-3d-container');window.scrollTo(0,el.getBoundingClientRect().top+scrollY-160);});await page.waitForTimeout(1400);await page.screenshot({path:`public/assets/norte-autoral/cases/vex-construtora-planta-${mode}.png`,scale:'css'});
 await context.close();
}
}finally{await browser.close();}
