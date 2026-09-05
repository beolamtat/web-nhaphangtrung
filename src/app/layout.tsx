import type { Metadata } from "next";
import "@fontsource/be-vietnam-pro/latin-400.css";
import "@fontsource/be-vietnam-pro/vietnamese-400.css";
import "@fontsource/be-vietnam-pro/latin-500.css";
import "@fontsource/be-vietnam-pro/vietnamese-500.css";
import "@fontsource/noto-serif/latin-400.css";
import "@fontsource/noto-serif/vietnamese-400.css";
import "@fontsource/noto-serif/latin-500.css";
import "@fontsource/noto-serif/vietnamese-500.css";
import "@fontsource/noto-serif/latin-600.css";
import "@fontsource/noto-serif/vietnamese-600.css";
import "@fontsource/ma-shan-zheng/400.css";
import "./globals.css";
import "@/components/home/commerce.css";
import "@/components/home/heritage.css";

export const metadata: Metadata = {
  title: "Nhập Hàng Trung - Nhập Hàng Trung Quốc, Taobao, 1688",
  metadataBase: new URL("https://www.nhaphangtrung.com"),
  alternates: { canonical: "/" },
  description:
    "Nhập hàng Trung Quốc từ Taobao, 1688, Tmall và Pinduoduo. Tìm nguồn hàng, đặt hàng, thanh toán và vận chuyển Trung - Việt trên một nền tảng.",
  openGraph: {
    title: "Nhập Hàng Trung — Nhập hàng không giới hạn",
    description: "Trung Quốc có hàng. Chúng tôi mang về cho bạn.",
    locale: "vi_VN",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
