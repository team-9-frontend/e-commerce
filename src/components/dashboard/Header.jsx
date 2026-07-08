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

import { useTheme } from 'next-themes'

import { useCurrentUser } from '@/api'
import Tooltip from '@/components/ui/Tooltip'
import { cn } from '@/utils/cn'

export default function Navbar({ className, open, setOpen, minimized, setMinimized }) {
  const { theme, setTheme } = useTheme()
  const { data: user } = useCurrentUser()

  return (
    <header
      className={cn(
        className,
        'flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2 text-neutral-950 dark:bg-neutral-100',
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
          <h1 className="font-bodoni hidden pt-1 text-xl font-bold sm:block">
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

        <div className="flex-center gap-2 rounded-xl border border-neutral-300 bg-neutral-100 px-2 py-1 dark:bg-neutral-200">
          <LuCircleUserRound size={26} />

          <div>
            <h3 className="font-semibold text-neutral-950">{user?.username || 'username'}</h3>
            <p className="text-muted text-xs">{user?.role || 'guest'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
