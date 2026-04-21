import { cn } from '@/lib/utils'

interface ProductCardSkeletonProps {
  variant?: 'default' | 'section'
}

export function ProductCardSkeleton({ variant = 'default' }: ProductCardSkeletonProps) {
  const isSection = variant === 'section'

  return (
    <div className="overflow-hidden rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] shadow-[var(--shop-shadow-level-1)]">
      <div
        className={cn(
          'relative border-b border-[color:var(--shop-border)] skeleton-warm',
          isSection ? 'h-[152px] md:h-[160px] lg:h-[168px]' : 'h-[148px] lg:h-[164px]',
        )}
      />
      <div className={cn('p-3 pb-3.5', isSection && 'p-3.5')}>
        <div className="mb-2 h-[18px] w-10 rounded-full skeleton-shimmer" />
        <div className="space-y-1.5">
          <div className="h-[14px] w-[90%] rounded-md skeleton-shimmer" />
          <div className="h-[14px] w-[65%] rounded-md skeleton-shimmer" />
        </div>
        <div className="mt-2 h-[11px] w-[44%] rounded-md skeleton-shimmer" />
        <div className="mt-3 h-5 w-[45%] rounded-md skeleton-shimmer" />
        <div className="mt-3 h-9 w-full rounded-[10px] skeleton-shimmer" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
