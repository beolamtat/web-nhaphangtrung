"use client";

import Link from "next/link";
import { useCart } from "@/app/lib/cart-context";

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <header className="sticky top-0 z-30 border-b border-[#eee] bg-white">
        <div className="mx-auto flex h-[52px] max-w-[1220px] items-center gap-4 px-4">
          <Link
            href="/"
            className="text-[24px] font-semibold tracking-tight text-[#ff0036]"
          >
            TM
          </Link>
          <h1 className="text-[16px] font-semibold text-[#333]">
            Giỏ hàng ({totalItems})
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1220px] px-4 py-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-[20px] bg-white py-16 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <span className="text-[48px]">🛒</span>
            <p className="text-[16px] text-[#888]">Giỏ hàng trống</p>
            <Link
              href="/"
              className="rounded-[12px] bg-[#ff0036] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#e4002f]"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Cart items */}
            <div className="flex flex-1 flex-col gap-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-[16px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-[12px] bg-[#f8f8f8]"
                  >
                    <span className="text-[28px]">📦</span>
                  </Link>
                  <div className="flex flex-1 flex-col gap-2 min-w-0">
                    <Link
                      href={`/product/${product.id}`}
                      className="line-clamp-2 text-[14px] font-medium text-[#333] hover:text-[#ff0036]"
                    >
                      {product.title}
                    </Link>
                    <span className="text-[12px] text-[#999]">
                      {product.shop}
                    </span>
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <span className="text-[16px] font-bold text-[#ff0036]">
                        {product.price}
                      </span>
                      <div className="flex items-center rounded-[8px] border border-[#e5e5e5]">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center text-[16px] text-[#666]"
                        >
                          −
                        </button>
                        <span className="flex h-8 w-8 items-center justify-center border-x border-[#e5e5e5] text-[13px]">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center text-[16px] text-[#666]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[13px] text-[#ccc] hover:text-[#ff0036]"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full shrink-0 rounded-[16px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] lg:w-[340px]">
              <h2 className="mb-4 text-[16px] font-bold text-[#333]">
                Tóm tắt đơn hàng
              </h2>
              <div className="space-y-3 border-b border-[#f0f0f0] pb-4 text-[14px]">
                <div className="flex justify-between text-[#666]">
                  <span>Số sản phẩm</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-[#666]">
                  <span>Phí vận chuyển</span>
                  <span className="text-[#2ecc71] font-medium">Miễn phí</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="text-[15px] font-semibold text-[#333]">
                  Tổng cộng
                </span>
                <span className="text-[22px] font-bold text-[#ff0036]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <button className="mt-5 flex h-[48px] w-full items-center justify-center rounded-[14px] bg-[#ff0036] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(255,0,54,0.2)] transition hover:bg-[#e4002f]">
                Đặt hàng
              </button>
              <Link
                href="/"
                className="mt-3 flex h-[44px] w-full items-center justify-center rounded-[14px] border border-[#e5e5e5] text-[14px] font-medium text-[#666] transition hover:border-[#ff0036] hover:text-[#ff0036]"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
