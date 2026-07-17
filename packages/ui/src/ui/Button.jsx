import { cn } from '@repo/utils'

const variants = {
  primary:
    'bg-neutral-800 dark:bg-accent-500 hover:bg-neutral-700 dark:hover:bg-accent-400 text-neutral-50 dark:text-neutral-950',
  ghost: 'hover:bg-neutral-200',
  ghostDanger: 'hover:bg-red-500/25 hover:text-red-600 dark:hover:text-red-400',
  outline:
    'border border-neutral-300  bg-neutral-50 dark:bg-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-300',
  outlineDanger:
    'border border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/25 dark:hover:bg-red-500/25',
}

const sizes = {
  sm: 'px-2 py-1 text-sm rounded-lg',
  md: 'px-4 py-2 rounded-lg',
  lg: 'px-5 py-3 text-lg rounded-xl',
  'sm-square': 'px-2 py-2 text-sm rounded-lg',
  'md-square': 'px-2 py-2 rounded-lg',
  'lg-square': 'px-3 py-3 text-lg rounded-xl',
}

export function Button({ children, className, variant = 'primary', size = 'md', icon, ...rest }) {
  return (
    <button
      className={cn(
        'group flex-center relative cursor-pointer gap-2 px-4 py-2 text-left font-medium text-nowrap text-neutral-950 capitalize transition-all disabled:pointer-events-none disabled:opacity-50',
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
