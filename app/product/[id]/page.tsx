import { products, getProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import AddToCartButton from "./add-to-cart-button";
import ImageGallery from "@/app/ui/image-gallery";
import CartBadge from "@/app/ui/cart-badge";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

const themeMap: Record<
  string,
  { frame: string; blockA: string; blockB: string }
> = {
  gold: {
    frame: "bg-[linear-gradient(135deg,#6b2d12_0%,#f59e0b_42%,#fff1d6_100%)]",
    blockA: "bg-[rgba(255,236,179,0.85)]",
    blockB: "bg-[rgba(124,45,18,0.82)]",
  },
  slate: {
    frame: "bg-[linear-gradient(135deg,#111827_0%,#475569_55%,#cbd5e1_100%)]",
    blockA: "bg-[rgba(255,255,255,0.78)]",
    blockB: "bg-[rgba(203,213,225,0.75)]",
  },
  orange: {
    frame: "bg-[linear-gradient(135deg,#7c2d12_0%,#fb923c_48%,#ffedd5_100%)]",
    blockA: "bg-[rgba(255,255,255,0.74)]",
    blockB: "bg-[rgba(253,186,116,0.92)]",
  },
  lime: {
    frame: "bg-[linear-gradient(135deg,#f8fafc_0%,#fde68a_42%,#65a30d_100%)]",
    blockA: "bg-[rgba(255,255,255,0.82)]",
    blockB: "bg-[rgba(132,204,22,0.85)]",
  },
  violet: {
    frame: "bg-[linear-gradient(135deg,#5b21b6_0%,#d8b4fe_52%,#1f2937_100%)]",
    blockA: "bg-[rgba(255,255,255,0.8)]",
    blockB: "bg-[rgba(196,181,253,0.86)]",
  },
  mint: {
    frame: "bg-[linear-gradient(135deg,#d1fae5_0%,#93c5fd_44%,#fde68a_100%)]",
    blockA: "bg-[rgba(255,255,255,0.84)]",
    blockB: "bg-[rgba(253,224,71,0.78)]",
  },
  forest: {
    frame: "bg-[linear-gradient(135deg,#14532d_0%,#4ade80_45%,#ecfccb_100%)]",
    blockA: "bg-[rgba(255,255,255,0.82)]",
    blockB: "bg-[rgba(34,197,94,0.84)]",
  },
  rose: {
    frame: "bg-[linear-gradient(135deg,#881337_0%,#fb7185_48%,#ffe4e6_100%)]",
    blockA: "bg-[rgba(255,255,255,0.78)]",
    blockB: "bg-[rgba(251,113,133,0.82)]",
  },
  sage: {
    frame: "bg-[linear-gradient(135deg,#3f6212_0%,#84cc16_42%,#f7fee7_100%)]",
    blockA: "bg-[rgba(255,255,255,0.78)]",
    blockB: "bg-[rgba(187,247,208,0.72)]",
  },
  lavender: {
    frame: "bg-[linear-gradient(135deg,#c4b5fd_0%,#f5d0fe_48%,#dbeafe_100%)]",
    blockA: "bg-[rgba(255,255,255,0.88)]",
    blockB: "bg-[rgba(196,181,253,0.84)]",
  },
  amber: {
    frame: "bg-[linear-gradient(135deg,#fef3c7_0%,#93c5fd_40%,#d97706_100%)]",
    blockA: "bg-[rgba(255,255,255,0.88)]",
    blockB: "bg-[rgba(120,53,15,0.8)]",
  },
  sky: {
    frame: "bg-[linear-gradient(135deg,#ffffff_0%,#dbeafe_45%,#fca5a5_100%)]",
    blockA: "bg-[rgba(255,255,255,0.92)]",
    blockB: "bg-[rgba(59,130,246,0.2)]",
  },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#eee] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[48px] max-w-[1220px] items-center gap-4 px-4">
          <Link
            href="/"
            className="text-[22px] font-semibold tracking-tight text-[#ff0036]"
          >
            TM
          </Link>
          <div className="flex h-[34px] flex-1 max-w-[480px] items-center rounded-[12px] border-2 border-[#ff0036] bg-white pl-3 pr-1">
            <input
              aria-label="Tìm kiếm"
              placeholder="Tìm kiếm sản phẩm..."
              className="min-w-0 flex-1 text-[13px] text-[#111] outline-none bg-transparent"
            />
            <button className="h-[26px] rounded-[8px] bg-[#ff0036] px-3 text-[12px] font-semibold text-white">
              Tìm
            </button>
          </div>
          <div className="ml-auto">
            <CartBadge />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1220px] px-4 py-2">
        <nav className="flex items-center gap-1.5 text-[12px] text-[#999]">
          <Link href="/" className="hover:text-[#ff0036]">
            Trang chủ
          </Link>
          <span>›</span>
          <span className="text-[#555] line-clamp-1">{product.title}</span>
        </nav>
      </div>

      {/* ===== MAIN CARD — fits in viewport ===== */}
      <div className="mx-auto max-w-[1220px] px-4">
        <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col lg:flex-row">
            <ImageGallery images={product.images} accent={product.accent} />

            <div className="flex flex-1 flex-col gap-3 p-4 lg:py-5 lg:pr-6">
              {/* Title */}
              <div className="flex items-start gap-2">
                <span className="mt-1 shrink-0 rounded-[4px] bg-[#ff0036] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                  {product.accent}
                </span>
                <h1 className="text-[17px] font-bold leading-[1.35] text-[#1f2329] lg:text-[20px]">
                  {product.title}
                </h1>
              </div>

              {/* Price row */}
              <div className="flex flex-wrap items-end gap-2.5 rounded-[10px] bg-[linear-gradient(135deg,#fff5f5,#fff0f3)] px-4 py-2.5">
                <span className="text-[26px] font-bold leading-none tracking-tight text-[#ff0036] lg:text-[28px]">
                  {product.price}
                </span>
                <span className="mb-0.5 text-[13px] text-[#ccc] line-through">
                  {(product.priceNum * 1.3).toLocaleString("vi-VN")}đ
                </span>
                <span className="mb-0.5 rounded-[4px] bg-[#ff0036] px-1.5 py-0.5 text-[10px] font-bold text-white">
                  -23%
                </span>
                <span className="mb-0.5 ml-auto flex items-center gap-1 text-[12px] text-[#999]">
                  <span className="text-[#fbbf24]">★</span>
                  {product.rating} · Đã bán{" "}
                  {product.sold.toLocaleString("vi-VN")}+
                </span>
              </div>

              {/* Specs inline */}
              <div className="flex flex-wrap gap-1.5">
                {product.specs.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-[6px] bg-[#f5f5f5] px-2.5 py-1 text-[11px] text-[#666]"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Policies row */}
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-[#16a34a]">
                  🚚 Miễn phí ship
                </span>
                <span className="h-3 w-px bg-[#e5e5e5]" />
                <span className="flex items-center gap-1 text-[#2563eb]">
                  🔄 Đổi trả 15 ngày
                </span>
                <span className="h-3 w-px bg-[#e5e5e5]" />
                <span className="flex items-center gap-1 text-[#ca8a04]">
                  ✅ Chính hãng
                </span>
              </div>

              {/* Add to cart */}
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== BELOW FOLD — Mô tả chi tiết + Sản phẩm liên quan ===== */}
      <div className="mx-auto max-w-[1220px] px-4 pb-12 pt-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
          {/* Mô tả chi tiết */}
          <div className="flex-1 rounded-[16px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] lg:p-6">
            <h2 className="mb-4 text-[16px] font-bold text-[#222]">
              Mô tả chi tiết sản phẩm
            </h2>
            <p className="text-[14px] leading-[1.9] text-[#555]">
              {product.description}
            </p>

            <div className="mt-5 rounded-[12px] bg-[#fafafa] p-4">
              <p className="mb-3 text-[13px] font-semibold text-[#333]">
                Thông số chi tiết
              </p>
              <div className="divide-y divide-[#eee]">
                {product.specs.map((spec) => {
                  const [label, ...rest] = spec.split(": ");
                  const value = rest.join(": ");
                  return (
                    <div key={spec} className="flex gap-3 py-2 text-[13px]">
                      <span className="w-[130px] shrink-0 text-[#999]">
                        {label}
                      </span>
                      <span className="font-medium text-[#333]">
                        {value || label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center gap-1.5 rounded-[10px] bg-[#f0fdf4] py-3 text-center">
                <span className="text-[16px]">🚚</span>
                <span className="text-[10px] font-medium leading-tight text-[#16a34a]">
                  Miễn phí
                  <br />
                  vận chuyển
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-[10px] bg-[#eff6ff] py-3 text-center">
                <span className="text-[16px]">🔄</span>
                <span className="text-[10px] font-medium leading-tight text-[#2563eb]">
                  Đổi trả
                  <br />
                  trong 15 ngày
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-[10px] bg-[#fefce8] py-3 text-center">
                <span className="text-[16px]">✅</span>
                <span className="text-[10px] font-medium leading-tight text-[#ca8a04]">
                  Chính hãng
                  <br />
                  100%
                </span>
              </div>
            </div>
          </div>

          {/* Sản phẩm liên quan */}
          <div className="w-full shrink-0 lg:w-[380px]">
            <div className="rounded-[16px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="mb-4 text-[16px] font-bold text-[#222]">
                Sản phẩm liên quan
              </h2>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-2">
                {related.map((p) => {
                  const v = themeMap[p.theme] ?? themeMap.slate;
                  return (
                    <Link
                      key={p.id}
                      href={`/product/${p.id}`}
                      className="group"
                    >
                      <div
                        className={`relative aspect-square overflow-hidden rounded-[12px] ${v.frame}`}
                      >
                        <div
                          className={`absolute left-[10%] top-[12%] h-[52%] w-[36%] rounded-[14px] ${v.blockA}`}
                        />
                        <div
                          className={`absolute right-[10%] top-[8%] h-[58%] w-[34%] rounded-[16px] ${v.blockB}`}
                        />
                        <div className="absolute bottom-[10%] left-[10%] right-[10%] h-[14%] rounded-[10px] bg-white/60" />
                      </div>
                      <p className="mt-2 line-clamp-2 text-[12px] leading-[1.4] text-[#333] group-hover:text-[#ff0036]">
                        {p.title}
                      </p>
                      <p className="mt-1 text-[14px] font-semibold text-[#ff0036]">
                        {p.price}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
