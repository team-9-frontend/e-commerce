import { LuArrowLeft } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import ProductForm from '@/components/products/ProductForm'

import { Button } from '@repo/ui'

export default function AdminProductEdit() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="card flex items-center justify-between gap-8 p-4 max-sm:flex-col max-sm:items-end">
        <div className="w-full space-y-2">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            create product
          </p>
          <h2 className="text-3xl">Launch a polished product entry</h2>
          <p className="text-sm text-neutral-500">
            Add products with validation, image previews, multi-upload support, and smooth UX.
          </p>
        </div>
        <Link to="/products">
          <Button variant="ghost">
            <LuArrowLeft size={20} /> Go Back
          </Button>
        </Link>
      </div>

      <ProductForm />
    </div>
  )
}
