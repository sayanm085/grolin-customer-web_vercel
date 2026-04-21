---
project: grolin
role: phase
phase: P02
window: W01
status: planned
---
# PHASE 02 — DESIGN TOKEN CONSOLIDATION

## Phase Identity
- **Number**: 02
- **Name**: Design Token Consolidation
- **Status**: ⬜ Not Started
- **Dependencies**: P01 completed and approved

---

## Objective

Formalize and clean the design token foundation. Remove duplicate definitions, resolve naming conflicts between old and new token systems, and ensure Tailwind config perfectly aligns with CSS custom properties. This creates the stable visual API that all subsequent phases build upon.

## Why This Phase Exists

The current codebase has evolved through multiple styling passes, creating overlapping token definitions (e.g., `--shadow-xs` alongside `--shadow-1`, `--bg-page` alongside `--shop-canvas`). Phase 02 consolidates these into one definitive system. Without this, later visual work would inherit inconsistencies.

## Scope Boundaries

- **IN SCOPE**: `globals.css` (`:root` variables section), `tailwind.config.ts` (theme extensions). Token values, token naming, token documentation.
- **OUT OF SCOPE**: Component className changes. Layout changes. Adding new visual features. Motion system. Typography application (that's Phase 03).
- **PHASE TYPE**: Foundation — token system only

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P02-S01-token-audit.md` | Token Audit | Identify duplicates, conflicts, and unused tokens |
| S02 | `P02-S02-token-cleanup.md` | Token Cleanup | Remove duplicates, resolve conflicts, backward-compatible |
| S03 | `P02-S03-tailwind-alignment.md` | Tailwind Alignment | Align tailwind.config.ts shadows/colors with CSS vars |

## In-Scope Files

```
MODIFY:
  src/app/globals.css              → token definitions in :root / .dark
  tailwind.config.ts               → theme extend values

READ REFERENCE:
  src/components/**/*.tsx          → check which tokens are used
  .grolin-transform/context/*     → current state
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
❌  All *.service.ts  ❌  All *.query.ts
```

## Expected Outputs

1. Audit report of all token duplicates and conflicts
2. Clean token system with no duplicates
3. Tailwind config aligned with CSS custom properties
4. All existing component references preserved (backward-compatible)
5. Token documentation in session log

## Risk Notes

- Removing tokens that components still reference will break rendering — must be backward-compatible
- Tailwind config changes may affect class generation — verify after changes
- Dark mode token alignment must be checked alongside light mode

## Review Checklist

- [ ] No duplicate token definitions in `:root`
- [ ] All `--shop-*` tokens have clear, documented roles
- [ ] Tailwind shadow utilities match CSS `--shadow-*` variables
- [ ] Tailwind color utilities match CSS `--shop-*` variables
- [ ] All existing className references still work (no regressions)
- [ ] Dark mode tokens properly override light mode
- [ ] `npx tsc --noEmit` passes
- [ ] Context files updated

## Completion Criteria

**This phase is complete when**:
1. Zero duplicate token definitions exist in globals.css
2. Tailwind config shadow/color values align with CSS variables
3. All existing component references are preserved
4. Token system is documented in session log

## End-of-Phase Gate

Human approval required before proceeding to Phase 03.

---

*Phase file for P02. Read this before any session in Phase 02.*
