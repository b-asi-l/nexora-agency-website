"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {useMemo,useRef} from "react";
import * as THREE from "three";
function Jelly({x,z,s,sp,ph,c,y0}:{x:number;z:number;s:number;sp:number;ph:number;c:string;y0:number}){
  const g=useRef<THREE.Group>(null!),b=useRef<THREE.Mesh>(null!);
  useFrame(({clock},d)=>{const t=clock.elapsedTime+ph;
    g.current.position.y+=d*sp;if(g.current.position.y>6)g.current.position.y=-6;
    g.current.position.x=x+Math.sin(t*.6)*.5;
    const k=1+Math.sin(t*2.5)*.08;b.current.scale.set(k,1/k,k)});
  return <group ref={g} position={[x,y0,z]} scale={s}>
   <mesh ref={b}><sphereGeometry args={[1,24,16,0,Math.PI*2,0,Math.PI/1.8]}/><meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.2} transparent opacity={.6} side={THREE.DoubleSide}/></mesh>
   {Array.from({length:6},(_,i)=>{const a=i/6*Math.PI*2;return <mesh key={i} position={[Math.cos(a)*.6,-.9,Math.sin(a)*.6]}><cylinderGeometry args={[.02,.02,1.8,4]}/><meshBasicMaterial color={c} transparent opacity={.6}/></mesh>})}
  </group>}
export default function JellyScene(){
  const js=useMemo(()=>Array.from({length:9},(_,i)=>({x:(Math.random()-.5)*12,z:-Math.random()*5,s:.5+Math.random()*.8,sp:.3+Math.random()*.5,ph:Math.random()*9,y0:-6+Math.random()*12,c:["#22d3ee","#a855f7","#ec4899"][i%3]})),[]);
  return <Canvas dpr={[1,1.5]} camera={{position:[0,0,9],fov:50}} gl={{antialias:false}}>
   <color attach="background" args={["#020616"]}/><fog attach="fog" args={["#020616",6,18]}/>
   <ambientLight intensity={.3}/><pointLight position={[0,6,4]} intensity={60} color="#22d3ee"/>
   {js.map((j,i)=><Jelly key={i} {...j}/>)}</Canvas>}
