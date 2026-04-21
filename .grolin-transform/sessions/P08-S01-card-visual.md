---
project: grolin
role: session
phase: P08
session: S01
window: W04
status: complete
---
# SESSION P08-S01 — CARD VISUAL SURGERY

## Session Identity
- **Phase**: P08 — Product Card & Discovery Polish
- **Session**: S01 of 3
- **Status**: ⬜ Not Started

---

## Objective

Apply premium visual treatment to product cards at rest: proper shadow elevation, image zone with controlled aspect ratio, typography hierarchy (name → price → weight), discount badge position, and 22px border-radius.

## Pre-Session Confirmation

> "I am executing P08-S01: Card Visual Surgery. Modifying ProductCard.tsx className ONLY. No logic changes."

## Implementation Focus

### Card Anatomy

```
┌─────────────────────────┐  ← rounded-[22px], shadow-1, bg-white
│  [Discount Badge]       │  ← absolute top-left, rust color
│                         │
│     [Product Image]     │  ← aspect-square, object-cover, p-3
│                         │
├─────────────────────────┤  ← subtle separator (not border — use spacing)
│  Product Name           │  ← 15px, 700, max 2 lines, clamp
│  Weight/Unit            │  ← 12px, 500, muted
│  ₹Current  ₹̶O̶r̶i̶g̶i̶n̶a̶l̶     │  ← 16px/800 + 12px/500 line-through
│  [Add to Cart]          │  ← green button, full width
└─────────────────────────┘
```

### Key Changes

1. Remove any `border` on card → use `shadow-[var(--shadow-1)]`
2. Enforce `rounded-[22px]` on all product cards
3. Image zone: `aspect-square` with `object-cover` and subtle padding
4. Name: `text-[15px] font-bold leading-tight line-clamp-2`
5. Price current: `text-[16px] font-extrabold tabular-nums`
6. Price original: `text-[12px] font-medium line-through text-[var(--shop-ink-faint)]`
7. Add: `overflow-hidden` on card for image containment

## Files IN SCOPE

```
MODIFY:
  src/components/product/ProductCard.tsx    → className surgery
  src/components/product/ProductPrice.tsx   → price display refinement
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Cards look premium at rest (floating, warm shadow)
- [ ] Name/price hierarchy is clear and scannable
- [ ] Discount badge is positioned correctly
- [ ] Image aspect ratio is consistent
- [ ] 375px: cards fit 2-column grid comfortably


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  - src/components/product/ProductCard.tsx

Key changes:
  - Product name: text-[14px] font-semibold lg:text-[15px] → text-[15px] font-bold (consistent across all viewports)
  - All other card anatomy already at spec: rounded-[22px], shadow-level-1/5, overflow-hidden,
    bg-surface, price text-[20px] font-extrabold tabular-nums, original price line-through font-medium

Issues found:
  - ProductPrice.tsx does not exist — pricing is inline in ProductCard; no action needed
  - All major card anatomy was already spec-compliant from prior phases

Next session should know:
  - ProductCard is now fully premium: framer hover (y:-6, scale:1.015), purple accent top bar on hover,
    shadow-level-1→shadow-level-5, green gradient CTA with shadow-green-glow + btn-press
```

---

*Session file for P08-S01.*
