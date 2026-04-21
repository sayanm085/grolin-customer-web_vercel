---
project: grolin
role: log
status: active
---
# CHANGED FILES

> Registry of every source file modified during transformation. Updated at session end.

---

## P16-S03: Release Gate — 2026-03-29 (FINAL SESSION ✅)
- `.grolin-transform/TRANSFORMATION-COMPLETE.md` (CREATED) — full transformation summary document
- `.claude/CURRENT_STATE.md` (UPDATED) — marked W15 complete, 47/47, transformation done
- `.claude/logs/SESSION_LOG.md` (UPDATED) — P16-S03 entry appended
- `.claude/logs/CHANGED_FILES.md` (UPDATED) — this entry
- `.claude/BOOST.md` (UPDATED) — marked transformation complete
- `.grolin-transform/MASTER_INDEX.md` (UPDATED) — W15 and P16 statuses updated
- `.grolin-transform/sessions/P16-S03-release-gate.md` (UPDATED) — status → complete
- `.claude/handoffs/W15_HANDOFF.md` (CREATED) — final window handoff
- **Source files modified**: NONE — no fixes needed. S01 and S02 resolved all outstanding issues.

---

## P16-S01: Cross-Route Visual Audit — 2026-03-29
- `src/app/globals.css` (MODIFIED) — Fixed @keyframes progress-fill: changed `to { width: var(--progress) }` → `to { width: 100% }`. The --progress CSS variable was never set inline on the hero progress bar element, causing the animation to have no effect.

---

## P15-S02: Hero Video Integration — 2026-03-29
- `src/components/home/HeroLayered.tsx` (MODIFIED) — added useRef import; added isMobile state (default true, SSR-safe); added videoFailed state; added videoRef; added useEffect for mobile detection (window.innerWidth < 768); updated video conditional to guard with !isMobile && !shouldReduceMotion && !videoFailed; updated video src from hero-loop.webm/mp4 → hero-composition.webm/mp4; added poster="/images/hero/hero-basket.webp"; added onError handler.

---

## P15-S01: Remotion Composition Development — 2026-03-29
- `remotion/Root.tsx` (MODIFIED) — upgraded from Composition 600×700 durationInFrames=180 to 1920×1080 durationInFrames=150; id changed from HeroLoop → HeroVideo; export function added; registerRoot retained.
- `remotion/HeroLoop.tsx` (MODIFIED) — rewritten for 1920×1080: produce items repositioned to corner clusters, bounce spring physics (220/18/1.0), GreenTrail radial burst, BrandReveal Act 3, BasketLayer with gentle spring + purple pulse ring. Canvas warm ivory #F0ECE8 maintained.
- `remotion/index.ts` (CREATED) — re-exports RemotionRoot (entry point file).
- `public/videos/hero-composition.webm` (CREATED) — rendered 1920×1080, 30fps, 5s, VP8, 224KB.
- `public/videos/hero-composition.mp4` (CREATED) — rendered 1920×1080, 30fps, 5s, H.264, 1.8MB.

---

## P14-S03: Accessibility Pass — 2026-03-29
- `src/app/globals.css` (MODIFIED) — :focus-visible global ring (2px solid --shop-primary); :focus:not(:focus-visible) outline:none; dark surface focus override; prefers-reduced-motion upgraded to universal *, *::before, *::after with animation-duration/iteration-count/transition-duration/scroll-behavior.
- `src/components/product/AddToCartButton.tsx` (MODIFIED) — aria-label on Minus ("Decrease quantity") and Plus ("Increase quantity") buttons; aria-label on qty span ("Quantity: N").
- `src/components/layout/BottomNav.tsx` (MODIFIED) — aria-label="Main navigation" on <nav>; aria-label + aria-current="page" on active Link.
- `src/components/checkout/StepIndicator.tsx` (MODIFIED) — role="list" + aria-label on wrapper; role="listitem" + aria-current="step" on step divs; aria-label on step circles; aria-hidden on decorative pulse span and Check icon.
- `src/components/layout/SearchBar.tsx` (MODIFIED) — aria-label="Search products" on input; aria-hidden="true" on decorative icon in desktop Search button.

---

## P14-S01+S02: Responsive Hardening — 2026-03-29
- `src/components/product/FilterBar.tsx` (MODIFIED) — sticky top-[88px] → top-[130px] lg:top-[108px]; bg-white/95 → bg-[color:var(--shop-surface)]/95. Mobile header is 2-row (~130px); desktop (~108px). Brand token background.
- `src/app/(shop)/products/page.tsx` (MODIFIED) — Suspense fallback + main content: px-6 → px-4 sm:px-6. Matches PageShell px-4 mobile standard.
- `src/components/layout/ShopFooter.tsx` (MODIFIED) — contact <p> elements: inline-flex → flex; added shrink-0 to Mail/Phone/MapPin icons. Fixes contact items appearing on same line (inline-flex on <p> breaks space-y stacking).
- `src/components/shared/PageShell.tsx` (MODIFIED) — added mx-auto w-full max-w-screen-xl to base className. Without max-width, interior pages stretched edge-to-edge at 1280px desktop.

---

## P13-S02: Empty & Error States — 2026-03-29
- `src/components/shared/EmptyStateCard.tsx` (MODIFIED) — 'use client'; m.div spring entry (stiffness:120 damping:24 mass:1.2); warm rounded-[28px] surface container; colored icon container with shadow; green CTA with shadow; secondary CTA surface/border style
- `src/components/shared/EmptyState.tsx` (MODIFIED) — added iconBg/iconColor props pass-through to EmptyStateCard
- `src/components/shared/OrdersEmpty.tsx` (MODIFIED) — personality copy; primary-soft/primary icon colors
- `src/components/shared/SearchEmpty.tsx` (MODIFIED) — personality copy; better subtitle for query vs. no-query
- `src/components/shared/WishlistEmpty.tsx` (MODIFIED) — personality copy; rose-50/rose-400 icon colors
- `src/components/shared/NotificationsEmpty.tsx` (MODIFIED) — personality copy; amber-50/amber-500 icon colors
- `src/components/shared/ReviewsEmpty.tsx` (MODIFIED) — personality copy; amber-50/amber-400 icon colors
- `src/app/not-found.tsx` (MODIFIED) — full brand upgrade: MapPin icon, primary-soft bg, "Lost in the aisles" copy, green+surface CTAs, larger typography

---

## P13-S01: Warm Skeletons & Loading States — 2026-03-29
- `src/app/globals.css` (MODIFIED) — removed duplicate `.skeleton-warm` rule (was overriding shimmer with static gradient)
- `src/app/(shop)/loading.tsx` (MODIFIED) — full rewrite: CategoryRowSkeleton + Skeleton with brand-token product cards (rounded-[22px], var(--shop-border), var(--shop-surface))
- `src/app/(shop)/cart/loading.tsx` (MODIFIED) — border-gray-100 → border-[color:var(--shop-border)]
- `src/app/(shop)/profile/addresses/loading.tsx` (MODIFIED) — border-gray-100 + no bg → brand tokens
- `src/app/(shop)/profile/reviews/loading.tsx` (MODIFIED) — border-gray-100 + no bg → brand tokens
- `src/components/product/ProductCardSkeleton.tsx` (MODIFIED) — image area: purple/green gradient removed → skeleton-warm only
- `src/components/cart/CartItemSkeleton.tsx` (MODIFIED) — border-gray-100 → border-[color:var(--shop-border)]
- `src/components/profile/ProfileHeaderSkeleton.tsx` (MODIFIED) — stat cards bg-white → bg-[color:var(--shop-surface)]
- `src/components/skeletons/ProfileSkeleton.tsx` (MODIFIED) — stat cards + section containers bg-white → bg-[color:var(--shop-surface)]
- `src/components/notifications/NotificationItemSkeleton.tsx` (MODIFIED) — text skeleton bars: added rounded-full

---

## P12-REFINEMENT: God-Tier Surgical Upgrades — 2026-03-28
- `src/components/home/TodaysFreshPicks.tsx` (MODIFIED) — Embla carousel (dragFree+trimSnaps); 'use client' added; arrow SVG gets group-hover:translate-x-1
- `src/components/home/CollectionRow.tsx` (MODIFIED) — Embla carousel replaces scrollRef+overflow-x-auto+snap; removed RowArrow component and scroll state
- `src/components/home/CategoryRow.tsx` (MODIFIED) — Embla carousel with canScrollPrev/Next API; arrow buttons wired to emblaApi; snap-start removed
- `src/components/home/YourUsualsSection.tsx` (MODIFIED) — Embla carousel replaces scrollRef; emblaApi wired to arrow buttons; snap-start removed from UsualProductCard
- `src/components/home/BestSellersShowcase.tsx` (MODIFIED) — m import added; wishlist buttons → m.button (whileTap scale 0.75 spring); scarcity bar → m.div (initial width:0 → animate stockRatio%, 1.5s easeOut)
- `src/components/home/HomePromiseBanner.tsx` (MODIFIED) — guarantee cards: hover:-translate-y-1.5 + shadow-level-5; Link → group; ArrowRight → group-hover:translate-x-1
- `src/components/home/TrustBar.tsx` (MODIFIED) — 'use client' added; m.ul+m.li stagger entrance (whileInView once:true, stagger 0.1s, y:20→0)
- `src/components/product/ProductCard.tsx` (MODIFIED) — Skeleton import; isLoaded state; image fade-in opacity-0→opacity-100; cinematic zoom 800ms cubic-bezier(0.25,1,0.5,1) scale-110; m.button Add: whileHover scale 1.02 / whileTap scale 0.92 spring
- `src/components/home/HeroLayered.tsx` (MODIFIED) — Shop Now span → m.span; passive pulse (brightness 1→1.15→1, scale 1→1.02→1), 4s infinite mirror
- `src/components/home/EditorialBannerCard.tsx` (MODIFIED) — colored gradient overlay removed; blackout gradient-to-t from-[#0A0A0A] h-[65%]
- `src/components/layout/Header.tsx` (MODIFIED) — value bar: flex justify-between → grid grid-cols-[1fr_auto_1fr]; true mathematical centering
- `src/app/(shop)/page.tsx` (MODIFIED) — TrustBar delay=100; Featured→fromRight; BestSellers→fromLeft

## P12-S03: Card Stagger & Micro-Interactions — 2026-03-28 (W09, P12 COMPLETE ✅)
- `src/app/globals.css` (MODIFIED) — .card-hover: 280ms cubic-bezier(0.22,1,0.36,1) + shadow-level-5 token; .btn-press: scale(0.97) 150ms; added .category-card-hover + .chip-hover classes; added .btn-press transition rule
- `src/components/product/ProductGrid.tsx` (MODIFIED) — cardContainer+cardItem variants (0.07s stagger); whileInView pattern; max-8 stagger cap; removed react-intersection-observer dep
- `src/components/home/HomeTrendingGrid.tsx` (MODIFIED) — first homepage card grid gets cardContainer+cardItem stagger (0.07s, max 8); 'use client' added; m.div wraps each staggered card
- `src/components/home/HeroLayered.tsx` (MODIFIED) — GROLIN watermark: static span → m.span with parallax drift (useScroll+useTransform, 25% speed, desktop only, reduced-motion safe)

## P12-S02: Section Scroll Reveals — 2026-03-28 (W08, W08 COMPLETE ✅)
- `src/app/(shop)/page.tsx` (MODIFIED) — ViewportReveal wrappers on all below-fold sections; LocalTrustSection scale+delay=100

## P12-S01: Hero Entrance Animation — 2026-03-28 (W08)
- `src/lib/motion-variants.ts` (MODIFIED) — added heroContainer, heroSubheadline, heroTrustChip; upgraded heroHeadline (spring gentle) + heroCTA (spring elastic)
- `src/components/home/HeroLayered.tsx` (MODIFIED) — stagger choreography on first slide; m.h3/m.div/m.span variants; useReducedMotion guard; removed old m.section entrance
- `src/components/layout/BottomNav.tsx` (MODIFIED) — motion → m import (pre-existing LazyMotion crash fix)

## P11-S02: ViewportReveal — 2026-03-28 (W07, P11 COMPLETE ✅)
- `src/components/shared/ViewportReveal.tsx` (CREATED) — variant-select API, useReducedMotion, once:true, polymorphic as prop

## P11-S01: Motion Variants & LazyMotion — 2026-03-28 (W07)
- `src/lib/motion-variants.ts` (MODIFIED) — added heroHeadline/heroCTA/heroImage, viewportReveal*, cardContainer/cardItem, springBounce/springGentle, bottomNavPill, panelClose

## P10-S04: Account Routes — 2026-03-28 (W06 COMPLETE)
- `src/app/(auth)/layout.tsx` — auth card: bg-white → bg-[--shop-surface]
- `src/app/(auth)/login/page.tsx` — phone input wrapper + inner input: bg-white → bg-[--shop-canvas]
- `src/app/(auth)/otp/page.tsx` — empty OTP slots: bg-white → bg-[--shop-canvas]
- `src/app/(auth)/new-user-setup/page.tsx` — both form inputs: added bg-[--shop-canvas] (were missing)
- `src/app/(shop)/orders/page.tsx` — active tab pill: bg-white → bg-[--shop-surface]
- `src/components/order/OrderCard.tsx` — "View Details" link: bg-white → bg-[--shop-surface]
- `src/components/profile/ProfileHeader.tsx` — avatar fallback + stat cards: bg-white → bg-[--shop-surface]
- `src/components/profile/ProfileMenu.tsx` — both card panels: bg-white → bg-[--shop-surface] (replace_all)
- `src/components/wallet/AddMoneySheet.tsx` — inactive quick chips: bg-white → bg-[--shop-surface]

## P10-S03: Cart & Checkout Flow — 2026-03-28
- `src/app/(shop)/checkout/page.tsx` — header + step section: bg-rgba → bg-[--shop-surface]; removed backdrop-blur; back button bg-white → bg-[--shop-surface]; eyebrow → .eyebrow class
- `src/components/cart/CartItem.tsx` — substitution chips inactive bg-white → bg-[--shop-surface]; stepper bg-white → bg-[--shop-surface]
- `src/components/cart/CartItemMobile.tsx` — substitution chips inactive bg-white → bg-[--shop-surface]; stepper bg-white → bg-[--shop-surface]
- `src/components/cart/CartSummary.tsx` — promo wrapper + price breakdown + support links: bg-white → bg-[--shop-surface]
- `src/components/cart/CartEmpty.tsx` — secondary CTA + category chips: bg-white/86 → bg-[--shop-surface]; border-white/80 → border-[--shop-border]
- `src/components/checkout/PaymentStep.tsx` — UPI badges: bg-white → bg-[--shop-surface]; UPI input + textarea: bg-white → bg-[--shop-canvas]; delivery notes container: bg-white → bg-[--shop-surface]

## P10-S02: Product Detail Page — 2026-03-28
- `src/components/product/ProductGallery.tsx` — main image bg: inline-gradient → bg-[--shop-surface]; nav arrows + zoom hint: bg-white/* → bg-[--shop-surface]/*; text-gray-500 → text-[--shop-ink-muted]
- `src/components/product/ProductInfo.tsx` — back button: hover:bg-gray-50 → hover:bg-[--shop-surface-subtle]; breadcrumb: text-gray-400 → text-[--shop-ink-faint]; unit label → .eyebrow; rating row: bg-white/80 → bg-[--shop-surface]
- `src/components/product/ProductDeliveryPanel.tsx` — store pickup + pincode container: bg-white/* → bg-[--shop-surface]; input: bg-white → bg-[--shop-canvas]
- `src/components/product/ProductDetailsSection.tsx` — all accordions: border-gray-100/bg-white → brand tokens; all text-gray-* → --shop-ink tokens; chevrons text-gray-400 → text-[--shop-ink-faint]; detail labels → .eyebrow; borders → border-[--shop-border]
- `src/components/product/ProductReviewsSection.tsx` — all border/bg/text gray-* → brand tokens; star bars: bg-gray-100 → bg-[--shop-surface-subtle]; load-more button + write review link → brand tokens
- `src/components/product/AddToCartSection.tsx` — out-of-stock: border-gray-100/bg-gray-50 → border-[--shop-border]/bg-[--shop-surface-subtle]; text-gray-500 → text-[--shop-ink-muted]

## P10-S01: Categories & Search Route — 2026-03-28
- `src/app/(shop)/categories/page.tsx` — eyebrow label: inline → .eyebrow class; count badge: bg-white/86 → bg-[--shop-surface], shadow token
- `src/app/(shop)/categories/[id]/page.tsx` — filter section: surface-elevated+border → shop-surface-soft; sort select: bg-white/90 → bg-[--shop-surface]; inactive chips: bg-white → bg-[--shop-surface]; error wrapper: inline gradient → bg-[--shop-surface]
- `src/app/(shop)/search/page.tsx` — trending category cards, sort label, filter chips, recent search chips, clear-all button: all bg-white → bg-[--shop-surface]

## P09-S03: Bottom Nav & Mobile Chrome — 2026-03-28
- `src/components/layout/BottomNav.tsx` — bg-white/95→bg-[rgba(240,236,232,0.94)]; border-t added; active pill upgraded to Framer Motion layoutId spring animation; top accent line spring-animated; inline style removed → CSS class

## P09-S02: Footer Premium Treatment — 2026-03-28
- `src/components/layout/ShopFooter.tsx` — grain-overlay added; py-0→pt-10; top 1px gradient highlight; column heading white/54→white/70; link text text-[14px]→text-[13px], white/76→white/70

## P09-S01: Header & Search Polish — 2026-03-28
- `src/components/layout/Header.tsx` — scroll state: transparent warm (#F0ECE8/72%) → glass (--shop-header-surface + shadow-level-4) on scroll; address pill bg-white→bg-[--shop-surface]; value bar help link gets header-nav-link class
- `src/components/layout/SearchBar.tsx` — container: rounded-[12px]→rounded-full; bg-[--shop-canvas] (warm bg); px-4→px-5 input padding; amber CTAs rounded-r-[11px]→rounded-r-full; focus state adds ring-2 ring-primary

## P08-S03: Product Grid & Category Cards — 2026-03-28
- `src/components/product/ProductGrid.tsx` — xl:grid-cols-4 2xl:grid-cols-5 → xl:grid-cols-5 (correct 5-col responsive)
- `src/app/(shop)/categories/page.tsx` — category cards: rounded-[24px]→rounded-[22px]; h-[132px]→h-[140px]; shadow upgraded to brand shadow-level-1/2; hover -translate-y-[4px]; name text-[15px] font-bold leading-tight; item count text-[12px] font-medium

## P08-S02: Hover & Add-to-Cart Interaction — 2026-03-28
- `src/components/product/AddToCartButton.tsx` — upgraded from raw Tailwind green-500 to brand system: gradient (#16945E→#128050); rounded-[10px]; shadow-green-glow + btn-press; focus-visible ring; stepper grid-cols-3 with bg-[--shop-action]

## P08-S01: Card Visual Surgery — 2026-03-28
- `src/components/product/ProductCard.tsx` — name: text-[14px] font-semibold lg:text-[15px] → text-[15px] font-bold

## P07-S04: Section Flow Integration — 2026-03-28
- `src/app/(shop)/page.tsx` — section vertical spacing standardized: py-6/py-5/py-4 → py-8 md:py-10 across Featured+Collections, mesh-warm, Collections 4-6, BestSellers, canvas zones

## P07-S03: Dark Editorial Section — 2026-03-28
- `src/components/home/LocalTrustSection.tsx` — dot-grid texture overlay added (z-[1] opacity-40); DarkEditorialBand.tsx NOT created (LocalTrustSection IS the dark editorial)

## P07-S02: Collection Rows — 2026-03-28
- `src/components/home/EditorialBannerCard.tsx` — min-h-[200px]→min-h-[240px]; w-[156px]→w-[164px]; emoji text-[30px]→text-[34px]; title text-[15px]→text-[16px]; CTA "See all"→"Explore" + hover transition
- `src/components/home/CollectionRow.tsx` — product slots w-[148px]→w-[156px]; subtitle font-medium

## P07-S01: Trust Strip & Post-Hero Sections — 2026-03-28
- `src/components/home/TrustBar.tsx` (NEW) — compact 4-item horizontal trust proof strip: 30 min / 100% fresh / 5000+ products / 4.8★ rating; icon + stat + label; divider-separated; overflow-x-auto mobile
- `src/components/home/EditorialBreak.tsx` (NEW) — brand voice text break: gradient-text-green headline, centered, max-w-860px, eyebrow + descriptor paragraph
- `src/app/(shop)/page.tsx` — TrustBar import + inserted after HeroLayered; EditorialBreak import + inserted after YourUsuals section

## P06-S01/S02/S03: Hero Recomposition (consolidated) — 2026-03-28
- `src/components/home/HeroLayered.tsx`:
  - S01: height clamp→min-h-[420px] md:min-h-[520px]; z-layer hierarchy (0-5); Layer 1 produce scatter + GROLIN watermark (desktop-only)
  - S02: headline clamp(26px, 5.5vw, 52px) tracking-[-0.025em]; green gradient CTA with shadow-green-glow + btn-press; trust cue "🕐 Delivery in ~30 min" glass chip; editorial eyebrow
  - S03: eyebrow hidden mobile (md:block); scatter hidden mobile (md:block); flex-wrap CTA row; thumb zone padding

## P05-S03: Grid & Spacing Rhythm — 2026-03-28
(no source files modified — audit-only, all grid/spacing targets already on-spec)

## P05-S02: PromoBand & TrustCard — 2026-03-28
- `src/components/shared/TrustCard.tsx` (NEW) — compact (pill) + full (stat card) trust signal variants
- `src/components/shared/PromoBand.tsx` (NEW) — responsive image+copy+CTA section, green/purple/warm variants

## P05-S01: SectionWrapper & SectionHeading — 2026-03-28
- `src/components/shared/SectionWrapper.tsx` (NEW) — full-width section container with bg variants, grain prop, padding variants, max-w-screen-xl inner div
- `src/components/shared/SectionHeading.tsx` (NEW) — eyebrow + title (editorial/section/page variant) + subtitle + href/onClick action

## P04-S03: Texture Application — 2026-03-28
- `src/app/(auth)/layout.tsx` — left panel: grain-overlay added; right auth card: border removed (shadow-level-3 kept)

## P04-S02: Card Elevation — 2026-03-28
- `src/components/order/OrderCard.tsx` — border removed, radius 16px→22px, shadow-level-1→shadow-level-2
- `src/components/checkout/AddressStep.tsx` — card borders removed, shadows upgraded shadow-1→shadow-2
- `src/components/checkout/OrderSummaryPanel.tsx` — border removed, shadow-level-2→shadow-level-3
- `src/components/checkout/PaymentStep.tsx` — two card panels borders removed, shadows added (shadow-level-1)
- `src/components/cart/CartSummary.tsx` — outer border removed, shadow-level-2→shadow-level-3; inner delivery card border removed, shadow added
- `src/components/cart/CartItem.tsx` — border removed, radius 16px→22px
- `src/components/cart/CartItemMobile.tsx` — inner article border removed, radius 16px→22px
- `src/components/home/BestSellersShowcase.tsx` — outer section border removed; spotlight article border removed

## P04-S01: Canvas & Section Backgrounds — 2026-03-28
(no source files modified — audit only, all targets already complete)

## P03-S03: Chrome & Utility Text — 2026-03-28
- `src/components/layout/ShopFooter.tsx` — brand h2 font-bold→font-extrabold

## P03-S02: Commerce Typography — 2026-03-28
- `src/components/cart/CartItem.tsx` — name font-semibold→font-bold; price text-sm→text-[16px] font-bold tabular-nums; subtotal font-extrabold tabular-nums tracking-[-0.03em]; discount badge font-bold tracking-[0.04em]
- `src/components/cart/CartItemMobile.tsx` — same 4 changes as CartItem
- `src/components/home/BestSellersShowcase.tsx` — side name font-bold; side discount badge font-bold tracking-[0.04em]; side price tabular-nums tracking-[-0.03em]; spotlight h4 font-extrabold tracking-[-0.025em]; spotlight price tabular-nums tracking-[-0.03em]

## P03-S01: Editorial Headline Treatment — 2026-03-28
- `src/components/shared/PageHeader.tsx` — eyebrow→.eyebrow class; h1 font-bold→font-extrabold, tracking-tight→tracking-[-0.025em]
- `src/app/(shop)/cart/page.tsx` — h1 font-bold→font-extrabold, tracking-[-0.05em]→tracking-[-0.03em]
- `src/app/(shop)/categories/[id]/page.tsx` — h1 font-bold→font-extrabold, tracking-tight→tracking-[-0.025em]
- `src/app/(shop)/not-found.tsx` — h2 font-bold→font-extrabold
- `src/app/(shop)/products/page.tsx` — h1 text-2xl→text-[28px] sm:text-[32px], font-bold→font-extrabold, added leading + tracking
- `src/app/(shop)/products/[slug]/not-found.tsx` — h2 font-bold→font-extrabold
- `src/app/(shop)/search/page.tsx` — discovery h2 text-[20px]→text-[22px], font-bold→font-extrabold, added leading + tracking
- `src/app/(auth)/layout.tsx` — h1 font-bold→font-extrabold, tracking-tight→tracking-[-0.025em]
- `src/app/(auth)/login/page.tsx` — h1 font-bold→font-extrabold
- `src/app/(auth)/new-user-setup/page.tsx` — h1 font-bold→font-extrabold
- `src/app/(auth)/otp/page.tsx` — h1 font-bold→font-extrabold
