"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

interface PlayfulCtaBandProps {
  headline: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Playful CTA band with bouncy energy and fox personality.
 */

export function PlayfulCtaBand({
  headline,
  body,
  primaryLabel = "Get started free",
  primaryHref = site.installUrl,
  secondaryLabel,
  secondaryHref,
}: PlayfulCtaBandProps) {
  return (
    <section className="night-wash grain relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Playful glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/20 blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-fox-500/15 blur-[140px]"
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Playful emoji banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 text-[2.5rem]"
          >
            🎉 🚀 ✨
          </motion.div>

          <h2 className="text-cream-on-night mx-auto max-w-3xl">
            {headline}
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-[1.0625rem] leading-relaxed text-mist-on-night"
          >
            {body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <motion.a
              href={primaryHref}
              className="btn-primary group !px-10 !py-5 !text-[1.0625rem] !rounded-2xl relative overflow-hidden"
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{primaryLabel} 🎯</span>
            </motion.a>
            {secondaryLabel && secondaryHref && (
              <motion.a
                href={secondaryHref}
                className="btn-secondary on-night !px-10 !py-5 !text-[1.0625rem] !rounded-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {secondaryLabel}
              </motion.a>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="till mt-8 text-[0.9375rem] text-mist-on-night/80"
          >
            <span className="inline-block mr-2">✨</span>
            Free to start · No credit card · 5-minute setup
            <span className="inline-block ml-2">✨</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
