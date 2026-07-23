export default function ShippingAddress({ address }) {
  return (
    <div className="card flex flex-col gap-4 p-4">
      <h3 className="text-xl font-bold">Shipping Address</h3>

      <div className="flex flex-col gap-2 text-sm">
        <p className="flex gap-2 text-sm text-neutral-600">
          Full Name:
          <span className="font-medium text-neutral-950 capitalize">{address.fullName}</span>
        </p>

        <p className="flex gap-2 text-sm text-neutral-600">
          Address:
          <span className="font-medium text-neutral-950 capitalize">{address.address}</span>
        </p>

        <p className="flex gap-2 text-sm text-neutral-600">
          City:
          <span className="font-medium text-neutral-950 capitalize">
            {address.city}, {address.country}
          </span>
        </p>

        {address.postalCode && (
          <p className="flex gap-2 text-sm text-neutral-600">
            Postal Code:
            <span className="font-medium text-neutral-950 capitalize">{address.postalCode}</span>
          </p>
        )}

        <p className="flex gap-2 text-sm text-neutral-600">
          Phone:
          <span className="font-medium text-neutral-950 capitalize">{address.phone}</span>
        </p>
      </div>
    </div>
  )
}
