export default function OrderStatus({ orders }) {
  const orderData = [
    {
      label: 'Pending',
      count: orders.pending,
      color:
        'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800',
    },
    {
      label: 'Processing',
      count: orders.processing,
      color:
        'bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-900 dark:text-sky-100 dark:border-sky-800',
    },
    {
      label: 'Confirmed',
      count: orders.confirmed,
      color:
        'bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800',
    },
    {
      label: 'Shipped',
      count: orders.shipped,
      color:
        'bg-indigo-100 text-indigo-900 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:border-indigo-800',
    },
    {
      label: 'Delivered',
      count: orders.delivered,
      color:
        'bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-800',
    },
    {
      label: 'Cancelled',
      count: orders.cancelled,
      color:
        'bg-rose-100 text-rose-900 border-rose-200 dark:bg-rose-900 dark:text-rose-100 dark:border-rose-800',
    },
  ]
  return (
    <div className="card border-accent-100 dark:border-accent-50 flex flex-col gap-3 rounded-3xl border bg-white p-6 shadow-lg dark:bg-neutral-100">
      <p className="text-accent-800 text-xs sm:text-sm tracking-wider uppercase">Order status</p>
      <h2 className="mb-4 text-xl sm:text-2xl">Live fulfillment breakdown</h2>
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        {orderData.map((order) => {
          return (
            <div
              key={order.label}
              className={`flex items-center justify-between rounded-2xl border p-4 ${order.color}`}
            >
              <span className="text-sm font-semibold tracking-wider uppercase">{order.label}</span>
              <span className="text-2xl font-bold">{order.count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
