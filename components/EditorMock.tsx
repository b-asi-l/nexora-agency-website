"use client";
import dynamic from "next/dynamic";
import {useState} from "react";
const Sneaker=dynamic(()=>import("./SneakerScene"),{ssr:false});
const layers=["Main Camera","Directional Light","Ambient Light","Group","  Cylinder","  Sneaker_Mesh","  Sole"];
function Slider({l,v,set}:{l:string;v:number;set:(n:number)=>void}){return(
<label className="flex items-center gap-3 text-xs text-white/60"><span className="w-4">{l}</span>
<input type="range" min={-5} max={5} step={.1} value={v} onChange={e=>set(+e.target.value)} className="h-1 flex-1 accent-fuchsia-500"/><span className="w-8 text-right tabular-nums">{v.toFixed(1)}</span></label>)}

export default function EditorMock(){
  const [pos,setPos]=useState([0,0,0]);const [color,setColor]=useState("#ff4fd8");
  const [mat,setMat]=useState<"glossy"|"metallic">("glossy");const [sel,setSel]=useState(5);
  return(
  <section id="editor" className="relative mx-auto -mt-24 max-w-7xl px-4 pb-32 pt-16">
    <div className="mb-8 text-center">
      <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
        Live 3D WebGL Configurator
      </span>
      <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
        Touch, Rotate &amp; Customize in Real-Time
      </h2>
      <p className="mt-2 text-sm text-white/60">
        Every website we engineer features interactive 3D objects, real-time lighting shaders, and material customization.
      </p>
    </div>

    <div className="grid h-[640px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a14] shadow-[0_0_120px_#a855f733] md:grid-cols-[220px_1fr_260px]">
     <aside className="hidden border-r border-white/10 p-4 md:block"><p className="mb-3 text-xs font-semibold text-white/40">Scene Graph</p>
      {layers.map((n,i)=><button key={n} onClick={()=>setSel(i)} className={`block w-full whitespace-pre rounded-md px-2 py-1.5 text-left text-sm ${sel===i?"bg-fuchsia-500/20 text-fuchsia-200":"text-white/60 hover:bg-white/5"}`}>{n}</button>)}</aside>
     <div className="relative bg-[radial-gradient(circle_at_50%_40%,#1b1233,#07060d)]"><Sneaker pos={pos} color={color} metal={mat==="metallic"}/>
      <div className="absolute left-3 top-3 flex gap-2 text-xs text-white/50"><span className="rounded bg-white/10 px-2 py-1">Interactive 3D</span><span className="rounded bg-white/10 px-2 py-1">Drag to Rotate</span></div></div>
     <aside className="space-y-5 border-l border-white/10 p-4">
      <div className="space-y-3"><p className="text-xs font-semibold text-white/40">Transform Position</p>{["X","Y","Z"].map((a,i)=><Slider key={a} l={a} v={pos[i]} set={n=>setPos(p=>p.map((x,j)=>j===i?n:x))}/>)}</div>
      <div><p className="mb-2 text-xs font-semibold text-white/40">Object Color</p><div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/40 p-2"><input type="color" value={color} onChange={e=>setColor(e.target.value)} className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent"/><span className="text-sm text-white/70">{color}</span></div></div>
      <div><p className="mb-2 text-xs font-semibold text-white/40">Material Shaders</p><div className="grid grid-cols-2 gap-2">{(["glossy","metallic"] as const).map(m=><button key={m} onClick={()=>setMat(m)} className={`rounded-lg border px-3 py-2 text-sm capitalize ${mat===m?"border-fuchsia-400 bg-fuchsia-500/20":"border-white/10 text-white/60"}`}>{m}</button>)}</div></div>
     </aside></div>
  </section>)}
