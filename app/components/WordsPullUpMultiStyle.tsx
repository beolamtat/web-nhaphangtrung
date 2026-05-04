"use client";

import { motion } from "framer-motion";

export interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className = "" }: WordsPullUpMultiStyleProps) {
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

  const wordsList: { word: string; className: string }[] = [];

  segments.forEach((seg) => {
    const words = seg.text.split(" ");
    words.forEach((word) => {
      wordsList.push({ word, className: seg.className || "" });
    });
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {wordsList.map((itemObj, i) => {
        const isLast = i === wordsList.length - 1;
        return (
          <motion.span
            key={i}
            variants={item}
            className={`inline-block whitespace-pre ${itemObj.className}`}
          >
            {itemObj.word}
            {isLast ? "" : "\u00A0"}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
