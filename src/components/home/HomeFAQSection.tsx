'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQ_ITEMS = [
  {
    question: 'How fast is Grolin delivery?',
    answer:
      'We deliver within 30 minutes across South Kolkata. Our dark-store model keeps inventory close to you, so your groceries are picked, packed, and dispatched in minutes — not hours.',
  },
  {
    question: 'What if my produce isn\'t fresh?',
    answer:
      'Every item goes through a 3-point freshness check before dispatch. If anything doesn\'t meet your standards, we\'ll replace it or refund you instantly — no questions, no photos needed.',
  },
  {
    question: 'Is there a minimum order value?',
    answer:
      'There\'s no minimum order. Whether you need a single lemon or a full weekly shop, we\'ll deliver it. Orders above ₹299 enjoy free delivery.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept UPI (Google Pay, PhonePe, Paytm), all major credit and debit cards, net banking, and cash on delivery. All digital payments are processed through Razorpay with bank-grade encryption.',
  },
  {
    question: 'Can I schedule a delivery for later?',
    answer:
      'Yes! While instant delivery is our default, you can schedule orders for a preferred time slot up to 3 days in advance. Perfect for planning your weekly groceries.',
  },
  {
    question: 'Which areas do you deliver to?',
    answer:
      'We currently serve South Kolkata including Gariahat, Ballygunge, Jadavpur, Dhakuria, Lake Gardens, Golpark, Rashbehari, and surrounding areas. We\'re expanding to North Kolkata soon.',
  },
  {
    question: 'How do I return or exchange items?',
    answer:
      'Simply tap "Report Issue" on your order within 24 hours. For quality issues, we process instant refunds to your original payment method. For wrong items, we\'ll send the correct one on priority.',
  },
]

function FAQItem({ item, isOpen, onToggle }: {
  item: typeof FAQ_ITEMS[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={cn(
        'rounded-[16px] border transition-all duration-250',
        isOpen
          ? 'border-[color:var(--shop-primary)]/30 bg-[color:var(--shop-primary-soft)]/40 shadow-[var(--shop-shadow-level-1)]'
          : 'border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] hover:border-[color:var(--shop-primary)]/20 hover:bg-[color:var(--shop-surface-subtle)]'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-semibold leading-snug text-[color:var(--shop-ink)]">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-[color:var(--shop-ink-muted)] transition-transform duration-250',
            isOpen && 'rotate-180 text-[color:var(--shop-primary)]'
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-[14px] leading-relaxed text-[color:var(--shop-ink-muted)]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function HomeFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="w-full py-14 md:py-20" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal-on-scroll mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--shop-primary-soft)] px-3.5 py-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-[color:var(--shop-primary)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--shop-primary)]">
              Common Questions
            </span>
          </div>
          <h2
            className="font-extrabold tracking-tight text-[color:var(--shop-ink)]"
            style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}
          >
            Everything you need to know
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[14px] leading-relaxed text-[color:var(--shop-ink-muted)]">
            Quick answers about ordering, delivery, freshness, and more.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="reveal-on-scroll stagger-1 flex flex-col gap-2.5">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal-on-scroll stagger-2 mt-8 text-center">
          <p className="text-[13px] text-[color:var(--shop-ink-faint)]">
            Still have questions?{' '}
            <a
              href="/profile"
              className="font-semibold text-[color:var(--shop-primary)] underline-offset-2 hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
