export function WalletSkeleton() {
    return (
        <div className="page-enter space-y-6 pb-24">
            <div className="space-y-2">
                <div className="skeleton-shimmer h-3 w-28 rounded-full" />
                <div className="skeleton-shimmer h-10 w-36 rounded-2xl" />
                <div className="skeleton-shimmer h-4 w-72 rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(110,73,216,0.94)_0%,rgba(88,61,186,0.98)_55%,rgba(53,36,119,1)_100%)] p-6 shadow-[var(--shop-shadow-strong)] sm:p-7">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-14 left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                <div className="relative flex min-h-[220px] flex-col justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <div className="skeleton-shimmer h-11 w-11 rounded-[14px] bg-white/15" />
                            <div className="space-y-2">
                                <div className="skeleton-shimmer h-3 w-28 rounded-full bg-white/20" />
                                <div className="skeleton-shimmer h-3.5 w-40 rounded-full bg-white/20" />
                            </div>
                        </div>
                        <div className="skeleton-shimmer mt-6 h-11 w-40 rounded-xl bg-white/20" />
                        <div className="skeleton-shimmer mt-3 h-4 w-52 rounded-full bg-white/15" />
                    </div>
                    <div className="skeleton-shimmer mt-8 h-11 w-32 rounded-[12px] bg-white/80" />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="skeleton-shimmer h-4 w-36 rounded-full" />
                <div className="skeleton-shimmer h-3 w-20 rounded-full" />
            </div>

            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 rounded-[18px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-4 py-[14px] shadow-[var(--shop-shadow-level-1)]"
                    >
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
                ))}
            </div>
        </div>
    )
}
