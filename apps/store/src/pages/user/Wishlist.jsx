import { useState } from 'react'

import { LuTrash2 } from 'react-icons/lu'

import ProductCard from '@/components/oldproducts/ProductCard'

import { useClearWishlist, useGetWishlist } from '@repo/api'
import { Badge, Button, ConfirmDialog, Error } from '@repo/ui'

const EMPTY_ARRAY = []

export default function Wishlist() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { mutate: clearWishlist, isPending: clearingWishlist } = useClearWishlist()

  const { data, isLoading, isError, error } = useGetWishlist()
  const wishlist = data?.wishlist
  const products = wishlist?.products || EMPTY_ARRAY

  return (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <div className="card relative flex items-center justify-between gap-4 p-4">
        <div className="from-accent-500/10 pointer-events-none absolute inset-0 bg-linear-to-l via-transparent to-transparent" />

        <div className="flex gap-4">
          <div className="bg-accent-600 dark:bg-accent-400 w-2 rounded-full" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold sm:text-3xl">My Wishlist</h2>
            <p className="text-sm text-neutral-500">
              {isLoading ? (
                'Loading your wishlist...'
              ) : (
                <Badge>
                  {products.length} saved product{!(products.length === 1) && 's'}
                </Badge>
              )}
            </p>
          </div>
        </div>

        <Button
          variant="ghostDanger"
          onClick={() => setIsDialogOpen(true)}
          disabled={!products || isLoading || clearingWishlist}
        >
          <LuTrash2 /> Clear All
        </Button>
      </div>

      {isError ? (
        <Error message={error?.message} />
      ) : !products && !isLoading ? (
        <Error
          message="Your wishlist is empty"
          description="
          Save products you love and find them here anytime."
          link="/products"
          linkMessage="Browse Products"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: isLoading ? 6 : products.length }).map((_, i) => {
            const product = products?.[i]

            return (
              <ProductCard key={i} isLoading={isLoading} product={product} wishlist={wishlist} />
            )
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onConfirm={() =>
          clearWishlist(
            {},
            {
              onSuccess: () => {
                setIsDialogOpen(false)
              },
            },
          )
        }
        isLoading={clearingWishlist}
        title="Clear Wishlist"
        message="Are you sure you want to remove all products from your wishlist? This action cannot be undone."
      />
    </div>
  )
}
