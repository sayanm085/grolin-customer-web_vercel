'use client'

import { usePathname } from 'next/navigation'
import { BottomNav } from '@/components/layout/BottomNav'
import { ShopFooter } from '@/components/layout/ShopFooter'
import { ShopHeader } from '@/components/layout/ShopHeader'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideFullChrome =
    pathname === '/cart' || pathname === '/checkout' || pathname === '/order-confirmed'

  return (
    <div className="min-h-screen w-full overflow-y-visible warm-canvas">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.58),transparent_44%)]" />

      <div className={`relative w-full ${hideFullChrome ? 'pb-8' : 'pb-[calc(env(safe-area-inset-bottom)+7rem)] lg:pb-6'}`}>
        <div className="flex min-h-screen flex-col">
          {!hideFullChrome && <ShopHeader />}
          <main className={`min-w-0 flex-1 overflow-x-hidden ${hideFullChrome ? 'pb-6' : 'pb-10 lg:pb-4'}`}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          {!hideFullChrome && <ShopFooter />}
        </div>
      </div>
      {!hideFullChrome && <BottomNav />}
    </div>
  )
}
