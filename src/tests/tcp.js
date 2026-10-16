const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},colorScheme:'dark'});
const errs=[];p.on('pageerror',e=>errs.push(e.stack));const W=ms=>p.waitForTimeout(ms);const sh=n=>p.screenshot({path:`cp_${n}.png`});
await p.goto('file://'+process.cwd()+'/build_out.html');await W(300);
await p.evaluate(()=>{S.me.name="Naim";S.onbDone=1;save();});await p.reload();await W(400);
for(let i=1;i<=15;i++){ await p.evaluate(()=>document.querySelector('.card [data-a="later"]').scrollIntoView({block:'center'})); await p.click('.card [data-a="later"]'); await W(100);}
await W(4000);console.log('cp after crash',await p.evaluate(()=>Object.keys(S.ac.cp||{})));
await p.evaluate(()=>rgJump("hot"));await W(6500);console.log('cp after hot',await p.evaluate(()=>Object.keys(S.ac.cp||{})), await p.evaluate(()=>!document.getElementById('acOv').hidden));
await sh('index');await p.click('[data-act="board"]');await W(200);
await p.click('[data-achint]');await W(200);await p.click('[data-achint]');await W(200);await sh('hint');
await p.click('[data-cpopen]');await W(200);await p.click('[data-cpk="a1"]');await W(200);await sh('menu');
await p.click('[data-cpgo="a1"]');await W(600);await sh('loaded_a1');console.log('a1 state',await p.evaluate(()=>[S.ac.on,S.ac.f0417,document.getElementById('acCrash').className]));
// perdre depuis l'index
await p.evaluate(()=>{acCpLoad("a1i");});await W(600);
await p.evaluate(()=>{S.ac.exp=4;save();});
await p.click('[data-act="board"]');await W(100);await p.click('[data-acq="q1"]');await W(100);
await p.evaluate(()=>{acKw("LD-22");acPanel();});await p.click('[data-acpick="LD-22"]');await W(5600);await sh('over');
await p.click('#acRetry');await W(800);console.log('after retry',await p.evaluate(()=>[S.ac.end,S.ac.exp,!document.getElementById('acOv').hidden,document.getElementById('acCrash').hidden]));await sh('retry');
await p.click('[data-ac="close"]');await W(200);await p.click('#tab-potes');await W(300);await p.evaluate(()=>document.getElementById('friendsPanel').scrollIntoView());await W(200);
await p.evaluate(()=>document.querySelector('.acinesrow')?.scrollIntoView({block:'center'}));await W(200);await sh('ines');
await p.evaluate(()=>rgJump("a2keep"));await W(700);console.log('cp a2',await p.evaluate(()=>Object.keys(S.ac.cp)));
await p.click('[data-act="board"]');await W(200);await p.click('[data-achint]');await W(200);await sh('a2hint');
await p.click('[data-cpopen]');await W(200);await sh('menu2');
await p.click('[data-cpk="all"]');await W(100);await p.click('[data-cpgo="all"]');await W(500);console.log('reset',await p.evaluate(()=>[S.ac.on,S.ac.refuse,!!S.ac.cp]));
console.log('errs',errs);await b.close();})();
