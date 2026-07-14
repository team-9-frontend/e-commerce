import { LuShoppingBag, LuStar, LuTag } from 'react-icons/lu'

export default function ProductInfo({ product }) {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-500">
          Overview
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          {product.name}
        </h2>

        <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard title="Price" value={`$${product.price}`} />

        <InfoCard
          title="Discount"
          value={
            product.discountPrice
              ? `$${product.discountPrice}`
              : 'No Discount'
          }
        />

        <InfoCard title="Stock" value={product.stock} />

        <InfoCard title="SKU" value={product.sku} />
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <LuTag />
          <span>Tags</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-5 dark:border-blue-900 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <LuShoppingBag />
          <span>Category Info</span>
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {product.category}
          {product.subcategory && ` • ${product.subcategory}`}
          {product.brand && ` • ${product.brand}`}
        </p>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
        <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <LuStar className="text-amber-500" />
          <span>Rating</span>
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {product.averageRating} / 5 ({product.numReviews} reviews)
        </p>
      </div>
    </div>
  )
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h3 className="mt-2 break-words text-xl font-bold text-gray-900 dark:text-white">
        {value}
      </h3>
    </div>
  )
}