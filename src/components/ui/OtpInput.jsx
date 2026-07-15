import { useState } from 'react'
import FormField from './FormField'

export default function OtpInput({ name, count = 6, register, setValue, error }) {
  const [otp, setOtp] = useState(new Array(count).fill(''))

  const handleChange = (value, index) => {
    const cleanValue = value.replace(/[^0-9]/g, '')
    if (!cleanValue) return

    const newOtp = [...otp]
    newOtp[index] = cleanValue.slice(-1)
    setOtp(newOtp)

    if (setValue) {
      setValue(name, newOtp.join(''))
    }

    if (index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp]

      if (!otp[index] && index > 0) {
        newOtp[index - 1] = ''
        setOtp(newOtp)
        document.getElementById(`otp-${index - 1}`)?.focus()
      } else {
        newOtp[index] = ''
        setOtp(newOtp)
      }

      if (setValue) {
        setValue(name, newOtp.join(''))
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData
      .getData('text')
      .slice(0, 6)
      .replace(/[^0-9]/g, '')

    if (pastedData.length === count) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)

      if (setValue) {
        setValue(name, pastedData)
      }

      document.getElementById('otp-5')?.focus()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Verification Code</label>

      <div className="flex justify-between gap-2">
        {otp.map((data, index) => (
          <FormField
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={data}
            className="text-center text-lg font-bold"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>

      <input
        type="hidden"
        {...(register &&
          register(name, {
            required: 'OTP is required',
            minLength: { value: 6, message: 'OTP must be 6 digits' },
          }))}
      />

      {error && (
        <span className="text-sm font-medium text-red-600 dark:text-red-400">{error.message}</span>
      )}
    </div>
  )
}
