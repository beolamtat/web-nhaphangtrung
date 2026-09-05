import { Box, MoveUpRight } from "lucide-react";
export function FinalCTA() {
  return (
    <section className="final-cta" data-motion="final-cta">
      <Box className="final-box box-one" size={170} strokeWidth={0.5} />
      <Box className="final-box box-two" size={95} strokeWidth={0.6} />
      <div>
        <span className="eyebrow">SƠN HÀ VẠN DẶM · MỘT CHỮ ĐỒNG HÀNH</span>
        <h2>
          Trung Quốc có hàng.
          <br />
          <span>Chúng tôi mang về cho bạn.</span>
        </h2>
        <a className="button" href="#dat-hang">
          Bắt đầu nhập hàng <MoveUpRight size={22} />
        </a>
        <p>Bắt đầu từ một đường link.</p>
      </div>
    </section>
  );
}
