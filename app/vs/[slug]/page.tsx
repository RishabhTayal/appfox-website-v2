import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { competitors, getCompetitor } from "@/data/competitors";

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};
  return {
    title: competitor.metaTitle,
    description: competitor.metaDescription,
    openGraph: {
      title: competitor.metaTitle,
      description: competitor.metaDescription,
      type: "article",
    },
  };
}

function Cell({ value }: { value: string | true | false }) {
  if (value === true) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  }
  return <div className="text-center text-sm text-gray-700 font-medium">{value}</div>;
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  const otherCompetitors = competitors.filter((c) => c.slug !== competitor.slug);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-100 blur-3xl opacity-60" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-100 blur-3xl opacity-50" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-sm font-medium mb-6">
                {competitor.category} Comparison
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                AppFox vs{" "}
                <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  {competitor.shortName}
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                {competitor.tagline}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#install"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-purple-200"
                >
                  Try AppFox Free
                </a>
                <a
                  href="#comparison"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-base hover:border-purple-300 hover:text-purple-700 transition-colors"
                >
                  See full comparison ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                The short version
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">{competitor.intro}</p>
              <div className="mt-6 rounded-xl border-l-4 border-purple-500 bg-purple-50 p-5">
                <p className="text-sm font-semibold text-purple-900 mb-1">Best for</p>
                <p className="text-gray-700">{competitor.bestFor}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why AppFox */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-widest">
                Why Switch
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Why merchants choose AppFox over {competitor.shortName}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competitor.whyAppfox.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section id="comparison" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-widest">
                Feature Comparison
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                AppFox vs {competitor.shortName}, side by side
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-gradient-to-r from-purple-50 to-violet-50">
                <div className="px-6 py-4 text-sm font-bold text-gray-900">Feature</div>
                <div className="px-6 py-4 text-sm font-bold text-center bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                  AppFox
                </div>
                <div className="px-6 py-4 text-sm font-bold text-center text-gray-700">
                  {competitor.shortName}
                </div>
              </div>
              {competitor.comparison.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1.5fr_1fr_1fr] items-center border-t border-gray-100 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="px-6 py-4 text-sm text-gray-700">{row.feature}</div>
                  <div className="px-6 py-4">
                    <Cell value={row.appfox} />
                  </div>
                  <div className="px-6 py-4">
                    <Cell value={row.competitor} />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
              Comparison based on publicly available information as of 2026. Pricing and features may change.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-widest">
                Frequently Asked
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Switching from {competitor.shortName}?
              </h2>
            </div>
            <div className="space-y-4">
              {competitor.faq.map((item) => (
                <div key={item.q} className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="font-bold text-gray-900">{item.q}</h3>
                  <p className="mt-2 text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 p-10 sm:p-14 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                See why merchants switch to AppFox
              </h2>
              <p className="mt-3 text-purple-100 text-lg max-w-2xl mx-auto">
                Free plan up to 50 edits per month. 5-minute setup. No credit card required.
              </p>
              <a
                href="#install"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-colors shadow-lg"
              >
                Install AppFox Free →
              </a>
            </div>
          </div>
        </section>

        {/* Other comparisons */}
        {otherCompetitors.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Compare AppFox to other apps
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherCompetitors.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/vs/${c.slug}`}
                    className="block rounded-2xl border border-gray-200 bg-white p-6 hover:border-purple-300 hover:shadow-md transition-all"
                  >
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest">
                      {c.category}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-gray-900">
                      AppFox vs {c.shortName} →
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{c.metaDescription.slice(0, 110)}...</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
