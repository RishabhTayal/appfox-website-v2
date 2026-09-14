# AppFox redesign audit

## Direction

Keep Next.js 16, React 19, Tailwind 4, existing routes, app catalog, install destinations, pricing, structured data, and interactive demos. Use the redesign-existing-projects skill's approved graphite surfaces, white to gray headline gradient, Geist, Tailwind type and radius scales, and prescribed spacing and motion. White carries the UI emphasis. The official AppFox image asset retains its original brand color.

## Findings before implementation

- **Typography:** Hanken Grotesk and Spline Sans Mono are outside the requested font list. Display weights reach 800; arbitrary small text sizes, wide paragraphs, italic quotations, and uppercase labels weaken hierarchy.
- **Color and surfaces:** violet gradients, lavender paper, yellow stickers, and colored glows compete. The dark CTA/footer creates an abrupt theme change. Shared tokens can bring existing product pages into one neutral system.
- **Layout:** the homepage repeats elevated cards, forces equal heights, and gives three apps a two-column shelf with a missing bundles preview. Four equal benefit cards and a large footer link farm obscure the main paths.
- **Navigation and states:** seven desktop categories plus support and install crowd the header. Desktop menus rely on hover/focus, have no current-page indication, and lack explicit expanded state. The mobile toggle swaps icons; the menu lacks Escape handling, focus containment, and restoration. No skip link exists. The install CTA on subscription integrations falls back to Order Editing.
- **Motion:** reveals already use IntersectionObserver and honor reduced motion, but their 600ms timing and small offsets differ from the skill. Some controls use 150ms transitions; decorative ambient effects run continuously. Hero demo updates need a stable live status region.
- **Content:** homepage copy still says “both apps.” Product names, outcomes, and pricing exist in the catalog; keep those facts and use direct copy. Avoid inventing metrics, customer brands, ratings, or testimonials. The homepage has no FAQ of its own.
- **Components and imagery:** keep the functioning size, upsell, and subscription demo. Add a bundles vignette, replace stickers with quiet labels, use an asymmetric app showcase and open question/answer layout. The existing SVG favicon and shared social images still use an older serif/violet identity. The latest main branch includes the official PNG mark; retain it in navigation and the favicon.
- **Code and SEO:** shared tokens and components make an in-place upgrade possible. Existing metadata, canonical URLs, JSON-LD, sitemap, legal links, support address, and custom 404 are present. No dead `href="#"` actions or alert-based error handling were found. This is a static marketing site, so dashboard loading/empty states and new forms are not needed.

## Verification

Run ESLint, TypeScript, a production build, and browser checks at desktop and mobile sizes. Exercise the demo controls, dropdown navigation, mobile keyboard behavior, app-specific install destinations, pricing, integrations, blog, legal, and 404 routes. Check reduced-motion and no-JavaScript readability. Capture before/after screenshots for review.
