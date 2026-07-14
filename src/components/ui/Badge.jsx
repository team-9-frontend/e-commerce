import { cn } from '@/utils'

export default function Badge({ children, className, color = 'accent' }) {
  const colorClasses = {
    accent: 'before:bg-accent-500/15 border-accent-500/25 text-accent-700 dark:text-accent-400',
    teal: 'before:bg-teal-500/15 border-teal-500/25 text-teal-700 dark:text-teal-400',
    amber: 'before:bg-amber-500/15 border-amber-500/25 text-amber-700 dark:text-amber-400',
    rose: 'before:bg-rose-500/15 border-rose-500/25 text-rose-700 dark:text-rose-400',
    sky: 'before:bg-sky-500/15 border-sky-500/25 text-sky-700 dark:text-sky-400',
    purple: 'before:bg-purple-500/15 border-purple-500/25 text-purple-700 dark:text-purple-400',
    emerald: 'before:bg-emerald-500/15 border-emerald-500/25 text-emerald-700 dark:text-emerald-400',
  }

  return (
    <span
      className={cn(
        'relative rounded-full border bg-neutral-50 px-2 py-0.5 text-xs tracking-wider before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:content-[""]',
        colorClasses[color],
        className,
      )}
    >
      {children}
    </span>
  )
}
