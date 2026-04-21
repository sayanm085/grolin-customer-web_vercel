'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Sparkles, Truck } from 'lucide-react'
import { formatINR } from '@/lib/utils'

interface FreeDeliveryBarProps {
    subtotal: number
    threshold: number
}

export function FreeDeliveryBar({ subtotal, threshold }: FreeDeliveryBarProps) {
    const reduceMotion = useReducedMotion()
    const remaining = Math.max(0, threshold - subtotal)
    const progress = Math.min(100, Math.round((subtotal / threshold) * 100))
    const prevSubtotal = useRef(subtotal)
    const [celebrating, setCelebrating] = useState(false)

    useEffect(() => {
        if (prevSubtotal.current < threshold && subtotal >= threshold) {
            setCelebrating(true)
        }
        prevSubtotal.current = subtotal
    }, [subtotal, threshold])

    useEffect(() => {
        if (!celebrating) return
        const timeout = window.setTimeout(() => setCelebrating(false), 2200)
        return () => window.clearTimeout(timeout)
    }, [celebrating])

    if (remaining <= 0) {
        return (
            <m.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                className="rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-4 py-3.5 shadow-[var(--shop-shadow-level-1)]"
            >
                <div className="flex items-center gap-3">
                    <m.div
                        animate={
                            reduceMotion
                                ? undefined
                                : celebrating
                                  ? { scale: [1, 1.12, 1], rotate: [0, -4, 4, 0] }
                                  : { scale: 1 }
                        }
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--shop-action-soft)] text-[color:var(--shop-action)]"
                    >
                        <CheckCircle2 className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </m.div>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-[color:var(--shop-ink)]">{'\u{1F389} Free delivery unlocked!'}</p>
                            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--shop-action-soft)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--shop-action)]">
                                <Sparkles className="h-3.5 w-3.5" />
                                Basket perk active
                            </span>
                        </div>
                        <p className="mt-1 text-xs font-medium text-[color:var(--shop-ink-muted)]">
                            You crossed {formatINR(threshold)} so delivery charges are now free.
                        </p>
                    </div>
                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-[color:var(--shop-border)]">
                    <m.div
                        className="h-full rounded-full bg-[color:var(--shop-free-delivery)]"
                        initial={reduceMotion ? false : { width: '84%' }}
                        animate={reduceMotion ? undefined : { width: '100%' }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                </div>
            </m.div>
        )
    }

    return (
        <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            className="rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-4 py-3.5 shadow-[var(--shop-shadow-level-1)]"
        >
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
                    <Truck className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-[color:var(--shop-ink)]">
                            {formatINR(remaining)} more for free delivery
                        </p>
                        <span className="text-xs font-semibold text-[color:var(--shop-ink-muted)]">{progress}%</span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-[color:var(--shop-ink-muted)]">
                        Free above {formatINR(threshold)}
                    </p>
                </div>
            </div>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-[color:var(--shop-border)]">
                <m.div
                    className="h-full rounded-full bg-[color:var(--shop-free-delivery)]"
                    style={{ width: `${progress}%` }}
                    animate={reduceMotion ? undefined : { opacity: [0.9, 1, 0.9] }}
                    transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>
        </m.div>
    )
}