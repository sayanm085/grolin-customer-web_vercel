'use client'

import { useEffect } from 'react'

const GROLIN_CONFETTI_COLORS = ['#16945E', '#6E49D8', '#E3B93C', '#ffffff']

export function ConfettiEffect() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return
        }

        let cancelled = false

        const fire = async () => {
            const confettiModule = await import('canvas-confetti')
            const confetti = confettiModule.default

            if (cancelled) return

            confetti({
                particleCount: 50,
                spread: 26,
                startVelocity: 55,
                origin: { y: 0.68 },
                colors: GROLIN_CONFETTI_COLORS,
            })

            window.setTimeout(() => {
                confetti({
                    particleCount: 40,
                    spread: 60,
                    startVelocity: 45,
                    origin: { y: 0.68 },
                    colors: GROLIN_CONFETTI_COLORS,
                })
            }, 150)

            window.setTimeout(() => {
                confetti({
                    particleCount: 70,
                    spread: 100,
                    decay: 0.91,
                    scalar: 0.8,
                    origin: { y: 0.68 },
                    colors: GROLIN_CONFETTI_COLORS,
                })
            }, 300)
        }

        void fire()

        return () => {
            cancelled = true
        }
    }, [])

    return null
}
