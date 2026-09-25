import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getApp } from "@/data/apps";
import { SceneHeader } from "@/components/scene/SceneHeader";
import { AppGlyph } from "@/components/site/AppGlyph";

export const metadata = routeMeta.pricing;

/**
 * /pricing - the hub. One summary card per app; the detail lives on
 * /pricing/order-editing and /pricing/subscription.
 */

const orderEditing = getApp("order-editing")!;
const subscription = getApp("subscription")!;
const bundles = getApp("product-bundles")!;

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
    priceLine: { amount: "$0", note: "to $100/mo" },
    summary:
      "A free plan for your first 50 active subscriptions, then three paid plans priced by subscription count alone - 0% transaction fees on every tier. Paid plans include a 14-day trial.",
    bullets: [
      "Free - $0/mo, 50 active subscriptions",
      "Starter & Business - $10 & $30/mo, 1,000 & 10,000 subscriptions",
      "Enterprise - $100/mo, unlimited subscriptions",
    ],
    href: "/pricing/subscription",
    cta: "See Subscription pricing",
  },
  {
    app: bundles,
    priceLine: { amount: "Free", note: "to start" },
    summary:
      "Free to install with unlimited bundles, all bundle types, and full analytics. Most stores never need to upgrade.",
    bullets: [
      "Free plan - unlimited product bundles",
      "All bundle types: fixed, mix-and-match, BOGO, volume discounts",
      "Theme-integrated widgets & performance analytics",
    ],
    href: "/pricing/product-bundles",
    cta: "See Product Bundles pricing",
  },
];

export default function PricingHubPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Cream hero ── */}
        <SceneHeader variant="meadow" seed={31} pose="point" expr="happy">
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-14 sm:px-8 sm:pt-36 sm:pb-20 lg:px-10">
            <div className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <SectionSlug no="01" label="PRICING" caption="Three apps · all start at $0" />
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
              All three AppFox apps start at $0 and none takes a cut of your revenue - no per-edit
              fees, no transaction fees on renewals, no revenue caps. Here&apos;s each app&apos;s
              pricing in full.
            </p>
          </div>
        </SceneHeader>

        {/* ── One card per app ── */}
        <section className="bg-paper-sunken py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              <StaggerGroup step={120}>
                {CARDS.map((card, i) => (
                  <Reveal key={card.app.slug} index={i} className="h-full">
                    <article className="window lift flex h-full flex-col">
                      <div className="window-bar">
                        <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
                        <span className="till truncate text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
                          {String(i + 1).padStart(2, "0")} · {card.app.shortName}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <div className="flex items-center gap-3.5">
                        <AppGlyph slug={card.app.slug} size={44} />
                        <h2 className="!text-[1.375rem] sm:!text-[1.5rem] leading-tight">{card.app.name}</h2>
                      </div>
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

                      <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-8">
                        <Link href={card.href} className="btn-primary">
                          {card.cta}
                        </Link>
                        <a href={card.app.installUrl} className="btn-secondary">
                          Install free
                        </a>
                      </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>

            <Reveal delay={150}>
              <p className="till mt-12 text-center text-[0.8125rem] text-ink-500">
                No card required to install any app · cancel anytime · {site.supportEmail}
              </p>
            </Reveal>
          </div>
        </section>

        <CtaBand
          headline="Start free with any app - or all three"
          body="Order Editing's free plan never expires, Subscription's covers your first 50 subscribers, and Product Bundles is free to install with unlimited bundles. None of the apps take a cut of your revenue."
          primaryLabel="Get Order Editing"
          secondaryLabel="See all apps"
          secondaryHref="/apps"
          from="sunken"
        />
      </main>
      <Footer />
    </>
  );
}
