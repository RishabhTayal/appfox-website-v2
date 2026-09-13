"use client";

import { motion } from "framer-motion";
import { ThreeHero } from "@/components/three/ThreeHero";
import { fadeInUp, staggerContainer } from "@/components/ui/Motion";

/**
 * Premium brand hero with Three.js scene, refined typography,
 * and polished entrance animations. The 3D scene provides the
 * distinctive "wow" moment while staying on-brand.
 */

export function PremiumHero() {
  return (
    <section className="paper-wash grain grain-soft relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:px-10 lg:pt-40 lg:pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: Premium copy with refined typography */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 text-center lg:text-left"
          >
            <motion.p variants={fadeInUp}>
              <span className="till inline-flex items-center rounded-full border border-brand-200 bg-paper-raised px-4 py-2 text-[0.8125rem] text-brand-700 shadow-(--shadow-card)">
                Three apps · Built for Shopify merchants
              </span>
            </motion.p>

            <motion.h1 variants={fadeInUp} className="mx-auto mt-8 max-w-4xl lg:mx-0">
              Grow revenue from{" "}
              <span className="wonk relative inline-block">
                every order
                <svg
                  className="absolute -bottom-[0.06em] left-0 h-[0.16em] w-full"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 8.5C20 5 38 9.5 56 7 72 4.8 88 7.5 98 5.5"
                    fill="none"
                    stroke="var(--color-marigold-300)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-8 max-w-[56ch] text-[1.125rem] leading-[1.65] text-ink-700 lg:mx-0 lg:text-[1.1875rem]"
            >
              AppFox builds Shopify apps that turn orders into growth. Customers subscribe
              right from your product page, fix their own orders, and add to them after
              checkout.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <a href="#apps" className="btn-primary !px-8 !py-4 !text-[1.0625rem]">
                Explore the apps
              </a>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="till mt-5 text-[0.9375rem] text-ink-500"
            >
              Free to start · 5-minute setup · No theme code
            </motion.p>
          </motion.div>

          {/* Right: Three.js scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-brand-100/50 shadow-(--shadow-pop) bg-gradient-to-br from-brand-50/50 to-paper-raised/30 backdrop-blur-sm">
              <ThreeHero />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
