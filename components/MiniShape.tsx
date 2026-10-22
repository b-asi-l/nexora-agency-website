"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {useInView} from "framer-motion";
import {useRef} from "react";
import * as THREE from "three";
function Shape({kind}:{kind:"cube"|"torus"}){
  const r=useRef<THREE.Mesh>(null!);
  useFrame((_,d)=>{r.current.rotation.x+=d*.6;r.current.rotation.y+=d*(kind==="torus"?1.2:.8)});
  const c=kind==="cube"?"#7c3aed":"#ec4899";
  return <mesh ref={r}>{kind==="cube"?<boxGeometry args={[1.5,1.5,1.5]}/>:<torusGeometry args={[.9,.35,32,96]}/>}
   <meshPhysicalMaterial color={c} emissive={c} emissiveIntensity={.6} roughness={.15} metalness={.5}/></mesh>}
export default function MiniShape({kind}:{kind:"cube"|"torus"}){
  const ref=useRef(null);const v=useInView(ref);
  return <div ref={ref} className="h-44 w-full"><Canvas frameloop={v?"always":"never"} dpr={1} camera={{position:[0,0,4]}}>
   <ambientLight intensity={.5}/><pointLight position={[3,3,3]} intensity={40}/><Shape kind={kind}/></Canvas></div>}
