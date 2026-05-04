"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({ text, className = "", showAsterisk = false }: WordsPullUpProps) {
  const words = text.split(" ");
  const containerRef = useRef(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { ease: [0.16, 1, 0.3, 1] as any, duration: 0.8 } },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span key={i} variants={item} className="inline-block relative whitespace-pre">
            {word}
            {isLast && showAsterisk && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
            {isLast ? "" : "\u00A0"}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
