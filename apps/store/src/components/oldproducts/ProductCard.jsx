import { LuHeart, LuLoaderCircle, LuShoppingCart, LuStar, LuStarHalf } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useAddToCart, useAddToWishlist, useGetWishlist, useRemoveFromWishlist } from '@repo/api'
import { Badge, Button, Skeleton, Swiper } from '@repo/ui'
import { cn } from '@repo/utils'

const EMPTY_ARRAY = []

export default function ProductCard({ isLoading: isLoadingProduct, product }) {
  const { mutate: addToWishlist, isPending: addingToWishlist } = useAddToWishlist()
  const { mutate: removeFromWishlist, isPending: removingFromWishlist } = useRemoveFromWishlist()
  const { mutate: addToCart, isPending: addingToCart } = useAddToCart()

  const { data: wishlistData, isLoading: isLoadingWishlist } = useGetWishlist()
  const wishlist = wishlistData?.wishlist || EMPTY_ARRAY

  const isWishlisted = wishlist?.products?.some((p) => p._id === product?._id)
  const isOutOfStock = product?.stock === 0
  const discountPercentage =
    product?.price && product?.discountPrice
      ? Math.ceil((product?.discountPrice / product?.price) * 100)
      : 0

  const isLoading = isLoadingWishlist || isLoadingProduct

  return (
    <div className="card group">
      <Swiper
        images={isOutOfStock ? product?.images.slice(0, 1) : product?.images}
        isLoading={isLoading}
        autoplay={!isOutOfStock}
      >
        <div
          className={cn(
            'flex-center absolute top-0 z-10 mt-4 ml-4 gap-2',
            isOutOfStock && 'hidden',
          )}
        >
          {product?.category && <Badge color="sky">{product.category}</Badge>}

          {discountPercentage > 0 && <Badge color="emerald">-{discountPercentage}%</Badge>}
        </div>

        {!isLoading && (
          <Button
            variant="custom"
            size="md-square"
            className={cn(
              'invisible absolute top-0 right-0 z-10 mt-4 mr-4 rounded-full border-none bg-neutral-50 opacity-0 transition-all group-hover:visible group-hover:opacity-100 hover:text-red-600 dark:hover:text-red-400',
              isWishlisted && 'text-red-600 dark:text-red-400',
              isOutOfStock && 'hidden',
            )}
            disabled={addingToWishlist || removingFromWishlist}
            onClick={() =>
              isWishlisted ? removeFromWishlist(product?._id) : addToWishlist(product?._id)
            }
          >
            <LuHeart fill={isWishlisted ? 'currentColor' : 'none'} />
          </Button>
        )}

        {isOutOfStock && (
          <div className="flex-center absolute inset-0 z-10 cursor-default bg-neutral-50/50 backdrop-blur-sm transition-all">
            <span className="absolute rounded-lg bg-neutral-950 px-4 py-2 whitespace-nowrap text-neutral-50">
              Out of Stock
            </span>
          </div>
        )}
      </Swiper>

      <div className="flex flex-col gap-2 p-4">
        <div>
          <h2 className="mb-1 line-clamp-1 font-medium sm:text-lg">
            <Link to={`/products/${product?._id || 0}`} className="text-inherit">
              {!isLoading ? product.name : <Skeleton width="75%" />}
            </Link>
          </h2>

          <div className="line-clamp-1 text-sm font-medium text-neutral-500">
            {!isLoading ? (
              <div className="relative flex gap-1 text-lg">
                <LuStar />
                <LuStar />
                <LuStar />
                <LuStar />
                <LuStar />
                <div className="text-accent-600 dark:text-accent-400 absolute top-0 left-0 flex gap-1 text-lg">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const rating = Math.round(product?.averageRating * 2) / 2 || 0

                    if (rating >= i + 1) return <LuStar key={i} fill="currentColor" />

                    if (rating >= i + 0.5) return <LuStarHalf key={i} fill="currentColor" />

                    return
                  })}
                </div>
              </div>
            ) : (
              <Skeleton width="45%" />
            )}
          </div>
        </div>

        <p className="text-2xl font-bold">
          {!isLoading ? (
            <Link to={`/products/${product._id}`} className="text-inherit">
              ${product.price}
              {product?.discountPrice && (
                <span className="ml-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {`-$${product.discountPrice} off`}
                </span>
              )}
            </Link>
          ) : (
            <Skeleton width="50%" />
          )}
        </p>

        {!isLoading ? (
          <Button
            variant={isOutOfStock ? 'disabled' : 'primary'}
            disabled={addingToCart}
            onClick={() =>
              addToCart({
                productId: product._id,
                quantity: 1,
              })
            }
            className={cn('normal-case', isOutOfStock && 'pointer-events-none')}
          >
            {addingToCart ? (
              <LuLoaderCircle className="h-[1.5em] animate-spin" />
            ) : isOutOfStock ? (
              'Out of Stock'
            ) : (
              <>
                <LuShoppingCart /> Add to Card
              </>
            )}
          </Button>
        ) : (
          <Skeleton height={40} />
        )}
      </div>
    </div>
  )
}
