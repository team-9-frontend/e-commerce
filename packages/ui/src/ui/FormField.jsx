import { cn } from '@repo/utils'

export function FormField({
  parentClassName,
  className,
  name,
  icon,
  label,
  labelIcon,
  type = 'text',
  options,
  defaultOption,
  hiddenOption,
  register,
  rules,
  error,
  ...rest
}) {
  const id = String(label).trim().toLowerCase()

  return (
    <div className={cn('flex flex-col gap-1', parentClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="flex-center w-fit cursor-pointer gap-1 text-sm font-medium text-neutral-600 capitalize"
        >
          {labelIcon} {label}
        </label>
      )}

      <div className="relative">
        {type === 'select' ? (
          <select
            id={id}
            name={name}
            {...(register && register(name, rules))}
            className={cn(
              'accent-accent-500 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 capitalize outline-none placeholder:text-neutral-500 dark:bg-neutral-200',
              error && 'border-red-600 dark:border-red-400',
              className,
              icon && 'pl-10',
            )}
            {...rest}
          >
            {hiddenOption && (
              <option value="" hidden>
                {String(hiddenOption).replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            )}
            {defaultOption && (
              <option value="">
                {String(defaultOption).replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            )}
            {options?.map((option, i) => {
              const capitalizedOption = String(option).replace(/\b\w/g, (char) =>
                char.toUpperCase(),
              )

              return (
                <option key={i} value={String(option).trim().toLowerCase()} className="capitalize">
                  {capitalizedOption}
                </option>
              )
            })}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            {...(register && register(name, rules))}
            className={cn(
              'focus:border-accent-500 accent-accent-500 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 outline-none placeholder:text-neutral-500 dark:bg-neutral-200',
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
            name={name}
            {...(register && register(name, rules))}
            className={cn(
              'focus:border-accent-500 accent-accent-500 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 outline-none placeholder:text-neutral-500 dark:bg-neutral-200',
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
