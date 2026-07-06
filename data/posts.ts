/**
 * Blog content, authored as structured blocks rather than MDX so it stays
 * type-checked, JSON-LD-safe (plain strings), and dependency-free. The /blog
 * index and /blog/[slug] route both read from here; sitemap.ts mirrors the
 * slugs and dates. Newest post first - ordering here is the published order.
 */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  /** card blurb + fallback meta description */
  excerpt: string;
  /** mono eyebrow on the card and article (e.g. "PLAYBOOK") */
  category: string;
  /** ISO date, used for display, sitemap lastModified, and JSON-LD */
  date: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "handle-shopify-order-cancellation-requests",
    title: "The right way to handle order cancellation requests",
    excerpt:
      "\"No\" turns into a chargeback. \"Sure, anytime\" turns into a refund on a package that already shipped. The middle path is a cutoff - not a policy debate on every ticket.",
    category: "OPERATIONS",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "How to Handle Order Cancellation Requests on Shopify",
    metaDescription:
      "A blanket no-cancellations policy invites chargebacks. A blanket yes eats your shipping costs. Here's how to set a cutoff-based cancellation rule that protects both.",
    body: [
      {
        type: "p",
        text: "\"Cancel my order\" is not one ticket - it's three, depending on timing. Cancel it now, before it ships, and it's a two-minute favor. Cancel it after it ships, and someone has to decide whether to eat the shipping cost or tell the customer no. Ignore it, and the customer disputes the charge with their bank instead of waiting for a reply.",
      },
      {
        type: "p",
        text: "Most stores handle this with one blanket policy applied to every case, decided once in a support meeting and then re-litigated on every ticket anyway. Both common defaults cost you - just in different places, and neither actually removes the decision from your team's plate.",
      },
      { type: "h2", text: "Default 1: no cancellations, full stop" },
      {
        type: "p",
        text: "A firm no-cancellations line looks disciplined on paper. In practice, a customer who can't cancel doesn't give up - they call their bank. A chargeback costs you the goods, the revenue, and a flat dispute fee on top (typically $15-25 per case, on top of what you've already lost), and enough of them will get your store flagged by your payment processor. That flag is the expensive part: it can mean higher processing rates or reserve requirements long after the individual disputes are settled. Silence is the risky option, not the safe one.",
      },
      { type: "h2", text: "Default 2: cancel anytime, no questions" },
      {
        type: "p",
        text: "The opposite policy feels generous, but it doesn't account for what's already true by the time the request lands. Once an order has shipped, \"canceling\" it doesn't stop the box - it just means refunding a customer who's still going to receive the product. That's a full loss on the item and the shipping, not a clean undo. And because there's no rule filtering the request, someone on your team still has to open the order, check whether it's actually shipped, and make the call by hand - so the policy that was supposed to save time just moves the judgment call downstream instead of removing it.",
      },
      { type: "h2", text: "The rule that actually works: a cutoff, not a debate" },
      {
        type: "p",
        text: "The fix isn't a better blanket answer - it's removing the judgment call from the moment the ticket arrives. Set a fulfillment cutoff once, in your rules, and let every cancellation request check itself against it. Before the cutoff, the customer cancels in place, instantly, no ticket generated at all. After it, the request routes to a human who can see the order's real status instead of guessing from an inbox, and the customer gets an honest answer about why - not silence.",
      },
      {
        type: "p",
        text: "This is exactly the shape of the eligibility rules AppFox runs on every edit type, not just cancellations: a window that closes automatically at your fulfillment cutoff, so customers are never offered a cancellation your warehouse can no longer honor. The same rule that protects your fulfillment schedule also sets the customer's expectations correctly the first time, which is most of what prevents the follow-up dispute.",
      },
      { type: "h3", text: "What a cancellation rule needs to define" },
      {
        type: "ul",
        items: [
          "The cutoff itself - tied to your fulfillment cutoff, not a fixed number of hours that ignores how fast you actually ship",
          "Whether the whole order cancels or just uncommitted line items, if some items on a multi-item order have already shipped",
          "Refund method - back to the original payment method by default, so you're not creating store-credit disputes on top of cancellation disputes",
          "Auto-apply before the cutoff, queue for review after - so borderline cases get a person, not a blanket rule in either direction",
          "An audit entry on every cancellation, so support isn't reconstructing what happened from email threads when a customer follows up",
        ],
      },
      {
        type: "quote",
        text: "The goal isn't saying yes to every cancellation. It's answering before the customer has to ask twice.",
      },
      { type: "h2", text: "Cancel in place, not cancel-and-reorder" },
      {
        type: "p",
        text: "How the cancellation itself executes matters as much as when it's allowed. Some tools cancel an order by voiding it and issuing a fresh refund transaction outside the order - which can complicate your bookkeeping and, on partial cancellations, forces a second look to confirm the right line items were actually removed. And because Shopify Payments fees aren't returned on a straight cancellation, that approach forfeits the 1.5-2.9% you already paid to process the order in the first place, on top of the refund itself.",
      },
      {
        type: "p",
        text: "Canceling in place through Shopify's native Order Editing API keeps the cancellation attached to the original order: the refund is issued against the same transaction, the order's audit trail shows exactly what was canceled and when, and there's no second order or duplicate confirmation email to confuse the customer. If only part of the order is being canceled - one line item out of three, say - the remaining items ship as originally planned, and the customer sees one order with one accurate history instead of a canceled order and a mysterious replacement.",
      },
      {
        type: "p",
        text: "None of this makes every cancellation free. A shipped order is still a shipped order, and no rule engine gets that box back off the truck. But most cancellation requests arrive well before that point - and for those, a cutoff-based rule turns a ticket that needed a judgment call into one that resolves itself before your team ever sees it. What's left for a human is exactly the set of cases that should get one: the ones where the order's already moving and someone has to weigh the cost of making it right against the cost of saying no.",
      },
    ],
  },
  {
    slug: "let-shopify-customers-edit-their-orders",
    title: "How to let Shopify customers edit their own orders",
    excerpt:
      "Shopify has no built-in way for shoppers to change an order after checkout. Here's why those tickets pile up - and the cleanest way to hand the edit back to the customer.",
    category: "GUIDE",
    date: "2026-06-12",
    author: "The AppFox Team",
    metaTitle: "How to Let Shopify Customers Edit Their Orders After Checkout",
    metaDescription:
      "Shopify can't let customers edit orders out of the box. Compare the workarounds - manual edits, cancel-and-reorder, self-service - and pick the one that keeps your fees.",
    body: [
      {
        type: "p",
        text: "Every store gets the same email. \"Can I change my order?\" Wrong size, wrong address, one more item. By default, Shopify gives the customer no way to fix it themselves - so the request lands in your inbox, and someone on your team becomes the edit button.",
      },
      {
        type: "p",
        text: "There are a few ways to handle this. They are not equal.",
      },
      { type: "h2", text: "Option 1: Edit it by hand" },
      {
        type: "p",
        text: "An agent reads the ticket, finds the order, makes the change in the Shopify admin, and replies. It works, but it scales linearly with your order volume - every edit is a few minutes of human time, and the customer waits in the meantime.",
      },
      { type: "h2", text: "Option 2: Cancel and reorder" },
      {
        type: "p",
        text: "Some apps \"edit\" an order by canceling the original and creating a new one. It looks automated, but it has a hidden cost: Shopify Payments fees of 1.5 - 2.9% aren't returned on a cancellation, so you forfeit them on every edit. The customer also gets a new order number and, often, a second trip through checkout.",
      },
      { type: "h2", text: "Option 3: Let the customer self-serve" },
      {
        type: "p",
        text: "The cleanest option is to give the edit back to the person who wants it. Editing lives right on your thank-you and order status pages - the ones Shopify already links from every confirmation email - so there's no login and no new app to find.",
      },
      {
        type: "p",
        text: "The key is to do it in place. Editing the original order through Shopify's native Order Editing API keeps the order number, the payment, and the fees intact. Price differences are charged or refunded automatically, and you decide which edits apply instantly and which wait for approval.",
      },
      { type: "h3", text: "What a good self-service setup includes" },
      {
        type: "ul",
        items: [
          "Address changes with autocomplete and validation, so typos get caught before the carrier does",
          "Variant swaps, quantity changes, and add/remove items - within rules you set",
          "Edit windows and fulfillment cutoffs, so editing closes before it can cause a problem",
          "An approval queue for sensitive edits, with an audit trail on every order",
        ],
      },
      {
        type: "quote",
        text: "You're delegating the typing, not the decision.",
      },
      {
        type: "p",
        text: "Done well, roughly 80% of common edits never reach a human. The ones that do arrive with full context, already checked against your rules.",
      },
    ],
  },
  {
    slug: "reduce-can-i-change-my-order-tickets",
    title: "Cut \"can I change my order?\" tickets without hiring",
    excerpt:
      "Support volume that scales with order volume is a tax on growth. A look at where order-change tickets actually come from, and how to remove them at the source.",
    category: "PLAYBOOK",
    date: "2026-06-08",
    author: "The AppFox Team",
    metaTitle: "How to Reduce Order-Change Support Tickets on Shopify",
    metaDescription:
      "Order-change tickets scale with your order volume. Here's how to cut them at the source with self-service editing, eligibility rules, and fewer manual touches.",
    body: [
      {
        type: "p",
        text: "If your support volume grows in lockstep with your order volume, a big slice of it is probably one category: order changes. Address fixes, size swaps, accidental double orders, last-minute cancellations. None of them are hard. They're just constant.",
      },
      { type: "h2", text: "Why these tickets are expensive" },
      {
        type: "p",
        text: "It isn't only the minutes spent replying. An address typo nobody catches becomes a failed delivery and a reship. A cancellation that sits overnight becomes a chargeback. The ticket is the cheap part; the downstream cost is the rest.",
      },
      { type: "h2", text: "Remove them at the source" },
      {
        type: "p",
        text: "You can't write your way out of a volume problem with faster replies. The fix is to make the edit something the customer can do without you.",
      },
      {
        type: "ol",
        items: [
          "Put editing where customers already are - the thank-you and order status pages, no login required.",
          "Validate addresses at entry, so the most common edit corrects itself.",
          "Set edit windows and fulfillment cutoffs, so requests stop before they can cause damage.",
          "Auto-apply the safe edits and queue only the sensitive ones for a human.",
        ],
      },
      { type: "h2", text: "What's left for your team" },
      {
        type: "p",
        text: "After self-service, the tickets that remain are the genuine exceptions - and they arrive pre-checked against your rules, with a full edit history attached. Your team stops being the edit button and starts handling the cases that actually need judgment.",
      },
      {
        type: "quote",
        text: "The goal isn't faster answers to \"can I change my order?\" - it's never getting the email.",
      },
    ],
  },
  {
    slug: "post-purchase-upsells-that-convert",
    title: "Post-purchase upsells customers actually welcome",
    excerpt:
      "The moment after checkout is the highest-attention window you get - and most stores waste it on emails that get ignored. A simpler place to make the offer.",
    category: "REVENUE",
    date: "2026-06-03",
    author: "The AppFox Team",
    metaTitle: "Post-Purchase Upsells That Convert on Shopify",
    metaDescription:
      "Post-purchase emails get ignored and thank-you pages get closed. Learn why the order-edit flow is the best place to upsell, and how one-click adds keep your fees.",
    body: [
      {
        type: "p",
        text: "Post-purchase upsells have a reputation for being annoying. Usually that's a placement problem, not an offer problem. The pitch shows up in a follow-up email that gets ignored, or on a thank-you page the customer already closed.",
      },
      { type: "h2", text: "Sell where attention already is" },
      {
        type: "p",
        text: "There's one moment after checkout when a customer is fully engaged with their order: when they open it to edit something. They're already inside the order, their payment is on file, and their attention is undivided. That's the window.",
      },
      {
        type: "p",
        text: "An offer shown inside the edit flow doesn't interrupt anything - it's adjacent to what the customer came to do. One click adds the item to the existing order. No second checkout, no new order number, no abandoned cart to chase.",
      },
      { type: "h2", text: "Why one-click, in-place adds matter" },
      {
        type: "ul",
        items: [
          "The customer keeps their original order - no confusing duplicate confirmations",
          "Any price difference is charged automatically through Shopify",
          "Because the order is edited in place, you keep the Shopify Payments fees you'd lose to a cancel-and-reorder flow",
          "The offer is relevant: it's attached to a purchase the customer just made",
        ],
      },
      { type: "h2", text: "Keep it tasteful" },
      {
        type: "p",
        text: "Welcome doesn't mean aggressive. Limit the number of offers, make them genuinely complementary, and let merchants - not the customer's patience - set the rules. The best post-purchase upsell feels like a helpful suggestion, because it is one.",
      },
      {
        type: "quote",
        text: "They came to fix a typo. They left with the matching beanie.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Approximate reading time in whole minutes (~220 wpm), min 1. */
export function readingMinutes(post: Post): number {
  const words = post.body.reduce((sum, block) => {
    const text =
      "items" in block ? block.items.join(" ") : "text" in block ? block.text : "";
    return sum + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.round(words / 220));
}

/** "June 12, 2026" - stable, locale-independent formatting for SSR. */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
