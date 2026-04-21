---
project: grolin
role: session
phase: P07
session: S01
window: W04
status: complete
---
# SESSION P07-S01 — TRUST STRIP & POST-HERO SECTIONS

## Session Identity
- **Phase**: P07 — Homepage Section Narrative
- **Session**: S01 of 4
- **Status**: ⬜ Not Started

---

## Objective

Create/refine the trust proof strip immediately below the hero and add an editorial text break. The post-hero zone must immediately reinforce trust and set the pacing for the rest of the homepage scroll.

## Pre-Session Confirmation

> "I am executing P07-S01: Trust & Post-Hero. Working on TrustBar, trust strip, and editorial text break components. className and content changes ONLY."

## Implementation Focus

### Trust Strip Design

- White background section (`SectionWrapper background="white"`)
- 3-4 trust proof items in a horizontal row (or scroll on mobile)
- Each item: icon/emoji + bold stat + label
- Examples: "🕐 30-min Delivery" | "🥬 Farm Fresh" | "💰 Best Prices" | "📦 5000+ Products"
- Use TrustCard primitive (compact variant) from P05

### Editorial Text Break

- Optional brief brand voice moment between trust and collections
- Large editorial text (gradient-text-green or gradient-text-purple)
- Example: "Kolkata's freshest groceries, delivered to your door"
- Centered, max-width constrained, with eyebrow above

## Files IN SCOPE

```
MODIFY:
  src/components/home/TrustBar.tsx          → trust proof items
  src/app/(shop)/page.tsx                   → section ordering and wrappers

CREATE (if needed):
  src/components/home/EditorialBreak.tsx     → brand voice text break
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Trust strip is visible immediately below hero
- [ ] Trust items are concise and scannable
- [ ] Editorial break adds brand voice (not noise)
- [ ] Section backgrounds start alternating


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  - src/components/home/TrustBar.tsx (NEW)
  - src/components/home/EditorialBreak.tsx (NEW)
  - src/app/(shop)/page.tsx (imports + section insertion)

Key changes:
  - TrustBar: white bg + border-b; 4 items (30 min, 100% fresh, 5000+, 4.8★);
    icon in --shop-primary-soft box, stat (extrabold, tabular-nums), label (muted);
    overflow-x-auto scrollbar-none for mobile horizontal scroll
  - EditorialBreak: white bg; eyebrow → gradient-text-green headline → muted paragraph;
    max-w-[860px] centered; reveal-on-scroll; clamp(26px, 4.5vw, 44px)
  - page.tsx ordering: hero → TrustBar → YourUsuals (green) → EditorialBreak → CategoryDiscovery (canvas)

Issues found: None

Next session (P07-S02) should know:
  - TrustBar and EditorialBreak are both white-bg zones between warm/green sections
  - Background arc so far: warm(hero) → white(TrustBar) → mesh-green(YourUsuals) → white(EditorialBreak) → canvas(CategoryDiscovery) → subtle(Featured+Collections) → warm(mesh-warm zone)
  - CollectionRow component already exists — P07-S02 works on its STYLING (editorial treatment)
  - LocalTrustSection is the full dark scroll-stopper (already exists, P07-S03 may refine it)
```

---

*Session file for P07-S01.*
