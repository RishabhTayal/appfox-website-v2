"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { apps } from "@/data/apps";

/**
 * Refined app showcase - clean cards, intentional motion, premium feel.
 * No gimmicks, just craft-quality presentation.
 */

function RefinedTick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-success" fill="none" aria-hidden="true">
      <motion.path
        d="M3.5 13.2 9 18.4 20.5 5.8"
        stroke="currentColor"
        strokeWidth={2.5}
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
  "product-bundles": <BundlesVignette />,
};

export function RefinedShowcase() {
  return (
    <section id="apps" className="relative overflow-hidden bg-paper py-28 sm:py-36 lg:py-44">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="till text-[0.8125rem] font-medium uppercase tracking-[0.15em] text-fox-600">
            Our Apps
          </p>
          <h2 className="mt-6 mx-auto max-w-3xl">
            Three apps, one system
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-700">
            Each app solves one problem exceptionally well. Together, they transform
            your entire order journey.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {apps.map((app, i) => (
            <motion.article
              key={app.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative flex h-full flex-col rounded-2xl border border-paper-edge bg-paper-raised p-10 shadow-(--shadow-card) transition-all duration-300 hover:shadow-(--shadow-raised) hover:-translate-y-1"
            >
              {/* Refined badge - no emoji, clean */}
              <div className="absolute -top-3 left-10 inline-flex items-center rounded-full border border-ink-300/40 bg-paper-raised px-3.5 py-1.5 shadow-sm">
                <span className="till text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-ink-700">
                  Free to Start
                </span>
              </div>

              <p className="till text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-ink-500">
                {String(i + 1).padStart(2, "0")} — {app.pricingLine}
              </p>
              <h3 className="mt-5 font-display text-[2rem] font-bold leading-tight text-ink-900 lg:text-[2.125rem]">
                {app.name}
              </h3>
              <p className="mt-4 text-[1.0625rem] font-semibold text-brand-700">
                {app.tagline}
              </p>

              <div className="mt-8">{VIGNETTES[app.slug]}</div>

              <ul className="mt-8 space-y-3.5 border-t border-paper-edge pt-8">
                {app.highlights.slice(0, 3).map((h, j) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-[0.9375rem] font-medium leading-relaxed text-ink-700"
                  >
                    <RefinedTick delay={300 + i * 100 + j * 60} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-center">
                <Link
                  href={app.href}
                  className="btn-primary !rounded-xl transition-transform hover:scale-[1.02]"
                >
                  Explore {app.shortName}
                </Link>
                <a
                  href={app.installUrl}
                  className="btn-secondary !rounded-xl transition-transform hover:scale-[1.02]"
                >
                  Install free
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderEditVignette() {
  return (
    <div className="rounded-xl border border-paper-edge bg-paper p-5" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between gap-3 border-b border-dashed border-paper-edge pb-4"
      >
        <p className="till flex items-center gap-1.5 text-[0.75rem] text-ink-500">
          <span className="font-semibold text-ink-900">#1042</span> 
          <span>·</span>
          <span>Size M</span>
          <svg className="h-3 w-3 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span>L</span>
        </p>
        <span className="chip chip-success !px-2.5 !py-1 !text-[0.6875rem] font-semibold">
          Auto-applied
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between gap-3 pt-4"
      >
        <p className="till text-[0.75rem] text-ink-500">
          <span className="font-semibold text-ink-900">#1041</span> · Added gift wrap
        </p>
        <span className="till text-[0.75rem] font-semibold text-success">+$4.00</span>
      </motion.div>
    </div>
  );
}

function SubscribeVignette() {
  return (
    <div className="rounded-xl border border-paper-edge bg-paper p-5" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between rounded-lg border border-brand-300 bg-brand-50 px-4 py-3.5"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-paper" />
          </span>
          <span className="text-[0.875rem] font-semibold text-ink-900">
            Subscribe & save 10%
          </span>
        </span>
        <span className="till text-[0.8125rem] font-semibold text-brand-700">$16.20/mo</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-4 flex items-center justify-between gap-3"
      >
        <p className="till text-[0.75rem] text-ink-500">Deliver every 30 days</p>
        <span className="till text-[0.6875rem] text-ink-500">skip · pause · cancel</span>
      </motion.div>
    </div>
  );
}

function BundlesVignette() {
  return (
    <div className="rounded-xl border border-paper-edge bg-paper p-5" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between rounded-lg border border-success/30 bg-success/5 px-4 py-2.5">
          <span className="text-[0.8125rem] font-semibold text-ink-900">
            Buy 3, save 20%
          </span>
          <span className="till text-[0.75rem] font-semibold text-success">-$12.00</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="till text-[0.75rem] text-ink-500">Mix & match eligible</p>
          <span className="chip chip-brand !px-2.5 !py-1 !text-[0.6875rem] font-semibold">
            Active
          </span>
        </div>
      </motion.div>
    </div>
  );
}
