import ReactSkeleton from 'react-loading-skeleton'

import { cn } from '@/utils'

import 'react-loading-skeleton/dist/skeleton.css'

export default function Skeleton({ className, color = 'neutral', ...props }) {
  return (
    <ReactSkeleton
      className={cn(
        `bg-${color}-500/15! after:bg-linear-to-r! after:from-${color}-500/15! after:via-${color}-500/25! after:to-${color}-500/15! after:from-0%! after:via-50%! after:to-100%! after:blur-md!`,
        className,
      )}
      {...props}
    />
  )
}
