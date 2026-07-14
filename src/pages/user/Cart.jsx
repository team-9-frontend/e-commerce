// export default function Cart() {
//   return <h1>Cart Page</h1>
// }
import { useGetCart } from "@/api/hooks/useCart";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useUpdateCartItem } from "@/api/hooks/useCart";
import Button from "@/components/ui/Button";
import { useRemoveCartItem } from "@/api/hooks/useCart";

export default function Cart() {
  const { data: cart, isLoading, isError } = useGetCart();
  const { mutate: updateCart, isPending } = useUpdateCartItem();
  const { mutate: removeItem, isPending: removing } = useRemoveCartItem();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Something went wrong.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Shopping Cart
      </h1>

     <div className="space-y-4">
  {cart.items.map((item) => (
    <div
      key={item._id}
      className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
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

          <p className="text-gray-500">
            Price: ${item.price}
          </p>

         <div className="mt-3 flex items-center gap-3">
  <Button
    size="sm-square"
    disabled={isPending || item.quantity <= 1}
    onClick={() =>{console.log(
      updateCart({
        productId: item.product,
        quantity: item.quantity - 1,
      }))
      
    }}
  >
    -
  </Button>
<Button
  variant="dangerGhost"
  disabled={removing}
  onClick={() => removeItem(item.product)}
>
  Remove
</Button>
  <span className="font-semibold">
    {item.quantity}
  </span>

  <Button
    size="sm-square"
    disabled={isPending}
    onClick={() =>
      updateCart(console.log({
        productId: item.product,
        quantity: item.quantity + 1,
      }))
    }
  >
    +
  </Button>
</div>
        </div>
      </div>
    </div>
  ))}
</div>

<div className="mt-8 rounded-lg border p-6 shadow-sm">
  <p>Subtotal: ${cart.subtotal}</p>

  <p>Discount: ${cart.discountAmount}</p>

  <h2 className="mt-2 text-xl font-bold">
    Total: ${cart.total}
  </h2>
</div>
    </div>
  );
}

