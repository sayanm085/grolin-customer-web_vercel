import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="warm-canvas flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[32px] bg-[color:var(--shop-primary-soft)] shadow-[0_14px_28px_rgba(110,73,216,0.12)]">
                <MapPin className="h-10 w-10 text-[color:var(--shop-primary)]" strokeWidth={1.5} />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--shop-ink-faint)]">404 — Lost in the aisles</p>
            <h1 className="mt-3 text-[36px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[color:var(--shop-ink)]">
                Page not found
            </h1>
            <p className="mt-3 max-w-[340px] text-[15px] leading-7 text-[color:var(--shop-ink-muted)]">
                Looks like this page got lost on its way to your door. Let&apos;s get you back on track.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Link
                    href="/"
                    className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-[14px] bg-[color:var(--shop-action)] px-7 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(22,148,94,0.18)] transition-colors hover:bg-[color:var(--shop-action-hover)]"
                >
                    Back to Home
                </Link>
                <Link
                    href="/categories"
                    className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-[14px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-7 text-[14px] font-semibold text-[color:var(--shop-ink)] transition-colors hover:bg-[color:var(--shop-surface-subtle)]"
                >
                    Browse Categories
                </Link>
            </div>
        </div>
    )
}
