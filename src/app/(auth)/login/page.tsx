'use client'

import { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'
import { phoneSchema } from '@/lib/validations'

const schema = z.object({ phone: phoneSchema })
type FormData = z.infer<typeof schema>

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    )
}

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async ({ phone }: FormData) => {
        try {
            const fullPhone = `+91${phone}`
            await authService.sendOtp(fullPhone)
            const redirect = searchParams.get('redirect') ?? '/'
            router.push(`/otp?phone=${encodeURIComponent(fullPhone)}&redirect=${encodeURIComponent(redirect)}`)
        } catch {
            toast.error('Could not send OTP. Please try again.')
        }
    }

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--shop-primary-strong)]">
                    Sign In
                </p>
                <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[color:var(--shop-ink)] sm:text-[38px]">
                    Welcome back
                </h1>
                <p className="max-w-sm text-[15px] leading-7 text-[color:var(--shop-ink-muted)]">
                    Enter your mobile number to get your secure one-time password.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--shop-ink-muted)]">
                        Mobile Number
                    </label>
                    <div className="flex h-[52px] overflow-hidden rounded-[12px] border-[1.5px] border-[color:var(--shop-border)] bg-[color:var(--shop-canvas)] transition-colors focus-within:border-[color:var(--shop-primary)]">
                        <div className="flex h-full shrink-0 items-center gap-1.5 border-r border-[color:var(--shop-border)] px-3">
                            <span className="text-[12px] font-bold leading-none tracking-[0.08em] text-[color:var(--shop-ink-muted)]">IN</span>
                            <span className="text-[13px] font-semibold text-[color:var(--shop-ink)]">+91</span>
                        </div>
                        <input
                            {...register('phone')}
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="Enter 10-digit number"
                            autoFocus
                            autoComplete="tel"
                            className="flex-1 border-0 bg-[color:var(--shop-canvas)] px-3 text-[15px] font-medium tracking-[0.18em] text-[color:var(--shop-ink)] outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-[color:var(--shop-ink-muted)]"
                        />
                    </div>
                    {errors.phone && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[color:var(--shop-danger)]">
                            <span className="h-1 w-1 rounded-full bg-[color:var(--shop-danger)]" />
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[color:var(--shop-primary)] text-[15px] font-semibold text-white transition-all hover:bg-[color:var(--shop-primary-hover)] active:scale-[0.99] disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <>
                            Get OTP
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}
