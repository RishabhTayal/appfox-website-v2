"use client";

import { motion } from "framer-motion";
import { ScrollFade } from "@/components/ui/Motion";

/**
 * Enhanced "Why AppFox" section with refined design and animations.
 * Three core value props with icon treatments.
 */

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
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
      "Native integration with Shopify's APIs, checkout, and admin. No theme code, no headaches - install in 5 minutes and start growing.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
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
      "Three apps, one system. Use them separately or together - subscriptions with order editing, bundles with upsells. They're designed to compound.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
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

export function PremiumWhyAppfox() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-28 lg:py-36">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <ScrollFade>
          <div className="mb-16 text-center">
            <p className="till text-[0.8125rem] uppercase tracking-[0.14em] text-brand-600">
              Why AppFox
            </p>
            <h2 className="display-alt mt-4 mx-auto max-w-3xl">
              Apps that work like you built them
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-700">
              Purpose-built for Shopify merchants who want to grow revenue without complexity.
            </p>
          </div>
        </ScrollFade>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {VALUES.map((value) => (
            <ScrollFade key={value.title} direction="up">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl border border-paper-edge bg-paper-raised p-8 shadow-(--shadow-card) transition-shadow hover:shadow-(--shadow-raised)"
              >
                <div className="inline-flex items-center justify-center rounded-xl bg-brand-50 p-3 text-brand-600 transition-colors group-hover:bg-brand-100">
                  {value.icon}
                </div>
                <h3 className="mt-6 font-display-alt text-[1.375rem] font-bold text-ink-900">
                  {value.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                  {value.description}
                </p>
              </motion.div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
}
