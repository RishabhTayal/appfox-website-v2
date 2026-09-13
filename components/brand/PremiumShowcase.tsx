"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { apps } from "@/data/apps";
import { ScrollFade, HoverLift } from "@/components/ui/Motion";

/**
 * Enhanced app showcase with polished animations and refined card design.
 * Each app gets a premium card treatment with hover effects.
 */

function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <motion.path
        d="M3.5 13.2 9 18.4 20.5 5.8"
        stroke="var(--color-success)"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay / 1000, ease: "easeOut" }}
      />
    </svg>
  );
}

const VIGNETTES: Record<string, React.ReactNode> = {
  "order-editing": <OrderEditVignette />,
  subscription: <SubscribeVignette />,
};

export function PremiumShowcase() {
  return (
    <section id="apps" className="paper-wash grain grain-soft relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 sm:px-8 sm:pt-20 sm:pb-32 lg:px-10">
        <ScrollFade>
          <div className="mb-16 text-center">
            <p className="till text-[0.8125rem] uppercase tracking-[0.14em] text-brand-600">
              Our Apps
            </p>
            <h2 className="display-alt mt-4 mx-auto max-w-3xl">
              Three apps, one powerful system
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-700">
              Each app solves one problem exceptionally well. Together, they transform
              your entire order journey.
            </p>
          </div>
        </ScrollFade>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {apps.map((app, i) => (
            <ScrollFade key={app.slug} direction={i % 2 === 0 ? "left" : "right"}>
              <HoverLift className="h-full">
                <article className="relative flex h-full flex-col rounded-3xl border border-paper-edge bg-paper-raised p-8 shadow-(--shadow-raised) sm:p-10">
                  <span className="sticker absolute -top-4 left-10 whitespace-nowrap">
                    FREE TO START
                  </span>

                  <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                    {String(i + 1).padStart(2, "0")} · {app.pricingLine}
                  </p>
                  <h3 className="mt-5 font-display-alt font-bold !text-[1.875rem] sm:!text-[2.125rem]">
                    {app.name}
                  </h3>
                  <p className="mt-3 text-[1.0625rem] font-semibold text-brand-700">
                    {app.tagline}
                  </p>

                  <div className="mt-8">{VIGNETTES[app.slug]}</div>

                  <ul className="mt-8 space-y-3 border-t border-paper-edge pt-8">
                    {app.highlights.slice(0, 3).map((h, j) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-[0.9375rem] font-medium text-ink-700"
                      >
                        <Tick delay={400 + j * 80} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-center">
                    <Link href={app.href} className="btn-primary">
                      Explore {app.shortName}
                    </Link>
                    <a href={app.installUrl} className="btn-secondary">
                      Install free
                    </a>
                  </div>
                </article>
              </HoverLift>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderEditVignette() {
  return (
    <div className="rounded-2xl border border-paper-edge bg-paper p-5" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between gap-2 border-b border-paper-edge pb-3"
      >
        <p className="till text-[0.6875rem] text-ink-500">
          <span className="text-ink-700">#1042</span> · Size swap M → L
        </p>
        <motion.span
          initial={{ opacity: 0, scale: 1.4, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="chip chip-success !px-2 !py-0.5 !text-[0.625rem] tracking-wide"
        >
          AUTO-APPLIED
        </motion.span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between gap-2 pt-3"
      >
        <p className="till text-[0.6875rem] text-ink-500">
          <span className="text-ink-700">#1041</span> · Added gift wrap
        </p>
        <span className="till text-[0.6875rem] font-semibold text-success">+$4.00 upsell</span>
      </motion.div>
    </div>
  );
}

function SubscribeVignette() {
  return (
    <div className="rounded-2xl border border-paper-edge bg-paper p-5" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between rounded-lg border border-brand-200 bg-brand-50 px-4 py-3"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-paper" />
          </span>
          <span className="text-[0.8125rem] font-semibold text-ink-900">
            Subscribe &amp; save 10%
          </span>
        </span>
        <span className="till text-[0.75rem] font-semibold text-brand-700">$16.20/mo</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-3 flex items-center justify-between gap-2"
      >
        <p className="till text-[0.6875rem] text-ink-500">Deliver every 30 days</p>
        <span className="till text-[0.6875rem] text-ink-500">skip · pause · cancel</span>
      </motion.div>
    </div>
  );
}
