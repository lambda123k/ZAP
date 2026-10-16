const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},colorScheme:'dark'});
const errs=[];p.on('pageerror',e=>errs.push(e.stack));const W=ms=>p.waitForTimeout(ms);
await p.goto('file://'+process.cwd()+'/build_out.html');await W(400);
await p.fill('#wName','Naim');await p.press('#wName','Enter');await W(500);await p.screenshot({path:'sd_onb.png'});
await p.evaluate(()=>finishOnb&&finishOnb());await W(300);
await p.evaluate(()=>{const r=Math.random;Math.random=()=>0.01;setTimeout(()=>Math.random=r,50);zapRandom();});await W(330);
await p.screenshot({path:'sd_flash.png'});await W(1200);
for(let i=0;i<3;i++){await p.evaluate(()=>{closeZap();document.querySelector('.card [data-a="later"]').click();});await W(150);}
await p.evaluate(()=>{rgJump("a2con");});await W(500);
for(const q of ['demander es-tu Inès ?','demander qui a écrit le compteur ?']){await p.fill('#acConI',q);await p.press('#acConI','Enter');await W(250);}
console.log(await p.evaluate(()=>JSON.stringify([S.tr,A2().asked])));
console.log('errs',errs);await b.close();})();
