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
    slug: "prevent-wrong-size-returns-before-they-ship",
    title: "Stop wrong-size returns before they leave the warehouse",
    excerpt:
      "Most \"wrong size\" returns aren't a product problem - they're a timing problem. Here's how to let customers fix the size or color before the order ships, instead of after it comes back.",
    category: "GUIDE",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "How to Prevent Wrong-Size Returns Before Shopify Ships the Order",
    metaDescription:
      "Wrong-size and wrong-color returns are one of the most preventable costs in ecommerce. Learn how a pre-shipment swap window cuts return volume without changing your return policy.",
    body: [
      {
        type: "p",
        text: "A customer orders a medium. It arrives, it doesn't fit, and now there's a return. Nothing about the product was wrong - the size was. That single mistake triggers a return label, a trip back to a warehouse, an inspection, a restock, and a refund, when the actual fix - swapping a medium for a large - takes about five seconds to type.",
      },
      {
        type: "p",
        text: "The reason it turns into a return instead of a five-second fix is timing. By the time the customer realizes the size is wrong, the order has already shipped. There's no form for \"actually, make that a large\" on a package that's already in a truck - so the only tool left is the one built for products that are actually wrong: return it, refund it, hope they reorder.",
      },
      {
        type: "p",
        text: "The mistake isn't the wrong size. It's that the fix only becomes available after the correction is already the expensive kind.",
      },
      { type: "h2", text: "Why a return costs more than the refund" },
      {
        type: "p",
        text: "A refund is the visible cost. It isn't the whole cost. The item travels back at your expense or the customer's, someone inspects it, and if it's apparel, there's a real chance it comes back creased, worn once, or out of season by the time it's back on a shelf - which makes it a write-off, not a restock. None of that touches the Shopify Payments processing fee, either: refunding an order doesn't return the 1.5-2.9% you already paid to accept the original payment, so a full refund is a guaranteed loss on top of the product.",
      },
      {
        type: "p",
        text: "And a return doesn't reliably become a reorder. Plenty of customers who send a wrong size back simply don't come back to buy the right one - the moment of intent has passed, and now it's a new decision instead of a correction to one they'd already made.",
      },
      { type: "h2", text: "Catch it before it ships, not after it's returned" },
      {
        type: "p",
        text: "The fix is the same principle that works for address typos: move the correction earlier, onto the thank-you page and order status page the customer is already looking at, before the warehouse has touched the order. Instead of a size or color swap requiring a full return cycle, it becomes an edit to the order that's already sitting there - a variant swap, settled in place, on the same order number.",
      },
      { type: "h3", text: "What a good pre-shipment swap flow includes" },
      {
        type: "ul",
        items: [
          "Variant swaps for size and color that check current inventory before confirming, so a customer never swaps into a variant you can't fulfill",
          "An edit window tied to your actual fulfillment cutoff, so the option disappears the moment the order is picked, not on a fixed timer",
          "Automatic settlement of any price difference in either direction, so a swap to a pricier variant doesn't require a separate charge",
          "Auto-approval for straightforward swaps, with a queue only for the ones you've decided need a human look",
          "A record on the order of what changed and when, so support isn't reconstructing it later from an email thread",
        ],
      },
      {
        type: "quote",
        text: "The cheapest return is the one that never ships.",
      },
      {
        type: "p",
        text: "This works because it's the same edit either way - a customer changing their mind about a size doesn't need a different system than a customer fixing a typo. It needs the same self-service window, applied to a different field on the order.",
      },
      { type: "h2", text: "Set the swap window by fulfillment status, not a guess" },
      {
        type: "p",
        text: "A round-number cutoff - \"edits open for 24 hours\" - is a reasonable starting point, but the safer version ties eligibility to what's actually happened to the order: swaps stay open until the order is picked, and close automatically the moment that's no longer true. A store that ships same-day needs a tighter window than one that batches overnight, and tying the cutoff to fulfillment status instead of the clock means it adjusts itself as your operation speeds up.",
      },
      {
        type: "p",
        text: "It's also why hiding ineligible swaps matters as much as offering eligible ones. Once an order has been picked, showing a \"change size\" button that can't actually be honored just produces a request someone has to decline. Hide it instead, and there's nothing to decline - the customer sees only what you can still deliver on.",
      },
      { type: "h2", text: "What this saves beyond the refund" },
      {
        type: "p",
        text: "Compare the two paths on the same wrong-size order. The return path costs a shipping label, a restock or a write-off, a refund, and the processing fee you don't get back - plus a real chance the customer never reorders at all. The pre-shipment swap costs nothing beyond the customer picking a different size on a page they were already on, and it keeps the sale, the order number, and the fees you already collected.",
      },
      {
        type: "p",
        text: "It also removes a support step most stores don't count separately from returns: the back-and-forth confirming the return was received, approving the refund, and answering the follow-up about when it'll post. A swap that happens before the order ships generates none of that thread, because there was never anything to send back.",
      },
      {
        type: "ol",
        items: [
          "Add variant swaps to wherever customers can currently request a size or color change.",
          "Check live inventory at the moment of the swap, not just at checkout, so customers can't swap into a variant you're out of.",
          "Tie the swap window to your fulfillment cutoff, not a flat number of hours.",
          "Auto-apply straightforward swaps and route only the sensitive ones to a queue.",
        ],
      },
      {
        type: "p",
        text: "None of this requires a looser return policy or a bigger returns team. It requires giving customers the fix five minutes after checkout, instead of the one that only shows up two weeks later in a box.",
      },
    ],
  },
  {
    slug: "fix-wrong-shipping-address-before-it-ships",
    title: "The wrong-address problem: how to catch it before Shopify ships it",
    excerpt:
      "A typo in the shipping address is the single most common order-change request Shopify stores get. Most teams catch it after the label prints. Here's how to catch it before that.",
    category: "GUIDE",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "How to Fix a Wrong Shipping Address Before Shopify Ships It",
    metaDescription:
      "Address typos are the most common Shopify order-change request. Learn why they're expensive after the fact, and how to catch and fix them before fulfillment.",
    body: [
      {
        type: "p",
        text: "Of all the \"can I change my order?\" emails a Shopify store gets, one type outnumbers the rest: the address is wrong. A transposed apartment number, an old billing address left in autofill, a name spelled two different ways on the same form. Small mistakes, and by the time most stores notice them, expensive ones.",
      },
      {
        type: "p",
        text: "It's also the one merchants are worst equipped to catch. A wrong size or a wrong quantity shows up the moment someone looks at the order. A wrong address looks completely normal - it's a real street, a real city, just not the customer's - and nothing in a standard Shopify order flags it. The order ships exactly as entered, right up until a carrier can't find the door.",
      },
      {
        type: "p",
        text: "The mistake isn't the typo. It's where in the process someone finally catches it.",
      },
      { type: "h2", text: "Why a wrong address costs more than it looks like" },
      {
        type: "p",
        text: "A support reply is cheap. What follows a missed address isn't. The carrier attempts delivery, fails, and either returns the package or charges an address-correction fee mid-transit. Either way, the order is now late, and someone has to decide whether to reship at your cost, refund, or wait out a dispute. A customer who never gets their order is also a customer who's about to open a chargeback - which costs you the item, the shipping, and a dispute fee on top.",
      },
      {
        type: "p",
        text: "None of that shows up in a support queue. It shows up in shipping costs, in refund line items, and in reviews that mention \"never arrived.\" The ticket was the cheap part.",
      },
      {
        type: "p",
        text: "International orders make the same mistake worse. Get the country or postal code wrong and the shipment doesn't just risk a failed delivery - it risks getting stuck in customs, reassessed for duties, or returned at the border, all on a timeline you don't control. A one-line correction that would have taken thirty seconds on the order status page turns into a multi-week ordeal once the package has left the building.",
      },
      { type: "h2", text: "The problem with catching it after the fact" },
      {
        type: "p",
        text: "Today, the address usually gets fixed - if it gets fixed - through email. The customer notices, writes in, and someone on your team has to find the order, check whether it's already picked or packed, and edit it in the admin before the warehouse moves. That's a race against your own fulfillment speed, run manually, for every single address correction, every day. The faster your fulfillment gets, the less time that race gives you.",
      },
      {
        type: "p",
        text: "It also depends entirely on the customer noticing in time and choosing to write in rather than assume it'll sort itself out. Plenty don't notice until the shipping confirmation arrives with the wrong street on it - which is exactly when it's too late to do anything about it by email.",
      },
      { type: "h2", text: "Catch it before it ships, not after" },
      {
        type: "p",
        text: "The fix isn't a faster support reply. It's moving the correction earlier than the email ever could - onto the thank-you page and order status page the customer is already looking at, right after checkout, before the order has moved.",
      },
      { type: "h3", text: "What a good address-fix flow includes" },
      {
        type: "ul",
        items: [
          "Address entry with autocomplete and validation, so the most common mistake - an incomplete or malformed address - gets caught at the moment it's typed, not after it ships",
          "An edit window tied to your actual fulfillment cutoff, not a guess, so the option to fix an address disappears exactly when it stops being safe to change",
          "Auto-approval for a straightforward address swap, with a queue only for the edits you've decided are sensitive enough to need a human look",
          "A full audit trail on the order, so support can see exactly what changed and when if a question comes up later",
        ],
      },
      {
        type: "quote",
        text: "The goal is to close the window before the warehouse opens the box - not to race it after.",
      },
      {
        type: "p",
        text: "The approval queue matters as much as the auto-apply path. Most address corrections are exactly what they look like and can go through the moment the customer submits them. The ones worth a second look - an address that changes the shipping country, say, or one submitted well after checkout - can route to a queue with a Slack alert, so a human sees only the fraction of cases that actually need judgment, instead of every case.",
      },
      { type: "h2", text: "Set the cutoff by fulfillment status, not the clock" },
      {
        type: "p",
        text: "A fixed window - \"edits open for 24 hours\" - is a reasonable default, but it isn't the whole answer. A store that ships same-day needs a tighter cutoff than one that batches orders overnight. The safer rule is to tie eligibility to what's actually happened to the order: address changes stay open until the order is picked, and close automatically the moment it isn't safe anymore. That way the cutoff moves with your operation instead of against it, and nobody has to remember to check.",
      },
      {
        type: "p",
        text: "It's also why hiding ineligible edits matters as much as offering eligible ones. A customer who can't request what you can't grant never files the ticket in the first place - there's nothing to decline, and nothing for support to untangle after the fact.",
      },
      { type: "h2", text: "What this actually saves" },
      {
        type: "p",
        text: "Compare the outcomes. A caught-early address fix costs nothing beyond the customer typing a corrected line into a form they're already on. A caught-late one costs a carrier fee, a reship, or a refund - and sometimes a chargeback on top. None of that touches your Shopify Payments fees, either, because the order is corrected in place rather than canceled and rebuilt; a cancel-and-reorder \"fix\" quietly forfeits the 1.5-2.9% you already paid to process the original payment.",
      },
      {
        type: "p",
        text: "There's a support-load effect too, separate from the shipping cost. A store that catches address mistakes on the order status page never generates the follow-up thread where the customer asks why the package hasn't moved, the reply where support explains it already shipped, and the second reply working out whether a reship is owed. One self-serve correction replaces three support touches that would otherwise stack up over the following week.",
      },
      {
        type: "ol",
        items: [
          "Add address validation and autocomplete to wherever customers can currently request an address change.",
          "Set your edit window to match your real fulfillment cutoff, not a round number that sounds safe.",
          "Decide which address changes can auto-apply and which need a human - and route only the second group to a queue.",
          "Keep an audit trail on every edit, so a late question doesn't turn into a repeat investigation.",
        ],
      },
      {
        type: "p",
        text: "None of this requires new headcount. It requires moving the correction earlier - onto the page the customer is already on, before the label exists to be wrong.",
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
