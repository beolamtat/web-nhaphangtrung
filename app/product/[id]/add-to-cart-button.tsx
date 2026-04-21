"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/app/lib/cart-context";
import type { Product } from "@/app/lib/data";
import Toast from "@/app/ui/toast";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);

  function handleAdd() {
    addToCart(product, qty);
    setToastVisible(true);
  }

  const handleCloseToast = useCallback(() => setToastVisible(false), []);

  return (
    <>
      <Toast
        message={`Đã thêm ${qty} sản phẩm vào giỏ hàng`}
        visible={toastVisible}
        onClose={handleCloseToast}
      />
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#888]">Số lượng:</span>
          <div className="flex items-center rounded-[10px] border border-[#e5e5e5]">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center text-[18px] text-[#666] hover:text-[#ff0036] transition"
            >
              −
            </button>
            <span className="flex h-9 w-10 items-center justify-center border-x border-[#e5e5e5] text-[14px] font-medium">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="flex h-9 w-9 items-center justify-center text-[18px] text-[#666] hover:text-[#ff0036] transition"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAdd}
            className="flex h-[48px] items-center justify-center rounded-[14px] bg-[#ff0036] px-8 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(255,0,54,0.2)] transition hover:bg-[#e4002f] active:scale-[0.97]"
          >
            Thêm vào giỏ hàng
          </button>
          <button className="flex h-[48px] items-center justify-center rounded-[14px] border-2 border-[#ff0036] px-6 text-[15px] font-semibold text-[#ff0036] transition hover:bg-[#fff3f5] active:scale-[0.97]">
            Mua ngay
          </button>
        </div>
      </div>
    </>
  );
}
