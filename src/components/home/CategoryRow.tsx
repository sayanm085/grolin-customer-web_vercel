'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Grid2x2, ArrowRight } from 'lucide-react'
import { m, useInView, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { getCategoryImageSrc } from '@/lib/media'
import type { Category } from '@/types/product.types'
import { cn } from '@/lib/utils'

/* ══════════════════════════════  CONSTANTS  ═══════════════════════ */

type CategoryRowProps = {
  categories: Category[]
  selectedCategoryId?: string
}

const GRADIENT_PALETTE = [
  { colors: ['#F6F1FF', '#EDE4FF'], accent: '#7B59E6', glow: 'rgba(123,89,230,0.20)' },
  { colors: ['#EEF9F2', '#DDF5E6'], accent: '#16945E', glow: 'rgba(22,148,94,0.18)' },
  { colors: ['#EFF6FF', '#DBEAFE'], accent: '#3B82F6', glow: 'rgba(59,130,246,0.18)' },
  { colors: ['#FFF7ED', '#FED7AA'], accent: '#EA580C', glow: 'rgba(234,88,12,0.16)' },
  { colors: ['#FEF2F2', '#FECACA'], accent: '#DC2626', glow: 'rgba(220,38,38,0.16)' },
  { colors: ['#FDF2F8', '#FBCFE8'], accent: '#DB2777', glow: 'rgba(219,39,119,0.16)' },
  { colors: ['#ECFEFF', '#CFFAFE'], accent: '#0891B2', glow: 'rgba(8,145,178,0.16)' },
  { colors: ['#FEFCE8', '#FEF08A'], accent: '#CA8A04', glow: 'rgba(202,138,4,0.16)' },
] as const

function hashName(value: string) {
  return Array.from(value).reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

function getMonogram(name: string) {
  const words = name.split(/[\s,&-]+/).map((p) => p.trim()).filter(Boolean)
  if (words.length === 0) return 'G'
  if (words.length === 1) return words[0]!.slice(0, 1).toUpperCase()
  return `${words[0]!.slice(0, 1)}${words[1]!.slice(0, 1)}`.toUpperCase()
}

function getCategoryStyle(name: string) {
  const palette = GRADIENT_PALETTE[hashName(name.toLowerCase()) % GRADIENT_PALETTE.length]!
  return {
    gradient: `linear-gradient(145deg, ${palette.colors[0]}, ${palette.colors[1]})`,
    monogram: getMonogram(name),
    accentColor: palette.accent,
    glow: palette.glow,
  }
}

/* ══════════  CATEGORY CARD MEDIA (Inner Image)  ═══════════════════ */
function CategoryCardMedia({ category, index }: { category: Category; index: number }) {
  const [imageFailed, setImageFailed] = useState(false)
  const style = getCategoryStyle(category.name)
  const imageSrc = getCategoryImageSrc(category)
  const showImage = Boolean(imageSrc) && !imageFailed

  useEffect(() => { setImageFailed(false) }, [imageSrc])

  return (
    <div
      className="relative mx-auto aspect-square w-full overflow-hidden rounded-[18px] border border-[color:var(--shop-border)]/70 bg-white shadow-[0_8px_24px_rgba(26,35,43,0.08)] transition-all duration-500 group-hover:shadow-[0_14px_32px_rgba(26,35,43,0.12)]"
      style={{
        backgroundImage: `${style.gradient}, linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.98))`,
      }}
    >
      {showImage ? (
        <Image
          src={imageSrc!} alt={category.name} fill unoptimized
          priority={index < 8} onError={() => setImageFailed(true)}
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          sizes="(min-width: 1280px) 176px, (min-width: 1024px) 172px, (min-width: 640px) 150px, 142px"
        />
      ) : (
        <span className="text-[18px] font-black tracking-[0.14em] text-[color:var(--shop-primary)] lg:text-[22px]">{style.monogram}</span>
      )}

      {/* 3D glass reflection layer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-60" />

      {/* Hover light sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-[800ms] group-hover:translate-x-full group-hover:opacity-100" />
    </div>
  )
}

/* ══════════  SLIDER ARROW  ════════════════════════════════════════ */
function SliderArrow({ direction, onClick, hidden }: { direction: 'left' | 'right'; onClick: () => void; hidden?: boolean }) {
  return (
    <button
      type="button" onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll categories left' : 'Scroll categories right'}
      className={cn(
        'absolute top-[44%] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-[0_12px_36px_rgba(110,73,216,0.30)] transition-all duration-300 hover:scale-[1.08] lg:flex',
        'bg-gradient-to-br from-[#6E49D8] to-[#523AA3] hover:from-[#7B59E6] hover:to-[#5E44B5]',
        direction === 'left' ? 'left-2' : 'right-2',
        hidden && 'pointer-events-none opacity-0',
      )}
    >
      {direction === 'left' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  )
}

/* ══════════  3D TILT CARD WRAPPER  ════════════════════════════════ */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const smoothX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const smoothY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(y * -8)
    rotateY.set(x * 10)
  }, [rotateX, rotateY])

  const handleLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}

/* ══════════  ANIMATED CATEGORY CARD  ══════════════════════════════ */
function AnimatedCategoryCard({
  category, index, isActive, inView, prefersReduced,
}: {
  category: Category; index: number; isActive: boolean
  inView: boolean; prefersReduced: boolean | null
}) {
  const style = getCategoryStyle(category.name)

  return (
    <Link
      key={category.id}
      href={`/categories/${category.id}`}
      aria-label={`Browse ${category.name}`}
      className="group w-[142px] shrink-0 sm:w-[150px] lg:w-[172px] xl:w-[176px]"
    >
      <m.div
        initial={prefersReduced ? false : { opacity: 0, y: 28, scale: 0.90, rotateX: 12 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
        transition={{
          type: 'spring', stiffness: 140, damping: 18,
          delay: Math.min(index * 0.06, 0.5),
        }}
      >
        <TiltCard className="relative">
          {/* Card body */}
          <div
            className={cn(
              'relative overflow-hidden rounded-[22px] border px-3 py-3.5 transition-all duration-500 lg:px-3.5 lg:py-4',
              isActive
                ? 'border-[color:var(--shop-primary)] bg-white shadow-[0_18px_48px_rgba(110,73,216,0.14)]'
                : 'border-[color:var(--shop-border)] bg-white shadow-[0_8px_28px_rgba(26,35,43,0.06)] hover:shadow-[0_18px_42px_rgba(26,35,43,0.10)]',
            )}
          >
            {/* Active glow ring */}
            {isActive && (
              <div className="absolute -inset-[1px] -z-10 rounded-[25px] overflow-hidden">
                <div
                  className="absolute inset-0 rounded-[25px]"
                  style={{
                    background: `conic-gradient(from 0deg, ${style.accentColor}, #A78BFA, #FBBF24, #A78BFA, ${style.accentColor})`,
                    animation: 'spin-slow 4s linear infinite',
                  }}
                />
              </div>
            )}

            {/* Ambient glow behind the card on active */}
            {isActive && (
              <div
                className="pointer-events-none absolute -inset-4 -z-20 rounded-[40px] blur-[24px] opacity-50"
                style={{ background: style.glow }}
              />
            )}

            {/* Top accent line */}
            <div
              className={cn(
                'absolute left-4 right-4 top-0 h-[2px] rounded-full transition-all duration-500',
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60',
              )}
              style={{
                background: `linear-gradient(90deg, transparent, ${style.accentColor}, transparent)`,
              }}
            />

            {/* Active floating dot */}
            {isActive && (
              <m.div
                layoutId="category-active-dot"
                className="absolute -top-1.5 left-1/2 -translate-x-1/2"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <span className="relative flex h-3 w-3">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                    style={{ background: style.accentColor }}
                  />
                  <span
                    className="relative inline-flex h-3 w-3 rounded-full shadow-md"
                    style={{ background: style.accentColor }}
                  />
                </span>
              </m.div>
            )}

            <CategoryCardMedia category={category} index={index} />

            {/* Category name with accent underline on active */}
            <div className="mt-3 text-center">
              <p
                className={cn(
                  'line-clamp-2 min-h-[2.7em] text-[14px] font-bold leading-[1.32] tracking-[-0.01em] transition-colors duration-300 lg:text-[15px]',
                  isActive
                    ? 'text-[color:var(--shop-primary)]'
                    : 'text-[color:var(--shop-ink)] group-hover:text-[color:var(--shop-primary)]',
                )}
              >
                {category.name}
              </p>
              {isActive && (
                <m.div
                  layoutId="category-underline"
                  className="mx-auto mt-1.5 h-[2px] w-8 rounded-full"
                  style={{ background: style.accentColor }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </div>

            {/* Hover: "Browse →" micro CTA */}
            <div className="mt-1.5 flex items-center justify-center gap-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--shop-primary)]">Browse</span>
              <ArrowRight className="h-2.5 w-2.5 text-[color:var(--shop-primary)] transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </TiltCard>
      </m.div>
    </Link>
  )
}

/* ══════════════════════  MAIN EXPORT  ═════════════════════════════ */
export function CategoryRow({ categories, selectedCategoryId }: CategoryRowProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-20px' })
  const prefersReduced = useReducedMotion()

  const updateScrollState = useCallback(() => {
    if (!emblaApi) return
    setCanScrollLeft(emblaApi.canScrollPrev())
    setCanScrollRight(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    updateScrollState()
    emblaApi.on('select', updateScrollState)
    emblaApi.on('reInit', updateScrollState)
    emblaApi.on('scroll', updateScrollState)
    return () => {
      emblaApi.off('select', updateScrollState)
      emblaApi.off('reInit', updateScrollState)
      emblaApi.off('scroll', updateScrollState)
    }
  }, [emblaApi, updateScrollState])

  return (
    <div ref={sectionRef} className="relative" aria-label="Category quick navigation">
      <SliderArrow direction="left" onClick={() => emblaApi?.scrollPrev()} hidden={!canScrollLeft} />
      <SliderArrow direction="right" onClick={() => emblaApi?.scrollNext()} hidden={!canScrollRight} />

      <div className="overflow-hidden pb-1" ref={emblaRef}>
        <div className="flex select-none touch-pan-y items-start gap-3 px-2 sm:px-1 lg:gap-4">
          {categories.map((category, index) => (
            <AnimatedCategoryCard
              key={category.id} category={category} index={index}
              isActive={selectedCategoryId === category.id}
              inView={inView} prefersReduced={prefersReduced}
            />
          ))}

          {/* "All Categories" cinematic card */}
          <Link href="/categories" aria-label="Browse all categories" className="group w-[142px] shrink-0 sm:w-[150px] lg:w-[172px] xl:w-[176px]">
            <m.div
              initial={prefersReduced ? false : { opacity: 0, y: 28, scale: 0.90 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 140, damping: 18, delay: Math.min(categories.length * 0.06, 0.6) }}
            >
              <div className="relative overflow-hidden rounded-[22px] border border-[color:var(--shop-primary)]/35 bg-gradient-to-br from-[#F8F5FF] via-white to-[#EFE7FF] px-3 py-3.5 shadow-[0_8px_28px_rgba(110,73,216,0.08)] transition-all duration-500 hover:shadow-[0_18px_42px_rgba(110,73,216,0.14)] hover:border-[color:var(--shop-primary)] lg:px-3.5 lg:py-4">
                {/* Animated gradient border */}
                <div className="absolute -inset-[1px] -z-10 rounded-[25px] overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'conic-gradient(from 0deg, #6E49D8, #A78BFA, #FBBF24, #A78BFA, #6E49D8)',
                      animation: 'spin-slow 4s linear infinite',
                    }}
                  />
                </div>

                <div className="mx-auto flex aspect-square w-full items-center justify-center rounded-[18px] border border-[color:var(--shop-primary)]/18 bg-white shadow-[0_8px_20px_rgba(110,73,216,0.08)] transition-all duration-500 group-hover:shadow-[0_12px_28px_rgba(110,73,216,0.12)]">
                  <m.div
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Grid2x2 className="h-8 w-8 text-[color:var(--shop-primary)] lg:h-9 lg:w-9" />
                  </m.div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-[14px] font-bold text-[color:var(--shop-primary)] lg:text-[15px]">All Categories</p>
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--shop-primary)]">View All</span>
                  <ArrowRight className="h-2.5 w-2.5 text-[color:var(--shop-primary)]" />
                </div>
              </div>
            </m.div>
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  )
}
