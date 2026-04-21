export function ProfileSkeleton() {
    return (
        <div className="page-enter pb-24">
            <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                <section className="relative">
                    <div className="relative h-[160px] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,rgba(110,73,216,0.18)_0%,rgba(79,70,229,0.14)_55%,rgba(240,236,232,0.88)_100%)] shadow-[var(--shop-shadow-level-2)]">
                        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
                        <div className="absolute -left-8 top-16 h-28 w-28 rounded-full bg-white/18 blur-xl" />
                    </div>

                    <div className="relative z-10 -mt-14 px-2 sm:px-3">
                        <div className="flex items-end gap-4 px-2">
                            <div className="skeleton-shimmer h-20 w-20 rounded-full border-[4px] border-white" />
                            <div className="min-w-0 flex-1 space-y-2 pb-3">
                                <div className="skeleton-shimmer h-7 w-40 rounded-full" />
                                <div className="skeleton-shimmer h-4 w-32 rounded-full" />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3 px-1">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3 py-4 text-center shadow-[var(--shop-shadow-level-2)]"
                                >
                                    <div className="skeleton-shimmer mx-auto h-5 w-10 rounded-full" />
                                    <div className="skeleton-shimmer mx-auto mt-2 h-3 w-12 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div className="mt-6 px-4 sm:px-6">
                <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(110,73,216,0.16),rgba(79,70,229,0.12))] p-5 shadow-[var(--shop-shadow-level-1)]">
                    <div className="skeleton-shimmer h-5 w-32 rounded-full bg-white/60" />
                    <div className="skeleton-shimmer mt-3 h-4 w-48 rounded-full bg-white/55" />
                    <div className="mt-4 flex gap-2">
                        <div className="skeleton-shimmer h-9 w-28 rounded-xl bg-white/80" />
                        <div className="skeleton-shimmer h-9 w-24 rounded-xl bg-white/45" />
                    </div>
                </div>
            </div>

            <div className="mt-6 px-4 sm:px-6">
                <div className="space-y-5">
                    {Array.from({ length: 3 }).map((_, sectionIndex) => (
                        <section key={sectionIndex}>
                            <div className="skeleton-shimmer mb-2 h-3 w-24 rounded-full" />
                            <div className="rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] p-1.5 shadow-[var(--shop-shadow-level-1)]">
                                {Array.from({ length: sectionIndex === 2 ? 2 : 3 }).map((__, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center gap-3 rounded-[18px] px-4 py-3.5">
                                        <div className="skeleton-shimmer h-10 w-10 rounded-full" />
                                        <div className="skeleton-shimmer h-4 flex-1 rounded-full" />
                                        <div className="skeleton-shimmer h-4 w-4 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}
