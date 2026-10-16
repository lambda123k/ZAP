
/* ================= L'ENTRÉE : un escalier de petites découvertes avant le plantage =================
   A. la barre de mire grésille → 3 tapes : « signal faible »
   B. une carte fantôme qui n'a qu'un bouton « Pas pour moi » (c'est Saréna qui essaie de remonter)
   C. la ligne manuscrite au 1er refus · 5/15 · le bouton résiste · badge « Têtu » · compte à rebours */
const ENT=()=>S.ac.ent||(S.ac.ent={sig:0,ghost:0});
const ENT_MIRE=document.querySelector(".wrap>.mire");
// A. le signal faible
function entFlicker(){ if(S.ac.on||!ENT_MIRE||document.hidden) return; ENT_MIRE.classList.add("entflk"); setTimeout(()=>ENT_MIRE.classList.remove("entflk"),650); }
(function loop(){ const d=ENT().sig?0:(20000+Math.random()*40000); setTimeout(()=>{ if(!ENT().sig&&TAB==="now") entFlicker(); loop(); },d||60000); })();
setTimeout(()=>{ if(!ENT().sig&&TAB==="now") entFlicker(); },7000);
let entTaps=[], entDown=0;
// seuls les petits tapotements comptent : un appui long ne fait strictement rien
ENT_MIRE&&ENT_MIRE.addEventListener("pointerdown",()=>{ entDown=Date.now(); });
ENT_MIRE&&ENT_MIRE.addEventListener("click",()=>{
  if(S.ac.on||ENT().sig) return; const t=Date.now(); if(entDown&&t-entDown>350){ entTaps=[]; return; } entTaps=entTaps.filter(x=>t-x<2000); entTaps.push(t);
  ENT_MIRE.classList.add("entflk"); setTimeout(()=>ENT_MIRE.classList.remove("entflk"),250);
  if(entTaps.length>=3){ entTaps=[]; ENT().sig=1; save(); laStart(); laStatic(.18); setTimeout(()=>laStatic(0),500);
    try{navigator.vibrate&&navigator.vibrate([30,40,90]);}catch(e){}
    ENT_MIRE.classList.add("entfx"); setTimeout(()=>ENT_MIRE.classList.remove("entfx"),1200);
    toast("MIRE · signal faible",2400); renderList(); }
});
// B. la carte fantôme
function entGhostHtml(){ return `<article class="card entghost" id="entGhost"><div class="rank mono">?</div><div>
  <div class="ctitle"><h3>Les ▒▒▒▒▒ de S▒▒▒▒▒</h3></div>
  <div class="meta"><span class="pl"><span class="dot" style="background:#6E6663"></span>▒▒▒▒</span><span>documentaire · ▒▒▒▒</span></div>
  <div class="match"><div class="bar"><i style="width:1%"></i></div><span class="mono">0% pour toi</span></div></div>
  <div class="acts"><button class="later" data-entghost="1">Pas pour moi</button></div></article>`; }
// C. la carte réagit, résiste, compte à rebours
const _renderListEnt=renderList;
renderList=function(){ _renderListEnt(); const L=$("list"); if(!L||S.ac.on) return; const n=S.ac.refuse||0;
  if(ENT().sig&&!ENT().ghost&&!$("entGhost")){ const cs=L.querySelectorAll(".card"); const at=cs[1]||null; if(at) at.insertAdjacentHTML("afterend",entGhostHtml()); else L.insertAdjacentHTML("beforeend",entGhostHtml()); }
  if(n>=7) L.querySelectorAll('[data-a="later"]').forEach(b=>b.classList.add("entres"));
  if(n>=10){ const left=15-n; L.querySelectorAll(".card:not(.entghost) .rank").forEach(r=>{ r.textContent=left; r.classList.add("entcd"); }); }
};
document.addEventListener("click",e=>{
  const g=e.target.closest("[data-entghost]");
  if(g){ e.stopPropagation(); const c=$("entGhost"); ENT().ghost=1; S.ac.refuse=(S.ac.refuse||0)+1; save(); laStart(); laStatic(.15);
    try{navigator.vibrate&&navigator.vibrate(40);}catch(e){}
    if(c){ c.classList.add("entgone"); setTimeout(()=>{ laStatic(0); c.remove(); },700); }
    setTimeout(()=>toast("Noté.",1800),200); renderProfile(); return; }
  // le bouton résiste : plus on refuse, plus ça vibre
  const b=e.target.closest('[data-a="later"]'); if(b&&!S.ac.on){ const n=(S.ac.refuse||0)+1; if(n>=7){ try{navigator.vibrate&&navigator.vibrate(Math.min(220,n*12));}catch(e){} } if(n>=10){ laStart(); laBeat(); } }
},true);
function acEntStep(n){
  if(n>=10&&!S.ac.tetu){ S.ac.tetu=1; save(); checkBadges(); }
}
BADGES.push({id:"tetu",i:"🙅",n:"Têtu",d:"Refuser 10 propositions d'affilée",g:1,v:()=>S.ac.tetu||S.ac.on?1:0,secret:true,hint:"Dis non. Encore. Et encore."});
// Régie : nouvelles étapes de l'entrée
RG[0][1].splice(1,0,["ent_sig","Entrée : la barre qui grésille","taper 3 fois dessus"],["ent_ghost","Entrée : la carte fantôme","celle qui n'a que « Pas pour moi »"],["r4","4 refus d'affilée","la ligne manuscrite est là"],["r7","7 refus d'affilée","le bouton commence à résister"]);
const _rgJumpEnt=rgJump;
rgJump=function(id){
  const base=()=>{ rgClean(); rgBase(); S.ac.ent={sig:0,ghost:0}; save(); renderAll(); showTab("now"); try{showView("sugg");}catch(e){} };
  if(id==="ent_sig"){ base(); acT(entFlicker,600); acT(entFlicker,2200); toast("Regarde la barre de couleurs en haut.",2600); return; }
  if(id==="ent_ghost"){ base(); ENT().sig=1; save(); renderList(); acT(()=>$("entGhost")?.scrollIntoView({block:"center",behavior:"smooth"}),300); return; }
  if(id==="r4"||id==="r7"){ base(); S.ac.ent={sig:1,ghost:1}; S.ac.refuse=id==="r4"?4:7; save(); renderAll(); toast(`${S.ac.refuse} refus. Continue.`,2000); return; }
  if(id==="zero"){ base(); toast("Remis à zéro.",1800); return; }
  _rgJumpEnt(id);
};

// appui long sur la barre (Régie verrouillée) : un indice écrit à la main, selon où on en est
function entLongHint(){ if(!ENT_MIRE) return;
  const n=S.ac.refuse||0, a=S.ac;
  const t=a.legacy?"Merci.":a.on?(a.f0417?"Ouvre l'index. Elle t'attend.":"Ouvre le diagnostic. Répare-moi."):!ENT().sig?"Trois petits coups.":!ENT().ghost?"Il y a une carte de trop.":n<15?`Dis-moi non. Encore ${15-n} fois.`:"…";
  entNote(t,true); }
// une ligne écrite à la main sous la barre de couleurs (même main que le profil)
function entNote(t,strong){ if(!ENT_MIRE) return;
  document.querySelector(".enthint")?.remove();
  ENT_MIRE.insertAdjacentHTML("afterend",`<div class="acctr enthint"><span>${t}</span></div>`); const h=document.querySelector(".enthint"); if(h){ if(ENT_MIRE.getBoundingClientRect().bottom<0){ h.classList.add("fixed"); } else { h.style.top=(ENT_MIRE.offsetTop+ENT_MIRE.offsetHeight+6)+"px"; h.style.left=(ENT_MIRE.offsetLeft)+"px"; } }
  ENT_MIRE.classList.add("entflk"); setTimeout(()=>ENT_MIRE.classList.remove("entflk"),strong?400:220);
  if(strong){ try{navigator.vibrate&&navigator.vibrate(20);}catch(e){} }
  setTimeout(()=>document.querySelector(".enthint")?.classList.add("out"),3200); setTimeout(()=>document.querySelector(".enthint")?.remove(),4000); }

// à chaque refus : la liste tremble à peine (rien d'autre, pour ne gêner personne)
function entTremble(){ const L=$("list"); if(!L) return; L.classList.remove("enttr"); void L.offsetWidth; L.classList.add("enttr"); setTimeout(()=>L.classList.remove("enttr"),400); }
