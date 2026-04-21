import { HeaderCategoryNavSkeleton } from '@/components/layout/HeaderCategoryNav'
import { ProductGridSkeleton } from '@/components/product/ProductGridSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function CategoryLoading() {
  return (
    <div className="page-enter space-y-8 px-4 py-5 sm:px-5 lg:px-6 lg:py-6">
      <section className="px-1 pb-1 sm:px-0">
        <div className="overflow-hidden rounded-[26px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] shadow-[var(--shop-shadow-level-1)]">
          <HeaderCategoryNavSkeleton />
        </div>
      </section>

      <section className="overflow-hidden rounded-[30px] border border-white/15 bg-[linear-gradient(135deg,#6E49D8_0%,#2FA56F_100%)] px-5 py-5 shadow-[var(--shop-shadow-level-3)] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <Skeleton className="mb-4 h-4 w-40 rounded-full bg-white/20" />
        <Skeleton className="h-10 w-64 rounded-2xl bg-white/20 sm:h-12 sm:w-80" />
        <Skeleton className="mt-4 h-4 w-full max-w-[520px] rounded-full bg-white/20" />
        <Skeleton className="mt-2 h-4 w-full max-w-[420px] rounded-full bg-white/20" />
        <Skeleton className="mt-6 h-10 w-56 rounded-full bg-white/20" />
      </section>

      <section className="rounded-[30px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] p-4 shadow-[var(--shop-shadow-level-1)] sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-28 rounded-full" />
            <Skeleton className="h-4 w-[340px] max-w-full rounded-full" />
          </div>
          <Skeleton className="h-11 w-48 rounded-full" />
        </div>

        <div className="mb-5 flex gap-2 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24 rounded-full" />
          ))}
        </div>

        <ProductGridSkeleton count={10} />
      </section>
    </div>
  )
}
