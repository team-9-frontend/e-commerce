import { useState } from "react";

import {
  useApplyCoupon,
  useClearCart,
  useGetCart,
  useRemoveCoupon,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/api/hooks/useCart";

import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Cart() {
  const [coupon, setCoupon] = useState("");

  const { data: cart, isLoading, isError } = useGetCart();

  const { mutate: updateCart, isPending: updating } =
    useUpdateCartItem();

  const { mutate: removeItem, isPending: removing } =
    useRemoveCartItem();

  const { mutate: applyCoupon, isPending: applyingCoupon } =
    useApplyCoupon();

  const { mutate: removeCoupon, isPending: removingCoupon } =
    useRemoveCoupon();

  const { mutate: clearCart, isPending: clearing } =
    useClearCart();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Something went wrong.
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center py-24">
        <h1 className="text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-3 text-neutral-500">
          Add some products to your cart.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Shopping Cart
      </h1>

      {/* Coupon */}

      <div className="mb-8 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="rounded-lg border px-4 py-2"
        />

        <Button
          disabled={applyingCoupon || !coupon.trim()}
          onClick={() =>
            applyCoupon(
              {
                code: coupon.trim(),
              },
              {
                onSuccess: () => setCoupon(""),
                onError: (error) =>
                  alert(error.response?.data?.message),
              }
            )
          }
        >
          {applyingCoupon ? "Applying..." : "Apply"}
        </Button>

        {cart.coupon && (
          <Button
            variant="outlineDanger"
            disabled={removingCoupon}
            onClick={() => removeCoupon()}
          >
            {removingCoupon ? "Removing..." : "Remove Coupon"}
          </Button>
        )}
      </div>

      {/* Cart Items */}

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center justify-between gap-4 rounded-xl border p-5 shadow-sm md:flex-row"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-lg object-cover"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  {item.name}
                </h2>

                <p className="mt-1 text-neutral-500">
                  ${item.price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="sm-square"
                disabled={updating || item.quantity <= 1}
                onClick={() =>
                  updateCart(
                    {
                      productId: item.product,
                      quantity: item.quantity - 1,
                    },
                    {
                      onError: (error) =>
                        alert(error.response?.data?.message),
                    }
                  )
                }
              >
                -
              </Button>

              <span className="min-w-6 text-center font-semibold">
                {item.quantity}
              </span>

              <Button
                size="sm-square"
                disabled={updating}
                onClick={() =>
                  updateCart(
                    {
                      productId: item.product,
                      quantity: item.quantity + 1,
                    },
                    {
                      onError: (error) =>
                        alert(error.response?.data?.message),
                    }
                  )
                }
              >
                +
              </Button>

              <Button
                variant="ghostDanger"
                disabled={removing}
                onClick={() =>
                  removeItem(item.product, {
                    onError: (error) =>
                      alert(error.response?.data?.message),
                  })
                }
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}

      <div className="mt-8 rounded-xl border p-6 shadow-sm">
        <div className="mb-2 flex justify-between">
          <span>Items</span>
          <span>{cart.itemCount}</span>
        </div>

        <div className="mb-2 flex justify-between">
          <span>Subtotal</span>
          <span>${cart.subtotal}</span>
        </div>

        <div className="mb-2 flex justify-between">
          <span>Discount</span>
          <span>${cart.discountAmount}</span>
        </div>

        <div className="mb-4 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${cart.total}</span>
        </div>

        <Button
          variant="outlineDanger"
          disabled={clearing}
          className="w-full justify-center"
          onClick={() => {
            if (window.confirm("Are you sure you want to clear your cart?")) {
              clearCart();
            }
          }}
        >
          {clearing ? "Clearing..." : "Clear Cart"}
        </Button>
      </div>
    </div>
  );
}