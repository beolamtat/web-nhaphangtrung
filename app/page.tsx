"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

function Typewriter({
  text,
  speed = 80,
  resetTrigger,
}: {
  text: string;
  speed?: number;
  resetTrigger: number;
}) {
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
      <section className="h-[100dvh] w-full relative mt-20 ml-20">
        <a href="sms:+84912345678?body=Chao%20ban%20day%20la%20tin%20nhan%20tu%20website">
          Gửi SMS cấu hình sẵn
        </a>
      </section>
    </main>
  );
}
