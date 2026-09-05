"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { Group } from "three";
function Package() {
  const ref = useRef<Group>(null);
  useFrame(({ clock, pointer, camera }) => {
    camera.position.y = 1 + Math.min(window.scrollY / 1500, 0.4);
    if (ref.current) {
      ref.current.rotation.y = -0.45 + pointer.x * 0.14;
      ref.current.rotation.x = 0.16 + pointer.y * 0.07;
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.08;
    }
  });
  return (
    <group ref={ref} rotation={[0.16, -0.45, -0.08]}>
      <mesh>
        <boxGeometry args={[2.4, 2.1, 2.1]} />
        <meshStandardMaterial color="#dc8e4d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.057, 0]}>
        <boxGeometry args={[0.42, 0.012, 2.12]} />
        <meshStandardMaterial color="#ff3b30" />
      </mesh>
      <mesh position={[0, 0, 1.058]}>
        <boxGeometry args={[0.42, 2.11, 0.012]} />
        <meshStandardMaterial color="#f13b29" />
      </mesh>
      <mesh position={[-0.69, -0.32, 1.07]}>
        <boxGeometry args={[0.64, 0.46, 0.014]} />
        <meshStandardMaterial color="#f5e8d1" />
      </mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[-0.94 + i * 0.043, -0.35, 1.081]}>
          <boxGeometry args={[i % 3 === 0 ? 0.024 : 0.013, 0.24, 0.005]} />
          <meshStandardMaterial color="#29231e" />
        </mesh>
      ))}
      <mesh position={[0.76, -0.72, 1.07]}>
        <boxGeometry args={[0.33, 0.035, 0.01]} />
        <meshStandardMaterial color="#51351e" />
      </mesh>
    </group>
  );
}
export default function Scene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    let visible = true;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    if (wrapper.current) observer.observe(wrapper.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div ref={wrapper} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 1, 6], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 5, 4]} intensity={3} />
        <pointLight position={[-3, -1, 3]} color="#ff492d" intensity={12} />
        <Package />
      </Canvas>
    </div>
  );
}
