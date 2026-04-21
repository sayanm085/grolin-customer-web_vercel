export function CategoryRowSkeleton() {
  return (
    <div className="overflow-x-auto pb-1 scrollbar-hide">
      <div className="flex min-w-max items-start gap-4 px-4 sm:px-0 lg:gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="w-[112px] shrink-0 sm:w-[120px] lg:w-[148px] xl:w-[156px]">
            <div className="rounded-[22px] border border-[color:var(--shop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,248,245,0.98)_100%)] px-3 py-4 shadow-[var(--shop-shadow-level-1)] lg:px-4 lg:py-5">
              <div className="mx-auto h-[88px] w-full max-w-[112px] rounded-[18px] skeleton-shimmer sm:h-[96px] sm:max-w-[120px] lg:h-[112px] lg:max-w-[132px] xl:h-[120px] xl:max-w-[140px]" />
              <div className="mx-auto mt-3 h-4 w-20 rounded skeleton-shimmer lg:mt-4 lg:w-24" />
              <div className="mx-auto mt-2 h-4 w-16 rounded skeleton-shimmer lg:w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
