import { useState } from 'react'

import { LuStar } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useDeleteProduct } from '@repo/api'
import { Badge, Button, ConfirmDialog, Dialog, Skeleton, Swiper } from '@repo/ui'

import ProductForm from './ProductForm'

export default function ProductCard({ isLoading, product }) {
  const { mutate: deleteProduct, isPending: deletingProduct } = useDeleteProduct()
  const [editProduct, setEditProduct] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="card flex flex-col">
      <Swiper images={product?.images} isLoading={isLoading}>
        {product?.featured && (
          <Badge color="amber" className="flex-center absolute top-0 z-10 mt-4 ml-4 gap-2">
            <LuStar />
            Featured
          </Badge>
        )}
        <Badge color="emerald" className="absolute right-0 bottom-0 z-10 mr-4 mb-4">
          {product?.stock ? `${product.stock} In Stock` : 'Out of Stock'}
        </Badge>
      </Swiper>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h2 className="mb-1 line-clamp-1 text-lg font-medium sm:text-xl">
            {!isLoading ? product.name : <Skeleton width="75%" />}
          </h2>
          <p className="line-clamp-1 text-sm font-medium text-neutral-500">
            {!isLoading ? (
              [
                product.category || 'no category',
                product.subcategory || 'no subcategory',
                product.brand || 'no brand',
              ].join(' • ')
            ) : (
              <Skeleton width="50%" />
            )}
          </p>
        </div>

        <p className="line-clamp-1 text-sm text-neutral-500">
          {!isLoading ? product.shortDescription || 'no description' : <Skeleton width="60%" />}
        </p>

        <p className="text-4xl font-bold">
          {!isLoading ? (
            <>
              ${product.price}
              {product?.discountPrice && (
                <span className="ml-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {`-$${product.discountPrice} off`}
                </span>
              )}
            </>
          ) : (
            <Skeleton width="30%" />
          )}
        </p>

        {!isLoading ? (
          <div className="flex gap-2">
            {product.tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <Skeleton width="75%" height={32} />
        )}

        {!isLoading ? (
          <div className="mt-auto flex items-center gap-2 border-t border-neutral-200 pt-4">
            <Link to={`/products/view/${product._id}`}>
              <Button
                variant="outline"
                size="sm"
                className="hover:border-teal-500/50 hover:bg-teal-500/15 hover:text-teal-600 dark:hover:bg-teal-500/15 dark:hover:text-teal-400"
              >
                view
              </Button>
            </Link>

            <Link to={`/products/edit/${product._id}`}>
              <Button
                variant="outline"
                size="sm"
                className="hover:border-purple-500/50 hover:bg-purple-500/15 hover:text-purple-600 dark:hover:bg-purple-500/15 dark:hover:text-purple-400"
              >
                edit
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditProduct(product)}
              className="line-clamp-1 hover:border-amber-500/50 hover:bg-amber-500/15 hover:text-amber-600 dark:hover:bg-amber-500/15 dark:hover:text-amber-400"
            >
              quick edit
            </Button>

            <Button
              onClick={() => {
                setIsDialogOpen(true)
              }}
              variant="outlineDanger"
              size="sm"
              className="ml-auto"
            >
              delete
            </Button>

            <Dialog
              isOpen={editProduct}
              setIsOpen={setEditProduct}
              title="Edit Product"
              className="max-h-[80vh] max-w-300 overflow-y-scroll"
            >
              <ProductForm product={product} dialog />
            </Dialog>

            <ConfirmDialog
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              isLoading={deletingProduct}
              onConfirm={() => {
                deleteProduct(product._id, {
                  onSuccess: () => {
                    setIsDialogOpen(false)
                  },
                })
              }}
              title="Confirm Deletion"
              message="Are you sure?"
            ></ConfirmDialog>
          </div>
        ) : (
          <div className="border-t border-neutral-200 pt-4">
            <Skeleton width="100%" height={32} />
          </div>
        )}
      </div>
    </div>
  )
}
