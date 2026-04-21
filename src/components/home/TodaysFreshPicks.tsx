'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'
import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product.types'

// Receives data from page.tsx — no data fetching here.
// Caller passes: products={filteredNewArrivals} isLoading={shouldShowFeaturedSkeleton}

interface TodaysFreshPicksProps {
  products: Product[]
  isLoading?: boolean
}

/**
 * Today's Fresh Picks — Cinematic Apple-style marquee showcase
 *
 * V2 Upgrade:
 * - Glassmorphic showcase frame with animated border glow
 * - Floating ambient light orbs for atmospheric depth
 * - Mesh-purple-warm background with grain overlay
 * - Frosted pill badge header + animated gradient text
 * - Glowing edge fades with purple/green depth
 * - Top shimmer accent line for visual separation
 * - Slower marquee for premium unhurried feel
 */
export function TodaysFreshPicks({ products, isLoading = false }: TodaysFreshPicksProps) {
  const visibleProducts = products.slice(0, 8)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()

  if (!isLoading && visibleProducts.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-4 md:py-5"
      aria-label="Today's Fresh Picks"
    >
      <div className="relative z-[2] px-3 sm:px-4 lg:px-6">
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex flex-col gap-1.5">
            <m.span
              initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DDE3EA] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#2D3748]"
            >
              <Sparkles className="h-3 w-3 text-[#16945E]" strokeWidth={2.2} />
              Fresh today
            </m.span>

            <h2 className="text-[26px] font-black leading-[1.08] tracking-[-0.03em] text-[#18212B] sm:text-[30px] lg:text-[34px]">
              Today&apos;s Fresh Picks
            </h2>

            <p className="max-w-[560px] text-[13px] font-medium leading-6 text-[#667085] sm:text-[14px]">
              Hand-picked new arrivals and repeat-order favourites, arranged for quick browsing.
            </p>
          </div>

          <div className="flex items-center">
            <Link
              href="/products?sort=new"
              className="group inline-flex items-center gap-2 rounded-full border border-[#D7DEE8] bg-white px-4 py-2 text-[12px] font-semibold text-[#18212B] transition-colors duration-200 hover:border-[#BFC9D6] hover:bg-[#F8FAFC]"
              aria-label="See all new arrivals"
            >
              Browse all
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </m.div>

        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 10, scale: 0.99 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="overflow-hidden rounded-[24px] border border-[#E5EAF1] bg-white px-2 py-2 sm:px-3 sm:py-3"
        >
          <div className="relative">
            <Marquee
              pauseOnHover
              className={cn(
                'py-1 [--duration:55s] [--gap:0.875rem]',
                'md:[--gap:1rem]',
              )}
            >
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      className="flex-shrink-0 w-[168px] sm:w-[180px]"
                    >
                      <ProductCardSkeleton />
                    </div>
                  ))
                : visibleProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-[168px] sm:w-[180px]"
                    >
                      <ProductCard
                        product={product}
                        showNewBadge
                        priority={false}
                      />
                    </div>
                  ))}
            </Marquee>
          </div>
        </m.div>
      </div>
    </section>
  )
}
