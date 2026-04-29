"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, Suspense } from "react";

function TopupButtonInner() {
  const searchParams = useSearchParams();

  const handleTopup = useCallback(() => {
    const game_id = searchParams.get("game_id") || "1000316";
    const role_id = searchParams.get("role_id") || "2405482333470730";
    const role_name = searchParams.get("role_name") || "SấmNhư";
    const server_id = searchParams.get("server_id") || "56007";
    const server_name = searchParams.get("server_name") || "Chiến Linh S1007";

    const params = new URLSearchParams({ game_id, role_id, role_name, server_id, server_name });
    const url = `gamota://topup?${params.toString()}`;
    const a = document.createElement("a");
    a.href = url;
    a.click();
  }, [searchParams]);

  return (
    <button
      id="topup-btn"
      onClick={handleTopup}
      className="mt-3 flex h-[44px] w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(135deg,#ff6a2d_0%,#ff3347_100%)] text-[15px] font-semibold text-white shadow-[0_10px_22px_rgba(255,51,71,0.22)] transition hover:shadow-[0_14px_28px_rgba(255,51,71,0.32)] active:scale-[0.97]"
    >
      <span className="text-[18px]">💰</span>
      Nạp ngay
    </button>
  );
}

export default function TopupButton() {
  return (
    <Suspense fallback={null}>
      <TopupButtonInner />
    </Suspense>
  );
}
