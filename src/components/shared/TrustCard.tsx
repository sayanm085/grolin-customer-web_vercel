import { cn } from '@/lib/utils'

interface TrustCardProps {
  icon: React.ReactNode
  stat?: string
  label: string
  description?: string
  variant?: 'compact' | 'full'
  className?: string
}

export function TrustCard({
  icon,
  stat,
  label,
  description,
  variant = 'full',
  className,
}: TrustCardProps) {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2.5 rounded-[14px] bg-[color:var(--shop-surface-elevated)] px-4 py-2.5 shadow-[var(--shop-shadow-level-1)]',
          className,
        )}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
          {icon}
        </span>
        <span className="text-[13px] font-semibold text-[color:var(--shop-ink)]">{label}</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-[22px] bg-[color:var(--shop-surface-elevated)] p-5 shadow-[var(--shop-shadow-level-1)]',
        className,
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
        {icon}
      </span>
      {stat && (
        <p className="text-[28px] font-extrabold leading-none tabular-nums tracking-[-0.03em] text-[color:var(--shop-ink)]">
          {stat}
        </p>
      )}
      <div>
        <p className="text-[15px] font-bold text-[color:var(--shop-ink)]">{label}</p>
        {description && (
          <p className="mt-1 text-[13px] leading-5 text-[color:var(--shop-ink-muted)]">{description}</p>
        )}
      </div>
    </div>
  )
}
