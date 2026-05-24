export type ComparisonRow = {
  feature: string;
  appfox: string | true | false;
  competitor: string | true | false;
};

export type Competitor = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  bestFor: string;
  whyAppfox: { title: string; description: string }[];
  comparison: ComparisonRow[];
  faq: { q: string; a: string }[];
};

export const competitors: Competitor[] = [
  {
    slug: "cleverific",
    name: "Cleverific Order Editor",
    shortName: "Cleverific",
    category: "Order Editor",
    tagline:
      "Cleverific is a powerful merchant-side editor. AppFox flips the script: customers self-serve their own edits, and you keep the control.",
    metaTitle:
      "AppFox vs Cleverific Order Editor: Best Shopify Alternative (2026)",
    metaDescription:
      "Looking for a Cleverific alternative? AppFox brings self-service order editing, post-purchase upsells, and modern automation to Shopify merchants — at a lower price.",
    intro:
      "Cleverific has been a staple for merchant-side order editing on Shopify for years. It's a deep tool — but it's built primarily for support agents, not your customers. AppFox is the modern, customer-first alternative: shoppers fix their own orders, sensitive edits land in a clean approval queue, and you get post-purchase upsells out of the box.",
    bestFor:
      "Brands tired of fielding \"can I change my order?\" tickets and ready to let customers self-serve — while keeping merchant oversight where it matters.",
    whyAppfox: [
      {
        title: "Customer self-service, not just merchant tools",
        description:
          "Cleverific is built around the merchant admin. AppFox includes a tokenized customer portal so shoppers can fix their own orders without ever opening a ticket.",
      },
      {
        title: "Post-purchase upsells built in",
        description:
          "Cleverific doesn't do upsells. AppFox turns every edit moment into a revenue opportunity with one-click product recommendations inside the edit flow.",
      },
      {
        title: "Eligibility engine, not raw editing",
        description:
          "AppFox enforces edit windows, fulfillment cutoffs, and per-action rules — so customers never see an option that won't work. Cleverific leaves the policy work to the agent.",
      },
      {
        title: "Modern integrations",
        description:
          "Native Gorgias, Shopify Flow, and Slack integrations ship in the box. Cleverific has fewer modern connectors and limited automation.",
      },
    ],
    comparison: [
      { feature: "Self-service customer edit portal", appfox: true, competitor: false },
      { feature: "Merchant-side order editing", appfox: true, competitor: true },
      { feature: "Address change & validation", appfox: true, competitor: true },
      { feature: "Variant swap (size/color)", appfox: true, competitor: true },
      { feature: "Add / remove items", appfox: true, competitor: true },
      { feature: "Post-purchase upsells in edit flow", appfox: true, competitor: false },
      { feature: "Approval queue + auto-apply modes", appfox: true, competitor: "Limited" },
      { feature: "Per-edit-type eligibility rules", appfox: true, competitor: "Limited" },
      { feature: "Automatic payments & refunds on price delta", appfox: true, competitor: true },
      { feature: "Shopify Flow triggers + actions", appfox: true, competitor: false },
      { feature: "Native Gorgias integration", appfox: true, competitor: false },
      { feature: "Slack alerts for edit requests", appfox: true, competitor: false },
      { feature: "Order edit audit timeline", appfox: true, competitor: true },
      { feature: "Free plan", appfox: "Up to 50 edits/mo", competitor: false },
      { feature: "Starting price (paid)", appfox: "$19/mo", competitor: "$33+/mo" },
    ],
    faq: [
      {
        q: "Can I migrate from Cleverific to AppFox?",
        a: "Yes. AppFox can run alongside Cleverific while you transition. Most merchants migrate within a few hours since AppFox uses Shopify's native Order Editing API — no data export/import required.",
      },
      {
        q: "Is AppFox cheaper than Cleverific?",
        a: "Yes. AppFox starts at $0 with a free plan up to 50 edits per month, then $19/mo for unlimited. Cleverific's paid plans start higher and don't include a free tier.",
      },
      {
        q: "Does AppFox support everything Cleverific does?",
        a: "AppFox covers all the core merchant-side editing capabilities (address, variants, quantities, item add/remove, cancellations) plus customer self-service and post-purchase upsells — features Cleverific doesn't offer.",
      },
    ],
  },
  {
    slug: "aftersell",
    name: "AfterSell Post Purchase Upsell",
    shortName: "AfterSell",
    category: "Post-Purchase Upsell",
    tagline:
      "AfterSell focuses on upsells. AppFox does upsells PLUS the order editing infrastructure your support team is screaming for.",
    metaTitle:
      "AppFox vs AfterSell: The Shopify Post-Purchase App That Does Both",
    metaDescription:
      "AfterSell is great for upsells. AppFox is the only Shopify app that combines post-purchase upsells with full self-service order editing. Compare features and pricing.",
    intro:
      "AfterSell is a solid pick if all you need is a post-purchase upsell funnel. But the highest-converting upsell moment isn't the order confirmation page — it's when a customer comes back to fix or change their order. AppFox owns both moments: it ships customer-facing order editing AND surfaces targeted upsells right inside the edit flow.",
    bestFor:
      "Merchants who want upsell revenue AND want to slash the support ticket volume created by customers asking for order changes.",
    whyAppfox: [
      {
        title: "Two revenue moments, not one",
        description:
          "AfterSell sells on the thank-you page. AppFox sells there AND when customers return to edit their order — typically a higher-intent moment with better conversion.",
      },
      {
        title: "Full order editing included",
        description:
          "Self-service address changes, variant swaps, item adds/removes, and cancellations are core AppFox features. AfterSell doesn't touch order editing.",
      },
      {
        title: "Eliminate \"can I change my order?\" tickets",
        description:
          "AfterSell does nothing to reduce support load. AppFox cuts the #1 support category for most Shopify stores by giving customers self-service tools.",
      },
      {
        title: "Built-in approval workflows",
        description:
          "AppFox includes a merchant approval queue for sensitive edits, plus a full audit timeline — features AfterSell doesn't need but every operations team will appreciate.",
      },
    ],
    comparison: [
      { feature: "Post-purchase upsell offers", appfox: true, competitor: true },
      { feature: "One-click add to existing order", appfox: true, competitor: true },
      { feature: "Self-service order editing", appfox: true, competitor: false },
      { feature: "Address change & validation", appfox: true, competitor: false },
      { feature: "Variant swap (size/color)", appfox: true, competitor: false },
      { feature: "Order cancellation flow", appfox: true, competitor: false },
      { feature: "Upsells inside the edit moment", appfox: true, competitor: false },
      { feature: "Order eligibility & cutoff rules", appfox: true, competitor: false },
      { feature: "Merchant approval queue", appfox: true, competitor: false },
      { feature: "Audit timeline & history", appfox: true, competitor: false },
      { feature: "Gorgias / Slack / Shopify Flow", appfox: true, competitor: "Limited" },
      { feature: "Analytics dashboard", appfox: true, competitor: true },
      { feature: "Free plan", appfox: true, competitor: true },
      { feature: "Starting price (paid)", appfox: "$19/mo", competitor: "$34.99+/mo" },
    ],
    faq: [
      {
        q: "Can I use AppFox just for upsells, like AfterSell?",
        a: "Yes. Order editing features can be left disabled — you'll still get the post-purchase upsell engine. Most merchants enable both because the editing portal becomes the #1 upsell surface.",
      },
      {
        q: "Will AppFox conflict with AfterSell if I run both?",
        a: "They can run side by side without issue. Most merchants who try AppFox end up consolidating, since AppFox covers both use cases plus order editing.",
      },
      {
        q: "Do AppFox upsells convert as well as AfterSell?",
        a: "Conversion rates depend on your products and offers, but the edit-flow upsell moment usually outperforms thank-you-page upsells because the customer has already returned with intent to engage.",
      },
    ],
  },
  {
    slug: "edit-order",
    name: "Edit Order by Cleverific",
    shortName: "Edit Order",
    category: "Order Editor",
    tagline:
      "Edit Order works inside the Shopify admin. AppFox brings that power to your customers — and adds an upsell engine on top.",
    metaTitle: "AppFox vs Edit Order: Best Self-Service Shopify Alternative",
    metaDescription:
      "Edit Order requires support agents to manually fix orders. AppFox lets customers do it themselves. Compare features, pricing, and integrations.",
    intro:
      "Edit Order is a long-running, admin-side editing tool. It works — but every change still requires a support agent. AppFox is a generation ahead: customers self-serve their own edits via a branded portal, sensitive changes route through an approval queue, and your support team only gets pulled in when they actually need to be.",
    bestFor:
      "Support and ops teams drowning in manual order edits who want to push routine fixes to the customer self-service portal.",
    whyAppfox: [
      {
        title: "Customers fix their own orders",
        description:
          "Edit Order requires an agent for every change. AppFox routes ~80% of common edits (address typos, quantity tweaks, variant swaps) directly to the customer — agents only touch what truly needs review.",
      },
      {
        title: "Eligibility rules out of the box",
        description:
          "Configure edit windows, fulfillment cutoffs, and per-action restrictions in minutes. Edit Order leaves policy decisions to the agent each time.",
      },
      {
        title: "Built-in post-purchase upsells",
        description:
          "Edit Order has no upsell layer. AppFox shows targeted product offers inside the edit flow — a free revenue lift.",
      },
      {
        title: "Modern automation",
        description:
          "Native Shopify Flow triggers, Gorgias sidebar, and Slack alerts let your stack respond to edit events automatically.",
      },
    ],
    comparison: [
      { feature: "Customer self-service portal", appfox: true, competitor: false },
      { feature: "Merchant admin order editing", appfox: true, competitor: true },
      { feature: "Address change & validation", appfox: true, competitor: true },
      { feature: "Variant swap & item add/remove", appfox: true, competitor: true },
      { feature: "Edit window & cutoff rules", appfox: true, competitor: "Manual" },
      { feature: "Approval queue + auto-apply", appfox: true, competitor: false },
      { feature: "Post-purchase upsells", appfox: true, competitor: false },
      { feature: "Automatic refunds & charges", appfox: true, competitor: true },
      { feature: "Shopify Flow integration", appfox: true, competitor: false },
      { feature: "Gorgias integration", appfox: true, competitor: false },
      { feature: "Slack alerts", appfox: true, competitor: false },
      { feature: "Free plan", appfox: true, competitor: false },
      { feature: "Starting price (paid)", appfox: "$19/mo", competitor: "$29+/mo" },
    ],
    faq: [
      {
        q: "How is AppFox different from Edit Order?",
        a: "Edit Order is admin-only — agents make every change. AppFox adds a customer self-service portal on top, plus eligibility rules, approval workflows, and post-purchase upsells.",
      },
      {
        q: "Will my support team still be able to edit orders directly?",
        a: "Yes. AppFox includes a full merchant admin for edits, exactly like Edit Order. The difference is that most edits now happen on the customer side, freeing your agents.",
      },
      {
        q: "How long does migration take?",
        a: "Most stores fully switch within an afternoon. Both apps use Shopify's native Order Editing API, so there's no data to migrate.",
      },
    ],
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}
