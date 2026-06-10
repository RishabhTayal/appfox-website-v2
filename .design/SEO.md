# AppFox SEO Implementation Plan - Next.js 16 App Router

All URLs below use the token `{{SITE_URL}}` = `site.url` from `/Users/rishabhtayal/Desktop/code/appfox-order-edit-app-website/lib/site.ts` (currently `https://getappfox.com`). Never hardcode the domain - every emitter (metadata, JSON-LD, sitemap, robots, OG images) imports from `lib/site.ts`. Verified against this repo's Next.js docs (`node_modules/next/dist/docs/01-app/...`): `metadata`/`generateMetadata` are Server-Component-only, `params` is a **Promise**, and file-convention metadata (`opengraph-image.tsx`) **overrides** `metadata.openGraph.images` - both facts shape the plan below.

---

## 1. Keyword map

| Route | Primary keyword | Secondaries |
|---|---|---|
| `/` | **shopify order editing app** | let customers edit orders shopify · order edit app shopify · post purchase upsell app shopify |
| `/features` | **self-service order editing shopify** | shopify customer order edit portal · shopify change shipping address after order · shopify order cancellation app |
| `/pricing` | **order editing app pricing shopify** | free order editing app shopify · shopify upsell app no revenue cap |
| `/vs` (hub) | **best order editing app shopify** | order editing apps compared · cleverific alternatives · orderediting.com alternative |
| `/vs/cleverific` | **cleverific alternative** | appfox vs cleverific · cleverific pricing per edit |
| `/vs/aftersell` | **aftersell alternative** | appfox vs aftersell · post purchase upsell vs order editing |
| `/vs/edit-order` | **edit order app alternative** | appfox vs edit order cleverific · customer vs admin order editing shopify |
| `/vs/orderediting` | **orderediting.com alternative** | appfox vs orderediting · orderediting pricing |
| `/vs/orderify` | **orderify alternative** | appfox vs orderify · cancel and reorder shopify fees · shopify payments fees not refunded cancellation |
| `/vs/reconvert` | **reconvert alternative** | appfox vs reconvert · thank you page upsell vs order edit upsell |
| `/vs/selfserve` | **selfserve order edits alternative** | appfox vs selfserve · order editing app without order caps |

Intent notes: home targets the category head term; `/features` owns the long-tail "can customers edit orders on shopify" question cluster (the FAQ copy already answers it verbatim - keep that exact phrasing in an H3); `/vs/orderify` is the natural ranker for the high-intent "cancel and reorder fees" research query - the framing copy already contains it.

---

## 2. Per-route metadata

### Title template (root layout, `app/layout.tsx`)

```ts
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: "%s | AppFox",
    default: "Shopify Order Editing App - Self-Service + Upsells | AppFox", // 59 chars
  },
  description: "…home description below…",
  applicationName: site.appName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AppFox",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};
```

`/vs/[slug]` titles already contain "AppFox", so they use `title: { absolute: ... }` to avoid "…Compared | AppFox" redundancy. All lengths verified: titles ≤60, descriptions 140–160.

| Route | `<title>` (chars) | Meta description (chars) | Canonical |
|---|---|---|---|
| `/` | `Shopify Order Editing App - Self-Service + Upsells \| AppFox` (59, via `default`) | `Give every Shopify order a self-service edit link - address fixes, size swaps, cancellations - plus one-click upsells in the flow. Install free in 5 minutes.` (157) | `{{SITE_URL}}/` |
| `/features` | `Self-Service Order Editing Features for Shopify \| AppFox` (56) | `Tokenized edit links, eligibility rules, approval queues, automatic refunds, and in-flow upsells - the full AppFox tour. Start free, 5-minute setup, no code.` (157) | `{{SITE_URL}}/features` |
| `/pricing` | `Pricing - Shopify Order Editing App from $0 \| AppFox` (52) | `Free plan with 50 edits/mo. Unlimited edits and upsells from $19/mo, no per-edit fees or revenue caps. Start your 14-day free trial - no card required.` (151) | `{{SITE_URL}}/pricing` |
| `/vs` | `Compare Order Editing Apps for Shopify \| AppFox` (47) | `Side-by-side comparisons of AppFox and 7 Shopify order editing and upsell apps - pricing, edit types, in-place vs cancel-reorder. Find the right fit free.` (154) | `{{SITE_URL}}/vs` |
| `/vs/cleverific` | `AppFox vs Cleverific: Shopify Order Editing Compared` (52, absolute) | `Cleverific meters staff-side edits per edit; AppFox gives customers self-service editing at one flat price. Compare pricing and features, then start free.` (154) | `{{SITE_URL}}/vs/cleverific` |
| `/vs/aftersell` | `AppFox vs AfterSell: Order Editing + Upsells Compared` (53) | `AfterSell upsells at checkout but can't edit orders; AppFox puts upsells inside a self-service edit flow. See the full comparison and install AppFox free.` (154) | `{{SITE_URL}}/vs/aftersell` |
| `/vs/edit-order` | `AppFox vs Edit Order (Cleverific): Full Comparison` (50) | `Edit Order lets staff edit orders in the Shopify admin; AppFox lets customers self-serve ~80% of edits before a ticket exists. Compare both, start free.` (152) | `{{SITE_URL}}/vs/edit-order` |
| `/vs/orderediting` | `AppFox vs OrderEditing.com: Pricing & Features Compared` (55) | `OrderEditing starts at $99/mo with address-validation surcharges; AppFox starts at $0 with flat pricing. Compare features side by side and install free.` (152) | `{{SITE_URL}}/vs/orderediting` |
| `/vs/orderify` | `AppFox vs Orderify: In-Place Edits vs Cancel-Reorder` (52) | `Orderify cancels and reorders, forfeiting 1.5–2.9% in Shopify Payments fees per edit; AppFox edits in place. See the comparison and keep your fees.` (147) | `{{SITE_URL}}/vs/orderify` |
| `/vs/reconvert` | `AppFox vs ReConvert: Order Editing + Upsells Compared` (53) | `ReConvert upsells on the thank-you page but can't resolve order-edit tickets; AppFox does both in one flow. Compare them side by side and start free.` (149) | `{{SITE_URL}}/vs/reconvert` |
| `/vs/selfserve` | `AppFox vs SelfServe: Uncapped Order Editing Compared` (52) | `SelfServe caps order volume and upsell revenue on every tier; AppFox caps neither. Compare pricing, edit types, and controls - then install AppFox free.` (152) | `{{SITE_URL}}/vs/selfserve` |
| `/privacy` | `Privacy Policy \| AppFox` (23) | `How AppFox handles merchant and customer data across the order editing portal, approvals, and analytics. Read the privacy policy or email support@getappfox.com.` (156) | `{{SITE_URL}}/privacy` |
| `/terms` | `Terms of Service \| AppFox` (25) | `The terms that govern your use of AppFox's order editing and upsell app for Shopify - billing, trials, and acceptable use. Questions? Email support@getappfox.com.` (158) | `{{SITE_URL}}/terms` |

**OG fields per page:** `openGraph.title` = the `<title>` without the `| AppFox` suffix; `openGraph.description` = the meta description; `openGraph.url` = the canonical path (relative - resolved by `metadataBase`); image comes from file-convention `opengraph-image.tsx` (§6), so do **not** set `openGraph.images` in the metadata objects (file convention wins anyway and a stale manual entry would mislead). `twitter` inherits OG values; only `card: "summary_large_image"` needs setting (in layout, once). Add `robots: { index: false }` on nothing - all routes are indexable; the 404 page gets `noindex` automatically via `not-found.tsx`.

**Canonical implementation:** every `page.tsx` sets `alternates: { canonical: "/features" }` etc. (relative paths + `metadataBase`). For `/vs/[slug]`, build it in `generateMetadata` from the awaited `params` (remember: `const { slug } = await params`). Pick one trailing-slash policy (Next default: no trailing slash) and 301 `www.getappfox.com` → apex at the host/DNS level.

---

## 3. JSON-LD plan

**Implementation:** one shared component, rendered in the page body (valid placement; Google parses body JSON-LD):

```tsx
// components/json-ld.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
```

All `@id` values are stable anchors so graphs interlink across pages.

### 3a. Root layout - Organization + WebSite (every page)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "{{SITE_URL}}/#organization",
      "name": "AppFox",
      "url": "{{SITE_URL}}/",
      "logo": {
        "@type": "ImageObject",
        "url": "{{SITE_URL}}/logo.png",
        "width": 512,
        "height": 512
      },
      "email": "support@getappfox.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@getappfox.com"
      }
    },
    {
      "@type": "WebSite",
      "@id": "{{SITE_URL}}/#website",
      "url": "{{SITE_URL}}/",
      "name": "AppFox",
      "publisher": { "@id": "{{SITE_URL}}/#organization" }
    }
  ]
}
```

No `SearchAction` (no on-site search). Add `sameAs` (Shopify App Store listing URL, X/LinkedIn) the day they exist - wire it to `site.installUrl` / `site.twitter` so it appears automatically when those stop being placeholders.

### 3b. Home - SoftwareApplication

**Recommendation: OMIT `aggregateRating`. Do not ship it.** Justification:

- Google's review-snippet policy requires ratings to reflect genuine, verifiable, user-accessible reviews. The app is **not yet on the App Store** - the "4.9/5 on Shopify" claim is currently unverifiable by definition. Marking it up is textbook "self-serving review markup on data not collected on or linkable from the page," a known trigger for the *spammy structured markup* manual action, which can suppress **all** rich results site-wide.
- The repo already agrees: `lib/site.ts` documents exactly this decision in the `rating` comment. Honor it; add `aggregateRating` (with `ratingValue`, `ratingCount` pulled from the live listing) only after public reviews exist at a URL you can cite.
- Separately flag to content owners: the on-page "4.9/5 on Shopify" trust bullet carries the same verifiability problem outside of SEO. Centralize it behind `site.rating` so it can be gated/updated in one place at launch (it already is - keep it that way).

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "{{SITE_URL}}/#app",
  "name": "AppFox - Order Editing & Upsell",
  "url": "{{SITE_URL}}/",
  "description": "Self-service order editing and post-purchase upsells for Shopify. Customers fix their own orders through a tokenized link; you keep the revenue.",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Shopify App",
  "operatingSystem": "Web",
  "author": { "@id": "{{SITE_URL}}/#organization" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "0",
    "highPrice": "49",
    "offerCount": 3,
    "offers": [
      { "@type": "Offer", "name": "Free",   "price": "0",  "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Growth", "price": "19", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Pro",    "price": "49", "priceCurrency": "USD" }
    ]
  },
  "featureList": [
    "Self-service order editing portal (tokenized link, no login)",
    "Shipping address changes with validation and autocomplete",
    "Variant swaps, quantity updates, add/remove items, cancellations",
    "Eligibility engine: edit windows, fulfillment cutoffs, per-action rules",
    "Approval queue or auto-apply, per edit type, with audit timeline",
    "Automatic payments and partial refunds on price differences",
    "In-place editing via Shopify's native Order Editing API",
    "Post-purchase upsells inside the edit flow, one-click add",
    "Shopify Flow, Gorgias, and Slack integrations"
  ]
}
```

Prices come from `site.pricing` - do not duplicate literals. (Note: software apps with `offers` are *eligible* for rich treatment only when rating is also present; we accept losing that until the rating is real.)

### 3c. FAQPage - home, pricing, each `/vs/[slug]`

**Policy note (set expectations):** since Aug 2023, Google shows FAQ rich results almost exclusively for authoritative government/health sites - AppFox will almost certainly get **no FAQ rich snippet**. Ship `FAQPage` anyway: it's valid, costs nothing, and is heavily consumed by LLM crawlers/answer engines, which matter for "best order editing app shopify"-type conversational queries. **Hard rule:** only mark up Q&As whose full text is rendered visibly on that page (accordion-collapsed is fine if content is in the DOM).

Home (all 8 FAQ entries from the copy doc, verbatim; first two shown):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "{{SITE_URL}}/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can customers edit their orders on Shopify after checkout?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not by default - Shopify has no built-in way for customers to change an order once it's placed, which is why \"can I change my order?\" tickets exist. An order editing app like AppFox adds a secure self-service portal, linked from the order confirmation email, where customers can fix addresses, swap variants, change quantities, add or remove items, or cancel - all within rules you set."
      }
    },
    {
      "@type": "Question",
      "name": "How do post-purchase upsells work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When a customer opens their order to edit it, AppFox shows offers you've configured directly inside the edit flow. One click adds the product to their existing order - there's no second checkout and no new order number, and any price difference is charged automatically through Shopify. Because the customer is already engaged with their order, it's the highest-attention moment after the sale."
      }
    }
    /* …remaining 6 Q&As, exact on-page text… */
  ]
}
```

Pricing: same shape, `@id: "{{SITE_URL}}/pricing#faq"`, the 5 pricing-FAQ entries verbatim.

`/vs/[slug]`: generate from `data/competitors.ts`. Don't invent questions - derive 3–4 from data already rendered on the page, templated per competitor, e.g. for Orderify: *"Is AppFox better than Orderify for Shopify order editing?"* (answer = the framing line), *"Does Orderify edit orders in place?"*, *"How much does AppFox cost compared to Orderify?"*. Answers must restate only rendered comparison-table facts. Build once in the page component and feed both the visible FAQ section and the JSON-LD from the same array so they can never drift.

### 3d. BreadcrumbList - `/vs/[slug]`

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",    "item": "{{SITE_URL}}/" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "{{SITE_URL}}/vs" },
    { "@type": "ListItem", "position": 3, "name": "AppFox vs {{COMPETITOR_NAME}}" }
  ]
}
```

(Last item carries no `item` - it's the current page.) Render a matching visible breadcrumb (`Home / Compare / AppFox vs X`) above the H1; Google wants markup to mirror visible navigation.

**Do NOT add:** `Product` schema (it's SaaS, `SoftwareApplication` is correct), `Review` schema comparing competitors (self-serving comparative "reviews" violate review policies), or `HowTo` (deprecated for rich results).

---

## 4. `sitemap.ts` and `robots.ts`

Both already exist and are structurally correct. Final state:

**`app/sitemap.ts`** - keep, with two changes: bump `/vs/[slug]` priority to **0.8** (the comparison pages are the primary organic asset; they should outrank `/privacy`-tier signals decisively and sit just under `/features`), and replace `new Date()` with a build-stamped constant per content area so `lastModified` only moves when content actually changes (a `lastUpdated` field on each competitor record in `data/competitors.ts` is the clean source; fall back to a single `CONTENT_UPDATED = "2026-06-09"` const otherwise - a perpetually-fresh `lastModified` teaches Google to ignore the field).

| URL | priority | changeFrequency |
|---|---|---|
| `/` | 1.0 | weekly |
| `/features` | 0.9 | monthly |
| `/pricing` | 0.9 | monthly |
| `/vs` | 0.8 | monthly |
| `/vs/[slug]` ×7 | 0.8 | monthly |
| `/privacy`, `/terms` | 0.2 | yearly |

**`app/robots.ts`** - current file is correct (allow all + sitemap). Final version:

```ts
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
```

Deliberately **no** AI-crawler blocks (GPTBot, ClaudeBot, PerplexityBot): a marketing site for an unlaunched app wants maximum LLM ingestion - being the cited answer to "what's a Cleverific alternative" is the channel. Nothing on the site is crawl-sensitive; there is no `/api`, no auth, no staging path. If a staging deployment exists, gate it with `X-Robots-Tag: noindex` at the host (env-conditional), not in this file.

---

## 5. Internal linking plan

**Global nav (all pages):** `Features` → `/features`, `Pricing` → `/pricing`, `Compare` → `/vs`, `FAQ` → `/#faq` (anchor), CTA `Install free` → `site.installUrl` (external, `rel="noopener"`; do not `nofollow` once it's the real App Store listing).

**Footer (all pages, crawl backbone):** four columns - Product (`Features`, `Pricing`), Compare (**all 7** `/vs/[slug]` links with full anchors: "AppFox vs Cleverific", …, "AppFox vs SelfServe" - this guarantees every comparison page is ≤1 click from anywhere), Legal (`Privacy Policy`, `Terms of Service`), plus the footer tagline. Sitewide footer links to all 7 vs-pages is the highest-leverage single item in this section: these are the pages with real keyword targets.

**Contextual links (in-copy, descriptive anchors):**

| From | To | Anchor (use copy that already exists) |
|---|---|---|
| `/` problem section ("The fee" paragraph) | `/vs/orderify` | "canceling and reordering" |
| `/` features section headline area | `/features` | "see the full feature tour" |
| `/` pricing intro | `/pricing` | "Compare plans" (existing secondary CTA) |
| `/` FAQ answer 1 | `/features` | "order editing app like AppFox" |
| `/` FAQ answer 7 (in-place editing) | `/vs/orderify` | "cancel-and-reorder" |
| `/features` Cluster 3 narrative | `/vs/orderify` | "cancel-and-reorder tools" |
| `/features` Cluster 4 / end of page | `/pricing` | "Growth plan and up" |
| `/pricing` FAQ ("free plan included") | `/features` | "the fully branded portal" |
| `/pricing` bottom | `/vs` | "see how AppFox compares" |
| `/vs` hub | each `/vs/[slug]` | card links, anchor = "AppFox vs {Name}" |
| each `/vs/[slug]` | `/vs` | breadcrumb "Compare" |
| each `/vs/[slug]` | `/pricing` | "flat pricing" / "compare plans" in CTA |
| each `/vs/[slug]` | 2 sibling vs-pages | "Related comparisons" block - pair by theme: editing-focused (cleverific ↔ edit-order ↔ orderediting ↔ orderify ↔ selfserve) and upsell-focused (aftersell ↔ reconvert) |
| `404` | `/`, `/pricing`, `/vs` | existing CTAs ("Back to home" · "See pricing" · "Compare apps") |

Rules: anchors are descriptive phrases, never "click here"; each vs-page receives links from (a) footer, (b) hub, (c) ≥2 siblings, (d) ≥1 contextual money-page link where topical (`orderify` gets the most - it carries the fee-loss argument). All internal links use `next/link` (already prefetch-optimized).

---

## 6. OG image strategy (build-time generated)

Use the file-convention `opengraph-image.tsx` + `ImageResponse` from `next/og`. All routes are static, so images render **at build time** - zero runtime cost. File convention auto-emits `og:image`, `og:image:width/height/type`, and `og:image:alt` (from the `alt` export), and overrides any `metadata.openGraph.images` - so metadata objects stay image-free (§2).

**Files:**
- `app/opengraph-image.tsx` - shared brand layout, inherited by `/`, and segment copies (or re-exports) for `/features`, `/pricing`, `/vs` with a `headline` prop swapped per route.
- `app/vs/[slug]/opengraph-image.tsx` - comparison layout; export `generateStaticParams`-compatible default function receiving `{ params }` (await it), pulling the competitor from `data/competitors.ts`. Also export `alt`, `size = { width: 1200, height: 630 }`, `contentType = "image/png"`.

**Layout A - brand pages (`/`, `/features`, `/pricing`, `/vs`):** dark brand background; AppFox wordmark top-left; one large statement center-left set in Geist Bold ~64px, max 2 lines (home: "Let customers edit their orders - and add to them"; features: "Everything after checkout, handled"; pricing: "Free · $19 · $49 - no per-edit fees"; hub: "Compare order editing apps for Shopify"); bottom strip with three ticks: "5-minute setup · Free plan · Works on every Shopify plan". No screenshots (nothing real to show pre-launch; never mock the App Store UI).

**Layout B - comparison pages:** split card: left panel AppFox wordmark, right panel competitor **name as text** (never their logo - trademark risk), big "VS" divider; beneath, the competitor's one-line framing angle from `data/competitors.ts` (e.g. "In-place edits vs cancel-and-reorder") in ~36px; same bottom trust strip. `alt` = `"AppFox vs {name} - Shopify order editing comparison"`.

**Fonts in ImageResponse:** `next/og` can't use `next/font`; load Geist TTFs from `node_modules/geist/dist/fonts/...` (or vendor two weights into `assets/fonts/`) via `fs.readFile` and pass through the `fonts` option. Two weights max (Regular + Bold) to keep build fast. Keep each PNG well under the 8MB OG limit (these will be ~50–150KB).

---

## 7. Core Web Vitals guardrails (this build specifically)

**Fonts (CLS/LCP):** Geist + Geist Mono via `next/font/google` are already in `app/layout.tsx` - keep exactly this (self-hosted, preloaded, automatic `size-adjust` fallback metrics ⇒ no FOUT shift). Don't add weights/axes you don't render; drop `Geist_Mono` entirely if no mono text survives design. Never load fonts via `<link>` to Google Fonts alongside this.

**Animations (the recent "scroll and entrance animations" commit is the main risk):**
1. **Never entrance-animate the LCP element.** The hero H1/subhead block must render at full opacity in server HTML. If it animates from `opacity: 0`, LCP is deferred until the animation ends - a self-inflicted multi-hundred-ms penalty.
2. Hidden-by-default must be JS-gated: apply the pre-animation state (`opacity: 0; transform: translateY(...)`) only under a class that JS adds (e.g. `.js-anim` set in an inline `<script>` or via IntersectionObserver adding classes). With JS disabled or slow, content is visible - protects both crawlers and LCP.
3. Animate **only** `transform` and `opacity` (compositor-only). Never `height`, `margin`, `top` - those are layout-shifting *and* jank.
4. Honor `prefers-reduced-motion: reduce` - disable all entrance/scroll animations under it.
5. Scroll-linked work goes through `IntersectionObserver`, not scroll listeners.

**Layout shift:** explicit `width`/`height` (or `fill` + sized container) on every `next/image`; reserve height for the sticky nav; comparison tables on `/vs/[slug]` get `table-layout: fixed` with column widths so long competitor copy can't reflow columns during font swap; FAQ accordions animate `grid-template-rows`/transform within reserved space, and a closed accordion's expansion is user-initiated (excluded from CLS) - just don't auto-open on load.

**Delivery:** every route must be fully static - no `cookies()`/`headers()`/`searchParams` access anywhere in the tree; verify the build output shows all 13 routes as prerendered (`○`/`●`). No third-party scripts at launch; if analytics arrives, use a lightweight option via `next/script` `strategy="lazyOnload"`. Set long `Cache-Control` on `/_next/static` (host default) and compress (host default).

**Budget:** Lighthouse ≥ 95 perf on `/` and one `/vs/[slug]` page in CI (e.g. `treosh/lighthouse-ci-action`) so the animation work can't regress silently.

---

## 8. Additional high-leverage items

**`llms.txt`** - add `app/llms.txt/route.ts` (static route handler returning `text/plain`). Content: one-paragraph product definition (from `site.shortDescription` + the FAQ-1 answer), the allowed metric claims verbatim, pricing table, and a link list of all 11 marketing URLs with one-line descriptions. For an app whose category is researched via ChatGPT/Claude/Perplexity ("best Shopify order editing app"), this is disproportionately valuable pre-launch. Source every fact from `lib/site.ts`/`data/competitors.ts`.

**Heading rules (enforce in components):**
- Exactly one `<h1>` per page, matching the copy doc verbatim (`/`: "Let customers edit their orders - and add to them"; `/features`: "Everything that happens after checkout, handled"; etc.).
- Section headlines = `<h2>`; feature/capability card titles and FAQ questions = `<h3>`; never skip levels; never use headings for visual sizing (the micro-stats numbers are `<p>`/`<strong>`, not headings).
- FAQ questions keep their exact question phrasing in the `<h3>` - they're the long-tail targets ("Can customers edit their orders on Shopify after checkout?" is itself a query).
- On `/vs/[slug]`, the H1 pattern is "AppFox vs {Name}" with comparison-section H2s like "Pricing compared", "How edits happen".

**Image alt conventions:** screenshots → describe state + outcome ("AppFox edit portal showing a customer swapping a t-shirt from M to L on mobile"); diagram/illustration → describe the claim it supports; decorative flourishes → `alt=""` (explicit); never start with "image of"; competitor names in alts only on `/vs` pages, factually ("Pricing table comparing AppFox and Orderify plans"). No real-brand customer logos exist (hard rule) so none to alt-text.

**Misc:**
- `app/icon.png` (512²) + `app/apple-icon.png` via file conventions; the Organization logo URL in §3a must point at a real served file.
- `not-found.tsx` already has copy; App Router serves it with a real 404 status - just verify no soft-404 (no redirect-to-home behavior).
- Centralize all metadata strings in a `lib/seo.ts` map keyed by route, importing `site` - one file to audit lengths and claims.
- Launch-day checklist (gate on `site.installUrl` becoming real): swap install CTAs from placeholder, add `sameAs` to Organization, revisit `aggregateRating` (§3b) once public reviews exist, submit sitemap in Search Console, and verify the domain property.
- Nothing else: no hreflang (single locale), no AMP, no separate m-dot, no `meta keywords`.