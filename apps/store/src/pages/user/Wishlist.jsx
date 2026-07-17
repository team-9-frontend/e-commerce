import { useState } from 'react'

import { LuGlobe, LuHeart, LuHeartCrack, LuMessageCircle, LuShoppingCart, LuTrash2, LuX, LuZap } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useAddToCart, useClearWishlist, useGetWishlist, useRemoveFromWishlist } from '@/api'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'
import toast from '@/components/ui/toast'

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

      <Footer />
    </div>
  )
}

const quickLinks = [
  { label: 'Shop', to: '/products' },
  { label: 'My Orders', to: '/profile/orders' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Profile', to: '/profile' },
]

const socialLinks = [
  { icon: LuGlobe, href: '#', label: 'Website' },
  { icon: LuMessageCircle, href: '#', label: 'Chat' },
  { icon: LuHeart, href: '#', label: 'Favorites' },
]

function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="container flex flex-col gap-10 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="space-y-3 sm:col-span-1">
            <Link to="/" className="text-accent-600 flex items-center gap-2 text-xl font-bold">
              <LuZap className="fill-accent-600" />
              Koda Store
            </Link>
            <p className="max-w-xs text-sm text-neutral-500">
              Shop the future, delivered today. Premium products at the best prices with fast
              delivery across Egypt.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-neutral-900">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-accent-600 dark:hover:text-accent-400 text-sm text-neutral-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-neutral-900">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="hover:bg-accent-500/15 hover:text-accent-600 dark:hover:text-accent-400 flex size-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} Koda Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

function WishlistCard({ product, isLoading, isRemoving, isAddingToCart, onRemove, onAddToCart }) {
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
        className="hover:text-rose-600 dark:hover:text-rose-400 absolute top-3 right-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full bg-neutral-50/85 text-lg opacity-80 shadow transition-all hover:opacity-100 disabled:pointer-events-none disabled:opacity-50"
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
          <span>
            {outOfStock ? 'Out of Stock' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </span>
        </Button>
      </div>
    </div>
  )
}