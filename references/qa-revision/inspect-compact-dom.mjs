import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,executablePath:process.env.LOCALAPPDATA+'/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
const context=await browser.newContext({viewport:{width:1440,height:900}});
for(const slug of ['velorah-hero','lithos-hero','convix-hero']){
 const p=await context.newPage();await p.goto(`http://127.0.0.1:4173/marketing/portfolio/${slug}/dist/index.html`);
 await p.waitForTimeout(1000);
 console.log(JSON.stringify({slug,nav:await p.locator('nav').evaluateAll(xs=>xs.map(x=>x.outerHTML)),buttons:await p.locator('button').evaluateAll(xs=>xs.map(x=>({html:x.outerHTML,parent:x.parentElement.tagName+' '+x.parentElement.className,ancestors:x.closest('header,nav,main,section')?.tagName})))},null,2));await p.close();
}
await browser.close();
