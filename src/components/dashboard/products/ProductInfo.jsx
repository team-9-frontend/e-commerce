import { LuShoppingBag, LuStar, LuTag } from 'react-icons/lu'

import ProductStats from './ProductStats'

export default function ProductInfo({ isLoading, product }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="card space-y-2 p-4">
        <h2 className="text-3xl">{product.name}</h2>
        <p className="text-sm wrap-anywhere text-neutral-500">{product.description}</p>
      </div>

      <ProductStats product={product} isLoading={isLoading} />

      <div className="card flex flex-col gap-4 p-4">
        <h2 className="flex items-center gap-2 font-bold text-neutral-950 capitalize">
          <LuTag /> tags
        </h2>

        <div className="flex flex-wrap gap-2">
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="card flex flex-col gap-4 p-4">
        <h2 className="flex items-center gap-2 font-bold text-neutral-950 capitalize">
          <LuShoppingBag /> category info
        </h2>

        <p className="text-sm font-medium text-neutral-500">
          {[product.category, product.subcategory, product.brand].join(' • ')}
        </p>
      </div>

      <div className="card flex flex-col gap-4 p-4">
        <h2 className="flex items-center gap-2 font-bold text-neutral-950 capitalize">
          <LuStar /> Rating
        </h2>

        <p className="text-sm font-medium text-neutral-500">
          {product.averageRating} / 5 ({product.numReviews} reviews)
        </p>
      </div>
    </div>
  )
}
