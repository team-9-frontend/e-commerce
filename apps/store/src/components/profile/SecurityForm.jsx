import { useState } from 'react'

import { LuLoaderCircle, LuLock } from 'react-icons/lu'

import { useCurrentUser, useForgotPasswordOtp, useVerifyForgotPasswordOtp } from '@repo/api'
import { Button, FormField, OtpInput } from '@repo/ui'
import { useForm } from '@repo/utils/forms'

export default function AddressForm() {
  const [formState, setFormState] = useState(0)

  const { data: user } = useCurrentUser()
  const { mutate: sendOtp, isPending: sendingOtp } = useForgotPasswordOtp()
  const { mutate: verifyResetOtp, isPending: verifyingResetOtp } = useVerifyForgotPasswordOtp()

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: user?.email || '',
      otp: '',
      newPassword: '',
    },
  })

  const onResetSubmit = ({ email }) => {
    sendOtp(
      { email },
      {
        onSuccess: () => setFormState(2),
        onError: (error) => {
          setError('root', {
            message: error.message || 'Failed to send OTP!',
          })
        },
      },
    )
  }

  const onVerifySubmit = ({ otp, newPassword }) => {
    verifyResetOtp(
      { otp, newPassword },
      {
        onSuccess: () => setFormState(0),
        onError: (error) => {
          setError('root', {
            message: error.message || 'Invalid OTP!',
          })
        },
      },
    )
  }

  return (
    <div className="card flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Security</h2>

      {formState === 0 && (
        <Button className="w-fit" onClick={() => setFormState(1)}>
          <LuLock /> Change Password
        </Button>
      )}

      {formState === 1 && (
        <form onSubmit={handleSubmit(onResetSubmit)} className="flex flex-col gap-4">
          <FormField
            name="email"
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

          <div className="flex gap-2">
            <Button type="submit" disabled={sendingOtp}>
              {sendingOtp ? <LuLoaderCircle className="h-[1.4em] animate-spin" /> : 'Send OTP'}
            </Button>

            <Button
              type="reset"
              variant="ghost"
              onClick={() => {
                reset()
                setFormState(0)
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {formState === 2 && (
        <form onSubmit={handleSubmit(onVerifySubmit)} className="flex flex-col gap-4">
          <OtpInput control={control} error={errors.otp} parentClassName="sm:max-w-md" />

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

          <div className="flex gap-2">
            <Button type="submit" disabled={verifyResetOtp}>
              {verifyingResetOtp ? <LuLoaderCircle className="h-[1.4em] animate-spin" /> : 'Verify'}
            </Button>

            <Button
              type="reset"
              variant="ghost"
              onClick={() => {
                reset()
                setFormState(0)
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
