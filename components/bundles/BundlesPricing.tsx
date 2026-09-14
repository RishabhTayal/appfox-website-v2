import { Reveal } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";
import { getApp } from "@/data/apps";

const bundlesApp = getApp("product-bundles")!;

/** Hand-drawn tick - never a ✓ character. */
function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-success" aria-hidden="true">
      <path
        d="M4 12.5l5 5L20 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={400}
        className="draw-path"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}

/**
 * NO. 03 - PRICING. Simplified pricing section for the landing page.
 * Free to start, with clear path to paid features.
 */

const PRICING_FEATURES = [
  "Unlimited product bundles",
  "Volume discounts & quantity breaks",
  "Mix-and-match & BOGO offers",
  "Theme-integrated Shopify 2.0 widgets",
  "Bundle performance analytics",
  "Email support",
];

export function BundlesPricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="03" label="PRICING" caption="Free to start" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Install free, grow your AOV</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            Start with the free plan. Upgrade as your bundle program grows.
          </p>
        </Reveal>

        <div className="mt-12 flex justify-center">
          <Reveal className="w-full max-w-md">
            <article className="card lift p-7 sm:p-9">
              <p className="till text-xs uppercase tracking-[0.12em] text-ink-500">
                Free plan
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                Everything you need to start selling bundles
              </p>

              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display font-[560] text-4xl tracking-tight text-ink-900">
                  Free
                </span>
                <span className="till text-sm text-ink-500">to install</span>
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-paper-edge pt-5">
                {PRICING_FEATURES.map((feature, i) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <Tick delay={250 + i * 40} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a href={bundlesApp.installUrl} className="btn-primary mt-7 w-full">
                Install free on Shopify
              </a>

              <p className="till mt-4 text-center text-xs text-ink-500">
                No credit card required · Works on all Shopify plans
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
