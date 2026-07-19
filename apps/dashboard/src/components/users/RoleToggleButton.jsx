import { LuShield, LuShieldCheck } from 'react-icons/lu'

import { useUpdateUserRole } from '@repo/api'
import { Button, Tooltip } from '@repo/ui'

export default function RoleToggleButton({ user }) {
  const { mutate: updateUserRole, isPending: updatingUserRole } = useUpdateUserRole()

  return (
    <Button
      variant="outline"
      size="md-square"
      disabled={updatingUserRole}
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
  )
}
