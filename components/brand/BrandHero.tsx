import { apps } from "@/data/apps";
import { HeroOrderDemo } from "@/components/brand/HeroOrderDemo";
import { Scene } from "@/components/scene/Scene";
import { FoxCameo } from "@/components/fox/FoxCameo";
import { AppGlyph } from "@/components/site/AppGlyph";

/**
 * Home hero - fox country at dusk. Headline on the sky, the working
 * portal demo in a browser window on the right with a stack of demo
 * "what just happened" toasts, and Foxy waving from the near hill
 * (the site-wide pet steps aside until this cameo scrolls away).
 *
 * LCP rule: the h1 animates with `.enter-rise` (transform-only).
 */

const TOASTS = [
  { slug: "order-editing", title: "Order #1042 edited", body: "Customer swapped size M → L · auto-applied" },
  { slug: "subscription", title: "New subscriber", body: "Subscribe & save 10% · every 30 days" },
  { slug: "product-bundles", title: "Bundle added to cart", body: "Mix & match 3-pack · volume discount" },
];

export function BrandHero() {
  return (
    <section className="relative isolate overflow-hidden bg-night" data-fox-pose="wave" data-fox-expr="happy">
      <Scene variant="dusk" seed={7} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-32 sm:px-8 sm:pt-36 lg:px-10 lg:pb-64 lg:pt-40">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <p className="enter-fade-rise" style={{ animationDelay: "40ms" }}>
              <span className="px-badge on-night">
                <span className="h-1.5 w-1.5 rounded-full bg-marigold-300" />
                {apps.length} Shopify apps · one small team
              </span>
            </p>

            <h1 className="enter-rise mx-auto mt-6 max-w-3xl !text-white lg:mx-0">
              Grow revenue from <span className="px-accent text-marigold-300">every order</span>
            </h1>

            <p
              className="enter-fade-rise mx-auto mt-6 max-w-[54ch] text-lg leading-[1.6] text-white/85 sm:text-xl lg:mx-0"
              style={{ animationDelay: "120ms" }}
            >
              AppFox builds Shopify apps that turn orders into growth - customers subscribe right
              from your product page, fix their own orders, and add to them after checkout. Fewer
              tickets, bigger orders, recurring revenue.
            </p>

            <div
              className="enter-fade-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
              style={{ animationDelay: "200ms" }}
            >
              <a href="#apps" className="btn-marigold">
                Explore the apps
              </a>
              <a href="/pricing" className="btn-secondary on-night">
                See pricing
              </a>
            </div>

            <p className="enter-fade-rise till mt-5 text-sm text-white/70" style={{ animationDelay: "280ms" }}>
              Free to start · 5-minute setup · No theme code
            </p>
          </div>

          <div className="enter-fade-rise relative" style={{ animationDelay: "240ms" }}>
            {/* Demo toasts - illustrative product events */}
            <ul aria-hidden="true" className="pointer-events-none absolute -right-2 -top-8 z-20 hidden w-72 space-y-2 xl:block xl:-right-10">
              {TOASTS.map((t, i) => (
                <li
                  key={t.title}
                  className="hero-toast flex items-start gap-2.5 rounded-none border border-white/20 bg-[rgba(30,25,70,0.72)] p-2.5 text-white shadow-[4px_4px_0_0_rgba(10,8,30,0.55)] backdrop-blur-md"
                  style={{ animationDelay: `${900 + i * 700}ms` }}
                >
                  <AppGlyph slug={t.slug} size={28} />
                  <span className="min-w-0">
                    <span className="flex items-center justify-between gap-2 text-[0.75rem] font-semibold">
                      {t.title}
                      <span className="till text-[0.625rem] font-normal text-white/55">now</span>
                    </span>
                    <span className="block truncate text-[0.72rem] text-white/75">{t.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="lg:pt-14">
              <HeroOrderDemo onDark />
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex justify-center pb-16 lg:absolute lg:bottom-[7%] lg:left-[6%] lg:pb-0">
        <FoxCameo pose="wave" expr="happy" size={170} />
      </div>
    </section>
  );
}
