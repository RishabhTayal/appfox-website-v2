"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { competitors } from "@/data/competitors";
import { Wordmark } from "./Wordmark";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        condensed
          ? "bg-[rgba(251,248,241,0.82)] backdrop-blur-[12px] backdrop-saturate-[1.4] border-b border-paper-edge"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div
          className={`flex items-center justify-between transition-all duration-200 ${
            condensed ? "h-[60px]" : "h-[72px]"
          }`}
        >
          <Link href="/" aria-label="AppFox home" onClick={() => setMobileOpen(false)}>
            <Wordmark className="text-[1.375rem]" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.9375rem] font-medium text-ink-700 hover:text-brand-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Compare dropdown - a mini index of all 7 comparison pages */}
            <div className="relative group">
              <Link
                href="/vs"
                className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-ink-700 hover:text-brand-700 transition-colors"
                aria-haspopup="true"
              >
                Compare
                <svg aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="card w-72 p-2 shadow-(--shadow-raised)">
                  {competitors.map((c, i) => (
                    <Link
                      key={c.slug}
                      href={`/vs/${c.slug}`}
                      className="flex items-baseline gap-3 px-3 py-2 rounded-lg hover:bg-brand-50 transition-colors"
                    >
                      <span className="till text-[0.6875rem] text-ink-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.9375rem] font-medium text-ink-900">
                        vs {c.shortName}
                      </span>
                    </Link>
                  ))}
                  <div className="border-t border-paper-edge mt-1 pt-1">
                    <Link
                      href="/vs"
                      className="flex px-3 py-2 rounded-lg text-[0.875rem] font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
                    >
                      All comparisons →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/#faq"
              className="text-[0.9375rem] font-medium text-ink-700 hover:text-brand-700 transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a
              href={`mailto:${site.supportEmail}`}
              className="text-[0.9375rem] font-medium text-ink-500 hover:text-ink-900 transition-colors"
            >
              Support
            </a>
            <a href={site.installUrl} className="btn-primary !px-5 !py-2.5 !text-[0.9375rem]">
              Install free
            </a>
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

      {/* Mobile sheet - full-screen cream */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-paper z-40 overflow-y-auto">
          <nav className="px-6 py-8 flex flex-col" aria-label="Mobile">
            {[...NAV_LINKS, { label: "Compare", href: "/vs" }, { label: "FAQ", href: "/#faq" }].map(
              (link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="enter-fade-rise font-display font-[480] text-[2rem] text-ink-900 py-4 border-b border-paper-edge"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-8 flex flex-col gap-4">
              <a href={site.installUrl} className="btn-primary" onClick={() => setMobileOpen(false)}>
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
        </div>
      )}
    </header>
  );
}
