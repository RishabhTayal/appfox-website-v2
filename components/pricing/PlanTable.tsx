import { SectionSlug } from "@/components/site/SectionSlug";
import { InView } from "@/components/ui/InView";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { Tick } from "./Tick";

/**
 * "What's in each plan" — a simple plan-difference table in the till
 * ledger voice. Strictly honest to the feature lists on the cards above:
 * no invented rows. Per CONTRACT, ticks are hand-drawn `.draw-path` SVGs
 * (triggered by the wrapping InView) and misses are ink-300 em-dashes,
 * never a red X. Growth column tinted brand-50 (the /vs table treatment).
 */

/** string = mono value · true = tick · null = em-dash miss */
type Cell = string | true | null;

const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Customer edits", cells: ["50 / mo", "Unlimited", "Unlimited"] },
  { label: "Edit types", cells: ["Address & quantity", "All edit types", "All edit types"] },
  { label: "Active upsell offers", cells: ["2", "Unlimited", "Unlimited"] },
  { label: "AI-powered upsell recommendations", cells: [null, true, true] },
  { label: "Branded customer portal", cells: [true, true, "White-label"] },
  { label: "Analytics", cells: [null, "Dashboard", "Advanced + exports"] },
  { label: "API access", cells: [null, null, "Full API"] },
  { label: "Support", cells: ["Email", "Priority", "Dedicated manager + SLA"] },
];

const PLAN_HEADS = [
  { name: "Free", price: `$${site.pricing.free.price}/mo` },
  { name: "Growth", price: `$${site.pricing.growth.price}/mo`, featured: true },
  { name: "Pro", price: `$${site.pricing.pro.price}/mo` },
];

/** brand-tinted Growth column, hairline columns otherwise */
function colClass(col: number) {
  return col === 1 ? "border-x border-brand-200 bg-brand-50" : "";
}

function CellValue({ cell, drawDelay }: { cell: Cell; drawDelay: number }) {
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
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="till text-[0.8125rem] text-ink-700">{cell}</span>;
}

export function PlanTable() {
  return (
    <section id="whats-in-each-plan" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="none">
          <SectionSlug no="03" label="WHAT’S IN EACH PLAN" caption="The differences, line by line" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">What’s in each plan</h2>
        </Reveal>

        <Reveal delay={100}>
          <InView className="mt-10 overflow-hidden rounded-2xl border border-paper-edge bg-paper-raised shadow-(--shadow-card)">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <caption className="sr-only">
                  Plan differences across the Free, Growth, and Pro plans
                </caption>
                <thead>
                  <tr className="border-b border-paper-edge">
                    <th scope="col" className="px-5 py-4 sm:px-6">
                      <span className="sr-only">Feature</span>
                    </th>
                    {PLAN_HEADS.map((plan, col) => (
                      <th key={plan.name} scope="col" className={`px-5 py-4 sm:px-6 ${colClass(col)}`}>
                        <span className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink-900">
                          {plan.name}
                          {plan.featured ? (
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-marigold-500"
                            />
                          ) : null}
                        </span>
                        <span className="till mt-1 block text-[0.8125rem] font-normal text-ink-500">
                          {plan.price}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-paper-edge">
                  {ROWS.map((row, r) => (
                    <tr key={row.label} className="transition-colors hover:bg-paper-sunken">
                      <th
                        scope="row"
                        className="px-5 py-3.5 text-[0.9375rem] font-medium text-ink-700 sm:px-6"
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, col) => (
                        <td key={col} className={`px-5 py-3.5 align-middle sm:px-6 ${colClass(col)}`}>
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
  );
}
