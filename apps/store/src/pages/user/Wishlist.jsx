import { useState } from 'react'

import { LuHeartCrack, LuTrash2 } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import WishlistCard from '@/components/wishlist/WishlistCard'

import { useAddToCart, useClearWishlist, useGetWishlist, useRemoveFromWishlist } from '@repo/api'
import { Button, ConfirmDialog } from '@repo/ui'
import { toast } from '@repo/utils/toasts'

export default function Wishlist() {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false)

  const { data, isLoading, isError, error } = useGetWishlist()

  const removeMutation = useRemoveFromWishlist()
  const clearMutation = useClearWishlist()
  const addToCartMutation = useAddToCart()

  const wishlistData = data?.wishlist ?? data
  const rawItems = wishlistData?.products ?? wishlistData?.items ?? wishlistData ?? []
  const items = Array.isArray(rawItems) ? rawItems : []
  const products = items.map((item) => item?.product ?? item).filter(Boolean)

  const isEmpty = !isLoading && !isError && products.length === 0

  function handleRemove(productId) {
    removeMutation.mutate(productId, {
      onSuccess: () => toast.success('Removed from wishlist'),
      onError: (err) =>
        toast.error(err?.response?.data?.message || 'Failed to remove from wishlist'),
    })
  }

  function handleClearAll() {
    clearMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Wishlist cleared')
        setConfirmClearOpen(false)
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || 'Failed to clear wishlist')
        setConfirmClearOpen(false)
      },
    })
  }

  function handleAddToCart(product) {
    addToCartMutation.mutate(
      { productId: product._id, quantity: 1 },
      {
        onSuccess: () => toast.success(`${product.name} added to cart`),
        onError: (err) => toast.error(err?.response?.data?.message || 'Failed to add to cart'),
      },
    )
  }

  return (
    <div className="container flex flex-1 flex-col gap-4 py-8">
      <div className="card relative flex flex-wrap items-center justify-between gap-4 overflow-hidden p-6">
        <div className="bg-accent-500/10 pointer-events-none absolute -top-12 -right-12 size-48 rounded-full blur-3xl" />

        <div className="border-accent-500 relative flex flex-col gap-1 border-l-4 pl-4">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-neutral-50">
            My Wishlist
          </h2>
          <p className="flex items-center gap-2 text-sm text-neutral-500">
            {isLoading ? (
              'Loading your saved products...'
            ) : (
              <>
                <span className="bg-accent-500/15 text-accent-600 dark:text-accent-400 rounded-full px-2 py-0.5 text-xs font-bold">
                  {products.length}
                </span>
                saved product{products.length === 1 ? '' : 's'}
              </>
            )}
          </p>
        </div>

        <Button
          variant="dangerGhost"
          className="relative flex flex-row items-center gap-2 whitespace-nowrap"
          onClick={() => setConfirmClearOpen(true)}
          disabled={isLoading || isEmpty || clearMutation.isPending}
        >
          <LuTrash2 size={16} className="shrink-0" />
          <span>Clear All</span>
        </Button>
      </div>

      {isError ? (
        <div className="card p-8 text-center text-neutral-500">
          {error?.response?.data?.message || error?.message || 'Failed to load your wishlist.'}
        </div>
      ) : isEmpty ? (
        <div className="card flex flex-col items-center gap-4 p-16 text-center">
          <LuHeartCrack className="text-accent-500 text-5xl" />
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
            <p className="text-sm text-neutral-500">
              Save products you love and find them here anytime.
            </p>
          </div>
          <Link to="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: isLoading ? 6 : products.length }).map((_, i) => {
            const product = products[i]
            return (
              <WishlistCard
                key={product?._id ?? i}
                product={product}
                isLoading={isLoading}
                isRemoving={removeMutation.isPending && removeMutation.variables === product?._id}
                isAddingToCart={
                  addToCartMutation.isPending &&
                  addToCartMutation.variables?.productId === product?._id
                }
                onRemove={() => handleRemove(product._id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            )
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        onConfirm={handleClearAll}
        title="Clear Wishlist"
        message="Are you sure you want to remove all products from your wishlist? This action cannot be undone."
      />
    </div>
  )
}
