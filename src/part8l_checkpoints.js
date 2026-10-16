
/* ================= DOSSIER 0417 : checkpoints, indices, cohérence ================= */

/* ---------- checkpoints : une sauvegarde au début de chaque étape ---------- */
const CPS=[
  ["a1","Acte I · l'anomalie","MIRE vient de planter. Mode sans échec."],
  ["a1i","Acte II · le dossier","Le dossier 0417 vient d'être trouvé."],
  ["a2","Acte III · le contact","Juste après ton choix de l'Acte II."]
];
function acSnap(){ const o=JSON.parse(JSON.stringify(S.ac)); delete o.cp; return JSON.stringify(o); }
function acCpSave(k){ if(!S.ac.cp) S.ac.cp={}; S.ac.cp[k]=acSnap(); save(); }
function acCpList(){ return CPS.filter(([k])=>S.ac.cp&&S.ac.cp[k]); }
function acCpLoad(k){
  const cp=S.ac.cp, m=S.ac.mute; if(!cp||!cp[k]) return;
  rgClean(); S.ac=Object.assign(AC0(),JSON.parse(cp[k])); S.ac.cp=cp; S.ac.mute=m; S.ac.v=3;
  try{ sessionStorage.setItem("zap.safe","1"); }catch(e){} save(); renderAll(); showTab("now"); laStart();
  if(k==="a1") acSafe();
  else acOpen();
  toast(`Checkpoint chargé : ${CPS.find(c=>c[0]===k)[1]}`,2600);
}
function acResetAll(){
  rgClean(); const m=S.ac.mute; S.ac=AC0(); S.ac.v=3; S.ac.mute=m; save(); try{ sessionStorage.removeItem("zap.safe"); }catch(e){}
  renderAll(); showTab("now"); toast("Tout est revenu à zéro. Le dossier est refermé.",3000);
}
// les moments où on sauvegarde
const _acActivateCP=acActivate; acActivate=function(){ _acActivateCP(); acCpSave("a1"); };
const _dgHotCP=dgHot; dgHot=function(){ _dgHotCP(); acCpSave("a1i"); };
const _ac2InitCP=ac2Init; ac2Init=function(){ _ac2InitCP(); acCpSave("a2"); };

document.body.insertAdjacentHTML("beforeend",`<div class="cpov" id="cpOv" role="dialog" aria-modal="true" aria-label="Checkpoints" hidden><div class="cpin">
  <div class="rghead"><b class="mono">CHECKPOINTS</b><button class="acic" data-cp="close" aria-label="Fermer">×</button></div><div id="cpList"></div></div></div>`);
let CP_ASK=null;
function cpOpen(){ CP_ASK=null; cpRender(); $("cpOv").hidden=false; lockScroll(); }
function cpClose(){ $("cpOv").hidden=true; lockScroll(); }
function cpRender(){
  const L=acCpList();
  $("cpList").innerHTML=`<p class="rgsub">Reprendre à une étape déjà atteinte. Tout ce qui s'est passé après sera oublié.</p>`+
    (L.length?L.map(([k,t,d])=>CP_ASK===k?`<div class="cpask"><b>Revenir à « ${t} » ?</b><div class="row"><button class="acsafe-go" data-cpgo="${k}">Oui, revenir</button><button class="acsafe-alt" data-cp="no">Annuler</button></div></div>`:`<button class="rgit" data-cpk="${k}"><b>${t}</b><small>${d}</small><i>↺</i></button>`).join(""):`<p class="jmeta">Aucun checkpoint pour l'instant.</p>`)+
    (CP_ASK==="all"?`<div class="cpask red"><b>Tout effacer et recommencer depuis zéro ?</b><div class="row"><button class="acsafe-go" data-cpgo="all">Oui, tout recommencer</button><button class="acsafe-alt" data-cp="no">Annuler</button></div></div>`:`<button class="rglock" data-cpk="all">Tout recommencer depuis zéro</button>`);
}
$("cpOv").addEventListener("click",e=>{ e.stopPropagation(); const b=e.target.closest("button"); if(!b) return; const D=b.dataset;
  if(D.cp==="close") return cpClose();
  if(D.cp==="no"){ CP_ASK=null; return cpRender(); }
  if(D.cpk){ CP_ASK=D.cpk; return cpRender(); }
  if(D.cpgo){ cpClose(); return D.cpgo==="all"?acResetAll():acCpLoad(D.cpgo); }
});
// bouton dans l'en-tête de l'index
document.querySelector("#acOv .achead [data-ac=\"mute\"]").insertAdjacentHTML("beforebegin",`<button class="acic" data-cpopen="1" aria-label="Checkpoints">↺</button>`);
$("acOv").addEventListener("click",e=>{ const b=e.target.closest("[data-cpopen]"); if(b) cpOpen(); });
// et sur l'écran « MIRE ne répond plus »
const _acBrokenCP=acBrokenHtml; acBrokenHtml=function(){ return _acBrokenCP().replace(/<\/div>$/,`<button class="linkbtn" data-cpopen2="1">Checkpoints</button></div>`); };
document.addEventListener("click",e=>{ if(e.target.closest("[data-cpopen2]")) cpOpen(); });
// perdre : reprendre au dernier checkpoint de l'acte, ou tout recommencer
const _acGameOverCP=acGameOver;
acGameOver=function(){ _acGameOverCP();
  const L=acCpList(); if(!L.length) return; const last=L[L.length-1];
  const btn=$("acRestart"); if(!btn) return;
  btn.insertAdjacentHTML("beforebegin",`<button class="acsafe-go" id="acRetry">Reprendre au checkpoint<br><small>${last[1]}</small></button>`);
  btn.className="acsafe-alt"; btn.textContent="Tout recommencer depuis zéro";
  $("acRetry").onclick=()=>acCpLoad(last[0]);
  const sm=document.querySelector(".acover small.mono"); if(sm) sm.textContent="Au checkpoint, tu reprends avec les traces que tu avais à ce moment-là.";
};

/* ---------- qui parle ? « index › » pour le système, « 0 › » pour celui qui observe ---------- */
acVoice=function(t){ const v=$("acVoice"); const sys=/^(Diagnostic|Quelqu'un a utilisé)/.test(t||"");
  v.innerHTML=t?`<span class="${sys?"acsys":"acfrom"} mono">${sys?"mire-index ›":"0 ›"}</span> ${esc(t)}`:""; v.classList.remove("in"); void v.offsetWidth; if(t) v.classList.add("in"); };
// l'index dit ce qu'il est
document.querySelector("#acOv .achead b.mono").innerHTML=`mire-index <small>la mémoire de MIRE</small>`;
document.querySelector("#acTr").title="Traces : ce que la surveillance a vu de toi";

/* ---------- indices : quand on bloque ---------- */
const HINTS={
  q1:["Cherche ce que la règle cache : tape « halden ».","Le premier fragment liste des titres. Un nom de lieu revient partout."],
  q2:["Dans la note de terrain sur le puits, le nom de l'exploitant est caviardé.","Elle avait noté : « Trouver le registre ». Cherche « registre »."],
  q3:["Qui a obtenu un accès aux règles de MIRE ? Regarde le journal du 11 mars (« 11 mars »).","Le journal parle d'un contrat. Cherche sa référence."],
  q4:["Le contrat est signé « M. D. ». Qui sont les M. D. chez Zap ? Cherche « organigramme ».","Il y en a deux. L'un des deux était absent en mars."],
  q5:["Quand son compte a-t-il été gelé ? Regarde son profil, ou le journal de MIRE.",""],
  q6:["Qui s'est connecté à la console à 10:22 ?","Cherche l'équipe technique : « technique »."],
  r0:["Regarde l'historique : quelqu'un a cherché un mot après toi. Cherche-le aussi.","Le mot de passe : « l'heure où elle s'est arrêtée ». Son profil et l'historique la donnent."],
  r1:["Dans la console, tape « aide ». Une commande montre ce qui tourne la nuit.","Tape « planif »."],
  r2:["La tâche de 03:12 indique sa source.",""],
  r3:["Dans la console, remonte l'adresse : « trace » suivi de l'adresse. Ça laisse une trace.","Ou cherche l'adresse dans l'index… c'est un mot surveillé."],
  r4:["Tape « patch » : qui a signé la v5, et depuis quelle adresse ?","Cherche « badge » : où était Ruiz la nuit du 10 au 11 mars ?"],
  r5:["Le patch parle d'un « canal_classement ». Cherche « canal » dans l'index.","« demander » à MIRE pourquoi elle plante, puis lis la première lettre de chaque titre."],
  r6:["Demande à MIRE où est Inès. Lis les premières lettres.",""],
  r7:["Le journal dit que 0 s'est connecté le 11/03 à 10:22. Les badges disent où était Ruiz, et s'il avait un accès à distance.",""]
};
function acHintFor(){
  if(a2On()){ const a=A2(); if(!a.con) return "r0"; const q=QS2.find(x=>x.id===AC.sel&&!a.ans[x.id])||QS2.find(x=>!x.opt&&!a.ans[x.id]); return q&&q.id; }
  const q=QS.find(x=>x.id===AC.sel&&!S.ac.ans[x.id])||QS.find(x=>!x.opt&&!S.ac.ans[x.id]); return q&&q.id;
}
function acHint(){ const id=acHintFor(); if(!id) return; if(!S.ac.hl) S.ac.hl={}; const n=S.ac.hl[id]||0, H=HINTS[id]||[];
  const txt=H[Math.min(n,H.length-1)]||H[0]; if(H[n+1]) S.ac.hl[id]=n+1; else S.ac.hl[id]=n; S.ac.hints=(S.ac.hints||0)+1; save();
  const box=$("acHintBox"); if(box){ box.hidden=false; box.innerHTML=`<span class="mono">indice${H.length>1&&n+1<H.length?"":" · dernier"}</span> ${esc(txt)}`; } }
const _acPanelH=acPanel;
acPanel=function(){ _acPanelH(); if(!AC) return; const P=$("acPanel");
  const showBoard=AC.tab==="board"||(AC.tab==="con"&&a2On()&&!A2().con);
  if(showBoard&&!S.ac.end||showBoard&&a2Live()) P.insertAdjacentHTML("afterbegin",`<div class="achintrow"><button class="linkbtn" data-achint="1">Je bloque : un indice ?</button></div><p class="achint" id="acHintBox" hidden></p>`);
};
$("acOv").addEventListener("click",e=>{ if(e.target.closest("[data-achint]")){ e.stopPropagation(); acHint(); } });

/* ---------- Inès n'est pas une amie : on trouve son compte (gelé) parmi les gens de Zap ---------- */
const _renderFriendsAC=renderFriends;
renderFriends=function(){ _renderFriendsAC(); if(!S.ac.on) return;
  const row=`<div class="frow acinesrow"><span class="av" style="background:#4A4241;width:40px;height:40px;font-size:17px" aria-hidden="true">I</span><div class="fwho2"><b>Inès Calder</b><small>compte gelé · a noté Les Puits de Saréna ★★★★★</small><small class="acinesq">« S'il disparaît d'ici, j'avais raison. »</small></div><div class="fbtns"><button class="btn fghost" disabled>Compte gelé</button></div></div>`;
  const q=norm(FQ.trim()); let shown=false;
  if(q&&("ines calder".includes(q)||q.includes("calder")||q.includes("ines"))){ $("fRes").querySelector(".fgrp")?.insertAdjacentHTML("afterbegin",row); const p=$("fRes").querySelector(".fgrp>p.jmeta"); if(p) p.remove(); shown=true; }
  if(!q){ const g=[...$("fSugg").querySelectorAll(".fgrp")].find(x=>/Aussi sur Zap/.test(x.textContent)); if(g) g.querySelector(".jmeta")?.insertAdjacentHTML("afterend",row); else $("fSugg").insertAdjacentHTML("beforeend",`<div class="fgrp"><div class="label">Aussi sur Zap</div>${row}</div>`); shown=true; }
  if(shown) acKw("Inès Calder");
};
// le menu Régie sait aussi effacer les checkpoints
const _rgBaseCP=rgBase; rgBase=function(over){ const cp=S.ac.cp; _rgBaseCP(over); S.ac.cp=cp; save(); };
