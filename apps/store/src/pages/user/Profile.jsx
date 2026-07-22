import { useCurrentUser } from '@repo/api'
import { LoadingSpinner } from '@repo/ui'

export default function Profile() {
  const { data, isLoading, error } = useCurrentUser()

  if (isLoading) return <LoadingSpinner />

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading profile.</div>
  }

 return (
  <div className="mx-auto max-w-5xl p-6">
   <div className="mb-8">
  <h1 className="text-4xl font-bold">My Profile</h1>

  <p className="mt-2 text-neutral-500">
    Manage your personal information
  </p>
</div>

    <div className="rounded-2xl border p-8 shadow-md">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">

        {/* Avatar */}

        <div className="flex flex-col items-center md:w-1/3">

          {data?.avatar ? (
            <img
              src={data.avatar}
              alt={data.username}
              className="h-32 w-32 rounded-full border-2 border-neutral-200 object-cover"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 text-5xl font-bold text-gray-600">
              {data?.username?.charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className="mt-5 text-2xl font-bold">
            {data?.username}
          </h2>

          <p className="text-neutral-500">
            {data?.email}
          </p>

          <span className="mt-2 rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700">
            {data?.role}
          </span>

          <button className="mt-6 rounded-lg border border-violet-600 px-6 py-2 text-violet-600 transition hover:bg-violet-600 hover:text-white">
            Edit Profile
          </button>
        </div>

        {/* User Information */}

        <div className="flex-1 space-y-6">

          <div className="border-b pb-4">
            <p className="text-sm text-neutral-500">
              Email
            </p>

            <p className="text-lg font-medium">
              {data?.email}
            </p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm text-neutral-500">
              Phone
            </p>

            <p className="text-lg font-medium">
              {data?.phone || 'No phone added'}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Role
            </p>

            <p className="text-lg font-medium">
              {data?.role}
            </p>
          </div>

        </div>

      </div>
    </div>
     <div className="mt-8 grid gap-6 md:grid-cols-2">
  <div className="rounded-2xl border p-6 shadow-md">
    <h3 className="mb-4 text-xl font-semibold">Address</h3>

    <p className="text-neutral-500">
      No address added yet.
    </p>

    <button className="mt-5 rounded-lg border px-5 py-2 text-sm font-medium">
      Add Address
    </button>
  </div>

  <div className="rounded-2xl border p-6 shadow-md">
    <h3 className="mb-4 text-xl font-semibold">Security</h3>

    <p className="text-neutral-500">
      Keep your account secure.
    </p>

    <button className="mt-5 rounded-lg border px-5 py-2 text-sm font-medium">
      Change Password
    </button>
  </div>
</div>

<div className="mt-8 rounded-2xl border p-6 shadow-md">
  <h3 className="mb-4 text-xl font-semibold">Account</h3>

  <button className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600">
    Logout
  </button>
</div>

  </div>
)
}
