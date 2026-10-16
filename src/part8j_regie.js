
/* ================= RÉGIE : menu caché pour rejouer n'importe quel moment du Dossier 0417 =================
   Verrouillée par défaut : on la débloque en tapant le code secret dans la recherche de Zap.
   Une fois débloquée sur un téléphone, un appui long sur la barre de mire du haut la rouvre. */
const RG_CODE="regie.0417";
document.body.insertAdjacentHTML("beforeend",`<div class="rgov" id="rgOv" role="dialog" aria-modal="true" aria-label="Régie" hidden><div class="rgin">
  <div class="rghead"><b class="mono">RÉGIE · DOSSIER 0417</b><button class="acic" data-rg="close" aria-label="Fermer">×</button></div>
  <p class="rgsub">Pour toi seul. Saute où tu veux, recommence autant que tu veux.</p>
  <div id="rgList"></div></div></div>`);
const RG=[
  ["Avant le plantage",[
    ["zero","Tout remettre à zéro","l'appli comme neuve"],
    ["r9","9 refus d'affilée","le prochain « Pas pour moi » fait buguer les cartes"],
    ["r14","14 refus d'affilée","le prochain fait planter Zap"]]],
  ["Le plantage",[
    ["crash","Le plantage","gel, écran qui s'éteint, « Zap a cessé de fonctionner »"],
    ["safe","Le mode sans échec","au rallumage"]]],
  ["Acte I · L'anomalie : les pannes",[
    ["diag","Les vérifications techniques","depuis le début"],
    ["ask","« Voulez-vous intervenir ? »","la question de la réparation"],
    ["rep1","Panne 1 : la boucle vide","vider le cache, recharger, débloquer"],
    ["fix","Panne 1 réparée… puis panne 2","MIRE remarche quelques secondes"],
    ["p2","Panne 2 : les scores","le calibrage"],
    ["fix2","Panne 2 réparée… puis panne 3","l'horloge se bloque"],
    ["p3","Panne 3 : l'horloge","remettre le démarrage dans l'ordre"],
    ["p4","Panne 4 : la règle en trop","le dossier qui revient tout seul"],
    ["p4b","Panne 4 : il est revenu","il faut l'ouvrir"],
    ["hot","Fin de l'acte I","« Ce n'est pas un bug »"]]],
  ["Acte II · Le dossier",[
    ["idx","L'index : début de l'enquête","avec l'historique d'Inès"],
    ["idxall","L'index : tous les fragments trouvés","tous les mots relevés"],
    ["idxlast","Le tableau : dernière réponse","il ne manque que la date"],
    ["choice","Fin de l'acte II : le choix","publier, Inès, « 0 », garder"],
    ["lose","« Tu as perdu »","l'écran de défaite"]]],
  ["Acte III · Le contact",[
    ["a2keep","Début de l'acte III","après « garder pour moi »"],
    ["a2publish","Début de l'acte III · après « publier »","publication supprimée, plus de traces"],
    ["a2ines","Début de l'acte III · après « Inès »","ton message a été lu… par eux"],
    ["a2zero","Début de l'acte III · après « 0 »","la console est déjà ouverte"],
    ["a2con","La console, connectée","juste après le mot de passe"],
    ["a2all","Tous les indices de l'acte III","il reste à remplir le tableau"],
    ["a2end","Fin de l'acte III : le choix","bloquer, surveiller, piéger, MIRE"]]]
];
function rgOpen(){ rgRender(); $("rgOv").hidden=false; lockScroll(); try{navigator.vibrate&&navigator.vibrate([20,40,20]);}catch(e){} }
function rgClose(){ $("rgOv").hidden=true; lockScroll(); }
function rgRender(){
  $("rgList").innerHTML=`<button class="rgtog${S.dev.god?" on":""}" data-rgg="1"><span>${S.dev.god?"◉":"○"}</span><b>Traces illimitées</b><small>${S.dev.god?"tu ne peux plus perdre":"tu peux perdre à 5 traces"}</small></button>`+
    RG.map(([g,items])=>`<div class="rggrp mono">${g}</div>`+items.map(([id,t,d])=>`<button class="rgit" data-rgj="${id}"><b>${t}</b><small>${d}</small><i>›</i></button>`).join("")).join("")+
    `<button class="rglock" data-rglock="1">Verrouiller la régie sur ce téléphone</button>`;
}
// tout couper : séquences en cours, fenêtres, effets
function rgClean(){
  acTClear(); try{ AC=null; $("acOv").hidden=true; $("acEnd").hidden=true; $("acRes").innerHTML=""; $("acQ").value=""; }catch(e){}
  try{ DG=null; $("dgOv").hidden=true; }catch(e){}
  const C=$("acCrash"); C.hidden=true; C.className="accrash"; $("acStage").innerHTML="";
  document.body.classList.remove("acred","acfreeze","acflash","acjit","noscroll");
  try{ laStatic(0); laMood("none"); }catch(e){}
  $("rgOv").hidden=true; lockScroll();
}
function rgBase(over){ const m=S.ac.mute; S.ac=Object.assign(AC0(),{v:3,mute:m},over||{}); try{ sessionStorage.setItem("zap.safe","1"); }catch(e){} save(); }
const BROKE={on:1,refuse:15};
function rgAllFrags(){ const seen={},kw={}; FR.forEach(f=>{ seen[f.id]=1; (f.k||[]).forEach(k=>kw[k]=1); }); return {seen,kw}; }
function rgAct1(choice){ return {...BROKE,diagRun:1,rep:5,pn:4,del:2,cal:1,clk:1,f0417:1,intro:1,...rgAllFrags(),ans:{q1:"Saréna",q2:"Vasquel Énergie",q3:"Lumen Data",q4:"Marc Delaunay",q5:"11/03/2026"},done1:1,end:"act1",choice,crashAt:Date.now()-50*60e3}; }
function rgA2(choice){ rgBase(rgAct1(choice)); renderAll(); showTab("now"); acOpen(); }
function rgA2All(){ const a=A2(); a.vis=1; a.con=1; a.greet=1; FR2.forEach(f=>{ a.seen[f.id]=1; (f.k||[]).forEach(k=>S.ac.kw[k]=1); }); ["maint_0312",IP,"HALDEN-OPS","svc_ruiz"].forEach(k=>S.ac.kw[k]=1); a.log=[{c:"",o:"accès accordé. Bonjour, 0.\ntape « aide »."}]; save(); }
function rgJump(id){
  rgClean(); laStart(); try{LA.c&&LA.c.resume();}catch(e){}
  const home=()=>{ renderAll(); showTab("now"); try{showView("sugg");}catch(e){} };
  const J={
    zero(){ rgBase(); home(); toast("Remis à zéro.",1800); },
    r9(){ rgBase({refuse:9}); home(); toast("9 refus. Refuse encore.",2200); },
    r14(){ rgBase({refuse:14}); home(); acT(()=>{ const L=$("list"); L&&L.scrollIntoView({block:"start"}); },200); toast("14 refus. Un de plus et ça plante.",2400); },
    crash(){ rgBase({refuse:14}); home(); acT(acActivate,300); },
    safe(){ rgBase(BROKE); home(); acSafe(); },
    diag(){ rgBase(BROKE); home(); acDiag(); },
    ask(){ rgBase({...BROKE,diagRun:1}); home(); acDiag(); },
    rep1(){ rgBase({...BROKE,diagRun:1,rep:1}); home(); acDiag(); },
    rep4(){ rgBase({...BROKE,diagRun:1,rep:4}); home(); acDiag(); },
    fix(){ rgBase({...BROKE,diagRun:1,rep:4}); home(); acDiag(); dgReboot(); },
    p2(){ rgBase({...BROKE,diagRun:1,rep:5,pn:2}); home(); acDiag(); },
    fix2(){ rgBase({...BROKE,diagRun:1,rep:5,pn:2,cal:1}); home(); acDiag(); dgBootSeq([["Modèle de goûts v12","RECALIBRÉ"],["MIRE","EN LIGNE"]],r=>dgFixedMsg(r,3)); },
    p3(){ rgBase({...BROKE,diagRun:1,rep:5,pn:3,cal:1}); home(); acDiag(); },
    p4(){ rgBase({...BROKE,diagRun:1,rep:5,pn:4,cal:1,clk:1}); home(); acDiag(); DG.hid=1; DG.path="/regles"; dgExplorer(); },
    p4b(){ rgBase({...BROKE,diagRun:1,rep:5,pn:4,cal:1,clk:1,del:2}); home(); acDiag(); DG.hid=1; DG.path="/regles"; dgExplorer(); },
    hot(){ rgBase({...BROKE,diagRun:1,rep:5,pn:4,del:2,cal:1,clk:1}); home(); acDiag(); dgHot(); },
    idx(){ rgBase({...BROKE,diagRun:1,rep:5,pn:4,del:2,cal:1,clk:1,f0417:1}); home(); acOpen(); },
    idxall(){ rgBase({...BROKE,diagRun:1,rep:5,pn:4,del:2,cal:1,clk:1,f0417:1,intro:1,...rgAllFrags()}); home(); acOpen(); AC.tab="kw"; acRender(); },
    idxlast(){ rgBase({...BROKE,diagRun:1,rep:5,pn:4,del:2,cal:1,clk:1,f0417:1,intro:1,...rgAllFrags(),ans:{q1:"Saréna",q2:"Vasquel Énergie",q3:"Lumen Data",q4:"Marc Delaunay"}}); home(); acOpen(); AC.tab="board"; AC.sel="q5"; acRender(); },
    choice(){ rgBase({...BROKE,diagRun:1,rep:5,pn:4,del:2,cal:1,clk:1,f0417:1,intro:1,...rgAllFrags(),ans:{q1:"Saréna",q2:"Vasquel Énergie",q3:"Lumen Data",q4:"Marc Delaunay",q5:"11/03/2026"},done1:1}); home(); acOpen(); acComplete(); },
    a2keep(){ rgA2("keep"); }, a2publish(){ rgA2("publish"); }, a2ines(){ rgA2("ines"); }, a2zero(){ rgA2("zero"); },
    a2con(){ rgA2("keep"); const a=A2(); a.vis=1; a.con=1; a.greet=1; a.log=[{c:"",o:"accès accordé. Bonjour, 0.\ntape « aide »."}]; save(); AC.tab="con"; acRender(); },
    a2all(){ rgA2("keep"); rgA2All(); AC.tab="board"; acRender(); },
    a2end(){ rgA2("keep"); rgA2All(); const a=A2(); a.ans={r1:"maint_0312",r2:IP,r3:"HALDEN-OPS",r4:"HALDEN-OPS",r5:"PIÈGE"}; a.done=1; save(); AC.tab="board"; acRender(); ac2Complete(); },
    lose(){ rgBase({...BROKE,diagRun:1,rep:5,pn:4,del:2,cal:1,clk:1,f0417:1,intro:1,exp:AC_LOSE,end:"lose",seen:{f01:1,f02:1,f06:1},kw:{}}); home(); acLose(); }
  };
  J[id]&&J[id]();
}
$("rgOv").addEventListener("click",e=>{ e.stopPropagation(); const b=e.target.closest("button"); if(!b) return; const D=b.dataset;
  if(D.rg==="close") return rgClose();
  if(D.rglock){ S.dev.unl=0; S.dev.god=0; save(); rgClose(); toast("Régie verrouillée.",1800); return; }
  if(D.rgg){ S.dev.god=S.dev.god?0:1; save(); return rgRender(); }
  if(D.rgj) rgJump(D.rgj);
});
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&!$("rgOv").hidden) rgClose(); });
// appui long sur la barre de mire du haut
(function(){ const m=document.querySelector(".wrap>.mire")||document.querySelector(".mire"); if(!m) return; m.classList.add("rgmire");
  let t=null; const stop=()=>{ clearTimeout(t); t=null; m.classList.remove("rgcharge"); };
  m.addEventListener("pointerdown",e=>{ stop(); if(!S.dev.unl){ t=setTimeout(()=>{ t=null; if(typeof entLongHint==="function") entLongHint(); },1100); return; } m.classList.add("rgcharge"); t=setTimeout(()=>{ stop(); rgOpen(); },1200); });
  ["pointerup","pointerleave","pointercancel"].forEach(ev=>m.addEventListener(ev,stop));
  m.addEventListener("contextmenu",e=>e.preventDefault());
})();
// le code secret, tapé tel quel dans la recherche de Zap
$("sq").addEventListener("input",e=>{ if(e.target.value.trim().toLowerCase()!==RG_CODE) return;
  e.target.value=""; SQ=""; S.dev.unl=1; save(); closeSearch(); rgOpen(); });
