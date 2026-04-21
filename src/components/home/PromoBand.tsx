'use client'

import { m } from 'framer-motion'

// Purely decorative — no hooks, no service imports, no data fetching.
// All copy is editorial/static. Uses ticker keyframe from globals.css.

const ITEMS = [
  { accent: '⚡', text: '30-minute delivery across South Kolkata' },
  { accent: '🌿', text: 'Fresh quality guaranteed on every order' },
  { accent: '🛒', text: 'Free delivery on orders above ₹299' },
  { accent: '⭐', text: '4.8 rating · trusted by 4,200+ families' },
  { accent: '💳', text: 'Earn Grolin credits on every basket' },
  { accent: '✦',  text: 'New arrivals added daily from local farms' },
]

// Doubled for seamless ticker loop — ticker keyframe moves -50%
const TICKER_ITEMS = [...ITEMS, ...ITEMS]

const SEP = (
  <span
    aria-hidden="true"
    className="mx-5 inline-block w-1 h-1 rounded-full flex-shrink-0"
    style={{ backgroundColor: 'var(--shop-action)' }}
  />
)

export function PromoBand() {
  return (
    <m.div
      initial={{ opacity: 0, y: -36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full overflow-hidden relative"
      style={{ backgroundColor: '#0D5C3A', height: '36px' }}
      aria-label="Grolin delivery and trust information"
    >
      {/* Left fade edge */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #0D5C3A, transparent)',
        }}
      />

      {/* Right fade edge */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, #0D5C3A, transparent)',
        }}
      />

      {/* Scrolling ticker */}
      <div className="flex items-center h-full">
        <div
          aria-hidden="true"
          className="flex items-center whitespace-nowrap min-w-max"
          style={{
            animation: 'ticker 28s linear infinite',
          }}
        >
          {TICKER_ITEMS.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center"
            >
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                <span
                  className="text-[10px]"
                  style={{ color: 'var(--shop-action)' }}
                >
                  {item.accent}
                </span>
                {item.text}
              </span>
              {SEP}
            </span>
          ))}
        </div>
      </div>
    </m.div>
  )
}
