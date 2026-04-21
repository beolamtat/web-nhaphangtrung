"use client";

import { useState } from "react";
import type { ProductImage } from "@/app/lib/data";

export default function ImageGallery({
  images,
  accent,
}: {
  images: ProductImage[];
  accent: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="flex flex-col gap-2.5 p-4 lg:w-[400px] lg:shrink-0 lg:p-5">
      {/* Main image — capped height, no aspect-square on lg */}
      <div
        className="relative aspect-4/3 w-full overflow-hidden rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-500 lg:aspect-auto lg:h-[300px]"
        style={{ background: current.gradient }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />
        <div
          className="absolute left-[8%] top-[10%] h-[56%] w-[40%] rounded-[16px] shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition-all duration-500"
          style={{ background: current.blockA }}
        />
        <div
          className="absolute right-[8%] top-[6%] h-[64%] w-[38%] rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-500"
          style={{ background: current.blockB }}
        />
        <div className="absolute bottom-[8%] left-[8%] right-[8%] h-[14%] rounded-[12px] bg-white/70 backdrop-blur-md" />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-[#ff4d5d] px-2.5 py-1 text-[11px] font-bold text-white shadow-[0_3px_10px_rgba(255,77,93,0.3)]">
            {accent}
          </span>
        </div>
        <div className="absolute bottom-2.5 right-3 rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {active + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnails — always horizontal */}
      <div className="flex gap-2 overflow-x-auto px-0.5 py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 transition-all duration-200 ${isActive ? "" : "opacity-55 hover:opacity-100"}`}
            >
              <div
                className={`h-[52px] w-[52px] overflow-hidden rounded-[8px] border-2 transition-colors duration-200 ${
                  isActive
                    ? "border-[#ff0036] shadow-[0_0_0_2px_rgba(255,0,54,0.12)]"
                    : "border-transparent hover:border-[#ddd]"
                }`}
                style={{ background: img.gradient }}
              >
                <div className="relative h-full w-full">
                  <div
                    className="absolute left-[12%] top-[10%] h-[50%] w-[35%] rounded-[4px]"
                    style={{ background: img.blockA }}
                  />
                  <div
                    className="absolute right-[12%] top-[8%] h-[55%] w-[32%] rounded-[5px]"
                    style={{ background: img.blockB }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
