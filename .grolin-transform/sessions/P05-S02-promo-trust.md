---
project: grolin
role: session
phase: P05
session: S02
window: W03
status: complete
---
# SESSION P05-S02 — PROMOBAND & TRUSTCARD PRIMITIVES

## Session Identity
- **Phase**: P05 — Structural Primitives & Layout Unification
- **Session**: S02 of 3
- **Title**: PromoBand & TrustCard Primitives
- **Status**: ✅ Complete

---

## Objective

Create `PromoBand` (responsive promo section with image + copy + CTA) and `TrustCard` (systematic trust proof card with icon + stat + label). These specialized content primitives standardize two recurring patterns.

## Pre-Session Confirmation

> "I am executing P05-S02: PromoBand & TrustCard. Creating new visual-only components. Zero API imports."

## Implementation Focus

### PromoBand Spec

```tsx
// src/components/shared/PromoBand.tsx
interface PromoBandProps {
  imageSrc: string
  imageAlt: string
  eyebrow?: string
  title: string
  description?: string
  ctaLabel: string
  ctaHref: string
  variant?: 'green' | 'purple' | 'warm'  // color theme
  imagePosition?: 'left' | 'right'       // responsive layout
}
// On mobile: stacked (image above, content below)
// On desktop: side-by-side with imagePosition control
```

### TrustCard Spec

```tsx
// src/components/shared/TrustCard.tsx
interface TrustCardProps {
  icon: React.ReactNode     // Lucide icon or emoji
  stat?: string             // "30 min" or "100%"
  label: string             // "Free Delivery"
  description?: string      // "On all orders above ₹199"
  variant?: 'compact' | 'full'
}
// compact: icon + label inline (for trust strips)
// full: icon above, stat prominent, label below (for trust section)
```

## Files IN SCOPE

```
CREATE:
  src/components/shared/PromoBand.tsx
  src/components/shared/TrustCard.tsx
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] PromoBand responsive layout works (stacked mobile, side-by-side desktop)
- [ ] TrustCard renders both compact and full variants
- [ ] Both components use shop-* tokens exclusively
- [ ] TypeScript compiles clean


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  src/components/shared/TrustCard.tsx  (NEW)
  src/components/shared/PromoBand.tsx  (NEW)

Key changes:
  - TrustCard: two variants — compact (inline icon+label pill) and full (icon above, stat, label, description)
    Full variant: rounded-[22px], shadow-level-1, primary-soft icon background
    Compact variant: rounded-[14px], shadow-level-1, horizontal layout
  - PromoBand: grid layout (stacked mobile, 2-col desktop), image left/right control
    Variants: green (action bg), purple (primary bg), warm (warm-canvas)
    Includes: eyebrow, title (font-extrabold), description, CTA Link

Pre-existing: TrustRow.tsx exists (compact inline badge strip) — different from TrustCard. Both coexist.

Issues found: None — TSC clean (pre-existing CategoryRow.tsx:73 only)

P05-S03 should know:
  - SectionWrapper, SectionHeading, PromoBand, TrustCard all created
  - P05-S03 is about standardizing grid system and breathing room across existing page sections
  - Focus on className adjustments to existing pages/layouts, not new components
```

---

*Session file for P05-S02.*
