import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { posts, formatPostDate } from "@/data/posts";
import styles from "./brand.module.css";

export function BrandReading() {
  return (
    <section className="py-20 sm:pb-24" aria-labelledby="reading-title">
      <div className={styles.container}>
        <Reveal className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>From the AppFox journal</p>
            <h2 id="reading-title" className="mt-4">
              A little insight.
              <br />A better next move.
            </h2>
          </div>
          <Link href="/blog" className={styles.textLink}>
            Read the journal <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>
        <div>
          {posts.slice(0, 3).map((post) => (
            <Reveal key={post.slug}>
              <article className="border-t border-paper-edge">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid items-center gap-4 py-8 md:grid-cols-[1fr_3fr_auto]"
                >
                  <p className="text-sm text-ink-500">
                    {formatPostDate(post.date)}
                  </p>
                  <h3 className="max-w-3xl text-xl font-medium transition-colors group-hover:text-ink-500 sm:text-2xl">
                    {post.title}
                  </h3>
                  <span
                    className="text-2xl text-ink-500 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <Link
          href="/vs"
          className="mt-6 inline-block text-sm text-ink-500 hover:text-ink-900"
        >
          Weighing your options? Compare AppFox with other Shopify apps ↗
        </Link>
      </div>
    </section>
  );
}
