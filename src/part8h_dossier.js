
/* ================= EASTER EGG : « DOSSIER 0417 » — Acte I, en enquête libre =================
   Activation : 15 « Pas pour moi » d'affilée. Indice discret : le compteur de refus dans « Ce que l'algo a appris ».
   Jeu : un moteur de recherche clandestin. Des fragments courts. Des mots à chercher. Un tableau à remplir soi-même. */
const AC0=()=>({rep:0,refuse:0,on:0,seen:{},kw:{},flag:{},exp:0,ans:{},end:null,choice:null,mute:0,tries:0,intro:0});
if(!S.ac||S.ac.v!==3){ const m=S.ac&&S.ac.mute; S.ac=AC0(); S.ac.v=3; S.ac.mute=m||0; }
S.ac=Object.assign(AC0(),S.ac); S.ac.v=3; if(!S.ac.seen) S.ac.seen={}; if(!S.ac.kw) S.ac.kw={}; if(!S.ac.ans) S.ac.ans={}; if(!S.ac.flag) S.ac.flag={};
CHORDS.dark=[[45,52,55],[44,51,55],[41,48,53],[43,50,53]];
const AC_LOSE=5;
// minuteurs des séquences, pour pouvoir tout couper (menu Régie)
const AC_TIM=new Set(); function acT(f,ms){ const id=setTimeout(()=>{ AC_TIM.delete(id); f(); },ms); AC_TIM.add(id); return id; } function acTClear(){ AC_TIM.forEach(clearTimeout); AC_TIM.clear(); }
if(!S.dev) S.dev={god:0};


/* ---------- l'univers : fragments (2-3 lignes max) ---------- */
// q : mots qui les trouvent · k : mots-clés qu'ils révèlent · fl : mot surveillé (laisse une trace)
const FR=[
  {id:"f01",x:["03:10 sauvegarde nocturne · OK", "03:11 modèle de « personnalité » mis à jour", "03:13 aucun administrateur prévenu", "03:14 reprise normale du service"],h:["HALDEN", "417 titres masqués"],q:["0417","dossier"],src:"LOG MIRE",d:"11/03/2026 03:12",t:"Règle externe ajoutée : HALDEN. Origine : API partenaire. 417 titres masqués."},
  {id:"f02",x:["filtre : HALDEN · portée : tous les profils", "motif : « contenu sensible partenaire »", "effet : immédiat · sans date de fin"],h:["HALDEN"],q:["halden","filtre","regle"],src:"LISTE HALDEN (extrait)",t:"« Les Puits de Saréna » · « Ouarka, le silence » · « Saréna : l'or noir » · … +414",n:"Tous sur Saréna. Tous.",k:["Saréna","Ouarka","Les Puits de Saréna"]},
  {id:"f03",x:["Durée : 94 min · français, arabe", "Prix du public, festival de Lussac 2024", "Sur Zap : retiré du catalogue"],q:["sarena","documentaire"],src:"RÉSUMÉ ARCHIVÉ",d:"2024",t:"Le puits n°7 a changé la vie de la région. Pas pour tout le monde. Réalisation : I. Calder.",k:["Saréna","Inès Calder"]},
  {id:"f04",x:["Relevé du 18/09/2025 · scanné par I.C.", "Torchères allumées jour et nuit. Les puits 3 à 6 sont fermés.", "On me demande de ne pas filmer la clôture nord."],h:["Puits n°7", "le Halden"],q:["puits"],src:"NOTE DE TERRAIN (scan)",t:"Puits n°7 — exploitant : V███████ Énergie. Les gens d'ici l'appellent « le Halden ».",n:"Le nom est caviardé partout. Trouver le registre."},
  {id:"f04b",x:["Ministère de l'Énergie · Saréna", "Concessions actives : 9 · suspendues : 2", "Puits n°3 à 6 : fermés (2023)"],h:["Puits n°7"],q:["exploitant","registre","concession"],src:"REGISTRE DES CONCESSIONS · SARÉNA",t:"Puits n°7 : concession accordée en 2019 à Vasquel Énergie. Renouvelée en mars 2026, « sous conditions ».",k:["Vasquel Énergie"]},
  {id:"f05",x:["Signé : N.B.","Supprimé par : modération automatique", "Motif : « contenu sensible partenaire »"],q:["ouarka"],src:"COMMENTAIRE SUPPRIMÉ",d:"02/2026",t:"J'ai grandi à Ouarka. Il n'y a plus de Ouarka. Ils disent que personne n'est mort en janvier.",k:["Ouarka"]},
  {id:"f15",x:["Agence Continent · 14/01/2026 · 07:52", "Le site a été fermé quelques heures « par précaution »."],h:["Aucune victime", "12/03/2026"],q:["janvier","incident","victime"],src:"DÉPÊCHE",d:"14/01/2026",t:"« Incident technique sur un site pétrolier de Saréna. Aucune victime. » Dépêche retirée de 4 sites le 12/03/2026.",n:"Aucune victime. Et les 12 familles ?"},
  {id:"f16",x:["Montage provisoire · non diffusé"],h:["douze familles"],q:["familles","or noir","petrole"],src:"BANDE-ANNONCE (fragment)",t:"« …et pendant que le pétrole coulait, douze familles d'Ouarka attendaient qu'on vienne les chercher. »"},
  {id:"f06",x:["Films notés : 212 · listes : 9", "Dernière recherche : « halden »"],h:["compte gelé", "09:38"],q:["calder","ines"],src:"PROFIL ZAP",t:"Inès Calder · réalisatrice · dernière activité : 11/03/2026 09:38 · compte gelé.",k:["Inès Calder","11/03/2026"]},
  {id:"f07",x:["02:00 sauvegarde nocturne · OK", "08:12 trafic normal", "11:02 suppression d'un mail interne"],h:["HALDEN", "10:22"],q:["11/03","11 mars","110326","journal"],src:"JOURNAL MIRE · 11/03/2026",t:"03:12 règle HALDEN · 09:40 compte « I. Calder » gelé · 10:05 accès confirmé, contrat LD-22 · 10:22 connexion console : « 0 ».",k:["11/03/2026","LD-22","« 0 »"]},
  {id:"f08",h:["11/03/2026"],x:["Durée : 12 mois · renouvelable", "Confidentialité : totale. Aucune mention publique.", "Accès console : 1 compte technique"],q:["ld-22","ld 22","ld22","contrat"],src:"CONTRAT D'ACCÈS LD-22",t:"Client : Lumen Data. Accès : règles de recommandation. Signé pour Zap le 11/03/2026 par : M. D.",n:"Qui signe pour Zap ?",k:["Lumen Data","M. D."]},
  {id:"f08b",x:["Produit : 14 personnes · Contenus : 6 personnes", "Siège : Paris 11e"],q:["organigramme","direction","directeur","m. d","equipe"],src:"ORGANIGRAMME ZAP · 2026",t:"Direction générale : Marc Delaunay · Technique : T. Ruiz · Partenariats : M. Duval.",n:"Deux M. D.",k:["Marc Delaunay","T. Ruiz","M. Duval"]},
  {id:"f08c",x:["Remplaçant désigné : aucun"],h:["Aucune signature déléguée"],q:["duval","partenariats"],src:"PLANNING RH",t:"M. Duval (partenariats) : congé du 01/03 au 31/03/2026. Aucune signature déléguée.",k:["M. Duval"]},
  {id:"f11",x:["À : équipe direction · Objet : partenariat LD", "Supprimé le 11/03/2026 à 11:02"],q:["delaunay","marc"],fl:1,src:"MAIL INTERNE (supprimé)",t:"« On ne touche pas aux goûts des abonnés. On retire juste quelques titres. Personne ne le verra. » — Marc",k:["Marc Delaunay"]},
  {id:"f09",q:["lumen"],fl:1,src:"SITE OFFICIEL · Lumen Data",t:"« Nous ne censurons rien. Nous aidons les bonnes histoires à trouver leur public. »",k:["Lumen Data"]},
  {id:"f09b",q:["lumen"],fl:1,fake:1,src:"COMMUNIQUÉ · source : Lumen Data",t:"Lumen Data n'a jamais travaillé avec une entreprise pétrolière.",n:"Faux. Voir la facture."},
  {id:"f10",x:["Montant : confidentiel · paiement trimestriel", "Référence d'accès : LD-22"],h:["LD-22", "Saréna"],q:["facture"],src:"FACTURE (fuite)",t:"Lumen Data → Vasquel Énergie. Objet : « gestion de visibilité · Saréna · 12 mois ».",k:["Lumen Data","Vasquel Énergie"]},
  {id:"f10b",q:["vasquel"],fl:1,src:"COMMUNIQUÉ · Vasquel Énergie",fake:1,t:"« Vasquel Énergie n'a jamais exploité de site dans la région de Saréna. »",k:["Vasquel Énergie"]},
  {id:"f12",x:["Compte : I. Calder · gelé le 11/03/2026 à 09:40"],q:["gele","gel"],src:"MOTIF DU GEL",t:"« Demande partenaire. » Le compte n'a pas été supprimé. Il attend."},
  {id:"f13",h:["09:38"],q:["0","zero"],src:"MESSAGE GLISSÉ DANS LES LOGS",t:"Tu marches dans ses pas. Elle s'est arrêtée à 09:38. Ne t'arrête pas. — 0"},
  {id:"f14",x:["Version 4.2.0 · 118 titres indexés · 3 règles internes"],h:["03:11"],q:["mire"],src:"FICHE SYSTÈME",t:"MIRE · moteur de recommandation de Zap. Dernière mise à jour de sa « personnalité » : 11/03/2026, 03:11."},
  {id:"f18",q:["index","mire-index","acces","invitee","invite"],src:"ACCÈS · mire-index",t:"Accès accordé à : I. Calder (compte invité). Par : svc_ruiz. Le 01/02/2026.",x:["Motif : « documentaire · recherche d'archives »","Révoqué le 11/03/2026 à 09:40"],h:["svc_ruiz","I. Calder"],k:["svc_ruiz"]},
  {id:"f17",x:["Chez Zap depuis 2021 · travaille sur MIRE depuis la v2"],h:["10:22"],q:["ruiz","technique"],src:"FICHE ÉQUIPE",t:"T. Ruiz · équipe technique · accès console : oui · dernière connexion console : 11/03/2026 à 10:22.",k:["T. Ruiz"]}
];
// la trace de celle qui est passée avant
const IC_HIST=[["02/02/2026","saréna documentaire"],["09/02/2026","puits 7 exploit…"],["14/02/2026","ouarka"],["20/02/2026","incident janvier"],["03/03/2026","lumen",1],["10/03/2026","contrat ld-…"],["11/03/2026 · 01:20","mire apprend de quoi"],["11/03/2026 · 02:58","halden"],["11/03/2026 · 09:38","— session fermée —",2]];
const QS=[
  {id:"q1",t:"Qu'est-ce que MIRE n'a plus le droit de montrer ?",ic:"tout ce qui parle de… (illisible)",a:["Saréna","Ouarka","Les Puits de Saréna"],ok:"Saréna"},
  {id:"q2",t:"Qui paie pour que ça disparaisse ?",ic:"V… ? à prouver",a:["Vasquel Énergie"]},
  {id:"q3",t:"Qui a posé le filtre dans MIRE ?",ic:"un « partenaire »",a:["Lumen Data"]},
  {id:"q4",t:"Qui leur a ouvert la porte de Zap ?",ic:"M. D. — mais lequel ?",a:["Marc Delaunay"],no:{"M. D.":"Trop vague. Lequel ?"}},
  {id:"q5",t:"Quel jour tout a basculé ?",ic:"",a:["11/03/2026"]},
  {id:"q6",t:"Qui est « 0 » ?",ic:"",opt:1,a:["T. Ruiz"]}
];
const nrm=s=>norm(String(s)).replace(/[’']/g," ").replace(/\s+/g," ").trim();

/* ---------- indice discret + dérèglement de l'algorithme ---------- */
const _renderProfileAC=renderProfile;
renderProfile=function(){ _renderProfileAC(); const n=S.ac.refuse||0;
  const txt=S.ac.on?"MIRE · —":n>=5?`MIRE · ${n} <s>refus</s> / 15`:`MIRE · ${n} refus d'affilée`;
  $("learn").insertAdjacentHTML("beforeend",`<div class="acctr" aria-label="Une note manuscrite"><span>${txt}</span></div>`); };
const GL="░▒▓█#%&?";
function acScramble(s,p){ return [...s].map(c=>c!==" "&&Math.random()<p?GL[Math.floor(Math.random()*GL.length)]:c).join(""); }
const _renderListAC=renderList;
renderList=function(){
  _renderListAC(); const L=$("list"); if(!L) return;
  if(S.ac.on&&S.ac.live) return; // MIRE a l'air réparée… pour l'instant
  if(S.ac.on&&S.ac.end!=="act1"){ L.innerHTML=acBrokenHtml(); $("tip").textContent="Recommandations indisponibles."; $("resTitle").textContent="MIRE ne répond plus"; const pz=$("progZone"); return; }
  if(S.ac.on){ L.insertAdjacentHTML("afterbegin",acDossierCard()); return; }
  const n=S.ac.refuse; if(n<10) return; const lvl=n-9;
  L.querySelectorAll(".card").forEach((c,i)=>{
    c.classList.add("acg"); c.style.setProperty("--g",lvl);
    const h=c.querySelector(".ctitle h3"); if(h) h.textContent=lvl>=5&&i===0?"ARRÊTE":acScramble(h.textContent,.06*lvl);
    if(lvl>=2){ const v=Math.max(0,13-lvl*3-i); const m=c.querySelector(".match .mono"); if(m) m.textContent=`${v}% pour toi`; const b=c.querySelector(".bar i"); if(b) b.style.width=v+"%"; }
    if(lvl>=3&&i===0){ const w=c.querySelector(".why"); if(w) w.innerHTML=`<span class="neg">tu es sûr ?</span>`; }
    if(lvl>=4) c.querySelectorAll(".meta span").forEach(s=>{ if(Math.random()<.4) s.textContent=acScramble(s.textContent,.5); });
  });
  if(lvl>=4){ $("tip").textContent="Pourquoi tu refuses tout ?"; $("resTitle").textContent=acScramble($("resTitle").textContent,.35); }
  if(lvl>=3) document.body.classList.add("acjit");
};
function acDossierCard(){
  const solved=QS.filter(q=>!q.opt&&S.ac.ans[q.id]).length;
  return `<article class="card accard${S.ac.end?" done":""}"><div class="rank mono">░</div><div>
    <div class="ctitle"><h3>DOSSIER #0417</h3><span class="badge acbadge">${S.ac.end==="lose"?"effacé":S.ac.end?"acte II · clos":"accès restreint"}</span></div>
    <div class="meta"><span class="pl"><span class="dot" style="background:#6E6663"></span>???</span><span>${S.ac.end?"":`${solved}/5 · ${Object.keys(S.ac.seen).length} fragments`}</span></div>
    ${S.ac.end?"":`<p class="acsm">« Je n'ai plus rien à te proposer. Sauf ça. »</p>`}</div>
    <div class="acts">${S.ac.end==="lose"?"":`<button class="watch" data-acopen="1">${S.ac.end?"Relire":"Ouvrir"}</button>`}</div></article>`;
}
function acBrokenHtml(){
  return `<div class="acbroken"><div class="acbk-ico mono">0417</div><b>Le moteur de recommandation s'est arrêté.</b>
    <p>MIRE a planté et ne propose plus rien. Il reste le mode diagnostic.</p>
    <button class="btn primary" data-acopen="1">Ouvrir le diagnostic</button>
    <span class="mono acbk-st">${QS.filter(q=>!q.opt&&S.ac.ans[q.id]).length}/5 · ${Object.keys(S.ac.seen).length} fragments · traces ${S.ac.exp}/${AC_LOSE}</span></div>`;
}
document.body.insertAdjacentHTML("beforeend",`<div class="accrash" id="acCrash" hidden><div class="accrt"></div><div class="acstage" id="acStage"></div></div>`);
function acActivate(){
  S.ac.on=1; S.ac.refuse=15; save(); laStart(); try{LA.c&&LA.c.resume();}catch(e){}
  document.body.classList.add("acfreeze","acflash","noscroll"); laStatic(.35);
  try{navigator.vibrate&&navigator.vibrate([80,40,80,40,300]);}catch(e){}
  acT(()=>{ document.body.classList.remove("acflash"); laStatic(0); laSweep(); const C=$("acCrash"); C.hidden=false; C.className="accrash off"; },1400);
  acT(()=>{ const C=$("acCrash"); C.className="accrash black"; document.body.classList.remove("acfreeze","acjit");
    $("acStage").innerHTML=`<div class="acalert"><b>Zap a cessé de fonctionner</b><p>Le moteur de recommandation (MIRE) ne trouve plus rien à proposer et s'est bloqué.</p><p class="mono">Erreur 0417 · boucle de recommandation vide</p><button id="acKill">Fermer l'appli</button></div>`;
    $("acKill").onclick=acDead; },3000);
}
function acDead(){ laClunk(); $("acStage").innerHTML=""; acT(()=>{ $("acStage").innerHTML=`<button class="acpow" id="acPow" aria-label="Rallumer">⏻</button>`; $("acPow").onclick=acBoot; },3500); }
function acBoot(){
  laStart(); laStatic(.25); const C=$("acCrash"); C.className="accrash boot";
  $("acStage").innerHTML=`<div class="acmire"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="acbootxt mono" id="acBootT">ZAP · démarrage…</div>`;
  const L=["ZAP · démarrage…","MIRE · chargement… ÉCHEC (0417)","MIRE · nouvel essai… ÉCHEC (0417)","Démarrage en mode sans échec"];
  L.forEach((t,i)=>acT(()=>{ const e=$("acBootT"); if(e) e.textContent=t; if(i===1||i===2) laBeat(); },900+i*1100));
  acT(()=>{ laStatic(0); acSafe(); },900+L.length*1100);
}
function acSafe(){
  const C=$("acCrash"); C.hidden=false; C.className="accrash safe"; document.body.classList.add("noscroll");
  $("acStage").innerHTML=`<div class="acsafe"><div class="acmire small"><i></i><i></i><i></i><i></i><i></i><i></i></div><b class="mono">MODE SANS ÉCHEC</b>
    <p>MIRE, le moteur qui choisit ce que tu regardes, est en panne.<br>Cause : inconnue.</p>
    <button class="acsafe-go" id="acSafeDiag">Lancer le diagnostic</button><button class="acsafe-alt" id="acSafeNo">Ouvrir Zap sans recommandations</button></div>`;
  $("acSafeDiag").onclick=()=>{ acSafeOff(); acDiag(); };
  $("acSafeNo").onclick=()=>{ acSafeOff(); showTab("now"); };
}
function acSafeOff(){ const C=$("acCrash"); C.hidden=true; C.className="accrash"; $("acStage").innerHTML=""; document.body.classList.remove("noscroll"); renderAll(); }
// tant que MIRE est en panne, chaque lancement de Zap démarre en mode sans échec
acT(()=>{ try{ if(S.ac.end==="lose") return acGameOver(); if(S.ac.on&&S.ac.end!=="act1"&&!sessionStorage.getItem("zap.safe")){ sessionStorage.setItem("zap.safe","1"); acSafe(); } }catch(e){} },300);
if(typeof zapRandom==="function"){ const _zr=zapRandom; zapRandom=function(){ if(S.ac.on&&S.ac.end!=="act1"&&!S.ac.live){ toast("MIRE ne répond pas.",2200); return; } _zr(); }; }

/* ---------- l'interface d'enquête ---------- */
document.body.insertAdjacentHTML("beforeend",`<div class="acov" id="acOv" role="dialog" aria-modal="true" aria-label="Index de MIRE" hidden><div class="acin2">
  <div class="achead"><span class="aceye" aria-hidden="true"></span><b class="mono">MIRE · INDEX</b><span class="actr mono" id="acTr"></span><button class="acic" data-ac="mute" id="acMute" aria-label="Son">♪</button><button class="acic" data-ac="close" aria-label="Fermer">×</button></div>
  <p class="acvoice" id="acVoice"></p>
  <form class="acsearch" id="acForm" autocomplete="off"><input id="acQ" placeholder="un nom, un lieu, une date, un mot…" aria-label="Rechercher dans l'index" enterkeyhint="search" autocapitalize="none" spellcheck="false"><button class="acgo" aria-label="Chercher">⌕</button></form>
  <div class="acres" id="acRes"></div>
  <div class="actabs"><button data-act="board" aria-pressed="true">Son tableau</button><button data-act="hist">Son historique</button><button data-act="kw">Relevés</button></div>
  <div class="acpanel" id="acPanel"></div>
  <div class="acend" id="acEnd" hidden></div></div></div>`);

let AC=null;
function acOpen(){ AC={tab:"board",sel:null,last:null}; $("acOv").hidden=false; lockScroll(); laStart(); try{LA.c&&LA.c.resume();}catch(e){} laMood("dark"); laMuteSet();
  if(!S.ac.intro){ S.ac.intro=1; save(); acVoice("Diagnostic : la règle qui fait planter MIRE vient de l'extérieur. Et quelqu'un avait déjà commencé à chercher."); AC.tab="hist"; $("acQ").value="0417"; } else acVoice("");
  acRender(); if(S.ac.end) acShowEnd(); }
function acClose(){ AC=null; $("acOv").hidden=true; lockScroll(); laStatic(0); laMood("none"); acT(()=>{ try{ if(!AC) LA.c&&LA.c.suspend(); }catch(e){} },600); renderList(); }
function acVoice(t){ const v=$("acVoice"); v.textContent=t; v.classList.remove("in"); void v.offsetWidth; if(t) v.classList.add("in"); }
function acTrace(n,why){ S.ac.exp+=n; save(); acToast(`⚠ ${why}`); laBeat(); const e=$("acOv").querySelector(".aceye"); e&&e.classList.add("hit"); acT(()=>e&&e.classList.remove("hit"),900); acTr();
  if(S.ac.exp>=AC_LOSE&&!S.ac.end&&!S.dev.god){ S.ac.end="lose"; save(); acT(acLose,1100); } }
/* ---------- perdu : l'appli se ferme, on recommence tout ---------- */
function acLose(){
  if(AC){ AC=null; $("acOv").hidden=true; } if(typeof DG!=="undefined"&&DG){ DG=null; $("dgOv").hidden=true; }
  laMood("none"); laStatic(.4); try{navigator.vibrate&&navigator.vibrate([200,80,200,80,600]);}catch(e){}
  document.body.classList.add("acred","acfreeze","noscroll");
  const C=$("acCrash"); C.hidden=false; C.className="accrash detect";
  $("acStage").innerHTML=`<div class="aclost mono">CONNEXION DÉTECTÉE<br>ID : ${esc((S.me.name||"inconnu").toUpperCase())}<br>SIGNALEMENT ENVOYÉ AU PARTENAIRE « LD »</div>`;
  acT(()=>{ laStatic(0); laSweep(); C.className="accrash off"; $("acStage").innerHTML=""; document.body.classList.remove("acred"); },2600);
  acT(acGameOver,4300);
}
function acGameOver(){
  const C=$("acCrash"); C.hidden=false; C.className="accrash black"; document.body.classList.add("noscroll"); document.body.classList.remove("acfreeze","acjit");
  const f=Object.keys(S.ac.seen).length, r=QS.filter(q=>!q.opt&&S.ac.ans[q.id]).length;
  $("acStage").innerHTML=`<div class="acover"><div class="mono acover-k">SESSION SIGNALÉE · ACCÈS COUPÉ</div>
    <b class="acover-t">TU AS PERDU</b>
    <p>Tu as laissé trop de traces. Quelqu'un est remonté jusqu'à toi.</p>
    <p>Ton accès à MIRE a été fermé et tout ce que tu avais trouvé a été effacé. <em>Il n'y a pas de retour en arrière.</em></p>
    <div class="acstats mono"><span>Fragments : ${f}/${FR.length}</span><span>Réponses : ${r}/5</span><span>Traces : ${AC_LOSE}/${AC_LOSE}</span></div>
    <button class="acsafe-go" id="acRestart">Recommencer depuis zéro</button>
    <small class="mono">Le dossier se refermera. Pour le rouvrir, il faudra tout refaire depuis le début.</small></div>`;
  $("acRestart").onclick=acRestart;
}
function acRestart(){
  const m=S.ac.mute; S.ac=AC0(); S.ac.v=3; S.ac.mute=m; save(); try{sessionStorage.removeItem("zap.safe");}catch(e){}
  const C=$("acCrash"); C.className="accrash boot"; laStart(); laStatic(.2);
  $("acStage").innerHTML=`<div class="acmire"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="acbootxt mono">ZAP · réinitialisation…</div>`;
  acT(()=>{ laStatic(0); C.hidden=true; C.className="accrash"; $("acStage").innerHTML=""; document.body.classList.remove("noscroll","acred","acfreeze","acjit"); renderAll(); showTab("now"); toast("Zap a redémarré. Comme si de rien n'était.",3200); },2600);
}
function acToast(m){ toast(m,2600); }
function acTr(){ const t=$("acTr"); if(t) t.innerHTML=`${"●".repeat(Math.min(S.ac.exp,AC_LOSE))}${"○".repeat(Math.max(0,AC_LOSE-S.ac.exp))}`; }
function acKw(raw){ const k=raw.trim(); if(!S.ac.kw[k]){ S.ac.kw[k]=1; save(); return true; } return false; }
function acHl(txt,terms){
  // les noms, lieux, dates qui comptent : écrits en jaune
  let out=esc(txt); const T=[...new Set(terms.filter(Boolean))].sort((a,b)=>b.length-a.length), keep=[];
  T.forEach(t=>{ const e=esc(t); if(!out.includes(e)) return; out=out.split(e).join(String.fromCharCode(0xE000+keep.length)); keep.push(e); });
  return out.replace(/[\uE000-\uE0FF]/g,ch=>`<b class="acmk">${keep[ch.charCodeAt(0)-0xE000]}</b>`);
}
function acFragHtml(f,isNew){
  const T=[...(f.k||[]),...(f.h||[])];
  return `<article class="acfr${f.fake?" fake":""}${isNew?" new":""}"><div class="acsrc mono"><span>${esc(f.src)}</span>${f.d?`<span>${esc(f.d)}</span>`:""}</div><p>${acHl(f.t,T)}</p>${f.x&&f.x.length?`<div class="acx mono">${f.x.map(l=>`<div>${acHl(l,T)}</div>`).join("")}</div>`:""}${f.n?`<div class="acic2"><span>I.C.</span> ${esc(f.n)}</div>`:""}</article>`;
}
function acMatch(f,n){ return f.q.some(t=>{ const x=nrm(t); if(x===n) return true; if(x.length<=2) return false; if((" "+n+" ").includes(" "+x)) return true; return n.length>=5&&x.startsWith(n); }); }
function acSearch(q){
  const n=nrm(q); if(!n) return; AC.last=q; AC.tab=AC.tab||"board";
  const hits=FR.filter(f=>acMatch(f,n));
  const flagged=hits.filter(f=>f.fl).length&&!S.ac.flag[n];
  let html="";
  if(!hits.length){ html=`<p class="acnone mono">Aucun fragment pour « ${esc(q)} ».</p>`; laClunk(); }
  else { let fresh=0; html=hits.map(f=>{ const isNew=!S.ac.seen[f.id]; if(isNew){ S.ac.seen[f.id]=1; fresh++; } (f.k||[]).forEach(acKw); return acFragHtml(f,isNew); }).join(""); save(); if(fresh) laChime(); }
  $("acRes").innerHTML=html;
  if(flagged){ S.ac.flag[n]=1; save(); acT(()=>{ acTrace(1,"Ce mot est surveillé. Quelqu'un a vu ta recherche."); acVoice("Ce mot-là, ils l'écoutent. Elle aussi, elle l'avait cherché."); },500); }
  acPanel(); renderList();
}
function acRender(){ if(!AC) return; acTr(); $("acMute").textContent=S.ac.mute?"♪̸":"♪"; document.querySelectorAll("[data-act]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.act===AC.tab)); acPanel(); }
function acPanel(){
  if(!AC) return; const P=$("acPanel"); const kws=Object.keys(S.ac.kw);
  document.querySelectorAll("[data-act]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.act===AC.tab));
  if(AC.tab==="hist"){ P.innerHTML=`<p class="acsm2">Les recherches de son compte dans mire-index, avant toi :</p><div class="achist mono">${IC_HIST.map(([d,q,f])=>`<div class="${f===1?"fl":f===2?"end":""}"><span>${d}</span><b>${f===2?q:`« ${esc(q)} »`}</b>${f===1?`<i>⚠ signalée</i>`:""}</div>`).join("")}</div>`; return; }
  if(AC.tab==="kw"){ P.innerHTML=kws.length?`<div class="ackws">${kws.map(k=>`<button class="ackw ackwc" data-ackw="${esc(k)}">${esc(k)}</button>`).join("")}</div><p class="acsm2">Les noms, lieux et dates que tu as relevés. Touche-en un pour le chercher.</p>`:`<p class="acsm2">Rien relevé pour l'instant.</p>`; return; }
  P.innerHTML=`<p class="acsm2">Son tableau : sa liste privée Zap « Saréna — à prouver ». MIRE l'a lue, comme tout le reste. Elle ne l'a jamais finie.</p><div class="acqs">${QS.map(q=>{ const a=S.ac.ans[q.id]; const open=AC.sel===q.id&&!a;
    return `<div class="acq${a?" ok":""}${open?" open":""}${q.opt?" opt":""}"><button class="acqt" data-acq="${q.id}" ${a?"disabled":""}><span>${a?"✓":"?"}</span><em>${q.t}${q.opt?` <small>(facultatif)</small>`:""}</em></button>
      ${a?`<div class="acqa mono">${esc(a)}</div>`:q.ic?`<div class="acqic"><s>${esc(q.ic)}</s></div>`:""}
      ${open?(kws.length?`<div class="ackws">${kws.map(k=>`<button class="ackw ackwc pick" data-acpick="${esc(k)}">${esc(k)}</button>`).join("")}</div><p class="acsm2">Choisis parmi ce que tu as relevé. Une mauvaise réponse laisse une trace.</p>`:`<p class="acsm2">Tu n'as encore rien relevé.</p>`):""}</div>`; }).join("")}</div>`;
}
function acAnswer(qid,k){
  const q=QS.find(x=>x.id===qid); if(!q||S.ac.ans[qid]) return;
  if(q.no&&q.no[k]){ acVoice(q.no[k]); return; }
  if(q.a.includes(k)){ S.ac.ans[qid]=q.ok||k; AC.sel=null; save(); laChime();
    const req=QS.filter(x=>!x.opt), n=req.filter(x=>S.ac.ans[x.id]).length;
    acVoice(qid==="q6"?"…Elle ne savait pas ça.":["","Oui.","Oui. Continue.","Tu vas plus loin qu'elle.","Il en reste une.",""][n]||"");
    if(n===req.length&&!S.ac.done1){ S.ac.done1=1; save(); acT(acComplete,900); } }
  else { S.ac.tries++; save(); acVoice("Non."); acTrace(1,"Mauvaise piste. Ça laisse une trace."); }
  acPanel(); renderList();
}
function acComplete(){ if(!AC) return; laMood("none"); laSweep();
  const E=$("acEnd"); E.hidden=false; E.innerHTML=`<div class="acendbox"><div class="mono acbig">MIRE RÉPARÉE</div><p class="acsm2">Tu as retiré la règle HALDEN. Les recommandations reviennent.</p>
    <p class="acsm2">Tu tiens assez pour que quelqu'un te croie. Ou pour qu'on te fasse taire. Qu'est-ce que tu en fais ?</p>
    <button class="acopt" data-acch="publish">› Le publier sur le fil des potes. Tout le monde doit savoir.</button>
    <button class="acopt" data-acch="ines">› L'envoyer à Inès, sur son compte gelé.</button>
    <button class="acopt" data-acch="zero">› Répondre à « 0 ».</button>
    <button class="acopt" data-acch="keep">› Le garder pour moi. Pour l'instant.</button></div>`;
  acT(()=>E.scrollIntoView({behavior:"smooth",block:"center"}),300);
}
function acChoose(c){ S.ac.choice=c; S.ac.end="act1"; if(c==="publish") S.ac.exp=Math.min(AC_LOSE-1,S.ac.exp+2); save(); checkBadges(); acShowEnd(); renderList(); }
function acShowEnd(){
  const E=$("acEnd"); E.hidden=false; const f=Object.keys(S.ac.seen).length;
  const stats=`<div class="acstats mono"><span>Fragments : ${f}/${FR.length}</span><span>Traces : ${S.ac.exp}/${AC_LOSE}</span><span>Erreurs : ${S.ac.tries}</span></div>`;
  if(S.ac.end==="lose"){ E.hidden=true; return acLose(); }
  else if(S.ac.end==="act1"){ const C={publish:"Tu as publié. Ça va faire du bruit. Beaucoup.",ines:"Message envoyé au compte gelé. Lu, il y a une seconde. Par qui ?",zero:"Tu as écrit à « 0 ». Pas de réponse. Pas encore.",keep:"Tu gardes tout pour toi. Personne ne sait ce que tu sais. Pour l'instant."}[S.ac.choice];
    E.innerHTML=`<div class="acendbox"><div class="mono acbig">FIN DE L'ACTE II</div><p>${C}</p>${stats}<p class="acsm2 mono">ACTE III · LE CONTACT — ferme l'index. Reviens plus tard.</p></div>`; }
  acT(()=>E.scrollIntoView({behavior:"smooth",block:"center"}),300);
}

/* ---------- des fragments cachés dans l'appli elle-même ---------- */
const _renderSearchAC=renderSearch;
renderSearch=function(){ _renderSearchAC(); if(!S.ac.on) return; const q=nrm(SQ);
  if(q.length>=4&&("sarena".startsWith(q)||q.includes("sarena")||q.includes("puits"))){
    $("sres").insertAdjacentHTML("afterbegin",`<div class="sitem acghost"><div class="shead"><span class="dot" style="background:#6E6663"></span><span class="sname"><b>Les Puits de Saréna</b><small>documentaire · 2024 · <span class="acred2">masqué par filtre</span></small></span></div></div>`);
    if(acKw("Les Puits de Saréna")) toast("Un titre que Zap n'est pas censée connaître.",2600); } };
const _renderPotesAC=renderPotes;
renderPotes=function(){ _renderPotesAC(); return; const z=$("potesFeed"); if(!z) return;
  z.insertAdjacentHTML("afterbegin",`<article class="fcard acines"><div class="fhead"><span class="av" style="background:#4A4241;width:34px;height:34px;font-size:14px">I</span><div class="fwho"><b>Inès Calder</b> <span class="jmeta">a noté</span> <b>Les Puits de Saréna</b><div class="jmeta">compte gelé</div></div>${starStr(5)}</div><p class="fcom">« S'il disparaît d'ici, j'avais raison. »</p></article>`);
  acKw("Inès Calder"); };

/* ---------- clics ---------- */
document.addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b) return; const D=b.dataset;
  if(!S.ac.on){
    if(D.a==="later"){ S.ac.refuse=(S.ac.refuse||0)+1; save(); const n=S.ac.refuse;
      if(n>=15) acActivate(); else { if(n>=10) renderList(); const T={4:"Noté.",6:"Tu es difficile, ce soir.",8:"Encore non ?",9:"…"}; entTremble(); acEntStep(n); if(T[n]) acT(()=>toast(T[n],1800),60); }
      renderProfile(); }
    else if(D.a==="watch"||D.a==="wish"||D.vwatch||D.zgo){ if(S.ac.refuse){ S.ac.refuse=0; save(); document.body.classList.remove("acjit"); renderProfile(); } }
    return;
  }
  if(D.acopen){ acDiag(); }
});
$("acForm").addEventListener("submit",e=>{ e.preventDefault(); if(!AC||S.ac.end==="lose") return; const v=$("acQ").value; acSearch(v); $("acQ").blur(); });
$("acOv").addEventListener("click",e=>{
  e.stopPropagation(); const b=e.target.closest("button"); if(!b||!AC) return; const D=b.dataset; laStart();
  if(D.ackw){ if(S.ac.end==="lose") return; $("acQ").value=D.ackw; acSearch(D.ackw); $("acOv").scrollTo({top:0,behavior:"smooth"}); return; }
  if(D.act){ AC.tab=D.act; acRender(); return; }
  if(D.acq){ AC.sel=AC.sel===D.acq?null:D.acq; acPanel(); return; }
  if(D.acpick){ if(AC.sel) acAnswer(AC.sel,D.acpick); return; }
  if(D.acch){ acChoose(D.acch); return; }
  if(D.acz==="reset"){ const m=S.ac.mute; S.ac=AC0(); S.ac.v=3; S.ac.mute=m; save(); $("acEnd").hidden=true; acClose(); renderAll(); toast("Tout est revenu à la normale. Pour l'instant.",3000); return; }
  if(D.ac==="close"){ acClose(); return; }
  if(D.ac==="mute"){ S.ac.mute=S.ac.mute?0:1; save(); laMuteSet(); acRender(); return; }
});
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&AC) acClose(); });
BADGES.push({id:"ac1",i:"🗂️",n:"Dossier 0417",d:"Reconstituer le dossier de l'Acte II",g:1,v:()=>S.ac.end==="act1"?1:0,secret:true,hint:"Un algorithme, ça finit par craquer quand on lui dit non. Souvent."});
if(typeof LT==="undefined") var LT=null;
