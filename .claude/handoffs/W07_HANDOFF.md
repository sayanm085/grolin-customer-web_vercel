---
project: grolin
role: handoff
window: W07
status: partial
date: 2026-03-28
---
# W07 HANDOFF — Motion System Foundation (P11)

> W07 is PARTIALLY complete. P11 (2/2 sessions) done. P12 (Homepage Motion Choreography) is the remaining W07 phase — it begins in the next context.

## What Was Accomplished

**Phase P11: Motion System Foundation** — 2 sessions, 2026-03-28

The entire motion infrastructure is now in place. Phase 12 can use it directly.

### Sessions Completed

| Session | Scope | Key Changes |
|---------|-------|-------------|
| P11-S01 | Motion Variants & LazyMotion | Expanded motion-variants.ts with full variant set |
| P11-S02 | ViewportReveal Component | Created shared/ViewportReveal.tsx with variant-select + reduced-motion API |

## Motion System — What's In Place

### `src/lib/motion-variants.ts` (canonical variants source)

| Category | Exports |
|----------|---------|
| Hero entrance | `heroHeadline`, `heroCTA`, `heroImage` |
| Viewport reveal | `viewportReveal`, `viewportRevealFromLeft`, `viewportRevealFromRight` |
| Card stagger | `cardContainer` (stagger 0.07s), `cardItem` |
| Spring entries | `springBounce` (stiffness:220 damping:18), `springGentle` (stiffness:120 damping:24 mass:1.2) |
| Scroll reveal | `fadeUp`, `eyebrowReveal` |
| Stagger (legacy) | `staggerContainer`, `staggerItem` |
| Directional | `slideInLeft`, `slideInRight` |
| Panels | `panelOpen`, `panelClose` |
| Spring pops | `springPop`, `scaleIn` |
| Nav | `bottomNavPill` |

### `src/components/shared/ViewportReveal.tsx` (NEW)

```tsx
<ViewportReveal variant="default | fromLeft | fromRight | scale" delay={100} as="section">
  {children}
</ViewportReveal>
```
- `once: true` — fires once only, never re-triggers
- `useReducedMotion()` — shows content immediately when true, no transforms
- Polymorphic `as`: `div | section | article`
- `margin` prop: IntersectionObserver root margin (default: `-80px 0px`)
- `delay` prop: milliseconds for manual staggering

### Infrastructure (pre-existing, no changes needed)

- `src/components/ui/MotionProvider.tsx` — `LazyMotion` with `domAnimation strict`
- `src/app/layout.tsx` — `MotionProvider` wrapping the entire app
- `src/app/globals.css` — `prefers-reduced-motion` block already complete
- `src/components/ui/ViewportReveal.tsx` — simpler variant (any `Variants` prop) — both coexist

## Import Reference for P12

```tsx
// Viewport-triggered section reveals
import { ViewportReveal } from '@/components/shared/ViewportReveal'

// Raw variants for motion components
import { heroHeadline, heroCTA, cardContainer, cardItem, fadeUp } from '@/lib/motion-variants'

// m.* works throughout — LazyMotion is at root
import { m, AnimatePresence } from 'framer-motion'
```

## TSC State

One pre-existing error only — **CategoryRow.tsx:73** (`string | null` not assignable to `string | StaticImport`). Ignore throughout all future windows.

## Current Progress After W07 P11

- **Progress**: 34/47 sessions (72%)
- P11: ✅ Complete (2/2)
- P12: ⬜ Not Started (3/3 remaining — IS part of W07 scope)

## W08 Scope (after P12 completes W07)

```
P13: Loading, Empty & Transitional States → 2 sessions
P14: Responsive & Accessibility            → 3 sessions
Total: 5 sessions
```

## DO NOT REPEAT IN P12

- Do not re-add LazyMotion — it is at root already
- Do not re-add `prefers-reduced-motion` to globals.css — it is already complete
- Do not modify `src/components/ui/ViewportReveal.tsx` — use `shared/ViewportReveal.tsx` for new work
- MOTION BUDGET: one hero continuous zone max; section headings reveal once; only first card set staggers
- Animate ONLY `transform` + `opacity` — NEVER width/height/top/left/padding/margin
- Pre-existing TSC error: CategoryRow.tsx:73 — ignore throughout

## Route Scores After W07 (P11)

| Route | After W07 P11 | Target |
|-------|---------------|--------|
| / (guest) | ~8.7 | 9.5 |
| / (logged-in) | ~9.0 | 9.8 |
| /categories | ~8.8 | 9.0 |
| /categories/[id] | ~8.8 | 9.0 |
| /search | ~8.6 | 8.8 |
| /products/[slug] | ~9.0 | 9.3 |
| /cart | ~9.0 | 9.2 |
| /checkout | ~9.0 | 9.2 |
| /orders | ~8.8 | 9.2 |
| /profile | ~8.6 | 9.0 |
| /wallet | ~8.6 | 9.0 |
| /auth | ~8.8 | 9.0 |

*Scores will rise after P12 applies motion choreography.*

## Next: P12-S01 Start

```
1. Read .grolin-transform/phases/P12-homepage-choreography.md
2. Read .grolin-transform/sessions/P12-S01-hero-entrance.md
3. CONFIRM: "I am executing P12-S01: Hero Entrance Animation"
4. Execute
```
