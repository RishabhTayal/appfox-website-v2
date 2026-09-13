"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { ThreeHero } from "@/components/three/ThreeHero";

/**
 * Playful hero with fox energy! Quirky layout, cursor-reactive,
 * bouncy animations, and personality throughout.
 */

export function PlayfulHero() {
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  const cursorXSpring = useTransform(x, (value) => (value - windowSize.width / 2) / 50);
  const cursorYSpring = useTransform(y, (value) => (value - windowSize.height / 2) / 50);

  const words = ["Grow", "revenue", "from", "every", "order"];

  return (
    <section className="paper-wash grain grain-soft relative overflow-hidden">
      {/* Playful blob backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ x: cursorXSpring, y: cursorYSpring }}
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-fox-300/30 to-fox-500/20 blur-[120px]"
        />
        <motion.div
          style={{ x: useTransform(cursorXSpring, (v) => -v * 0.8), y: useTransform(cursorYSpring, (v) => -v * 0.8) }}
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-brand-300/40 to-marigold-300/30 blur-[100px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28 lg:px-10 lg:pt-44 lg:pb-32">
        <div className="grid items-center gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left: Playful copy with character */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center lg:text-left"
          >
            {/* Playful badge with bounce */}
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -3 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="inline-block"
            >
              <span className="till inline-flex items-center rounded-full border-2 border-fox-500 bg-fox-bg px-5 py-2.5 text-[0.875rem] font-semibold text-fox-700 shadow-lg">
                <span className="mr-2 text-[1.2rem]">🦊</span>
                Three apps · Built for Shopify
              </span>
            </motion.div>

            {/* Headline with playful word hovers */}
            <h1 className="mx-auto mt-10 max-w-4xl lg:mx-0">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  onHoverStart={() => setHoveredWord(i)}
                  onHoverEnd={() => setHoveredWord(null)}
                  className={`inline-block mr-[0.25em] cursor-default transition-all duration-200 ${
                    i === 4 ? "wonk" : ""
                  }`}
                  style={{
                    transform: hoveredWord === i ? "scale(1.05) rotate(-2deg)" : "scale(1) rotate(0deg)",
                    color: hoveredWord === i ? (i === 4 ? "var(--color-fox-500)" : "var(--color-brand-600)") : undefined,
                  }}
                >
                  {word}
                </motion.span>
              ))}
              
              {/* Playful underline squiggle */}
              <motion.svg
                className="absolute -bottom-[0.15em] left-0 w-full h-[0.25em] pointer-events-none"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                style={{ 
                  marginTop: "-0.5em",
                  marginLeft: hoveredWord === 4 ? "-0.05em" : "0"
                }}
              >
                <motion.path
                  d="M5 15 Q 40 5, 60 12 T 120 12 T 195 8"
                  fill="none"
                  stroke="var(--color-fox-300)"
                  strokeWidth={6}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut" }}
                />
              </motion.svg>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mx-auto mt-10 max-w-[54ch] text-[1.15rem] leading-[1.7] text-ink-700 lg:mx-0"
            >
              Customers subscribe right from your product page, fix their own orders,
              and add to them after checkout. Fewer tickets, bigger carts, happier everyone. 🎉
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row lg:justify-start"
            >
              <motion.a
                href="#apps"
                className="btn-primary group !px-9 !py-5 !text-[1.0625rem] !rounded-2xl relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore the apps 🚀</span>
                {/* Bouncy background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-fox-500 to-fox-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="till mt-6 text-[0.9375rem] text-ink-500"
            >
              <span className="inline-block mr-2">✨</span>
              Free to start · 5-minute setup · No theme code
              <span className="inline-block ml-2">✨</span>
            </motion.p>
          </motion.div>

          {/* Right: Three.js playful scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-[2rem] overflow-hidden border-4 border-fox-300/40 shadow-(--shadow-pop) bg-gradient-to-br from-fox-50/30 to-brand-50/30 backdrop-blur-sm"
            >
              <ThreeHero />
              
              {/* Playful corner badge */}
              <motion.div
                initial={{ scale: 0, rotate: 45 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                className="absolute top-4 right-4 rounded-full bg-fox-500 text-white px-4 py-2 text-xs font-bold shadow-lg"
              >
                LIVE 3D ✨
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
