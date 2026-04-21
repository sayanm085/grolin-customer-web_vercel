---
project: grolin
role: session
phase: P05
session: S01
window: W03
status: complete
---
# SESSION P05-S01 — SECTIONWRAPPER & SECTIONHEADING

## Session Identity
- **Phase**: P05 — Structural Primitives & Layout Unification
- **Session**: S01 of 3
- **Title**: SectionWrapper & SectionHeading
- **Status**: ✅ Complete

---

## Objective

Create two foundational layout primitives: `SectionWrapper` (consistent max-width, gutters, vertical padding, background treatment) and `SectionHeading` (eyebrow + title + optional subtitle + optional right action). These enforce structural consistency across all sections.

## Pre-Session Confirmation

> "I am executing P05-S01: Wrapper & Heading primitives. Creating new visual-only components. Zero API imports, zero service imports, zero data hooks."

## Implementation Focus

### SectionWrapper Spec

```tsx
// src/components/shared/SectionWrapper.tsx
interface SectionWrapperProps {
  children: React.ReactNode
  background?: 'canvas' | 'white' | 'subtle' | 'dark' | 'mesh-warm' | 'mesh-purple' | 'mesh-green'
  grain?: boolean           // apply grain-overlay
  className?: string        // additional classes
  id?: string              // section ID for anchor links
  padding?: 'normal' | 'tight' | 'loose' | 'none'
}

// Renders:
// <section className={`w-full ${bgClass} ${grain ? 'grain-overlay' : ''}`}>
//   <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-8 md:py-12">
//     {children}
//   </div>
// </section>
```

### SectionHeading Spec

```tsx
// src/components/shared/SectionHeading.tsx
interface SectionHeadingProps {
  eyebrow?: string          // purple uppercase label above title
  title: string             // main heading text
  subtitle?: string         // optional description below title
  action?: {                // optional right-side action
    label: string
    href?: string
    onClick?: () => void
  }
  variant?: 'editorial' | 'section' | 'page'  // size variant
  className?: string
}

// Renders:
// <div className="flex items-end justify-between mb-6">
//   <div>
//     {eyebrow && <span className="eyebrow mb-2">{eyebrow}</span>}
//     <h2 className={titleClass}>{title}</h2>
//     {subtitle && <p className="text-sm text-[var(--shop-ink-muted)] mt-1">{subtitle}</p>}
//   </div>
//   {action && <Link ... />}
// </div>
```

## Files IN SCOPE

```
CREATE:
  src/components/shared/SectionWrapper.tsx
  src/components/shared/SectionHeading.tsx
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Rules

1. These are VISUAL-ONLY components — no data fetching, no API imports
2. They must accept className for composition flexibility
3. They must work in both light and dark mode
4. SectionWrapper background variants must use the shop-* token system

## Validation

- [ ] SectionWrapper renders with correct max-width and padding
- [ ] SectionHeading renders eyebrow + title + action correctly
- [ ] Both components compile without TypeScript errors
- [ ] Both work at 375px and 1280px


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  src/components/shared/SectionWrapper.tsx  (NEW)
  src/components/shared/SectionHeading.tsx  (NEW)

Key changes:
  - SectionWrapper: w-full section + max-w-screen-xl inner container, background variants
    (canvas/white/subtle/dark/mesh-warm/mesh-purple/mesh-green), grain prop, padding variants
    (normal py-8 md:py-12 / tight py-5 md:py-8 / loose py-12 md:py-16 / none)
  - SectionHeading: eyebrow (.eyebrow utility class) + title (editorial/section/page variant)
    + optional subtitle + optional action (href→Link, onClick→button)

Pre-existing context:
  - SectionHeader.tsx already exists (uses .section-heading, no eyebrow) — NOT replaced,
    both coexist. SectionHeading is the richer primitive.
  - PageShell.tsx handles page-level padding (leave it alone)
  - .eyebrow, .section-heading, .headline-editorial all defined in globals.css ✅

Issues found: None — TSC clean (pre-existing CategoryRow.tsx:73 only)

P05-S02 should know:
  - SectionWrapper + SectionHeading created and ready to use
  - P05-S02 creates PromoBand + TrustCard primitives
  - Do not touch SectionHeader.tsx — it's used by existing components
```

---

*Session file for P05-S01.*
