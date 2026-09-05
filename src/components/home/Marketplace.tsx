import { ArrowUpRight } from "lucide-react";
import { Reveal, Tilt } from "./Animation";
import { marketplaces } from "@/data/home/marketplaces";
function MarketVisual({ index }: { index: number }) {
  return (
    <div className={`market-visual market-visual-${index}`} aria-hidden="true">
      {index === 0 ? (
        <>
          <span className="factory-roof" />
          <span className="factory-body">源头工厂</span>
          <i />
          <i />
          <i />
        </>
      ) : index === 1 ? (
        <>
          <span className="shopping-bag bag-back">淘</span>
          <span className="shopping-bag bag-front">好物</span>
          <span className="shopping-label">MỖI NGÀY, MỘT Ý TƯỞNG</span>
        </>
      ) : index === 2 ? (
        <>
          <span className="tmall-ear ear-left" />
          <span className="tmall-ear ear-right" />
          <span className="tmall-face">
            <i />
            <i />
          </span>
          <span className="tmall-stamp">CHỌN CHẤT LƯỢNG</span>
        </>
      ) : (
        <>
          <span className="price-ticket ticket-back">拼</span>
          <span className="price-ticket ticket-front">
            ¥<strong>好价</strong>
            <small>CÙNG MUA · GIÁ TỐT</small>
          </span>
        </>
      )}
    </div>
  );
}
export function Marketplace() {
  return (
    <section className="section marketplace-section" id="thi-truong">
      <div className="container">
        <Reveal>
          <span className="eyebrow red">03 / KHÔNG GIỚI HẠN NGUỒN HÀNG</span>
          <h2>
            Một cửa ngõ.
            <br />
            <span className="muted">Toàn bộ thị trường Trung Quốc.</span>
          </h2>
        </Reveal>
        <div className="market-grid">
          {marketplaces.map((m, i) => (
            <Tilt className={`market market-${i}`} key={m.name}>
              <a href={`https://${m.domain}`} target="_blank" rel="noreferrer">
                <div className="market-top">
                  <span>
                    0{i + 1} /{" "}
                    {["NGUỒN SỈ", "BÁN LẺ", "THƯƠNG HIỆU", "MUA CHUNG"][i]}
                  </span>
                  <ArrowUpRight size={20} />
                </div>
                <MarketVisual index={i} />
                <strong>{m.name}</strong>
                <p>{m.subtitle}</p>
                <span className="market-bottom">
                  Khám phá nguồn hàng <ArrowUpRight size={15} />
                </span>
              </a>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
