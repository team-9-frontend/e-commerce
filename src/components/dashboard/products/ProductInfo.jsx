import { LuShoppingBag, LuStar, LuTag } from 'react-icons/lu'

import Skeleton from '@/components/ui/Skeleton'

import ProductStats from './ProductStats'

export default function ProductInfo({ isLoading, product }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="card space-y-2 p-4">
        <h2 className="text-3xl">{!isLoading ? product.name : <Skeleton width="50%" />}</h2>
        <p className="text-sm wrap-anywhere text-neutral-500">
          {!isLoading ? (
            product.description
          ) : (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
        </p>
      </div>

      <ProductStats product={product} isLoading={isLoading} />

      <div className="card flex flex-col gap-4 p-4">
        <h2 className="flex items-center gap-2 font-bold text-neutral-950 capitalize">
          <LuTag /> tags
        </h2>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: isLoading ? 3 : product.tags?.length }).map((_, i) => {
            const tag = product?.tags?.[i]

            return !isLoading ? (
              <span
                key={i}
                className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-200"
              >
                #${tag}
              </span>
            ) : (
              <Skeleton width={48} />
            )
          })}
        </div>
      </div>

      <div className="card flex flex-col gap-4 p-4">
        <h2 className="flex items-center gap-2 font-bold text-neutral-950 capitalize">
          <LuShoppingBag /> category info
        </h2>

        <p className="text-sm font-medium text-neutral-500">
          {!isLoading ? (
            [product.category, product.subcategory, product.brand].join(' • ')
          ) : (
            <Skeleton width="50%" />
          )}
        </p>
      </div>

      <div className="card flex flex-col gap-4 p-4">
        <h2 className="flex items-center gap-2 font-bold text-neutral-950 capitalize">
          <LuStar /> Rating
        </h2>

        <p className="text-sm space-x-4 font-medium text-neutral-500">
          {!isLoading ? (
            <>
              <span>{product.numReviews} reviews</span>
              <span className="inline-flex items-center gap-2 text-amber-500">
                <LuStar /> {product.averageRating}/5
              </span>
            </>
          ) : (
            <Skeleton width="35%" />
          )}
        </p>
      </div>
    </div>
  )
}
