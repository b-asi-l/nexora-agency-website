"use client";
import {Canvas} from "@react-three/fiber";
import {OrbitControls,Environment,ContactShadows} from "@react-three/drei";
export default function SneakerScene({pos,color,metal}:{pos:number[];color:string;metal:boolean}){
  const mp={color,emissive:color,emissiveIntensity:.35,roughness:metal?.25:.08,metalness:metal?1:.1,clearcoat:metal?0:1} as const;
  return <Canvas dpr={[1,1.5]} camera={{position:[4,2.5,5],fov:40}}>
    <ambientLight intensity={.5}/><pointLight position={[3,4,3]} intensity={60} color="#ff8ae8"/>
    <gridHelper args={[12,24,"#a855f7","#2a1f4a"]} position={[0,-1,0]}/><axesHelper args={[3]} position={[-5,-1,-5]}/>
    <group position={[pos[0]*.4,pos[1]*.4,pos[2]*.4]}>
      <mesh position={[0,-.6,0]} scale={[2.2,.25,1]}><capsuleGeometry args={[.5,1,8,16]}/><meshStandardMaterial color="#f5f5ff" roughness={.6}/></mesh>
      <mesh rotation={[0,0,Math.PI/2]} position={[0,-.05,0]} scale={[.9,1.9,.9]}><capsuleGeometry args={[.5,.6,12,24]}/><meshPhysicalMaterial {...mp}/></mesh>
      <mesh position={[-.55,.5,0]} scale={[.55,.9,.6]}><sphereGeometry args={[.6,24,24]}/><meshPhysicalMaterial {...mp}/></mesh>
    </group>
    <ContactShadows position={[0,-1,0]} opacity={.5} blur={2.5} frames={1}/>
    <Environment preset="city"/><OrbitControls enablePan={false} minDistance={4} maxDistance={9} autoRotate autoRotateSpeed={1.2}/>
  </Canvas>}
