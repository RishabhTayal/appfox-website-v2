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
    title: "Features - AppFox Apps for Shopify",
    description:
      "The full feature tour for every AppFox app: self-service order editing with in-flow upsells, and recurring subscriptions with a customer portal. Start free.",
    path: "/features",
  }),
  featuresOrderEditing: pageMetadata({
    title: "Self-Service Order Editing Features for Shopify",
    description:
      "Thank-you and order status page editing, eligibility rules, approval queues, automatic refunds, and in-flow upsells. Start free, 5-minute setup, no code.",
    path: "/features/order-editing",
  }),
  featuresSubscription: pageMetadata({
    title: "Shopify Subscription App Features",
    description:
      "Subscribe & save widgets, auto-renewal on Shopify's native checkout, a self-service customer portal, boxes and memberships, and Klaviyo integration. Start free.",
    path: "/features/subscription",
  }),
  pricing: pageMetadata({
    title: "Pricing - AppFox Apps for Shopify",
    description:
      "Pricing for every AppFox app: Order Editing & Upsell from $0 with paid plans from $19/mo, and AppFox Subscription from $0 with paid plans from $5/mo.",
    path: "/pricing",
  }),
  pricingOrderEditing: pageMetadata({
    title: "Order Editing Pricing - Shopify App Plans from $0",
    description:
      "Free plan with 50 edits/mo. Unlimited edits and upsells from $19/mo, no per-edit fees or revenue caps. Start your 14-day free trial - no card required.",
    path: "/pricing/order-editing",
  }),
  pricingSubscription: pageMetadata({
    title: "Subscription App Pricing - Plans from $0 for Shopify",
    description:
      "AppFox Subscription starts free for 50 active subscriptions. Paid plans run $5 to $100/mo with 0% transaction fees, 14-day trials, and 20% off yearly.",
    path: "/pricing/subscription",
  }),
  vs: pageMetadata({
    title: "Compare Shopify Order Editing & Subscription Apps",
    description:
      "Side-by-side comparisons of AppFox and 11 Shopify order editing, upsell, and subscription apps - pricing, features, and trade-offs. Find the right fit free.",
    path: "/vs",
  }),
  blog: pageMetadata({
    title: "Blog - Order Editing & Post-Purchase Upsells for Shopify",
    description:
      "Guides and playbooks on self-service order editing, cutting support tickets, and post-purchase upsells for Shopify stores. Practical, no fluff.",
    path: "/blog",
  }),
  privacy: pageMetadata({
    title: "Privacy Policy",
    description:
      "How AppFox handles merchant and customer data across order editing, subscriptions, approvals, and analytics. Read the policy or email support@getappfox.com.",
    path: "/privacy",
  }),
  terms: pageMetadata({
    title: "Terms of Service",
    description:
      "The terms that govern your use of AppFox's Shopify apps for order editing, upsells, and subscriptions - billing, trials, and acceptable use. Questions? Email support@getappfox.com.",
    path: "/terms",
  }),
} satisfies Record<string, Metadata>;
