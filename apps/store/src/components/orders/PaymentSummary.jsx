import { FaCreditCard } from 'react-icons/fa'

export default function PaymentSummary({ order }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
        <FaCreditCard className="text-brand-600" />
        Payment
      </h3>

      <div className="mb-4 space-y-1">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Method:
          <span className="ml-2 font-medium text-slate-900 capitalize dark:text-slate-100">
            {order.paymentMethod}
          </span>
        </p>

        <p className="text-sm text-slate-600 dark:text-slate-400">
          Status:
          <span className="ml-2 font-medium text-slate-900 capitalize dark:text-slate-100">
            {order.paymentStatus}
          </span>
        </p>
      </div>

      {/* <div className="border-t border-slate-200 pt-4 dark:border-slate-700"> */}
      {/* <div className="mb-2 flex justify-between text-sm text-slate-700 dark:text-slate-300">
          <span>Subtotal</span>
          <span>EGP {order.subtotal}</span>
        </div>

        <div className="mb-2 flex justify-between text-sm text-slate-700 dark:text-slate-300">
          <span>Shipping</span>
          <span>EGP {order.shippingFee}</span>
        </div>

        <div className="mb-2 flex justify-between text-sm text-slate-700 dark:text-slate-300">
          <span>Tax</span>
          <span>EGP {order.tax}</span>
        </div>

        <div className="mb-2 flex justify-between text-sm text-slate-700 dark:text-slate-300">
          <span>Discount</span>
          <span>- EGP {order.discount}</span>
        </div> */}

      <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-bold dark:border-slate-700">
        <span className="text-slate-900 dark:text-slate-100">Total</span>

        <span className="text-brand-600">EGP {order.totalPrice}</span>
      </div>
      {/* </div> */}

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Placed on {new Date(order.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
