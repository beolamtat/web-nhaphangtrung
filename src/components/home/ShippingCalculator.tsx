"use client";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Info } from "lucide-react";
import { money, RATE } from "@/data/home/pricing";
import { calculateShipping, type ShippingMethod } from "@/lib/shipping";
import { Reveal, Counter } from "./Animation";
export default function ShippingCalculator() {
  const [price, setPrice] = useState(35);
  const [quantity, setQuantity] = useState(20);
  const [weight, setWeight] = useState(5);
  const [shipping, setShipping] = useState<ShippingMethod>("road");
  const { goods, fee, freight, total } = calculateShipping({
    price,
    quantity,
    weight,
    shipping,
  });
  return (
    <section className="section container calculator" id="bang-gia">
      <Reveal>
        <span className="eyebrow red">01 / CHỦ ĐỘNG TỪ CON SỐ ĐẦU TIÊN</span>
        <h2>
          Biết trước chi phí.
          <br />
          <span className="muted">Không còn nhập hàng theo cảm tính.</span>
        </h2>
        <p>
          Không cần đoán. Biết trước ngân sách cho lô hàng tiếp theo của bạn.
        </p>
        <div className="rate">
          <span>¥</span>
          <div>
            Tỷ giá minh họa
            <strong>
              1 CNY <ArrowRight size={15} /> {money(RATE)}
            </strong>
          </div>
        </div>
        <p className="fine-print">
          <Info size={15} /> Công cụ ước tính, không phải báo giá chính thức.
          Chưa gồm thuế, phí nội địa Trung Quốc và phụ phí nếu có.
        </p>
      </Reveal>
      <Reveal className="calculator-panel">
        <div className="panel-title">
          <span><i className="ledger-seal" lang="zh-Hans" aria-hidden="true">算</i> Sổ dự tính chi phí</span>
          <span className="live-label">
            <span className="live-dot" /> ƯỚC TÍNH
          </span>
        </div>
        <div className="fields">
          {[
            {
              label: "Giá sản phẩm (¥)",
              symbol:"价",
              value: price,
              set: setPrice,
              min: 0,
              step: 0.1,
            },
            {
              label: "Số lượng",
              symbol:"量",
              value: quantity,
              set: setQuantity,
              min: 1,
              step: 1,
            },
            {
              label: "Tổng cân nặng (kg)",
              symbol:"重",
              value: weight,
              set: setWeight,
              min: 0,
              step: 0.1,
            },
          ].map((f) => (
            <label key={f.label}>
              <span className="field-caption"><i aria-hidden="true" lang="zh-Hans">{f.symbol}</i>{f.label}</span>
              <input
                type="number"
                aria-label={f.label}
                inputMode={f.step === 1 ? "numeric" : "decimal"}
                min={f.min}
                max={1000000}
                step={f.step}
                value={f.value}
                onChange={(e) =>
                  f.set(
                    Math.min(
                      1000000,
                      Math.max(
                        f.min,
                        (f.step === 1
                          ? Math.floor(Number(e.target.value))
                          : Number(e.target.value)) || f.min,
                      ),
                    ),
                  )
                }
              />
            </label>
          ))}
          <label>
            <span className="field-caption"><i aria-hidden="true" lang="zh-Hans">运</i>Hình thức vận chuyển</span>
            <select
              aria-label="Hình thức vận chuyển"
              value={shipping}
              onChange={(e) => setShipping(e.target.value as ShippingMethod)}
            >
              <option value="road">Đường bộ</option>
              <option value="air">Đường bay</option>
            </select>
            <small className="shipping-rate-hint">{shipping === "road" ? "28.000" : "65.000"} đ/kg · Cước minh họa</small>
          </label>
        </div>
        <div className="cost-lines">
          <div>
            <span>Tiền hàng</span>
            <strong>{money(goods)}</strong>
          </div>
          <div>
            <span>
              Phí dịch vụ <small>(3%)</small>
            </span>
            <strong>{money(fee)}</strong>
          </div>
          <div>
            <span>Phí vận chuyển</span>
            <strong>{money(freight)}</strong>
          </div>
        </div>
        <div className="total" aria-live="polite">
          <span>Tổng dự kiến</span>
          <strong>
            <Counter value={total} /> <small>đ</small>
          </strong>
        </div>
        <a className="button full" href="#dat-hang">
          Bắt đầu với đơn hàng của bạn <ArrowUpRight size={18} />
        </a>
      </Reveal>
    </section>
  );
}
