# P12 Refinement: Surgical Motion & UI Upgrades

> **CLAUDE CODE INSTRUCTIONS**
> You are executing the final, highly optimized, surgical refinement of Phase 12. 
> Do not rewrite entire components or alter existing data logic. Only inject the specific UX/UI physics upgrades below. 
> Run `npx tsc --noEmit` after all changes are made.

## FILES IN SCOPE
```
MODIFY:
  src/app/(shop)/page.tsx
  src/components/home/TodaysFreshPicks.tsx
  src/components/home/YourUsualsSection.tsx
  src/components/home/CategoryRow.tsx
  src/components/home/CollectionRow.tsx
  src/components/home/BestSellersShowcase.tsx
  src/components/home/HomePromiseBanner.tsx
  src/components/home/TrustBar.tsx
  src/components/product/ProductCard.tsx
  src/components/home/HeroLayered.tsx
  src/components/home/EditorialBannerCard.tsx
  src/components/layout/Header.tsx
```

## THE UPGRADES (100K-Tier Polish)

### 1. Unified Embla Physics Engine (Global Horizons)
Native `overflow-x-auto` or raw `framer-motion` drags fail to provide perfect snapping momentum on premium mobile apps. Since `embla-carousel-react` is already used flawlessly in `HeroLayered.tsx`, it must be the standard for **all** horizontal rows.
1. Target `src/components/home/TodaysFreshPicks.tsx`, `src/components/home/YourUsualsSection.tsx`, `src/components/home/CategoryRow.tsx`, and `src/components/home/CollectionRow.tsx`.
2. Import `useEmblaCarousel` from `embla-carousel-react`.
3. Initialize `const [emblaRef] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' })`.
4. Wrap the scrollable container: `<div className="overflow-hidden" ref={emblaRef}><div className="flex select-none touch-pan-y">{/* items map */}</div></div>`.
5. Remove any `scrollbar-hide`, `overflow-x-auto`, `scrollSnapType` hacks, or `snap-x` classes from those components. Let Embla handle 100% of the drag physics.

### 2. Wishlist Heart Micro-Interaction (BestSellersShowcase.tsx)
The current wishlist heart merely toggles a state statically.
1. Open `src/components/home/BestSellersShowcase.tsx`.
2. Ensure you `import { m } from 'framer-motion'`.
3. Wrap both instances of the `button` for the Wishlist heart (both in `renderSideItem` and the Spotlight card) with `<m.button>`.
4. Add `whileTap={{ scale: 0.75 }}`.
5. Add `transition={{ type: "spring", stiffness: 500, damping: 12 }}`. This causes the heart to "thump" physically when liked.

### 3. Animated Scarcity Progress Bars (BestSellersShowcase.tsx)
The "Running low" stock bar is currently a static CSS width string.
1. In `src/components/home/BestSellersShowcase.tsx`, locate the `<div className="h-full rounded-full" style={{ width: \`${stockRatio}%\`...` stock indicator.
2. Change the fill `div` to an `<m.div>`.
3. Move the `width` property into Framer Motion: `initial={{ width: 0 }} animate={{ width: \`${stockRatio}%\` }}`.
4. Add `transition={{ duration: 1.5, ease: "easeOut" }}` so the bar physically fills up when the user sees it.

### 4. Interactive Guarantee Lift (HomePromiseBanner.tsx & TodaysFreshPicks.tsx)
Cards should respond to the user's presence.
1. In `src/components/home/HomePromiseBanner.tsx`, find the `.map()` generating the right-side Guarantee description cards (`<div className="rounded-[16px]...`).
2. Add the Tailwind classes: `transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shop-shadow-level-5)]`.
3. Find the `Link` for "See our promise". The Arrow on the link needs animation. Use `group` on the block and `transition-transform duration-300 group-hover:translate-x-1` on the `<ArrowRight />` inside it.
4. Apply this exact same Arrow hover animation (`group-hover:translate-x-1`) to the "See all" `<svg>` in `src/components/home/TodaysFreshPicks.tsx`.

### 5. Staggered Trust Bar Entrance (TrustBar.tsx)
The four trust stats load simultaneously and rigidly.
1. Open `src/components/home/TrustBar.tsx`.
2. Convert the `<ul>` to an `<m.ul>` using `viewport={{ once: true, margin: '-50px 0px' }}` and staggered container variants (stagger children by `0.1s`).
3. Convert each `<li>` to an `<m.li>` and give it a variant that slides up from `y: 20` and `opacity: 0` to `y: 0`.

### 6. Cinematic Image Zoom (ProductCard.tsx)
The current hover scale is a standard React pop. Make it feel expensive and editorial.
1. In `src/components/product/ProductCard.tsx`, locate the `<Image />` component.
2. Ensure the wrapper `div` has `group` and `overflow-hidden`.
3. Change the `<Image />` transition classes: replace standard duration with `transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110`. 

### 7. High-Delight Tactile "Add" Button (ProductCard.tsx)
1. Open `src/components/product/ProductCard.tsx`.
2. Wrap the `button` element for the "Add" (green ShoppingCart button) with `<m.button>`.
3. Add `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.92 }}`.
4. Add a transition property: `transition={{ type: "spring", stiffness: 450, damping: 15 }}`. 

### 8. Passive Hero Attraction Loop (HeroLayered.tsx)
The Hero CTA "Shop Now" should draw the eye continuously without needing interaction.
1. Target the "Shop Now" `<span>` element inside `src/components/home/HeroLayered.tsx` (the button inside the `m.div` with the `heroCTA` variant).
2. Change the `<span>` to `<m.span>`.
3. Add an infinite pulsing animation using Framer Motion logic: `animate={{ filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"], scale: [1, 1.02, 1] }}`.
4. Configure `transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}`.

### 9. Skeleton Fallbacks for Purple Imagery (Global)
The fallback to the lock icon `getProductImageSrc` is jarring when images load slowly.
1. Open `src/components/product/ProductCard.tsx`.
2. Add standard Next.js `<Image>` `onLoad` handling using `const [isLoaded, setIsLoaded] = useState(false)`.
3. While `!isLoaded`, render a shadcn `<Skeleton className="absolute inset-0 z-10 rounded-[22px]" />` perfectly over the image frame.
4. Ensure the actual `<Image>` component fades in softly with `transition-opacity duration-300` tied to `isLoaded`.

### 10. Pure Blackout Editorial Gradients (EditorialBannerCard.tsx)
The heavy colored gradient covers the premium photography.
1. Open `src/components/home/EditorialBannerCard.tsx`.
2. Locate the gradient overlay: `<div className="absolute inset-0 opacity-70" style={{ backgroundImage: gradient }} />`.
3. Remove that `div`. Replace it with: `<div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#0A0A0A] via-[rgba(10,10,10,0.6)] to-transparent pointer-events-none" />`.
4. Ignore the `gradient` prop for the image overlay.

### 11. Header Mathematical Centering (Header.tsx)
The promotional text in the top strip ("FREE delivery...") goes off-center due to flexbox constraints.
1. Open `src/components/layout/Header.tsx`.
2. Locate the `SHOPFRONT_VALUE_BAR` section at the bottom of the component.
3. Change the layout of that top bar wrapper from `flex items-center justify-between` to `grid grid-cols-[1fr_auto_1fr] items-center`.
4. Leave the first grid cell empty: `<div></div>`.
5. Ensure the promotional message sits centrally in the middle cell: `<div className="text-center truncate px-2">{SHOPFRONT_VALUE_BAR.message}</div>`.
6. Ensure the right-hand column perfectly sits right inside the third cell: `<div className="flex items-center justify-end gap-4">{...locale/help...}</div>`.
7. Wrap this block in `hidden md:grid` so smaller viewports gracefully fall back to single-column flex flexbox.

### 12. Differentiated Section Reveals (page.tsx)
Currently, `<ViewportReveal>` components use `variant="default"`. Change the props in `src/app/(shop)/page.tsx` for a cinematic entrance:
- **TrustBar**: Keep `variant="default"`, but set `delay={100}`
- **CategoryDiscovery**: Keep `variant="fromLeft"`.
- **Featured Deals (HomeFeatureGrid)**: Change to `variant="fromRight"`
- **LocalTrustSection**: Keep `variant="scale"`.
- **Best Sellers**: Change to `variant="fromLeft"`

---
**Execution Conclusion**: 
These 12 changes convert a standard React layout into a $100K-tier native-feeling experience. Apply them precisely to each file without damaging existing layout properties. Do not rewrite components wholesale—inject these mechanical upgrades surgically. Run `npx tsc --noEmit` locally during execution.
