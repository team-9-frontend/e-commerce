import { LuBell, LuCircleUserRound, LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'

import { useTheme } from 'next-themes'

import ToolTip from '@/components/ToolTip'
import { cn } from '@/utils/cn'

export default function Navbar({ className, open, setOpen }) {
  const { theme, setTheme } = useTheme()
  return (
    <nav
      className={cn(
        'flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2 text-neutral-950 dark:bg-neutral-100',
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

        <h1 className="font-bodoni hidden pt-1 text-2xl font-bold sm:block">
          LOOM <span className="text-yellow-500 italic">&amp;</span> LININ
        </h1>
      </div>

      <div className="flex-center gap-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="group hover:text-accent-600 relative cursor-pointer"
        >
          {theme === 'dark' ? <LuSun size={20} /> : <LuMoon size={20} />}
          <ToolTip position="bottom">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</ToolTip>
        </button>

        <button className="group hover:text-accent-600 relative cursor-pointer">
          <LuBell size={20} />
          <ToolTip position="bottom">Notifications</ToolTip>
        </button>

        <div className="flex-center gap-2 rounded-xl border border-neutral-300 bg-neutral-100 px-2 py-1 dark:bg-neutral-200">
          <LuCircleUserRound size={26} />

          <div>
            <h3 className="font-semibold text-neutral-950">username</h3>
            <p className="text-muted text-xs">role</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
