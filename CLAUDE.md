# CLAUDE.md — Grolin Transformation System

> Canonical root instruction file. Read this FIRST in every context window.

## Project Identity

- **Project**: Grolin — premium grocery quick-commerce (Kolkata, India)
- **Stack**: Next.js 14 · Tailwind v3 · Framer Motion v12 · shadcn/ui · Zustand · React Query
- **Dev Server**: `localhost:3001` (always — set in package.json -p 3001)
- **Transformation scope**: frontend visual-only. 16 phases, 47 sessions, 15 context windows.

## Non-Negotiable Rules

1. **FRONTEND ONLY** — never touch backend logic. Zero exceptions.
2. **BACKEND PROTECTION** — these files are FORBIDDEN:
   - `src/services/**`, `src/hooks/**`, `src/store/**`
   - `src/lib/api*`, `src/app/api/**`
   - `next.config.ts`, `.env*`
   - `package.json` (unless installing visual-only library)
   - `*.service.ts`, `*.query.ts`
3. **SESSION SCOPE** — one session = one concern. Never exceed defined scope.
4. **CLASS-ONLY CHANGES** — modify `className`, JSX structure, CSS tokens only. Never change data logic, state management, or API calls.
5. **VERIFY ALWAYS** — after changes: check 375px + 1280px + `npx tsc --noEmit`.

## What Is Allowed

- `src/app/globals.css` → CSS variables, keyframes, utilities
- `tailwind.config.ts` → add tokens only (never remove)
- `src/components/**/*.tsx` → className and visual JSX only
- `src/app/(shop)/**/page.tsx` → layout structure and className only
- `src/app/(auth)/**/page.tsx` → layout structure and className only
- NEW component files → visual-only, zero API imports
- `.grolin-transform/**` and `.claude/**` → planning and operational files

## Anti-Hallucination Protocol

- Never execute from memory — always read session file first
- Never mix sessions or exceed session scope
- Never open/modify files outside defined scope
- If context is unclear → STOP and ask
- If issue is out of scope → DOCUMENT it in handoff notes, don't fix it
- Prefer surgical className changes over file rewrites
- Every session starts with identity confirmation

## File System Map

```
CLAUDE.md                                ← THIS FILE (global root instructions)
.claude/                                  ← active operational workspace
  BOOST.md                               ← ⚡ HOT-START: read this IMMEDIATELY after CLAUDE.md
  CURRENT_STATE.md                       ← live execution position (update every session)
  WINDOW_EXECUTION_RULES.md             ← 2-phase window model + handoff procedures
  EXECUTION_INDEX.md                     ← fast operational lookup (all 47 sessions by window)
  EXECUTION_PROMPTS.md                   ← copy-paste prompts for each window (human use)
  support/
    RULES.md                             ← blocked files + allowed files reference
    DESIGN_TOKENS.md                     ← color, shadow, typography, surface tokens
    QA_CHECKLIST.md                      ← per-session and per-phase verification
    NAMING_CONVENTIONS.md                ← file naming and CSS naming rules
    MOTION_PRINCIPLES.md                 ← motion budget, categories, performance rules
  handoffs/
    W{XX}_HANDOFF.md                     ← created at end of each window
  logs/
    SESSION_LOG.md                       ← chronological append-only session results
    CHANGED_FILES.md                     ← file modification registry per session
.grolin-transform/
  MASTER_INDEX.md                        ← full execution map (phases, sessions, windows)
  MASTER_REPORT.md                       ← strategic reference only (NEVER load in sessions)
  phases/P{XX}-{name}.md                 ← 16 phase control documents
  sessions/P{XX}-S{YY}-{name}.md        ← 47 session execution documents
```

## Session Start Procedure (Claude Code CLI)

```
1. Read CLAUDE.md                           (this file — auto-loaded)
2. Read .claude/BOOST.md                     (⚡ hot-start — position + next action + rules)
3. Read the phase file BOOST.md tells you   (~80 lines)
4. Read the session file BOOST.md tells you (~80 lines)
5. CONFIRM: "I am executing P{XX}-S{YY}: {title}"
6. CONFIRM: "Files in scope: {list} | Files blocked: {list}"
7. Execute.
```

**⚡ 3-read resume: CLAUDE.md → BOOST.md → session file. ~220 lines to start working.**
**Full 4-read: add the phase file if starting a new phase. ~300 lines.**

## Session End Procedure

```
1. Update session file frontmatter: status → complete
2. Update .claude/BOOST.md (position, next action, carry-forward)
3. Update .claude/CURRENT_STATE.md (position, progress, scores)
4. Append entry to .claude/logs/SESSION_LOG.md
5. Update .claude/logs/CHANGED_FILES.md (if source files modified)
6. Fill handoff notes in session file
```

## Window End Procedure

```
1. Complete session end procedure for final session
2. Create .claude/handoffs/W{XX}_HANDOFF.md
3. Update MASTER_INDEX.md phase/window statuses
4. Write exact starting point for next window
```

## Key Design Tokens (Quick Reference)

| Token | Value | Use |
|-------|-------|-----|
| Canvas | `#F0ECE8` | Page bg |
| Surface | `#FFFFFF` | Card bg |
| Green | `#16945E` | Commerce CTAs |
| Purple | `#6E49D8` | Brand/auth |
| Blue | `#1D6FB8` | Trust signals |
| Amber | `#E3B93C` | Search CTA ONLY |
| Rust | `#C2410C` | Discounts |
| Card radius | `22px` | Signature |
| Shadow-1/5 | warm | Rest/hover |

**Full token reference**: `.claude/support/DESIGN_TOKENS.md`

## Principle

**Memory lives in files.** The model carries nothing between windows. Everything needed to resume is in `.claude/BOOST.md` — the single hot-start file updated after every session.
