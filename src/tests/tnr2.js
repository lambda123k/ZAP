const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.stack));const W=ms=>p.waitForTimeout(ms);
await p.goto('file://'+process.cwd()+'/build_out.html');await W(300);
await p.evaluate(()=>{S.me.name="Naim";S.onbDone=1;save();});await p.reload();await W(400);
await p.evaluate(()=>document.querySelector('.card [data-a="later"]').scrollIntoView({block:'center'}));await p.click('.card [data-a="later"]');await W(60);
console.log(await p.evaluate(()=>[document.getElementById('list').className,!!document.querySelector('.enthint'),S.ac.refuse]));
console.log('errs',errs);await b.close();})();
