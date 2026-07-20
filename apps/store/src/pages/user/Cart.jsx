import { useState } from 'react'

import { LuLoaderCircle, LuTrash2, LuX } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'

import CartProductCard from '@/components/cart/CartProductCard'

import { useApplyCoupon, useClearCart, useGetCart, useRemoveCoupon } from '@repo/api'
import { Badge, Button, ConfirmDialog, Error, FormField } from '@repo/ui'
import { toast } from '@repo/utils/toasts'

const EMPTY_ARRAY = []

export default function Wishlist() {
  const navigate = useNavigate()

  const [isDialogOpen, setIsDialogOpen] = useState('')
  const [coupon, setCoupon] = useState('')

  const { mutate: clearCart, isPending: clearingCart } = useClearCart()
  const { mutate: applyCoupon, isPending: applyingCoupon } = useApplyCoupon()
  const { mutate: removeCoupon, isPending: removingCoupon } = useRemoveCoupon()

  const { data: cart, isLoading, isError, error } = useGetCart()
  const products = cart?.items || EMPTY_ARRAY

  return (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <div className="card relative flex items-center justify-between gap-4 p-4">
        <div className="from-accent-500/10 pointer-events-none absolute inset-0 bg-linear-to-l via-transparent to-transparent" />

        <div className="flex gap-4">
          <div className="bg-accent-600 dark:bg-accent-400 w-2 rounded-full" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold sm:text-3xl">My Cart</h2>
            <p className="products-center flex gap-2 text-sm text-neutral-500">
              {isLoading ? (
                'Loading your cart...'
              ) : (
                <Badge>
                  {cart?.itemCount} product{!(cart?.itemCount === 1) && 's'}
                </Badge>
              )}
            </p>
          </div>
        </div>

        <Button
          variant="ghostDanger"
          onClick={() => setIsDialogOpen(true)}
          disabled={!products || isLoading || clearingCart}
        >
          <LuTrash2 /> Clear All
        </Button>
      </div>

      {isError ? (
        <Error message={error?.message} />
      ) : !products && !isLoading ? (
        <Error
          message="Your cart is empty"
          description="
          Add products to your cart and find them here."
          link="/products"
          linkMessage="Browse Products"
        />
      ) : (
        <div className="flex items-start gap-4 max-lg:flex-col">
          <div className="flex w-full flex-col gap-4">
            {Array.from({ length: isLoading ? 3 : products?.length }).map((_, i) => {
              const product = products?.[i]

              return <CartProductCard key={i} isLoading={isLoading} product={product} />
            })}
          </div>

          <div className="card flex w-full min-w-96 flex-col gap-4 p-4 lg:w-1/4">
            <h2 className="text-lg">Order Summary</h2>

            <div className="flex flex-col gap-2">
              <div className="products-center flex justify-between text-sm text-neutral-600">
                <span>Subtotal</span>
                <span>${cart?.subtotal || 0}</span>
              </div>

              <div className="products-center flex justify-between text-sm text-neutral-600">
                <span>Discount</span>
                <span>${cart?.discountAmount || 0}</span>
              </div>

              <div className="products-center flex justify-between text-sm text-neutral-600">
                <span>Shipping</span>
                <span>${cart?.shipping || 0}</span>
              </div>

              <span className="text-xs text-neutral-500">
                Free shipping on orders over EGP 1,000
              </span>

              <div className="products-center flex justify-between border-t border-neutral-200 pt-2 text-sm font-medium text-neutral-950">
                <span>Total</span>
                <span className="text-accent-600 dark:text-accent-400">${cart?.total || 0}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {cart?.coupon && (
                <Badge className="inline-flex w-fit items-center gap-1">
                  {cart?.coupon}
                  <button
                    disabled={removingCoupon}
                    onClick={removeCoupon}
                    className="cursor-pointer"
                  >
                    <LuX />
                  </button>
                </Badge>
              )}

              <div className="flex-center gap-2">
                <FormField
                  placeholder="Coupon Code"
                  value={coupon}
                  className="flex-1 py-1 text-sm"
                  onChange={(e) => setCoupon(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      applyCoupon(
                        {
                          code: coupon.trim(),
                        },
                        {
                          onSuccess: () => setCoupon(''),
                        },
                      )
                    }
                  }}
                />

                <Button
                  variant="outline"
                  size="sm"
                  disabled={applyingCoupon || !coupon.trim()}
                  onClick={() =>
                    applyCoupon(
                      {
                        code: coupon.trim(),
                      },
                      {
                        onSuccess: () => setCoupon(''),
                      },
                    )
                  }
                >
                  {applyingCoupon ? <LuLoaderCircle className="h-[1.5em] animate-spin" /> : 'Apply'}
                </Button>
              </div>

              <Button
                variant="primary"
                className="w-full normal-case"
                onClick={() => {
                  if (!cart?.itemCount)
                    return toast.error('Must have atleast 1 product in the cart to proceed')
                  navigate('/cart')
                }}
              >
                Proceed to Checkout
              </Button>

              <Link to="/products" className="text-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onConfirm={() =>
          clearCart(
            {},
            {
              onSuccess: () => {
                setIsDialogOpen(false)
              },
            },
          )
        }
        isLoading={clearingCart}
        title="Clear Cart"
        message="Are you sure you want to remove all products from your cart? This action cannot be undone."
      />
    </div>
  )
}
