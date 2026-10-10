import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const entries=[['velorah-hero','dist/'],['lithos-hero','dist/'],['dentista-clinica-vertice',''],['convix-hero','dist/'],['aureo-arquitetura',''],['confeitaria-margo',''],['instituto-liminar',''],['verene-odontologia',''],['arquitetura-estudio-linha','']];
const directory=fileURLToPath(new URL('../../public/assets/portfolio-heroes/',import.meta.url));
await mkdir(directory,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.LOCALAPPDATA+'/ms-playwright/chromium-1243/chrome-win64/chrome.exe',args:['--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const results=[];
for(const [slug,sub]of entries){
  console.log('Capturing '+slug);
  const p=await context.newPage();
  await p.goto(`http://127.0.0.1:4173/marketing/portfolio/${slug}/${sub}index.html`,{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(5500);
  await p.evaluate(()=>scrollTo({top:0,left:0,behavior:'instant'}));
  await p.screenshot({path:directory+slug+'.jpg',type:'jpeg',quality:88,fullPage:false});
  results.push({slug,title:await p.title(),viewport:[1440,900],scrollY:await p.evaluate(()=>scrollY),path:'/assets/portfolio-heroes/'+slug+'.jpg'});
  await p.close();
}
await writeFile(new URL('./hero-captures.json',import.meta.url),JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
await context.close();
await browser.close();
