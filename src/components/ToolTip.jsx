import { cn } from '../utils/cn'

export default function ToolTip({ children, position }) {
  return (
    <div
      className={cn(
        'pointer-events-none invisible absolute translate-x-[-50%] translate-y-[-50%] scale-50 rounded-xl bg-neutral-950 px-2 py-1 whitespace-nowrap text-neutral-50 opacity-0 transition-all group-hover:visible group-hover:scale-100 group-hover:opacity-100',
        position === 'bottom' && 'top-full left-1/2 translate-y-4',
        position === 'top' && 'bottom-full left-1/2 translate-y-4',
        position === 'right' && 'top-1/2 left-full translate-x-4',
        position === 'left' && 'top-1/2 right-full translate-x-4',
      )}
    >
      {children}
    </div>
  )
}
