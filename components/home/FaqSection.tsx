import Link from "next/link";
import { AccordionItem } from "@/components/ui/Accordion";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";
import { site } from "@/lib/site";

/**
 * §5.13 FAQ - light · slug NO. 11 - QUESTIONS.
 * Sits between two sections: light above (no perforation needed here),
 * dark Final CTA below (that section opens with <Perforation from="paper" />).
 *
 * `homeFaqs` is exported so the page assembler can build FAQPage JSON-LD
 * from the exact same strings rendered here - markup and DOM never drift.
 */
export const homeFaqs: { q: string; a: string }[] = [
  {
    q: "Can customers edit their orders on Shopify after checkout?",
    a: 'Not by default - Shopify has no built-in way for customers to change an order once it\'s placed, which is why "can I change my order?" tickets exist. An order editing app like AppFox lets customers fix addresses, swap variants, change quantities, add or remove items, or cancel - right on your thank-you and order status pages, within rules you set.',
  },
  {
    q: "How do post-purchase upsells work?",
    a: "When a customer opens their order to edit it, AppFox shows offers you've configured directly inside the edit flow. One click adds the product to their existing order - there's no second checkout and no new order number, and any price difference is charged automatically through Shopify. Because the customer is already engaged with their order, it's the highest-attention moment after the sale.",
  },
  {
    q: "Do customers need an account or login to edit an order?",
    a: "No. Customers edit right on your store's thank-you page or order status page - the page Shopify already links from every order confirmation email. There's nothing to sign up for and no password to reset.",
  },
  {
    q: "What happens once an order is fulfilled, or my edit window closes?",
    a: 'Nothing - and that\'s the point. AppFox\'s eligibility engine checks your edit windows, fulfillment cutoffs, and per-action rules before showing the customer anything; an edit that\'s no longer allowed simply never appears as an option. Customers can\'t request what they can\'t see, so there\'s no awkward "sorry, too late" conversation.',
  },
  {
    q: "Who pays the difference when an edit changes the order total?",
    a: "It settles automatically. If the new total is higher - a pricier variant, an added item, an upsell - the customer pays the difference through Shopify's payment request flow. If it's lower, AppFox issues a partial refund. No manual invoices, no math in a spreadsheet.",
  },
  {
    q: "Can customers abuse self-service order editing?",
    a: "Customers only ever see edits you've explicitly allowed, inside windows you've set. For anything sensitive, you can require approval per edit type - those edits wait in your queue instead of applying automatically - and every change is recorded on a per-order audit timeline. You're delegating the typing, not the decision.",
  },
  {
    q: "Why does in-place editing matter?",
    a: 'Some tools "edit" orders by canceling the original and creating a new one. That forfeits Shopify Payments fees of 1.5–2.9% per cancel-and-reorder edit - fees Shopify doesn\'t return on cancellation - and forces the customer through checkout again. AppFox edits the original order in place using Shopify\'s native Order Editing API, so the order number, payment, and fees all stay intact.',
  },
  {
    q: "How long does setup take, and which plans does it work on?",
    a: "About 5 minutes, with no code. AppFox works on all Shopify plans, the Free tier is genuinely free (50 edits a month), and paid plans include a 14-day trial with no card required.",
  },
];

const answerLink =
  "text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:decoration-brand-700";

/**
 * Two answers carry internal links in the DOM; their `homeFaqs` entries stay
 * plain strings (above) so JSON-LD remains valid text. Keyed by index.
 */
const linkedAnswers: Record<number, React.ReactNode> = {
  0: (
    <>
      Not by default - Shopify has no built-in way for customers to change an order once
      it&apos;s placed, which is why &quot;can I change my order?&quot; tickets exist. An{" "}
      <Link href="/features" className={answerLink}>
        order editing app like AppFox
      </Link>{" "}
      lets customers fix addresses, swap variants, change quantities, add or remove items, or
      cancel - right on your thank-you and order status pages, within rules you set.
    </>
  ),
  6: (
    <>
      Some tools &quot;edit&quot; orders by canceling the original and creating a new one. That
      forfeits Shopify Payments fees of 1.5&ndash;2.9% per{" "}
      <Link href="/vs/orderify" className={answerLink}>
        cancel-and-reorder
      </Link>{" "}
      edit - fees Shopify doesn&apos;t return on cancellation - and forces the customer
      through checkout again. AppFox edits the original order in place using Shopify&apos;s native
      Order Editing API, so the order number, payment, and fees all stay intact.
    </>
  ),
};

export function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="none">
          <SectionSlug no="11" label="QUESTIONS" caption="Eight straight answers" />
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: sticky headline + support line */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2 className="max-w-md">The questions you’d ask before installing</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-sm text-ink-500">
                  Didn&apos;t see yours? Ask us directly at{" "}
                  <a href={`mailto:${site.supportEmail}`} className={`till ${answerLink}`}>
                    {site.supportEmail}
                  </a>
                  .
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right: ledger-ruled accordion - no cards, hairlines only */}
          <div className="lg:col-span-7">
            <div className="border-y border-paper-edge divide-y divide-paper-edge">
              <StaggerGroup step={60}>
                {homeFaqs.map((faq, i) => (
                  <Reveal key={faq.q} index={i} variant="up">
                    <AccordionItem
                      buttonClassName="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                      panelClassName="max-w-[62ch] pb-6 pr-10 text-ink-700"
                      title={
                        <span className="block">
                          <span className="block text-lg font-semibold leading-snug text-ink-900 transition-colors duration-200 [[data-open]_&]:text-brand-700">
                            {faq.q}
                          </span>
                          {/* 2px marigold underline draws beneath the open question */}
                          <span
                            aria-hidden="true"
                            className="mt-1.5 block h-0.5 w-12 origin-left scale-x-0 bg-marigold-500 transition-transform duration-300 [[data-open]_&]:scale-x-100"
                          />
                        </span>
                      }
                      icon={
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-ink-500 transition-[rotate,color] duration-250 [[data-open]_&]:rotate-45 [[data-open]_&]:text-brand-700"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 1v12M1 7h12"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      }
                    >
                      <p>{linkedAnswers[i] ?? faq.a}</p>
                    </AccordionItem>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
