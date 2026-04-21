export function TransactionRowSkeleton() {
    return (
        <div className="flex items-center gap-4 rounded-[18px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-4 py-[14px] shadow-[var(--shop-shadow-level-1)]">
            <div className="skeleton-shimmer h-11 w-11 rounded-full" />
            <div className="flex-1 space-y-2">
                <div className="skeleton-shimmer h-4 w-2/3 rounded-full" />
                <div className="skeleton-shimmer h-3 w-1/3 rounded-full" />
            </div>
            <div className="space-y-2 text-right">
                <div className="skeleton-shimmer h-4 w-16 rounded-full" />
                <div className="skeleton-shimmer h-2.5 w-12 rounded-full" />
            </div>
        </div>
    )
}