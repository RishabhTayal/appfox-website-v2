/**
 * Subscription integrations and partner apps - the "Works with" ecosystem.
 * Each entry describes a complementary service or native integration that
 * pairs with AppFox Subscription.
 */

export type IntegrationEntry = {
  slug: string;
  name: string;
  category: string;
  /** Merchant-facing outcome (what it unlocks) */
  description: string;
  /** "native" if built-in to AppFox, "partner" if works-with-via-Shopify */
  type: "native" | "partner";
  /** External URL only if verified and clean */
  href?: string;
};

export const integrationCategories = [
  {
    slug: "email-sms",
    name: "Email & SMS Marketing",
    description: "Reach subscribers with targeted campaigns and lifecycle messaging",
  },
  {
    slug: "loyalty",
    name: "Loyalty & Rewards",
    description: "Reward recurring customers and boost retention",
  },
  {
    slug: "automation",
    name: "Workflow Automation",
    description: "Trigger actions across your stack when subscriptions change",
  },
  {
    slug: "bundles-upsell",
    name: "Bundles & Upsell",
    description: "Combine subscriptions with bundles or post-purchase offers",
  },
  {
    slug: "page-builders",
    name: "Page Builders",
    description: "Customize subscription widgets in your theme editor",
  },
  {
    slug: "ai-dev",
    name: "AI & Developer Tools",
    description: "Build with AppFox using AI assistants and MCP",
  },
] as const;

export const subscriptionIntegrations: IntegrationEntry[] = [
  // Email & SMS Marketing
  {
    slug: "klaviyo",
    name: "Klaviyo",
    category: "email-sms",
    description:
      "Sync subscription events to Klaviyo profiles - send renewal reminders, win-back campaigns, and lifecycle emails that turn into recurring revenue.",
    type: "native",
    href: "https://www.klaviyo.com",
  },
  {
    slug: "cordial",
    name: "Cordial",
    category: "email-sms",
    description:
      "Connect subscription data to Cordial for multi-channel campaigns, SMS reminders, and churn-prevention flows.",
    type: "native",
  },

  // Loyalty & Rewards
  {
    slug: "loyaltylion",
    name: "LoyaltyLion",
    category: "loyalty",
    description:
      "Reward subscribers with loyalty points on every renewal - subscriptions earn more, customers stay longer.",
    type: "native",
    href: "https://loyaltylion.com",
  },
  {
    slug: "rivo",
    name: "Rivo",
    category: "loyalty",
    description:
      "Layer subscription rewards into your Rivo loyalty program - bonus points for renewals, tier perks for long-term subscribers.",
    type: "partner",
  },

  // Workflow Automation
  {
    slug: "shopify-flow",
    name: "Shopify Flow",
    category: "automation",
    description:
      "Trigger custom workflows when a subscription is created, renewed, paused, or cancelled - connect to your 3PL, Slack, or anything else.",
    type: "native",
  },
  {
    slug: "mechanic",
    name: "Mechanic",
    category: "automation",
    description:
      "Build advanced subscription automations - tag customers, create metafields, or send webhooks when subscription status changes.",
    type: "partner",
    href: "https://apps.shopify.com/mechanic",
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "automation",
    description:
      "Push subscription events to 5,000+ apps - CRMs, spreadsheets, Slack, or your internal tools.",
    type: "native",
  },

  // Bundles & Upsell
  {
    slug: "appfox-bundles",
    name: "AppFox Product Bundles",
    category: "bundles-upsell",
    description:
      "Combine subscriptions with product bundles - let subscribers save more when they bundle recurring items together.",
    type: "native",
    href: "/product-bundles",
  },
  {
    slug: "appfox-order-editing",
    name: "AppFox Order Editing & Upsell",
    category: "bundles-upsell",
    description:
      "Let subscribers edit upcoming orders or add one-time items to a renewal - self-service upsells inside the customer portal.",
    type: "native",
    href: "/order-editing",
  },

  // Page Builders
  {
    slug: "pagefly",
    name: "PageFly",
    category: "page-builders",
    description:
      "Drag AppFox subscription widgets into your PageFly layouts - full control over placement, styling, and mobile responsiveness.",
    type: "native",
    href: "https://apps.shopify.com/pagefly",
  },
  {
    slug: "shogun",
    name: "Shogun",
    category: "page-builders",
    description:
      "Embed subscription widgets directly in Shogun pages - build custom landing pages that convert visitors into subscribers.",
    type: "partner",
  },

  // AI & Developer Tools
  {
    slug: "shopify-sidekick",
    name: "Shopify Sidekick",
    category: "ai-dev",
    description:
      "Ask Sidekick subscription questions and jump straight to the right page in AppFox - AI-powered shortcuts inside your Shopify admin.",
    type: "native",
  },
  {
    slug: "mcp-cursor-claude",
    name: "MCP for Cursor & Claude",
    category: "ai-dev",
    description:
      "Connect Cursor, Claude Desktop, or VS Code to AppFox using the Model Context Protocol - AI agents read subscription data and build custom integrations.",
    type: "native",
  },
];

export function getIntegrationsByCategory(categorySlug: string): IntegrationEntry[] {
  return subscriptionIntegrations.filter((i) => i.category === categorySlug);
}
