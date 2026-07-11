import { cn } from '@/utils'

export default function Badge({ children, className, color = 'accent' }) {
  const colorClasses = {
    accent: 'bg-accent-500/15 border-accent-500/25 text-accent-600 dark:text-accent-400',
    teal: 'bg-teal-500/15 border-teal-500/25 text-teal-600 dark:text-teal-400',
    amber: 'bg-amber-500/15 border-amber-500/25 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-500/15 border-rose-500/25 text-rose-600 dark:text-rose-400',
    sky: 'bg-sky-500/15 border-sky-500/25 text-sky-600 dark:text-sky-400',
    purple: 'bg-purple-500/15 border-purple-500/25 text-purple-600 dark:text-purple-400',
    lime: 'bg-lime-500/15 border-lime-500/25 text-lime-600 dark:text-lime-400',
  }

  return (
    <span
      className={cn(
        'rounded-full border px-2 py-0.5 text-xs tracking-wider',
        colorClasses[color],
        className,
      )}
    >
      {children}
    </span>
  )
}
