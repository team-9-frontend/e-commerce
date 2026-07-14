import { format } from 'date-fns'
import { LuStar, LuText } from 'react-icons/lu'

import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

export default function ProductReviews({ classNmae, isLoading, reviews }) {
  return (
    <div className={cn('flex flex-col gap-4', classNmae)}>
      <div className="card flex flex-col gap-4 p-4">
        <h2 className="flex items-center gap-2 font-bold text-neutral-950 capitalize">
          <LuText /> reviews
        </h2>
      </div>

      {!isLoading && !reviews?.length ? (
        <div className="card p-4 text-neutral-500">No reviews yet.</div>
      ) : (
        Array.from({ length: isLoading ? 3 : reviews?.length }).map((_, i) => {
          const review = reviews?.[i]

          return (
            <div key={i} className="card flex flex-col gap-2 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="line-clamp-1 font-bold sm:text-lg">
                    {!isLoading ? review.username : <Skeleton width={96} />}
                  </h3>

                  <p className="flex items-center gap-2 text-amber-500">
                    {!isLoading ? (
                      <>
                        <LuStar /> {review.rating}/5
                      </>
                    ) : (
                      <Skeleton width={64} />
                    )}
                  </p>
                </div>

                <span className="text-sm text-neutral-600">
                  {!isLoading ? format(review.createdAt, 'MMM d, yyyy') : <Skeleton width={64} />}
                </span>
              </div>

              <p className="font-medium text-neutral-600">
                {!isLoading ? review.comment : <Skeleton width="80%" />}
              </p>
            </div>
          )
        })
      )}
    </div>
  )
}
