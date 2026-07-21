import { useCurrentUser } from '@repo/api'
import { LoadingSpinner } from '@repo/ui'

export default function Profile() {
  const { data, isLoading, error } = useCurrentUser()

  if (isLoading) return <LoadingSpinner />

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading profile.</div>
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-3xl font-bold">My Profile</h1>

      <div className="rounded-xl border p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center">
          <img
            src={data?.avatar}
            alt={data?.username}
            className="mb-4 h-28 w-28 rounded-full border object-cover"
          />

          <h2 className="text-2xl font-semibold">{data?.username}</h2>

          <p className="text-neutral-500">{data?.role}</p>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-neutral-500">Email</p>
            <p className="font-medium">{data?.email}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Phone</p>
            <p className="font-medium">{data?.phone || 'No phone added'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
