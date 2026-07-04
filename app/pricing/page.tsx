import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getApp } from "@/data/apps";

export const metadata = routeMeta.pricing;

/**
 * /pricing - the hub. One summary card per app; the detail lives on
 * /pricing/order-editing and /pricing/subscription.
 */

const orderEditing = getApp("order-editing")!;
const subscription = getApp("subscription")!;

const CARDS = [
  {
    app: orderEditing,
    priceLine: { amount: `$${site.pricing.free.price}`, note: `to $${site.pricing.pro.price}/mo` },
    summary:
      "A free plan that never expires, then flat monthly plans - no per-edit fees, no upsell revenue caps. Paid plans include a 14-day trial, no card required.",
    bullets: [
      `${site.pricing.free.name} - $${site.pricing.free.price}/mo, 50 edits a month`,
      `${site.pricing.growth.name} - $${site.pricing.growth.price}/mo, unlimited edits & upsells`,
      `${site.pricing.pro.name} - $${site.pricing.pro.price}/mo, API access & white-label`,
    ],
    href: "/pricing/order-editing",
    cta: "See Order Editing pricing",
  },
  {
    app: subscription,
    priceLine: { amount: "$0", note: "forever" },
    summary:
      "The whole app is free: recurring billing on Shopify Checkout, subscribe & save widgets, and the customer portal. No per-subscriber charge, no caps, no paid tier hiding behind it.",
    bullets: [
      "Unlimited subscriptions & subscribers",
      "No transaction fees on renewals",
      "24/7 support included",
    ],
    href: "/pricing/subscription",
    cta: "See Subscription pricing",
  },
];

export default function PricingHubPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Cream hero ── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-14 sm:px-8 sm:pt-36 sm:pb-20 lg:px-10">
            <div className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <SectionSlug no="01" label="PRICING" caption="Two apps · both start at $0" />
            </div>

            <h1 className="enter-rise mt-10 max-w-3xl">
              Pick an app. The{" "}
              <span className="wonk relative inline-block">
                math
                <svg
                  className="absolute -bottom-[0.04em] left-0 h-[0.2em] w-full"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8.5C20 5 38 9.5 56 7 72 4.8 88 7.5 98 5.5"
                    fill="none"
                    stroke="var(--color-marigold-300)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    pathLength={400}
                    className="draw-path is-visible"
                    style={{ "--draw-delay": "600ms" } as React.CSSProperties}
                  />
                </svg>
              </span>{" "}
              stays simple either way
            </h1>

            <p
              className="enter-fade-rise mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Both AppFox apps start at $0 and neither meters your growth - no per-edit fees, no
              per-subscriber charges, no revenue caps. Here&apos;s each app&apos;s pricing in
              full.
            </p>
          </div>
        </section>

        {/* ── One card per app ── */}
        <section className="bg-paper-sunken py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <StaggerGroup step={120}>
                {CARDS.map((card, i) => (
                  <Reveal key={card.app.slug} index={i} className="h-full">
                    <article className="card lift flex h-full flex-col p-7 sm:p-9">
                      <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                        {String(i + 1).padStart(2, "0")} · {card.app.shortName}
                      </p>
                      <h2 className="mt-4 !text-[1.5rem] sm:!text-[1.75rem]">{card.app.name}</h2>
                      <p className="mt-4 flex items-baseline gap-1.5">
                        <span className="font-display font-[560] text-5xl tracking-tight text-ink-900">
                          {card.priceLine.amount}
                        </span>
                        <span className="till text-sm text-ink-500">{card.priceLine.note}</span>
                      </p>
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
                        {card.summary}
                      </p>

                      <ul className="till mt-6 space-y-2 border-t border-paper-edge pt-6 text-[0.8125rem] text-ink-700">
                        {card.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
                        <Link href={card.href} className="btn-primary">
                          {card.cta}
                        </Link>
                        <a href={card.app.installUrl} className="btn-secondary">
                          Install free
                        </a>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>

            <Reveal delay={150}>
              <p className="till mt-12 text-center text-[0.8125rem] text-ink-500">
                No card required to install either app · cancel anytime · {site.supportEmail}
              </p>
            </Reveal>
          </div>
        </section>

        <CtaBand
          headline="Start free with either app - or both"
          body="Order Editing's free plan never expires and Subscription never costs anything. The only thing metered around here is nothing."
          primaryLabel="Get Order Editing"
          secondaryLabel="Get Subscription"
          secondaryHref="/subscription"
          from="sunken"
        />
      </main>
      <Footer />
    </>
  );
}
