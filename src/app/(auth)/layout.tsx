import Link from 'next/link'
import { Check, ShoppingBag } from 'lucide-react'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[var(--shop-page-gradient)] lg:flex">
            <div className="shop-hero-surface grain-overlay relative hidden min-h-screen overflow-hidden lg:flex lg:w-1/2">
                <div className="absolute bottom-10 right-12 h-[240px] w-[240px] rounded-full bg-white/[0.08]" />
                <div className="absolute bottom-24 right-40 h-[180px] w-[180px] rounded-full bg-white/[0.06]" />
                <div className="absolute bottom-44 right-8 h-[120px] w-[120px] rounded-full bg-white/[0.04]" />
                <div className="absolute bottom-2 right-60 h-[160px] w-[160px] rounded-full bg-white/[0.05]" />

                <div className="relative z-10 flex w-full flex-col justify-between px-12 py-14 text-white xl:px-16 xl:py-16">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.14] backdrop-blur-sm">
                                <ShoppingBag className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Grolin</span>
                        </Link>
                    </div>

                    <div className="max-w-md space-y-8">
                        <div className="space-y-4">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/65">
                                Everyday Grocery
                            </p>
                            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-[-0.025em]">
                                Your neighbourhood grocery, delivered fresh
                            </h1>
                        </div>

                        <div className="space-y-3.5 text-base text-white/88">
                            {['30 min delivery', 'Fresh guarantee', 'Easy returns'].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.12]">
                                        <Check className="h-4 w-4" />
                                    </span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs text-white/50">
                        Copyright {new Date().getFullYear()} Grolin Grocery. All rights reserved.
                    </p>
                </div>
            </div>

            <div className="flex min-h-screen flex-1 items-center justify-center px-4 py-6 sm:px-6 lg:w-1/2 lg:px-10 lg:py-10">
                <div className="w-full max-w-[520px]">
                    <div className="rounded-[24px] bg-[color:var(--shop-surface)] p-6 shadow-[var(--shop-shadow-level-3)] sm:p-10">
                        {children}
                    </div>

                    <p className="mt-6 text-center text-xs text-[color:var(--shop-ink-muted)]">
                        By continuing, you agree to our{' '}
                        <span className="cursor-pointer text-[color:var(--shop-ink)] hover:underline">Terms of Service</span>{' '}
                        and{' '}
                        <span className="cursor-pointer text-[color:var(--shop-ink)] hover:underline">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    )
}