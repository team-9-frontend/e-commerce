import { LuArrowLeft } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'

import { useGetProductById } from '@/api/hooks/useProducts'
import ProductInfo from '@/components/dashboard/products/ProductInfo'
import Button from '@/components/ui/Button'
import Swiper from '@/components/ui/Swiper'

export default function AdminProductView() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useGetProductById(id)
  const product = data?.product

  if (isLoading) return

  return (
    <div className="flex flex-col gap-4">
      <div className="card flex items-center justify-between p-4">
        <div className="space-y-2">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            overview
          </p>
          <h2 className="text-3xl">Product details</h2>
          <p className="text-sm text-neutral-500">Product details overview.</p>
        </div>
        <Link to="/dashboard/products">
          <Button variant="ghost">
            <LuArrowLeft size={20} /> Go Back
          </Button>
        </Link>
      </div>

      {isError ? (
        <div className="card p-4 text-neutral-500">{error?.message}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Swiper images={product.images} id={product._id} showImages isCard />

            <ProductInfo product={product} />
          </div>
        </>
      )}
    </div>
  )
}
