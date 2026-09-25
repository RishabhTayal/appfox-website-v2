import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * THE HOUSE RULES. What holds across every AppFox app -
 * the reasons to trust the brand, not one product's feature list.
 */

const RULES: { title: string; copy: string }[] = [
  {
    title: "Native Shopify APIs, no hacks",
    copy: "Orders edit in place through Shopify's Order Editing API; subscriptions bill through Shopify Checkout. No cancel-and-reorder tricks, no checkout detours, no lost payment fees.",
  },
  {
    title: "Free to start, honestly",
    copy: "Every app has a free plan - Order Editing's covers 50 edits a month, Subscription's covers 50 active subscriptions, and Product Bundles is free to start. No card required to install, no per-transaction skim on your revenue.",
  },
  {
    title: "Five-minute setup, no code",
    copy: "Widgets and edit links drop in from the app - your branding, no theme surgery. If you can install a Shopify app, you're done before the coffee cools.",
  },
  {
    title: "Support that answers",
    copy: "One team behind every app, reachable at the same address on every page. Migrations, edge cases, weird themes - bring them.",
  },
];

const ICONS = [
  <path key="a" d="M5 12.5 10 17 19 7" />,
  <path key="b" d="M12 3v18M6 9c0-2 2.5-3 6-3s6 1 6 3-2.5 3-6 3-6 1-6 3 2.5 3 6 3 6-1 6-3" />,
  <path key="c" d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  <path key="d" d="M4 5h16v10H9l-5 4Z" />,
];

export function WhyAppfox() {
  return (
    <section className="relative bg-paper-sunken py-24 sm:py-32" data-fox-pose="point" data-fox-expr="happy">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Reveal variant="none">
              <SectionSlug no="01" label="The house rules" />
            </Reveal>
            <Reveal variant="blur">
              <h2 className="mt-5 max-w-md">Different apps. Same standards.</h2>
            </Reveal>
            <Reveal>
              <p className="mt-5 max-w-sm text-lg leading-relaxed text-ink-700">
                What holds true for every app we ship - the reasons to trust the den, not one
                product&apos;s feature list.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <StaggerGroup step={90}>
              {RULES.map((rule, i) => (
                <Reveal key={rule.title} index={i} className="h-full">
                  <article className="card group flex h-full flex-col p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-(--shadow-raised)">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-white transition-transform duration-500 group-hover:-rotate-6">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {ICONS[i]}
                      </svg>
                    </span>
                    <h3 className="mt-5 text-xl">{rule.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-700">{rule.copy}</p>
                  </article>
                </Reveal>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
