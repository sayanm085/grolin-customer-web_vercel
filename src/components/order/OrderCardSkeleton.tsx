export function OrderCardSkeleton() {
    return (
        <div className="rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] p-[14px] shadow-[var(--shop-shadow-level-1)]">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="skeleton-shimmer h-4 w-32 rounded-full" />
                    <div className="skeleton-shimmer h-3 w-24 rounded-full" />
                </div>
                <div className="space-y-2 text-right">
                    <div className="skeleton-shimmer h-6 w-24 rounded-full" />
                    <div className="skeleton-shimmer h-4 w-16 rounded-full" />
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton-shimmer h-[44px] w-[44px] rounded-[12px]" />
                ))}
                <div className="skeleton-shimmer ml-2 h-4 w-16 rounded-full" />
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <div className="skeleton-shimmer h-11 flex-1 rounded-[12px]" />
                <div className="skeleton-shimmer h-11 flex-1 rounded-[12px]" />
            </div>
        </div>
    )
}