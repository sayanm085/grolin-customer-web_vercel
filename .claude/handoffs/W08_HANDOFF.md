---
project: grolin
role: handoff
window: W08
status: complete
date: 2026-03-28
---
# W08 HANDOFF — Homepage Motion Choreography P12 S01+S02

> W08 is COMPLETE. P12 S01 (Hero Entrance) + S02 (Section Reveals) are done.
> P12-S03 (Micro-Interactions) begins in W09.

## What Was Accomplished

**Phase P12: Homepage Motion Choreography** — 2 sessions (S01 + S02), 2026-03-28

### Sessions Completed

| Session | Scope | Key Changes |
|---------|-------|-------------|
| P12-S01 | Hero Entrance Animation | HeroLayered.tsx stagger choreography; motion-variants.ts new variants; BottomNav crash fix |
| P12-S02 | Section Scroll Reveals | page.tsx ViewportReveal wrappers on all below-fold sections |

---

## Motion System — What's Applied

### `src/lib/motion-variants.ts` — New Exports Added in P12-S01

| Export | Physics | Use |
|--------|---------|-----|
| `heroContainer` | stagger: delayChildren:0.05, staggerChildren:0.12 | Orchestrates hero entrance children |
| `heroHeadline` | spring gentle (stiffness:120 damping:24 mass:1.2) | Hero h3 headline |
| `heroSubheadline` | spring gentle | Hero subheadline (available, not yet applied) |
| `heroCTA` | spring elastic (stiffness:180 damping:12 mass:1.0) | Hero CTA row |
| `heroTrustChip` | spring bounce (stiffness:220 damping:18 mass:1.0) | "Delivery in ~30 min" chip |

### `src/components/home/HeroLayered.tsx` — Hero Entrance

- First slide (index === 0) only gets entrance choreography
- `m.div heroContainer` → stagger container for content zone
- `m.h3 heroHeadline` → headline spring reveal
- `m.div heroCTA` → CTA row spring elastic
- `m.span heroTrustChip` → trust chip spring bounce
- `useReducedMotion()` guard — `!shouldReduceMotion` condition
- After entrance: hero is STILL — no continuous motion
- Non-first slides: `initial={false}` — no animation

### `src/components/layout/BottomNav.tsx` — Pre-existing Bug Fixed

- `motion` → `m` import fix (LazyMotion strict-mode crash)
- Was crashing on mobile viewport in dev (affects 375px screenshots)

### `src/app/(shop)/page.tsx` — Section Reveals Applied

| Section | ViewportReveal Variant | Delay |
|---------|----------------------|-------|
| TrustBar | `default` | 0ms |
| YourUsuals (mesh-green div) | `default` | 0ms |
| EditorialBreak | `default` | 0ms |
| CategoryDiscovery (canvas div) | `fromLeft` | 0ms |
| Featured+Collections 1-2 | `default` | 0ms |
| Promise+Collection3+CategoryGrid (mesh-warm) | `default` | 0ms |
| LocalTrustSection | `scale` | 100ms |
| Collections 4-6 | `default` | 0ms |
| BestSellers | `default` | 0ms |

**NOT wrapped** (per SCROLL_CHOREOGRAPHY.md): PromoBand, HeroLayered, Trending/Fresh/Deals canvas zone, Footer

---

## TSC State

One pre-existing error only — **CategoryRow.tsx:73** (`string | null` not assignable to `string | StaticImport`). Ignore throughout all future windows.

## Current Progress After W08

- **Progress**: 36/47 sessions (77%)
- P12 S01: ✅ Complete
- P12 S02: ✅ Complete
- P12 S03: ⬜ Not Started (belongs to W09)

## W09 Scope (P12-S03 only)

```
P12-S03: Micro-Interactions (card stagger, hover depth, button feedback)
  - Card stagger: first visible card set only (cardContainer + cardItem, 0.07s)
  - ProductCard hover: translateY(-4px) + shadow-5 at 280ms
  - AddToCartButton: btn-press scale(0.97) feedback
```

## DO NOT REPEAT IN P12-S03

- Do not re-add ViewportReveal to sections (already done in S02)
- Do not animate more than first card set in any block (S03 rule)
- Do NOT animate hero again (S01 is complete)
- Do NOT add more LazyMotion providers
- Pre-existing TSC error: CategoryRow.tsx:73 — ignore

## Import Reference for W09

```tsx
// ViewportReveal (already imported in page.tsx — do not re-wrap)
import { ViewportReveal } from '@/components/shared/ViewportReveal'

// Card stagger variants
import { cardContainer, cardItem } from '@/lib/motion-variants'

// Spring micro-interactions
import { m } from 'framer-motion'
// Hero variants (do not modify)
import { heroContainer, heroHeadline, heroCTA, heroTrustChip } from '@/lib/motion-variants'
```

## Route Scores After W08

| Route | After W08 | Target |
|-------|-----------|--------|
| / (guest) | ~9.0 | 9.5 |
| / (logged-in) | ~9.2 | 9.8 |
| Other routes | unchanged | — |

*Scores will rise further after P12-S03 applies card stagger and hover depth.*

## Next: P12-S03 Start (W09)

```
1. Read .grolin-transform/sessions/P12-S03-micro-interactions.md
2. CONFIRM: "I am executing P12-S03: Micro-Interactions"
3. Apply: card stagger (cardContainer + cardItem) to first visible card sets
4. Apply: hover depth to ProductCard (translateY + shadow)
5. Apply: btn-press scale feedback to commerce CTAs
```
