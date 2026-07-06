export default function RecentOrders({ recentOrders }) {
  return (
    <div className="card border-accent-100 dark:border-accent-50 flex flex-col gap-3 rounded-3xl border bg-white p-6 shadow-lg dark:bg-neutral-100">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <p className="text-accent-800 text-xs sm:text-sm tracking-wider uppercase">Recent orders</p>
          <h2 className="mb-4 text-xl sm:text-2xl">Latest customer activity</h2>
        </div>
        <span className="bg-neutral-300 text-neutral-700 rounded-xl px-2.5 py-1 text-xs shrink-0">
          {recentOrders?.length} orders
        </span>
      </div>
      <div className="space-y-2">
        {recentOrders?.map((order) => {
          return (
            <div
              key={order._id}
              className="border-accent-200 group bg-accent-100/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex-1 space-y-0.5">
                <h3 className="group-hover:text-accent-900 text-lg font-bold">{order?.user}</h3>
                <span className="text-sm text-neutral-700">{order?.items[0]?.name}</span>
              </div>
              <div className="flex items-center gap-2">

              <span className="bg-accent-200 text-accent-700 rounded-xl px-2.5 py-1 text-xs w-fit">
                {order.status}
              </span>
              <span className="group-hover:text-accent-900 font-semibold shrink-0">${order.totalPrice}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
