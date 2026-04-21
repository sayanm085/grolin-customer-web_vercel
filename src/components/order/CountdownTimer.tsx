'use client'

import { useEffect, useMemo, useState } from 'react'
import { Clock3, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
    className?: string
}

export function CountdownTimer({ className }: CountdownTimerProps) {
    const [seconds, setSeconds] = useState(30 * 60)

    useEffect(() => {
        const timer = window.setInterval(() => {
            setSeconds((current) => Math.max(0, current - 1))
        }, 1000)

        return () => window.clearInterval(timer)
    }, [])

    const display = useMemo(() => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
        const secs = String(seconds % 60).padStart(2, '0')
        return `${mins}:${secs}`
    }, [seconds])

    const isDone = seconds === 0

    return (
        <div
            className={cn(
                'rounded-[22px] border border-[color:var(--shop-border)] bg-white px-6 py-5 shadow-[var(--shop-shadow-level-2)]',
                className,
            )}
        >
            <div className="flex items-center justify-center gap-2 text-[13px] text-[color:var(--shop-ink-muted)]">
                <Truck className="h-[18px] w-[18px] text-[color:var(--shop-trust)]" />
                <span>Estimated delivery</span>
            </div>

            <div className="mt-3 text-center">
                {isDone ? (
                    <div className="inline-flex items-center justify-center gap-2 text-[22px] font-extrabold text-[color:var(--shop-action)]">
                        <Clock3 className="h-5 w-5 animate-pulse" />
                        <span>Arriving any moment...</span>
                    </div>
                ) : (
                    <div className="text-[56px] font-extrabold leading-none tracking-[-0.05em] tabular-nums text-[color:var(--shop-ink)]">
                        {display}
                    </div>
                )}
                <p className="mt-2 text-[13px] text-[color:var(--shop-ink-muted)]">minutes remaining</p>
            </div>
        </div>
    )
}
