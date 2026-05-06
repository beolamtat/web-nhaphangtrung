"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

// Fake data để test bridge
const FAKE_TOPUP_PARAMS = {
  access_token: "fake_token_abc123xyz",
  role_id: "12345",
  role_name: "TestUser",
  server_id: "S1",
  server_name: "Server 1",
  game_id: "game_001",
  userid: "user_999",
};

function openTopup(): void {
  if (!window.ReactNativeWebView?.postMessage) {
    console.error("[Bridge] ReactNativeWebView is not available");
    alert("[DEV] ReactNativeWebView chưa sẵn sàng\n" + JSON.stringify(FAKE_TOPUP_PARAMS, null, 2));
    return;
  }

  const payload = {
    screen: "Topupscreens",
    params: FAKE_TOPUP_PARAMS,
    gamgameId: "CP202507",
  };

  window.ReactNativeWebView.postMessage(JSON.stringify(payload));
}

function Typewriter({ text, speed = 80, resetTrigger }: { text: string; speed?: number; resetTrigger: number }) {
  const [displayedChars, setDisplayedChars] = useState(0);

  useEffect(() => {
    setDisplayedChars(0);
  }, [resetTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedChars((prev) => Math.min(prev + 1, text.length));
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  const displayedText = text.slice(0, displayedChars);

  return (
    <span className="inline">
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-1.5 md:w-2 h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  );
}

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const prevTimeRef = useRef(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime } = videoRef.current;
      // Phát hiện khi video lặp lại (thời gian hiện tại nhỏ hơn thời gian trước đó)
      if (currentTime < prevTimeRef.current - 0.5) {
        setResetTrigger((prev) => prev + 1);
      }
      prevTimeRef.current = currentTime;
    }
  };

  return (
    <main className="w-full bg-black h-[100dvh] overflow-hidden fixed inset-0">
      <section className="h-[100dvh] w-full relative">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative overflow-hidden"
        >
          <video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />
          <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10 max-w-[85vw] md:max-w-2xl">
            <div className="text-[#DEDBC8] text-sm md:text-base lg:text-lg font-mono tracking-wider leading-relaxed">
              <span className="text-gray-500 mr-3 opacity-50">~</span>
              <Typewriter 
                text="Beolamtat: Writing elegant code & exploring the rhythm of music." 
                speed={150}
                resetTrigger={resetTrigger}
              />
            </div>
          </div>

          {/* Nút Nạp */}
          <motion.button
            id="btn-nap-tien"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openTopup}
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10 flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm md:text-base cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #ff0036 0%, #cc0028 100%)",
              boxShadow: "0 0 24px rgba(255,0,54,0.5), 0 4px 16px rgba(0,0,0,0.4)",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-white/80 inline-block"
            />
            Nạp tiền
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
