import { useForm } from 'react-hook-form'
import { LuPlus, LuSearch } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import {
  FeuturedProducts,
  InStockTotal,
  OutOfStockTotal,
  TotalProducts,
} from '@/components/dashboard/stats/DashboardStats'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

export default function AdminProducts() {
  const { register, handleSubmit } = useForm()

  function onSubmit(data) {
    console.log(data)
  }

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

      <div className="card flex items-center gap-4 p-4">
        <FormField
          id="search"
          placeholder="Search products..."
          register={register}
          icon={<LuSearch />}
          className="w-full"
        />
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  )
}
