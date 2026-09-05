"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Mist() {
  return (
    <div className="mist-depth scene-parallax" data-depth="4">
      <span className="mountain-mist mist-background" />
      <span className="mountain-mist mist-midground" />
      <span className="mountain-mist mist-foreground" />
    </div>
  );
}

function Birds() {
  return (
    <div className="flock-depth scene-parallax" data-depth="3">
      <div className="distant-flock">
        {[0, 1, 2, 3].map((bird) => (
          <svg key={bird} className={`distant-bird distant-bird-${bird}`} viewBox="0 0 30 12" fill="none">
            <path className="distant-wing distant-wing-left" d="M15 8C10 3 6 2 1 5c5 0 9 2 14 3Z" />
            <path className="distant-wing distant-wing-right" d="M15 8c5-5 9-6 14-3-5 0-9 2-14 3Z" />
            <path className="distant-bird-body" d="M13 8c1.5-1 2.5-1 4 0l-2 3Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

function FishEvent({ fishRef }: { fishRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={fishRef} className="natural-fish-event">
      <span className="fish-ring fish-ring-one" />
      <span className="fish-ring fish-ring-two" />
      <span className="fish-ring fish-ring-three" />
      <span className="fish-water-pool" />
      <span className="fish-splash fish-splash-takeoff"><i /><i /><i /></span>
      <span className="fish-splash fish-splash-landing"><i /><i /><i /></span>
      <Image className="natural-fish" src="/images/heritage-carp-ink-v3.png" alt="" width={420} height={525} sizes="24px" />
    </div>
  );
}

function SailingWake() {
  return (
    <svg className="sailing-wake" viewBox="0 0 240 40" preserveAspectRatio="none" aria-hidden="true">
      <g className="sailing-wake-stream">
        <path d="M152 17C118 14 73 11 8 13M152 19C114 24 64 34 2 35" />
        <path d="M141 18C101 16 68 16 37 17M135 22C101 27 63 30 21 31" />
      </g>
      {[0, 1, 2].map((ring) => <path key={ring} className={`sailing-wake-ring sailing-wake-ring-${ring}`} d="M151 15C135 15 126 18 129 21C132 24 143 25 154 24" />)}
    </svg>
  );
}

function DistantSkiff({ index }: { index: number }) {
  return (
    <div className={`distant-skiff river-skiff river-skiff-${index}`}>
      <SailingWake />
      <Image className="distant-skiff-art" src="/images/heritage-distant-skiff-v3.png" alt="" width={900} height={347} sizes="(max-width: 600px) 72px, 135px" />
    </div>
  );
}

function Water({ fishRef }: { fishRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="river-life scene-parallax" data-depth="6">
      <div className="water-boundary">
        <div className="water-light" />
        <div className="water-reflections">
          <span className="reflection reflection-mountain" />
          <span className="reflection reflection-roof" />
          <span className="reflection reflection-daylight" />
        </div>
        <div className="underwater-life">
          <span className="fish-shadow fish-shadow-one" />
          <span className="fish-shadow fish-shadow-two" />
          <span className="shadow-ripple shadow-ripple-one" />
          <span className="shadow-ripple shadow-ripple-two" />
        </div>
        <FishEvent fishRef={fishRef} />
      </div>
      <div className="river-traffic">
        {[0, 1, 2, 3, 4].map((index) => <DistantSkiff key={index} index={index} />)}
      </div>
    </div>
  );
}

function Snowfall() {
  return <div className="snow-depth scene-parallax" data-depth="5">{Array.from({ length: 12 }, (_, snowflake) => <span key={snowflake} className={`snowflake snowflake-${snowflake}`} />)}</div>;
}

function MidRiverDetails() {
  return (
    <div className="mid-river-depth scene-parallax" data-depth="4">
      <div className="village-smoke" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="river-glints" aria-hidden="true">
        {Array.from({ length: 6 }, (_, glint) => <span key={glint} />)}
      </div>

    </div>
  );
}

function Petals() {
  return (
    <div className="petal-depth scene-parallax" data-depth="6">
      {Array.from({ length: 6 }, (_, petal) => <span key={petal} className={`natural-petal natural-petal-${petal}`} />)}
    </div>
  );
}

export default function HeritageMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const fishRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero) return;
    let visible = true;
    const update = () => hero.classList.toggle("motion-paused", paused || !visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: 0.05 });
    observer.observe(hero);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [paused]);

  useEffect(() => {
    const hero = ref.current?.closest<HTMLElement>("section");
    if (!hero) return;
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const layers = Array.from(hero.querySelectorAll<HTMLElement>(".scene-parallax"));
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const render = () => {
      frame = 0;
      const scrollOffset = Math.max(-1, Math.min(1, -hero.getBoundingClientRect().top / Math.max(hero.offsetHeight, 1)));
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0);
        const x = -pointerX * depth;
        const y = -pointerY * depth * 0.55 + scrollOffset * Math.min(depth, 3);
        layer.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
      });
    };
    const queue = () => { if (!paused && preference.matches && !document.hidden && !frame) frame = requestAnimationFrame(render); };
    const move = (event: PointerEvent) => {
      if (paused || !preference.matches || document.hidden || event.pointerType !== "mouse") return;
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      queue();
    };
    const resetPointer = () => { pointerX = 0; pointerY = 0; queue(); };
    const resetAll = () => {
      pointerX = 0;
      pointerY = 0;
      layers.forEach((layer) => { layer.style.translate = "0px 0px"; });
    };
    const preferenceChange = () => preference.matches ? queue() : resetAll();
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", queue, { passive: true });
    preference.addEventListener("change", preferenceChange);
    queue();
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", queue);
      preference.removeEventListener("change", preferenceChange);
      resetAll();
    };
  }, [paused]);

  useEffect(() => {
    const fish = fishRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fish || paused || reducedMotion.matches) return;
    let nextJump = 0;
    let finishJump = 0;
    let jumpFrame = 0;
    let firstJump = true;
    const schedule = () => {
      const delay = firstJump ? 2_800 + Math.random() * 2_200 : 10_000 + Math.random() * 6_000;
      firstJump = false;
      nextJump = window.setTimeout(() => {
        if (document.hidden || reducedMotion.matches || fish.closest(".motion-paused")) { schedule(); return; }
        // Keep the jump inside the open-water lane at every breakpoint.
        const laneStart = window.innerWidth <= 600 ? 25 : 18;
        const laneWidth = window.innerWidth <= 600 ? 8 : 7;
        fish.style.setProperty("--fish-x", `${(laneStart + Math.random() * laneWidth).toFixed(1)}%`);
        fish.style.setProperty("--fish-rise", `${(20 + Math.random() * 10).toFixed(1)}px`);
        fish.classList.remove("is-active");
        jumpFrame = requestAnimationFrame(() => fish.classList.add("is-active"));
        finishJump = window.setTimeout(() => { fish.classList.remove("is-active"); schedule(); }, 3200);
      }, delay);
    };
    schedule();
    return () => {
      window.clearTimeout(nextJump);
      window.clearTimeout(finishJump);
      cancelAnimationFrame(jumpFrame);
      fish.classList.remove("is-active");
    };
  }, [paused]);

  return (
    <>
      <div className="heritage-atmosphere" ref={ref} aria-hidden="true">
        <Mist />
        <Water fishRef={fishRef} />
        <MidRiverDetails />
        <Birds />
        <Snowfall />
        <Petals />
      </div>
      <button className="motion-toggle" aria-pressed={paused} aria-label={paused ? "Bật chuyển động trang trí" : "Tạm dừng chuyển động trang trí"} onClick={() => setPaused((value) => !value)}>
        {paused ? <Play size={13} /> : <Pause size={13} />}
        <span>{paused ? "Tiếp tục chuyển động" : "Dừng chuyển động"}</span>
      </button>
    </>
  );
}
