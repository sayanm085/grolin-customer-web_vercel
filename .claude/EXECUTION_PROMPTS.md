---
project: grolin
role: execution-prompts
status: active
---
# ⚡ EXECUTION PROMPTS — Copy-Paste for Claude Code CLI

> W01–W04 = 2 phases per window. W05 = 1 phase (3 sessions). W06–W15 = max 2 sessions per window (keeps context ≤ 60% for peak quality).
> Copy the prompt, paste into Claude Code CLI, execute.
> When a window ends, close that CLI session, open a new one, paste the next window's prompt.

---

### HOW IT WORKS:
1. START a fresh Claude Code CLI session (`claude`)
2. Make sure you are in the project root (`grolin-customer-web`)
3. Open this file (`.claude/EXECUTION_PROMPTS.md`)
4. Copy the START prompt for the current window (e.g., `## W01 START`)
5. Paste it and execute. Let Claude process the sessions.
6. When Claude says the window is complete, copy the END prompt (e.g., `## W01 END`) and paste it to close out.
7. CLOSE the CLI session (context window is done/exit)
8. Open a NEW Claude Code CLI session (`claude`)
9. Copy the START prompt for the NEXT window
10. Repeat until all 15 windows are done

---
---

# WINDOW 01 — Baseline Audit + Design Tokens (P01 + P02)

## W01 START — paste this to begin

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .grolin-transform/phases/P01-baseline-audit.md
4. .grolin-transform/sessions/P01-S01-route-health-scan.md

You are starting Window W01 of the Grolin frontend transformation.
This window covers Phase P01 (Baseline Audit) + Phase P02 (Design Token System) = 6 sessions total.

Execution rules:
- Execute sessions sequentially: P01-S01 → P01-S02 → P01-S03 → P02-S01 → P02-S02 → P02-S03
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and the session file handoff notes
- After P01 completes (3 sessions done): update the P01 phase file status, then load P02 phase file and continue
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- NEVER touch backend files (src/services/**, src/hooks/**, src/store/**, src/lib/api*, src/app/api/**)
- Ask me for approval before moving from P01 to P02

Start with P01-S01: Route Health Scan. Confirm your identity and scope before executing.
```

## W01 END — paste this when all 6 sessions are done

```
Window W01 is complete. Do the following close-out:

1. Make sure all 6 session files (P01-S01 through P02-S03) have status: complete in frontmatter
2. Update .claude/BOOST.md:
   - Set position to W02, next phase P03, next session P03-S01
   - Set carry-forward with key findings from W01
   - Set window scope to W02 (P03 + P04)
3. Update .claude/CURRENT_STATE.md:
   - Mark W01 complete, P01 complete, P02 complete
   - Set current window to W02
   - Update progress count
4. Create .claude/handoffs/W01_HANDOFF.md with:
   - All sessions completed
   - Files touched
   - Key decisions made
   - Token audit findings
   - Validation results
   - Carry-forward issues for W02
   - Exact next start: W02 → P03-S01
5. Update .grolin-transform/MASTER_INDEX.md phase statuses for P01 and P02

Confirm when done.
```

---
---

# WINDOW 02 — Typography + Surface Depth (P03 + P04)

## W02 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W01_HANDOFF.md
4. .grolin-transform/phases/P03-editorial-typography.md
5. .grolin-transform/sessions/P03-S01-editorial-headlines.md

You are starting Window W02 of the Grolin frontend transformation.
This window covers Phase P03 (Editorial Typography) + Phase P04 (Surface & Depth) = 6 sessions total.

Execution rules:
- Execute sessions sequentially: P03-S01 → P03-S02 → P03-S03 → P04-S01 → P04-S02 → P04-S03
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After P03 completes: update phase file status, load P04 phase file, continue
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- NEVER touch backend files
- Ask me for approval before moving from P03 to P04

Start with P03-S01: Editorial Headlines. Confirm your identity and scope before executing.
```

## W02 END — paste this when all 6 sessions are done

```
Window W02 is complete. Do the following close-out:

1. Make sure all 6 session files (P03-S01 through P04-S03) have status: complete
2. Update .claude/BOOST.md: 
 → W03, next → P05-S01, carry-forward from W02, window scope → W03
3. Update .claude/CURRENT_STATE.md: W02 complete, P03+P04 complete, progress count
4. Create .claude/handoffs/W02_HANDOFF.md (sessions, files, decisions, validation, carry-forward, next start)
5. Update MASTER_INDEX.md phase statuses for P03 and P04

Confirm when done.
```

---
---

# WINDOW 03 — UI Primitives + Hero (P05 + P06)

## W03 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W02_HANDOFF.md
4. .grolin-transform/phases/P05-ui-primitives.md
5. .grolin-transform/sessions/P05-S01-wrapper-heading.md

You are starting Window W03 of the Grolin frontend transformation.
This window covers Phase P05 (UI Primitives) + Phase P06 (Hero Overhaul) = 6 sessions total.

Execution rules:
- Execute sessions sequentially: P05-S01 → P05-S02 → P05-S03 → P06-S01 → P06-S02 → P06-S03
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After P05 completes: update phase file status, load P06 phase file, continue
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- NEVER touch backend files
- Ask me for approval before moving from P05 to P06

Start with P05-S01: Wrapper & Heading Primitive. Confirm your identity and scope before executing.
```

## W03 END — paste this when all 6 sessions are done

```
Window W03 is complete. Do the following close-out:

1. Make sure all 6 session files (P05-S01 through P06-S03) have status: complete
2. Update .claude/BOOST.md: position → W04, next → P07-S01, carry-forward from W03, window scope → W04
3. Update .claude/CURRENT_STATE.md: W03 complete, P05+P06 complete, progress count
4. Create .claude/handoffs/W03_HANDOFF.md
5. Update MASTER_INDEX.md phase statuses for P05 and P06

Confirm when done.
```

---
---

# WINDOW 04 — Homepage Narrative + Product Cards (P07 + P08)

## W04 START — paste this in a NEW CLI session


## W04 END — paste this when all 7 sessions are done

```
Window W04 is complete. Do the following close-out:

1. Make sure all 7 session files (P07-S01 through P08-S03) have status: complete
2. Update .claude/BOOST.md: position → W05, next → P09-S01, carry-forward from W04, window scope → W05
3. Update .claude/CURRENT_STATE.md: W04 complete, P07+P08 complete, progress count
4. Create .claude/handoffs/W04_HANDOFF.md
5. Update MASTER_INDEX.md phase statuses for P07 and P08

Confirm when done.
```

---
---

# WINDOW 05 — Chrome Components (P09)

## W05 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W04_HANDOFF.md
4. .grolin-transform/phases/P09-chrome-components.md
5. .grolin-transform/sessions/P09-S01-header-search.md

You are starting Window W05 of the Grolin frontend transformation.
This window covers Phase P09 (Chrome Components) ONLY = 3 sessions total.

Execution rules:
- Execute sessions sequentially: P09-S01 → P09-S02 → P09-S03
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- NEVER touch backend files

Start with P09-S01: Header & Search. Confirm your identity and scope before executing.
```

## W05 END — paste this when all 3 sessions are done

```
Window W05 is complete. Do the following close-out:

1. Make sure all 3 session files (P09-S01 through P09-S03) have status: complete
2. Update .claude/BOOST.md: position → W06, next → P10-S01, carry-forward from W05, window scope → W06 (P10)
3. Update .claude/CURRENT_STATE.md: W05 complete, P09 complete, progress count
4. Create .claude/handoffs/W05_HANDOFF.md
5. Update MASTER_INDEX.md phase status for P09

Confirm when done.
```

---
---

# WINDOW 06 — Cross-Route Consistency (P10)

## W06 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W05_HANDOFF.md
4. .grolin-transform/phases/P10-cross-route-consistency.md
5. .grolin-transform/sessions/P10-S01-categories-search.md

You are starting Window W06 of the Grolin frontend transformation.
This window covers Phase P10 (Cross-Route Consistency) ONLY = 4 sessions total.

Execution rules:
- Execute sessions sequentially: P10-S01 → P10-S02 → P10-S03 → P10-S04
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- NEVER touch backend files

Start with P10-S01: Categories & Search Route. Confirm your identity and scope before executing.
```

## W06 END — paste this when all 4 sessions are done

```
Window W06 is complete. Do the following close-out:

1. Make sure all 4 session files (P10-S01 through P10-S04) have status: complete
2. Update .claude/BOOST.md: position → W07, next → P11-S01, carry-forward from W06, window scope → W07 (P11)
3. Update .claude/CURRENT_STATE.md: W06 complete, P10 complete, progress count
4. Create .claude/handoffs/W06_HANDOFF.md
5. Update MASTER_INDEX.md phase status for P10

Confirm when done.
```

---
---

# WINDOW 07 — Motion Foundation (P11-S01 + P11-S02)

## W07 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W06_HANDOFF.md
4. .claude/support/MOTION_PRINCIPLES.md
5. .grolin-transform/phases/P11-motion-foundation.md
6. .grolin-transform/sessions/P11-S01-variants-lazymotion.md

You are starting Window W07 of the Grolin frontend transformation.
This window covers Phase P11 (Motion Foundation) = 2 sessions total. This completes P11.

IMPORTANT: This is a motion window. Read .claude/support/MOTION_PRINCIPLES.md for motion budget, categories, and performance rules. All motion work must follow those principles.

Execution rules:
- Execute sessions sequentially: P11-S01 → P11-S02
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- Animate ONLY transform + opacity. NEVER animate width/height/top/left/padding/margin.
- Use LazyMotion with domAnimation. Respect prefers-reduced-motion.
- NEVER touch backend files

Start with P11-S01: Motion Variants & LazyMotion Setup. Confirm your identity and scope before executing.
```

## W07 END — paste this when both sessions are done

```
Window W07 is complete. Do the following close-out:

1. Make sure session files P11-S01 and P11-S02 have status: complete
2. Update .claude/BOOST.md: position → W08, next → P12-S01, carry-forward from W07, window scope → W08 (P12)
3. Update .claude/CURRENT_STATE.md: W07 complete, P11 complete, progress count
4. Create .claude/handoffs/W07_HANDOFF.md
5. Update MASTER_INDEX.md phase status for P11 → complete

Confirm when done.
```

---
---

# WINDOW 08 — Motion Choreography Part 1 (P12-S01 + P12-S02)

## W08 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W07_HANDOFF.md
4. .claude/support/MOTION_PRINCIPLES.md
5. .claude/support/ANIMATION_TOOLKIT.md
6. .claude/support/UI_VISION.md
7. .claude/support/SCROLL_CHOREOGRAPHY.md
8. .grolin-transform/phases/P12-homepage-choreography.md
9. .grolin-transform/sessions/P12-S01-hero-entrance.md

You are starting Window W08 of the Grolin frontend transformation.
This window covers Phase P12 sessions S01 + S02 ONLY = 2 sessions.
(P12 has 3 sessions total. This window handles the first 2. W09 handles S03.)

IMPORTANT — SKILLS & MCP TOOLS:
- Read .claude/support/MOTION_PRINCIPLES.md for motion budget, categories, and advanced ui-ux-pro-max §7 animation rules.
- Read .claude/support/ANIMATION_TOOLKIT.md for hero entrance timeline (§2), viewport reveal patterns (§3), and spring physics recipes (§1).
- Read .claude/support/UI_VISION.md for conversion-aware design direction. Hero CTA must be tappable within 500ms.
- Read .claude/support/SCROLL_CHOREOGRAPHY.md for the full homepage scroll narrative and section reveal map.
- Use Playwright MCP to take verification screenshots at 375px and 1280px after each session.
- Use Figma MCP (auth: kumarmondalsouvik@gmail.com) to cross-reference hero layout/motion targets against Figma designs.
- Follow ui-ux-pro-max §7 rules: spring-physics, exit-faster-than-enter, stagger-sequence, interruptible, no-blocking-animation.

Execution rules:
- Execute sessions sequentially: P12-S01 → P12-S02
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- Animate ONLY transform + opacity. NEVER animate width/height/top/left/padding/margin.
- Use LazyMotion with domAnimation. Respect prefers-reduced-motion.
- NEVER touch backend files
- Do NOT continue to P12-S03. Stop after P12-S02.

Start with P12-S01: Hero Entrance Choreography. Confirm your identity and scope before executing.
```

## W08 END — paste this when both sessions are done

```
Window W08 is complete. Do the following close-out:

1. Make sure session files P12-S01 and P12-S02 have status: complete
2. Update .claude/BOOST.md: position → W09, next → P12-S03, carry-forward from W08, window scope → W09 (P12 continued)
3. Update .claude/CURRENT_STATE.md: W08 complete, P12 in-progress (2/3 sessions done), progress count
4. Create .claude/handoffs/W08_HANDOFF.md
5. Do NOT mark P12 as complete in MASTER_INDEX.md (1 session remains)

Confirm when done.
```

---
---

# WINDOW 09 — Motion Choreography Part 2 (P12-S03)

## W09 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W08_HANDOFF.md
4. .claude/support/MOTION_PRINCIPLES.md
5. .claude/support/ANIMATION_TOOLKIT.md
6. .grolin-transform/phases/P12-homepage-choreography.md
7. .grolin-transform/sessions/P12-S03-micro-interactions.md

You are starting Window W09 of the Grolin frontend transformation.
This window covers Phase P12 session S03 ONLY = 1 session.
(This completes P12. S01 + S02 were done in W08.)

IMPORTANT — SKILLS & MCP TOOLS:
- Read ANIMATION_TOOLKIT.md §3 (stagger rules), §4 (micro-interaction library), §5 (scroll-linked parallax).
- Read MOTION_PRINCIPLES.md for motion budget enforcement.
- Use Playwright MCP to capture homepage with hover states, verify parallax surfaces.
- Use Figma MCP to verify hover state designs against Figma source.
- Follow ui-ux-pro-max §7: scale-feedback (0.95-1.05), stagger-sequence, interruptible animations.

Execution rules:
- Execute P12-S03 only
- After the session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After the session: verify at 375px + 1280px + run npx tsc --noEmit
- Animate ONLY transform + opacity. NEVER animate width/height/top/left/padding/margin.
- Use LazyMotion with domAnimation. Respect prefers-reduced-motion.
- NEVER touch backend files

Start with P12-S03: Micro-Interactions. Confirm your identity and scope before executing.
```

## W09 END — paste this when the session is done

```
Window W09 is complete. Do the following close-out:

1. Make sure session file P12-S03 has status: complete
2. Update .claude/BOOST.md: position → W10, next → P13-S01, carry-forward from W09, window scope → W10 (P13)
3. Update .claude/CURRENT_STATE.md: W09 complete, P12 complete (all 3 sessions done), progress count
4. Create .claude/handoffs/W09_HANDOFF.md
5. Update MASTER_INDEX.md phase status for P12 → complete

Confirm when done.
```

---
---

# WINDOW 10 — Loading & Empty States (P13-S01 + P13-S02)

## W10 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W09_HANDOFF.md
4. .claude/support/ANIMATION_TOOLKIT.md
5. .grolin-transform/phases/P13-loading-empty-states.md
6. .grolin-transform/sessions/P13-S01-skeletons-loading.md

You are starting Window W10 of the Grolin frontend transformation.
This window covers Phase P13 (Loading & Empty States) = 2 sessions total. This completes P13.

IMPORTANT — SKILLS & MCP TOOLS:
- Read ANIMATION_TOOLKIT.md §6 for warm shimmer CSS keyframes (skeleton recipe).
- Use nano-banana-2 skill to generate branded empty state illustrations (see P13-S02 session file for exact prompts).
- Use Playwright MCP to screenshot loading/empty states at both viewports.
- Use Figma MCP for skeleton layout dimensions and empty state design references.
- Follow ui-ux-pro-max §3 (CLS prevention — skeletons must match content layouts) and §8 (empty state UX — friendly, actionable).

Execution rules:
- Execute sessions sequentially: P13-S01 → P13-S02
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- NEVER touch backend files

Start with P13-S01: Skeleton & Loading States. Confirm your identity and scope before executing.
```

## W10 END — paste this when both sessions are done

```
Window W10 is complete. Do the following close-out:

1. Make sure session files P13-S01 and P13-S02 have status: complete
2. Update .claude/BOOST.md: position → W11, next → P14-S01, carry-forward from W10, window scope → W11 (P14)
3. Update .claude/CURRENT_STATE.md: W10 complete, P13 complete, progress count
4. Create .claude/handoffs/W10_HANDOFF.md
5. Update MASTER_INDEX.md phase status for P13 → complete

Confirm when done.
```

---
---

# WINDOW 11 — Responsive & Accessibility Part 1 (P14-S01 + P14-S02)

## W11 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W10_HANDOFF.md
4. .grolin-transform/phases/P14-responsive-accessibility.md
5. .grolin-transform/sessions/P14-S01-mobile-pass.md

You are starting Window W11 of the Grolin frontend transformation.
This window covers Phase P14 sessions S01 + S02 ONLY = 2 sessions.
(P14 has 3 sessions total. This window handles the first 2. W12 handles S03.)

IMPORTANT — SKILLS & MCP TOOLS:
- Follow ui-ux-pro-max §5 (Layout & Responsive: mobile-first, fluid typography, overflow rules).
- Follow ui-ux-pro-max §2 (Touch & Interaction: tap targets ≥ 44px, safe areas).
- Use Playwright MCP to take AUTOMATED screenshots of EVERY route at 375px (P14-S01) and 1280px (P14-S02).
- Use Figma MCP to cross-reference responsive breakpoints with Figma design specs.
- See session files for exact Playwright screenshot commands per route.

Execution rules:
- Execute sessions sequentially: P14-S01 → P14-S02
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- P14 accessibility: focus-visible states, prefers-reduced-motion, WCAG AA contrast, ARIA labels
- NEVER touch backend files
- Do NOT continue to P14-S03. Stop after P14-S02.

Start with P14-S01: Mobile Responsive Pass. Confirm your identity and scope before executing.
```

## W11 END — paste this when both sessions are done

```
Window W11 is complete. Do the following close-out:

1. Make sure session files P14-S01 and P14-S02 have status: complete
2. Update .claude/BOOST.md: position → W12, next → P14-S03, carry-forward from W11, window scope → W12 (P14 continued)
3. Update .claude/CURRENT_STATE.md: W11 complete, P14 in-progress (2/3 sessions done), progress count
4. Create .claude/handoffs/W11_HANDOFF.md
5. Do NOT mark P14 as complete in MASTER_INDEX.md (1 session remains)

Confirm when done.
```

---
---

# WINDOW 12 — Responsive & Accessibility Part 2 (P14-S03)

## W12 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W11_HANDOFF.md
4. .claude/support/ANIMATION_TOOLKIT.md
5. .grolin-transform/phases/P14-responsive-accessibility.md
6. .grolin-transform/sessions/P14-S03-accessibility.md

You are starting Window W12 of the Grolin frontend transformation.
This window covers Phase P14 session S03 ONLY = 1 session.
(This completes P14. S01 + S02 were done in W11.)

IMPORTANT — SKILLS & MCP TOOLS:
- Follow ui-ux-pro-max §1 (Accessibility — HIGHEST PRIORITY): focus-visible, contrast WCAG AA, ARIA labels, reduced-motion.
- Read ANIMATION_TOOLKIT.md §10 for reduced motion compliance patterns (useReducedMotion hook, CSS media query).
- Use Playwright MCP to test focus states and capture accessibility verification screenshots.
- Use Figma MCP to verify focus ring visibility matches Figma design system.

Execution rules:
- Execute P14-S03 only
- After the session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After the session: verify at 375px + 1280px + run npx tsc --noEmit
- P14 accessibility: focus-visible states, prefers-reduced-motion, WCAG AA contrast, ARIA labels
- NEVER touch backend files

Start with P14-S03: Accessibility Pass. Confirm your identity and scope before executing.
```

## W12 END — paste this when the session is done

   0

---
---

# WINDOW 13 — Remotion Hero Video (P15-S01 + P15-S02)

## W13 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W12_HANDOFF.md
4. .claude/support/REMOTION_GUIDE.md
5. .claude/support/ANIMATION_TOOLKIT.md
6. .grolin-transform/phases/P15-remotion-layer.md
7. .grolin-transform/sessions/P15-S01-composition.md

You are starting Window W13 of the Grolin frontend transformation.
This window covers Phase P15 (Remotion Hero Video) = 2 sessions total. This completes P15.

IMPORTANT — SKILLS & MCP TOOLS:
- Read .claude/support/REMOTION_GUIDE.md for full composition structure (Root, Sequence, interpolate, spring), rendering pipeline, and hero integration pattern.
- Read ANIMATION_TOOLKIT.md §1 for spring physics recipes (bounce, gentle, elastic) to use in Remotion spring() config.
- Use nano-banana-2 skill to generate any MISSING produce asset images (see P15-S01 session file for exact infsh commands).
- Use Playwright MCP to verify desktop shows video + mobile shows static fallback.
- Use Figma MCP to reference Figma hero design for composition layout alignment.

Execution rules:
- Execute sessions sequentially: P15-S01 → P15-S02
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- NEVER touch backend files

Start with P15-S01: Remotion Composition. Confirm your identity and scope before executing.
```

## W13 END — paste this when both sessions are done

```
Window W13 is complete. Do the following close-out:

1. Make sure session files P15-S01 and P15-S02 have status: complete
2. Update .claude/BOOST.md: position → W14, next → P16-S01, carry-forward from W13, window scope → W14 (P16)
3. Update .claude/CURRENT_STATE.md: W13 complete, P15 complete, progress count
4. Create .claude/handoffs/W13_HANDOFF.md
5. Update MASTER_INDEX.md phase status for P15 → complete

Confirm when done.
```

---
---

# WINDOW 14 — Final QA Part 1 (P16-S01 + P16-S02)

## W14 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W13_HANDOFF.md
4. .claude/support/QA_CHECKLIST.md
5. .claude/support/DESIGN_TOKENS.md
6. .claude/support/MOTION_PRINCIPLES.md
7. .grolin-transform/phases/P16-final-qa.md
8. .grolin-transform/sessions/P16-S01-visual-audit.md

You are starting Window W14 of the Grolin frontend transformation.
This window covers Phase P16 sessions S01 + S02 ONLY = 2 sessions.
(P16 has 3 sessions total. This window handles the first 2. W15 handles S03 — the RELEASE GATE.)

IMPORTANT — SKILLS & MCP TOOLS (USE ALL FOR COMPREHENSIVE QA):
- Read .claude/support/QA_CHECKLIST.md for the full per-session, per-phase, and release gate checklists.
- Read .claude/support/DESIGN_TOKENS.md for color, shadow, typography, surface token verification.
- Read .claude/support/MOTION_PRINCIPLES.md to verify motion budget compliance.
- Follow ui-ux-pro-max §1-§10 Complete Pre-Delivery Checklist for 8-dimension scoring.
- Use Playwright MCP to take AUTOMATED screenshots of EVERY route at 375px AND 1280px.
- Use Figma MCP for final design fidelity comparison against Figma source files.
- Score every route on 8 dimensions (see P16-S01 session file). Target: ≥ 9.0.

Execution rules:
- Execute sessions sequentially: P16-S01 → P16-S02
- After each session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After EVERY session: verify at 375px + 1280px + run npx tsc --noEmit
- NEVER touch backend files
- Do NOT continue to P16-S03. Stop after P16-S02.

Start with P16-S01: Visual Cross-Route Audit. Confirm your identity and scope before executing.
```

## W14 END — paste this when both sessions are done

```
Window W14 is complete. Do the following close-out:

1. Make sure session files P16-S01 and P16-S02 have status: complete
2. Update .claude/BOOST.md: position → W15, next → P16-S03, carry-forward from W14, window scope → W15 (P16 RELEASE GATE)
3. Update .claude/CURRENT_STATE.md: W14 complete, P16 in-progress (2/3 sessions done), progress count
4. Create .claude/handoffs/W14_HANDOFF.md
5. Do NOT mark P16 as complete in MASTER_INDEX.md (release gate remains)

Confirm when done.
```

---
---

# WINDOW 15 — Release Gate (P16-S03) — FINAL WINDOW 🎯

## W15 START — paste this in a NEW CLI session

```
Read these files in this exact order, then execute:

1. CLAUDE.md
2. .claude/BOOST.md
3. .claude/handoffs/W14_HANDOFF.md
4. .claude/support/QA_CHECKLIST.md
5. .claude/support/DESIGN_TOKENS.md
6. .claude/support/MOTION_PRINCIPLES.md
7. .claude/support/ANIMATION_TOOLKIT.md
8. .grolin-transform/phases/P16-final-qa.md
9. .grolin-transform/sessions/P16-S03-release-gate.md

You are starting Window W15 — the FINAL window of the Grolin frontend transformation.
This window covers Phase P16 session S03 (RELEASE GATE) ONLY = 1 session.
(This completes P16 and the entire transformation. S01 + S02 were done in W14.)

IMPORTANT — THIS IS THE RELEASE GATE. USE ALL SKILLS & MCP TOOLS:
- Read QA_CHECKLIST.md for COMPLETE verification gates (per-session, per-phase, release gate).
- Read DESIGN_TOKENS.md to verify all color, shadow, typography tokens are correct.
- Read MOTION_PRINCIPLES.md to verify motion budget compliance across all routes.
- Read ANIMATION_TOOLKIT.md for motion quality verification (hero entrance, reveals, stagger, parallax).
- Follow ui-ux-pro-max §1-§10 COMPLETE Pre-Delivery Checklist (all 8 scoring dimensions).
- Use Playwright MCP for FINAL automated route verification at 375px + 1280px.
- Use Figma MCP for FINAL design fidelity comparison against Figma source.
- Use nano-banana-2 to generate before/after comparison images for the final transformation report.
- All routes must score ≥ 9.0 (averaged across 8 dimensions) to pass the release gate.

Execution rules:
- Execute P16-S03 only
- P16-S03 is the RELEASE GATE — all routes must score ≥ 9.0 to pass
- After the session: update .claude/BOOST.md, .claude/CURRENT_STATE.md, .claude/logs/SESSION_LOG.md, and session file handoff notes
- After the session: verify at 375px + 1280px + run npx tsc --noEmit + run npm run build
- NEVER touch backend files
- Create .grolin-transform/TRANSFORMATION-COMPLETE.md with full summary

Start with P16-S03: Release Gate. Confirm your identity and scope before executing.
```

## W15 END — paste this when the session is done (FINAL)

```
Window W15 is complete. This is the FINAL window. Do the following close-out:

1. Make sure session file P16-S03 has status: complete
2. Update .claude/BOOST.md: set progress to 47/47 (100%), mark transformation COMPLETE
3. Update .claude/CURRENT_STATE.md: all windows complete, all phases complete, final route scores
4. Create .claude/handoffs/W15_HANDOFF.md (final handoff — full summary of entire transformation)
5. Update MASTER_INDEX.md: all phase statuses complete
6. Verify .grolin-transform/TRANSFORMATION-COMPLETE.md was created

Then give me a final summary:
- Total files modified across all 15 windows
- Final route quality scores vs targets (all 8 dimensions per route)
- Tools & skills used throughout the transformation
- Any remaining issues or recommendations
- Confirmation that the Grolin transformation is production-ready

🎉 Confirm when done — the transformation is COMPLETE.
```

---
---

# EMERGENCY PROMPTS

## If a session fails or needs to be retried

```
Read CLAUDE.md and .claude/BOOST.md.

The last session had issues. Do NOT continue to the next session.
Re-read the current session file that BOOST.md points to.
Review what was done and what failed.
Fix the issues within the same session scope.
Then update all state files and continue.
```

## If you need to resume mid-window (CLI crashed, paused, etc.)

```
Read CLAUDE.md and .claude/BOOST.md.

I am resuming from where I left off. BOOST.md has my exact position.
Read the session file that BOOST.md says is current.
Check its status — if partial, continue from where we stopped.
If complete, move to the next session in the sequence.
Do NOT re-execute completed sessions.
Continue the window execution.
```

## If you need to check progress without executing

```
Read CLAUDE.md and .claude/BOOST.md and .claude/CURRENT_STATE.md.

Give me a progress report:
- Current window and session
- Sessions completed vs remaining
- Any blockers or issues
- Route quality scores
Do NOT execute any changes.
```
