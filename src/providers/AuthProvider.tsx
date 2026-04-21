'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth.service'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { setUser, setLoading, logout, user } = useAuthStore()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
            setLoading(false)
            return
        }

        if (user) {
            setLoading(false)
        }

        let cancelled = false

        authService
            .getProfile()
            .then((freshUser) => {
                if (!cancelled) {
                    setUser(freshUser)
                }
            })
            .catch(() => {
                if (!cancelled) {
                    logout()
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [logout, setLoading, setUser, user])

    return <>{children}</>
}
