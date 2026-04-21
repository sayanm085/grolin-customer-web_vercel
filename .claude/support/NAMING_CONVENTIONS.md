---
project: grolin
role: support
---
# NAMING CONVENTIONS

## File Naming

| Type | Pattern | Example |
|------|---------|---------|
| Phase file | `P{XX}-{kebab-name}.md` | `P04-surface-depth.md` |
| Session file | `P{XX}-S{YY}-{kebab-name}.md` | `P04-S02-card-elevation.md` |
| Handoff file | `W{XX}_HANDOFF.md` | `W01_HANDOFF.md` |
| New component | `PascalCase.tsx` | `DarkEditorialBand.tsx` |
| New utility | `kebab-case.ts` | `motion-variants.ts` |

## CSS Token Naming

- All custom properties use `--shop-` prefix
- Color tokens: `--shop-{role}` (e.g. `--shop-primary`, `--shop-accent`)
- Shadow tokens: `--shadow-{1-5}`
- Surface tokens: `--shop-surface`, `--shop-surface-subtle`, `--shop-canvas`
- Never create ad-hoc colors — always use existing tokens

## Tailwind Extensions

- Extend via `tailwind.config.ts` only
- Custom utilities: add to `globals.css` `@layer utilities {}`
- Class naming: use Tailwind-native patterns (`shadow-[var(--shadow-1)]`)

## Component Naming

- Components: `PascalCase` (e.g. `SectionWrapper`, `ViewportReveal`)
- Props interfaces: `{ComponentName}Props`
- Motion variants file: `motion-variants.ts`
- Shared components: `src/components/shared/`

## Commit/Change Scope Convention

- Session changes: reference session ID (e.g. "P04-S02: card border → shadow")
- Never mix changes across sessions
