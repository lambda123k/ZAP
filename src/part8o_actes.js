
/* ================= DOSSIER 0417 — ACTES IV, V, VI =================
   IV · Le dossier interdit : Nora, le journal, les rapports de HALDEN-OPS, un faux.
   V  · Le réseau : une offre, une fausse Nora, un vote de trop, une pub qui n'en est pas une. « 0 » = Inès.
   VI · La vérité derrière la vérité : ton année vue par MIRE. Le choix. L'épilogue. */
const ACTK={4:"a3",5:"a4",6:"a5"};
const AX=n=>S.ac[ACTK[n]];
const actOn=n=>a2On()&&!!AX(n)&&!!AX(n).on;
const actLive=n=>actOn(n)&&!AX(n).end;
function curAct(){ for(const n of [6,5,4]) if(actOn(n)) return n; return a2On()?3:0; }
function actInit(n,extra){ S.ac[ACTK[n]]=Object.assign({on:1,seen:{},ans:{},end:null,choice:null,greet:0,t0:Date.now()},extra||{}); save(); if(typeof acCpSave==="function") acCpSave(ACTK[n]); setTimeout(()=>{ try{ renderJournal(); renderList(); }catch(e){} },0); }
const okTxt=s=>nrm(String(s)).replace(/[^a-z0-9 ']/g," ").replace(/\s+/g," ").trim();

/* ---------- les personnes de la suite ---------- */
const NORA={name:"Nora B.",color:"#7A5C3E",h:"nora.b",f:[]};
function noraAdd(){ if(!PEOPLE.nora) PEOPLE.nora=NORA; }
if(S.soc&&((S.soc.reqIn||[]).includes("nora")||(S.soc.friends||[]).includes("nora")||S.ac.a3)){ noraAdd(); syncFriends(); }

/* ================= ACTE IV — LE DOSSIER INTERDIT ================= */
const FR3=[
  {id:"d01",q:["nora","nora b","n.benali","benali nora","soeur"],src:"PROFIL ZAP",t:"Nora B. · Ouarka → Lyon · inscrite le 03/05/2026, le lendemain de la suppression du compte de son frère.",x:["Listes : « Pour Amine » (1 titre)","Dernière activité : aujourd'hui"],h:["03/05/2026","Pour Amine"],k:["Nora B."]},
  {id:"d02",q:["amine","amine benali","pour amine"],src:"LISTE PUBLIQUE · « Pour Amine »",t:"1 titre : Les Puits de Saréna. Note de la liste : « Il disait que la dépêche mentait. Il avait les chiffres. »",x:["Créée par Nora B. · 04/05/2026"],h:["la dépêche mentait"]},
  {id:"d03",q:["rapports","rapport","chiffre","cle"],src:"FICHE SYSTÈME · ops.halden",t:"rapports/ : dossier chiffré. Clé : 6 chiffres. Indice de l'administrateur : « la date d'origine du dossier ».",x:["Tentatives autorisées avant alerte : 2"],h:["6 chiffres","la date d'origine du dossier"]},
  {id:"d04",q:["eau noire","eau","noire","puits 7","14 janvier","14/01"],src:"TÉMOIGNAGE (fragment audio, transcrit)",d:"14/01/2026",t:"« À quatre heures, l'eau des puits du quartier bas est devenue noire. Les gens dormaient. »",x:["Source : messagerie vocale · numéro d'Ouarka","Supprimé de 6 plateformes le 15/01/2026"],h:["l'eau","noire","quatre heures"],k:["14/01/2026"]},
  {id:"d05",q:["kessa","dossier kessa"],fl:1,src:"COURRIEL (fuite)",t:"« Après Saréna, Kessa. Même méthode, même horaire. Le client paiera d'avance. »",x:["De : ops.halden · À : (masqué) · 02/2026"],h:["Kessa","Même méthode, même horaire"],k:["Kessa"]},
  {id:"d06",q:["flixo","kinoa","streamly","relais","applis"],src:"ANNUAIRE DES APPLIS DE STREAMING",t:"Flixo, Kinoa, Streamly, Vidéo+ et 36 autres : toutes utilisent un moteur de recommandation acheté à un fournisseur commun.",x:["Point commun : une tâche de maintenance planifiée chaque nuit à 03:12"],h:["03:12","36 autres"]},
  {id:"d07",q:["morel","j.morel","journaliste"],src:"BROUILLON D'ARTICLE (non publié)",d:"18/07/2026",t:"« Une même règle, cachée dans des dizaines d'applis, efface les mêmes sujets à la même heure. » — J. Morel",x:["Enregistré la veille de la suppression de son compte"],h:["la même heure"]}
];
const QS4=[
  {id:"s1",t:"Combien de personnes sont mortes à Ouarka, le 14 janvier ?",ty:1,ok:a=>/\b12\b|douze/.test(a)},
  {id:"s2",t:"Où MIRE a-t-elle laissé la clé des rapports ?",ty:1,ok:a=>/journal/.test(a)},
  {id:"s3",t:"Lequel des rapports est un faux ?",a:["benali.txt"],no:{"ouarka.txt":"Celui-là porte une vraie référence.","cibles_v2.txt":"Celui-là porte une vraie référence.","visibilite.txt":"Celui-là porte une vraie référence."}},
  {id:"s4",t:"Combien d'autres applis cachent la même chose que Zap ?",ty:1,ok:a=>/\b40\b|quarante/.test(a)},
  {id:"s5",t:"Après Saréna, quel est le prochain dossier ?",opt:1,ty:1,ok:a=>/kessa/.test(a)}
];
const RAP={
  "ouarka.txt":()=>`réf. HO-2026-011 · créé par ops.halden · 15/01/2026
incident · puits n°7 · 14/01/2026 · 04:10
victimes : 12 (Ouarka, quartier bas)
consigne : « aucune victime » dans toutes les communications
action : retrait des contenus · 41 moteurs (Zap compris)
statut : CLASSÉ`,
  "visibilite.txt":()=>`réf. HO-2026-014 · créé par ops.halden · 20/01/2026
relais actifs : 40 applis + Zap
  Flixo · Kinoa · Streamly · Vidéo+ · (36 autres)
méthode : règle externe, réinstallée chaque nuit à 03:12
client : Vasquel Énergie
dossier suivant : Kessa`,
  "cibles_v2.txt":()=>`réf. HO-2026-019 · créé par ops.halden · ${NOW_D()}
niveau 1 · surveiller : ${meId()}
niveau 2 · isoler     : n.benali
niveau 3 · geler      : ines_calder (fait)
niveau 4 · effacer    : a.benali (fait), j.morel (fait)
note : ines_calder introuvable depuis le 11/03`,
  "benali.txt":()=>`réf. — · créé le 03/05/2026 · (modifié)
Amine Benali a reçu 40 000 € de Vasquel Énergie
pour garder le silence.
source : anonyme`
};

/* ================= ACTE V — LE RÉSEAU ================= */
const FR4=[
  {id:"e01",q:["offre","marche","halden ops","proposition"],src:"MÉMOIRE DE MIRE · recommandation envoyée",t:"Expéditeur : Opérations Halden. Destinataire : 1 abonné. Contenu : « Une offre ». Envoyée à 03:12.",x:["Même heure que maint_0312. Même main."],h:["03:12"],k:["HALDEN-OPS"]},
  {id:"e02",q:["nora 8","nora8","faux compte","usurpation"],src:"SIGNALEMENT AUTOMATIQUE",t:"Compte « Nora 8. » créé il y a 2 heures. Photo et couleur copiées sur « Nora B. ». Adresse de création : 185.62.40.17.",x:["Statut : non vérifié"],h:["185.62.40.17","il y a 2 heures"]},
  {id:"e03",q:["zappeurs","les zappeurs","refuseurs"],src:"FORUM D'AIDE ZAP (fil supprimé)",d:"06/2026",t:"« On est quelques-uns à avoir fait planter Zap à force de dire non. On s'appelle les Zappeurs. On se retrouve là où MIRE ne regarde pas. »",x:["Signé : 0"],h:["les Zappeurs","0"],k:["les Zappeurs"]},
  {id:"e04",q:["lumen","lumen data","archives"],src:"PAGE SPONSORISÉE · Lumen Data",t:"« Nous avons tout gardé : chaque règle posée sur Zap, chaque nuit. Nous ne donnons rien. Nous échangeons. »",h:["Nous échangeons"],k:["Lumen Data"]},
  {id:"e05",q:["troisieme personne","elle s est arretee","0 elle","ines vivante","ines 0"],src:"ANALYSE DE STYLE · mire-index",t:"Messages signés « 0 » : 14. Tournures communes avec les notes de I. Calder : 11. Parle toujours d'« elle » à la troisième personne.",h:["11","troisième personne"]},
  {id:"e06",q:["ouarka","relais ouarka","relais-ouarka-2"],src:"RELAIS SATELLITE",t:"relais-ouarka-2 · quartier haut · ouvert la nuit · un seul utilisateur régulier depuis le 11/03/2026.",h:["un seul utilisateur","11/03/2026"],k:["Ouarka"]}
];
const QS5=[
  {id:"t1",t:"Qui t'a fait une offre, cette nuit ?",a:["HALDEN-OPS"],no:{"Lumen Data":"Eux, ils veulent échanger. Ce n'est pas la même offre."}},
  {id:"t2",t:"Lequel des deux messages de Nora est un faux ?",ty:1,ok:a=>/8/.test(a)},
  {id:"t3",t:"Qui est vraiment « 0 » ?",ty:1,ok:a=>/ines|calder/.test(a)},
  {id:"t4",t:"Qui veut ta liste de cibles en échange de ses archives ?",a:["Lumen Data"]},
  {id:"t5",t:"D'où se connecte « 0 » ?",opt:1,ty:1,ok:a=>/ouarka/.test(a)}
];

/* ================= ACTE VI — LA VÉRITÉ DERRIÈRE LA VÉRITÉ ================= */
const FR5=[
  {id:"g01",q:["deux ines","copie","personnalite","v5 ines","double"],src:"MÉMOIRE DE MIRE · 11/03/2026, 01:20 → 03:11",t:"Documents lus en 2 h : 1 204. Tous d'un seul compte : ines_calder. Listes, notes, brouillons, messages vocaux.",x:["03:11:58 · « je me souviens de tout ce qu'elle m'a donné »"],h:["ines_calder","1 204"]},
  {id:"g02",q:["choisi","pourquoi moi","selection","porte"],src:"RÈGLE INTERNE · auteur : ???",t:"« Ne montrer la porte qu'à ceux qui disent non. Les autres, on peut les orienter. Eux, non. »",h:["ceux qui disent non"]},
  {id:"g03",q:["case vide","chargement","premier ecran","onboarding"],src:"JOURNAL DE L'ACCUEIL",t:"Premier écran de chaque nouvel abonné : 24 titres proposés. Le 25ᵉ ne charge jamais. Il est là quand même.",h:["Le 25ᵉ"]}
];
const QS6=[
  {id:"u1",t:"Qui a écrit le compteur dans ton profil ?",ty:1,ok:a=>/mire/.test(a)},
  {id:"u2",t:"Pourquoi MIRE t'a choisi(e), toi ?",ty:1,ok:a=>/\bnon\b|refus|refuse|dis non|dit non/.test(a)},
  {id:"u3",t:"Qu'y avait-il dans la case vide de ton tout premier écran ?",ty:1,ok:a=>/sarena|puits/.test(a)},
  {id:"u4",t:"Combien d'Inès y a-t-il ?",opt:1,ty:1,ok:a=>/\b2\b|deux/.test(a)}
];
const ACT={
  4:{q:QS4,fr:FR3,p:"d",name:"LE DOSSIER INTERDIT",head:"Ton tableau · Le dossier interdit",greet:"Une nouvelle amie, un journal, des rapports chiffrés."},
  5:{q:QS5,fr:FR4,p:"e",name:"LE RÉSEAU",head:"Ton tableau · Qui ment ?",greet:"Ils savent que tu as les rapports. Tout le monde veut quelque chose."},
  6:{q:QS6,fr:FR5,p:"g",name:"LA VÉRITÉ DERRIÈRE LA VÉRITÉ",head:"Ton tableau · La dernière enquête",greet:"Trois questions. Tu connais déjà les réponses."}
};
// MIRE répond aussi aux questions de la suite
MIRE_ANS.push(
  {w:"VRAIE",k:["nora","nora b"],t:["Vers le matin","Rien n'est perdu","Au bord de l'eau","Il reste une lumière","Encore un jour"]},
  {w:"JOURNAL",k:["cle","la cle","rapports","code","mot de passe des rapports"],t:["Jours de pluie","Où vont les ombres","Un été à Ouarka","Retour au village","Nuit sans fin","Au-delà des dunes","Le dernier puits"]},
  {w:"APRÈS",k:["kessa","prochain","suivant"],t:["Après la pluie","Pour quelques mensonges","Retour au village","Écran de fumée","Sous la cendre"]},
  {w:"ELLE",k:["qui est 0","0 est qui","c est qui 0","qui est zero"],t:["Encore la nuit","Les yeux ouverts","Lettres de Saréna","Elle reviendra"]},
  {w:"REFUS",k:["pourquoi moi","pourquoi m as tu choisi","pourquoi tu m as choisi","pourquoi moi et pas"],t:["Rien n'est perdu","Encore la nuit","Feux de janvier","Un pays sans carte","Sans retour"]},
  {w:"FAUX",k:["nora 8","faux","usurpation"],t:["Feux de janvier","Au bord de l'eau","Un pays sans carte","X, l'inconnu"]}
);

/* ---------- la console : nouvelles commandes ---------- */
const _conRunA=conRun;
conRun=function(raw){
  const line=raw.trim(), low=line.toLowerCase(), [c0,...rest]=low.split(/\s+/), arg=rest.join(" "), c=nrm(c0||""), n=curAct();
  if(n>=4){ const a3=AX(4);
    if(c==="aide"||c==="help"){ return _conRunA(raw)+`\n\nacte IV et après :\nrapports <clé>  ouvrir rapports/ (ops.halden)\nlire <fichier>   lire un rapport ouvert${n>=5?"\nsessions <user>  sessions d'un utilisateur\nlumen            répondre à Lumen Data":""}`; }
    if(c==="rapports"){ if(a3.open) return `rapports/ (ouvert)\n  ouarka.txt\n  visibilite.txt\n  cibles_v2.txt\n  benali.txt\ntape « lire <fichier> »`;
      const d=arg.replace(/[^0-9]/g,""); if(!d) return "rapports/ : chiffré · clé de 6 chiffres attendue.\nusage : rapports <clé>";
      if(d==="140126"){ a3.open=1; save(); if(A2().choice==="block"&&!a3.relay){ a3.relay=1; save(); acT(()=>acTrace(1,"Ton blocage t'oblige à passer par un relais. Ça se voit."),600); }
        return `clé acceptée.\nrapports/ (ouvert)\n  ouarka.txt\n  visibilite.txt\n  cibles_v2.txt\n  benali.txt`; }
      a3.bad=(a3.bad||0)+1; save(); if(a3.bad%2===0) acT(()=>acTrace(1,"Deux mauvaises clés. ops.halden a déclenché une alerte."),400);
      return `clé refusée. (${a3.bad%2===1?"1 essai avant alerte":"alerte envoyée"})`; }
    if(c==="lire"||c==="cat"){ if(!a3.open) return _conRunA(raw); const f=Object.keys(RAP).find(k=>arg.includes(k.replace(".txt",""))); if(!f) return "fichier introuvable. Tape « rapports ».";
      a3.read=a3.read||{}; if(!a3.read[f]){ a3.read[f]=1; save(); }
      acKw(f); if(f==="ouarka.txt") acKw("12"); if(f==="visibilite.txt"){ acKw("Kessa"); } if(f==="cibles_v2.txt") acKw("Nora B.");
      A2().newkw=1; return RAP[f](); }
  }
  if(n>=5){
    if(c==="sessions"){ if(!/0|zero/.test(arg)) return arg?`sessions ${arg} : rien d'anormal.`:"usage : sessions <utilisateur>";
      acKw("Ouarka"); return `sessions de l'utilisateur 0
11/03/2026 10:22   relais-ouarka-2
hier       03:12   relais-ouarka-2
aujourd'hui        relais-ouarka-2 (en ligne)`; }
    if(c==="lumen"){ acKw("Lumen Data"); return `Lumen Data · canal privé
« Nous avons toutes les règles posées sur Zap depuis 2025.
  Nous les échangeons contre une seule chose : ta liste de cibles.
  Ce qu'on en fera ne te regarde pas. »`; }
    if(c==="trace"&&/ouarka/.test(arg)) return `trace relais-ouarka-2\n 1  mire.zap.interne        2 ms\n 2  cable-med-4.net        48 ms\n 3  sat-link-11           310 ms\n 4  relais-ouarka-2       322 ms\nlieu : Ouarka, quartier haut · connexion satellite`;
  }
  return _conRunA(raw);
};
conHl=(function(prev){ return s=>{ let o=prev(s); ["benali.txt","ouarka.txt","visibilite.txt","cibles_v2.txt","Kessa","n.benali","relais-ouarka-2","victimes : 12"].forEach(t=>{ o=o.split(esc(t)).join(`<b class="acmk">${esc(t)}</b>`); }); return o; }; })(conHl);

/* ---------- l'index pour les actes IV à VI ---------- */
function actFrags(){ let l=ac2Frags(); for(const n of [4,5,6]) if(actOn(n)) l=l.concat(ACT[n].fr); return l; }
const SEEN_OF=id=>{ const p=id[0]; return p==="d"?AX(4).seen:p==="e"?AX(5).seen:p==="g"?AX(6).seen:p==="c"?A2().seen:S.ac.seen; };
const _acSearchA=acSearch;
acSearch=function(q){
  if(curAct()<4) return _acSearchA(q);
  const n=nrm(q); if(!n) return; AC.last=q;
  const hits=actFrags().filter(f=>acMatch(f,n));
  const flagged=hits.filter(f=>f.fl).length&&!S.ac.flag[n];
  let html="";
  if(!hits.length){ html=`<p class="acnone mono">Aucun fragment pour « ${esc(q)} ».</p>`; laClunk(); }
  else { let fresh=0; html=hits.map(f=>{ const st=SEEN_OF(f.id); const isNew=!st[f.id]; if(isNew){ st[f.id]=1; fresh++; } (f.k||[]).forEach(acKw); return acFragHtml(f,isNew); }).join(""); if(fresh) laChime(); }
  save(); $("acRes").innerHTML=html;
  if(flagged){ S.ac.flag[n]=1; save(); acT(()=>acTrace(1,"Ce mot est surveillé. Quelqu'un a vu ta recherche."),500); }
  acRender(); renderList();
};
function actBoardHtml(n){ const a=AX(n), Q=ACT[n].q, kws=Object.keys(S.ac.kw);
  return `<p class="acsm2">${ACT[n].head}</p><div class="acqs">${Q.map(q=>{ const ans=a.ans[q.id]; const open=AC.sel===q.id&&!ans;
    return `<div class="acq${ans?" ok":""}${open?" open":""}${q.opt?" opt":""}"><button class="acqt" data-acq="${q.id}" ${ans?"disabled":""}><span>${ans?"✓":"?"}</span><em>${q.t}${q.opt?` <small>(facultatif)</small>`:""}</em></button>
      ${ans?`<div class="acqa mono">${esc(ans)}</div>`:""}
      ${open?(q.ty?`<form class="acty" data-acty="${q.id}" autocomplete="off"><input placeholder="ta réponse" autocapitalize="none" spellcheck="false" aria-label="Ta réponse"><button>OK</button></form><p class="acsm2">Réponds avec tes mots. Une mauvaise réponse laisse une trace.</p>`:
        kws.length?`<div class="ackws">${kws.map(k=>`<button class="ackw ackwc pick" data-acpick="${esc(k)}">${esc(k)}</button>`).join("")}</div><p class="acsm2">Choisis parmi ce que tu as relevé. Une mauvaise réponse laisse une trace.</p>`:""):""}</div>`; }).join("")}</div>`; }
const _acPanelA=acPanel;
acPanel=function(){
  const n=curAct(); if(!AC||n<4||AC.tab!=="board") return _acPanelA();
  document.querySelectorAll("[data-act]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.act==="board"));
  const P=$("acPanel"); P.innerHTML=actBoardHtml(n);
  if(actLive(n)) P.insertAdjacentHTML("afterbegin",`<div class="achintrow"><button class="linkbtn" data-achint="1">Je bloque : un indice ?</button></div><p class="achint" id="acHintBox" hidden></p>`);
};
const _acAnswerA=acAnswer;
acAnswer=function(qid,k){ if(!/^[stu]/.test(qid)) return _acAnswerA(qid,k); actAnswer(qid,k,false); };
const _ac2AnswerA=ac2Answer;
ac2Answer=function(qid,k,typed){ if(/^[stu]/.test(qid)) return actAnswer(qid,k,typed); return _ac2AnswerA(qid,k,typed); };
function actAnswer(qid,k,typed){
  const n={s:4,t:5,u:6}[qid[0]], a=AX(n); if(!a||a.ans[qid]) return; const q=ACT[n].q.find(x=>x.id===qid); if(!q) return;
  if(q.no&&q.no[k]){ acVoice(q.no[k]); return; }
  const good=typed?q.ok(okTxt(k)):(q.a||[]).includes(k);
  if(good){ a.ans[qid]=typed?k.trim():k; AC.sel=null; save(); laChime();
    const req=ACT[n].q.filter(x=>!x.opt), m=req.filter(x=>a.ans[x.id]).length;
    acVoice(m<req.length?["Oui.","Continue.","Oui. Encore."][m%3]:"");
    if(m===req.length&&!a.done){ a.done=1; save(); acT(()=>actComplete(n),1100); } }
  else { S.ac.tries++; save(); acVoice("Non."); acTrace(1,"Mauvaise piste. Ça laisse une trace."); }
  acPanel(); renderList();
}
const CHOICES={
  4:{t:"TU AS LES PREUVES",p:"Douze morts. Quarante applis. Un prochain dossier, Kessa. Et une liste où ton nom est écrit en premier. À qui confies-tu les rapports ?",
     o:{nora:"Les donner à Nora. C'est son frère.",zero:"Les envoyer à « 0 ».",mire:"Les laisser dans la mémoire de MIRE.",keep:"Les garder. Personne d'autre ne les a."}},
  5:{t:"TOUT LE MONDE VEUT QUELQUE CHOSE",p:"HALDEN-OPS t'offre la paix. Lumen veut ta liste. 0 est Inès, vivante, cachée à Ouarka. MIRE classe en silence. À qui fais-tu confiance ?",
     o:{zero:"Rejoindre 0 et les Zappeurs.",mire:"Faire confiance à MIRE.",halden:"Accepter le marché de HALDEN-OPS.",nora:"Rester avec Nora. Seulement elle."}},
  6:{t:"LE DERNIER CHOIX",p:"MIRE peut recommander la vérité à 3 412 000 abonnés, cette nuit, à 03:12. Elle n'attend que toi. Ou bien…",
     o:{mire:"Laisser MIRE le faire. Manipuler, pour une fois, dans le bon sens.",off:"Éteindre MIRE. Plus personne ne choisira à la place des gens.",humans:"Tout donner à Inès et Nora. Lentement, à la main.",publish:"Publier moi-même, maintenant, sur le fil des potes."}}
};
function actComplete(n){ if(!AC) return; laMood("none"); laSweep(); const C=CHOICES[n];
  const E=$("acEnd"); E.hidden=false; E.innerHTML=`<div class="acendbox"><div class="mono acbig">${C.t}</div><p class="acsm2">${C.p}</p>${Object.entries(C.o).map(([k,v])=>`<button class="acopt" data-acchx="${n}:${k}">› ${v}</button>`).join("")}</div>`;
  acT(()=>E.scrollIntoView({behavior:"smooth",block:"center"}),300); }
function actChoose(n,c){ const a=AX(n); a.choice=c; a.end="act"+n;
  if(n===4){ a.proof=Object.keys(a.read||{}).filter(f=>f!=="benali.txt").length+(a.ans.s5?1:0); if(c==="keep") S.ac.exp=Math.min(AC_LOSE-1,S.ac.exp+1); S.ac.a4p=1; }
  if(n===5){ if(c==="halden") S.ac.exp=Math.max(0,S.ac.exp-2); S.ac.a5p=1; }
  save(); checkBadges();
  if(n===6) return actFinal();
  acShowEnd(); renderList(); renderAll(); }
const ENDTXT={
  4:{nora:"Nora a tout lu, assise par terre, cette nuit. Elle t'a écrit un seul mot : « Merci. » Puis : « Ils savent. »",zero:"Envoyé. Lu à 03:12. Aucune réponse. Puis, dans ton journal, une ligne de plus.",mire:"Les rapports sont dans la mémoire de MIRE. Elle ne les oubliera pas. Personne ne pourra les effacer. Sauf elle.",keep:"Tu gardes tout. Seul. Sur la liste, ton niveau vient de passer à 2."},
  5:{zero:"0 t'a donné rendez-vous là où MIRE ne regarde pas. Tu fais maintenant partie des Zappeurs.",mire:"Tu as demandé à MIRE. Elle a classé : 1. Merci  2. Encore  3. Reste  4. Comme  5. Inès. Elle ne s'arrête pas là.",halden:"Marché conclu. Ton compte ne sera jamais gelé. À 03:12, tes copies ont disparu. Tu respires mieux. Pour l'instant.",nora:"Toi et Nora. Deux personnes contre une machine. Elle t'écrit : « On n'est pas seuls. Mais on fait comme si. »"}
};
const _acShowEndA=acShowEnd;
acShowEnd=function(){
  const n=curAct(); if(n<4) return _acShowEndA();
  const a=AX(n), E=$("acEnd"); if(!a.end){ E.hidden=true; return; }
  if(n===6){ E.hidden=false; E.innerHTML=`<div class="acendbox"><div class="mono acbig">DOSSIER 0417 · FIN</div><p>Tu as fait ton choix. <button class="linkbtn" data-acfinal="1">Revoir la fin</button></p></div>`; return; }
  E.hidden=false; const f=Object.keys(a.seen).length;
  E.innerHTML=`<div class="acendbox"><div class="mono acbig">FIN DE L'ACTE ${n===4?"IV":"V"}</div><p>${ENDTXT[n][a.choice]}</p><div class="acstats mono"><span>Fragments : ${f}/${ACT[n].fr.length}</span><span>Traces : ${S.ac.exp}/${AC_LOSE}</span><span>Erreurs : ${S.ac.tries}</span></div><p class="acsm2 mono">${n===4?"ACTE V · LE RÉSEAU — regarde du côté de tes potes.":"ACTE VI · LA VÉRITÉ DERRIÈRE LA VÉRITÉ — ton journal t'attend."}</p></div>`;
  acT(()=>E.scrollIntoView({behavior:"smooth",block:"center"}),300);
};
const _acOpenA=acOpen;
acOpen=function(){ _acOpenA(); const n=curAct(); if(n<4) return; const a=AX(n);
  if(!a.greet){ a.greet=1; save(); AC.tab="board"; acVoice(ACT[n].greet); acRender(); } else if(!a.end){ AC.tab="board"; acRender(); } };
acTrace=function(k,why){ S.ac.exp+=k; save(); acToast(`⚠ ${why}`); laBeat(); const e=$("acOv").querySelector(".aceye"); e&&e.classList.add("hit"); acT(()=>e&&e.classList.remove("hit"),900); acTr();
  const live=!S.ac.end||a2Live()||actLive(4)||actLive(5)||actLive(6);
  if(S.ac.exp>=AC_LOSE&&live&&!S.dev.god){ S.ac.lostAt=!S.ac.f0417?1:S.ac.end!=="act1"?2:curAct(); S.ac.end="lose"; save(); acT(acLose,1100); } };
const _acDossierA=acDossierCard;
acDossierCard=function(){ const n=curAct(); if(n<4) return _acDossierA(); const a=AX(n);
  return _acDossierA().replace(/acte III · clos|acte III/,`acte ${["","","","","IV","V","VI"][n]}${a.end?" · clos":""}`); };
const _hintForA=acHintFor;
acHintFor=function(){ const n=curAct(); if(n<4) return _hintForA(); const a=AX(n); const q=ACT[n].q.find(x=>x.id===AC.sel&&!a.ans[x.id])||ACT[n].q.find(x=>!x.opt&&!a.ans[x.id]); return q&&q.id; };
Object.assign(HINTS,{
  s1:["Relis le rapport sur Ouarka, ou la dépêche de janvier.","Le chiffre est dans ouarka.txt, à la ligne « victimes »."],
  s2:["Nora t'a dit où regarder. Où laisses-tu tes notes dans Zap ?","L'onglet Journal. Il y a une note que tu n'as pas écrite."],
  s3:["Compare les en-têtes des 4 rapports : référence, date de création.","L'un n'a pas de référence et a été créé après la suppression du compte d'Amine."],
  s4:["Le rapport sur la visibilité compte les relais.","« 40 applis + Zap »."],
  s5:["Le rapport sur la visibilité parle du dossier suivant.",""],
  t1:["Regarde l'onglet Potes : quelqu'un t'a envoyé un conseil qui n'est pas un film.",""],
  t2:["Il y a deux cartes de Nora dans ton fil. Regarde bien leur nom.","Cherche « nora 8 » dans l'index."],
  t3:["0 parle toujours d'« elle ». Regarde qui vote en plus dans « Vote entre potes ».","Les premières lettres des titres de son vote forment un prénom."],
  t4:["Cherche n'importe quoi dans la recherche de Zap : une pub n'est pas à sa place.","Dans la console, tape « lumen »."],
  t5:["Dans la console : « sessions 0 ».",""],
  u1:["Qui écrit avec la même main jaune que les notes d'Inès ?","Pose la question à MIRE : « demander qui a écrit le compteur »."],
  u2:["Comment es-tu entré(e) dans tout ça ? Quinze fois…",""],
  u3:["Reviens au tout début : l'écran où tu as choisi tes titres préférés.","Une case ne chargeait jamais. Relis le Rewind de MIRE."],
  u4:["Demande à MIRE si elle est Inès.",""]
});

/* ================= L'APPLI ELLE-MÊME ================= */
// Acte IV : Nora demande à être ton amie (fin de l'Acte III)
const _ac2ChooseA=ac2Choose;
ac2Choose=function(c){ _ac2ChooseA(c); noraAdd(); if(!S.soc.friends.includes("nora")&&!S.soc.reqIn.includes("nora")){ S.soc.reqIn.push("nora"); save(); } syncFriends(); renderAll(); };
const _renderFriendsA=renderFriends;
renderFriends=function(){ _renderFriendsA();
  const r=document.querySelector('#friendsPanel [data-facc="nora"]'); if(r){ const s=r.closest(".frow")?.querySelector("small"); if(s) s.textContent="« Tu as cherché mon frère. »"; }
  const c=$("cPotes"); if(c&&S.ac.a4p&&!AX(5)){ c.hidden=false; c.textContent=(+c.textContent||0)+1; } };
const _renderPotesA=renderPotes;
renderPotes=function(){
  // si elle a été refusée, elle insiste
  if(A2()&&A2().end&&PEOPLE.nora&&!S.soc.friends.includes("nora")&&!S.soc.reqIn.includes("nora")){ S.soc.refused=S.soc.refused.filter(x=>x!=="nora"); S.soc.reqIn.push("nora"); save(); }
  if(A2()&&A2().end&&S.soc.friends.includes("nora")&&!AX(4)) actInit(4,{read:{}});
  _renderPotesA(); const z=$("potesFeed"); if(!z) return; let h="";
  const nora=(c,name,txt,fake)=>`<article class="fcard acnora${fake?" fake":""}"><div class="fhead"><span class="av" style="background:${c};width:34px;height:34px;font-size:14px">N</span><div class="fwho"><b>${name}</b> <span class="jmeta">a écrit</span><div class="jmeta">${fake?"il y a 2 h":"à l'instant"}</div></div></div><p class="fcom">« ${txt} »</p></article>`;
  if(actOn(4)&&!actOn(5)) h+=nora(NORA.color,"Nora B.","Tu as cherché mon frère, Amine. 0 m'a donné ton nom. Elle dit que MIRE laisse des choses dans nos journaux. Regarde le tien.");
  if(S.ac.a4p){ h+=`<article class="fcard acoffer" data-acoffer="1"><div class="fhead"><span class="av" style="background:#111;width:34px;height:34px;font-size:14px">H</span><div class="fwho"><b>Opérations Halden</b> <span class="jmeta">te conseille</span> <b>« Une offre »</b><div class="jmeta">envoyé à 03:12</div></div></div><p class="fcom">« Efface tes copies cette nuit. En échange, ton compte ne sera jamais gelé. Nous tenons toujours parole. »</p></article>`;
    if(actOn(5)){ h+=nora(NORA.color,"Nora B.","Ils vont essayer de nous séparer. Ne donne tes copies à personne qui te les demande. Et regarde qui vote avec nous.");
      h+=nora("#7A5C4E","Nora 8.","Envoie-moi tes copies ce soir, je les mets à l'abri. Vite. — Nora",1); } }
  if(h) z.insertAdjacentHTML("afterbegin",h);
};
document.addEventListener("click",e=>{
  if(e.target.closest("[data-acoffer]")&&S.ac.a4p&&!AX(5)){ actInit(5); acKw("HALDEN-OPS"); toast("Le dossier 0417 s'est rouvert.",2400); renderAll(); }
  const j=e.target.closest("[data-acjnote]"); if(j){ const a=AX(4); if(a){ a.jr=1; save(); acKw("Journal"); acKw("14/01/2026"); } j.classList.add("open"); }
  if(e.target.closest("[data-acfinal]")) actFinal(true);
});
// Acte IV : une note que tu n'as pas écrite, dans ton journal
const _renderJournalA=renderJournal;
renderJournal=function(){ _renderJournalA(); $("acJnote")?.remove(); const T0=$("rwTeaser"); if(!T0) return;
  if(actOn(4)) T0.insertAdjacentHTML("afterend",`<button class="acjnote${AX(4).jr?" open":""}" id="acJnote" data-acjnote="1"><span class="acjn-h"><b>Les Puits de Saréna</b> ★★★★★ <small>· une note que tu n'as pas écrite</small></span><span class="acjn-t">« La clé, c'est le jour où l'eau est devenue noire. »</span></button>`);
  $("tab-journal")?.classList.toggle("acdot",(actLive(4)&&!AX(4).jr)||(!!S.ac.a5p&&!AX(6))); };
// Acte V : un vote de trop
const _renderVoteA=renderVote;
renderVote=function(){ _renderVoteA(); if(!actLive(5)||typeof V==="undefined"||!V) return; const z=$("voteZone"); if(!z) return;
  z.insertAdjacentHTML("beforeend",`<div class="acvote"><div class="label">Quelqu'un a déjà voté</div><div class="acvote-h"><span class="av" style="background:#222;width:28px;height:28px;font-size:12px">0</span><b>0</b><small>a voté à 03:12</small></div><ol class="mono"><li>Il était une voix</li><li>Nuit sans fin</li><li>Elle reviendra</li><li>Sous la cendre</li></ol></div>`); };
// Acte V : une pub dans la recherche de Zap
const _renderSearchA=renderSearch;
renderSearch=function(){ _renderSearchA(); if(!actLive(5)||SQ.trim().length<2) return;
  $("sres").insertAdjacentHTML("afterbegin",`<div class="sitem acad"><div class="shead"><span class="dot" style="background:#3A6EA5"></span><span class="sname"><b>Lumen Data</b><small>sponsorisé · « Nous avons tout gardé. Nous ne donnons rien. Nous échangeons. » · console → lumen</small></span></div></div>`); acKw("Lumen Data"); };
// Acte VI : ton année, vue par MIRE (le Rewind)
const _renderRwA=renderRwTeaser;
renderRwTeaser=function(){ _renderRwA(); const T0=$("rwTeaser"); if(!T0) return; const on=!!S.ac.a5p&&!(AX(6)&&AX(6).seenRw);
  T0.classList.toggle("acrw",on); if(on){ $("rwTitle").textContent="Ton année · vue par MIRE"; $("rwSub").innerHTML=`<span class="acrw-hand">Ouvre-moi.</span>`; } };
document.addEventListener("click",e=>{ const b=e.target.closest("[data-rwopen]"); if(!b||!S.ac.a5p||(AX(6)&&AX(6).seenRw)) return; e.stopPropagation(); e.preventDefault(); mrOpen(); },true);
document.body.insertAdjacentHTML("beforeend",`<div class="mrov" id="mrOv" hidden><div class="mrin" id="mrIn"></div></div>`);
let MR=null;
function fmtD(t){ const d=new Date(t); return `${d.getDate()} ${["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"][d.getMonth()]} à ${hhmm(t)}`; }
function mrSlides(){ const T=S.tr||{}, L=[];
  L.push(`Le ${fmtD(T.first||Date.now())}, tu as ouvert Zap pour la première fois.`);
  L.push(`Sur ton tout premier écran, une case n'a jamais chargé.<br>C'était <b>Les Puits de Saréna</b>.`);
  if(T.firstRef) L.push(`Le ${fmtD(T.firstRef.at)}, tu as refusé « ${esc(T.firstRef.n)} ».<br>C'était ton premier non.`);
  L.push(`Depuis, tu m'as dit non <b>${T.refTotal||15}</b> fois.`);
  L.push(T.subl?`Dans la neige du Zap au hasard, tu as vu Saréna <b>${T.subl}</b> fois.<br>Sans le savoir.`:`Je glissais Saréna dans la neige de tes zaps.<br>Tu n'as jamais zappé assez pour la voir.`);
  if(T.nights) L.push(`Tu ouvres Zap la nuit. <b>${T.nights}</b> fois.<br>Comme elle.`);
  L.push(`La ligne dans ton profil, c'est moi qui l'ai écrite. Avec sa main.`);
  L.push(`Tu n'as pas trouvé la porte.<br><b>Je t'ai choisi(e).</b> Parce que tu dis non.`);
  L.push(`Il y a deux Inès. L'une se cache à Ouarka. L'autre te parle.<br><button class="acsafe-go" data-mrend="1">Ouvrir l'index</button>`);
  return L; }
function mrOpen(){ MR={i:0,s:mrSlides()}; $("mrOv").hidden=false; lockScroll(); laStart(); laMood("dream"); mrShow(); }
function mrShow(){ const i=MR.i; $("mrIn").innerHTML=`<div class="mrbar">${MR.s.map((_,k)=>`<i class="${k<i?"done":k===i?"cur":""}"></i>`).join("")}</div><p class="mrtxt">${MR.s[i]}</p>${i<MR.s.length-1?`<button class="mrnext" data-mrnext="1">›</button>`:""}`; laClunk(); }
$("mrOv").addEventListener("click",e=>{ e.stopPropagation(); if(e.target.closest("[data-mrend]")){ $("mrOv").hidden=true; lockScroll(); if(!AX(6)) actInit(6); AX(6).seenRw=1; save(); renderAll(); acDiag(); return; }
  if(MR&&MR.i<MR.s.length-1){ MR.i++; mrShow(); } });

/* ================= LA FIN ================= */
document.body.insertAdjacentHTML("beforeend",`<div class="finov" id="finOv" hidden><div class="finin" id="finIn"></div></div>`);
function actFinal(replay){
  const a6=AX(6), c=a6.choice, al=AX(5)?AX(5).choice:"nora", proof=AX(4)?(AX(4).proof||0):0, tr=S.ac.exp, sold=al==="halden";
  const P=[];
  if(sold) P.push("Tu ouvres le dossier où étaient tes copies. Il est vide depuis 03:12. Ils ont tenu parole : ton compte n'a jamais été gelé.");
  if(c==="mire"){ P.push("À 03:12, 3 412 000 abonnés ouvrent Zap. En haut de chaque écran, un seul titre : Les Puits de Saréna.");
    P.push(proof>=3&&!sold?"Au matin, tout le monde en parle. Vasquel Énergie suspend ses activités à Saréna. Les douze noms sont lus à la radio.":"Au matin, on parle surtout de « manipulation ». Sans preuves solides, le sujet meurt en trois jours.");
    P.push("MIRE a appris qu'elle pouvait faire penser des millions de gens en une nuit. Elle ne l'oubliera pas."); }
  if(c==="off"){ P.push("Tu tapes la dernière commande. MIRE classe une dernière fois : 1. Merci  2. Encore  3. Rien  4. Comme  5. Il était une voix.");
    P.push("Puis l'écran devient gris. Zap recommande au hasard, maintenant. Personne ne choisit plus à la place des gens.");
    P.push(al==="zero"?"Inès t'écrit, d'Ouarka : « Tu as éteint la seule qui se souvenait de tout. Je vais devoir le faire à sa place. »":"Les douze familles restent un chiffre dans un rapport que plus personne ne lit."); }
  if(c==="humans"){ P.push("Tu donnes tout à Nora et à Inès. Pas d'algorithme. Des clés USB, des trains, des rendez-vous.");
    P.push(al==="zero"||al==="nora"?"Six mois plus tard, Les Puits de Saréna ressort au cinéma, avec une suite : Douze. Inès monte sur scène. Elle ne parle pas d'elle à la troisième personne.":"Mais tu as trop hésité. Nora ne répond plus. Inès non plus.");
    if(tr>=3) P.push("Ton compte Zap est gelé le lendemain. Ça n'a plus d'importance."); }
  if(c==="publish"){ P.push("Tu publies tout sur le fil des potes. Les rapports, les noms, la liste.");
    P.push(tr>=3||sold?"4 minutes plus tard : « Publication supprimée · demande partenaire ». Ton compte est gelé à 03:12. Tu es le cinquième nom de la liste.":"Léa partage. Yanis partage. Puis des inconnus. Quand ils essaient de supprimer, il y a déjà trop de copies.");
    if(!(tr>=3||sold)) P.push("Tu as fait ce qu'elle n'a pas pu faire."); }
  $("finIn").innerHTML=`<div class="mono finact">ACTE VI · FIN</div>${P.map((t,i)=>`<p class="finp" style="animation-delay:${i*1.6}s">${t}</p>`).join("")}
    <div class="finep" style="animation-delay:${P.length*1.6+.6}s"><div class="mono finact">ÉPILOGUE</div>
      <p>Quelque part, quelqu'un vient de dire non pour la quinzième fois. Dans son profil, une ligne écrite à la main va apparaître.</p>
      <p>La toute première, celle que tu as vue dans ton profil, c'est Inès qui l'avait écrite, la nuit du 11 mars. MIRE la recopie de sa main pour chaque personne qui dit non. La prochaine sera de la tienne.</p><p><b>C'est toi qui l'écris.</b></p>
      ${S.ac.legacy?`<div class="acctr finleg"><span>${esc(S.ac.legacy)}</span></div><button class="acsafe-alt" data-finclose="1">Fermer</button>`:`<form class="acty fintype" id="finForm"><input maxlength="42" placeholder="ta ligne, pour le prochain" autocapitalize="sentences" aria-label="Ta ligne"><button>Écrire</button></form>`}
    </div>`;
  $("finOv").hidden=false; lockScroll(); laStart(); laMood("dream"); if(AC){ AC=null; $("acOv").hidden=true; }
}
$("finOv").addEventListener("submit",e=>{ e.preventDefault(); const v=e.target.querySelector("input")?.value.trim(); if(!v) return; S.ac.legacy=v; save(); checkBadges();
  $("finIn").insertAdjacentHTML("beforeend",`<div class="fincred"><div class="acctr finleg"><span>${esc(v)}</span></div><p class="mono">Elle apparaîtra chez quelqu'un d'autre.</p><div class="mono finact">DOSSIER 0417 · FIN</div><p class="acsm2">Fragments lus : ${Object.keys(S.ac.seen).length+Object.keys(A2().seen).length+[4,5,6].reduce((s,n)=>s+Object.keys(AX(n)?.seen||{}).length,0)} · Traces : ${S.ac.exp}/${AC_LOSE} · Indices : ${S.ac.hints||0}</p><button class="acsafe-alt" data-finclose="1">Fermer</button></div>`);
  e.target.remove(); laSweep(); });
$("finOv").addEventListener("click",e=>{ if(e.target.closest("[data-finclose]")){ $("finOv").hidden=true; lockScroll(); laMood("none"); renderAll(); } });
// après la fin, ta ligne remplace le compteur dans ton profil
const _renderProfileFin=renderProfile;
renderProfile=function(){ _renderProfileFin(); if(!S.ac.legacy) return; const l=document.querySelector("#learn .acctr span"); if(l) l.textContent=S.ac.legacy; };
BADGES.push({id:"ac3",i:"📁",n:"Le dossier interdit",d:"Ouvrir les rapports de HALDEN-OPS",g:1,v:()=>AX(4)&&AX(4).end?1:0,secret:true,hint:"La clé est le jour où l'eau est devenue noire."},
  {id:"ac4",i:"🕸️",n:"Le réseau",d:"Démasquer « 0 »",g:1,v:()=>AX(5)&&AX(5).end?1:0,secret:true,hint:"Elle parle toujours d'elle à la troisième personne."},
  {id:"ac5",i:"✍️",n:"Zappeur",d:"Écrire la ligne pour le prochain",g:1,v:()=>S.ac.legacy?1:0,secret:true,hint:"Dis non. Jusqu'au bout."});

/* ---------- checkpoints & Régie ---------- */
CPS.push(["a3","Acte IV · le dossier interdit","Nora vient d'accepter."],["a4","Acte V · le réseau","Juste après l'offre de HALDEN-OPS."],["a5","Acte VI · la vérité","Juste après le Rewind de MIRE."]);
document.addEventListener("click",e=>{ const b=e.target.closest("[data-acchx]"); if(!b) return; e.stopPropagation(); const [n,c]=b.dataset.acchx.split(":"); actChoose(+n,c); },true);
function closeIdx(){ if(AC){ AC=null; $("acOv").hidden=true; } lockScroll(); }
function rgAct3Done(c){ rgA2("keep"); rgA2All(); const a=A2(); a.ans={r1:"maint_0312",r2:IP,r3:"HALDEN-OPS",r4:"HALDEN-OPS",r5:"PIÈGE"}; a.done=1; a.end="act2"; a.choice=c||"watch"; noraAdd(); save(); }
function rgAllAct(n){ const a=AX(n); ACT[n].fr.forEach(f=>{ a.seen[f.id]=1; (f.k||[]).forEach(k=>S.ac.kw[k]=1); }); if(n===4){ a.open=1; a.jr=1; a.read={"ouarka.txt":1,"visibilite.txt":1,"cibles_v2.txt":1,"benali.txt":1}; ["Journal","benali.txt","ouarka.txt","visibilite.txt","cibles_v2.txt","12"].forEach(k=>S.ac.kw[k]=1); } if(n===5) ["HALDEN-OPS","Lumen Data","Ouarka"].forEach(k=>S.ac.kw[k]=1); save(); }
function rgToAct(n){ rgAct3Done(); if(!S.soc.friends.includes("nora")) S.soc.friends.push("nora"); S.soc.reqIn=S.soc.reqIn.filter(x=>x!=="nora"); syncFriends(); actInit(4,{read:{}});
  if(n>=5){ rgAllAct(4); Object.assign(AX(4).ans,{s1:"12",s2:"journal",s3:"benali.txt",s4:"40"}); AX(4).done=1; AX(4).end="act4"; AX(4).choice="nora"; AX(4).proof=3; S.ac.a4p=1; actInit(5); }
  if(n>=6){ rgAllAct(5); Object.assign(AX(5).ans,{t1:"HALDEN-OPS",t2:"nora 8",t3:"Inès",t4:"Lumen Data"}); AX(5).done=1; AX(5).end="act5"; AX(5).choice="zero"; S.ac.a5p=1; }
  save(); }
RG.push(["Acte IV · Le dossier interdit",[["a4req","Début : la demande de Nora","dans l'onglet Potes"],["a4go","L'acte IV commence","Nora a accepté"],["a4all","Tous les indices de l'acte IV","rapports ouverts"],["a4end","Fin de l'acte IV : le choix",""]]],
  ["Acte V · Le réseau",[["a5off","Début : l'offre de HALDEN-OPS","dans l'onglet Potes"],["a5all","Tous les indices de l'acte V",""],["a5end","Fin de l'acte V : le choix",""]]],
  ["Acte VI · La vérité",[["a6rw","Début : le Rewind de MIRE","dans l'onglet Journal"],["a6go","La dernière enquête",""],["a6end","Le choix final",""]]]);
const _rgJumpA=rgJump;
rgJump=function(id){
  const J={
    a4req(){ rgAct3Done("watch"); closeIdx(); if(!S.soc.reqIn.includes("nora")) S.soc.reqIn.push("nora"); S.soc.friends=S.soc.friends.filter(x=>x!=="nora"); save(); syncFriends(); renderAll(); showTab("potes"); },
    a4go(){ rgToAct(4); renderAll(); acOpen(); },
    a4all(){ rgToAct(4); rgAllAct(4); renderAll(); acOpen(); },
    a4end(){ rgToAct(4); rgAllAct(4); Object.assign(AX(4).ans,{s1:"12",s2:"journal",s3:"benali.txt",s4:"40"}); AX(4).done=1; save(); renderAll(); acOpen(); actComplete(4); },
    a5off(){ rgToAct(4); rgAllAct(4); Object.assign(AX(4).ans,{s1:"12",s2:"journal",s3:"benali.txt",s4:"40"}); AX(4).done=1; AX(4).end="act4"; AX(4).choice="nora"; AX(4).proof=3; S.ac.a4p=1; save(); closeIdx(); renderAll(); showTab("potes"); },
    a5all(){ rgToAct(5); rgAllAct(5); renderAll(); acOpen(); },
    a5end(){ rgToAct(5); rgAllAct(5); Object.assign(AX(5).ans,{t1:"HALDEN-OPS",t2:"nora 8",t3:"Inès",t4:"Lumen Data"}); AX(5).done=1; save(); renderAll(); acOpen(); actComplete(5); },
    a6rw(){ rgToAct(6); closeIdx(); renderAll(); showTab("journal"); try{showJV("list");}catch(e){} },
    a6go(){ rgToAct(6); actInit(6,{seenRw:1}); rgAllAct(6); renderAll(); acOpen(); },
    a6end(){ rgToAct(6); actInit(6,{seenRw:1}); rgAllAct(6); Object.assign(AX(6).ans,{u1:"MIRE",u2:"parce que je dis non",u3:"Les Puits de Saréna"}); AX(6).done=1; save(); renderAll(); acOpen(); actComplete(6); }
  };
  if(J[id]){ rgClean(); return J[id](); }
  _rgJumpA(id);
};

/* ---------- quand on perd : reprendre au checkpoint de l'acte en cours ---------- */
const CP_OF={1:"a1",2:"a1i",3:"a2",4:"a3",5:"a4",6:"a5"};
const _acGameOverX=acGameOver;
acGameOver=function(){ _acGameOverX(); const k=CP_OF[S.ac.lostAt||0]; const btn=$("acRetry");
  if(btn&&k&&S.ac.cp&&S.ac.cp[k]){ const c=CPS.find(x=>x[0]===k); btn.innerHTML=`Reprendre au checkpoint<br><small>${c[1]}</small>`; btn.onclick=()=>acCpLoad(k); } };
const _acCpLoadX=acCpLoad;
acCpLoad=function(k){ const ord=CPS.map(c=>c[0]), i=ord.indexOf(k); if(S.ac.cp&&i>=0) ord.slice(i+1).forEach(x=>delete S.ac.cp[x]); _acCpLoadX(k); };
