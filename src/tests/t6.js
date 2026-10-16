const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.stack));const W=ms=>p.waitForTimeout(ms);
await p.goto('file://'+process.cwd()+'/build_out.html');await W(300);
await p.evaluate(()=>{S.me.name="Naim";S.onbDone=1;save();});await p.reload();await W(400);
for(const j of ['a4req','a4go','a4all','a4end','a5off','a5all','a5end','a6rw','a6go','a6end']){ await p.evaluate(j=>rgJump(j),j); await W(700); console.log(j, await p.evaluate(()=>[curAct(), !document.getElementById('acOv').hidden])); }
// perdre à l'acte IV
await p.evaluate(()=>{rgJump("a4go");});await W(600);await p.evaluate(()=>{S.ac.exp=4;save();});
await p.click('[data-act="board"]');await W(100);await p.click('[data-acq="s1"]');await W(100);await p.fill('[data-acty="s1"] input','3');await p.press('[data-acty="s1"] input','Enter');await W(5600);
console.log('lose',await p.evaluate(()=>[S.ac.end,!!document.getElementById('acRetry')]));
await p.click('#acRetry');await W(900);console.log('retry',await p.evaluate(()=>[curAct(),S.ac.end,S.ac.exp]));
// fins
for(const c of ['mire','off','publish']){ await p.evaluate(()=>rgJump("a6end"));await W(800); await p.click(`[data-acchx="6:${c}"]`);await W(300); console.log(c, (await p.evaluate(()=>document.getElementById('finIn').innerText)).slice(0,160).replace(/\n/g,' | ')); await p.evaluate(()=>{$("finOv").hidden=true;}); }
console.log('errs',errs);await b.close();})();
