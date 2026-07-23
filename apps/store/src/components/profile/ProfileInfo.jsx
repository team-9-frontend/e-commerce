import { useEffect, useState } from 'react'

import { LuLoaderCircle } from 'react-icons/lu'

import { useUpdateUser } from '@repo/api'
import { Button, FormField } from '@repo/ui'
import { cn } from '@repo/utils'
import { useForm } from '@repo/utils/forms'

export default function ProfileInfo({ user }) {
  const [editing, setEditing] = useState(false)
  const { mutate: updateUser, isPending: updatingUser } = useUpdateUser()
  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
    formState: { errors: editErrors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      username: user?.username ?? '',
      phone: user?.phone ?? '',
      avatar: user?.avatar ?? '',
    },
  })

  useEffect(() => {
    if (user) {
      editReset({
        username: user.username ?? '',
        phone: user.phone ?? '',
        avatar: user.avatar ?? '',
      })
    }
  }, [user, editReset])

  const onEditSubmit = (data) => {
    updateUser(
      { id: user._id, data },
      {
        onSuccess: () => {
          setEditing(false)
        },
      },
    )
  }

  return (
    <div className="card flex flex-col gap-4 p-4">
      <div className="flex gap-4 max-sm:flex-col">
        <div className="flex-center">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={String(user?.username).slice(0, 1)}
              className="flex-center size-32 rounded-full bg-neutral-200 object-cover text-xs"
            />
          ) : (
            <div className="flex-center size-32 rounded-full bg-neutral-200 text-xs">
              {String(user?.username).slice(0, 1)}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-6 border-neutral-200 max-sm:border-t max-sm:pt-4 sm:border-l sm:pl-4">
          <div>
            <h2 className="mb-1 text-xl font-bold sm:text-2xl">{user?.username}</h2>

            <p className="text-sm text-neutral-500">{user?.email}</p>
            <p className="text-sm text-neutral-500">{user?.role}</p>
          </div>

          <div className="flex gap-2">
            {editing ? (
              <>
                <Button disabled={updatingUser} onClick={editHandleSubmit(onEditSubmit)}>
                  {updatingUser ? (
                    <LuLoaderCircle className="h-[1.4em] animate-spin" />
                  ) : (
                    'Save Changes'
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    editReset()
                    setEditing(false)
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={editHandleSubmit(onEditSubmit)} className="flex flex-col gap-4">
        <FormField
          label="username"
          name="username"
          type="text"
          placeholder="username"
          register={editRegister}
          error={editErrors.username}
          disabled={!editing}
          className={cn(
            !editing && 'border-neutral-300/15 bg-neutral-50/15 px-4 py-2 dark:bg-neutral-200/15',
          )}
        />

        <FormField
          label="phone"
          name="phone"
          type="tel"
          placeholder="phone number"
          register={editRegister}
          rules={{
            pattern: {
              value: /^\+[1-9]\d{1,14}$/i,
              message: 'Invalid phone number (must contain country code)',
            },
          }}
          error={editErrors.phone}
          disabled={!editing}
          className={cn(
            !editing && 'border-neutral-300/15 bg-neutral-50/15 px-4 py-2 dark:bg-neutral-200/15',
          )}
        />

        <div
          className={cn(
            'grid grid-rows-[0fr_1fr] transition-all',
            editing && 'grid-rows-[1fr_0fr]',
          )}
        >
          <div className="overflow-hidden">
            <FormField
              label="avatar"
              name="avatar"
              placeholder="avatar url"
              register={editRegister}
              error={editErrors.avatar}
              disabled={!editing}
              className={cn(
                !editing &&
                  'border-neutral-300/15 bg-neutral-50/15 px-4 py-2 dark:bg-neutral-200/15',
              )}
            />
          </div>

          <div className="flex flex-col gap-1 overflow-hidden">
            <p className="text-sm font-medium text-neutral-600">Role</p>
            <p className="rounded-lg border border-neutral-300/15 bg-neutral-50/15 px-4 py-2 dark:bg-neutral-200/15">
              {user?.role}
            </p>
          </div>
        </div>

        <button type="submit" className="hidden"></button>
      </form>
    </div>
  )
}
