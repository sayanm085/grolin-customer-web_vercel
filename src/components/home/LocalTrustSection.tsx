'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  m,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useInView,
} from 'framer-motion'

// ── CONSTANTS ────────────────────────────────────────────────────────
const HEADLINE_WORDS = [
  'Groceries',
  'that',
  'arrive',
  'before',
  "you've",
  'found',
  'the',
  'second',
  'recipe.',
]

const STATS = [
  { value: 30, suffix: '', unit: 'min', label: 'Avg Delivery', gradient: 'gradient-text-green' },
  { value: 4, suffix: 'K+', unit: '', label: 'Products', gradient: 'gradient-text-purple' },
  { value: 4.8, suffix: '', unit: '★', label: 'Avg Rating', gradient: 'gradient-text-gold' },
] as const

const TRUST_IMAGES = [
  { src: '/images/trust/trust-freshness.webp', alt: 'Farm-fresh produce on dark slate — Grolin quality', badge: '✓ Farm Sourced', badgeClass: 'bg-white/10 text-white' },
  { src: '/images/trust/trust-delivery.webp', alt: 'Grocery delivery bag — 30-minute Grolin delivery', badge: '⚡ 30 Min', badgeClass: 'bg-emerald-500/20 text-emerald-300' },
  { src: '/images/trust/trust-quality.webp', alt: 'Premium curated fruits — Grolin quality check', badge: '✓ QC Passed', badgeClass: 'bg-purple-500/20 text-purple-300' },
] as const

const MOBILE_TRUST_BADGES = [
  { icon: '✓', label: 'Farm Fresh' },
  { icon: '⚡', label: '30-Min Delivery' },
  { icon: '🛡️', label: 'Money-Back' },
  { icon: '⭐', label: '4.8 Rating' },
  { icon: '📦', label: '4K+ Products' },
  { icon: '🥬', label: '100% Fresh' },
]

const PARTICLES = [
  { size: 4, x: '12%', y: '18%',  color: 'rgba(110,73,216,0.18)',  anim: 'particle-drift-1', dur: '9s' },
  { size: 6, x: '78%', y: '25%',  color: 'rgba(22,148,94,0.14)',   anim: 'particle-drift-2', dur: '13s' },
  { size: 3, x: '45%', y: '72%',  color: 'rgba(110,73,216,0.12)',  anim: 'particle-drift-3', dur: '17s' },
  { size: 5, x: '88%', y: '65%',  color: 'rgba(22,148,94,0.16)',   anim: 'particle-drift-1', dur: '11s' },
  { size: 4, x: '25%', y: '85%',  color: 'rgba(227,185,60,0.10)',  anim: 'particle-drift-2', dur: '15s' },
  { size: 3, x: '62%', y: '15%',  color: 'rgba(110,73,216,0.14)',  anim: 'particle-drift-3', dur: '20s' },
]

// ── ANIMATED COUNTER ─────────────────────────────────────────────────
function AnimatedCounter({
  value,
  suffix,
  started,
  duration = 1600,
}: {
  value: number
  suffix: string
  started: boolean
  duration?: number
}) {
  const [display, setDisplay] = useState('0')
  const hasDecimal = String(value).includes('.')

  useEffect(() => {
    if (!started) {
      setDisplay('0')
      return
    }

    let startTime: number | null = null
    let raf: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = eased * value

      if (hasDecimal) {
        setDisplay(current.toFixed(1))
      } else {
        setDisplay(String(Math.round(current)))
      }

      if (progress < 1) {
        raf = requestAnimationFrame(animate)
      }
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [started, value, duration, hasDecimal])

  return (
    <span className="tabular-nums" aria-label={`${value}${suffix}`}>
      {display}
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  )
}

// ── MAGNETIC CURSOR HOOK ─────────────────────────────────────────────
function useMagneticCursor(ref: React.RefObject<HTMLElement | null>, strength = 0.06) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Only enable on pointer devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 220) {
        x.set(dx * strength)
        y.set(dy * strength)
      } else {
        x.set(0)
        y.set(0)
      }
    }
    const onLeave = () => { x.set(0); y.set(0) }

    window.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, x, y, strength])

  return { x: springX, y: springY }
}

// ── STAT CARD ────────────────────────────────────────────────────────
function StatCard({
  stat,
  index,
  counterStarted,
}: {
  stat: (typeof STATS)[number]
  index: number
  counterStarted: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const magnetic = useMagneticCursor(cardRef)
  const [glowActive, setGlowActive] = useState(false)

  // Trigger glow after counter finishes
  useEffect(() => {
    if (!counterStarted) return undefined
    const timer = setTimeout(() => setGlowActive(true), 1800 + index * 200)
    return () => clearTimeout(timer)
  }, [counterStarted, index])

  return (
    <m.div
      ref={cardRef}
      className={`glass-surface-dark rounded-[18px] p-5 text-center ${glowActive ? 'glow-pulse-once' : ''}`}
      style={{ x: magnetic.x, y: magnetic.y }}
      initial={{ opacity: 0, y: 40, scale: 0.85, rotateX: 8 }}
      animate={counterStarted ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 16,
        mass: 0.9,
        delay: index * 0.12,
      }}
    >
      <div className={`text-[32px] sm:text-[36px] font-extrabold tracking-[-0.03em] tabular-nums ${stat.gradient}`}>
        <AnimatedCounter value={stat.value} suffix={stat.suffix} started={counterStarted} />
        {stat.unit && <span className="text-[20px] ml-0.5">{stat.unit}</span>}
      </div>
      <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">
        {stat.label}
      </p>
    </m.div>
  )
}

// ── IMAGE MOSAIC CARD ────────────────────────────────────────────────
function MosaicImage({
  image,
  index,
  parallaxY,
  badgeVisible,
}: {
  image: (typeof TRUST_IMAGES)[number]
  index: number
  parallaxY: ReturnType<typeof useSpring>
  badgeVisible: boolean
}) {
  const isHero = index === 0
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  // Each image enters from a different direction for visual variety
  const entranceVariants = [
    { initial: { opacity: 0, scale: 0.85, y: 30 }, animate: { opacity: 1, scale: 1, y: 0 } },       // Hero: scale up
    { initial: { opacity: 0, x: -50, y: 20 }, animate: { opacity: 1, x: 0, y: 0 } },                // Left: slide from left
    { initial: { opacity: 0, x: 50, y: 20 }, animate: { opacity: 1, x: 0, y: 0 } },                 // Right: slide from right
  ]
  const variant = entranceVariants[index] ?? entranceVariants[0]!

  return (
    <m.div
      ref={ref}
      className={`relative overflow-hidden rounded-[16px] shimmer-sweep ${
        isHero ? 'col-span-2 h-[220px]' : 'h-[160px]'
      }`}
      style={{ y: parallaxY }}
      initial={variant.initial}
      animate={inView ? variant.animate : {}}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 22,
        delay: index * 0.15,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes={isHero ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
      />
      {/* Dark overlay for text legibility on trust badges */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Trust verification badge */}
      {badgeVisible && (
        <span
          className={`badge-pop absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold backdrop-blur-md border border-white/10 ${image.badgeClass}`}
        >
          {image.badge}
        </span>
      )}
    </m.div>
  )
}

// ── MOBILE TRUST CAROUSEL ────────────────────────────────────────────
function MobileTrustCarousel() {
  return (
    <div className="md:hidden overflow-hidden rounded-[14px] bg-white/[0.04] border border-white/[0.06] py-3 px-1 my-6">
      <div className="trust-ticker-strip">
        {[...MOBILE_TRUST_BADGES, ...MOBILE_TRUST_BADGES].map((badge, i) => (
          <span
            key={`${badge.label}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-[12px] font-semibold text-white/70 border border-white/[0.08] whitespace-nowrap"
          >
            <span className="text-sm">{badge.icon}</span>
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── ATMOSPHERIC LAYER ────────────────────────────────────────────────
function AtmosphericLayer() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-[0]">
      {/* Gradient orbs */}
      <div
        className="atmospheric-orb"
        style={{
          width: 280, height: 280,
          left: '10%', top: '60%',
          background: 'radial-gradient(circle, rgba(110,73,216,0.12) 0%, transparent 70%)',
          animation: 'particle-drift-1 22s ease-in-out infinite',
        }}
      />
      <div
        className="atmospheric-orb"
        style={{
          width: 200, height: 200,
          right: '15%', top: '20%',
          background: 'radial-gradient(circle, rgba(22,148,94,0.10) 0%, transparent 70%)',
          animation: 'particle-drift-2 26s ease-in-out infinite',
        }}
      />

      {/* Luminous particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="atmospheric-particle"
          style={{
            width: p.size, height: p.size,
            left: p.x, top: p.y,
            background: p.color,
            animation: `${p.anim} ${p.dur} ease-in-out infinite`,
            animationDelay: `${i * -2}s`,
          }}
        />
      ))}
    </div>
  )
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────
export function LocalTrustSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  // ── Scroll-linked progress through section ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // ── Light leak trigger ──
  const lightLeakProgress = useTransform(scrollYProgress, [0.02, 0.12], [0, 1])
  const lightLeakX = useTransform(lightLeakProgress, [0, 1], ['-120%', '220%'])

  // ── Background gradient shift ──
  const bgPurpleX = useTransform(scrollYProgress, [0, 1], ['15%', '25%'])
  const bgPurpleY = useTransform(scrollYProgress, [0, 1], ['80%', '55%'])
  const bgGreenX = useTransform(scrollYProgress, [0, 1], ['85%', '70%'])
  const bgGreenY = useTransform(scrollYProgress, [0, 1], ['20%', '45%'])

  // ── Image clip-path reveals — REMOVED: now handled by one-shot useInView in MosaicImage ──
  // ── Image parallax at different speeds ──
  const rawParallaxHero = useTransform(scrollYProgress, [0, 1], [30, -30])
  const rawParallaxLeft = useTransform(scrollYProgress, [0, 1], [15, -15])
  const rawParallaxRight = useTransform(scrollYProgress, [0, 1], [8, -8])
  const parallaxHero = useSpring(rawParallaxHero, { stiffness: 50, damping: 25 })
  const parallaxLeft = useSpring(rawParallaxLeft, { stiffness: 50, damping: 25 })
  const parallaxRight = useSpring(rawParallaxRight, { stiffness: 50, damping: 25 })

  // ── Phase tracking via InView ──
  const textRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  const textInView = useInView(textRef, { once: true, margin: '-30px 0px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-60px 0px' })
  const imagesInView = useInView(imagesRef, { once: true, margin: '-40px 0px' })

  // Counter starts when stats phase triggers
  const [counterStarted, setCounterStarted] = useState(false)
  useEffect(() => {
    if (!statsInView) return undefined
    const t = setTimeout(() => setCounterStarted(true), 200)
    return () => clearTimeout(t)
  }, [statsInView])

  // Badge visibility (after images reveal)
  const [badgesVisible, setBadgesVisible] = useState(false)
  useEffect(() => {
    if (!imagesInView) return undefined
    const t = setTimeout(() => setBadgesVisible(true), 900)
    return () => clearTimeout(t)
  }, [imagesInView])

  // Underline draw trigger (after "before" word reveals)
  const [underlineReady, setUnderlineReady] = useState(false)
  useEffect(() => {
    if (!textInView) return undefined
    // "before" is word index 3, at 55ms stagger = 3 * 55 + 300ms buffer
    const t = setTimeout(() => setUnderlineReady(true), 3 * 55 + 400)
    return () => clearTimeout(t)
  }, [textInView])

  // CTA visibility
  const [ctaVisible, setCtaVisible] = useState(false)
  useEffect(() => {
    if (!counterStarted) return undefined
    const t = setTimeout(() => setCtaVisible(true), 1200)
    return () => clearTimeout(t)
  }, [counterStarted])

  // If reduced motion, show everything immediately
  const showAll = prefersReduced || false

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden mesh-dark mesh-dark-bleed grain-overlay"
      aria-label="Why Kolkata chooses Grolin"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Scroll-linked background gradient ── */}
      {!prefersReduced && (
        <m.div
          aria-hidden="true"
          className="absolute inset-0 z-[0] pointer-events-none"
          style={{
            background: `
              radial-gradient(600px circle at ${bgPurpleX} ${bgPurpleY}, rgba(110,73,216,0.08), transparent 60%),
              radial-gradient(500px circle at ${bgGreenX} ${bgGreenY}, rgba(22,148,94,0.06), transparent 60%)
            `,
          }}
        />
      )}

      {/* ── Atmospheric particles ── */}
      {!prefersReduced && <AtmosphericLayer />}

      {/* ── Light leak ── */}
      {!prefersReduced && (
        <m.div
          aria-hidden="true"
          className="light-leak"
          style={{ x: lightLeakX }}
        />
      )}

      {/* ── Content zone ── */}
      <div className="relative z-[3] mx-auto max-w-[1240px] px-5 py-16 sm:px-8 md:py-24 lg:py-28">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14 items-start">

          {/* ─── LEFT COLUMN: Text + Stats ─── */}
          <div ref={textRef}>
            {/* Eyebrow */}
            <m.p
              className="eyebrow mb-4 text-emerald-400"
              initial={showAll ? false : { opacity: 0, x: -20 }}
              animate={textInView || showAll ? { opacity: 1, x: 0 } : {}}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.05 }}
            >
              — why Kolkata chooses Grolin
            </m.p>

            {/* ── Headline: word-by-word cascade ── */}
            <h2
              className="font-extrabold leading-[1.06] tracking-[-0.035em] text-white"
              style={{ fontSize: 'clamp(30px, 5vw, 52px)' }}
            >
              {HEADLINE_WORDS.map((word, i) => {
                const isBefore = word === 'before'
                return (
                  <m.span
                    key={word + i}
                    className={`inline-block mr-[0.28em] ${isBefore ? 'relative' : ''}`}
                    initial={
                      showAll
                        ? false
                        : { opacity: 0, y: 20, filter: 'blur(6px)' }
                    }
                    animate={
                      textInView || showAll
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : {}
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 140,
                      damping: 18,
                      mass: 0.8,
                      delay: i * 0.055,
                    }}
                  >
                    <span className={isBefore ? 'gradient-text-green' : ''}>
                      {word}
                    </span>
                    {/* Animated underline on "before" */}
                    {isBefore && (
                      <m.span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #16945E, #0D6E47)',
                          transformOrigin: 'left',
                        }}
                        initial={{ scaleX: 0 }}
                        animate={underlineReady ? { scaleX: 1 } : {}}
                        transition={{
                          type: 'spring',
                          stiffness: 160,
                          damping: 22,
                          delay: 0.1,
                        }}
                      />
                    )}
                  </m.span>
                )
              })}
            </h2>

            {/* Sub-copy */}
            <m.p
              className="mt-5 max-w-[480px] text-[15px] leading-relaxed text-white/55 font-medium"
              initial={showAll ? false : { opacity: 0, y: 12 }}
              animate={textInView || showAll ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 22,
                delay: HEADLINE_WORDS.length * 0.055 + 0.15,
              }}
            >
              Every order picked fresh, packed with care, and on your doorstep
              in 30 minutes. No middlemen. No compromises.
            </m.p>

            {/* Mobile trust carousel */}
            <MobileTrustCarousel />

            {/* ── Stats grid ── */}
            <div ref={statsRef} className="mt-8 grid grid-cols-3 gap-3">
              {STATS.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  index={i}
                  counterStarted={showAll || counterStarted}
                />
              ))}
            </div>

            {/* ── CTA Button ── */}
            <m.div
              className="mt-7"
              initial={showAll ? false : { opacity: 0, y: 16 }}
              animate={ctaVisible || showAll ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            >
              <Link href="/products">
                <m.span
                  className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[14px] font-bold text-white shadow-lg border border-white/10 backdrop-blur-md cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(22,148,94,0.25) 0%, rgba(110,73,216,0.2) 100%)',
                  }}
                  whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(22,148,94,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: '#16945E',
                      boxShadow: '0 0 6px rgba(22,148,94,0.6)',
                      animation: 'glow-pulse 2s ease-in-out infinite',
                    }}
                  />
                  Shop Fresh Now
                  <span className="text-white/50">→</span>
                </m.span>
              </Link>
            </m.div>
          </div>

          {/* ─── RIGHT COLUMN: Image Mosaic ─── */}
          <div
            ref={imagesRef}
            className="hidden md:grid grid-cols-2 gap-3"
            style={{ perspective: 800 }}
          >
            <MosaicImage
              image={TRUST_IMAGES[0]}
              index={0}
              parallaxY={parallaxHero}
              badgeVisible={showAll || badgesVisible}
            />
            <MosaicImage
              image={TRUST_IMAGES[1]}
              index={1}
              parallaxY={parallaxLeft}
              badgeVisible={showAll || badgesVisible}
            />
            <MosaicImage
              image={TRUST_IMAGES[2]}
              index={2}
              parallaxY={parallaxRight}
              badgeVisible={showAll || badgesVisible}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
