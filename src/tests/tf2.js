const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const cs of ['light','dark']){
const p=await b.newPage({viewport:{width:390,height:844},colorScheme:cs});
const errs=[];p.on('pageerror',e=>errs.push(e.stack));const W=ms=>p.waitForTimeout(ms);const sh=n=>p.screenshot({path:`f_${cs}_${n}.png`});
await p.goto('file://'+process.cwd()+'/build_out.html');await W(300);
await p.evaluate(()=>{S.me.name="Naim";S.onbDone=1;save();});await p.reload();await W(400);
await p.click('#tab-potes');await W(300);
await p.evaluate(()=>document.getElementById('friendsPanel').scrollIntoView());await W(200);await sh('start');
if(cs==='dark'){await p.close();console.log('errs',errs);continue;}
await p.click('[data-facc="chloe"]');await W(300);await p.click('[data-fref="noah"]');await W(300);
await p.evaluate(()=>document.getElementById('friendsPanel').scrollIntoView());await sh('afterreq');
await p.click('[data-fadd="karim"]');await W(300);
await p.fill('#fq','jad');await W(200);await sh('search');await p.click('#fRes [data-fadd="jade"]');await W(200);await p.fill('#fq','');
await p.click('[data-flist]');await W(100);await p.click('[data-frm="tom"]');await W(100);await p.click('[data-frmok="tom"]');await W(300);
await W(8500);
console.log(await p.evaluate(()=>JSON.stringify([S.soc.friends,S.soc.reqIn,S.soc.reqOut,Object.keys(FRIENDS),FR_RATINGS.map(x=>x.who).join(','),document.getElementById('cPotes').textContent])));
await p.evaluate(()=>document.getElementById('potesFeed').scrollIntoView());await W(200);await sh('feed');
// vote en direct / conseiller avec la nouvelle liste
await p.evaluate(()=>{showTab('now');});await W(200);
console.log('errs',errs);await p.close();}
await b.close();})();
