import { cn } from '@/utils'

const variants = {
  primary:
    'bg-accent-500 hover:bg-accent-600 dark:hover:bg-accent-400 text-neutral-50 dark:text-neutral-950',
  dangerGhost: 'hover:bg-red-500/25 hover:text-red-600 dark:hover:text-red-400',
  ghost: 'hover:bg-neutral-200',
}

export default function Button({ children, className, variant = 'primary', icon, ...rest }) {
  return (
    <button
      className={cn(
        'group relative flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 font-medium text-neutral-950 capitalize disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        icon && 'p-2',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
