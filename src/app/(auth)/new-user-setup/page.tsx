'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, User } from 'lucide-react'
import { toast } from 'sonner'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'

export default function NewUserSetupPage() {
    const router = useRouter()
    const { user, setUser } = useAuthStore()
    const [name, setName] = useState(user?.name ?? '')
    const [email, setEmail] = useState(user?.email ?? '')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        document.title = 'Complete Your Profile — Grolin'
    }, [])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (!name.trim()) {
            toast.error('Please enter your name')
            return
        }

        setIsSubmitting(true)
        try {
            const updated = await authService.updateProfile({
                name: name.trim(),
                email: email.trim() || undefined,
            })
            setUser(updated)
            toast.success('Welcome to Grolin! 🎉')
            router.push('/')
        } catch {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--shop-seasonal-accent-wash)]">
                        <User className="h-8 w-8 text-[color:var(--shop-primary)]" strokeWidth={1.5} />
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--shop-primary-strong)]">New profile</p>
                    <h1 className="mt-2 text-[32px] font-extrabold leading-[1.06] tracking-[-0.03em] text-[color:var(--shop-ink)]">Welcome! 👋</h1>
                    <p className="mt-2 text-[15px] leading-7 text-[color:var(--shop-ink-muted)]">Let&apos;s set up your profile</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--shop-ink-muted)]">
                            Your Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter your name"
                            className="w-full rounded-xl border border-[color:var(--shop-border)] bg-[color:var(--shop-canvas)] px-4 py-3 text-[15px] font-medium text-[color:var(--shop-ink)] placeholder:text-[color:var(--shop-ink-faint)] focus:border-[color:var(--shop-primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--shop-primary)]"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--shop-ink-muted)]">
                            Email <span className="font-medium normal-case tracking-normal text-[color:var(--shop-ink-faint)]">(optional)</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="yourname@example.com"
                            className="w-full rounded-xl border border-[color:var(--shop-border)] bg-[color:var(--shop-canvas)] px-4 py-3 text-[15px] font-medium text-[color:var(--shop-ink)] placeholder:text-[color:var(--shop-ink-faint)] focus:border-[color:var(--shop-primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--shop-primary)]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!name.trim() || isSubmitting}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--shop-primary)] text-[15px] font-semibold tracking-tight text-white transition-colors hover:bg-[color:var(--shop-primary-hover)] disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue →'}
                    </button>
                </form>
            </div>
        </div>
    )
}
