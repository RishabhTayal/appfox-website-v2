"use client";

import { motion } from "framer-motion";

/**
 * Playful "Why AppFox" with bouncy icons and character.
 */

const VALUES = [
  {
    emoji: "🛍️",
    title: "Built for Shopify",
    description:
      "Native integration with Shopify's APIs, checkout, and admin. No theme code, no headaches - install in 5 minutes and start growing.",
  },
  {
    emoji: "🎪",
    title: "Works together",
    description:
      "Three apps, one system. Use them separately or together - subscriptions with order editing, bundles with upsells. They're designed to compound.",
  },
  {
    emoji: "💰",
    title: "Revenue-focused",
    description:
      "Every feature exists to grow your business. Subscriptions bring customers back, order editing saves revenue, bundles lift AOV. No bloat.",
  },
];

export function PlayfulWhyAppfox() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 sm:py-32 lg:py-40">
      {/* Playful background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-brand-200/30 to-transparent blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-fox-200/30 to-transparent blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.p
            className="till text-[0.875rem] uppercase tracking-[0.16em] text-fox-600"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Why AppFox
          </motion.p>
          <h2 className="mt-6 mx-auto max-w-3xl">
            Apps that work like{" "}
            <span className="wonk relative">
              you built them
              <motion.svg
                className="absolute -bottom-[0.12em] left-0 w-full h-[0.22em]"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M8 14 Q 60 6, 100 12 T 192 10"
                  fill="none"
                  stroke="var(--color-fox-300)"
                  strokeWidth={5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </motion.svg>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-700"
          >
            Purpose-built for Shopify merchants who want to grow revenue without complexity. 🎯
          </motion.p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3 lg:gap-12">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, rotate: i % 2 === 0 ? 2 : -2 }}
              className="group relative rounded-3xl border-3 border-paper-edge bg-paper-raised p-9 shadow-(--shadow-card) transition-shadow hover:shadow-(--shadow-raised)"
            >
              {/* Playful emoji badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-fox-100 to-brand-100 p-4 text-[3rem] transition-transform"
              >
                {value.emoji}
              </motion.div>
              
              <h3 className="mt-7 font-display text-[1.5rem] font-bold text-ink-900">
                {value.title}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
                {value.description}
              </p>

              {/* Playful corner accent */}
              <motion.div
                className="absolute top-4 right-4 h-3 w-3 rounded-full bg-fox-400"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.4 }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                style={{
                  transition: "all 2s ease-in-out infinite",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
