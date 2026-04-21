'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  m,
  useMotionValue,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Leaf,
  Timer,
  Star,
  ChevronDown,
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════
//  DESIGN TOKENS — Grolin Brand Dark Palette
// ═══════════════════════════════════════════════════════════════════
const DK = {
  base: '#0F0A1E',
  surface: '#1A1035',
  cardBg: 'rgba(123,89,230,0.06)',
  cardBorder: 'rgba(123,89,230,0.12)',
  accent: '#7B59E6',
  accentSoft: '#9B7FFF',
  accentGlow: 'rgba(123,89,230,0.08)',
  green: '#16945E',
  greenSoft: '#22C77A',
  gold: '#E3B93C',
  text: '#F5F0FF',
  textMuted: 'rgba(245,240,255,0.55)',
  textBody: 'rgba(245,240,255,0.72)',
  pillBg: 'rgba(123,89,230,0.12)',
  divider: 'rgba(123,89,230,0.08)',
}

// ═══════════════════════════════════════════════════════════════════
//  GALLERY IMAGES
// ═══════════════════════════════════════════════════════════════════
const GALLERY = [
  {
    src: '/images/editorial/hero-spread.png',
    alt: 'Premium grocery spread — fresh vegetables, fruits, and spices on dark wood',
    badge: 'Farm-to-Table',
    badgeColor: DK.green,
  },
  {
    src: '/images/editorial/delivery-lifestyle.png',
    alt: 'Happy customer unboxing Grolin grocery delivery',
    badge: 'Doorstep Joy',
    badgeColor: DK.accent,
  },
  {
    src: '/images/editorial/fresh-closeup.png',
    alt: 'Extreme close-up of fresh produce with dewdrops',
    badge: '100% Fresh',
    badgeColor: DK.green,
  },
]

// ═══════════════════════════════════════════════════════════════════
//  PROMISE PILLARS
// ═══════════════════════════════════════════════════════════════════
const PILLARS = [
  {
    icon: Timer,
    stat: '30',
    unit: 'min',
    label: 'Delivery Promise',
    desc: 'From our dark store to your door in 30 minutes or less.',
    gradient: `linear-gradient(135deg, ${DK.green}, ${DK.greenSoft})`,
  },
  {
    icon: Leaf,
    stat: '100',
    unit: '%',
    label: 'Farm Fresh',
    desc: 'Every item inspected by our quality team before packing.',
    gradient: `linear-gradient(135deg, ${DK.green}, #0BD97A)`,
  },
  {
    icon: ShieldCheck,
    stat: '₹0',
    unit: '',
    label: 'No-Question Refund',
    desc: "Not happy? Full refund — no calls, no returns needed.",
    gradient: `linear-gradient(135deg, ${DK.accent}, ${DK.accentSoft})`,
  },
  {
    icon: Star,
    stat: '4.8',
    unit: '★',
    label: 'Kolkata Loves Us',
    desc: 'Rated by 12,000+ families across South Kolkata.',
    gradient: `linear-gradient(135deg, ${DK.gold}, #F5D060)`,
  },
]

// ═══════════════════════════════════════════════════════════════════
//  ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════════
function AnimatedStat({ value, started }: { value: string; started: boolean }) {
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''))
  const prefix = value.startsWith('₹') ? '₹' : ''
  const isDecimal = value.includes('.')
  const [display, setDisplay] = useState(prefix + '0')

  useEffect(() => {
    if (!started || isNaN(numericPart)) {
      setDisplay(prefix + '0')
      return
    }

    let start: number | null = null
    let raf: number

    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1400, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      const current = eased * numericPart

      setDisplay(prefix + (isDecimal ? current.toFixed(1) : String(Math.round(current))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, numericPart, prefix, isDecimal])

  return <span className="tabular-nums">{display}</span>
}

// ═══════════════════════════════════════════════════════════════════
//  CURSOR SPOTLIGHT
// ═══════════════════════════════════════════════════════════════════
function useCursorGlow(ref: React.RefObject<HTMLElement | null>) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      x.set(e.clientX - r.left)
      y.set(e.clientY - r.top)
      setActive(true)
    }
    const leave = () => setActive(false)

    el.addEventListener('mousemove', move, { passive: true })
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [ref, x, y])

  return { x, y, active }
}

// ═══════════════════════════════════════════════════════════════════
//  PILLAR CARD
// ═══════════════════════════════════════════════════════════════════
function PillarCard({
  pillar,
  index,
  inView,
}: {
  pillar: (typeof PILLARS)[number]
  index: number
  inView: boolean
}) {
  const Icon = pillar.icon

  return (
    <m.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 22,
        delay: 0.3 + index * 0.1,
      }}
      className="group relative overflow-hidden rounded-[18px] p-5 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: DK.cardBg,
        border: `1px solid ${DK.cardBorder}`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${DK.accentGlow}, transparent 70%)`,
        }}
      />

      <div className="relative z-[1]">
        {/* Icon + Stat */}
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(123,89,230,0.25)]"
            style={{ background: DK.pillBg }}
          >
            <Icon className="h-4.5 w-4.5" style={{ color: DK.accentSoft }} strokeWidth={1.8} />
          </span>
          <div>
            <span
              className="text-[28px] font-extrabold leading-none tracking-[-0.02em]"
              style={{ backgroundImage: pillar.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              <AnimatedStat value={pillar.stat} started={inView} />
              {pillar.unit && <span className="text-[18px] ml-0.5">{pillar.unit}</span>}
            </span>
          </div>
        </div>

        <h4 className="mt-3 text-[14px] font-bold text-white">{pillar.label}</h4>
        <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color: DK.textMuted }}>
          {pillar.desc}
        </p>
      </div>
    </m.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
//  GALLERY CARD
// ═══════════════════════════════════════════════════════════════════
function GalleryCard({
  item,
  index,
  inView,
}: {
  item: (typeof GALLERY)[number]
  index: number
  inView: boolean
}) {
  const entrances = [
    { initial: { opacity: 0, scale: 0.88, y: 40 }, animate: { opacity: 1, scale: 1, y: 0 } },
    { initial: { opacity: 0, x: -40, y: 20 }, animate: { opacity: 1, x: 0, y: 0 } },
    { initial: { opacity: 0, x: 40, y: 20 }, animate: { opacity: 1, x: 0, y: 0 } },
  ]
  const v = entrances[index] ?? entrances[0]!

  return (
    <m.div
      initial={v.initial}
      animate={inView ? v.animate : {}}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 22,
        delay: 0.5 + index * 0.15,
      }}
      className={`group relative overflow-hidden rounded-[18px] ${
        index === 0 ? 'col-span-2 h-[260px] md:h-[300px]' : 'h-[200px] md:h-[240px]'
      }`}
      style={{ border: `1px solid ${DK.cardBorder}` }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
      />

      {/* Cinematic gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(15,10,30,0.7) 0%, rgba(15,10,30,0.2) 40%, transparent 70%)`,
        }}
      />

      {/* Badge */}
      <m.span
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 + index * 0.15, type: 'spring', stiffness: 200, damping: 20 }}
        className="absolute bottom-4 left-4 z-[2] inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md"
        style={{
          background: `${item.badgeColor}33`,
          border: `1px solid ${item.badgeColor}44`,
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: item.badgeColor, boxShadow: `0 0 6px ${item.badgeColor}` }}
        />
        {item.badge}
      </m.span>

      {/* Image index */}
      <span
        className="absolute right-4 bottom-4 z-[2] select-none text-[56px] font-black leading-none text-white/[0.05]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </m.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
//  SCROLL CUE
// ═══════════════════════════════════════════════════════════════════
function ScrollCue() {
  return (
    <m.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: DK.textMuted }}>
        Scroll to explore
      </span>
      <m.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-4 w-4" style={{ color: DK.accentSoft }} strokeWidth={1.5} />
      </m.div>
    </m.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN: EDITORIAL BREAK — CINEMATIC HERO
// ═══════════════════════════════════════════════════════════════════
export function EditorialBreak() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()
  const cursor = useCursorGlow(sectionRef)



  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      aria-label="Kolkata's favourite grocery app — brand story"
      style={{ background: DK.base }}
    >
      {/* ═══ BACKGROUND LAYER — static, GPU-accelerated, zero JS scroll ═══ */}
      <div
        className="absolute inset-0 z-[0]"
        style={{
          transform: 'translateZ(0) scale(1.05)',
          willChange: 'transform',
        }}
      >
        <Image
          src="/images/editorial/hero-spread.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          style={{
            objectPosition: '50% 40%',
            filter: 'brightness(0.25) saturate(0.9)',
          }}
        />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(to bottom, ${DK.base} 0%, rgba(15,10,30,0.5) 30%, rgba(15,10,30,0.4) 60%, ${DK.base} 100%),
            radial-gradient(ellipse 800px 500px at 30% 40%, rgba(123,89,230,0.08), transparent),
            radial-gradient(ellipse 600px 400px at 70% 60%, rgba(22,148,94,0.06), transparent)
          `,
        }}
      />

      {/* Cursor spotlight */}
      {cursor.active && (
        <m.div
          className="pointer-events-none absolute z-[2]"
          style={{
            width: 400,
            height: 400,
            x: cursor.x,
            y: cursor.y,
            translateX: '-50%',
            translateY: '-50%',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(123,89,230,0.06) 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Floating particles */}
      {!prefersReduced && (
        <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <m.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + i * 1.2,
                height: 2 + i * 1.2,
                background: i % 2 === 0 ? DK.accentSoft : DK.greenSoft,
                opacity: 0.06 + (i % 3) * 0.02,
                left: `${10 + i * 16}%`,
                top: `${15 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -30 - i * 6, 0],
                x: [0, 8 + i * 3, 0],
                opacity: [0.04 + i * 0.01, 0.1 + i * 0.01, 0.04 + i * 0.01],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 1.2,
              }}
            />
          ))}
        </div>
      )}

      {/* ═══ CONTENT ═══ */}
      <div ref={contentRef} className="relative z-[5] mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* ─── TOP: Cinematic brand statement ─── */}
        <div className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          {/* Eyebrow */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 120, damping: 24 }}
          >
            <span
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2"
              style={{ background: DK.pillBg, border: `1px solid ${DK.cardBorder}` }}
            >
              <Truck className="h-3.5 w-3.5" style={{ color: DK.greenSoft }} strokeWidth={1.8} />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: DK.accentSoft }}>
                Kolkata&apos;s Favourite Grocery App
              </span>
            </span>
          </m.div>

          {/* Headline */}
          <h2
            className="mt-6 font-extrabold leading-[1.06] tracking-[-0.04em] text-white"
            style={{ fontSize: 'clamp(30px, 5vw, 56px)' }}
          >
            {['Kolkata\'s', 'freshest', 'groceries,'].map((word, i) => (
              <m.span
                key={word}
                className="mr-[0.3em] inline-block"
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 20,
                  delay: prefersReduced ? 0 : 0.12 + i * 0.06,
                }}
              >
                {word}
              </m.span>
            ))}
            <br className="hidden sm:block" />
            {['delivered', 'to', 'your', 'door'].map((word, i) => (
              <m.span
                key={word}
                className="mr-[0.3em] inline-block"
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 20,
                  delay: prefersReduced ? 0 : 0.35 + i * 0.06,
                }}
                style={word === 'delivered' ? {
                  backgroundImage: `linear-gradient(135deg, ${DK.green}, ${DK.greenSoft})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                } : undefined}
              >
                {word}
              </m.span>
            ))}
            <m.span
              className="inline-block"
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 20,
                delay: prefersReduced ? 0 : 0.62,
              }}
            >
              in{' '}
              <span
                style={{
                  backgroundImage: `linear-gradient(135deg, ${DK.accent}, ${DK.accentSoft})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                30 minutes.
              </span>
            </m.span>
          </h2>

          {/* Sub copy */}
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 22, delay: prefersReduced ? 0 : 0.75 }}
            className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.75] font-medium"
            style={{ color: DK.textBody }}
          >
            From farm-fresh produce to pantry staples — everything you need,
            curated for the way Kolkata cooks. Zero compromises. Zero middlemen.
          </m.p>

          {/* CTA */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: prefersReduced ? 0 : 0.9 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/products">
              <m.span
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[14px] font-bold text-white shadow-xl cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${DK.accent}, #5A3CC0)`,
                  boxShadow: `0 4px 24px rgba(123,89,230,0.3)`,
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 6px 32px rgba(123,89,230,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                Start Shopping
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </m.span>
            </Link>
            <Link href="/products?sort=deals">
              <m.span
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold cursor-pointer transition-colors duration-200"
                style={{
                  color: DK.textBody,
                  border: `1px solid ${DK.cardBorder}`,
                  background: 'rgba(255,255,255,0.03)',
                }}
                whileHover={{ scale: 1.03, borderColor: DK.accentSoft }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: DK.green, boxShadow: `0 0 6px ${DK.green}` }}
                />
                View Today&apos;s Deals
              </m.span>
            </Link>
          </m.div>

          {/* Scroll cue */}
          <m.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <ScrollCue />
          </m.div>
        </div>

        {/* ─── PROMISE PILLARS ─── */}
        <div className="pb-4">
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-6 text-center"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: DK.textMuted }}>
              The Grolin Promise
            </span>
          </m.div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.label} pillar={pillar} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* ─── IMAGE GALLERY ─── */}
        <div className="grid grid-cols-2 gap-3 pb-6 pt-6 lg:gap-4">
          {GALLERY.map((item, i) => (
            <GalleryCard key={item.badge} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
