"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

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
    <main className="w-full bg-black min-h-screen overflow-hidden">
      <section className="h-screen w-full relative">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10 max-w-[85vw] md:max-w-2xl">
            <div className="text-[#DEDBC8] text-sm md:text-base lg:text-lg font-mono tracking-wider leading-relaxed">
              <span className="text-gray-500 mr-3 opacity-50">~</span>
              <Typewriter 
                text="Beolamtat: Writing elegant code & exploring the rhythm of music." 
                speed={150}
                resetTrigger={resetTrigger}
              />
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
