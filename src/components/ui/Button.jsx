import { cn } from '@/utils'

const variants = {
  primary:
    'bg-accent-500 hover:bg-accent-600 dark:hover:bg-accent-400 text-neutral-50 dark:text-neutral-950',
  'neutral-primary':
    'bg-neutral-800 dark:bg-accent-500 hover:bg-neutral-700 dark:hover:bg-accent-400 text-neutral-50 dark:text-neutral-950',
  dangerGhost: 'hover:bg-red-500/25 hover:text-red-600 dark:hover:text-red-400',
  ghost: 'hover:bg-neutral-200',
  outline:
    'border border-neutral-300  bg-neutral-50 dark:bg-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-300',
}

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
  'sm-square': 'px-1 py-1 text-sm',
  'md-square': 'px-2 py-2',
  'lg-square': 'px-4 py-4 text-lg',
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  ...rest
}) {
  return (
    <button
      className={cn(
        'group relative flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-medium text-neutral-950 capitalize transition-all disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {icon} {children}
    </button>
  )
}
