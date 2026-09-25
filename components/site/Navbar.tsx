"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { competitorsForApp } from "@/data/competitors";
import { apps } from "@/data/apps";
import { Wordmark } from "./Wordmark";
import { AppGlyph } from "./AppGlyph";
import { Foxy } from "@/components/fox/Foxy";

/** Routes whose install CTA should point at AppFox Subscription. */
const SUBSCRIPTION_PATHS = new Set([
  "/subscription",
  "/features/subscription",
  "/pricing/subscription",
  ...competitorsForApp("subscription").map((c) => `/vs/${c.slug}`),
]);

/** Routes whose install CTA should point at AppFox Product Bundles. */
const BUNDLES_PATHS = new Set([
  "/product-bundles",
  "/features/product-bundles",
  "/pricing/product-bundles",
  ...competitorsForApp("product-bundles").map((c) => `/vs/${c.slug}`),
]);

/** The navbar install CTA follows the app the visitor is reading about. */
function installUrlForPath(pathname: string): string {
  const subscriptionApp = apps.find((a) => a.slug === "subscription");
  const bundlesApp = apps.find((a) => a.slug === "product-bundles");
  if (subscriptionApp && SUBSCRIPTION_PATHS.has(pathname)) return subscriptionApp.installUrl;
  if (bundlesApp && BUNDLES_PATHS.has(pathname)) return bundlesApp.installUrl;
  return site.installUrl;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const installUrl = installUrlForPath(usePathname() ?? "/");

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) document.documentElement.dataset.menuOpen = "1";
    else delete document.documentElement.dataset.menuOpen;
    return () => {
      document.body.style.overflow = "";
      delete document.documentElement.dataset.menuOpen;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls =
    "px-navlink px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white";

  return (
    <>
      {/* Floating island navbar - dusk glass pill */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto mt-3 w-[min(64rem,calc(100vw-1.5rem))] sm:mt-4">
          <nav
            aria-label="Main"
            className={`px-nav flex items-center justify-between gap-4 py-2 pl-3 pr-2 ${scrolled || mobileOpen ? "px-nav-solid" : ""}`}
          >
            <Link
              href="/"
              aria-label="AppFox home"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 rounded-full pr-2"
            >
              <Image src="/images/brand/appfox-icon.png" alt="AppFox" width={30} height={30} className="rounded-[9px]" />
              <Wordmark onNight className="text-[1.15rem]" />
            </Link>

            <div className="hidden items-center gap-0.5 md:flex">
              <div className="group relative">
                <Link href="/apps" className={`${linkCls} inline-flex items-center gap-1`} aria-haspopup="true">
                  Apps
                  <svg aria-hidden="true" className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[26rem] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="window">
                    <div className="window-bar">
                      <span className="window-dots"><i /><i /><i /></span>
                      <span>APPFOX · {apps.length} SHOPIFY APPS</span>
                    </div>
                    <div className="p-2">
                      {apps.map((app) => (
                        <Link
                          key={app.slug}
                          href={app.href}
                          className="flex items-center gap-3.5 px-3 py-2.5 hover:bg-paper-sunken"
                        >
                          <AppGlyph slug={app.slug} size={38} />
                          <span className="flex min-w-0 flex-col">
                            <span className="text-[0.9375rem] font-semibold text-ink-900">{app.shortName}</span>
                            <span className="truncate text-xs text-ink-500">{app.tagline}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 border-t-2 border-ink-900 text-center text-[0.8125rem] font-medium">
                      <Link href="/features" className="py-3 text-ink-700 transition-colors hover:bg-paper-sunken hover:text-ink-900">Features</Link>
                      <Link href="/subscription/integrations" className="border-x-2 border-ink-900 py-3 text-ink-700 transition-colors hover:bg-paper-sunken hover:text-ink-900">Integrations</Link>
                      <Link href="/apps" className="py-3 text-brand-700 transition-colors hover:bg-paper-sunken">All apps →</Link>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/pricing" className={linkCls}>Pricing</Link>
              <Link href="/blog" className={linkCls}>Blog</Link>
              <Link href="/vs" className={linkCls}>Compare</Link>
            </div>

            <div className="flex items-center gap-1">
              <a href={installUrl} className="btn-marigold hidden !px-4 !py-2 !text-[0.875rem] md:inline-flex">
                Install free
              </a>
              <button
                className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:bg-white/10 md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <span className="relative block h-3.5 w-5">
                  <span className={`absolute left-0 top-0 block h-[3px] w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? "top-1.5 rotate-45" : ""}`} />
                  <span className={`absolute bottom-0 left-0 block h-[3px] w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? "bottom-1.5 -rotate-45" : ""}`} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu - paper sheet with big display links and a waving fox */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-paper md:hidden">
          <nav className="flex min-h-full flex-col px-6 pb-10 pt-24" aria-label="Mobile">
            <p className="eyebrow">Menu</p>
            <div className="mt-4 flex flex-col">
              {apps.map((app, i) => (
                <Link
                  key={app.slug}
                  href={app.href}
                  onClick={() => setMobileOpen(false)}
                  className="enter-fade-rise flex items-center gap-3 border-b border-paper-edge py-3.5"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <AppGlyph slug={app.slug} size={34} />
                  <span className="font-display text-2xl font-medium tracking-tight text-ink-900">{app.shortName}</span>
                </Link>
              ))}
              {[
                { label: "All apps", href: "/apps" },
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog" },
                { label: "Compare", href: "/vs" },
              ].map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="enter-fade-rise border-b border-paper-edge py-3.5 font-display text-2xl font-medium tracking-tight text-ink-900"
                  style={{ animationDelay: `${(i + apps.length) * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="enter-fade-rise mt-8 flex flex-col gap-3" style={{ animationDelay: "420ms" }}>
              <a href={installUrl} className="btn-primary" onClick={() => setMobileOpen(false)}>
                Install free
              </a>
              <a href={`mailto:${site.supportEmail}`} className="text-center text-sm font-medium text-ink-500">
                {site.supportEmail}
              </a>
            </div>
            <div className="mt-auto flex justify-center pt-8">
              <Foxy pose="wave" expr="happy" size={110} track />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
