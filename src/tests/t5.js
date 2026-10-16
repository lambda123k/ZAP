const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},colorScheme:'dark'});
const errs=[];p.on('pageerror',e=>errs.push(e.stack));const W=ms=>p.waitForTimeout(ms);const sh=n=>p.screenshot({path:`x5_${n}.png`});
await p.goto('file://'+process.cwd()+'/build_out.html');await W(300);
await p.evaluate(()=>{S.me.name="Naim";S.onbDone=1;S.dev.god=1;save();});await p.reload();await W(400);
await p.evaluate(()=>rgJump("a5off"));await W(800);await p.evaluate(()=>document.querySelector('.acoffer')?.scrollIntoView({block:'center'}));await W(200);await sh('offer');
await p.click('.acoffer');await W(600);await p.evaluate(()=>document.querySelector('.acoffer')?.scrollIntoView({block:'start'}));await W(200);await sh('feed');
// vote
await p.click('#tab-now');await W(200);await p.evaluate(()=>{showView("vote");});await W(200);
await p.evaluate(()=>{ const b=document.querySelector('[data-view="vote"]'); b&&b.click(); });await W(400);await p.evaluate(()=>document.querySelector('.acvote')?.scrollIntoView({block:'center'}));await W(200);await sh('vote');
console.log('vote?',await p.evaluate(()=>!!document.querySelector('.acvote')));
// search ad
await p.click('#searchBtn');await W(200);await p.fill('#sq','one');await W(300);await sh('ad');await p.evaluate(()=>closeSearch());
await p.evaluate(()=>acDiag());await W(800);await sh('idx');
const s=async q=>{await p.fill('#acQ',q);await p.press('#acQ','Enter');await W(400);};
await s('nora 8');await s('zappeurs');await s('troisieme personne');
await p.click('[data-act="con"]');await W(300);
const cmd=async c=>{await p.fill('#acConI',c);await p.press('#acConI','Enter');await W(250);};
await cmd('lumen');await cmd('sessions 0');await cmd('demander qui est 0');await sh('con');
await p.click('[data-act="board"]');await W(200);
const ty=async(q,v)=>{await p.click(`[data-acq="${q}"]`);await W(150);await p.fill(`[data-acty="${q}"] input`,v);await p.press(`[data-acty="${q}"] input`,'Enter');await W(400);};
const pk=async(q,v)=>{await p.click(`[data-acq="${q}"]`);await W(150);await p.click(`[data-acpick="${v}"]`);await W(400);};
await pk('t1','HALDEN-OPS');await ty('t2','Nora 8.');await ty('t3','Inès Calder');await ty('t5','à Ouarka');await pk('t4','Lumen Data');await W(1500);await sh('complete');
await p.click('[data-acchx="5:zero"]');await W(800);await sh('end5');
console.log(await p.evaluate(()=>JSON.stringify([AX(5).ans,AX(5).choice,S.ac.a5p])));
// acte VI
await p.click('[data-ac="close"]');await W(300);await p.click('#tab-journal');await W(300);await p.evaluate(()=>{showJV("list");scrollTo(0,0);});await W(200);await sh('rwteaser');
await p.click('#rwTeaser');await W(500);await sh('mr1');
for(let i=0;i<10;i++){ const done=await p.evaluate(()=>!!document.querySelector('[data-mrend]')); if(done) break; await p.click('#mrOv');await W(250); if(i==3) await sh('mr4'); }
await sh('mrlast');await p.click('[data-mrend]');await W(900);await sh('idx6');
await p.click('[data-act="board"]').catch(()=>{});await W(200);
await ty('u1','MIRE');await ty('u2','parce que je dis non');await ty('u4','deux');await ty('u3','les puits de sarena');await W(1500);await sh('complete6');
await p.click('[data-acchx="6:humans"]');await W(1000);await sh('fin1');await W(8000);await sh('fin2');
await p.fill('#finForm input','Dis non. Jusqu\'au bout.');await p.press('#finForm input','Enter');await W(800);await sh('fin3');
await p.click('[data-finclose]');await W(300);await p.evaluate(()=>showTab("profil"));await W(200);await p.evaluate(()=>document.querySelector('.acctr')?.scrollIntoView({block:'center'}));await W(200);await sh('profile');
console.log(await p.evaluate(()=>[S.ac.legacy,AX(6).choice,Object.keys(S.ac.cp)]));
console.log('errs',errs);await b.close();})();
