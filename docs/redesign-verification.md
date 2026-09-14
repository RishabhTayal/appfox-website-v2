# AppFox redesign verification

Verified on September 14, 2026 against the production build, after rebasing onto the latest main branch.

## Build checks

- `npm run lint`: passed without warnings.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; 345 static pages generated.
- `git diff --check`: passed.

## Browser checks

70 assertions passed in Chromium, using agent-browser and its Chrome DevTools connection. No browser runtime errors were observed. These checks cover local UI behavior; they do not install apps or submit orders to Shopify.

- Confirmed the graphite theme, self-hosted Geist, official logo, and one main heading/skip destination on the homepage.
- Changed the demo size, added and removed gift wrap, and toggled monthly delivery. Verified totals of $48.00, $52.00, $46.80, and $43.20, plus live status announcements.
- Exercised desktop dropdowns, product-link navigation, Escape dismissal, and focus restoration.
- Checked the mobile dialog, background inertness, scroll lock, forward/reverse focus wrapping, Escape restoration, and desktop breakpoint cleanup.
- Checked desktop rendering for the app catalog, feature hub, three product pages, pricing hub and product pricing pages, integrations, blog/index article, privacy, terms, and comparison hub/detail.
- Checked mobile overflow on product, pricing, integrations, blog, legal, and comparison pages at 390px. Checked the homepage at 320px, 390px, 768px, and 1440px.
- Confirmed product-specific install links, including Subscription on the integrations page and Product Bundles on its landing page.
- Confirmed visible content with reduced motion and with JavaScript disabled, branded 404 recovery, and the legacy favicon redirect to the official PNG.

## Screenshots

Screenshots live in [pr-screenshots/redesign](pr-screenshots/redesign). The full-page captures use reduced motion so every section is visible. The before image was captured from the original local checkout; final captures include the official logo and newer articles from main.

- [Before desktop](pr-screenshots/redesign/before-desktop.png)
- [After desktop](pr-screenshots/redesign/after-desktop.png)
- [Full homepage](pr-screenshots/redesign/after-full.png)
- [Mobile homepage](pr-screenshots/redesign/after-mobile.png)
- [Mobile menu](pr-screenshots/redesign/mobile-menu.png)
- Product, pricing, and integrations screenshots are included in the same directory.
