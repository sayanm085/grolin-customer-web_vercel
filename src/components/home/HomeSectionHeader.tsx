import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HomeSectionHeaderProps {
  title: string
  subtitle?: string
  viewAllHref?: string
  onPrev?: () => void
  onNext?: () => void
  eyebrow?: string
  controlsDisabled?: boolean
}

export function HomeSectionHeader({
  title,
  subtitle,
  viewAllHref,
  onPrev,
  onNext,
  eyebrow,
  controlsDisabled = false,
}: HomeSectionHeaderProps) {
  const showControls = Boolean(onPrev && onNext)

  return (
    <div className="reveal-on-scroll mb-3 flex items-start justify-between gap-4 sm:mb-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 hidden h-8 w-[2px] rounded-full bg-[color:var(--shop-primary)] sm:block" />
        <div>
          {eyebrow && (
            <span className="eyebrow mb-1">
              {eyebrow}
            </span>
          )}
          <h2 className="section-heading max-w-[14ch] text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 max-w-[620px] text-[14px] leading-6 text-[color:var(--shop-ink-muted)] sm:text-[15px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--shop-primary)] transition-colors duration-200 hover:text-[color:var(--shop-primary-hover)] sm:text-[12px]"
          >
            <span className="hidden sm:inline">See all</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}

        {showControls && (
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={onPrev}
              disabled={controlsDisabled}
              className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] text-[color:var(--shop-ink-muted)] shadow-[var(--shop-shadow-level-1)] transition-colors hover:border-[color:var(--shop-border-strong)] hover:bg-[color:var(--shop-primary-soft)] hover:text-[color:var(--shop-primary)] disabled:cursor-not-allowed disabled:opacity-45"
              aria-label={`Previous ${title}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={controlsDisabled}
              className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] text-[color:var(--shop-ink-muted)] shadow-[var(--shop-shadow-level-1)] transition-colors hover:border-[color:var(--shop-border-strong)] hover:bg-[color:var(--shop-primary-soft)] hover:text-[color:var(--shop-primary)] disabled:cursor-not-allowed disabled:opacity-45"
              aria-label={`Next ${title}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
