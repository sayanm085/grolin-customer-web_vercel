'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  m,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  Leaf,
  Package,
  ShieldCheck,
  Star,
  Truck,
  Zap,
  Heart,
  Sparkles,
  Timer,
  MapPin,
  BadgeCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SHOPFRONT_PROMISE_BANNER } from '@/lib/shopfront/shopfront-content'

// ══════════════════════════════════════════════════════════════════
//  BRAND PALETTE — Lighter, warmer purple shades
// ══════════════════════════════════════════════════════════════════

const DK = {
  base: '#1F1245',          // slightly lighter than before — more visible purple
  surface: '#261552',       // card surfaces — distinct from base
  accent: '#7B59E6',        // active states
  accentSoft: '#9B6DFF',    // tags, links
  accentGlow: 'rgba(123,89,230,0.15)',
  cardBg: 'rgba(123,89,230,0.08)',
  cardBorder: 'rgba(123,89,230,0.16)',
  cardBorderHover: 'rgba(123,89,230,0.35)',
  hoverGlow: '0 8px 40px rgba(123,89,230,0.22)',
  text: '#FFFFFF',
  textBody: 'rgba(255,255,255,0.72)',
  textMuted: 'rgba(255,255,255,0.48)',
  textFaint: 'rgba(255,255,255,0.22)',
  pillBg: 'rgba(123,89,230,0.18)',
  divider: 'rgba(123,89,230,0.18)',
  glowOrb: 'rgba(123,89,230,0.12)',
} as const

// ══════════════════════════════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════════════════════════════

const HEADLINE_WORDS = SHOPFRONT_PROMISE_BANNER.title.split(' ')

const JOURNEY_STEPS = [
  {
    icon: Leaf,
    label: 'Sourced Fresh',
    tagline: 'Straight from Bengal farms',
    description: 'Direct from verified local farms and trusted suppliers across West Bengal. Every supplier meets our quality standards.',
    tag: 'SOURCING',
    image: '/images/promise/sourcing.png',
    stat: '120+',
    statLabel: 'Local Farms',
  },
  {
    icon: ShieldCheck,
    label: 'Quality Checked',
    tagline: '3-point freshness protocol',
    description: 'Every item passes our rigorous 3-point freshness check before it enters the dark store. No compromises.',
    tag: 'QUALITY',
    image: '/images/promise/quality.png',
    stat: '99.2%',
    statLabel: 'Pass Rate',
  },
  {
    icon: Package,
    label: 'Packed with Care',
    tagline: 'Temperature-controlled packaging',
    description: 'Sustainable, temperature-controlled packing in eco-friendly materials. Every item handled individually.',
    tag: 'PACKING',
    image: '/images/promise/packing.png',
    stat: '100%',
    statLabel: 'Eco Packaging',
  },
  {
    icon: Truck,
    label: 'At Your Door',
    tagline: 'Under 30 minutes, guaranteed',
    description: 'Delivered by trained handlers who understand perishables. Real-time tracking from dispatch to doorstep.',
    tag: 'DELIVERY',
    image: '/images/promise/delivery.png',
    stat: '< 30',
    statLabel: 'Minutes Avg.',
  },
]

const BENTO_ITEMS = [
  {
    icon: Zap,
    title: '30-Minute Delivery',
    tagline: 'Dark store to doorstep',
    description: 'From our dark store to your door in under 30 minutes. Every order tracked in real-time with live map updates.',
    accent: 'var(--shop-action)',
    span: 'hero' as const,
    image: '/images/promise/speed-delivery.png',
    stat: '< 30 min',
    tag: 'SPEED',
  },
  {
    icon: Leaf,
    title: 'Farm-Fresh Guarantee',
    tagline: '120+ verified Bengal farms',
    description: 'Direct sourcing from local farms. Every item passes our 3-point freshness check before reaching you.',
    accent: '#16945E',
    span: 'normal' as const,
    image: '/images/promise/fresh-produce.png',
    stat: '99.2% fresh',
    tag: 'QUALITY',
  },
  {
    icon: ShieldCheck,
    title: 'No-Questions Refunds',
    tagline: 'Your trust, guaranteed',
    description: "Not happy? Instant refund. No photos, no calls. We trust you as much as you trust us.",
    accent: '#6E49D8',
    span: 'normal' as const,
    image: '/images/promise/happy-customer.png',
    stat: '100% hassle-free',
    tag: 'TRUST',
  },
  {
    icon: Package,
    title: '4,000+ Products',
    tagline: 'Everything your kitchen needs',
    description: 'From daily essentials to gourmet ingredients — spices, lentils, rice, snacks, beverages, and more.',
    accent: '#D97706',
    span: 'normal' as const,
    image: '/images/promise/product-variety.png',
    stat: '4K+ items',
    tag: 'VARIETY',
  },
  {
    icon: Truck,
    title: 'Free Delivery Over ₹299',
    tagline: 'Zero hidden charges',
    description: 'No delivery fees, no surge pricing, no service charges. What you see is what you pay — always.',
    accent: '#E5484D',
    span: 'wide' as const,
    image: '/images/promise/doorstep-bag.png',
    stat: '₹0 delivery',
    tag: 'SAVINGS',
  },
  {
    icon: Clock,
    title: 'Schedule or Instant',
    tagline: 'Plan ahead, up to 3 days',
    description: 'Need it now or planning ahead? Schedule orders up to 3 days in advance and pick your preferred time slot.',
    accent: '#3B82F6',
    span: 'normal' as const,
    image: '/images/promise/schedule-couch.png',
    stat: '3-day advance',
    tag: 'FLEXIBLE',
  },
]

const STATS = [
  { value: 30, unit: 'min', label: 'Average Delivery', decimals: 0, icon: Timer },
  { value: 4.8, unit: '★', label: 'Customer Rating', decimals: 1, icon: Star },
  { value: 4000, unit: '+', label: 'Products Available', decimals: 0, display: '4K', icon: Package },
  { value: 98, unit: '%', label: 'On-Time Rate', decimals: 0, icon: BadgeCheck },
]

const FAQ_ITEMS = [
  {
    question: 'How fast is Grolin delivery?',
    answer: 'We deliver within 30 minutes across South Kolkata. Our dark-store model keeps inventory close to you, so your groceries are picked, packed, and dispatched in minutes — not hours.',
    tag: 'DELIVERY',
    icon: Truck,
    image: '/images/faq/fast-delivery.png',
  },
  {
    question: "What if my produce isn't fresh?",
    answer: "Every item goes through a 3-point freshness check before dispatch. If anything doesn't meet your standards, we'll replace it or refund you instantly — no questions, no photos needed.",
    tag: 'QUALITY',
    icon: ShieldCheck,
    image: '/images/faq/fresh-produce.png',
  },
  {
    question: 'Is there a minimum order value?',
    answer: "There's no minimum order. Whether you need a single lemon or a full weekly shop, we'll deliver it. Orders above ₹299 enjoy free delivery.",
    tag: 'ORDERING',
    icon: Package,
    image: '/images/faq/minimum-order.png',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI (Google Pay, PhonePe, Paytm), all major credit and debit cards, net banking, and cash on delivery. All digital payments are processed through Razorpay with bank-grade encryption.',
    tag: 'PAYMENTS',
    icon: ShieldCheck,
    image: '/images/faq/payment-methods.png',
  },
  {
    question: 'Can I schedule a delivery for later?',
    answer: 'Yes! While instant delivery is our default, you can schedule orders for a preferred time slot up to 3 days in advance. Perfect for planning your weekly groceries.',
    tag: 'DELIVERY',
    icon: Clock,
    image: '/images/faq/schedule-delivery.png',
  },
  {
    question: 'Which areas do you deliver to?',
    answer: "We currently serve South Kolkata including Gariahat, Ballygunge, Jadavpur, Dhakuria, Lake Gardens, Golpark, Rashbehari, and surrounding areas. We're expanding to North Kolkata soon.",
    tag: 'COVERAGE',
    icon: MapPin,
    image: '/images/faq/delivery-areas.png',
  },
  {
    question: 'How do I return or exchange items?',
    answer: 'Simply tap "Report Issue" on your order within 24 hours. For quality issues, we process instant refunds to your original payment method. For wrong items, we\'ll send the correct one on priority.',
    tag: 'SUPPORT',
    icon: Heart,
    image: '/images/faq/returns-exchange.png',
  },
]

// ══════════════════════════════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════════════════════════════

function useCursorSpotlight(ref: React.RefObject<HTMLElement | null>) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      setActive(true)
    }
    const onLeave = () => setActive(false)

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, prefersReduced])

  return { pos, active }
}

function AnimatedCounter({
  target,
  decimals = 0,
  display,
  triggered,
}: {
  target: number
  decimals?: number
  display?: string
  triggered: boolean
}) {
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 30, mass: 1.2 })
  const [displayVal, setDisplayVal] = useState('0')

  useEffect(() => {
    if (triggered) motionVal.set(target)
  }, [triggered, target, motionVal])

  useEffect(() => {
    const unsub = springVal.on('change', (v) => {
      if (display && v >= target * 0.95) {
        setDisplayVal(display)
      } else if (decimals > 0) {
        setDisplayVal(v.toFixed(decimals))
      } else {
        setDisplayVal(Math.round(v).toLocaleString())
      }
    })
    return unsub
  }, [springVal, decimals, display, target])

  return <>{displayVal}</>
}

// ══════════════════════════════════════════════════════════════════
//  BEAT 1 — THE CINEMATIC HERO
// ══════════════════════════════════════════════════════════════════

function ActOneHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const imgX = useTransform(mouseX, (v) => v * 0.012)
  const imgY = useTransform(mouseY, (v) => v * 0.012)
  const smoothX = useSpring(imgX, { stiffness: 35, damping: 30 })
  const smoothY = useSpring(imgY, { stiffness: 35, damping: 30 })

  useEffect(() => {
    if (prefersReduced) return
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [mouseX, mouseY, prefersReduced])

  const { pos, active } = useCursorSpotlight(sectionRef)

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: DK.base, minHeight: '85vh' }}
    >
      <m.div
        className="absolute inset-0"
        style={{ x: prefersReduced ? 0 : smoothX, y: prefersReduced ? 0 : smoothY, scale: 1.06 }}
      >
        <Image
          src="/images/trust/promise-hero.png"
          alt="Fresh vegetables, herbs, bread, and produce — the Grolin quality promise"
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
          style={{ objectPosition: '30% center', filter: 'saturate(0.85) brightness(0.6)' }}
        />
      </m.div>

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(100deg,
              rgba(31,18,69,0.2) 0%,
              rgba(31,18,69,0.5) 30%,
              rgba(31,18,69,0.82) 50%,
              rgba(31,18,69,0.95) 65%,
              ${DK.base} 80%
            ),
            linear-gradient(to bottom, transparent 60%, ${DK.base} 100%)
          `,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 700px 500px at 80% 25%, ${DK.glowOrb}, transparent),
            radial-gradient(ellipse 500px 350px at 60% 80%, rgba(217,119,6,0.04), transparent)
          `,
        }}
      />

      {active && (
        <div
          className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-500"
          style={{ background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(123,89,230,0.04), transparent 55%)` }}
        />
      )}

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-[1280px] items-center px-5 py-20 lg:px-8">
        <div className="ml-auto w-full max-w-[580px]">
          <m.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 120, damping: 24 }}
            className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: DK.accentSoft }}
          >
            {SHOPFRONT_PROMISE_BANNER.eyebrow}
          </m.p>

          <h2 className="text-[38px] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[48px] lg:text-[54px]">
            {HEADLINE_WORDS.map((word, i) => (
              <m.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ type: 'spring', stiffness: 100, damping: 22, delay: prefersReduced ? 0 : 0.15 + i * 0.055 }}
                className="mr-[0.28em] inline-block"
              >
                {word}
              </m.span>
            ))}
          </h2>

          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 22, delay: prefersReduced ? 0 : 0.6 }}
            className="mt-5 max-w-[480px] text-[15px] leading-[1.7]"
            style={{ color: DK.textMuted }}
          >
            {SHOPFRONT_PROMISE_BANNER.subtitle}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 22, delay: prefersReduced ? 0 : 0.75 }}
            className="mt-7 space-y-2.5"
          >
            {SHOPFRONT_PROMISE_BANNER.points.map((point) => (
              <p key={point} className="flex items-center gap-2.5 text-[14px]" style={{ color: DK.textBody }}>
                <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: DK.accent }} strokeWidth={1.8} />
                {point}
              </p>
            ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 22, delay: prefersReduced ? 0 : 0.9 }}
            className="mt-8"
          >
            <Link
              href={SHOPFRONT_PROMISE_BANNER.ctaHref}
              className="group inline-flex items-center gap-2 text-[14px] font-semibold transition-colors duration-200 hover:text-white"
              style={{ color: DK.textBody }}
            >
              {SHOPFRONT_PROMISE_BANNER.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </Link>
          </m.div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  BEAT 1 (cont.) — IMMERSIVE JOURNEY (Image cards with overlays)
// ══════════════════════════════════════════════════════════════════

function JourneyStripDark() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()

  return (
    <div ref={ref} className="relative overflow-hidden pb-20 pt-12" style={{ background: DK.base }}>
      {/* Radiance */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 900px 300px at 50% 0%, ${DK.glowOrb}, transparent)` }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Section header */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 120, damping: 24 }}
          className="mb-4 text-center"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ background: DK.pillBg, color: DK.accentSoft }}
          >
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            Our 4-Step Promise
          </span>
        </m.div>
        <m.h3
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.08 }}
          className="mb-3 text-center font-extrabold tracking-tight text-white"
          style={{ fontSize: 'clamp(24px, 4vw, 38px)' }}
        >
          From Farm to Your Kitchen
        </m.h3>
        <m.p
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.14 }}
          className="mx-auto mb-12 max-w-lg text-center text-[14px] leading-relaxed"
          style={{ color: DK.textMuted }}
        >
          Every item you receive goes through a meticulous 4-step journey — because your family deserves nothing less.
        </m.p>

        {/* Animated connecting line (desktop) */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: prefersReduced ? 0 : 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="absolute top-[310px] left-[10%] right-[10%] hidden h-[2px] origin-left lg:block"
          style={{ background: `linear-gradient(90deg, ${DK.accent}, ${DK.accentSoft}, ${DK.accent})` }}
        />

        {/* Journey cards — image-rich */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY_STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <m.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 22,
                  delay: prefersReduced ? 0 : 0.2 + i * 0.12,
                }}
                className="group relative overflow-hidden rounded-[20px] transition-all duration-400 hover:-translate-y-[4px]"
                style={{
                  border: `1px solid ${DK.cardBorder}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
              >
                {/* Food photo */}
                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 30%, ${DK.surface} 100%)`,
                    }}
                  />
                  {/* Step number badge */}
                  <m.span
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: prefersReduced ? 0 : 0.35 + i * 0.12 }}
                    className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ background: DK.accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </m.span>
                  {/* Tag pill */}
                  <span
                    className="absolute top-3 right-3 rounded-full px-2.5 py-[3px] text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm"
                    style={{ background: 'rgba(0,0,0,0.4)', color: DK.accentSoft }}
                  >
                    {step.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="relative p-5" style={{ background: DK.surface }}>
                  {/* Icon + label row */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(123,89,230,0.3)]"
                      style={{ background: DK.pillBg, color: DK.accentSoft }}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <h4 className="text-[15px] font-bold text-white">{step.label}</h4>
                      <p className="text-[11px]" style={{ color: DK.accentSoft }}>{step.tagline}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-[12.5px] leading-relaxed" style={{ color: DK.textMuted }}>
                    {step.description}
                  </p>

                  {/* Mini stat */}
                  <div className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: DK.cardBg }}>
                    <span className="text-[20px] font-extrabold text-white">{step.stat}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: DK.textMuted }}>
                      {step.statLabel}
                    </span>
                  </div>
                </div>
              </m.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  BEAT 2 — IMAGE-RICH BENTO GRID (Cinematic grocery showcase)
// ══════════════════════════════════════════════════════════════════

function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()

  return (
    <div ref={ref}>
      {/* Section header */}
      <m.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 120, damping: 24 }}
        className="mb-10 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--shop-primary-soft)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--shop-primary)]">
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          Why Choose Grolin
        </span>
        <h3
          className="mt-3 font-extrabold tracking-tight text-[color:var(--shop-ink)]"
          style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}
        >
          Built for how{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #6E49D8 0%, #9B6DFF 100%)' }}
          >
            Kolkata shops
          </span>
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-[14px] leading-relaxed text-[color:var(--shop-ink-muted)]">
          We&apos;re not just another delivery app. Every feature is built around what matters to Kolkata families — freshness, speed, and trust.
        </p>
      </m.div>

      {/* Bento grid — every card image-rich */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BENTO_ITEMS.map((item, i) => {
          const Icon = item.icon
          const isHero = item.span === 'hero'
          const isWide = item.span === 'wide'

          // ──── Hero card: full bleed cinematic ────
          if (isHero) {
            return (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.1 }}
                className="group relative sm:row-span-2 overflow-hidden rounded-[20px] transition-all duration-300 hover:-translate-y-[4px]"
                style={{ boxShadow: '0 8px 40px rgba(110,73,216,0.20)' }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={item.image!}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${DK.base} 10%, rgba(31,18,69,0.82) 45%, rgba(31,18,69,0.4) 100%)` }}
                  />
                </div>

                {/* Tag badge */}
                <span
                  className="absolute top-4 right-4 z-20 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] backdrop-blur-md"
                  style={{ background: 'rgba(123,89,230,0.25)', color: '#fff' }}
                >
                  {item.tag}
                </span>

                <div className="relative z-10 flex min-h-[340px] flex-col justify-end p-7">
                  <m.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: prefersReduced ? 0 : 0.3 }}
                    className="flex h-12 w-12 items-center justify-center rounded-[14px] transition-transform duration-200 group-hover:scale-[1.08]"
                    style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
                  >
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                  </m.span>

                  <h4 className="mt-4 text-[24px] font-bold leading-snug text-white">
                    <m.span
                      animate={prefersReduced ? {} : { scale: [1, 1.04, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-block text-[30px]"
                      style={{ color: DK.accentSoft }}
                    >
                      30
                    </m.span>
                    -Minute Delivery
                  </h4>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: DK.accentSoft }}>
                    {item.tagline}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {item.description}
                  </p>

                  {/* Stat badge */}
                  <div className="mt-4 inline-flex items-center gap-2 self-start rounded-lg px-3 py-1.5" style={{ background: 'rgba(123,89,230,0.15)', backdropFilter: 'blur(8px)' }}>
                    <span className="text-[16px] font-extrabold text-white">{item.stat}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: DK.accentSoft }}>avg. delivery</span>
                  </div>

                  <Link
                    href="/products"
                    className="mt-4 group/cta inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200 hover:text-white"
                    style={{ color: DK.accentSoft }}
                  >
                    Shop Now
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1" strokeWidth={2} />
                  </Link>
                </div>
              </m.div>
            )
          }

          // ──── Wide card: horizontal layout with image ────
          if (isWide) {
            return (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.1 + i * 0.05 }}
                className="group lg:col-span-2 overflow-hidden rounded-[20px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] shadow-[var(--shop-shadow-level-1)] transition-all duration-300 hover:-translate-y-[3px]"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(110,73,216,0.12), 0 4px 12px rgba(26,35,43,0.08)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shop-shadow-level-1)'
                }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image side */}
                  <div className="relative h-[200px] overflow-hidden sm:h-auto sm:w-[45%] sm:min-h-[200px]">
                    <Image
                      src={item.image!}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                    {/* Tag */}
                    <span
                      className="absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-md"
                      style={{ background: 'rgba(0,0,0,0.45)', color: '#fff' }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  {/* Content side */}
                  <div className="flex flex-1 flex-col justify-center p-6">
                    <m.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: prefersReduced ? 0 : 0.2 + i * 0.08 }}
                      className="flex h-11 w-11 items-center justify-center rounded-[14px] transition-transform duration-200 group-hover:scale-[1.12]"
                      style={{ backgroundColor: `color-mix(in srgb, ${item.accent} 12%, transparent)` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.accent }} strokeWidth={1.8} />
                    </m.span>
                    <h4 className="mt-3 text-[18px] font-bold text-[color:var(--shop-ink)]">{item.title}</h4>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--shop-primary)]">
                      {item.tagline}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--shop-ink-muted)]">{item.description}</p>
                    <div className="mt-3 inline-flex items-center gap-2 self-start rounded-lg bg-[color:var(--shop-primary-soft)] px-3 py-1.5">
                      <span className="text-[14px] font-extrabold text-[color:var(--shop-primary)]">{item.stat}</span>
                    </div>
                  </div>
                </div>
              </m.div>
            )
          }

          // ──── Regular cards: image header + content ────
          return (
            <m.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.1 + i * 0.05 }}
              className="group overflow-hidden rounded-[20px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] shadow-[var(--shop-shadow-level-1)] transition-all duration-300 hover:-translate-y-[3px]"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(110,73,216,0.12), 0 4px 12px rgba(26,35,43,0.08)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shop-shadow-level-1)'
              }}
            >
              {/* Image header */}
              <div className="relative h-[140px] overflow-hidden">
                <Image
                  src={item.image!}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Subtle gradient fade to content */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--shop-surface) 100%)' }}
                />
                {/* Tag */}
                <span
                  className="absolute top-3 right-3 z-10 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-md"
                  style={{ background: 'rgba(0,0,0,0.45)', color: '#fff' }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 pt-3">
                <div className="flex items-center gap-2.5">
                  <m.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: prefersReduced ? 0 : 0.2 + i * 0.08 }}
                    className="flex h-10 w-10 items-center justify-center rounded-[12px] transition-transform duration-200 group-hover:scale-[1.12]"
                    style={{ backgroundColor: `color-mix(in srgb, ${item.accent} 12%, transparent)` }}
                  >
                    <Icon className="h-4.5 w-4.5" style={{ color: item.accent }} strokeWidth={1.8} />
                  </m.span>
                  <div>
                    <h4 className="text-[15px] font-bold text-[color:var(--shop-ink)]">{item.title}</h4>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--shop-primary)]">
                      {item.tagline}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[color:var(--shop-ink-muted)]">{item.description}</p>
                {/* Stat badge */}
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--shop-primary-soft)] px-2.5 py-1">
                  <span className="text-[12px] font-extrabold text-[color:var(--shop-primary)]">{item.stat}</span>
                </div>
              </div>
            </m.div>
          )
        })}
      </div>

      {/* Integrated CTA — flows naturally from the bento grid */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.5 }}
        className="mt-10 rounded-[16px] p-5 sm:p-6 text-center"
        style={{
          background: 'linear-gradient(180deg, rgba(110,73,216,0.08) 0%, rgba(110,73,216,0.04) 100%)',
          border: '1px solid rgba(110,73,216,0.12)',
        }}
      >
        <p className="text-[17px] font-bold text-[color:var(--shop-ink)] sm:text-[20px]">
          Ready to try{' '}
          <span className="text-[color:var(--shop-primary)]">the Grolin difference</span>?
        </p>
        <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-[color:var(--shop-ink-muted)]">
          5,000+ Kolkata families already made the switch.
        </p>
        <Link
          href="/products"
          className="group/promo mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--shop-primary)] px-6 py-2.5 text-[14px] font-bold text-white shadow-[var(--shop-shadow-glow-green)] transition-all duration-200 hover:shadow-[var(--shop-shadow-glow-green-hover)] hover:-translate-y-[1px]"
        >
          Start Shopping
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/promo:translate-x-1" strokeWidth={2} />
        </Link>
      </m.div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  BEAT 3 — STATS (Dark, with background image)
// ══════════════════════════════════════════════════════════════════

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReduced = useReducedMotion()

  return (
    <div ref={ref} className="relative overflow-hidden px-5 pt-20 pb-6 sm:px-6 lg:px-8">
      {/* Background food photography — visible grocery context */}
      <div className="absolute inset-0">
        <Image
          src="/images/promise/grocery-spread.png"
          alt="Fresh grocery spread"
          fill
          className="object-cover"
          sizes="100vw"
          style={{ filter: 'brightness(0.45) saturate(0.85)' }}
        />
        {/* Lighter overlay so food is visible but text remains readable */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${DK.base} 0%, rgba(31,18,69,0.65) 30%, rgba(31,18,69,0.55) 60%, ${DK.base} 100%)` }}
        />
      </div>

      {/* Stats header */}
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 120, damping: 24 }}
        className="relative z-10 mb-8 text-center"
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ background: DK.pillBg, color: DK.accentSoft }}
        >
          <BadgeCheck className="h-3 w-3" strokeWidth={2} />
          Numbers That Matter
        </span>
        <h3 className="mt-3 font-extrabold tracking-tight text-white" style={{ fontSize: 'clamp(22px, 3.5vw, 32px)' }}>
          Trusted by thousands of{' '}
          <span style={{ color: DK.accentSoft }}>Kolkata families</span>
        </h3>
      </m.div>

      {/* Stats grid */}
      <div className="relative z-10 mx-auto max-w-[1000px]">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat, i) => {
            const StatIcon = stat.icon
            return (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 120, damping: 22, delay: prefersReduced ? 0 : 0.1 + i * 0.08 }}
                className="group flex flex-col items-center rounded-[16px] px-4 py-6 text-center transition-all duration-300 hover:-translate-y-[2px]"
                style={{ background: DK.cardBg, border: `1px solid ${DK.cardBorder}` }}
              >
                <span
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(123,89,230,0.25)]"
                  style={{ background: DK.pillBg, color: DK.accentSoft }}
                >
                  <StatIcon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
                <p className="text-[36px] font-extrabold tabular-nums tracking-tight text-white">
                  <AnimatedCounter target={stat.value} decimals={stat.decimals} display={stat.display} triggered={inView} />
                  <span className="text-[18px] font-bold" style={{ color: DK.accent }}>{stat.unit}</span>
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: DK.textMuted }}>
                  {stat.label}
                </p>
              </m.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  BEAT 3 — Pull Quote
// ══════════════════════════════════════════════════════════════════

function PullQuote() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 24 }}
      className="relative mx-auto my-16 max-w-[800px] px-5 sm:px-6 lg:px-8"
    >
      <span className="absolute -top-6 left-2 select-none text-[120px] font-black leading-none sm:left-4" style={{ color: 'rgba(123,89,230,0.06)' }}>
        &ldquo;
      </span>
      <div className="relative py-2 pl-6" style={{ borderLeft: `3px solid ${DK.accent}` }}>
        <p className="text-[18px] font-medium italic leading-[1.7] sm:text-[22px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
          &ldquo;I switched from BigBasket two months ago. The produce quality is genuinely
          different — you can tell someone actually checks what goes into the bag.&rdquo;
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className="h-3.5 w-3.5 fill-current text-amber-400" strokeWidth={0} />
            ))}
          </div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: DK.textMuted }}>
            — Shreya M., Gariahat
          </p>
        </div>
      </div>
    </m.div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  BEAT 3 — FAQ Cinematic Magazine (Auto-Advance + Image-Rich)
// ══════════════════════════════════════════════════════════════════

const FAQ_AUTO_INTERVAL = 5000 // 5 seconds

function FAQProgressBar({ duration, paused }: { duration: number; paused: boolean }) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (paused) {
      setStarted(false)
      return
    }
    // Small delay so the bar starts from 0 width before transitioning to 100%
    const raf = requestAnimationFrame(() => setStarted(true))
    return () => cancelAnimationFrame(raf)
  }, [paused])

  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full" style={{ background: DK.cardBorder }}>
      <div
        className="h-full rounded-full"
        style={{
          width: started ? '100%' : '0%',
          background: `linear-gradient(90deg, ${DK.accent}, ${DK.accentSoft})`,
          transition: started ? `width ${duration}ms linear` : 'none',
        }}
      />
    </div>
  )
}

function FAQFloatingParticles() {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
      {[...Array(5)].map((_, i) => (
        <m.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + i * 1.5,
            height: 3 + i * 1.5,
            background: DK.accentSoft,
            opacity: 0.08 + i * 0.02,
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20 - i * 8, 0],
            x: [0, 6 + i * 3, 0],
            opacity: [0.06 + i * 0.02, 0.12 + i * 0.02, 0.06 + i * 0.02],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  )
}

function ActThreeFAQ() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [timerKey, setTimerKey] = useState(0) // reset progress bar
  const ref = useRef<HTMLDivElement>(null)
  const answerPanelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()
  const { pos: spotlightPos, active: spotlightActive } = useCursorSpotlight(answerPanelRef)

  // Auto-advance via setTimeout — bulletproof, immune to StrictMode double-fire
  useEffect(() => {
    if (isPaused || !inView || prefersReduced) return

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % FAQ_ITEMS.length)
      setTimerKey((k) => k + 1)
    }, FAQ_AUTO_INTERVAL)

    return () => clearTimeout(timer)
  }, [activeIndex, timerKey, isPaused, inView, prefersReduced])

  // Reset timer when user manually selects a question
  const handleSelectQuestion = (i: number) => {
    setActiveIndex(i)
    setTimerKey((k) => k + 1)
  }

  return (
    <div ref={ref} className="pb-20 pt-4 md:pt-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 120, damping: 24 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5" style={{ background: DK.pillBg }}>
            <HelpCircle className="h-3.5 w-3.5" style={{ color: DK.accentSoft }} strokeWidth={1.8} />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: DK.accentSoft }}>
              Common Questions
            </span>
          </div>
          <h3 className="mt-3 font-extrabold tracking-tight text-white" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
            Everything you need to know
          </h3>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed" style={{ color: DK.textMuted }}>
            Real answers to the questions Kolkata shoppers ask before their first order.
          </p>
        </m.div>

        {/* Desktop: Two-column cinematic layout */}
        <div className="hidden lg:grid lg:grid-cols-[0.38fr_0.62fr] lg:gap-8">
          {/* Left: Question list with progress indicators */}
          <m.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.1 }}
            className="space-y-1"
          >
            {FAQ_ITEMS.map((item, i) => {
              const isActive = activeIndex === i
              const QuestionIcon = item.icon
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectQuestion(i)}
                  className="group relative flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200"
                  style={{
                    background: isActive ? DK.cardBg : 'transparent',
                  }}
                >
                  {/* Sliding active indicator bar */}
                  {isActive && (
                    <m.div
                      layoutId="faq-active-bar"
                      className="absolute left-0 top-[12%] h-[76%] w-[3px] rounded-full"
                      style={{ background: DK.accent }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      background: isActive ? DK.pillBg : 'transparent',
                      color: isActive ? DK.accentSoft : DK.textFaint,
                    }}
                  >
                    <QuestionIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </span>
                  <span
                    className="text-[14px] font-semibold leading-snug transition-colors duration-200"
                    style={{ color: isActive ? DK.text : DK.textMuted }}
                  >
                    {item.question}
                  </span>
                </button>
              )
            })}

            {/* Auto-advance progress bar */}
            <div className="mx-4 mt-3 pt-3" style={{ borderTop: `1px solid ${DK.divider}` }}>
              {!prefersReduced && (
                <div className="mb-3">
                  <FAQProgressBar
                    key={timerKey}
                    duration={FAQ_AUTO_INTERVAL}
                    paused={isPaused || !inView}
                  />
                </div>
              )}
              <p className="text-[13px]" style={{ color: DK.textMuted }}>
                Still have questions?{' '}
                <Link
                  href="/profile"
                  className="group/link inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline"
                  style={{ color: DK.accentSoft }}
                >
                  Contact support
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-1" strokeWidth={2} />
                </Link>
              </p>
            </div>
          </m.div>

          {/* Right: Cinematic Answer Panel with Image */}
          <m.div
            ref={answerPanelRef}
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.2 }}
            className="relative overflow-hidden rounded-[20px]"
            style={{ background: DK.cardBg, border: `1px solid ${DK.cardBorder}` }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Cursor spotlight effect */}
            {spotlightActive && (
              <div
                className="pointer-events-none absolute z-[1] transition-opacity duration-300"
                style={{
                  width: 320,
                  height: 320,
                  borderRadius: '50%',
                  left: spotlightPos.x - 160,
                  top: spotlightPos.y - 160,
                  background: `radial-gradient(circle, ${DK.accentGlow} 0%, transparent 70%)`,
                  opacity: 0.5,
                }}
              />
            )}

            {/* Floating particles */}
            <FAQFloatingParticles />

            {/* Crossfade slide transition — no empty card gap */}
            <AnimatePresence mode="popLayout" initial={false}>
              <m.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40, position: 'absolute', top: 0, left: 0, right: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Hero Image Header */}
                <div className="relative h-[200px] overflow-hidden">
                  <m.div
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={FAQ_ITEMS[activeIndex]?.image || '/images/promise/grocery-spread.png'}
                      alt={FAQ_ITEMS[activeIndex]?.question || 'FAQ'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </m.div>
                  {/* Cinematic gradient overlay */}
                  <div
                    className="absolute inset-0 z-[2]"
                    style={{
                      background: `linear-gradient(to bottom, rgba(31,18,69,0.3) 0%, rgba(31,18,69,0.6) 50%, ${DK.cardBg === 'rgba(123,89,230,0.08)' ? '#1a1035' : DK.base} 100%)`,
                    }}
                  />
                  {/* Step counter overlay */}
                  <span
                    className="absolute right-6 bottom-4 z-[3] select-none text-[72px] font-black leading-none"
                    style={{ color: 'rgba(255,255,255,0.06)' }}
                  >
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content area */}
                <div className="relative z-[4] px-8 pb-8 pt-5">
                  {(() => {
                    const activeItem = FAQ_ITEMS[activeIndex]
                    if (!activeItem) return null
                    const ActiveIcon = activeItem.icon
                    return (
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span
                            className="flex h-9 w-9 items-center justify-center rounded-full"
                            style={{ background: DK.pillBg, color: DK.accentSoft }}
                          >
                            <ActiveIcon className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                          <span
                            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                            style={{ background: DK.pillBg, color: DK.accentSoft }}
                          >
                            {activeItem.tag}
                          </span>
                        </div>
                        <h4 className="mt-4 text-[22px] font-bold leading-snug text-white">{activeItem.question}</h4>
                        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.75]" style={{ color: DK.textBody }}>
                          {activeItem.answer}
                        </p>
                      </div>
                    )
                  })()}

                  {/* Bottom pagination dots */}
                  <div className="mt-6 flex items-center gap-1.5">
                    {FAQ_ITEMS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectQuestion(i)}
                        aria-label={`Go to question ${i + 1}`}
                        className={cn('h-[5px] rounded-full transition-all duration-300', activeIndex === i ? 'w-7' : 'w-[5px] hover:opacity-60')}
                        style={{ background: activeIndex === i ? DK.accent : DK.textFaint }}
                      />
                    ))}
                    <span className="ml-auto text-[11px] font-semibold tabular-nums" style={{ color: DK.textFaint }}>
                      {String(activeIndex + 1).padStart(2, '0')} / {String(FAQ_ITEMS.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </m.div>
        </div>

        {/* Mobile: Cinematic Accordion */}
        <div className="flex flex-col gap-2.5 lg:hidden">
          {FAQ_ITEMS.map((item, i) => {
            const isActive = activeIndex === i
            const MobIcon = item.icon
            return (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.05 * i }}
                className="overflow-hidden rounded-[16px] transition-all duration-250"
                style={{
                  border: `1px solid ${isActive ? DK.cardBorderHover : DK.cardBorder}`,
                  borderLeft: `3px solid ${isActive ? DK.accent : 'transparent'}`,
                  background: isActive ? DK.cardBg : 'transparent',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleSelectQuestion(isActive ? -1 : i)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                  aria-expanded={isActive}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ background: isActive ? DK.pillBg : 'transparent', color: isActive ? DK.accentSoft : DK.textFaint }}
                  >
                    <MobIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </span>
                  <span className="flex-1 text-[14px] font-semibold leading-snug text-white">{item.question}</span>
                  <ChevronDown
                    className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isActive && 'rotate-180')}
                    style={{ color: isActive ? DK.accentSoft : DK.textMuted }}
                    strokeWidth={1.8}
                  />
                </button>
                <AnimatePresence>
                  {isActive && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.15 } }}
                      className="overflow-hidden"
                    >
                      {/* Mobile image thumbnail */}
                      <div className="relative mx-4 mb-3 h-[120px] overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt={item.question}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(31,18,69,0.7) 100%)` }}
                        />
                        <span
                          className="absolute bottom-2 left-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm"
                          style={{ background: 'rgba(123,89,230,0.3)', color: '#fff' }}
                        >
                          {item.tag}
                        </span>
                      </div>
                      <div className="px-4 pb-4 pl-14">
                        <p className="text-[13px] leading-relaxed" style={{ color: DK.textBody }}>{item.answer}</p>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            )
          })}

          {/* Mobile progress indicator */}
          {!prefersReduced && inView && (
            <div className="mx-2 mt-2">
              <FAQProgressBar
                key={`mob-${timerKey}`}
                duration={FAQ_AUTO_INTERVAL}
                paused={isPaused}
              />
            </div>
          )}

          <div className="mt-3 text-center">
            <p className="text-[13px]" style={{ color: DK.textMuted }}>
              Still have questions?{' '}
              <Link href="/profile" className="font-semibold underline-offset-2 hover:underline" style={{ color: DK.accentSoft }}>
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  MAIN EXPORT — 3-Beat Cinematic Rhythm
// ══════════════════════════════════════════════════════════════════

export function HomePromiseBanner() {
  return (
    <section aria-label="The Grolin quality promise">
      {/* ═══ BEAT 1: The Dark World ═══ */}
      <ActOneHero />
      <JourneyStripDark />

      {/* Smooth gradient transition: dark → light */}
      <div className="h-20 pointer-events-none" style={{
        background: `linear-gradient(to bottom, #1F1245 0%, #3D2870 25%, #7A6199 45%, #B5A8C5 60%, #DDD6E1 75%, var(--shop-canvas, #F0ECE8) 100%)`,
      }} />

      {/* ═══ BEAT 2: The Light Evidence ═══ */}
      <div className="relative py-14 md:py-20" style={{ background: 'var(--shop-canvas)' }}>
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <BentoGrid />
        </div>
      </div>

      {/* Smooth gradient transition: light → dark */}
      <div className="relative h-20 pointer-events-none" style={{
        background: `linear-gradient(to bottom, var(--shop-canvas, #F0ECE8) 0%, #DDD6E1 20%, #B5A8C5 35%, #7A6199 50%, #3D2870 70%, #1F1245 100%)`,
      }} />

      {/* ═══ BEAT 3: The Deep Conversation ═══ */}
      <div className="relative" style={{ background: DK.base }}>
        <StatsBar />
        <PullQuote />
        <ActThreeFAQ />
      </div>

      {/* Smooth gradient exit: dark promise → warm canvas */}
      <div className="h-20 pointer-events-none" style={{
        background: `linear-gradient(to bottom, #1F1245 0%, #3D2870 20%, #7A6199 40%, #B5A8C5 55%, #DDD6E1 70%, var(--shop-canvas, #F0ECE8) 100%)`,
      }} />
    </section>
  )
}
