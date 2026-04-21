'use client'

import { Children, type ReactNode } from 'react'
import { m } from 'framer-motion'
import { cardContainer, cardItem } from '@/lib/motion-variants'
import { ProductCardSkeleton } from './ProductCardSkeleton'

interface ProductGridProps {
  children: ReactNode
}

interface ProductGridSkeletonProps {
  count?: number
  variant?: 'default' | 'section'
}

// Max 8 items stagger — subsequent items render immediately
const STAGGER_MAX = 8

export function ProductGrid({ children }: ProductGridProps) {
  const items = Children.toArray(children)

  return (
    <m.div
      variants={cardContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px' }}
      className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5"
    >
      {items.map((child, index) =>
        index < STAGGER_MAX ? (
          <m.div key={index} variants={cardItem} className="h-full">
            {child}
          </m.div>
        ) : (
          <div key={index} className="h-full">
            {child}
          </div>
        ),
      )}
    </m.div>
  )
}

export function ProductGridSkeleton({ count = 10, variant = 'default' }: ProductGridSkeletonProps) {
  return (
    <ProductGrid>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} variant={variant} />
      ))}
    </ProductGrid>
  )
}
