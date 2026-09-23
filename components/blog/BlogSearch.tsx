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
            className="w-full rounded-xl border border-paper-edge bg-paper-raised py-3.5 pr-11 pl-12 text-[0.9375rem] text-ink-900 shadow-(--shadow-card) transition-colors placeholder:text-ink-400 hover:border-brand-200 focus:border-brand-400 focus:outline-none"
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
                        {post.readingMinutes} min read
                      </span>
                    </div>
                    <h2 className="mt-4 text-[1.375rem] leading-snug text-ink-900 transition-colors duration-200 group-hover:text-brand-700">
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
                        Published {post.formattedDate}
                      </time>
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
