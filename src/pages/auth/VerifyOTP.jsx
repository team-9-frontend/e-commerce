
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { useVerifyForgotPasswordOtp } from '@/api'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

export default function VerifyOTP() {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email

  const { mutate: verifyOtp, isPending } = useVerifyForgotPasswordOtp()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })

  const onSubmit = ({ otp, newPassword }) => {
    verifyOtp(
      {
        email,
        otp,
        newPassword,
      },
      {
        onSuccess: () => {
          navigate('/login')
        },
        onError: (error) => {
          setError('root', {
            message: error.response?.data?.message || 'Invalid OTP or password!',
          })
        },
      },
    )
  }

  return (
  <div className="flex-center flex-1">
    <div className="card w-full max-w-md p-6">
      <h1 className="mb-2 text-center text-3xl font-bold">
        Verify OTP
      </h1>

      <p className="text-muted mb-6 text-center">
        Enter the OTP sent to your email and your new password.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          label="OTP"
          id="otp"
          type="text"
          placeholder="Enter OTP"
          register={register}
          rules={{
            required: 'OTP is required',
          }}
          error={errors.otp}
        />

        <FormField
          label="New Password"
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          register={register}
          rules={{
            required: 'New password is required',
            minLength: {
              value: 8,
              message: 'Must be at least 8 characters',
            },
          }}
          error={errors.newPassword}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="flex-center py-2"
        >
          {isPending ? 'Verifying...' : 'Reset Password'}
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