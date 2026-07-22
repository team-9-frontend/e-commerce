import { useEffect, useState } from 'react'

import { LuLoaderCircle } from 'react-icons/lu'

import { useUpdateUser } from '@repo/api'
import { Button, Dialog, FormField } from '@repo/ui'
import { useForm } from '@repo/utils/forms'

export default function EditUserDialog({ user, setUser }) {
  const [lastUser, setLastUser] = useState(null)

  const { mutate: updateUser, isPending: updatingUser } = useUpdateUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' })

  useEffect(() => {
    if (user) {
      setLastUser(user)
      reset({
        username: user.username ?? '',
        phone: user.phone ?? '',
        avatar: user.avatar ?? '',
      })
    }
  }, [user, reset])

  return (
    <Dialog isOpen={user} setIsOpen={setUser} title="Edit user details">
      {lastUser && (
        <form
          onSubmit={handleSubmit((data) => {
            updateUser(
              { id: user._id, data },
              {
                onSuccess: () => {
                  setUser(null)
                },
              },
            )
          })}
          className="flex flex-col gap-4"
        >
          <FormField
            label="username"
            name="username"
            type="text"
            placeholder="username"
            register={register}
            error={errors.username}
          />

          <FormField
            label="phone"
            name="phone"
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
            label="avatar"
            name="avatar"
            placeholder="avatar url"
            register={register}
            error={errors.avatar}
          />

          <Button type="submit" disabled={updatingUser} variant="primary">
            {updatingUser ? <LuLoaderCircle className="h-[1.5em] animate-spin" /> : 'Save Changes'}
          </Button>
        </form>
      )}
    </Dialog>
  )
}
