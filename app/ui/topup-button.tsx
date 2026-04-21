"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, Suspense } from "react";

function TopupButtonInner() {
  const searchParams = useSearchParams();

  const handleTopup = useCallback(() => {
    const payload = {
      access_token: searchParams.get("access_token") || "",
      game_id: searchParams.get("game_id") || "180419",
      server_id: searchParams.get("server_id") || "23001",
      server_name: searchParams.get("server_name") || "Bích Dao",
      role_id: searchParams.get("role_id") || "6474205939321801742",
      role_name: searchParams.get("role_name") || "Rufuif",
    };

    if (window.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          screen: "Topupscreens",
          params: payload,
        })
      );
    } else {
      console.error("ReactNativeWebView is not available");
    }
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
