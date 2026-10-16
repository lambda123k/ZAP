
/* ================= POTES : ajouter, accepter / refuser, chercher, suggestions ================= */
// aperçu : les autres membres sont simulés ; la vraie version branchera ça sur Firebase
let FQ="", fRmAsk=null, fMoreSugg=false, fListOpen=false;
const fRel=k=>S.soc.friends.includes(k)?"friend":S.soc.reqIn.includes(k)?"in":S.soc.reqOut.includes(k)?"out":"none";
const fMutual=k=>(PEOPLE[k].f||[]).filter(x=>S.soc.friends.includes(x));
function fSub(k){ const m=fMutual(k), r=fRel(k);
  if(r==="in") return "veut être ton pote";
  if(m.length) return `${m.length} pote${m.length>1?"s":""} en commun · ${m.slice(0,2).map(x=>PEOPLE[x].name).join(", ")}${m.length>2?"…":""}`;
  return `@${PEOPLE[k].h}`; }
function fBtns(k){ const r=fRel(k);
  if(r==="friend") return fRmAsk===k?`<button class="btn fno" data-frmok="${k}">Retirer</button><button class="btn" data-frmno="1">Annuler</button>`:`<button class="btn fghost" data-frm="${k}" aria-label="Retirer ${esc(PEOPLE[k].name)} de mes potes">Potes ✓</button>`;
  if(r==="in") return `<button class="btn primary" data-facc="${k}">Accepter</button><button class="btn" data-fref="${k}">Refuser</button>`;
  if(r==="out") return `<button class="btn fghost" data-fcancel="${k}">Demande envoyée</button>`;
  return `<button class="btn primary" data-fadd="${k}">+ Ajouter</button>`; }
const fRow=(k,sub)=>`<div class="frow">${avatar(k,40)}<div class="fwho2"><b>${esc(PEOPLE[k].name)}</b><small>${sub||fSub(k)}</small></div><div class="fbtns">${fBtns(k)}</div></div>`;
function renderFriends(){
  const P=$("friendsPanel"); if(!P) return;
  // recherche
  const q=norm(FQ.trim().replace(/^@/,""));
  $("fRes").innerHTML=q?(()=>{ const l=Object.keys(PEOPLE).filter(k=>norm(PEOPLE[k].name).includes(q)||norm(PEOPLE[k].h).includes(q));
    return `<div class="fgrp">${l.length?l.map(k=>fRow(k,`@${PEOPLE[k].h}${fMutual(k).length?` · ${fMutual(k).length} en commun`:""}`)).join(""):`<p class="jmeta">Personne ne s'appelle comme ça sur Zap. Invite-le avec le lien plus bas.</p>`}</div>`; })():"";
  // demandes reçues
  const inn=S.soc.reqIn.filter(k=>PEOPLE[k]);
  $("fReq").innerHTML=inn.length?`<div class="fgrp freq"><div class="label">Demandes reçues · ${inn.length}</div>${inn.map(k=>fRow(k)).join("")}</div>`:"";
  // mes potes
  const fr=S.soc.friends.filter(k=>PEOPLE[k]);
  $("fList").innerHTML=`<div class="fgrp"><div class="fhead2"><span class="label">Mes potes · ${fr.length}</span>${fr.length?`<button class="linkbtn" data-flist="1">${fListOpen?"Fermer":"Gérer"}</button>`:""}</div>${!fr.length?`<p class="jmeta">Pas encore de potes. Ajoute quelqu'un ci-dessous.</p>`:fListOpen?fr.map(k=>fRow(k,`@${PEOPLE[k].h}`)).join(""):`<div class="fchips">${fr.map(k=>`<span class="fchip">${avatar(k,30)}<small>${esc(PEOPLE[k].name)}</small></span>`).join("")}</div>`}</div>`;
  // suggestions : d'abord les potes de tes potes, puis tout le monde (au début, il y a peu de monde)
  const others=Object.keys(PEOPLE).filter(k=>fRel(k)==="none"&&!S.soc.refused.includes(k));
  const fof=others.filter(k=>fMutual(k).length).sort((a,b)=>fMutual(b).length-fMutual(a).length);
  const rest=others.filter(k=>!fMutual(k).length);
  const out=S.soc.reqOut.filter(k=>PEOPLE[k]);
  let h="";
  if(fof.length) h+=`<div class="fgrp"><div class="label">Potes de tes potes</div>${fof.slice(0,fMoreSugg?99:3).map(k=>fRow(k)).join("")}</div>`;
  if(rest.length) h+=`<div class="fgrp"><div class="label">Aussi sur Zap</div><p class="jmeta">On est encore peu nombreux : tu les connais peut-être.</p>${rest.slice(0,fMoreSugg?99:2).map(k=>fRow(k)).join("")}</div>`;
  if(fof.length>3||rest.length>2) h+=`<button class="linkbtn fmore" data-fmore="1">${fMoreSugg?"Voir moins":`Voir tout le monde (${others.length})`}</button>`;
  if(out.length) h+=`<div class="fgrp"><div class="label">Demandes envoyées · ${out.length}</div>${out.map(k=>fRow(k,"en attente de réponse")).join("")}</div>`;
  $("fSugg").innerHTML=h;
  // pastille de l'onglet Potes : conseils reçus + demandes
  const c=$("cPotes"), n=(typeof inbox==="function"?inbox().length:0)+inn.length; if(c){ c.hidden=!n; c.textContent=n; }
}
function fChanged(msg){ save(); syncFriends(); renderAll(); if(msg) toast(msg,2600); }
const _renderPotesF=renderPotes;
renderPotes=function(){ _renderPotesF(); renderFriends(); };
$("fq").addEventListener("input",e=>{ FQ=e.target.value; renderFriends(); });
$("friendsPanel").addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b) return; const D=b.dataset; e.stopPropagation();
  if(D.fadd){ const k=D.fadd;
    if(S.soc.reqIn.includes(k)){ S.soc.reqIn=S.soc.reqIn.filter(x=>x!==k); S.soc.friends.push(k); return fChanged(`${PEOPLE[k].name} et toi êtes potes !`); }
    S.soc.reqOut.push(k); S.soc.refused=S.soc.refused.filter(x=>x!==k); fChanged(`Demande envoyée à ${PEOPLE[k].name}.`);
    if(DEMO_SOCIAL) setTimeout(()=>{ if(!S.soc.reqOut.includes(k)) return; S.soc.reqOut=S.soc.reqOut.filter(x=>x!==k); S.soc.friends.push(k); fChanged(`${PEOPLE[k].name} a accepté ta demande 🎉`); },4000+Math.random()*4000);
    return; }
  if(D.facc){ const k=D.facc; S.soc.reqIn=S.soc.reqIn.filter(x=>x!==k); S.soc.friends.push(k); return fChanged(`${PEOPLE[k].name} et toi êtes potes ! Ses notes arrivent dans ton fil.`); }
  if(D.fref){ const k=D.fref; S.soc.reqIn=S.soc.reqIn.filter(x=>x!==k); S.soc.refused.push(k); return fChanged(`Demande de ${PEOPLE[k].name} refusée. Il n'en saura rien.`); }
  if(D.fcancel){ const k=D.fcancel; S.soc.reqOut=S.soc.reqOut.filter(x=>x!==k); return fChanged("Demande annulée."); }
  if(D.frm){ fRmAsk=D.frm; return renderFriends(); }
  if(D.frmno){ fRmAsk=null; return renderFriends(); }
  if(D.frmok){ const k=D.frmok; fRmAsk=null; S.soc.friends=S.soc.friends.filter(x=>x!==k); if(feedFilter===k) feedFilter="all"; return fChanged(`${PEOPLE[k].name} ne fait plus partie de tes potes.`); }
  if(D.flist){ fListOpen=!fListOpen; fRmAsk=null; return renderFriends(); }
  if(D.fmore){ fMoreSugg=!fMoreSugg; return renderFriends(); }
});
