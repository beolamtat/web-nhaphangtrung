'use client';
import {useEffect} from 'react';
export default function Interactions(){
 useEffect(()=>{
 const steps=document.querySelector<HTMLElement>('.steps');const parcel=steps?.querySelector<SVGElement>('.step-track svg');
 if(!steps||!parcel||!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches)return;
 let frame=0;let visible=false;
 const update=()=>{frame=0;const rect=steps.getBoundingClientRect();const ratio=Math.max(0,Math.min(1,(innerHeight*.85-rect.top)/(innerHeight*.6)));parcel.style.transform=`translate3d(${ratio*(rect.width-22)}px,0,0)`};
 const scroll=()=>{if(visible&&!frame)frame=requestAnimationFrame(update)};
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)scroll()});observer.observe(steps);window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll,{passive:true});
 return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll)};
 },[]);return null
}
