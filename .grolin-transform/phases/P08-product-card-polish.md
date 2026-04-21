---
project: grolin
role: phase
phase: P08
window: W04
status: complete
---
# PHASE 08 — PRODUCT CARD & DISCOVERY POLISH

## Phase Identity
- **Number**: 08
- **Name**: Product Card & Discovery Polish
- **Status**: ✅ Complete
- **Dependencies**: P04 completed and approved

---

## Objective

Elevate the product card — the most repeated and interacted-with surface in the entire application. Make cards feel tactile with hover lift, smooth add-to-cart transitions, clean scan patterns, and premium visual treatment.

## Why This Phase Exists

Product cards appear on every commerce page — homepage, categories, search, collections. They are the core brand-touch surface users interact with most. If cards feel cheap, the entire product feels cheap regardless of how good the hero looks. This phase has the highest leverage-per-change ratio.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P08-S01-card-visual.md` | Card Visual Surgery | Shadow, image zone, typography, price display |
| S02 | `P08-S02-interaction-states.md` | Interaction States | Hover lift, press feedback, add-to-cart animation |
| S03 | `P08-S03-grid-category-cards.md` | Grid & Category Cards | Product grid layout, category card treatment |

## Card Interaction States Reference

| State | Visual Treatment |
|-------|-----------------|
| Rest | shadow-1, white background, 22px radius |
| Hover | translateY(-4px), shadow-5, purple accent top bar animates in |
| Press/Active | scale(0.98), shadow-1 |
| Focus-visible | ring-2 ring-primary, ring-offset-2 |
| Disabled | opacity-0.5, pointer-events-none |

## In-Scope Files

```
MODIFY:
  src/components/product/ProductCard.tsx      → card visual treatment
  src/components/product/ProductGrid.tsx      → grid layout
  src/components/product/AddToCartButton.tsx  → CTA styling
  src/components/product/ProductPrice.tsx     → price display
  src/components/home/CategoryCard.tsx        → category card treatment
  src/app/globals.css                         → card-hover, btn-press utilities
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. Product cards look premium at rest (floating, warm shadows)
2. All interaction states defined and working
3. Add-to-cart transition is smooth
4. Grids display correctly at all breakpoints
5. Category cards match the premium system

---

*Phase file for P08.*
