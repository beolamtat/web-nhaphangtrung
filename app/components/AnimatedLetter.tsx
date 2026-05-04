"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AnimatedLetter({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <div ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {chars.map((char, i) => {
        const charProgress = i / chars.length;
        const opacity = useTransform(
          scrollYProgress,
          [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
          [0.2, 1]
        );

        return (
          <motion.span key={i} style={{ opacity }} className="whitespace-pre">
            {char}
          </motion.span>
        );
      })}
    </div>
  );
}
