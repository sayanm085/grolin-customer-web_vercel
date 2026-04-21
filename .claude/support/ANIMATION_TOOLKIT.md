---
project: grolin
role: support
---
# ANIMATION TOOLKIT

> Complete motion reference for the Grolin frontend. Use this alongside MOTION_PRINCIPLES.md.
> Skills sourced from: ui-ux-pro-max §7 Animation, Framer Motion best practices, GSAP ScrollTrigger patterns.

---

## 1. Spring Physics Recipes

| Recipe | stiffness | damping | mass | Feel | Use Case |
|--------|-----------|---------|------|------|----------|
| `snappy` | 300 | 22 | 0.8 | Fast, decisive | Bottom nav pill, tab indicator |
| `bounce` | 220 | 18 | 1.0 | Playful pop | Badges, floating accents, scale-in |
| `gentle` | 120 | 24 | 1.2 | Smooth, confident | Section reveals, viewport entry |
| `elastic` | 180 | 12 | 1.0 | Springy overshoot | CTA button entrance, hero badge |
| `heavy` | 80 | 28 | 1.5 | Weighty, deliberate | Modal/sheet entry, drawer open |
| `micro` | 400 | 30 | 0.5 | Instant feel | Toggle, switch, counter morph |

### Spring Code Patterns

```typescript
// motion-variants.ts — import these everywhere
export const springs = {
  snappy: { type: 'spring', stiffness: 300, damping: 22, mass: 0.8 },
  bounce: { type: 'spring', stiffness: 220, damping: 18, mass: 1.0 },
  gentle: { type: 'spring', stiffness: 120, damping: 24, mass: 1.2 },
  elastic: { type: 'spring', stiffness: 180, damping: 12, mass: 1.0 },
  heavy: { type: 'spring', stiffness: 80, damping: 28, mass: 1.5 },
  micro: { type: 'spring', stiffness: 400, damping: 30, mass: 0.5 },
} as const
```

---

## 2. Hero Entrance Choreography

### Timeline (0ms → 900ms)

```
0ms     Background mesh visible (no animation — stability anchor)
0-300ms Headline staggers in (opacity 0→1, y 20→0, spring gentle)
100-400ms Subheadline fades in (opacity 0→1, y 10→0)
200-500ms CTA button (opacity 0→1, scale 0.92→1, spring elastic)
400-700ms Trust chip (opacity 0→1, y 12→0, spring bounce)
500-800ms Floating accents (scale 0→1, spring bounce) — DESKTOP ONLY
600-900ms Hero image (scale 0.96→1, opacity 0→1, spring gentle)
```

### Code Pattern

```tsx
<m.div variants={heroContainer} initial="hidden" animate="visible">
  <m.h1 variants={heroHeadline}>...</m.h1>         {/* stagger child */}
  <m.p  variants={heroSubheadline}>...</m.p>        {/* stagger child */}
  <m.div variants={heroCTA}>                         {/* spring elastic */}
    <Button>Shop Now</Button>
  </m.div>
</m.div>
```

### Rules
- Header stays STATIC (stability anchor — NEVER animate)
- Hero entrance fires ONCE on page load
- After entrance completes: hero is STILL — zero continuous motion
- Mobile: skip floating accents, simplify to fade+slide only
- `prefers-reduced-motion`: show all elements immediately, no animation

---

## 3. Viewport Reveal Patterns

### Section Reveal (below-fold content)

```tsx
<ViewportReveal variant="default" margin="-80px 0px">
  <SectionWrapper>
    <SectionHeading ... />
    {/* content */}
  </SectionWrapper>
</ViewportReveal>
```

### Rules (from ui-ux-pro-max §7)
- `once: true` — NEVER re-trigger on scroll back
- Spring gentle (stiffness:120, damping:24, mass:1.2)
- Animate ONLY `opacity` + `transform` (translateY)
- Default translateY: 24px → 0px (subtle, not dramatic)
- IntersectionObserver margin: `-80px 0px` (fire 80px before entering viewport)
- Exit animations are 60-70% of enter duration (ui-ux-pro-max: `exit-faster-than-enter`)

### Stagger Pattern (card grids)

```tsx
// ONLY first visible card set gets stagger
<m.div variants={cardContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {cards.slice(0, visibleCount).map((card, i) => (
    <m.div key={card.id} variants={cardItem}>{/* card */}</m.div>
  ))}
</m.div>

// cardContainer: { visible: { transition: { staggerChildren: 0.07 } } }
// cardItem: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
```

### Stagger Timing Rules
- 0.07s per child for product cards (max 8 children)
- 0.08s per child for collection cards (max 6)
- 0.05s per child for list items (max 10)
- NEVER stagger more than one grid per viewport height
- Second/third grids: render immediately, no stagger

---

## 4. Micro-Interaction Library

### Button Press

```css
.btn-press {
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}
.btn-press:active {
  transform: scale(0.97);
  box-shadow: var(--shadow-1);
}
```

### Card Hover (Desktop)

```css
.card-hover {
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-5);
}
```

### Chip/Badge Tap

```css
.chip-tap {
  transition: transform 120ms ease-out, background-color 120ms ease-out;
}
.chip-tap:active {
  transform: scale(0.95);
}
```

### Counter Morph (quantity +/-)

```tsx
<AnimatePresence mode="popLayout">
  <m.span
    key={count}
    initial={{ opacity: 0, y: direction > 0 ? -8 : 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: direction > 0 ? 8 : -8 }}
    transition={{ duration: 0.15 }}
  >
    {count}
  </m.span>
</AnimatePresence>
```

### Toggle Switch

```tsx
<m.div
  className="toggle-track"
  animate={{ backgroundColor: isOn ? 'var(--shop-primary)' : 'var(--shop-border)' }}
>
  <m.div
    className="toggle-thumb"
    animate={{ x: isOn ? 20 : 0 }}
    transition={springs.micro}
  />
</m.div>
```

---

## 5. Scroll-Linked Animations

### Parallax Drift (max 2-3 surfaces)

```tsx
const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], [0, -80])

<m.div style={{ y }} className="parallax-element">
  {/* Watermark or decorative element */}
</m.div>
```

### Allowed Parallax Surfaces
1. GROLIN watermark in hero → drifts up at 25% scroll speed
2. Decorative produce scatter → drifts at 15% scroll speed
3. (Optional) Dark editorial text → subtle 10% drift

### BANNED
- No parallax on content text
- No parallax on cards or interactive elements
- No parallax on mobile (performance)
- No continuous rotation or scale on scroll

---

## 6. CSS Animation Keyframes

### Warm Shimmer (skeletons)

```css
@keyframes shimmer-warm {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-warm {
  background: linear-gradient(90deg,
    var(--shop-surface-subtle) 25%,
    #F5F1EC 50%,
    var(--shop-surface-subtle) 75%
  );
  background-size: 200% 100%;
  animation: shimmer-warm 1.5s linear infinite;
}
```

### Float Slow (desktop decorative ONLY)

```css
@keyframes float-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
.float-slow {
  animation: float-slow 4s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .float-slow { animation: none; }
}
```

### Gradient Shift (hero mesh background)

```css
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.mesh-gradient-animated {
  background-size: 200% 200%;
  animation: gradient-shift 12s ease infinite;
}
@media (prefers-reduced-motion: reduce) {
  .mesh-gradient-animated { animation: none; }
}
```

---

## 7. Performance Guards

### Hard Rules
- Animate ONLY `transform` + `opacity` (GPU-composited properties)
- NEVER animate `width`, `height`, `top`, `left`, `padding`, `margin`, `border-width`
- Keep per-frame work under ~16ms for 60fps
- Maximum 3 concurrent animations on screen at any time
- `will-change: transform` ONLY on continuously animated elements (not one-shot reveals)
- `contain: layout` or `contain: paint` on animated containers where possible

### IntersectionObserver Configuration
- Use `rootMargin: '-80px 0px'` as default threshold
- `threshold: 0` (any pixel visible = trigger)
- `once: true` — ALWAYS for viewport reveals

### LazyMotion Rules
- Use `domAnimation` (NOT `domMax`) — saves ~15KB
- Use `m.div` instead of `motion.div` for tree-shaking
- Import variants from `@/lib/motion-variants` — never inline variant objects

### Bundle Safety
- Framer Motion: tree-shake with `m` components
- Do NOT import `AnimatePresence` unless needed for exit animations
- Do NOT import `useAnimation` unless needed for imperative control
- Prefer `whileInView` over manual `useInView` + `animate` pattern

### Mobile Performance
- Disable parallax on mobile (check `window.innerWidth < 768`)
- Reduce stagger counts on mobile (half the desktop stagger)
- Skip floating decorative animations entirely on mobile
- Test scroll performance at 60fps on throttled 4x CPU

---

## 8. Easing Reference

| Name | CSS | Use |
|------|-----|-----|
| ease-out | `cubic-bezier(0.22, 1, 0.36, 1)` | Elements entering view |
| ease-in | `cubic-bezier(0.55, 0, 1, 0.45)` | Elements leaving view |
| ease-in-out | `cubic-bezier(0.65, 0, 0.35, 1)` | Looping, continuous |
| spring | Use Framer spring() | Primary motion feel |
| linear | `linear` | Shimmer, progress bars ONLY |

### Rule: ease-out for entering, ease-in for exiting (ui-ux-pro-max §7)

---

## 9. AnimatePresence Patterns

### Page/Route Transitions (NOT recommended for Grolin)
- Grolin uses Next.js App Router — route transitions are NOT animated
- Content swaps happen instantly — this is intentional for commerce speed

### Component State Transitions (USE)

```tsx
// Cart item removal
<AnimatePresence mode="popLayout">
  {items.map(item => (
    <m.div
      key={item.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
    >
      <CartItem item={item} />
    </m.div>
  ))}
</AnimatePresence>
```

---

## 10. Reduced Motion Compliance

```tsx
// Hook usage in components
import { useReducedMotion } from 'framer-motion'

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <m.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : springs.gentle}
    >
      {children}
    </m.div>
  )
}
```

### CSS Global Rule (already in globals.css)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

*Animation Toolkit for the Grolin frontend transformation. Referenced by P12, P13, P14 sessions.*
