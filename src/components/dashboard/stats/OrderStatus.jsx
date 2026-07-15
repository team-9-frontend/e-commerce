const STATUSES = [
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
]

export default function OrderStatus({ orders }) {
  return (
    <div className="card flex flex-col gap-2 p-4">
      {STATUSES.map(({ key, label }) => (
        <div key={key} className="flex items-center justify-between">
          <span>{label}</span>
          <span>{orders?.[key] ?? 0}</span>
        </div>
      ))}
    </div>
  )
}
