import { site } from "@/lib/site";
import { competitors } from "@/data/competitors";

/**
 * /llms.txt - a plain-text product summary for LLM crawlers and AI
 * assistants. Every fact is sourced from lib/site.ts or
 * data/competitors.ts; only the four allowed metric claims appear.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const { free, growth, pro } = site.pricing;

  const pages = [
    {
      title: "Home",
      path: "/",
      description:
        "Product overview - the self-service edit portal, eligibility rules, approval queue, and in-flow upsells.",
    },
    {
      title: "Features",
      path: "/features",
      description:
        "Full feature tour: tokenized edit links, eligibility windows, approval queues, automatic payments and refunds, and post-purchase upsells.",
    },
    {
      title: "Pricing",
      path: "/pricing",
      description: `Plans from $${free.price} to $${pro.price}/mo - no per-edit fees or revenue caps on paid plans.`,
    },
    {
      title: "Comparison hub",
      path: "/vs",
      description: `Side-by-side comparisons of ${site.name} and ${competitors.length} other Shopify order editing and upsell apps.`,
    },
  ];

  const body = `# ${site.name}

> ${site.shortDescription}

${site.appName} is a Shopify app that adds a customer-facing order editing portal and post-purchase upsells to any Shopify store. Customers open a secure, tokenized edit link to fix a shipping address, swap a variant, change quantities, add or remove items, or cancel - all within rules the merchant sets (edit windows, fulfillment cutoffs, per-action eligibility). Sensitive changes route through a merchant approval queue; everything else applies automatically. Edits happen in place through Shopify's native Order Editing API rather than cancel-and-reorder, and the edit flow doubles as an upsell surface with one-click product offers.

## Key facts

- ~80% of common edits self-served - address fixes, size swaps, quantity changes, and cancellations resolve without a support ticket.
- 5-minute setup - no theme code changes required, works on every Shopify plan.
- 1.5–2.9% Shopify Payments fees lost per cancel-and-reorder edit - the hidden cost of apps that "edit" by canceling and recreating orders. ${site.name} edits in place, so payment fees are preserved.

## Pricing

| Plan | Price | What's included |
| --- | --- | --- |
| ${free.name} | $${free.price}/mo | Up to 50 self-service edits per month |
| ${growth.name} | $${growth.price}/mo | Unlimited edits and upsells - most popular plan |
| ${pro.name} | $${pro.price}/mo | Everything in Growth, plus API access and white-label branding |

No per-edit fees or revenue caps on paid plans.

## Pages

${pages.map((p) => `- [${p.title}](${site.url}${p.path}): ${p.description}`).join("\n")}

## Comparisons

${competitors
  .map((c) => `- [${site.name} vs ${c.shortName}](${site.url}/vs/${c.slug}): ${c.metaDescription}`)
  .join("\n")}

## Contact

- Support: ${site.supportEmail}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
