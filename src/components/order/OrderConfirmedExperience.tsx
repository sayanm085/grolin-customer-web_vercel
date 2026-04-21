'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { m } from 'framer-motion'
import { CheckCheck, ShieldCheck, Sparkles } from 'lucide-react'
import { ConfettiEffect } from '@/components/order/ConfettiEffect'
import { CountdownTimer } from '@/components/order/CountdownTimer'
import { OrderJourneySteps } from '@/components/order/OrderJourneySteps'
import { WelcomeSheet } from '@/components/onboarding/WelcomeSheet'

const STAGGER_DURATION = 0.3
const FADE_UP = { opacity: 0, y: 20 }
const FADE_IN = { opacity: 1, y: 0 }
const TRUST_CHIPS = ['🔒 Payment secured', '📱 Track in real-time', '🔄 Free returns']

export function OrderConfirmedExperience({
    orderId,
    isFirstOrder,
}: {
    orderId: string
    isFirstOrder: boolean
}) {
    useEffect(() => {
        document.title = 'Order Confirmed — Grolin'
    }, [])

    const orderNumber = orderId.slice(-4).toUpperCase()

    return (
        <div className="min-h-screen bg-[color:var(--shop-canvas)] px-6 py-16">
            <ConfettiEffect />
            <WelcomeSheet isFirstOrder={isFirstOrder} />

            <div className="mx-auto flex max-w-[480px] flex-col items-center text-center">
                <m.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--shop-action)] shadow-[var(--shop-shadow-level-3)]"
                >
                    <span className="confirmation-pulse-ring absolute inset-0 rounded-full bg-[color:rgba(22,148,94,0.2)]" />
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.5 }}
                    >
                        <CheckCheck className="h-12 w-12 text-white" strokeWidth={2.3} />
                    </m.div>
                </m.div>

                <m.h1
                    initial={FADE_UP}
                    animate={FADE_IN}
                    transition={{ duration: STAGGER_DURATION, delay: 0.4, ease: 'easeOut' }}
                    className="mt-7 text-[28px] font-extrabold tracking-[-0.04em] text-[color:var(--shop-ink)]"
                >
                    Order Confirmed! 🎉
                </m.h1>

                <m.p
                    initial={FADE_UP}
                    animate={FADE_IN}
                    transition={{ duration: STAGGER_DURATION, delay: 0.5, ease: 'easeOut' }}
                    className="mt-2 max-w-[280px] text-[15px] leading-relaxed text-[color:var(--shop-ink-muted)]"
                >
                    Your grocery is being packed right now
                </m.p>

                <m.p
                    initial={FADE_UP}
                    animate={FADE_IN}
                    transition={{ duration: STAGGER_DURATION, delay: 0.6, ease: 'easeOut' }}
                    className="mt-3 text-[13px] font-medium text-[color:var(--shop-ink-faint)]"
                >
                    Order #GRL-{orderNumber}
                </m.p>

                {isFirstOrder ? (
                    <m.div
                        initial={FADE_UP}
                        animate={FADE_IN}
                        transition={{ duration: STAGGER_DURATION, delay: 0.65, ease: 'easeOut' }}
                        className="mt-6 w-full rounded-2xl border border-[rgba(110,73,216,0.2)] bg-[linear-gradient(135deg,rgba(110,73,216,0.06),rgba(22,148,94,0.04))] px-5 py-4 text-center shadow-[var(--shop-shadow-level-1)]"
                    >
                        <div className="flex items-center justify-center gap-2 text-[15px] font-bold text-[color:var(--shop-ink)]">
                            <Sparkles className="h-4 w-4 text-[color:var(--shop-primary)]" />
                            <span>Welcome to the Grolin family!</span>
                        </div>
                        <p className="mt-1 text-[13px] text-[color:var(--shop-ink-muted)]">
                            We&apos;ve added ₹50 credits to your wallet as a welcome gift.
                        </p>
                        <div className="mt-3 inline-flex rounded-full bg-[color:var(--shop-action-soft)] px-3 py-1 text-[11px] font-bold text-[color:var(--shop-action)]">
                            +₹50 credited
                        </div>
                    </m.div>
                ) : null}

                <m.div
                    initial={FADE_UP}
                    animate={FADE_IN}
                    transition={{ duration: STAGGER_DURATION, delay: 0.7, ease: 'easeOut' }}
                    className="mt-8 w-full"
                >
                    <CountdownTimer />
                </m.div>

                <m.div
                    initial={FADE_UP}
                    animate={FADE_IN}
                    transition={{ duration: STAGGER_DURATION, delay: 0.8, ease: 'easeOut' }}
                    className="mt-5 w-full"
                >
                    <OrderJourneySteps status="CONFIRMED" />
                </m.div>

                <m.div
                    initial={FADE_UP}
                    animate={FADE_IN}
                    transition={{ duration: STAGGER_DURATION, delay: 0.9, ease: 'easeOut' }}
                    className="mt-6 flex w-full flex-wrap justify-center gap-2"
                >
                    {TRUST_CHIPS.map((chip) => (
                        <div
                            key={chip}
                            className="rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-3 py-1.5 text-[12px] font-medium text-[color:var(--shop-ink-muted)]"
                        >
                            {chip}
                        </div>
                    ))}
                </m.div>

                <m.div
                    initial={FADE_UP}
                    animate={FADE_IN}
                    transition={{ duration: STAGGER_DURATION, delay: 1, ease: 'easeOut' }}
                    className="mt-8 flex w-full flex-col gap-3"
                >
                    <Link
                        href={`/orders/${orderId}`}
                        className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[color:var(--shop-action)] px-5 text-[15px] font-bold text-white shadow-[var(--shop-shadow-level-2)] transition-colors hover:bg-[color:var(--shop-action-hover)]"
                    >
                        Track Order →
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] border border-[color:var(--shop-border)] bg-white px-5 text-[15px] font-bold text-[color:var(--shop-ink)] transition-colors hover:bg-[color:var(--shop-surface-subtle)]"
                    >
                        Continue Shopping
                    </Link>
                </m.div>

                <div className="mt-6 flex items-center gap-2 text-[12px] text-[color:var(--shop-ink-faint)]">
                    <ShieldCheck className="h-4 w-4 text-[color:var(--shop-trust)]" />
                    <span>We&apos;ll keep your delivery progress updated in real time.</span>
                </div>
            </div>
        </div>
    )
}
