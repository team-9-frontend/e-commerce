import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { LuBoxes, LuFilter, LuPlus, LuSearch, LuTag } from 'react-icons/lu'
import { Link, useSearchParams } from 'react-router-dom'

import { useGetProducts } from '@/api'
import {
  FeuturedProducts,
  InStockTotal,
  OutOfStockTotal,
  TotalProducts,
} from '@/components/dashboard/stats/DashboardStats'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import Pagination from '@/components/ui/Pagination'
import ProductCard from '@/components/ui/ProductCard'
import { cn } from '@/utils'

export default function AdminProducts() {
  const [filters, setFilters] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page') || ''
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const subcategory = searchParams.get('subcategory') || ''

  const { data, isLoading, isError, error } = useGetProducts({
    page,
    limit: 6,
    search,
    category,
    subcategory,
  })

  const products = data?.products || []

  const totalProducts = products.length
  const featuredProducts = products.filter((product) => product.featured).length
  const inStockTotal = products.filter((product) => product.stock > 0).length
  const outOfStockTotal = products.filter((product) => product.stock === 0).length

  const categories = Array.from(new Set(products.map((product) => product.category)))

  const { register, handleSubmit, watch } = useForm({
    defaultValues: { search, category, subcategory },
  })
  const [searchValue, categoryValue, subcategoryValue] = watch([
    'search',
    'category',
    'subcategory',
  ])

  function onSubmit({ search, category, subcategory }) {
    setSearchParams((s) => {
      search ? s.set('search', search) : s.delete('search')
      category ? s.set('category', category) : s.delete('category')
      subcategory ? s.set('subcategory', subcategory) : s.delete('subcategory')

      return s
    })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSubmit(onSubmit)()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue, categoryValue, subcategoryValue, handleSubmit])

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="card flex items-center justify-between p-4">
        <div className="space-y-2">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            products
          </p>
          <h2 className="text-3xl">Products</h2>
          <p className="text-sm text-neutral-500">
            Manage your product inventory, view details, and update listings.
          </p>
        </div>
        <Link to="/dashboard/products/create">
          <Button variant="ghost">
            <LuPlus size={20} /> Add Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TotalProducts totalProducts={totalProducts} isLoading={isLoading} />
        <FeuturedProducts feuturedProducts={featuredProducts} isLoading={isLoading} />
        <InStockTotal inStockTotal={inStockTotal} isLoading={isLoading} />
        <OutOfStockTotal outOfStockTotal={outOfStockTotal} isLoading={isLoading} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card overflow-hidden p-4">
        <div className="flex items-center gap-4">
          <FormField
            id="search"
            icon={<LuSearch />}
            placeholder="Search products..."
            register={register}
            className="w-full"
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => setFilters(!filters)}
            className={cn(
              filters &&
                'dark:bg-accent-500/15 bg-accent-500/15 border-accent-500/50 text-accent-600 dark:text-accent-400',
            )}
          >
            <LuFilter /> Filters
          </Button>

          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            <LuSearch /> Search
          </Button>
        </div>

        <div className={cn('grid transition-all', filters ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
          <div className={cn('mt-4 flex gap-4 overflow-hidden border-t border-neutral-200 pt-4')}>
            <FormField
              type="select"
              id="category"
              label="category"
              labelIcon={<LuBoxes />}
              register={register}
              options={categories}
              className="w-full"
            />

            <FormField
              id="subcategory"
              label="subcategory"
              labelIcon={<LuTag />}
              placeholder="e.g. smartphones"
              register={register}
              className="w-full"
            />
          </div>
        </div>
      </form>

      {isError ? (
        <div className="card p-4 text-neutral-500">{error?.message}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: isLoading ? 6 : products?.length }).map((_, i) => {
            const product = products?.[i]
            return <ProductCard key={i} product={product} isLoading={isLoading} />
          })}
        </div>
      )}

      <Pagination totalPages={data?.totalPages} className="mt-auto" />
    </div>
  )
}
