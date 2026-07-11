import { cn } from '@/utils'

export default function FormField({
  className,
  type = 'text',
  label,
  id,
  placeholder,
  register,
  rules,
  error,
  ...rest
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={id} className="w-fit cursor-pointer text-sm font-medium capitalize">
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        {...(register && register(id, rules))}
        placeholder={placeholder}
        className={cn(
          'focus:border-accent-500 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 outline-none dark:bg-neutral-200',
          error && 'border-red-500 dark:border-red-400',
          className,
        )}
        {...rest}
      />

      {error && (
        <span className="text-sm font-medium text-red-600 dark:text-red-400">{error.message}</span>
      )}
    </div>
  )
}
