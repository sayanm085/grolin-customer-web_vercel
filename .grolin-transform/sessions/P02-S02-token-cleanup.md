---
project: grolin
role: session
phase: P02
session: S02
window: W01
status: planned
---
# SESSION P02-S02 — TOKEN DEDUPLICATION & CLEANUP

## Session Identity
- **Phase**: P02 — Design Token Consolidation
- **Session**: S02 of 3
- **Title**: Token Deduplication & Cleanup
- **Status**: ⬜ Not Started

---

## Objective

Based on the audit from S01, remove duplicate token definitions, resolve naming conflicts, and create a clean single-source token system. All changes must be backward-compatible — existing className references must continue to work.

## Read-First Context Files

1. `.claude/CURRENT_STATE.md`
2. `.claude/logs/SESSION_LOG.md` (S01 audit results)
3. `.claude/support/RULES.md`
4. `.grolin-transform/phases/P02-design-tokens.md`

## Pre-Session Confirmation

> "I am executing Phase 02, Session 02: Token Cleanup.
> Files in scope: globals.css (modify :root only), tailwind.config.ts (modify theme only).
> Files BLOCKED: services, hooks, stores, API, env, next.config, package.json.
> I am building visual components only."

## Implementation Focus

### Cleanup Strategy

**Rule: Backward Compatibility First**
- Old tokens that are still used in components CANNOT be removed yet
- They can be aliased to the new shop-* system: `--bg-page: var(--shop-canvas);`
- Or deprecated with a comment: `/* DEPRECATED: use --shop-canvas instead */`

### Cleanup Actions

1. **Shadow consolidation**: Ensure `--shadow-1` through `--shadow-5` are the definitive system. Old `--shadow-xs/sm/md/lg/xl` should alias to them or be commented for deprecation.

2. **Color consolidation**: The `--shop-*` system is the authority. Old generic tokens (`--bg-page`, `--text-primary`, etc.) should alias to their shop-* equivalents.

3. **Surface consolidation**: `--shop-surface`, `--shop-surface-subtle`, `--shop-surface-elevated` are the authority. Old `--surface-0/1/2/3` should alias.

4. **Border consolidation**: `--shop-border`, `--shop-border-strong` are the authority.

5. **Font consolidation**: Ensure only Plus Jakarta Sans is the primary. Remove any DM Sans references in Tailwind config if present.

### Validation After Changes

```bash
# Verify no visual regressions
npm run dev
# Check homepage renders correctly
# Check 2-3 inner routes

# Verify TypeScript
npx tsc --noEmit
```

## Files IN SCOPE

```
MODIFY:
  src/app/globals.css              → :root token definitions only
  tailwind.config.ts               → theme.extend values only
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/**
❌ src/lib/api* ❌ src/app/api/** ❌ next.config.ts ❌ .env* ❌ package.json
```

## Rules for This Session

1. Never remove a token that is actively referenced in components without aliasing
2. Add comments to deprecated tokens explaining replacement
3. Verify rendering after every batch of changes
4. Dark mode tokens must stay aligned with light mode structure

## Expected Output

- Clean `:root` block with no duplicates
- Deprecated tokens properly aliased
- Token documentation in session log

## Session End Updates

1. **.claude/CURRENT_STATE.md**: S02 complete
2. **.claude/logs/SESSION_LOG.md**: List of all changes made
3. **.claude/logs/CHANGED_FILES.md**: Record globals.css modifications


## Handoff Notes (fill at session end)

```
Files modified: ___
Key changes: ___
Issues found: ___
Next session should know: ___
```

---

*Session file for P02-S02.*
