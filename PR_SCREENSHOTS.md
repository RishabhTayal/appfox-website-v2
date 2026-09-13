# Premium Redesign - Screenshots Guide

This PR introduces a rebuilt AppFox homepage with Three.js, premium typography, and polished animations.

## Key Features Implemented

### 1. Three.js Hero Scene
- **File**: `components/three/CommerceScene.tsx`
- Abstract commerce geometry with floating boxes and spheres
- Soft violet lighting and ambient animation
- Respects `prefers-reduced-motion`
- Lazy-loaded for optimal LCP/SEO

### 2. Premium Typography
- **Display Font**: DM Serif Display (400, italic for accent)
- **Body Font**: Hanken Grotesk (retained)
- **Mono Voice**: Spline Sans Mono (retained)
- Enhanced type scale with refined letter-spacing and line-height
- Better hierarchy throughout the site

### 3. Enhanced Animations
- Framer Motion integration for smooth scroll animations
- Parallax effects on hero elements
- Staggered reveals on cards and lists
- Hover lift effects with scale transforms
- All animations respect `prefers-reduced-motion`

### 4. Premium Components
- `PremiumHero` - Three.js scene + refined copy
- `PremiumShowcase` - Enhanced app cards with hover effects
- `PremiumWhyAppfox` - Value props with icon treatments
- `PremiumCtaBand` - Final conversion with ambient glows
- `PremiumNavbar` - Scroll progress indicator + refined dropdowns

### 5. Design System Enhancements
- Refined color tokens (maintained brand violet + marigold)
- Better shadow hierarchy (card, raised, pop)
- Smoother easing curves
- Premium motion language throughout

## How to Tweak the Three.js Scene

The 3D scene can be customized in `components/three/CommerceScene.tsx`:

- **Colors**: Lines 38-40 (box), 52-58 (sphere), 78 (connections)
- **Animation speed**: Lines 23, 45 (Float/rotation speeds)
- **Lighting**: Lines 92-103 (ambient, directional, point lights)
- **Geometry positions**: Lines 107-112 (boxes), 114-116 (spheres)
- **Camera**: `components/three/ThreeHero.tsx` line 56 (position, FOV)

## Screenshots

Screenshots would show:
1. **Hero at rest** - Three.js scene with typography
2. **Scrolled mid-page** - App showcase cards
3. **Mobile view** - Responsive layout
4. **Animations** - Staggered reveals and hover states

## Preserved

- All existing routes working
- Brand identity (AppFox, violet on cream)
- SEO metadata and structured data
- Crisp chat, analytics
- Partner logos (only real logos)
- Install URLs and app store links
- Accessibility (keyboard nav, contrast, reduced motion)

## Performance

- Three.js lazy-loaded (doesn't block LCP)
- Static fallback for no-JS/reduced-motion
- Smooth 60fps on desktop
- Graceful degradation on mobile
- Build output: 339 static pages
