import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./brand.module.css";

const STANDARDS = [
  {
    title: "Your store stays your store.",
    copy: "Orders update in place. Subscriptions use Shopify Checkout. Every app fits into the way you already sell.",
  },
  {
    title: "Start small. Stay in control.",
    copy: "Every app has a free plan. Try the workflow in your own store, then choose the plan that fits.",
  },
  {
    title: "Set it up without the handoff.",
    copy: "Add your widgets, choose your settings, and make them yours. No theme code or developer queue.",
  },
  {
    title: "Real people, one conversation away.",
    copy: "The same AppFox team supports all three apps. Get help with setup, migration, or the details specific to your store.",
  },
];

export function WhyAppfox() {
  return (
    <section
      className="bg-paper-raised py-20 sm:pb-24"
      aria-labelledby="standards-title"
    >
      <div
        className={`${styles.container} grid gap-12 lg:grid-cols-2 lg:gap-24`}
      >
        <Reveal>
          <p className={styles.eyebrow}>A little less complicated</p>
          <h2 id="standards-title" className="mt-4 max-w-md">
            Built for your store.
            <br />
            And your peace of mind.
          </h2>
          <p className="mt-6 max-w-sm text-base text-ink-500">
            You have a business to run. Your apps should give you more time to
            run it.
          </p>
          <a
            href={`mailto:${site.supportEmail}`}
            className={`${styles.textLink} mt-8`}
          >
            Talk to the AppFox team <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
        <div className="grid gap-8">
          {STANDARDS.map((standard, index) => (
            <Reveal
              key={standard.title}
              className="grid grid-cols-[auto_1fr] gap-6"
            >
              <span className="pt-1 text-xs text-ink-500 tabular-nums">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-xl font-medium">{standard.title}</h3>
                <p className="mt-2 max-w-md text-base text-ink-500">
                  {standard.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
