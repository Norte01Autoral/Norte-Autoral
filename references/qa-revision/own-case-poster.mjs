import fs from 'node:fs';import path from 'node:path';import {chromium} from '../../node_modules/playwright/index.mjs';
const browser=await chromium.launch({headless:true,executablePath:path.join(process.env.LOCALAPPDATA,'ms-playwright/chromium-1243/chrome-win64/chrome.exe')});
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto('http://127.0.0.1:4173/cases/vex-construtora.html',{waitUntil:'networkidle'});
const poster=await page.evaluate(async()=>{const video=document.querySelector('video');await new Promise(resolve=>{if(video.readyState>=2)resolve();else video.addEventListener('loadeddata',resolve,{once:true});});video.pause();if(video.currentTime!==0.5){await new Promise(resolve=>{video.addEventListener('seeked',resolve,{once:true});video.currentTime=0.5;});}const canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;canvas.getContext('2d').drawImage(video,0,0);return canvas.toDataURL('image/jpeg',.9).split(',')[1];});
fs.writeFileSync('public/assets/norte-autoral/case-media/imagens/case-vex-construtora/hero.jpg',Buffer.from(poster,'base64'));
await browser.close();console.log('Vex hero poster extracted from actual video.');
