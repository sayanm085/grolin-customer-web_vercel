import Link from 'next/link'
import { Search } from 'lucide-react'

export default function ShopNotFound() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(240,236,232,0.96)_100%)] shadow-[var(--shop-shadow-level-1)]">
                <Search className="h-10 w-10 text-[color:var(--shop-primary)]" strokeWidth={1.5} />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--shop-primary-strong)]">Storefront missing</p>
            <h2 className="mt-2 text-[30px] font-extrabold leading-[1.06] tracking-[-0.03em] text-[color:var(--shop-ink)]">Page not found</h2>
            <p className="mt-3 max-w-[340px] text-[15px] leading-7 text-[color:var(--shop-ink-muted)]">We couldn&apos;t find what you&apos;re looking for.</p>
            <div className="mt-6 flex gap-3">
                <Link
                    href="/"
                    className="inline-flex h-11 items-center rounded-xl bg-[color:var(--shop-action)] px-6 text-[14px] font-semibold tracking-tight text-white transition-colors hover:bg-[color:var(--shop-action-hover)]"
                >
                    Home
                </Link>
                <Link
                    href="/products"
                    className="inline-flex h-11 items-center rounded-xl border border-[color:var(--shop-border)] px-6 text-[14px] font-semibold tracking-tight text-[color:var(--shop-ink)] transition-colors hover:bg-[color:var(--shop-surface-subtle)]"
                >
                    Browse Products
                </Link>
            </div>
        </div>
    )
}
