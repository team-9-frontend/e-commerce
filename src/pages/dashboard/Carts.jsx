export default function AdminCarts() {
  return (
    <div className="flex flex-col gap-4">
      <div className="card space-y-2 p-4">
        <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
          carts
        </p>
        <h2 className="text-3xl">Cart overview</h2>
        <p className="text-sm text-neutral-500">
          All active carts returned from the API are rendered here with their latest item details.
        </p>
      </div>

      <div className="card p-4 text-neutral-500">No carts returned from the API.</div>
    </div>
  )
}
