---
project: grolin
role: phase
phase: P10
window: W05
status: planned
---
# PHASE 10 — CROSS-ROUTE PREMIUM CONSISTENCY

## Phase Identity
- **Number**: 10
- **Name**: Cross-Route Premium Consistency
- **Status**: ⬜ Not Started
- **Dependencies**: P03-P09 all completed and approved

---

## Objective

Extend the premium design language established on the homepage to every route in the application. A premium homepage with generic inner routes creates a broken brand experience. Every surface must feel like it belongs to the same product.

## Why This Phase Exists

This is the most important consistency pass. Users navigate between routes constantly. If `/categories` feels generic while `/` feels premium, the brand promise breaks. This phase ensures system-wide coherence.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P10-S01-categories-search.md` | Categories & Search | Discovery route premium treatment |
| S02 | `P10-S02-product-detail.md` | Product Detail Page | PDP immersive layout and trust |
| S03 | `P10-S03-cart-checkout.md` | Cart & Checkout | Commerce flow confidence and clarity |
| S04 | `P10-S04-account-routes.md` | Account Routes | Orders, profile, wallet, auth consistency |

## In-Scope Files

```
MODIFY (className only — NO logic changes):
  src/app/(shop)/categories/page.tsx
  src/app/(shop)/categories/[id]/page.tsx
  src/app/(shop)/search/page.tsx
  src/app/(shop)/products/[slug]/page.tsx
  src/app/(shop)/cart/page.tsx
  src/app/(shop)/checkout/page.tsx
  src/app/(shop)/orders/page.tsx
  src/app/(shop)/orders/[id]/page.tsx
  src/app/(shop)/profile/page.tsx
  src/app/(shop)/wallet/page.tsx
  src/app/(auth)/**/page.tsx
  src/components/cart/*.tsx
  src/components/checkout/*.tsx
  src/components/order/*.tsx
  src/components/profile/*.tsx
  src/components/wallet/*.tsx
  src/components/auth/*.tsx
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. Every route uses warm canvas background
2. Cards use shadow system everywhere (not borders)
3. Typography hierarchy is consistent across all routes
4. Empty/loading states match brand language
5. Auth pages feel premium (purple mesh + editorial heading)
6. Commerce flow (cart → checkout) feels confident and stable

---

*Phase file for P10.*
