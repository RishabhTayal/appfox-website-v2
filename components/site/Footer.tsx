import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

const ORDER_EDITING_LINKS = [
  { label: "Overview", href: "/order-editing" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing/order-editing" },
  { label: "How it works", href: "/order-editing#how-it-works" },
  { label: "FAQ", href: "/order-editing#faq" },
];

const SUBSCRIPTION_LINKS = [
  { label: "Overview", href: "/subscription" },
  { label: "Pricing", href: "/pricing/subscription" },
  { label: "How it works", href: "/subscription#how-it-works" },
  { label: "FAQ", href: "/subscription#faq" },
];

const COMPARE_LINKS = [
  { label: "All comparisons", href: "/vs" },
  { label: "Order editing apps", href: "/vs#order-editing" },
  { label: "Subscription apps", href: "/vs#subscription" },
];

function LinkColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="till text-[0.75rem] uppercase tracking-[0.12em] text-marigold-300 mb-5">
        {heading}
      </p>
      <ul className="space-y-3 text-[0.9375rem]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-cream-on-night transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="on-night bg-night text-mist-on-night">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Wordmark onNight className="text-[1.375rem]" />
            <p className="mt-4 text-[0.9375rem] leading-relaxed">
              Shopify apps for everything after checkout - self-service order editing, post-purchase
              upsells, and subscriptions.
            </p>
            <p className="mt-4">
              <Link
                href="/apps"
                className="text-[0.9375rem] font-semibold text-marigold-300 hover:text-cream-on-night transition-colors"
              >
                All apps →
              </Link>
            </p>
          </div>

          <LinkColumn heading="Order Editing" links={ORDER_EDITING_LINKS} />
          <LinkColumn heading="Subscription" links={SUBSCRIPTION_LINKS} />
          <LinkColumn heading="Compare" links={COMPARE_LINKS} />

          <div>
            <p className="till text-[0.75rem] uppercase tracking-[0.12em] text-marigold-300 mb-5">
              Company
            </p>
            <ul className="space-y-3 text-[0.9375rem]">
              <li>
                <Link href="/blog" className="hover:text-cream-on-night transition-colors">
                  Blog
                </Link>
              </li>
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
