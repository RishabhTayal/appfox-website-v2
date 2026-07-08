import Link from "next/link";
import { getApp } from "@/data/apps";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Tick } from "@/components/pricing/Tick";
import {
  SUBSCRIPTION_TIERS,
  SUBSCRIPTION_PAID_FROM,
  TRIAL_DAYS,
} from "@/data/subscription-pricing";

/**
 * NO. 03 - PRICING. A condensed cut of /pricing/subscription: what every
 * plan includes on the left, the six-tier ledger on the right. The full
 * cards and feature matrix live on the pricing page.
 */

const subscriptionApp = getApp("subscription")!;

/** In every plan, including Free. */
const INCLUDED = [
  "0% transaction fees on renewals",
  "Subscription widgets & templates",
  "Auto-renewal & recurring billing on Shopify Checkout",
  "Customer self-service portal - skip, pause, swap, cancel",
  "Subscribe & save discounts and trials",
  "Klaviyo, PageFly & Loyalty Lion integrations",
];

export function SubscriptionPricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="03" label="PRICING" caption="Priced by active subscriptions only" />
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="max-w-xl">Starts free. Scales when you do.</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
                The free plan covers your first 50 active subscriptions with the full core app.
                Paid plans from ${SUBSCRIPTION_PAID_FROM}/mo raise the ceiling and add analytics,
                bundling, and branded emails - and no plan takes a cut of your renewals.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <ul className="mt-7 max-w-lg space-y-2.5 border-t border-paper-edge pt-6">
                {INCLUDED.map((feature, i) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
                    <Tick delay={250 + i * 40} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220}>
              <p className="till mt-6 text-[0.8125rem] text-ink-500">
                In every plan · {TRIAL_DAYS}-day free trial on paid plans · save 20% billed yearly
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <article className="relative flex flex-col rounded-2xl border border-brand-200 bg-paper-raised p-6 shadow-(--shadow-pop) sm:p-8">
                <span className="sticker absolute -top-4 left-8 whitespace-nowrap">
                  SIX PLANS · FROM $0
                </span>

                <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                  {subscriptionApp.name}
                </p>

                <ul className="mt-5 divide-y divide-paper-edge border-y border-paper-edge">
                  {SUBSCRIPTION_TIERS.map((tier) => (
                    <li key={tier.name} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="text-[0.9375rem] font-medium text-ink-900">
                        {tier.name}
                        {tier.featured ? (
                          <span
                            aria-hidden="true"
                            className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-marigold-500 align-middle"
                          />
                        ) : null}
                      </span>
                      <span className="till flex-1 border-b border-dotted border-paper-edge" />
                      <span className="till text-[0.8125rem] text-ink-500">
                        {tier.limit} subs
                      </span>
                      <span className="w-20 text-right font-display font-[560] text-lg tracking-tight text-ink-900">
                        ${tier.monthly}
                        <span className="till text-[0.8125rem] font-normal text-ink-500">/mo</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href={subscriptionApp.installUrl} className="btn-primary flex-1">
                    Install free on Shopify
                  </a>
                  <Link href="/pricing/subscription" className="btn-secondary flex-1">
                    Compare all plans
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
