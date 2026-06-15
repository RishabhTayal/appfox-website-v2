import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist, or it moved without telling anyone.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 paper-wash">
        <section className="py-24 sm:py-32">
          <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
            {/* Receipt-style ledger card - the failed delivery slip */}
            <div className="enter-fade-rise mx-auto max-w-sm -rotate-1 card p-5 text-left">
              <div className="till flex items-baseline justify-between text-xs uppercase tracking-[0.14em] text-ink-500">
                <span>Route lookup</span>
                <span>HTTP/404</span>
              </div>
              <div className="mt-3 border-t border-dashed border-paper-edge pt-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="till text-sm text-ink-900">404 - page not found</span>
                  <span className="chip chip-danger">undeliverable</span>
                </div>
              </div>
            </div>

            <h1 className="enter-rise mt-10">Wrong address - it happens</h1>

            <p
              className="enter-fade-rise mt-6 max-w-xl mx-auto text-ink-700"
              style={{ animationDelay: "120ms" }}
            >
              Catching bad addresses is sort of our whole thing, but this one&apos;s on us: the
              page you&apos;re looking for doesn&apos;t exist, or it moved without telling anyone.
              Let&apos;s get your order back on track.
            </p>

            <div
              className="enter-fade-rise mt-10 flex flex-wrap items-center justify-center gap-4"
              style={{ animationDelay: "220ms" }}
            >
              <Link href="/" className="btn-primary">
                Back to home
              </Link>
              <Link href="/pricing" className="btn-secondary">
                See pricing
              </Link>
              <Link href="/vs" className="btn-secondary">
                Compare apps
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
