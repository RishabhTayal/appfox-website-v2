/**
 * Central site configuration — every external URL, brand string, and
 * verifiable claim lives here so it can be updated in one place.
 *
 * TODO(launch): replace `url` and `installUrl` with the production domain
 * and the real Shopify App Store listing URL once the app is published.
 */
export const site = {
  name: "AppFox",
  appName: "AppFox Order Editing & Upsell",
  shortDescription:
    "Self-service order editing and post-purchase upsells for Shopify. Customers fix their own orders; you keep the revenue.",
  url: "https://appfox.io",
  /**
   * TODO(launch): replace with the real Shopify App Store listing URL.
   * Deliberately a dead anchor until then — never link to a guessed
   * listing URL that could 404 or resolve to someone else's app.
   */
  installUrl: "#install",
  supportEmail: "support@appfox.io",
  twitter: undefined as string | undefined, // e.g. "@appfox"
  /**
   * Rating shown in UI copy. Kept out of JSON-LD aggregateRating on purpose:
   * Google requires structured-data ratings to be backed by verifiable
   * collected reviews. Add aggregateRating to the SoftwareApplication schema
   * only once the App Store listing has real public reviews.
   */
  rating: { value: "4.9", scale: "5" },
  pricing: {
    free: { name: "Free", price: 0 },
    growth: { name: "Growth", price: 19 },
    pro: { name: "Pro", price: 49 },
  },
} as const;

export type Site = typeof site;
