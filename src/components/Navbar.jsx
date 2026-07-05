import {
  FaBars,
  FaRegBell,
  FaRegMoon,
  FaRegSun,
  FaRegUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa'

import { useTheme } from 'next-themes'

import ToolTip from './ToolTip'

export default function Navbar({ open, setOpen }) {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-2 text-neutral-950 dark:bg-neutral-100 border-b border-neutral-200">
      <div className="flex-center gap-4">
        <button onClick={() => setOpen(!open)} className="cursor-pointer lg:hidden">
          <FaBars size={20} />
        </button>

        <h2 className="text-3xl font-bold">Logo</h2>
      </div>

      <div className="flex-center gap-4">
        {/* Notification */}
        <button className="group relative cursor-pointer">
          <FaRegBell size={20} />
          <ToolTip position="bottom">Notifications</ToolTip>
        </button>

        {/* Theme */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="group relative cursor-pointer"
        >
          {theme === 'dark' ? <FaRegSun size={20} /> : <FaRegMoon size={20} />}
          <ToolTip position="bottom">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</ToolTip>
        </button>

        {/* Logout */}
        <button className="group relative cursor-pointer text-neutral-950 hover:text-red-400">
          <FaSignOutAlt size={20} />
          <ToolTip position="bottom">Logout</ToolTip>
        </button>

        {/* User */}
        <div className="flex-center gap-2 rounded-xl border border-neutral-300 bg-neutral-100 px-2 py-1 dark:bg-neutral-200">
          <FaRegUserCircle size={26} />

          <div>
            <h3 className="font-semibold text-neutral-950">username</h3>

            <p className="text-muted text-xs">role</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
