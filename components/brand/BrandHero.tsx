import { apps } from "@/data/apps";

/**
 * Brand hero - the multi-app front door. Centered cream hero on paper-wash;
 * the two app cards in <AppShowcase> sit directly below and carry the
 * detail, so this stays short: one claim, two CTAs, one trust line.
 *
 * LCP rule: h1 animates with `.enter-rise` (transform-only); everything
 * else `.enter-fade-rise` with staggered delays.
 */
export function BrandHero() {
  return (
    <section className="paper-wash grain grain-soft relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-4 text-center sm:px-8 sm:pt-36 sm:pb-6 lg:px-10">
        <p className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
          <span className="till inline-flex items-center rounded-lg border border-paper-edge bg-paper-raised px-3 py-1.5 text-[0.8125rem] text-marigold-700 shadow-(--shadow-card)">
            {apps.length} apps · built for Shopify merchants
          </span>
        </p>

        <h1 className="enter-rise mx-auto mt-6 max-w-4xl">
          Everything after checkout,{" "}
          <span className="wonk relative inline-block">
            handled
            {/* Hand-drawn marigold underline, draws on at ~600ms */}
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
                className="draw-path"
                style={{ "--draw-delay": "600ms" } as React.CSSProperties}
              />
            </svg>
          </span>
        </h1>

        <p
          className="enter-fade-rise mx-auto mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
          style={{ animationDelay: "140ms" }}
        >
          AppFox builds Shopify apps for the moments after the sale - customers fixing their own
          orders, adding to them, and coming back on a schedule. Fewer tickets, bigger orders,
          recurring revenue.
        </p>

        <div
          className="enter-fade-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "220ms" }}
        >
          <a href="#apps" className="btn-primary">
            Explore the apps
          </a>
        </div>

        <p
          className="enter-fade-rise till mt-4 text-sm text-ink-500"
          style={{ animationDelay: "320ms" }}
        >
          Free to start · 5-minute setup · No theme code
        </p>
      </div>
    </section>
  );
}
