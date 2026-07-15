import { useTheme } from 'next-themes'
import {
  LuBell,
  LuCircleUserRound,
  LuIndentDecrease,
  LuIndentIncrease,
  LuMenu,
  LuMoon,
  LuSun,
  LuX,
} from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useCurrentUser } from '@/api'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import { cn } from '@/utils'

export default function Navbar({ className, open, setOpen, minimized, setMinimized }) {
  const { theme, setTheme } = useTheme()
  const { data: user, isLoading } = useCurrentUser()

  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2 shadow dark:bg-neutral-100 dark:shadow-none',
        className,
      )}
    >
      <div className="flex-center gap-2">
        <Button
          onClick={() => setOpen(!open)}
          variant="ghost"
          size="md-square"
          className="lg:hidden"
        >
          {open ? <LuX size={20} /> : <LuMenu size={20} />}
        </Button>

        <Button
          onClick={() => setMinimized(!minimized)}
          variant="ghost"
          size="md-square"
          className="hidden lg:block"
        >
          {minimized ? <LuIndentIncrease size={20} /> : <LuIndentDecrease size={20} />}
        </Button>

        <Link to="/" className="text-neutral-950">
          <h1 className="font-fancy hidden pt-1 text-xl font-bold sm:block">
            LOOM <span className="text-yellow-500 italic">&amp;</span> LININ
          </h1>
        </Link>
      </div>

      <div className="flex-center gap-2">
        <Button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          variant="ghost"
          size="md-square"
        >
          {theme === 'dark' ? <LuSun size={20} /> : <LuMoon size={20} />}
          <Tooltip position="bottom">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</Tooltip>
        </Button>

        <Button variant="ghost" size="md-square">
          <LuBell size={20} />
          <Tooltip position="bottom">Notifications</Tooltip>
        </Button>

        <div className="flex-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1 dark:border-neutral-300 dark:bg-neutral-200">
          {!isLoading && user?.avatar ? (
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
            <h3 className="font-medium">{user?.username || 'username'}</h3>
            <p className="text-xs text-neutral-500">{user?.role || 'guest'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}



