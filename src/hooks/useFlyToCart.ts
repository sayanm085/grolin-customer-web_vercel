'use client'

import { useCallback } from 'react'

interface FlyConfig {
  imageUrl: string
  fromElement: HTMLElement
  toElement: HTMLElement
}

function dispatchCartEvent() {
  window.dispatchEvent(new CustomEvent('grolin:cart-item-added'))
}

export function useFlyToCart() {
  return useCallback(({ imageUrl, fromElement, toElement }: FlyConfig) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      dispatchCartEvent()
      return
    }

    const fromRect = fromElement.getBoundingClientRect()
    const toRect = toElement.getBoundingClientRect()
    const startX = fromRect.left + fromRect.width / 2 - 22
    const startY = fromRect.top + fromRect.height / 2 - 22
    const endX = toRect.left + toRect.width / 2 - 12
    const endY = toRect.top + toRect.height / 2 - 12
    const lift = Math.min(96, Math.max(42, Math.abs(endY - startY) * 0.28 + 36))

    const flyer = document.createElement('div')
    flyer.setAttribute('aria-hidden', 'true')
    flyer.setAttribute('data-fly-to-cart', 'true')
    flyer.style.cssText = [
      'position:fixed',
      'left:0',
      'top:0',
      'width:44px',
      'height:44px',
      'border-radius:12px',
      'overflow:hidden',
      'pointer-events:none',
      'z-index:9999',
      'background:white',
      'box-shadow:0 10px 28px rgba(24,39,75,0.18)',
      'transform:translate3d(' + startX + 'px,' + startY + 'px,0) scale(1)',
      'will-change:transform,opacity,width,height'
    ].join(';')

    const img = document.createElement('img')
    img.src = imageUrl
    img.alt = ''
    img.style.cssText = 'width:100%;height:100%;object-fit:contain;padding:4px;background:white;display:block;'
    flyer.appendChild(img)
    document.body.appendChild(flyer)

    let cleaned = false
    const cleanup = () => {
      if (cleaned) return
      cleaned = true
      flyer.remove()
      dispatchCartEvent()
    }

    const midpointX = startX + (endX - startX) * 0.58
    const midpointY = Math.min(startY, endY) - lift

    const animation = flyer.animate(
      [
        { transform: `translate3d(${startX}px, ${startY}px, 0) scale(1)`, opacity: 1, width: '44px', height: '44px' },
        { transform: `translate3d(${midpointX}px, ${midpointY}px, 0) scale(0.88)`, opacity: 1, width: '40px', height: '40px', offset: 0.55 },
        { transform: `translate3d(${endX}px, ${endY}px, 0) scale(0.3)`, opacity: 0, width: '24px', height: '24px' },
      ],
      {
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards',
      },
    )

    animation.addEventListener('finish', cleanup, { once: true })
    window.setTimeout(cleanup, 750)
  }, [])
}
