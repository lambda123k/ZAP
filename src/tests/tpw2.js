const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},colorScheme:'dark'});
const errs=[];p.on('pageerror',e=>errs.push(e.stack));const W=ms=>p.waitForTimeout(ms);
await p.goto('file://'+process.cwd()+'/build_out.html');await W(300);
await p.evaluate(()=>{S.me.name="Naim";S.onbDone=1;save();});await p.reload();await W(400);await p.evaluate(()=>{rgJump("a2keep");A2().vis=1;AC.tab="con";acRender();});await W(400);
await p.fill('#acConI','9h38');await p.click('.acco-go');await W(300);
await p.fill('#acConI','aide');await p.click('.acco-go');await W(300);
await p.evaluate(()=>document.getElementById('acConF').scrollIntoView({block:'end'}));await W(200);await p.screenshot({path:'pw.png'});
console.log(await p.evaluate(()=>[A2().con,A2().log.length]),'errs',errs);await b.close();})();
