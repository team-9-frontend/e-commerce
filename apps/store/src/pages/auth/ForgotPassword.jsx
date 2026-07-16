import { useNavigate } from 'react-router-dom'

import { useForgotPasswordOtp } from '@repo/api'
import { Button, FormField } from '@repo/ui'
import { useForm } from '@repo/utils/forms'

export default function ForgotPassword() {
  const { mutate: sendOtp, isPending } = useForgotPasswordOtp()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onTouched' })

  const onSubmit = ({ email }) => {
    sendOtp(
      { email },
      {
        onSuccess: () => {
          navigate('/verify-otp', {
            replace: true,
            state: { email, mode: 'reset' },
          })
        },
        onError: (error) => {
          setError('root', {
            message: error.response?.data?.message || 'Failed to send OTP!',
          })
        },
      },
    )
  }

  return (
    <div className="flex-center flex-1">
      <div className="card w-full max-w-md p-6">
        <h1 className="mb-2 text-center text-3xl font-bold">Forgot Password</h1>
        <p className="mb-6 text-center text-neutral-500">
          Enter your email to receive a verification code.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            id="email"
            label="email"
            type="email"
            placeholder="email"
            register={register}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            error={errors.email}
          />

          <Button type="submit" disabled={isPending} className="flex-center">
            {isPending ? 'Sending...' : 'Send OTP'}
          </Button>
        </form>

        {errors.root && (
          <p className="mt-6 text-center text-sm font-medium text-red-600 capitalize dark:text-red-400">
            {errors.root.message}
          </p>
        )}
      </div>
    </div>
  )
}
