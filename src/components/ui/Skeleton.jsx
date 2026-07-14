import { cn } from '@/utils'

const colorClasses = {
  neutral: 'from-neutral-500/15! via-neutral-500/25! to-neutral-500/15!',
  teal: 'from-teal-500/15! via-teal-500/25! to-teal-500/15!',
  amber: 'from-amber-500/15! via-amber-500/25! to-amber-500/15!',
  rose: 'from-rose-500/15! via-rose-500/25! to-rose-500/15!',
  sky: 'from-sky-500/15! via-sky-500/25! to-sky-500/15!',
  purple: 'from-purple-500/15! via-purple-500/25! to-purple-500/15!',
  emerald: 'from-emerald-500/15! via-emerald-500/25! to-emerald-500/15!',
}

export default function Skeleton({
  count = 1,
  circle = false,
  width,
  height,
  color = 'neutral',
  className,
  style,
  ...rest
}) {
  return (
    <span className="leading-inherit">
      {Array.from({ length: count }).map((_, i) => (
        <>
          <span
            key={i}
            className={cn(
              'shimmer inline-block bg-transparent! bg-linear-to-r! from-0%! via-50%! to-100%! bg-size-[200%_100%]! align-middle',
              colorClasses[color],
              circle ? 'rounded-full' : 'rounded',
              !width && 'w-full',
              !height && 'min-h-[1em]',
              className,
            )}
            style={{
              ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
              ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
              ...style,
            }}
            aria-hidden="true"
            {...rest}
          />
          {i < count - 1 && <br />}
        </>
      ))}
      &zwnj;
    </span>
  )
}
