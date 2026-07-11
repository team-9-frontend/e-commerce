import { cn } from '@/utils'

export default function Badge({ className, children, color = 'accent' }) {
  return (
    <span
      className={cn(
        'rounded-full border px-2 py-0.5 text-xs tracking-wider',
        `bg-${color}-500/15 border-${color}-500/25 text-${color}-600 dark:text-${color}-400`,
        className,
      )}
    >
      {children}
    </span>
  )
}
