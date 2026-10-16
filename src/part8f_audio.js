/* ---------- le son (généré en direct) ---------- */
const LA={c:null};
function laStart(){
  try{
    if(LA.c){ LA.c.resume(); return; }
    const C=new (window.AudioContext||window.webkitAudioContext)(); LA.c=C;
    const m=C.createGain(); m.gain.value=S.ac.mute?0:.9; m.connect(C.destination); LA.m=m;
    const nb=C.createBuffer(1,C.sampleRate*2,C.sampleRate), d=nb.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
    const mk=(type,f,q,g)=>{ const s=C.createBufferSource(); s.buffer=nb; s.loop=true; const fl=C.createBiquadFilter(); fl.type=type; fl.frequency.value=f; if(q) fl.Q.value=q; const gg=C.createGain(); gg.gain.value=g; s.connect(fl).connect(gg).connect(m); s.start(); return gg; };
    LA.hiss=mk("highpass",3500,0,.010); LA.stat=mk("bandpass",1700,.5,0);
    const lp=C.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=1200; LA.pad=C.createGain(); LA.pad.gain.value=0; LA.pad.connect(lp).connect(m);
    const lfo=C.createOscillator(); lfo.frequency.value=.33; LA.wow=C.createGain(); LA.wow.gain.value=6; lfo.connect(LA.wow); lfo.start();
    const dl=C.createDelay(); dl.delayTime.value=.34; const fb=C.createGain(); fb.gain.value=.32; dl.connect(fb).connect(dl); LA.box=C.createGain(); LA.box.gain.value=.55; LA.box.connect(m); LA.box.connect(dl); dl.connect(m);
    LA.mood="calm"; laLoop();
  }catch(e){}
}
const NF=n=>440*Math.pow(2,(n-69)/12);
const CHORDS={calm:[[57,60,64],[53,57,60],[48,55,64],[55,59,62]],tense:[[57,60,64],[50,53,57],[52,56,59],[57,60,63]],dream:[[53,57,64],[55,59,62],[52,55,59],[57,60,64]]};
let laI=0, laT=null;
function laLoop(){
  clearTimeout(laT); const C=LA.c; if(!C) return;
  const set=CHORDS[LA.mood]||CHORDS.calm, ch=set[laI++%set.length], t=C.currentTime;
  if(LA.mood!=="none") ch.forEach((n,k)=>{ const o=C.createOscillator(); o.type=k?"sine":"triangle"; o.frequency.value=NF(n); LA.wow.connect(o.detune); const g=C.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.05,t+1.6); g.gain.linearRampToValueAtTime(0,t+5.6); o.connect(g).connect(LA.pad); o.start(t); o.stop(t+5.8); });
  LA.pad.gain.setTargetAtTime(LA.mood==="none"?0:1,t,.8);
  if(LA.mood==="tense") laBeat();
  laT=setTimeout(laLoop,4800);
}
function laMood(m){ LA.mood=m; }
function laNote(n,t,dur=.9,v=.12){ const C=LA.c; const o=C.createOscillator(); o.type="triangle"; o.frequency.value=NF(n); const g=C.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(v,t+.01); g.gain.exponentialRampToValueAtTime(.0005,t+dur); o.connect(g).connect(LA.box); o.start(t); o.stop(t+dur+.05); }
function laTheme(){ if(!LA.c) return; const t=LA.c.currentTime+.1; [[76,0],[74,.45],[72,.9],[76,1.35],[69,1.8],[72,2.7],[71,3.15],[69,3.6],[67,4.05],[69,4.5]].forEach(([n,d])=>laNote(n,t+d,1.4)); }
function laChime(){ if(!LA.c) return; const t=LA.c.currentTime+.05; [[81,0],[76,.18],[84,.36]].forEach(([n,d])=>laNote(n,t+d,1.2,.08)); }
function laBeat(){ const C=LA.c; if(!C) return; [0,.28].forEach(d=>{ const t=C.currentTime+d, o=C.createOscillator(); o.type="sine"; o.frequency.setValueAtTime(70,t); o.frequency.exponentialRampToValueAtTime(40,t+.18); const g=C.createGain(); g.gain.setValueAtTime(.35,t); g.gain.exponentialRampToValueAtTime(.001,t+.25); o.connect(g).connect(LA.m); o.start(t); o.stop(t+.3); }); }
function laClunk(){ const C=LA.c; if(!C) return; const t=C.currentTime, o=C.createOscillator(); o.type="square"; o.frequency.setValueAtTime(140,t); o.frequency.exponentialRampToValueAtTime(50,t+.08); const g=C.createGain(); g.gain.setValueAtTime(.12,t); g.gain.exponentialRampToValueAtTime(.001,t+.1); o.connect(g).connect(LA.m); o.start(t); o.stop(t+.12); }
function laStatic(v){ if(LA.stat) LA.stat.gain.setTargetAtTime(v,LA.c.currentTime,.05); }
function laSweep(){ const C=LA.c; if(!C) return; const t=C.currentTime, o=C.createOscillator(); o.type="sawtooth"; o.frequency.setValueAtTime(900,t); o.frequency.exponentialRampToValueAtTime(30,t+4.5); const g=C.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.08,t+.5); g.gain.linearRampToValueAtTime(0,t+4.6); o.connect(g).connect(LA.m); o.start(t); o.stop(t+4.7); laStatic(.25); setTimeout(()=>laStatic(0),4500); }
function laMuteSet(){ if(LA.m) LA.m.gain.setTargetAtTime(S.ac.mute?0:.9,LA.c.currentTime,.1); }

