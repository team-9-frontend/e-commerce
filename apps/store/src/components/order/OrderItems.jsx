export default function OrderItems({ items }) {
  return (
    <div className="card flex flex-col gap-4 p-4">
      <h3 className="text-xl font-bold">Items</h3>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.product} className="flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="size-26 rounded-lg bg-neutral-300 object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="line-clamp-1 font-bold sm:text-lg">{item.name}</h3>
                <p className="line-clamp-1 text-sm text-neutral-700 capitalize">
                  {item.quantity} × ${item.price}
                </p>
              </div>
              <p className="text-end font-bold">${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
