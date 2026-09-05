"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShaderMaterial, Vector2 } from "three";

/** Cheap value-noise fbm shared by both materials — three octaves is enough for ink wash. */
const NOISE = `
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),f.x),f.y);}
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<3;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}
`;

const ATMOSPHERE_VERTEX = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;

const ATMOSPHERE_FRAGMENT = `
uniform float uTime,uAspect,uIntensity;uniform vec2 uSun;varying vec2 vUv;${NOISE}
void main(){
  vec2 uv=vec2(vUv.x*uAspect,vUv.y);
  float t=uTime*0.02;

  // The headline column stays untouched paper; the painting starts at 24%.
  float clear=smoothstep(0.30,0.50,vUv.x);

  float mist=smoothstep(0.30,0.86,fbm(vec2(uv.x*2.2-t*1.9,uv.y*3.2+t*0.6)));
  float band=smoothstep(0.04,0.36,vUv.y)*smoothstep(1.0,0.58,vUv.y);
  float m=mist*band*clear;

  // Sunlight: a breathing halo over the painted sun, with slow shafts.
  vec2 toSun=vec2((vUv.x-uSun.x)*uAspect,vUv.y-uSun.y);
  float dist=length(toSun);
  // Bloom around the painted sun, never over its core.
  float glow=exp(-dist*5.0)*(0.82+0.18*sin(uTime*0.32))*smoothstep(0.012,0.062,dist);
  float rays=0.0;
  if(dist<0.75){
    float angle=atan(toSun.y,toSun.x);
    rays=smoothstep(0.44,0.96,fbm(vec2(angle*2.4+uTime*0.045,dist*1.8)));
    rays*=exp(-dist*2.6)*smoothstep(0.02,0.22,dist);
  }
  glow*=clear;rays*=clear;

  // Water: broad shimmer plus fast individual sparkles along the river lane.
  float g=0.0;
  float lane=smoothstep(0.04,0.15,vUv.y)*smoothstep(0.48,0.32,vUv.y);
  if(lane>0.001){
    float shimmer=pow(smoothstep(0.54,0.94,fbm(vec2(uv.x*8.0+t*3.4,uv.y*13.0))),1.5);
    float sparkle=pow(smoothstep(0.70,0.99,fbm(vec2(uv.x*24.0,uv.y*36.0+uTime*0.55))),3.0);
    g=(shimmer*0.75+sparkle*1.35)*lane*clear;
  }

  float total=m+g+glow+rays;
  vec3 col=(vec3(0.99,0.97,0.92)*m+vec3(0.95,0.76,0.36)*g+vec3(1.0,0.85,0.52)*(glow+rays))/max(total,0.0001);
  float a=clamp(m*0.42+g*0.95+glow*0.34+rays*0.40,0.0,1.0)*uIntensity;
  gl_FragColor=vec4(col,a);
  #include <colorspace_fragment>
}`;

const MOTES_VERTEX = `
attribute vec4 aSeed;
uniform float uTime,uPixelRatio,uIntensity;uniform vec2 uViewport,uPointer;
varying float vAlpha;varying float vTint;
void main(){
  vec2 q=position.xy;
  q.y=fract(q.y+uTime*0.006*aSeed.y);
  q.x=fract(q.x+sin(uTime*0.09*aSeed.y+aSeed.x)*0.012);
  float depth=aSeed.z;
  vec2 world=(q-0.5)*uViewport+uPointer*(5.0+depth*26.0);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(world,0.0,1.0);
  gl_PointSize=(2.2+depth*6.4)*uPixelRatio;
  float edge=smoothstep(0.0,0.09,q.y)*smoothstep(1.0,0.85,q.y);
  float clear=smoothstep(0.28,0.50,q.x);
  float twinkle=0.26+0.74*abs(sin(uTime*0.55*aSeed.y+aSeed.w*6.283));
  vAlpha=edge*clear*twinkle*uIntensity;
  vTint=aSeed.w;
}`;

const MOTES_FRAGMENT = `
varying float vAlpha;varying float vTint;
void main(){
  float mask=smoothstep(0.5,0.06,length(gl_PointCoord-0.5));
  vec3 col=mix(vec3(0.86,0.63,0.26),vec3(0.30,0.28,0.24),step(0.84,vTint)*0.85);
  gl_FragColor=vec4(col,mask*vAlpha);
  #include <colorspace_fragment>
}`;

/** Deterministic layout: the same motes every render and every reload, no Math.random in render. */
function random(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/** Drifting mist over the mountains plus warm glints on the river lane. One full-screen quad. */
function Atmosphere({ intensity }: { intensity: React.RefObject<number> }) {
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uAspect: { value: 1 }, uIntensity: { value: 0 }, uSun: { value: new Vector2(0.65, 0.86) } }),
    [],
  );
  const { viewport } = useThree();
  useFrame((_, delta) => {
    const values = material.current?.uniforms;
    if (!values) return;
    values.uTime.value += Math.min(delta, 0.05);
    values.uAspect.value = viewport.width / Math.max(viewport.height, 1);
    values.uIntensity.value += (intensity.current - values.uIntensity.value) * 0.05;
  });
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        depthTest={false}
        uniforms={uniforms}
        vertexShader={ATMOSPHERE_VERTEX}
        fragmentShader={ATMOSPHERE_FRAGMENT}
      />
    </mesh>
  );
}

/** Gold dust and ink motes: one draw call, all motion computed on the GPU. */
function Motes({ count, intensity }: { count: number; intensity: React.RefObject<number> }) {
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uViewport: { value: new Vector2(1, 1) },
      uPointer: { value: new Vector2(0, 0) },
      uPixelRatio: { value: 1 },
      uIntensity: { value: 0 },
    }),
    [],
  );
  const { viewport } = useThree();
  const [positions, seeds] = useMemo(() => {
    const next = random(0x5eed7a0);
    const position = new Float32Array(count * 3);
    const seed = new Float32Array(count * 4);
    for (let i = 0; i < count; i += 1) {
      position[i * 3] = next();
      position[i * 3 + 1] = next();
      seed[i * 4] = next() * 6.283;
      seed[i * 4 + 1] = 0.4 + next() * 1.3;
      seed[i * 4 + 2] = next() ** 1.6;
      seed[i * 4 + 3] = next();
    }
    return [position, seed] as const;
  }, [count]);
  useFrame(({ pointer, gl }, delta) => {
    const values = material.current?.uniforms;
    if (!values) return;
    values.uTime.value += Math.min(delta, 0.05);
    values.uViewport.value.set(viewport.width, viewport.height);
    values.uPixelRatio.value = gl.getPixelRatio();
    values.uPointer.value.lerp(pointer, 0.04);
    values.uIntensity.value += (intensity.current - values.uIntensity.value) * 0.05;
  });
  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 4]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        depthTest={false}
        uniforms={uniforms}
        vertexShader={MOTES_VERTEX}
        fragmentShader={MOTES_FRAGMENT}
      />
    </points>
  );
}

/** Sample the first seconds; a slow device drops to a lighter pixel ratio once, never oscillates. */
function QualityGuard() {
  const { gl } = useThree();
  const stats = useRef({ frames: 0, elapsed: 0, done: false });
  useFrame((_, delta) => {
    const sample = stats.current;
    if (sample.done) return;
    sample.frames += 1;
    sample.elapsed += delta;
    if (sample.frames < 90) return;
    sample.done = true;
    if (sample.elapsed / sample.frames > 0.021 && gl.getPixelRatio() > 1) gl.setPixelRatio(1);
  });
  return null;
}

export default function AuraScene({ count = 320 }: { count?: number }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const intensity = useRef(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const element = wrapper.current;
    const hero = element?.closest<HTMLElement>("section");
    if (!element || !hero) return;
    let visible = true;
    const update = () => {
      const running = visible && !document.hidden && !hero.classList.contains("motion-paused");
      intensity.current = running ? 1 : 0;
      setActive(running);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: 0.02 });
    observer.observe(element);
    // The hero's existing decorative-motion button toggles this class; follow it.
    const classes = new MutationObserver(update);
    classes.observe(hero, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      classes.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={wrapper} className="heritage-aura" aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "never"}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1, near: 0, far: 2 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, depth: false, stencil: false, powerPreference: "high-performance" }}
      >
        <QualityGuard />
        <Atmosphere intensity={intensity} />
        <Motes count={count} intensity={intensity} />
      </Canvas>
    </div>
  );
}
