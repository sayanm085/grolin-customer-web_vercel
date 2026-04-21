'use client'

import { m } from 'framer-motion'
import { cardContainer, cardItem } from '@/lib/motion-variants'
import { HomeSectionHeader } from './HomeSectionHeader'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types/product.types'

// Max 8 items stagger (ANIMATION_TOOLKIT §3)
const STAGGER_MAX = 8

export function HomeTrendingGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
      <HomeSectionHeader
        title="What Others Are Buying"
        subtitle="Live demand signals from the products customers are adding fastest."
        viewAllHref="/products"
        eyebrow="Trending"
      />

      <m.div
        variants={cardContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px 0px' }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
      >
        {products.map((product, index) =>
          index < STAGGER_MAX ? (
            <m.div key={product.id} variants={cardItem}>
              <ProductCard product={product} priority={index < 4} />
            </m.div>
          ) : (
            <div key={product.id}>
              <ProductCard product={product} priority={false} />
            </div>
          ),
        )}
      </m.div>
    </section>
  )
}