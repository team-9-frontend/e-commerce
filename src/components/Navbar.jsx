import { FaBars, FaBell, FaMoon, FaSignOutAlt, FaSun, FaUserCircle } from 'react-icons/fa'

import { useTheme } from 'next-themes'

const Navbar = ({ open, setOpen }) => {
  const { theme, setTheme } = useTheme()
  console.log(theme)
  console.log(document.documentElement.className)
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 text-black transition-colors duration-300 md:px-8 lg:left-64 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
      <div className="flex items-center gap-4">
        <button onClick={() => setOpen(!open)} className="lg:hidden">
          <FaBars className="text-2xl dark:text-white" />
        </button>

        <h2 className="text-2xl font-bold dark:text-white">KodaDasboard</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <FaBell className="hidden cursor-pointer text-xl sm:block dark:text-white" />

        {/* Theme */}
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? (
            <FaSun className="text-2xl text-yellow-400" />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </button>

        {/* User */}
        <div className="hidden items-center gap-2 md:flex">
          <FaUserCircle className="text-4xl dark:text-white" />

          <div>
            <h3 className="font-semibold dark:text-white">Customer Account</h3>

            <p className="text-xs text-gray-500">customr</p>
          </div>
        </div>

        {/* Logout */}
        <button className="hidden items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 md:flex">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
