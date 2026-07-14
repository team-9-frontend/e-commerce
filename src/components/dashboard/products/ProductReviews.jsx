import { format } from 'date-fns'
import { LuStar, LuText } from 'react-icons/lu'

import { cn } from '@/utils'

export default function ProductReviews({ classNmae, reviews }) {
  if (!reviews.length) {
    return <div className="card p-4 text-neutral-500">No reviews yet.</div>
  }

  return (
    <div className={cn('flex flex-col gap-4', classNmae)}>
      <div className="card flex flex-col gap-4 p-4">
        <h2 className="flex items-center gap-2 font-bold text-neutral-950 capitalize">
          <LuText /> reviews
        </h2>
      </div>

      {reviews.map((review, i) => (
        <div key={i} className="card flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="line-clamp-1 font-bold sm:text-lg">{review.username}</h3>

              <p className="flex items-center gap-2 text-amber-500">
                <LuStar /> {review.rating}/5
              </p>
            </div>

            <small>{format(review.createdAt, 'MMM d, yyyy')}</small>
          </div>

          <p className="font-medium text-neutral-600">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
