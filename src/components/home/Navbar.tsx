"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function Logo() {
  return (
    <a href="#" className="logo" aria-label="Nhập Hàng Trung - Trang chủ">
      <span className="logo-mark">
        <span className="brand-seal" aria-hidden="true">中</span>
      </span>
      <span>
        NHẬP HÀNG
        <span className="logo-bottom">
          TRUNG<span className="logo-dot">.</span>
        </span>
      </span>
    </a>
  );
}
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrolled = useRef(false);
  useEffect(() => {
    const f = () => {const next=window.scrollY>20;if(next!==lastScrolled.current){lastScrolled.current=next;setScrolled(next)}};
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <header
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <Logo />
        <nav
          id="main-navigation"
          aria-label="Điều hướng chính"
          className={open ? "nav-links open" : "nav-links"}
        >
          {[
            ["Trang chủ", "#"],
            ["Đặt hàng", "#dat-hang"],
            ["Tra hành trình", "#theo-doi-don"],
            ["Hướng dẫn", "#cach-hoat-dong"],
          ].map(([label, url]) => (
            <a key={label} href={url} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="button small" href="#dat-hang">
            Bắt đầu nhập hàng <ArrowUpRight size={16} />
          </a>
          <button
            className="menu"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
