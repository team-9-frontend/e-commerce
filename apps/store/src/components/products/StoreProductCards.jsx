import { useEffect, useState } from 'react'

import { LuHeart, LuLoaderCircle, LuShoppingCart, LuStar } from 'react-icons/lu'
import { Link, useSearchParams } from 'react-router-dom'

import {
  useAddToCart,
  useAddToWishlist,
  useCurrentUser,
  useGetProducts,
  useGetWishlist,
  useRemoveFromWishlist,
} from '@repo/api'
import { Button, Pagination, Skeleton, Swiper } from '@repo/ui'
import { cn } from '@repo/utils'
import { toast } from '@repo/utils/toasts'

export default function StoreProductCards() {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const { data, isLoading } = useGetProducts(params)
  const { data: currentUser } = useCurrentUser()
  const { data: wishlistData } = useGetWishlist()
  const products = data?.products || []

  return (
    <div className="w-full flex-1 space-y-3 md:space-y-6">
      {products.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center py-30 text-center">
          <h3 className="text-lg font-bold text-neutral-600">No Products Found</h3>
        </div>
      ) : (
        <>
          <div className="grid w-full flex-1 grid-cols-1 gap-6 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading
              ? [...Array(8)].map((_, idx) => <CardSkeleton key={idx} />)
              : products.map((product) => (
                  <StoreProductCard
                    key={product._id}
                    product={product}
                    currentUser={currentUser}
                    wishlistData={wishlistData}
                  />
                ))}
          </div>
          {data?.totalPages > 1 && <Pagination totalPages={data?.totalPages} />}
        </>
      )}
    </div>
  )
}

function StoreProductCard({ product, currentUser, wishlistData }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { mutateAsync: addToCart, isPending: isAddingToCart } = useAddToCart()
  const { mutateAsync: addToWishlist } = useAddToWishlist()
  const { mutateAsync: removeFromWishlist } = useRemoveFromWishlist()

  useEffect(() => {
    setIsWishlisted(checkIsWishlisted(wishlistData, product._id))
  }, [wishlistData, product._id])

  const isOutOfStock = product.stock === 0
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  const handleAddToCart = async (e) => {
    e.preventDefault()

    if (!currentUser) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      const res = await addToCart({ productId: product._id, quantity: 1 })
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch {
      toast.error('Failed to add product to cart')
    }
  }

  const handleWishlistToggle = async (e) => {
    e.preventDefault()

    if (!currentUser) {
      toast.error('Please login to use wishlist')
      return
    }

    const nextState = !isWishlisted
    setIsWishlisted(nextState)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')

    try {
      let res
      if (nextState) {
        res = await addToWishlist(product._id)
      } else {
        res = await removeFromWishlist(product._id)
      }
      if (!res.success) {
        toast.error(res.message)
      }
    } catch {
      setIsWishlisted(!nextState)
      toast.error('Failed to update wishlist')
    }
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800">
      {/* Image */}
      <Swiper images={product?.images}>
        {/* Badges */}
        <div className="absolute inset-s-3 top-3 z-10 flex flex-wrap gap-1.5">
          <span className="border-accent-200/30 bg-accent-100/80 text-accent-800 dark:border-accent-800/30 dark:bg-accent-950/80 dark:text-accent-200 rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize shadow-xs backdrop-blur-sm">
            {product.category}
          </span>
          {discountPercent > 0 && (
            <span className="rounded-lg bg-rose-400 px-2.5 py-1 text-xs font-bold text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute inset-e-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-neutral-400 shadow-sm transition-colors hover:text-rose-500 dark:text-neutral-500 dark:shadow-none"
        >
          <LuHeart className={cn('h-4 w-4', isWishlisted && 'fill-rose-500 text-rose-500')} />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
            <span className="rounded-lg bg-black px-4 py-2 text-sm font-bold tracking-wider text-white shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </Swiper>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-2 p-4">
        <Link to={`/store/product/${product.id}`}>
          <h3 className="line-clamp-1 text-base font-semibold text-neutral-950 dark:text-neutral-50">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <LuStar
                key={i}
                className={cn(
                  'h-3.5 w-3.5',
                  i < Math.round(product.averageRating || 0)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-neutral-300 dark:text-neutral-700',
                )}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-accent-500 text-lg font-bold">$ {product.discountPrice}</span>
          <span className="text-xs text-neutral-400 line-through dark:text-neutral-500">
            $ {product.price}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          {isOutOfStock ? (
            <Button
              disabled
              variant="outline"
              size="md"
              className="flex w-full cursor-pointer items-center justify-center gap-2"
            >
              Out of Stock
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-2"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <LuLoaderCircle className="h-[1.5em] animate-spin" />
              ) : (
                <>
                  <LuShoppingCart />
                  Add to Cart
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800">
      <div className="aspect-square w-full">
        <Skeleton height="100%" parentClassName="h-full w-full block" className="h-full" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex flex-col gap-2">
          <Skeleton height={20} width="75%" />
          <Skeleton height={16} width="35%" />
          <Skeleton height={28} width="50%" />
        </div>
        <div className="mt-4">
          <Skeleton height={40} width="100%" />
        </div>
      </div>
    </div>
  )
}

function checkIsWishlisted(wishlistData, productId) {
  if (!wishlistData) return false
  const products = wishlistData?.wishlist?.products || []
  return products?.some((p) => p?._id === productId)
}
