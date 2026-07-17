import { cn } from '@repo/utils'

export function Tooltip({ children, className, position }) {
  return (
    <div
      className={cn(
        'pointer-events-none invisible absolute z-100 scale-50 rounded-lg bg-neutral-950 px-2 py-1 text-sm whitespace-nowrap text-neutral-50 opacity-0 transition-all group-hover:visible group-hover:scale-100 group-hover:opacity-100',
        position === 'bottom' && 'top-full left-1/2 mt-4 translate-x-[-50%]',
        position === 'top' && 'bottom-full left-1/2 mb-4 translate-x-[-50%]',
        position === 'right' && 'top-1/2 left-full ml-4 translate-y-[-50%]',
        position === 'left' && 'top-1/2 right-full mr-4 translate-y-[-50%]',
        className,
      )}
    >
      {children}
    </div>
  )
}
