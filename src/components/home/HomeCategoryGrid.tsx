'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package2 } from 'lucide-react'
import { getCategoryImageSrc } from '@/lib/media'
import { HomeSectionHeader } from './HomeSectionHeader'
import type { Category } from '@/types/product.types'

function CategoryGridMedia({ category, priority }: { category: Category; priority: boolean }) {
  const [imageFailed, setImageFailed] = useState(false)
  const imageSrc = getCategoryImageSrc(category)
  const showImage = Boolean(imageSrc) && !imageFailed

  useEffect(() => {
    setImageFailed(false)
  }, [imageSrc])

  return showImage ? (
    <Image
      src={imageSrc!}
      alt={category.name}
      fill
      priority={priority}
      unoptimized
      onError={() => setImageFailed(true)}
      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
    />
  ) : (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] text-[color:var(--shop-primary)] shadow-[var(--shop-shadow-level-1)]">
        <Package2 className="h-7 w-7" />
      </span>
    </span>
  )
}

export function HomeCategoryGrid({ categories }: { categories: Category[] }) {
  if (categories.length < 3) return null

  return (
    <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
      <HomeSectionHeader
        title="Explore More Aisles"
        subtitle="A deeper browse section for the categories shoppers use after the quick-nav."
        viewAllHref="/categories"
        eyebrow="Browse"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group overflow-hidden rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] shadow-[var(--shop-shadow-level-1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shop-shadow-level-2)]"
          >
            <div
              className="relative aspect-[1.08/1] overflow-hidden border-b border-[color:var(--shop-border)]"
              style={{ backgroundImage: 'var(--shop-gradient-promo)' }}
            >
              <CategoryGridMedia category={category} priority={index < 6} />
            </div>

            <div className="flex flex-1 flex-col justify-between px-4 pb-4 pt-3">
              <h3 className="line-clamp-2 text-[16px] font-semibold leading-[1.25] tracking-tight text-[color:var(--shop-ink)] sm:text-[17px]">
                {category.name}
              </h3>
              <p className="mt-2 text-[12px] font-medium text-[color:var(--shop-ink-muted)]">
                {category.product_count}+ products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function HomeCategoryGridSkeleton() {
  return (
    <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
      <div className="mb-5 h-12 w-72 rounded skeleton-shimmer" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-[22px]">
            <div className="aspect-[1.08/1] skeleton-shimmer" />
            <div className="mt-3 h-5 w-3/4 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    </section>
  )
}
