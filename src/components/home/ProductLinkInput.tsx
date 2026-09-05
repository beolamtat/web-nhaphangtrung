"use client";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { marketplaces } from "@/data/home/marketplaces";
import { detectMarketplace } from "@/lib/marketplace";
import { LowerPageMotion } from "./Animation";
export default function ProductLinkInput() {
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const market = detectMarketplace(url);
  return (
    <section className="order-section container" id="dat-hang" data-motion="order">
      <LowerPageMotion />
      <span className="order-ink-stroke" aria-hidden="true" />
      <div className="order-heading">
        <div>
          <span className="eyebrow">MỘT ĐƯỜNG LINK. VẠN CƠ HỘI.</span>
          <h2>Bạn muốn nhập sản phẩm nào?</h2>
          <p className="order-intro">Gửi một đường link — mở lối ngàn nguồn hàng.</p>
        </div>
        <span className="order-note">
          Bắt đầu hành trình của bạn tại đây <ArrowUpRight size={16} />
        </span>
      </div>
      <form
        data-market-detected={market ? "true" : "false"}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="link-input">
          <span className="input-seal" lang="zh-Hant" aria-hidden="true">貨</span>
          <input
            id="product-url"
            aria-label="Link sản phẩm"
            aria-describedby="product-url-hint"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-invalid={submitted && !market}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setSubmitted(false);
            }}
            placeholder="Dán link Taobao, 1688, Tmall hoặc Pinduoduo..."
            required
          />
          <button className="button" type="submit">
            <span className="button-seal" lang="zh-Hant" aria-hidden="true">詢</span> Kiểm tra link <ArrowUpRight size={20} />
          </button>
        </div>
        <p id="product-url-hint" className="input-hint">Dán đường link sản phẩm từ sàn bạn chọn. Kiểm tra nguồn hàng, không cần đăng ký.</p>
        <div className="order-platforms">
          <span>NHẬP TỪ</span>
          {marketplaces.map((m) => (
            <span
              key={m.name}
              className={market?.name === m.name ? "selected" : ""}
            >
              {m.name}
            </span>
          ))}
          <span className="secure">
            <CheckCircle2 size={13} /> Kết nối đơn giản. Chi phí rõ ràng.
          </span>
        </div>
        {/* One line at a time: recognition while typing, the verdict after submit. */}
        <div className="input-feedback" aria-live="polite">
          {submitted ? (
            <p className="input-status">
              {market
                ? "Link đã được nhận diện. Đây là bản demo; giá sản phẩm và đơn hàng chưa được xử lý tự động."
                : "Link chưa hợp lệ. Vui lòng sử dụng URL sản phẩm từ Taobao, 1688, Tmall hoặc Pinduoduo."}
            </p>
          ) : (
            market && (
              <p className="input-status">
                <CheckCircle2 size={15} /> Đã nhận diện sản phẩm từ {market.name}
              </p>
            )
          )}
        </div>
      </form>
    </section>
  );
}