import type { Metadata } from "next";

/**
 * Per-route metadata, centralized so titles/descriptions/canonicals can be
 * audited in one file. Home metadata lives in app/layout.tsx as the default.
 * /vs/[slug] metadata is built in that route's generateMetadata from
 * data/competitors.ts (metaTitle/metaDescription fields).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** skip the "| AppFox" template (for titles that already contain AppFox) */
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
    },
  };
}

export const routeMeta = {
  features: pageMetadata({
    title: "Self-Service Order Editing Features for Shopify",
    description:
      "Tokenized edit links, eligibility rules, approval queues, automatic refunds, and in-flow upsells — the full AppFox tour. Start free, 5-minute setup, no code.",
    path: "/features",
  }),
  pricing: pageMetadata({
    title: "Pricing — Shopify Order Editing App from $0",
    description:
      "Free plan with 50 edits/mo. Unlimited edits and upsells from $19/mo, no per-edit fees or revenue caps. Start your 14-day free trial — no card required.",
    path: "/pricing",
  }),
  vs: pageMetadata({
    title: "Compare Order Editing Apps for Shopify",
    description:
      "Side-by-side comparisons of AppFox and 7 Shopify order editing and upsell apps — pricing, edit types, in-place vs cancel-reorder. Find the right fit free.",
    path: "/vs",
  }),
  privacy: pageMetadata({
    title: "Privacy Policy",
    description:
      "How AppFox handles merchant and customer data across the order editing portal, approvals, and analytics. Read the privacy policy or email support@appfox.io.",
    path: "/privacy",
  }),
  terms: pageMetadata({
    title: "Terms of Service",
    description:
      "The terms that govern your use of AppFox's order editing and upsell app for Shopify — billing, trials, and acceptable use. Questions? Email support@appfox.io.",
    path: "/terms",
  }),
} satisfies Record<string, Metadata>;
