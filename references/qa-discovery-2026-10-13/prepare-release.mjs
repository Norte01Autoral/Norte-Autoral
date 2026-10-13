import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const qa = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(qa,'../..');
const workspace = path.dirname(root);
const previous = path.join(workspace,'backups/historico-portfolio/clone-v1-netlify-favicon-2026-10-10');
const stage = path.join(workspace,'publicacao-seo-ia-2026-10-13');
const exclusions = JSON.parse(fs.readFileSync(path.join(root,'scripts/hostinger-exclusions.json'),'utf8'));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function filesIn(directory) {
  return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry => {
    if(entry.isSymbolicLink())throw new Error('Symlink refused: '+entry.name);
    return entry.isDirectory() ? filesIn(path.join(directory,entry.name)).map(p=>entry.name+'/'+p) : [entry.name];
  }).sort();
}
const files = [...filesIn(path.join(root,'public')).filter(p=>!exclusions.some(prefix=>p.startsWith(prefix))),'_headers','_redirects'].sort();
if(path.dirname(stage)!==workspace)throw new Error('Destination outside intended workspace');
fs.mkdirSync(stage,{recursive:true});
if(filesIn(stage).some(p=>!files.includes(p)))throw new Error('Unexpected files in destination; no removal performed');
const indexNow=JSON.parse(fs.readFileSync(path.join(qa,'indexnow-config.json'),'utf8'));
const expectedNew=['trafego-pago/index.html','automacao/index.html','assets/norte-autoral/servicos.css',indexNow.publicVerificationFile].sort();
const expectedModified=['index.html','sitemap.xml','_headers','_redirects'].sort();
const added=[],modified=[],inventory=[];
for(const file of files) {
  if(/(^|\/)(\.git|\.netlify|node_modules|backups)(\/|$)/.test(file)||/\.(zip|log)$/.test(file))throw new Error('Forbidden publication file: '+file);
  const source=file.startsWith('_') ? path.join(root,'hosting/netlify',file) : path.join(root,'public',file);
  const bytes=fs.readFileSync(source);
  const old=path.join(previous,file);
  if(!fs.existsSync(old))added.push(file);
  else if(hash(bytes)!==hash(fs.readFileSync(old)))modified.push(file);
  const destination=path.join(stage,file);
  fs.mkdirSync(path.dirname(destination),{recursive:true});
  fs.copyFileSync(source,destination);
  if(hash(bytes)!==hash(fs.readFileSync(destination)))throw new Error('Copy mismatch: '+file);
  inventory.push({file,bytes:bytes.length,sha256:hash(bytes)});
}
if(JSON.stringify(added.sort())!==JSON.stringify(expectedNew)||JSON.stringify(modified.sort())!==JSON.stringify(expectedModified))throw new Error('Unexpected publication changes');
if(filesIn(previous).filter(p=>!p.startsWith('.netlify/')).some(p=>!files.includes(p)))throw new Error('Previous public file omitted');
const restoredPaths=[
  ['clone-v1-original-2026-10-09/clone-v1-original.zip','43c69bf92cb90b67ebea2e4aaacec541de6e6d008ae8981bbc795ae4b39c2f5a'],
  ['clone-v1-norte-autoral-2026-10-09/clone-v1-norte-autoral.zip','32ec9db2627ac097f5d4105b21c22940db28fa16262931f3af97099e9a81cc45'],
  ['clone-v1-jd-motion-2026-10-10/clone-v1-norte-autoral.zip','9d7bbc063af997c257d70b5f2b6c469f822fc6d606eb0d669eb0b949ea014672'],
  ['clone-v1-norte-os-2026-10-10/clone-v1-norte-autoral.zip','12ceecf1b6735658a9a897c1fd1ffc12d8a30ebf93227e3d2e866c9cbc0e45e4']
];
const backups=restoredPaths.map(([p,sha])=>{const file=path.join(workspace,'backups/historico-portfolio/clone v1/backups',p);if(hash(fs.readFileSync(file))!==sha)throw new Error('Restoration archive changed: '+p);return {path:p,sha256:sha,verifiedUnchanged:true};});
const oldHome=fs.readFileSync(path.join(previous,'index.html'),'utf8');
const newHome=fs.readFileSync(path.join(root,'public/index.html'),'utf8');
const scripts=html=>[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m=>!m[1].includes('application/ld+json')).map(m=>m[0]);
if(JSON.stringify(scripts(oldHome))!==JSON.stringify(scripts(newHome)))throw new Error('Home behavior script changed');
const oldStyle=oldHome.match(/<style>([\s\S]*?)<\/style>/)?.[1];
const newStyle=newHome.match(/<style>([\s\S]*?)<\/style>/)?.[1].replace('.t-foot a{color:var(--ice);text-decoration:underline;text-underline-offset:4px}\n','');
if(oldStyle!==newStyle)throw new Error('Home style changed beyond the added link style');
const report={preparedAtUtc:new Date().toISOString(),stage,previous,files:files.length,added,modified,homeBehaviorScriptsPreserved:true,homeCssPreservedExceptAddedLinkStyle:true,otherExistingPublicFilesUnchanged:true,adaptersIncluded:true,backupVerification:backups,publicationInventory:inventory};
fs.writeFileSync(path.join(qa,'release-preparation.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({stage,files:files.length,addedFiles:added.length,modified,backupsPreserved:backups.length}));
