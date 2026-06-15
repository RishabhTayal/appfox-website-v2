import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { VsIndexRow, VsTitle } from "@/components/vs/VsIndexRow";
import { competitors } from "@/data/competitors";
import { routeMeta } from "@/lib/seo";

export const metadata: Metadata = routeMeta.vs;

/**
 * /vs - comparison hub. Cream hero (mono slug + h1 + intro), then a ruled
 * editorial index of all seven comparisons (magazine contents page), then
 * the variant-A CTA band. Light throughout until the band's perforation.
 */
export default function ComparisonHubPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Hero - compact cream ─────────────────────────── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16 lg:px-10">
            <p
              className="enter-fade-rise till text-[0.8125rem] uppercase tracking-[0.14em] text-marigold-700"
              style={{ animationDelay: "60ms" }}
            >
              Comparisons
            </p>
            <h1 className="enter-rise mt-4 max-w-3xl">
              Compare AppFox to other order editing apps
            </h1>
            <p
              className="enter-fade-rise mt-6 max-w-[70ch] text-lg leading-relaxed text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Every app in this category promises fewer support tickets and more revenue - the
              differences live in the details: how edits actually happen (in place, or
              cancel-and-reorder), what the pricing meters (edits, orders, even your upsell
              revenue), and how much control the merchant keeps. These comparisons lay out those
              details side by side, plainly. Where a competitor is genuinely strong, we say so;
              where the trade-offs favor AppFox - flat pricing with no per-edit fees, in-place
              editing that preserves your Shopify Payments fees, and an eligibility engine that
              hides ineligible edits entirely - we show our work.
            </p>
          </div>
        </section>

        {/* ── The index - ruled editorial contents page ────── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="01" label="THE INDEX" caption="Seven comparisons, one standard." />
            </Reveal>

            <ul className="mt-2 max-w-5xl divide-y divide-paper-edge border-b border-paper-edge">
              <StaggerGroup step={70}>
                {competitors.map((c, i) => (
                  <Reveal key={c.slug} as="li" index={i}>
                    <VsIndexRow
                      href={`/vs/${c.slug}`}
                      numeral={String(i + 1).padStart(2, "0")}
                      title={<VsTitle shortName={c.shortName} />}
                      category={c.category}
                      framing={c.framing}
                      action="READ"
                    />
                  </Reveal>
                ))}
              </StaggerGroup>
            </ul>
          </div>
        </section>

        {/* CTA band - variant A (pain). Previous section is light paper. */}
        <CtaBand
          headline="There’s a “can I change my order?” email in your inbox right now"
          body="Make it the last one anyone on your team answers by hand. Setup takes about 5 minutes, and the free plan doesn’t expire."
          primaryLabel="Install free on Shopify"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
