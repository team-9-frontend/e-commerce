import { useMemo, useState } from 'react'

import { LuPen, LuPlus, LuSearch, LuShield, LuShieldCheck, LuTrash } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import AddUserForm from '@/components/users/AddUserForm'
import EditUserDialog from '@/components/users/EditUserDialog'

import { useDeleteUser, useGetAllUsers, useUpdateUserRole } from '@repo/api'
import { Badge, Button, ConfirmDialog, FormField, Pagination, Table, Tooltip } from '@repo/ui'
import { cn, filterData } from '@repo/utils'
import { useSearchParamsForm } from '@repo/utils/forms'

const EMPTY_USERS = []

export default function AdminUsers() {
  const { mutate: deleteUser, isPending: deleteUserIsPending } = useDeleteUser()
  const { mutate: updateUserRole, isPending: updateUserRoleIsPending } = useUpdateUserRole()

  const [addUserToggle, setAddUserToggle] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [deleteUserId, setDeleteUserId] = useState(null)

  const [searchParams] = useSearchParams()
  const { register, handleSubmit, updateParams, urlValues } = useSearchParamsForm({
    mode: 'onTouched',
  })

  const { search } = urlValues

  const { data, isLoading, isError, error } = useGetAllUsers({ limit: 100 })
  const users = data?.users || EMPTY_USERS

  const filteredUsers = useMemo(() => {
    return filterData(users, [
      { [search]: { fields: ['_id', 'phone', (u) => u.username, (u) => u.email] } },
    ])
  }, [users, search])

  const currentPage = searchParams.get('page') || 1
  const limit = 14
  const page = filteredUsers.slice((currentPage - 1) * limit, currentPage * limit)
  const totalPages = Math.ceil(filteredUsers.length / limit)

  const mappedusers = useMemo(() => {
    return page.map((user) => ({
      user: (
        <div className="flex items-center gap-4">
          {user.avatar ? (
            <div className="flex-center size-8 overflow-hidden rounded-full bg-neutral-50 text-xs">
              <img
                src={user?.avatar}
                alt={String(user?.username).slice(0, 1)}
                className="size-full object-cover"
              />
            </div>
          ) : (
            <div className="flex-center size-8 rounded-full bg-neutral-50 text-xs">
              {String(user?.username).slice(0, 1)}
            </div>
          )}

          <div className="flex flex-col">
            <h3 className="font-medium">{user.username || '-'}</h3>
            <p className="text-sm text-neutral-600">{user.email || '-'}</p>
          </div>
        </div>
      ),
      role: (
        <Badge color={user.role === 'admin' ? 'amber' : 'sky'} className="flex-center w-fit gap-2">
          <span className="text-xl leading-0">•</span> {user.role}
        </Badge>
      ),
      verified: (
        <Badge color={user.isVerified ? 'emerald' : 'rose'} className="flex-center w-fit gap-2">
          <span className="text-xl leading-0">•</span>
          {user.isVerified ? 'verified' : 'not verified'}
        </Badge>
      ),
      actions: (
        <div className="flex-center w-fit gap-2">
          <Button
            variant="outline"
            size="md-square"
            onClick={() => {
              setEditUser(user)
            }}
            className="hover:border-sky-500/50 hover:bg-sky-500/15 hover:text-sky-600 dark:hover:bg-sky-500/15 dark:hover:text-sky-400"
          >
            <LuPen />
            <Tooltip position="top">edit user</Tooltip>
          </Button>
          <Button
            variant="outline"
            size="md-square"
            disabled={updateUserRoleIsPending}
            onClick={() => {
              updateUserRole({
                userId: user._id,
                role: user.role === 'admin' ? 'customer' : 'admin',
              })
            }}
            className="hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:text-emerald-600 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-400"
          >
            {user.role === 'admin' ? <LuShieldCheck /> : <LuShield />}
            <Tooltip position="top">toggle admin role</Tooltip>
          </Button>
          <Button
            variant="outlineDanger"
            size="md-square"
            onClick={() => {
              setDeleteUserId(user._id)
            }}
          >
            <LuTrash />
            <Tooltip position="top">delete user</Tooltip>
          </Button>
        </div>
      ),
    }))
  }, [page, updateUserRole, updateUserRoleIsPending])

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="card flex items-center justify-between p-4">
        <div className="space-y-2">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            users
          </p>
          <h2 className="text-3xl">users</h2>
          <p className="text-sm text-neutral-500">
            Manage your product inventory, view details, and update listings.
          </p>
        </div>
        <div className="card p-4 shadow-xs">
          {data?.count || 0} <span className="text-sm text-neutral-600">total users</span>
        </div>
      </div>

      <div className="card p-4">
        <form onSubmit={handleSubmit(updateParams)} className="flex items-center gap-4">
          <FormField
            id="search"
            icon={<LuSearch />}
            placeholder="Search ID, customer..."
            register={register}
            className="w-full"
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => setAddUserToggle(!addUserToggle)}
            className={cn(
              addUserToggle &&
                'dark:bg-accent-500/15 bg-accent-500/15 border-accent-500/50 text-accent-600 dark:text-accent-400',
            )}
          >
            <LuPlus /> <span className="text-nowrap">add user</span>
          </Button>
        </form>

        <div
          className={cn(
            'grid transition-all',
            addUserToggle ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <AddUserForm />
        </div>
      </div>

      {isError ? (
        <div className="card p-4 text-neutral-500">{error?.message}</div>
      ) : (
        <Table
          columns={['user', 'role', 'verified', 'actions']}
          data={mappedusers}
          isLoading={isLoading}
        />
      )}

      <Pagination totalPages={totalPages} className="mt-auto" />

      <ConfirmDialog
        isOpen={deleteUserId}
        setIsOpen={setDeleteUserId}
        onConfirm={() =>
          deleteUser(deleteUserId, {
            onSuccess: () => {
              setDeleteUserId(null)
            },
          })
        }
        isLoading={deleteUserIsPending}
        title="Confirm Deletion"
      />

      <EditUserDialog user={editUser} setUser={setEditUser} />
    </div>
  )
}
