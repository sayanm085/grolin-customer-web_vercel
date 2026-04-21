---
project: grolin
role: session
phase: P04
session: S02
window: W02
status: complete
---
# SESSION P04-S02 — CARD BORDER → SHADOW REPLACEMENT

## Session Identity
- **Phase**: P04 — Surface & Depth System
- **Session**: S02 of 3
- **Title**: Card Elevation
- **Status**: ⬜ Not Started

---

## Objective

Replace border-based card separation with shadow-based elevation site-wide. Every card that currently uses `border` as its primary visual separation must be converted to use the warm shadow system. This is the single highest-impact visual premium upgrade.

## Pre-Session Confirmation

> "I am executing P04-S02: Card Elevation. I will replace border-dependent card styling with shadow-based elevation across all card components. className changes ONLY."

## Implementation Focus

### The Change Pattern

```
BEFORE: className="... border border-gray-200 rounded-xl ..."
AFTER:  className="... rounded-[22px] shadow-[var(--shadow-1)] ..."

BEFORE: className="... border border-shop-border ..."
AFTER:  className="... shadow-[var(--shadow-1)] ..."
```

### Shadow Assignment by Card Type

| Card Type | Rest Shadow | Hover Shadow |
|-----------|------------|-------------|
| Product card | shadow-1 | shadow-5 |
| Category card | shadow-1 | shadow-2 |
| Cart item card | shadow-1 | — |
| Order card | shadow-1 | shadow-2 |
| Trust card | shadow-1 | — |
| Promo card | shadow-2 | shadow-5 |
| Auth card | shadow-3 (purple tint) | — |
| Wallet card | shadow-3 (purple tint) | — |

### Components to Modify

```
src/components/product/ProductCard.tsx        → primary product cards
src/components/home/CategoryCard.tsx          → category navigation cards
src/components/home/EditorialBannerCard.tsx   → collection cards
src/components/home/TrustBar.tsx              → trust items
src/components/cart/CartItem.tsx              → cart line items
src/components/order/OrderCard.tsx            → order history cards
src/components/checkout/*.tsx                 → checkout summary cards
src/components/profile/*.tsx                  → profile section cards
src/components/wallet/*.tsx                   → wallet cards
```

### Important Rules

1. Keep `border` ONLY for form inputs (input borders are expected UX)
2. Keep subtle `border-b` for list item dividers (these are separators, not boxes)
3. Cards should have `bg-white` (or `bg-[var(--shop-surface)]`) to create the elevation effect
4. Card `border-radius` should be `rounded-[22px]` (Grolin signature)

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] No card uses border as primary visual separator
- [ ] All product cards use shadow-1 at rest
- [ ] Cards feel like they float above the page surface
- [ ] Form inputs STILL have borders (not converted)
- [ ] Dark mode cards still look correct
- [ ] 375px mobile — cards are properly spaced


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  src/components/order/OrderCard.tsx
  src/components/checkout/AddressStep.tsx
  src/components/checkout/OrderSummaryPanel.tsx
  src/components/checkout/PaymentStep.tsx
  src/components/cart/CartSummary.tsx
  src/components/cart/CartItem.tsx
  src/components/cart/CartItemMobile.tsx
  src/components/home/BestSellersShowcase.tsx

Key changes:
  - OrderCard: border removed, shadow-level-1→shadow-level-2, radius 16px→22px
  - AddressStep: card borders removed, shadows upgraded
  - OrderSummaryPanel: border removed, shadow-level-2→shadow-level-3
  - PaymentStep: two card panels border removed, shadow added
  - CartSummary outer: border removed, shadow-level-2→shadow-level-3
  - CartSummary inner delivery card: border removed, shadow added
  - CartItem: border removed, radius 16px→22px
  - CartItemMobile inner article: border removed, radius 16px→22px
  - BestSellersShowcase outer: border removed, shadow-level-2→shadow-level-3
  - BestSellersShowcase spotlight: border removed

Already correct — no changes needed:
  - ProductCard: already shadow-only (no border) ✅
  - Form inputs kept borders (intentional UX) ✅
  - Image thumbnail containers kept subtle borders (product containment) ✅

P04-S03 should know:
  - Texture/grain is already applied on hero (mesh-warm grain-overlay) and trust section (mesh-dark grain-overlay)
  - Focus on ensuring premium surfaces (auth card, wallet card, promo cards) have grain overlay
  - Check CollectionRow cards, HomeFeatureGrid, HomeCategoryGrid for border elevation opportunities
```

---

*Session file for P04-S02.*
