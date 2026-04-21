import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type PromoBandVariant = 'green' | 'purple' | 'warm'
type ImagePosition = 'left' | 'right'

interface PromoBandProps {
  imageSrc: string
  imageAlt: string
  eyebrow?: string
  title: string
  description?: string
  ctaLabel: string
  ctaHref: string
  variant?: PromoBandVariant
  imagePosition?: ImagePosition
  className?: string
}

const VARIANT_CLASSES: Record<PromoBandVariant, { bg: string; cta: string; eyebrow: string }> = {
  green: {
    bg: 'bg-[color:var(--shop-action)] text-white',
    cta: 'bg-white text-[color:var(--shop-action)] hover:bg-white/90',
    eyebrow: 'text-white/70',
  },
  purple: {
    bg: 'bg-[color:var(--shop-primary)] text-white',
    cta: 'bg-white text-[color:var(--shop-primary)] hover:bg-white/90',
    eyebrow: 'text-white/70',
  },
  warm: {
    bg: 'warm-canvas',
    cta: 'bg-[color:var(--shop-action)] text-white hover:bg-[color:var(--shop-action-hover)]',
    eyebrow: 'text-[color:var(--shop-ink-muted)]',
  },
}

export function PromoBand({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  variant = 'warm',
  imagePosition = 'right',
  className,
}: PromoBandProps) {
  const { bg, cta, eyebrow: eyebrowColor } = VARIANT_CLASSES[variant]

  const imageEl = (
    <div className="relative h-48 w-full overflow-hidden rounded-[18px] sm:h-56 md:h-full md:min-h-[220px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )

  const contentEl = (
    <div className="flex flex-col justify-center gap-4 py-2 md:py-4">
      {eyebrow && (
        <span
          className={cn(
            'eyebrow',
            eyebrowColor,
          )}
        >
          {eyebrow}
        </span>
      )}
      <h3 className="text-[24px] font-extrabold leading-[1.1] tracking-[-0.025em] md:text-[28px]">
        {title}
      </h3>
      {description && (
        <p className="text-[14px] leading-6 opacity-80">{description}</p>
      )}
      <div>
        <Link
          href={ctaHref}
          className={cn(
            'inline-flex h-11 items-center rounded-[12px] px-5 text-[14px] font-bold transition-colors',
            cta,
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[22px] p-5 shadow-[var(--shop-shadow-level-2)] sm:p-6',
        bg,
        className,
      )}
    >
      <div
        className={cn(
          'grid gap-5 md:grid-cols-2 md:gap-8',
          imagePosition === 'left' ? '' : 'md:[&>*:first-child]:order-last',
        )}
      >
        {imagePosition === 'left' ? (
          <>
            {imageEl}
            {contentEl}
          </>
        ) : (
          <>
            {contentEl}
            {imageEl}
          </>
        )}
      </div>
    </div>
  )
}
