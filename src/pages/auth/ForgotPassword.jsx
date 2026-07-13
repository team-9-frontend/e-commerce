
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useForgotPasswordOtp } from '@/api'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

export default function ForgotPassword() {
  const navigate = useNavigate()

  const { mutate: sendOtp, isPending } = useForgotPasswordOtp()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })

  const onSubmit = ({ email }) => {
    sendOtp(
      { email },
      {
        onSuccess: () => {
          navigate('/verify-otp', {
            state: { email },
          })
        },
        onError: (error) => {
          setError('root', {
            message:
              error.response?.data?.message || 'Failed to send OTP!',
          })
        },
      },
    )
  }
     return (
  <div className="flex-center flex-1">
    <div className="card w-full max-w-md p-6">
      <h1 className="mb-2 text-center text-3xl font-bold">
        Forgot Password
      </h1>

      <p className="text-muted mb-6 text-center">
        Enter your email to receive a verification code.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          label="email"
          id="email"
          type="email"
          placeholder="Enter your email"
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

        <Button
          type="submit"
          disabled={isPending}
          className="flex-center py-2"
        >
          {isPending ? 'Sending...' : 'Send OTP'}
        </Button>

        {errors.root && (
          <p className="text-center text-sm font-medium text-red-600 capitalize dark:text-red-400">
            {errors.root.message}
          </p>
        )}
      </form>
    </div>
  </div>
)
  
}
