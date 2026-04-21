'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  m,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import {
  Heart,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ShoppingBag,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  SHOPFRONT_FOOTER_CONTACT,
  SHOPFRONT_FOOTER_GROUPS,
  SHOPFRONT_PAYMENT_BADGES,
  SHOPFRONT_SOCIAL_LINKS,
  SHOPFRONT_NEWSLETTER,
} from '@/lib/shopfront/shopfront-content'

// ── CONSTANTS ────────────────────────────────────────────────────────
const SOCIAL_ICON: Record<string, LucideIcon> = {
  Instagram,
  Facebook,
  Twitter,
  YouTube: Youtube,
}

const SOCIAL_BRAND: Record<string, { glow: string; color: string }> = {
  Instagram: { glow: 'rgba(228,64,95,0.25)', color: '#E4405F' },
  Facebook:  { glow: 'rgba(66,103,178,0.25)', color: '#4267B2' },
  Twitter:   { glow: 'rgba(29,155,240,0.25)', color: '#1D9BF0' },
  YouTube:   { glow: 'rgba(255,0,0,0.2)',      color: '#FF0000' },
}

// ── CURSOR SPOTLIGHT (reactive glow under mouse) ─────────────────────
function useCursorSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)
  const prefersReduced = useReducedMotion()

  const onMove = useCallback((e: React.MouseEvent) => {
    if (prefersReduced) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    if (!active) setActive(true)
  }, [prefersReduced, active])

  const onLeave = useCallback(() => setActive(false), [])

  return {
    handlers: { onMouseMove: onMove, onMouseLeave: onLeave },
    element: active ? (
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          background: `radial-gradient(550px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.035), transparent 55%)`,
        }}
        aria-hidden="true"
      />
    ) : null,
  }
}

// ── BACK TO TOP ──────────────────────────────────────────────────────
function BackToTopPill({ visible }: { visible: boolean }) {
  return (
    <m.button
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-black/40 px-4 py-2.5 text-[12px] font-medium text-white/70 backdrop-blur-md transition-all hover:border-white/[0.2] hover:bg-black/60 hover:text-white md:bottom-6 md:right-6"
      aria-label="Back to top"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.8} />
      Back to top
    </m.button>
  )
}

// ── NEWSLETTER INLINE (simplified, embedded in hero) ─────────────────
function InlineNewsletter({ inView }: { inView: boolean }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-300"
      >
        <span className="text-lg">✓</span> You&apos;re on the waitlist
      </m.div>
    )
  }

  return (
    <m.form
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 22, delay: 0.6 }}
      onSubmit={handleSubmit}
      className="flex w-full max-w-[480px] flex-col gap-3 sm:flex-row"
    >
      <label className="sr-only" htmlFor="footer-hero-email">Email address</label>
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/35" />
        <input
          id="footer-hero-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={SHOPFRONT_NEWSLETTER.placeholder}
          className="h-12 w-full rounded-full border border-white/[0.12] bg-white/[0.06] pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none backdrop-blur-sm transition-all focus:border-white/[0.25] focus:bg-white/[0.1]"
        />
      </div>
      <m.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0E0A1A] transition-all hover:bg-white/90"
      >
        {SHOPFRONT_NEWSLETTER.ctaLabel}
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </m.button>
    </m.form>
  )
}

// ── MAIN FOOTER ──────────────────────────────────────────────────────
export function ShopFooter() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })
  const bodyInView = useInView(bodyRef, { once: true, margin: '-60px' })
  const bottomInView = useInView(bottomRef, { once: true, margin: '-40px' })

  const prefersReduced = useReducedMotion()

  // Hero image parallax
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

  const { handlers: spotlightHandlers, element: spotlightEl } = useCursorSpotlight()

  const contactEntries = [
    { icon: Mail, text: SHOPFRONT_FOOTER_CONTACT.email },
    { icon: Phone, text: SHOPFRONT_FOOTER_CONTACT.phone },
    { icon: MapPin, text: SHOPFRONT_FOOTER_CONTACT.address },
  ]

  const linkGroups = SHOPFRONT_FOOTER_GROUPS.filter(g => g.title !== 'Get the App')

  return (
    <>
      <footer className="relative -mt-1 text-white" {...spotlightHandlers}>
        {/* ════════════════════════════════════════════════════════════
            ZONE 1 — HERO CTA (Full-bleed grocery photography)
            Like ministrydesign.agency: big image + brand CTA
            ════════════════════════════════════════════════════════════ */}
        <div
          ref={heroRef}
          className="relative overflow-hidden"
          style={{ minHeight: 420 }}
        >
          {/* Full-bleed food photography with parallax */}
          <m.div
            className="absolute inset-0"
            style={{
              x: prefersReduced ? 0 : smoothX,
              y: prefersReduced ? 0 : smoothY,
              scale: 1.05, // overflow crop for parallax
            }}
          >
            <Image
              src="/images/footer/footer-hero.png"
              alt="Fresh premium groceries — tomatoes, herbs, bread, avocados, olive oil on dark slate"
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
              priority={false}
              style={{ objectPosition: '35% center' }}
            />
          </m.div>

          {/* Gradient overlay — right side fades to brand purple for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(105deg, rgba(26,14,61,0.15) 0%, rgba(26,14,61,0.55) 35%, rgba(26,14,61,0.88) 55%, rgba(26,14,61,0.96) 70%, #12082E 85%),
                linear-gradient(to bottom, transparent 50%, #12082E 100%)
              `,
            }}
          />

          {/* Content — right-aligned over the dark overlay */}
          <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1280px] items-center px-5 py-16 lg:px-6">
            <div className="ml-auto w-full max-w-[560px]">
              {/* Eyebrow */}
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 120, damping: 24 }}
                className="mb-4 inline-flex items-center gap-2.5"
              >
                <ShoppingBag className="h-4 w-4 text-emerald-400/80" strokeWidth={1.8} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Premium grocery commerce
                </span>
              </m.div>

              {/* Hero heading */}
              <m.h2
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 100, damping: 22, delay: 0.15 }}
                className="text-[36px] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[44px]"
              >
                Fresh to your door,{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  every day.
                </span>
              </m.h2>

              {/* Subline */}
              <m.p
                initial={{ opacity: 0, y: 14 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 100, damping: 22, delay: 0.3 }}
                className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-white/50"
              >
                Curated produce, pantry essentials, and artisan goods delivered with care to Kolkata households.
              </m.p>

              {/* CTA buttons */}
              <m.div
                initial={{ opacity: 0, y: 14 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 100, damping: 22, delay: 0.45 }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/products"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#0E0A1A] transition-all hover:bg-white/90"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-6 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/[0.25] hover:bg-white/[0.08] hover:text-white"
                >
                  Browse categories
                </Link>
              </m.div>

              {/* Inline newsletter */}
              <div className="mt-8">
                <m.p
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.55 }}
                  className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30"
                >
                  {SHOPFRONT_NEWSLETTER.eyebrow}
                </m.p>
                <InlineNewsletter inView={heroInView} />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            ZONE 2 — INFORMATION GRID (Links + Contact + Socials)
            ════════════════════════════════════════════════════════════ */}
        <div
          style={{ background: '#12082E' }}
          className="relative overflow-hidden"
        >
          {/* Cursor spotlight */}
          {spotlightEl}

          <div ref={bodyRef} className="relative z-[2] mx-auto max-w-[1280px] px-5 py-14 lg:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_2.8fr]">
              {/* Left: Brand + Contact + Socials */}
              <div className="space-y-6">
                {/* Brand */}
                <div>
                  <m.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 120, damping: 24 }}
                    className="text-[26px] font-bold tracking-[-0.02em] text-white"
                  >
                    Grolin<span className="text-emerald-400">.</span>
                  </m.h3>
                  <m.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.1 }}
                    className="mt-2 max-w-[300px] text-[13px] leading-relaxed text-white/35"
                  >
                    Premium grocery commerce for households that care about{' '}
                    <span className="text-purple-400/80">quality</span>,{' '}
                    <span className="text-emerald-400/80">speed</span>, and{' '}
                    <span className="text-amber-400/80">trust</span>.
                  </m.p>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  {contactEntries.map((entry, i) => {
                    const Icon = entry.icon
                    return (
                      <m.p
                        key={entry.text}
                        initial={{ opacity: 0, x: -8 }}
                        animate={bodyInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          type: 'spring',
                          stiffness: 160,
                          damping: 22,
                          delay: 0.2 + i * 0.06,
                        }}
                        className="group flex items-center gap-2.5 text-[13px] text-white/35 transition-colors duration-200 hover:text-white/65"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-white/20 transition-colors duration-200 group-hover:text-emerald-400/60" strokeWidth={1.5} />
                        {entry.text}
                      </m.p>
                    )
                  })}
                </div>

                {/* Socials */}
                <div className="flex gap-2">
                  {SHOPFRONT_SOCIAL_LINKS.map((item, i) => {
                    const Icon = SOCIAL_ICON[item.label]
                    const brand = SOCIAL_BRAND[item.label]
                    return (
                      <m.a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={bodyInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          damping: 18,
                          delay: 0.4 + i * 0.05,
                        }}
                        whileHover={{
                          y: -3,
                          scale: 1.1,
                          boxShadow: `0 6px 20px ${brand?.glow || 'rgba(255,255,255,0.06)'}`,
                        }}
                        whileTap={{ scale: 0.92 }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-colors duration-200 hover:border-white/[0.2] hover:bg-white/[0.06]"
                      >
                        {Icon && (
                          <Icon className="h-4 w-4 text-white/40 transition-colors duration-200" strokeWidth={1.6} />
                        )}
                      </m.a>
                    )
                  })}
                </div>
              </div>

              {/* Right: Link columns */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {linkGroups.map((group, gi) => (
                  <m.div
                    key={group.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 22,
                      delay: 0.15 + gi * 0.06,
                    }}
                    className="group/col"
                  >
                    <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/28 transition-colors duration-300 group-hover/col:text-white/50">
                      {group.title}
                    </h4>
                    <div className="mt-4 space-y-2.5">
                      {group.links.map((link, li) => (
                        <m.div
                          key={`${group.title}-${link.label}`}
                          initial={{ opacity: 0, x: -4 }}
                          animate={bodyInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            type: 'spring',
                            stiffness: 120,
                            damping: 22,
                            delay: 0.2 + gi * 0.06 + li * 0.025,
                          }}
                        >
                          <FooterLink
                            link={link}
                            className="group/link relative inline-flex text-[13px] text-white/38 transition-all duration-200 hover:text-white/85 hover:translate-x-1"
                          >
                            <span>{link.label}</span>
                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-emerald-400/30 transition-all duration-300 group-hover/link:w-full" />
                          </FooterLink>
                        </m.div>
                      ))}
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            ZONE 3 — BOTTOM BAR
            ════════════════════════════════════════════════════════════ */}
        <div
          ref={bottomRef}
          style={{ background: '#12082E' }}
          className="relative border-t border-white/[0.05]"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-5 text-[12px] sm:flex-row sm:items-center sm:justify-between lg:px-6">
            <m.p
              initial={{ opacity: 0, y: 4 }}
              animate={bottomInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.1 }}
              className="text-white/25"
            >
              © {new Date().getFullYear()} Grolin Grocery. All rights reserved.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 4 }}
              animate={bottomInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.2 }}
              className="flex flex-wrap items-center gap-1"
            >
              {SHOPFRONT_PAYMENT_BADGES.map((item, i) => (
                <span key={item} className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/18">
                  {item}{i < SHOPFRONT_PAYMENT_BADGES.length - 1 && <span className="mx-1.5 text-white/8">·</span>}
                </span>
              ))}
            </m.div>

            <m.p
              initial={{ opacity: 0, y: 4 }}
              animate={bottomInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.3 }}
              className="inline-flex items-center gap-1.5 text-white/22"
            >
              Made with{' '}
              <span className="relative inline-flex">
                <Heart className="h-3 w-3 text-rose-500/50" strokeWidth={2} />
                {bottomInView && (
                  <m.span
                    className="absolute inset-0"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ delay: 0.8, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <Heart className="h-3 w-3 fill-current text-rose-500/60" strokeWidth={0} />
                  </m.span>
                )}
              </span>
              {' '}in Kolkata
            </m.p>
          </div>
        </div>
      </footer>

      <BackToTopPill visible={bottomInView} />
    </>
  )
}

// ── FOOTER LINK ──────────────────────────────────────────────────────
function FooterLink({
  link,
  className,
  children,
}: {
  link: { label: string; href: string; external?: boolean }
  className: string
  children: ReactNode
}) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={link.href} className={className}>
      {children}
    </Link>
  )
}
