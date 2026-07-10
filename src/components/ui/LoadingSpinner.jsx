import { cn } from '@/utils'

export default function LoadingSpinner({ className }) {
  return (
    <div className={cn('flex-center', className)}>
      <div role="status" class="relative size-full rounded-full bg-neutral-800">
        <div class="absolute h-full w-full animate-ping rounded-full bg-neutral-800 dark:bg-slate-50"></div>
        <div class="absolute h-full w-full animate-ping rounded-full bg-neutral-800 delay-200 dark:bg-slate-50"></div>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  )
}
