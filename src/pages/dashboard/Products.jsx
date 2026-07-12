import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { LuBoxes, LuFilter, LuPlus, LuSearch, LuTag } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import {
  FeuturedProducts,
  InStockTotal,
  OutOfStockTotal,
  TotalProducts,
} from '@/components/dashboard/stats/DashboardStats'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import { cn } from '@/utils'

export default function AdminProducts() {
  const [filters, setFilters] = useState(false)

  const { register, handleSubmit, watch } = useForm()
  const inputValue = watch(['search', 'category', 'subcategory'])

  function onSubmit(data) {
    console.log(data)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue) {
        handleSubmit(onSubmit)()
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [inputValue, handleSubmit])

  return (
    <div className="flex flex-col gap-4">
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
        <TotalProducts totalProducts={1} isLoading={false} />
        <FeuturedProducts feuturedProducts={1} isLoading={false} />
        <InStockTotal inStockTotal={1} isLoading={false} />
        <OutOfStockTotal outOfStockTotal={1} isLoading={false} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card overflow-hidden p-4">
        <div className="flex items-center gap-4">
          <FormField
            id="search"
            placeholder="Search products..."
            register={register}
            icon={<LuSearch />}
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
        <div
          className={cn(
            'mt-4 flex gap-4 overflow-hidden border-t border-neutral-200 pt-4 transition-all',
            !filters && 'm-0 h-0 border-none p-0',
          )}
        >
          <FormField
            type="select"
            id="category"
            label="category"
            labelIcon={<LuBoxes />}
            options={[
              { value: '', label: 'All Categories' },
              { value: 'electronics', label: 'Electronics' },
              { value: 'fashion', label: 'Fashion' },
              { value: 'home', label: 'Home & Garden' },
              { value: 'sports', label: 'Sports & Outdoors' },
            ]}
            register={register}
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
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  )
}
