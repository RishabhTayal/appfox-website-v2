import { HeroOrderDemo } from "@/components/brand/HeroOrderDemo";
import styles from "./brand.module.css";

export function BrandHero() {
  return (
    <section
      className={`${styles.hero} grain grain-soft`}
      aria-labelledby="home-title"
    >
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div>
            <p className={`${styles.eyebrow} enter-fade-rise`}>
              <span className={styles.statusDot} /> Built for the way you sell
            </p>
            <h1 id="home-title" className={`${styles.headline} enter-rise`}>
              Good orders.
              <br />
              Better outcomes.
            </h1>
            <p className={`${styles.heroCopy} enter-fade-rise`}>
              More in every cart. Less in your inbox.
              <br className="hidden sm:block" /> Three Shopify apps that make
              every order go further.
            </p>
            <a href="#apps" className="btn-primary mt-8">
              Find your next advantage <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-4 text-sm text-ink-500">
              Free plans. No code. Room to grow.
            </p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.orbit} aria-hidden="true" />
            <div className={styles.visualHeading}>
              <span>One order. More possibilities.</span>
              <span className="text-xs">AppFox / 01</span>
            </div>
            <HeroOrderDemo />
            <div className={styles.visualFootnote}>
              <span className={styles.statusDot} />
              <span>Your customer takes it from here.</span>
            </div>
          </div>
        </div>
        <div className={styles.trustRow} aria-label="Built around your store">
          <p>
            Small changes.
            <br />
            <span className="text-ink-900">
              A better way to run your store.
            </span>
          </p>
          <span>Native Shopify checkout</span>
          <span>You set the rules</span>
          <span>One team behind every app</span>
        </div>
      </div>
    </section>
  );
}
