"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AuraScene = dynamic(() => import("./AuraScene"), { ssr: false });

/**
 * Capability gate for the hero's WebGL layer. Phones, low-core machines,
 * reduced-motion users and browsers without WebGL2 never download the scene —
 * the CSS/SVG atmosphere already carries the composition on its own.
 */
export default function HeritageAura() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => {
      const cores = navigator.hardwareConcurrency || 4;
      if (!query.matches || cores <= 4) {
        setCount(0);
        return;
      }
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      setCount(gl ? (cores >= 8 ? 320 : 180) : 0);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!count) return null;
  return <AuraScene count={count} />;
}
