"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

interface RefinedCtaBandProps {
  headline: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Refined CTA band - elegant final conversion moment.
 * Clean, confident, no gimmicks.
 */

export function RefinedCtaBand({
  headline,
  body,
  primaryLabel = "Get started free",
  primaryHref = site.installUrl,
  secondaryLabel,
  secondaryHref,
}: RefinedCtaBandProps) {
  return (
    <section className="night-wash grain relative overflow-hidden py-28 sm:py-36 lg:py-44">
      {/* Subtle ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/12 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-fox-500/8 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-cream-on-night mx-auto max-w-3xl">
            {headline}
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-[1.0625rem] leading-relaxed text-mist-on-night"
          >
            {body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={primaryHref}
              className="btn-primary !px-9 !py-4 !text-base !rounded-xl transition-transform hover:scale-[1.02]"
            >
              {primaryLabel}
            </a>
            {secondaryLabel && secondaryHref && (
              <a
                href={secondaryHref}
                className="btn-secondary on-night !px-9 !py-4 !text-base !rounded-xl transition-transform hover:scale-[1.02]"
              >
                {secondaryLabel}
              </a>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="till mt-8 text-[0.875rem] text-mist-on-night/70"
          >
            Free to start · No credit card required · 5-minute setup
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
