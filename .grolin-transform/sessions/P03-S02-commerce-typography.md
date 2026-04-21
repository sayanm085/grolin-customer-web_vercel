---
project: grolin
role: session
phase: P03
session: S02
window: W02
status: complete
---
# SESSION P03-S02 — COMMERCE TYPOGRAPHY (CARDS, PRICES, BADGES)

## Session Identity
- **Phase**: P03 — Typography & Hierarchy System
- **Session**: S02 of 3
- **Title**: Commerce Typography
- **Status**: ⬜ Not Started

---

## Objective

Apply precise typography to commerce surfaces: product card names (15px/700), prices (current: 16px/800 tabular-nums, original: 12px/500 line-through), badges/chips (10px/700), and descriptions (14px/500).

## Pre-Session Confirmation

> "I am executing P03-S02: Commerce Typography. Files in scope: ProductCard, ProductPrice, AddToCartButton, CategoryCard, badge/chip components. className changes ONLY."

## Implementation Focus

### Commerce Type Scale

| Element | Size | Weight | Special |
|---------|------|--------|---------|
| Product name | 15px / md:17px | 700 | tight leading |
| Current price | 16px / md:18px | 800 | tabular-nums, --shop-ink |
| Original price | 12px / md:13px | 500 | tabular-nums, line-through, --shop-ink-faint |
| Discount badge | 10px / md:11px | 700 | tracking 0.04em, --shop-discount |
| Weight/unit | 12px | 500 | --shop-ink-muted |
| Button text | 14px / md:15px | 700 | tracking 0.01em |
| "Add to cart" | 14px | 700 | --shop-surface (on green bg) |

### Files to Modify

```
src/components/product/ProductCard.tsx     → name, description text
src/components/product/ProductPrice.tsx    → price display
src/components/product/AddToCartButton.tsx → button text
src/components/home/CategoryCard.tsx       → category name
src/components/cart/CartItem.tsx           → cart item name, price
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Product names 15px/700 with tight leading
- [ ] Prices use tabular-nums and proper emphasis
- [ ] Badges/chips 10-11px with tracking
- [ ] No truncation issues at 375px


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  src/components/cart/CartItem.tsx
  src/components/cart/CartItemMobile.tsx
  src/components/home/BestSellersShowcase.tsx

Key changes:
  - CartItem/CartItemMobile: item price text-sm→text-[16px] font-semibold→font-bold + tabular-nums
  - CartItem/CartItemMobile: item name font-semibold→font-bold
  - CartItem/CartItemMobile: subtotal font-bold→font-extrabold + tabular-nums, tracking-[-0.04em]→tracking-[-0.03em]
  - CartItem/CartItemMobile: discount badge font-semibold→font-bold + tracking-[0.04em]
  - BestSellersShowcase: side item name font-semibold→font-bold
  - BestSellersShowcase: side discount badge font-semibold→font-bold + tracking-[0.04em]
  - BestSellersShowcase: side price + tabular-nums, tracking-tight→tracking-[-0.03em]
  - BestSellersShowcase: spotlight h4 font-bold→font-extrabold, tracking-tight→tracking-[-0.025em]
  - BestSellersShowcase: spotlight price + tabular-nums, tracking-tight→tracking-[-0.03em]

Issues found:
  - ProductCard already had excellent commerce typography — no changes needed
  - ProductInfo already had font-extrabold prices — no changes needed
  - No CategoryCard component found (not present in codebase)

Next session (P03-S03) should know:
  - Commerce surfaces on product card and product detail page are already solid
  - P03-S03 focuses on nav labels, footer text, metadata — chrome/utility text
  - Profile/wallet/review/address pages still use old gray-900 system — address in S03
```

---

*Session file for P03-S02.*
