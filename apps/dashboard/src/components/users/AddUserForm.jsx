import { LuTrash, LuUserPlus } from 'react-icons/lu'

import { useAddUser } from '@repo/api'
import { Button, FormField } from '@repo/ui'
import { cn } from '@repo/utils'
import { useForm } from '@repo/utils/forms'

export default function AddUserForm() {
  const { mutate: addUser, isPending } = useAddUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        addUser(data)
      })}
      className="mt-4 overflow-hidden border-t border-neutral-200 pt-4"
    >
      <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4')}>
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
            pattern: {
              value: /^\+[1-9]\d{1,14}$/i,
              message: 'Invalid phone number (must contain country code)',
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
      </div>

      <div
        className={cn(
          'mt-4 flex justify-end gap-4 overflow-hidden border-t border-neutral-200 pt-4',
        )}
      >
        <Button variant="ghostDanger" type="reset" onClick={reset}>
          <LuTrash /> clear
        </Button>

        <Button type="submit" disabled={isPending} variant="primary">
          <LuUserPlus />
          <span>{isPending ? 'Loading...' : 'create user'}</span>
        </Button>
      </div>
    </form>
  )
}
