---
project: grolin
role: handoff
window: W09
status: complete
date: 2026-03-28
---
# W09 HANDOFF — Homepage Motion Choreography P12 S03 (COMPLETE)

> W09 is COMPLETE. P12 is fully complete (S01 + S02 + S03 done).
> P13 (Loading, Empty & Transitional) begins in W10.

## What Was Accomplished

**Phase P12: Homepage Motion Choreography** — Session S03, 2026-03-28

| Session | Scope | Key Changes |
|---------|-------|-------------|
| P12-S03 | Card Stagger + Micro-Interactions + Parallax | globals.css hover system; ProductGrid stagger; HomeTrendingGrid stagger; HeroLayered parallax |

---

## Motion System — What's Applied in S03

### `src/app/globals.css` — Hover System Updated

| Class | Spec | Change |
|-------|------|--------|
| `.card-hover` | 280ms cubic-bezier(0.22,1,0.36,1) + shadow-level-5 | Updated from 220ms + hardcoded shadow |
| `.btn-press` | transition: 150ms ease-out (base rule added) | Added base transition rule |
| `.btn-press:active` | scale(0.97) + shadow-level-1 | Updated from scale(0.96) 80ms |
| `.category-card-hover` | scale(1.02) + shadow-3, 250ms | NEW |
| `.chip-hover` | translateY(-1px) + surface-subtle bg, 120ms | NEW |

### `src/components/product/ProductGrid.tsx` — Card Stagger

- Replaced custom `containerVariants` (0.05s) + `itemVariants` with `cardContainer` + `cardItem` (0.07s) from `motion-variants.ts`
- Switched from `useInView` + `animate` pattern → `whileInView` + `viewport={{ once: true, margin: '-80px 0px' }}`
- Max 8 items get stagger animation — items 9+ render as plain `<div>` (no stagger)
- Removed `react-intersection-observer` usage (replaced by Framer's built-in `whileInView`)

### `src/components/home/HomeTrendingGrid.tsx` — First Homepage Card Grid Stagger

- Added `'use client'` directive
- First visible product card grid on homepage now staggers with `cardContainer` + `cardItem` (0.07s stagger)
- Max 8 children stagger — remaining render immediately
- `whileInView` with `once: true` — never re-triggers

### `src/components/home/HeroLayered.tsx` — GROLIN Watermark Parallax

- Import: added `useScroll`, `useTransform` from framer-motion
- Added `scrollY` + `watermarkY` (drifts up 100px over first 400px scroll = 25% speed)
- GROLIN watermark: `<span>` → `<m.span>` with `style={{ y: watermarkY }}`
- `shouldReduceMotion` guard: passes `y: 0` (no drift) when reduced motion preferred
- Desktop only: `hidden md:block` class unchanged — mobile never sees this element

---

## Parallax Budget (max 3 surfaces)

| Surface | Speed | Status |
|---------|-------|--------|
| GROLIN watermark | 25% (100px / 400px) | ✅ Used in S03 |
| Produce scatter | 15% | Available for P13/P14 if needed |
| Dark editorial | 10% | Available |

---

## TSC State

One pre-existing error only — **CategoryRow.tsx:73**. Ignore throughout.

## Current Progress After W09

- **Progress**: 37/47 sessions (79%)
- P12 S01: ✅ Complete
- P12 S02: ✅ Complete
- P12 S03: ✅ Complete — **P12 FULLY COMPLETE ✅**

## W10 Scope (P13 — 2 sessions)

```
P13: Loading, Empty & Transitional States
  S01: Skeleton Screen Warmth — warm shimmer on all skeleton components
  S02: Empty State Polish — illustrated/textured empty states for all zero-data routes
```

## DO NOT REPEAT IN P13

- Do not re-stagger product grids (already done in S03)
- Do not add more parallax surfaces without checking budget (1 of 3 used)
- Do not touch HeroLayered hero entrance (P12-S01 is complete)
- Do not touch ViewportReveal wrappers (P12-S02 is complete)
- Do not modify ProductCard.tsx motion (whileHover/whileTap already good — P08 + existing)
- Pre-existing TSC error: CategoryRow.tsx:73 — ignore

## Import Reference for W10

```tsx
// Skeleton shimmer
// Use .skeleton-warm CSS class (from ANIMATION_TOOLKIT §6 — or add if not present)
// Warm gradient: from-[#F5F1EC] via-[#EDE8E3] to-[#E8E2DA]

// ViewportReveal (if needed for empty states)
import { ViewportReveal } from '@/components/shared/ViewportReveal'

// Spring entry for empty state illustrations
import { springBounce } from '@/lib/motion-variants'
```
