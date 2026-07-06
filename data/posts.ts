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
    slug: "edit-windows-and-fulfillment-cutoffs",
    title: "Set the cutoff before you turn on self-service editing",
    excerpt:
      "Self-service editing takes the workload off your team - but only if it knows when to stop. Here's how edit windows and fulfillment cutoffs keep customers from touching an order that's already on the warehouse floor.",
    category: "OPERATIONS",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "Fulfillment Cutoffs: How to Set Safe Edit Windows on Shopify",
    metaDescription:
      "Self-service order editing only works if it stops before fulfillment starts. Here's how to set edit windows and cutoffs that protect your warehouse, not just your inbox.",
    body: [
      {
        type: "p",
        text: "Turn on self-service editing without a cutoff, and you haven't removed the risk of a bad order change - you've just removed the human who used to catch it. A customer swaps a variant, and it turns out the box already left the pick station. Now the warehouse is chasing an order that doesn't match what's in the customer's hands, and someone on your team is unwinding it by phone.",
      },
      {
        type: "p",
        text: "The fix isn't to slow editing down. It's to give it a hard edge - a point past which the order simply isn't editable, no matter who's asking.",
      },
      { type: "h2", text: "\"Always editable\" is the actual risk" },
      {
        type: "p",
        text: "An order isn't a static row in a database. It's moving through checkout, payment capture, and fulfillment on its own timeline, and that timeline runs independently of whatever the customer is doing on the order status page. Self-service editing has to race that timeline - and if it doesn't know where the finish line is, it will eventually let an edit through after the warehouse has already picked, packed, or shipped.",
      },
      {
        type: "p",
        text: "That's not a hypothetical edge case. It's the default outcome of shipping self-service editing without a cutoff, on any store with same-day or next-day fulfillment.",
      },
      { type: "h2", text: "Two limits, not one" },
      {
        type: "p",
        text: "It's tempting to solve this with a single number - \"orders are editable for 24 hours.\" That covers the common case and misses the one that actually causes damage: fast fulfillment. A 24-hour window does nothing for the order picked ninety minutes after purchase.",
      },
      { type: "h3", text: "Edit window" },
      {
        type: "p",
        text: "A time-based limit from order placement - how long the offer to edit stays open at all. This is about customer expectations: most people who want to change something notice within a few hours, not a few days.",
      },
      { type: "h3", text: "Fulfillment cutoff" },
      {
        type: "p",
        text: "An event-based limit tied to what's actually happening in your warehouse - editing closes the moment fulfillment starts, whatever the clock says. This is the one that prevents the expensive mistake, and it should win whenever the two disagree.",
      },
      {
        type: "p",
        text: "A store with a 48-hour edit window and same-day fulfillment needs the fulfillment cutoff to fire first, every time. The window is a courtesy. The cutoff is a guardrail.",
      },
      { type: "h2", text: "Not every edit type deserves the same cutoff" },
      {
        type: "p",
        text: "An address correction and a full cancellation don't carry the same risk once fulfillment has started, so they shouldn't share a cutoff. A shipping label can sometimes still be corrected after picking; a cancellation after the box is sealed just creates a return. Setting cutoffs per edit type - not one blanket rule for the whole order - is what lets you keep editing open longer where it's safe and close it earlier where it isn't.",
      },
      {
        type: "ul",
        items: [
          "Address changes: tightest cutoff for carriers that lock labels early, looser where the carrier allows in-transit corrections",
          "Variant and quantity changes: cutoff at pick, since the picked item is what's about to go in the box",
          "Add item: cutoff at pack, since a late add can sometimes still make it into an unsealed box",
          "Cancellation: cutoff at your own comfort line for eating a return - often the earliest of all of them",
        ],
      },
      { type: "h2", text: "What the customer sees after the cutoff" },
      {
        type: "p",
        text: "This is where most of the design work should go. After the cutoff, the edit option should simply disappear from the flow that edit type applies to - not throw an error, not show a rule the customer had no way to know about. A shopper who never sees \"cancellation unavailable after fulfillment\" doesn't feel denied; they just see the options that are actually available to them, which for a lot of orders is still address confirmation or an add-on.",
      },
      {
        type: "quote",
        text: "The edit window isn't a courtesy to the customer. It's a guardrail for your warehouse - the customer just shouldn't notice it's there.",
      },
      { type: "h2", text: "Setting it up" },
      {
        type: "ol",
        items: [
          "Start with your actual fulfillment SLA, not a round number - if orders are typically picked within 4 hours, your cutoff has to sit inside that, not outside it.",
          "Set cutoffs per edit type, not one rule for the whole order - address, swap, add, and cancel all carry different risk once fulfillment begins.",
          "Decide which edits inside the window still need a human - auto-apply the safe ones, route anything touching price or address to an approval queue.",
          "Check the audit trail after the first couple of weeks and tighten or loosen the windows based on what actually came through, not what you guessed upfront.",
        ],
      },
      {
        type: "p",
        text: "None of this is about restricting the customer. It's what makes it safe to open editing up in the first place - the whole reason self-service works is that it can say no automatically, at the one moment it actually matters, without anyone having to watch the clock.",
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
