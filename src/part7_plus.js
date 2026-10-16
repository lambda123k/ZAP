
/* ================= v13 : accueil, recherche, potes+, zap au hasard, badges, rewind, suites ================= */
const APP_URL="https://lambda123k.github.io/ZAP/";
function suiteOf(t){ return (typeof SUITES!=="undefined"&&t&&SUITES[t.n])||null; }
function kindShort(t){ return t.t==="film"?`film · ${fmt(t.d)}`:`${t.t==="anime"?"anime":"série"} · ${t.d} min/ép.`; }
S.soc.sent=S.soc.sent||[]; S.soc.recoDone=S.soc.recoDone||{};
S.badges=S.badges||null; S.days=S.days||[]; S.epLog=S.epLog||[]; S.suitesSeen=S.suitesSeen||{};
{ const d=new Date(), k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); if(!S.days.includes(k)){ S.days.push(k); S.days=S.days.slice(-60); } }
const anyOverlay=()=>["welcome","searchOv","recoOv","zapOv","rwOv","qOv","ltOv","acOv","dgOv","acCrash","rgOv","cpOv","mrOv","finOv"].some(id=>{ const e=$(id); return e&&!e.hidden; });
const lockScroll=()=>document.body.classList.toggle("noscroll",anyOverlay());

async function shareOrCopy(data,okMsg){
  try{ if(navigator.share){ await navigator.share(data); return true; } }catch(e){ if(e&&e.name==="AbortError") return false; }
  const txt=(data.text?data.text+"\n":"")+(data.url||"");
  try{ await navigator.clipboard.writeText(txt); toast(okMsg||"Lien copié : colle-le dans ta conversation.",3200); return true; }catch(e){}
  toast("Copie ce lien : "+(data.url||""),5000); return false;
}

/* ---------- 1. accueil : prénom puis goûts ---------- */
const ONB=["Stranger Things","Arcane","Squid Game","Mercredi","La Casa de Papel","Lupin","Frieren","One Piece","Demon Slayer","Spy x Family","Solo Leveling","L'Attaque des Titans","Dan Da Dan","The Bear","The Boys","Severance","Fallout","The Mandalorian","Brooklyn Nine-Nine","Le Château ambulant","Le Voyage de Chihiro","Coco","Avengers: Endgame","Glass Onion"];
let onbSel=new Set();
function openWelcome(step){
  const w=$("welcome"); w.hidden=false; $("wStep1").hidden=step!==1; $("wStep2").hidden=step!==2;
  if(step===1){ $("wLogo").src=document.querySelector(".appicon").src; setTimeout(()=>$("wName").focus(),350); }
  else { onbSel=new Set(); renderOnb(); $("w2Title").textContent=S.me.name?`${S.me.name}, qu'est-ce que tu as aimé ?`:"Qu'est-ce que tu as aimé ?"; w.scrollTop=0; }
  lockScroll();
}
function closeWelcome(){ const w=$("welcome"); w.classList.add("out"); setTimeout(()=>{ w.hidden=true; w.classList.remove("out"); lockScroll(); },300); }
function renderOnb(){
  const list=ONB.map(n=>C.find(t=>t.n===n)).filter(Boolean);
  $("onbGrid").innerHTML=list.map(t=>`<button class="onbt" data-onb="${esc(t.id)}" aria-pressed="${onbSel.has(t.id)}" style="--pc:${PLATS[t.p].c}"><b>${esc(t.n)}</b><small>${PLATS[t.p].n} · ${t.t==="film"?"film":t.t==="anime"?"anime":"série"}</small></button>`).join("");
  const n=onbSel.size, b=$("onbGo"); b.disabled=!n; b.textContent=!n?"Choisis tes titres":n<3?`Valider (${n}) · 3 c'est mieux`:`C'est parti (${n})`;
}
function finishOnb(){
  if(S.gSample){ S.g={}; S.gSample=false; }
  onbSel.forEach(id=>{ const t=T(id); if(!t) return; const k=t.g.length>2?.6:.8;
    t.g.forEach(g=>S.g[g]=clamp((S.g[g]||0)+k,-3,3)); t.m.forEach(m=>S.m[m]=clamp((S.m[m]||0)+.4,-3,3)); S.seen[id]=1; });
  const n=onbSel.size; S.onbDone=1; save(); renderAll(); closeWelcome();
  toast(`C'est noté, ${n} titre${n>1?"s":""} aimé${n>1?"s":""}. Tes suggestions sont prêtes !`,3000);
}
$("wForm").addEventListener("submit",e=>{
  e.preventDefault(); const inp=$("wName"), v=inp.value.trim().replace(/\s+/g," ").slice(0,20);
  if(!v){ inp.classList.remove("shake"); void inp.offsetWidth; inp.classList.add("shake"); inp.focus(); return; }
  S.me.name=v; save(); renderPotes(); inp.blur();
  if(!S.onbDone&&!Object.keys(S.ratings).length) openWelcome(2); else { closeWelcome(); toast(`Salut ${v} !`); }
});

/* ---------- 2. recherche ---------- */
let SQ="", sOpen=new Set();
function openSearch(){ $("searchOv").hidden=false; $("sq").value=SQ; renderSearch(); lockScroll(); setTimeout(()=>$("sq").focus(),60); }
function closeSearch(){ $("searchOv").hidden=true; lockScroll(); }
function statusOf(t){ const r=S.ratings[t.id]; if(r) return `<span class="sst seen">Vu · ${r.n}★</span>`; if(S.watching[t.id]) return `<span class="sst on">En cours</span>`; if(S.wish[t.id]) return `<span class="sst">À voir</span>`; if(S.seen[t.id]) return `<span class="sst seen">Déjà vu</span>`; return ""; }
function renderSearch(){
  const q=norm(SQ.trim()); let list, head;
  if(!q){ list=C.filter(isNew).slice(0,8); head="Nouveautés du catalogue"; if(!list.length){ list=ranked().slice(0,8).map(x=>x.t); head="Idées pour toi"; } }
  else {
    const words=q.split(/\s+/);
    const sc=t=>{ const n=norm(t.n); if(n.startsWith(q)) return 3; if(n.includes(q)) return 2;
      const extra=norm([t.n,PLATS[t.p].n,...t.g.map(g=>GENRES[g]),...t.m.map(m=>MOODS[m]),t.t==="film"?"film":t.t==="anime"?"anime":"serie"].join(" "));
      if(q.length<4) return 0;
      const ew=extra.split(/[\s,:'()-]+/);
      return words.every(w=>w.length>=3&&ew.some(x=>x.startsWith(w)))?1:0; };
    list=C.map(t=>[t,sc(t)]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]||a[0].n.localeCompare(b[0].n,"fr")).slice(0,40).map(x=>x[0]);
    head=list.length?`${list.length} résultat${list.length>1?"s":""}`:"";
  }
  if(list.length===1) sOpen.add(list[0].id);
  $("sres").innerHTML=(head?`<div class="label">${head}</div>`:"")+(list.length?list.map(sItem).join(""):`<div class="empty">Rien trouvé pour « ${esc(SQ.trim())} ».<br><button class="btn primary" data-sadd="1" style="margin-top:10px">Ajouter « ${esc(SQ.trim())} »</button></div>`);
}
function sItem(t){
  const op=sOpen.has(t.id), su=suiteOf(t);
  return `<div class="sitem"><button class="shead" data-sopen="${esc(t.id)}" aria-expanded="${op}"><span class="dot" style="background:${PLATS[t.p].c}"></span><span class="sname"><b>${esc(t.n)}</b><small>${PLATS[t.p].n} · ${kindShort(t)} · ${ageTxt(t.age)}</small></span>${statusOf(t)}<i aria-hidden="true">${op?"−":"+"}</i></button>
    ${op?`<div class="sbody">${su?`<div class="suiteline${su.st==="dispo"?" dispo":""}">${esc(su.txt)}</div>`:""}${synBlock(t)}<div class="acts">
      ${S.watching[t.id]?`<button class="watch" data-stab="series">Voir dans Mes séries</button>`:`<button class="watch" data-a="watch" data-id="${esc(t.id)}">Je regarde</button>`}
      ${S.ratings[t.id]||S.watching[t.id]?"":`<button data-srate="${esc(t.id)}">Déjà vu, je note</button>`}
      ${S.ratings[t.id]||S.watching[t.id]?"":`<button class="wishb" data-a="wish" data-id="${esc(t.id)}" aria-pressed="${!!S.wish[t.id]}">${S.wish[t.id]?"Dans ma liste":"+ À voir"}</button>`}
      <button data-reco="${esc(t.id)}">Conseiller</button>${openLink(t)}</div></div>`:""}</div>`;
}
$("sq").addEventListener("input",e=>{ SQ=e.target.value; sOpen=new Set(); renderSearch(); });

/* ---------- 3. inviter ---------- */
function invite(){ shareOrCopy({title:"Zap",text:`${S.me.name||"Ton pote"} t'invite sur Zap : on partage nos notes de films et de séries. Ouvre le lien dans Safari, puis Partager › Sur l'écran d'accueil.`,url:APP_URL}); }

/* ---------- 4. vote en direct ---------- */
let LV=null; const LVT=[];
function lvClear(){ LVT.forEach(clearTimeout); LVT.length=0; }
function startLive(){
  lvClear();
  const cand=ranked().slice(0,5).map(x=>x.t.id);
  const code="ZAP-"+Array.from({length:4},()=>"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random()*32)]).join("");
  const ppl=Object.keys(FRIENDS).sort(()=>Math.random()-.5).slice(0,3).map(k=>({who:k,st:"wait",ballot:null}));
  LV={code,cand,ppl,mine:{ok:new Set(),fav:null},voted:false};
  V={step:"live",names:[],cand,i:0,votes:[]};
  ppl.forEach((p,i)=>{
    LVT.push(setTimeout(()=>{ if(!LV) return; p.st="voting"; renderVote(); },900+i*900+Math.random()*700));
    LVT.push(setTimeout(()=>{ if(!LV) return; p.ballot=fakeBallot(p.who,cand); p.st="done"; renderVote(); if(lvAllDone()) toast("Tout le monde a voté !"); },4500+i*1800+Math.random()*2500));
  });
  renderVote();
}
function fakeBallot(w,cand){
  const sc=cand.map((id,i)=>{ const fr=FR_RATINGS.find(x=>x.who===w&&x.t===T(id).n); return [id,(fr?fr.n-3:0)+Math.random()*2-i*.25]; }).sort((a,b)=>b[1]-a[1]);
  const ok=new Set(); sc.forEach(([id,v],i)=>{ if(i<2||v>.8) ok.add(id); }); return {ok,fav:sc[0][0]};
}
const lvAllDone=()=>!!LV&&LV.voted&&LV.ppl.every(p=>p.st==="done");
function lvPoints(){ const bs=[...LV.ppl.filter(p=>p.ballot).map(p=>p.ballot),...(LV.voted?[LV.mine]:[])]; return LV.cand.map(id=>[id,bs.reduce((a,v)=>a+(v.fav===id?2:v.ok.has(id)?1:0),0)]).sort((a,b)=>b[1]-a[1]); }
const _renderVote=renderVote;
renderVote=function(){ if(V&&V.step==="live"&&LV) return renderLive(); _renderVote(); };
function renderLive(){
  const z=$("voteZone"), done=lvAllDone(), pts=lvPoints(), mx=Math.max(pts[0][1],1);
  const win=done&&pts[0][1]>0?pts.filter(p=>p[1]===pts[0][1]):[];
  const people=[{who:"me",st:LV.voted?"done":"voting"},...LV.ppl];
  const stTxt={wait:"invité",voting:"en train de voter",done:"a voté"};
  z.innerHTML=`<div class="reshead"><h3>${done?(win.length===1?`Gagnant : ${esc(T(win[0][0]).n)}`:win.length>1?"Égalité !":"Personne n'est partant"):"Vote en direct"}</h3><button class="ghost" data-vclose="1">Fermer</button></div>
    <div class="lvcode"><span class="label">Code du vote</span><b class="mono">${LV.code}</b><button class="btn" data-lvinv="1">Inviter</button></div>
    ${DEMO_SOCIAL?`<div class="demo">Aperçu : ${LV.ppl.map(p=>who(p.who).name).join(", ")} sont simulés. Dans la vraie appli, tes potes ouvrent le lien et votent depuis leur téléphone.</div>`:""}
    <div class="lvppl">${people.map(p=>`<span class="lvp ${p.st}">${avatar(p.who,26)}<span>${p.who==="me"?"Toi":esc(who(p.who).name)}<small>${p.who==="me"&&!LV.voted?"à toi de voter":stTxt[p.st]}</small></span></span>`).join("")}</div>
    ${!LV.voted?`<div class="label">Ton vote · les autres ne le voient pas</div><div>${LV.cand.map(id=>{const t=T(id),b=LV.mine;return `<div class="vrow"><div><b>${esc(t.n)}</b><div class="jmeta">${PLATS[t.p].n} · ${kindShort(t)}</div></div><button class="ok" data-lvok="${esc(id)}" aria-pressed="${b.ok.has(id)}">Partant</button><button class="fv" data-lvfav="${esc(id)}" aria-pressed="${b.fav===id}">★ Mon préféré</button></div>`;}).join("")}</div>
      <div class="row"><button class="btn primary" data-lvsend="1">Envoyer mon vote</button></div>`
    :`<div class="label">${done?"Résultat final":"Résultats en direct"}</div>
      <div style="display:flex;flex-direction:column;gap:6px">${pts.map(([id,p])=>`<div class="vres${win.some(w=>w[0]===id)?" win":""}"><b>${esc(T(id).n)}</b><div class="dbar"><i style="width:${p/mx*100}%;background:var(--accent)"></i></div><span class="mono">${p}</span></div>`).join("")}</div>
      ${done?`<div class="row">${win.length===1?`<button class="btn primary" data-vwatch="${esc(win[0][0])}">On regarde ça</button>`:""}${win.length>1?`<button class="btn primary" data-lvtie="1">Départager au hasard</button>`:""}<button class="btn" data-vlive="1">Nouveau vote</button></div>`
      :`<p class="jmeta">En attente de ${LV.ppl.filter(p=>p.st!=="done").map(p=>who(p.who).name).join(", ")}…</p>`}`}`;
}

/* ---------- 5. conseiller à un pote ---------- */
const FR_RECS=[
  {id:"k1",from:"yanis",t:"Dan Da Dan",msg:"Regarde au moins les 3 premiers épisodes, tu vas pas regretter.",at:NOW0-4*HR},
  {id:"k2",from:"lea",t:"Les Carnets de l'apothicaire",msg:"La saison 3 vient de sortir !",at:NOW0-20*HR},
  {id:"k3",from:"tom",t:"Glass Onion",msg:"",at:NOW0-60*HR}
];
function inbox(){ return FR_RECS.map(r=>({...r,tid:(C.find(t=>t.n===r.t)||{}).id})).filter(r=>r.tid&&!S.soc.recoDone[r.id]&&!S.ratings[r.tid]&&!S.seen[r.tid]&&!S.watching[r.tid]); }
let _rc=null;
function recoOf(tid){ if(!_rc){ _rc=new Map(inbox().map(r=>[r.tid,r])); queueMicrotask(()=>{ _rc=null; }); } return _rc.get(tid); }
const _score=score;
score=function(t){ const o=_score(t), rc=recoOf(t.id); if(rc){ o.s+=1; o.r.unshift(["pos",`${who(rc.from).name} te le conseille`]); } return o; };
function renderRecoIn(){
  const L=inbox(), z=$("recoIn"); z.hidden=!L.length; $("cPotes").hidden=!L.length; $("cPotes").textContent=L.length;
  if(!L.length){ z.innerHTML=""; return; }
  z.innerHTML=`<h2>Tes potes te conseillent</h2>${L.map(r=>{const t=T(r.tid);return `<div class="recoitem">${avatar(r.from,36)}<div class="rbody">
    <div><b>${esc(who(r.from).name)}</b> te conseille <b>${esc(t.n)}</b> <span class="jmeta">· ${ago(r.at)}</span></div>
    ${r.msg?`<div class="fcom">« ${esc(r.msg)} »</div>`:""}
    <div class="jmeta">${PLATS[t.p].n} · ${kindShort(t)}</div>
    <div class="row"><button class="btn primary" data-recw="${esc(r.id)}">Je regarde</button><button class="btn" data-recl="${esc(r.id)}">${S.wish[r.tid]?"Dans ma liste":"+ À voir"}</button><button class="btn" data-recx="${esc(r.id)}">Pas pour moi</button></div></div></div>`;}).join("")}`;
}
let recoFor=null, recoTo=new Set();
function openReco(tid){ recoFor=tid; recoTo=new Set(); $("recoTitle").textContent=`Conseiller « ${T(tid).n} »`; $("recoMsg").value=""; renderRecoPick(); $("recoOv").hidden=false; lockScroll(); }
function renderRecoPick(){
  const all=Object.keys(FRIENDS);
  $("recoPick").innerHTML=all.map(k=>`<button class="rpick" data-rto="${k}" aria-pressed="${recoTo.has(k)}">${avatar(k,42)}<span>${esc(FRIENDS[k].name)}</span></button>`).join("")
    +`<button class="rpick" data-rto="all" aria-pressed="${recoTo.size===all.length}"><span class="av allav" aria-hidden="true">✶</span><span>Tout le monde</span></button>`;
  const b=$("recoSend"); b.disabled=!recoTo.size; b.textContent=!recoTo.size?"Choisis un ou plusieurs potes":recoTo.size>1?`Envoyer à ${recoTo.size} potes`:`Envoyer à ${FRIENDS[[...recoTo][0]].name}`;
}
function sendReco(){
  if(!recoTo.size) return; const t=T(recoFor), to=[...recoTo], msg=$("recoMsg").value.trim().slice(0,140);
  S.soc.sent.push({tid:recoFor,to,msg,at:Date.now()}); save();
  $("recoOv").hidden=true; lockScroll();
  const names=to.map(k=>FRIENDS[k].name); toast(`Envoyé à ${names.length>2?names.length+" potes":names.join(" et ")}.`);
  if(DEMO_SOCIAL){ const k=to[Math.floor(Math.random()*to.length)]; setTimeout(()=>toast(`${FRIENDS[k].name} a ajouté « ${t.n} » à sa liste 👍`,3000),3500); }
  renderExtras(); checkBadges();
}

/* ---------- 6. zap au hasard + secouer ---------- */
let zapPick=null, zapBusy=false;
function zapRandom(){
  if(zapBusy) return;
  let pool=ranked().slice(0,15); if(zapPick&&pool.length>1) pool=pool.filter(x=>x.t.id!==zapPick.id);
  if(!pool.length){ toast("Rien à proposer avec ces réglages."); return; }
  const w=pool.map((x,i)=>1/(i+2)); let r=Math.random()*w.reduce((a,b)=>a+b,0), k=0; while(k<w.length-1&&r>w[k]){ r-=w[k]; k++; }
  zapPick=pool[k].t; zapBusy=true; S.zaps=(S.zaps||0)+1; save();
  const ov=$("zapOv"); ov.hidden=false; $("zapCard").hidden=true; ov.classList.add("noise"); lockScroll();
  try{ navigator.vibrate&&navigator.vibrate([40,30,60]); }catch(e){}
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  runStatic(reduce?0:800,()=>{ ov.classList.remove("noise"); showZapCard(); zapBusy=false; checkBadges(); });
}
function runStatic(ms,done){
  const cv=$("zapStatic"), cx=cv.getContext("2d"), img=cx.createImageData(cv.width,cv.height), d=img.data, t0=performance.now();
  (function f(now){ for(let i=0;i<d.length;i+=4){ const v=Math.random()*255|0; d[i]=d[i+1]=d[i+2]=v; d[i+3]=255; } cx.putImageData(img,0,0);
    if(now-t0<ms) requestAnimationFrame(f); else done(); })(t0);
}
function showZapCard(){
  const t=zapPick, p=PLATS[t.p], x=score(t), c=$("zapCard"); c.hidden=false;
  c.innerHTML=`<div class="mire" aria-hidden="true"></div><div class="label">Zap au hasard · ${CTX[S.ctx].l} · ${fmt(+S.time)}</div><h2>${esc(t.n)}</h2>
    <div class="meta"><span class="pl"><span class="dot" style="background:${p.c}"></span>${p.n}</span><span>${kindShort(t)}</span><span class="agetag">${t.age<=0?"Tous publics":t.age+" ans +"}</span></div>
    ${t.res?`<p class="syntxt">${esc(t.res)}</p>`:""}
    <div class="why">${x.r.slice(0,3).map(([k,v])=>`<span class="${k}">${esc(v)}</span>`).join("")}</div>
    <div class="row"><button class="btn primary bigbtn" data-zgo="${esc(t.id)}">Je regarde</button><button class="btn bigbtn" data-zagain="1">Rezap</button></div>
    <div class="row zfoot"><button class="linkbtn" data-zclose="1">Fermer</button>${openLink(t)}</div>
    ${S.shake?"":`<p class="jmeta">Astuce : active « Secouer pour zapper » dans l'onglet Profil.</p>`}`;
  c.querySelector("[data-zgo]").focus({preventScroll:true});
}
function closeZap(){ $("zapOv").hidden=true; lockScroll(); }
let lastAcc=null, lastShake=0, motionOn=false;
function onMotion(e){
  const a=e.accelerationIncludingGravity; if(!a||a.x==null) return;
  if(lastAcc){ const d=Math.abs(a.x-lastAcc.x)+Math.abs(a.y-lastAcc.y)+Math.abs(a.z-lastAcc.z), now=Date.now();
    if(d>30&&now-lastShake>2500&&document.visibilityState==="visible"&&(!anyOverlay()||!$("zapOv").hidden)){ lastShake=now; if(!$("zapOv").hidden){ zapRandom(); } else { if(TAB!=="now") showTab("now"); zapRandom(); } } }
  lastAcc={x:a.x,y:a.y,z:a.z};
}
function enableMotion(){ if(!motionOn){ window.addEventListener("devicemotion",onMotion); motionOn=true; } }
function disableMotion(){ window.removeEventListener("devicemotion",onMotion); motionOn=false; }
async function askMotion(quiet){
  try{
    if(typeof DeviceMotionEvent==="undefined"){ if(!quiet) toast("Ton appareil ne détecte pas les secousses. Utilise le bouton « Zap au hasard »."); return false; }
    if(typeof DeviceMotionEvent.requestPermission==="function"){ const r=await DeviceMotionEvent.requestPermission(); if(r!=="granted"){ if(!quiet) toast("Autorisation refusée. Tu peux toujours utiliser le bouton « Zap au hasard ».",3200); return false; } }
    enableMotion(); return true;
  }catch(e){ if(!quiet) toast("Ici, le navigateur bloque la détection des secousses. Ça marchera dans l'appli installée.",3500); return false; }
}
if(S.shake){ if(typeof DeviceMotionEvent!=="undefined"&&typeof DeviceMotionEvent.requestPermission!=="function") enableMotion(); else document.addEventListener("click",()=>askMotion(true),{once:true}); }

/* ---------- 7. badges ---------- */
function maxBinge(){
  const by={}; S.epLog.forEach(x=>(by[x.id]=by[x.id]||[]).push(x.at)); let best=0;
  Object.values(by).forEach(a=>{ a.sort((x,y)=>x-y); let i=0; for(let j=0;j<a.length;j++){ while(a[j]-a[i]>48*HR) i++; best=Math.max(best,j-i+1); } }); return best;
}
const RL=()=>Object.entries(S.ratings).filter(([id])=>tIdx(id)>=0);
const BADGES=[
  {id:"first",i:"▶️",n:"Premier zap",d:"Noter un premier titre",g:1,v:()=>RL().length},
  {id:"cine",i:"🎬",n:"Cinéphile",d:"Noter 10 films",g:10,v:()=>RL().filter(([id])=>T(id).t==="film").length},
  {id:"serie",i:"📺",n:"Sériephile",d:"Noter 10 séries",g:10,v:()=>RL().filter(([id])=>T(id).t==="serie").length},
  {id:"otaku",i:"🍥",n:"Otaku",d:"Noter 10 animes",g:10,v:()=>RL().filter(([id])=>T(id).t==="anime").length},
  {id:"marathon",i:"🏃",n:"Marathonien",d:"Voir 10 épisodes d'une même série en 48 h",g:10,v:maxBinge},
  {id:"critique",i:"✍️",n:"Critique",d:"Écrire 20 commentaires",g:20,v:()=>RL().filter(([,r])=>r.com).length},
  {id:"coeur",i:"💛",n:"Cœur d'artichaut",d:"Donner 10 coups de cœur (5★)",g:10,v:()=>RL().filter(([,r])=>r.n===5).length},
  {id:"exigeant",i:"🧐",n:"Exigeant",d:"Mettre 5 notes de 2★ ou moins",g:5,v:()=>RL().filter(([,r])=>r.n<=2).length},
  {id:"globe",i:"🧭",n:"Touche-à-tout",d:"Noter des titres sur 4 plateformes",g:4,v:()=>new Set(RL().map(([id])=>T(id).p)).size},
  {id:"eclectique",i:"🎨",n:"Éclectique",d:"Noter des titres de 8 genres différents",g:8,v:()=>new Set(RL().flatMap(([id])=>T(id).g)).size},
  {id:"nuit",i:"🌙",n:"Noctambule",d:"Noter 5 titres vus tard le soir",g:5,v:()=>RL().filter(([,r])=>r.ctx==="nuit").length},
  {id:"voyage",i:"🚆",n:"Voyageur",d:"Noter 5 titres vus en train ou en avion",g:5,v:()=>RL().filter(([,r])=>r.ctx==="train"||r.ctx==="avion").length},
  {id:"pote",i:"🤝",n:"Bon conseil",d:"Conseiller 5 titres à tes potes",g:5,v:()=>S.soc.sent.length},
  {id:"ambiance",i:"🔥",n:"Ambianceur",d:"Réagir 10 fois aux notes des potes",g:10,v:()=>Object.values(S.soc.react).reduce((a,m)=>a+Object.keys(m).length,0)},
  {id:"explo",i:"🧩",n:"Explorateur",d:"Ajouter 3 titres au catalogue",g:3,v:()=>(S.custom||[]).length},
  {id:"fidele",i:"📅",n:"Fidèle",d:"Ouvrir Zap 7 jours différents",g:7,v:()=>S.days.length},
  {id:"zappeur",i:"🎲",n:"Zappeur fou",d:"Faire 10 zaps au hasard",g:10,v:()=>S.zaps||0}
];
function checkBadges(silent){
  const first=!S.badges; S.badges=S.badges||{}; const fresh=[];
  BADGES.forEach(b=>{ if(!S.badges[b.id]&&b.v()>=b.g){ S.badges[b.id]=Date.now(); fresh.push(b); } });
  if(first||fresh.length){ save(); renderBadges(); }
  if(fresh.length&&!silent&&!first) setTimeout(()=>toast(`🏅 Badge débloqué : ${fresh[0].i} ${fresh[0].n}${fresh.length>1?` (+${fresh.length-1})`:""}`,3200),500);
}
function renderBadges(){
  const B=S.badges||{}, got=BADGES.filter(b=>B[b.id]).length;
  $("badgeSum").textContent=`${got} / ${BADGES.length}`;
  $("badges").innerHTML=[...BADGES].sort((a,b)=>(B[b.id]?1:0)-(B[a.id]?1:0)).map(b=>{ const on=!!B[b.id], v=Math.min(b.v(),b.g);
    if(b.secret&&!on) return `<div class="bdg secret"><span class="bi" aria-hidden="true">🔒</span><b>Badge secret</b><small>${b.hint}</small></div>`;
    return `<div class="bdg${on?" on":""}${b.secret?" sec":""}"><span class="bi" aria-hidden="true">${b.i}</span><b>${b.n}</b><small>${b.d}</small>${on?`<small class="bdate">Débloqué le ${dFmt(B[b.id])}</small>`:`<div class="bprog" aria-label="${v} sur ${b.g}"><i style="width:${v/b.g*100}%"></i></div><small class="mono">${v} / ${b.g}</small>`}</div>`; }).join("");
}

/* ---------- 8. Zap Rewind ---------- */
const RW_COLORS=[["#1F1B1B","#fff"],["#D7332A","#fff"],["#1F1B1B","#fff"],["#B436B4","#fff"],["#F2A91E","#1B1717"],["#18B7C4","#1B1717"],["#1FAF4B","#fff"],["#1F1B1B","#fff"]];
const RW_MIN=3;
let RW=null;
function rwYearEntries(y){ return RL().filter(([,r])=>new Date(r.at).getFullYear()===y); }
function rwDemoEntries(y){
  const pick=[["Frieren",5,"nuit"],["Arcane",5,"tranquille"],["Dan Da Dan",4,"train"],["Glass Onion",4,"amoureux"],["The Bear",4,"tranquille"],["Spy x Family",4,"repas"],["Le Château ambulant",5,"amoureux"],["Solo Leveling",3,"train"],["Squid Game",3,"potes"],["Coco",4,"famille"],["Severance",5,"binge"],["One Piece",4,"train"]];
  return pick.map(([n,s,c],i)=>{ const t=C.find(x=>x.n===n); return t?[t.id,{n:s,ctx:c,at:new Date(y,[0,1,2,2,3,3,3,5,6,8,9,9][i],3+i).getTime(),min:t.t==="film"?t.d:t.d*8}]:null; }).filter(Boolean);
}
function rwBuild(E,y,demo){
  const n=E.length, mins=E.reduce((a,[id,r])=>a+(r.min||T(id).d),0);
  const types={film:0,serie:0,anime:0}; E.forEach(([id])=>types[T(id).t]++);
  const top=[...E].sort((a,b)=>b[1].n-a[1].n||a[1].at-b[1].at).slice(0,5);
  const gc={}; E.forEach(([id,r])=>T(id).g.filter(g=>g!=="animation").forEach(g=>gc[g]=(gc[g]||0)+(r.n>=4?2:r.n>=3?1:0)));
  const gs=Object.entries(gc).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]);
  const cnt=f=>{ const m={}; E.forEach(e=>{ const k=f(e); m[k]=(m[k]||0)+1; }); return Object.entries(m).sort((a,b)=>b[1]-a[1]); };
  const pl=cnt(([id])=>T(id).p), cx=cnt(([,r])=>r.ctx), mo=cnt(([,r])=>new Date(r.at).getMonth());
  const avg=E.reduce((a,[,r])=>a+r.n,0)/n;
  let bestF=null; if(!demo) Object.keys(FRIENDS).forEach(k=>{ const c=compat(k); if(c.pct!==null&&(!bestF||c.pct>bestF.pct)) bestF={k,...c}; });
  if(demo) bestF={k:"lea",pct:88,n:4};
  const MONTHS=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  const nm=esc(S.me.name||"Toi");
  const S_=[
    `<div class="rwk">${demo?"Exemple · ":""}Zap Rewind</div><div class="rwbig">${y}</div><div class="mire" aria-hidden="true"></div><p class="rwtxt">${nm}, voici ton année devant l'écran.</p><p class="rwhint">Touche à droite pour avancer</p>`,
    `<div class="rwk">Cette année, tu as vu</div><div class="rwbig"><span class="cnt" data-to="${n}">0</span></div><div class="rwmid">titre${n>1?"s":""}</div><p class="rwtxt">Soit environ <b>${hm(mins)}</b> devant l'écran.<br>${types.film} film${types.film>1?"s":""}, ${types.serie} série${types.serie>1?"s":""}, ${types.anime} anime${types.anime>1?"s":""}.</p>`,
    `<div class="rwk">Ton top ${Math.min(5,n)}</div><ol class="rwtop">${top.map(([id,r],i)=>`<li><span class="mono">${i+1}</span><span>${esc(T(id).n)}</span>${starStr(r.n)}</li>`).join("")}</ol>`,
    gs.length?`<div class="rwk">Ton genre de l'année</div><div class="rwmid big">${GENRES[gs[0][0]]}</div>${gs.length>2?`<p class="rwtxt">Suivi de près par ${GENRES[gs[1][0]].toLowerCase()} et ${GENRES[gs[2][0]].toLowerCase()}.</p>`:""}`:`<div class="rwk">Ton genre de l'année</div><div class="rwmid">Pas de favori</div><p class="rwtxt">Tu as goûté à tout sans tomber amoureux d'un genre.</p>`,
    `<div class="rwk">Ta plateforme n°1</div><div class="rwmid big">${PLATS[pl[0][0]].n}</div><p class="rwtxt"><b>${pl[0][1]}</b> titre${pl[0][1]>1?"s":""} vu${pl[0][1]>1?"s":""} dessus.${pl[1]?` Juste derrière : ${PLATS[pl[1][0]].n}.`:""}</p>`,
    `<div class="rwk">Tu zappes surtout</div><div class="rwmid big">${CTX[cx[0][0]]?.l||"?"}</div><p class="rwtxt">Ton mois le plus chargé : <b>${MONTHS[mo[0][0]]}</b>, avec ${mo[0][1]} titre${mo[0][1]>1?"s":""}.</p>`,
    bestF?`<div class="rwk">Ton jumeau de goûts</div><div class="rwav">${avatar(bestF.k,92)}</div><div class="rwmid">${esc(FRIENDS[bestF.k].name)}</div><p class="rwtxt"><b>${bestF.pct}%</b> de compatibilité sur ${bestF.n} titres en commun.</p>`
      :`<div class="rwk">Ton jumeau de goûts</div><div class="rwmid">Mystère…</div><p class="rwtxt">Note des titres que tes potes ont vus aussi pour découvrir avec qui tu partages le plus.</p>`,
    `<div class="rwk">Note moyenne</div><div class="rwbig"><span class="cnt" data-to="${avg.toFixed(1)}" data-dec="1">0</span><span class="rwstar">★</span></div><p class="rwtxt">Merci d'avoir zappé avec Zap cette année.</p><div class="rwbtns"><button class="btn bigbtn rwshare" data-rwshare="1">Partager mon Rewind</button><button class="btn bigbtn" data-rwagain="1">Revoir</button></div>`
  ];
  const share=`Mon année ${y} sur Zap : ${n} titres vus (${hm(mins)}), mon n°1 : ${T(top[0][0]).n}${gs.length?`, genre préféré : ${GENRES[gs[0][0]].toLowerCase()}`:""}. Et toi ?`;
  return {slides:S_,share};
}
function openRw(){
  const y=new Date().getFullYear(), E=rwYearEntries(y), demo=E.length<RW_MIN;
  const b=rwBuild(demo?rwDemoEntries(y):E,y,demo);
  RW={i:0,...b,timer:null}; $("rwOv").hidden=false; lockScroll(); rwShow(0);
  if(demo) toast(`Exemple : note ${RW_MIN} titres cette année pour avoir le tien.`,3200);
}
function rwShow(i){
  RW.i=i; clearTimeout(RW.timer); const [bg,fg]=RW_COLORS[i%RW_COLORS.length], el=$("rwSlide"), ov=$("rwOv");
  ov.style.background=bg; ov.style.color=fg;
  $("rwBars").innerHTML=RW.slides.map((_,k)=>`<i class="${k<i?"done":k===i?"cur":""}"><b></b></i>`).join("");
  el.innerHTML=RW.slides[i]; el.classList.remove("in"); void el.offsetWidth; el.classList.add("in");
  el.querySelectorAll(".cnt").forEach(c=>{ const to=+c.dataset.to, dec=+c.dataset.dec||0, t0=performance.now();
    (function f(now){ const p=Math.min(1,(now-t0)/900), v=to*(1-Math.pow(1-p,3)); c.textContent=dec?v.toFixed(dec).replace(".",","):Math.round(v); if(p<1) requestAnimationFrame(f); })(t0); });
  if(i<RW.slides.length-1) RW.timer=setTimeout(()=>rwShow(i+1),6000);
}
function rwGo(d){ if(!RW) return; const n=RW.i+d; if(n<0) return rwShow(0); if(n>=RW.slides.length) return closeRw(); rwShow(n); }
function closeRw(){ if(RW) clearTimeout(RW.timer); RW=null; $("rwOv").hidden=true; lockScroll(); }
function renderRwTeaser(){
  const y=new Date().getFullYear(), n=rwYearEntries(y).length;
  $("rwTitle").textContent=`Zap Rewind ${y}`;
  $("rwSub").textContent=n>=RW_MIN?`Ton année en ${8} écrans : top 5, genre préféré, pote le plus compatible…`:`Note ${RW_MIN-n} titre${RW_MIN-n>1?"s":""} de plus pour débloquer le tien. Touche pour voir un exemple.`;
  $("rwTeaser").classList.toggle("locked",n<RW_MIN);
}

/* ---------- 9. suites annoncées ---------- */
function mySuites(){ if(typeof SUITES==="undefined") return []; return Object.keys(SUITES).map(n=>C.find(t=>t.n===n)).filter(t=>t&&(S.ratings[t.id]||S.seen[t.id]||S.watching[t.id])); }
function suiteRow(t,mine){ const s=SUITES[t.n];
  return `<div class="witem"><div class="jhead"><b>${esc(t.n)}</b><span class="jmeta">${PLATS[t.p].n}</span></div><div class="suiteline${s.st==="dispo"?" dispo":""}">${esc(s.txt)}</div>${mine&&s.st==="dispo"&&!S.watching[t.id]?`<div class="row"><button class="btn primary" data-snext="${esc(t.id)}">Je reprends</button></div>`:""}</div>`; }
function renderSuites(){
  if(typeof SUITES==="undefined"){ $("suites").innerHTML="<p>Bientôt.</p>"; return; }
  const mine=mySuites(), others=Object.keys(SUITES).map(n=>C.find(t=>t.n===n)).filter(t=>t&&!mine.includes(t));
  $("suitesCount").textContent=mine.length?`${mine.length} pour toi`:"";
  $("suites").innerHTML=(mine.length?mine.map(t=>suiteRow(t,true)).join(""):`<p>Aucune suite annoncée pour les séries que tu as vues. Dès qu'une suite est annoncée, Zap te prévient ici.</p>`)
    +(others.length?`<details class="wsyn"><summary>Autres suites attendues dans le catalogue (${others.length})</summary><div class="wlist">${others.map(t=>suiteRow(t,false)).join("")}</div></details>`:"");
}
function notifySuites(){
  const fresh=mySuites().filter(t=>S.suitesSeen[t.n]!==SUITES[t.n].txt); if(!fresh.length) return;
  fresh.forEach(t=>S.suitesSeen[t.n]=SUITES[t.n].txt); save();
  setTimeout(()=>toast(fresh.length===1?`📺 ${fresh[0].n} : ${SUITES[fresh[0].n].txt}.`:`📺 ${fresh.length} suites annoncées pour tes séries : va voir « Mes séries ».`,4200),1600);
}

/* ---------- branchements ---------- */
function renderExtras(){ renderBadges(); renderSuites(); renderRecoIn(); renderRwTeaser(); $("shakeBtn").setAttribute("aria-pressed",!!S.shake); $("inviteLink").innerHTML=`Lien de l'appli : <span class="mono">${APP_URL.replace("https://","")}</span>`; notifySuites(); }
const _renderAll=renderAll; renderAll=function(){ _renderAll(); renderExtras(); };
const _renderPotes=renderPotes; renderPotes=function(){ _renderPotes(); renderRecoIn(); };

document.addEventListener("click",async e=>{
  const b=e.target.closest("button"); if(!b) return; const D=b.dataset;
  if(D.ep==="1"&&D.id){ S.epLog.push({id:D.id,at:Date.now()}); S.epLog=S.epLog.slice(-400); save(); }
  if(D.vclose||D.vwatch){ lvClear(); LV=null; }
  if(D.onb){ onbSel.has(D.onb)?onbSel.delete(D.onb):onbSel.add(D.onb); renderOnb(); return; }
  if(D.sopen){ sOpen.has(D.sopen)?sOpen.delete(D.sopen):sOpen.add(D.sopen); renderSearch(); return; }
  if(D.stab){ closeSearch(); showTab(D.stab); return; }
  if(D.srate){ const id=D.srate; S.watching[id]=S.watching[id]||{ctx:S.ctx,at:Date.now()}; draft[id]={open:true}; save(); closeSearch(); renderAll(); showTab("series"); toast("Donne-lui une note juste ici."); return; }
  if(D.sadd){ const q=SQ.trim(); closeSearch(); showTab("now"); showView("sugg"); openAdd("watch","addZone"); $("aName").value=q; $("aName").dispatchEvent(new Event("input")); return; }
  if(D.reco){ openReco(D.reco); return; }
  if(D.rto){ const all=Object.keys(FRIENDS); if(D.rto==="all") recoTo=recoTo.size===all.length?new Set():new Set(all); else recoTo.has(D.rto)?recoTo.delete(D.rto):recoTo.add(D.rto); renderRecoPick(); return; }
  if(D.recw||D.recl||D.recx){ const id=D.recw||D.recl||D.recx, r=FR_RECS.find(x=>x.id===id), tid=(C.find(t=>t.n===r.t)||{}).id;
    if(D.recw){ S.soc.recoDone[id]=1; startWatching(tid); }
    else if(D.recl){ if(!S.wish[tid]){ S.wish[tid]=Date.now(); toast("Ajouté à « À voir plus tard »."); } }
    else { S.soc.recoDone[id]=1; toast(`OK, on oublie ce conseil de ${who(r.from).name}.`); }
    save(); renderPotes(); renderList(); renderWish(); return; }
  if(D.vlive){ startLive(); return; }
  if(D.lvok&&LV){ const s=LV.mine.ok; s.has(D.lvok)?s.delete(D.lvok):s.add(D.lvok); if(!s.has(D.lvok)&&LV.mine.fav===D.lvok) LV.mine.fav=null; renderVote(); return; }
  if(D.lvfav&&LV){ LV.mine.fav=LV.mine.fav===D.lvfav?null:D.lvfav; if(LV.mine.fav) LV.mine.ok.add(D.lvfav); renderVote(); return; }
  if(D.lvsend&&LV){ if(!LV.mine.ok.size&&!LV.mine.fav){ toast("Choisis au moins un titre."); return; } LV.voted=true; renderVote(); toast("Vote envoyé !"); return; }
  if(D.lvinv&&LV){ shareOrCopy({title:"Vote Zap",text:`On regarde quoi ce soir ? Viens voter sur Zap, code ${LV.code}.`,url:APP_URL+"?vote="+LV.code}); return; }
  if(D.lvtie&&LV){ const pts=lvPoints(), mx=pts[0][1], tied=pts.filter(p=>p[1]===mx), w=tied[Math.floor(Math.random()*tied.length)][0]; lvClear(); LV=null; V=null; renderVote(); showView("sugg"); startWatching(w); toast(`Le hasard a choisi : ${T(w).n}`); return; }
  if(D.zgo){ closeZap(); startWatching(D.zgo); return; }
  if(D.zagain){ zapRandom(); return; }
  if(D.zclose){ closeZap(); return; }
  if(D.snext){ const t=T(D.snext), m=/saison\s+(\d+)/i.exec(SUITES[t.n].txt); S.watching[t.id]={ctx:S.ctx,at:Date.now(),s:m?+m[1]:1,e:1}; save(); renderAll(); showTab("series"); toast(`${t.n} : c'est reparti !`); return; }
  if(D.rwopen){ openRw(); return; }
  if(D.rwshare&&RW){ clearTimeout(RW.timer); shareOrCopy({title:"Mon Zap Rewind",text:RW.share,url:APP_URL},"Texte copié : colle-le à tes potes."); return; }
  if(D.rwagain&&RW){ rwShow(0); return; }
  switch(b.id){
    case "onbGo": finishOnb(); return;
    case "onbSkip": S.onbDone=1; save(); closeWelcome(); toast(`Salut ${S.me.name||""} !`); return;
    case "onbAgain": openWelcome(2); return;
    case "searchBtn": openSearch(); return;
    case "searchClose": closeSearch(); return;
    case "inviteBtn": invite(); return;
    case "recoClose": $("recoOv").hidden=true; lockScroll(); return;
    case "recoSend": sendReco(); return;
    case "zapBtn": zapRandom(); return;
    case "shakeBtn": if(S.shake){ S.shake=false; disableMotion(); save(); renderExtras(); toast("Secouer pour zapper : désactivé."); } else { const ok=await askMotion(false); if(ok){ S.shake=true; save(); renderExtras(); toast("Activé ! Secoue ton téléphone pour zapper.",3000); } } return;
    case "rwClose": closeRw(); return;
    case "rwPrev": rwGo(-1); return;
    case "rwNext": rwGo(1); return;
  }
  // après une action dans la recherche, on rafraîchit les statuts
  if(!$("searchOv").hidden&&b.closest("#searchOv")) renderSearch();
  setTimeout(()=>{ renderExtras(); checkBadges(); },0);
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){ if(!$("qOv")?.hidden===false) closeQuest(); else if(!$("rwOv").hidden) closeRw(); else if(!$("recoOv").hidden){ $("recoOv").hidden=true; lockScroll(); } else if(!$("zapOv").hidden) closeZap(); else if(!$("searchOv").hidden) closeSearch(); return; }
  if(!$("rwOv").hidden){ if(e.key==="ArrowRight") rwGo(1); if(e.key==="ArrowLeft") rwGo(-1); }
},true);
["searchOv","recoOv"].forEach(id=>$(id).addEventListener("click",e=>{ if(e.target.id===id){ if(id==="searchOv") closeSearch(); else { $(id).hidden=true; lockScroll(); } } }));

