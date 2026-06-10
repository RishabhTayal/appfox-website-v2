# Build contract - AppFox marketing site ("The Counter")

Every build agent MUST follow this contract exactly. Read the foundation files
before writing code. You own ONLY the files assigned to you - never edit
globals.css, layout.tsx, lib/*, data/*, or another agent's files.

## Stack rules
- Next.js 16.2.6 App Router, React 19, TypeScript, Tailwind v4. NO new dependencies.
- `params` in dynamic routes/generateMetadata is a **Promise** - `const { slug } = await params`.
- Server components by default. Add `"use client"` ONLY for state/effects.
- No image files. All visuals = JSX divs, inline SVG, CSS.
- Import alias `@/` maps to repo root (e.g. `@/components/ui/Reveal`).
- American spelling. Sentence-case headlines. No exclamation marks.
- All external/install CTAs use `site.installUrl` from `@/lib/site` - never hardcode.
- Allowed metric claims ONLY: `~80% of common edits self-served`, `4.9/5 on Shopify`,
  `5-minute setup`, `1.5–2.9% Shopify Payments fees lost per cancel-and-reorder edit`.
  No fabricated testimonials, customer names, or real-brand customer logos.
  Integration tiles: typographic names + CSS glyphs only (no trademark logos).
- The invented demo store in mockups is "OAK & ANCHOR", demo order `#1042`.

## Design tokens (Tailwind utilities available)
Colors: `brand-50..950` (violet ink; 600=primary), `paper`, `paper-raised`,
`paper-sunken`, `paper-edge` (hairlines), `ink-900/700/500/300`,
`marigold-300/500/700`, `night`, `night-raised`, `cream-on-night`,
`mist-on-night`, `success`, `success-bg`, `danger`, `danger-bg`, `warn`, `warn-bg`.
Use like `bg-paper`, `text-ink-700`, `border-paper-edge`, `bg-brand-600`.
Night-edge border: `border-(--color-night-edge)`.
Shadows: `shadow-(--shadow-card)`, `shadow-(--shadow-raised)`, `shadow-(--shadow-pop)`.
Fonts: headings auto-use Fraunces. `.till` = mono ledger voice (money, order
numbers, eyebrows, table data, ALWAYS for prices). `.wonk` = single italic
display word. Body = Hanken Grotesk (default).
Radius scale (strict): 8px chips/inputs · 12px buttons · 16px cards · 20px mockup frames.

## CSS utility classes (globals.css - already built, just use them)
- `.btn-primary` (violet), `.btn-secondary` (paper-cutout w/ hard shadow; add
  `.on-night` variant class on dark), `.btn-marigold` (ONLY inside CtaBand).
- `.card`, `.card-tinted`, `.card-night`, `.lift` (hover lift).
- `.chip`, `.chip-success`, `.chip-warn`, `.chip-danger`.
- `.sticker` (marigold badge, −2° rotation, paper ring).
- `.ember` (marigold glow), `.ember-pulse` (animated glow).
- `.paper-wash` (light radial wash), `.night-wash` (dark bg+wash - includes
  bg color), `.grain` + `.grain-soft` (noise overlay), `.on-night` (context class
  for dark sections - REQUIRED on every dark section wrapper).
- `.leader` (dotted bottom border for index rows).
- Animations (all gated for no-JS/reduced-motion already):
  - `.stamp-in` - stamps in (scale 1.4→1, −8°) when ancestor `.is-visible`.
    Delay via `--stamp-delay`.
  - `.draw-path` - SVG stroke draws when ancestor `.is-visible`. Set
    `--path-length` (and matching `stroke-dasharray` is automatic), delay via `--draw-delay`. Set `pathLength={400}` on the SVG path
    and you can skip `--path-length`.
  - `.print-out` - receipt-row print-in, stagger via `--i` (0,1,2…).
  - `.bar-grow` - bar chart scaleY, stagger via `--i`.
  - `.marquee-x` / `.marquee-y` on an inner track (content duplicated once for
    seamless loop) inside a `.marquee-pause` wrapper with `overflow-hidden`.
  - `.dash-flow` - marching dashed SVG strokes (set strokeDasharray).
  - `.orbit-slow` - 120s rotation.
  - `.enter-rise` (transform-only, for LCP-critical hero h1),
    `.enter-fade-rise` (page-load entrance for non-LCP hero elements; set
    `animationDelay` inline for stagger).

## Shared components (already built - APIs)
- `Reveal` from `@/components/ui/Reveal` (client): scroll-reveal wrapper.
  `<Reveal variant="up|down|left|right|scale|none" delay={ms} index={i} as="div" className>`.
  Children hidden until in view (JS-gated). Wrap lists in `<StaggerGroup step={80} base={0}>`
  and pass `index={i}` to children.
- `InView` from `@/components/ui/InView` (client): adds `.is-visible` on
  scroll-into-view WITHOUT hiding children. Use as the trigger wrapper for
  `.stamp-in`, `.draw-path`, `.print-out`, `.bar-grow`, DigitRoll.
- `DigitRoll` from `@/components/ui/DigitRoll` (server): CSS count-up.
  `<DigitRoll value="~80%" />` - digits roll when ancestor `.is-visible`
  (wrap in InView). Non-digits render statically. Already `.till`.
- `AccordionItem` from `@/components/ui/Accordion` (client): animated
  accordion. Props: title (ReactNode), children, className, buttonClassName,
  panelClassName, icon (gets `data-open` on wrapper for styling).
- `SectionSlug` from `@/components/site/SectionSlug`: `<SectionSlug no="03" label="HOW IT WORKS" caption="..." onNight?>`.
- `Perforation` from `@/components/site/Perforation`: `<Perforation from="paper|sunken|night|raised" />`
  - place as FIRST child of the new section; `from` = previous section's bg.
- `Wordmark` from `@/components/site/Wordmark`: `<Wordmark onNight? className="text-2xl" />`.
- `CtaBand` from `@/components/site/CtaBand`: dark final-CTA section
  (headline, body, primaryLabel/Href, secondaryLabel/Href, from). Place above Footer.
- `Navbar`/`Footer` from `@/components/site/{Navbar,Footer}` - pages render
  `<Navbar />` then `<main className="flex-1">…</main>` then `<Footer />`.
- `JsonLd` from `@/components/seo/JsonLd`: `<JsonLd data={obj} />`.
- `site` from `@/lib/site`, `routeMeta`/`pageMetadata` from `@/lib/seo`,
  `competitors`, `getCompetitor` from `@/data/competitors` (each competitor now
  also has a `framing` one-liner).

## Section pattern (home page sections)
```tsx
<section id="..." className="py-20 sm:py-28">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Reveal variant="none"><SectionSlug no="04" label="SIX EDITS, ZERO TICKETS" caption="…" /></Reveal>
    <Reveal><h2 className="mt-8 max-w-2xl">…</h2></Reveal>
    …
  </div>
</section>
```
Dark sections: `<section className="on-night night-wash grain relative">` with
`<Perforation from="paper" />` first, and a closing `<Perforation from="night" />`
as the first child of the NEXT light section (the page assembler handles seams -
just note in a comment which `from` your section expects above/below it).

Money/order numbers ALWAYS `.till`. Eyebrows ALWAYS via SectionSlug. Checkmarks
are hand-drawn SVG ticks (`<svg><path d="M4 12l5 5 11-11" …/></svg>` style,
strokeLinecap round) with `.draw-path`, never ✓ characters. Competitor "misses"
in tables: ink-300 em-dash `-`, never a red X.

## Quality bar
Every component must compile under `npx tsc --noEmit` and `next build`. No
`any` (except the existing ref-cast pattern). No console.log. aria-labels on
icon-only buttons; `aria-hidden="true"` on decorative SVG. Keyboard-accessible
interactions. Return ONLY a short report of files written + any deviations.
