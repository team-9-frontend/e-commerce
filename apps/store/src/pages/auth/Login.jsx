import { LuLoaderCircle } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'

import { useLogin } from '@repo/api'
import { Button, FormField } from '@repo/ui'
import { useForm } from '@repo/utils/forms'

export default function Login() {
  const { mutate: login, isPending: logingin } = useLogin()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = ({ email, password }) => {
    login(
      { email, password },
      {
        onSuccess: (data) => {
          if (data?.user) navigate('/')
        },
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
        <p className="mb-6 text-center text-neutral-500">Please log in to continue.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          <FormField
            name="password"
            label="password"
            type="password"
            placeholder="password"
            register={register}
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Must be at least 8 characters' },
            }}
            error={errors.password}
          />

          <div className="flex flex-col items-start gap-1 text-sm">
            <span>
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </span>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button type="submit" disabled={logingin}>
            {logingin ? <LuLoaderCircle className="h-[1.5em] animate-spin" /> : 'Login'}
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
