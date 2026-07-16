import { cn } from '@repo/utils'

export function FormField({
  className,
  icon,
  labelIcon,
  type = 'text',
  options,
  defaultOption,
  id,
  label,
  placeholder,
  register,
  rules,
  error,
  ...rest
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label
          htmlFor={id}
          className="flex-center w-fit cursor-pointer gap-1 text-sm font-medium capitalize"
        >
          {labelIcon} {label}
        </label>
      )}

      <div className="relative">
        {type === 'select' ? (
          <select
            id={id}
            {...(register && register(id, rules))}
            className={cn(
              'w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 capitalize outline-none placeholder:text-neutral-500 dark:bg-neutral-200',
              error && 'border-red-600 dark:border-red-400',
              className,
              icon && 'pl-10',
            )}
            {...rest}
          >
            {defaultOption && <option value="">{defaultOption}</option>}
            {options?.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={id}
            {...(register && register(id, rules))}
            placeholder={placeholder}
            className={cn(
              'focus:border-accent-500 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 outline-none placeholder:text-neutral-500 dark:bg-neutral-200',
              error && 'border-red-600 dark:border-red-400',
              className,
              icon && 'pl-10',
            )}
            {...rest}
          />
        ) : (
          <input
            type={type}
            id={id}
            {...(register && register(id, rules))}
            placeholder={placeholder}
            className={cn(
              'focus:border-accent-500 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 outline-none placeholder:text-neutral-500 dark:bg-neutral-200',
              error && 'border-red-600 dark:border-red-400',
              className,
              icon && 'pl-10',
            )}
            {...rest}
          />
        )}
        {icon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">{icon}</div>
        )}
      </div>

      {error && (
        <span className="text-sm font-medium text-red-600 dark:text-red-400">{error.message}</span>
      )}
    </div>
  )
}
