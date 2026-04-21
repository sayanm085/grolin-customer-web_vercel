export function ProfileHeaderSkeleton() {
    return (
        <div className="relative">
            <div className="h-[160px] rounded-[28px] skeleton-shimmer" />
            <div className="relative -mt-16 px-4">
                <div className="flex items-end gap-4">
                    <div className="h-20 w-20 rounded-full border-[3px] border-white skeleton-shimmer" />
                    <div className="flex-1 space-y-2 pb-3">
                        <div className="h-6 w-40 rounded-full skeleton-shimmer" />
                        <div className="h-4 w-32 rounded-full skeleton-shimmer" />
                    </div>
                    <div className="mb-3 h-8 w-24 rounded-full skeleton-shimmer" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3 py-4 shadow-[var(--shop-shadow-level-2)]"
                        >
                            <div className="mx-auto h-5 w-10 rounded-full skeleton-shimmer" />
                            <div className="mx-auto mt-2 h-3 w-12 rounded-full skeleton-shimmer" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
