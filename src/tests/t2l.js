const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.stack));const W=ms=>p.waitForTimeout(ms);
await p.goto('file://'+process.cwd()+'/build_out.html');await W(300);
await p.evaluate(()=>{S.me.name="Naim";S.onbDone=1;save();rgJump("a2con");S.ac.exp=4;save();});await W(500);
await p.fill('#acConI','trace 185.62.40.17');await p.press('#acConI','Enter');await W(6500);
console.log(await p.evaluate(()=>[S.ac.end,!document.getElementById('acCrash').hidden,document.querySelector('.acover-t')?.textContent]));
console.log('errs',errs);await b.close();})();
