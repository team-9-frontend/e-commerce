import Badge from '@/components/ui/Badge'
import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

export default function TopProducts({ className, isLoading, topProducts }) {
  return (
    <div className={cn('card flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent-600 dark:text-accent-400 mb-1 font-mono text-sm tracking-wider uppercase">
            top products
          </p>
          <h2 className="text-lg">Best sellers</h2>
        </div>
        <Badge>{topProducts?.length || 0} products</Badge>
      </div>

      <div className="flex max-h-128 flex-col gap-4 overflow-y-auto">
        {Array.from({ length: isLoading ? 5 : topProducts?.length }).map((_, i) => {
          const product = topProducts?.[i]

          return (
            <div key={i} className="card flex gap-4 p-4 shadow-sm dark:bg-neutral-200">
              {!isLoading ? (
                <img
                  src={product?.image}
                  alt={product?.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-lg bg-neutral-300 object-cover"
                />
              ) : (
                <Skeleton width={44} height={44} />
              )}
              <div className="flex-1">
                <h3 className="line-clamp-1 font-bold sm:text-lg">
                  {!isLoading ? product?.name : <Skeleton width="35%" />}
                </h3>
                <p className="line-clamp-1 text-sm text-neutral-700 capitalize">
                  {!isLoading ? (
                    `${product?.totalSold} units sold • revenue: $${product?.revenue}`
                  ) : (
                    <Skeleton width="50%" />
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
