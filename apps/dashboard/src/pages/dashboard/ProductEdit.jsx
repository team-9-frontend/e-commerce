import { LuArrowLeft } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'

import ProductForm from '@/components/products/ProductForm'

import { useGetProductById } from '@repo/api'
import { Button, Error, LoadingSpinner } from '@repo/ui'

export default function AdminProductEdit() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useGetProductById(id)
  const product = data?.product

  return isLoading ? (
    <div className="flex-center min-h-screen py-8">
      <LoadingSpinner className="size-24" />
    </div>
  ) : (
    <div className="flex flex-1 flex-col gap-4">
      <div className="card flex items-center justify-between gap-8 p-4 max-sm:flex-col max-sm:items-end">
        <div className="w-full space-y-2">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            edit product
          </p>
          <h2 className="text-2xl font-medium sm:text-3xl">Update and refine the product entry</h2>
          <p className="text-sm text-neutral-500">
            Review the current product data, add new images, remove existing ones, and save your
            updates safely.
          </p>
        </div>
        <Link to="/products">
          <Button variant="ghost">
            <LuArrowLeft /> Go Back
          </Button>
        </Link>
      </div>

      {isError ? (
        <Error message={error?.message} />
      ) : !product ? (
        <Error message="No product found" />
      ) : (
        <ProductForm product={product} />
      )}
    </div>
  )
}
