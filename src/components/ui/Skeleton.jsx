import ReactSkeleton from 'react-loading-skeleton'

import { cn } from '@/utils'

import 'react-loading-skeleton/dist/skeleton.css'

export default function Skeleton({ className, color = 'neutral', ...props }) {
  const colorClasses = {
    neutral: 'from-neutral-500/15! via-neutral-500/25! to-neutral-500/15!',
    teal: 'from-teal-500/15! via-teal-500/25! to-teal-500/15!',
    amber: 'from-amber-500/15! via-amber-500/25! to-amber-500/15!',
    rose: 'from-rose-500/15! via-rose-500/25! to-rose-500/15!',
    sky: 'from-sky-500/15! via-sky-500/25! to-sky-500/15!',
    purple: 'from-purple-500/15! via-purple-500/25! to-purple-500/15!',
    emerald: 'from-emerald-500/15! via-emerald-500/25! to-emerald-500/15!',
  }

  return (
    <ReactSkeleton
      enableAnimation={false}
      className={cn(
        'shimmer bg-transparent! bg-linear-to-r! from-0%! via-50%! to-100%! bg-size-[200%_100%]! after:hidden!',
        colorClasses[color],
        className,
      )}
      {...props}
    />
  )
}
