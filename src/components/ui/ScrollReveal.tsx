'use client'
import { useEffect, useRef } from 'react'

export function ScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -32px 0px' }
    )

    // Use idle callback to avoid blocking first paint
    const scheduleObserve = (typeof requestIdleCallback !== 'undefined')
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 1)

    scheduleObserve(() => {
      const targets = document.querySelectorAll('.reveal-on-scroll, .reveal-scale')
      targets.forEach((el) => {
        // Immediately reveal elements already in viewport (above-fold fix)
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible')
        } else {
          observerRef.current?.observe(el)
        }
      })
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return null
}
