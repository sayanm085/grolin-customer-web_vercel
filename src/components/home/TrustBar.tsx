'use client'

// Decorative trust strip — hardcoded editorial content.
// CSS classes: reveal-on-scroll · eyebrow — defined in globals.css
import { m } from 'framer-motion'

const TRUST_ITEMS = [
  { icon: '🕐', stat: '30 min', label: 'Delivery Guarantee' },
  { icon: '🥬', stat: '100%', label: 'Farm Fresh Produce' },
  { icon: '📦', stat: '5000+', label: 'Products Available' },
  { icon: '⭐', stat: '4.8', label: 'Average Rating' },
] as const

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export function TrustBar() {
  return (
    <section
      className="w-full bg-[color:var(--shop-surface)] border-b border-[color:var(--shop-border)]"
      aria-label="Trust proof strip"
    >
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <m.ul
          className="flex items-stretch divide-x divide-[color:var(--shop-border)] overflow-x-auto scrollbar-none"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px 0px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {TRUST_ITEMS.map((item) => (
            <m.li
              key={item.label}
              variants={itemVariants}
              className="flex flex-1 min-w-[160px] items-center gap-3 px-5 py-4 sm:py-5"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-xl"
                style={{ backgroundColor: 'var(--shop-primary-soft)' }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-extrabold leading-none tabular-nums tracking-[-0.02em] text-[color:var(--shop-ink)]">
                  {item.stat}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold leading-none text-[color:var(--shop-ink-muted)]">
                  {item.label}
                </p>
              </div>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  )
}
