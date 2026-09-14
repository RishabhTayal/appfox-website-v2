import Link from "next/link";
import { apps } from "@/data/apps";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./brand.module.css";

const STORIES: Record<string, { label: string; title: string; copy: string }> =
  {
    "order-editing": {
      label: "After checkout",
      title: "Let customers fix it.\nKeep your day moving.",
      copy: "A different size. A new address. One more item. Give customers the freedom to update their order, with the rules you set.",
    },
    subscription: {
      label: "On the next order",
      title: "Make a good thing\na regular thing.",
      copy: "Turn a first purchase into a routine. Offer subscriptions on your product pages and let customers manage what comes next.",
    },
    "product-bundles": {
      label: "Before checkout",
      title: "Better together.\nBigger baskets.",
      copy: "Pair the products your customers love. Build bundles, volume discounts, and mix and match offers that make adding more feel natural.",
    },
  };

function ProductPreview({ slug }: { slug: string }) {
  if (slug === "order-editing")
    return (
      <div
        className={styles.preview}
        aria-label="Example order editing activity"
      >
        <div className={styles.previewTop}>
          <span>Order activity</span>
          <span>Today</span>
        </div>
        {[
          {
            order: "#1042",
            detail: "Size updated from M to L",
            status: "Saved",
          },
          {
            order: "#1041",
            detail: "Gift wrap added to order",
            status: "+$4.00",
          },
          {
            order: "#1040",
            detail: "Shipping address corrected",
            status: "Saved",
          },
        ].map((row) => (
          <div className={styles.activityRow} key={row.order}>
            <span className={styles.activityCheck} aria-hidden="true">
              ✓
            </span>
            <div>
              <p className="text-xs text-ink-500">{row.order}</p>
              <p className="mt-1 text-sm text-ink-900">{row.detail}</p>
            </div>
            <span className="ml-auto text-xs text-ink-500">{row.status}</span>
          </div>
        ))}
        <p className="mt-4 text-xs text-ink-500">
          Handled by your customer. Within your rules.
        </p>
      </div>
    );
  if (slug === "subscription")
    return (
      <div className={styles.preview} aria-label="Example subscription widget">
        <div className={styles.previewTop}>
          <span>The daily blend</span>
          <span>250 g</span>
        </div>
        <div className={styles.purchaseOption}>
          <span className={styles.radio} />
          <span>One time purchase</span>
          <span className="ml-auto">$18.00</span>
        </div>
        <div className={`${styles.purchaseOption} ${styles.selectedOption}`}>
          <span className={`${styles.radio} ${styles.selectedRadio}`} />
          <span>Subscribe &amp; save</span>
          <span className="ml-auto">$16.20</span>
        </div>
        <div className="mt-4 flex justify-between gap-2 text-xs text-ink-500">
          <span>Every 30 days</span>
          <span>Skip · pause · cancel</span>
        </div>
      </div>
    );
  return (
    <div className={styles.preview} aria-label="Example product bundle">
      <div className={styles.previewTop}>
        <span>Your daily ritual, bundled.</span>
        <span>3 essentials</span>
      </div>
      <div className={styles.bundleItems} aria-hidden="true">
        <div>
          <div className={styles.coffeeBag} />
          <span>Daily blend</span>
        </div>
        <span>+</span>
        <div>
          <div className={styles.coffeeCup} />
          <span>Everyday mug</span>
        </div>
        <span>+</span>
        <div>
          <div className={styles.coffeeBag} />
          <span>Decaf blend</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-ink-900">
        <span>The morning set</span>
        <span>Better as a bundle ↗</span>
      </div>
    </div>
  );
}

export function AppShowcase() {
  return (
    <section
      id="apps"
      className={styles.appSection}
      aria-labelledby="apps-title"
    >
      <div className={styles.container}>
        <Reveal className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>The AppFox collection</p>
            <h2 id="apps-title" className="mt-4">
              Three apps.
              <br />
              Every part of the order.
            </h2>
          </div>
          <p className="max-w-sm text-base text-ink-500">
            Start with what your store needs today.
            <br />
            Add the next app when you’re ready.
          </p>
        </Reveal>
        <div className={styles.appGrid}>
          {apps.map((app, index) => (
            <Reveal
              key={app.slug}
              className={index === 0 ? styles.featuredApp : undefined}
            >
              <article className={styles.appCard}>
                <div className={styles.appCardCopy}>
                  <p className="flex items-center gap-3 text-xs text-ink-500">
                    <span className={styles.appNumber}>0{index + 1}</span>
                    {STORIES[app.slug].label}
                  </p>
                  <p className="mt-6 text-sm font-medium text-ink-500">
                    {app.shortName}
                  </p>
                  <h3 className={styles.appTitle}>{STORIES[app.slug].title}</h3>
                  <p className="mt-4 max-w-md text-base text-ink-500">
                    {STORIES[app.slug].copy}
                  </p>
                  <div className={styles.appActions}>
                    <Link href={app.href} className={styles.textLink}>
                      Explore {app.shortName}
                      <span aria-hidden="true">↗</span>
                    </Link>
                    <a
                      href={app.installUrl}
                      className="text-sm text-ink-500 hover:text-ink-900"
                    >
                      Install free
                    </a>
                  </div>
                  <p className="mt-4 text-xs text-ink-500">{app.pricingLine}</p>
                </div>
                <ProductPreview slug={app.slug} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
