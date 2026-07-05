import {
  LuFileText,
  LuHouse,
  LuPackage,
  LuPlus,
  LuSettings,
  LuShoppingCart,
  LuUsers,
} from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/utils/cn'

export default function Sidebar({ className, open }) {
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

  const { pathname } = useLocation()

  return (
    <aside
      className={cn(
        'grid min-w-56 grid-rows-subgrid border-r border-neutral-200 bg-white text-neutral-950 transition-all dark:bg-neutral-100',
        className,
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      <nav className="flex flex-col gap-2 p-4">
        {sidebarData.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2',
              pathname === item.path
                ? 'bg-accent-500 text-neutral-50'
                : 'text-neutral-950 hover:bg-neutral-100',
            )}
          >
            <span className="flex-center gap-2">
              {item.icon}
              {item.title}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
