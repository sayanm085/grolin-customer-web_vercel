'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'
import { heroContainer, heroHeadline, heroCTA, heroTrustChip } from '@/lib/motion-variants'
import { Clock, Truck, ShieldCheck, ArrowRight, Sparkles, Star } from 'lucide-react'
import type { Banner } from '@/types/banner.types'

/* ═══════════════════════════  CONSTANTS  ══════════════════════════ */

const AUTOPLAY_DELAY = 5500
const CINEMATIC_HERO_IMAGES = [
  '/images/hero/hero-cinematic-1.png',
  '/images/hero/hero-cinematic-2.png',
  '/images/hero/hero-cinematic-3.png',
]

const EYEBROWS = ['Fresh from Your Neighbourhood', 'Curated for Kolkata', 'Daily Highlight', 'Editor\'s Pick']

const EDITORIAL_HEADLINES = [
  'Healthy snacking without the guesswork',
  'Farm-fresh produce at your doorstep',
  'Kolkata\'s finest groceries, delivered',
  'Premium essentials for every kitchen',
]

/** Use backend title if it's a real editorial headline (15+ chars), otherwise use a compelling fallback */
function getHeroTitle(banner: Banner, index: number): string {
  const raw = banner.title?.trim()
  if (raw && raw.length >= 15) return raw
  return EDITORIAL_HEADLINES[index % EDITORIAL_HEADLINES.length]!
}

const SLIDE_THEMES = [
  { gradient: 'linear-gradient(135deg, rgba(15,5,25,0.52) 0%, rgba(10,8,18,0.35) 50%, rgba(15,5,25,0.25) 100%)', accent: '#A78BFA' },
  { gradient: 'linear-gradient(135deg, rgba(8,18,12,0.50) 0%, rgba(5,15,10,0.33) 50%, rgba(8,18,12,0.22) 100%)', accent: '#34D399' },
  { gradient: 'linear-gradient(135deg, rgba(25,12,5,0.50) 0%, rgba(18,8,3,0.35) 50%, rgba(25,12,5,0.22) 100%)', accent: '#FBBF24' },
]

const FLOATING_PARTICLE_LAYOUTS = Array.from({ length: 6 }, (_, i) => ({
  width: `${3 + (i % 4)}px`,
  height: `${3 + ((i + 2) % 4)}px`,
  left: `${14 + i * 13}%`,
  top: `${18 + (i * 11) % 54}%`,
  opacity: 0.15 + i * 0.025,
  blur: `${1 + (i % 3)}px`,
  duration: `${6 + i * 1.4}s`,
  delay: `${i * 0.45}s`,
}))

function getEyebrow(banner: Banner, index: number) {
  return banner.subtitle?.trim() || EYEBROWS[index % EYEBROWS.length]
}

function getHeroImageSrc(_banner: Banner, index: number): string {
  // Always use the curated cinematic images — ignoring backend image_url
  // to prevent stale/deleted images from flashing on initial load
  return CINEMATIC_HERO_IMAGES[index % CINEMATIC_HERO_IMAGES.length] ?? CINEMATIC_HERO_IMAGES[0]!
}

/* ═══════════════  FLOATING PARTICLES  ═════════════════════════════ */
function FloatingParticles({ accent }: { accent: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {FLOATING_PARTICLE_LAYOUTS.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
            background: accent,
            opacity: particle.opacity,
            filter: `blur(${particle.blur})`,
            animation: `hero-float-${i % 3} ${particle.duration} ease-in-out infinite`,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════  TRUST METRICS BAR  ══════════════════════════════ */
function HeroTrustMetrics() {
  const metrics = [
    { icon: Clock, value: '30 min', label: 'Delivery' },
    { icon: ShieldCheck, value: '100%', label: 'Fresh Guarantee' },
    { icon: Star, value: '4.8', label: 'Rating' },
    { icon: Truck, value: 'FREE', label: 'Above ₹299' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
      {metrics.map((metric, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <metric.icon className="h-3.5 w-3.5 text-white/80" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-white leading-none">{metric.value}</span>
            <span className="text-[10px] font-medium text-white/50 leading-none mt-0.5">{metric.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════  CINEMATIC SLIDE  ════════════════════════════════ */
function CinematicSlide({
  banner, index, isActive, onOpen, shouldReduceMotion, slideEpoch,
}: {
  banner: Banner; index: number; isActive: boolean
  onOpen: () => void; shouldReduceMotion: boolean | null; slideEpoch: number
}) {
  const theme = SLIDE_THEMES[index % SLIDE_THEMES.length]!
  const eyebrow = getEyebrow(banner, index)
  const heroImageSrc = getHeroImageSrc(banner, index)
  const heroTitle = getHeroTitle(banner, index)
  const titleWords = heroTitle.split(' ')
  const lastWord = titleWords.pop() ?? ''
  const leadingWords = titleWords.join(' ')

  return (
    <article
      className="min-w-0 flex-[0_0_100%] relative overflow-hidden"
      style={{ height: 'clamp(480px, 65vh, 680px)' }}
    >
      {/* ── Layer 0: Full-bleed cinematic image with Ken Burns zoom ── */}
      <div className="absolute inset-0 z-[0]">
        <Image
          src={heroImageSrc}
          alt={banner.title ?? 'Grolin promotional banner'}
          fill
          className="object-cover"
          sizes="100vw"
          priority={index < 2}
          style={{
            transform: isActive ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
      </div>

      {/* ── Layer 1: Deep cinematic scrim with brand tint ── */}
      <div className="absolute inset-0 z-[1]" style={{ background: theme.gradient }} />

      {/* ── Layer 1b: Subtle bottom gradient for text legibility ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.10) 35%, transparent 55%)',
        }}
      />

      {/* ── Layer 2: Floating particles ── */}
      {!shouldReduceMotion && <FloatingParticles accent={theme.accent} />}

      {/* ── Layer 2b: Edge light beam (animated) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${theme.accent}08 60%, transparent 80%)`,
          animation: 'hero-beam-sweep 12s ease-in-out infinite',
        }}
      />

      {/* ── Layer 3: Content zone ── */}
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-[3] w-full h-full text-left group cursor-pointer"
        aria-label={banner.title ?? 'View promotion'}
      >
        {/* Eyebrow pill — top left with animated border */}
        <m.span
          initial={!shouldReduceMotion ? { opacity: 0, x: -20 } : false}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25,0.46,0.45,0.94] }}
          className="absolute left-5 top-5 md:left-8 md:top-6 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.20em]"
          style={{
            color: theme.accent,
            backgroundColor: 'rgba(0,0,0,0.35)',
            border: `1px solid ${theme.accent}40`,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
          {eyebrow}
        </m.span>

        {/* GROLIN watermark — desktop parallax */}
        <span
          className="absolute right-6 top-6 z-[1] hidden md:block select-none text-[11px] font-bold uppercase tracking-[0.28em] opacity-15 text-white/80"
          aria-hidden="true"
        >
          GROLIN
        </span>

        {/* Bottom-left editorial content zone */}
        <m.div
          className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-24 md:pb-14 md:px-8 lg:px-12"
          variants={index === 0 && !shouldReduceMotion ? heroContainer : undefined}
          initial={index === 0 && !shouldReduceMotion ? 'hidden' : false}
          animate="visible"
        >
          {/* Brand voice eyebrow */}
          <m.span
            className="mb-3 hidden md:inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] text-white/60"
            variants={index === 0 && !shouldReduceMotion ? heroTrustChip : undefined}
          >
            <Sparkles className="h-3 w-3" style={{ color: theme.accent }} />
            Premium Grocery Delivery in South Kolkata
          </m.span>

          {/* Main headline — last word gets accent gradient */}
          <m.h1
            className="font-black text-white leading-[1.04] tracking-[-0.03em] mb-5 max-w-[340px] md:max-w-xl lg:max-w-2xl"
            style={{ fontSize: 'clamp(30px, 6vw, 58px)' }}
            variants={index === 0 && !shouldReduceMotion ? heroHeadline : undefined}
          >
            {leadingWords}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}CC, white)` }}
            >
              {lastWord}
            </span>
          </m.h1>

          {/* CTA row */}
          <m.div
            className="flex flex-wrap items-center gap-3 mb-6"
            variants={index === 0 && !shouldReduceMotion ? heroCTA : undefined}
          >
            {/* Primary CTA */}
            <m.span
              className="group/cta inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-bold shadow-[0_8px_32px_rgba(22,148,94,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(22,148,94,0.50)]"
              style={{
                background: 'linear-gradient(135deg, #16945E 0%, #1AAF6E 100%)',
                color: 'white',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </m.span>

            {/* Delivery chip */}
            <m.span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-bold"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'rgba(255,255,255,0.90)',
              }}
              variants={index === 0 && !shouldReduceMotion ? heroTrustChip : undefined}
            >
              <Clock className="h-3.5 w-3.5" style={{ color: theme.accent }} />
              Delivery in ~30 min
            </m.span>
          </m.div>

          {/* Trust metrics — desktop only */}
          <m.div
            className="hidden md:block"
            initial={!shouldReduceMotion ? { opacity: 0, y: 16 } : false}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.25,0.46,0.45,0.94] }}
          >
            <HeroTrustMetrics />
          </m.div>
        </m.div>
      </button>

      {/* ── Layer 4: Active slide progress bar ── */}
      {isActive && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] z-[4] pointer-events-none"
          style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
        >
          <div
            key={`progress-${index}-${slideEpoch}`}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}90)`,
              animation: `progress-fill ${AUTOPLAY_DELAY}ms linear forwards`,
            }}
          />
        </div>
      )}
    </article>
  )
}

/* ═══════════════  MAIN HERO EXPORT  ═══════════════════════════════ */

export function HeroLayered({ banners }: { banners: Banner[] }) {
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const autoplay = useMemo(
    () => Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false, stopOnMouseEnter: true }),
    [],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: banners.length > 1, align: 'start', slidesToScroll: 1, dragFree: false, containScroll: 'trimSnaps' },
    [autoplay],
  )

  const [slideEpoch, setSlideEpoch] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setSlideEpoch((prev) => prev + 1)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const openBanner = (banner: Banner) => {
    if (!banner.link_type || banner.link_type === 'none') return
    if (banner.link_type === 'category' && banner.link_value) {
      router.push(`/categories/${banner.link_value}`)
      return
    }
    if (banner.link_type === 'product' && banner.link_value) {
      router.push(`/products/${banner.link_value}`)
      return
    }
    if (banner.link_type === 'url' && banner.link_value) {
      window.open(banner.link_value, '_blank')
    }
  }

  if (banners.length === 0) return null

  return (
    <section className="relative w-full overflow-hidden" aria-label="Featured promotions">
      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => (
            <CinematicSlide
              key={banner.id}
              banner={banner}
              index={index}
              isActive={selectedIndex === index}
              onOpen={() => openBanner(banner)}
              shouldReduceMotion={shouldReduceMotion}
              slideEpoch={slideEpoch}
            />
          ))}
        </div>
      </div>

      {/* ── Dot indicators — pill-style bottom right ── */}
      {banners.length > 1 && (
        <div className="absolute bottom-5 right-5 md:right-8 z-[5] flex items-center gap-2" aria-label="Slide navigation">
          {banners.map((_, index) => {
            const theme = SLIDE_THEMES[index % SLIDE_THEMES.length]!
            return (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className="rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{
                  width: selectedIndex === index ? '28px' : '8px',
                  height: '8px',
                  backgroundColor: selectedIndex === index ? theme.accent : 'rgba(255,255,255,0.30)',
                  boxShadow: selectedIndex === index ? `0 0 12px ${theme.accent}50` : 'none',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          })}
        </div>
      )}

      {/* ── Slide counter — bottom left ── */}
      {banners.length > 1 && (
        <div className="absolute bottom-5 left-5 md:left-8 z-[5] flex items-center gap-2">
          <span className="text-[11px] font-bold text-white/50 tabular-nums tracking-wider">
            {String(selectedIndex + 1).padStart(2, '0')} / {String(banners.length).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* ── CSS Animations ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hero-float-0 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-12px) translateX(6px); }
        }
        @keyframes hero-float-1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(10px) translateX(-8px); }
        }
        @keyframes hero-float-2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-8px) translateX(4px); }
        }
        @keyframes hero-beam-sweep {
          0%, 100% { opacity: 0; transform: translateX(-20%); }
          40%, 60% { opacity: 1; transform: translateX(0%); }
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}} />
    </section>
  )
}
