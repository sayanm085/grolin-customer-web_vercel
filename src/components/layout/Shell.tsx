interface ShellProps {
    children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
    return (
        <div className="min-h-screen warm-canvas">
            <div className="mx-auto max-w-[1440px] rounded-[40px] bg-white p-4 shadow-[var(--shop-shadow-level-3)] md:p-6 lg:p-8">
                {children}
            </div>
        </div>
    )
}