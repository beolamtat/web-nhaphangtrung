"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible && !show) return null;

  return (
    <div
      className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 rounded-[16px] bg-white px-5 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8fce8] text-[16px]">
          ✓
        </span>
        <span className="text-[14px] font-medium text-[#333]">{message}</span>
        <Link
          href="/cart"
          className="ml-2 rounded-[10px] bg-[#ff0036] px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[#e4002f]"
        >
          Xem giỏ
        </Link>
      </div>
    </div>
  );
}
