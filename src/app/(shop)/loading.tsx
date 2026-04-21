import { Skeleton } from '@/components/ui/skeleton'
import { CategoryRowSkeleton } from '@/components/home/CategoryRowSkeleton'

export default function HomeLoading() {
  return (
    <div className="space-y-8 pb-16">
      {/* Banner skeleton */}
      <div className="px-4 pt-4 sm:px-6">
        <Skeleton className="h-[180px] w-full rounded-[22px] sm:h-[220px]" />
      </div>

      {/* Categories skeleton */}
      <div className="px-4 sm:px-6">
        <Skeleton className="mb-4 h-6 w-32 rounded-full" />
        <CategoryRowSkeleton />
      </div>

      {/* Product section skeleton */}
      <div className="px-4 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[160px] shrink-0">
              <div className="overflow-hidden rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] shadow-[var(--shop-shadow-level-1)]">
                <Skeleton className="h-[148px] w-full rounded-none" />
                <div className="space-y-2 p-3">
                  <Skeleton className="h-4 w-4/5 rounded-full" />
                  <Skeleton className="h-3 w-1/3 rounded-full" />
                  <Skeleton className="h-5 w-1/2 rounded-full" />
                  <Skeleton className="h-9 w-full rounded-[10px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
