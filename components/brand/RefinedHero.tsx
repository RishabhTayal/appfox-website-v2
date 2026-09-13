"use client";

import { motion } from "framer-motion";
import { ThreeHero } from "@/components/three/ThreeHero";

/**
 * Refined hero with subtle personality - craft quality meets playful warmth.
 * Clean layout, intentional motion, no gimmicks.
 */

export function RefinedHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper via-paper to-brand-50/20">
      {/* Subtle ambient glow - not aggressive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-fox-400/8 via-brand-300/8 to-transparent blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32 lg:px-10 lg:pt-48 lg:pb-40">
        <div className="grid items-center gap-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          {/* Left: Clean, refined copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            {/* Refined badge - minimal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-fox-400/30 bg-fox-50/50 px-4 py-2 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-fox-500" />
              <span className="till text-[0.8125rem] font-medium text-fox-700">
                Three Shopify apps
              </span>
            </motion.div>

            {/* Hero headline - clean, bold, readable */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-8 max-w-3xl"
            >
              Grow revenue from{" "}
              <span className="wonk relative">
                every order
                {/* Refined underline - subtle, intentional */}
                <svg
                  className="absolute -bottom-[0.08em] left-0 h-[0.18em] w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M8 8 Q 100 4, 192 8"
                    fill="none"
                    stroke="var(--color-fox-300)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-8 max-w-[52ch] text-[1.125rem] leading-[1.7] text-ink-700"
            >
              Customers subscribe right from your product page, fix their own orders,
              and add to them after checkout. Fewer tickets, bigger carts, more revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#apps"
                className="btn-primary !px-8 !py-4 !text-base !rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore the apps
              </motion.a>
              <a
                href="#how-it-works"
                className="text-[0.9375rem] font-medium text-ink-700 hover:text-fox-600 transition-colors"
              >
                See how it works →
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="till mt-6 text-[0.875rem] text-ink-500"
            >
              Free to start · 5-minute setup · No theme code
            </motion.p>
          </motion.div>

          {/* Right: Refined 3D scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-paper-edge bg-gradient-to-br from-paper-raised/80 to-brand-50/30 shadow-(--shadow-raised) backdrop-blur-sm">
              <ThreeHero />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
