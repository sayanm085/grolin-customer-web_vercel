---
project: grolin
role: master-report
status: reference-only
tags: [grolin, strategy, vision, reference]
note: "NEVER load this file during sessions. Use CLOUD.md + support/ files instead."
---
# GROLIN — MASTER TRANSFORMATION REPORT

## System Version: 1.0 — Built from scratch  
## Created: 2026-03-27  
## Authority: Executive Frontend Transformation System  
## Scope: Frontend visual-only transformation — backend is FORBIDDEN  

---

# §1 — EXECUTIVE UNDERSTANDING

## 1.1 Core Goal

Grolin is a premium quick-commerce grocery website serving urban families in Kolkata, India. The product is **functionally complete** — authentication, cart, checkout, orders, wallet, and profile all work. The backend is connected, the API contracts are stable, and the data flows are operational.

The goal is **not** a rebuild. The goal is to close the gap between a working grocery interface and a **distinctive premium quick-commerce brand experience** — through a disciplined, systematic frontend visual transformation.

## 1.2 What Success Looks Like

Success is achieved when:

1. **First impression is premium** — the hero, section flow, typography, and depth communicate quality within 3 seconds
2. **System consistency** — every surface, every route, every state feels like one coherent brand language
3. **Motion is purposeful** — movement supports comprehension and delight without noise
4. **Responsive excellence** — mobile and desktop each feel intentionally composed, not scaled
5. **Commerce clarity** — the site remains fast and obvious to shop, not overdesigned
6. **Perceived quality under load** — loading, image handling, and route transitions stay stable
7. **Execution safety** — the transformation proceeds phase by phase without drift, hallucination, or regression

## 1.3 The Quality Standard

The benchmark is India's best quick-commerce UI (Zepto, Blinkit, Swiggy Instamart). The ambition is to surpass them in:
- editorial warmth (warmer than Zepto)
- premium surface treatment (more layered than Blinkit)
- local brand trust (more neighbourhood-rooted than all competitors)
- motion sophistication (purposeful, restrained, fast)

## 1.4 What This Transformation Is NOT

- NOT a backend rewrite
- NOT a feature-invention phase
- NOT a data-layer refactor
- NOT a new architecture project
- NOT permission to touch services, stores, hooks, or API files

---

# §2 — CURRENT-STATE INTERPRETATION

## 2.1 What Currently Exists

Based on complete source audit of the codebase:

### Tech Stack
- **Framework**: Next.js 14 App Router (TypeScript strict)
- **Styling**: Tailwind CSS v3 with custom `shop-*` token system
- **Components**: shadcn/ui (New York style) + Radix UI primitives
- **Animation**: Framer Motion v12.34.3 (partially integrated)
- **State**: Zustand v5 (auth, cart, address, search, wishlist, wallet, coupon)
- **Data**: TanStack React Query v5
- **Icons**: Lucide React
- **Font**: Plus Jakarta Sans (via next/font/google)
- **Carousel**: Embla Carousel
- **Payments**: Razorpay
- **Realtime**: Socket.IO client

### Route Coverage (22 implemented routes)
**Auth**: `/login`, `/otp`, `/new-user-setup`  
**Shop**: `/` (home), `/categories`, `/categories/[id]`, `/search`, `/products/[slug]`, `/cart`, `/checkout`, `/checkout/success`, `/order-confirmed`, `/orders`, `/orders/[id]`, `/profile`, `/profile/edit`, `/profile/addresses`, `/profile/reviews`, `/wallet`, `/wallet/add-money`, `/wishlist`, `/notifications`

### Component Inventory
| Folder | Count | Role |
|--------|------:|------|
| home | 23 | Hero, merchandising, category, promo |
| layout | 13 | Header, footer, search, nav chrome |
| product | 19 | Cards, PDP, reviews, delivery, wishlist |
| cart | 12 | Basket, coupons, summary, cross-sell |
| checkout | 15 | Step flow, payment, summary, success |
| order | 10 | Tracking, timeline, rider, cancellation |
| profile | 9 | Account, addresses, referral, edit |
| wallet | 7 | Balance, transactions, add-money |
| shared | 20 | Page shells, empty states, dialogs |
| ui | 24 | Reusable shadcn/Radix primitives |
| skeletons | — | Loading states across pages |
| auth | 4 | Login, OTP, setup flow |

### Soul Upgrade (9 steps — all completed)
Order confirmation with confetti, 6 collection rows, Your Usuals section, personalized greeting header, recommended products, social proof numbers, fly-to-cart animation, welcome sheet, hydration fix — all verified and working.

## 2.2 What Is Already Usable

- **Design token foundation**: `shop-*` CSS variables are well-established in `globals.css` and `tailwind.config.ts`
- **Warm canvas**: `--shop-canvas: #F0ECE8` is applied as page background
- **Shadow system**: 5-tier warm shadow system defined (shadow-1 through shadow-5)
- **Gradient utilities**: `mesh-warm`, `mesh-dark`, `mesh-green`, `mesh-purple`, `gradient-text-green`, `gradient-text-purple` all exist
- **Grain overlay**: Implemented with fractalNoise SVG + drift animation
- **Glass surface**: Defined with backdrop blur
- **Scroll reveal**: `.reveal-on-scroll` with IntersectionObserver implemented
- **Skeleton system**: Warm shimmer (ivory, not gray) implemented
- **Ticker animation**: Trust strip ticker working
- **Stagger delays**: `.stagger-1` through `.stagger-5` defined

## 2.3 Current Visual Deficiencies

Based on the context transfer document and transformation report:

1. **Cards have borders** — borders create boxes, look cheap. Must replace with float shadows
2. **Typography hierarchy too flat** — headings 18-20px when they should be 24-32px. Nothing commands attention
3. **Every section looks identical** — same bg, same layout, same padding. No rhythm, no scroll stopping
4. **No dramatic visual anchor** — no dark editorial band, no scroll-stopper moment mid-page
5. **Hover states weak or absent** — nothing responds. The site feels dead/static
6. **No texture or atmosphere** — flat colors, no grain on key surfaces, no depth or life
7. **Collection rows generic** — EditorialBannerCard has flat gradients, missing dot-grid, frosted emoji pill, decorative circles
8. **Product images sometimes break** — relative URL handling needs visual-layer fixes
9. **Font system has dual direction** — Plus Jakarta Sans runtime vs DM Sans in Tailwind config
10. **Metadata maturity varies by route** — PDP is SEO-mature, other routes are metadata-light

## 2.4 Current Scores (from context transfer)

| Page | Current | Target |
|------|---------|--------|
| Home (guest) | 8.7 | 9.5 |
| Home (logged-in) | 9.0 | 9.8 |
| Categories directory | 8.2 | 9.0 |
| Category detail | 8.4 | 9.0 |
| Search results | 7.9 | 8.8 |
| Product detail | 8.6 | 9.3 |
| Order confirmed | 9.5 | 9.5 (done) |
| Profile | 8.2 | 9.0 |
| Cart/Checkout/Orders | 8.5 | 9.2 |
| Overall mobile (375px) | ~8.3 | 9.3 |

## 2.5 Previous Planning — What Was Done and What Needs Replacement

The `.planning/` directory contains a 9-phase roadmap (Audit → Fix Broken → Design Tokens → Typography → Depth & Surface → Motion → Component Polish → Remotion Video → Final QA). Phases 1-5 were executed or planned. This previous system:

**Strengths**: Good foundation work (audit, token setup, typography, depth). Understood the visual-only constraint.

**Weaknesses**: Phase granularity was uneven. No independent session files. No strict context control between sessions. No anti-hallucination protocol. No operator guide. Planning documents mixed with codebase docs. No systematic blocked-files enforcement.

**This new system replaces the previous planning entirely.** The old `.planning/` directory is preserved for reference only. All execution follows this new system.

---

# §3 — TARGET EXPERIENCE DEFINITION

## 3.1 Visual Identity

The Grolin visual identity sits at the intersection of:
- **Neighbourhood familiarity** — warm, local, trustworthy
- **Premium editorial taste** — curated, composed, intentional
- **Modern mobile-native commerce** — fast, scannable, action-oriented
- **Freshness-driven grocery** — clean produce imagery, abundant, tactile

## 3.2 UX Ambition

| Dimension | Standard |
|-----------|----------|
| First impression | Premium brand moment, not a template |
| Section flow | Paced narrative with tension/release rhythm |
| Cards | Tactile, floating, responsive to interaction |
| Typography | Clear hierarchy — authority in headlines, comfort in body |
| Imagery | Mood-setting, professionally composed, stable loading |
| Motion | Felt more than noticed. Supports scanning and delight |
| Trust | Embedded throughout, not isolated in one section |

## 3.3 Emotional Qualities

The UI should feel: **warm, fresh, premium, composed, calm, local, trustworthy**

Must avoid: cold SaaS styling, excessive white voids, discount-style clutter, over-glassy futurism, noisy motion layers, cheap marketplace density

## 3.4 Section-by-Section Experience Goals

### Homepage
- **Hero**: Brand moment with editorial composition, layered depth, immediate CTA clarity
- **Trust strip**: Concise proof immediately post-hero
- **Collections**: Curated editorial entry points, not generic dumps
- **Discovery**: Product cards inherit the premium language
- **Dark editorial**: Scroll-stopping dramatic band mid-page
- **Footer**: Clean close with brand warmth

### Inner Routes
- **Categories/Search**: Preserved rhythm, premium scan behavior
- **PDP**: Immersive, trustworthy, richer than listing card
- **Cart**: Reassuring, clean, tactically designed for completion
- **Checkout**: Stable, confident, friction-reduced
- **Orders/Profile**: Part of the same brand system — never generic
- **Auth**: Retain warmth and quality

---

# §4 — COMPLETE UI/UX TRANSFORMATION BLUEPRINT

## 4.1 Information Architecture

The homepage narrative arc:
1. **Brand arrival** (hero) → 2. **Trust reinforcement** (proof strip) → 3. **Curated collections** (editorial navigation) → 4. **Product discovery** (premium card grids) → 5. **Lifestyle credibility** (dark editorial band) → 6. **Additional commerce** (more collections) → 7. **Footer confidence** (warranty of trust)

## 4.2 Component Hierarchy

### Structural Primitives (create once, use everywhere)
- `SectionWrapper` — standardized max-width, gutters, vertical padding, background treatment, optional divider
- `SectionHeading` — eyebrow + title + optional subtitle + optional right-side action
- `PromoBand` — image, copy, CTA, responsive layout switching
- `TrustCard` — systematic visual model for service promises

### Surface Categories
- **Base page**: `--shop-canvas` (#F0ECE8)
- **Elevated card**: `--shop-surface` (#FFFFFF) with shadow-1
- **Premium promo**: mesh gradient + grain
- **Soft inset**: `--shop-surface-subtle` (#FAF8F5)
- **Dark editorial**: mesh-dark (#1A0E3D base)
- **Glass overlay**: `glass-surface` backdrop-blur

## 4.3 Typography Strategy

| Level | Size (mobile) | Size (desktop) | Weight | Role |
|-------|--------------|----------------|--------|------|
| Hero headline | clamp(34px, 5.5vw, 58px) | — | 800 | Brand statement |
| Editorial headline | clamp(28px, 4.5vw, 46px) | — | 800 | Section anchors |
| Section heading | 22px | 28px | 700 | Content group titles |
| Card heading | 15px | 17px | 700 | Product/item names |
| Body | 14px | 15px | 500 | Descriptions |
| Eyebrow | 11px | 12px | 700 | Labels above headings |
| Badge/chip | 10px | 11px | 700 | Status indicators |
| Price current | 16px | 18px | 800 | Commerce numbers |

## 4.4 Color Logic

**GREEN (#16945E)** — Commerce actions: Add to Cart, Checkout, Place Order, Success, Reorder, In Stock  
**PURPLE (#6E49D8)** — Brand/auth actions: Logo, Nav active, Get OTP, Selected states, Eyebrow  
**BLUE (#1D6FB8)** — Trust signals: Delivery time, Trust marks, "~30 min"  
**AMBER (#E3B93C)** — Search CTA ONLY. Nowhere else. Ever.  
**RUST (#C2410C)** — Discount: Sale price, "Save ₹X", Badges  
**WARM IVORY (#F0ECE8)** — Page canvas. Never pure white.

## 4.5 State System

Every interactive element must define: default, hover, press/active, focus-visible, disabled, loading, empty, success, error. Premium quality breaks when these states are inconsistent.

## 4.6 Grid & Spacing

- Section max-width: `max-w-screen-xl` (1280px)
- Horizontal gutters: `px-4 md:px-8`
- Section vertical spacing: `py-8 md:py-12`
- Card grid: 2-col mobile, 3-4 col tablet, 4-5 col desktop
- Product card border-radius: 22px (Grolin signature — NEVER change)

---

# §5 — MOTION AND INTERACTION SYSTEM

## 5.1 Motion Philosophy

Motion should be: soft, quick, spring-informed, restrained, layered only where it matters, and largely invisible in its sophistication. Motion communicates state. It does not decorate.

## 5.2 Motion Budget

- **One** hero-level continuous motion zone maximum
- Section headings may reveal **once** on scroll
- Only the **first visible set** of cards in a block should stagger
- Large repeated sections should NOT animate every child
- Hover effects: subtle, mostly transform-based
- Scroll-linked effects: reserved for **2-3 premium surfaces** only

## 5.3 Motion Categories

| Category | Duration/Spring | Use Case |
|----------|----------------|----------|
| Micro-feedback | 120-180ms ease-out | Tap, hover color, button press |
| State change | 250-320ms standard easing | Toggle, quantity morph, tab switch |
| Spring entry | stiffness:220, damping:18 | Floating cards, badges, scale-in |
| Viewport reveal | stiffness:120, damping:24, mass:1.2 | Section headings, card grids on scroll |
| Content stagger | 0.07-0.12s per child | Card grids, list items |
| Panel open | 320-380ms ease-in | Drawers, modals, sheets |
| Panel close | 250ms ease-out | Always faster than open |
| Skeleton shimmer | 1500ms linear infinite | Warm ivory gradient sweep |

## 5.4 Page-Load Choreography

1. Header appears immediately (no animation — stability anchor)
2. Hero headline staggers in (0→400ms)
3. Hero support elements follow (200→600ms)
4. Trust strip below hero reveals on scroll
5. Subsequent sections reveal once as they enter viewport

## 5.5 Performance Rules

- Animate ONLY `transform` + `opacity` (GPU-composited)
- Never animate `width`, `height`, `top`, `left`, `padding`, `margin`
- Use `will-change: transform` on continuously animated elements
- Use `once: true` on all viewport triggers — no re-animation
- Use LazyMotion with `domAnimation` — saves ~15KB bundle
- Respect `prefers-reduced-motion` — simplify, don't remove

---

# §6 — RESPONSIVE EXPERIENCE STRATEGY

## 6.1 Breakpoint Strategy

| Breakpoint | Width | Priority |
|------------|-------|----------|
| Mobile | 375px (primary) | Scan speed, safe tap zones, concise density |
| Tablet | 768px | Balanced composition, wider grids |
| Desktop | 1280px+ | Rich composition, editorial pacing, depth |

## 6.2 Mobile Priorities

- Strong crop control on hero and product images
- Thumb-zone aware CTA placement
- Sticky action bars (cart total, checkout)
- Bottom navigation with animated active indicator
- Compressed information density without losing clarity
- Touch-safe tap targets (minimum 44px)

## 6.3 Desktop Priorities

- Richer visual composition with lateral space
- Stronger layered depth and editorial pacing
- Multi-column layouts where appropriate
- Hover states add discovery and delight
- Sticky summary sidebars (cart, checkout)

## 6.4 Section Adaptation Rules

Some sections must meaningfully recompose across breakpoints (not just shrink/expand):
- Hero: intentional crop and text reflow, not stack-and-squeeze
- Product grids: column count changes with proper spacing
- Dark editorial: stat cards reflow from row to stacked
- Footer: multi-column → stacked with preserved hierarchy

---

# §7 — CONTENT INTEGRATION STRATEGY

## 7.1 What Stays

- All product data, pricing, category structure — untouched (backend)
- Collection names and concepts (Quick Breakfast, Tonight's Dinner, etc.)
- Brand voice tone (premium everyday commerce)
- Trust messaging (freshness, 30-min delivery, quality promise)
- All functional copy (cart, checkout, order status)

## 7.2 What Gets Enhanced (Visual Layer Only)

- Section heading copy — can be refined to match editorial style
- Hero headline — tightened for premium impact
- Eyebrow labels — added where sections need hierarchy
- Trust proof strip — messaging can be refined for brevity
- Footer copy hierarchy — improved visual treatment

## 7.3 What Needs Visual Support

- Hero section needs properly composed layered imagery
- Collection rows need editorial banner card treatment
- Dark editorial section needs stat/proof content presented dramatically
- Trust cards need icon/illustration treatment

---

# §8 — ASSET AND VISUAL PRODUCTION PLAN

## 8.1 What Already Exists

- `/public/images/hero/` — hero-basket.webp, basket-thumb.webp, produce-scatter.webp, hands-produce.webp
- `/public/images/promo/` — promo-lifestyle.png, promo-coriander.webp
- `/public/images/trust/` — trust-freshness.webp, trust-delivery.webp, trust-quality.webp
- `/public/images/collections/` — 6 collection banner images
- `/public/images/remotion-sources/` — basket + produce items for Remotion
- `/public/demo-catalog/` — demo product and category images
- Product images served from backend API

## 8.2 What Is Needed

- Ensure hero images load reliably with correct priority and fallbacks
- Collection editorial cards may need gradient + pattern treatment rather than photo dependency
- Dark editorial section uses text, numbers, and mesh gradients — no additional asset dependency
- Trust section icons should be emoji or Lucide-based — no heavy asset dependency
- Remotion hero video — optional enhancement, not a dependency

## 8.3 Remotion Strategy

Remotion should be treated as a **signature enhancement layer**, NOT a foundation:
- Desktop-only hero motion enhancement
- Strong static fallback must already look excellent
- No comprehension dependency on motion media
- Built AFTER the static UI is premium

---

# §9 — CLOUDCODE EXECUTION STRATEGY

## 9.1 How CloudCode Should Execute

Every session operates as a **single, bounded, independently executable unit**:
1. Read the phase file → understand boundaries
2. Read the session file → understand exact scope
3. Read the context state file → understand current progress
4. Confirm: phase, session, objective, in-scope files, blocked files
5. Execute the session's implementation focus
6. Validate against session success criteria
7. Update the context state file with results
8. Leave handoff notes for the next session

## 9.2 Prompt Structure for Each Session

Every CloudCode session prompt must include:
1. **Context**: "Read `.grolin-transform/phases/P{XX}...md` and `.grolin-transform/sessions/P{XX}-S{YY}...md`"
2. **Identity**: "You are executing Phase {X}, Session {Y} of the Grolin frontend transformation"
3. **Constraint**: "Visual changes ONLY. Backend files are FORBIDDEN."
4. **Scope**: "Files in scope: [list]. Files blocked: [list]."
5. **Objective**: One precise implementation goal
6. **Verification**: "After changes, verify at 375px mobile and 1280px desktop"
7. **Update**: "Update `.grolin-transform/context/CTX-SESSION-LOG.md` with results"

## 9.3 Frontend-Only Enforcement

Every session file contains explicit blocked-files lists. The context state file tracks which files have been changed. Any session that attempts to modify a blocked file is considered a failure and must be retried.

---

# §10 — RECOMMENDED TOOLS, SYSTEMS, AND WORKFLOW

## 10.1 Primary Tools

| Tool | Role |
|------|------|
| CloudCode (Antigravity) | Primary implementation engine |
| localhost:3011 | Dev server verification (ALWAYS this port) |
| Browser DevTools | Responsive testing (375px, 768px, 1280px) |
| `npx tsc --noEmit` | TypeScript safety check after every session |

## 10.2 Motion Libraries

| Library | Status | Role |
|---------|--------|------|
| Framer Motion v12 | Already installed | All entrance animations, spring physics, viewport reveal |
| CSS animations (globals.css) | Already implemented | Shimmer, grain drift, float, ticker |
| Remotion v4 | Already installed | Optional hero video composition |

## 10.3 Design System Tools

| Tool | Role |
|------|------|
| CSS custom properties (`--shop-*`) | Foundation token system |
| Tailwind config extensions | Utility class generation |
| globals.css utility classes | Premium visual utilities |

## 10.4 QA Workflow

1. After every file change: visual check at 375px and 1280px
2. After every session: `npx tsc --noEmit` for type safety
3. After every phase: cross-route consistency check
4. Before moving to next phase: human visual approval

---

# §11 — FINAL PHASE ARCHITECTURE

## 16 Phases — Complete Plan

### Phase 01 — Baseline Audit & Verification Closure
**Objective**: Establish a trustworthy starting point. Close verification debt from prior work.  
**Why it exists**: No premium redesign should build on unverified assumptions.  
**Scope**: All routes, all breakpoints — READ ONLY, no code changes.  
**Dependencies**: None (first phase).  
**Expected outputs**: Current-state truth document, verified route health report, visual debt inventory.  
**Risk notes**: Risk of discovering more broken elements than expected. Accept and document.  
**Review checklist**: ☐ All routes render without console errors ☐ Current visual state documented ☐ Known issues cataloged  
**Completion criteria**: Route health verified. All visual debt documented. Truth document created.  

### Phase 02 — Design Token Consolidation
**Objective**: Formalize the design foundation. Remove duplicates. Create a stable visual API.  
**Why it exists**: Later visual work must be system-driven, not ad hoc. Token drift causes inconsistency.  
**Scope**: `globals.css`, `tailwind.config.ts` — token values only.  
**Dependencies**: Phase 01 completed.  
**Expected outputs**: Clean token system, resolved duplicates, aligned Tailwind config.  
**Risk notes**: Existing components may reference old token names. Changes must be backward-compatible.  
**Review checklist**: ☐ No duplicate token definitions ☐ All shop-* tokens documented ☐ Tailwind shadows aligned with CSS variables  
**Completion criteria**: Token system is clean, documented, and backward-compatible.  

### Phase 03 — Typography & Hierarchy System
**Objective**: Make the product read like a premium brand, not a generic commerce app.  
**Why it exists**: Typography hierarchy is the #1 driver of perceived quality.  
**Scope**: Heading/body className changes across all components. No logic changes.  
**Dependencies**: Phase 02 (tokens must be stable).  
**Expected outputs**: Consistent editorial headings, commerce typography, utility text hierarchy.  
**Risk notes**: Over-large headings on mobile. Must verify at 375px.  
**Review checklist**: ☐ Section headings ≥22px ☐ Hero headline uses editorial treatment ☐ Product card text properly weighted ☐ No mixed font sizes at same hierarchy level  
**Completion criteria**: Every text element follows the type scale. Hierarchy creates authority.  

### Phase 04 — Surface & Depth System
**Objective**: Establish premium physicality. Shadows replace borders. Surfaces alternate.  
**Why it exists**: Depth hierarchy is the primary visual signal that separates premium from template.  
**Scope**: Card className changes (border → shadow), section background wrappers, grain application.  
**Dependencies**: Phase 03 (typography must be settled before depth work).  
**Expected outputs**: Floating cards, alternating section backgrounds, grain on premium surfaces.  
**Risk notes**: Removing borders may expose spacing issues. Shadows render differently across browsers.  
**Review checklist**: ☐ No card relies on border as primary separation ☐ Homepage sections alternate backgrounds ☐ Hero has grain overlay ☐ Warm ivory canvas everywhere  
**Completion criteria**: Cards float. Sections breathe. Premium depth is visible.  

### Phase 05 — Structural Primitives & Layout Unification
**Objective**: Create reusable page structure patterns. Reduce layout inconsistency.  
**Why it exists**: Without shared primitives, each section reinvents its own geometry.  
**Scope**: New primitive components (visual-only), homepage section wrappers.  
**Dependencies**: Phase 04 (surface system must exist before wrapping content).  
**Expected outputs**: SectionWrapper, SectionHeading, PromoBand, TrustCard primitives.  
**Risk notes**: Primitives must not break existing component rendering.  
**Review checklist**: ☐ SectionWrapper provides consistent max-width and padding ☐ SectionHeading supports eyebrow/title/action pattern ☐ No layout regressions  
**Completion criteria**: Structural primitives exist and are ready for homepage application.  

### Phase 06 — Homepage Hero Recomposition
**Objective**: Rebuild the hero into a true brand moment with editorial composition.  
**Why it exists**: The hero carries disproportionate weight in first-impression quality.  
**Scope**: HeroLayered.tsx, BannerCarousel.tsx — className and layout only.  
**Dependencies**: Phase 05 (primitives available for section structure).  
**Expected outputs**: Layered hero with background atmosphere, primary subject, strong headlines, CTA clarity.  
**Risk notes**: Hero must not become too tall on mobile. Image stability is critical.  
**Review checklist**: ☐ Hero has clear depth layers ☐ Copy is concise and authoritative ☐ CTA is immediately visible ☐ Mobile hero is intentionally composed  
**Completion criteria**: Hero creates a premium brand moment at first viewport.  

### Phase 07 — Homepage Section Narrative
**Objective**: Compose the homepage into a paced storefront journey.  
**Why it exists**: A premium homepage is a composed narrative, not a stack of widgets.  
**Scope**: Homepage page.tsx section wrappers, trust section, collection rows, editorial dark band.  
**Dependencies**: Phase 06 (hero must be done — it sets the tone for everything below).  
**Expected outputs**: Trust strip, editorial text break, collection rhythm, dark editorial section, section flow.  
**Risk notes**: Adding too many sections can slow the page. Keep the narrative tight.  
**Review checklist**: ☐ Sections alternate backgrounds ☐ Dark editorial band exists ☐ Collection rows have editorial treatment ☐ Narrative arc is clear on scroll  
**Completion criteria**: Homepage scrolls like a brand story, not a data dump.  

### Phase 08 — Product Card & Discovery Polish
**Objective**: Elevate the most repeated shopping surface.  
**Why it exists**: Product cards are the core brand-touch surface users interact with most.  
**Scope**: ProductCard.tsx, ProductGrid.tsx, AddToCartButton.tsx — className only.  
**Dependencies**: Phase 04 (surface/depth system must be in place for card elevation).  
**Expected outputs**: Premium cards with hover lift, smooth add-to-cart transition, clean scan pattern.  
**Risk notes**: Card changes affect every product-displaying page. Test across all routes.  
**Review checklist**: ☐ Shadow-based elevation (no border separation) ☐ Hover state with translateY lift ☐ Add-to-cart interaction smooth ☐ Price/discount display clean  
**Completion criteria**: Product cards feel tactile, premium, and responsive to interaction.  

### Phase 09 — Global Chrome (Header, Footer, Navigation)
**Objective**: Ensure shell surfaces match the premium interior.  
**Why it exists**: Header and footer are visible on every page. If they feel generic, the system fails.  
**Scope**: Header.tsx, ShopFooter.tsx, BottomNav.tsx, SearchBar.tsx — className only.  
**Dependencies**: Phase 04 (depth system for header scroll shadow, footer treatment).  
**Expected outputs**: Premium header with scroll behavior, elevated footer, animated bottom nav.  
**Risk notes**: Header changes affect all routes. Must not break mobile search or cart access.  
**Review checklist**: ☐ Header has glass/blur on scroll ☐ Bottom nav has animated active indicator ☐ Footer feels branded, not generic ☐ Search bar is functional and styled  
**Completion criteria**: Navigation chrome feels premium and consistent site-wide.  

### Phase 10 — Cross-Route Premium Consistency
**Objective**: Extend the design language across all non-home surfaces.  
**Why it exists**: A premium homepage with generic inner routes creates a broken brand experience.  
**Scope**: Categories, search, PDP, cart, checkout, orders, profile, wallet, auth pages.  
**Dependencies**: Phases 03-09 (design language must be established before cross-route application).  
**Expected outputs**: Every route inherits the premium visual language.  
**Risk notes**: Largest scope phase. Must be broken into focused sessions by route group.  
**Review checklist**: ☐ Every route uses warm canvas ☐ Cards use shadow system ☐ Typography hierarchy consistent ☐ Empty/loading states match brand  
**Completion criteria**: Every route feels like it belongs to the same premium product.  

### Phase 11 — Motion System Foundation
**Objective**: Create reusable motion library and timing logic.  
**Why it exists**: Motion without a system creates inconsistency and integration debt.  
**Scope**: New motion-variants file, ViewportReveal component, LazyMotion setup.  
**Dependencies**: Phase 10 (all routes must be visually stable before adding motion).  
**Expected outputs**: Shared motion variants, LazyMotion at layout level, ViewportReveal wrapper.  
**Risk notes**: Motion library must be tree-shakeable and performant.  
**Review checklist**: ☐ LazyMotion with domAnimation configured ☐ Motion variants file exists with all categories ☐ ViewportReveal fires once only ☐ No bundle size regression  
**Completion criteria**: Motion system is ready for choreography application.  

### Phase 12 — Homepage Motion Choreography
**Objective**: Apply premium motion selectively to the homepage.  
**Why it exists**: The homepage is the primary brand showcase. Motion here has highest ROI.  
**Scope**: Homepage hero entrance, section reveals, card stagger, micro-interactions.  
**Dependencies**: Phase 11 (motion system must exist before choreography).  
**Expected outputs**: Hero entrance stagger, section scroll reveals, card grid stagger.  
**Risk notes**: Over-animation on homepage is the #1 risk. Enforce motion budget strictly.  
**Review checklist**: ☐ Hero entrance feels confident, not bouncy ☐ Section reveals fire once ☐ Card stagger is subtle (50ms delay) ☐ No jank on mobile scroll  
**Completion criteria**: Homepage feels alive and premium. Motion enhances, never distracts.  

### Phase 13 — Loading, Empty & Transitional States
**Objective**: Make secondary states feel as premium as the core UI.  
**Why it exists**: Users experience loading/empty states frequently. They shape perceived quality.  
**Scope**: All skeleton components, empty state components, error boundaries.  
**Dependencies**: Phase 04 (surface treatment), Phase 03 (typography).  
**Expected outputs**: Warm skeletons, branded empty states, smooth state transitions.  
**Risk notes**: Skeleton layout must match real content layout to prevent CLS.  
**Review checklist**: ☐ All skeletons use warm ivory shimmer ☐ Empty states have personality (not just "No items") ☐ Error states are recoverable ☐ No layout shift on content load  
**Completion criteria**: Every non-primary state feels designed and branded.  

### Phase 14 — Responsive Hardening & Accessibility
**Objective**: Ensure premium quality survives all viewport and accessibility conditions.  
**Why it exists**: Premium design that breaks on mobile or ignores accessibility is incomplete.  
**Scope**: All components — responsive className adjustments, focus states, reduced motion.  
**Dependencies**: Phases 01-13 (all visual work must be done before hardening pass).  
**Expected outputs**: Verified 375px/768px/1280px, comfortable tap targets, focus rings, reduced-motion support.  
**Risk notes**: This phase often reveals hidden breakpoint issues. Budget time for fixes.  
**Review checklist**: ☐ No layout breaks at 375px ☐ Tap targets ≥44px ☐ Focus-visible states present ☐ prefers-reduced-motion respected ☐ Contrast ratios adequate  
**Completion criteria**: Site is premium across all viewports and accessibility modes.  

### Phase 15 — Remotion Signature Layer
**Objective**: Add a carefully controlled premium motion asset layer.  
**Why it exists**: Video enhances hero impact on desktop when done well.  
**Scope**: `/remotion/` compositions, hero video integration, fallback system.  
**Dependencies**: Phase 12 (static homepage must already feel premium).  
**Expected outputs**: Desktop hero video enhancement, mobile fallback, no motion dependency.  
**Risk notes**: Video heaviness can hurt mobile performance. Desktop-only with graceful fallback.  
**Review checklist**: ☐ Composition renders at ≥1280x720 ☐ Desktop shows video, mobile shows static ☐ Missing video → graceful fallback ☐ No CLS or loading jank  
**Completion criteria**: Hero has a signature motion enhancement that elevates desktop experience.  

### Phase 16 — Final QA & Ship Readiness
**Objective**: Convert from good-looking work to a trustworthy release candidate.  
**Why it exists**: A premium redesign that ships with regressions damages trust.  
**Scope**: All routes, all breakpoints, all states — comprehensive verification.  
**Dependencies**: All previous phases completed.  
**Expected outputs**: Cross-route signoff, breakpoint signoff, performance sanity check, regression closure.  
**Risk notes**: QA always reveals more issues than expected. Budget for fixes.  
**Review checklist**: ☐ Every route verified at 375px + 1280px ☐ Zero console errors affecting rendering ☐ LCP < 3s ☐ No visual regressions ☐ All scores ≥ 9.0  
**Completion criteria**: Site is production-ready. All gates passed.  

---

# §12 — PHASE MD FILE ARCHITECTURE

## File Naming Convention

All phase files live in `.grolin-transform/phases/` with the pattern:  
`P{XX}-{kebab-name}.md`

| Filename | Purpose |
|----------|---------|
| `P01-baseline-audit.md` | Controls Phase 1 — audit and verification |
| `P02-design-tokens.md` | Controls Phase 2 — token consolidation |
| `P03-typography.md` | Controls Phase 3 — type hierarchy |
| `P04-surface-depth.md` | Controls Phase 4 — elevation and surface |
| `P05-structural-primitives.md` | Controls Phase 5 — layout unification |
| `P06-hero-recomposition.md` | Controls Phase 6 — hero rebuild |
| `P07-homepage-narrative.md` | Controls Phase 7 — section composition |
| `P08-product-card-polish.md` | Controls Phase 8 — card experience |
| `P09-global-chrome.md` | Controls Phase 9 — header/footer/nav |
| `P10-cross-route-consistency.md` | Controls Phase 10 — all routes aligned |
| `P11-motion-foundation.md` | Controls Phase 11 — motion system |
| `P12-homepage-choreography.md` | Controls Phase 12 — homepage motion |
| `P13-loading-empty-states.md` | Controls Phase 13 — secondary states |
| `P14-responsive-accessibility.md` | Controls Phase 14 — hardening pass |
| `P15-remotion-layer.md` | Controls Phase 15 — video enhancement |
| `P16-final-qa.md` | Controls Phase 16 — ship readiness |

## What Each Phase File Contains

Every phase file contains:
1. Phase number, name, and objective
2. Why the phase exists
3. Scope boundaries
4. Dependencies and prerequisites
5. Inputs required
6. Expected outputs
7. Risks specific to this phase
8. Review checklist
9. Completion criteria
10. Exact session list (with session filenames)
11. In-scope files/components
12. BLOCKED files/components
13. Validation gates
14. End-of-phase acceptance rule

## How CloudCode Uses Phase Files

At the start of any work within a phase:
1. Read the phase file FIRST
2. Confirm you understand the phase boundaries
3. Identify which session within the phase you are executing
4. Read that session file
5. Proceed only within the defined scope

---

# §13 — EXACT SESSION ARCHITECTURE FOR EVERY PHASE

## Phase 01 — Baseline Audit (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Route Health Scan | Verify all 22 routes render without errors | Isolates broken routes from visual issues | Zero console errors across all routes |
| S02 | Visual Debt Inventory | Catalog every visual deficiency | Separates observation from action | Complete issue catalog with severity |
| S03 | Current-State Document | Create authoritative truth record | Provides foundation for all future sessions | Truth document ready and accurate |

## Phase 02 — Design Tokens (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Token Audit | Identify duplicates, conflicts, unused tokens | Must understand before changing | Audit complete with recommendations |
| S02 | Token Cleanup | Remove duplicates, resolve conflicts | Clean changes in one focused pass | Zero duplicate token definitions |
| S03 | Tailwind Alignment | Align Tailwind config with CSS variables | Config-specific changes isolated | Shadow/color tokens fully aligned |

## Phase 03 — Typography (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Editorial Headlines | Apply type scale to section headings | Headlines affect every page — focused pass | All section headings ≥22px |
| S02 | Commerce Typography | Cards, prices, badges, chips | Commerce text has its own rules | Product cards properly typed |
| S03 | Nav, Footer, Utility | Navigation labels, footer text, metadata | Chrome typography is different from content | All chrome text sized correctly |

## Phase 04 — Surface & Depth (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Canvas & Backgrounds | Establish section background alternation | Background changes affect layout perception | Sections alternate warm/white/subtle/dark |
| S02 | Card Elevation | Replace borders with shadows site-wide | Card changes propagate everywhere — isolate | No card uses border as primary separator |
| S03 | Texture Application | Apply grain, mesh to premium surfaces | Texture is additive — add after surfaces stable | Hero + key sections have grain/mesh |

## Phase 05 — Structural Primitives (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Wrapper & Heading | Create SectionWrapper, SectionHeading | Core structural components | Components exist and render correctly |
| S02 | Promo & Trust | Create PromoBand, TrustCard | Specialized content primitives | Components support all content patterns |
| S03 | Grid & Spacing | Standardize grid system, breathing room | Layout rhythm is independent concern | Consistent spacing across sections |

## Phase 06 — Hero Recomposition (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Hero Layout | Restructure hero layers and composition | Layout precedes content | Hero has clear layer hierarchy |
| S02 | Hero Content | Headlines, copy, CTA, trust cue | Content is separate from layout | Copy is concise and authoritative |
| S03 | Hero Responsive | Mobile-specific hero composition | Mobile hero needs intentional design | Hero is premium at 375px AND 1280px |

## Phase 07 — Homepage Narrative (4 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Trust & Post-Hero | Trust strip, editorial text break, proof row | Immediate post-hero sections set the pace | Trust elements are visible and branded |
| S02 | Collection Rows | Editorial banner cards, scroll containers | Collections are complex — isolate | Collection rows look curated |
| S03 | Dark Editorial | Full-bleed dark section with stats | Most dramatic section — needs focus | Dark band is dramatic scroll-stopper |
| S04 | Flow Integration | Section ordering, rhythm, transitions | Final composition pass | Homepage narrative reads cohesively |

## Phase 08 — Product Card Polish (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Card Visual Surgery | Shadow, image zone, typography | Visual treatment is one concern | Cards look premium at rest |
| S02 | Interaction States | Hover, press, add-to-cart | Interaction is a separate concern | All interaction states defined |
| S03 | Grid & Category Cards | Product grid, category card treatment | Grid layout is distinct from card design | Grids display correctly at all breakpoints |

## Phase 09 — Global Chrome (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Header & Search | Header glass effect, search styling | Header is the primary chrome surface | Header feels premium on scroll |
| S02 | Footer | Footer visual treatment | Footer is a large, independent surface | Footer matches brand system |
| S03 | Bottom Nav & Mobile | Bottom nav pill, mobile chrome | Mobile-specific chrome treatment | Bottom nav animated, mobile premium |

## Phase 10 — Cross-Route Consistency (4 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Categories & Search | Category directory, detail, search pages | Discovery routes share patterns | Discovery routes are premium |
| S02 | Product Detail | PDP layout, gallery, info, delivery | PDP is a large, independent surface | PDP feels immersive |
| S03 | Cart & Checkout | Cart, checkout flow, order confirmed | Commerce flow pages need focus | Commerce flow feels confident |
| S04 | Account Routes | Orders, profile, wallet, auth pages | Account pages share utility patterns | Utility pages are branded |

## Phase 11 — Motion Foundation (2 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Variants & LazyMotion | Create motion-variants.ts, configure LazyMotion | Foundation must exist before use | Motion system configured |
| S02 | ViewportReveal | Create ViewportReveal wrapper, interaction primitives | Trigger system is distinct from variants | Reveal system works correctly |

## Phase 12 — Homepage Choreography (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Hero Entrance | Hero headline stagger, CTA reveal | Hero animation is the highest-stakes | Hero entrance feels cinematic |
| S02 | Section Reveals | Below-fold section reveal choreography | Section motion is separate from hero | Sections reveal smoothly on scroll |
| S03 | Micro-Interactions | Card stagger, hover depth, button feedback | Interaction motion is the finest grain | Interactions feel responsive |

## Phase 13 — Loading & Empty States (2 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Skeletons & Loading | Warm skeletons, loading indicators | Loading states are a visual system | All skeletons warm, layout-matched |
| S02 | Empty & Error | Empty state design, error recovery | Empty states need personality | Empty states are branded |

## Phase 14 — Responsive & Accessibility (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Mobile Pass | Verify/fix all surfaces at 375px | Mobile is the primary viewport | Zero layout breaks at 375px |
| S02 | Desktop Pass | Verify/fix all surfaces at 1280px | Desktop has different composition | Desktop uses space elegantly |
| S03 | Accessibility | Focus states, reduced motion, contrast, tap targets | a11y is a distinct discipline | All accessibility gates pass |

## Phase 15 — Remotion Layer (2 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Composition | Develop/refine Remotion hero composition | Creation is separate from integration | Composition renders at ≥1280x720 |
| S02 | Integration | Hero video integration + fallback | Integration needs its own verification | Video plays on desktop, fallback on mobile |

## Phase 16 — Final QA (3 sessions)

| # | Session | Objective | Why Separate | Success Criteria |
|---|---------|-----------|-------------|-----------------|
| S01 | Visual Audit | Cross-route visual consistency review | Visual completeness check | All routes visually consistent |
| S02 | Performance | LCP, CLS, bundle size, jank check | Performance is a technical discipline | LCP < 3s, no jank |
| S03 | Release Gate | Final polish, regression closure, signoff | Ship-readiness is a decision gate | All scores ≥ 9.0, human approved |

**Total: 47 sessions across 16 phases.**

---

# §14 — SESSION MD FILE ARCHITECTURE

## File Naming Convention

All session files live in `.grolin-transform/sessions/` with the pattern:  
`P{XX}-S{YY}-{kebab-name}.md`

Example: `P01-S01-route-health-scan.md`, `P07-S03-dark-editorial.md`

## What Each Session File Contains

1. Phase reference (which phase this belongs to)
2. Session number and title
3. Session objective (one sentence)
4. Exact implementation focus (what changes, where)
5. Read-first context files (what to read before starting)
6. Files/components IN SCOPE (exact file paths)
7. Files/components BLOCKED (exact file paths — NEVER touch)
8. Rules for this session (specific constraints)
9. Required validation after execution
10. Expected output of this session
11. What must be updated at session end
12. Handoff notes template for next session
13. Success criteria (binary — done or not done)

## Why Sessions Must Be Separate Files

- CloudCode operates in bounded contexts. Each session file is one complete instruction set.
- Session files prevent scope creep — you can only do what the file says.
- Session files enable pause/resume — any session can be restarted independently.
- Session files prevent hallucination — explicit file lists prevent "creative" file modifications.

---

# §15 — CLOUD MD / CONTEXT MANAGEMENT FRAMEWORK

## Context Files

All context files live in `.grolin-transform/context/`:

### `CTX-CURRENT-STATE.md`
**Contains**: Current phase, current session, last completed session, overall progress percentage, scores by route, known issues, blocking concerns.  
**Updated**: At the end of every session.  
**Read**: At the start of every session.

### `CTX-SESSION-LOG.md`
**Contains**: Chronological log of every completed session — what changed, what remains, what failed, what the next session must know.  
**Updated**: At the end of every session.  
**Read**: At the start of every session (last 3 entries minimum).

### `CTX-BLOCKED-FILES.md`
**Contains**: Definitive list of files that NO session may ever modify. Includes services, stores, hooks, API files, env files, config files.  
**Updated**: Never (fixed at project start).  
**Read**: At the start of every session.

### `CTX-CHANGED-FILES.md`
**Contains**: Running list of every file modified during the transformation, organized by phase and session.  
**Updated**: At the end of every session.  
**Read**: At phase transitions (for regression awareness).

## Context Flow Between Sessions

```
Session Start:
  1. Read CTX-CURRENT-STATE.md → know where you are
  2. Read CTX-SESSION-LOG.md (last 3) → know what just happened
  3. Read CTX-BLOCKED-FILES.md → know what you cannot touch
  4. Read Phase file → know the phase boundaries
  5. Read Session file → know the exact scope
  6. Confirm: phase, session, objective, in-scope, blocked
  7. Begin work

Session End:
  1. Update CTX-CURRENT-STATE.md with new status
  2. Append to CTX-SESSION-LOG.md with results
  3. Update CTX-CHANGED-FILES.md with modified files
  4. Fill in handoff notes in session file
```

---

# §16 — ANTI-HALLUCINATION EXECUTION PROTOCOL

## The 12 Commandments of Execution Safety

### 1. ALWAYS READ CONTEXT FIRST
Before touching any file, read: CTX-CURRENT-STATE → CTX-SESSION-LOG → CTX-BLOCKED-FILES → Phase file → Session file.

### 2. ALWAYS CONFIRM PHASE AND SESSION
State explicitly: "I am executing Phase {X}, Session {Y}: {title}."

### 3. ALWAYS CONFIRM IN-SCOPE FILES
State explicitly: "Files in scope for this session: {list}."

### 4. ALWAYS CONFIRM BLOCKED FILES
State explicitly: "Files BLOCKED in this session: {list}."

### 5. NEVER START BLIND
If context files are missing or unclear, STOP and ask. Never guess the current state.

### 6. NEVER EXCEED SCOPE
If you discover an issue outside the current session's scope, DOCUMENT it for a future session. Do not fix it now.

### 7. NEVER MIX UNRELATED UI SYSTEMS
One session = one UI concern. Do not combine typography changes with motion changes with card changes.

### 8. NEVER TOUCH BACKEND
No services, stores, hooks, API files, env files, or config files. EVER. This rule has zero exceptions.

### 9. ALWAYS VALIDATE BEFORE COMPLETING
After changes: check at 375px mobile AND 1280px desktop. Run `npx tsc --noEmit`. If either fails, fix before marking complete.

### 10. ALWAYS LEAVE HANDOFF NOTES
At session end, update the session log with: what was completed, what changed, what remains, what the next session must know.

### 11. NEVER SKIP PHASE GATES
Before transitioning to a new phase, the current phase must be reviewed and approved (by human or by systematic verification).

### 12. PREFER SURGICAL CHANGES
Change the minimum necessary. Find the className. Change only that. Do not rewrite entire files during styling work.

---

# §17 — QUALITY-CONTROL AND REVIEW FRAMEWORK

## Review Gates

### Visual Quality Gate
- Does this look premium?
- Does it look consistent across the page?
- Does it feel intentional, not accidental?
- Does any part still feel template-like or generic?

### Interaction Quality Gate
- Are action states obvious?
- Do buttons, steppers, and cards feel responsive?
- Does motion help rather than distract?

### Responsive Quality Gate
- Does mobile feel designed, not compressed?
- Does desktop use space elegantly?
- Do images and layout remain controlled across breakpoints?

### Stability Gate
- Are images stable (no CLS)?
- Are loading states controlled?
- Is there visual jank or layout shift?

### Cross-Route Consistency Gate
- Does the same design language appear everywhere?
- Are utility pages clearly part of the same product?

### Accessibility Gate
- Are tap targets comfortable (≥44px)?
- Are focus-visible states present?
- Is `prefers-reduced-motion` respected?
- Are contrast ratios adequate?

## Scoring System

Every route should be scored 0-10 after each phase transition:
- **< 7.0**: Unacceptable. Must fix before proceeding.
- **7.0-8.0**: Below target. Address in current phase if in scope.
- **8.0-9.0**: Approaching target. Polish in later phases.
- **≥ 9.0**: Target quality. Maintain going forward.

---

# §18 — RISK MANAGEMENT

## Major Risks

### R1: Overdesign
**Description**: Too many decorative effects make the UI slower, noisier, and less usable.  
**Mitigation**: Motion budget enforcement. Every effect must have a purpose. Test on low-end devices.

### R2: Homepage-Only Success
**Description**: A premium homepage with generic inner routes breaks brand trust.  
**Mitigation**: Phase 10 specifically addresses cross-route consistency. No phase is "done" until inner routes are checked.

### R3: Motion Overload
**Description**: Too much reveal, parallax, or animated repetition makes the site feel cheaper.  
**Mitigation**: Strict motion budget in Phase 12. Section reveals fire ONCE. Card stagger is subtle. Scroll-linked effects limited to 2-3 surfaces.

### R4: Token Drift
**Description**: Components inventing local shadows, radii, or spacing destroy coherence.  
**Mitigation**: Phase 02 consolidates tokens. Every session checks against the design system.

### R5: Unverified Completion
**Description**: Marking phases complete before breakpoint verification creates hidden rework.  
**Mitigation**: Every session requires 375px + 1280px verification. Phase transitions require human approval.

### R6: Context Drift Across Sessions
**Description**: Long execution with many sessions loses track of what was done, what changed, and what remains.  
**Mitigation**: CTX-SESSION-LOG.md updated every session. CTX-CURRENT-STATE.md always reflects reality.

### R7: Backend Contamination
**Description**: Accidental modifications to service files, stores, or API configs break the working product.  
**Mitigation**: CTX-BLOCKED-FILES.md is immutable. Every session confirms blocked files before starting.

### R8: Performance Regression
**Description**: Heavy animations, large assets, or excessive CSS complexity degrade load time.  
**Mitigation**: Phase 16 includes performance verification. LazyMotion keeps bundle size controlled. GPU-only animations.

---

# §19 — PROPER EXECUTION GUIDE

## How to Execute This System

### Step 1: Understand the System
Read this Master Report (§1-§20) completely. Understand the philosophy, the architecture, and the rules.

### Step 2: Use the Master Index
Open `00-MASTER-INDEX.md`. This is your dashboard. It shows all phases, all sessions, execution order, dependencies, and status.

### Step 3: Begin Phase 01
1. Open the phase file: `.grolin-transform/phases/P01-baseline-audit.md`
2. Read the entire file. Understand the phase boundaries.
3. Open the first session file: `.grolin-transform/sessions/P01-S01-route-health-scan.md`
4. Read the entire file. Understand the exact scope.
5. Read ALL context files before starting work.

### Step 4: Execute a Session
1. **Confirm**: "I am executing Phase {X}, Session {Y}: {title}"
2. **Confirm in-scope files**: "Files in scope: {list}"
3. **Confirm blocked files**: "Files blocked: {list}"
4. **Execute**: Make the changes described in the session file
5. **Validate**: Check at 375px mobile AND 1280px desktop
6. **Update**: CTX-CURRENT-STATE.md, CTX-SESSION-LOG.md, CTX-CHANGED-FILES.md

### Step 5: Complete a Phase
After all sessions in a phase are done:
1. Run the phase review checklist
2. Verify completion criteria
3. Update phase status in Master Index
4. Get human approval before moving to next phase

### Step 6: Begin Next Phase
Only after the previous phase is approved:
1. Open the next phase file
2. Check dependencies are met
3. Open the first session of the new phase
4. Repeat Step 4

### What CloudCode Must Read First (every session)
1. `CTX-CURRENT-STATE.md`
2. `CTX-SESSION-LOG.md` (last 3 entries)
3. `CTX-BLOCKED-FILES.md`
4. The current Phase file
5. The current Session file

### How to Verify Session Completion
- [ ] Implementation matches session objective
- [ ] 375px mobile verified — no breaks
- [ ] 1280px desktop verified — no breaks
- [ ] `npx tsc --noEmit` passes
- [ ] CTX files updated
- [ ] Handoff notes written

### How to Verify Phase Completion
- [ ] All sessions in phase completed
- [ ] Phase review checklist all checked
- [ ] Phase completion criteria met
- [ ] No regression on previously completed phases
- [ ] Human approval obtained

---

# §20 — FINAL EXECUTIVE RECOMMENDATION

## Best Execution Path

1. **Start with Phase 01** — never skip the audit. It prevents building on broken assumptions.
2. **Phases 02-05 are the foundation** — tokens, typography, surfaces, and primitives create the system. Without them, later phases drift.
3. **Phase 06-07 (hero + homepage)** have the highest visual impact. This is where the transformation becomes visible.
4. **Phase 08 (product cards)** is the highest-leverage commerce surface. Premium cards directly affect perceived quality everywhere.
5. **Phase 10 (cross-route)** is the most important consistency pass. A premium homepage means nothing if cart looks generic.
6. **Phases 11-12 (motion)** should only happen after static UI is excellent. Motion cannot compensate for weak design.
7. **Phase 16 (QA)** must never be skipped or rushed. Ship readiness is a gate, not a suggestion.

## What Must Never Be Compromised

1. **Backend safety** — one broken service import costs hours of debugging
2. **System consistency** — ad hoc styling creates maintenance debt
3. **Responsive quality** — 375px is the primary viewport for Kolkata users
4. **Commerce clarity** — the site must still be easy to shop
5. **Session boundaries** — mixing concerns creates drift

## What Creates the Biggest Quality Leap

1. **Borders → shadows** — instant premium upgrade (Phase 04)
2. **Typography hierarchy** — authority in headlines, comfort in body (Phase 03)
3. **Section rhythm** — alternating backgrounds, dark editorial band (Phase 07)
4. **Hero recomposition** — brand moment at first viewport (Phase 06)
5. **Product card polish** — premium where users interact most (Phase 08)

## How to Move from Plan to Production

This system is designed for **incremental, verifiable, stable delivery**:
- Each phase produces visible improvement
- Each session is independently executable
- Context is preserved between sessions
- Validation happens continuously
- Human judgment gates every phase transition

The path to production is not one giant deployment. It is **16 phases of controlled, verified, premium improvement** — each one making the product visibly better than the last.

Execute with discipline. Verify with rigor. Ship with confidence.

---

*End of Master Transformation Report*
