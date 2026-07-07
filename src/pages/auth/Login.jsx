import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { login } from '@/api/authApi'
import { useUserContext } from '@/context/UserContextProvider'
import { cn } from '@/utils/cn'

export default function Login() {
  const { user, refreshUser } = useUserContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  })

  const onSubmit = async (data) => {
    try {
      const { data: responseData } = await login({ email: data.email, password: data.password })
      if (!responseData.success) {
        return setError('root', {
          type: 'invalid_credentials',
          message: 'Invalid credentials. Please try again.',
        })
      }
      refreshUser()
      if (user.role === 'admin') {
        return navigate('/dashboard')
      } else navigate('/')
    } catch (error) {
      setError('root', {
        type: error.response?.status || 'error',
        message: error.response?.data?.message || 'Login Failed',
      })
    }
  }

  return (
    <>
      <div className="flex-center flex-1">
        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-950 dark:bg-neutral-100">
          <h1 className="mb-2 text-center text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted mb-2 text-center">Please log in to continue.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="w-fit cursor-pointer font-medium">
                Email
              </label>

              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="Enter your email"
                className="focus:border-accent-500 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 outline-none dark:bg-neutral-200"
              />
              {errors.email && (
                <span className="col-start-2 text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="w-fit cursor-pointer font-medium">
                Password
              </label>

              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Must be at least 8 characters' },
                })}
                placeholder="Enter your password"
                className="focus:border-accent-500 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 outline-none dark:bg-neutral-200"
              />
              {errors.password && (
                <span className="col-start-2 text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col items-start gap-1 text-sm">
              <span>
                Dont have an account?{' '}
                <Link to="/register" className="text-accent-600 hover:underline">
                  Register
                </Link>
              </span>
              <Link to="/forgot-password" className="text-accent-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'bg-accent-500 hover:bg-accent-600 dark:hover:bg-accent-400 cursor-pointer rounded-lg px-4 py-2 text-neutral-50 disabled:opacity-50 dark:text-neutral-950',
                isSubmitting && 'cursor-default opacity-50',
              )}
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>

            {errors.root?.message && (
              <span className="mt-2 text-center text-sm font-medium text-red-600 dark:text-red-400">
                {errors.root.message}
              </span>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
