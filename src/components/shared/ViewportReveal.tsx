'use client'
import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import {
  viewportReveal,
  viewportRevealFromLeft,
  viewportRevealFromRight,
  springGentle,
} from '@/lib/motion-variants'
import type { Variants, UseInViewOptions } from 'framer-motion'

const variantMap = {
  default:   viewportReveal,
  fromLeft:  viewportRevealFromLeft,
  fromRight: viewportRevealFromRight,
  scale:     springGentle,
}

// Reduced-motion override — shows immediately, no translation or scale
const reducedVariant: Variants = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1 },
}

interface ViewportRevealProps {
  children: React.ReactNode
  variant?: keyof typeof variantMap
  /** Delay in milliseconds — for manual staggering */
  delay?: number
  /** IntersectionObserver root margin (default: '-80px 0px') */
  margin?: string
  className?: string
  as?: 'div' | 'section' | 'article'
}

export function ViewportReveal({
  children,
  variant = 'default',
  delay = 0,
  margin = '-40px 0px',
  className,
  as: Tag = 'div',
}: ViewportRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: margin as UseInViewOptions['margin'] })
  const prefersReduced = useReducedMotion()

  const baseVariants = prefersReduced ? reducedVariant : variantMap[variant]

  const resolvedVariants: Variants =
    delay > 0 && !prefersReduced
      ? {
          ...baseVariants,
          visible: {
            ...(baseVariants.visible as Record<string, unknown>),
            transition: {
              ...((baseVariants.visible as { transition?: object })?.transition ?? {}),
              delay: delay / 1000,
            },
          },
        }
      : baseVariants

  // Casting necessary because m accepts string polymorphic `as`
  const MotionTag = m[Tag] as typeof m.div

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={resolvedVariants}
      className={className}
      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
    >
      {children}
    </MotionTag>
  )
}
