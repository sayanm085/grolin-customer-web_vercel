'use client'

import { Loader2 } from 'lucide-react'

interface LoadingOverlayProps {
    message?: string
}

export function LoadingOverlay({ message = 'Processing payment...' }: LoadingOverlayProps) {
    return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[rgba(240,236,232,0.82)] backdrop-blur-md">
            <div className="flex flex-col items-center rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-8 py-7 text-center shadow-[var(--shop-shadow-level-3)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)]">
                    <Loader2 className="h-7 w-7 animate-spin text-[color:var(--shop-primary)]" />
                </div>
                <p className="mt-4 text-sm font-semibold text-[color:var(--shop-ink)]">{message}</p>
                <p className="mt-1 text-xs text-[color:var(--shop-ink-muted)]">Please do not close this page</p>
            </div>
        </div>
    )
}