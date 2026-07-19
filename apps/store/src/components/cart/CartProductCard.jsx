import { LuMinus, LuPlus, LuTrash2, LuX } from 'react-icons/lu'

import { useRemoveCartItem, useUpdateCartItem } from '@repo/api'
import { Button } from '@repo/ui'

export default function CartProductCard({ isLoading, product }) {
  const { mutate: updateCart, isPending: updatingproduct } = useUpdateCartItem()
  const { mutate: removeproduct, isPending: removingproduct } = useRemoveCartItem()

  return (
    <div className="products-center flex flex-col justify-between gap-4 rounded-xl border p-5 shadow-sm md:flex-row">
      <div className="products-center flex gap-4">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-24 w-24 rounded-lg object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold">{product?.name}</h2>

          <p className="mt-1 text-neutral-500">${product?.price}</p>
        </div>
      </div>

      <div className="products-center flex gap-3">
        <Button
          size="sm-square"
          disabled={updatingproduct || product?.quantity <= 1}
          onClick={() =>
            updateCart({
              productId: product?.product,
              quantity: product?.quantity - 1,
            })
          }
        >
          <LuMinus />
        </Button>

        <span className="min-w-6 text-center font-semibold">{product?.quantity}</span>

        <Button
          size="sm-square"
          disabled={updatingproduct}
          onClick={() =>
            updateCart({
              productId: product?.product,
              quantity: product?.quantity + 1,
            })
          }
        >
          <LuPlus />
        </Button>

        <Button
          variant="ghostDanger"
          disabled={removingproduct}
          onClick={() => removeproduct(product?.product)}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}
