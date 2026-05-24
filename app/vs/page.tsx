import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { competitors } from "@/data/competitors";

export const metadata: Metadata = {
  title: "AppFox Comparisons | Best Shopify Order Editing & Upsell App",
  description:
    "Compare AppFox to other Shopify order editing and post-purchase upsell apps. See feature-by-feature breakdowns of Cleverific, AfterSell, Edit Order, and more.",
};

export default function ComparisonIndexPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-100 blur-3xl opacity-60" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-sm font-medium mb-6">
              Comparisons
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              How AppFox{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                stacks up
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              See exactly how AppFox compares to other Shopify order editing and post-purchase upsell apps — feature by feature.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitors.map((c) => (
                <Link
                  key={c.slug}
                  href={`/vs/${c.slug}`}
                  className="group block rounded-2xl border border-gray-200 bg-white p-7 hover:border-purple-300 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest">
                    {c.category}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-gray-900">
                    AppFox vs {c.shortName}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    {c.metaDescription.slice(0, 130)}...
                  </p>
                  <p className="mt-5 text-sm font-semibold text-purple-600 group-hover:underline">
                    Read comparison →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 p-10 sm:p-14 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Skip the comparison shopping
              </h2>
              <p className="mt-3 text-purple-100 text-lg max-w-2xl mx-auto">
                Install AppFox free and see for yourself in 5 minutes.
              </p>
              <a
                href="/#install"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-colors shadow-lg"
              >
                Install AppFox Free →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
