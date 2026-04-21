'use client'

import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types/product.types'
import { EditorialBannerCard } from './EditorialBannerCard'

interface CollectionRowProps {
  title: string
  eyebrow: string
  emoji: string
  subtitle?: string
  gradient: string
  products: Product[]
  viewAllHref: string
  image?: string
}

export function CollectionRow({
  title,
  eyebrow,
  emoji,
  subtitle,
  gradient,
  products,
  viewAllHref,
  image,
}: CollectionRowProps) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' })

  return (
    <section className="mt-6 px-2 sm:px-3 lg:px-4">
      <div className="reveal-on-scroll mb-3 flex items-end justify-between gap-4 px-0 sm:px-0">
        <div className="flex items-start gap-3">
          <span className="mt-1 hidden h-8 w-[2px] rounded-full bg-[color:var(--shop-primary)] sm:block" />
          <div className="space-y-1">
            <span className="eyebrow mb-0.5">
              {eyebrow}
            </span>
            <h2 className="section-heading">
              {title}
            </h2>
            {subtitle ? (
              <p className="max-w-[560px] text-[13px] font-medium leading-6 text-[color:var(--shop-ink-muted)]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <Link
          href={viewAllHref}
          className="hidden shrink-0 items-center gap-1 text-[13px] font-semibold text-[color:var(--shop-primary)] transition-colors duration-200 hover:text-[color:var(--shop-primary-hover)] sm:inline-flex"
        >
          <span>See all</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-hidden px-0 pb-0.5 pt-0.5 fade-edge-mask" ref={emblaRef}>
        <div className="flex select-none touch-pan-y items-stretch gap-4 pb-1 lg:gap-5">
          <EditorialBannerCard title={title} eyebrow={eyebrow} emoji={emoji} gradient={gradient} href={viewAllHref} image={image} />

          {products.map((product, index) => (
            <div key={product.id} className="w-[148px] shrink-0 self-stretch sm:w-[152px] lg:w-[156px]">
              <ProductCard product={product} priority={index < 2} variant="section" />
            </div>
          ))}

          <Link
            href={viewAllHref}
            className="flex min-h-[200px] w-[64px] shrink-0 flex-col items-center justify-center gap-2 self-stretch rounded-[22px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)] shadow-[var(--shop-shadow-level-1)] transition-all duration-200 hover:shadow-[var(--shop-shadow-level-2)] hover:bg-[color:var(--shop-surface-elevated)]"
            aria-label={`See more in ${title}`}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="text-[11px] font-medium">More</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
