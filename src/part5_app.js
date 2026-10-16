
const PLATS = {
  netflix:{n:"Netflix",c:"#E50914"}, disney:{n:"Disney+",c:"#1F63E0"}, crunchy:{n:"Crunchyroll",c:"#F47521"},
  canal:{n:"Canal+",c:"#7A7A86"}, prime:{n:"Prime Video",c:"#00A8E1"}, apple:{n:"Apple TV+",c:"#9A9AA5"},
  autre:{n:"Autre",c:"#8C8AA0"}
};
const SUBS=["netflix","disney","crunchy","canal","prime","apple"];
const SEARCH = {
  netflix:q=>"https://www.netflix.com/search?q="+q,
  disney:q=>"https://www.disneyplus.com/search?q="+q,
  crunchy:q=>"https://www.crunchyroll.com/fr/search?q="+q,
  prime:q=>"https://www.primevideo.com/search?phrase="+q,
  apple:q=>"https://tv.apple.com/fr/search?term="+q,
  canal:q=>"https://www.google.com/search?q="+q+"+site%3Acanalplus.com",
  autre:q=>"https://www.google.com/search?q="+q+"+streaming"
};
const GENRES = {anime:"Anime",animation:"Animation",action:"Action",aventure:"Aventure",comedie:"Comédie",romance:"Romance",drame:"Drame",thriller:"Thriller",horreur:"Horreur",sf:"Science-fiction",fantasy:"Fantasy",policier:"Policier",docu:"Docu",historique:"Historique",famille:"Famille",sport:"Sport"};
const MOODS = {chill:"calme",cosy:"cosy",feel:"feel-good",rire:"rire",frisson:"frissons",epic:"épique",romance:"romantique",reflexion:"qui fait réfléchir"};
const HUMEURS = {
  none:{l:"Peu importe",m:{}},
  rire:{l:"Besoin de rire",m:{rire:2}},
  fatigue:{l:"Fatigué",m:{chill:1.2,cosy:1.2,frisson:-1,reflexion:-.8},energy:0},
  action:{l:"Envie d'action",m:{epic:2}},
  emotion:{l:"Envie d'émotion",m:{feel:1.6,romance:.6,reflexion:.4}},
  reflexion:{l:"Envie de réfléchir",m:{reflexion:2}},
  frisson:{l:"Envie de frissons",m:{frisson:2}}
};

// Âge conseillé (signalétique France / plateformes, indicatif)
const AGE={"Stranger Things":12,"Arcane":12,"Squid Game":16,"Lupin":12,"La Casa de Papel":16,"Dark":16,"Mercredi":12,"La Chronique des Bridgerton":16,"Emily in Paris":12,"Sex Education":16,"Brooklyn Nine-Nine":10,"One Piece (live action)":12,"The Witcher":16,"Notre planète":0,"Headspace : Guide du sommeil":0,"Chef's Table":0,"Le Jeu de la dame":12,"Adolescence":16,"Death Note":12,"Cyberpunk: Edgerunners":18,"Blue Eye Samurai":18,"Castlevania":16,"Violet Evergarden":10,"Le Voyage de Chihiro":6,"Mon voisin Totoro":0,"Le Château ambulant":6,"Kiki la petite sorcière":0,"Glass Onion":12,"Don't Look Up":12,"Nimona":6,"Klaus":0,"Extraction":16,
"The Mandalorian":10,"Andor":12,"Loki":10,"The Bear":16,"Only Murders in the Building":12,"Shōgun":16,"How I Met Your Mother":10,"Modern Family":6,"Les Simpson":10,"Grey's Anatomy":12,"Percy Jackson":10,"Secrets des baleines":0,"Là-haut":0,"Vice-Versa 2":0,"Soul":0,"Coco":6,"WALL-E":0,"Encanto":0,"Avatar : la voie de l'eau":10,"Les Gardiens de la Galaxie":12,"Avengers: Endgame":12,"Deadpool & Wolverine":16,"Alien: Romulus":16,"Pauvres Créatures":16,
"Frieren":10,"Jujutsu Kaisen":16,"Demon Slayer":12,"Solo Leveling":16,"Spy x Family":10,"Chainsaw Man":16,"Dan Da Dan":16,"One Piece":10,"L'Attaque des Titans":16,"Mob Psycho 100":12,"Horimiya":12,"Kaguya-sama: Love is War":12,"My Dress-Up Darling":16,"Laid-Back Camp":0,"Mushishi":10,"Les Carnets de l'apothicaire":12,"Kaiju No. 8":12,"Haikyu!!":6,"Blue Lock":10,"Vinland Saga":16,"Jujutsu Kaisen 0":12,
"Le Bureau des Légendes":16,"Baron Noir":12,"Paris Police 1900":16,"Engrenages":16,"Hippocrate":12,"Validé":12,"The Boys":18,"Fallout":16,"Invincible":16,"Reacher":16,"LOL : qui rit, sort !":12,"Severance":16,"Ted Lasso":12,"Slow Horses":16,
"Demon Slayer : La Forteresse Infinie":12,"Unabomber":16,"JoJo's Bizarre Adventure : Steel Ball Run":12,"American Horror Story":16,"The Drop : une saga Snowfall":16,"The Love Hypothesis":12,"Until Dawn":16,"Brothers":12,"Hurlevent":12,"Nuremberg":12,"Overgeared":12,"Mononoké, chapitre III : La Malédiction du serpent":12,"Le Problème final":12};
function guessAge(g){ if(g.includes("horreur")) return 16; if(g.includes("famille")) return 0; if(g.includes("thriller")||g.includes("policier")) return 12; if(g.includes("animation")) return 6; return 10; }
const openRes=new Set();
const moreLink=t=>`<a class="more" href="https://www.allocine.fr/rechercher/?q=${encodeURIComponent(t.n)}" target="_blank" rel="noopener">Plus d'infos sur AlloCiné ↗</a>`;
function synBlock(t){
  const kind=t.t==="film"?`Film de ${fmt(t.d)}`:`${t.t==="anime"?"Anime":"Série"}, épisodes de ${t.d} min`;
  const moods=t.m.map(m=>MOODS[m]).join(", ");
  return `<div class="syn" id="syn-${hash(t.id).toString().slice(2)}">
    ${t.res?`<p class="syntxt">${esc(t.res)}</p>`:`<p class="syntxt none">Pas encore de résumé pour ce titre.</p>`}
    <div class="synfacts"><span>${kind}</span><span>${ageTxt(t.age)}</span><span>Ambiance : ${moods}</span></div>
    ${moreLink(t)}
  </div>`;
}
const ageTxt=a=>a<=0?"tous publics":`dès ${a} ans`;
function mkTitle([n,p,t,g,d,i,m,x],src){
  x=x||{}; const gg=[...g];
  if(t==="anime"||x.anime) gg.unshift("anime");
  if(x.a) gg.unshift("animation");
  const G=[...new Set(gg)];
  return {n,p,t,g:G,d,i,m,big:!!x.big,nw:x.nw||null,src,id:n,age:x.age??AGE[n]??guessAge(G),res:x.res||RES[n]||null};
}
let C=[], IDX=new Map();
function buildCatalog(){
  const gone=new Set(RETIRES);
  const base=BASE.map(r=>mkTitle(r,"base"));
  const names=new Set(base.map(t=>t.n));
  const auto=AUTO.filter(r=>!names.has(r[0])).map(r=>mkTitle(r,"auto"));
  const custom=(S.custom||[]).map(u=>{ const g=[...new Set([...(u.t==="anime"?["anime"]:[]),...u.g])]; return {...u,src:"custom",id:"u:"+u.n,g,age:u.age??guessAge(g),res:u.res||RES[u.n]||null}; });
  C=[...base,...auto].filter(t=>!gone.has(t.n)).concat(custom);
  IDX=new Map(C.map((t,i)=>[t.id,i]));
  $("aList").innerHTML=C.map(t=>`<option value="${esc(t.n)}"></option>`).join("");
}
const T=id=>C[IDX.get(id)];
const tIdx=id=>IDX.has(id)?IDX.get(id):-1;

const CTX = {
  train:{l:"Train",s:"trajet, casque",time:120,energy:2,screen:"phone",moods:{rire:1,epic:1,feel:.8,chill:.3},types:{serie:.8,anime:1,film:.2},tip:"<b>Télécharge avant de partir</b> : les tunnels et les zones blanches coupent le réseau. Les épisodes courts sont faciles à caler entre deux gares."},
  avion:{l:"Avion",s:"long vol, hors-ligne",time:240,energy:2,screen:"phone",moods:{epic:1,feel:1,rire:.8,frisson:-.6},types:{film:1,serie:.5,anime:.5},tip:"<b>Hors-ligne obligatoire</b> : télécharge en Wi-Fi la veille. Sur Disney+, l'offre avec pub ne permet pas le téléchargement ; sur Crunchyroll, il faut Mega Fan ou plus."},
  sieste:{l:"Sieste",s:"aprèm, à la maison",time:40,energy:0,screen:"tablet",moods:{chill:1.6,cosy:1.5,frisson:-2.2,epic:-1},types:{serie:.6,anime:.6,film:-.5},maxI:1,tip:"<b>Du calme, rien à rater</b> : un truc doux que tu peux lâcher en t'endormant sans perdre le fil."},
  amoureux:{l:"En amoureux",s:"soirée à deux",time:130,energy:1,screen:"tv",moods:{romance:1.6,feel:1,rire:.8,frisson:.3,cosy:.4},types:{film:1.2,serie:.2,anime:.1},tip:"<b>Un film complet</b> vaut souvent mieux qu'une série : pas de débat sur « encore un épisode ». Active le mode à deux pour tenir compte de ses goûts."},
  famille:{l:"En famille",s:"tous ensemble, télé",time:110,energy:1,screen:"tv",moods:{feel:1.4,rire:1.2,cosy:.8,epic:.7,frisson:-1.2,romance:-.4,reflexion:-.2},types:{film:1.2,serie:.3,anime:.3},tip:"<b>Adapté à tout le monde</b> : l'appli écarte ce qui est déconseillé au plus jeune de la famille. Règle les âges dans « Famille » juste au-dessus."},
  potes:{l:"Entre potes",s:"soirée, canapé",time:150,energy:2,screen:"tv",moods:{rire:1.5,frisson:1,epic:1,reflexion:-.6},types:{film:1,serie:.2,anime:.3},tip:"<b>Ça doit se suivre en parlant</b> : action, rire ou frissons. Pas d'accord ? Lance un vote entre potes."},
  repas:{l:"Pendant le repas",s:"déj, 20–30 min",time:30,energy:1,screen:"tablet",moods:{rire:1.5,cosy:1,frisson:-1},types:{serie:1,anime:1,film:-1.5},maxI:2,tip:"<b>Format court et léger</b> : un épisode de 20–30 min, facile à suivre en mangeant."},
  tranquille:{l:"Soirée tranquille",s:"seul, canapé",time:110,energy:1,screen:"tv",moods:{feel:.8,rire:.8,epic:.7,reflexion:.4},types:{film:.6,serie:.8,anime:.8},tip:"<b>Soirée pour toi</b> : bon moment pour avancer une série en cours ou tester un film de ta liste « À voir plus tard »."},
  nuit:{l:"Tard le soir",s:"au lit, pas sommeil",time:45,energy:0,screen:"phone",moods:{chill:1.2,cosy:1.2,feel:.6,frisson:-1.6,epic:-.4},types:{serie:.6,anime:.8,film:-.3},maxI:2,tip:"<b>Pas trop de suspense</b> : sinon c'est « encore un » jusqu'à 3 h du matin."},
  binge:{l:"Dimanche binge",s:"pluie, plaid",time:300,energy:2,screen:"tv",moods:{epic:1,cosy:1,reflexion:.6,feel:.6},types:{serie:1.2,anime:1.2,film:.2},tip:"<b>Le moment de lancer une saison entière</b> : c'est le jour pour les séries qui demandent de l'attention."}
};
const ENERGY = ["Crevé","Tranquille","En forme","À fond"];
const SCREENS = {phone:"Téléphone",tablet:"Tablette / PC",tv:"Télé"};
const JOURS=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];

function autoCtx(d){
  const day=d.getDay(), h=d.getHours()+d.getMinutes()/60, we=day===0||day===6;
  if(h<6||h>=23.5) return "nuit";
  if(!we&&((h>=6.5&&h<9.5)||(h>=17&&h<19))) return "train";
  if(h>=11.5&&h<14) return "repas";
  if(h>=14&&h<17.5) return day===0?"binge":"sieste";
  if(day===0&&h>=9.5&&h<19) return "binge";
  if(h>=19&&(day===5||day===6)) return "potes";
  return "tranquille";
}

const KEY="zappeur.v1";
const DEFAULT = ()=>({
  plats:{netflix:true,disney:true,crunchy:true,canal:true,prime:false,apple:false},
  g:{anime:2,action:1,comedie:1,sf:1}, gSample:true,
  m:{}, ctxL:{}, seen:{}, watching:{}, ratings:{}, wish:{}, custom:[],
  ctx:"train", time:120, energy:2, screen:"phone", humeur:"none", auto:true,
  duo:{on:false,name:"",g:{}}, dl:{}, fam:[{n:"Moi",age:30}]
});
let S; try{ S=JSON.parse(localStorage.getItem(KEY))||DEFAULT(); }catch(e){ S=DEFAULT(); }
S=Object.assign(DEFAULT(),S); if(!Array.isArray(S.fam)||!S.fam.length) S.fam=[{n:"Moi",age:30}]; S.duo=Object.assign({on:false,name:"",g:{}},S.duo);
let seed=1, later=new Set();
const save=()=>{ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} };
const $=id=>document.getElementById(id);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function hash(s){let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}return (h>>>0)%1000/1000;}
const fmt=m=>m>=60?`${Math.floor(m/60)} h${m%60?String(m%60).padStart(2,"0"):""}`:`${m} min`;
const daysSince=iso=>iso?(Date.now()-new Date(iso+"T12:00:00").getTime())/864e5:999;
const isNew=t=>t.nw&&daysSince(t.nw)<=21;
const platOn=p=>p==="autre"||!!S.plats[p];
const openLink=t=>`<a class="open" href="${(SEARCH[t.p]||SEARCH.autre)(encodeURIComponent(t.n))}" target="_blank" rel="noopener">Ouvrir sur ${PLATS[t.p].n} ↗</a>`;

const youngest=()=>Math.min(...S.fam.map(f=>f.age));
const inFam=()=>S.ctx==="famille";
let autoNote="";
if(S.auto){ const now=new Date(), c=autoCtx(now); S.ctx=c; S.time=CTX[c].time; S.energy=CTX[c].energy; S.screen=CTX[c].screen;
  autoNote=`${JOURS[now.getDay()]} ${now.getHours()} h ${String(now.getMinutes()).padStart(2,"0")} → <b>${CTX[c].l}</b>`; }

/* ---------- algo ---------- */
function score(t){
  const c=CTX[S.ctx], H=HUMEURS[S.humeur]||HUMEURS.none; let s=0; const r=[];
  let gBest=null,gWorst=null;
  for(const g of t.g){ const w=S.g[g]||0; s+=w*.9; if(w>=1.5&&!gBest) gBest=g; if(w<=-1.5&&!gWorst) gWorst=g; }
  // à deux
  if(S.duo.on){
    let both=null, no=null;
    for(const g of t.g){ const pw=S.duo.g[g]||0; s+=pw*.8; if(pw<=-1.5){ s-=1; if(!no) no=g; } if(pw>=1.5&&(S.g[g]||0)>=1.5&&!both) both=g; }
    const nm=S.duo.name||"l'autre";
    if(both) { r.push(["pos",`vous aimez tous les deux : ${GENRES[both].toLowerCase()}`]); gBest=null; }
    if(no) r.push(["neg",`${nm} n'aime pas trop : ${GENRES[no].toLowerCase()}`]);
  }
  if(gBest) r.push(["pos",`tu aimes : ${GENRES[gBest].toLowerCase()}`]);
  if(gWorst) r.push(["neg",`${GENRES[gWorst].toLowerCase()}, pas trop ton truc`]);
  const learned=S.ctxL[S.ctx]||{}; let mBest=null,mv=0, hHit=null;
  for(const m of t.m){
    const hv=(H.m[m]||0)*1.2;
    const v=(c.moods[m]||0)*1.1+hv+(learned[m]||0)*.7+(S.m[m]||0)*.4;
    s+=v; if(v>mv){mv=v;mBest=m;} if(hv>=1.5) hHit=m;
    if((c.moods[m]||0)+(H.m[m]||0)<=-1) r.push(["neg",`${MOODS[m]}, pas idéal là`]);
  }
  if(hHit) r.push(["pos",`colle à ton humeur : ${MOODS[hHit]}`]);
  else if(mBest&&mv>=.8) r.push(["pos",`${MOODS[mBest]}${(learned[mBest]||0)>=.5?" (tu kiffes ça ici)":""}`]);
  s+=c.types[t.t]||0;
  if(t.t==="film"){
    if(t.d<=S.time){ s+=1; r.push(["pos",`${fmt(t.d)}, ça tient`]); }
    else { const o=t.d-S.time; s-=o/25; if(o>10) r.push(["neg",`dépasse de ${fmt(o)}`]); }
  } else {
    if(t.d<=S.time){ const n=Math.floor(S.time/t.d); s+=.8+(n>=2?.3:0); r.push(["pos",n>=2?`${Math.min(n,99)} épisodes dans ton temps`:`1 épisode pile`]); }
    else { s-=1.6; r.push(["neg","épisode trop long"]); }
  }
  const en=S.energy;
  if(t.i>en+1){ s-=(t.i-en-1)*1.5; r.push(["neg","demande de la concentration"]); }
  else if(en===0&&t.i===1){ s+=.5; }
  if(c.maxI&&t.i>c.maxI) s-=1.4;
  if(t.big&&S.screen==="phone"){ s-=.7; r.push(["neg","mieux sur grand écran"]); }
  if(t.big&&S.screen==="tv"){ s+=.5; r.push(["pos","à voir en grand"]); }
  if(inFam()){ const y=youngest();
    if(y<16) r.unshift(["pos",`OK pour tous : ${ageTxt(t.age)}`]);
    if(y<10){ if(t.g.includes("famille")) s+=1.5; if(t.g.includes("animation")) s+=1; if(t.g.includes("docu")) s+=.4; if(t.i>=3) s-=1; }
    else if(y<14){ ["aventure","comedie","famille"].forEach(g=>{ if(t.g.includes(g)) s+=.5; }); }
  }
  const pb=potesBoost(t);
  if(pb){ if(pb.avg>=4){ s+=.8+.2*pb.fans.length; r.unshift(["pos",`${pb.fans.slice(0,2).join(" et ")}${pb.fans.length>2?" et d'autres":""} ${pb.fans.length>1?"ont":"a"} adoré`]); } else if(pb.avg<=2.5){ s-=.6; r.push(["neg","tes potes n'ont pas aimé"]); } }
  if(S.wish[t.id]){ s+=1.2; r.unshift(["pos","dans ta liste À voir"]); }
  if(isNew(t)){ s+=.4; r.push(["pos","nouveauté"]); }
  s+=hash(t.id+seed)*.9;
  return {s,r};
}
function ranked(){
  const y=inFam()?youngest():99;
  return C.filter(t=>platOn(t.p)&&!S.seen[t.id]&&!S.watching[t.id]&&!later.has(S.ctx+"|"+t.id)&&t.age<=y)
    .map(t=>({t,...score(t)})).sort((a,b)=>b.s-a.s);
}
const pctOf=s=>Math.round(100/(1+Math.exp(-(s-2.5)/2.2)));

/* ---------- rendu : réglages ---------- */
function renderPlats(){
  $("plats").innerHTML=SUBS.map(k=>{const p=PLATS[k];return `<button class="plat" data-p="${k}" aria-pressed="${!!S.plats[k]}"><span class="dot" style="background:${p.c}"></span>${p.n}</button>`;}).join("");
}
function renderCtx(){
  $("autoBtn").setAttribute("aria-pressed",S.auto);
  $("autoInfo").innerHTML=S.auto&&autoNote?`Choisi d'après l'heure : ${autoNote}`:"";
  $("ctxs").innerHTML=Object.entries(CTX).map(([k,c],i)=>`<button class="ctx" data-c="${k}" aria-pressed="${S.ctx===k}" aria-keyshortcuts="${(i+1)%10}"><span class="ch">CH ${String(i+1).padStart(2,"0")}</span><b>${c.l}</b><small>${c.s}</small></button>`).join("");
  $("time").value=S.time; $("timeOut").textContent=fmt(+S.time);
  $("energy").innerHTML=ENERGY.map((e,i)=>`<button data-e="${i}" aria-pressed="${S.energy===i}">${e}</button>`).join("");
  $("screen").innerHTML=Object.entries(SCREENS).map(([k,v])=>`<button data-scr="${k}" aria-pressed="${S.screen===k}">${v}</button>`).join("");
  $("humeur").innerHTML=Object.entries(HUMEURS).map(([k,h])=>`<button data-h="${k}" aria-pressed="${S.humeur===k}">${h.l}</button>`).join("");
  $("duoBtn").setAttribute("aria-pressed",S.duo.on);
  $("duoTxt").textContent=S.duo.on?`À deux avec ${S.duo.name||"quelqu'un"}`:"Mode à deux";
  $("sv-time").textContent=fmt(+S.time); $("sv-energy").textContent=ENERGY[S.energy]; $("sv-screen").textContent=SCREENS[S.screen];
  $("sv-humeur").textContent=HUMEURS[S.humeur].l; $("sv-duo").textContent=S.duo.on?`Avec ${S.duo.name||"quelqu'un"}`:"Désactivé";
  const fam=inFam(); document.querySelector('[data-set="fam"]').hidden=!fam; document.querySelector('[data-set="duo"]').hidden=fam;
  if(!fam&&SET==="fam") openSet(null); if(fam&&SET==="duo") openSet(null);
  $("sv-fam").textContent=`${S.fam.length} pers. · ${ageTxt(youngest())}`;
  renderFam();
}

function renderFam(){
  const y=youngest();
  $("famList").innerHTML=S.fam.map((f,i)=>`<div class="famrow"><span class="famname">${esc(f.n||"Membre "+(i+1))}</span>
    <span class="famage"><button class="mini" data-fage="${i}" data-d="-1" aria-label="Moins un an">−</button><b class="mono">${f.age} ans</b><button class="mini" data-fage="${i}" data-d="1" aria-label="Plus un an">+</button></span>
    ${S.fam.length>1?`<button class="jdel" data-frm="${i}">Retirer</button>`:"<span></span>"}</div>`).join("");
  const n=C.filter(t=>platOn(t.p)&&t.age<=y).length;
  $("famInfo").innerHTML=`Le plus jeune a <b>${y} an${y>1?"s":""}</b> : l'appli ne propose que des titres adaptés à cet âge (${n} titres dispo avec tes abonnements).`;
}

/* ---------- rendu : suggestions ---------- */
function renderList(){
  const c=CTX[S.ctx];
  $("resTitle").textContent=`${c.l} · ${fmt(+S.time)}`;
  $("tip").innerHTML=c.tip+(S.humeur!=="none"?` Humeur : <b>${HUMEURS[S.humeur].l.toLowerCase()}</b>.`:"");
  const recs=ranked().slice(0,6);
  if(!recs.length){ $("list").innerHTML=`<div class="empty">Plus rien à proposer avec ces abonnements. Active une plateforme ou ajoute un titre.</div>`; renderProg(); return; }
  $("list").innerHTML=recs.map((x,i)=>{
    const t=x.t, p=PLATS[t.p], pct=pctOf(x.s);
    const kind=t.t==="film"?`Film · ${fmt(t.d)}`:`${t.t==="anime"?"Anime":"Série"} · ${t.d} min / ép.`;
    const why=x.r.slice(0,5).map(([k,v])=>`<span class="${k}">${esc(v)}</span>`).join("");
    const w=!!S.wish[t.id];
    return `<article class="card${i===0?" top":""}">
      <div class="rank mono">${i+1}</div>
      <div>
        <div class="ctitle"><h3>${esc(t.n)}</h3>${isNew(t)?`<span class="badge">Nouveau</span>`:""}${w?`<span class="badge wish">À voir</span>`:""}</div>
        <div class="meta"><span class="pl"><span class="dot" style="background:${p.c}"></span>${p.n}</span><span>${kind}</span><span>${t.g.filter(g=>g!=="anime"&&g!=="animation").slice(0,2).map(g=>GENRES[g]).join(", ")}</span><span class="agetag" title="Âge conseillé">${t.age<=0?"Tous publics":t.age+" ans +"}</span></div>
        <div class="match"><div class="bar"><i style="width:${pct}%"></i></div><span class="mono" style="font-size:12.5px">${pct}% ${inFam()?"pour la famille":S.duo.on?"pour vous deux":"pour toi"}</span></div>
        ${(()=>{const pb=potesBoost(t);return pb?`<div class="potesline"><span class="jmeta">Tes potes :</span>${pb.list.map(x=>`<span class="pchip">${avatar(x.who,20)}${x.n}★</span>`).join("")}</div>`:"";})()}
        <div class="why">${why}</div>
        ${openRes.has(t.id)?synBlock(t):""}
      </div>
      <div class="acts">
        <button class="watch" data-a="watch" data-id="${esc(t.id)}">Je regarde</button>
        <button class="resb" data-res="${esc(t.id)}" aria-expanded="${openRes.has(t.id)}">${openRes.has(t.id)?"Masquer le résumé":"Résumé"}</button>
        <button class="wishb" data-a="wish" data-id="${esc(t.id)}" aria-pressed="${w}">${w?"Dans ma liste":"+ À voir plus tard"}</button>
        <button class="recob" data-reco="${esc(t.id)}">Conseiller</button>
        <button class="later" data-a="later" data-id="${esc(t.id)}">Pas pour moi</button>
        ${openLink(t)}
      </div>
    </article>`;
  }).join("");
  renderProg();
}

/* ---------- programme de trajet ---------- */
let progSeed=0;
function buildPlan(){
  let rem=S.time; const plan=[];
  const resume=Object.entries(S.watching).map(([id,w])=>({t:T(id),w})).filter(x=>x.t&&x.t.t!=="film"&&platOn(x.t.p));
  const pool=ranked().slice(progSeed%3, 20+progSeed%3).map(x=>({t:x.t}));
  if(S.ctx==="avion"||S.time>=200){ const fi=pool.findIndex(x=>x.t.t==="film"&&x.t.d<=S.time*.7); if(fi>0) pool.unshift(pool.splice(fi,1)[0]); }
  for(const c of [...resume,...pool]){
    if(plan.length>=3||rem<18) break;
    const t=c.t;
    if(plan.some(p=>p.t.id===t.id)) continue;
    if(t.t==="film"){ if(t.d<=rem){ plan.push({t,n:1,min:t.d}); rem-=t.d; } }
    else { let n=Math.min(Math.floor(rem/t.d), c.w?6:4, Math.max(1,Math.floor(S.time*.45/t.d))); if(n>=1){ plan.push({t,n,min:n*t.d,resume:c.w}); rem-=n*t.d; } }
  }
  return plan;
}
function renderProg(){
  const plan=buildPlan(), tot=plan.reduce((a,p)=>a+p.min,0), off=["train","avion"].includes(S.ctx);
  const show=S.time>=60&&plan.length>0;
  $("progTab").hidden=!show; $("progTab").textContent=off?"Programme du trajet":"Programme";
  if(!show){ if(VIEW==="prog") showView("sugg"); return; }
  $("progZone").innerHTML=`<div class="reshead"><h3>Ton programme pour ${fmt(+S.time)}</h3><button class="ghost" id="progShuffle">Autre programme</button></div>
    <div class="tl" aria-hidden="true">${plan.map(p=>`<span style="width:${p.min/S.time*100}%;background:${PLATS[p.t.p].c}">${esc(p.t.n)}</span>`).join("")}</div>
    <div class="jmeta" style="font-size:12.5px">${fmt(tot)} de visionnage, ${fmt(Math.max(0,S.time-tot))} de marge.${off?" Coche chaque titre une fois téléchargé.":""}</div>
    <ul class="pitems">${plan.map((p,i)=>{
      const w=p.resume, lab=p.t.t==="film"?`${esc(p.t.n)} <span class="jmeta">film</span>`:`${esc(p.t.n)} <span class="jmeta">${p.n} ép.${w?` à partir de S${w.s} ép. ${w.e}`:""}</span>`;
      const k="dl-"+p.t.id, done=!!S.dl[k];
      return `<li class="${off&&done?"done":""}">${off?`<input type="checkbox" id="dl${i}" data-dl="${esc(k)}" ${done?"checked":""}>`:`<span class="mono">${i+1}</span>`}<label ${off?`for="dl${i}"`:""}>${lab}</label><span class="mono">${fmt(p.min)} · ${PLATS[p.t.p].n}</span></li>`;
    }).join("")}</ul>`;
}

/* ---------- en cours + épisodes ---------- */
const STAR_TXT=["","Nul","Bof","Correct","Très bien","Coup de cœur"];
const draft={};
const STAR_PATH='<path d="M12 3.2l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8z"/>';
const starIcon=on=>`<svg class="st${on?" on":""}" viewBox="0 0 24 24" aria-hidden="true">${STAR_PATH}</svg>`;
const starStr=n=>`<span class="srow" role="img" aria-label="${n} sur 5">${[1,2,3,4,5].map(i=>starIcon(i<=n)).join("")}</span>`;
let popStar=0;
const starPicker=(n,attr,extra="")=>{ const p=popStar; popStar=0; return `<div class="picker" role="radiogroup" aria-label="Note sur 5">${[1,2,3,4,5].map(i=>`<button role="radio" aria-checked="${i===n}" ${attr}="${i}" ${extra} class="pk${i<=n?" on":""}${i===p?" pop":""}" aria-label="${i} étoile${i>1?"s":""}, ${STAR_TXT[i]}"><svg viewBox="0 0 24 24" aria-hidden="true">${STAR_PATH}</svg></button>`).join("")}<span class="pkhint${n?" set":""}">${n?STAR_TXT[n]:"Touche une étoile"}</span></div>`; };
const dFmt=ts=>new Date(ts).toLocaleDateString("fr-FR",{day:"numeric",month:"short"});
function renderNow(){
  const ids=Object.keys(S.watching).filter(id=>tIdx(id)>=0);
  ids.sort((a,b)=>{const fa=T(a).d<=S.time?0:1, fb=T(b).d<=S.time?0:1; return fa-fb;});
  $("nowEmpty").hidden=!!ids.length; $("nowCount").textContent=ids.length?`${ids.length} titre${ids.length>1?"s":""}`:"";
  $("cSeries").hidden=!ids.length; $("cSeries").textContent=ids.length;
  const best=ids.map(id=>T(id)).find(t=>t.t!=="film"&&t.d<=S.time&&platOn(t.p));
  if(best){ const w=S.watching[best.id], n=Math.floor(S.time/best.d); $("resume").hidden=false;
    $("resume").innerHTML=`<span class="label">Reprendre</span><b>${esc(best.n)}</b><span class="mono">S${w.s||1} · ép. ${w.e||1}</span><span class="fit">${n} ép. tiennent dans tes ${fmt(+S.time)}</span><span class="go">Mes séries →</span>`; }
  else $("resume").hidden=true;
  $("now").innerHTML=ids.map(id=>{
    const t=T(id), w=S.watching[id], p=PLATS[t.p], d=draft[id]||{}, k=tIdx(id);
    let epHtml="";
    if(t.t!=="film"){
      w.s=w.s||1; w.e=w.e||1;
      const n=Math.floor(S.time/t.d);
      epHtml=`<div class="ep">
        <span class="epnum mono">S${w.s} · ép. ${w.e}</span>
        <button class="mini" data-ep="1" data-id="${esc(id)}">+1 épisode vu</button>
        <button class="mini" data-ep="-1" data-id="${esc(id)}" aria-label="Épisode précédent">−1</button>
        <button class="mini" data-season="1" data-id="${esc(id)}">Saison suivante</button>
        <label class="eptot">sur <input type="number" min="1" max="2000" id="tot${k}" data-tot="${esc(id)}" value="${w.tot||""}" placeholder="?"> ép.</label>
        <span class="fit${n>=1?"":" no"}">${n>=1?`▶ ${n} ép. tiennent dans tes ${fmt(+S.time)}`:"épisode plus long que ton temps"}</span>
      </div>${w.tot?`<div class="pbar"><i style="width:${clamp((w.e-1)/w.tot*100,0,100)}%"></i></div>`:""}`;
    }
    let body;
    if(d.open){
      const n=d.n||0;
      body=`<div class="rate">
        ${starPicker(n,"data-star",`data-id="${esc(id)}"`)}
        <textarea id="com${k}" data-com="${esc(id)}" placeholder="Ton avis en quelques mots (facultatif)…">${esc(d.com||"")}</textarea>
        <label class="pubtog"><input type="checkbox" id="pub${k}" data-pub="${esc(id)}" ${(d.pub??S.me.shareDefault)?"checked":""}> Visible par mes potes</label>
        <div class="row"><button class="btn primary" data-save="${esc(id)}">Enregistrer ma note</button><button class="btn" data-cancel="${esc(id)}">Plus tard</button></div>
      </div>`;
    } else {
      body=`<div class="row"><button class="btn primary" data-finish="${esc(id)}">${t.t==="film"?"Je l'ai vu, je note":"J'ai fini, je note"}</button><button class="btn" data-drop="${esc(id)}">Retirer</button></div>`;
    }
    return `<div class="wcard">
      <div class="wtop"><div><span class="live">En cours</span><h3>${esc(t.n)}</h3></div>
      <div class="meta"><span class="pl"><span class="dot" style="background:${p.c}"></span>${p.n}</span><span>lancé en mode ${CTX[w.ctx]?.l.toLowerCase()||"?"}, le ${dFmt(w.at)}</span></div></div>
      ${epHtml}${body}</div>`;
  }).join("");
}

/* ---------- à voir plus tard ---------- */
function renderWish(){
  const ids=Object.keys(S.wish).filter(id=>tIdx(id)>=0).sort((a,b)=>S.wish[b]-S.wish[a]);
  $("wishCount").textContent=ids.length?`${ids.length} titre${ids.length>1?"s":""}`:"";
  $("wish").innerHTML=ids.length?ids.map(id=>{
    const t=T(id), fits=t.d<=S.time;
    return `<div class="witem"><div class="jhead"><b>${esc(t.n)}</b><span class="jmeta">${PLATS[t.p].n}</span></div>
      <div class="jmeta">${t.t==="film"?`film · ${fmt(t.d)}`:`${t.d} min / ép.`} · ${fits?`<span class="fit">tient dans ton temps</span>`:"trop long pour maintenant"}${platOn(t.p)?"":" · plateforme désactivée"}</div>
      <details class="wsyn"><summary>Résumé</summary>${synBlock(t)}</details>
      <div class="row"><button class="btn" data-wwatch="${esc(id)}">Je regarde</button><button class="btn" data-wrm="${esc(id)}">Retirer</button></div></div>`;
  }).join(""):`<p>Vide pour l'instant. Touche « + À voir plus tard » sur une suggestion : l'algo la remontera quand le moment s'y prête.</p>`;
}

/* ---------- goûts, à deux, appris ---------- */
const triState=w=>w>=1?1:w<=-1?-1:0;
function chips(obj,attr){ return Object.entries(GENRES).map(([k,v])=>{const st=triState(obj[k]||0);return `<button class="g" ${attr}="${k}" data-st="${st}" aria-label="${v} : ${st===1?"adore":st===-1?"n'aime pas":"neutre"}">${v}</button>`;}).join(""); }
function renderProfile(){
  $("genres").innerHTML=chips(S.g,"data-g");
  $("profileNote").innerHTML=(S.gSample?"<b>Profil d'exemple</b>, modifie-le. ":"")+"Touche un genre : une fois = j'adore, deux fois = pas pour moi, trois fois = neutre.";
  $("duoGenres").innerHTML=chips(S.duo.g,"data-dg");
  if(document.activeElement!==$("duoName")) $("duoName").value=S.duo.name||"";
  const L=S.ctxL[S.ctx]||{}, c=CTX[S.ctx];
  const rows=Object.keys(MOODS).map(m=>[m,(c.moods[m]||0)+(L[m]||0)+(S.m[m]||0)*.5]);
  $("learn").innerHTML=`<div class="label">Ambiances visées · ${c.l}</div>`+rows.map(([m,v])=>{
    const w=clamp(Math.abs(v)/3,0,1)*50;
    const style=v>=0?`left:50%;width:${w}%;background:var(--good)`:`right:50%;width:${w}%;background:var(--bad)`;
    return `<div class="lrow"><span>${MOODS[m]}</span><div class="lbar"><i style="${style}"></i></div><span class="mono" style="font-size:12px;text-align:right">${v>0?"+":""}${v.toFixed(1)}</span></div>`;
  }).join("");
  const E=Object.entries(L), top=E.sort((a,b)=>b[1]-a[1])[0], low=[...E].sort((a,b)=>a[1]-b[1])[0];
  let ins;
  if(top&&top[1]>=.5) ins=`En mode <b>${c.l.toLowerCase()}</b>, tu reviens souvent vers le <b>${MOODS[top[0]]}</b>.`+(low&&low[1]<=-.5?` Moins de <b>${MOODS[low[0]]}</b>.`:"");
  else if(low&&low[1]<=-.5) ins=`En mode <b>${c.l.toLowerCase()}</b>, tu évites le <b>${MOODS[low[0]]}</b>.`;
  else ins=`Pas encore assez de notes en mode <b>${c.l.toLowerCase()}</b>. Note quelques titres et l'algo s'adapte à ce moment précis.`;
  $("insight").innerHTML=ins;
  const R=Object.values(S.ratings), avg=R.length?(R.reduce((a,r)=>a+r.n,0)/R.length).toFixed(1).replace(".",","):"–";
  $("stats").innerHTML=`<span><b class="mono">${R.length}</b> notés</span><span>moyenne <b class="mono">${avg}</b>/5</span><span><b class="mono">${Object.keys(S.watching).length}</b> en cours</span><span><b class="mono">${(S.custom||[]).length}</b> ajoutés</span>`;
  $("foot").textContent=`Catalogue : ${C.length} titres, mis à jour le ${new Date(CATALOGUE_MAJ+"T12:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})}. Les titres changent de plateforme régulièrement, vérifie la dispo avant de lancer. Tes goûts sont gardés dans ce navigateur uniquement.`;
}

/* ---------- ajout d'un titre ---------- */
const ADEF={film:110,serie:45,anime:24};
let AZ="addZone";
function closeAdd(){ ["addZone","addZone2"].forEach(z=>{ $(z).hidden=true; $(z).innerHTML=""; }); }
function openAdd(mode,zone){
  closeAdd(); AZ=zone; const Z=$(zone);
  Z.hidden=false;
  Z.innerHTML=`<div class="reshead"><h3>${mode==="rate"?"Noter un titre vu ailleurs":"Ajouter un titre"}</h3><button class="ghost" id="addClose">Fermer</button></div>
    <div class="fgrid">
      <div class="field" style="flex:1 1 220px"><label class="label" for="aName">Titre</label><input type="text" id="aName" list="aList" placeholder="Ex. : Blue Box, Dune 2…" maxlength="80"></div>
      <div class="field"><label class="label" for="aPlat">Plateforme</label><select class="inp" id="aPlat">${Object.entries(PLATS).map(([k,p])=>`<option value="${k}">${p.n}</option>`).join("")}</select></div>
      <div class="field"><div class="label">Format</div><div class="seg" id="aType">${Object.entries({film:"Film",serie:"Série",anime:"Anime"}).map(([k,v],i)=>`<button data-atype="${k}" aria-pressed="${i===2}">${v}</button>`).join("")}</div></div>
      <div class="field"><label class="label" for="aDur" id="aDurLab">Durée d'un épisode (min)</label><input type="number" id="aDur" min="3" max="400" value="24" style="width:90px"></div>
      <div class="field"><label class="label" for="aAge">Âge conseillé</label><select class="inp" id="aAge"><option value="">Je ne sais pas</option><option value="0">Tous publics</option><option value="6">6 ans et +</option><option value="10">10 ans et +</option><option value="12">12 ans et +</option><option value="16">16 ans et +</option><option value="18">18 ans et +</option></select></div>
      <div class="field"><div class="label">Attention demandée</div><div class="seg" id="aInt">${["Légère","Normale","Forte"].map((v,i)=>`<button data-ai="${i+1}" aria-pressed="${i===1}">${v}</button>`).join("")}</div></div>
    </div>
    <div class="field" style="display:flex;flex-direction:column;gap:5px"><div class="label">Genres</div><div class="ck" id="aG">${Object.entries(GENRES).filter(([k])=>k!=="anime").map(([k,v])=>`<button data-ag="${k}" aria-pressed="false">${v}</button>`).join("")}</div></div>
    <div class="field" style="display:flex;flex-direction:column;gap:5px"><div class="label">Ambiance</div><div class="ck" id="aM">${Object.entries(MOODS).map(([k,v])=>`<button data-am="${k}" aria-pressed="false">${v}</button>`).join("")}</div></div>
    <div class="jmeta" id="aHint">Si le titre est déjà dans le catalogue, choisis-le dans la liste : les autres champs sont alors inutiles.</div>
    <div class="row">
      ${mode==="rate"?`<button class="btn primary" data-add="rate">Déjà vu, je le note</button><button class="btn" data-add="watch">Je le regarde</button>`:`<button class="btn primary" data-add="watch">Je le regarde</button><button class="btn" data-add="rate">Déjà vu, je le note</button>`}
      <button class="btn" data-add="wish">À voir plus tard</button>
      <button class="btn" data-add="only">Juste l'ajouter</button>
    </div>`;
  $("aName").addEventListener("input",()=>{ const ex=findByName($("aName").value); $("aHint").innerHTML=ex?`<b>${esc(ex.n)}</b> est déjà dans le catalogue (${PLATS[ex.p].n}) : les autres champs sont ignorés.`:"Nouveau titre : renseigne la plateforme, le format, les genres et l'ambiance pour que l'algo sache où le ranger."; });
  $("aName").focus({preventScroll:true});
}
const findByName=n=>{ const q=norm(n.trim()); return q?C.find(t=>norm(t.n)===q):null; };
function submitAdd(action){
  const name=$("aName").value.trim();
  if(!name){ toast("Écris d'abord le titre."); $("aName").focus(); return; }
  let t=findByName(name);
  if(!t){
    const type=document.querySelector("#aType [aria-pressed=true]").dataset.atype;
    const g=[...document.querySelectorAll("#aG [aria-pressed=true]")].map(b=>b.dataset.ag);
    const m=[...document.querySelectorAll("#aM [aria-pressed=true]")].map(b=>b.dataset.am);
    if(!g.length){ toast("Choisis au moins un genre."); return; }
    const u={n:name.slice(0,80),p:$("aPlat").value,t:type,g,d:clamp(+$("aDur").value||ADEF[type],3,400),i:+document.querySelector("#aInt [aria-pressed=true]").dataset.ai,m:m.length?m:["feel"],big:false}; if($("aAge").value!=="") u.age=+$("aAge").value;
    S.custom=(S.custom||[]).filter(x=>norm(x.n)!==norm(u.n)); S.custom.push(u);
    buildCatalog(); t=T("u:"+u.n);
  }
  if(action==="watch"||action==="rate"){ S.watching[t.id]=S.watching[t.id]||{ctx:S.ctx,at:Date.now()}; if(action==="rate") draft[t.id]={open:true}; }
  if(action==="wish") S.wish[t.id]=Date.now();
  save(); closeAdd();
  renderAll();
  toast(action==="rate"?"Donne-lui une note juste au-dessus.":action==="watch"?`${t.n} est en cours.`:action==="wish"?`${t.n} ajouté à ta liste.`:`${t.n} ajouté au catalogue.`);
  if(action==="watch"||action==="rate") showTab("series");
}

/* ---------- vote entre potes ---------- */
let V=null;
function renderVote(){
  const z=$("voteZone"); if(!V){ z.innerHTML=""; return; }
  if(V.step==="setup"){
    z.innerHTML=`<div class="reshead"><h3>Vote entre potes</h3><button class="ghost" data-vclose="1">Fermer</button></div>
      <button class="livepick" data-vlive="1"><span class="livedot" aria-hidden="true"></span><span><b>Vote en direct</b><small>Chacun vote sur son téléphone, les résultats s'affichent en direct chez tout le monde.</small></span><i aria-hidden="true">→</i></button>
      <div class="label">Ou sur ce téléphone</div>
      <p class="jmeta" style="font-size:13.5px;margin:0">L'algo garde les 5 meilleures idées du moment. Chacun vote à son tour sur ce téléphone : « partant » vaut 1 point, « mon préféré » en vaut 2.</p>
      <div class="row" style="align-items:center"><input type="text" id="vName" placeholder="Prénom" maxlength="20" style="width:160px"><button class="btn" data-vadd="1">Ajouter</button></div>
      <div class="names">${V.names.map((n,i)=>`<span>${esc(n)}<button data-vrm="${i}" aria-label="Retirer ${esc(n)}">×</button></span>`).join("")||`<span style="background:transparent;padding-left:0;color:var(--muted)">Ajoute au moins 2 personnes.</span>`}</div>
      <div class="jmeta">Au vote : ${V.cand.map(id=>esc(T(id).n)).join(" · ")}</div>
      <div class="row"><button class="btn primary" data-vstart="1" ${V.names.length<2?"disabled":""}>Commencer le vote (${V.names.length})</button></div>`;
    const inp=$("vName"); inp.addEventListener("keydown",e=>{ if(e.key==="Enter"){ e.preventDefault(); addVoter(); } });
  } else if(V.step==="vote"){
    const who=V.names[V.i], b=V.ballot;
    z.innerHTML=`<div class="reshead"><h3>Au tour de ${esc(who)}</h3><span class="label">${V.i+1} / ${V.names.length}</span></div>
      <p class="jmeta" style="font-size:13.5px;margin:0">Passe le téléphone à ${esc(who)}. Les votes des autres restent cachés.</p>
      <div>${V.cand.map(id=>{const t=T(id);return `<div class="vrow"><div><b>${esc(t.n)}</b><div class="jmeta">${PLATS[t.p].n} · ${t.t==="film"?fmt(t.d):t.d+" min / ép."}</div></div>
        <button class="ok" data-vok="${esc(id)}" aria-pressed="${b.ok.has(id)}">Partant</button>
        <button class="fv" data-vfav="${esc(id)}" aria-pressed="${b.fav===id}">★ Mon préféré</button></div>`;}).join("")}</div>
      <div class="row"><button class="btn primary" data-vnext="1">${V.i+1<V.names.length?"Valider et passer":"Valider et voir le résultat"}</button></div>`;
  } else {
    const pts=V.cand.map(id=>[id,V.votes.reduce((a,v)=>a+(v.fav===id?2:v.ok.has(id)?1:0),0)]).sort((a,b)=>b[1]-a[1]);
    const mx=Math.max(pts[0][1],1), win=pts[0][1]>0?pts.filter(p=>p[1]===pts[0][1]):[];
    z.innerHTML=`<div class="reshead"><h3>${win.length===1?`Gagnant : ${esc(T(win[0][0]).n)}`:win.length>1?"Égalité !":"Personne n'est partant"}</h3><button class="ghost" data-vclose="1">Fermer</button></div>
      <div style="display:flex;flex-direction:column;gap:6px">${pts.map(([id,p])=>`<div class="vres${win.some(w=>w[0]===id)?" win":""}"><b>${esc(T(id).n)}</b><div class="dbar"><i style="width:${p/mx*100}%;background:var(--accent)"></i></div><span class="mono">${p}</span></div>`).join("")}</div>
      <div class="row">${win.length===1?`<button class="btn primary" data-vwatch="${esc(win[0][0])}">On regarde ça</button>`:""}${win.length>1?`<button class="btn primary" data-vtie="1">Départager au hasard</button>`:""}<button class="btn" data-vagain="1">Nouveau vote</button></div>`;
  }
}
function addVoter(){ const n=$("vName").value.trim(); if(!n) return; if(V.names.length>=12){toast("12 personnes maximum.");return;} V.names.push(n.slice(0,20)); renderVote(); $("vName").focus(); }
function startVote(){ V={step:"setup",names:V?.names||[],cand:ranked().slice(0,5).map(x=>x.t.id),i:0,votes:[]}; renderVote(); }

/* ---------- apprentissage ---------- */
function applyRating(t,n,ctx,sign){
  const k=((n-3)/2)*sign, L=S.ctxL[ctx]=S.ctxL[ctx]||{};
  t.g.forEach(g=>S.g[g]=clamp((S.g[g]||0)+k*.7,-3,3));
  t.m.forEach(m=>{S.m[m]=clamp((S.m[m]||0)+k*.4,-3,3); L[m]=clamp((L[m]||0)+k*.7,-3,3);});
}
function saveRating(id){
  const t=T(id), d=draft[id]||{};
  if(!d.n){ toast("Choisis d'abord une note en étoiles."); return; }
  const w=S.watching[id]||{}, ctx=w.ctx||S.ctx;
  if(S.ratings[id]) applyRating(t,S.ratings[id].n,S.ratings[id].ctx,-1);
  applyRating(t,d.n,ctx,1);
  const min=t.t==="film"?t.d:Math.max(w.eps||0,1)*t.d;
  S.ratings[id]={n:d.n,com:(d.com||"").trim().slice(0,600),ctx,at:Date.now(),min:(S.ratings[id]?.min||0)+min,pub:d.pub??S.me.shareDefault};
  S.seen[id]=1; delete S.watching[id]; delete S.wish[id]; delete draft[id]; S.gSample=false; save();
  renderAll();
  const g=t.g.filter(x=>x!=="animation").slice(0,2).map(x=>GENRES[x].toLowerCase()).join(" et ");
  toast(d.n>=4?`${d.n}★ noté. Plus de titres ${g} à l'avenir.`:d.n<=2?`${d.n}★ noté. L'algo baisse ce genre de titres.`:`3★ noté.`);
}
function startWatching(id){
  S.watching[id]=S.watching[id]||{ctx:S.ctx,at:Date.now()};
  save(); renderNow(); renderList(); renderWish(); renderProfile();
  toast(`Bon visionnage ! Retrouve-le dans « Mes séries » pour suivre et noter.`);
}

let tt; function toast(m,ms=2400){ const e=$("toast"); e.textContent=m; e.classList.add("on"); clearTimeout(tt); tt=setTimeout(()=>e.classList.remove("on"),ms); }

/* ---------- journal + bilan ---------- */
const JU={q:"",group:"note",sort:"recent",plat:"all",com:"all",star:0};
try{ Object.assign(JU,JSON.parse(localStorage.getItem(KEY+".jui"))||{}); JU.q=""; }catch(e){}
const saveJU=()=>{ try{ localStorage.setItem(KEY+".jui",JSON.stringify({group:JU.group,sort:JU.sort})); }catch(e){} };
let jedit=null, bMonth=null;
const TIERS={5:"Coups de cœur",4:"Très bien",3:"Correct",2:"Bof",1:"À oublier"};
const cap=s=>s[0].toUpperCase()+s.slice(1);
const MONTH=ts=>cap(new Date(ts).toLocaleDateString("fr-FR",{month:"long",year:"numeric"}));
const mKey=ts=>{const d=new Date(ts);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");};
const TYPE_L={film:"Films",serie:"Séries",anime:"Animes"};
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
const avgOf=a=>a.length?a.reduce((x,[,r])=>x+r.n,0)/a.length:0;
const f1=v=>v.toFixed(1).replace(".",",");
const hm=min=>{const h=Math.floor(min/60),m=Math.round(min%60);return h?`${h} h${m?String(m).padStart(2,"0"):""}`:`${m} min`;};

function renderBilan(all){
  if(!all.length){ $("bilanZone").innerHTML=""; return; }
  const months=[...new Set(all.map(([,r])=>mKey(r.at)))].sort().reverse();
  if(!bMonth||!months.includes(bMonth)) bMonth=months[0];
  const L=all.filter(([,r])=>mKey(r.at)===bMonth);
  const mins=L.reduce((a,[id,r])=>a+(r.min||T(id).d),0);
  const top=[...L].sort((a,b)=>b[1].n-a[1].n||b[1].at-a[1].at).slice(0,3);
  const gs={}; L.forEach(([id,r])=>T(id).g.filter(g=>g!=="animation").forEach(g=>gs[g]=(gs[g]||0)+(r.n-2)));
  const gTop=Object.entries(gs).sort((a,b)=>b[1]-a[1])[0];
  const cnt=f=>{const m={};L.forEach(e=>{const k=f(e);m[k]=(m[k]||0)+1;});return Object.entries(m).sort((a,b)=>b[1]-a[1])[0];};
  const cTop=cnt(([,r])=>r.ctx), pTop=cnt(([id])=>T(id).p);
  $("bilanZone").innerHTML=`<div class="bilan">
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="row" style="align-items:center;justify-content:space-between"><h3>Bilan · ${MONTH(L[0][1].at)}</h3>
        <select id="bMonth" aria-label="Mois du bilan">${months.map(k=>`<option value="${k}" ${k===bMonth?"selected":""}>${MONTH(all.find(([,r])=>mKey(r.at)===k)[1].at)}</option>`).join("")}</select></div>
      <div class="bk">
        <div><span class="big mono">${L.length}</span><small>titre${L.length>1?"s":""} vu${L.length>1?"s":""}</small></div>
        <div><span class="big mono">${hm(mins)}</span><small>devant l'écran (estimé)</small></div>
        <div><span class="big mono">${f1(avgOf(L))}</span><small>note moyenne</small></div>
      </div>
      <div class="bline">${gTop&&gTop[1]>0?`Genre du mois : <b>${GENRES[gTop[0]]}</b>. `:""}Moment favori : <b>${CTX[cTop[0]]?.l||"?"}</b>. Plateforme la plus utilisée : <b>${PLATS[pTop[0]].n}</b>.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px"><div class="label">Ton top du mois</div>
      <ol class="btop">${top.map(([id,r],i)=>`<li><span class="r">${i+1}</span><span>${esc(T(id).n)}</span>${starStr(r.n)}</li>`).join("")}</ol>
    </div></div>`;
}
function jCard(id,r){
  const t=T(id);
  if(jedit&&jedit.id===id){
    const n=jedit.n;
    return `<div class="jitem${r.n===5?" fav":""}">
      <div class="jhead"><b>${esc(t.n)}</b></div>
      ${starPicker(n,"data-jstar")}
      <textarea id="jedtxt" placeholder="Ton avis…">${esc(jedit.com||"")}</textarea>
      <div class="row"><button class="btn primary" data-jsave="1">Enregistrer</button><button class="btn" data-jcancel="1">Annuler</button></div>
    </div>`;
  }
  return `<div class="jitem${r.n===5?" fav":""}">
    <div class="jhead"><b>${esc(t.n)}</b>${starStr(r.n)}</div>
    <div class="jmeta">${PLATS[t.p].n} · ${t.t==="film"?"film":t.t==="anime"?"anime":"série"} · vu en mode ${CTX[r.ctx]?.l.toLowerCase()||"?"} · ${dFmt(r.at)}</div>
    ${r.com?`<div class="jcom">« ${esc(r.com)} »</div>`:""}
    ${suiteOf(t)?`<div class="suiteline${suiteOf(t).st==="dispo"?" dispo":""}">${esc(suiteOf(t).txt)}</div>`:""}
    <div class="vis ${isPub(r)?"pub":"priv"}">${isPub(r)?"Visible par tes potes":"Privée, seulement pour toi"}</div>
    <div class="jlinks"><button class="jdel" data-jedit="${esc(id)}">Modifier</button>${r.n>=4?`<button class="jdel" data-reco="${esc(id)}">Conseiller</button>`:""}<button class="jdel" data-jpub="${esc(id)}">${isPub(r)?"Rendre privée":"Partager"}</button><button class="jdel" data-del="${esc(id)}">Supprimer</button></div>
  </div>`;
}
function renderJournal(){
  const all=Object.entries(S.ratings).filter(([id])=>tIdx(id)>=0);
  renderBilan(all);
  $("jcount").textContent=all.length?`${all.length} titre${all.length>1?"s":""} noté${all.length>1?"s":""}`:"";
  const usedPlats=[...new Set(all.map(([id])=>T(id).p))];
  $("jplat").innerHTML=`<option value="all">Toutes</option>`+usedPlats.map(p=>`<option value="${p}">${PLATS[p].n}</option>`).join("");
  if(JU.plat!=="all"&&!usedPlats.includes(JU.plat)) JU.plat="all";
  $("jstarSel").value=String(JU.star); $("jplat").value=JU.plat; $("jgroupSel").value=JU.group; $("jsort").value=JU.sort; $("jcom").value=JU.com;
  if(document.activeElement!==$("jq")) $("jq").value=JU.q;
  if(!all.length){
    $("jsum").innerHTML="";
    $("journal").innerHTML=`<div class="empty">Ton journal est vide. Clique sur « Je regarde » sur une suggestion, puis note-la quand tu as fini. Tu peux aussi noter un titre vu ailleurs.</div>`;
    return;
  }
  const avg=avgOf(all), favs=all.filter(([,r])=>r.n===5).length, withCom=all.filter(([,r])=>r.com).length;
  const by=(keyFn)=>{const m={};all.forEach(e=>{const k=keyFn(e);(m[k]=m[k]||[]).push(e);});return Object.entries(m).map(([k,a])=>[k,avgOf(a),a.length]).sort((a,b)=>b[1]-a[1]||b[2]-a[2]);};
  const bp=by(([id])=>T(id).p)[0], bc=by(([,r])=>r.ctx)[0];
  const cnt=[5,4,3,2,1].map(n=>[n,all.filter(([,r])=>r.n===n).length]); const mx=Math.max(...cnt.map(c=>c[1]),1);
  $("jsum").innerHTML=`<div class="jbox">
      <div class="label">Depuis le début</div>
      <div class="kpis">
        <div><span class="big mono">${f1(avg)}</span><span class="jmeta">note moyenne / 5</span></div>
        <div><span class="big mono">${favs}</span><span class="jmeta">coup${favs>1?"s":""} de cœur</span></div>
        <div><span class="big mono">${withCom}</span><span class="jmeta">avec commentaire</span></div>
      </div>
      <div class="jmeta" style="font-size:13px;color:var(--ink)">Ta plateforme la mieux notée : <b>${PLATS[bp[0]].n}</b> (${f1(bp[1])}★). Le moment où tu notes le mieux : <b>${CTX[bc[0]]?.l.toLowerCase()||"?"}</b> (${f1(bc[1])}★).</div>
    </div>
    <div class="jbox">
      <div class="label">Répartition des notes · touche une ligne pour filtrer</div>
      <div class="dist">${cnt.map(([n,c])=>`<button class="drow" data-dstar="${n}" aria-pressed="${JU.star===n}">${starStr(n)}<span class="dbar"><i style="width:${c/mx*100}%"></i></span><span class="mono" style="text-align:right">${c}</span></button>`).join("")}</div>
    </div>`;
  const q=norm(JU.q.trim());
  let items=all.filter(([id,r])=>{
    const t=T(id);
    if(JU.plat!=="all"&&t.p!==JU.plat) return false;
    if(JU.star&&r.n!==JU.star) return false;
    if(JU.com==="with"&&!r.com) return false;
    if(JU.com==="without"&&r.com) return false;
    if(q&&!norm(t.n+" "+(r.com||"")).includes(q)) return false;
    return true;
  });
  const sorters={recent:(a,b)=>b[1].at-a[1].at,old:(a,b)=>a[1].at-b[1].at,best:(a,b)=>b[1].n-a[1].n||b[1].at-a[1].at,worst:(a,b)=>a[1].n-b[1].n||b[1].at-a[1].at,az:(a,b)=>T(a[0]).n.localeCompare(T(b[0]).n,"fr")};
  items.sort(sorters[JU.sort]);
  if(!items.length){ $("journal").innerHTML=`<div class="empty">Aucune note ne correspond à ces filtres. <button class="ghost" id="jreset2">Effacer les filtres</button></div>`; return; }
  const G={note:([,r])=>[6-r.n,TIERS[r.n]],plat:([id])=>{const p=T(id).p;return [Object.keys(PLATS).indexOf(p),PLATS[p].n];},
    ctx:([,r])=>[Object.keys(CTX).indexOf(r.ctx),CTX[r.ctx]?.l||"Autre"],type:([id])=>{const t=T(id).t;return [["film","serie","anime"].indexOf(t),TYPE_L[t]];},
    month:([,r])=>{const d=new Date(r.at);return [-(d.getFullYear()*12+d.getMonth()),MONTH(r.at)];},none:()=>[0,""]};
  const groups=new Map();
  items.forEach(e=>{const [o,l]=G[JU.group](e); if(!groups.has(l)) groups.set(l,{o,a:[]}); groups.get(l).a.push(e);});
  $("journal").innerHTML=[...groups.entries()].sort((a,b)=>a[1].o-b[1].o).map(([l,g])=>`<div class="jgroup">
      ${l?`<div class="jgh"><h3>${esc(l)}</h3><span class="mono">${g.a.length} · moyenne ${f1(avgOf(g.a))}★</span></div>`:""}
      <div class="jgrid">${g.a.map(([id,r])=>jCard(id,r)).join("")}</div>
    </div>`).join("");
}

function renderAll(){ renderPlats(); renderCtx(); renderNow(); renderList(); renderWish(); renderProfile(); renderJournal(); renderVote(); renderPotes(); }

/* ---------- événements ---------- */
const cycle=w=>{const st=triState(w);return st===0?2:st===1?-2:0;};
function setCtx(k){ const c=CTX[k]; S.ctx=k; S.time=c.time; S.energy=HUMEURS[S.humeur]?.energy??c.energy; S.screen=c.screen; seed=1; progSeed=0;
  if(k==="famille"&&S.duo.on) S.duo.on=false;
  if(k==="amoureux"&&!S.duo.on&&Object.values(S.duo.g).some(v=>v)) { S.duo.on=true; toast(`Mode à deux activé avec ${S.duo.name||"ta moitié"}.`); }
  save(); }
document.addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b) return;
  const D=b.dataset;
  if(D.tab){ showTab(D.tab); return; }
  if(D.set){ openSet(D.set); return; }
  if(D.rx){ const m=S.soc.react[D.rx]=S.soc.react[D.rx]||{}; m[D.e]=!m[D.e]; if(!m[D.e]) delete m[D.e]; save(); renderPotes(); return; }
  if(D.rep){ replyOpen=replyOpen===D.rep?null:D.rep; renderPotes(); if(replyOpen) $("repIn")?.focus(); return; }
  if(D.repsend){ const v=$("repIn").value.trim(); if(!v){ toast("Écris d'abord ta réponse."); return; } (S.soc.replies[D.repsend]=S.soc.replies[D.repsend]||[]).push({who:"me",txt:v.slice(0,280),at:Date.now()}); replyOpen=null; save(); renderPotes(); toast("Réponse envoyée."); return; }
  if(D.pwish){ if(S.wish[D.pwish]) delete S.wish[D.pwish]; else { S.wish[D.pwish]=Date.now(); toast("Ajouté à « À voir plus tard »."); } save(); renderPotes(); renderWish(); renderList(); return; }
  if(D.ff){ feedFilter=D.ff; renderPotes(); return; }
  if(D.mecolor){ S.me.color=D.mecolor; save(); renderPotes(); return; }
  if(D.jpub){ const r=S.ratings[D.jpub]; r.pub=!isPub(r); save(); renderJournal(); renderPotes(); toast(r.pub?"Note partagée avec tes potes.":"Note rendue privée."); return; }
  if(b.id==="meShareWatch"){ S.me.shareWatch=!S.me.shareWatch; save(); renderPotes(); return; }
  if(b.id==="meShareDefault"){ S.me.shareDefault=!S.me.shareDefault; save(); renderPotes(); return; }
  if(b.id==="meSave"){ const v=$("meNameQuick").value.trim(); if(!v){ toast("Écris ton prénom."); return; } S.me.name=v.slice(0,20); save(); renderPotes(); toast(`Salut ${S.me.name} !`); return; }
  if(D.res){ openRes.has(D.res)?openRes.delete(D.res):openRes.add(D.res); renderList(); return; }
  if(D.setclose){ openSet(null); return; }
  if(D.fage){ const f=S.fam[+D.fage]; f.age=clamp(f.age+(+D.d),0,99); save(); renderCtx(); renderList(); return; }
  if(D.frm){ S.fam.splice(+D.frm,1); save(); renderCtx(); renderList(); return; }
  if(D.fpre){ const [n,a]=D.fpre.split("|"); S.fam.push({n,age:+a}); save(); renderCtx(); renderList(); return; }
  if(b.id==="famAdd"){ const a=parseInt($("famAge").value,10); if(isNaN(a)){ toast("Indique un âge."); $("famAge").focus(); return; } S.fam.push({n:$("famName").value.trim().slice(0,20)||"Membre",age:clamp(a,0,99)}); $("famName").value=""; $("famAge").value=""; save(); renderCtx(); renderList(); return; }
  if(D.view){ if(D.view==="vote"&&!V) startVote(); showView(D.view); return; }
  if(D.jv){ showJV(D.jv); return; }
  if(D.p){ S.plats[D.p]=!S.plats[D.p]; save(); renderPlats(); renderList(); renderWish(); }
  else if(D.c){ setCtx(D.c); autoNote=""; renderAll(); if(D.c==="famille"&&S.fam.length<=1&&SET!=="fam") openSet("fam"); }
  else if(D.e!==undefined){ S.energy=+D.e; save(); renderCtx(); renderList(); openSet(null); }
  else if(D.scr){ S.screen=D.scr; save(); renderCtx(); renderList(); openSet(null); }
  else if(D.h){ S.humeur=D.h; const h=HUMEURS[D.h]; if(h.energy!==undefined) S.energy=h.energy; save(); renderCtx(); renderList(); openSet(null); }
  else if(D.g){ S.g[D.g]=cycle(S.g[D.g]||0); S.gSample=false; save(); renderProfile(); renderList(); }
  else if(D.dg){ S.duo.g[D.dg]=cycle(S.duo.g[D.dg]||0); save(); renderProfile(); if(S.duo.on) renderList(); }
  else if(D.a){
    if(D.a==="watch") startWatching(D.id);
    else if(D.a==="wish"){ if(S.wish[D.id]) delete S.wish[D.id]; else { S.wish[D.id]=Date.now(); toast("Ajouté à « À voir plus tard »."); } save(); renderList(); renderWish(); }
    else { const t=T(D.id), L=S.ctxL[S.ctx]=S.ctxL[S.ctx]||{}; t.m.forEach(m=>L[m]=clamp((L[m]||0)-.5,-3,3)); later.add(S.ctx+"|"+D.id); S.gSample=false; save(); renderList(); renderProfile(); toast(`OK, moins de ${MOODS[t.m[0]]} en mode ${CTX[S.ctx].l.toLowerCase()}.`); }
  }
  else if(D.ep){ const w=S.watching[D.id], d=+D.ep; if(!w) return;
    if(d>0){ w.eps=(w.eps||0)+1; w.e=(w.e||1)+1; if(w.tot&&w.e>w.tot){ toast(`Saison ${w.s||1} terminée ! On passe à la suivante.`); w.s=(w.s||1)+1; w.e=1; w.tot=null; } }
    else { if((w.e||1)>1){ w.e--; w.eps=Math.max(0,(w.eps||0)-1); } }
    save(); renderNow(); renderProg(); }
  else if(D.season){ const w=S.watching[D.id]; if(!w) return; w.s=(w.s||1)+1; w.e=1; w.tot=null; save(); renderNow(); renderProg(); }
  else if(D.finish){ draft[D.finish]={...(draft[D.finish]||{}),open:true}; renderNow(); }
  else if(D.star){ popStar=+D.star; const d=draft[D.id]=draft[D.id]||{open:true}; d.n=+D.star; renderNow(); }
  else if(D.cancel){ if(draft[D.cancel]) draft[D.cancel].open=false; renderNow(); }
  else if(D.save){ saveRating(D.save); }
  else if(D.drop){ delete S.watching[D.drop]; delete draft[D.drop]; save(); renderNow(); renderList(); renderProfile(); toast("Retiré, sans effet sur tes goûts."); }
  else if(D.del){ const id=D.del, r=S.ratings[id]; if(r){ applyRating(T(id),r.n,r.ctx,-1); delete S.ratings[id]; delete S.seen[id]; save(); renderJournal(); renderList(); renderProfile(); toast("Note supprimée, l'algo l'oublie."); } }
  else if(D.wwatch){ startWatching(D.wwatch); }
  else if(D.wrm){ delete S.wish[D.wrm]; save(); renderWish(); renderList(); }
  else if(D.dstar){ const n=+D.dstar; JU.star=JU.star===n?0:n; showJV("list"); renderJournal(); }
  else if(D.jedit){ const r=S.ratings[D.jedit]; jedit={id:D.jedit,n:r.n,com:r.com||""}; renderJournal(); }
  else if(D.jstar&&jedit){ popStar=+D.jstar; jedit.n=+D.jstar; renderJournal(); }
  else if(D.jcancel){ jedit=null; renderJournal(); }
  else if(D.jsave&&jedit){ const id=jedit.id, r=S.ratings[id], t=T(id); applyRating(t,r.n,r.ctx,-1); applyRating(t,jedit.n,r.ctx,1); r.n=jedit.n; r.com=(jedit.com||"").trim().slice(0,600); jedit=null; save(); renderJournal(); renderList(); renderProfile(); toast("Note modifiée."); }
  else if(D.atype){ document.querySelectorAll("#aType button").forEach(x=>x.setAttribute("aria-pressed",x===b)); $("aDur").value=ADEF[D.atype]; $("aDurLab").textContent=D.atype==="film"?"Durée du film (min)":"Durée d'un épisode (min)"; }
  else if(D.ai){ document.querySelectorAll("#aInt button").forEach(x=>x.setAttribute("aria-pressed",x===b)); }
  else if(D.ag||D.am){ b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")!=="true"); }
  else if(D.add){ submitAdd(D.add); }
  else if(D.vadd){ addVoter(); }
  else if(D.vrm){ V.names.splice(+D.vrm,1); renderVote(); }
  else if(D.vstart){ if(V.names.length<2) return; V.step="vote"; V.i=0; V.votes=[]; V.ballot={ok:new Set(),fav:null}; renderVote(); }
  else if(D.vok){ const s=V.ballot.ok; s.has(D.vok)?s.delete(D.vok):s.add(D.vok); if(!s.has(D.vok)&&V.ballot.fav===D.vok) V.ballot.fav=null; renderVote(); }
  else if(D.vfav){ V.ballot.fav=V.ballot.fav===D.vfav?null:D.vfav; if(V.ballot.fav) V.ballot.ok.add(D.vfav); renderVote(); }
  else if(D.vnext){ V.votes.push(V.ballot); V.i++; if(V.i>=V.names.length) V.step="result"; else V.ballot={ok:new Set(),fav:null}; renderVote(); }
  else if(D.vtie){ const pts=V.cand.map(id=>[id,V.votes.reduce((a,v)=>a+(v.fav===id?2:v.ok.has(id)?1:0),0)]); const mx=Math.max(...pts.map(p=>p[1])); const tied=pts.filter(p=>p[1]===mx); const w=tied[Math.floor(Math.random()*tied.length)][0]; toast(`Le hasard a choisi : ${T(w).n}`); V=null; renderVote(); showView("sugg"); startWatching(w); }
  else if(D.vwatch){ const id=D.vwatch; V=null; renderVote(); showView("sugg"); startWatching(id); }
  else if(D.vagain){ startVote(); }
  else if(D.vclose){ V=null; renderVote(); showView("sugg"); }
  else switch(b.id){
    case "shuffle": seed++; renderList(); break;
    case "progShuffle": progSeed++; renderProg(); break;
    case "addBtn": openAdd("watch","addZone"); break;
    case "addBtn2": openAdd("rate","addZone2"); break;
    case "addClose": closeAdd(); break;
    case "resume": showTab("series"); break;
    case "autoBtn": S.auto=!S.auto; if(S.auto){ const now=new Date(); setCtx(autoCtx(now)); autoNote=`${JOURS[now.getDay()]} ${now.getHours()} h ${String(now.getMinutes()).padStart(2,"0")} → <b>${CTX[S.ctx].l}</b>`; } save(); renderAll(); break;
    case "duoBtn": S.duo.on=!S.duo.on; save(); renderCtx(); renderList(); if(S.duo.on&&!Object.values(S.duo.g).some(v=>v)){ toast("Marque ses goûts dans l'onglet Profil."); showTab("profil"); setTimeout(()=>$("duoPanel").scrollIntoView({block:"start"}),50); } break;
    case "jreset": case "jreset2": Object.assign(JU,{q:"",plat:"all",com:"all",star:0}); renderJournal(); break;
    case "resetBtn": $("resetZone").innerHTML=`<div class="confirm">Effacer goûts, notes et listes ? <button id="resetYes">Oui, tout effacer</button><button class="ghost" id="resetNo" style="border-color:var(--line);color:var(--ink)">Annuler</button></div>`; break;
    case "resetNo": $("resetZone").innerHTML=`<button class="ghost" id="resetBtn">Tout réinitialiser</button>`; break;
    case "resetYes": { const keep=S.plats; S=DEFAULT(); S.plats=keep; S.g={}; S.gSample=false; later.clear(); save(); buildCatalog(); $("resetZone").innerHTML=`<button class="ghost" id="resetBtn">Tout réinitialiser</button>`; renderAll(); toast("Remis à zéro. Choisis tes genres."); } break;
  }
});
document.addEventListener("input",e=>{
  const el=e.target;
  if(el.dataset?.com){ (draft[el.dataset.com]=draft[el.dataset.com]||{}).com=el.value; }
  else if(el.id==="jedtxt"&&jedit){ jedit.com=el.value; }
  else if(el.id==="meName"){ S.me.name=el.value.trim().slice(0,20); save(); renderPotes(); }
  else if(el.id==="duoName"){ S.duo.name=el.value.trim().slice(0,24); save(); renderCtx(); }
  else if(el.id==="jq"){ JU.q=el.value; renderJournal(); }
  else if(el.id==="time"){ S.time=+el.value; $("timeOut").textContent=fmt(S.time); save(); renderList(); renderNow(); renderWish(); $("sv-time").textContent=fmt(S.time); }
});
document.addEventListener("change",e=>{
  const el=e.target;
  if(el.dataset?.pub){ (draft[el.dataset.pub]=draft[el.dataset.pub]||{}).pub=el.checked; return; }
  if(el.dataset?.tot){ const w=S.watching[el.dataset.tot]; if(w){ const v=+el.value; w.tot=v>0?Math.round(v):null; save(); renderNow(); } }
  else if(el.dataset?.dl){ S.dl[el.dataset.dl]=el.checked; save(); renderProg(); }
  else if(el.id==="jgroupSel"){ JU.group=el.value; saveJU(); renderJournal(); }
  else if(el.id==="jsort"){ JU.sort=el.value; saveJU(); renderJournal(); }
  else if(el.id==="jplat"){ JU.plat=el.value; renderJournal(); }
  else if(el.id==="jcom"){ JU.com=el.value; renderJournal(); }
  else if(el.id==="jstarSel"){ JU.star=+el.value; renderJournal(); }
  else if(el.id==="bMonth"){ bMonth=el.value; renderJournal(); }
});


/* ---------- POTES (aperçu : potes d'exemple ; la vraie version se branche sur Firebase) ---------- */
const DEMO_SOCIAL = true;
const PCOLORS=["#D7332A","#E58A1F","#1FAF4B","#18B7C4","#B436B4","#C9A21A","#6E6663","#E05D8C"];
const HR=3600e3, NOW0=Date.now();
// tout le monde sur Zap (aperçu) · f = ses potes à lui
const PEOPLE={
  lea:{name:"Léa",color:"#B436B4",h:"lea.m",f:["yanis","sarah","tom","chloe","ambre","noah"]},
  yanis:{name:"Yanis",color:"#18B7C4",h:"yanis_k",f:["lea","tom","karim","mehdi","noah"]},
  sarah:{name:"Sarah",color:"#E58A1F",h:"sarahlune",f:["lea","chloe","ambre","jade"]},
  tom:{name:"Tom",color:"#1FAF4B",h:"tom.r",f:["lea","yanis","karim","ambre","lucas"]},
  karim:{name:"Karim",color:"#D7332A",h:"karim.b",f:["yanis","tom","mehdi"]},
  chloe:{name:"Chloé",color:"#E05D8C",h:"chlo3",f:["lea","sarah","jade"]},
  ambre:{name:"Ambre",color:"#C9A21A",h:"ambre.v",f:["lea","sarah","tom","camille"]},
  noah:{name:"Noah",color:"#5A7BD7",h:"noah.p",f:["lea","yanis"]},
  mehdi:{name:"Mehdi",color:"#2E9E8F",h:"mehdi_z",f:["yanis","karim"]},
  jade:{name:"Jade",color:"#9B59D0",h:"jade.lmt",f:["sarah","chloe"]},
  lucas:{name:"Lucas",color:"#8A6E2F",h:"lucas.d",f:["tom"]},
  camille:{name:"Camille",color:"#C2543A",h:"cam.ille",f:["ambre"]},
  manon:{name:"Manon",color:"#3F8FCB",h:"manon.g",f:[]},
  hugo:{name:"Hugo",color:"#6E6663",h:"hugo.t",f:[]}
};
const FRIENDS={}; // mes potes (rempli depuis S.soc.friends)
// notes d'exemple (tout le monde) ; FR_RATINGS ne garde que celles de mes potes
const FR_ALL=[
  {id:"r1",who:"lea",t:"Frieren",n:5,com:"Le plus apaisant de tous. Parfait avant de dormir.",at:NOW0-2*HR},
  {id:"r2",who:"yanis",t:"Dan Da Dan",n:5,com:"Complètement barré, j'ai ri à chaque épisode.",at:NOW0-5*HR},
  {id:"r3",who:"sarah",t:"Le Château ambulant",n:4,com:"Soirée parfaite à deux.",at:NOW0-9*HR},
  {id:"r4",who:"tom",t:"Squid Game",n:2,com:"Trop violent pour moi.",at:NOW0-26*HR},
  {id:"r5",who:"yanis",t:"Solo Leveling",n:4,com:"",at:NOW0-30*HR},
  {id:"r6",who:"lea",t:"Spy x Family",n:4,com:"Anya ❤",at:NOW0-50*HR},
  {id:"r7",who:"tom",t:"Glass Onion",n:5,com:"Le meilleur whodunit, je l'avais pas vu venir.",at:NOW0-72*HR},
  {id:"r8",who:"sarah",t:"Frieren",n:4,com:"",at:NOW0-80*HR},
  {id:"r9",who:"yanis",t:"Frieren",n:3,com:"Joli mais lent.",at:NOW0-96*HR},
  {id:"r10",who:"tom",t:"Demon Slayer : La Forteresse Infinie",n:5,com:"Les combats, c'est n'importe quoi tellement c'est beau.",at:NOW0-100*HR},
  {id:"r11",who:"sarah",t:"Dan Da Dan",n:3,com:"",at:NOW0-120*HR},
  {id:"r12",who:"lea",t:"The Bear",n:5,com:"Stressant mais génial.",at:NOW0-140*HR},
  {id:"r13",who:"karim",t:"Solo Leveling",n:5,com:"Les combats sont fous.",at:NOW0-4*HR},
  {id:"r14",who:"chloe",t:"Le Château ambulant",n:5,com:"Mon Ghibli préféré.",at:NOW0-12*HR},
  {id:"r15",who:"ambre",t:"The Bear",n:4,com:"",at:NOW0-20*HR},
  {id:"r16",who:"noah",t:"Dan Da Dan",n:4,com:"Ça part dans tous les sens, j'adore.",at:NOW0-33*HR},
  {id:"r17",who:"mehdi",t:"Squid Game",n:4,com:"",at:NOW0-45*HR},
  {id:"r18",who:"jade",t:"Frieren",n:5,com:"Je pleure à chaque fois.",at:NOW0-60*HR}
];
const FR_RATINGS=[];
const FR_WATCH_ALL=[
  {who:"lea",t:"Les Carnets de l'apothicaire",s:1,e:7,at:NOW0-1*HR},
  {who:"tom",t:"One Piece",s:1,e:132,at:NOW0-3*HR},
  {who:"karim",t:"Solo Leveling",s:2,e:3,at:NOW0-.5*HR}
];
const FR_WATCH=[];
const FR_REACT={ r1:{"🔥":["yanis"],"❤️":["sarah"]}, r2:{"😂":["lea","tom"]}, r7:{"😮":["sarah"]} };
const FR_REPLIES={ r1:[{who:"sarah",txt:"Trop d'accord, j'ai pleuré à l'épisode 10.",at:NOW0-1*HR}], r4:[{who:"yanis",txt:"Faut tenir jusqu'au bout, ça vaut le coup !",at:NOW0-20*HR}] };
const REACTS=["🔥","❤️","😂","😮"];

S.me=Object.assign({name:"",color:"#D7332A",shareWatch:true,shareDefault:true},S.me||{});
S.soc=Object.assign({react:{},replies:{}},S.soc||{});
if(!S.soc.friends){ S.soc.friends=["lea","yanis","sarah","tom"]; S.soc.reqIn=["chloe","noah"]; S.soc.reqOut=[]; S.soc.refused=[]; }
// reconstruit « mes potes » et ce que j'ai le droit de voir
function syncFriends(){
  Object.keys(FRIENDS).forEach(k=>delete FRIENDS[k]);
  S.soc.friends.forEach(k=>{ if(PEOPLE[k]) FRIENDS[k]=PEOPLE[k]; });
  FR_RATINGS.length=0; FR_ALL.forEach(x=>{ if(FRIENDS[x.who]) FR_RATINGS.push(x); });
  FR_WATCH.length=0; FR_WATCH_ALL.forEach(x=>{ if(FRIENDS[x.who]) FR_WATCH.push(x); });
}
syncFriends();
let replyOpen=null, feedFilter="all";

const ago=ts=>{const m=Math.round((Date.now()-ts)/60000); if(m<1) return "à l'instant"; if(m<60) return `il y a ${m} min`; const h=Math.round(m/60); if(h<24) return `il y a ${h} h`; const d=Math.round(h/24); return d===1?"hier":`il y a ${d} j`;};
const who=w=>w==="me"?{name:S.me.name||"Moi",color:S.me.color}:(FRIENDS[w]||PEOPLE[w]||{name:"?",color:"#6E6663"});
const avatar=(w,size=34)=>{const p=who(w);return `<span class="av" style="background:${p.color};width:${size}px;height:${size}px;font-size:${Math.round(size*.42)}px" aria-hidden="true">${esc((p.name||"?")[0].toUpperCase())}</span>`;};
const isPub=r=>r.pub!==false;

// toutes les notes visibles : potes + les miennes publiques
function allPublicRatings(){
  const mine=Object.entries(S.ratings).filter(([id,r])=>isPub(r)&&tIdx(id)>=0).map(([id,r])=>({id:"me:"+id,who:"me",t:T(id).n,tid:id,n:r.n,com:r.com,at:r.at}));
  const fr=FR_RATINGS.map(x=>({...x,tid:(C.find(t=>t.n===x.t)||{}).id})).filter(x=>x.tid);
  return [...fr,...mine];
}
function friendsOn(tid){ return FR_RATINGS.filter(x=>(C.find(t=>t.n===x.t)||{}).id===tid); }
function reacts(id){ const base=FR_REACT[id]||{}, mine=S.soc.react[id]||{}; const out={}; REACTS.forEach(e=>{ const l=[...(base[e]||[])]; if(mine[e]) l.push("me"); if(l.length) out[e]=l; }); return out; }
function replies(id){ return [...(FR_REPLIES[id]||[]),...(S.soc.replies[id]||[])].sort((a,b)=>a.at-b.at); }

function compat(fid){
  const mine=S.ratings, common=FR_RATINGS.filter(x=>x.who===fid).map(x=>{const t=C.find(c=>c.n===x.t);return t&&mine[t.id]?[x.n,mine[t.id].n]:null;}).filter(Boolean);
  if(common.length<2) return {pct:null,n:common.length};
  const d=common.reduce((a,[x,y])=>a+Math.abs(x-y),0)/common.length;
  return {pct:Math.round(100-d*25),n:common.length};
}

// bonus algo : avis des potes sur un titre
function potesBoost(t){
  const l=friendsOn(t.id); if(!l.length) return null;
  const avg=l.reduce((a,x)=>a+x.n,0)/l.length, fans=l.filter(x=>x.n>=4).map(x=>who(x.who).name);
  return {avg,fans,list:l};
}

function feedCard(x){
  const t=T(x.tid), rs=reacts(x.id), rp=replies(x.id), p=who(x.who);
  return `<article class="fcard">
    <div class="fhead">${avatar(x.who)}<div class="fwho"><b>${x.who==="me"?"Toi":esc(p.name)}</b> <span class="jmeta">a noté</span> <b>${esc(t.n)}</b><div class="jmeta">${ago(x.at)} · ${PLATS[t.p].n}</div></div>${starStr(x.n)}</div>
    ${x.com?`<p class="fcom">« ${esc(x.com)} »</p>`:""}
    <div class="freact">${REACTS.map(e=>{const l=rs[e]||[], mine=l.includes("me");return `<button class="rx${mine?" on":""}" data-rx="${esc(x.id)}" data-e="${e}" aria-pressed="${mine}" aria-label="Réagir ${e}">${e}${l.length?`<span class="mono">${l.length}</span>`:""}</button>`;}).join("")}
      <button class="rx txt" data-rep="${esc(x.id)}">Répondre${rp.length?` · ${rp.length}`:""}</button>
      ${x.who!=="me"&&!S.seen[x.tid]&&!S.watching[x.tid]?`<button class="rx txt" data-pwish="${esc(x.tid)}">${S.wish[x.tid]?"Dans ta liste":"+ À voir"}</button>`:""}</div>
    ${rp.length||replyOpen===x.id?`<div class="freplies">${rp.map(r=>`<div class="frep">${avatar(r.who,24)}<div><b>${esc(r.who==="me"?"Toi":who(r.who).name)}</b> <span class="jmeta">${ago(r.at)}</span><div>${esc(r.txt)}</div></div></div>`).join("")}
      ${replyOpen===x.id?`<div class="frepform"><input type="text" id="repIn" maxlength="280" placeholder="Ta réponse…"><button class="btn primary" data-repsend="${esc(x.id)}">Envoyer</button></div>`:""}</div>`:""}
  </article>`;
}

function renderPotes(){
  const z=$("potesFeed"); if(!z) return;
  $("demoBanner").hidden=!DEMO_SOCIAL;
  // profil manquant
  $("meSetup").hidden=!!S.me.name;
  // en ce moment
  const myW=S.me.shareWatch?Object.entries(S.watching).filter(([id])=>tIdx(id)>=0).map(([id,w])=>({who:"me",t:T(id).n,s:w.s,e:w.e,at:w.at,film:T(id).t==="film"})):[];
  const W=[...FR_WATCH.map(w=>({...w,film:(C.find(t=>t.n===w.t)||{}).t==="film"})),...myW];
  $("potesNow").innerHTML=W.length?W.map(w=>`<div class="nowchip">${avatar(w.who,28)}<div><b>${w.who==="me"?"Toi":esc(who(w.who).name)}</b> regarde <b>${esc(w.t)}</b><div class="jmeta">${w.film?"film":`S${w.s||1} · ép. ${w.e||1}`} · ${ago(w.at)}</div></div><span class="livedot" aria-hidden="true"></span></div>`).join(""):`<p class="jmeta">Personne ne regarde rien en ce moment.</p>`;
  // fil
  let items=allPublicRatings().sort((a,b)=>b.at-a.at);
  if(feedFilter!=="all") items=items.filter(x=>x.who===feedFilter);
  $("feedFilter").innerHTML=[["all","Tous mes potes"],...Object.entries(FRIENDS).map(([k,f])=>[k,f.name]),["me","Moi"]].map(([k,l])=>`<button data-ff="${k}" aria-pressed="${feedFilter===k}">${esc(l)}</button>`).join("");
  z.innerHTML=items.length?items.map(feedCard).join(""):`<div class="empty">Rien à afficher pour l'instant.</div>`;
  // compat
  $("potesCompat").innerHTML=Object.entries(FRIENDS).map(([k,f])=>{const c=compat(k), nb=FR_RATINGS.filter(x=>x.who===k).length;
    return `<div class="crow${c.pct===null?" nodata":""}">${avatar(k,32)}<div class="cname"><b>${esc(f.name)}</b><div class="jmeta">${nb} note${nb>1?"s":""} · ${c.pct===null?"pas encore assez de films en commun":`${c.n} films en commun`}</div></div>${c.pct===null?"":`<div class="cbar"><i style="width:${c.pct}%"></i></div><b class="mono">${c.pct}%</b>`}</div>`;}).join("");
  // réglages profil potes
  if(document.activeElement!==$("meName")) $("meName").value=S.me.name||"";
  $("meColors").innerHTML=PCOLORS.map(c=>`<button class="swatch" data-mecolor="${c}" style="background:${c}" aria-pressed="${S.me.color===c}" aria-label="Couleur ${c}"></button>`).join("");
  $("meShareWatch").setAttribute("aria-pressed",S.me.shareWatch);
  $("meShareDefault").setAttribute("aria-pressed",S.me.shareDefault);
  $("mePreview").innerHTML=`${avatar("me",40)}<b>${esc(S.me.name||"Ton prénom")}</b>`;
}

let TAB="now", VIEW="sugg", JV="list";
try{ TAB=localStorage.getItem(KEY+".tab")||"now"; }catch(e){}
const TABS=["now","series","journal","potes","profil"];
if(TABS.includes(location.hash.slice(1))) TAB=location.hash.slice(1);
function showTab(t){
  if(!TABS.includes(t)) t="now"; TAB=t;
  TABS.forEach(k=>{ $("p-"+k).hidden=k!==t; const b=$("tab-"+k); b.setAttribute("aria-selected",k===t); b.tabIndex=k===t?0:-1; });
  try{ localStorage.setItem(KEY+".tab",t); }catch(e){}
  window.scrollTo(0,0);
}
function showView(v){ VIEW=v; ["sugg","prog","vote"].forEach(k=>{ $("v-"+k).hidden=k!==v; }); document.querySelectorAll("#viewSeg [data-view]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.view===v)); $("shuffle").hidden=v!=="sugg"; }
function showJV(v){ JV=v; ["list","bilan","stats"].forEach(k=>{ $("jv-"+k).hidden=k!==v; }); document.querySelectorAll("#jview [data-jv]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.jv===v)); }
let SET=null;
function openSet(k){ SET=SET===k?null:k; document.querySelectorAll(".setchip").forEach(b=>b.setAttribute("aria-expanded",b.dataset.set===SET)); ["time","energy","screen","humeur","duo","fam"].forEach(x=>{ $("sp-"+x).hidden=x!==SET; }); }
document.addEventListener("keydown",e=>{
  if(e.ctrlKey||e.metaKey||e.altKey||TAB!=="now") return;
  const tg=e.target; if(tg.closest&&tg.closest("input,textarea,select,[contenteditable]")) return;
  if(!/^[0-9]$/.test(e.key)) return;
  const keys=Object.keys(CTX), i=e.key==="0"?9:(+e.key-1); if(!keys[i]) return;
  setCtx(keys[i]); autoNote=""; renderAll(); toast(`CH ${String(i+1).padStart(2,"0")} · ${CTX[keys[i]].l}`);
});
document.querySelector(".tabs").addEventListener("keydown",e=>{ if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft") return; const i=TABS.indexOf(TAB), n=TABS[(i+(e.key==="ArrowRight"?1:TABS.length-1))%TABS.length]; showTab(n); $("tab-"+n).focus(); });

