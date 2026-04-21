'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types/product.types'

/* ════════════════════════ CINEMATIC FEATURE GRID  ═══════════════ */

function LiveDealBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6E49D8]/10 via-[#A78BFA]/10 to-[#6E49D8]/10 border border-[color:var(--shop-primary)]/15 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[color:var(--shop-primary)] shadow-[0_4px_16px_rgba(110,73,216,0.08)]">
      <Zap className="h-3 w-3" />
      Live Deals
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
      </span>
    </span>
  )
}

export function HomeFeatureGrid({
  products,
  title = 'Featured Premium Groceries',
  subtitle = 'Refined staples and high-conviction picks designed to lead the storefront.',
}: {
  products: Product[]
  title?: string
  subtitle?: string
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()

  if (products.length === 0) return null

  return (
    <section ref={sectionRef} className="relative px-3 home-section-spacing sm:px-4 lg:px-6">
      {/* Cinematic section header with live deal badge */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between lg:mb-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <LiveDealBadge />
          </div>
          <h2 className="text-[26px] sm:text-[30px] lg:text-[36px] font-black tracking-[-0.03em] leading-[1.1] text-[color:var(--shop-ink)]">
            {title.split(' ').map((word, i) => (
              i === 0 ? (
                <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E49D8] to-[#9B6DFF]">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            ))}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[color:var(--shop-ink-muted)] max-w-lg font-medium leading-[1.6]">
            {subtitle}
          </p>
        </div>
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--shop-primary)] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_24px_rgba(110,73,216,0.25)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(110,73,216,0.35)] hover:scale-[1.02] sm:self-end"
        >
          See All Deals
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Staggered product grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product, index) => (
          <m.div
            key={product.id}
            initial={prefersReduced ? false : { opacity: 0, y: 24, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              type: 'spring',
              stiffness: 160,
              damping: 20,
              delay: Math.min(index * 0.04, 0.4),
            }}
          >
            <ProductCard product={product} priority={index < 4} />
          </m.div>
        ))}
      </div>
    </section>
  )
}

export function HomeFeatureGridSkeleton() {
  return (
    <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
      <div className="mb-4 lg:mb-5">
        <div className="mb-3 h-6 w-24 rounded-full skeleton-shimmer" />
        <div className="mb-2 h-10 w-64 rounded skeleton-shimmer" />
        <div className="h-5 w-96 rounded skeleton-shimmer" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="rounded-[24px]">
            <div className="h-[320px] rounded-[24px] skeleton-shimmer" />
          </div>
        ))}
      </div>
    </section>
  )
}
