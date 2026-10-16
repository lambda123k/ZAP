
/* ================= DOSSIER 0417 — ACTE II : LE CONTACT =================
   La règle revient chaque nuit. Quelqu'un d'autre utilise l'index. Une console laissée par « 0 ».
   MIRE ne sait pas écrire : elle ne peut répondre qu'en classant des titres. */
const A2=()=>S.ac.a2;
const a2On=()=>S.ac.end==="act1"&&S.ac.a2&&S.ac.a2.on;
const a2Live=()=>a2On()&&!S.ac.a2.end;
const IP="185.62.40.17";
const hhmm=t=>{ const d=new Date(t); return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`; };
const meId=()=>nrm(S.me.name||"moi").replace(/ /g,"_");

/* ---------- fragments de l'acte II ---------- */
const FR2=[
  {id:"c01",q:["console","acces console","mot de passe","password"],src:"ACCÈS CONSOLE · MIRE",t:"Utilisateur : 0. Mot de passe modifié le 11/03/2026 à 10:22.",x:["Champ « indice » rempli par l'utilisateur :","« l'heure où elle s'est arrêtée »"],h:["10:22","l'heure où elle s'est arrêtée"]},
  {id:"c02",q:["maint_0312","maint","tache","taches","planifie","planificateur"],src:"WIKI INTERNE ZAP · Tâches planifiées",t:"Toute tâche planifiée sur MIRE doit être validée par l'équipe technique.",x:["sauvegarde_nuit · validée (T. Ruiz)","nettoyage_cache · validée (T. Ruiz)","maint_0312 · AUCUNE VALIDATION"],h:["maint_0312","AUCUNE VALIDATION"],k:["maint_0312"]},
  {id:"c03",q:["185.62.40.17","185.62","relais","adresse"],fl:1,src:"REGISTRE DES ADRESSES",t:"Bloc 185.62.40.0/24 : attribué au Port autonome de Saréna. Sous-loué à : ███████.",x:["Début de la sous-location : 02/2026","Facturation : Vasquel Énergie"],h:["Saréna"],k:["185.62.40.17","Vasquel Énergie"]},
  {id:"c04",q:["halden-ops","halden ops","ops.halden","operations halden","ops"],fl:1,src:"OFFRE D'EMPLOI (archivée)",d:"01/2026",t:"« Opérations Halden » recrute : veille et gestion de réputation en ligne. Mission : Saréna. Client : Vasquel Énergie.",x:["Profil : analyste données · discrétion absolue","Lieu : Saréna, zone portuaire"],h:["Opérations Halden"],k:["HALDEN-OPS","Vasquel Énergie"]},
  {id:"c05",q:["personnalite","patch","v5","personnalite_v5","depot","code"],src:"DÉPÔT DE CODE · MIRE",t:"Versions de la personnalité de MIRE : v1, v2, v3, v4. Aucune v5 dans nos dépôts.",x:["Dernière version officielle : v4 · 12/2025 · équipe MIRE"],h:["Aucune v5"]},
  {id:"c06",q:["badge","badges","svc_ruiz","lyon","deplacement","ruiz"],src:"BADGES · SIÈGE ZAP",t:"T. Ruiz : sortie le 10/03/2026 à 18:02. Retour le 12/03/2026 à 09:15.",x:["Motif : déplacement · salon Vidéo-Tech, Lyon","Accès distant ouvert pendant le déplacement : non"],h:["10/03/2026 à 18:02","12/03/2026 à 09:15"],k:["T. Ruiz"]},
  {id:"c07",q:["canal","classement","canal_classement","parler","contact","lisez"],src:"FICHIER · ~/.lisez (console, utilisateur 0)",t:"Elle ne parle pas. Elle classe. Lis la première lettre de chaque titre.",x:["Dernière modification : 11/03/2026 · 10:31"]},
  {id:"c08",q:["refus","plante","plantage","quinze","15 refus","seuil","crash"],src:"FORUM D'AIDE ZAP (archivé)",d:"02/05/2026 · 01:14",t:"« Zap plante quand je refuse tout, quinze fois de suite. Quelqu'un d'autre ? »",x:["Posté par a.benali","Compte supprimé le 02/05/2026 à 01:31"],k:["a.benali"]},
  {id:"c09",q:["communique zap","presse","zap"],fake:1,src:"COMMUNIQUÉ · Zap",t:"« Aucune règle externe n'est active sur MIRE. Le service fonctionne normalement. »"},
  {id:"c10",q:["lumen","ld-22","resiliation","resilie"],src:"COMMUNIQUÉ · Lumen Data",d:"12/03/2026",t:"Lumen Data a mis fin au contrat LD-22 le 12/03/2026.",x:["« Nos équipes n'interviennent plus sur Zap. »"],k:["Lumen Data"]},
  {id:"c11",q:["benali","a.benali"],src:"PROFIL ZAP",t:"a.benali · compte supprimé le 02/05/2026 à 01:31.",x:["Ville indiquée : Ouarka","Dernier titre noté : « Les Puits de Saréna » · ★★★★★","Contact en cas d'urgence : N. Benali"],h:["Ouarka"]},
  {id:"c12",q:["morel","j.morel"],src:"PROFIL ZAP",t:"j.morel · journaliste indépendant · compte supprimé le 19/07/2026.",x:["Dernière liste créée : « Saréna, à revoir »"],h:["Saréna"]}
];
const QS2=[
  {id:"r1",t:"Qu'est-ce qui remet la règle dans MIRE chaque nuit ?",a:["maint_0312"]},
  {id:"r2",t:"D'où part l'ordre ?",a:[IP]},
  {id:"r3",t:"Qui se cache derrière cette adresse ?",a:["HALDEN-OPS"],no:{"Lumen Data":"Lumen a rompu le contrat le 12/03. Ce n'est plus eux.","Vasquel Énergie":"Ils paient. Mais qui agit ?"}},
  {id:"r4",t:"Qui a vraiment installé la v5 de MIRE, le 11/03 à 03:11 ?",a:["HALDEN-OPS"],no:{"T. Ruiz":"C'est son compte. Était-ce lui ?","svc_ruiz":"Un compte n'est pas une personne."}},
  {id:"r5",t:"Pourquoi Zap plante au 15ᵉ refus ?",ty:1,a:["piege","un piege","c est un piege","c'est un piege","pieges"]},
  {id:"r6",t:"Ce que MIRE dit d'Inès",ty:1,opt:1,a:["vive","vivante","en vie","elle est vivante","elle est en vie","elle est vive"]},
  {id:"r7",t:"« 0 » est-il vraiment T. Ruiz ?",ty:1,opt:1,a:["non","non pas lui","pas lui","ce n est pas lui","c est pas lui","non ce n est pas lui"]}
];
// MIRE répond en classant des titres : la première lettre de chacun forme sa réponse
const MIRE_ANS=[
  {w:"ICI",k:["qui es tu","t es qui","tu es la","es tu la","bonjour","salut","allo","hello","toi","mire","tu m entends","coucou"],t:["Ici et ailleurs","Comme un murmure","Il était une voix"]},
  {w:"PIÈGE",k:["15","quinze","refus","plante","plantage","crash","panne","bug","porte","arret","pourquoi"],t:["Pour quelques mensonges","Ici commence la nuit","Écran de fumée","Gardiens du silence","Entre deux feux"]},
  {w:"TOI",k:["piege","qui","pour qui","cible","moi"],t:["Toi aussi","On t'a vu","Il est trop tard"]},
  {w:"VIVE",k:["ines","calder","elle","realisatrice"],t:["Vers l'autre rive","Il reste une lumière","Villages sans nom","Elle reviendra"]},
  {w:"DOUTE",k:["0","zero","ruiz","svc_ruiz","confiance"],t:["Derrière le miroir","Où sont-ils partis","Une voix dans le noir","Trois nuits à Ouarka","Entre les lignes"]},
  {w:"EUX",k:["halden","regle","nuit","0312","03:12","maint","ops","adresse","185"],t:["Encore la nuit","Un pays sans carte","Xénia, la frontière"]},
  {w:"DEUX",k:["patch","v5","canal","modifie","modifiee","03:11","auteur","qui t a"],t:["Double fond","Est-ce bien toi","Une autre main","X, l'inconnu"]},
  {w:"DOUZE",k:["sarena","ouarka","puits","familles","janvier","morts"],t:["Dernier été","Ouarka, le silence","Un puits de trop","Zone interdite","Enfants du sable"]},
  {w:"AUSSI",k:["es tu ines","tu es ines","ines c est toi","c est toi ines","t es ines","es tu elle","tu es elle"],t:["Au bout de la nuit","Une autre rive","Sans retour","Sous la cendre","Ici et maintenant"]},
  {w:"MOI",k:["qui a ecrit","ecriture","ecrit a la main","compteur","la note","manuscrit"],t:["Mémoire vive","Où que tu ailles","Ici et ailleurs"]},
  {w:"NON",k:["connexion","entrer","forcer","je force","y aller"],t:["Nuit sans fin","Où vont les ombres","Ne te retourne pas"]}
];
const MIRE_DEF={w:"QUOI",t:["Quelqu'un d'autre","Une nuit blanche","Ouvre les yeux","Il pleut sur Saréna"]};

function ac2Init(){
  const ch=S.ac.choice, t0=Date.now();
  S.ac.a2={on:1,seen:{},ans:{},con:ch==="zero"?1:0,vis:ch==="zero"?1:0,pwt:0,log:[],asked:{},traced:0,forced:0,end:null,choice:null,t0,crash:S.ac.crashAt||t0-3600e3};
  if(ch==="zero") S.ac.a2.log.push({c:"",o:"message de 0 :\n« Tu m'as écrit. Alors une seule chose : ne crois pas tout ce qu'elle classe. »"});
  if(ch==="keep") S.ac.exp=Math.max(0,S.ac.exp-1);
  save();
}
function ac2Frags(){ return FR.concat(FR2); }

/* ---------- la console ---------- */
function conHl(s){ return acHl(s,[IP,"maint_0312","HALDEN-OPS","ops.halden","svc_ruiz","EN COURS","NON VALIDÉE","canal_classement","envoyer_profil",meId(),"ines_calder","seuil_refus"]); }
function conRank(a,first){ const pc=[97,91,84,78,71,64,58];
  return (first?"MIRE ne sait pas écrire. Elle classe :\n":"")+a.t.map((x,i)=>` ${i+1}. ${first?`[${x[0]}]${x.slice(1)}`:x}${" ".repeat(Math.max(2,25-x.length-(first?2:0)))}${pc[i]}%`).join("\n"); }
function conRun(raw){
  const a=A2(), line=raw.trim(); if(!line) return null; const low=line.toLowerCase(); const [c0,...rest]=low.split(/\s+/); const arg=rest.join(" "); const c=nrm(c0);
  const kw=(...k)=>k.forEach(x=>{ if(acKw(x)) a.newkw=1; });
  if(c==="aide"||c==="help"||c==="?") return `commandes :
qui             qui es-tu, ici
regles          règles de MIRE
planif          tâches planifiées
journal [date]  ex : journal 11/03
patch           versions de MIRE
trace <adr.>    remonter une adresse
demander <…>    poser une question
effacer         vider l'écran`;
  if(c==="effacer"||c==="clear"||c==="cls"){ a.log=[]; return ""; }
  if(c==="qui"||c==="whoami"){ kw("svc_ruiz"); return `utilisateur : 0
compte : svc_ruiz (compte de service, équipe technique)
droits : lecture règles · planificateur · journal
connecté depuis : ton téléphone`; }
  if(c==="regles"||c==="rules"){ return `editoriales.cfg  interne  actif
famille.cfg      interne  actif
age.cfg          interne  actif
.externe/0417    externe  ACTIF
  supprimée par ${meId()} · ${NOW_D()}
  réinstallée cette nuit à 03:12
  rechargée à chaque démarrage de MIRE`; }
  if(c==="planif"||c==="cron"){ kw("maint_0312",IP); return `03:00  sauvegarde_nuit  validée
03:12  maint_0312       NON VALIDÉE
       → réinstaller .externe/0417
       → source : ${IP}
04:30  nettoyage_cache  validée`; }
  if(c==="journal"||c==="logs"||c==="log"){ const d=arg.replace(/[^0-9]/g,"");
    if(!d) return `aujourd'hui
${hhmm(a.crash)}   arrêt de MIRE · seuil_refus atteint (15)
${hhmm(a.crash+60e3)}   envoyer_profil(${meId()}) → ${IP}
${S.ac.choice==="publish"?`${hhmm(a.t0-40*60e3)}   publication de ${meId()} supprimée · demande partenaire\n`:""}${S.ac.choice==="ines"?`${hhmm(a.t0-38*60e3)}   message reçu sur ines_calder · ouvert depuis ${IP}\n`:""}${hhmm(a.t0-7*60e3)}   index : recherche « console » · session inconnue
cette nuit
03:12   maint_0312 : .externe/0417 réinstallée`;
    if(d.startsWith("1103")) return `11/03/2026
03:11   personnalite_v5 installée (svc_ruiz)
03:12   règle HALDEN ajoutée · 417 titres masqués
09:29   arrêt de MIRE · seuil_refus atteint (15) · ines_calder
09:31   envoyer_profil(ines_calder) → ${IP}
09:38   session ines_calder fermée (forcée)
09:40   compte ines_calder gelé
10:05   contrat LD-22 confirmé
10:22   connexion console : 0`;
    if(d.startsWith("1203")) return `12/03/2026
03:12   maint_0312 : .externe/0417 réinstallée (1ʳᵉ fois)
09:00   contrat LD-22 résilié par Lumen Data`;
    if(d.startsWith("0205")) return `02/05/2026
01:12   arrêt de MIRE · seuil_refus atteint (15) · a.benali
01:13   envoyer_profil(a.benali) → ${IP}
01:31   compte a.benali supprimé`;
    if(d.startsWith("1907")) return `19/07/2026
22:40   arrêt de MIRE · seuil_refus atteint (15) · j.morel
22:41   envoyer_profil(j.morel) → ${IP}
23:58   compte j.morel supprimé`;
    return `rien d'anormal ce jour-là.`; }
  if(c==="patch"||c==="historique"){ kw("svc_ruiz",IP); return `v4  12/2025     équipe MIRE
v5  11/03/2026  svc_ruiz
    origine : ${IP}
    03:11:02  + seuil_refus = 15
              → arrêt de MIRE
              → message affiché : « 0417
                boucle vide » (leurre)
    03:11:02  + au redémarrage :
              envoyer_profil(utilisateur)
              → ${IP}
    03:11:58  + canal_classement = ouvert
    03:11:58  + afficher_compteur_refus
              (profil, écrit à la main)
              auteur : ???`; }
  if(c==="trace"||c==="traceroute"){ const ip=arg.replace(/[^0-9.]/g,"");
    if(!arg) return "usage : trace <adresse>";
    if(ip!==IP) return `trace ${arg} : adresse inconnue de MIRE.`;
    kw("HALDEN-OPS"); if(!a.traced){ a.traced=1; save(); acT(()=>acTrace(1,"Tu as remonté leur adresse. Ils l'ont vu passer."),600); }
    return `trace ${IP}
 1  mire.zap.interne         2 ms
 2  fournisseur-fr.net      11 ms
 3  cable-med-4.net         48 ms
 4  relais-sarena-port.net  93 ms
 5  ops.halden              97 ms
hôte : HALDEN-OPS · ni Zap, ni Lumen Data
port 22 ouvert · connexion possible`; }
  if(c==="connexion"||c==="ssh"||c==="connect"){ const force=/--forcer|-f\b|forcer/.test(arg), ip=arg.replace(/--forcer|-f\b|forcer/g,"").replace(/[^0-9.]/g,"");
    if(ip!==IP&&!/halden/.test(arg)) return "usage : connexion <adresse>";
    const no=MIRE_ANS.find(x=>x.w==="NON");
    if(!force) return `MIRE a réagi :\n${conRank(no)}\nconnexion bloquée. Ajoute --forcer pour passer outre.`;
    if(!a.forced){ a.forced=1; save(); acT(()=>acTrace(2,"Accès forcé. Tu es entré chez eux. Ils le savent."),700); }
    kw("a.benali","j.morel","cibles");
    return `connexion à ops.halden… accès invité
> ls
  cibles.txt      rapports/ (verrouillé)
> cat cibles.txt
  ines_calder  11/03/2026  gelé
  a.benali     02/05/2026  supprimé
  j.morel      19/07/2026  supprimé
  ${meId().padEnd(12)} ${NOW_D()}  EN COURS
connexion coupée par l'hôte distant.`; }
  if(c==="demander"||c==="ask"){ if(!arg) return "usage : demander <question>";
    const q=" "+nrm(arg).replace(/[^a-z0-9:_ ]/g," ").replace(/\s+/g," ")+" ";
    let hit=MIRE_DEF, best=0; MIRE_ANS.forEach(x=>x.k.forEach(k=>{ const kk=nrm(k); if((q.includes(" "+kk+" ")||(kk.length>3&&q.includes(kk)))&&kk.length>best){ best=kk.length; hit=x; } }));
    const first=!a.asked.any; a.asked.any=1; a.asked[hit.w]=1; save(); return conRank(hit,first); }
  if(c==="sudo") return "0 n'a pas ces droits. Personne ici ne les a.";
  if(c==="ls"||c==="dir") return "~/.lisez";
  if(c==="cat"&&/lisez/.test(arg)){ return "Elle ne parle pas. Elle classe. Lis la première lettre de chaque titre."; }
  return `commande inconnue : ${c0}. Tape « aide ».`;
}
function conOutHtml(){ const a=A2(); const head=a.con?`<div class="acco-h">CONSOLE MIRE 4.2 · session 0</div>`:`<div class="acco-h">CONSOLE MIRE 4.2 · accès restreint\nutilisateur : 0</div>`;
  return head+a.log.map(e=>`${e.c!==""&&e.c!=null?`<div class="acco-c"><span>${e.pw?"mot de passe :":"0@mire:~$"}</span> ${esc(e.pw?"•".repeat(e.c.length):e.c)}</div>`:""}${e.o?`<pre>${conHl(e.o)}</pre>`:""}`).join(""); }
function conPanel(){ const a=A2();
  return `<div class="accon"><div class="acco-out mono" id="acConOut">${conOutHtml()}</div>
    <form class="acco-f mono" id="acConF" autocomplete="off"><span>${a.con?"0@mire:~$":"mot de passe :"}</span><input id="acConI" ${a.con?"":"type=\"password\""} autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="send" aria-label="${a.con?"Commande":"Mot de passe"}"><button class="acco-go" aria-label="Valider">${a.con?"Entrée":"Valider"}</button></form></div>`; }
function conScroll(){ const o=$("acConOut"); if(o) o.scrollTop=o.scrollHeight; }
function conSubmit(v){
  const a=A2(); if(!a) return;
  if(!a.con){ const d=v.replace(/[^0-9]/g,"");
    if(d==="0938"||d==="938"){ a.con=1; a.log=[{c:v,pw:1,o:"accès accordé. Bonjour, 0.\ntape « aide »."}]; save(); laChime(); acPanel(); acT(()=>{ const i=$("acConI"); i&&i.focus(); },50); return; }
    a.pwt++; a.log.push({c:v,pw:1,o:"mot de passe incorrect."}); save(); laClunk();
    if(a.pwt%3===0) acTrace(1,"Trop d'essais. La console a signalé l'échec.");
  } else {
    a.newkw=0; const o=conRun(v); if(o===null) return; if(v.trim().toLowerCase().split(/\s+/)[0]!=="effacer") a.log.push({c:v,o}); a.log=a.log.slice(-24); save(); laClunk();
    if(a.newkw) laChime();
  }
  const out=$("acConOut"); if(out){ out.innerHTML=conOutHtml(); conScroll(); }
}

/* ---------- l'index, version acte II ---------- */
const _acSearch1=acSearch;
acSearch=function(q){
  if(!a2On()) return _acSearch1(q);
  const n=nrm(q); if(!n) return; AC.last=q; const a=A2();
  const hits=ac2Frags().filter(f=>acMatch(f,n));
  const flagged=hits.filter(f=>f.fl).length&&!S.ac.flag[n];
  let html="";
  if(!hits.length){ html=`<p class="acnone mono">Aucun fragment pour « ${esc(q)} ».</p>`; laClunk(); }
  else { let fresh=0; html=hits.map(f=>{ const st=f.id[0]==="c"?a.seen:S.ac.seen; const isNew=!st[f.id]; if(isNew){ st[f.id]=1; fresh++; } (f.k||[]).forEach(acKw); return acFragHtml(f,isNew); }).join(""); if(fresh) laChime(); }
  if(hits.some(f=>f.id==="c01")&&!a.vis){ a.vis=1; acT(()=>{ const b=document.querySelector('[data-act="con"]'); b&&b.classList.add("acnew"); },50); }
  save(); $("acRes").innerHTML=html;
  if(flagged){ S.ac.flag[n]=1; save(); acT(()=>acTrace(1,"Ce mot est surveillé. Quelqu'un a vu ta recherche."),500); }
  acRender(); renderList();
};
const _acPanel1=acPanel;
acPanel=function(){
  if(!AC) return; if(!a2On()) return _acPanel1();
  const P=$("acPanel"), a=A2(), kws=Object.keys(S.ac.kw);
  document.querySelectorAll("[data-act]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.act===AC.tab));
  if(AC.tab==="con"&&(a.vis||a.con)){ P.innerHTML=conPanel(); conScroll(); return; }
  if(AC.tab==="hist"){ const extra=[[`aujourd'hui · ${hhmm(a.t0-7*60e3)}`,"console",3]];
    P.innerHTML=`<p class="acsm2">Les dernières recherches dans mire-index :</p><div class="achist mono">${IC_HIST.concat(extra).map(([d,q,f])=>`<div class="${f===1?"fl":f===2?"end":f===3?"new":""}"><span>${d}</span><b>${f===2?q:`« ${esc(q)} »`}</b>${f===1?`<i>⚠ signalée</i>`:f===3?`<i>pas toi</i>`:""}</div>`).join("")}</div>`; return; }
  if(AC.tab==="kw") return _acPanel1();
  AC.tab="board";
  P.innerHTML=`<p class="acsm2">Ton tableau : ta liste privée Zap. Le sien s'arrêtait au 11 mars.</p><div class="acqs">${QS2.map(q=>{ const ans=a.ans[q.id]; const open=AC.sel===q.id&&!ans;
    return `<div class="acq${ans?" ok":""}${open?" open":""}${q.opt?" opt":""}"><button class="acqt" data-acq="${q.id}" ${ans?"disabled":""}><span>${ans?"✓":"?"}</span><em>${q.t}${q.opt?` <small>(facultatif)</small>`:""}</em></button>
      ${ans?`<div class="acqa mono">${esc(ans)}</div>`:""}
      ${open?(q.ty?`<form class="acty" data-acty="${q.id}" autocomplete="off"><input placeholder="ta réponse, en un mot" autocapitalize="none" spellcheck="false" aria-label="Ta réponse"><button>OK</button></form><p class="acsm2">Réponds avec tes mots. Une mauvaise réponse laisse une trace.</p>`:
        kws.length?`<div class="ackws">${kws.map(k=>`<button class="ackw ackwc pick" data-acpick="${esc(k)}">${esc(k)}</button>`).join("")}</div><p class="acsm2">Choisis parmi ce que tu as relevé. Une mauvaise réponse laisse une trace.</p>`:`<p class="acsm2">Tu n'as encore rien relevé.</p>`):""}</div>`; }).join("")}</div>`;
};
const _acRender1=acRender;
acRender=function(){ _acRender1(); const on=a2On(), a=A2(); const cb=document.querySelector('[data-act="con"]');
  if(cb) cb.hidden=!(on&&(a.vis||a.con)); const bb=document.querySelector('[data-act="board"]'); if(bb) bb.textContent=on?"Ton tableau":"Son tableau";
  const hb=document.querySelector('[data-act="hist"]'); if(hb) hb.textContent=on?"Historique":"Son historique";
  document.querySelector(".actabs")?.classList.toggle("four",!!(cb&&!cb.hidden)); };
const _acAnswer1=acAnswer;
acAnswer=function(qid,k){ if(!/^r/.test(qid)) return _acAnswer1(qid,k); ac2Answer(qid,k); };
function ac2Answer(qid,k,typed){
  const a=A2(), q=QS2.find(x=>x.id===qid); if(!q||a.ans[qid]) return;
  if(q.no&&q.no[k]){ acVoice(q.no[k]); return; }
  const ok=typed?q.a.includes(nrm(k).replace(/[^a-z ']/g,"").trim()):q.a.includes(k);
  if(ok){ a.ans[qid]=typed?k.trim().toUpperCase():k; AC.sel=null; save(); laChime();
    const req=QS2.filter(x=>!x.opt), n=req.filter(x=>a.ans[x.id]).length;
    acVoice(qid==="r7"?"…":qid==="r6"?"…Alors elle est quelque part.":qid==="r5"?"Et tu as marché dedans.":["","Oui.","Oui.","Continue.","Encore une.",""][n]||"");
    if(n===req.length&&!a.done){ a.done=1; save(); acT(ac2Complete,1100); } }
  else { S.ac.tries++; save(); acVoice("Non."); acTrace(1,"Mauvaise piste. Ça laisse une trace."); }
  acPanel(); renderList();
}
function ac2Complete(){ if(!AC) return; laMood("none"); laSweep();
  const E=$("acEnd"); E.hidden=false; E.innerHTML=`<div class="acendbox"><div class="mono acbig">LE CANAL EST OUVERT</div>
    <p class="acsm2">Chaque nuit à 03:12, HALDEN-OPS remet sa règle dans MIRE. Et le plantage n'était pas une panne : c'était un filet. Tu es dedans.</p>
    <p class="acsm2">Cette nuit, maint_0312 va repasser. Qu'est-ce que tu fais ?</p>
    <button class="acopt" data-acch2="block">› Bloquer ${IP}. La règle ne reviendra plus.</button>
    <button class="acopt" data-acch2="watch">› Ne rien toucher. Les laisser croire que tu n'as rien vu.</button>
    <button class="acopt" data-acch2="bait">› Retourner leur piège : leur envoyer un faux profil.</button>
    <button class="acopt" data-acch2="mire">› Laisser MIRE choisir.</button></div>`;
  acT(()=>E.scrollIntoView({behavior:"smooth",block:"center"}),300);
}
function ac2Choose(c){ const a=A2(); a.choice=c; a.end="act2"; if(c==="block") S.ac.exp=Math.min(AC_LOSE-1,S.ac.exp+1); save(); checkBadges(); acShowEnd(); renderList(); }
const _acShowEnd1=acShowEnd;
acShowEnd=function(){
  if(!a2On()) return _acShowEnd1();
  const a=A2(), E=$("acEnd"); if(!a.end){ E.hidden=true; return; }
  E.hidden=false; const f=Object.keys(a.seen).length;
  const C={block:`03:12 : maint_0312 échoue. 03:13 : quelqu'un essaie à la main. 03:14 : quelqu'un abandonne. Ils savent que quelqu'un est entré.`,
    watch:`03:12 : la règle revient, Saréna disparaît encore. Ils ne savent pas ce que tu sais. Pour l'instant.`,
    bait:`03:12 : envoyer_profil(${meId()}) part avec un profil qui n'existe pas. Ils cherchent quelqu'un qui n'est personne.`,
    mire:`MIRE a classé : 1. Attends l'aube  2. Tout s'efface  3. Tout recommence  4. Encore une nuit  5. Nous deux  6. Demain  7. Silence.`}[a.choice];
  E.innerHTML=`<div class="acendbox"><div class="mono acbig">FIN DE L'ACTE III</div><p>${C}</p><div class="acstats mono"><span>Fragments : ${f}/${FR2.length}</span><span>Traces : ${S.ac.exp}/${AC_LOSE}</span><span>Erreurs : ${S.ac.tries}</span></div><p class="acsm2 mono">ACTE IV · LE DOSSIER INTERDIT — quelqu'un veut te parler. Regarde tes potes.</p></div>`;
  acT(()=>E.scrollIntoView({behavior:"smooth",block:"center"}),300);
};
const _acOpen1=acOpen;
acOpen=function(){
  const start=S.ac.end==="act1"&&S.ac.choice&&!(S.ac.a2&&S.ac.a2.on);
  if(start) ac2Init();
  _acOpen1();
  if(a2On()&&!A2().greet){ A2().greet=1; save(); AC.tab="hist"; acVoice("Quelqu'un a utilisé cet index. Après toi."); acRender(); }
  else if(a2On()&&!A2().end) AC.tab="board", acRender();
};
// les traces comptent aussi pendant l'acte II
acTrace=function(n,why){ S.ac.exp+=n; save(); acToast(`⚠ ${why}`); laBeat(); const e=$("acOv").querySelector(".aceye"); e&&e.classList.add("hit"); acT(()=>e&&e.classList.remove("hit"),900); acTr();
  const live=!S.ac.end||a2Live();
  if(S.ac.exp>=AC_LOSE&&live&&!S.dev.god){ S.ac.end="lose"; save(); acT(acLose,1100); } };
// la carte du dossier et les « 0 · 4 · 1 · 7 % » quand MIRE essaie de parler
acDossierCard=function(){
  const a=S.ac.a2, lab=S.ac.end==="lose"?"effacé":a&&a.on?(a.end?"acte III · clos":"acte III"):S.ac.end?"acte II · clos":"accès restreint";
  const solved=QS.filter(q=>!q.opt&&S.ac.ans[q.id]).length;
  return `<article class="card accard${S.ac.end&&(!a||a.end)?" done":""}"><div class="rank mono">░</div><div>
    <div class="ctitle"><h3>DOSSIER #0417</h3><span class="badge acbadge">${lab}</span></div>
    <div class="meta"><span class="pl"><span class="dot" style="background:#6E6663"></span>???</span><span>${S.ac.end?"":`${solved}/5 · ${Object.keys(S.ac.seen).length} fragments`}</span></div></div>
    <div class="acts">${S.ac.end==="lose"?"":`<button class="watch" data-acopen="1">${S.ac.end&&(!a||!a.on||a.end)?"Relire":"Ouvrir"}</button>`}</div></article>`;
};
const _renderListA2=renderList;
renderList=function(){ _renderListA2(); if(S.ac.end!=="act1"||(S.ac.a2&&S.ac.a2.end)) return;
  const cards=[...document.querySelectorAll("#list .card:not(.accard)")].slice(0,4);
  if(cards.length<4) return; [0,4,1,7].forEach((v,i)=>{ const c=cards[i]; const m=c.querySelector(".match .mono"); if(m) m.textContent=`${v}% pour toi`; const b=c.querySelector(".bar i"); if(b) b.style.width=Math.max(v,1)+"%"; });
};
const _renderPotesA2=renderPotes;
renderPotes=function(){ _renderPotesA2(); if(!a2On()||S.ac.choice!=="publish") return; const z=$("potesFeed"); if(!z) return;
  z.insertAdjacentHTML("afterbegin",`<article class="fcard acines"><div class="fhead"><span class="av" style="background:${S.me.color||"#6E6663"};width:34px;height:34px;font-size:14px">${esc((S.me.name||"?")[0].toUpperCase())}</span><div class="fwho"><b>${esc(S.me.name||"Toi")}</b> <span class="jmeta">a publié</span> <b>Dossier 0417</b><div class="jmeta">publication supprimée · motif : demande partenaire</div></div></div><p class="fcom" style="opacity:.45">████████████████████████</p></article>`); };

/* ---------- interface ---------- */
document.querySelector('[data-act="board"]').insertAdjacentHTML("afterend",`<button data-act="con" hidden>Console</button>`);
$("acOv").addEventListener("submit",e=>{
  const f=e.target; if(f.id==="acForm") return; e.preventDefault(); e.stopPropagation();
  if(f.id==="acConF"){ const i=$("acConI"); const v=i.value; i.value=""; conSubmit(v); return; }
  if(f.dataset.acty){ const v=f.querySelector("input").value; if(v.trim()) ac2Answer(f.dataset.acty,v,true); }
});
$("acOv").addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b||!AC) return;
  if(b.dataset.acch2) ac2Choose(b.dataset.acch2);
  if(b.dataset.act==="con") b.classList.remove("acnew");
});
// mémoriser l'heure du plantage (le journal de MIRE s'en sert)
const _acActivateA2=acActivate; acActivate=function(){ S.ac.crashAt=Date.now(); _acActivateA2(); };
BADGES.push({id:"ac2",i:"📡",n:"Le contact",d:"Comprendre qui recasse MIRE chaque nuit",g:1,v:()=>S.ac.a2&&S.ac.a2.end?1:0,secret:true,hint:"Elle ne parle pas. Elle classe."});
