"use client";
import { useState } from "react";
import { ArrowRight, Search, Link2, Warehouse, PackageCheck } from "lucide-react";
import { Reveal } from "./Animation";
const stages = [
  { glyph: "尋", title: "Chọn nguồn hàng", icon: Search, text: "Chọn sản phẩm từ Taobao, 1688, Tmall hoặc Pinduoduo và sao chép đường link.", note: "Khởi hành từ món hàng bạn muốn kinh doanh." },
  { glyph: "訂", title: "Gửi yêu cầu", icon: Link2, text: "Gửi link, số lượng và yêu cầu kiểm hàng để được xác nhận chi phí trước khi đặt mua.", note: "Rõ sản phẩm. Rõ số lượng. Rõ chi phí." },
  { glyph: "運", title: "Nhập kho & vận chuyển", icon: Warehouse, text: "Hàng được tiếp nhận tại kho Trung Quốc, kiểm đếm theo yêu cầu rồi vận chuyển về Việt Nam.", note: "Mỗi kiện hàng, một hành trình được theo sát." },
  { glyph: "達", title: "Nhận hàng tận tay", icon: PackageCheck, text: "Kiểm tra thông tin bàn giao và nhận hàng tại Việt Nam theo phương án đã thống nhất.", note: "Khép lại chuyến hàng. Mở thêm cơ hội." },
];
export function HowItWorks() {
  const [selected, setSelected] = useState(0);
  return <section className="section process" id="cach-hoat-dong"><div className="container">
    <Reveal className="section-heading"><div><span className="eyebrow red">01 / BỐN CHẶNG, MỘT CHỮ TÍN</span><h2>Từ nguồn hàng.<br/><span className="muted">Đến tay bạn.</span></h2></div><p>Mỗi bước đều rõ ràng.<br/>Chọn từng chặng để khám phá.</p></Reveal>
    <div className="trade-stages" role="tablist" aria-label="Các bước nhập hàng" data-motion="stages">
      {stages.map((s, i) => <button key={s.title} id={`stage-tab-${i}`} role="tab" aria-selected={selected === i} aria-controls="stage-panel" tabIndex={selected === i ? 0 : -1} className={`trade-stage ${selected === i ? 'active' : ''}`} onClick={()=>setSelected(i)} onKeyDown={e=>{
        const next=e.key==='ArrowRight'?(i+1)%4:e.key==='ArrowLeft'?(i+3)%4:e.key==='Home'?0:e.key==='End'?3:null;
        if(next!==null){e.preventDefault();setSelected(next);document.getElementById(`stage-tab-${next}`)?.focus()}
      }}><span className="stage-count">CHẶNG 0{i+1}<s.icon size={18}/></span><span className="stage-glyph" aria-hidden="true" lang="zh-Hant">{s.glyph}</span><strong>{s.title}</strong><span className="stage-line"/></button>)}
    </div>
    <div className="stage-panel" id="stage-panel" role="tabpanel" tabIndex={0} aria-labelledby={`stage-tab-${selected}`} data-motion="ink-panel">
      <div className="stage-copy" key={selected}><span>0{selected+1} / {stages[selected].note}</span><p>{stages[selected].text}</p></div>
      <a href="#dat-hang" className="text-link">Bắt đầu nhập hàng <ArrowRight size={18}/></a>
    </div>
    <p className="process-note">Quy trình dịch vụ minh họa. Bản demo chưa tạo đơn hoặc xử lý thanh toán.</p>
  </div></section>;
}
