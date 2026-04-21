'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, RefreshCw } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { authService } from '@/services/auth.service'
import { OTP_RESEND_SECONDS } from '@/lib/constants'
import { formatPhone } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'
import { toast } from 'sonner'

export default function OtpPage() {
    return (
        <Suspense>
            <OtpForm />
        </Suspense>
    )
}

function OtpForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const phone = searchParams.get('phone') ?? ''
    const redirect = searchParams.get('redirect') ?? '/'

    const { setUser } = useAuthStore()
    const [otp, setOtp] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [error, setError] = useState('')
    const [countdown, setCountdown] = useState(OTP_RESEND_SECONDS)
    const [canResend, setCanResend] = useState(false)

    useEffect(() => {
        if (countdown <= 0) {
            setCanResend(true)
            return
        }
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
        return () => clearTimeout(t)
    }, [countdown])

    const verifyOtp = useCallback(async (otpValue?: string) => {
        const code = otpValue ?? otp
        if (code.length !== 6 || isVerifying) return
        setIsVerifying(true)
        setError('')
        try {
            const result = await authService.verifyOtp(phone, code)
            localStorage.setItem('accessToken', result.accessToken)
            localStorage.setItem('refreshToken', result.refreshToken)
            document.cookie = `accessToken=${result.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
            setUser(result.user)

            if (result.isNewUser) {
                router.push('/profile/edit?new=true')
            } else {
                router.push(redirect)
            }
        } catch {
            setError('Incorrect OTP. Please try again.')
            setOtp('')
        } finally {
            setIsVerifying(false)
        }
    }, [isVerifying, otp, phone, redirect, router, setUser])

    useEffect(() => {
        if (otp.length === 6) {
            const timer = setTimeout(() => verifyOtp(otp), 100)
            return () => clearTimeout(timer)
        }
        return undefined
    }, [otp, verifyOtp])

    useEffect(() => {
        if (!phone) {
            router.replace(`/login?redirect=${encodeURIComponent(redirect)}`)
        }
    }, [phone, redirect, router])

    const resendOtp = async () => {
        if (!canResend) return
        try {
            await authService.sendOtp(phone)
            setCountdown(OTP_RESEND_SECONDS)
            setCanResend(false)
            setError('')
            toast.success('New OTP sent!')
        } catch {
            toast.error('Could not resend OTP')
        }
    }

    if (!phone) {
        return null
    }

    return (
        <div className="space-y-7">
            <div className="space-y-4">
                <Link
                    href={`/login?redirect=${encodeURIComponent(redirect)}`}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-tight text-[color:var(--shop-ink-muted)] transition-colors hover:text-[color:var(--shop-ink)]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Change number
                </Link>

                <div className="space-y-2">
                    <h1 className="text-[32px] font-extrabold leading-[1.06] tracking-[-0.03em] text-[color:var(--shop-ink)] sm:text-[36px]">
                        Verify OTP
                    </h1>
                    <p className="text-[15px] leading-7 text-[color:var(--shop-ink-muted)]">
                        We sent a 6-digit code to{' '}
                        <span className="font-semibold text-[color:var(--shop-ink)]">{formatPhone(phone)}</span>
                    </p>
                </div>
            </div>

            <div className="flex justify-center py-1">
                <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={isVerifying}>
                    <InputOTPGroup className="gap-2 sm:gap-2.5">
                        {Array.from({ length: 6 }).map((_, i) => {
                            const isFilled = Boolean(otp[i])
                            const isActiveSlot = otp.length < 6 && i === otp.length

                            return (
                                <InputOTPSlot
                                    key={i}
                                    index={i}
                                    className={[
                                        'h-[52px] w-[52px] rounded-[12px] border-[1.5px] text-lg font-bold text-[color:var(--shop-ink)] transition-all',
                                        isFilled || isActiveSlot
                                            ? 'border-[color:var(--shop-primary)] bg-[color:var(--shop-primary-soft)]'
                                            : 'border-[color:var(--shop-border)] bg-[color:var(--shop-canvas)]',
                                    ].join(' ')}
                                />
                            )
                        })}
                    </InputOTPGroup>
                </InputOTP>
            </div>

            {isVerifying && (
                <div className="flex items-center justify-center gap-2 py-1 text-[14px] font-medium text-[color:var(--shop-ink-muted)]">
                    <Loader2 className="h-4 w-4 animate-spin text-[color:var(--shop-primary)]" />
                    Verifying...
                </div>
            )}

            {error && (
                <div className="text-center">
                    <p className="inline-block rounded-full bg-red-50 px-4 py-2 text-[13px] font-medium text-[color:var(--shop-danger)]">
                        {error}
                    </p>
                </div>
            )}

            <div className="text-center text-[14px]">
                {canResend ? (
                    <button
                        onClick={resendOtp}
                        className="inline-flex items-center gap-1.5 font-semibold tracking-tight text-[color:var(--shop-primary)] transition-colors hover:text-[color:var(--shop-primary-hover)]"
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Resend OTP
                    </button>
                ) : (
                    <span className="font-medium text-[color:var(--shop-ink-muted)]">
                        Resend code in{' '}
                        <span className="font-semibold tabular-nums text-[color:var(--shop-ink-muted)]">
                            0:{String(countdown).padStart(2, '0')}
                        </span>
                    </span>
                )}
            </div>
        </div>
    )
}
