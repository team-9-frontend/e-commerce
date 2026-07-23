export default function PaymentSummary({ order }) {
  return (
    <div className="card flex flex-col gap-4 p-4">
      <h3 className="text-xl font-bold">Payment</h3>

      <div className="flex flex-col gap-1">
        <p className="flex gap-2 text-sm text-neutral-600">
          Method:
          <span className="font-medium text-neutral-950 capitalize">{order.paymentMethod}</span>
        </p>

        <p className="flex gap-2 text-sm text-neutral-600">
          Status:
          <span className="font-medium text-neutral-950 capitalize">{order.paymentStatus}</span>
        </p>
      </div>

      <div className="flex justify-between border-t border-neutral-200 pt-4 text-lg font-bold">
        <span>Total</span>

        <span>${order.totalPrice}</span>
      </div>

      <p className="text-end mt-auto text-xs text-neutral-500">
        Placed on {new Date(order.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
