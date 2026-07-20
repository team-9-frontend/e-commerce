import { LuMinus, LuPlus, LuTrash2, LuX } from 'react-icons/lu'

import { useRemoveCartItem, useUpdateCartItem } from '@repo/api'
import { Button, Skeleton } from '@repo/ui'

export default function CartProductCard({ isLoading, product }) {
  const { mutate: updateCart, isPending: updatingproduct } = useUpdateCartItem()
  const { mutate: removeproduct, isPending: removingproduct } = useRemoveCartItem()

  return (
    <div className="card flex justify-between gap-4 p-4">
      <div className="flex w-full gap-4">
        {!isLoading ? (
          <img
            src={product?.image}
            alt={product?.name}
            width={96}
            height={96}
            className="size-24 rounded-lg bg-neutral-300 object-cover"
          />
        ) : (
          <Skeleton width={96} height={96} />
        )}
        <div className="flex-1">
          <h3 className="line-clamp-1 font-bold sm:text-lg">
            {!isLoading ? product?.name : <Skeleton width="50%" />}
          </h3>
          <p className="line-clamp-1 text-sm text-neutral-700">
            {!isLoading ? `$${product?.price}` : <Skeleton width="15%" />}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-4">
        {!isLoading ? (
          <Button
            variant="ghostDanger"
            size="md-square"
            disabled={removingproduct}
            onClick={() => removeproduct(product?.product)}
          >
            <LuX />
          </Button>
        ) : (
          <Skeleton width={32} height={32} />
        )}

        {!isLoading ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md-square"
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
              variant="outline"
              size="md-square"
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
          </div>
        ) : (
          <Skeleton width={108} height={34} />
        )}
      </div>
    </div>
  )
}
