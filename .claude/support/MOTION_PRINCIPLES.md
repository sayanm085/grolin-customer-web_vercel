---
project: grolin
role: support
---
# MOTION PRINCIPLES

> Motion should be felt more than noticed. It supports comprehension and delight, never decorates.
> Reference: ui-ux-pro-max §7 Animation, ANIMATION_TOOLKIT.md, Framer Motion best practices.

---

## Motion Budget

- **ONE** hero-level continuous motion zone maximum
- Section headings reveal **once** on scroll (never re-trigger)
- Only **first visible set** of cards in a block should stagger
- Large repeated sections: do NOT animate every child
- Hover effects: subtle, mostly transform-based
- Scroll-linked: reserved for **2-3 premium surfaces** only
- Maximum **3 concurrent animations** on screen at any time

## Motion Categories

| Category | Duration/Spring | Easing | Use |
|----------|----------------|--------|-----|
| Micro-feedback | 120-180ms | ease-out | Tap, hover color, button press |
| State change | 250-320ms | ease | Toggle, tab switch, quantity morph |
| Spring entry | stiffness:220, damping:18 | spring | Floating cards, badges, scale-in |
| Viewport reveal | stiffness:120, damping:24, mass:1.2 | spring | Section headings, card grids |
| Content stagger | 0.07-0.12s per child | — | Card grids, list items |
| Panel open | 320-380ms | ease-in | Drawers, modals, sheets |
| Panel close | 250ms | ease-out | Always faster than open |
| Skeleton shimmer | 1500ms | linear infinite | Warm ivory gradient sweep |

## Page-Load Choreography

1. Header appears immediately (no animation — stability anchor)
2. Hero headline staggers in (0→400ms)
3. Hero support elements follow (200→600ms)
4. Trust strip reveals on scroll
5. Subsequent sections reveal once per viewport entry

## Performance Rules (CRITICAL)

- Animate ONLY `transform` + `opacity` (GPU-composited)
- NEVER animate `width`, `height`, `top`, `left`, `padding`, `margin`
- Use `will-change: transform` on continuously animated elements ONLY
- Use `once: true` on all viewport triggers
- Use LazyMotion with `domAnimation` (~15KB savings)
- Respect `prefers-reduced-motion` — simplify, don't remove
- Keep per-frame main thread work under ~16ms for 60fps
- Use `m.div` (not `motion.div`) for tree-shaking

## Advanced Rules (from ui-ux-pro-max §7)

### Timing & Feel
- `duration-timing`: 150-300ms micro-interactions, ≤400ms complex transitions, NEVER >500ms
- `exit-faster-than-enter`: Exit animations 60-70% of enter duration for responsive feel
- `easing`: ease-out for entering, ease-in for exiting; avoid linear for UI
- `spring-physics`: Prefer spring/physics-based curves over cubic-bezier for natural feel

### Choreography
- `stagger-sequence`: 30-50ms per item; avoid all-at-once or too-slow reveals
- `hierarchy-motion`: Translate/scale direction expresses hierarchy (below = deeper, up = back)
- `modal-motion`: Modals/sheets animate from their trigger source (scale+fade or slide-in)
- `navigation-direction`: Forward = left/up; backward = right/down — keep consistent

### Restraint
- `excessive-motion`: Max 1-2 animated elements per view transition
- `motion-meaning`: Every animation must express cause-effect, not decoration
- `opacity-threshold`: Fading elements should not linger below opacity 0.2
- `layout-shift-avoid`: Animations must NOT cause layout reflow or CLS

### Interaction Feedback
- `scale-feedback`: Subtle scale (0.95-1.05) on press for tappable cards/buttons
- `gesture-feedback`: Drag/swipe must provide real-time visual response tracking the finger
- `interruptible`: Animations must be interruptible; user tap cancels in-progress animation
- `no-blocking-animation`: Never block user input during an animation

### Content Transitions
- `state-transition`: State changes (hover/active/expanded/collapsed) animate smoothly, not snap
- `continuity`: Page transitions maintain spatial continuity (shared element, directional slide)
- `fade-crossfade`: Use crossfade for content replacement within the same container

## Playwright Verification Commands

```bash
# Take hero entrance screenshot at 375px
npx playwright screenshot --viewport-size="375,812" http://localhost:3001 hero-375.png

# Take hero entrance screenshot at 1280px
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001 hero-1280.png

# Scroll performance check (visual jank detection)
# Use Playwright MCP to navigate and scroll the page, checking for smooth 60fps
```

## Figma Reference

Use Figma MCP to inspect any design files for motion timing, easing curves, and interaction specifications. Authenticate with kumarmondalsouvik@gmail.com.

---

*Motion Principles for the Grolin frontend transformation. Read this file for ALL motion windows (W08, W09, W10).*
