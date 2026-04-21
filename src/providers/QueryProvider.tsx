'use client'

import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createQueryClient } from '@/lib/queryClient'

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => createQueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === 'development' &&
                process.env.NEXT_PUBLIC_SHOW_DEVTOOLS === 'true' && (
                    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
                )}
        </QueryClientProvider>
    )
}
