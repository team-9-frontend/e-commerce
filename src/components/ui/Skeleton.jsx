import ReactSkeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

export default function Skeleton({ ...props }) {
  return (
    <ReactSkeleton
      baseColor="hsl(from var(--color-neutral-500) h s l / 0.2)"
      highlightColor="hsl(from var(--color-neutral-500) h s l / 0.3)"
      {...props}
    />
  )
}
