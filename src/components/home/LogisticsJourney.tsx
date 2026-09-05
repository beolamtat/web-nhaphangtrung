"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Reveal } from "./Animation";
import { checkpoints } from "@/data/home/tracking";
import TrackingPreview from "./TrackingPreview";
const positions = [[565,105],[395,153],[266,232],[325,313],[473,360]];
const route = "M565 105C510 88 446 107 395 153S278 180 266 232S285 291 325 313S421 330 473 360";
export default function LogisticsJourney() {
  const [selected, setSelected] = useState(2);
  const [paused, setPaused] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const point = checkpoints[selected];
  useEffect(()=>{
    const svg=svgRef.current;if(!svg)return;
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible=false;
    const update=()=>{if(paused||!visible||document.hidden||preference.matches)svg.pauseAnimations();else svg.unpauseAnimations();if(preference.matches)svg.setCurrentTime(0)};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});observer.observe(svg);
    preference.addEventListener('change',update);document.addEventListener('visibilitychange',update);update();
    return()=>{observer.disconnect();preference.removeEventListener('change',update);document.removeEventListener('visibilitychange',update)};
  },[paused]);
  return <section className="section logistics logistics-control" id="hanh-trinh"><div className="container">
    <Reveal className="section-heading"><div><span className="eyebrow red">02 / HÀNH TRÌNH TRONG TẦM TAY</span><h2>Vạn dặm giao thương.<br/><span className="muted">Từng chặng trong tầm mắt.</span></h2></div><p>Từ Quảng Châu đến Hà Nội.<br/>Chọn điểm dừng để xem thông tin.</p></Reveal>
    <div className="journey-layout" data-motion="journey">
      <div className="journey-map parchment-map">
        <div className="map-toolbar"><span>TRUNG QUỐC — VIỆT NAM</span><small>Sơ đồ hành trình minh họa</small></div>
        <div className="trade-map-canvas">
          <svg ref={svgRef} viewBox="0 0 760 440" role="img" aria-label="Sơ đồ minh họa 5 điểm: Quảng Châu, kho Trung Quốc, cửa khẩu, Hà Nội và khách hàng; không theo tỷ lệ địa lý">
            <defs>
              <pattern id="map-grid-paper" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M38 0H0V38" fill="none" stroke="#b7a17d" strokeWidth=".5" opacity=".25"/></pattern>
              <linearGradient id="trade-sea" x2="0" y2="1"><stop stopColor="#dbe0cf"/><stop offset="1" stopColor="#eceddf"/></linearGradient>
              <g id="ink-mountain"><path d="m0 30 20-28 12 16 9-10 23 25" fill="#b4b39a" fillOpacity=".23" stroke="#8c957c" strokeWidth="1"/><path d="m20 2-5 23 11-10m15-7-4 17" fill="none" stroke="#8c957c" strokeWidth=".7"/></g>
            </defs>
            <rect width="760" height="440" fill="#f0e9d8"/>
            <path d="M760 150 684 163 658 196 605 199 559 218 521 229 474 232 455 264 420 288 409 334 423 377 455 440H760Z" fill="url(#trade-sea)" stroke="#a2ab92" strokeWidth="1.5"/>
            <rect width="760" height="440" fill="url(#map-grid-paper)"/>
            <path d="M25 234Q150 196 224 212T347 213Q389 198 430 183" fill="none" stroke="#a89069" strokeDasharray="3 7"/>
            <g opacity=".8"><use href="#ink-mountain" x="95" y="87"/><use href="#ink-mountain" x="153" y="64"/><use href="#ink-mountain" x="185" y="112"/><use href="#ink-mountain" x="245" y="72"/><use href="#ink-mountain" x="100" y="281"/><use href="#ink-mountain" x="147" y="310"/><use href="#ink-mountain" x="207" y="339"/></g>
            <g fill="none" stroke="#a8b4a0" strokeWidth="1" opacity=".65"><path d="M526 293q18-7 36 0t36 0m-47 16q18-7 36 0t36 0m-83 38q18-7 36 0t36 0m5-106q18-7 36 0t36 0"/></g>
            <text x="370" y="60" className="atlas-country">TRUNG QUỐC</text><text x="140" y="390" className="atlas-country">VIỆT NAM</text><text x="589" y="338" className="atlas-sea">BIỂN ĐÔNG</text>
            <g transform="translate(695 57)" stroke="#9d8057" fill="none"><path d="M0-17V17M-12 0H12m-12-17-4 9h8Z"/><text y="-24" textAnchor="middle" stroke="none" fill="#887352" fontSize="9">BẮC</text></g>
            <path d={route} fill="none" stroke="#b58f5e" strokeWidth="8" opacity=".13"/>
            <path id="trade-route" d={route} pathLength="1" fill="none" stroke="#983e30" strokeWidth="2" strokeLinecap="round"/>
            {checkpoints.map((p,i)=>{const [x,y]=positions[i];return <g key={p.code}>
              <circle cx={x} cy={y} r={selected===i?17:10} fill={selected===i?'#963d3018':'#f7f0e1'} stroke="#963d30" strokeWidth={selected===i?1.5:1}/>
              <circle cx={x} cy={y} r="3" fill="#963d30"/>
              <text x={x} y={y-25} textAnchor="middle" className="atlas-city">{p.city}</text>
            </g>})}
            <g className="atlas-carrier" aria-hidden="true">
              <circle r="15" fill="#f7efdb" stroke="#9c4635"/>
              <path d="m-7-4 7-4 7 4v8L0 8l-7-4Zm0 0 7 4 7-4M0 0v8" fill="#b46345" stroke="#f8eed6" strokeWidth="1.2"/>
              <animateMotion dur="16s" repeatCount="indefinite" calcMode="paced"><mpath href="#trade-route"/></animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.04;.94;1" dur="16s" repeatCount="indefinite"/>
            </g>
            <text x="28" y="419" className="atlas-note">SA BÀN GIAO THƯƠNG · KHÔNG THEO TỶ LỆ</text>
          </svg>
          <button className="map-motion-toggle" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?'Tiếp tục mô phỏng hành trình':'Dừng mô phỏng hành trình'}>{paused?<Play size={13}/>:<Pause size={13}/>}<span>{paused?'Tiếp tục':'Dừng mô phỏng'}</span></button>
        </div>
        <div className="checkpoint-tabs" aria-label="Chọn điểm trên hành trình">{checkpoints.map((p,i)=><button key={p.code} aria-pressed={selected===i} className={selected===i?'active':''} onClick={()=>setSelected(i)}><span>0{i+1}</span>{p.city}</button>)}</div>
        <div className="checkpoint-detail" aria-live="polite"><span className="checkpoint-code">{point.code}</span><div><strong>{point.status}</strong><span>{point.city} · {point.time}</span></div><div className="barcode" aria-hidden="true"/></div>
        <div className="journey-bottom"><span>3 kiện hàng</span><span>12,5 kg</span><span>Chuyển động minh họa, không phải GPS trực tiếp</span></div>
      </div>
      <TrackingPreview/>
    </div>
  </div></section>;
}
