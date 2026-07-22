import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LuArrowLeft, LuImageOff, LuLoaderCircle, LuShoppingCart } from 'react-icons/lu'

import { useAddToCart, useCurrentUser, useGetProductById } from '@repo/api'
import { Button, Error } from '@repo/ui'
import { toast } from '@repo/utils/toasts'

export default function ProductView() {
const { id } = useParams()
const navigate = useNavigate()
const [quantity, setQuantity] = useState(1)

const { data, isLoading, isError, error } = useGetProductById(id)
const { data: currentUser } = useCurrentUser()
const { mutateAsync: addToCart, isPending: isAddingToCart } = useAddToCart()

if (isLoading) {
return ( <div className="flex min-h-[60vh] items-center justify-center"> <LuLoaderCircle className="text-accent-500 h-10 w-10 animate-spin" /> </div>
)
}

if (isError) {
return ( <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
<Error message={error?.message || 'Failed to load product'} />


    <Link to="/products">
      <Button variant="outline">
        <LuArrowLeft />
        Back to Products
      </Button>
    </Link>
  </div>
)


}

const product = data?.product || data

if (!product) {
return ( <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center"> <LuImageOff className="h-12 w-12 text-neutral-400" />


    <h1 className="text-xl font-semibold">Product Not Found</h1>

    <p className="text-neutral-500">
      The product you are looking for does not exist.
    </p>

    <Link to="/products">
      <Button variant="outline">
        <LuArrowLeft />
        Back to Products
      </Button>
    </Link>
  </div>
)


}

const isOutOfStock = product.stock <= 0
const finalPrice = product.discountPrice || product.price

const handleAddToCart = async () => {
if (!currentUser) {
toast.error('Please login to add items to cart')
navigate('/login')
return
}


try {
  const response = await addToCart({
    productId: product._id,
    quantity,
  })

  if (response?.success) {
    toast.success(response.message || 'Product added to cart')
  } else {
    toast.error(response?.message || 'Failed to add product to cart')
  }
} catch (error) {
  toast.error(error?.message || 'Failed to add product to cart')
}


}

return ( <section className="space-y-6 py-6 md:py-10"> <Link
     to="/products"
     className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-950"
   > <LuArrowLeft />
Back to Products </Link>


  <div className="grid gap-8 md:grid-cols-2">
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
      {product.images?.[0]?.url ? (
        <img
          src={product.images[0].url}
          alt={product.name}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex aspect-square items-center justify-center text-neutral-400">
          <LuImageOff className="h-12 w-12" />
        </div>
      )}
    </div>

    <div className="flex flex-col justify-center gap-5">
      <div>
        <p className="text-accent-500 mb-2 text-sm font-medium capitalize">
          {product.category}
        </p>

        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          {product.name}
        </h1>
      </div>

      <p className="text-sm leading-7 text-neutral-600 sm:text-base">
        {product.description || 'No description available for this product.'}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-accent-500 text-2xl font-bold">
          ${finalPrice}
        </span>

        {product.discountPrice && (
          <span className="text-neutral-400 line-through">
            ${product.price}
          </span>
        )}
      </div>

      <div className="text-sm text-neutral-500">
        {isOutOfStock
          ? 'Out of stock'
          : `${product.stock} items available`}
      </div>

      {!isOutOfStock && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(event) => {
              const value = Number(event.target.value)

              if (value < 1) {
                setQuantity(1)
                return
              }

              if (value > product.stock) {
                setQuantity(product.stock)
                return
              }

              setQuantity(value)
            }}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-center sm:w-24"
          />

          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex w-full items-center justify-center gap-2 sm:flex-1"
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
        </div>
      )}

      {isOutOfStock && (
        <Button disabled className="w-full">
          Out of Stock
        </Button>
      )}
    </div>
  </div>
</section>


)
}
