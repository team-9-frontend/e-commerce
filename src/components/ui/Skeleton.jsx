import ReactSkeleton from 'react-loading-skeleton'

import { cn } from '@/utils'

import 'react-loading-skeleton/dist/skeleton.css'

export default function Skeleton({ className, color = 'neutral', ...props }) {
  const colorClasses = {
    neutral:
      'bg-neutral-500/15!  after:from-neutral-500/15! after:via-neutral-500/25! after:to-neutral-500/15!',
    teal: 'bg-teal-500/15!  after:from-teal-500/15! after:via-teal-500/25! after:to-teal-500/15!',
    amber:
      'bg-amber-500/15!  after:from-amber-500/15! after:via-amber-500/25! after:to-amber-500/15!',
    rose: 'bg-rose-500/15!  after:from-rose-500/15! after:via-rose-500/25! after:to-rose-500/15!',
    sky: 'bg-sky-500/15!  after:from-sky-500/15! after:via-sky-500/25! after:to-sky-500/15!',
    purple:
      'bg-purple-500/15!  after:from-purple-500/15! after:via-purple-500/25! after:to-purple-500/15!',
    lime: 'bg-lime-500/15!  after:from-lime-500/15! after:via-lime-500/25! after:to-lime-500/15!',
  }

  return (
    <ReactSkeleton
      className={cn(
        'after:bg-linear-to-r! after:from-0%! after:via-50%! after:to-100%! after:blur-md!',
        colorClasses[color],
        className,
      )}
      {...props}
    />
  )
}
