import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SceneHeader } from "@/components/scene/SceneHeader";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist, or it moved without telling anyone.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <SceneHeader variant="night" seed={404} pose="map" expr="wide" react="question" foxSize={170} hills="lg">
          <div className="mx-auto max-w-2xl px-6 pt-36 text-center sm:px-8 sm:pt-44 lg:px-10">
            <p className="eyebrow enter-fade-rise !text-white/70">HTTP 404 · route not found</p>
            <h1 className="enter-rise mt-6 text-white">
              Foxy took a <span className="text-[#ffb478]">wrong turn</span>
            </h1>
            <p className="enter-fade-rise mx-auto mt-6 max-w-xl text-lg text-white/75" style={{ animationDelay: "120ms" }}>
              Catching bad addresses is sort of our whole thing, but this one&apos;s on us: the page
              you&apos;re looking for doesn&apos;t exist, or it moved without telling anyone. Let&apos;s
              get you back on the trail.
            </p>
            <div className="enter-fade-rise mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "220ms" }}>
              <Link href="/" className="btn-marigold">Back to home</Link>
              <Link href="/apps" className="btn-secondary on-night">Browse the apps</Link>
              <Link href="/pricing" className="btn-secondary on-night">See pricing</Link>
            </div>
          </div>
        </SceneHeader>
        <section className="bg-paper py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-4 px-6 sm:grid-cols-3 sm:px-8 lg:px-10">
            {[
              { href: "/order-editing", t: "Order Editing & Upsell", d: "Let customers fix their own orders." },
              { href: "/subscription", t: "Subscription", d: "Subscribe & save, customer portal, renewals." },
              { href: "/product-bundles", t: "Bundles", d: "Bundles, volume discounts and BOGO." },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="card group p-6 transition-transform duration-300 hover:-translate-y-1">
                <p className="font-display text-lg font-medium text-ink-900">{l.t}</p>
                <p className="mt-2 text-sm text-ink-600">{l.d}</p>
                <span className="mt-4 inline-block text-sm font-medium text-brand-600 transition-transform group-hover:translate-x-1">Take me there →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
