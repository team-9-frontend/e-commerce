
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="flex-center flex-1">
      <div className="card w-full max-w-md p-6">
        <h1 className="mb-2 text-center text-3xl font-bold">Create Account</h1>

        <p className="text-muted mb-6 text-center">
          Join us and start shopping.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <FormField
            label="username"
            id="username"
            type="text"
            placeholder="Enter your username"
            register={register}
            rules={{
              required: 'Username is required',
            }}
            error={errors.username}
          />

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
              minLength: {
                value: 8,
                message: 'Must be at least 8 characters',
              },
            }}
            error={errors.password}
          />

          <Button type="submit" className="flex-center py-2">
            Create Account
          </Button>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </div>

        </form>
      </div>
    </div>
  )
}