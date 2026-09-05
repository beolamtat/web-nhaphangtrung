"use client";
import { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { services } from "@/data/home/services";
import { Reveal } from "./Animation";
const seals = ["订", "寻", "付", "运", "验", "商"];
export function Services() {
  const [active, setActive] = useState(0);
  return <section className="section container" id="dich-vu">
    <Reveal className="section-heading"><div><span className="eyebrow red">02 / MỘT ĐỐI TÁC. MỌI GIẢI PHÁP.</span><h2>Bạn chọn điều cần.<br/><span className="muted">Chúng tôi lo từng bước.</span></h2></div><p>Sáu dịch vụ, cùng một cam kết:<br/>chăm chút từng yêu cầu của bạn.</p></Reveal>
    <div className="service-scroll-layout">
      <div className="service-scroll-art" aria-hidden="true">
        <span className="scroll-corner corner-a"/><span className="scroll-corner corner-b"/>
        <span className="scroll-caption">中越商行 · 以信为本</span>
        <div className="service-medallion"><span className="medallion-ring"/><span className="service-seal" key={active} lang="zh-Hans">{seals[active]}</span></div>
        <div className="service-art-caption" key={`caption-${active}`}><small>0{active+1} / DỊCH VỤ ĐỒNG HÀNH</small><h3>{services[active][0]}</h3><span>Một chữ tín. Vạn dặm đồng hành.</span></div>
      </div>
      <div className="service-accordion">
        {services.map(([title,description],i)=><div className={`service-entry ${active===i?'active':''}`} key={title}>
          <h3><button aria-expanded={active===i} aria-controls={`service-detail-${i}`} id={`service-trigger-${i}`} onClick={()=>setActive(i)}><span>0{i+1}</span>{title}{active===i?<Minus size={18}/>:<Plus size={18}/>}</button></h3>
          <div className="service-detail" id={`service-detail-${i}`} role="region" aria-labelledby={`service-trigger-${i}`} hidden={active!==i}><p>{description}</p><a href="#dat-hang">Gửi yêu cầu <ArrowUpRight size={16}/></a></div>
        </div>)}
      </div>
    </div>
  </section>;
}
