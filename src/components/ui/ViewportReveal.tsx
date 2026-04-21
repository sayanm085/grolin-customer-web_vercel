'use client'
import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { fadeUp } from '@/lib/motion-variants'

interface ViewportRevealProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  /** Delay in milliseconds — for manual staggering when not using staggerContainer */
  delay?: number
}

export function ViewportReveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
}: ViewportRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-48px 0px' })

  const resolvedVariants: Variants =
    delay > 0
      ? {
          ...variants,
          visible: {
            ...(variants.visible as Record<string, unknown>),
            transition: {
              ...((variants.visible as { transition?: object })?.transition ?? {}),
              delay: delay / 1000,
            },
          },
        }
      : variants

  return (
    <m.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={resolvedVariants}
      className={className}
    >
      {children}
    </m.div>
  )
}
