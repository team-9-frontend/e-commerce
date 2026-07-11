export default function AdminCarts() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="card col-span-full p-4">
        <p className="text-accent-600 dark:text-accent-400 mb-1 font-mono text-sm tracking-wider uppercase">
          dashboard carts
        </p>
        <h2 className="text-3xl">Cart overview</h2>
        <p className="text-muted text-sm">
          All active carts returned from the API are rendered here with their latest item details.
        </p>
      </div>

      <div className="card text-muted col-span-full p-4">No carts returned from the API.</div>
    </div>
  )
}
