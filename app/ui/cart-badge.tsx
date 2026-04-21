"use client";

import Link from "next/link";
import { useCart } from "@/app/lib/cart-context";

export default function CartBadge() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-1.5 text-[14px] text-[#555] hover:text-[#ff0036] transition"
    >
      <span className="text-[18px]">🛒</span>
      <span className="hidden sm:inline">Giỏ hàng</span>
      {totalItems > 0 && (
        <span className="absolute -right-2.5 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ff0036] px-1 text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(255,0,54,0.4)] animate-[cart-pop_0.3s_ease]">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}
