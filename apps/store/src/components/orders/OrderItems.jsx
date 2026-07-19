export default function OrderItems({ items }) {
    return (
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
          Items
        </h3>
  
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product}
              className="flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 rounded-lg object-cover bg-slate-100 dark:bg-slate-700"
              />
  
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-900 dark:text-slate-100">
                  {item.name}
                </p>
  
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Qty: {item.quantity} × EGP {item.price}
                </p>
              </div>
  
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                  EGP {item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }