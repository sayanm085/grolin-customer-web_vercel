import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SectionHeadingAction {
  label: string
  href?: string
  onClick?: () => void
}

type HeadingVariant = 'editorial' | 'section' | 'page'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  action?: SectionHeadingAction
  variant?: HeadingVariant
  className?: string
}

const TITLE_CLASS: Record<HeadingVariant, string> = {
  editorial: 'headline-editorial',
  section: 'section-heading',
  page: 'text-[28px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[color:var(--shop-ink)] sm:text-[32px]',
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  variant = 'section',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-6 flex items-end justify-between gap-4', className)}>
      <div>
        {eyebrow && <span className="eyebrow mb-2">{eyebrow}</span>}
        <h2 className={TITLE_CLASS[variant]}>{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-[color:var(--shop-ink-muted)]">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="shrink-0">
          {action.href ? (
            <Link
              href={action.href}
              className="text-sm font-semibold text-[color:var(--shop-primary)] hover:underline"
            >
              {action.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className="text-sm font-semibold text-[color:var(--shop-primary)] hover:underline"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
