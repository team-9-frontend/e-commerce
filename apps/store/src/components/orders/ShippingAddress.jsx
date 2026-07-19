import { FaMapMarkerAlt } from 'react-icons/fa'

export default function ShippingAddress({ address }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
        <FaMapMarkerAlt className="text-brand-600" />
        Shipping Address
      </h3>

      <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
        <p className="font-medium text-slate-900 dark:text-slate-100">
          {address.fullName}
        </p>

        <p>{address.address}</p>

        <p>
          {address.city}, {address.country}
        </p>

        {address.postalCode && (
          <p>Postal Code: {address.postalCode}</p>
        )}

        <p>{address.phone}</p>
      </div>
    </div>
  )
}