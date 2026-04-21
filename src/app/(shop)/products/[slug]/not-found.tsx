import Link from 'next/link'
import { Package } from 'lucide-react'

export default function ProductNotFound() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(240,236,232,0.96)_100%)] shadow-[var(--shop-shadow-level-1)]">
                <Package className="h-10 w-10 text-[color:var(--shop-primary)]" strokeWidth={1.5} />
            </div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--shop-primary-strong)]">Product unavailable</p>
            <h2 className="mb-3 max-w-[360px] text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[color:var(--shop-ink)] sm:text-[30px]">
                {"This product isn't on the shelf right now"}
            </h2>
            <p className="mb-6 max-w-[340px] text-[15px] leading-7 text-[color:var(--shop-ink-muted)]">
                It may have moved or sold out, but you can keep shopping the live catalog.
            </p>
            <Link
                href="/products"
                className="inline-flex h-11 items-center rounded-[14px] bg-[color:var(--shop-action)] px-6 text-[14px] font-semibold tracking-tight text-white transition-colors hover:bg-[color:var(--shop-action-hover)]"
            >
                Back to Products
            </Link>
        </div>
    )
}
