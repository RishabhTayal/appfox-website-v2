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
    slug: "order-edits-after-the-shipping-label-is-already-printed",
    title: "What happens when an order edit lands after the shipping label already printed",
    excerpt:
      "A customer adds an item or nudges a shipment two pounds heavier minutes after the label prints. The edit goes through clean. The label doesn't - and a carrier invoice weeks later charges for the gap nobody caught.",
    category: "PLAYBOOK",
    date: "2026-07-08",
    author: "The AppFox Team",
    metaTitle: "Shopify Order Edits After the Label Prints: What Actually Breaks",
    metaDescription:
      "A weight, address, or line-item edit made after a Shopify order's shipping label prints doesn't update the label - it creates a mismatch carriers bill for later. Here's why, and how to gate edits on label status instead of fulfillment status.",
    body: [
      {
        type: "p",
        text: "A customer adds a second candle to an order forty minutes after checkout. The edit flow shows a new total, charges the difference, and confirms the change - everything about it looks finished. What the confirmation screen can't show is that a shipping label already exists for this order, printed the moment the warehouse batch ran, priced and routed against the one-candle weight that was true when it was created. The label doesn't know a second candle exists. It just knows the package that shows up at the carrier's hub in a few hours is going to weigh more than it says.",
      },
      {
        type: "p",
        text: "Nothing about the edit failed. The order updated, the payment settled, the customer got their confirmation email. The mismatch is somewhere the edit flow never looked: a shipping label is a fixed declaration of weight, dimensions, and sometimes address, generated once and bought once, from a rate the carrier already committed to. An order edit changes the order. It doesn't reach back and regenerate the label that was already purchased against the order's old shape.",
      },
      {
        type: "p",
        text: "The mistake isn't printing labels before every order is finalized - most warehouses have to, or nothing would ship on time. It's letting an edit flow keep accepting weight- and address-changing requests after the one document that has to match the physical package has already been locked in.",
      },
      { type: "h2", text: "Why the label doesn't catch up on its own" },
      {
        type: "p",
        text: "A shipping label isn't a live query against the order - it's a receipt for a rate the carrier already quoted, and quoted rates don't renegotiate themselves after the fact.",
      },
      {
        type: "ul",
        items: [
          "Every major carrier prices a label from the weight and dimensions entered at the moment it's generated - UPS, FedEx, and USPS all quote and reserve that rate before the package exists, not when it's actually handed over",
          "Carriers audit what they were told against what they scan - a package that comes through a hub scale two pounds heavier than its label, or a few inches larger, gets flagged automatically, no human review required to catch it",
          "That audit doesn't happen at your dock - it happens downstream, on the carrier's own equipment, often a day or more after the package already left, which is exactly why nobody on your team sees the mismatch in real time",
          "A corrected shipping address after a label prints isn't a data update either - the barcode the carrier scans to route the package was already generated against the old address, so a fixed address in Shopify and a label routing to the old one are now two different facts",
        ],
      },
      { type: "h3", text: "Why this isn't a rounding error" },
      {
        type: "p",
        text: "A two-pound gap on one order looks trivial next to everything else an edit flow already gets right. It doesn't stay trivial at volume. Carriers bill weight and dimension corrections back to the account after the fact, usually weeks later, as a lump adjustment covering every mismatched label in the billing cycle - not itemized in a way that points back to which edit caused which line. By the time someone in finance is reconciling a shipping invoice that's higher than the labels ever showed, the order that caused it has long since shipped, and there's no flag anywhere connecting the two.",
      },
      {
        type: "quote",
        text: "An order edit changes what's true about the order. A shipping label is a receipt for what was true when it printed - and receipts don't update themselves.",
      },
      { type: "h2", text: "Gate the edit on label status, not fulfillment status" },
      {
        type: "p",
        text: "Most eligibility rules already close an edit window once an order is picked or packed. That's the right instinct pointed at the wrong signal here - a label can print before picking finishes, or well after, depending on how the warehouse batches its printing, so \"has this shipped\" and \"does a label already exist for this\" are two different questions with two different answers.",
      },
      {
        type: "ul",
        items: [
          "Track label-printed as its own status on the order, separate from picked and packed, since it's the actual cutoff for anything that changes weight, dimensions, or the ship-to address",
          "Close weight-changing edits - added items, quantity increases, variant swaps into a heavier or bulkier option - the moment a label exists, even if the order hasn't been picked yet",
          "Keep genuinely label-safe edits open past that point - a note to the customer, a gift message - since none of those change what the carrier already quoted",
          "Route a post-label address correction to a real fix, not a quiet database update - a carrier-side redirect through the carrier's own address-correction service, or a hold-and-relabel at the dock, since only one of those actually changes where the package goes",
          "If a weight-changing edit is still worth allowing after a label prints, void and reissue the label as part of completing that edit, instead of leaving the old one attached to a package that no longer matches it",
        ],
      },
      { type: "h2", text: "Where this belongs in your eligibility rules" },
      {
        type: "p",
        text: "The same eligibility engine that already decides edit windows and fulfillment cutoffs is where a label check belongs too - it just needs its own signal, since \"label printed\" doesn't move in lockstep with \"picked\" or \"packed\" the way the rest of the pipeline does.",
      },
      {
        type: "ol",
        items: [
          "Capture label-printed as a timestamped status on the order, distinct from pick and pack status, fed from whatever system actually generates your labels.",
          "Block weight- and dimension-changing edits automatically once that status is set, regardless of how much of the edit window is technically still open.",
          "Send address corrections after label-printed through a carrier-side redirect or a relabel step, not a silent field update that the label never sees.",
          "If a post-label edit is approved anyway, void the old label and generate a new one as part of applying the edit, so exactly one label is ever active per package.",
          "Log label status alongside the rest of the order's audit trail, so a shipping-invoice reconciliation months later can trace a surcharge back to the specific edit that caused it.",
        ],
      },
      {
        type: "p",
        text: "Most order edits are invisible to your shipping costs, because most of them happen before a label exists to be wrong. The ones that land after it prints don't fail loudly - they ship exactly as edited, and the bill shows up separately, on a carrier invoice that never mentions the edit at all. Track label status as its own cutoff, close the edits that would invalidate it, and reissue the label when you don't - and a carrier surcharge stops being a mystery line item and goes back to being what it should be: a cost you saw coming.",
      },
    ],
  },
  {
    slug: "editing-a-subscription-order-doesnt-change-the-subscription",
    title: "Why editing this month's box doesn't change next month's subscription",
    excerpt:
      "A subscriber swaps this month's flavor through the same self-service edit link that fixed a one-time order last year, and next cycle ships the old flavor anyway. The edit worked. It just wasn't touching the thing they meant to change.",
    category: "GUIDE",
    date: "2026-07-07",
    author: "The AppFox Team",
    metaTitle: "Shopify Subscription Orders: Why an Order Edit Doesn't Change the Plan",
    metaDescription:
      "Editing a subscription's current shipment through a self-service order-edit flow doesn't update the subscription contract behind it. Here's why the two records are separate, and how to route each request to the right one.",
    body: [
      {
        type: "p",
        text: "A subscriber on a monthly coffee plan opens the shipping confirmation for this cycle's bag and swaps Dark Roast for Decaf using the same self-service edit link that fixed an address on a one-time order last spring. The confirmation screen updates, the edit shows as applied, and the box that ships a few days later is, in fact, Decaf. Next month, Dark Roast shows up again - not because anything reverted, but because nothing was ever supposed to carry forward. The subscriber reads it as the edit undoing itself. What actually happened is narrower and less dramatic: they changed one order, and a subscription is more than the order in front of you.",
      },
      {
        type: "p",
        text: "Self-service order editing was built to change a single Shopify order - the one record that already exists, with its own line items, its own payment, its own fulfillment status. A subscription doesn't hand a customer one order to manage. It hands them a contract that regenerates a new order every billing cycle, from a line item stored on the contract itself, on a schedule the contract also owns. Editing the order in front of you touches the printout. It does nothing to the template that prints the next one.",
      },
      {
        type: "p",
        text: "The mistake isn't running order editing and subscriptions on the same store - most subscription merchants need both. It's putting a one-time-order edit flow in front of a subscription shipment without ever telling the customer, or the flow itself, which of two different records they're about to change.",
      },
      { type: "h2", text: "A subscription order and a one-time order aren't the same kind of record" },
      {
        type: "p",
        text: "Underneath, these are two different systems doing two different jobs. Order editing operates on an Order that already exists - it can adjust a line item, an address, a charge, because there's a specific object sitting there to adjust. A subscription contract is the thing generating that Order in the first place, on its own billing date, from line items and a shipping address it stores independently. Editing the child doesn't reach back and touch the parent.",
      },
      {
        type: "ul",
        items: [
          "Swapping a variant on the current shipment changes that one Order's line item - the contract's stored line item, the one that generates every future cycle, is a separate record that was never in the request",
          "Canceling the current order voids and refunds that one shipment, but the contract's next billing date is untouched, so the customer is billed again on schedule for a box nobody adjusted",
          "A quantity change on the order in hand doesn't update the quantity stored on the contract, so the next cycle regenerates at the old quantity, not the corrected one",
          "An address correction sticks only if the edit flow explicitly also patches the contract's shipping address - otherwise it's fixed for exactly one shipment and reverts the moment the next one generates",
        ],
      },
      { type: "h3", text: "Why a subscriber reads this as broken, twice" },
      {
        type: "p",
        text: "The confusion isn't that the edit failed - it's that it succeeded, visibly, on a page that looks identical to the one-time-order flow they've used before. Nothing in that moment signals \"this only lasts one cycle.\" So when the old flavor reappears next month, it doesn't read as a scoping detail they missed. It reads as the same edit tool failing a second time, on top of whatever prompted the swap in the first place - and now there are two tickets where a clear label would have prevented one.",
      },
      {
        type: "quote",
        text: "A one-time order ends the moment it ships. A subscription order is just the next printout of a contract that's still running underneath it.",
      },
      { type: "h2", text: "Two different requests need two different flows" },
      {
        type: "p",
        text: "Not every edit on a subscription order is wrong to hand to self-service - it just depends on whether the customer means it for one shipment or for good, and those two intents need to land in different places.",
      },
      {
        type: "ul",
        items: [
          "This-shipment-only changes - a one-time swap because they're out of a flavor, an address fix for a trip - belong exactly where order editing already puts them, since they're not meant to persist past this cycle anyway",
          "Going-forward changes - a permanent flavor switch, a skipped cycle, a pause, a cancellation of the plan itself - belong in the subscription's own customer portal, which writes to the contract, not to a single order",
          "Say which one the customer is doing in plain language at the point of choice - \"just this box\" versus \"my whole subscription\" - instead of one edit button that quietly means only the first",
          "Give a visible path from one flow to the other, so a customer who meant \"forever\" but landed in the order-edit screen gets routed to the portal instead of an edit that looks confirmed and doesn't hold",
        ],
      },
      { type: "h2", text: "Where this belongs in your eligibility rules" },
      {
        type: "p",
        text: "The same eligibility check that already flags gift-card orders and BNPL orders as their own case is where a subscription-generated order belongs too - checked before the edit flow renders, not discovered after a customer's second cycle ships wrong.",
      },
      {
        type: "ol",
        items: [
          "Flag every order generated by a subscription contract before the edit flow renders, the same way you already flag payment-method exceptions.",
          "Scope the self-service order-edit flow on those orders to changes that only need to survive one shipment - swap, address, cancel-this-box - and never write to the contract from inside it.",
          "Route anything that sounds like \"always\" or \"from now on\" to the subscription customer portal, where skip, pause, and swap-going-forward already write to the right record.",
          "Tell the customer, before they confirm, which record they're changing - the box in hand or the plan behind it - so a one-cycle swap is never mistaken for a lasting one.",
          "Log which record an edit actually touched - order or contract - so a \"my subscription reverted\" ticket already has an answer attached instead of starting a re-investigation.",
        ],
      },
      {
        type: "p",
        text: "Dark Roast reappearing wasn't the edit undoing itself - it was the schedule underneath it running exactly as stored, untouched by an edit that was only ever scoped to the order sitting on top of it. Tell the customer up front which of the two they're changing, and route \"forever\" requests to the portal that actually owns the schedule - and a subscription order stops quietly reverting on customers who did everything the page asked of them.",
      },
    ],
  },
  {
    slug: "local-pickup-orders-need-a-different-edit-cutoff",
    title: "Why a local pickup order needs a different edit cutoff than a shipped one",
    excerpt:
      "Self-service editing sizes its cutoff around a pick-to-ship pipeline that takes hours. A local pickup order can be pulled, scanned, and bagged at the counter before the customer finishes typing the edit - so the cutoff has to run on a different signal entirely.",
    category: "GUIDE",
    date: "2026-07-07",
    author: "The AppFox Team",
    metaTitle: "Local Pickup Orders and Shopify Order Editing, Done Right",
    metaDescription:
      "A local pickup order can be picked and bagged in minutes, too fast for a wall-clock edit window. Here's why the cutoff should key off pickup status instead.",
    body: [
      {
        type: "p",
        text: "A customer places a buy-online-pickup-in-store order for a jacket at 10:14 in the morning, and by 10:19 the text arrives: ready for pickup. They open the order five minutes later to swap the color - the confirmation email showed the wrong one - the same correction that would sail through with hours to spare on a shipped order. On this order, the item isn't sitting in a queue somewhere upstream. It's already been pulled off the floor, scanned, and bagged at the counter, by a staff member who has no idea an edit request just landed.",
      },
      {
        type: "p",
        text: "This isn't a faster version of the problem a shipped-order edit window already solves. It's a different problem wearing the same name. Shipped-order eligibility rules are built around a pick-to-ship pipeline that takes hours, sometimes a full day, so there's real time between an order being placed and an order being gone. Local pickup collapses that gap on purpose - the entire appeal of picking up in store is getting the item minutes after ordering, not days later. An edit window sized for a warehouse doesn't just fit a pickup order poorly. It can still say \"yes, editable\" on an order that finished being fulfilled while the customer was typing.",
      },
      {
        type: "p",
        text: "The mistake isn't offering local pickup alongside shipping. It's applying the same edit cutoff to an order fulfilled in minutes as the one built for an order fulfilled in days.",
      },
      { type: "h2", text: "Why pick time for pickup orders isn't measured in hours" },
      {
        type: "p",
        text: "A warehouse pick list runs on a batch schedule - orders queue, and someone works through them in a run. A store floor doesn't work that way, and it doesn't need to.",
      },
      {
        type: "ul",
        items: [
          "Many pickup orders are picked the moment they're placed, not on a schedule - a single associate working the floor sees the order come in and pulls it before doing anything else, since there's no batch queue standing between \"ordered\" and \"picked\" the way a warehouse has",
          "The \"ready for pickup\" notification is often the same event as \"physically bagged and at the counter\" - what looks like two separate milestones on a shipped order can be one click of a button here",
          "The same store can vary wildly hour to hour - a pickup order placed at open might sit twenty minutes because one person is covering the register and the floor, and the identical order at 2pm might be filled in ninety seconds during a lull",
          "Multiple pickup locations mean multiple paces - the store next to your busiest register might pick in minutes, while a location that only staffs pickup during set hours might not touch the order until a shift starts",
        ],
      },
      { type: "h3", text: "Why \"ready for pickup\" has to be the cutoff, not a clock" },
      {
        type: "p",
        text: "A wall-clock window like the shipped-order default doesn't fail safe here - it fails open. It can keep saying an order is still editable right up until the customer is standing at the counter watching someone hand them a bag. The only signal a pickup edit flow can actually trust is fulfillment status itself: has this order been marked ready for pickup yet. That single flag is a more honest cutoff than a \"picked\" status on a shipped order, because in pickup fulfillment, being marked ready is the pick event.",
      },
      { type: "h2", text: "What breaks when an edit lands after \"ready\"" },
      {
        type: "p",
        text: "None of this is exotic - it's the ordinary mechanics of a pickup counter, running exactly as designed against an edit that showed up a few minutes too late.",
      },
      {
        type: "ul",
        items: [
          "The item a customer wants to swap into may sit at a different spot on the shelf than what's already held at the counter, so a size or color swap isn't a data change - it's someone walking the original item back to the floor and re-pulling a different one",
          "A cancellation after \"ready\" means restocking a specific physical unit that's already been separated from the rest of inventory and set aside, not a warehouse-level status flip",
          "The staff member who bagged the item has no channel telling them the order behind that bag just changed - the pickup counter usually only knows what a printed ticket or its own POS screen shows, and neither refreshes on its own when an edit lands upstream",
          "If the pickup notification already went out, the customer may be en route or already inside the store - an edit that arrives online now has to outrun a person walking toward the counter, not a truck leaving a dock",
        ],
      },
      {
        type: "quote",
        text: "A shipped order's cutoff is about outrunning a conveyor belt. A pickup order's cutoff is about outrunning someone who's already walking toward the counter.",
      },
      { type: "h2", text: "Build the cutoff around the pickup signal, not a countdown" },
      {
        type: "p",
        text: "The fix isn't a shorter number of hours - it's swapping the clock for the status the pickup flow already tracks.",
      },
      {
        type: "ul",
        items: [
          "Gate eligibility on the order's \"ready for pickup\" flag, not a fixed number of hours - the moment that status flips, item- and price-changing edits close, no matter how little time has actually passed",
          "Keep genuinely safe edits open a little longer - which of your pickup locations the order is held at, say - since a location change doesn't touch what's already been pulled off a shelf",
          "Route a same-day, post-ready swap request straight to the store itself rather than a general support queue - a text to the associate or a note added to the pickup ticket gets a physical fix moving in the time it actually needs",
          "Treat each pickup location as its own clock, the same way a multi-warehouse shipping order already needs its own cutoff per location, since one store's ready time has nothing to do with another's",
        ],
      },
      { type: "h2", text: "Where this belongs in your eligibility rules" },
      {
        type: "p",
        text: "The same eligibility engine that already splits edit windows and approval rules by risk is where this belongs too - it just needs a fulfillment-type check ahead of everything else, since a pickup order and a shipped order were never running the same pipeline underneath.",
      },
      {
        type: "ol",
        items: [
          "Tag every order with its fulfillment type - shipped or local pickup - and give pickup orders their own eligibility rule instead of inheriting the shipping default.",
          "Gate pickup-order edits on the \"ready for pickup\" status flag, not a wall-clock window, since that status is the pick event for this fulfillment type.",
          "Let location and timing edits stay open longer than item or price edits, since only the second group touches what's already been pulled.",
          "Give in-store staff a live way to see an edit request against an order they're already holding, instead of relying on the customer to say something at the counter.",
          "Log the fulfillment type on the order's audit trail alongside every other fact, so a canceled-after-ready pickup order isn't reconciled the same way as a canceled-after-ready shipment.",
        ],
      },
      {
        type: "p",
        text: "A shipped order gives you hours to catch a mismatch before the box leaves the building. A pickup order can give you minutes - sometimes less than it takes to read this sentence. Build the cutoff around the signal that actually tracks when the item left the shelf, not a countdown copied from a pipeline that doesn't apply here, and a self-service edit stops racing a customer who's already standing at the counter.",
      },
    ],
  },
  {
    slug: "gift-orders-need-a-different-order-edit-flow",
    title: "Why a gift order needs a different edit flow than every other order",
    excerpt:
      "Self-service editing assumes the person reading the confirmation email is the person who should be able to touch the order. On a gift order, the buyer and the recipient aren't the same person - and the fix isn't turning editing off, it's scoping what each of them can see.",
    category: "GUIDE",
    date: "2026-07-07",
    author: "The AppFox Team",
    metaTitle: "Order Editing on Gift Orders: What Recipients Shouldn't See",
    metaDescription:
      "Self-service order editing assumes the buyer and the recipient are the same person. On a gift order they aren't - here's how to scope what a gift recipient can see and change without spoiling the surprise or exposing what was paid.",
    body: [
      {
        type: "p",
        text: "A customer buys a sweater for their sister, ships it to her address, and pays with their own card. The confirmation and the edit link land in the buyer's inbox, exactly where they should. Then the package arrives, and the packing slip inside it carries a \"manage your order\" link of its own - the same one every order gets, put there to drive repeat visits. The sister scans it out of curiosity, and now she's looking at the price her brother paid, with a cancel button sitting right there if she'd rather have the money.",
      },
      {
        type: "p",
        text: "Nothing about this is a broken feature. It's a feature that was only ever tested against one assumption: that the person who receives an order-related link is the person who placed and paid for the order. That's true for the overwhelming majority of orders a store ships. It's false, specifically and predictably, for gift orders - and most self-service edit flows were never built with that exception in mind.",
      },
      {
        type: "p",
        text: "The mistake isn't letting gift orders be edited. It's not asking, before an edit link goes anywhere, whether the person about to open it is the one who paid.",
      },
      { type: "h2", text: "Where the link ends up in the wrong inbox" },
      {
        type: "p",
        text: "None of these require anyone to do something unusual. They're the normal, automated parts of a fulfillment flow, running exactly as designed against an order that happens to be a gift.",
      },
      {
        type: "ul",
        items: [
          "A packing slip or shipping-confirmation template that includes a generic \"track\" or \"manage your order\" link or QR code, printed on paper that ships inside the box the recipient opens first",
          "Marketing flows keyed off the shipping address rather than the customer's email - a post-delivery review request or a size-exchange nudge that goes straight to whoever the package was addressed to",
          "A recipient who already has a customer account under the name on the shipping label, surfacing an order they never placed under \"my orders\" the next time they log in",
          "A single cart shipped to multiple addresses for multiple recipients, where one edit link opens the whole order - every gift in it, not just the one that shipped to whoever clicked",
        ],
      },
      { type: "h3", text: "Why turning editing off for gift orders is the wrong fix" },
      {
        type: "p",
        text: "The easy reaction is to flag anything that looks like a gift and disable self-service editing on it entirely - no link, no risk. That throws away the exact thing editing was built for: a recipient who unwraps a medium that should have been a large has no way to fix it without calling the giver first and admitting the size was wrong, which is precisely the awkward conversation a good exchange flow exists to avoid. The goal isn't to lock gift orders down. It's making sure the right person is doing the editing, and that a size fix doesn't require exposing the receipt to do it.",
      },
      {
        type: "quote",
        text: "The problem isn't that a gift order can be edited. It's that the same link is safe in one inbox and a price tag, a spoiler, and a cancel button in the other.",
      },
      { type: "h2", text: "The buyer and the recipient need two different levels of access" },
      {
        type: "p",
        text: "Once the order is recognized as a gift, the question isn't whether to allow editing - it's which of two people is asking, since they're not entitled to the same thing.",
      },
      {
        type: "ul",
        items: [
          "The buyer gets full access - address changes, cancellations, refunds back to their own card, and visibility into what was paid - exactly like any other order, sent only to the email address that actually completed checkout",
          "The recipient gets narrow access, if you grant any at all - a swap between the size or color the buyer already chose, and nothing that touches price, payment, or the fate of the order as a whole",
        ],
      },
      { type: "h3", text: "What a recipient-safe exchange view actually needs" },
      {
        type: "ul",
        items: [
          "Leave price and payment fields out of the response entirely for this view - not hidden with a style rule the recipient could inspect around, but never sent to that endpoint in the first place",
          "Scope it to a size or color swap on what was already gifted - no cancellation, no address change, no adding items onto someone else's paid order",
          "Verify the recipient a different way than the buyer flow - a shipping zip code plus the order number, say, not a link that embeds the buyer's email as its access token, which would just hand over the full view to anyone who opens it",
          "Keep it off any document that ships loose in the box - a packing slip is the one thing a recipient reads before anyone's decided what they're allowed to click",
        ],
      },
      { type: "h2", text: "Detect the gift before the first email goes out, not after a complaint" },
      {
        type: "p",
        text: "A shipping address that doesn't match the billing name is a decent hint, but it's not proof - it's also what a business order, a household with two last names, or a friend picking something up looks like. The reliable signal is a \"this is a gift\" checkbox or a gift-note field at checkout, captured once and attached to the order before anything downstream fires. Whichever signal you use, it has to be checked before the confirmation email, the shipping notification, and the packing-slip template render - because those are the last points in the flow where you still get to choose which link, if any, goes on which piece of paper.",
      },
      {
        type: "ol",
        items: [
          "Capture whether an order is a gift at checkout, rather than inferring it later from the shipping address.",
          "Send the full edit and manage link only to the email address that placed and paid for the order.",
          "If recipients should be able to exchange size or color, build them a separate, scoped view that never shows price, payment, or a cancel action.",
          "Strip any \"manage your order\" link or QR code from packing slips and from shipping-confirmation emails triggered by the ship-to address.",
          "Log which party made a change - buyer or recipient - on the order's audit trail, so a later question about who changed something already has an answer attached.",
        ],
      },
      {
        type: "p",
        text: "Most order-edit flows only ever have to answer one identity question: is this the person who placed the order? A gift order asks it twice, for two different people who want two different things from the same box - and treating them the same, whether by locking both out or letting both in, gets one of them wrong every time. Detect the gift up front, keep the receipt with the person who paid it, and give the recipient just enough rope to fix a size - and the gift stays a surprise for exactly as long as it's supposed to.",
      },
    ],
  },
  {
    slug: "why-buy-now-pay-later-orders-resist-self-service-edits",
    title: "Why a Klarna or Afterpay order won't let a customer self-edit the way a card order does",
    excerpt:
      "A card order settles by adjusting one authorization. A Buy Now, Pay Later order settles by adjusting an installment loan that was underwritten against one specific total - and that's a much harder thing to change after the fact. Here's why BNPL orders need their own rule, not the card rule.",
    category: "GUIDE",
    date: "2026-07-07",
    author: "The AppFox Team",
    metaTitle: "Why Klarna, Afterpay, and Affirm Orders Can't Always Self-Edit on Shopify",
    metaDescription:
      "Buy Now, Pay Later orders settle through an installment loan underwritten at checkout, not a single adjustable card authorization. Here's why editing a Klarna, Afterpay, or Affirm order behaves differently, and what to show the customer instead.",
    body: [
      {
        type: "p",
        text: "A customer checks out with Klarna, splits the total into four payments, and gets a confirmation showing exactly what's due and when. A week later they open the order to add a second item - the same kind of edit that would settle in a few seconds on a card order - and the edit flow can't complete it the same way. Not because something's broken, but because there's no simple \"charge the difference\" step to fall back on. The payment behind this order isn't a card authorization anymore. It's a loan, already underwritten against a specific amount.",
      },
      {
        type: "p",
        text: "This catches merchants off guard because Buy Now, Pay Later looks like just another payment icon at checkout - Klarna, Afterpay, Affirm, Shop Pay Installments - sitting next to Visa and Mastercard on the same page. Underneath, it isn't the same kind of transaction at all. A card authorization is a promise from a bank that funds are available; the merchant decides later how much of that promise to capture, and can usually capture a little more or a little less without much friction. A BNPL provider isn't holding a promise - it's extended actual credit, in fixed installments, sized to one specific cart total at one specific moment. Changing that total after the fact means changing the loan, and that's a decision the lender makes, not the merchant.",
      },
      {
        type: "p",
        text: "The mistake isn't offering Buy Now, Pay Later at checkout. It's treating a BNPL order like a card order once someone tries to edit it.",
      },
      { type: "h2", text: "Why an increase is the real blocker, not a decrease" },
      {
        type: "p",
        text: "The two directions an edit can move the total behave nothing alike, and it's worth being specific about why.",
      },
      {
        type: "ul",
        items: [
          "Raising the total - adding an item, swapping into a pricier variant - asks the lender to extend more credit against a plan it already approved and already sized its risk decision around. Most BNPL integrations on Shopify have no path for that; there's no \"authorize a little more\" call sitting underneath the original loan the way there is on a card",
          "Lowering the total - removing an item, swapping into something cheaper - is a refund, and refunds are generally supported, but they don't behave like a card refund either. Depending on the provider, a partial refund can shrink every remaining installment evenly, pay down the final installment first, or in some cases not be reflected until the next scheduled payment date, rather than crediting the customer back immediately",
          "The order's installment schedule was fixed at checkout based on the approved amount - a plan that was underwritten as $240 over four payments doesn't automatically become $280 over four payments because a customer added a $40 item three days later",
          "Some providers require a fully separate loan application for anything beyond a straight refund - which, from the customer's perspective, looks nothing like the one-click edit they just used on a different order paid by card",
        ],
      },
      { type: "h3", text: "Why this isn't a gap in your edit tool" },
      {
        type: "p",
        text: "It's tempting to read a blocked BNPL edit as a missing feature - the same reflex that makes a gift-card order or a cash-on-delivery order look like an oversight rather than a structural limit. It's the same category of problem, for the same underlying reason: self-service editing settles by adjusting the payment behind the order, and there's nothing to adjust when the payment isn't a simple authorization in the first place. A workaround that tried to force it - canceling the loan and starting a new one, say - would hand the customer a second credit check and a second installment schedule for what they experienced as a one-click add.",
      },
      {
        type: "quote",
        text: "A card authorization is a promise the merchant can renegotiate. A Buy Now, Pay Later plan is a loan the lender already underwrote. Only one of those bends after checkout.",
      },
      { type: "h2", text: "Show the right dead end instead of a generic error" },
      {
        type: "p",
        text: "None of this means BNPL orders should be invisible to your edit flow - it means the flow needs to know, before the customer fills anything out, that this order settles differently.",
      },
      {
        type: "ul",
        items: [
          "Detect the payment method before the edit form renders, the same check that already screens out gift-card and manual-payment orders, and treat BNPL providers as their own case rather than lumping them in with \"card\"",
          "Allow whatever doesn't touch the total - an address correction, a shipping-method change - exactly the same as on any other order, since none of that depends on the installment plan underneath",
          "Block increases outright, with a plain explanation - \"this order is on a Klarna installment plan, so we can't add to it automatically\" - instead of a generic failure after the customer has already picked a size and color",
          "Route decreases through the provider's own refund path rather than a generic Shopify refund, since that's what actually adjusts the remaining installments correctly",
          "Offer a second, separate checkout for anything the customer wants to add, rather than pretending it can attach to the original order - a new small order is a real option here in a way it usually isn't worth suggesting for a card order",
        ],
      },
      { type: "h2", text: "Where this belongs in your eligibility rules" },
      {
        type: "p",
        text: "The same eligibility engine that already flags gift-card, store-credit, and manual-payment orders as edit-restricted is exactly where this check belongs too - evaluated before any price-delta or fulfillment-cutoff rule even runs, since no amount of tuning those thresholds changes what a lender will and won't do to an existing loan.",
      },
      {
        type: "ol",
        items: [
          "Identify every BNPL provider active on your store - Klarna, Afterpay, Affirm, Shop Pay Installments - and flag their orders separately from ordinary card orders in your eligibility rules.",
          "Keep non-price edits, like address corrections, fully self-service on BNPL orders, since they don't touch the loan at all.",
          "Block total-increasing edits automatically, with a plain explanation of why, instead of a generic error after the customer has already chosen what to add.",
          "Route any decrease through the provider's actual refund mechanism, not a generic order refund, so the remaining installments adjust correctly.",
          "Offer a fresh checkout as the honest alternative when a customer wants to add something, rather than implying it can be folded into the existing plan.",
        ],
      },
      {
        type: "p",
        text: "Most self-service edits work because there's a simple authorization sitting underneath the order, and adjusting it is just arithmetic. A Buy Now, Pay Later order doesn't have that - it has a loan, sized once, by someone other than the merchant. Know which of your orders that applies to before the edit form ever loads, say so in plain language, and give the customer a real next step - and a Klarna or Afterpay order stops looking like a broken feature and starts looking like what it is: a different kind of payment, handled on its own terms.",
      },
    ],
  },
  {
    slug: "what-happens-when-an-order-edit-payment-fails",
    title: "What actually happens when the card declines on an order edit",
    excerpt:
      "A customer swaps into a pricier variant, the edit looks confirmed, and then the incremental charge fails - expired card, insufficient funds, a bank flagging an unfamiliar off-cycle charge. Most stores never decide what the order should do next until it's already happened.",
    category: "PLAYBOOK",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "What Happens When a Shopify Order-Edit Charge Is Declined",
    metaDescription:
      "A self-service order edit that raises the total has to charge the difference - and that charge can fail. Here's why declines are more common mid-edit than at checkout, and how to decide what the order does next.",
    body: [
      {
        type: "p",
        text: "A customer opens their order three days after checkout and swaps a medium for a large in a pricier colorway. The edit flow shows a new total, a confirmation screen, everything that looks like a done deal. Then the incremental charge - the difference between what they already paid and what the swap costs - comes back declined. The screen the customer is looking at said yes. The payment gateway just said no.",
      },
      {
        type: "p",
        text: "This isn't a rare glitch. It's a predictable consequence of what an order edit's charge actually is: a second, unscheduled transaction against a card that already cleared once, days or weeks after the fact. Everything that makes that charge different from the original one also makes it more likely to fail.",
      },
      {
        type: "p",
        text: "The mistake isn't that a card can decline. It's not deciding, in advance, what the order is supposed to do the moment that happens - and finding out the hard way that \"the edit failed\" and \"the edit is stuck halfway\" are two very different outcomes.",
      },
      { type: "h2", text: "Why a decline is more likely mid-edit than at checkout" },
      {
        type: "p",
        text: "The original checkout charge is the transaction a card issuer expects: first-party, in-session, matched to a cart the customer just built. An edit-time charge shares none of that context. It's a second charge on the same card, initiated by the merchant's system rather than the customer's browser, for an amount that has nothing to do with what the customer searched for or added anywhere. Card networks are built to notice exactly that pattern.",
      },
      {
        type: "ul",
        items: [
          "The card expired or was reissued between checkout and the edit - a swap made three weeks after a purchase is a swap made against a card that may no longer exist",
          "Funds that were available at checkout aren't available anymore, even for a small price difference on a swap",
          "The issuing bank's fraud model flags an unscheduled second charge on the same card, days after the first, as anomalous - even when the amount is smaller than the original order",
          "Some payment gateways only ever authorized the original amount at checkout, and need an explicit, separate permission to charge more later - which not every integration actually requests",
        ],
      },
      { type: "h3", text: "Why this is worse than an ordinary decline" },
      {
        type: "p",
        text: "A checkout decline is clean: nothing happened yet, so there's nothing to undo. A decline mid-edit lands in the middle of a transaction that already has a paid order attached to it. The item the customer swapped into may already be reflected on the order. The email that confirmed the change may have already sent. If the payment step fails after that, the order is now telling two different stories at once - one where the swap happened, and one where it was never paid for - and something has to decide which one is true.",
      },
      {
        type: "quote",
        text: "A decline at checkout stops a sale that never happened. A decline mid-edit interrupts one that already did.",
      },
      { type: "h2", text: "Decide what the order does before the decline happens, not after" },
      {
        type: "p",
        text: "There are really only two honest answers to \"what happens when the charge fails,\" and either one works - what doesn't work is leaving the answer undecided until a support agent is staring at a mismatched order and guessing.",
      },
      {
        type: "ul",
        items: [
          "Roll back automatically - the order reverts to exactly what it was before the edit was attempted, and the customer sees a plain explanation of why, with a chance to try again",
          "Hold the edit pending - the requested change is recorded but not applied to what ships, and the order waits for a successful charge before the new item is picked or the old one is dropped",
          "Whichever path you pick, the item never becomes fulfillable before its charge has actually cleared - a rollback and a pending hold both protect that; only a silent \"apply now, sort out payment later\" doesn't",
          "Retry the same card once automatically before asking the customer to do anything - a chunk of declines are transient (a temporary hold, a bank's system blip) and clear on a second attempt seconds later",
          "If the retry fails too, give the customer a live way to enter a different card and try again on the spot, in the same flow they're already in, instead of an email asking them to call in",
        ],
      },
      { type: "h2", text: "Don't let \"edited\" and \"paid\" become two different facts" },
      {
        type: "p",
        text: "The same audit trail that already logs what changed on an order and when needs a second dimension: whether the charge behind that change actually succeeded. \"This order was edited\" and \"this order's edit was paid for\" are different facts, and collapsing them into one is exactly how a support agent ends up looking at an order that appears to have shipped a large when the customer was only ever charged for a medium.",
      },
      {
        type: "p",
        text: "That distinction matters most during a reconciliation, not during the edit itself. Someone matching shipped inventory against collected revenue at month-end needs to be able to tell, from the order alone, that a swap was requested, its charge declined twice, and the order rolled back - not just that the order shows an edit with no note about what happened to the payment behind it.",
      },
      {
        type: "p",
        text: "None of this needs a second payment system. If your order edits already settle in place - charging the difference automatically through Shopify's native Order Editing API rather than a cancel-and-reorder workaround - a failed charge is just an outcome that same settlement step needs to handle explicitly, instead of assuming success and moving on.",
      },
      {
        type: "ol",
        items: [
          "Decide once whether a failed edit charge rolls back the order or holds it pending - and apply that decision the same way every time, not per ticket.",
          "Never let an edit's line items become fulfillable before its charge has actually cleared.",
          "Retry the same card automatically once before asking the customer to act - most transient declines clear on the second attempt.",
          "Give the customer a live retry-with-a-new-card option in the edit flow itself, not a support email loop.",
          "Log payment state - succeeded, declined, retried, rolled back - on the order's audit trail as its own fact, separate from what changed.",
        ],
      },
      {
        type: "p",
        text: "Most order-edit charges succeed quietly, the same way most checkout charges do. The ones that don't are where a self-service edit either holds up under pressure or quietly drifts out of sync with what the customer actually paid for. Decide the fallback in advance, gate fulfillment on the charge instead of the edit, and log the two facts separately - and a declined card stops being an incident and goes back to being what it should have been all along: a retry screen.",
      },
    ],
  },
  {
    slug: "how-long-should-your-shopify-order-edit-window-be",
    title: "How long should your Shopify order-edit window actually be?",
    excerpt:
      "Most stores pick an edit window - 24 hours, 12 hours, \"until it ships\" - by gut feel, then leave it alone. The right number isn't a guess. It comes from your actual pick-to-ship time, and it's really two settings, not one.",
    category: "PLAYBOOK",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "How Long Should a Shopify Order-Edit Window Be? A Practical Guide",
    metaDescription:
      "A Shopify order-edit window set by gut feel either closes too early or stays open past your fulfillment cutoff. Here's how to size it from actual pick-to-ship time, and why it needs a second, operational cutoff behind it.",
    body: [
      {
        type: "p",
        text: "Turn on self-service order editing and the first setup question is always the same: how long should customers be able to change an order after they place it? Most stores answer it once, pick a round number - 24 hours is the common default - and move on. It's a guess dressed up as a policy, and it's wrong in one of two directions almost every time.",
      },
      {
        type: "p",
        text: "Set it too short and a customer who notices a wrong size ten minutes after checkout, but on a day your warehouse hasn't touched the order yet, gets turned away from an edit that would have been perfectly safe to make. Set it too long and a customer edits an order on the exact afternoon it's already been picked, packed, and labeled - and now a warehouse worker is holding a box that no longer matches what's inside it. Neither failure is rare, because a flat number was never measuring the thing that actually matters.",
      },
      {
        type: "p",
        text: "The mistake isn't picking the wrong number of hours. It's assuming one flat number can stand in for how fast your warehouse actually moves.",
      },
      { type: "h2", text: "A wall clock isn't your fulfillment pipeline" },
      {
        type: "p",
        text: "\"24 hours\" is a promise about time. Whether an order can still be safely edited is a fact about a warehouse - specifically, whether anyone has started picking it yet. Those two things drift apart constantly. An order placed at 11pm on a Tuesday might sit untouched until the morning batch runs at 9am - eleven hours of real safety hiding inside a 24-hour window that makes it look like there's a full day to spare. An order placed at 8am on a Black Friday, when the warehouse is clearing the queue in real time, might be picked within the hour - meaning a 24-hour window is already a lie by 9:05am.",
      },
      {
        type: "p",
        text: "Multi-location fulfillment makes the gap worse, not better. An order split across two warehouses, or routed to whichever location has stock that day, doesn't have one pick time - it has however many the split creates, each on its own clock. A single edit window applied uniformly is measuring the average case and getting the actual case wrong most of the time.",
      },
      { type: "h3", text: "Same problem, different shape, at Black Friday volume" },
      {
        type: "p",
        text: "The gap between the wall clock and the warehouse floor doesn't stay constant either - it compresses hardest exactly when order volume spikes. A pick time that's normally six hours can drop to ninety minutes when a promotion pushes a week of normal volume through a single day. A window sized for an ordinary Tuesday is already too generous the moment the calendar hits your busiest weekend, and nobody adjusts it in time because nobody's watching the pipeline speed up in real time - they're watching the order count.",
      },
      {
        type: "quote",
        text: "The clock on the checkout page and the clock on the warehouse floor are not the same clock.",
      },
      { type: "h2", text: "You actually need two cutoffs, not one" },
      {
        type: "p",
        text: "The fix isn't a smarter guess at the hour count - it's splitting one setting into the two different things it was always doing. The first is a customer-facing promise: an edit window, stated in plain hours, so a shopper knows what to expect the moment they check out. The second is an operational gate: a fulfillment cutoff, checked against the order's actual status at the moment the edit is submitted, not against the clock.",
      },
      {
        type: "ul",
        items: [
          "Edit window - the hours you advertise to the customer (\"you can change this order for 24 hours\"), set generously enough to cover a normal pick delay",
          "Fulfillment cutoff - the real gate, evaluated against the order's current status - not yet picked, not yet packed, not yet labeled - at the exact moment the edit is attempted",
          "The cutoff always wins - an order inside its 24-hour window that's already been picked is not editable, no matter how much of the window is left",
          "The window is what you promise; the cutoff is what you actually enforce",
        ],
      },
      {
        type: "p",
        text: "This is also why the eligibility check has to run at submission time, not at page-load time. A customer can open the edit page while an order is still safely unpicked, spend four minutes deciding between two colors, and submit the change after the warehouse has already started on it. If the only check was \"is this order less than 24 hours old,\" that edit sails through and lands on a box that's already sealed. Checking fulfillment status again at the moment of submission - not just when the page rendered - is what actually closes that gap.",
      },
      { type: "h2", text: "Not every edit needs the same cutoff" },
      {
        type: "p",
        text: "The risk an edit carries isn't uniform, so the cutoff protecting against it shouldn't be either. A shipping address correction doesn't touch what's in the box - it can stay open right up until a label prints, since even a picked-and-packed order can still ship to a corrected address. A variant swap or an added item does touch what's in the box, so it needs to close the moment picking starts, not when the label prints later. Applying one fulfillment cutoff to every edit type means either the address fix closes earlier than it needs to, or the swap stays open later than it should.",
      },
      {
        type: "ol",
        items: [
          "Measure your actual pick-to-ship time by fulfillment location, not a single company-wide average.",
          "Set the customer-facing edit window generously enough to cover a normal pick delay, so it rarely blocks a legitimate request.",
          "Set a separate fulfillment cutoff, keyed to real order status, that overrides the window the moment picking starts.",
          "Re-check the fulfillment cutoff at the moment an edit is submitted, not just when the edit page loads.",
          "Give address corrections a later cutoff than variant swaps and added items, since only one of those changes what's in the box.",
        ],
      },
      {
        type: "p",
        text: "None of this needs a bigger review queue to get right - it needs the eligibility check to run against the right signal. A flat number is easy to configure and wrong in both directions. A window paired with a status-based cutoff, checked again at the moment the customer actually confirms, tells the truth about what's still changeable and closes the door the instant it isn't - so \"can I still edit this?\" has one honest answer instead of a guess about how many hours have passed.",
      },
    ],
  },
  {
    slug: "why-exchange-rates-dont-match-on-shopify-order-edits",
    title: "Why one Shopify order edit can use two different exchange rates",
    excerpt:
      "Add an item to an international order and Shopify prices it at today's exchange rate. Increase the quantity of something already on it, and the rate from the day of checkout applies instead - two rates, one receipt. Here's why that split is intentional, and how to keep it from reading as a mistake.",
    category: "PLAYBOOK",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "Why Shopify Order Edits Use Two Exchange Rates at Once",
    metaDescription:
      "Editing an international Shopify order can price different lines at different exchange rates on the same receipt. Here's why, and how to handle it in self-service editing.",
    body: [
      {
        type: "p",
        text: "A customer in Toronto checks out in Canadian dollars, and Shopify converts the total from your store's USD prices at that day's rate. A week later they open the order to add a second item, and it's priced at a new conversion - the rate moved, so the added line and the original lines are now technically priced at two different exchange rates on the same order. Then a different customer bumps the quantity on something they already bought, and that line keeps the original rate instead of picking up today's, even though it's changing the same way the new item did.",
      },
      {
        type: "p",
        text: "Neither of those is inconsistent behavior from whatever order-editing tool you're running - it's how Shopify's own order editing handles currency by design. A new item added to the order is converted at the foreign exchange rate current at the moment of the edit. A quantity increase or decrease on an item that was already there is converted at the rate from when the order was originally placed, specifically so the customer isn't hit by a currency swing on something they already bought. Two rules, two outcomes, and both are correct - just not obviously so on a single receipt.",
      },
      {
        type: "p",
        text: "The mistake isn't that two rates exist. It's assuming one order means one exchange rate, and building a self-service edit flow - or a finance reconciliation - on that assumption.",
      },
      { type: "h2", text: "Which edit uses which rate" },
      {
        type: "p",
        text: "This only matters for orders placed and edited in different currencies - a store selling in USD with Shopify Markets converting to the customer's local currency, for instance. Once you're in that territory, the rate applied depends entirely on what kind of edit it is, not on when the edit happens to be made.",
      },
      {
        type: "ul",
        items: [
          "Adding a brand-new line item - converted at the exchange rate current at the moment of the edit, not the rate from checkout",
          "Increasing the quantity of an existing line - converted at the exchange rate from when the order was originally placed, even if today's rate is different",
          "Removing an item or lowering its quantity - also settled at the original order's rate, so the refund matches what the customer actually paid for that unit",
          "A variant swap - functionally a removal plus an addition, so the two halves of the same swap can land on two different rates: the removed side settles at the original rate, the added side prices at today's",
        ],
      },
      { type: "h3", text: "Why the swap case is the one that trips people up" },
      {
        type: "p",
        text: "A straight add or a straight quantity change is easy to reason about once you know the rule. A swap is where it gets confusing, because it looks like one action to the customer - trade the medium for a large - but it's two conversions under the hood, on two different rates, netted into one price difference. If the currency has moved much between checkout and the edit, that net difference won't match a simple back-of-envelope conversion of the price gap between the two variants, and it'll look like the math is wrong even when it isn't.",
      },
      {
        type: "quote",
        text: "The customer sees one edit. The currency conversion sees two transactions, on two dates, at two rates.",
      },
      { type: "h2", text: "Where this actually costs you" },
      {
        type: "p",
        text: "For the customer, it's a receipt that doesn't reconcile against a currency converter if they check - the total for their swap or add-on doesn't match multiplying today's rate by the price difference, because part of it was never priced at today's rate to begin with. That reads as an overcharge even when the order is exactly correct, and it's a hard thing to explain in a one-line support reply.",
      },
      {
        type: "p",
        text: "For your books, it's a reconciliation gap. Someone matching converted revenue against your accounting currency at month-end will find edited international orders that don't tie out to any single day's rate, because they were never converted at just one. Multiply that by every cross-border edit in a given month, and it turns into a recurring line someone has to explain rather than a one-off exception.",
      },
      { type: "h2", text: "Build the edit flow around both rates, not one" },
      {
        type: "p",
        text: "None of this needs a workaround - the behavior is intentional, and reversing it would mean re-exposing customers to currency risk on purchases they already locked in. The fix is making sure your edit flow, and whoever reconciles behind it, both know which rate applies to which line before either one is surprised by it.",
      },
      {
        type: "ul",
        items: [
          "Price every add and swap using the actual rate that will apply at confirmation, not an estimate based on the order's original total, so what the customer sees before they confirm matches what they're charged",
          "Treat a variant swap as two conversions in your own price-difference math - the removed item at the original rate, the added item at today's - instead of a single subtraction that assumes one rate for both",
          "Log which exchange rate applied to which line on the order's audit trail, so a reconciliation question doesn't require re-deriving it from historical rate tables after the fact",
          "If a customer asks why a swap didn't cost exactly what they expected, the honest answer is specific: part of the price came from today's rate, part from checkout's - not a generic \"currency fluctuation\" explanation",
        ],
      },
      {
        type: "p",
        text: "This is also just one more input to the settlement your edit flow is already doing. If price differences already charge or refund automatically on the original payment, the exchange rate is simply which number gets used for which line in that same calculation - not a separate system, and not something that needs correcting.",
      },
      {
        type: "ol",
        items: [
          "Know, before you launch self-service editing internationally, which edit types price at today's rate and which price at the original rate.",
          "Show the customer a total computed with the actual rates that will apply, not a shortcut estimate, before they confirm an add or a swap.",
          "Split swap math into its removed and added halves instead of netting them as if one rate applied to both.",
          "Log the rate applied to each line on the order's audit trail, so finance can reconcile without reconstructing it by hand.",
        ],
      },
      {
        type: "p",
        text: "A single exchange rate on a receipt is easy to trust. An edited international order can carry two, correctly, because Shopify deliberately protects what a customer already bought from currency swings while pricing anything new at the current rate. Know which rule applies to which line, show it before the customer confirms, and log it on the order - and a receipt that looks like a math error stays what it actually is: two correct numbers that happen to come from two different days.",
      },
    ],
  },
  {
    slug: "sales-tax-doesnt-recalculate-on-order-edits",
    title: "Why sales tax doesn't recalculate when you edit a Shopify order",
    excerpt:
      "A customer adds an item or moves their shipping address to a different state, and the tax line on the order stays exactly what it was at checkout - because nothing told the tax engine the order had changed. Here's why that happens, and how to settle tax the same way you already settle price.",
    category: "PLAYBOOK",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "Why Sales Tax Doesn't Recalculate on Shopify Order Edits",
    metaDescription:
      "Editing a Shopify order after checkout doesn't automatically recalculate sales tax. Here's why the total can be wrong after an edit, and how to settle tax the same way you settle price.",
    body: [
      {
        type: "p",
        text: "A customer adds a second item to an order that already shipped its confirmation email, and the new line comes in with no tax on it at all. Or they catch a typo in their shipping address and correct it from one state to a neighboring one - a real fix, filed through the same edit flow as any other address change - and the tax amount on the order doesn't move, even though it's now calculated against the wrong state entirely.",
      },
      {
        type: "p",
        text: "Neither of these is a bug in whatever order-editing tool you're running. Sales tax is calculated once, at checkout, by a tax engine that looks at the shipping destination and the tax class of each item in the cart at that moment. Editing the order after the fact - adding a line, swapping a variant, correcting an address - doesn't automatically ask that engine to run again. Unless the edit flow explicitly re-triggers a tax calculation, the number from checkout just carries forward, whether or not it's still correct.",
      },
      {
        type: "p",
        text: "The mistake isn't that tax was calculated at checkout. It's assuming a number computed once stays right after the order it was computed against has changed.",
      },
      { type: "h2", text: "Three edits that quietly change the tax owed" },
      {
        type: "p",
        text: "None of these are exotic. They're the same edit types every self-service flow already handles - they just happen to touch a number most edit flows never look at.",
      },
      {
        type: "ul",
        items: [
          "Adding a line item after checkout - the new item needs its own tax calculated against the order's destination, not a free pass because it arrived after the original total was taxed",
          "Swapping into or out of a tax-exempt category - in states where clothing is exempt below a price threshold, like New York's $110 cutoff, a swap can cross that line in either direction, and carrying over the old item's tax treatment gets it wrong",
          "Changing the shipping address to a different state, province, or country - tax is jurisdiction-specific, so a corrected address can mean a different rate, a different exemption, or in some cases a jurisdiction you don't collect tax in at all",
        ],
      },
      { type: "h3", text: "Why this isn't a rounding error" },
      {
        type: "p",
        text: "Under-collect and the gap doesn't show up as a complaint - it shows up at filing time, when whoever reconciles collected tax against remitted tax finds a mismatch on orders that were edited after checkout. It's a quiet, recurring shortfall you end up covering yourself, order by order, because the customer was never charged the difference and the state still expects it.",
      },
      {
        type: "p",
        text: "Over-collect and it's the opposite problem: a customer whose corrected address now sits in a lower-tax or no-tax jurisdiction gets charged a rate that no longer applies to them, on a total that's supposed to reflect exactly where their order is going. That's a receipt that doesn't match what they know their state charges - which reads as a mistake even when it's really just a stale number.",
      },
      {
        type: "quote",
        text: "The order total already settles automatically when you edit it. Tax is part of that total - it just isn't part of the settlement unless something asks it to be.",
      },
      { type: "h2", text: "Recalculate tax the same way you recalculate price" },
      {
        type: "p",
        text: "The fix isn't a second tax system. It's routing every edit that changes what's in the order, or where it's going, through the same tax calculation that already ran at checkout - instead of assuming the original number still applies because nothing else about the settlement looked wrong.",
      },
      {
        type: "ul",
        items: [
          "Recalculate tax on every edit that adds, removes, or swaps a line item - not only on edits that touch the address",
          "Recheck the destination's jurisdiction on every address edit, and apply that jurisdiction's rate and exemptions to the whole order, not just the field that changed",
          "Use the actual tax class of whatever item is being added or swapped in, so a move into or out of an exempt category is treated correctly instead of inheriting the old line's treatment",
          "Settle the tax difference automatically, in the same charge or refund that settles the price difference - not a manual correction someone has to remember to make",
          "Log the recalculated tax alongside the rest of the edit's audit trail, so a filing question later already has an answer attached instead of starting a reconciliation project",
        ],
      },
      { type: "h2", text: "This shows up in your books before it shows up as a complaint" },
      {
        type: "p",
        text: "Every other edit-flow gap in this series eventually reaches a customer, who notices and writes in. A tax mismatch usually doesn't - it sits quietly on the order until someone reconciling collected tax against what was actually remitted finds a number that doesn't tie out, on orders that trace back to the same cause: an edit that changed the order without recalculating tax against it. That's a harder problem to catch than a support ticket, because nobody's complaining about it in real time.",
      },
      {
        type: "p",
        text: "None of this needs a separate tax engine bolted onto your edit flow. If your order edits already settle in place - charging or refunding the price difference automatically through Shopify's native Order Editing API - the tax recalculation is just one more input to that same settlement, run at the moment of the edit instead of assumed from checkout. The same eligibility rules that already decide which edits auto-apply and which need a human look are the right place to trigger it, since a jurisdiction change is exactly the kind of signal worth flagging for review in the first place.",
      },
      {
        type: "ol",
        items: [
          "Route every edit that changes line items or the shipping destination through the same tax calculation used at checkout, not a shortcut that reuses the original number.",
          "Recheck the destination's jurisdiction on every address edit, and apply its rate and exemptions to the whole order.",
          "Use the real tax class of whatever item is being added, removed, or swapped in.",
          "Settle the tax difference automatically, alongside the price difference, on the same charge or refund.",
          "Log the recalculated tax on the order's audit trail, so a filing question doesn't turn into a reconstruction project.",
        ],
      },
      {
        type: "p",
        text: "A tax total calculated once at checkout is correct exactly until something about the order changes. Editing it afterward - adding a line, swapping a variant, fixing an address - doesn't ask that number to catch up on its own. Recalculate it the same way you already recalculate price, and a gap that would otherwise surface at filing time never opens up in the first place.",
      },
    ],
  },
  {
    slug: "which-shopify-orders-cant-be-edited",
    title: "The orders your self-service editor can't touch - and what to show instead of a dead end",
    excerpt:
      "Gift cards, cash on delivery, and line items that already shipped all break the one thing self-service order editing depends on: a payment it can adjust automatically. Here's how to spot those orders ahead of time and give the customer a real next step instead of an error.",
    category: "GUIDE",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "Which Shopify Orders Can't Be Self-Edited (and What to Do)",
    metaDescription:
      "Self-service order editing settles by adjusting the original payment - which doesn't work for every order. Here's how to spot gift-card, COD, and fulfilled-item orders ahead of time, and what to show the customer instead of a dead end.",
    body: [
      {
        type: "p",
        text: "A customer opens the same order-edit link that worked fine on their last order, picks a different size, and hits a wall instead of a confirmation: this order can't be edited right now. Nothing on the page says why. To them, the feature that worked yesterday just stopped working today, on an order that looks identical to any other.",
      },
      {
        type: "p",
        text: "It isn't random, and it isn't a bug. Self-service editing works by adjusting the same payment authorization Shopify created at checkout - capturing a little more, refunding the difference, all without a second transaction or a new order number. That only works when the original payment can actually be adjusted after the fact. Some orders can't be, and it has nothing to do with the customer, the item, or how fast they asked. It's a property of how the order was paid for, or what's already happened to it since.",
      },
      {
        type: "p",
        text: "The mistake isn't that some orders can't be edited automatically. It's leaving the customer to discover that from a dead end, instead of knowing it ahead of time and having a real next step ready.",
      },
      { type: "h2", text: "The orders that structurally can't be edited" },
      {
        type: "p",
        text: "None of these are policy choices - they're cases where there's no payment to adjust, or no line item left to change. A rule engine can flag them before the customer ever sees the edit option, but no rule can talk its way around them.",
      },
      {
        type: "ul",
        items: [
          "Orders paid entirely with a gift card or store credit - there's no card to authorize an additional charge against, so an edit that raises the total has nowhere to settle",
          "Orders paid through a manual method - cash on delivery, bank transfer, wire - since there's no gateway to capture or refund automatically on your behalf",
          "Orders that are already fully refunded or canceled - the payment record the edit would adjust doesn't exist anymore, so an edit here is really a new sale, not a swap",
          "Line items that have already been fulfilled - an edit can still touch what's waiting to ship, but not what already left the warehouse in a box",
          "Orders with an open return or exchange against a line item - until that resolves, the item is mid-transaction somewhere else and isn't eligible for a second edit at the same time",
        ],
      },
      { type: "h3", text: "Why this shouldn't become a bigger review queue" },
      {
        type: "p",
        text: "The tempting fallback is to route anything uncertain to a human, the same instinct that makes stores over-queue approvals out of general caution. It's the wrong move here for a different reason: these aren't judgment calls. A gift-card-only order doesn't become editable because someone reviews it harder - the payment method still can't take an additional charge. Sending it to a review queue just delays the same dead end by a day and adds a ticket on top.",
      },
      {
        type: "quote",
        text: "A self-service edit that can't complete isn't a safer version of editing. It's a support ticket with extra steps in front of it.",
      },
      { type: "h2", text: "Show the right dead end, not a blank one" },
      {
        type: "p",
        text: "The fix isn't making these orders editable - some of them structurally can't be. It's checking payment method and order status before the edit option ever renders, so the customer never fills out a change that was going to fail anyway, and knows exactly what to do instead.",
      },
      {
        type: "ul",
        items: [
          "Check the payment method and order status before showing the edit flow, not after the customer submits a change and waits for it to fail",
          "State the reason in plain language - \"this order was paid by gift card, so we can't automatically adjust the charge\" - instead of a generic error",
          "Route to a pre-filled support message when self-service genuinely isn't possible, with the order number and the specific reason already attached",
          "Keep whatever is still possible open anyway - an address correction that doesn't touch the payment can go through even on an order where a price-changing swap can't",
        ],
      },
      { type: "h2", text: "Where this belongs: your rules, not your exceptions" },
      {
        type: "p",
        text: "The same eligibility engine that already decides edit windows and per-action rules is the right place for this check too - it just needs to run first. Payment method and order state aren't a threshold to tune per store the way a price-delta or a fulfillment cutoff is. They're a fixed no, and they should be checked before any of the tunable rules even get evaluated.",
      },
      {
        type: "ol",
        items: [
          "Flag orders paid by gift card, store credit, or a manual method as edit-restricted at checkout, not discovered later when a customer tries to use them.",
          "Scope every edit to unfulfilled line items only - once an item ships, the path back is a return, not an edit.",
          "Block edits automatically on canceled, refunded, or return-in-progress orders, without a queue in between.",
          "Show the reason in plain language and a specific next step, not a generic error message.",
          "Leave non-price edits, like address corrections, available wherever they don't depend on the payment method at all.",
        ],
      },
      {
        type: "p",
        text: "Most orders can be edited in place without anyone noticing the machinery underneath. A handful can't, for reasons that have nothing to do with the customer's request and everything to do with how the order was paid or what's already happened to it. Check for those up front, say so plainly, and point to what's still possible - and the exception stops looking like a broken feature and starts looking like an honest answer.",
      },
    ],
  },
  {
    slug: "discount-codes-that-dont-carry-into-order-edits",
    title: "Why your discount code doesn't follow the item a customer just added",
    excerpt:
      "A customer adds an item to an already-discounted order, and the new item shows up at full price - because the code that applied at checkout was never told the order would change. Here's how to decide the rule and stop the ticket before it's sent.",
    category: "PLAYBOOK",
    date: "2026-07-06",
    author: "The AppFox Team",
    metaTitle: "Why Discount Codes Don't Apply to Shopify Order Edits",
    metaDescription:
      "When a customer adds an item during a Shopify order edit, the original discount code often doesn't cover it. Here's why - and how to set the rule so it doesn't become a ticket.",
    body: [
      {
        type: "p",
        text: "A customer checks out with SUMMER20 applied, gets 20% off the whole cart, and the confirmation email reflects it. A day later they open the order to add a second item - a color they wished they'd grabbed the first time - and the new line comes in at full price. Same order, same discount code, same customer, and now two prices that don't match on one receipt.",
      },
      {
        type: "p",
        text: "This isn't a bug in whatever order-editing tool you're running. Discount codes are evaluated once, at checkout, against the line items that exist at that moment. Shopify's order editing lets you add a line item after the fact, but adding one doesn't re-run the discount logic that applied to the original cart - the new item simply isn't part of the transaction the code was checked against. Nothing recalculates unless something is built to make it recalculate.",
      },
      {
        type: "p",
        text: "The mistake isn't letting customers add to an order after checkout. It's assuming a discount that applied once keeps applying to whatever gets added next, when nothing in the system actually checks that.",
      },
      { type: "h2", text: "Two ways this goes wrong, and both cost you" },
      {
        type: "p",
        text: "Leave it unaddressed and the customer sees a full-price line item sitting next to discounted ones on the same order, with no explanation attached. To them, it looks like the code stopped working, not like the code was never eligible for an item that didn't exist yet. That's a support ticket at best, and a chargeback dispute at worst, over a total that was actually correct.",
      },
      {
        type: "p",
        text: "Fix it by hand, order by order, and you've traded one problem for another. Someone has to notice the mismatch, manually apply a matching discount to the new line, and issue a partial refund for the difference - a few minutes of work that doesn't scale past a handful of edits a week. Worse, it's inconsistent: whichever agent is on shift decides whether that customer's add-on gets the discount, so two customers with identical requests can get two different outcomes depending on who read the ticket.",
      },
      { type: "h2", text: "Decide the rule once, based on what kind of discount it is" },
      {
        type: "p",
        text: "Not every discount should behave the same way when the order changes shape. A storewide percentage-off code is a different case from a specific-product markdown or a buy-one-get-one offer, and treating them identically produces the wrong answer for at least one of them. This is a decision worth making per discount type, in advance, rather than re-litigating on every ticket.",
      },
      { type: "h3", text: "What a discount rule for order edits needs to cover" },
      {
        type: "ul",
        items: [
          "Order-level percentage or fixed-amount codes - decide whether they extend to items added after checkout, or only ever applied to what was in the cart at that moment",
          "Product- or collection-specific discounts - check whether the added item is even eligible before applying anything, since a code scoped to one collection has no business discounting an add from a different one",
          "BOGO and threshold offers - re-evaluate the condition on every edit, since adding an item can newly qualify an order for an offer it missed the first time, not just extend one it already had",
          "Whichever rule you pick, settle the price difference automatically the moment the edit is confirmed - not as a manual adjustment someone has to remember to make",
          "Show the customer, before they confirm the add, whether the discount will apply to the new item - so the receipt never contradicts what they expected",
        ],
      },
      {
        type: "quote",
        text: "A discount code isn't a fact about the order. It's a rule about which items it covers - and an edit changes which items exist.",
      },
      { type: "h2", text: "Make the extension a feature, not just a fix" },
      {
        type: "p",
        text: "If you're already showing post-purchase upsells inside the order-edit flow, an unclear discount is the fastest way to kill one. A customer deciding whether to add the matching item is weighing a specific price against what they already paid - and if that price is ambiguous until after they confirm, some of them won't risk it. Stores that extend an order-level discount to post-purchase adds, and say so plainly before the customer confirms, turn a source of confusion into a reason to add one more thing while they're already in the flow.",
      },
      {
        type: "p",
        text: "That doesn't mean every discount should extend automatically. A deep clearance code meant for one product shouldn't quietly discount something else it was never scoped to cover - that's a margin leak, not a courtesy. The point isn't generosity by default. It's that the customer should know the answer before they confirm, instead of finding out from the receipt.",
      },
      { type: "h2", text: "Where this actually gets enforced" },
      {
        type: "p",
        text: "None of this needs a separate discount engine. If your order edits already settle in place - charging or refunding the price difference on the original payment - the discount check is just one more input to that same settlement, evaluated at the moment of the edit instead of assumed from checkout. The same audit trail that already logs what changed on an order is where the discount decision belongs too, so a later question about why one line was discounted and another wasn't doesn't require reconstructing it from memory.",
      },
      {
        type: "ol",
        items: [
          "Classify your active discount types by how they should behave on an order edit - extend, re-evaluate, or stay scoped to the original items.",
          "Re-check discount eligibility on every edit that adds or changes a line item, not just at checkout.",
          "Settle the resulting price difference automatically, the same way you settle any other edit.",
          "Show the discount outcome inside the edit flow before the customer confirms, so the receipt never surprises them.",
          "Log the discount decision on the order's audit trail, so a later question already has an answer attached.",
        ],
      },
      {
        type: "p",
        text: "A discount code is easy to get right at checkout, because checkout only evaluates it once, against whatever's in the cart at that instant. An order edit adds a line item the code was never checked against, and if nothing re-evaluates it, the customer is left holding a receipt that looks broken even when the math is technically correct. Decide the rule per discount type, apply it automatically, and show it before they confirm - and the mismatch stops being a ticket.",
      },
    ],
  },
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
