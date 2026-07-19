import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

const steps = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
]

export default function OrderProgress({ status }) {
  const currentStep = steps.indexOf(status)

  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">
        Order Progress
      </h3>

      <div className="relative flex items-start justify-between">
        
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700" />


        <div
          className="absolute top-4 left-0 h-0.5 bg-brand-600 transition-all duration-300"
          style={{
            width:
              currentStep <= 0
                ? '0%'
                : `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const completed = index <= currentStep

          return (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  completed
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {completed ? (
                  <FaCheckCircle className="h-4 w-4" />
                ) : (
                  <FaRegCircle className="h-4 w-4" />
                )}
              </div>

              <span
                className={`mt-2 text-xs capitalize ${
                  completed
                    ? 'font-medium text-brand-600'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
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