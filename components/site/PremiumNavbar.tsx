"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { apps } from "@/data/apps";
import { Wordmark } from "./Wordmark";

const NAV_LINKS = [{ label: "Blog", href: "/blog" }];

const FEATURES_LINKS = [
  { label: "Order Editing & Upsell", detail: "Self-service edits + upsells", href: "/features/order-editing" },
  { label: "Subscription", detail: "Recurring billing + portal", href: "/features/subscription" },
  { label: "Product Bundles", detail: "Bundle offers + volume discounts", href: "/features/product-bundles" },
];


const SUBSCRIPTION_PATHS = new Set([
  "/subscription",
  "/features/subscription",
  "/pricing/subscription",
]);

const BUNDLES_PATHS = new Set([
  "/product-bundles",
  "/features/product-bundles",
  "/pricing/product-bundles",
]);

function installUrlForPath(pathname: string): string {
  const subscriptionApp = apps.find((a) => a.slug === "subscription");
  const bundlesApp = apps.find((a) => a.slug === "product-bundles");
  if (subscriptionApp && SUBSCRIPTION_PATHS.has(pathname)) return subscriptionApp.installUrl;
  if (bundlesApp && BUNDLES_PATHS.has(pathname)) return bundlesApp.installUrl;
  return site.installUrl;
}

export function PremiumNavbar() {
  const [condensed, setCondensed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const installUrl = installUrlForPath(usePathname() ?? "/");
  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          condensed
            ? "bg-[rgba(245,243,250,0.85)] backdrop-blur-[16px] backdrop-saturate-[1.5] border-b border-paper-edge shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Scroll progress indicator */}
        <motion.div
          style={{ width: progressBarWidth }}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-500 to-marigold-500"
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              condensed ? "h-[64px]" : "h-[76px]"
            }`}
          >
            <Link href="/" aria-label="AppFox home" onClick={() => setMobileOpen(false)}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Wordmark className="text-[1.375rem]" />
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Main">
              {/* Apps dropdown */}
              <div className="relative group">
                <Link
                  href="/apps"
                  className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-ink-700 hover:text-brand-700 transition-colors"
                  aria-haspopup="true"
                >
                  Apps
                  <svg aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="card w-80 p-2 shadow-(--shadow-raised)"
                  >
                    {apps.map((app) => (
                      <Link
                        key={app.slug}
                        href={app.href}
                        className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-brand-50 transition-all duration-200"
                      >
                        <span className="text-[0.9375rem] font-medium text-ink-900">
                          {app.shortName}
                        </span>
                        <span className="till text-[0.6875rem] text-ink-500">{app.tagline}</span>
                      </Link>
                    ))}
                    <div className="border-t border-paper-edge mt-1 pt-1">
                      <Link
                        href="/apps"
                        className="flex px-3 py-2 rounded-lg text-[0.875rem] font-semibold text-brand-700 hover:bg-brand-50 transition-all duration-200"
                      >
                        All apps →
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Features dropdown */}
              <div className="relative group">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-ink-700 hover:text-brand-700 transition-colors"
                  aria-haspopup="true"
                >
                  Features
                  <svg aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300">
                  <div className="card w-80 p-2 shadow-(--shadow-raised)">
                    {FEATURES_LINKS.map((f) => (
                      <Link
                        key={f.href}
                        href={f.href}
                        className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-brand-50 transition-all duration-200"
                      >
                        <span className="text-[0.9375rem] font-medium text-ink-900">{f.label}</span>
                        <span className="till text-[0.6875rem] text-ink-500">{f.detail}</span>
                      </Link>
                    ))}
                    <div className="border-t border-paper-edge mt-1 pt-1">
                      <Link
                        href="/features"
                        className="flex px-3 py-2 rounded-lg text-[0.875rem] font-semibold text-brand-700 hover:bg-brand-50 transition-all duration-200"
                      >
                        All features →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining nav items - simplified for brevity */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.9375rem] font-medium text-ink-700 hover:text-brand-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/pricing"
                className="text-[0.9375rem] font-medium text-ink-700 hover:text-brand-700 transition-colors"
              >
                Pricing
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-5">
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-[0.9375rem] font-medium text-ink-500 hover:text-ink-900 transition-colors"
              >
                Support
              </a>
              <motion.a
                href={installUrl}
                className="btn-primary !px-5 !py-2.5 !text-[0.9375rem]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Install free
              </motion.a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 -mr-2 text-ink-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 top-[64px] bg-paper z-40 overflow-y-auto"
        >
          <nav className="px-6 py-8 flex flex-col" aria-label="Mobile">
            {[
              { label: "Apps", href: "/apps" },
              { label: "Features", href: "/features" },
              ...NAV_LINKS,
              { label: "Pricing", href: "/pricing" },
            ].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display-alt font-bold text-[2rem] text-ink-900 py-4 border-b border-paper-edge block"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              <a href={installUrl} className="btn-primary" onClick={() => setMobileOpen(false)}>
                Install free
              </a>
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-center text-[0.9375rem] font-medium text-ink-500"
              >
                Support - {site.supportEmail}
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}
