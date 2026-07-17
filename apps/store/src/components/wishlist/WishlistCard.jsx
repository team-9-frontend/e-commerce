import { LuShoppingCart, LuX } from 'react-icons/lu'

import { Button, Skeleton } from '@repo/ui'
import { cn } from '@repo/utils'

export default function WishlistCard({
  product,
  isLoading,
  isRemoving,
  isAddingToCart,
  onRemove,
  onAddToCart,
}) {
  if (isLoading) {
    return (
      <div className="card overflow-hidden">
        <Skeleton className="aspect-square w-full" />
        <div className="flex flex-col gap-2 p-4">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="mt-2 h-9 w-full" />
        </div>
      </div>
    )
  }

  const outOfStock = Number(product?.stock) <= 0
  const image = product?.images?.[0]?.url

  const originalPrice = Number(product?.price) || 0
  const discountPriceRaw = Number(product?.discountPrice)
  const hasDiscount = discountPriceRaw > 0 && discountPriceRaw < originalPrice
  const finalPrice = hasDiscount ? discountPriceRaw : originalPrice

  return (
    <div className="card group relative flex flex-col overflow-hidden">
      <button
        onClick={onRemove}
        disabled={isRemoving}
        title="Remove from wishlist"
        className="absolute top-3 right-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full bg-neutral-50/85 text-lg opacity-80 shadow transition-all hover:text-rose-600 hover:opacity-100 disabled:pointer-events-none disabled:opacity-50 dark:hover:text-rose-400"
      >
        <LuX />
      </button>

      <Link to={`/products/${product?._id}`} className="relative block overflow-hidden">
        <img
          src={image || '/placeholder-product.png'}
          alt={product?.name}
          className={cn(
            'aspect-square w-full bg-neutral-50 object-cover transition-transform duration-300 ease-out group-hover:scale-105 dark:bg-neutral-200',
            outOfStock && 'grayscale',
          )}
        />
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/40">
            <span className="rounded-full bg-neutral-950/80 px-3 py-1 text-xs font-semibold tracking-wide text-neutral-50 uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <Link to={`/products/${product?._id}`}>
          <h3 className="hover:text-accent-600 dark:hover:text-accent-400 line-clamp-1 text-sm font-medium text-neutral-900 transition-colors dark:text-neutral-100">
            {product?.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-accent-600 dark:text-accent-400 text-lg font-bold">
              EGP {finalPrice}
            </span>
            {hasDiscount && (
              <span className="text-sm text-neutral-400 line-through">EGP {originalPrice}</span>
            )}
          </div>

          {outOfStock && (
            <span className="rounded-full border border-rose-500/25 bg-rose-500/15 px-2 py-0.5 text-xs text-rose-600 dark:text-rose-400">
              Out of stock
            </span>
          )}
        </div>

        <Button
          variant="primary"
          className={cn(
            'mt-2 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm leading-none text-neutral-50',
            outOfStock
              ? 'bg-neutral-300 text-neutral-500 hover:bg-neutral-300 dark:bg-neutral-300 dark:text-neutral-500'
              : 'bg-accent-600 hover:bg-accent-700 dark:bg-accent-600 dark:hover:bg-accent-700 dark:text-neutral-50',
          )}
          onClick={onAddToCart}
          disabled={outOfStock || isAddingToCart}
        >
          {!outOfStock && <LuShoppingCart size={16} className="shrink-0" />}
          <span>{outOfStock ? 'Out of Stock' : isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
        </Button>
      </div>
    </div>
  )
}
