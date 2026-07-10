import Badge from '@/components/ui/Badge'
import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

export default function TopProducts({ className, topProducts }) {
  return (
    <div className={cn('card flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent-600 mb-1 font-mono text-sm tracking-wider uppercase">
            top products
          </p>
          <h2 className="text-xl">Best sellers</h2>
        </div>
        <Badge>{topProducts?.length || 0} products</Badge>
      </div>

      <div className="flex max-h-128 flex-col gap-4 overflow-y-auto">
        {topProducts
          ? topProducts.map((product) => (
              <div
                key={product._id}
                className="card flex items-center gap-4 p-4 shadow-sm dark:bg-neutral-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-lg bg-neutral-300 object-cover"
                />
                <div>
                  <h3 className="line-clamp-1 font-bold sm:text-lg">{product.name}</h3>
                  <p className="line-clamp-1 text-sm text-neutral-700 capitalize">
                    {product.totalSold} units sold • revenue: ${product.revenue}
                  </p>
                </div>
              </div>
            ))
          : Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="card flex items-center gap-4 p-4 shadow-sm dark:bg-neutral-200"
              >
                <Skeleton width={44} height={44} />

                <div className="flex-1">
                  <Skeleton width="35%" className="sm:text-lg" />
                  <Skeleton width="50%" className="text-sm" />
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
