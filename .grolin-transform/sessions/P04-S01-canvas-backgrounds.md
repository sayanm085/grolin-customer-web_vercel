---
project: grolin
role: session
phase: P04
session: S01
window: W02
status: complete
---
# SESSION P04-S01 — CANVAS & SECTION BACKGROUNDS

## Session Identity
- **Phase**: P04 — Surface & Depth System
- **Session**: S01 of 3
- **Title**: Canvas & Section Backgrounds
- **Status**: ⬜ Not Started

---

## Objective

Establish section background alternation across the homepage and key inner routes. The page should never feel like one continuous flat surface. Sections must alternate: warm canvas → white card band → subtle surface → white → DARK → warm → footer.

## Pre-Session Confirmation

> "I am executing P04-S01: Canvas & Backgrounds. Files in scope: homepage page.tsx section wrappers, globals.css surface utilities. className and wrapper changes ONLY."

## Implementation Focus

### Background Surface Tokens

| Surface | Token | Hex | Use |
|---------|-------|-----|-----|
| Warm canvas | `--shop-canvas` | #F0ECE8 | Page body, breathing sections |
| White card | `--shop-surface` | #FFFFFF | Card surfaces, major content bands |
| Subtle | `--shop-surface-subtle` | #FAF8F5 | Alternating section backgrounds |
| Dark editorial | `mesh-dark` class | #1A0E3D base | Scroll-stopping dramatic section |

### Homepage Section Background Map

```
HERO           → mesh-purple (gradient atmosphere)
TRUST STRIP    → shop-surface (white)
COLLECTIONS A  → shop-surface-subtle (warm subtle)
PRODUCTS       → shop-surface (white)
DARK EDITORIAL → mesh-dark (dramatic)
COLLECTIONS B  → shop-surface-subtle (warm subtle)
RECOMMENDED    → shop-surface (white)
PRE-FOOTER     → shop-canvas (warm transition)
FOOTER         → footer-layered-surface (dark gradient)
```

### Files to Modify

```
src/app/(shop)/page.tsx              → section background wrappers
src/app/globals.css                  → surface utility classes (if new ones needed)
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Homepage sections visibly alternate backgrounds
- [ ] No two adjacent sections have identical backgrounds
- [ ] Dark mode still functions correctly
- [ ] 375px and 1280px both show proper alternation


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified: (none — all already in place)

Key findings — section rhythm already fully implemented:
  - Layout root: warm-canvas class → var(--shop-page-gradient) ✅
  - HeroLayered: mesh-warm grain-overlay ✅
  - YourUsuals: mesh-green grain-overlay py-8 ✅
  - Category Discovery: bg-[color:var(--shop-canvas)] pb-4 ✅
  - Featured+Collections: bg-[color:var(--shop-surface-subtle)] py-6 ✅
  - Promise+Collections: mesh-warm grain-overlay py-5 ✅
  - LocalTrustSection: mesh-dark (self-contained component) ✅
  - Collections 4-6: bg-[color:var(--shop-surface-subtle)] py-6 ✅
  - Best Sellers: bg-[color:var(--shop-surface)] py-5 ✅
  - Final canvas: bg-[color:var(--shop-canvas)] py-4 ✅
  - All surface utilities defined in globals.css:
    .warm-canvas, .mesh-purple, .mesh-green, .mesh-dark, .mesh-warm, .mesh-white,
    .grain-overlay, .glass-surface, .glass-surface-dark, .shop-surface-soft ✅

No changes needed — background system is comprehensively implemented.

P04-S02 should focus on:
  - Card border → shadow replacement site-wide
  - ProductCard already uses shadow-only (no border) ✅
  - CartItem, BestSellersShowcase, checkout components still use border+shadow hybrid
  - Orders, profile, wallet cards may still be border-first
  - The key target: any card using border as PRIMARY separator (not accent)
```

---

*Session file for P04-S01.*
