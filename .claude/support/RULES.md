---
project: grolin
role: support
---
# RULES — Backend Protection & File Boundaries

> Immutable. These boundaries are NEVER violated.

## Blocked Directories

```
❌  src/services/**          All service files
❌  src/hooks/**             All data-fetching hooks
❌  src/store/**             All Zustand stores
❌  src/lib/api*             API client files
❌  src/app/api/**           API route handlers
```

## Blocked Config

```
❌  next.config.ts / next.config.js
❌  .env / .env.local / .env.production / .env.development
❌  tsconfig.json            (unless type-only fix)
```

## Blocked Patterns

```
❌  *.service.ts             Any service file
❌  *.query.ts               Any query file
❌  src/hooks/use*.ts(x)     Any data hook
```

## Conditional

```
⚠️  package.json             BLOCKED unless installing visual-only library
                             NEVER remove or modify existing dependencies
```

## Allowed

```
✅  src/app/globals.css      → CSS variables, keyframes, utilities
✅  tailwind.config.ts       → Add tokens ONLY (never remove)
✅  src/components/**/*.tsx  → className and visual JSX ONLY
✅  src/app/(shop)/**/page.tsx → Layout structure and className ONLY
✅  src/app/(auth)/**/page.tsx → Layout structure and className ONLY
✅  NEW component files      → Visual-only, zero API imports
✅  .grolin-transform/**     → Planning architecture
✅  .claude/**                → Operational workspace
```
