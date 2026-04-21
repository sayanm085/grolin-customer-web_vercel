---
project: grolin
role: window-execution
status: active
updated: 2026-03-28 (aligned to 15-window model)
---
# WINDOW EXECUTION RULES

> W01–W06 = multi-session. W07–W15 = max 2 sessions per window.
> Continuity lives in files, not memory.
> Root instructions: `CLAUDE.md`

## Window Batch Map (15 windows)

| Window | Phases | Sessions | Focus |
|--------|--------|----------|-------|
| **W01** | P01 + P02 | 6 | Audit + Token foundation |
| **W02** | P03 + P04 | 6 | Typography + Surfaces |
| **W03** | P05 + P06 | 6 | Primitives + Hero |
| **W04** | P07 + P08 | 7 | Homepage narrative + Cards |
| **W05** | P09 | 3 | Chrome components |
| **W06** | P10 | 4 | Cross-route consistency |
| **W07** | P11 | 2 | Motion system foundation |
| **W08** | P12 (S01+S02) | 2 | Hero entrance + section reveals |
| **W09** | P12 (S03) | 1 | Micro-interactions |
| **W10** | P13 (S01+S02) | 2 | Loading & empty states |
| **W11** | P14 (S01+S02) | 2 | Mobile + desktop responsive |
| **W12** | P14 (S03) | 1 | Accessibility pass |
| **W13** | P15 (S01+S02) | 2 | Remotion hero video |
| **W14** | P16 (S01+S02) | 2 | Visual audit + performance |
| **W15** | P16 (S03) | 1 | Release gate 🎯 |

> W07–W15: Max 2 sessions per window keeps context ≤ 60% for peak quality output.

## Starting a New Window

Read ONLY these files (in order):

```
1. CLAUDE.md                              (auto-loaded — root rules)
2. .claude/BOOST.md                        (⚡ hot-start — position + next action + carry-forward)
3. .claude/handoffs/W{prev}_HANDOFF.md     (~50 lines — only if context window switch)
4. .grolin-transform/phases/P{XX}.md      (~80 lines — phase scope)
5. .grolin-transform/sessions/P{XX}-S{YY}.md (~80 lines — session)
```

**⚡ Fast path: CLAUDE.md → BOOST.md → session file. ~220 lines.**
**Full path (new window): add handoff + phase file. ~350 lines.**

## During a Window

```
For each session:
  1. Read session file (BOOST.md tells you which one)
  2. Confirm identity + scope + blocked files
  3. Execute
  4. Validate (375px + 1280px + tsc)
  5. Update: BOOST.md, CURRENT_STATE.md, logs/SESSION_LOG.md
  6. Move to next session

Phase transitions:
  1. Update phase file status → complete
  2. Update MASTER_INDEX.md
  3. Get human approval
  4. Load next phase file
```

## Ending a Window

```
1. Finalize current session
2. Update .claude/CURRENT_STATE.md (window, next start point)
3. Create .claude/handoffs/W{XX}_HANDOFF.md:
   - phases covered + completion status
   - sessions done vs remaining
   - files touched
   - key decisions
   - validation results
   - carryover issues
   - exact next starting point
4. Update MASTER_INDEX.md statuses
```

## Handoff Template

```markdown
# Window W{XX} Handoff — P{A} + P{B}

## Completed
- P{A}: [complete/partial] — sessions: S01, S02, S03
- P{B}: [complete/partial] — sessions: S01, S02

## Files Touched
- path/to/file.tsx — what changed

## Key Decisions
- decision 1

## Validation
- 375px: pass/issues | 1280px: pass/issues | tsc: pass/issues

## Carryover
- issue → carry to next window

## Next Start
- Window: W{XX+1} | Phase: P{C} | Session: P{C}-S01-{name}.md
```

## Incomplete Work

1. Mark session `status: partial` in frontmatter
2. Note exact stopping point in handoff
3. Next window resumes from that session

## Principle

**Memory lives in files.** Model hidden state carries nothing between windows.
