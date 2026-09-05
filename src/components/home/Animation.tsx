"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** One observer coordinates the lower-page choreography without React rerenders. */
export function LowerPageMotion() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-motion]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) {
      elements.forEach((element) => element.classList.add("is-in-view"));
      return;
    }

    document.documentElement.classList.add("lower-motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("lower-motion-ready");
    };
  }, []);
  return null;
}
/** One-shot ink-scroll entrance; the server-rendered content stays accessible. */
export function Reveal({children,className=''}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const element=ref.current;
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!element||preference.matches)return;
  let animation:Animation|undefined;
  const observer=new IntersectionObserver(([entry])=>{
   if(!entry.isIntersecting)return;
   animation=element.animate([
    {opacity:.3,transform:'translate3d(0,22px,0)'},
    {opacity:1,transform:'translate3d(0,0,0)'}
   ],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});
   observer.disconnect();
  },{threshold:.08});
  const stop=()=>{if(preference.matches){animation?.cancel();observer.disconnect()}};
  preference.addEventListener('change',stop);
  observer.observe(element);
  return()=>{observer.disconnect();animation?.cancel();preference.removeEventListener('change',stop)};
 },[]);
 return <div ref={ref} className={className}>{children}</div>
}
/** Update a single text node, never the React tree, during the counter animation. */
export function Counter({value,suffix=''}:{value:number;suffix?:string}){
 const ref=useRef<HTMLSpanElement>(null);
 useEffect(()=>{const element=ref.current;if(!element)return;const format=(n:number)=>Math.round(n).toLocaleString('vi-VN')+suffix;element.textContent=format(value);if(!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches)return;let frame=0;const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)return;observer.disconnect();const start=performance.now();let previous=0;const tick=(time:number)=>{const progress=Math.min((time-start)/650,1);if(time-previous>33||progress===1){element.textContent=format(value*(1-(1-progress)**3));previous=time}if(progress<1)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick)});observer.observe(element);return()=>{observer.disconnect();cancelAnimationFrame(frame)}},[value,suffix]);
 return <span ref={ref}>{value.toLocaleString('vi-VN')}{suffix}</span>
}
/** CSS-only hover; touch scrolling never runs pointer or layout handlers. */
export function Tilt({children,className=''}:{children:ReactNode;className?:string}){return <div className={`${className} hover-depth`}>{children}</div>}
