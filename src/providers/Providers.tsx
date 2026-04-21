'use client'

import { QueryProvider } from './QueryProvider'
import { AuthProvider } from './AuthProvider'
import { SocketProvider } from './SocketProvider'
import { Toaster } from '@/components/ui/sonner'
import { ShopThemeProvider } from '@/components/theme/ShopThemeProvider'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <AuthProvider>
                <SocketProvider>
                    <ShopThemeProvider>
                        {children}
                        <Toaster
                            position="bottom-right"
                            toastOptions={{
                                classNames: {
                                    toast: 'border border-[color:var(--shop-border)] bg-white/98 shadow-[var(--shop-shadow-level-5)] rounded-[16px] pl-4 pr-3 py-3',
                                    title: 'text-[14px] font-medium text-[color:var(--shop-ink)]',
                                    description: 'text-[12px] text-[color:var(--shop-ink-muted)]',
                                },
                            }}
                            richColors
                            closeButton
                            visibleToasts={3}
                            offset={{ right: 24, bottom: 24 }}
                            mobileOffset={{ left: 16, right: 16, bottom: 84 }}
                            duration={3000}
                        />
                    </ShopThemeProvider>
                </SocketProvider>
            </AuthProvider>
        </QueryProvider>
    )
}

