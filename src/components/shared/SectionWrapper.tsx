import { cn } from '@/lib/utils'

type BackgroundVariant =
  | 'canvas'
  | 'white'
  | 'subtle'
  | 'dark'
  | 'mesh-warm'
  | 'mesh-purple'
  | 'mesh-green'

type PaddingVariant = 'normal' | 'tight' | 'loose' | 'none'

interface SectionWrapperProps {
  children: React.ReactNode
  background?: BackgroundVariant
  grain?: boolean
  className?: string
  id?: string
  padding?: PaddingVariant
}

const BG_MAP: Record<BackgroundVariant, string> = {
  canvas: 'warm-canvas',
  white: 'bg-[color:var(--shop-surface)]',
  subtle: 'bg-[color:var(--shop-surface-subtle)]',
  dark: 'mesh-dark',
  'mesh-warm': 'mesh-warm',
  'mesh-purple': 'mesh-purple',
  'mesh-green': 'mesh-green',
}

const PADDING_MAP: Record<PaddingVariant, string> = {
  normal: 'py-8 md:py-12',
  tight: 'py-5 md:py-8',
  loose: 'py-12 md:py-16',
  none: '',
}

export function SectionWrapper({
  children,
  background,
  grain = false,
  className,
  id,
  padding = 'normal',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full',
        background && BG_MAP[background],
        grain && 'grain-overlay',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-screen-xl px-4 md:px-8',
          PADDING_MAP[padding],
        )}
      >
        {children}
      </div>
    </section>
  )
}
