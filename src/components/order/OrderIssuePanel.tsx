'use client'

import { useState } from 'react'
import { ChevronDown, CircleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

const ISSUE_OPTIONS = ['Item missing', 'Wrong item', 'Quality issue', 'Late delivery'] as const

export function OrderIssuePanel() {
    const [open, setOpen] = useState(false)
    const [selectedIssue, setSelectedIssue] = useState<(typeof ISSUE_OPTIONS)[number] | null>(null)

    return (
        <section className="shop-surface rounded-[22px] p-4 sm:p-5">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="flex w-full items-center justify-between gap-3 text-left"
            >
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--shop-danger)]/10 text-[color:var(--shop-danger)]">
                        <CircleAlert className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-[color:var(--shop-ink)]">Having a problem?</p>
                        <p className="text-xs text-[color:var(--shop-ink-muted)]">
                            Tell us quickly and we will prioritize support.
                        </p>
                    </div>
                </div>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 text-[color:var(--shop-ink-muted)] transition-transform',
                        open && 'rotate-180',
                    )}
                />
            </button>

            {(open || selectedIssue) && (
                <div className="mt-4 space-y-4 border-t border-[color:var(--shop-border)] pt-4">
                    <div className="flex flex-wrap gap-2">
                        {ISSUE_OPTIONS.map((issue) => {
                            const selected = issue === selectedIssue
                            return (
                                <button
                                    key={issue}
                                    type="button"
                                    onClick={() => setSelectedIssue(issue)}
                                    className={cn(
                                        'rounded-full border px-3 py-2 text-sm font-medium transition-colors',
                                        selected
                                            ? 'border-[color:var(--shop-action)] bg-[color:var(--shop-action-soft)] text-[color:var(--shop-action)]'
                                            : 'border-[color:var(--shop-border)] bg-white text-[color:var(--shop-ink)] hover:bg-[color:var(--shop-surface-subtle)]',
                                    )}
                                >
                                    {issue}
                                </button>
                            )
                        })}
                    </div>

                    <p className="text-sm font-medium text-[color:var(--shop-action)]">
                        We&apos;ll resolve this within 2 hours
                    </p>
                </div>
            )}
        </section>
    )
}