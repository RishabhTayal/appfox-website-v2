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
    slug: "free-shipping-threshold-order-edits",
    title: "The free-shipping loophole hiding in your order-edit flow",
    excerpt:
      "A swap or a removed item can quietly drop an order below your free-shipping threshold - and nobody decided what happens next. Here's how to set the rule once, and turn the threshold into an upsell instead of a leak.",
    category: "PLAYBOOK",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "Free Shipping Thresholds and Shopify Order Edits, Handled Right",
    metaDescription:
      "When an order edit drops a customer below your free-shipping threshold, someone has to decide what happens next. Here's how to set the rule - and the upsell it creates.",
    body: [
      {
        type: "p",
        text: "A customer's cart crosses your $75 free-shipping line at checkout, and the confirmation email says shipping: free. Two hours later they open the order to size down a jacket or drop a candle from the order, and the total falls to $61. Nobody told the checkout math to re-run, so the order sits there with a free-shipping tag it no longer qualifies for - or worse, someone notices later and charges the customer for shipping on an order that already promised them there'd be none.",
      },
      {
        type: "p",
        text: "This isn't a bug in whatever software you're running. It's a gap most order-edit flows never cover, because free shipping isn't a line item - it's a threshold rule evaluated once, at checkout, and then forgotten. Editing the order changes the total. Nothing re-checks whether the total still earns what the customer was told they got.",
      },
      {
        type: "p",
        text: "The mistake isn't the edit. It's leaving the shipping rule as a checkout-only calculation, when the total it depends on keeps changing after checkout ends.",
      },
      { type: "h2", text: "Two ways this goes wrong, and both cost you" },
      {
        type: "p",
        text: "Leave it alone and the order keeps free shipping it no longer qualifies for. That's a real cost on every order it happens to - you're covering a label a customer's edited order didn't earn, and there's no report that surfaces it, because it looks identical to an order that qualified honestly. It's a slow leak, not a single bad transaction, which is exactly why it can run for a full quarter before someone reconciles shipping cost against order value and can't explain the gap.",
      },
      {
        type: "p",
        text: "Charge for it after the fact and you've got the opposite problem. The customer edited their order in good faith, on a page you built specifically so they wouldn't need to email you, and the receipt for that edit includes a shipping charge that wasn't there five minutes ago. That's not a policy they agreed to - it's a bill that shows up mid-edit, and it reads like a bait-and-switch even when the math behind it is completely fair.",
      },
      { type: "h2", text: "Decide the rule once, the same way you'd decide any other edit policy" },
      {
        type: "p",
        text: "This is the same problem as every other order-edit rule: something that used to require a person to remember has to become a rule the system checks on every relevant edit, not a judgment call someone makes when a customer complains. Free shipping shouldn't be a fact set at checkout and never revisited. It should be a live check - the same one that ran at checkout - re-run any time an edit changes the order total.",
      },
      { type: "h3", text: "What a shipping-threshold rule needs to cover" },
      {
        type: "ul",
        items: [
          "Recalculate threshold eligibility on every edit that changes price - a removal, a swap to a cheaper variant, or a quantity decrease - not just on the original checkout total",
          "Settle the difference the same way you'd settle any other price change - charged or refunded automatically, not a manual adjustment someone has to remember to make",
          "Decide whether a mid-order edit that drops below the threshold loses free shipping immediately, or is grandfathered because the customer already got the confirmation - and apply that decision the same way every time",
          "Surface the shipping status inside the edit flow itself, so a customer removing an item sees the threshold before they confirm, not after",
          "Log the shipping decision alongside every other change on the order, so a later question about why shipping was or wasn't charged doesn't require reconstructing it from memory",
        ],
      },
      {
        type: "quote",
        text: "Free shipping is a rule about the order total. If the total can change after checkout, the rule has to run again - not just once.",
      },
      { type: "h2", text: "Turn the threshold into an upsell, not just a guardrail" },
      {
        type: "p",
        text: "There's a better version of this than just closing the loophole. A customer editing an order who's about to drop below your free-shipping line is a customer who might rather add something small than lose free shipping - the same instinct that makes people pad a cart at checkout to clear the threshold works just as well mid-edit. Surface that inside the edit flow itself - \"add $9 more to keep free shipping\" - next to whatever upsell you're already showing, and the threshold stops being a rule you enforce quietly and becomes an offer that converts.",
      },
      {
        type: "p",
        text: "This works because it's the same moment your upsells already use - a customer who's engaged with their order, payment on file, actively deciding what the total should be. A shipping nudge at exactly the moment it's about to cost them something is a more relevant offer than almost anything else you could show on that screen.",
      },
      { type: "h2", text: "Where this actually gets enforced" },
      {
        type: "p",
        text: "None of this needs a separate system. If your order edits already settle in place - charging or refunding the price difference automatically on the original payment - the shipping delta is just one more line in that same settlement, not a new mechanism. The eligibility check that already decides which edits auto-apply and which need a human look is the same place a threshold rule belongs: evaluated per edit, logged on the order, and never left for someone to catch after the fact.",
      },
      {
        type: "ol",
        items: [
          "Re-run your free-shipping threshold check on every edit that changes the order total, not just at checkout.",
          "Decide once whether a drop below the threshold removes free shipping immediately or is grandfathered - and apply it consistently.",
          "Settle any shipping charge or refund automatically, the same way you settle any other price difference.",
          "Show the threshold inside the edit flow, so a customer can add a little more instead of losing free shipping without warning.",
          "Log every shipping decision on the order's audit trail, so a later question already has an answer attached.",
        ],
      },
      {
        type: "p",
        text: "A free-shipping threshold is easy to enforce at checkout, because checkout only happens once. An order edit changes the total after that promise has already been made, and if nothing re-checks it, you're either giving away shipping you didn't budget for or charging a customer for something they didn't see coming. Set the rule to run on every edit, not just the first one, and it stops being a leak - or a surprise - either way.",
      },
    ],
  },
  {
    slug: "out-of-stock-swaps-shopify-order-edits",
    title: "Out-of-stock swaps: what to offer when the size is gone",
    excerpt:
      "Self-service swaps only work if they check real inventory before confirming. Here's what to show a customer who wants a size, color, or item you don't have - and how to turn a dead end into a good save instead of a support ticket.",
    category: "GUIDE",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "How to Handle Out-of-Stock Swaps in Shopify Order Edits",
    metaDescription:
      "Letting customers swap sizes and colors only works if you check live inventory first. Here's how to handle out-of-stock swaps without a dead end or a ticket.",
    body: [
      {
        type: "p",
        text: "A customer opens their order to swap a medium for a large. The large is sold out - it went to zero somewhere between checkout and this exact moment - and now the self-service flow that was supposed to remove a support ticket is about to generate one anyway, just with extra steps first.",
      },
      {
        type: "p",
        text: "This isn't a rare edge case. Inventory moves constantly, and the gap between \"in stock at checkout\" and \"in stock when the customer comes back to edit\" is exactly where oversold swaps happen. A swap flow that doesn't check real inventory at the moment of the edit isn't self-service - it's a request that looks confirmed and might not be.",
      },
      {
        type: "p",
        text: "The mistake isn't running out of a size. It's letting a customer confirm a swap into something you can't actually fulfill.",
      },
      { type: "h2", text: "Why an unchecked swap is worse than no swap at all" },
      {
        type: "p",
        text: "A swap that silently fails feels worse than one that was never offered. The customer gets a confirmation - an email, a green checkmark, an updated order total - and reads that as a promise. If the warehouse can't fill it, someone has to walk that promise back: a second email, an apology, a refund of the price difference, and a customer who now trusts your \"confirmed\" a little less than before.",
      },
      {
        type: "p",
        text: "It also costs more than the one awkward email. Fulfilling on a backorder basis without telling the customer means a delayed shipment they didn't agree to. Overselling a variant means picking staff who discover the mismatch at the shelf, not at the desk - which turns a data problem into a floor problem, on an order that's already supposed to be moving.",
      },
      { type: "h2", text: "Check inventory at the moment of the edit, not just at checkout" },
      {
        type: "p",
        text: "Checkout-time inventory is already stale by the time anyone edits an order - that's the whole reason the swap request exists in the first place. The fix is to treat every swap the same way you'd treat a new add-to-cart: check what's actually available right now, at the second the customer taps confirm, not what was available when the order was first placed.",
      },
      {
        type: "p",
        text: "That single check changes what the customer sees, not just what happens behind the scenes. Instead of a variant picker that lists every size and color you've ever sold, they see only what's real - and instead of a confirmation that might get walked back, they get one that holds.",
      },
      { type: "h3", text: "What a good out-of-stock swap flow includes" },
      {
        type: "ul",
        items: [
          "A live inventory check at the moment of the swap, not a cached count from checkout",
          "Only in-stock variants shown as options, so there's nothing to select that can't be honored",
          "A nearest-available suggestion when the requested variant is out - a different size or color still in stock, offered instead of a dead end",
          "A back-in-stock notice tied to the order, if the customer would rather wait than swap to something else",
          "A clean fallback - no swap, order unchanged - when nothing suitable is available, instead of leaving the request half-confirmed",
        ],
      },
      {
        type: "quote",
        text: "The worst outcome isn't the failed swap. It's the confirmation email for a swap you couldn't actually keep.",
      },
      { type: "h2", text: "Decide the fallback before the customer asks for it" },
      {
        type: "p",
        text: "Not every out-of-stock swap deserves the same answer, and that's a decision worth making once, in advance, rather than re-litigating on every ticket. A store with deep size runs might default to suggesting the next closest size automatically. A store selling limited or final-sale drops might turn off swaps entirely on those SKUs, since there's no real alternative to offer once a piece is gone. Neither answer is wrong - what's wrong is not deciding, and leaving the fallback to whoever happens to be on shift when the request comes in.",
      },
      {
        type: "p",
        text: "The same logic applies to price. If the nearest available alternative costs more or less than the original variant, that difference should settle automatically, the same way any other swap does - charged or refunded on the original payment, not left as a manual adjustment for someone to catch later.",
      },
      { type: "h2", text: "What this looks like in practice" },
      {
        type: "p",
        text: "None of this requires predicting demand or holding extra safety stock you can't justify. It requires making sure the edit flow only ever confirms what the warehouse can actually pick.",
      },
      {
        type: "ol",
        items: [
          "Turn on a live inventory check for every swap request, not just for new checkouts.",
          "Limit the variants a customer can select to what's actually in stock at that moment.",
          "Set a fallback per product line - suggest an alternative, offer a waitlist, or disable swaps - so the response is decided ahead of time, not improvised.",
          "Settle any price difference automatically, the same way a normal swap would.",
          "Keep a record of what was available at the moment of the edit, so a later question isn't a guessing game about what the warehouse actually had.",
        ],
      },
      {
        type: "p",
        text: "Self-service swaps earn their keep by being reliable, not just fast. A swap flow that checks real inventory before it confirms anything turns \"the size I wanted is gone\" from a support escalation back into what it should have been all along - a customer picking a different option, on the page they were already on.",
      },
    ],
  },
  {
    slug: "which-order-edits-should-auto-approve",
    title: "Auto-approve or review? A rule for order-edit approvals",
    excerpt:
      "Turn on self-service editing and the next question is immediate: what happens the first time a customer swaps in a $400 item? Most of that fear is solved by sorting edits into two buckets, not by reviewing everything.",
    category: "PLAYBOOK",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "Which Order Edits Should Auto-Approve on Shopify?",
    metaDescription:
      "Not every self-service order edit carries the same risk. Learn how to split Shopify order changes into auto-approve and human-review buckets, and set the thresholds that matter.",
    body: [
      {
        type: "p",
        text: "The pitch for self-service order editing is easy to like: customers fix their own mistakes, support stops being the middleman, and the edit happens before the order ships instead of after. Then someone on the team asks the obvious follow-up. What happens the first time a customer uses it to swap a hoodie for three of your most expensive jackets, on an order that's about to be picked?",
      },
      {
        type: "p",
        text: "That question is reasonable, and it's also the reason a lot of stores quietly undercut their own feature: they turn on self-service editing, then route every single edit through a human review queue \"just to be safe.\" Which means every edit still waits on someone to click approve - the exact bottleneck self-service was supposed to remove. The fix isn't reviewing everything or nothing. It's sorting edits into two buckets and only staffing one of them.",
      },
      { type: "h2", text: "Not every edit carries the same risk" },
      {
        type: "p",
        text: "A customer fixing a transposed digit in their own apartment number is not the same event as a customer changing the shipping country three hours before a same-day fulfillment cutoff. A size swap from a medium to a large in the same product is not the same event as swapping into a different product at triple the price. Treating all of these identically - either auto-applying all of them or queuing all of them - throws away the information that actually distinguishes a routine correction from an edit worth a second look.",
      },
      {
        type: "p",
        text: "Most order edits are the boring kind. A customer is fixing something they got wrong, not attempting anything against you. The job isn't to distrust that majority. It's to build a short list of signals that separate the routine edit from the one that deserves five seconds of attention before it's honored.",
      },
      { type: "h2", text: "A short list of signals, not a long policy document" },
      {
        type: "p",
        text: "You don't need a risk model. You need a handful of thresholds that catch the edits worth a look, and get out of the way of everything else.",
      },
      {
        type: "ul",
        items: [
          "Price delta - a swap or add that increases the order value past a threshold you set (say, $75 or 25% of the original order, whichever is more useful for your average order size)",
          "Fulfillment proximity - anything requested after the order has entered picking, even if your window technically still allows it",
          "Destination change - a shipping address edit that changes the country, since that also changes customs, duties, and delivery timelines",
          "Item category - swaps into your highest-value or highest-fraud-risk SKUs, if a handful of products carry disproportionate risk",
          "Account signal - first order from a new customer combined with a same-day edit, versus a repeat customer with an established order history",
        ],
      },
      {
        type: "p",
        text: "None of these need to be exact. A price-delta threshold that's roughly right catches almost everything worth catching. The goal is a queue that holds the exceptions, not a filter fine-tuned to catch every last edge case at the cost of catching routine edits too.",
      },
      { type: "h3", text: "What should auto-apply, almost always" },
      {
        type: "ul",
        items: [
          "Address corrections that pass validation and don't change the destination country",
          "Size and color swaps within the same product, checked against live inventory",
          "Small quantity changes on orders well before the fulfillment cutoff",
          "Cancellations requested before the order has been picked",
        ],
      },
      {
        type: "quote",
        text: "The default should be yes. The queue is for the edits where yes needs a second look, not a place to route every request out of general caution.",
      },
      { type: "h2", text: "Build the queue for the minority, not the majority" },
      {
        type: "p",
        text: "Once the thresholds are set, the approval queue should hold a small fraction of total edits - the ones that tripped a signal, not the ones that happen to exist. That's the difference between a queue your team can actually keep up with and one that becomes its own backlog. Route those flagged edits to wherever your team already works, a Slack channel or a Gorgias ticket, with the order, the requested change, and the reason it was flagged attached - so whoever reviews it isn't starting from zero.",
      },
      {
        type: "p",
        text: "This is also where an audit trail earns its keep. Every edit, whether auto-applied or queued, should leave a record of what changed, when, and under which rule. When a question comes up two weeks later about why an order shipped to a different address, the answer should already be sitting on the order - not require someone to reconstruct it from an email thread.",
      },
      { type: "h2", text: "Where merchants get the threshold wrong" },
      {
        type: "p",
        text: "The over-cautious version queues too much: every address change, every swap, every cancellation, all routed to a human, because it feels safer to check everything. In practice this reproduces the exact support load self-service was meant to remove, just relabeled as \"approvals\" instead of \"tickets.\" If your queue holds most of your edit volume, the thresholds are set too tight, not too loose.",
      },
      {
        type: "p",
        text: "The under-cautious version goes the other way and auto-applies everything, including the edits that actually deserved a look - a shipping address that suddenly points to a freight forwarder, or a swap into your most expensive SKU on an order paid with a card that's already been flagged once. The fix in both directions is the same: set thresholds based on price, timing, and destination, and let those - not a blanket policy - decide what needs a human.",
      },
      {
        type: "ol",
        items: [
          "List the edit types you allow (address, variant swap, quantity, cancellation) and set a default of auto-apply for each.",
          "Add two or three thresholds - price delta, destination-country change, post-pick timing - that flip specific edits to review.",
          "Route flagged edits to one place your team already monitors, with the reason for the flag attached.",
          "Check the queue's share of total edit volume after a few weeks; if it's more than a small fraction, loosen the thresholds.",
        ],
      },
      {
        type: "p",
        text: "Self-service editing only pays off if most edits actually go through without your team touching them. The approval queue isn't a safety net you throw every edit into - it's a short list of exceptions, built from a few thresholds that separate the customer fixing their own mistake from the edit that's actually worth a second look.",
      },
    ],
  },
  {
    slug: "stop-accidental-duplicate-orders",
    title: "Accidental duplicate orders: catch them before you ship two",
    excerpt:
      "A double-tapped checkout button or a forgotten first order turns into two shipments, two sets of fees, and a refund nobody budgeted for. Here's how to let customers merge or cancel the extra one before it's picked.",
    category: "GUIDE",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "How to Stop Accidental Duplicate Orders on Shopify",
    metaDescription:
      "Duplicate orders from double-clicked checkouts or forgotten carts cost more than the refund. Learn how self-service cancellation catches them before they ship.",
    body: [
      {
        type: "p",
        text: "A customer taps \"Place order\" twice because the confirmation page took a second to load. Or they check out on their phone, forget, and check out again on their laptop that evening. Either way, two orders exist where one was intended, and by the time anyone notices, both are already headed for the pick list.",
      },
      {
        type: "p",
        text: "Nothing about this is a fraud problem or a product problem. It's a timing problem, same as a wrong size or a mistyped address - the customer knows almost immediately that something's off, but there's no button on the order status page for \"actually, cancel the second one.\" So it ships, and the fix becomes a return instead of a cancellation.",
      },
      {
        type: "p",
        text: "The mistake isn't placing two orders. It's that the only tool available to undo it is the one built for orders that shipped correctly and simply weren't wanted.",
      },
      { type: "h2", text: "Why shipping both costs more than it looks like" },
      {
        type: "p",
        text: "Two orders means two shipments, two packing jobs, and two shipping labels - one of which was never going to be kept. If the duplicate makes it all the way to the customer, you're now paying for a return shipment on top of the outbound one, plus a restock or a write-off if it's the kind of item that doesn't go back on the shelf clean.",
      },
      {
        type: "p",
        text: "The fees don't reverse either. Refunding the duplicate order gets the customer their money back, but the 1.5-2.9% Shopify Payments took to process that payment is gone whether the order shipped or not. Cancel it before fulfillment and you avoid the shipping cost at least; cancel it after, and you're out the label, the fee, and a chunk of a support agent's afternoon figuring out which of the two orders is the one to keep.",
      },
      {
        type: "p",
        text: "Multiply that by however many duplicate orders a store your size gets in a week, and it stops looking like an edge case. It's a small, steady leak - the kind that never shows up as its own line item, because it's scattered across shipping, refunds, and processing fees instead of sitting in one place where someone would notice it.",
      },
      { type: "h2", text: "Catch it before the warehouse touches either one" },
      {
        type: "p",
        text: "The fix is the same move that works for address typos and size swaps: put the correction on the order status page the customer is already looking at, before fulfillment starts, instead of routing it through an email that has to reach someone before the pick list does.",
      },
      {
        type: "p",
        text: "A customer who realizes they double-ordered doesn't need customer service to explain how to reverse it. They need a cancel button on the order they don't want, live from the moment the confirmation email lands until the moment it's picked - the same window that already governs address and variant edits.",
      },
      { type: "h3", text: "What a good duplicate-order flow includes" },
      {
        type: "ul",
        items: [
          "Self-service cancellation on the order status page, available up until your fulfillment cutoff - not a request that waits on a reply",
          "Automatic refund of the canceled order the moment it's confirmed, so the customer isn't waiting on a second email to see the money back",
          "A simple add-to-existing-order path for the case where combining is cheaper than canceling - one shipment instead of two, settled on the order the customer keeps",
          "Eligibility tied to fulfillment status, so the cancel option disappears the instant it's no longer safe to honor, instead of generating a request someone has to decline",
          "An audit trail showing which order was kept, which was canceled, and when - so a later question doesn't turn into a reconstruction project",
        ],
      },
      {
        type: "quote",
        text: "The customer already knows which order they want. The only missing piece is a way to say so before it ships.",
      },
      { type: "h2", text: "Merge, don't just cancel, when it's the same items" },
      {
        type: "p",
        text: "Cancellation isn't always the cleanest answer. If both orders are headed to the same address and haven't been picked yet, combining them into a single shipment saves a box, a label, and a second delivery attempt - and it's a better outcome for the customer, too, since they get one package instead of two showing up a day apart. That's the same in-place edit that a variant swap or an address correction uses: add the items from the duplicate onto the order that's staying, settle any difference automatically, and cancel the now-empty duplicate. Nothing about it requires a new order number or a second trip through checkout.",
      },
      {
        type: "p",
        text: "Whether canceling or merging is the right default depends on the store - a single-SKU flash sale probably just wants the extra canceled outright, while a store with larger multi-item carts benefits more from merging. Either way, the decision belongs to a rule you set once, not a judgment call your support team re-makes on every ticket.",
      },
      { type: "h2", text: "Set the window by what's actually happened to the order" },
      {
        type: "p",
        text: "A flat cutoff - \"cancel within 2 hours\" - is a reasonable floor, but it isn't the whole answer, because duplicate orders don't always surface within a fixed window. The safer rule ties eligibility to fulfillment status: cancellation and merge stay available until the order is picked, and close automatically the moment that's no longer true, whatever the clock says. A store that ships same-day needs that check to be tight; a store that batches overnight can afford to leave it open longer, and the rule adjusts on its own either way.",
      },
      {
        type: "p",
        text: "It also means a customer never sees an option you can't actually honor. Once an order's been picked, the cancel button simply isn't there - there's no request to decline, and no ticket generated over something that was never going to be possible in the first place.",
      },
      { type: "h2", text: "What this actually saves" },
      {
        type: "p",
        text: "Compare the two paths on the same duplicate order. Caught early, it costs a customer one tap on a page they're already viewing, and the store keeps the fees on the order that survives. Caught late, it's a return label, a restock or a write-off, a refund with no fee recovered, and a support ticket to sort out which order was the mistake. The gap between those two outcomes is entirely about when the correction becomes available - not whether the customer would have made it.",
      },
      {
        type: "ol",
        items: [
          "Add self-service cancellation to the order status page, scoped to orders that haven't been picked yet.",
          "Offer a merge path for duplicates going to the same address, so one shipment replaces two.",
          "Tie the eligibility window to fulfillment status, not a flat number of hours.",
          "Keep an audit trail on every cancel or merge, so a later question has an answer already attached.",
        ],
      },
      {
        type: "p",
        text: "None of this requires guessing which orders are duplicates before they happen. It requires giving the customer who already knows a way to say so - on the page they're already on, before the second box gets packed.",
      },
    ],
  },
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
