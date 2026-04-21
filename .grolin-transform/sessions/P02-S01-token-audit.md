---
project: grolin
role: session
phase: P02
session: S01
window: W01
status: planned
---
# SESSION P02-S01 — TOKEN AUDIT & CONFLICT DETECTION

## Session Identity
- **Phase**: P02 — Design Token Consolidation
- **Session**: S01 of 3
- **Title**: Token Audit & Conflict Detection
- **Status**: ⬜ Not Started

---

## Objective

Systematically audit `globals.css` `:root` block and `tailwind.config.ts` to identify: duplicate token definitions, naming conflicts between old and new systems, unused tokens, and misaligned values between CSS variables and Tailwind config.

## Read-First Context Files

1. `.claude/CURRENT_STATE.md`
2. `.claude/logs/SESSION_LOG.md`
3. `.claude/support/RULES.md`
4. `.grolin-transform/phases/P02-design-tokens.md`

## Pre-Session Confirmation

> "I am executing Phase 02, Session 01: Token Audit.
> Files in scope: globals.css (read), tailwind.config.ts (read), components (grep reference check).
> Files BLOCKED: services, hooks, stores, API, env, next.config.
> I am building visual components only."

## Implementation Focus

### Audit Areas

**1. Duplicate Detection**
Search for tokens that serve the same purpose under different names:
- `--bg-page` vs `--shop-canvas` (both are page background)
- `--shadow-xs/sm/md/lg/xl` vs `--shadow-1/2/3/4/5` (both are shadow scales)
- `--border-light/base/dark` vs `--shop-border/shop-border-strong`
- `--text-primary/secondary/body/muted` vs `--shop-ink/ink-muted/ink-faint`
- `--success` vs `--shop-success` vs `--shop-action`

**2. Naming Conflict Detection**
Identify where the old system (pre-shop-*) and new system (shop-*) overlap:
- Old color tokens (`--green-50` through `--green-950`) — still used anywhere?
- Old surface tokens (`--surface-0/1/2/3`) vs `--shop-surface/surface-subtle`
- Shadcn HSL tokens (`--primary`, `--background`) vs `--shop-primary`, `--shop-canvas`

**3. Usage Reference Check**
Grep components to find which tokens are actually used in className/style:
```bash
# Check which CSS variables are referenced in components
grep -r "var(--" src/components/ --include="*.tsx" | sort | uniq -c | sort -rn
grep -r "var(--" src/app/ --include="*.tsx" | sort | uniq -c | sort -rn
```

**4. Tailwind Config vs CSS Variable Alignment**
Compare shadow values in `tailwind.config.ts` with `--shadow-*` CSS variables.
Compare color references in Tailwind config with `--shop-*` tokens.

### Output Format

Create an audit report with:
- List of all duplicate pairs
- List of unused tokens (defined but never referenced)
- List of Tailwind/CSS misalignments
- Recommendation for each: keep, rename, remove, merge

## Files IN SCOPE

```
READ:
  src/app/globals.css                → token definitions
  tailwind.config.ts                 → Tailwind theme extensions
  src/components/**/*.tsx            → usage reference check
  src/app/**/*.tsx                   → usage reference check
```

## Files BLOCKED

```
❌ NO modifications in this session — audit only
❌ src/services/** ❌ src/hooks/** ❌ src/store/**
❌ src/lib/api* ❌ src/app/api/** ❌ next.config.ts ❌ .env*
```

## Expected Output

Token audit report documenting:
- All duplicate definitions
- All naming conflicts
- All unused tokens
- All Tailwind misalignments
- Recommendations for S02 cleanup

## Session End Updates

1. **.claude/CURRENT_STATE.md**: P02 in progress, S01 complete
2. **.claude/logs/SESSION_LOG.md**: Append audit findings summary


## Handoff Notes (fill at session end)

```
Files modified: ___
Key changes: ___
Issues found: ___
Next session should know: ___
```

---

*Session file for P02-S01.*
