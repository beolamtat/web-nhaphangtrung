import { ArrowUp } from "lucide-react";
import { Logo } from "./Navbar";

const footerLinks = [
  ["Đặt hàng", "#dat-hang"],
  ["Quy trình", "#cach-hoat-dong"],
  ["Hành trình", "#hanh-trinh"],
  ["Tra cứu", "#theo-doi-don"],
];

export function Footer() {
  return (
    <footer className="heritage-footer">
      <div className="container heritage-footer-main">
        <div className="heritage-footer-brand">
          <Logo />
          <p>
            Một đường hàng thông suốt.
            <br />
            Một chữ tín đồng hành.
          </p>
        </div>

        <nav className="heritage-footer-nav" aria-label="Điều hướng cuối trang">
          <span>KHÁM PHÁ</span>
          {footerLinks.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="heritage-footer-note">
          <span className="footer-seal" lang="zh-Hant" aria-hidden="true">
            信
          </span>
          <p>
            Bản giới thiệu trải nghiệm.
            <br />
            Chưa tiếp nhận đơn hàng hoặc thanh toán trực tuyến.
          </p>
        </div>
      </div>

      <div className="container heritage-footer-bottom">
        <span>© {new Date().getFullYear()} Nhập Hàng Trung</span>
        <span>中越商行 · 通商守信</span>
        <a href="#trang-chu">
          Về đầu trang <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
