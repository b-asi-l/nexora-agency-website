"use client";
import {Canvas,useFrame,useThree} from "@react-three/fiber";
import {Float,Environment,AdaptiveDpr} from "@react-three/drei";
import {useEffect,useMemo,useRef} from "react";
import * as THREE from "three";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const vert=`uniform float t;varying float h;varying vec2 v;
void main(){v=uv;vec3 p=position;float w=sin(p.x*.6+t)*.5+cos(p.y*.5+t*.8)*.5;p.z+=w;h=w;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
const frag=`uniform float t;varying float h;varying vec2 v;
void main(){vec3 a=vec3(.95,.25,.65),b=vec3(.45,.15,.95);vec3 c=mix(b,a,smoothstep(-.8,.8,h)+v.y*.3);c+=pow(max(h,0.),3.)*.5;
float f=smoothstep(0.,.9,v.y);gl_FragColor=vec4(c*(.35+f*.9),1.);}`;

function Liquid(){
  const u=useMemo(()=>({t:{value:0}}),[]);
  useFrame((_,d)=>{u.t.value+=d});
  return <mesh rotation={[-Math.PI/2.4,0,0]} position={[0,-2.6,-6]}>
    <planeGeometry args={[60,40,96,64]}/><shaderMaterial uniforms={u} vertexShader={vert} fragmentShader={frag}/></mesh>;
}
function Fish(){
  const g=useRef<THREE.Group>(null!),tail=useRef<THREE.Mesh>(null!);
  useFrame(({pointer,clock})=>{
    g.current.rotation.y=THREE.MathUtils.lerp(g.current.rotation.y,pointer.x*0.9+Math.PI/2,.06);
    g.current.rotation.x=THREE.MathUtils.lerp(g.current.rotation.x,-pointer.y*.5,.06);
    g.current.position.x=THREE.MathUtils.lerp(g.current.position.x,pointer.x*1.5,.05);
    g.current.position.y=THREE.MathUtils.lerp(g.current.position.y,pointer.y*.8,.05);
    tail.current.rotation.y=Math.sin(clock.elapsedTime*6)*.5;
  });
  const skin=<meshPhysicalMaterial color="#ff7ad9" emissive="#a855f7" emissiveIntensity={.5} roughness={.15} metalness={.3} clearcoat={1}/>;
  return <group ref={g} scale={1.3}>
    <mesh scale={[1.6,.8,.5]}><sphereGeometry args={[.8,32,24]}/>{skin}</mesh>
    <mesh ref={tail} position={[-1.4,0,0]} rotation={[0,0,Math.PI/2]}><coneGeometry args={[.6,.9,3]}/>{skin}</mesh>
    <mesh position={[.1,.7,0]} rotation={[0,0,-.4]} scale={[1,1,.2]}><coneGeometry args={[.4,.7,3]}/>{skin}</mesh>
    {[.5,-.5].map(z=><mesh key={z} position={[.4,-.25,z*.7]} rotation={[.6*Math.sign(z),0,-.6]} scale={[1,1,.15]}><coneGeometry args={[.25,.6,3]}/>{skin}</mesh>)}
    {[.4,-.4].map(z=><mesh key={z} position={[.95,.15,z*.7]}><sphereGeometry args={[.09,12,12]}/><meshBasicMaterial color="#fff"/></mesh>)}
  </group>;
}
function Spheres(){
  const pts=useMemo(()=>Array.from({length:14},(_,i)=>({p:[(Math.random()-.5)*14,(Math.random()-.3)*5,-Math.random()*6-1] as [number,number,number],s:.25+Math.random()*.6,sp:1+Math.random(),k:i})),[]);
  return <>{pts.map(o=><Float key={o.k} speed={o.sp} floatIntensity={2}><mesh position={o.p} scale={o.s}>
    <sphereGeometry args={[1,32,32]}/><meshPhysicalMaterial transmission={.9} thickness={.6} roughness={.05} ior={1.4} color="#f0c8ff" transparent/></mesh></Float>)}</>;
}
function Rig(){
  const {camera}=useThree();
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const tw=gsap.to(camera.position,{z:1.5,y:-1.2,scrollTrigger:{trigger:document.body,start:"top top",end:"+=900",scrub:true}});
    return()=>{tw.scrollTrigger?.kill();tw.kill()};
  },[camera]);
  return null;
}
export default function HeroScene(){
  return <Canvas dpr={[1,1.5]} camera={{position:[0,0,7],fov:50}} gl={{antialias:false,powerPreference:"high-performance"}}>
    <color attach="background" args={["#12051f"]}/><fog attach="fog" args={["#12051f",8,26]}/>
    <ambientLight intensity={.6}/><pointLight position={[4,4,4]} intensity={80} color="#ff6ad5"/><pointLight position={[-5,2,2]} intensity={60} color="#7c3aed"/>
    <Liquid/><Spheres/><Fish/><Environment preset="sunset" background={false}/><Rig/><AdaptiveDpr pixelated/>
  </Canvas>;
}
