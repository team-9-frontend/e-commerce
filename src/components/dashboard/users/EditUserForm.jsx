import { useUpdateUser } from '@/api'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import { useForm } from '@/utils/forms'

export default function AddUserForm({ user, setUser }) {
  if (!user) return

  const { mutate: updateUser, isPending } = useUpdateUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      username: user?.username ?? '',
      phone: user?.phone ?? '',
      avatar: user?.avatar ?? '',
    },
  })

  return (
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
        id="username"
        type="text"
        placeholder="username"
        register={register}
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
            message: 'Invalid phone number',
          },
        }}
        error={errors.phone}
      />

      <FormField
        label="avatar"
        id="avatar"
        placeholder="avatar url"
        register={register}
        error={errors.avatar}
      />

      <Button type="submit" disabled={isPending} variant="neutralPrimary" className="flex-center">
        <span className="text-nowrap">{isPending ? 'Saving...' : 'save changes'}</span>
      </Button>
    </form>
  )
}
