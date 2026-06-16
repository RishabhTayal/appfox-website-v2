import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { InView } from "@/components/ui/InView";
import { posts, readingMinutes, formatPostDate } from "@/data/posts";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = routeMeta.blog;

/**
 * /blog - editorial index. Compact cream hero, then a card grid of posts
 * (newest first, ordered by data/posts.ts), then the CTA band. Light
 * throughout until the band's perforation. Blog/CollectionPage JSON-LD
 * lists the posts so each is discoverable as a BlogPosting.
 */
export default function BlogIndexPage() {
  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    name: "AppFox Blog",
    url: `${site.url}/blog`,
    publisher: { "@id": `${site.url}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${site.url}/blog/${p.slug}#post`,
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `${site.url}/blog/${p.slug}`,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <>
      <JsonLd data={blogLd} />
      <Navbar />
      <main className="flex-1">
        {/* ── Hero - compact cream ─────────────────────────── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16 lg:px-10">
            <p
              className="enter-fade-rise till text-[0.8125rem] uppercase tracking-[0.14em] text-marigold-700"
              style={{ animationDelay: "60ms" }}
            >
              Blog
            </p>
            <h1 className="enter-rise mt-4 max-w-3xl">
              Notes on order editing, support, and revenue
            </h1>
            <p
              className="enter-fade-rise mt-6 max-w-[68ch] text-lg leading-relaxed text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Practical guides and playbooks for Shopify merchants - cutting order-change tickets,
              letting customers self-serve, and turning the post-purchase moment into revenue. No
              fluff, no growth-hacking.
            </p>
          </div>
        </section>

        {/* ── The index - card grid ────────────────────────── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="01" label="LATEST" caption="Newest first." />
            </Reveal>

            <StaggerGroup step={80}>
              <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <Reveal key={post.slug} as="li" index={i} className="h-full">
                    <InView as="div" className="card lift h-full" threshold={0.3}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex h-full flex-col p-6 sm:p-7"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="till text-[0.6875rem] uppercase tracking-[0.14em] text-marigold-700">
                            {post.category}
                          </span>
                          <span aria-hidden="true" className="text-ink-300">
                            ·
                          </span>
                          <span className="till text-[0.6875rem] text-ink-500">
                            {readingMinutes(post)} min read
                          </span>
                        </div>
                        <h2 className="mt-4 text-[1.375rem] leading-snug text-ink-900 transition-colors duration-200 group-hover:text-brand-700">
                          {post.title}
                        </h2>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                          <span className="till text-[0.75rem] text-ink-500">
                            {formatPostDate(post.date)}
                          </span>
                          <span className="till text-[0.8125rem] font-semibold text-brand-600">
                            Read →
                          </span>
                        </div>
                      </Link>
                    </InView>
                  </Reveal>
                ))}
              </ul>
            </StaggerGroup>
          </div>
        </section>

        {/* CTA band - previous section is light paper */}
        <CtaBand
          headline="Stop answering “can I change my order?” by hand"
          body="Let customers fix their own orders, keep your Shopify fees, and grow the order on the way out. Five-minute setup. The free plan never expires."
          secondaryLabel="See how it works"
          secondaryHref="/#how-it-works"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
