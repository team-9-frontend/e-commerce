import {
  LuBell,
  LuIndentDecrease,
  LuIndentIncrease,
  LuMenu,
  LuMoon,
  LuSun,
  LuX,
} from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useCurrentUser } from '@repo/api'
import { Button, Tooltip } from '@repo/ui'
import { cn, useTheme } from '@repo/utils'

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
          {open ? <LuX /> : <LuMenu />}
        </Button>

        <Button
          onClick={() => setMinimized(!minimized)}
          variant="ghost"
          size="md-square"
          className="hidden lg:block"
        >
          {minimized ? <LuIndentIncrease /> : <LuIndentDecrease />}
        </Button>

        <Link to="/" className="font-fancy pt-1 text-xl font-bold text-neutral-950 max-sm:hidden">
          LOOM <span className="text-yellow-500 italic">&amp;</span> LININ
        </Link>
      </div>

      <div className="flex-center gap-2">
        <Button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          variant="ghost"
          size="md-square"
        >
          {theme === 'dark' ? <LuSun /> : <LuMoon />}
          <Tooltip position="bottom">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</Tooltip>
        </Button>

        <Button variant="ghost" size="md-square">
          <LuBell />
          <Tooltip position="bottom">Notifications</Tooltip>
        </Button>

        <div className="flex min-w-32 items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1 dark:border-neutral-300 dark:bg-neutral-200">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={String(user?.username).slice(0, 1)}
              className="flex-center size-8 rounded-full bg-neutral-200 object-cover text-xs dark:bg-neutral-100"
            />
          ) : (
            <div className="flex-center size-8 rounded-full bg-neutral-200 text-xs dark:bg-neutral-100">
              {String(user?.username).slice(0, 1)}
            </div>
          )}

          <div>
            <h3 className="font-medium">{!isLoading ? user?.username : 'username'}</h3>
            <p className="text-xs text-neutral-500">{!isLoading ? user?.role : 'role'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
