/**
 * AppFox Subscription plan data - the website-side mirror of the app's plan
 * registry (`subscriptions-remix/app/lib/app-billing.server.ts` PLANS and
 * `app/lib/plan-features.ts` FEATURE_MIN_RANK). If pricing or gating changes
 * in the app, update this file to match; nothing here is invented.
 *
 * Yearly prices are ~20% off the annualized monthly (monthly x 12 x 0.8).
 * Every paid plan carries a 14-day free trial. Limits count *active*
 * subscriptions, and every plan - including Free - has 0% transaction fees.
 */

export type SubscriptionTier = {
  name: string;
  /** USD per month on monthly billing. */
  monthly: number;
  /** USD per year on yearly billing (~20% off). */
  yearly: number;
  /** Active-subscription allowance, display-formatted. */
  limit: string;
  /** One-line who-it's-for. */
  blurb: string;
  /** Card bullets - cumulative ("Everything in X" first on paid tiers). */
  features: string[];
  featured?: boolean;
};

export const TRIAL_DAYS = 14;
export const YEARLY_DISCOUNT_LABEL = "Save 20% with yearly billing";

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    limit: "50",
    blurb: "The full core app for stores starting a subscription program.",
    features: [
      "Up to 50 active subscriptions",
      "0% transaction fees",
      "Subscription widgets & templates",
      "Recurring billing on Shopify Checkout",
      "Customer self-service portal",
    ],
  },
  {
    name: "Growth",
    monthly: 5,
    yearly: 48,
    limit: "200",
    blurb: "Adds the analytics and styling controls a growing program needs.",
    features: [
      "Up to 200 active subscriptions",
      "Everything in Free",
      "Subscription analytics",
      "Custom CSS",
      "Customer portal customization",
    ],
  },
  {
    name: "Starter",
    monthly: 10,
    yearly: 96,
    limit: "1,000",
    blurb: "The same toolkit as Growth with five times the headroom.",
    features: [
      "Up to 1,000 active subscriptions",
      "Everything in Growth",
      "Subscription analytics",
      "Custom CSS & portal customization",
    ],
  },
  {
    name: "Business",
    monthly: 30,
    yearly: 288,
    limit: "10,000",
    blurb: "Bundles, shipping control, and branded emails for serious volume.",
    featured: true,
    features: [
      "Up to 10,000 active subscriptions",
      "Everything in Starter",
      "Bundling & build-a-box",
      "Custom shipping profiles",
      "Custom email HTML",
    ],
  },
  {
    name: "Pro",
    monthly: 50,
    yearly: 480,
    limit: "50,000",
    blurb: "Send from your own domain and skip the support queue.",
    features: [
      "Up to 50,000 active subscriptions",
      "Everything in Business",
      "Custom email domain",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    monthly: 100,
    yearly: 960,
    limit: "Unlimited",
    blurb: "Every feature, no subscription ceiling at all.",
    features: [
      "Unlimited active subscriptions",
      "Everything in Pro",
      "Custom email domain",
      "Priority support",
    ],
  },
];

/** Lowest paid price - for "paid plans from $X/mo" copy. */
export const SUBSCRIPTION_PAID_FROM = SUBSCRIPTION_TIERS.filter((t) => t.monthly > 0)[0]
  .monthly;

/** string = mono value · true = tick · null = em-dash miss */
export type MatrixCell = string | true | null;

/**
 * Feature-matrix rows for the plan table, one column per tier in
 * SUBSCRIPTION_TIERS order. Derived from the app's FEATURE_MIN_RANK gates.
 */
export const SUBSCRIPTION_MATRIX: { label: string; cells: MatrixCell[] }[] = [
  {
    label: "Active subscriptions",
    cells: SUBSCRIPTION_TIERS.map((t) => t.limit),
  },
  { label: "0% transaction fees", cells: [true, true, true, true, true, true] },
  { label: "Widgets, recurring billing & customer portal", cells: [true, true, true, true, true, true] },
  { label: "Subscription analytics", cells: [null, true, true, true, true, true] },
  { label: "Custom CSS", cells: [null, true, true, true, true, true] },
  { label: "Customer portal customization", cells: [null, true, true, true, true, true] },
  { label: "Bundling & build-a-box", cells: [null, null, null, true, true, true] },
  { label: "Custom shipping profiles", cells: [null, null, null, true, true, true] },
  { label: "Custom email HTML", cells: [null, null, null, true, true, true] },
  { label: "Custom email domain", cells: [null, null, null, null, true, true] },
  { label: "Priority support", cells: [null, null, null, null, true, true] },
];
