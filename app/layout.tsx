import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./lib/cart-context";

export const metadata: Metadata = {
  title: "TM",
  description:
    "Trang thương mại điện tử lấy cảm hứng từ Tmall, đã được Việt hóa giao diện bằng Next.js App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
