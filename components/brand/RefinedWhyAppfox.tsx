"use client";

import { motion } from "framer-motion";

/**
 * Refined "Why AppFox" - clean value props with subtle personality.
 * Premium feel, intentional spacing, no gimmicks.
 */

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Built for Shopify",
    description:
      "Native integration with Shopify's APIs, checkout, and admin. No theme code, no headaches — install in 5 minutes and start growing.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <rect
          x={3}
          y={3}
          width={7}
          height={7}
          rx={1}
          stroke="currentColor"
          strokeWidth={2}
        />
        <rect
          x={14}
          y={3}
          width={7}
          height={7}
          rx={1}
          stroke="currentColor"
          strokeWidth={2}
        />
        <rect
          x={14}
          y={14}
          width={7}
          height={7}
          rx={1}
          stroke="currentColor"
          strokeWidth={2}
        />
        <rect
          x={3}
          y={14}
          width={7}
          height={7}
          rx={1}
          stroke="currentColor"
          strokeWidth={2}
        />
      </svg>
    ),
    title: "Works together",
    description:
      "Three apps, one system. Use them separately or together — subscriptions with order editing, bundles with upsells. Designed to compound.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path
          d="M22 12H18L15 21L9 3L6 12H2"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Revenue-focused",
    description:
      "Every feature exists to grow your business. Subscriptions bring customers back, order editing saves revenue, bundles lift AOV. No bloat.",
  },
];

export function RefinedWhyAppfox() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper to-brand-50/30 py-28 sm:py-36 lg:py-44">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="till text-[0.8125rem] font-medium uppercase tracking-[0.15em] text-fox-600">
            Why AppFox
          </p>
          <h2 className="mt-6 mx-auto max-w-3xl">
            Apps that work like you built them
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-700">
            Purpose-built for Shopify merchants who want to grow revenue without complexity.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group relative rounded-2xl border border-paper-edge bg-paper-raised p-8 shadow-(--shadow-card) transition-all duration-300 hover:shadow-(--shadow-raised) hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-fox-100 to-brand-100 p-3.5 text-fox-600 transition-colors group-hover:text-fox-700">
                {value.icon}
              </div>
              
              <h3 className="mt-6 font-display text-[1.375rem] font-bold leading-tight text-ink-900">
                {value.title}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
