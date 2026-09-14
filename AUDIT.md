# AppFox Website Design Audit

## Executive Summary

This document audits getappfox.com against premium design standards defined in the elayadesign `redesign-existing-projects` skill. The site has a solid foundation ("The Counter" aesthetic: cream paper, violet brand, Hanken Grotesk/Spline Mono) but exhibits several generic AI patterns and opportunities for elevation.

**Current Design Identity:**
- Fonts: Hanken Grotesk (display + body), Spline Sans Mono (mono)
- Colors: Electric violet (#7c3aed) on cool lavender-white (#f5f3fa)
- Weight hierarchy: 500/600/700/800 in use
- Strong structural foundation with semantic theming

**Target State (Design Values from skill):**
- Fonts: Geist (not Hanken), Manrope, Geist Mono (not Spline Mono), Poppins
- Dark backgrounds: #000000, #181818, #1F1F1F, #272727, #313131, #131209
- Zero background gradients; hero text gradient only
- Motion: cubic-bezier(0.32,0.72,0,1), duration-700, IntersectionObserver reveals
- Spacing: 0,2,4,8,12,16,24,32,40,48,64,80,96px scale
- Icons: Phosphor, Solar, or Iconamoon (current uses inline SVGs)

---

## 1. Typography

### ❌ Issues Found

1. **Non-approved fonts in use**
   - Current: Hanken Grotesk (display + body), Spline Sans Mono (mono)
   - Required: Geist, Manrope, Geist Mono, or Poppins
   - **Impact:** Immediate visual lift from font swap (highest priority fix)

2. **Ultra bold weight (800) on headings**
   - Lines 105, 112, 139, 141 in `app/globals.css`: `font-weight: 800`
   - Skill requirement: Cap at semibold (600) or bold (700)
   - **Fix:** Change all h1/h2 weights from 800 → 700

3. **Off-scale font sizes**
   - `app/globals.css` line 85: `font-size: 1.0625rem` (17px - not on Tailwind scale)
   - `app/globals.css` line 106: `font-size: clamp(...)` with fluid sizing
   - Navbar: `text-[0.9375rem]` (15px), `text-[0.8125rem]` (13px), `text-[0.6875rem]` (11px)
   - **Fix:** Snap to Tailwind scale: text-sm (14px), text-base (16px), text-lg (18px)

4. **Custom line heights outside Tailwind scale**
   - `app/globals.css` line 86: `line-height: 1.65`
   - **Fix:** Use Tailwind default line heights from type scale

5. **Missing medium (500) and semibold (600) hierarchy**
   - Current weights: 500 (mono only), 600 (buttons), 700, 800
   - Opportunity: Introduce semibold text for better hierarchy

### ✅ Strengths

- No italics in use ✓
- Tabular nums properly applied (`.till` class) ✓
- Negative tracking on large headings ✓
- No hyphens in copy ✓

---

## 2. Color and Surfaces

### ❌ Issues Found

1. **Background gradients present**
   - `.paper-wash` (lines 194-197): Radial gradient backgrounds
   - `.night-wash` (lines 199-203): Radial gradient backgrounds
   - **Skill violation:** "Zero background gradients. Backgrounds are flat."
   - **Fix:** Remove all `background-image` gradients; use flat backgrounds only

2. **Dark background not from approved palette**
   - Current: `--color-night: #1a1a1a`
   - Approved: #000000, #181818, #1F1F1F, #272727, #313131, #131209
   - **Fix:** Snap to #181818 (closest match)

3. **Missing hero text gradient**
   - Hero heading at `components/brand/BrandHero.tsx` lines 26-48 has no text gradient
   - Skill requirement: "Hero heading with flat text color → Apply the approved left to right text gradient"
   - **Fix:** Add `bg-gradient-to-r from-[#FFFFFF] to-[#9B9B9B] bg-clip-text text-transparent` to hero h1

4. **Multiple accent colors**
   - Brand violet (#7c3aed) + Marigold yellow (#eec15a) both prominent
   - Skill requirement: "Pick one. Remove the rest."
   - **Decision:** Keep violet as primary; marigold as secondary is acceptable per current brand

### ✅ Strengths

- Consistent gray family (cool lavender tint) ✓
- Tinted shadows (violet-tinted) ✓
- Subtle grain texture applied ✓

---

## 3. Layout and Spacing

### ❌ Issues Found

1. **Three-equal-column feature grid**
   - `components/brand/WhyAppfox.tsx` line 39: `lg:grid-cols-4` (four equal columns)
   - Skill violation: "Three equal card columns as the feature row - The most generic AI layout"
   - **Fix:** While this is 4 columns not 3, equal widths still read generic. Consider asymmetric layout or accept as-is since content suits columnar treatment

2. **Spacing values off-scale**
   - Various components use `gap-7`, `gap-5`, `mt-5`, `pt-9` etc.
   - Approved scale: 0,2,4,8,12,16,24,32,40,48,64,80,96 (in px: 0,0.5,1,2,3,4,6,8,10,12,16,20,24)
   - **Fix:** Audit all spacing; snap to approved Tailwind scale values

3. **No floating island navbar**
   - Current: Fixed header with backdrop blur, not island pattern
   - Skill requirement: "Standard docked navbar → floating island pattern"
   - **Fix:** Transform navbar to `mt-6 mx-auto w-max rounded-full` glass pill

4. **Nested radius formula not applied**
   - Various nested cards (dropdown menus, vignettes) use fixed radius values
   - Skill formula: `inner = outer − gap` when gap < 32 and result > 2
   - **Fix:** Apply formula to nested elements

### ✅ Strengths

- Max-width container present (7xl = 1280px) ✓
- Grid over flexbox percentage math ✓
- `min-h-full` preferred over `height: 100vh` ✓

---

## 4. Interactivity and States

### ❌ Issues Found

1. **Scroll listener on navbar**
   - `components/site/Navbar.tsx` lines 74-79: `window.addEventListener('scroll')`
   - Skill violation: "Replace with IntersectionObserver"
   - **Fix:** Remove scroll listener; implement island nav that doesn't need scroll detection

2. **Instant transitions on dropdowns**
   - `components/site/Navbar.tsx` line 127: `transition-all duration-200`
   - Skill requirement: Baseline `duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`
   - **Fix:** Update all transitions to match skill easing curve and duration

3. **Mobile menu not screen-filling overlay**
   - `components/site/Navbar.tsx` line 370: Uses `bg-paper` not `backdrop-blur-3xl`
   - Skill requirement: "Screen filling overlay with backdrop-blur-3xl over bg-black/80"
   - **Fix:** Add backdrop blur and darker overlay

4. **Hamburger icon swaps, doesn't transform**
   - Lines 355-363: Icons swap instead of animating
   - Skill requirement: "Lines must rotate and translate into true X"
   - **Fix:** Implement animated hamburger with transform

5. **Scroll-driven reveals already use IntersectionObserver** ✓
   - `components/ui/InView.tsx` properly implements this
   - Animation vocabulary in `app/globals.css` lines 395-517 is robust

### ✅ Strengths

- Focus rings present ✓
- Hover states on buttons ✓
- Active/pressed feedback (scale/translate) ✓
- Smooth scroll enabled ✓
- GPU-accelerated animations (transform/opacity) ✓

---

## 5. Motion and Animation

### ❌ Issues Found

1. **Easing curves not matching skill specification**
   - Current: `--ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1)`
   - Required: `cubic-bezier(0.32,0.72,0,1)`
   - **Fix:** Update all easing curves to match skill exactly

2. **Scroll reveals use 600ms, not 700ms+ baseline**
   - `app/globals.css` line 398: `transition: opacity 600ms`
   - Skill requirement: "baseline duration-700; scroll reveals 800ms or longer"
   - **Fix:** Increase reveal durations

3. **Motion timing too fast across the board**
   - Button transitions: `200ms` (lines 261, 342)
   - Skill: "never below 200ms" but baseline is 700ms
   - **Fix:** Increase to 700ms baseline, keep micro-interactions at 300-400ms minimum

### ✅ Strengths

- IntersectionObserver used correctly ✓
- Heavy fade-up on scroll entry ✓
- Staggered delays implemented ✓
- Reduced motion query present ✓

---

## 6. Component Patterns

### ❌ Issues Found

1. **Generic card pattern**
   - `.card` class (line 325): border + shadow + white bg
   - Skill note: "Cards should exist only where elevation communicates hierarchy"
   - **Assessment:** Current cards serve hierarchy; acceptable but could reduce borders

2. **Accordion FAQ pattern (if present in other pages)**
   - Need to audit FAQ sections on product pages
   - Skill: Replace with side-by-side list or inline progressive disclosure

3. **"Free to start" badge**
   - `components/brand/AppShowcase.tsx` line 48: `.sticker` with rotate
   - Skill: "Try square badges, flags, or plain text labels"
   - **Assessment:** Current sticker pattern is distinctive; acceptable

### ✅ Strengths

- Button hierarchy clear (primary/secondary/marigold) ✓
- Avatar images not present (no circle vs squircle issue) ✓
- Footer not over-linked ✓

---

## 7. Iconography

### ❌ Issues Found

1. **Generic chevron SVGs**
   - `components/site/Navbar.tsx`: Inline path SVGs for dropdown arrows
   - Skill requirement: Use Phosphor, Solar, or Iconamoon
   - **Fix:** Replace with Phosphor icons or create icon component library

2. **Inconsistent icon treatment**
   - Some inline SVGs, some via components
   - **Fix:** Standardize icon system

### ✅ Strengths

- No Lucide/Feather/Material in use ✓
- Consistent stroke treatment where present ✓

---

## 8. Content and Copy

### ❌ Issues Found

1. **"Seamless" in potential copy**
   - Need to audit all body text for AI cliches
   - Forbidden: Elevate, Seamless, Unleash, Next Gen, Game changer, Delve

2. **CTA language**
   - "Explore the apps" is acceptable
   - "Install free" is strong and specific ✓

### ✅ Strengths

- Specific value props ("50 edits a month", "5-minute setup") ✓
- No exclamation marks ✓
- No Lorem Ipsum ✓
- Real organic copy throughout ✓

---

## 9. Code Quality

### ❌ Issues Found

1. **CSS custom properties in Tailwind classes**
   - `shadow-(--shadow-raised)` syntax used
   - Should use Tailwind v4 `@theme` values directly

2. **Arbitrary values throughout**
   - Many `text-[0.9375rem]` style values
   - **Fix:** Snap to Tailwind scale

### ✅ Strengths

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`) ✓
- Alt text present on images ✓
- Meta tags comprehensive ✓
- Legal links in footer ✓
- 404 page exists ✓

---

## 10. Strategic Omissions

### ✅ All Present

- Privacy policy link ✓
- Terms of service link ✓
- Back navigation present ✓
- Custom 404 exists ✓
- Skip to content link (could verify) ?
- Cookie consent (jurisdiction dependent) —

---

## Fix Priority (from skill)

Following the skill's priority order:

### Priority 1: Font Swap ✅ REQUIRED
- Replace Hanken Grotesk → Geist or Manrope
- Replace Spline Sans Mono → Geist Mono
- Update `app/layout.tsx` imports
- Update `@theme inline` font definitions

### Priority 2: Color and Surface Cleanup ✅ REQUIRED
- Remove `.paper-wash` and `.night-wash` background gradients
- Snap `--color-night` from #1a1a1a → #181818
- Add hero text gradient (dark: #FFFFFF → #9B9B9B)
- Ensure all dark backgrounds use approved values

### Priority 3: Hover, Active, Focus States ✅ REQUIRED
- Update all transition durations to 700ms baseline
- Update easing curves to `cubic-bezier(0.32,0.72,0,1)`
- Verify focus rings present everywhere

### Priority 4: Layout and Spacing ✅ REQUIRED
- Implement floating island navbar
- Audit and snap all spacing values to approved scale
- Apply nested radius formula

### Priority 5: Motion Pass ✅ REQUIRED
- Update scroll reveal durations to 800ms+
- Remove navbar scroll listener
- Implement animated hamburger menu
- Update mobile menu to full-screen blur overlay

### Priority 6: Replace Generic Components
- Review FAQ sections if present
- Standardize icon system (Phosphor)

### Priority 7: Loading/Empty/Error States
- Audit for presence (likely acceptable as-is)

### Priority 8: Copy Pass
- Scan for AI cliches
- Verify CTAs are specific

### Priority 9: Type Scale Polish ✅ REQUIRED
- Eliminate all arbitrary font sizes
- Snap to Tailwind scale exclusively

---

## Conclusion

The AppFox website has a solid branded foundation but exhibits several patterns that mark it as AI-generated or generic:

**Critical violations:**
1. Background gradients (paper-wash, night-wash)
2. Wrong fonts (Hanken/Spline instead of Geist/Geist Mono)
3. Ultra-bold weights (800)
4. Standard docked navbar instead of floating island
5. Easing curves don't match skill specification

**Quick wins:**
1. Font swap → instant premium lift
2. Remove background gradients → cleaner, more confident
3. Hero text gradient → sophisticated highlight
4. Floating island nav → modern, premium

**Preserving:**
- All product info, URLs, install links
- AppFox logo at `public/images/brand/appfox-icon.png`
- Routes, SEO, Analytics, Crisp
- Blog limit of 6 posts on homepage

This audit establishes the baseline. Fixes proceed in priority order next.
