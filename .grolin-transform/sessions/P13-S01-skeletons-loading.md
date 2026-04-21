---
project: grolin
role: session
phase: P13
session: S01
window: W10
status: complete
date: 2026-03-29
---
# SESSION P13-S01 — WARM SKELETONS & LOADING STATES

## Session Identity
- **Phase**: P13 — Loading, Empty & Transitional States
- **Session**: S01 of 2
- **Status**: ⬜ Not Started

---

## Skills & Tools for This Session

| Tool | Usage |
|------|-------|
| **ANIMATION_TOOLKIT.md** §6 | Warm shimmer CSS keyframes recipe, skeleton-warm pattern |
| **ui-ux-pro-max** §3 | Performance — CLS prevention, skeleton layout matching |
| **Playwright MCP** | Screenshot loading states at both viewports (throttle network) |
| **Figma MCP** | Reference Figma skeleton mockups for layout geometry |

---

## Objective

Ensure all skeleton/loading states use the warm ivory shimmer system (never gray). Skeleton layouts must match real content layouts to prevent CLS (Cumulative Layout Shift).

## Pre-Session Confirmation

> "I am executing P13-S01: Skeletons & Loading. className changes on skeleton components ONLY. Reading ANIMATION_TOOLKIT §6 for shimmer recipe."

## Implementation Focus

### Skeleton Shimmer System (ANIMATION_TOOLKIT §6)

```css
@keyframes shimmer-warm {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-warm {
  background: linear-gradient(90deg,
    var(--shop-surface-subtle) 25%,
    #F5F1EC 50%,
    var(--shop-surface-subtle) 75%
  );
  background-size: 200% 100%;
  animation: shimmer-warm 1.5s linear infinite;
  border-radius: var(--shop-radius-8);
}

/* Reduced motion — static warm background */
@media (prefers-reduced-motion: reduce) {
  .skeleton-warm {
    animation: none;
    background: var(--shop-surface-subtle);
  }
}
```

### CLS Prevention Rules (ui-ux-pro-max §3)

- Product card skeleton: EXACT same height/width as ProductCard
- Page skeleton: EXACT same shell structure as page layout
- List skeleton: EXACT same item heights as real list items
- **NEVER** cause layout shift when content replaces skeleton
- Use explicit `aspect-ratio` or `height` on skeleton containers

### Where Skeletons Exist

```
src/components/skeletons/*.tsx    → all skeleton components
src/app/(shop)/**/loading.tsx     → route loading states
```

### Skeleton Shapes Must Match Content

| Content | Skeleton Shape |
|---------|---------------|
| Product card (image) | Rectangle, aspect-ratio: 1/1, rounded-[22px] |
| Product card (title) | Rectangle, h-4, w-3/4 |
| Product card (price) | Rectangle, h-5, w-1/3 |
| Section heading | Rectangle, h-7, w-1/2 |
| Trust badge | Circle, w-10 h-10 |
| Collection card | Rectangle, h-32, rounded-[22px] |

## Files IN SCOPE

```
MODIFY:
  src/components/skeletons/*.tsx     → skeleton className warm shimmer
  src/app/(shop)/**/loading.tsx      → loading page skeletons
  src/app/globals.css                → skeleton utility classes (if needed)
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] All skeletons use warm shimmer (no gray backgrounds)
- [ ] Skeleton layouts match content layouts (no CLS)
- [ ] Loading states feel branded and intentional
- [ ] `prefers-reduced-motion` → static warm background (no animation)
- [ ] `npx tsc --noEmit` passes
- [ ] Playwright: screenshot loading state at 375px + 1280px


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes

```
Files modified:
  src/app/globals.css — removed duplicate .skeleton-warm override (line 990-992) that was shadowing the shimmer system
  src/app/(shop)/loading.tsx — full rewrite using brand tokens; CategoryRowSkeleton + Skeleton with rounded-[22px] cards
  src/app/(shop)/cart/loading.tsx — border-gray-100 → border-[color:var(--shop-border)]
  src/app/(shop)/profile/addresses/loading.tsx — border-gray-100 + bg-white → brand tokens
  src/app/(shop)/profile/reviews/loading.tsx — border-gray-100 + bg-white → brand tokens
  src/components/product/ProductCardSkeleton.tsx — image area: removed purple/green gradient, now skeleton-warm only
  src/components/cart/CartItemSkeleton.tsx — border-gray-100 → border-[color:var(--shop-border)]
  src/components/profile/ProfileHeaderSkeleton.tsx — stat cards bg-white → bg-[color:var(--shop-surface)]
  src/components/skeletons/ProfileSkeleton.tsx — stat cards + section containers bg-white → bg-[color:var(--shop-surface)]
  src/components/notifications/NotificationItemSkeleton.tsx — added rounded-full to text lines

Key changes:
  - Removed duplicate .skeleton-warm rule that was overriding with static gradient (no shimmer)
  - All skeleton containers now use brand border + surface tokens (no gray)
  - ProductCardSkeleton image area no longer uses purple/green tinted gradient
  - skeleton-warm / skeleton-shimmer system confirmed correct: warm-shimmer keyframe + ::after overlay

Issues found: None. Pre-existing CategoryRow.tsx:73 TSC error only.

Next session should know:
  - P13-S02 is Empty & Error states
  - Skeleton shimmer system is correct and consistent — DO NOT modify globals.css shimmer rules again
  - WalletSkeleton/WalletCardSkeleton use bg-white/20 on dark purple bg — intentional, correct
  - categories/[id]/loading.tsx bg-white/20 items are on dark gradient bg — intentional, correct
```

---

*Session file for P13-S01. Uses ANIMATION_TOOLKIT §6, ui-ux-pro-max §3, Playwright MCP.*
