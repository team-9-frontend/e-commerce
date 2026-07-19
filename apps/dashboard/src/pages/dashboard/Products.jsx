import { useMemo, useState } from 'react'

import { LuBoxes, LuListFilter, LuPlus, LuSearch, LuTag } from 'react-icons/lu'
import { Link, useSearchParams } from 'react-router-dom'

import ProductCard from '@/components/products/ProductCard'
import {
  FeuturedProducts,
  InStockTotal,
  OutOfStockTotal,
  TotalProducts,
} from '@/components/stats/DashboardStats'

import { useGetProducts } from '@repo/api'
import { Button, Error, FormField, Pagination } from '@repo/ui'
import { cn, filterData } from '@repo/utils'
import { useSearchParamsForm } from '@repo/utils/forms'

const EMPTY_ARRAY = []

export default function AdminProducts() {
  const [filters, setFilters] = useState(false)

  const [searchParams] = useSearchParams()
  const { register, handleSubmit, updateParams, urlValues } = useSearchParamsForm({
    unDebouncedFields: ['category'],
  })

  const { search, category, subcategory } = urlValues

  const { data, isLoading, isError, error } = useGetProducts({
    limit: 100,
  })
  const products = data?.products || EMPTY_ARRAY

  const totalProducts = products.length
  const featuredProducts = products.filter((product) => product.featured).length
  const inStockTotal = products.filter((product) => product.stock > 0).length
  const outOfStockTotal = products.filter((product) => product.stock === 0).length
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)))

  const filteredProducts = useMemo(() => {
    return filterData(products, [
      { [search]: { fields: ['_id', 'brand', 'slug', 'name', 'shortDescription'] } },
      { [category]: { fields: ['category'], exact: true } },
      { [subcategory]: { fields: ['subcategory'] } },
    ])
  }, [products, search, category, subcategory])

  const currentPage = searchParams.get('page') || 1
  const limit = 20
  const page = filteredProducts.slice((currentPage - 1) * limit, currentPage * limit)
  const totalPages = Math.ceil(filteredProducts.length / limit)

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="card flex items-center justify-between gap-8 p-4 max-sm:flex-col max-sm:items-end">
        <div className="w-full space-y-2">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            products
          </p>
          <h2 className="text-2xl font-medium sm:text-3xl">Products</h2>
          <p className="text-sm text-neutral-500">
            Manage your product inventory, view details, and update listings.
          </p>
        </div>
        <Link to="/products/create">
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

      <form onSubmit={handleSubmit(updateParams)} className="card p-4">
        <div className="flex items-center gap-4">
          <FormField
            name="search"
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
            <LuListFilter /> Filters
          </Button>

          <Button type="submit" variant="primary">
            <LuSearch /> Search
          </Button>
        </div>

        <div className={cn('grid transition-all', filters ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
          <div className={cn('mt-4 flex gap-4 overflow-hidden border-t border-neutral-200 pt-4')}>
            <FormField
              name="category"
              label="category"
              labelIcon={<LuBoxes />}
              register={register}
              type="select"
              options={['electronics', 'phones', 'fashion', 'home', 'beauty', 'sports']}
              defaultOption="all categories"
              className="w-full"
            />

            <FormField
              name="subcategory"
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
        <Error message={error?.message} />
      ) : !page?.length && !isLoading ? (
        <Error message="No products found" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: isLoading ? 6 : page?.length }).map((_, i) => {
            const product = page?.[i]

            return <ProductCard key={i} isLoading={isLoading} product={product} />
          })}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  )
}
