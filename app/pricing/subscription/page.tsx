import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getApp } from "@/data/apps";

export const metadata = routeMeta.pricingSubscription;

const subscriptionApp = getApp("subscription")!;

const INCLUDED = [
  "Unlimited subscriptions & subscribers",
  "Subscription widgets & templates",
  "Auto-renewal & recurring billing on Shopify Checkout",
  "Customer self-service portal - skip, pause, swap, cancel",
  "Subscribe & save discounts, trials, and bundles",
  "Klaviyo, PageFly & Loyalty Lion integrations",
  "24/7 support",
];

/** The three questions everyone asks about a free app. */
export const subscriptionPricingFaqs: { q: string; a: string }[] = [
  {
    q: "Is it actually free, or free-until-it-isn't?",
    a: "Free to install, free to run: no monthly fee, no per-subscriber charge, no percentage of your recurring orders, and no cap on subscriptions. There is no paid tier hiding behind the free one - what you see on this page is the whole app.",
  },
  {
    q: "How is a free app sustainable?",
    a: "AppFox Subscription is part of the AppFox family alongside Order Editing & Upsell. Keeping Subscription free is how we earn a place in your store; some merchants later add our paid app, most just get free subscriptions. Either way, your recurring revenue is yours.",
  },
  {
    q: "Are there transaction fees on renewals?",
    a: "No. Renewals bill through Shopify's own checkout and payment infrastructure, so you pay only your normal Shopify payment processing - AppFox adds nothing on top.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/pricing/subscription#faq`,
  mainEntity: subscriptionPricingFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        className="draw-path"
        pathLength={400}
        d="M3.5 13.2 9 18.4 20.5 5.8"
        stroke="var(--color-success)"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}

export default function SubscriptionPricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <JsonLd data={faqJsonLd} />

        {/* ── Cream hero ── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-14 sm:px-8 sm:pt-36 sm:pb-20 lg:px-10">
            <div className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <SectionSlug no="01" label="PRICING" caption="AppFox Subscription · one plan · $0" />
            </div>

            <h1 className="enter-rise mt-10 max-w-3xl">
              <span className="wonk relative inline-block">
                Free
                {/* hand-drawn marigold underline, draws on at ~600ms */}
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
              </span>
              . That&apos;s the pricing page.
            </h1>

            <p
              className="enter-fade-rise mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              <Link
                href="/subscription"
                className="text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:decoration-brand-700"
              >
                AppFox Subscription
              </Link>{" "}
              has no monthly fee, no per-subscriber charge, and no caps. Install it, set up your
              first plan, and keep what you earn.
            </p>
          </div>
        </section>

        {/* ── The one card - sunken band ── */}
        <section className="bg-paper-sunken py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <Reveal>
                  <h2 className="max-w-xl">Everything included. Nothing metered.</h2>
                </Reveal>
                <Reveal delay={100}>
                  <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
                    Other subscription apps price by tier, subscriber count, or a cut of your
                    renewals. This one doesn&apos;t price at all - the free plan is the app,
                    at ten subscribers or ten thousand.
                  </p>
                </Reveal>
                <Reveal delay={180}>
                  <p className="till mt-6 text-[0.8125rem] text-ink-500">
                    Works on every Shopify plan · billing runs through Shopify Checkout
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-6">
                <Reveal delay={120}>
                  <article className="relative flex flex-col rounded-2xl border border-brand-200 bg-paper-raised p-6 shadow-(--shadow-pop) sm:p-8">
                    <span className="sticker absolute -top-4 left-8 whitespace-nowrap">
                      EVERYTHING INCLUDED
                    </span>

                    <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                      {subscriptionApp.name}
                    </p>
                    <p className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-display font-[560] text-5xl tracking-tight text-ink-900">
                        $0
                      </span>
                      <span className="till text-sm text-ink-500">/mo · forever</span>
                    </p>

                    <ul className="mt-6 space-y-3 border-t border-paper-edge pt-6">
                      {INCLUDED.map((feature, i) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700"
                        >
                          <Tick delay={250 + i * 40} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a href={subscriptionApp.installUrl} className="btn-primary mt-8 w-full">
                      Install free on Shopify
                    </a>
                  </article>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Three straight answers ── */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="02" label="QUESTIONS" caption="The catch you're looking for isn't here" />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {subscriptionPricingFaqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 90}>
                  <article className="card h-full p-7">
                    <h3 className="text-[1.125rem]">{faq.q}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{faq.a}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── The paid sibling, one line ── */}
        <section>
          <div className="mx-auto max-w-7xl px-6 pb-4 sm:px-8 lg:px-10">
            <div className="card-tinted flex flex-col items-start justify-between gap-5 rounded-2xl border p-7 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                  Also from AppFox
                </p>
                <p className="mt-2 text-lg font-semibold text-ink-900">
                  Order Editing &amp; Upsell starts free, with paid plans from $19/mo.
                </p>
                <p className="mt-1 text-[0.9375rem] text-ink-700">
                  Self-service order edits and one-click upsells - no per-edit fees, no revenue
                  caps.
                </p>
              </div>
              <Link href="/pricing/order-editing" className="btn-secondary shrink-0">
                Order Editing pricing
              </Link>
            </div>
          </div>
        </section>

        <CtaBand
          headline="Recurring revenue shouldn't have a recurring bill"
          body="Install free, drop the widget on your product pages, and let auto-renewal do the collecting. No fee today, no fee at scale."
          primaryHref={subscriptionApp.installUrl}
          secondaryLabel="Compare subscription apps"
          secondaryHref="/vs#subscription"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
