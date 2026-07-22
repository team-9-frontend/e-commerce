import { LuLoaderCircle } from 'react-icons/lu'
import { useLocation, useNavigate } from 'react-router-dom'

import { useVerifyForgotPasswordOtp, useVerifyRegisterOtp } from '@repo/api'
import { Button, FormField, OtpInput } from '@repo/ui'
import { useForm } from '@repo/utils/forms'

export default function VerifyOtp() {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email
  const mode = location.state?.mode

  const { mutate: verifyResetOtp, isPending: verifyingResetOtp } = useVerifyForgotPasswordOtp()
  const { mutate: verifyRegisterOtp, isPending: verifyingRegisterOtp } = useVerifyRegisterOtp()

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onTouched' })

  const onSubmit = ({ otp, newPassword }) => {
    const mutate = mode === 'reset' ? verifyResetOtp : verifyRegisterOtp
    const variables = mode === 'reset' ? { email, otp, newPassword } : { email, otp }

    mutate(variables, {
      onSuccess: () => navigate('/login'),
      onError: (error) => {
        setError('root', {
          message: error.message || 'Invalid OTP!',
        })
      },
    })
  }

  return (
    <div className="flex-center flex-1 py-8">
      <div className="card w-full max-w-md p-6">
        <h1 className="mb-2 text-center text-3xl font-bold">Verify OTP</h1>
        <p className="mb-6 text-center text-neutral-500">
          {mode === 'reset'
            ? 'Enter the OTP sent to your email and your new password.'
            : 'Enter the OTP sent to your email to verify.'}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <OtpInput control={control} error={errors.otp} />

          {mode === 'reset' && (
            <FormField
              label="New Password"
              name="newPassword"
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
          )}

          <Button type="submit" disabled={verifyingResetOtp || verifyingRegisterOtp}>
            {verifyingResetOtp || verifyingRegisterOtp ? (
              <LuLoaderCircle className="h-[1.5em] animate-spin" />
            ) : mode === 'reset' ? (
              'Reset Password'
            ) : (
              'Verify'
            )}
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
