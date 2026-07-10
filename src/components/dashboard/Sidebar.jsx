import {
  LuFileText,
  LuHouse,
  LuLogOut,
  LuPackage,
  LuPlus,
  LuSettings,
  LuShoppingCart,
  LuUsers,
} from 'react-icons/lu'
import { NavLink } from 'react-router-dom'

import { useLogout } from '@/api'
import Tooltip from '@/components/ui/Tooltip'
import { cn } from '@/utils'

export default function Sidebar({ className, open, minimized }) {
  const { mutate: logout, isPending } = useLogout()

  const sidebarData = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <LuHouse size={20} />,
    },
    {
      title: 'Users',
      path: '/dashboard/users',
      icon: <LuUsers size={20} />,
    },
    {
      title: 'Products',
      path: '/dashboard/products',
      icon: <LuPackage size={20} />,
    },
    {
      title: 'Add Product',
      path: '/dashboard/products/create',
      icon: <LuPlus size={20} />,
    },
    {
      title: 'Orders',
      path: '/dashboard/orders',
      icon: <LuFileText size={20} />,
    },
    {
      title: 'Carts',
      path: '/dashboard/carts',
      icon: <LuShoppingCart size={20} />,
    },
    {
      title: 'Settings',
      path: '/dashboard/settings',
      icon: <LuSettings size={20} />,
    },
  ]

  return (
    <aside
      className={cn(
        'flex flex-col gap-2 border-r border-neutral-200 bg-white p-4 shadow transition-all dark:bg-neutral-100 dark:shadow-none',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        className,
      )}
    >
      {sidebarData.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            cn(
              'group relative flex items-center gap-2 rounded-xl px-4 py-3 transition-all',
              isActive
                ? 'dark:bg-accent-500 bg-neutral-800 font-medium text-neutral-50 dark:text-neutral-950'
                : 'text-neutral-950 hover:bg-neutral-200',
              minimized ? 'p-2' : 'min-w-48',
            )
          }
        >
          {item.icon}
          <span className={cn('leading-none', minimized ? 'lg:hidden' : '')}>{item.title}</span>
          <Tooltip position="right" className={cn('hidden', minimized ? 'lg:block' : '')}>
            {item.title}
          </Tooltip>
        </NavLink>
      ))}
      <div className="flex-1"></div>
      <button
        onClick={() => logout()}
        disabled={isPending}
        className={cn(
          'group relative flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 hover:bg-red-500/25 hover:text-red-600 disabled:pointer-events-none disabled:opacity-50 dark:hover:text-red-400',
          minimized ? 'p-2' : '',
        )}
      >
        <LuLogOut size={20} />
        <span className={cn('leading-none', minimized ? 'lg:hidden' : '')}>Logout</span>
        <Tooltip position="right" className={cn('hidden', minimized ? 'lg:block' : '')}>
          Logout
        </Tooltip>
      </button>
    </aside>
  )
}
