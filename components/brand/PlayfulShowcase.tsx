"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { apps } from "@/data/apps";
import { useState } from "react";

/**
 * Playful app showcase with bouncy cards, surprise interactions,
 * and delightful micro-animations.
 */

function BouncyTick({ delay }: { delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="mt-1 h-4 w-4 shrink-0"
      fill="none"
      aria-hidden="true"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, type: "spring", stiffness: 300, damping: 15 }}
    >
      <motion.path
        d="M3.5 13.2 9 18.4 20.5 5.8"
        stroke="var(--color-success)"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay / 1000 + 0.2, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

const VIGNETTES: Record<string, React.ReactNode> = {
  "order-editing": <OrderEditVignette />,
  subscription: <SubscribeVignette />,
};

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02, y: -8 }}
      className="h-full perspective-1000"
    >
      {children}
    </motion.div>
  );
}

export function PlayfulShowcase() {
  return (
    <section id="apps" className="relative overflow-hidden bg-gradient-to-b from-paper to-brand-50/30 py-24 sm:py-32 lg:py-40">
      {/* Playful background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 text-[8rem] opacity-10"
        >
          📦
        </motion.div>
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            rotate: [0, -8, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-16 text-[6rem] opacity-10"
        >
          🦊
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <motion.p
            className="till text-[0.875rem] uppercase tracking-[0.16em] text-fox-600"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mr-2">✦</span>
            Our Apps
            <span className="inline-block ml-2">✦</span>
          </motion.p>
          <h2 className="mt-6 mx-auto max-w-3xl">
            Three apps,{" "}
            <span className="wonk relative">
              one powerful
              <motion.svg
                className="absolute -bottom-[0.1em] left-0 w-full h-[0.2em]"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M5 12 Q 50 4, 100 10 T 195 14"
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
            </span>{" "}
            system
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-700"
          >
            Each app solves one problem exceptionally well. Together, they transform
            your entire order journey. ⚡
          </motion.p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {apps.map((app, i) => (
            <TiltCard key={app.slug} index={i}>
              <article className="relative flex h-full flex-col rounded-3xl border-3 border-paper-edge bg-paper-raised p-9 shadow-(--shadow-raised) sm:p-11">
                {/* Playful sticker */}
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: -6 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                  className="sticker absolute -top-5 left-12 whitespace-nowrap !bg-fox-500 !text-white"
                >
                  FREE START 🎉
                </motion.span>

                <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                  <span className="inline-block mr-2">{i === 0 ? "🎯" : "🚀"}</span>
                  {String(i + 1).padStart(2, "0")} · {app.pricingLine}
                </p>
                <h3 className="mt-6 font-display text-[2rem] font-bold text-ink-900 sm:text-[2.25rem]">
                  {app.name}
                </h3>
                <p className="mt-4 text-[1.0625rem] font-semibold text-brand-700">
                  {app.tagline}
                </p>

                <div className="mt-8">{VIGNETTES[app.slug]}</div>

                <ul className="mt-9 space-y-4 border-t border-paper-edge pt-9">
                  {app.highlights.slice(0, 3).map((h, j) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + j * 0.08 }}
                      className="flex items-start gap-3 text-[0.9375rem] font-medium text-ink-700"
                    >
                      <BouncyTick delay={500 + i * 150 + j * 80} />
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-4 pt-11 sm:flex-row sm:items-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href={app.href} className="btn-primary !rounded-xl">
                      Explore {app.shortName} →
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href={app.installUrl} className="btn-secondary !rounded-xl">
                      Install free
                    </a>
                  </motion.div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderEditVignette() {
  return (
    <div className="rounded-2xl border-2 border-paper-edge bg-paper p-6" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between gap-2 border-b-2 border-dashed border-paper-edge pb-4"
      >
        <p className="till text-[0.75rem] text-ink-500">
          <span className="text-ink-900 font-semibold">#1042</span> · Size M → L
        </p>
        <motion.span
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="chip chip-success !px-3 !py-1 !text-[0.6875rem] tracking-wide font-bold"
        >
          ✓ AUTO-APPLIED
        </motion.span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between gap-2 pt-4"
      >
        <p className="till text-[0.75rem] text-ink-500">
          <span className="text-ink-900 font-semibold">#1041</span> · Added gift wrap 🎁
        </p>
        <span className="till text-[0.75rem] font-bold text-success">+$4.00</span>
      </motion.div>
    </div>
  );
}

function SubscribeVignette() {
  return (
    <div className="rounded-2xl border-2 border-paper-edge bg-paper p-6" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between rounded-xl border-2 border-brand-300 bg-brand-50 px-5 py-4"
      >
        <span className="flex items-center gap-3">
          <motion.span
            className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-600"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="h-2 w-2 rounded-full bg-paper" />
          </motion.span>
          <span className="text-[0.875rem] font-bold text-ink-900">
            Subscribe & save 10% ✨
          </span>
        </span>
        <span className="till text-[0.8125rem] font-bold text-brand-700">$16.20/mo</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-4 flex items-center justify-between gap-2"
      >
        <p className="till text-[0.75rem] text-ink-500">Deliver every 30 days</p>
        <span className="till text-[0.6875rem] text-ink-500">skip · pause · cancel</span>
      </motion.div>
    </div>
  );
}
