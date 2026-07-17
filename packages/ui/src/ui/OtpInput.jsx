import { Controller } from 'react-hook-form'

import { cn } from '@repo/utils'

import { FormField } from './FormField'

export function OtpInput({
  className,
  label = 'Verification Code',
  labelIcon,
  id = 'otp',
  count = 6,
  control,
  error,
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

      <Controller
        name={id}
        control={control}
        rules={{
          required: 'OTP is required',
          minLength: { value: count, message: `OTP must be ${count} digits` },
        }}
        render={({ field: { value = '', onChange } }) => {
          const otpArray = value.split('').concat(Array(count).fill('')).slice(0, count)

          const handleChange = (val, index) => {
            const digit = val.replace(/[^0-9]/g, '').slice(-1)
            if (!digit && val) return

            const newOtp = [...otpArray]
            newOtp[index] = digit
            onChange(newOtp.join(''))

            if (digit && index < count - 1) {
              document.getElementById(`otp-${index + 1}`)?.focus()
            }
          }

          const handleKeyDown = (e, index) => {
            if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
              document.getElementById(`otp-${index - 1}`)?.focus()
            }
          }

          const handlePaste = (e) => {
            e.preventDefault()
            const pastedData = e.clipboardData
              .getData('text')
              .replace(/[^0-9]/g, '')
              .slice(0, count)

            onChange(pastedData)

            const targetIndex = Math.min(pastedData.length, count - 1)
            document.getElementById(`otp-${targetIndex}`)?.focus()
          }

          return (
            <div className="flex justify-between gap-2">
              {otpArray.map((digit, index) => (
                <FormField
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  className="text-center text-lg font-bold"
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                />
              ))}
            </div>
          )
        }}
      />

      {error && (
        <span className="text-sm font-medium text-red-600 dark:text-red-400">{error.message}</span>
      )}
    </div>
  )
}
