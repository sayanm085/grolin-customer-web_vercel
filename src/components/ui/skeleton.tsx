import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('skeleton-warm rounded-md motion-reduce:animate-none', className)} {...props} />
  )
}

export { Skeleton }
