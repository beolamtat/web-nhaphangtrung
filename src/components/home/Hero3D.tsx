"use client";
import dynamic from "next/dynamic";
import PackageVisual from "./PackageVisual";
import { useEffect, useState } from "react";
import { ShieldCheck, MapPin, Box } from "lucide-react";
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <PackageVisual />,
});
export default function Hero3D() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => {
      if (
        !query.matches ||
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)
      ) {
        setEnabled(false);
        return;
      }
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setEnabled(!!gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <div
      className="hero-art"
      aria-label="Minh họa kiện hàng vận chuyển từ Trung Quốc về Việt Nam"
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="art-grid" />
      <div className="art-caption">THƯƠNG MẠI KHÔNG BIÊN GIỚI / 01</div>
      <div className="china-label">
        <span className="flag">CN</span>
        <div>
          QUẢNG CHÂU<small>Kho Trung Quốc</small>
        </div>
        <span className="live-dot" />
      </div>
      <div className="scene">{enabled ? <Scene /> : <PackageVisual />}</div>
      <div className="package-label">
        <Box size={14} /> NHT EXPRESS <span>中国 → 越南</span>
      </div>
      <div className="delivery-card">
        <span className="delivery-icon">
          <ShieldCheck size={20} />
        </span>
        <div>
          Hành trình được kết nối
          <small>Từ nhà cung cấp đến tận tay bạn</small>
        </div>
        <span className="tiny-dot" />
      </div>
      <div className="vietnam-label">
        <MapPin size={21} />
        <div>
          HÀ NỘI, VIỆT NAM<small>Điểm đến của cơ hội mới</small>
        </div>
      </div>
      <div className="art-coordinate">23.1291° N / 113.2644° E</div>
      <div className="art-word">无界</div>
    </div>
  );
}
