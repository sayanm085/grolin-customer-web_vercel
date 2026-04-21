'use client'

import { Bike, CheckCheck, PackageCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/types/order.types'

const JOURNEY_STEPS = [
    { key: 'packed', label: 'Packed', Icon: PackageCheck },
    { key: 'way', label: 'On the Way', Icon: Bike },
    { key: 'delivered', label: 'Delivered', Icon: CheckCheck },
] as const

function getCurrentStep(status: OrderStatus) {
    if (status === 'DELIVERED') return 2
    if (status === 'OUT_FOR_DELIVERY') return 1
    return 0
}

export function OrderJourneySteps({ status }: { status: OrderStatus }) {
    const currentStep = getCurrentStep(status)

    return (
        <div className="rounded-[22px] border border-[color:var(--shop-border)] bg-white px-4 py-5 shadow-[var(--shop-shadow-level-1)] sm:px-5">
            <div className="flex items-start justify-between gap-2">
                {JOURNEY_STEPS.map((step, index) => {
                    const isComplete = index < currentStep
                    const isCurrent = index === currentStep
                    const isUpcoming = index > currentStep

                    return (
                        <div key={step.key} className="flex flex-1 items-start">
                            <div className="flex flex-1 flex-col items-center text-center">
                                <div className="relative flex h-10 w-10 items-center justify-center">
                                    {isCurrent && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                backgroundColor: 'var(--shop-primary)',
                                                opacity: 0.25,
                                                animation: 'pulse-ring 1.8s ease-out infinite',
                                            }}
                                        />
                                    )}
                                    <div
                                        className={cn(
                                            'relative flex h-8 w-8 items-center justify-center rounded-full border text-white transition-all duration-200',
                                            isComplete && 'border-[color:var(--shop-action)] bg-[color:var(--shop-action)]',
                                            isCurrent && 'border-[color:var(--shop-primary)] bg-[color:var(--shop-primary)] shadow-purple-glow',
                                            isUpcoming &&
                                                'border-[color:var(--shop-border)] bg-white text-[color:var(--shop-ink-faint)]',
                                        )}
                                    >
                                        <step.Icon className="h-4 w-4" />
                                    </div>
                                </div>
                                <p
                                    className={cn(
                                        'mt-2 text-[12px] font-medium',
                                        isComplete && 'text-[color:var(--shop-action)]',
                                        isCurrent && 'font-bold text-[color:var(--shop-primary)]',
                                        isUpcoming && 'text-[color:var(--shop-ink-faint)]',
                                    )}
                                >
                                    {step.label}
                                </p>
                            </div>
                            {index < JOURNEY_STEPS.length - 1 ? (
                                <div className="mt-[15px] flex-1 px-2">
                                    <div
                                        className={cn(
                                            'h-[2px] w-full rounded-full',
                                            index < currentStep
                                                ? 'bg-[color:var(--shop-action)]'
                                                : 'border-t-2 border-dashed border-[color:var(--shop-border)]',
                                        )}
                                    />
                                </div>
                            ) : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
