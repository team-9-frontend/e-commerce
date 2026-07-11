import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { useLogin } from '@/api'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

export default function Login() {
  const { mutate: login, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })

  const onSubmit = ({ email, password }) => {
    login(
      { email, password },
      {
        onError: (error) => {
          setError('root', {
            message: error.response?.data?.message || 'Login failed!',
          })
        },
      },
    )
  }

  return (
    <div className="flex-center flex-1">
      <div className="card w-full max-w-md p-6">
        <h1 className="mb-2 text-center text-3xl font-bold">Welcome Back!</h1>
        <p className="text-muted mb-6 text-center">Please log in to continue.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          <FormField
            label="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Must be at least 8 characters' },
            }}
            error={errors.password}
          />

          <div className="flex flex-col gap-1 text-sm">
            <span>
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </span>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button type="submit" disabled={isPending} className="flex-center py-2">
            {isPending ? 'Loading...' : 'Login'}
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
