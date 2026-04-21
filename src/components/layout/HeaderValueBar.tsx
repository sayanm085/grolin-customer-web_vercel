'use client'

const TRUST_MESSAGES = ['30 min delivery', 'Fresh guarantee', 'Easy returns'] as const

export function HeaderValueBar() {
  const tickerItems = [...TRUST_MESSAGES, ...TRUST_MESSAGES]

  return (
    <div className="bg-[linear-gradient(90deg,var(--shop-primary)_0%,#4B74BE_52%,var(--shop-action)_100%)] text-white">
      <div className="flex h-[34px] items-center justify-center px-3 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden md:hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[color:var(--shop-primary)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[color:var(--shop-action)] to-transparent" />
          <div className="header-value-ticker flex min-w-max items-center gap-6 whitespace-nowrap text-[12px] font-semibold leading-none text-white">
            {tickerItems.map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-6">
                {index > 0 ? <span className="text-white/70">&middot;</span> : null}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="hidden items-center justify-center gap-3 text-[12px] font-semibold leading-none text-white md:flex">
          {TRUST_MESSAGES.map((item, index) => (
            <div key={item} className="inline-flex items-center gap-3">
              {index > 0 ? <span className="text-white/70">&middot;</span> : null}
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .header-value-ticker {
          animation: headerTicker 14s linear infinite;
        }

        @keyframes headerTicker {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </div>
  )
}
