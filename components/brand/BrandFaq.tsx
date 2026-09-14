import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import styles from "./brand.module.css";

const QUESTIONS = [
  {
    question: "Do I need all three apps?",
    answer:
      "No. Each AppFox app works independently. Start with order editing, subscriptions, or bundles, and add another when your store needs it.",
  },
  {
    question: "Can I start for free?",
    answer:
      "Yes. All three apps have a free plan. Order Editing includes 50 edits a month, and Subscription includes 50 active subscriptions. Each app’s pricing page explains its limits and paid plans.",
  },
  {
    question: "Do I need to change my theme code?",
    answer:
      "No. Install the app, configure your settings, and add its widgets through Shopify. You can adjust the appearance to suit your store.",
  },
  {
    question: "Can I decide what customers can edit?",
    answer:
      "Yes. With Order Editing, you choose the editing window and allowed changes. Changes can apply automatically or go through your approval queue.",
  },
  {
    question: "Can subscribers manage their own orders?",
    answer:
      "Yes. The Subscription customer portal lets customers skip a delivery, pause, swap products, change frequency, update payment details, or cancel.",
  },
  {
    question: "Who can help me get set up?",
    answer: `The AppFox team supports all three apps. Contact ${site.supportEmail} for help with setup, migration, or questions about your store.`,
  },
];

export function BrandFaq() {
  return (
    <section
      id="faq"
      className="bg-paper-raised py-20 sm:pb-24"
      aria-labelledby="faq-title"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: QUESTIONS.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
      <div className={styles.container}>
        <Reveal className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Before you get started</p>
            <h2 id="faq-title" className="mt-4">
              Good questions.
              <br />
              Straight answers.
            </h2>
          </div>
          <a href={`mailto:${site.supportEmail}`} className={styles.textLink}>
            Ask us anything <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
        <div className="grid gap-x-24 gap-y-10 md:grid-cols-2">
          {QUESTIONS.map(({ question, answer }) => (
            <Reveal key={question}>
              <h3 className="text-lg font-medium">{question}</h3>
              <p className="mt-3 max-w-prose text-base text-ink-500">
                {answer}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
