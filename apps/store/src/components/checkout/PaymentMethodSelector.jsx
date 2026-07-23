import { LuBanknote, LuCreditCard } from 'react-icons/lu'

import { Button } from '@repo/ui'
import { cn } from '@repo/utils'

export default function PaymentMethodSelector({ value, setValue }) {
  const options = [
    { id: 'cash', label: 'Cash on Delivery', icon: <LuBanknote size={22} /> },
    { id: 'stripe', label: 'Pay with Card', icon: <LuCreditCard size={22} /> },
  ]

  return (
    <div className="flex gap-4 max-sm:flex-col">
      {options.map((opt) => (
        <Button
          key={opt.id}
          variant="ghost"
          onClick={() => setValue(opt.id)}
          className={cn(
            'flex-center w-full flex-col gap-2 bg-neutral-50 p-4 ring-2 ring-neutral-200 hover:bg-neutral-100 dark:bg-neutral-100 dark:hover:bg-neutral-200',
            value === opt.id &&
              'ring-accent-600 dark:ring-accent-400 bg-accent-500/25 dark:bg-accent-500/25 hover:bg-accent-500/25 dark:hover:bg-accent-500/25',
          )}
        >
          {opt.icon}
          <span className="text-sm font-medium">{opt.label}</span>
        </Button>
      ))}
    </div>
  )
}
