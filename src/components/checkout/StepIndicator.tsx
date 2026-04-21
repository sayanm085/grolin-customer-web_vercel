import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepIndicatorProps {
    steps: string[]
    currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="w-full" role="list" aria-label="Checkout steps">
            <div className="flex items-center gap-2.5 sm:gap-3">
                {steps.map((label, index) => {
                    const isComplete = index < currentStep
                    const isCurrent = index === currentStep
                    const isUpcoming = index > currentStep

                    return (
                        <div
                            key={label}
                            role="listitem"
                            aria-current={isCurrent ? 'step' : undefined}
                            className={cn(
                                'flex min-w-0 items-center',
                                index === steps.length - 1 ? 'flex-none' : 'flex-1',
                            )}
                        >
                            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                                <div className="relative">
                                    {isCurrent && (
                                        <span className="absolute inset-0 rounded-full bg-[color:var(--shop-primary)] opacity-20 animate-pulse" aria-hidden="true" />
                                    )}
                                    <div
                                        aria-label={isComplete ? `${label} — completed` : isCurrent ? `${label} — current step` : `${label} — upcoming`}
                                        className={cn(
                                            'relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200',
                                            isComplete && 'bg-[color:var(--shop-success)] text-white shadow-[0_10px_18px_rgba(22,163,74,0.2)]',
                                            isCurrent && 'bg-[color:var(--shop-primary)] text-white shadow-[0_10px_20px_rgba(110,73,216,0.22)]',
                                            isUpcoming && 'border-2 border-[color:var(--shop-border)] bg-white text-[color:var(--shop-ink-muted)]',
                                        )}
                                    >
                                        {isComplete ? <Check className="h-3.5 w-3.5" strokeWidth={2.8} aria-hidden="true" /> : index + 1}
                                    </div>
                                </div>

                                <p
                                    className={cn(
                                        'hidden text-sm font-semibold sm:block',
                                        isComplete && 'text-[color:var(--shop-success)]',
                                        isCurrent && 'text-[color:var(--shop-primary)]',
                                        isUpcoming && 'text-[color:var(--shop-ink-muted)]',
                                    )}
                                >
                                    {label}
                                </p>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="mx-2 flex-1 sm:mx-3">
                                    {index < currentStep ? (
                                        <div className="h-[2px] w-full rounded-full bg-[color:var(--shop-success)]" />
                                    ) : (
                                        <div className="w-full border-t-2 border-dashed border-[color:var(--shop-border)]" />
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center sm:hidden">
                {steps.map((label, index) => (
                    <p
                        key={label}
                        className={cn(
                            'text-[11px] font-medium',
                            index < currentStep && 'text-[color:var(--shop-success)]',
                            index === currentStep && 'text-[color:var(--shop-primary)]',
                            index > currentStep && 'text-[color:var(--shop-ink-muted)]',
                        )}
                    >
                        {label}
                    </p>
                ))}
            </div>
        </div>
    )
}