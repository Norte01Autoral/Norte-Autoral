import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const qa=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(qa,'../..');
const config=JSON.parse(await fs.readFile(path.join(qa,'indexnow-config.json'),'utf8'));
const key=(await fs.readFile(path.join(root,'public',config.publicVerificationFile),'utf8')).trim();
if(!/^[a-f0-9]{32}$/.test(key)||config.host!=='norteautoral.site'||config.urlList.some(url=>new URL(url).hostname!==config.host))throw new Error('Invalid host proof or notification scope');
const pages=await Promise.all(config.urlList.map(async url=>{const r=await fetch(url,{signal:AbortSignal.timeout(20000)});const bytes=Buffer.from(await r.arrayBuffer());if(r.status!==200||r.redirected)throw new Error('Canonical URL is not a direct 200: '+url);return {url,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};}));
const fingerprint=crypto.createHash('sha256').update(JSON.stringify(pages)).digest('hex');
const reportPath=path.join(qa,'indexnow-submission.json');
try {const old=JSON.parse(await fs.readFile(reportPath,'utf8'));if(old.notificationAccepted&&old.contentFingerprint===fingerprint){console.log('Same content already notified; request not repeated.');process.exit(0);}}catch(error){if(error.code!=='ENOENT')throw error;}
const proof=await fetch(config.keyLocation,{signal:AbortSignal.timeout(20000)});
if(proof.status!==200||(await proof.text()).trim()!==key)throw new Error('Published host proof does not match; request not sent');
const endpoint='https://api.indexnow.org/indexnow';
const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:config.host,key,keyLocation:config.keyLocation,urlList:config.urlList}),signal:AbortSignal.timeout(25000)});
const body=(await response.text()).replaceAll(key,'[public host proof]').slice(0,1000);
const report={submittedAtUtc:new Date().toISOString(),endpoint,host:config.host,urls:config.urlList,httpStatus:response.status,notificationAccepted:[200,202].includes(response.status),keyValidationPending:response.status===202,publishedProofChecked:true,contentFingerprint:fingerprint,pages,responseBody:body,meaning:'Notification receipt only; does not prove crawling, indexing or recommendation by an AI system.',source:'https://www.indexnow.org/documentation'};
await fs.writeFile(reportPath,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({httpStatus:report.httpStatus,urlsNotified:report.urls.length,notificationAccepted:report.notificationAccepted,keyValidationPending:report.keyValidationPending}));
if(!report.notificationAccepted)process.exitCode=1;
