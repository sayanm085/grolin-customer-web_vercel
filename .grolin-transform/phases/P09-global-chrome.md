---
project: grolin
role: phase
phase: P09
window: W05
status: complete
---
# PHASE 09 — GLOBAL CHROME (HEADER, FOOTER, NAVIGATION)

## Phase Identity
- **Number**: 09
- **Name**: Global Chrome
- **Status**: ⬜ Not Started
- **Dependencies**: P04 completed and approved

---

## Objective

Ensure that the application shell — header, footer, and navigation — matches the premium interior. These surfaces are visible on every page; if they feel generic, the entire system fails.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P09-S01-header-search.md` | Header & Search | Glass effect on scroll, search bar styling |
| S02 | `P09-S02-footer.md` | Footer Treatment | Premium footer with layered dark surface |
| S03 | `P09-S03-bottom-nav-mobile.md` | Bottom Nav & Mobile | Animated active indicator, mobile chrome |

## In-Scope Files

```
MODIFY:
  src/components/layout/Header.tsx            → glass blur, scroll shadow
  src/components/layout/ShopFooter.tsx        → premium footer treatment
  src/components/layout/BottomNav.tsx         → animated pill indicator
  src/components/layout/SearchBar.tsx         → search styling
  src/components/layout/MobileMenu.tsx        → mobile drawer styling
  src/app/globals.css                         → chrome-specific utilities
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. Header has glass/blur effect on scroll
2. Bottom nav has spring-animated active indicator
3. Footer feels branded with dark layered surface
4. Search bar is visible, functional, and styled
5. Chrome looks premium on every page

---

*Phase file for P09.*
