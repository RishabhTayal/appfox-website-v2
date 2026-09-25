import Link from "next/link";
import { apps } from "@/data/apps";
import { InView } from "@/components/ui/InView";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { AppGlyph } from "@/components/site/AppGlyph";

/**
 * The front-of-house shelf: one OS-window card per app (title bar, app
 * mark, pricing chip, a mini product vignette, feature list, and both
 * CTAs). Install buttons point at each app's live App Store listing.
 */


/** Hand-drawn tick - never a ✓ character. */
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

const VIGNETTES: Record<string, React.ReactNode> = {
  "order-editing": <OrderEditVignette />,
  subscription: <SubscribeVignette />,
  "product-bundles": <BundleVignette />,
};

export function AppShowcase() {
  return (
    <section id="apps" className="relative bg-paper" data-fox-pose="juggle" data-fox-say="Three apps - I juggle all of them.">
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-24 lg:px-10">
        <Reveal variant="blur" className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The AppFox den</p>
          <h2 className="mt-4">
            Three apps.
            <br />
            One smoother order journey.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
            From the product page to the order status page to the next renewal - each app looks
            after one moment, and all three start free.
          </p>
        </Reveal>
        <InView>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <StaggerGroup step={120}>
              {apps.map((app, i) => (
                <Reveal key={app.slug} index={i} className="h-full">
                  <article className="window group flex h-full flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[6px_6px_0_0_var(--color-ink-900)]">
                    <div className="window-bar justify-between">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="window-dots"><i /><i /><i /></span>
                        <span className="truncate">{app.name}</span>
                      </span>
                      <span aria-hidden="true" className="text-ink-300">×</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <AppGlyph slug={app.slug} size={48} className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
                        <span className="till rounded-full border border-paper-edge bg-paper px-2.5 py-1 text-[0.6875rem] text-ink-700">
                          {app.pricingLine}
                        </span>
                      </div>
                      <h3 className="mt-5 text-[1.625rem] font-medium tracking-tight">{app.shortName}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-700">{app.tagline}</p>

                      <div className="mt-5">{VIGNETTES[app.slug]}</div>

                      <p className="eyebrow mt-6 !text-[0.6875rem]">Features</p>
                      <ul className="mt-3 space-y-2">
                        {app.highlights.map((h, j) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-ink-700">
                            <Tick delay={250 + j * 40} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto grid grid-cols-2 gap-2.5 pt-7">
                        <Link href={app.href} className="btn-secondary !px-3">
                          Explore
                        </Link>
                        <a href={app.installUrl} className="btn-primary !px-3">
                          Install free
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </StaggerGroup>
          </div>
        </InView>
      </div>
    </section>
  );
}

/* ── Product Bundles - mini volume-discount widget ───────────────── */

function BundleVignette() {
  return (
    <div className="rounded-none border border-paper-edge bg-paper p-4" aria-hidden="true">
      {[
        { q: "Buy 1", note: "Standard price", on: false },
        { q: "Buy 2", note: "Save 10%", on: true },
        { q: "Buy 3", note: "Save 15%", on: false },
      ].map((t) => (
        <div
          key={t.q}
          className={`mt-1.5 flex items-center justify-between rounded-lg px-3 py-1.5 first:mt-0 ${
            t.on ? "border border-success/40 bg-success-bg" : "border border-transparent"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span className={`h-3 w-3 rounded-full border-2 ${t.on ? "border-success bg-success" : "border-ink-300"}`} />
            <span className="text-xs font-semibold text-ink-900">{t.q}</span>
          </span>
          <span className={`till text-xs ${t.on ? "text-success" : "text-ink-500"}`}>{t.note}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Order Editing - mini portal row, edit auto-applying ─────────── */

function OrderEditVignette() {
  return (
      <div className="rounded-none border border-paper-edge bg-paper p-4" aria-hidden="true">
      <div className="flex items-center justify-between gap-2 border-b border-paper-edge pb-2.5">
        <p className="till text-xs text-ink-500">
          <span className="text-ink-700">#1042</span> · Size swap M → L
        </p>
        <span
          className="chip chip-success stamp-in !px-2 !py-0.5 !text-[0.625rem] tracking-wide"
          style={{ "--stamp-delay": "900ms" } as React.CSSProperties}
        >
          AUTO-APPLIED
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 pt-2.5">
        <p className="till text-xs text-ink-500">
          <span className="text-ink-700">#1041</span> · Added gift wrap
        </p>
        <span className="till text-xs text-success">+$4.00 upsell</span>
      </div>
    </div>
  );
}

/* ── Subscription - mini subscribe-and-save widget ───────────────── */

function SubscribeVignette() {
  return (
    <div className="rounded-none border border-paper-edge bg-paper p-4" aria-hidden="true">
      <div className="flex items-center justify-between rounded-lg border border-brand-200 bg-brand-50 px-3 py-2">
        <span className="flex items-center gap-2.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-600">
            <span className="h-1 w-1 rounded-full bg-paper" />
          </span>
          <span className="text-xs font-semibold text-ink-900">Subscribe &amp; save 10%</span>
        </span>
        <span className="till text-xs text-brand-700">$16.20/mo</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 pt-0.5">
        <p className="till text-xs text-ink-500">Deliver every 30 days</p>
        <span className="till text-xs text-ink-500">skip · pause · cancel</span>
      </div>
    </div>
  );
}
