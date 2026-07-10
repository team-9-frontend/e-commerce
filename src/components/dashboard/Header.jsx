import { useTheme } from 'next-themes'
import {
  LuBell,
  LuCircleUserRound,
  LuMenu,
  LuMoon,
  LuSquareChevronLeft,
  LuSquareChevronRight,
  LuSun,
  LuX,
} from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useCurrentUser } from '@/api'
import Tooltip from '@/components/ui/Tooltip'
import { cn } from '@/utils'

export default function Navbar({ className, open, setOpen, minimized, setMinimized }) {
  const { theme, setTheme } = useTheme()
  const { data: user } = useCurrentUser()

  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2 shadow dark:bg-neutral-100 dark:shadow-none',
        className,
      )}
    >
      <div className="flex-center gap-4">
        <button
          onClick={() => setOpen(!open)}
          className="hover:text-accent-600 cursor-pointer lg:hidden"
        >
          {open ? <LuX size={20} /> : <LuMenu size={20} />}
        </button>

        <button
          onClick={() => setMinimized(!minimized)}
          className="hover:text-accent-600 hidden cursor-pointer lg:block"
        >
          {minimized ? <LuSquareChevronRight size={20} /> : <LuSquareChevronLeft size={20} />}
        </button>

        <Link to="/" className="text-neutral-950">
          <h1 className="font-fancy hidden pt-1 text-xl font-bold sm:block">
            LOOM <span className="text-yellow-500 italic">&amp;</span> LININ
          </h1>
        </Link>
      </div>

      <div className="flex-center gap-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="group hover:text-accent-600 relative cursor-pointer"
        >
          {theme === 'dark' ? <LuSun size={20} /> : <LuMoon size={20} />}
          <Tooltip position="bottom">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</Tooltip>
        </button>

        <button className="group hover:text-accent-600 relative cursor-pointer">
          <LuBell size={20} />
          <Tooltip position="bottom">Notifications</Tooltip>
        </button>

        <div className="flex-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-2 py-1 dark:border-neutral-300 dark:bg-neutral-200">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              width={28}
              height={28}
              className="rounded-full border border-neutral-300"
            />
          ) : (
            <LuCircleUserRound size={28} />
          )}

          <div>
            <h3 className="font-semibold">{user.username || 'username'}</h3>
            <p className="text-muted text-xs">{user.role || 'role'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
