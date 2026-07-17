import { useMemo, useState } from 'react'

import { LuListFilter, LuSearch, LuX } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import FiltersForm from '@/components/products/FiltersForm'
import ProductCard from '@/components/products/ProductCard'

import { useGetProducts, useGetWishlist } from '@repo/api'
import { Badge, Button, Dialog, FormField, Pagination } from '@repo/ui'
import { filterData } from '@repo/utils'
import { useSearchParamsForm } from '@repo/utils/forms'

const EMPTY_ARRAY = []

export default function Products() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState(false)

  const { register, handleSubmit, setValue, updateParams, urlValues } = useSearchParamsForm({
    mode: 'onTouched',
  })
  const { search, category, minprice, maxprice, sort } = urlValues

  const { data: wishlistData, isLoading: isLoadingWishlist } = useGetWishlist()
  const { data, isLoading, isError, error } = useGetProducts({ limit: 100 })
  const products = data?.products || EMPTY_ARRAY
  const wishlist = wishlistData?.wishlist || EMPTY_ARRAY

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)))

  const filteredProducts = useMemo(() => {
    return filterData(products, [
      { [search]: { fields: ['_id', 'brand', 'slug', 'name', 'shortDescription'] } },
      { [category]: { fields: ['category'], exact: true } },
      { [[minprice, maxprice]]: { fields: ['price'], range: true } },
      {
        [sort]: {
          mapping: {
            newest: { field: 'createdAt', direction: -1 },
            'top rated': { field: 'averageRating', direction: -1 },
            'price: low to high': { field: 'price', direction: 1 },
            'price: high to low': { field: 'price', direction: -1 },
          },
        },
        sort: true,
      },
    ])
  }, [products, search, category, minprice, maxprice, sort])

  const currentPage = searchParams.get('page') || 1
  const limit = 20
  const page = filteredProducts.slice((currentPage - 1) * limit, currentPage * limit)
  const totalPages = Math.ceil(filteredProducts.length / limit)

  return (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <form onSubmit={handleSubmit(updateParams)} className="card flex gap-4 p-4">
        <FormField
          name="search"
          icon={<LuSearch />}
          placeholder="Search products..."
          register={register}
          className="w-full"
        />

        <Button
          variant="outline"
          size="lg-square"
          onClick={() => setFilters(!filters)}
          className="lg:hidden"
        >
          <LuListFilter />
        </Button>
      </form>

      {(category || minprice || maxprice || sort) && (
        <div className="flex items-center gap-2">
          {category && (
            <Badge className="inline-flex items-center gap-1">
              category: {category}
              <button onClick={() => setValue('category', '')} className="cursor-pointer">
                <LuX />
              </button>
            </Badge>
          )}
          {minprice && (
            <Badge className="inline-flex items-center gap-1">
              min price: {minprice}
              <button onClick={() => setValue('minprice', '')} className="cursor-pointer">
                <LuX />
              </button>
            </Badge>
          )}
          {maxprice && (
            <Badge className="inline-flex items-center gap-1">
              max price: {maxprice}
              <button onClick={() => setValue('maxprice', '')} className="cursor-pointer">
                <LuX />
              </button>
            </Badge>
          )}
          {sort && (
            <Badge className="inline-flex items-center gap-1">
              sort: {sort}
              <button onClick={() => setValue('sort', '')} className="cursor-pointer">
                <LuX />
              </button>
            </Badge>
          )}
        </div>
      )}

      <div className="flex items-start gap-4">
        <FiltersForm categories={categories} className="max-lg:hidden" />

        <div className="flex-1">
          {isError ? (
            <div className="card p-4 text-neutral-500">{error?.message}</div>
          ) : !page?.length && !isLoading ? (
            <div className="card p-4 text-neutral-500">No products found</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: isLoading ? 6 : page?.length }).map((_, i) => {
                const product = page?.[i]

                return (
                  <ProductCard
                    key={i}
                    isLoading={isLoading || isLoadingWishlist}
                    product={product}
                    wishlist={wishlist}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Pagination totalPages={totalPages} />

      <Dialog isOpen={filters} setIsOpen={setFilters} title="Filters" position="right">
        <FiltersForm categories={categories} />
      </Dialog>
    </div>
  )
}
