---
project: grolin
role: phase
phase: P04
window: W02
status: complete
---
# PHASE 04 — SURFACE & DEPTH SYSTEM

## Phase Identity
- **Number**: 04
- **Name**: Surface & Depth System
- **Status**: ⬜ Not Started
- **Dependencies**: P03 completed and approved

---

## Objective

Establish premium physicality across all surfaces. Replace border-based card separation with shadow-based elevation. Create alternating section backgrounds for scroll rhythm. Apply grain and mesh textures to premium surfaces. Transform flat, bordered surfaces into floating, layered compositions.

## Why This Phase Exists

Depth hierarchy is the primary visual signal that separates premium from template. Currently, most cards use borders for separation (creates "boxes" → feels cheap). Premium sites use warm shadows to create floating surfaces. This phase is the single biggest visual premium upgrade.

## Scope Boundaries

- **IN SCOPE**: Card className changes (border → shadow), section background wrappers, grain overlay application, mesh gradient application. Surface-related CSS in globals.css.
- **OUT OF SCOPE**: Typography changes (done in P03). Layout restructuring (P05). Motion (P11-12). Hero rebuild (P06).
- **PHASE TYPE**: Surface treatment — shadows, backgrounds, textures

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P04-S01-canvas-backgrounds.md` | Canvas & Backgrounds | Section background alternation system |
| S02 | `P04-S02-card-elevation.md` | Card Elevation | Border → shadow replacement site-wide |
| S03 | `P04-S03-texture-application.md` | Texture Application | Grain and mesh on premium surfaces |

## Shadow Reference

| Level | Shadow | Use Case |
|-------|--------|----------|
| 1 | `0 2px 8px rgba(26,35,43,0.06), 0 1px 3px rgba(26,35,43,0.04)` | Product cards at rest, list items |
| 2 | `0 4px 16px rgba(26,35,43,0.08), 0 2px 6px rgba(26,35,43,0.05)` | Dropdowns, order summary |
| 3 | `0 8px 32px rgba(110,73,216,0.12), 0 2px 8px rgba(110,73,216,0.06)` | Auth card, wallet card |
| 4 | `0 1px 0 rgba(26,35,43,0.06), 0 4px 20px rgba(26,35,43,0.10)` | Sticky header |
| 5 | `0 12px 40px rgba(26,35,43,0.12), 0 4px 12px rgba(26,35,43,0.08)` | Card hover state |

## Surface Alternation Pattern

Homepage scroll rhythm: warm canvas → white card band → subtle surface → white → DARK editorial → warm canvas → white → footer

## In-Scope Files

```
MODIFY (className only):
  src/components/**/*.tsx             → card border → shadow classes
  src/app/(shop)/**/page.tsx          → section background wrappers
  src/app/globals.css                 → any new surface utility classes

READ REFERENCE:
  .grolin-transform/context/*        → current state
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
❌  All *.service.ts  ❌  All *.query.ts
```

## Expected Outputs

1. No card uses border as primary visual separator
2. Homepage sections alternate backgrounds (warm → white → subtle → dark)
3. Premium surfaces (hero, promo, auth) have grain overlay
4. Mesh gradients applied to appropriate surfaces
5. Cards feel like they float above the page

## Risk Notes

- Removing borders may expose spacing issues — check padding after
- Shadows render differently across browsers — test Chrome and Safari
- Dark mode shadow values may need different opacity levels
- Grain overlay must not interfere with text readability

## Review Checklist

- [ ] No card relies on border as primary separation
- [ ] All product cards use shadow-1 at rest
- [ ] Homepage sections alternate backgrounds
- [ ] Hero section has grain overlay
- [ ] At least one section uses mesh gradient
- [ ] Dark mode surfaces still look correct
- [ ] No text readability issues from textures
- [ ] Layout not broken by border removal

## Completion Criteria

**This phase is complete when**:
1. Cards float with warm shadows — no border-boxed feeling
2. Homepage has visible section rhythm (background alternation)
3. Premium surfaces have grain/mesh textures
4. The site feels physically layered and premium

## End-of-Phase Gate

Human approval required before proceeding to Phase 05.

---

*Phase file for P04. Read this before any session in Phase 04.*
