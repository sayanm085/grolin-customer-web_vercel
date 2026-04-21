'use client'

import { useRef, useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { m, useInView, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { toast } from 'sonner'
import { SHOPFRONT_NEWSLETTER } from '@/lib/shopfront/shopfront-content'

// ── CONFETTI PARTICLE GENERATOR ──────────────────────────────────────
const CONFETTI_COLORS = ['#950EDB', '#16945E', '#E3B93C', '#ffffff']

function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null

  const particles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
    const dist = 40 + Math.random() * 60
    return {
      cx: `${Math.cos(angle) * dist}px`,
      cy: `${Math.sin(angle) * dist - 20}px`,
      cr: `${Math.random() * 360}deg`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 3 + Math.random() * 4,
      delay: Math.random() * 200,
    }
  })

  return (
    <span className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            width: p.size,
            height: p.size,
            borderRadius: p.size > 5 ? '2px' : '50%',
            background: p.color,
            ['--cx' as string]: p.cx,
            ['--cy' as string]: p.cy,
            ['--cr' as string]: p.cr,
            animation: `confetti-burst 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}ms forwards`,
          } as React.CSSProperties}
        />
      ))}
    </span>
  )
}

// ── ANIMATED COUNTER ─────────────────────────────────────────────────
function AnimatedCounter({ value, started }: { value: number; started: boolean }) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!started) return

    let startTime: number | null = null
    let raf: number
    const duration = 1600

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const num = Math.round(eased * value)
      setDisplay(num.toLocaleString())
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [started, value])

  return <span className="tabular-nums font-bold text-white/90">{display}</span>
}

// ── WORD CASCADE TITLE ───────────────────────────────────────────────
function WordCascadeTitle({ text, inView }: { text: string; inView: boolean }) {
  const words = text.split(' ')
  const prefersReduced = useReducedMotion()

  return (
    <h3 className="mt-3 text-[28px] font-bold tracking-tight text-white sm:text-[32px]">
      {words.map((word, i) => {
        const isPremium = word.toLowerCase().includes('premium')
        const isSeasonal = word.toLowerCase().includes('seasonal')

        return (
          <m.span
            key={i}
            initial={prefersReduced ? {} : { opacity: 0, y: 16, filter: 'blur(5px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{
              type: 'spring',
              stiffness: 140,
              damping: 20,
              delay: 0.3 + i * 0.05,
            }}
            className={`inline-block ${isPremium ? 'text-gradient-flow' : ''} ${isSeasonal ? 'text-gradient-green' : ''}`}
            style={{ marginRight: '0.3em' }}
          >
            {word}
          </m.span>
        )
      })}
    </h3>
  )
}

// ── MAIN NEWSLETTER COMPONENT ────────────────────────────────────────
export function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  // Mouse-following 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-200, 200], [3, -3])
  const rotateY = useTransform(mouseX, [-200, 200], [-3, 3])
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set(e.clientX - cx)
    mouseY.set(e.clientY - cy)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = email.trim()
    if (!trimmed) {
      toast.error('Enter your email to join the waitlist.')
      return
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    if (!isValidEmail) {
      toast.error('Enter a valid email address.')
      return
    }

    // Trigger celebration
    setSubmitted(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 1500)
  }

  return (
    <div style={{ perspective: 1200 }} ref={cardRef}>
      <m.div
        initial={prefersReduced ? {} : { opacity: 0, y: 60, rotateX: 8, scale: 0.94 }}
        animate={cardInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
        transition={{
          type: 'spring',
          stiffness: 140,
          damping: 20,
          mass: 1.1,
        }}
        style={{
          rotateX: prefersReduced ? 0 : smoothRotateX,
          rotateY: prefersReduced ? 0 : smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mb-8 overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.07)_58%,rgba(255,255,255,0.03)_100%)] p-6 shadow-[0_22px_48px_rgba(12,16,32,0.24)] backdrop-blur-xl sm:p-8"
      >
        {/* Top edge highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_20%,rgba(227,185,60,0.72)_54%,rgba(255,255,255,0)_100%)]" />

        {/* Ambient gradient orbs */}
        <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[color:var(--shop-primary-soft)] blur-3xl" />
        <div className="absolute -left-6 top-0 h-28 w-28 rounded-full bg-white/10 blur-3xl" />

        {/* Background depth via gradient only — no image needed */}

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[540px]">
            {/* Eyebrow + status badge */}
            <m.div
              initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
              animate={cardInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/62">
                {SHOPFRONT_NEWSLETTER.eyebrow}
              </p>
              <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ${
                submitted
                  ? 'border-green-400/30 bg-green-500/16 text-green-300'
                  : 'border-white/14 bg-white/8 text-white/82'
              }`}>
                {submitted ? '✓ Joined' : SHOPFRONT_NEWSLETTER.statusLabel}
              </span>
            </m.div>

            {/* Title — word cascade OR success state */}
            {submitted ? (
              <m.h3
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="mt-3 text-[28px] font-bold tracking-tight text-white sm:text-[32px]"
              >
                You&apos;re on the list! 🎉
              </m.h3>
            ) : (
              <WordCascadeTitle text={SHOPFRONT_NEWSLETTER.title} inView={cardInView} />
            )}

            {/* Subtitle */}
            <m.p
              initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
              animate={cardInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.6 }}
              className="mt-2 text-sm leading-6 text-white/72"
            >
              {submitted
                ? "We'll send your first exclusive edit soon."
                : SHOPFRONT_NEWSLETTER.subtitle}
            </m.p>

            {/* Social proof counter */}
            <m.p
              initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
              animate={cardInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.75 }}
              className="mt-3 flex items-center gap-2 text-[13px] text-white/60"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Join{' '}
              <AnimatedCounter value={12000} started={cardInView} />
              + Kolkata households already waiting
            </m.p>
          </div>

          {/* Form or celebration */}
          <div className="relative w-full max-w-[460px]">
            {submitted ? (
              // Celebration state
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="flex items-center justify-center rounded-2xl border border-green-400/20 bg-green-500/10 py-6 text-center"
              >
                <div>
                  <m.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                    className="text-3xl"
                  >
                    ✉️
                  </m.p>
                  <p className="mt-2 text-sm font-semibold text-green-300">Check your inbox</p>
                </div>
              </m.div>
            ) : (
              // Form state
              <m.form
                initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.5 }}
                className="flex w-full flex-col gap-3 sm:flex-row"
                onSubmit={handleSubmit}
              >
                <label className="sr-only" htmlFor="shop-newsletter-email">
                  Email address
                </label>
                <div className="aurora-border relative flex-1 rounded-[12px]">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/48" />
                  <input
                    id="shop-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={SHOPFRONT_NEWSLETTER.placeholder}
                    className="relative z-10 h-12 w-full rounded-[12px] border border-white/16 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/48 outline-none transition-colors focus:border-[color:var(--shop-primary)] focus:bg-white/14"
                  />
                </div>
                <m.button
                  type="submit"
                  whileHover={{ scale: 1.06, boxShadow: '0 4px 24px rgba(227,185,60,0.35)' }}
                  whileTap={{ scale: 0.95 }}
                  className="cta-breathe relative inline-flex h-12 items-center justify-center rounded-[12px] bg-[color:var(--shop-accent)] px-7 text-sm font-bold text-white transition-all hover:brightness-105"
                >
                  {SHOPFRONT_NEWSLETTER.ctaLabel}
                </m.button>
              </m.form>
            )}

            {/* Confetti burst */}
            <ConfettiBurst active={showConfetti} />
          </div>
        </div>
      </m.div>
    </div>
  )
}