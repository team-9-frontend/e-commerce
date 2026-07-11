import { LuPlus } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import Button from '@/components/ui/Button'

export default function AdminProducts() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="card col-span-full flex items-center justify-between p-4">
        <div>
          <p className="text-accent-600 dark:text-accent-400 mb-1 font-mono text-sm tracking-wider uppercase">
            products dashboard
          </p>
          <h2 className="text-3xl">Products</h2>
          <p className="text-muted text-sm">
            Manage your product inventory, view details, and update listings.
          </p>
        </div>
        <Link to="/dashboard/products/create">
          <Button variant="ghost">
            <LuPlus size={20} /> Add Product
          </Button>
        </Link>
      </div>
    </div>
  )
}
