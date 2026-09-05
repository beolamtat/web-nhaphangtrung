"use client";
import Modal from "./Modal";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, X } from "lucide-react";
import { products, money, RATE, type Product } from "@/data/home";
import { Reveal } from "./Animation";
export default function TrendingProducts() {
  const [category, setCategory] = useState("Tất cả");
  const [chosen, setChosen] = useState<Product | null>(null);
  return (
    <section className="section container" id="san-pham">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow red">05 / ĐÓN ĐẦU XU HƯỚNG</span>
          <h2>Đang được nhập nhiều.</h2>
        </div>
        <span className="text-link">
          Cảm hứng cho đơn hàng tiếp theo <ArrowUpRight size={17} />
        </span>
      </Reveal>
      <div className="categories" aria-label="Danh mục sản phẩm">
        {[
          "Tất cả",
          "Thời trang",
          "Phụ kiện",
          "Đồ gia dụng",
          "Điện tử",
          "Trang trí",
          "Làm đẹp",
        ].map((c) => (
          <button
            aria-pressed={c === category}
            className={c === category ? "active" : ""}
            onClick={() => setCategory(c)}
            key={c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {products
          .filter((p) => category === "Tất cả" || p.category === category)
          .slice(0, 4)
          .map((p) => (
            <article className="product" key={p.id}>
              <div className="product-image">
                <Image
                  src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=700&q=80`}
                  alt={p.name}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 23vw"
                />
                <span className="product-market">{p.marketplace}</span>
                <button
                  aria-label={`Nhập ${p.name}`}
                  onClick={() => setChosen(p)}
                >
                  <ArrowUpRight size={21} />
                </button>
              </div>
              <span className="product-category">{p.category}</span>
              <h3>{p.name}</h3>
              <div className="product-price">
                <strong>¥{p.price.toFixed(2)}</strong>
                <span>≈ {money(p.price * RATE)}</span>
              </div>
              <div className="product-bottom">
                <span>Tối thiểu {p.moq} sản phẩm</span>
                <button onClick={() => setChosen(p)}>
                  Nhập sản phẩm <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
      </div>
      <p className="fine-print">
        Sản phẩm và giá minh họa. Hình ảnh mang tính gợi ý, chưa liên kết với
        sản phẩm trên sàn.
      </p>
      {chosen && (
        <Modal label="Thông tin sản phẩm" onClose={() => setChosen(null)}>
          <button
            autoFocus
            aria-label="Đóng"
            className="close"
            onClick={() => setChosen(null)}
          >
            <X />
          </button>
          <span className="eyebrow red">SẢN PHẨM MINH HỌA</span>
          <h2>{chosen.name}</h2>
          <p>
            Giá tham khảo ¥{chosen.price} / sản phẩm · Tối thiểu {chosen.moq}{" "}
            sản phẩm.
          </p>
          <p>
            Để nhập sản phẩm thực tế, hãy dán đường link của nhà cung cấp vào
            công cụ báo giá.
          </p>
          <a
            className="button"
            href="#dat-hang"
            onClick={() => setChosen(null)}
          >
            Dán link sản phẩm <ArrowUpRight size={18} />
          </a>
        </Modal>
      )}
    </section>
  );
}
