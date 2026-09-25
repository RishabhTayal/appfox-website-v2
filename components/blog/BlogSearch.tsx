"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { InView } from "@/components/ui/InView";

export type BlogSearchPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  formattedDate: string;
  readingMinutes: number;
};

const COVERS = [
  { bg: "linear-gradient(135deg,#ede7ff,#d9ccff)", fg: "#8b5cf6" },
  { bg: "linear-gradient(135deg,#ffe9d6,#ffd0a8)", fg: "#f2782f" },
  { bg: "linear-gradient(135deg,#e2f4e8,#c4e8d0)", fg: "#2f9e62" },
  { bg: "linear-gradient(135deg,#e3eeff,#c9dcff)", fg: "#3b6fd8" },
];
function coverFor(category: string) {
  let h = 0;
  for (const c of category) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return COVERS[h % COVERS.length];
}

/** A tiny seeded slice of fox country for each card's cover. */
function MiniLandscape({ seed, tone }: { seed: string; tone: string }) {
  let h0 = 7;
  for (const c of seed) h0 = (h0 * 33 + c.charCodeAt(0)) >>> 0;
  const vals: number[] = [];
  for (let k = 0, h = h0; k < 16; k++) {
    h = (h * 1103515245 + 12345) >>> 0;
    vals.push((h % 1000) / 1000);
  }
  let vi = 0;
  const r = (n: number) => vals[vi++ % vals.length] * n;
  const sunX = 60 + r(260);
  const y1 = 58 + r(14), y2 = 50 + r(20), y3 = 62 + r(10);
  const trees = Array.from({ length: 5 }, () => ({ x: 20 + r(340), s: 0.7 + r(0.6) }));
  return (
    <svg viewBox="0 0 400 96" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
      <circle cx={sunX} cy={34} r={14} fill="#fff" opacity={0.75} />
      <path d={`M0 ${y1} C 90 ${y2 - 16}, 170 ${y2 - 10}, 250 ${y1 - 4} S 360 ${y3 - 14}, 400 ${y3 - 6} V96 H0Z`} fill={tone} opacity={0.28} />
      {trees.map((t, i) => (
        <path key={i} d={`M${t.x} ${70 - 22 * t.s} l${7 * t.s} ${18 * t.s} h${-14 * t.s}z`} fill={tone} opacity={0.45} />
      ))}
      <path d={`M0 ${y3 + 6} C 120 ${y3 - 8}, 240 ${y1 + 14}, 400 ${y2 + 8} V96 H0Z`} fill={tone} opacity={0.5} />
    </svg>
  );
}

function normalizeSearchText(value: string) {
  return value.trim().toLocaleLowerCase("en");
}

export function BlogSearch({ posts }: { posts: BlogSearchPost[] }) {
  const [search, setSearch] = useState("");
  const query = normalizeSearchText(search);
  const terms = query.split(/\s+/).filter(Boolean);
  const filteredPosts = terms.length
    ? posts.filter((post) => {
        const searchableText = normalizeSearchText(
          [
            post.title,
            post.excerpt,
            post.category,
            post.formattedDate,
            post.date,
          ].join(" "),
        );

        return terms.every((term) => searchableText.includes(term));
      })
    : posts;

  const resultLabel = query
    ? `${filteredPosts.length} ${filteredPosts.length === 1 ? "result" : "results"} for “${search.trim()}”`
    : `${posts.length} articles`;

  return (
    <div className="mt-8 sm:mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xl">
          <label htmlFor="blog-search" className="sr-only">
            Search blog articles
          </label>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-ink-400"
          >
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <input
            id="blog-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search articles, topics, or dates…"
            autoComplete="off"
            className="w-full rounded-full border border-paper-edge bg-paper-raised py-3.5 pr-11 pl-12 text-[0.9375rem] text-ink-900 shadow-(--shadow-card) transition-colors placeholder:text-ink-400 hover:border-brand-200 focus:border-brand-400 focus:outline-none"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear blog search"
              className="absolute top-1/2 right-3 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              <span aria-hidden="true">×</span>
            </button>
          ) : null}
        </div>

        <p
          role="status"
          aria-live="polite"
          className="till shrink-0 text-[0.75rem] text-ink-500"
        >
          {resultLabel}
        </p>
      </div>

      {filteredPosts.length > 0 ? (
        <StaggerGroup step={60}>
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <Reveal key={post.slug} as="li" index={index} className="h-full">
                <InView as="div" className="window lift h-full" threshold={0.3}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col"
                  >
                    <div className="window-bar">
                      <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
                      <span className="till truncate text-[0.6875rem] text-ink-500">
                        {post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/{post.readingMinutes}-min-read
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="relative h-24 overflow-hidden border-b border-paper-edge"
                      style={{ background: coverFor(post.slug).bg }}
                    >
                      <MiniLandscape seed={post.slug} tone={coverFor(post.slug).fg} />
                      <span className="absolute top-3 right-4 rounded-full bg-white/80 px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-700">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h2 className="text-[1.375rem] leading-snug text-ink-900 transition-colors duration-200 group-hover:text-brand-700">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <time
                        dateTime={post.date}
                        className="till text-[0.75rem] text-ink-500"
                      >
                        {post.formattedDate}
                      </time>
                      <span className="text-[0.875rem] font-medium text-ink-900 transition-transform duration-300 group-hover:translate-x-1">
                        Read →
                      </span>
                    </div>
                    </div>
                  </Link>
                </InView>
              </Reveal>
            ))}
          </ul>
        </StaggerGroup>
      ) : (
        <div className="card mt-8 px-6 py-12 text-center sm:px-8">
          <h2 className="text-[1.5rem] text-ink-900">No articles found</h2>
          <p className="mt-2 text-ink-600">
            Try a broader topic, product name, or publication date.
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="till mt-5 text-[0.8125rem] font-semibold text-brand-600 underline decoration-brand-200 decoration-2 underline-offset-4 transition-colors hover:text-brand-700"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
