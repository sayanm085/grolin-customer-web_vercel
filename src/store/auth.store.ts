import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/types/user.types'

export const AUTH_CACHE_KEY = 'grolin_user_v2'

interface AuthState {
    user: User | null
    isLoggedIn: boolean
    isLoading: boolean
}

interface AuthActions {
    setUser: (user: User) => void
    updateUser: (partial: Partial<User>) => void
    logout: () => void
    setLoading: (v: boolean) => void
}

function readStoredToken() {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem('accessToken')
}

function readCachedUser(): User | null {
    if (typeof window === 'undefined') return null

    try {
        const raw = window.localStorage.getItem(AUTH_CACHE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw) as Partial<User>
        if (!parsed || typeof parsed !== 'object' || !parsed.id || !parsed.phone) {
            return null
        }

        return {
            id: String(parsed.id),
            phone: String(parsed.phone),
            name: parsed.name ?? null,
            email: parsed.email ?? null,
            role: parsed.role ?? 'CUSTOMER',
            avatar_url: parsed.avatar_url ?? null,
            birthday: parsed.birthday ?? null,
            loyalty_points: Number(parsed.loyalty_points ?? 0),
            referral_code: parsed.referral_code ?? null,
        }
    } catch {
        return null
    }
}

function cacheUser(user: User | null) {
    if (typeof window === 'undefined') return

    if (!user) {
        window.localStorage.removeItem(AUTH_CACHE_KEY)
        return
    }

    window.localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify(user))
}

const initialUser = readCachedUser()
const hasToken = Boolean(readStoredToken())

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            user: initialUser,
            isLoggedIn: Boolean(initialUser && hasToken),
            isLoading: hasToken && !initialUser,

            setUser: (user) => {
                cacheUser(user)
                set({ user, isLoggedIn: true, isLoading: false })
            },

            updateUser: (partial) =>
                set((state) => {
                    const nextUser = state.user ? { ...state.user, ...partial } : null
                    cacheUser(nextUser)
                    return {
                        user: nextUser,
                        isLoggedIn: Boolean(nextUser),
                    }
                }),

            logout: () => {
                if (typeof window !== 'undefined') {
                    window.localStorage.removeItem('accessToken')
                    window.localStorage.removeItem('refreshToken')
                    window.localStorage.removeItem('grolin-auth')
                }
                cacheUser(null)
                if (typeof document !== 'undefined') {
                    document.cookie = 'accessToken=; path=/; max-age=0'
                }
                set({ user: null, isLoggedIn: false, isLoading: false })
            },

            setLoading: (v) => set({ isLoading: v }),
        }),
        {
            name: 'grolin-auth',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
            onRehydrateStorage: () => (state) => {
                if (!state) return
                if (state.user) {
                    cacheUser(state.user)
                }
                state.setLoading(false)
            },
        },
    ),
)
