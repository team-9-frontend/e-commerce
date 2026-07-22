import { LuBanknote, LuCreditCard } from 'react-icons/lu'

export default function PaymentMethodSelector({ value, onChange }) {
  const options = [
    { id: 'cash', label: 'Cash on Delivery', icon: <LuBanknote size={22} /> },
    { id: 'stripe', label: 'Pay with Card', icon: <LuCreditCard size={22} /> },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
            value === opt.id
              ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          {opt.icon}
          <span className="text-sm font-medium">{opt.label}</span>
        </button>
      ))}
    </div>
  )
}
