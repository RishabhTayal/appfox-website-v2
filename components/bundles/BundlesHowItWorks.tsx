import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 02 - HOW IT WORKS. Light section with three-step flow.
 */

const STEPS: { no: string; title: string; copy: string }[] = [
  {
    no: "01",
    title: "Create your bundle",
    copy: "Pick the products, set the discount, and choose between fixed bundles (curated sets) or mix-and-match (customer choice). The widget updates in real time.",
  },
  {
    no: "02",
    title: "Add the widget to your store",
    copy: "Drop the Shopify 2.0 app block onto product pages, collection pages, or your homepage. It inherits your theme's design automatically - no code required.",
  },
  {
    no: "03",
    title: "Customers see the savings",
    copy: "Bundle pricing displays clearly at every step: product page, cart, and checkout. Discounts apply automatically. Analytics show you which bundles earn their place.",
  },
];

export function BundlesHowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper-sunken py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="02" label="HOW IT WORKS" caption="Three steps, then you're selling bundles" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Setup takes about 5 minutes</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            No theme surgery, no developer hours. Create a bundle, add the widget, and watch the
            average order value climb.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <StaggerGroup step={120}>
            {STEPS.map((step, i) => (
              <Reveal key={step.no} index={i} className="h-full">
                <article className="card flex h-full flex-col p-7">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-marigold-500 till text-sm font-bold text-ink-900"
                      aria-hidden="true"
                    >
                      {step.no}
                    </span>
                    <h3 className="text-xl">{step.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-700">{step.copy}</p>
                </article>
              </Reveal>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
