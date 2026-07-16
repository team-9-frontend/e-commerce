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
import { Link, useLocation } from 'react-router-dom'

import { useLogout } from '@repo/api'
import { Button, Tooltip } from '@repo/ui'
import { cn } from '@repo/utils'

export default function Sidebar({ className, open, minimized }) {
  const { mutate: logout, isPending } = useLogout()
  const { pathname } = useLocation()

  const sidebarData = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <LuHouse size={20} />,
    },
    {
      title: 'Users',
      path: '/users',
      icon: <LuUsers size={20} />,
    },
    {
      title: 'Products',
      path: '/products',
      icon: <LuPackage size={20} />,
    },
    {
      title: 'Add Product',
      path: '/products/create',
      icon: <LuPlus size={20} />,
    },
    {
      title: 'Orders',
      path: '/orders',
      icon: <LuFileText size={20} />,
    },
    {
      title: 'Carts',
      path: '/carts',
      icon: <LuShoppingCart size={20} />,
    },
    {
      title: 'Settings',
      path: '/settings',
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
        <Link key={item.path} to={item.path}>
          <Button
            variant={pathname === item.path ? 'primary' : 'ghost'}
            size={minimized ? 'lg-square' : 'lg'}
            className="w-full"
          >
            {item.icon}
            <span className={cn('min-w-36 leading-none', minimized ? 'lg:hidden' : '')}>
              {item.title}
            </span>
            <Tooltip position="right" className={cn('hidden', minimized ? 'lg:block' : '')}>
              {item.title}
            </Tooltip>
          </Button>
        </Link>
      ))}
      <div className="flex-1"></div>
      <Button
        onClick={() => logout()}
        disabled={isPending}
        variant="ghostDanger"
        size={minimized ? 'lg-square' : 'lg'}
      >
        <LuLogOut size={20} />
        <span className={cn('leading-none', minimized ? 'lg:hidden' : '')}>Logout</span>
        <Tooltip position="right" className={cn('hidden', minimized ? 'lg:block' : '')}>
          Logout
        </Tooltip>
      </Button>
    </aside>
  )
}
