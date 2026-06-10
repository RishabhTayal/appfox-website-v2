import Link from "next/link";
import { site } from "@/lib/site";
import { competitors } from "@/data/competitors";
import { Wordmark } from "./Wordmark";

const PRODUCT_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer() {
  return (
    <footer className="on-night bg-night text-mist-on-night">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Wordmark onNight className="text-[1.375rem]" />
            <p className="mt-4 text-[0.9375rem] leading-relaxed">
              Self-service order editing and post-purchase upsells for Shopify. Fewer tickets,
              kept fees, bigger orders.
            </p>
          </div>

          <div>
            <p className="till text-[0.75rem] uppercase tracking-[0.12em] text-marigold-300 mb-5">
              Product
            </p>
            <ul className="space-y-3 text-[0.9375rem]">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-cream-on-night transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="till text-[0.75rem] uppercase tracking-[0.12em] text-marigold-300 mb-5">
              Compare
            </p>
            <ul className="space-y-3 text-[0.9375rem]">
              <li>
                <Link href="/vs" className="hover:text-cream-on-night transition-colors">
                  All comparisons
                </Link>
              </li>
              {competitors.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/vs/${c.slug}`}
                    className="hover:text-cream-on-night transition-colors"
                  >
                    AppFox vs {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="till text-[0.75rem] uppercase tracking-[0.12em] text-marigold-300 mb-5">
              Company
            </p>
            <ul className="space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="hover:text-cream-on-night transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cream-on-night transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cream-on-night transition-colors">
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-(--color-night-edge) flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="till text-[0.8125rem] text-mist-on-night/70">
            © {new Date().getFullYear()} AppFox · Made for Shopify merchants
          </p>
          <p className="till text-[0.8125rem] text-mist-on-night/70">{site.supportEmail}</p>
        </div>
      </div>

      {/* Ghost wordmark - ink on ink */}
      <div aria-hidden="true" className="overflow-hidden select-none pointer-events-none -mb-[2vw]">
        <p
          className="font-display font-[560] text-center leading-none text-night-raised"
          style={{ fontSize: "13vw", fontVariationSettings: '"SOFT" 60, "WONK" 0' }}
        >
          AppFox
        </p>
      </div>
    </footer>
  );
}
