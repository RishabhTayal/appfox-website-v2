import { getApp } from "@/data/apps";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 03 - PRICING. The shortest pricing section on the site: the app is
 * free. One featured card, no table, no toggle.
 */

const subscriptionApp = getApp("subscription")!;

const INCLUDED = [
  "Unlimited subscriptions & subscribers",
  "Subscription widgets & templates",
  "Auto-renewal & recurring billing",
  "Customer self-service portal",
  "Subscribe & save discounts and bundles",
  "Klaviyo, PageFly & Loyalty Lion integrations",
  "24/7 support",
];

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

export function SubscriptionPricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="03" label="PRICING" caption="This one is short" />
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="max-w-xl">Free. That&apos;s the pricing page.</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
                No monthly fee, no per-subscriber charge, no plan tiers to squint at. Install it,
                set up your first subscription, and keep what you earn - the recurring revenue is
                yours, not ours.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="till mt-6 text-[0.8125rem] text-ink-500">
                Works on every Shopify plan · no card details beyond your Shopify billing
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
                    <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
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
  );
}
