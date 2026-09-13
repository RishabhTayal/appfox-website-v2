"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { ScrollFade } from "@/components/ui/Motion";

interface PremiumCtaBandProps {
  headline: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Enhanced CTA band with refined typography and subtle animations.
 * Final conversion moment before the footer.
 */

export function PremiumCtaBand({
  headline,
  body,
  primaryLabel = "Get started free",
  primaryHref = site.installUrl,
  secondaryLabel,
  secondaryHref,
}: PremiumCtaBandProps) {
  return (
    <section className="night-wash grain relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
        <ScrollFade>
          <h2 className="text-cream-on-night mx-auto max-w-3xl">
            {headline}
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist-on-night">
            {body}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a href={primaryHref} className="btn-primary !px-8 !py-4 !text-[1.0625rem]">
              {primaryLabel}
            </a>
            {secondaryLabel && secondaryHref && (
              <a href={secondaryHref} className="btn-secondary on-night !px-8 !py-4 !text-[1.0625rem]">
                {secondaryLabel}
              </a>
            )}
          </motion.div>

          <p className="till mt-6 text-[0.9375rem] text-mist-on-night/70">
            Free to start · No credit card required · 5-minute setup
          </p>
        </ScrollFade>
      </div>

      {/* Ambient glow orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-marigold-500/8 blur-[120px]" />
      </div>
    </section>
  );
}
