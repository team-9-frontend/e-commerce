import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useSendRegisterOtp } from '@/api'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

export default function Register() {
  const { mutate: sendRegisterOtp, isPending } = useSendRegisterOtp()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = ({ username, email, password, phone }) => {
    sendRegisterOtp(
      { username, email, password, phone },
      {
        onSuccess: () => {
          navigate('/verify-otp', {
            replace: true,
            state: { email, mode: 'register' },
          })
        },
        onError: (error) => {
          setError('root', {
            message: error.response?.data?.message || 'Register failed!',
          })
        },
      },
    )
  }

  return (
    <div className="flex-center flex-1">
      <div className="card w-full max-w-md p-6">
        <h1 className="mb-2 text-center text-3xl font-bold">Create Account</h1>
        <p className="mb-6 text-center text-neutral-500">Join us and start shopping.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            label="username"
            id="username"
            type="text"
            placeholder="username"
            register={register}
            rules={{
              required: 'Username is required',
            }}
            error={errors.username}
          />

          <FormField
            label="phone"
            id="phone"
            type="tel"
            placeholder="phone number"
            register={register}
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^\+[1-9]\d{1,14}$/i,
                message: 'Invalid phone number',
              },
            }}
            error={errors.phone}
          />

          <FormField
            label="email"
            id="email"
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

          <FormField
            label="password"
            id="password"
            type="password"
            placeholder="password"
            register={register}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Must be at least 8 characters',
              },
            }}
            error={errors.password}
          />

          <span className="text-sm">
            Already have an account? <Link to="/login">Login</Link>
          </span>

          <Button type="submit" disabled={isPending} className="flex-center">
            {isPending ? 'Loading...' : 'Register'}
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
