
/* ================= GRAINES : des détails posés dès le premier lancement, qui ne prendront sens qu'à l'Acte V =================
   Rien ici n'est expliqué au joueur. Tout est compté en silence. */
S.tr=Object.assign({first:Date.now(),refTotal:0,subl:0,firstRef:null,onbGhost:0,nights:0},S.tr||{});
save();
// les refus : le tout premier titre refusé, et le total depuis toujours
document.addEventListener("click",e=>{ const b=e.target.closest('[data-a="later"]'); if(!b) return;
  const h=b.closest(".card")?.querySelector(".ctitle h3")?.textContent; S.tr.refTotal++;
  if(!S.tr.firstRef&&h) S.tr.firstRef={n:h,at:Date.now()}; save(); },true);
// les ouvertures en pleine nuit (entre 1 h et 5 h)
{ const hr=new Date().getHours(); if(hr>=1&&hr<5){ S.tr.nights++; save(); } }
// le zap au hasard : parfois, une image de trop dans la neige
let SUBL=0;
runStatic=function(ms,done){
  const cv=$("zapStatic"), cx=cv.getContext("2d"), img=cx.createImageData(cv.width,cv.height), d=img.data, t0=performance.now();
  const flash=ms>0&&Math.random()<1/8, fAt=ms*(.35+Math.random()*.3); if(flash){ S.tr.subl++; save(); }
  (function f(now){ const dt=now-t0;
    if(flash&&dt>=fAt&&dt<fAt+70){ cx.fillStyle="#0b0a0a"; cx.fillRect(0,0,cv.width,cv.height); cx.fillStyle="#d8d0c8"; cx.font="bold 15px monospace"; cx.textAlign="center"; cx.fillText("LES PUITS",80,44); cx.fillText("DE SARÉNA",80,64); }
    else { for(let i=0;i<d.length;i+=4){ const v=Math.random()*255|0; d[i]=d[i+1]=d[i+2]=v; d[i+3]=255; } cx.putImageData(img,0,0); }
    if(dt<ms) requestAnimationFrame(f); else done(); })(t0);
};
// le tout premier écran : une case qui ne charge jamais
const _renderOnbSeed=renderOnb;
renderOnb=function(){ _renderOnbSeed(); const g=$("onbGrid"); if(!g) return; const kids=g.children; const at=kids[6]||null;
  const el=document.createElement("div"); el.className="onbt onbghost"; el.setAttribute("aria-hidden","true"); el.innerHTML="<b>▒▒▒▒▒▒ ▒▒ ▒▒▒▒▒▒</b><small>chargement…</small>";
  g.insertBefore(el,at); if(!S.tr.onbGhost){ S.tr.onbGhost=1; save(); } };
