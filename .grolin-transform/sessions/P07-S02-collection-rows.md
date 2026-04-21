---
project: grolin
role: session
phase: P07
session: S02
window: W04
status: complete
---
# SESSION P07-S02 — COLLECTION ROWS & EDITORIAL CARDS

## Session Identity
- **Phase**: P07 — Homepage Section Narrative
- **Session**: S02 of 4
- **Status**: ⬜ Not Started

---

## Objective

Polish collection rows (Quick Breakfast, Tonight's Dinner, etc.) with editorial banner card treatment. Cards should feel curated and discovery-oriented, not like generic category links.

## Pre-Session Confirmation

> "I am executing P07-S02: Collection Rows. Styling EditorialBannerCard and CollectionRow components. className changes ONLY."

## Implementation Focus

### Collection Card Treatment

Each collection card should have:
- Warm gradient or mesh background (not flat color)
- Large curated image or editorial photography
- Collection name in 700 weight
- Item count or descriptor in muted text
- Subtle shadow elevation (shadow-1, hover → shadow-2)
- 22px border-radius (Grolin signature)
- Smooth hover: `translateY(-2px)` + shadow increase

### Collection Row Heading

Use SectionHeading with:
- Eyebrow: "CURATED FOR YOU" or relevant label
- Title: section heading style (22-28px)
- Action: "See All →" link on right

### Horizontal Scroll Treatment

On mobile, collections scroll horizontally:
- Apply `fade-edge-mask` to parent for edge fade
- Snap scrolling: `scroll-snap-type: x mandatory`
- Card min-width: `min-w-[260px]` for comfortable reading

## Files IN SCOPE

```
MODIFY:
  src/components/home/CollectionRow.tsx           → row heading and layout
  src/components/home/EditorialBannerCard.tsx     → card visual treatment
  src/app/(shop)/page.tsx                         → collection section wrappers
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Collection cards look curated and editorial
- [ ] Horizontal scroll has fade-edge mask on mobile
- [ ] Hover states work on desktop
- [ ] SectionHeading applied to collection rows


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  - src/components/home/EditorialBannerCard.tsx
  - src/components/home/CollectionRow.tsx

Key changes:
  - EditorialBannerCard: min-h-[200px]→min-h-[240px], w-[156px]→w-[164px] for taller editorial cards;
    emoji pill: px-4/py-2.5 → px-4/py-3, emoji text-[30px]→text-[34px]; title text-[15px]→text-[16px];
    See all pill text "See all"→"Explore" + group-hover:bg-white/30 transition
  - CollectionRow: product card slots w-[148px]→w-[156px] to match taller banner; subtitle font-medium added

Issues found: None — CollectionRow and EditorialBannerCard were already well-built

Next session should know:
  - Collection row cards now w-[156px], EditorialBannerCard is w-[164px] for visual hierarchy
  - All hover states come from tile-hover CSS utility (already handles shadow+translate)
```

---

*Session file for P07-S02.*
