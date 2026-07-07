export default function TopProducts({ topProducts }) {
  return (
    <div className="card border-accent-100 dark:border-accent-50 flex flex-col gap-3 rounded-3xl border bg-white p-6 shadow-lg dark:bg-neutral-100">
      <p className="text-accent-800 text-xs tracking-wider uppercase sm:text-sm">Top products</p>
      <h2 className="mb-4 text-xl sm:text-2xl">Best sellers</h2>
      <div className="space-y-3">
        {topProducts?.map((product) => {
          return (
            <div
              key={product._id}
              className="border-accent-200 group bg-accent-100/20 flex items-center justify-between gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5"
            >
              <img
                src={product.image}
                alt={product.name}
                className="size-10 rounded-xl object-cover"
              />
              <div className="flex-1 space-y-1">
                <h3 className="group-hover:text-accent-900 text-lg font-bold">{product.name}</h3>
                <span className="text-sm text-neutral-700">
                  {product.totalSold} units sold - ${product.revenue} revenue
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
