---
project: grolin
role: phase
phase: P07
window: W04
status: complete
---
# PHASE 07 — HOMEPAGE SECTION NARRATIVE

## Phase Identity
- **Number**: 07
- **Name**: Homepage Section Narrative
- **Status**: ✅ Complete
- **Dependencies**: P06 completed and approved

---

## Objective

Compose the homepage below the hero into a paced storefront journey with trust reinforcement, editorial collection presentation, and a dramatic dark editorial scroll-stopper. The homepage should read like a curated brand story, not a data dump.

## Why This Phase Exists

A premium homepage is a composed narrative with tension and release. Currently, sections stack identically with the same background and layout. This phase creates the visual rhythm — warm → white → subtle → DARK → warm — that keeps users engaged through scroll.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P07-S01-trust-post-hero.md` | Trust & Post-Hero | Trust strip + editorial text break post-hero |
| S02 | `P07-S02-collection-rows.md` | Collection Rows | Editorial banner cards with curated styling |
| S03 | `P07-S03-dark-editorial.md` | Dark Editorial | Full-bleed dark section — the scroll stopper |
| S04 | `P07-S04-flow-integration.md` | Flow Integration | Section ordering, rhythm, transitions |

## Section Narrative Arc

```
1. HERO (warm mesh)           ← Brand arrival
2. TRUST STRIP (white)        ← Immediate proof
3. EDITORIAL TEXT BREAK        ← Brand voice moment
4. COLLECTIONS A (subtle)     ← Curated discovery
5. PRODUCT CARDS (white)      ← Commerce scanning
6. DARK EDITORIAL BAND        ← Scroll stopper (dramatic tension)
7. COLLECTIONS B (subtle)     ← More discovery
8. RECOMMENDED (white)        ← Personalized commerce
9. FOOTER (dark gradient)     ← Confidence close
```

## In-Scope Files

```
MODIFY:
  src/app/(shop)/page.tsx                   → section wrappers and ordering
  src/components/home/*.tsx                 → section component styling
  src/app/globals.css                       → new section-specific utilities

CREATE (if needed):
  src/components/home/DarkEditorialBand.tsx  → new dark section
  src/components/home/EditorialBreak.tsx     → text break component
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. Sections alternate backgrounds creating visual rhythm
2. Dark editorial band exists and acts as scroll stopper
3. Collection rows have editorial treatment (not generic)
4. Homepage narrative has clear pacing — tension/release
5. All sections feel like one composed journey

---

*Phase file for P07.*
