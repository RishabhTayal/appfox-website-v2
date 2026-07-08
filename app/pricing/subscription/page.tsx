import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { InView } from "@/components/ui/InView";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { Tick } from "@/components/pricing/Tick";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getApp } from "@/data/apps";
import {
  SUBSCRIPTION_TIERS,
  SUBSCRIPTION_MATRIX,
  SUBSCRIPTION_PAID_FROM,
  TRIAL_DAYS,
  type MatrixCell,
  type SubscriptionTier,
} from "@/data/subscription-pricing";

export const metadata = routeMeta.pricingSubscription;

const subscriptionApp = getApp("subscription")!;

/** The four questions everyone asks about a tiered app with a free plan. */
export const subscriptionPricingFaqs: { q: string; a: string }[] = [
  {
    q: "Is the Free plan actually free?",
    a: "Yes - no monthly fee, no trial clock, no card required. It includes the full core app (widgets, recurring billing on Shopify Checkout, and the customer portal) for up to 50 active subscriptions, with 0% transaction fees. You only upgrade when your program outgrows it.",
  },
  {
    q: "What counts against my plan's limit?",
    a: "Active subscriptions. Each plan carries an allowance - 50 on Free, 200 on Growth, up to unlimited on Enterprise - and cancelled or expired subscriptions don't count. When you approach a ceiling, upgrading to the next tier happens in-app through Shopify billing.",
  },
  {
    q: "Are there transaction fees on renewals?",
    a: "No, on any plan - including Free. Renewals bill through Shopify's own checkout and payment infrastructure, so you pay only your normal Shopify payment processing. AppFox takes 0% of your recurring revenue.",
  },
  {
    q: "How do trials and yearly billing work?",
    a: `Every paid plan starts with a ${TRIAL_DAYS}-day free trial, billed through your existing Shopify subscription - no separate card. Switch to yearly billing and you save about 20%: Growth is $48/yr instead of $60, Enterprise $960/yr instead of $1,200.`,
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

function TierCard({ tier }: { tier: SubscriptionTier }) {
  const cardClass = tier.featured
    ? "relative flex h-full flex-col rounded-2xl border border-brand-200 bg-paper-raised p-6 shadow-(--shadow-pop) transition-transform duration-200 hover:-translate-y-1 sm:p-7"
    : "card lift flex h-full flex-col p-6 sm:p-7";

  return (
    <article className={cardClass}>
      {tier.featured ? (
        <span className="sticker absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          MOST POPULAR
        </span>
      ) : null}

      <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">{tier.name}</p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">{tier.blurb}</p>

      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="font-display font-[560] text-4xl tracking-tight text-ink-900">
          ${tier.monthly}
        </span>
        <span className="till text-sm text-ink-500">
          {tier.monthly === 0 ? "/mo · forever" : `/mo · $${tier.yearly}/yr`}
        </span>
      </p>

      <ul className="mt-5 flex-1 space-y-2.5 border-t border-paper-edge pt-5">
        {tier.features.map((feature, i) => (
          <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
            <Tick delay={250 + i * 40} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={subscriptionApp.installUrl}
        className={`${tier.featured ? "btn-primary" : "btn-secondary"} mt-7 w-full`}
      >
        {tier.monthly === 0 ? "Install free" : "Start free trial"}
      </a>
    </article>
  );
}

/** brand-tinted featured (Business) column, hairline columns otherwise */
const FEATURED_COL = SUBSCRIPTION_TIERS.findIndex((t) => t.featured);

function colClass(col: number) {
  return col === FEATURED_COL ? "border-x border-brand-200 bg-brand-50" : "";
}

function CellValue({ cell, drawDelay }: { cell: MatrixCell; drawDelay: number }) {
  if (cell === true) {
    return (
      <>
        <Tick delay={drawDelay} className="h-4 w-4 shrink-0" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (cell === null) {
    return (
      <>
        <span aria-hidden="true" className="text-ink-300">
          -
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="till text-[0.8125rem] text-ink-700">{cell}</span>;
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
              <SectionSlug
                no="01"
                label="PRICING"
                caption="AppFox Subscription · six plans · from $0"
              />
            </div>

            <h1 className="enter-rise mt-10 max-w-3xl">
              Starts{" "}
              <span className="wonk relative inline-block">
                free
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
              . Scales when you do.
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
              has a free plan for your first 50 active subscriptions, paid plans from $
              {SUBSCRIPTION_PAID_FROM}/mo as your program grows - and 0% transaction fees on
              every plan, so the recurring revenue stays yours.
            </p>
          </div>
        </section>

        {/* ── Plan cards - sunken band ── */}
        <section id="plans" className="bg-paper-sunken">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="02"
                label="THE PLANS"
                caption="Priced by active subscriptions - nothing else is metered"
              />
            </Reveal>
            <h2 className="sr-only">The plans</h2>

            <div className="mt-12 grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              <StaggerGroup step={90}>
                {SUBSCRIPTION_TIERS.map((tier, i) => (
                  <Reveal key={tier.name} index={i} className="h-full">
                    <TierCard tier={tier} />
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>

            <Reveal delay={150}>
              <p className="till mt-12 text-center text-[0.8125rem] text-ink-500">
                {TRIAL_DAYS}-day free trial on paid plans · Save 20% with yearly billing · Works
                on all Shopify plans
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Plan-difference table - light ── */}
        <section id="whats-in-each-plan" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="03"
                label="WHAT’S IN EACH PLAN"
                caption="The differences, line by line"
              />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">What’s in each plan</h2>
            </Reveal>

            <Reveal delay={100}>
              <InView className="mt-10 overflow-hidden rounded-2xl border border-paper-edge bg-paper-raised shadow-(--shadow-card)">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[56rem] border-collapse text-left">
                    <caption className="sr-only">
                      Plan differences across the Free, Growth, Starter, Business, Pro, and
                      Enterprise plans
                    </caption>
                    <thead>
                      <tr className="border-b border-paper-edge">
                        <th scope="col" className="px-5 py-4 sm:px-6">
                          <span className="sr-only">Feature</span>
                        </th>
                        {SUBSCRIPTION_TIERS.map((tier, col) => (
                          <th
                            key={tier.name}
                            scope="col"
                            className={`px-4 py-4 sm:px-5 ${colClass(col)}`}
                          >
                            <span className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink-900">
                              {tier.name}
                              {tier.featured ? (
                                <span
                                  aria-hidden="true"
                                  className="h-1.5 w-1.5 rounded-full bg-marigold-500"
                                />
                              ) : null}
                            </span>
                            <span className="till mt-1 block text-[0.8125rem] font-normal text-ink-500">
                              ${tier.monthly}/mo
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-paper-edge">
                      {SUBSCRIPTION_MATRIX.map((row, r) => (
                        <tr key={row.label} className="transition-colors hover:bg-paper-sunken">
                          <th
                            scope="row"
                            className="px-5 py-3.5 text-[0.9375rem] font-medium text-ink-700 sm:px-6"
                          >
                            {row.label}
                          </th>
                          {row.cells.map((cell, col) => (
                            <td
                              key={col}
                              className={`px-4 py-3.5 align-middle sm:px-5 ${colClass(col)}`}
                            >
                              <CellValue cell={cell} drawDelay={200 + r * 60} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </InView>
            </Reveal>
          </div>
        </section>

        {/* ── Four straight answers - sunken band ── */}
        <section className="bg-paper-sunken py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="04" label="QUESTIONS" caption="The fine print, minus the squinting" />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
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
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
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
          headline="Your first 50 subscribers are on the house"
          body={`Install free, drop the widget on your product pages, and let auto-renewal do the collecting. Upgrade only when your program outgrows the free plan - paid plans start at $${SUBSCRIPTION_PAID_FROM}/mo with a ${TRIAL_DAYS}-day trial.`}
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
