
/* ================= Diagnostic de MIRE : vérifications techniques puis explorateur de fichiers ================= */
const NOW_D=()=>{ const d=new Date(); return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`; };
// arborescence : d = dossier, f = fichier · h = masqué · hot = le dossier qu'on cherche
const FS={
  "/":{d:["systeme","modeles","cache","logs","regles","utilisateurs","tmp"]},
  "/systeme":{d:[],f:[["version.txt","1 Ko","MIRE 4.2.0 · moteur de recommandation de Zap\nDernière mise à jour du modèle de « personnalité » : 11/03/2026 03:11"],["noyau.cfg","4 Ko",()=>`threads=8\nmemoire=512M\nmode_secours=${S.ac.live?"INACTIF":"ACTIF"}\nboucle_reco=${S.ac.rep>=4?"ACTIVE":"BLOQUÉE"}\nhorloge=${S.ac.pn>3||S.ac.clk?"synchronisée":S.ac.pn===3?"11/03/2026 03:12 (bloquée)":"auto"}`,"boucle"],["usine.cfg","1 Ko","valeurs d'usine · modèle de goûts v12\n(sauvegarde du 12/2025)\n\ngenres   = 0.5\nambiance = 0.3\nduree    = 0.2"],["memoire.dat","88 Mo",null],["LISEZMOI.txt","1 Ko","MIRE apprend en lisant tout ce qui passe par Zap :\ncatalogue, presse, commentaires, listes des abonnés,\ndocuments internes. 41 208 documents à ce jour.\nOutil de recherche dans sa mémoire : mire-index\n(réservé à l'équipe technique · ouvert en mode sans échec)"]]},
  "/modeles":{d:[],f:[["gouts_v12.bin","212 Mo",null,"recharger"],["ambiances.bin","41 Mo",null],["contexte_train.bin","9 Mo",null],["contexte_nuit.bin","9 Mo",null],["gouts_v12.cfg","1 Ko",()=>S.ac.cal?"genres   = 0.5\nambiance = 0.3\nduree    = 0.2\nrefus    = 0.0":S.ac.pn>=2?"genres   = 0.9\nambiance = 0.0\nduree    = 0.0\nrefus    = 1.0":"genres   = 0.5\nambiance = 0.3\nduree    = 0.2\nrefus    = 1.0","calibrer"],["LISEZMOI.txt","1 Ko","Ne pas modifier les modèles à la main.\nEn cas de dérèglement : valeurs d'usine dans systeme/."]]},
  "/cache":{d:["vignettes"],f:[["recos_tmp.json","3 Ko",()=>S.ac.rep>=2?"{\n  \"propositions\": [],\n  \"refus_consecutifs\": 0,\n  \"etat\": \"VIDÉ À LA MAIN\"\n}":"{\n  \"propositions\": [],\n  \"refus_consecutifs\": 15,\n  \"etat\": \"VIDE\"\n}","vider"]]},
  "/cache/vignettes":{d:[],f:[["(1 284 fichiers)","118 Mo",null]]},
  "/logs":{d:[],f:[["demarrage.log","2 Ko",()=>`MIRE démarrée · mode sans échec\nmodèle de goûts : ${S.ac.cal?"OK":"OK (?)"}\nrègles : ${S.ac.pn>=4?"4 chargées (3 attendues)":"3 chargées"}\n03:12 · tâche maint_0312 : exécutée`],["horloge.log","1 Ko",()=>S.ac.clk?`horloge resynchronisée : ${NOW_D()}\nséquence de démarrage : OK`:"séquence de démarrage : DÉSORDONNÉE\nhorloge bloquée sur 11/03/2026 03:12","ordre"],["diag_{TODAY}.log","1 Ko","ERREUR 0417\nla boucle de recommandation est vide\ncause : inconnue\nréparation automatique : échec"],["acces_partenaires.log","1 Ko","10:05 · 11/03/2026 · partenaire « LD » · accès règles : AUTORISÉ"],["reparation.log","1 Ko",()=>["panne 1 · boucle vide : réparée par {ME}",S.ac.pn>=2?"panne 2 · scores incohérents"+(S.ac.cal?" : réparée":""):"",S.ac.pn>=3?"panne 3 · horloge bloquée"+(S.ac.clk?" : réparée":""):"",S.ac.pn>=4?"panne 4 · une règle en trop au démarrage":"","chaque panne revient environ 6 s après la réparation"].filter(Boolean).join("\n"),null,()=>S.ac.rep>=5]]},
  "/regles":{d:()=>S.ac.del===1?[]:[".externe"],f:[["editoriales.cfg","2 Ko","nouveautes=+0.4\nliste_a_voir=+1.2\nage_minimum=respecter"],["famille.cfg","1 Ko","plus_jeune=filtrer\nhorreur_moins_16=interdit"],["age.cfg","1 Ko","signaletique=France"]]},
  "/regles/.externe":{d:["0417"],f:[["proprietaire.txt","1 Ko","créé par : partenaire « LD »\nautorisé par : M. D.\nle : 11/03/2026 03:12"]],h:1},
  "/regles/.externe/0417":{d:[],f:[],hot:1},
  "/utilisateurs":{d:[],f:[["{ME}.profil","6 Ko","{ME} · refus d'affilée : 15\nstatut : a fait planter MIRE\nsurveillance : —"],["ines_calder.profil","6 Ko","Inès Calder · réalisatrice\nstatut : GELÉ le 11/03/2026 09:40\nmotif : demande partenaire"]]},
  "/tmp":{d:["sessions_old"],f:[[".~verrou","0 Ko","verrouillé par : MIRE"],[".zappeurs","1 Ko","ines_calder\na.benali\nj.morel\n_"]]},
  "/tmp/sessions_old":{d:[],f:[["session_IC_110326.log","1 Ko","utilisateur : I.C.\n02:58 recherche « halden »\n09:38 session fermée (forcée)"]]}
};
if(S.ac.live){ S.ac.live=0; save(); } // fermé pendant qu'elle « remarchait » : la panne suivante est arrivée
const HIDDEN=p=>p.split("/").some(s=>s.startsWith("."));
let DG=null;
document.body.insertAdjacentHTML("beforeend",`<div class="dgov" id="dgOv" role="dialog" aria-modal="true" aria-label="Diagnostic MIRE" hidden><div class="dgin">
  <div class="dghead"><b class="mono">DIAGNOSTIC · MIRE 4.2.0</b><button class="acic" data-dg="close" aria-label="Fermer">×</button></div>
  <div class="dgbody" id="dgBody"></div></div></div>`);

function acDiag(){
  laStart(); try{LA.c&&LA.c.resume();}catch(e){}
  if(S.ac.f0417) return acOpen();
  DG={path:"/",hid:0,file:null}; $("dgOv").hidden=false; lockScroll(); laMood("dark");
  if(!S.ac.diagRun) dgRun(); else if(!S.ac.rep) dgAsk(); else dgExplorer();
}
function dgClose(){ DG=null; $("dgOv").hidden=true; lockScroll(); laMood("none"); }
function dgRun(){
  const L=[["Vérification du noyau","OK"],["Mémoire vive (512 Mo)","OK"],["Modèle de goûts v12","OK"],["Modèles de contexte (10)","OK"],["Cache des vignettes (1 284)","OK"],["Index du catalogue (118 titres)","OK"],["Règles éditoriales","OK"],["Règles famille / âge","OK"],["Cache des recommandations","SATURÉ"],["Boucle de recommandation","ÉCHEC 0417"],["Cause probable","inconnue"],["Réparation automatique","ÉCHEC"]];
  $("dgBody").innerHTML=`<div class="dgrun mono" id="dgRun"></div><div class="dgbar"><i id="dgBar"></i></div>`;
  let i=0; const step=()=>{ if(!DG) return; const r=$("dgRun"); if(!r) return;
    if(i>=L.length){ S.ac.diagRun=1; save(); return acT(()=>{ if(DG) dgAsk(); },900); }
    const [a,b]=L[i]; r.insertAdjacentHTML("beforeend",`<div><span>${a}</span><b class="${b==="OK"?"ok":b?"ko":""}">${b?`[ ${b} ]`:""}</b></div>`); r.scrollTop=1e6; $("dgBar").style.width=((i+1)/L.length*100)+"%";
    if(b.startsWith("ÉCHEC")) laBeat(); else if(b) laClunk(); i++; acT(step,i>8?750:260); };
  acT(step,300);
}
function dgTxt(f){ return typeof f[2]==="function"?f[2]():f[2]; }
function dgFill(s){ return s.split("{TODAY}").join(NOW_D().replace(/\//g,"")).split("{ME}").join((nrm(S.me.name||"moi").replace(/ /g,"_"))); }
function dgExplorer(){
  const p=DG.path, node=FS[p]; if(!node){ DG.path="/"; return dgExplorer(); }
  const crumbs=p==="/"?["mire"]:["mire",...p.slice(1).split("/")];
  const dirs=(typeof node.d==="function"?node.d():node.d||[]).filter(d=>DG.hid||!d.startsWith(".")).map(d=>{ const full=(p==="/"?"":p)+"/"+d, n=FS[full], cnt=n?((typeof n.d==="function"?n.d():n.d||[]).length+(n.f||[]).length):0, hot=n&&n.hot;
    return `<button class="dgrow dir${d.startsWith(".")?" hid":""}${hot?" hot":""}" data-dgcd="${esc(full)}"><span class="ico">${hot?"🗀":"▸"}</span><span class="nm mono">${esc(d)}/</span><span class="meta mono">${hot?"417 éléments · 11/03/2026":`${cnt} élément${cnt>1?"s":""}`}</span></button>`; }).join("");
  const files=(node.f||[]).map((f,i)=>(f[4]&&!f[4]())||(!DG.hid&&f[0].startsWith("."))?"":`<button class="dgrow file${dgActNow(f)?" todo":""}" data-dgf="${i}"><span class="ico">·</span><span class="nm mono">${esc(dgFill(f[0]))}</span><span class="meta mono">${f[1]}</span></button>`).join("");
  $("dgBody").innerHTML=`${dgGuide()}<div class="dgtool"><div class="dgcrumb mono">${crumbs.map((c,i)=>`<button data-dgup="${i}">${esc(c)}</button>`).join(" / ")}</div>
      <button class="dgtog${DG.hid?" on":""}" data-dghid="1">${DG.hid?"◉":"○"} éléments masqués</button></div>
    ${p==="/regles/.externe"&&S.ac.pn===4&&!S.ac.del?`<button class="dgact dgdel" data-dgdel="1">Supprimer regles/.externe/</button>`:""}<div class="dglist">${p!=="/"?`<button class="dgrow dir up" data-dgup="${crumbs.length-2}"><span class="ico">↰</span><span class="nm mono">..</span><span class="meta"></span></button>`:""}${dirs}${files}${!dirs&&!files?`<p class="dgempty mono">(vide)</p>`:""}</div>
    <div class="dgview" id="dgView">${DG.file?dgFileHtml(DG.file):`<p class="dgempty mono">Sélectionne un fichier pour l'ouvrir.</p>`}</div>`;
}
function dgFileHtml(f){ const t=dgTxt(f), a=dgActNow(f);
  return `<div class="dgfname mono">${esc(dgFill(f[0]))} · ${f[1]}</div>${t===null?`<p class="dgempty mono">Fichier binaire. Illisible.${f[3]==="recharger"&&S.ac.rep>=3?" · rechargé ✓":""}</p>`:`<pre class="mono">${esc(dgFill(t))}</pre>`}${a?(f[3]==="calibrer"?dgCalHtml():f[3]==="ordre"?dgOrdHtml():`<button class="dgact" data-dgact="${f[3]}">${DG_ACT[f[3]][1]}</button>`):""}<div class="dgprog mono" id="dgProg"></div>`; }
/* ---------- la réparation manuelle : on croit que ça marche ---------- */
const DG_ACT={vider:[1,"Vider le cache","Vidage du cache… 1 284 entrées"],recharger:[2,"Recharger le modèle","Rechargement du modèle de goûts…"],boucle:[3,"Passer boucle_reco sur ACTIVE","Déblocage de la boucle…"]};
const DG_STEPS=["Vide le cache des recommandations : <b>cache/</b> → recos_tmp.json.","Recharge le modèle de goûts. Il est rangé avec les autres modèles.","Débloque la boucle de recommandation, dans la configuration du noyau."];
function dgActNow(f){ const k=f[3]; if(!k) return false;
  if(k==="calibrer") return S.ac.pn===2&&!S.ac.cal&&!S.ac.live; if(k==="ordre") return S.ac.pn===3&&!S.ac.clk&&!S.ac.live;
  const a=DG_ACT[k]; return a&&S.ac.rep===a[0]; }
const PANNES={
  2:["PANNE 2 · LES SCORES","Les scores de MIRE partent dans tous les sens. Quelqu'un a touché aux poids du modèle de goûts.",["Trouve les valeurs d'usine du modèle.","Recalibre le modèle de goûts avec ces valeurs."]],
  3:["PANNE 3 · L'HORLOGE","L'horloge de MIRE est bloquée sur le 11/03/2026 à 03:12. Elle ne sait plus dans quel ordre les choses arrivent.",["Remets sa séquence de démarrage dans l'ordre (dans les logs)."]],
  4:["PANNE 4 · UNE RÈGLE EN TROP","Au démarrage, MIRE charge 4 règles au lieu de 3.",["Trouve la règle en trop et supprime-la."]]
};
function dgGuide(){ const r=S.ac.rep, pn=S.ac.pn||1;
  if(r>=1&&r<=4) return `<div class="dgguide"><b class="mono">PANNE 1 · LA BOUCLE VIDE</b>${DG_STEPS.map((t,i)=>`<div class="dgst${r>i+1?" ok":r===i+1?" cur":""}"><span class="mono">${r>i+1?"✓":i+1}</span><p>${t}</p></div>`).join("")}${r===4?`<button class="acsafe-go dgreboot" data-dgreboot="1">Redémarrer MIRE</button>`:""}</div>`;
  if(r<5||S.ac.live||!PANNES[pn]) return "";
  const [h,d,st]=PANNES[pn]; const done=pn===2?(S.ac.cal?2:S.ac.usine?1:0):pn===3?(S.ac.clk?1:0):0;
  let extra="";
  if(pn===4&&S.ac.del===1) extra=`<div class="dgst ok"><span class="mono">✓</span><p>regles/.externe/ supprimé.</p></div>`;
  if(pn===4&&S.ac.del===2) extra=`<div class="dgst cur red2"><span class="mono">!</span><p>regles/.externe/ est revenu tout seul, 3 secondes plus tard. Restauré par : <b>maint_0312</b> (tâche inconnue). Ouvre-le.</p></div>`;
  return `<div class="dgguide${pn===4&&S.ac.del===2?" red":""}"><b class="mono">${h}</b><p class="dgdesc">${d}</p>${st.map((t,i)=>`<div class="dgst${done>i||(pn===4&&S.ac.del)?" ok":i===done?" cur":""}"><span class="mono">${done>i||(pn===4&&S.ac.del)?"✓":i+1}</span><p>${t}</p></div>`).join("")}${extra}</div>`;
}
function dgAsk(){
  $("dgBody").innerHTML=`<div class="dgask"><div class="mono dgask-k">RÉPARATION AUTOMATIQUE · ÉCHEC</div><p>MIRE n'arrive pas à se réparer toute seule.</p><p class="dgask-q">Voulez-vous intervenir dans la réparation ?</p>
    <button class="acsafe-go" data-dgask="oui">Oui, je m'en occupe</button><button class="acsafe-alt" data-dgask="non">Non</button></div>`; laBeat();
}
function dgDoAct(k){ const a=DG_ACT[k]; if(!a||S.ac.rep!==a[0]) return; const P=$("dgProg"); const B=document.querySelector("[data-dgact]"); if(B) B.disabled=true;
  if(P) P.innerHTML=`<span>${a[2]}</span><i><b></b></i>`; laClunk();
  acT(()=>{ if(!DG) return; S.ac.rep=a[0]+1; save(); laChime(); try{navigator.vibrate&&navigator.vibrate(30);}catch(e){} dgExplorer(); const p=$("dgProg"); if(p) p.innerHTML=`<span class="ok">✓ ${S.ac.rep===4?"Tout est prêt. Redémarre MIRE.":"Fait. Étape suivante."}</span>`; },1500);
}
function dgBootSeq(L,after){
  $("dgBody").innerHTML=`<div class="dgrun mono" id="dgRun"></div><div class="dgbar"><i id="dgBar"></i></div>`;
  let i=0; const step=()=>{ if(!DG) return; const r=$("dgRun"); if(!r) return;
    if(i>=L.length) return after(r);
    const [a,b]=L[i]; const ko=/ÉCHEC|ATTENDUES|INCONNU/.test(b); r.insertAdjacentHTML("beforeend",`<div><span>${a}</span><b class="${ko?"ko":"ok"}">[ ${b} ]</b></div>`); $("dgBar").style.width=((i+1)/L.length*100)+"%"; ko?laBeat():laClunk(); i++; acT(step,520); };
  acT(step,300);
}
function dgFixedMsg(r,next){ laSweep(); r.insertAdjacentHTML("beforeend",`<div class="dgfixed">MIRE RÉPARÉE ✓<small>Merci pour ton intervention.</small></div>`); acT(()=>dgFixed(next),2200); }
function dgReboot(){
  S.ac.rep=4; laMood("calm");
  dgBootSeq([["Arrêt de MIRE","OK"],["Cache des recommandations","VIDE"],["Modèle de goûts v12","RECHARGÉ"],["Boucle de recommandation","ACTIVE"],["Test : 20 recommandations générées","OK"],["MIRE","EN LIGNE"]],r=>{ S.ac.rep=5; save(); dgFixedMsg(r,2); });
}
function dgFixed(next){
  // on revient dans Zap : tout a l'air de remarcher… pendant quelques secondes
  S.ac.pn=next; S.ac.live=1; save(); dgClose(); laMood("none"); try{ showTab("now"); showView("sugg"); }catch(e){} renderAll();
  toast("MIRE est de retour. Bonne séance !",2600);
  acT(()=>{ const L=$("list"); L&&L.scrollIntoView({behavior:"smooth",block:"start"}); },700);
  acT(()=>acRelapse(next),6500);
}
function acAlertPanne(t,p,code){
  laStatic(.35); document.body.classList.add("acflash");
  acT(()=>{ laStatic(0); document.body.classList.remove("acflash"); const C=$("acCrash"); C.hidden=false; C.className="accrash detect"; document.body.classList.add("noscroll");
    $("acStage").innerHTML=`<div class="acalert"><b>${t}</b><p>${p}</p><p class="mono">${code}</p><button id="acReDiag">Rouvrir le diagnostic</button></div>`;
    $("acReDiag").onclick=()=>{ acSafeOff(); acDiag(); }; },900);
}
function acRelapse(pn){
  if(!S.ac.live||S.ac.pn!==pn) return; const cards=[...document.querySelectorAll("#list .card:not(.accard)")];
  laStatic(.12);
  if(pn===2){ const V=["412","-38","9 999","NaN","-0","170","∞"]; $("tip").textContent="Les scores n'ont plus aucun sens.";
    cards.forEach((c,i)=>acT(()=>{ const m=c.querySelector(".match .mono"); if(m) m.textContent=`${V[i%V.length]}% pour toi`; const b=c.querySelector(".bar i"); if(b){ b.style.width=(i%2?3:100)+"%"; b.style.background="var(--bad)"; } laClunk(); },300+i*420));
    acT(()=>{ S.ac.live=0; save(); acAlertPanne("MIRE calcule n'importe quoi","Les scores de recommandation sont devenus incohérents : 412 %, -38 %, 9 999 %…","Erreur 0417-B · modèle de goûts déréglé"); },900+cards.length*420); }
  if(pn===3){ $("tip").textContent="Il est 03:12. Il est 03:12. Il est 03:12."; $("resTitle").textContent="Programme du 11/03/2026 · 03:12";
    cards.forEach((c,i)=>acT(()=>{ const w=c.querySelector(".why"); if(w) w.insertAdjacentHTML("afterbegin",`<span class="neg">proposé le 11/03/2026 à 03:12</span>`); laClunk(); },300+i*420));
    acT(()=>{ S.ac.live=0; save(); acAlertPanne("L'horloge de MIRE est bloquée","MIRE croit qu'on est le 11 mars 2026, à 03:12. Elle ne sait plus dans quel ordre les choses arrivent.","Erreur 0417-C · horloge"); },900+cards.length*420); }
}
/* ---------- panne 2 : le calibrage ---------- */
let CAL=null;
function dgCalHtml(){ if(!CAL) CAL={genres:.9,ambiance:0,duree:0,refus:1};
  const test=Math.round(CAL.genres*120+CAL.ambiance*90+CAL.duree*60+CAL.refus*310-40);
  return `<div class="dgcal">${Object.keys(CAL).map(k=>`<label class="mono"><span>${k}</span><input type="range" min="0" max="1" step="0.1" value="${CAL[k]}" data-cal="${k}"><b id="cv_${k}">${CAL[k].toFixed(1)}</b></label>`).join("")}
    <div class="mono dgcaltest" id="calTest">test · score de « Frieren » : ${test} %</div><button class="dgact" data-dgcal="1">Appliquer</button></div>`; }
function dgCalUpd(){ const t=$("calTest"); if(!t) return; const test=Math.round(CAL.genres*120+CAL.ambiance*90+CAL.duree*60+CAL.refus*310-40); t.textContent=`test · score de « Frieren » : ${test} %`; t.classList.toggle("ok",test>=0&&test<=100); }
function dgCalApply(){
  const ok=Math.abs(CAL.genres-.5)<.01&&Math.abs(CAL.ambiance-.3)<.01&&Math.abs(CAL.duree-.2)<.01&&CAL.refus<.01;
  const P=$("dgProg");
  if(!ok){ laBeat(); if(P) P.innerHTML=`<span class="ko">✗ Scores toujours incohérents.${Math.abs(CAL.genres-.5)<.01&&Math.abs(CAL.ambiance-.3)<.01&&Math.abs(CAL.duree-.2)<.01?" Il reste un poids qui ne devrait pas être là.":""}</span>`; return; }
  S.ac.cal=1; save(); laChime(); CAL=null;
  dgBootSeq([["Modèle de goûts v12","RECALIBRÉ"],["Test : 20 scores entre 0 et 100 %","OK"],["Poids « refus »","0.0 (absent des valeurs d'usine)"],["MIRE","EN LIGNE"]],r=>dgFixedMsg(r,3));
}
/* ---------- panne 3 : remettre le démarrage dans l'ordre ---------- */
const ORD=["alimentation : MIRE se réveille","lecture de la configuration du noyau","chargement du modèle de goûts","chargement des règles","calcul des premières recommandations","envoi des recommandations aux abonnés"];
const ORD_X="tâche maint_0312 : réinstallation";
let OSEL=[], OMIX=null;
function dgOrdHtml(){ if(!OMIX){ OMIX=[...ORD,ORD_X].map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]); OSEL=[]; }
  return `<div class="dgord"><p class="dgdesc">Touche les lignes dans l'ordre où elles se passent au démarrage.</p>
    <ol class="mono">${OSEL.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
    <div class="dgordb">${OMIX.filter(x=>!OSEL.includes(x)).map(x=>`<button class="dgordl mono" data-dgord="${esc(x)}">${esc(x)}</button>`).join("")}</div>
    <button class="linkbtn" data-dgordz="1">Recommencer l'ordre</button></div>`; }
function dgOrdPick(x){
  const P=$("dgProg");
  if(x===ORD_X){ laBeat(); if(P) P.innerHTML=`<span class="ko">Cette ligne n'a pas d'heure de démarrage. Elle ne fait partie d'aucune séquence.</span>`; return; }
  if(ORD[OSEL.length]!==x){ laBeat(); OSEL=[]; dgExplorer(); const p=$("dgProg"); if(p) p.innerHTML=`<span class="ko">✗ Impossible : « ${esc(x)} » ne peut pas arriver à ce moment-là.</span>`; return; }
  OSEL.push(x); laClunk();
  if(OSEL.length===ORD.length){ S.ac.clk=1; save(); laChime(); OMIX=null;
    dgBootSeq([["Horloge resynchronisée",NOW_D()],["Séquence de démarrage","OK"],["Chargement des règles","4 / 3 ATTENDUES"],["Élément inconnu","regles/ · INCONNU"]],r=>{ S.ac.pn=4; save(); acT(()=>{ if(DG){ DG.path="/"; DG.file=null; dgExplorer(); } },1800); });
    return; }
  dgExplorer();
}
/* ---------- panne 4 : la règle qui revient ---------- */
function dgDel(){
  const P=$("dgProg"); laClunk(); S.ac.del=1; save(); DG.path="/regles"; DG.file=null; dgExplorer();
  acT(()=>{ S.ac.del=2; save(); laBeat(); try{navigator.vibrate&&navigator.vibrate([60,40,60]);}catch(e){} if(DG) dgExplorer(); },3200);
}
function dgHot(){
  // le dossier qu'on cherchait
  S.ac.f0417=1; save(); laSweep(); try{navigator.vibrate&&navigator.vibrate([40,60,160]);}catch(e){}
  $("dgBody").innerHTML=`<div class="dghot"><div class="mono dghot1">regles/.externe/0417/</div><div class="mono dghot2">417 titres retirés · propriétaire : partenaire « LD »</div>
    <p class="dghot3">Ce n'est pas un bug. Quelqu'un a caché ça dans MIRE.</p><div class="mono dghot2">417 références vers la mémoire de MIRE · ouverture de mire-index…</div><p class="dghot4 mono">Et quelqu'un d'autre est déjà venu ici avant toi.</p></div>`;
  acT(()=>{ if(!DG) return; dgClose(); acActCard("FIN DE L'ACTE I","L'ANOMALIE","ACTE II","LE DOSSIER",acOpen); },5200);
}
$("dgOv").addEventListener("click",e=>{
  e.stopPropagation(); const b=e.target.closest("button"); if(!b||!DG) return; const D=b.dataset;
  if(D.dg==="close") return dgClose();
  if(D.dgask){ S.ac.rep=D.dgask==="oui"?1:-1; save(); laChime(); return dgExplorer(); }
  if(D.dgact) return dgDoAct(D.dgact);
  if(D.dgreboot) return dgReboot();
  if(D.dgcal) return dgCalApply();
  if(D.dgord) return dgOrdPick(D.dgord);
  if(D.dgordz){ OSEL=[]; return dgExplorer(); }
  if(D.dgdel) return dgDel();
  if(D.dghid){ DG.hid=DG.hid?0:1; laClunk(); return dgExplorer(); }
  if(D.dgup!==undefined){ const parts=DG.path==="/"?[]:DG.path.slice(1).split("/"); const k=+D.dgup; DG.path=k<=0?"/":"/"+parts.slice(0,k).join("/"); DG.file=null; return dgExplorer(); }
  if(D.dgcd){ const n=FS[D.dgcd]; if(n&&n.hot) return dgHot(); DG.path=D.dgcd; DG.file=null; laClunk(); return dgExplorer(); }
  if(D.dgf!==undefined){ DG.file=FS[DG.path].f[+D.dgf]; if(DG.file[0]==="usine.cfg"&&S.ac.pn===2&&!S.ac.usine){ S.ac.usine=1; save(); laChime(); } dgExplorer(); $("dgView").scrollIntoView({behavior:"smooth",block:"nearest"}); return; }
});
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&DG) dgClose(); });

$("dgOv").addEventListener("input",e=>{ const k=e.target.dataset&&e.target.dataset.cal; if(!k||!CAL) return; CAL[k]=+e.target.value; const v=$("cv_"+k); if(v) v.textContent=CAL[k].toFixed(1); dgCalUpd(); });
// écran de titre entre deux actes
function acActCard(a,b,c,d,then){
  const C=$("acCrash"); C.hidden=false; C.className="accrash black"; document.body.classList.add("noscroll"); laSweep();
  $("acStage").innerHTML=`<div class="actcard"><div class="mono actk">${a}</div><b>${b}</b></div>`;
  acT(()=>{ $("acStage").innerHTML=`<div class="actcard"><div class="mono actk">${c}</div><b>${d}</b></div>`; laBeat(); },2800);
  acT(()=>{ C.hidden=true; C.className="accrash"; $("acStage").innerHTML=""; document.body.classList.remove("noscroll"); then&&then(); },5400);
}
