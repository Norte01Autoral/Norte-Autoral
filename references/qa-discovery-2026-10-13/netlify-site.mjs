import {spawn} from 'node:child_process';
const cli='C:/Users/User/AppData/Local/npm-cache/_npx/b3ca12a867cd0704/node_modules/netlify-cli/bin/run.js';
const child=spawn(process.execPath,[cli,'api','getSite','--data',JSON.stringify({site_id:'3eb337d6-85fb-4e13-9ce3-28db1f369506'})],{shell:false,windowsHide:true,env:{...process.env,NETLIFY_CLI_TELEMETRY_DISABLED:'1'}});
let output='',error='';child.stdout.on('data',p=>output+=p);child.stderr.on('data',p=>error+=p);
const code=await new Promise((resolve,reject)=>{child.once('close',resolve);child.once('error',reject);});
if(code!==0)throw new Error('Authenticated site lookup failed; raw response suppressed');
const site=JSON.parse(output);
console.log(JSON.stringify({id:site.id,name:site.name,custom_domain:site.custom_domain,published_deploy:site.published_deploy?.id,force_ssl:site.force_ssl,password_set:!!site.password,plan:site.plan,account_slug:site.account_slug}));
