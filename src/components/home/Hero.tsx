import Image from "next/image";
import HeritageMotion from "./HeritageMotion";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero heritage-hero" id="trang-chu">
      <div className="heritage-landscape scene-parallax" data-depth="2">
        <Image src="/images/heritage-river-evening-v3.webp" alt="Tranh thủy mặc núi non, đình cổ và dòng sông trong ánh chiều vàng" fill preload sizes="100vw" />
      </div>
      <HeritageMotion />
      <div className="hero-copy">
        <div className="eyebrow"><span className="heritage-line" /> TINH HOA NGUỒN HÀNG · VẸN TRÒN CHỮ TÍN</div>
        <div className="imperial-name" lang="zh-Hans" aria-hidden="true">中越商行<span>通商 · 守信</span></div>
        <h1>Nhập hàng<br /><span>Trung Quốc.</span><br /><em>Gói trọn chữ tín.</em></h1>
        <p>Từ muôn nẻo nguồn hàng đến tận tay người Việt.<br />Tìm nguồn, đặt mua và vận chuyển trên một nền tảng — để mỗi chuyến hàng đều an tâm.</p>
        <div className="hero-actions"><a className="button" href="#dat-hang">Bắt đầu nhập hàng <ArrowRight size={18} /></a><a className="heritage-secondary" href="#cach-hoat-dong">Khám phá hành trình <ArrowRight size={16} /></a></div>
        <div className="hero-signature"><span className="cinnabar-seal" aria-hidden="true">信</span><div><strong>Một chữ tín. Vạn dặm đồng hành.</strong><span>Nhập Hàng Trung · Kết nối thương mại Trung — Việt</span></div></div>
      </div>
      <div className="hanging-lanterns" aria-hidden="true">
        <Image className="paper-lantern" src="/images/heritage-lantern-paper.png" alt="" width={1024} height={1536} sizes="110px" />
      </div>
      <div className="vertical-poem" aria-hidden="true"><span>山水相逢</span><span>商路相通</span><i>中越</i></div>
      <div className="hero-bottom"><span>NGUỒN HÀNG PHONG PHÚ · CHI PHÍ MINH BẠCH</span><span>CUỘN ĐỂ KHÁM PHÁ <ArrowDown size={13} /></span><span>QUẢNG CHÂU <span className="red">—</span> HÀ NỘI</span></div>
    </section>
  );
}
