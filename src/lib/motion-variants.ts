import type { Variants } from 'framer-motion'

// ── GROLIN ANIMATION SYSTEM ─────────────────────────────────────
// Micro feedback (tap/hover):     120–180ms  ease-out
// State change (button/toggle):   250–320ms  [0.25, 0.46, 0.45, 0.94]
// Spring entry (morph/bounce):    stiffness:220 damping:18
// Viewport reveal:                stiffness:120 damping:24 mass:1.2
// Panel open  (drawer/modal):     320–380ms  [0.0,  0.0,  0.2,   1]
// Panel close:                    250ms      [0.4,  0.0,  1,     1]
// Card stagger:                   0.07–0.12s per child

const ease = {
  standard: [0.25, 0.46, 0.45, 0.94] as const,
  spring:   [0.34, 1.56, 0.64,  1  ] as const,
  enter:    [0.0,  0.0,  0.2,   1  ] as const,
  exit:     [0.4,  0.0,  1,     1  ] as const,
}

// ── HERO ENTRANCE ─────────────────────────────────────────────
// Page-load choreography: hero staggers 0→900ms
// heroContainer orchestrates all children via staggerChildren

export const heroContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

export const heroHeadline: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 24,
      mass: 1.2,
    },
  },
}

export const heroSubheadline: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 24,
      mass: 1.2,
    },
  },
}

export const heroCTA: Variants = {
  hidden:  { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 12,
      mass: 1.0,
    },
  },
}

export const heroTrustChip: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 18,
      mass: 1.0,
    },
  },
}

export const heroImage: Variants = {
  hidden:  { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.standard, delay: 0.1 },
  },
}

// ── VIEWPORT REVEAL ───────────────────────────────────────────
// Fires once on scroll entry (use with once: true)

export const viewportReveal: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const viewportRevealFromLeft: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const viewportRevealFromRight: Variants = {
  hidden:  { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// ── SCROLL REVEAL (ease-based aliases) ────────────────────────
// Section headings and general scroll reveals

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.standard },
  },
}

export const eyebrowReveal: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease.standard },
  },
}

// ── CARD STAGGER ──────────────────────────────────────────────
// cardContainer wraps the grid; cardItem is each grid child

export const cardContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

export const cardItem: Variants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: ease.standard },
  },
}

// Aliases used by existing components (do not remove)
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
}

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: ease.standard },
  },
}

// ── SPRING ENTRIES ────────────────────────────────────────────
// springBounce — floating cards, badges, icons with energy
export const springBounce: Variants = {
  hidden:  { opacity: 0, scale: 0.85, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 18,
    },
  },
}

// springGentle — section content, stat blocks, calm entries
export const springGentle: Variants = {
  hidden:  { opacity: 0, scale: 0.98, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Card reveal — spring feel for product cards and stat cards
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.spring },
  },
}

// Spring pop — check circles, badges, success states
export const springPop: Variants = {
  hidden:  { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 22, delay: 0.1 },
  },
}

// ── DIRECTIONAL SLIDES ────────────────────────────────────────

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: ease.standard },
  },
}

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: ease.standard },
  },
}

// ── PANELS ────────────────────────────────────────────────────
// panelOpen — modals, dropdowns, order summary
export const panelOpen: Variants = {
  hidden:  { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: ease.enter },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.25, ease: ease.exit },
  },
}

// panelClose — explicit exit for panels that use exit separately
export const panelClose: Variants = {
  hidden:  { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: ease.enter },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    transition: { duration: 0.22, ease: ease.exit },
  },
}

// ── BOTTOM NAV PILL ───────────────────────────────────────────
// Spring-animated active indicator pill (layoutId based)
export const bottomNavPill: Variants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 22,
    },
  },
}
