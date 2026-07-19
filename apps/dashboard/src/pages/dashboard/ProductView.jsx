import { LuArrowLeft } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'

import ProductInfo from '@/components/products/ProductInfo'
import ProductReviews from '@/components/products/ProductReviews'

import { useGetProductById } from '@repo/api'
import { Button, Swiper } from '@repo/ui'

export default function AdminProductView() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useGetProductById(id)
  const product = data?.product

  return (
    <div className="flex flex-col gap-4">
      <div className="card flex items-center justify-between gap-8 p-4 max-sm:flex-col max-sm:items-end">
        <div className="w-full space-y-2">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            overview
          </p>
          <h2 className="text-3xl">Product details</h2>
          <p className="text-sm text-neutral-500">Product details overview.</p>
        </div>
        <Link to="/products">
          <Button variant="ghost">
            <LuArrowLeft size={20} /> Go Back
          </Button>
        </Link>
      </div>

      {isError ? (
        <div className="card p-4 text-neutral-500">{error?.message}</div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Swiper images={product?.images} isLoading={isLoading} showImages isCard />

            <ProductReviews
              reviews={product?.reviews}
              isLoading={isLoading}
              className="max-lg:hidden xl:hidden"
            />
          </div>

          <div className="flex flex-col gap-4">
            <ProductInfo product={product} isLoading={isLoading} />

            <ProductReviews
              reviews={product?.reviews}
              isLoading={isLoading}
              className="lg:max-xl:hidden"
            />
          </div>
        </div>
      )}
    </div>
  )
}
