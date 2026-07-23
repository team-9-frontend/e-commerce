import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

import { Badge } from '@repo/ui'
import { cn } from '@repo/utils'

const steps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

const statusColors = {
  pending: 'amber',
  processing: 'sky',
  confirmed: 'teal',
  shipped: 'purple',
  delivered: 'emerald',
  cancelled: 'rose',
}

export default function OrderProgress({ status }) {
  const currentStep = steps.indexOf(status)
  const currentProgress = currentStep <= 0 ? '0%' : `${(currentStep / (steps.length - 1)) * 100}%`

  return (
    <div className="card flex flex-col gap-8 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Order Progress</h3>

        <Badge color={statusColors[status]}>{status}</Badge>
      </div>

      <div className="relative flex items-center justify-between">
        <div
          className="from-accent-600 dark:from-accent-400 absolute top-4 right-4 left-4 h-0.5 bg-linear-to-r to-neutral-300"
          style={{
            '--tw-gradient-from-position': currentProgress,
            '--tw-gradient-to-position': currentProgress,
          }}
        />

        {steps.map((step, index) => {
          const completed = index <= currentStep

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  'flex-center size-8 rounded-full',
                  completed
                    ? 'bg-accent-600 dark:bg-accent-400 text-white'
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300',
                )}
              >
                {completed ? (
                  <FaCheckCircle className="h-4 w-4" />
                ) : (
                  <FaRegCircle className="h-4 w-4" />
                )}
              </div>

              <span
                className={cn(
                  'mt-2 text-xs capitalize',
                  completed ? 'text-brand-600 font-medium' : 'text-slate-500 dark:text-slate-400',
                )}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
