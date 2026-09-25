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

export const metadata = routeMeta.features;

/**
 * /features - the hub. One summary card per app; the full feature tour
 * lives on /features/order-editing and /features/subscription.
 */

const orderEditing = getApp("order-editing")!;
const subscription = getApp("subscription")!;
const bundles = getApp("product-bundles")!;

const CARDS = [
  {
    app: orderEditing,
    eyebrow: "Self-service editing + upsells",
    summary:
      "Customers fix addresses, swap variants, change quantities, add or remove items, and cancel - on your thank-you and order status pages, within rules you set. In-place edits keep your Shopify fees, and the edit flow doubles as a one-click upsell.",
    bullets: [
      "Self-service editing, no login",
      "Eligibility rules & approval queue",
      "In-place edits - fees preserved",
      "Post-purchase upsells in the flow",
    ],
    href: "/features/order-editing",
    cta: "Tour Order Editing features",
  },
  {
    app: subscription,
    eyebrow: "Recurring subscriptions",
    summary:
      "Subscribe-and-save widgets on your product pages, auto-renewal through Shopify's native checkout, and a self-service portal where customers skip, pause, swap, or cancel. Every subscription model - boxes, memberships, replenishment - free.",
    bullets: [
      "Subscribe & save widgets",
      "Recurring billing on native checkout",
      "Customer self-service portal",
      "Boxes, memberships & bundles",
    ],
    href: "/features/subscription",
    cta: "Tour Subscription features",
  },
  {
    app: bundles,
    eyebrow: "Product bundles & volume discounts",
    summary:
      "Create unlimited product bundles, volume discounts, quantity breaks, BOGO offers, and mix-and-match deals. Theme-friendly widgets that integrate via Shopify 2.0 app blocks, plus bundle analytics to see what's working.",
    bullets: [
      "Unlimited bundles - fixed, mix-and-match, BOGO",
      "Volume discounts & quantity breaks",
      "Theme-integrated Shopify 2.0 widgets",
      "Bundle performance analytics",
    ],
    href: "/features/product-bundles",
    cta: "Tour Product Bundles features",
  },
];

/** Hand-drawn tick - draws on when the card reveals. */
function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        className="draw-path"
        pathLength={400}
        d="M3 12h3v3h3v3h3v-3h3v-3h3v-3h3"
        stroke="var(--color-success)"
        strokeWidth={2.75}
        strokeLinecap="square"
        strokeLinejoin="miter"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}

export default function FeaturesHubPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Cream hero ── */}
        <SceneHeader variant="day" seed={13} pose="point" expr="happy">
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-14 sm:px-8 sm:pt-36 sm:pb-20 lg:px-10">
            <div className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <SectionSlug no="01" label="FEATURES" caption="Three apps · pick a tour" />
            </div>

            <h1 className="enter-rise mt-10 max-w-3xl">
              Grow revenue from{" "}
              <span className="wonk relative inline-block">
                every order
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
            </h1>

            <p
              className="enter-fade-rise mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Three AppFox apps cover the whole order journey - subscriptions that start on the
              product page, bundles that boost average order value, and orders customers fix and grow
              themselves after checkout. Take the full tour of whichever fits.
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
                          {String(i + 1).padStart(2, "0")} · {card.eyebrow}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <div className="flex items-center gap-3.5">
                        <AppGlyph slug={card.app.slug} size={44} />
                        <h2 className="!text-[1.375rem] sm:!text-[1.5rem] leading-tight">{card.app.name}</h2>
                      </div>
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
                        {card.summary}
                      </p>

                      <ul className="mt-6 space-y-2.5 border-t border-paper-edge pt-6">
                        {card.bullets.map((b, j) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700"
                          >
                            <Tick delay={250 + j * 40} />
                            <span>{b}</span>
                          </li>
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
                All apps install in about 5 minutes · no theme code · {site.supportEmail}
              </p>
            </Reveal>
          </div>
        </section>

        <CtaBand
          headline="Three apps. One quieter inbox."
          body="Order Editing lets customers fix and grow their own orders; Product Bundles boosts average order value; Subscription brings them back on a schedule. All three start free and set up in about five minutes."
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
