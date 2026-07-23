import { LuArrowLeft, LuLogOut } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import AddressForm from '@/components/profile/AddressForm'
import ProfileInfo from '@/components/profile/ProfileInfo'
import SecurityForm from '@/components/profile/SecurityForm'

import { useCurrentUser, useLogout } from '@repo/api'
import { Button, Error, LoadingSpinner } from '@repo/ui'

export default function Profile() {
  const { data: user, isLoading, isError, error } = useCurrentUser()
  const { mutate: logout, isPending: logingout } = useLogout()

  return isLoading ? (
    <div className="flex-center flex-1 py-8">
      <LoadingSpinner className="size-24" />
    </div>
  ) : (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <div className="card relative flex items-center justify-between gap-4 p-4">
        <div className="from-accent-500/10 pointer-events-none absolute inset-0 bg-linear-to-l via-transparent to-transparent" />

        <div className="flex gap-4">
          <div className="bg-accent-600 dark:bg-accent-400 w-2 rounded-full" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold sm:text-3xl">My Profile</h2>
            <p className="text-sm text-neutral-500">Manage your personal information</p>
          </div>
        </div>

        <Link to="/">
          <Button variant="ghost">
            <LuArrowLeft /> Go Back
          </Button>
        </Link>
      </div>

      {isError ? (
        <Error message={error?.message} />
      ) : (
        <>
          <ProfileInfo user={user} />

          <AddressForm />

          <SecurityForm />

          <div className="card flex flex-col items-start gap-4 p-4">
            <h2 className="text-xl font-bold">Account</h2>

            <Button onClick={() => logout()} disabled={logingout} variant="outlineDanger">
              <LuLogOut />
              Logout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
