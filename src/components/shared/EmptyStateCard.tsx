'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { m, useReducedMotion } from 'framer-motion'

interface EmptyStateCardProps {
  icon: LucideIcon
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  ctaAction?: () => void
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  secondaryCtaAction?: () => void
  iconBg?: string
  iconColor?: string
}

export function EmptyStateCard({
  icon: Icon,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaAction,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaAction,
  iconBg = 'bg-[color:var(--shop-surface-subtle)]',
  iconColor = 'text-[color:var(--shop-ink-faint)]',
}: EmptyStateCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const showPrimaryAction = Boolean(ctaLabel && (ctaHref || ctaAction))
  const showSecondaryAction = Boolean(secondaryCtaLabel && (secondaryCtaHref || secondaryCtaAction))

  return (
    <m.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 24, mass: 1.2 }}
      className="flex flex-col items-center justify-center rounded-[28px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-8 py-14 text-center shadow-[var(--shop-shadow-level-1)]"
    >
      <div className={`mb-5 flex h-20 w-20 items-center justify-center rounded-[26px] shadow-[var(--shop-shadow-level-2)] ${iconBg}`}>
        <Icon className={`h-9 w-9 ${iconColor}`} strokeWidth={1.5} />
      </div>

      <h3 className="text-[20px] font-bold tracking-tight text-[color:var(--shop-ink)]">{title}</h3>
      <p className="mt-2 max-w-[280px] text-[14px] leading-[1.65] text-[color:var(--shop-ink-muted)]">{subtitle}</p>

      {showPrimaryAction || showSecondaryAction ? (
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {ctaLabel && ctaHref ? (
            <Link
              href={ctaHref}
              className="inline-flex h-[48px] min-w-[160px] items-center justify-center rounded-[14px] bg-[color:var(--shop-action)] px-6 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(22,148,94,0.18)] transition-colors hover:bg-[color:var(--shop-action-hover)]"
            >
              {ctaLabel}
            </Link>
          ) : ctaLabel && ctaAction ? (
            <button
              type="button"
              onClick={ctaAction}
              className="inline-flex h-[48px] min-w-[160px] items-center justify-center rounded-[14px] bg-[color:var(--shop-action)] px-6 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(22,148,94,0.18)] transition-colors hover:bg-[color:var(--shop-action-hover)]"
            >
              {ctaLabel}
            </button>
          ) : null}

          {secondaryCtaLabel && secondaryCtaHref ? (
            <Link
              href={secondaryCtaHref}
              className="inline-flex h-10 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-5 text-[13px] font-semibold text-[color:var(--shop-ink-muted)] transition-colors hover:text-[color:var(--shop-primary)]"
            >
              {secondaryCtaLabel}
            </Link>
          ) : secondaryCtaLabel && secondaryCtaAction ? (
            <button
              type="button"
              onClick={secondaryCtaAction}
              className="inline-flex h-10 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-5 text-[13px] font-semibold text-[color:var(--shop-ink-muted)] transition-colors hover:text-[color:var(--shop-primary)]"
            >
              {secondaryCtaLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </m.div>
  )
}
