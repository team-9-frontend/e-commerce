import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useVerifyForgotPasswordOtp, useVerifyRegisterOtp } from '@/api'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import OtpInput from '@/components/ui/OtpInput'

export default function VerifyOTP() {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email
  const mode = location.state?.mode

  const { mutate: verifyOTP, isPending } =
    mode === 'reset' ? useVerifyForgotPasswordOtp() : useVerifyRegisterOtp()

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = ({ otp, newPassword }) => {
    verifyOTP(
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
            message: error.response?.data?.message || 'Invalid OTP!',
          })
        },
      },
    )
  }

  return (
    <div className="flex-center flex-1">
      <div className="card w-full max-w-md p-6">
        <h1 className="mb-2 text-center text-3xl font-bold">Verify OTP</h1>
        <p className="mb-6 text-center text-neutral-500">
          Enter the OTP sent to your email and your new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <OtpInput name="otp" register={register} setValue={setValue} error={errors.otp} />

          {mode === 'reset' && (
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
          )}

          <Button type="submit" disabled={isPending} className="flex-center">
            {isPending ? 'Loading...' : mode === 'reset' ? 'Reset Password' : 'Verify'}
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
