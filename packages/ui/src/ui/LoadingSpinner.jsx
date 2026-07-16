import { cn } from '@repo/utils'

export function LoadingSpinner({ className }) {
  return (
    <div className={cn('flex-center', className)}>
      <div role="status" className="relative size-full rounded-full bg-neutral-800">
        <div className="absolute h-full w-full animate-ping rounded-full bg-neutral-800 dark:bg-slate-50"></div>
        <div className="absolute h-full w-full animate-ping rounded-full bg-neutral-800 delay-200 dark:bg-slate-50"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
