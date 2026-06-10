# Winner: Direction 3 - "THE COUNTER" (Warm Commerce Craft)

## Rationale
The Counter wins on the two criteria that matter most for this audience: trust/conversion fit and distinctiveness. Its receipt-stamp-ledger language is the only metaphor that is literally the product (an order-editing app that keeps the books straight) AND native to how Shopify merchants already think - warm like Gorgias/Loop, precise like a till - whereas The Ledger's Stripe-Press broadsheet overshoots into fintech-agency coldness for SMB merchants, and Opening Night's dark-cinema treatment reads as a dev-tool (Linear-clone) aesthetic that's both less distinctive and the heaviest to execute under CSS-only constraints. The Counter is also the strongest brand evolution story (violet survives as ink on cream) and the most internally cohesive: mono-for-money, perforation tears, and spring-physics stamps all reinforce one idea. I grafted The Ledger's best editorial devices (numbered mono section slugs, the giant italic pull-quote problem framing, the dotted-leader "Further Reading" index that funnels SEO equity into all 7 /vs pages) and Opening Night's pragmatics (no fake sign-in nav, the richer CSS analytics dashboard, /vs pages reusing the hero + CTA identity) - each strengthens The Counter without diluting its warmth. Two elements across all three directions were infeasible as specced under the CSS-only rule (JS rAF count-ups, real ticking countdowns) and are replaced with CSS digit-roll/steps() equivalents in the merged spec.

# FINAL DESIGN SPEC - "THE COUNTER" (merged)

**AppFox - Order Editing & Upsell · Marketing site rebuild**
Constraints honored throughout: Tailwind v4 (`@theme` tokens in `app/globals.css`), zero image assets (all visuals are JSX/inline-SVG/CSS), CSS-only animation (one shared IntersectionObserver utility may ONLY toggle classes / `animation-play-state` - no rAF, no JS-driven values), all fonts via `next/font/google`. All copy claims limited to the approved product facts. No fabricated testimonials, customer names, or brand logos.

---

## 1. Concept

AppFox is presented as a beautifully run shop counter, not a SaaS dashboard. The site lives on warm cream paper - the color of a good receipt - with deep violet ink typography and one marigold accent used like a price sticker. The visual language is built from the physical artifacts of commerce merchants already trust: receipts with perforated edges, rubber stamps that thunk down APPROVED, ledger columns of monospace numbers, dashed thread stitching sections together. Grafted from "The Ledger": an editorial discipline layer - every section opens with a numbered mono slug on a hairline (a receipt line number), and money is *always* set in mono. Motion is physical: things stamp, settle, print, and tick - nothing floats. It evolves the existing violet brand from "purple gradient template" into "violet ink on cream paper": same company, grown up. Warmth converts founders and support leads; the ledger precision earns the trust of anyone letting an app touch payments.

---

## 2. Color System

Define all tokens in `@theme` in `app/globals.css`.

### Brand violet - "Ink Violet"
| Token | Hex | Use |
|---|---|---|
| `--color-brand-50` | `#F4F0FE` | tinted fills, hover washes, AppFox column in /vs tables |
| `--color-brand-100` | `#E9E1FC` | selected states, soft chips |
| `--color-brand-200` | `#D3C5F8` | borders on tinted cards, link underlines |
| `--color-brand-300` | `#B29DF1` | decorative dashed strokes, dark-section accents |
| `--color-brand-400` | `#9377E8` | icons, links on dark |
| `--color-brand-500` | `#7857DB` | links, secondary emphasis |
| `--color-brand-600` | `#6240C8` | **primary buttons, key UI** |
| `--color-brand-700` | `#5233A4` | button hover, active, open-FAQ question |
| `--color-brand-800` | `#3F2880` | deep fills |
| `--color-brand-900` | `#2C1C5A` | dark-section gradient top |
| `--color-brand-950` | `#1D1340` | deepest fills |

### Paper neutrals (warm - never gray)
| Token | Hex | Use |
|---|---|---|
| `--color-paper` | `#FBF8F1` | **page background** (cream) |
| `--color-paper-raised` | `#FFFFFF` | cards, mockup surfaces |
| `--color-paper-sunken` | `#F4EFE3` | alternating bands, input wells, trust strip |
| `--color-paper-edge` | `#E9E2D2` | hairline borders + section rules on light |
| `--color-ink-900` | `#241B38` | headlines (near-black violet) |
| `--color-ink-700` | `#473D63` | body text |
| `--color-ink-500` | `#6F6690` | muted text, captions |
| `--color-ink-300` | `#A39CBC` | placeholders, disabled, dotted leaders, em-dash "misses" |

### Marigold accent - the price sticker (max ONE marigold element per viewport)
| Token | Hex | Use |
|---|---|---|
| `--color-marigold-300` | `#F9C66B` | glows, highlight underline strokes, eyebrows on dark |
| `--color-marigold-500` | `#EE9D2B` | revenue numbers, "MOST POPULAR" sticker, upsell chips, final-CTA button |
| `--color-marigold-700` | `#C57713` | accent text on cream (AA-safe), eyebrows on light |

### Dark sections - "After Hours"
| Token | Hex | Use |
|---|---|---|
| `--color-night` | `#1B1233` | dark section base |
| `--color-night-raised` | `#271C49` | cards on dark, footer ghost wordmark |
| `--color-night-edge` | `rgba(178,157,241,0.16)` | borders/hairlines on dark |
| `--color-cream-on-night` | `#F6F1E4` | headlines on dark |
| `--color-mist-on-night` | `#B7AED4` | body on dark |

### Semantic
`--color-success: #1E9E6A` · `--color-success-bg: #E2F4EB` · `--color-danger: #CE4343` · `--color-danger-bg: #FBEAEA` · `--color-warn: #C57713` · `--color-info: #5233A4`

### Light/dark section map (home)
Light cream: nav, hero, trust strip, pain, how-it-works, edit types, upsell story, integrations + analytics, pricing (sunken band), further reading, FAQ.
**Dark night:** Control Room (§5.7), The Math (§5.9), Final CTA + Footer (continuous, no perforation between CTA and footer). Every light→dark and dark→light transition uses the **perforation tear** (§4.4).

---

## 3. Typography

Three families via `next/font/google`, variable where available:

1. **Display - `Fraunces`** (variable: `opsz`, `wght`, `SOFT`, `WONK` axes). Headings: `font-variation-settings: "SOFT" 60, "WONK" 0`; `"WONK" 1` only on the hero's single italic word. Weights: 480 (h1/h2), 560 (h3, stat numerals), 400 italic (pull-quotes, the hero highlight word).
2. **Body/UI - `Hanken Grotesk`** (variable). 400 body · 500 UI labels/nav · 600 buttons/card titles · 700 reserved (never bolder).
3. **Mono - `Spline Sans Mono`** (500). Everything that smells like a ledger: prices, deltas (`+$24.00`), order numbers (`#1042`), countdowns, table data, stats, **eyebrows and section slugs** (grafted from The Ledger - the mono "till voice" now owns all metadata). `font-variant-numeric: tabular-nums` wherever digits change.

### Scale (clamp desktop→mobile)
| Role | Spec |
|---|---|
| h1 | Fraunces 480 · `clamp(2.875rem, 2rem + 4vw, 4.75rem)` · lh 1.02 · ls `-0.025em` |
| h2 | Fraunces 480 · `clamp(2.125rem, 1.6rem + 2.4vw, 3.25rem)` · lh 1.08 · ls `-0.02em` |
| h3 | Fraunces 560 · `1.5rem` · lh 1.25 · ls `-0.01em` |
| Pull-quote | Fraunces 400 italic · `clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)` · lh 1.2 |
| Section slug / eyebrow | Spline Sans Mono 500 · `0.8125rem` · ls `0.12em` · uppercase · marigold-700 light / marigold-300 dark |
| Lead | Hanken 400 · `1.25rem` · lh 1.55 · ink-700 |
| Body | Hanken 400 · `1.0625rem` · lh 1.65 |
| Caption | Hanken 500 · `0.875rem` · lh 1.5 · ink-500 |
| Mono data | Spline Sans Mono 500 · `0.9375rem` · tabular-nums |
| Stat numerals | Fraunces 560 · `clamp(3rem, 5vw, 4.5rem)` · lh 1 (digits that animate use mono digit-strips, §7) |

Body max-width `65ch`. Headlines ≤ 14 words.

**Section slug device (graft from The Ledger):** every major home section opens with a full-width 1px `--color-paper-edge` rule carrying, on its left, a mono slug - `NO. 03 - HOW IT WORKS` - and on its right (desktop only) a one-line caption in ink-500. On dark sections the rule is `--color-night-edge`, slug marigold-300. The rule draws in (`draw-rule`, §7) as the section reveals.

---

## 4. Texture & Depth Vocabulary

1. **Paper wash (hero + light):** layered radials on `--color-paper`: `radial-gradient(58% 45% at 78% 8%, rgba(98,64,200,0.07), transparent 70%)` + `radial-gradient(40% 36% at 12% 88%, rgba(238,157,43,0.06), transparent 70%)`.
2. **Night wash (dark):** `radial-gradient(70% 60% at 50% 0%, #2C1C5A 0%, #1B1233 62%)` + one ember `radial-gradient(34% 28% at 82% 18%, rgba(238,157,43,0.10), transparent)`.
3. **Grain:** inline-SVG `feTurbulence` (fractalNoise, baseFrequency 0.9, 2 octaves) as data-URI overlay; `opacity: 0.04` dark sections, `0.025` hero only, `mix-blend-mode: overlay`. Nowhere else.
4. **Perforation tear (signature):** every light↔dark seam is a 14px-tall absolutely-positioned strip of semicircle punches (SVG, `r=7`, 22px gap) in the upper section's background color overlapping the next section. Also used on receipt-styled cards (top + bottom edges).
5. **Borders:** hairlines only - `1px solid var(--color-paper-edge)` light / `--color-night-edge` dark; tinted cards `1px solid var(--color-brand-200)`. Never 2px, never gray.
6. **Shadows (violet-tinted, 3 tiers):**
 `--shadow-card: 0 1px 2px rgba(36,27,56,0.06), 0 4px 12px rgba(36,27,56,0.05)`
 `--shadow-raised: 0 2px 4px rgba(36,27,56,0.07), 0 12px 32px -8px rgba(98,64,200,0.16)`
 `--shadow-pop: 0 4px 8px rgba(36,27,56,0.08), 0 24px 56px -12px rgba(98,64,200,0.28)` (hero mockup, Growth pricing card)
7. **Sticker treatment:** featured badges get a 2px `--color-paper` ring outside their fill + `-2deg` rotation.
8. **Dashed craft strokes:** all connective lines (how-it-works thread, integration wires, audit timeline) are SVG paths - `stroke-dasharray: 2 6`, `stroke-linecap: round`, `stroke: var(--color-brand-300)` - drawn on via `stroke-dashoffset`.
9. **Dotted leaders (graft):** index rows (§5.12) use `border-bottom: 1px dotted var(--color-ink-300)`.
10. **Glass:** nav only - `rgba(251,248,241,0.82)` + `backdrop-filter: blur(12px) saturate(1.4)`. No glass cards.
11. **Glow:** marigold revenue moments only - `box-shadow: 0 0 0 1px rgba(238,157,43,0.35), 0 0 24px rgba(238,157,43,0.18)`, slow `ember-pulse`.

---

## 5. Home Page - Section by Section

### 5.1 Nav
72px, transparent over hero. Scroll >24px: glass + hairline bottom border fade in, height eases to 60px (200ms). Left: wordmark "AppFox" in Fraunces 560 + 6px marigold dot after the x. Center (Hanken 500): Features · How it works · Pricing · Compare ▾ (dropdown listing all 7 `/vs/[slug]` pages - cleverific, aftersell, edit-order, orderediting, orderify, reconvert, selfserve - styled as a mini index with mono numerals; direct SEO equity in the nav) · FAQ. Right (graft from Opening Night/Ledger - **no fake "Sign in"**, the app isn't launched): ghost link "Support" (`mailto:support@appfox.io`) + primary "Install free". Mobile: full-screen cream sheet, links Fraunces 32px, staggered `rise-in` with hairline separators.

### 5.2 Hero - light, 55/45 split
Slug: none (hero is `NO. 01` implicitly; numbering starts visibly at the trust strip). Eyebrow: `ORDER EDITING FOR SHOPIFY`. H1: "Let customers fix their own orders. *Keep* the revenue." - "*Keep*" in Fraunces italic `"WONK" 1` with a hand-drawn marigold-300 SVG underline drawing on at 600ms (`draw-line`). Lead: one sentence - tokenized edit link from the confirmation email, no login, plus one-click upsells into the same order. CTAs: primary "Install free - 5-minute setup" + secondary "See how it works" (smooth-scrolls to §5.5). Mono caption beneath: `No code · Works on all Shopify plans · Free plan available`. Right: the Portal Demo (§6). Behind it, a faint oversized Fraunces "#1042" watermark in `--color-brand-50`.

### 5.3 Trust Strip - light, sunken band (`--color-paper-sunken`)
One row, four mono stat chips separated by hairlines: `★ 4.9/5 on Shopify` · `~80% of edits self-served` · `5-minute setup` · `All Shopify plans`. The star is a five-point SVG filling marigold left→right on reveal; numbers arrive via `digit-roll` (§7 - CSS, not JS counting). Below `md:` it becomes a horizontal marquee (30s linear, pause on hover, removed under reduced-motion). No logos ever.

### 5.4 The Pain - light · slug `NO. 02 - THE PROBLEM`
**Graft from The Ledger:** the section opens with a giant Fraunces italic pull-quote spanning the grid - *"Hi - can I change my order?"* - with oversized hanging quotation marks in `--color-brand-200`. Beneath, two columns. Left: copy on address typos, size regret, duplicate orders, cancellations, flat AOV. Right: a slow vertical marquee (24s, masked top/bottom, paused on hover) of generic ticket cards (subjects only, no names): "wrong address!! please help" · "can I swap to a Large?" · "ordered twice by accident" · "cancel my order?". Every 4th card gets a green `SELF-SERVED` stamp (`stamp` easing, −8° rotation) and fades out. Under the marquee, a mono ledger line: `3 tickets · 0 minutes of agent time`.

### 5.5 How It Works - light · slug `NO. 03 - HOW IT WORKS`
Three white cards connected by one dashed SVG thread that draws on with scroll (`draw-line`; `animation-timeline: view()` inside `@supports`, IO-triggered 900ms fallback). Steps, each with a Fraunces 560 numeral in a marigold-300 circle:
1. **Customer clicks their confirmation email** - mini email mockup with a violet "Edit your order" button (tokenized link, no login).
2. **They fix it themselves** - mini portal with address autocomplete open.
3. **You approve - or don't have to** - mini approval queue, one row auto-stamping `AUTO-APPLIED`.
Caption under step 3, mono: `auto-apply safe edits · queue the sensitive ones`. Cards reveal left→right, 120ms stagger.

### 5.6 Edit Types - light · slug `NO. 04 - SIX EDITS, ZERO TICKETS`
H2: "Everything they ask for. Nothing they shouldn't touch." 3×2 grid (1-col mobile) of cards, each with a living JSX vignette animating once on reveal, replaying on hover:
- **Address change** - input + autocomplete dropdown sliding in, validation check.
- **Variant swap** - `M` chip morphing to `L` (`chip-morph`).
- **Quantity** - stepper ticking 1→2 (`digit-roll`).
- **Add items** - mini product row sliding in.
- **Remove items** - row striking through and collapsing.
- **Cancel order** - danger-tinted card with mono eligibility countdown `23:14:09` (decorative - see §9 flags) + sticker badge "Rules apply"; a ghosted padlocked chip carries tooltip copy "Customers never see this."

### 5.7 The Control Room - **DARK**, perforated entry · slug `NO. 05 - YOU SET THE RULES`
H2 (cream): "Self-service, on your terms." Split layout. Left: copy + three bullets - edit windows (e.g. 24h), fulfillment cutoffs, per-action approval vs auto-apply; footnote: ineligible edits are never shown to the customer. Right: a dark admin mockup - **eligibility rules panel** (toggle rows: `Address changes - Auto-apply` · `Cancellations - Require approval` · `Edit window - 24h` in mono) above the **audit timeline**: vertical dashed thread with timestamped nodes lighting sequentially - `14:02 Edit requested · customer` → `14:02 Rule check: pre-fulfillment ✓` → `14:02 Auto-approved` → `14:03 Payment captured +$24.00`. One toggle self-flips every 6s and the adjacent queue row's chip swaps `Needs review` ↔ `Auto-applied` on the same keyframe timeline (simplified from full re-sort - see §9).

### 5.8 The Upsell Story - light · slug `NO. 06 - REVENUE`
H2: "They came to fix a typo. They left with the matching beanie." Centerpiece: a receipt-styled card (white, perforated top + bottom, mono throughout) - the order ledger: original items, then a highlighted upsell row sliding in (`+ Wool Beanie - $24.00`) with the marigold glow, then delta math printing line by line (`print-out`, 60ms stagger, like paper feeding from a till): `Subtotal +$24.00` / `Charged via Shopify payment request` / `No second checkout`. Flanking copy: offers shown inside the edit flow, one-click add to the *existing* order. Caption footnote: AI-powered recommendations on Growth and above.

### 5.9 The Math - **DARK** · slug `NO. 07 - THE MATH`
H2: "Cancel-and-reorder is a tax. Stop paying it." Two-panel ledger comparison: left (danger-tinted on night) "The old way": cancel → refund → re-checkout → `Shopify Payments fees lost: 1.5–2.9% per order` in strikethrough danger mono. Right (success-tinted) "With AppFox": in-place edit via Shopify's native Order Editing API → fees preserved → deltas charged or refunded automatically. A green `APPROVED` stamp slams onto the right panel on viewport entry (`stamp`: scale 1.4→1, rotate −8°, spring). Below, three large Fraunces stats revealing via `digit-roll`: `~80%` edits self-served · `4.9/5` on Shopify · `5 min` setup.

### 5.10 Integrations + Analytics - light · slug `NO. 08 - YOUR STACK`
H2: "Plugged into your stack." Four cards (2×2 mobile), each a bordered tile with the integration name in Hanken 600 + a functional vignette (CSS-drawn glyphs only - no trademarks): **Shopify Flow** (trigger→action node pair, dashed wire pulsing) · **Gorgias** (mini ticket sidebar with order context) · **Slack** (message bubble sliding in: `Edit pending approval · #1042 · SLA 2h`) · **Branded email** (mini email frame + customizable color-dot row). Dashed wires converge on a central AppFox dot (`dash-flow`).
**Analytics wide card beneath (graft from Opening Night - upgraded):** a fake-browser frame with a CSS bar chart (edit volume by day - divs, `bar-grow` scaleY on reveal, 60ms stagger), a conic-gradient donut (approval rate), and mono KPI tiles: `edit volume · approval rate · upsell revenue · time-to-approve`.

### 5.11 Pricing - light, sunken band · slug `NO. 09 - PRICING`
H2: "Pricing that starts at free." Three cards:
- **Free - $0**: 50 edits/mo, address & quantity edits, 2 active upsell offers, branded portal, email support.
- **Growth - $19/mo** (center, raised `--shadow-pop`, brand-200 border, scale 1.03, marigold `MOST POPULAR` sticker rotated −2°): unlimited edits, all edit types, unlimited upsells, AI-powered upsell recommendations, analytics dashboard, priority support. Primary button.
- **Pro - $49/mo**: everything in Growth + custom branding/white-label, full API access, advanced analytics & exports, dedicated account manager, SLA support.
Prices in Fraunces 560 48px, `/mo` in mono. Checkmarks are hand-drawn SVG ticks drawing on with 40ms stagger; hover lifts the card 4px and re-draws its ticks. Mono reassurance line: `14-day free trial on paid plans · no card required · cancel anytime`. Monthly only - **no annual toggle (none exists; do not invent)**.

### 5.12 Further Reading - light · slug `NO. 10 - COMPARED` *(grafted whole from The Ledger)*
H3: "See how AppFox compares." Seven ruled index rows, one per `/vs/[slug]` page: mono numeral · "AppFox vs Cleverific" (etc.) in Hanken 600 · dotted leader (`1px dotted var(--color-ink-300)`) · right-aligned mono `READ →`. Hover: leader darkens, arrow slides 3px (`leader-dot`). This funnels home-page link equity into all 7 SEO comparison pages.

### 5.13 FAQ - light · slug `NO. 11 - QUESTIONS`
Two-column: left sticky h2 "Questions, answered." + support link (support@appfox.io). Right: accordion (§8), eight questions strictly from product facts: refunds/charges on price deltas, edit windows & eligibility, approval vs auto-apply, what customers see (and never see), fee preservation via in-place editing, plan compatibility (all Shopify plans), setup time, trial terms.

### 5.14 Final CTA - **DARK**, perforated top
Centered Fraunces h2 in cream: "Your next 'can I change my order?' email answers itself." Primary button - the **only marigold button on the site** (fill marigold-500, ink-900 text). Secondary ghost: "Compare us to the alternatives" → §5.12 anchor / `/vs/cleverific`. Beneath, the hero portal replays at 60% scale, ambient. Behind the button: a giant faint dashed circle rotating at 120s (`slow-stamp-orbit`) - the rubber stamp about to land. Mono subline: `Free plan available · support@appfox.io`.

### 5.15 Footer - night (continuous from CTA, no perforation)
Four columns: Product · Compare (**all 7 /vs links**) · Resources · Company (support@appfox.io). Bottom: oversized Fraunces wordmark "AppFox" at ~9vw in `--color-night-raised` (ink-on-ink watermark) + mono legal line `© 2026 AppFox · Made for Shopify merchants`. Hairline `--color-night-edge` dividers.

---

## 6. Hero Centerpiece - "The Order That Fixes Itself"

Two-layer JSX composition, ~520px wide desktop, full-width mobile (back layer hidden below `md`).
**Layer 1 (front, phone-proportioned, 70% width):** customer portal - white card, 20px radius, `--shadow-pop`, fake status bar, store header "OAK & ANCHOR" (invented store) with brand-600 accent bar, order `#1042` in mono.
**Layer 2 (back-right, overlapped, settles from −4° to 0°):** slim merchant card - audit timeline + approval row.

**Loop: 16s + 3s rest, crossfade restart.** Implementation: every scene element carries `animation: <name> 19s var(--ease) infinite` with keyframe percentages defining its window, all sharing one start (no JS sequencing). One IO toggles `animation-play-state: paused` off-screen. The cursor-dot (8px brand-600 circle, soft shadow) is the narrator: 600ms `--ease-glide` glides, 1.15→1 tap squash.

- **0.0–1.2s** - Portal rises in: 2 line items, address block with visible typo `123 Mian St`. Marigold pill `Editable for 23:14:09` (decorative tick, §9).
- **1.2–3.4s** - Cursor taps address → input mode; characters delete to `123 M` (`steps()`), autocomplete dropdown slides in (3 rows), `123 Main St` highlights, tapped; field commits; green check pops (`stamp`); mono micro-chip `validated ✓`.
- **3.4–5.6s** - Cursor taps the tee line item; variant sheet slides up; chips `S M L XL`; `M` deselects, `L` selects (`chip-morph`); sheet exits; line updates `Tee - Olive / L`.
- **5.6–8.2s** - Upsell card slides in beneath items: marigold-glow tile, `Matching Beanie - $24.00`, button `Add to this order`. Tap → card compresses into a new ledger row; total flips `$86.00 → $110.00` via `digit-roll`; caption: `Charged to original payment - no second checkout`.
- **8.2–10.0s** - Cursor taps `Save changes`; header progress shimmer (800ms).
- **10.0–13.0s** - Portal dims to 85%; back card lifts forward 8px; timeline nodes light in sequence: `Edit requested 14:02` → `Rules: auto-apply ✓` → green `APPROVED` stamp slams (spring) → `Payment captured +$24.00` in marigold mono.
- **13.0–16.0s** - Portal brightens: large hand-drawn circle-check draws on (`stroke-dashoffset`), "Order updated - no new checkout needed." A Slack-style toast slips in top-right: `#1042 edited · +$24.00 upsell`. Hold 3s. Crossfade.

**`prefers-reduced-motion`:** loop disabled; render the 13–16s success frame statically with the merchant card and Slack toast visible (the best single frame). All prices/times/order numbers in Spline Sans Mono.

---

## 7. Animation Vocabulary

Easings: `--ease-out: cubic-bezier(0.22,1,0.36,1)` (entrances) · `--ease-spring: cubic-bezier(0.34,1.56,0.64,1)` (stamps, stickers) · `--ease-glide: cubic-bezier(0.45,0,0.15,1)` (cursor, sheets). Everything inside `@media (prefers-reduced-motion: no-preference)`; reduced-motion gets 150ms opacity fades or final states. One shared IO utility (threshold 0.2, once) adds `.in-view`; stagger via `--i` custom-property delays.

| Name | What | Spec |
|---|---|---|
| `rise-in` | section/card entrance | translateY 24px→0 + opacity, 600ms `--ease-out`, siblings stagger 80ms |
| `stamp` | approvals, stickers, star fill | scale 1.4→1 + rotate −8°→final + opacity, 450ms `--ease-spring` |
| `draw-line` | dashed threads, ticks, circle-check, hero underline | `stroke-dashoffset`→0; `animation-timeline: view(block 70% 30%)` in `@supports`, IO 900ms fallback |
| `draw-rule` | section-slug hairlines | scaleX 0→1, origin left, 700ms `--ease-out` |
| `print-out` | receipt rows, ticket cards | translateY 8px + clip-path inset bottom→0, 350ms, 60ms stagger |
| `digit-roll` | totals, counters, stats (replaces all JS count-ups) | per-digit overflow-hidden span; inner strip of numerals translateY to target, 500ms `--ease-out`, 60ms/digit stagger, tabular-nums |
| `tick` | countdown chips | `steps(10)` keyframe cycling a pre-baked 0–9 digit strip (seconds digit only) - decorative |
| `marquee-drift` | ticket column (§5.4), mobile trust strip | duplicated content, translateY(-50%) / translateX(-50%) linear loop 24–30s, `animation-play-state: paused` on hover/focus |
| `chip-morph` | variant swap, toggles | background+border 200ms, content crossfade 150ms |
| `lift` | card hover | translateY −4px + shadow tier up, 200ms `--ease-out` |
| `ember-pulse` | marigold glows | box-shadow alpha 0.18↔0.30, 3.2s ease-in-out infinite |
| `bar-grow` | analytics chart | scaleY 0→1, origin bottom, 700ms, 60ms stagger |
| `dash-flow` | integration wires | `stroke-dashoffset` march, 3s linear infinite |
| `leader-dot` | index-row hover (§5.12) | leader darkens + arrow translates 3px, 200ms |
| `slow-stamp-orbit` | final-CTA dashed circle | rotate 360°, 120s linear infinite |

Hard rules: max one infinite ambient animation per viewport (ticks exempt); nothing over 900ms except the hero loop, marquees, and orbit; no parallax.

---

## 8. Component Styling

**Radius scale (strict):** 8px chips/inputs · 12px buttons · 16px cards · 20px mockup frames. Nothing else.

- **Primary button:** brand-600 fill, `#FBF8F1` text (Hanken 600, 1.0625rem), 12px radius, 14px/24px padding, `inset 0 1px 0 rgba(255,255,255,0.18)` top highlight, shadow `0 2px 8px rgba(98,64,200,0.30)`. Hover: brand-700 + lift 1px. Active: translateY 1px, shadow collapses (the "press"). Focus-visible: 2px marigold-500 ring, offset 2px. Final-CTA variant only: marigold-500 fill / ink-900 text.
- **Secondary button:** paper-raised fill, 1px ink-900 border, ink-900 text, hard offset shadow `2px 2px 0 var(--color-ink-900)` (paper cutout). Hover: shadow grows 3px 3px, button shifts −1px,−1px. On dark: transparent, `--color-night-edge` border, cream text, no hard shadow.
- **Cards:** white on cream, paper-edge hairline + `--shadow-card`, 16px radius, 28px padding. Tinted: brand-50 fill / brand-200 border. Night: night-raised / night-edge.
- **Badges:** 8px-radius chips, Hanken 600 13px; sticker variant adds 2px paper ring + −2° rotation + marigold-500 fill/ink-900 text. Status chips: `AUTO-APPLIED` success on success-bg · `NEEDS REVIEW` warn on `#FBF3E4` · danger states danger on danger-bg.
- **Nav:** per §5.1; active link gets a 4px marigold dot beneath; link hover = 2px brand-200 underline animating width 0→100% (200ms).
- **Comparison tables (`/vs/[slug]`):** 16px-radius wrapper card; sticky header row (cream glass on scroll); AppFox column tinted brand-50 with brand-200 side borders, header = wordmark + marigold dot + `4.9/5 ★` chip; checks = hand-drawn success-green SVG ticks (`draw-line` on reveal); competitor misses = ink-300 em-dash, **never a red X** (confident, not petty); row hover washes paper-sunken; all numbers mono. Mobile: stacked per-feature cards, AppFox value first. **Graft from Opening Night:** every /vs page reuses a compact cream hero (static portal frame, no loop) with h1 pattern "AppFox *vs* Cleverific" ("vs" in Fraunces italic marigold-700) + the §5.14 final CTA, so the identity carries through SEO entrances.
- **FAQ accordion:** no cards - hairline dividers; question Hanken 600 1.125rem ink-900; right `+` rotates 45°→`×` (250ms); answer expands `grid-template-rows: 0fr→1fr` (300ms) with opacity trailing 100ms; open question turns brand-700 with a 2px marigold underline drawing beneath; `<button>` + `aria-expanded`, one open at a time, full row hit-target.
- **Inputs (mockups):** paper-sunken fill, hairline border, 8px radius, 2px brand-200 focus ring, mono for anything numeric.
- **Footer:** per §5.15.

---

## 9. Feasibility Flags & Replacements

1. **JS rAF count-up stats (specced in Directions 1 & 2) - infeasible under CSS-only animation.** Replaced everywhere by `digit-roll`: per-digit overflow-hidden spans whose numeral strips translateY via CSS keyframes when the shared IO adds `.in-view`. The IO only toggles a class.
2. **Real ticking countdowns (`23:14:09`, hero eligibility pill) - infeasible** (true timekeeping needs JS). Replaced by the decorative `tick` pattern: only the seconds digit animates via a `steps(10)` keyframe over a pre-baked 0–9 strip; hours/minutes static per loop. Reads as live, costs nothing.
3. **Control Room "toggle re-sorts a live queue" - fragile as specced.** Simplified: the toggle self-flips on a 6s keyframe loop and the adjacent queue row's status chip crossfades `Needs review` ↔ `Auto-applied` on the same timeline. No row reordering.
4. **Scroll-driven `animation-timeline: view()` (thread/spine draws)** - progressive enhancement only, inside `@supports (animation-timeline: view())`; fallback is the IO-triggered 900ms `draw-line`. Never load-bearing.
5. **Opening Night's blur-filter entrances (`blur(6px)→0`)** - rejected (paint-heavy on long pages); entrances are transform+opacity only.
6. **Hero loop sequencing** - no JS timeline: every element's keyframes live on a shared 19s (16s + 3s rest) infinite animation with percentage windows; one `animation-play-state` toggle pauses the whole composition off-screen and under reduced-motion the static success frame renders instead.

## 10. Implementation Notes

- Tailwind v4: all tokens above as `@theme` variables in `app/globals.css`; consult `node_modules/next/dist/docs/` for current Next.js conventions before coding (per repo AGENTS.md).
- Fonts: `Fraunces` (with `axes: ['opsz','SOFT','WONK']`), `Hanken Grotesk`, `Spline Sans Mono` via `next/font/google`, exposed as `--font-display`, `--font-sans`, `--font-mono`.
- Install links remain placeholders (`#`) - the app is not yet on the App Store; never link to a fake listing.
- Allowed claims only: `~80% of common edits self-served` · `4.9/5 on Shopify` · `5-minute setup` · `1.5–2.9% Shopify Payments fees lost per cancel-and-reorder`. No testimonials, no customer names, no real-brand logos; integration tiles use typographic names + CSS glyphs, never trademark marks.