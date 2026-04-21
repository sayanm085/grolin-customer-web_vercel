export function WalletCardSkeleton() {
    return (
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(110,73,216,0.94)_0%,rgba(88,61,186,0.98)_55%,rgba(53,36,119,1)_100%)] p-6 shadow-[var(--shop-shadow-strong)] sm:p-7">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-14 left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex min-h-[220px] flex-col justify-between">
                <div>
                    <div className="mb-3 flex items-center gap-3">
                        <div className="h-11 w-11 rounded-[14px] bg-white/15 skeleton-shimmer" />
                        <div className="space-y-2">
                            <div className="h-3 w-28 rounded-full bg-white/20 skeleton-shimmer" />
                            <div className="h-3.5 w-40 rounded-full bg-white/20 skeleton-shimmer" />
                        </div>
                    </div>
                    <div className="mt-6 h-11 w-40 rounded-xl bg-white/20 skeleton-shimmer" />
                    <div className="mt-3 h-4 w-52 rounded-full bg-white/15 skeleton-shimmer" />
                </div>
                <div className="mt-8 h-11 w-32 rounded-[12px] bg-white/80 skeleton-shimmer" />
            </div>
        </div>
    )
}