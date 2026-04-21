'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles, Truck, Clock, Leaf, Gift } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════
//  BANNER DEFINITIONS
// ═══════════════════════════════════════════════════════════════════
export type BannerVariant =
  | 'breakfast'
  | 'dinner'
  | 'healthy'
  | 'treats'
  | 'essentials'
  | 'family'
  | 'fresh-deals'
  | 'free-delivery'

type BannerConfig = {
  imageSrc: string
  headline: string
  subtext: string
  cta: string
  ctaHref: string
  gradient: string
  overlayGradient: string
  accentColor: string
  icon: typeof Sparkles
  badge?: string
}

const BANNER_CONFIGS: Record<BannerVariant, BannerConfig> = {
  breakfast: {
    imageSrc: '/images/banners/breakfast.png',
    headline: 'Rise & Shine Mornings',
    subtext: 'Fresh eggs, golden toast, warm chai — everything for a perfect Indian breakfast, delivered by 8 AM.',
    cta: 'Shop Breakfast',
    ctaHref: '/search?q=breakfast',
    gradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
    overlayGradient: 'linear-gradient(to right, rgba(120,70,0,0.85) 0%, rgba(120,70,0,0.5) 40%, transparent 70%)',
    accentColor: '#F59E0B',
    icon: Clock,
    badge: 'Morning Specials',
  },
  dinner: {
    imageSrc: '/images/banners/dinner.png',
    headline: "Tonight's Feast Awaits",
    subtext: 'From aromatic spices to farm-fresh paneer — build your perfect dinner basket in minutes.',
    cta: 'Plan Dinner',
    ctaHref: '/search?q=dinner',
    gradient: 'linear-gradient(135deg, #4C1D95, #7C3AED)',
    overlayGradient: 'linear-gradient(to right, rgba(30,10,60,0.88) 0%, rgba(30,10,60,0.5) 40%, transparent 70%)',
    accentColor: '#7C3AED',
    icon: Sparkles,
    badge: 'Evening Picks',
  },
  healthy: {
    imageSrc: '/images/banners/healthy.png',
    headline: 'Eat Clean, Feel Great',
    subtext: 'Organic greens, superfoods, and wholesome pantry staples for a balanced, energetic week.',
    cta: 'Shop Healthy',
    ctaHref: '/search?q=healthy',
    gradient: 'linear-gradient(135deg, #065F46, #16945E)',
    overlayGradient: 'linear-gradient(to right, rgba(3,40,28,0.85) 0%, rgba(3,40,28,0.45) 40%, transparent 70%)',
    accentColor: '#16945E',
    icon: Leaf,
    badge: 'Wellness Week',
  },
  treats: {
    imageSrc: '/images/banners/treats.png',
    headline: 'Weekend Indulgence',
    subtext: "Chocolates, ice cream, artisan snacks & festive drinks — because weekends deserve to be delicious.",
    cta: 'Explore Treats',
    ctaHref: '/search?q=treats',
    gradient: 'linear-gradient(135deg, #BE185D, #7C3AED)',
    overlayGradient: 'linear-gradient(to right, rgba(60,10,40,0.88) 0%, rgba(60,10,40,0.5) 40%, transparent 70%)',
    accentColor: '#DB2777',
    icon: Gift,
    badge: 'Weekend Vibes',
  },
  essentials: {
    imageSrc: '/images/banners/breakfast.png',
    headline: 'Home Essentials',
    subtext: 'Detergents, tissues, soaps & everything your home needs — always stocked, always fresh.',
    cta: 'Stock Up',
    ctaHref: '/search?q=essentials',
    gradient: 'linear-gradient(135deg, #1E3A5F, #1D6FB8)',
    overlayGradient: 'linear-gradient(to right, rgba(10,25,50,0.88) 0%, rgba(10,25,50,0.5) 40%, transparent 70%)',
    accentColor: '#1D6FB8',
    icon: Truck,
    badge: 'Always Stocked',
  },
  family: {
    imageSrc: '/images/banners/dinner.png',
    headline: 'Family Favourites',
    subtext: 'Kid-safe snacks, family-size packs & crowd-pleasers that everyone loves.',
    cta: 'Shop Family',
    ctaHref: '/search?q=family',
    gradient: 'linear-gradient(135deg, #9A3412, #EA580C)',
    overlayGradient: 'linear-gradient(to right, rgba(60,20,5,0.88) 0%, rgba(60,20,5,0.5) 40%, transparent 70%)',
    accentColor: '#EA580C',
    icon: Sparkles,
    badge: 'Family Pack',
  },
  'fresh-deals': {
    imageSrc: '/images/banners/healthy.png',
    headline: 'Fresh Deals Today',
    subtext: "Don't miss out on today's limited-time offers on premium produce and pantry staples.",
    cta: 'View Deals',
    ctaHref: '/products?sort=deals',
    gradient: 'linear-gradient(135deg, #7B59E6, #5A3CC0)',
    overlayGradient: 'linear-gradient(to right, rgba(40,20,80,0.88) 0%, rgba(40,20,80,0.5) 40%, transparent 70%)',
    accentColor: '#7B59E6',
    icon: Sparkles,
    badge: 'Limited Time',
  },
  'free-delivery': {
    imageSrc: '/images/banners/treats.png',
    headline: 'Free Delivery on ₹299+',
    subtext: 'No delivery charges on orders above ₹299. Shop now and save on every delivery.',
    cta: 'Start Shopping',
    ctaHref: '/products',
    gradient: 'linear-gradient(135deg, #16945E, #22C77A)',
    overlayGradient: 'linear-gradient(to right, rgba(5,40,25,0.88) 0%, rgba(5,40,25,0.5) 40%, transparent 70%)',
    accentColor: '#22C77A',
    icon: Truck,
    badge: 'Free Delivery',
  },
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function CinematicBanner({
  variant,
  compact = false,
}: {
  variant: BannerVariant
  compact?: boolean
}) {
  const config = BANNER_CONFIGS[variant]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()
  const Icon = config.icon

  const height = compact ? 'h-[160px] sm:h-[180px] lg:h-[200px]' : 'h-[200px] sm:h-[240px] lg:h-[280px]'

  return (
    <m.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 120, damping: 22 }}
      className="px-3 sm:px-4 lg:px-6"
    >
      <Link href={config.ctaHref} className="group block">
        <div
          className={`relative ${height} w-full overflow-hidden rounded-[24px] sm:rounded-[28px]`}
          style={{
            boxShadow: `0 8px 32px ${config.accentColor}18, 0 2px 8px rgba(0,0,0,0.06)`,
          }}
        >
          {/* Background image */}
          <Image
            src={config.imageSrc}
            alt={config.headline}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 90vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: config.overlayGradient }} />

          {/* Subtle grain texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Content */}
          <div className="relative z-[2] flex h-full flex-col justify-center px-6 sm:px-8 lg:px-12">
            {/* Badge */}
            {config.badge && (
              <m.span
                initial={prefersReduced ? false : { opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15, type: 'spring', stiffness: 150, damping: 20 }}
                className="mb-2.5 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm sm:text-[11px]"
                style={{
                  background: `${config.accentColor}33`,
                  border: `1px solid ${config.accentColor}44`,
                }}
              >
                <Icon className="h-3 w-3" strokeWidth={2} />
                {config.badge}
              </m.span>
            )}

            {/* Headline */}
            <m.h3
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 20 }}
              className="max-w-[400px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontSize: compact ? 'clamp(20px, 3vw, 30px)' : 'clamp(22px, 3.5vw, 36px)' }}
            >
              {config.headline}
            </m.h3>

            {/* Subtext */}
            <m.p
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 20 }}
              className="mt-2 max-w-[380px] text-[12px] font-medium leading-[1.6] text-white/70 sm:text-[13px] lg:text-[14px]"
            >
              {config.subtext}
            </m.p>

            {/* CTA */}
            <m.div
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, type: 'spring', stiffness: 120, damping: 20 }}
              className="mt-4"
            >
              <span
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-white shadow-lg transition-all duration-300 group-hover:gap-3 group-hover:shadow-xl sm:text-[13px]"
                style={{
                  background: config.gradient,
                  boxShadow: `0 4px 16px ${config.accentColor}40`,
                }}
              >
                {config.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </span>
            </m.div>
          </div>

          {/* Decorative accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{ background: config.gradient }}
          />

          {/* Hover shine sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
        </div>
      </Link>
    </m.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
//  DUAL BANNER (side-by-side for tighter layouts)
// ═══════════════════════════════════════════════════════════════════
export function DualCinematicBanner({
  left,
  right,
}: {
  left: BannerVariant
  right: BannerVariant
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()

  const leftConfig = BANNER_CONFIGS[left]
  const rightConfig = BANNER_CONFIGS[right]

  return (
    <m.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 120, damping: 22 }}
      className="grid grid-cols-1 gap-3 px-3 sm:grid-cols-2 sm:gap-4 sm:px-4 lg:gap-5 lg:px-6"
    >
      {[leftConfig, rightConfig].map((config, i) => {
        const Icon = config.icon
        const delay = i * 0.12
        return (
          <Link key={config.headline} href={config.ctaHref} className="group block">
            <div
              className="relative h-[180px] w-full overflow-hidden rounded-[20px] sm:h-[200px] sm:rounded-[24px]"
              style={{ boxShadow: `0 6px 24px ${config.accentColor}15` }}
            >
              <Image
                src={config.imageSrc}
                alt={config.headline}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: config.overlayGradient }} />

              <div className="relative z-[2] flex h-full flex-col justify-center px-5 sm:px-6">
                {config.badge && (
                  <m.span
                    initial={prefersReduced ? false : { opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: delay + 0.15 }}
                    className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm sm:text-[10px]"
                    style={{
                      background: `${config.accentColor}33`,
                      border: `1px solid ${config.accentColor}44`,
                    }}
                  >
                    <Icon className="h-2.5 w-2.5" strokeWidth={2} />
                    {config.badge}
                  </m.span>
                )}

                <m.h3
                  initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: delay + 0.2, type: 'spring', stiffness: 120, damping: 20 }}
                  className="max-w-[260px] text-[18px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[20px] lg:text-[22px]"
                >
                  {config.headline}
                </m.h3>

                <m.p
                  initial={prefersReduced ? false : { opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: delay + 0.3 }}
                  className="mt-1.5 max-w-[240px] text-[11px] font-medium leading-[1.5] text-white/60 sm:text-[12px]"
                >
                  {config.subtext}
                </m.p>

                <m.div
                  initial={prefersReduced ? false : { opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: delay + 0.35 }}
                  className="mt-3"
                >
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold text-white transition-all duration-300 group-hover:gap-2.5 sm:text-[12px]"
                    style={{ background: config.gradient }}
                  >
                    {config.cta}
                    <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                </m.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: config.gradient }} />
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
            </div>
          </Link>
        )
      })}
    </m.div>
  )
}
