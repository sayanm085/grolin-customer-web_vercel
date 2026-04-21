'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Bike, ChevronLeft, ChevronRight, RefreshCcw, ShieldCheck } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { Banner } from '@/types/banner.types'

const AUTOPLAY_DELAY_MS = 5000
const SLIDE_TRANSITION =
  'transform 380ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 380ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'

const FALLBACK_BACKGROUNDS = [
  'linear-gradient(135deg, #53208E 0%, #A84CC4 54%, #E8B84F 100%)',
  'linear-gradient(135deg, #224D48 0%, #3F8D68 56%, #D8EBC5 100%)',
  'linear-gradient(135deg, #4D233B 0%, #A2417A 58%, #F0C4D8 100%)',
]

const SERVICE_BAND_ITEMS = [
  { label: '30 min delivery', icon: Bike, iconClass: 'text-[color:var(--shop-action)]' },
  { label: 'Fresh guarantee', icon: ShieldCheck, iconClass: 'text-[color:var(--shop-trust)]' },
  { label: 'Easy returns', icon: RefreshCcw, iconClass: 'text-[color:var(--shop-primary)]' },
] as const

function openBanner(router: ReturnType<typeof useRouter>, banner: Banner) {
  if (!banner.link_type || banner.link_type === 'none' || !banner.link_value) return
  if (banner.link_type === 'category') { router.push(`/categories/${banner.link_value}`); return }
  if (banner.link_type === 'product') { router.push(`/products/${banner.link_value}`); return }
  if (banner.link_type === 'url') { window.open(banner.link_value, '_blank', 'noopener,noreferrer') }
}

function getSlideCopy(banner: Banner, index: number) {
  const eyebrow = ['Premium selection', 'Editor pick', 'Daily highlight'][index % 3]
  return {
    eyebrow,
    title: banner.title || 'Fresh groceries, delivered with better taste and better timing.',
    subtitle: banner.subtitle || 'Build your basket from cleaner deals, top pantry staples, and same-day essentials.',
  }
}

export function HomeHeroMosaic({ banners }: { banners: Banner[] }) {
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const slides = useMemo(() => [...banners].sort((a, b) => a.sort_order - b.sort_order), [banners])

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_DELAY_MS,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: slides.length > 1,
      }),
    [slides.length],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: slides.length > 1,
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
      dragFree: false,
      duration: 24,
    },
    slides.length > 1 ? [autoplay] : [],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const handlePrev = useCallback(() => {
    emblaApi?.scrollPrev()
    autoplay.reset()
  }, [autoplay, emblaApi])

  const handleNext = useCallback(() => {
    emblaApi?.scrollNext()
    autoplay.reset()
  }, [autoplay, emblaApi])

  const handleScrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
      autoplay.reset()
    },
    [autoplay, emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (slides.length === 0) return null

  return (
    <section className="px-3 pt-5 sm:px-4 lg:px-6 lg:pt-6">
      {/* Card frame */}
      <div className="relative rounded-[34px] border border-[rgba(108,84,196,0.10)] bg-[rgba(255,255,255,0.74)] p-1 shadow-[0_20px_48px_rgba(34,22,84,0.08)]">
        <div className="overflow-hidden rounded-[30px]" ref={emblaRef}>
          <div className="flex touch-pan-y gap-2">
            {slides.map((banner, index) => {
              const copy = getSlideCopy(banner, index)
              const hasImage = Boolean(banner.image_url)
              const isActive = selectedIndex === index

              return (
                <article
                  key={banner.id}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_84%] lg:flex-[0_0_calc(50%-4px)]"
                >
                  <button
                    type="button"
                    onClick={() => openBanner(router, banner)}
                    className="group relative block h-[300px] w-full overflow-hidden rounded-[28px] text-left sm:h-[360px] lg:h-[420px]"
                    aria-label={`Open banner: ${copy.title}`}
                    style={{
                      opacity: isActive ? 1 : 0.68,
                      transform: `scale(${isActive ? 1 : 0.96})`,
                      transition: SLIDE_TRANSITION,
                    }}
                  >
                    {/* Background — gradient fallback or image */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: hasImage
                          ? undefined
                          : FALLBACK_BACKGROUNDS[index % FALLBACK_BACKGROUNDS.length],
                      }}
                    />

                    {hasImage && (
                      <Image
                        src={banner.image_url!}
                        alt={banner.title || 'Promotional banner'}
                        fill
                        unoptimized
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 84vw, 50vw"
                        priority={index < 2}
                      />
                    )}

                    {hasImage ? (
                      /*
                       * IMAGE BANNERS — image stays clean and dominant.
                       * Only a slim bottom gradient + compact info strip is shown.
                       * No heavy overlay that would obscure the image.
                       */
                      <>
                        {/* Bottom gradient — lets text read cleanly without covering the image */}
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0"
                          style={{
                            height: '44%',
                            background:
                              'linear-gradient(to top, rgba(8,8,12,0.82) 0%, rgba(8,8,12,0.38) 56%, transparent 100%)',
                          }}
                        />

                        {/* Info strip at bottom */}
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                          <div className="min-w-0 flex-1">
                            <span className="inline-flex rounded-full border border-white/25 bg-white/12 px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                              {copy.eyebrow}
                            </span>
                            <h2 className="mt-2 line-clamp-2 text-[20px] font-bold leading-[1.15] tracking-[-0.02em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.40)] sm:text-[24px] lg:text-[28px]">
                              {copy.title}
                            </h2>
                          </div>
                          <span className="inline-flex h-10 shrink-0 items-center rounded-full bg-white px-4 text-[13px] font-bold text-[color:var(--shop-ink)] shadow-[0_8px_20px_rgba(0,0,0,0.22)] transition-transform duration-200 group-hover:scale-105">
                            Shop
                          </span>
                        </div>
                      </>
                    ) : (
                      /*
                       * GRADIENT FALLBACK BANNERS — no image, so full editorial
                       * text layout with eyebrow, headline, and subtitle.
                       */
                      <>
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,15,33,0.78)_0%,rgba(18,15,33,0.30)_50%,rgba(18,15,33,0.06)_100%)]" />
                        <div className="relative flex h-full items-end px-5 pb-5 pt-6 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                          <div className="max-w-[360px] text-white">
                            <span className="inline-flex rounded-full border border-white/22 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/84">
                              {copy.eyebrow}
                            </span>
                            <h1 className="mt-4 max-w-[11ch] text-[28px] font-extrabold leading-[0.95] tracking-[-0.04em] text-white sm:text-[36px] lg:text-[44px]">
                              {copy.title}
                            </h1>
                            <p className="mt-3 max-w-[34ch] text-sm leading-6 text-white/76 sm:text-[15px]">
                              {copy.subtitle}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Progress bar — thin bottom edge indicator */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
                      {isActive && slides.length > 1 ? (
                        <span
                          key={`progress-${selectedIndex}`}
                          className="hero-progress-fill absolute inset-y-0 left-0 rounded-r-full bg-white/80"
                          style={{ animationDuration: `${AUTOPLAY_DELAY_MS}ms` }}
                        />
                      ) : null}
                    </div>
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        {/* Dots + arrows navigation */}
        {slides.length > 1 && (
          <div className="mt-3 flex items-center justify-between px-1 pb-1 sm:mt-4">
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleScrollTo(index)}
                  className={cn(
                    'transition-all duration-300',
                    selectedIndex === index
                      ? 'h-2.5 w-8 rounded-full bg-[color:var(--shop-primary)]'
                      : 'h-2.5 w-2.5 rounded-full bg-[rgba(75,0,130,0.18)] hover:bg-[rgba(75,0,130,0.34)]',
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(108,84,196,0.14)] bg-white/96 text-[color:var(--shop-ink)] shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-x-0.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.12)]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(108,84,196,0.20)] bg-white text-[color:var(--shop-primary)] shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-200 hover:translate-x-0.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.12)]"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Service band */}
      <div className="mt-4 bg-white px-3 py-2.5 shadow-[0_1px_0_rgba(26,35,43,0.06),0_4px_16px_rgba(26,35,43,0.04)] sm:px-5">
        <div className="grid grid-cols-3 divide-x divide-[color:var(--shop-border)] overflow-hidden rounded-[18px]">
          {SERVICE_BAND_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <span
                key={item.label}
                className="flex h-16 flex-col items-center justify-center gap-1 bg-white text-center transition-colors duration-150 hover:bg-[color:var(--shop-surface-subtle)]"
              >
                <Icon className={cn('h-[18px] w-[18px] shrink-0', item.iconClass)} />
                <span className="w-full px-1 text-[11px] font-semibold leading-tight text-[color:var(--shop-ink)]">
                  {item.label}
                </span>
              </span>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .hero-progress-fill {
          transform-origin: left center;
          animation-name: heroProgress;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        @keyframes heroProgress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  )
}

export function HomeHeroMosaicSkeleton() {
  return (
    <section className="px-3 pt-5 sm:px-4 lg:px-6 lg:pt-6">
      <div className="rounded-[34px] border border-[rgba(108,84,196,0.10)] bg-[rgba(255,255,255,0.74)] p-1 shadow-[0_20px_48px_rgba(34,22,84,0.08)]">
        <div className="grid gap-2 lg:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-[28px] sm:h-[360px] lg:h-[420px]" />
          <Skeleton className="hidden h-[300px] w-full rounded-[28px] sm:block sm:h-[360px] lg:h-[420px]" />
        </div>
      </div>
      <div className="mt-4 bg-white px-3 py-2.5 shadow-[0_1px_0_rgba(26,35,43,0.06),0_4px_16px_rgba(26,35,43,0.04)] sm:px-5">
        <div className="grid grid-cols-3 gap-2 pb-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-[18px]" />
          ))}
        </div>
      </div>
    </section>
  )
}
