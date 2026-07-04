import { useTheme } from "next-themes";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = ({ open, setOpen }) => {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  console.log(document.documentElement.className);
  return (
    <nav
      className="
    fixed
    top-0
    right-0
    left-0
    lg:left-64
    h-16

    bg-white
    dark:bg-zinc-900

    text-black
    dark:text-white

    border-b
    border-gray-200
    dark:border-zinc-800

    flex
    items-center
    justify-between

    px-4
    md:px-8

    transition-colors
    duration-300

    z-50
  "
    >
      <div className="flex items-center gap-4">
        <button onClick={() => setOpen(!open)} className="lg:hidden">
          <FaBars className="text-2xl dark:text-white" />
        </button>

        <h2 className="text-2xl font-bold dark:text-white">KodaDasboard</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <FaBell className="hidden sm:block text-xl cursor-pointer dark:text-white" />

        {/* Theme */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <FaSun className="text-2xl text-yellow-400" />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </button>

        {/* User */}
        <div className="hidden md:flex items-center gap-2">
          <FaUserCircle className="text-4xl dark:text-white" />

          <div>
            <h3 className="font-semibold dark:text-white">Customer Account</h3>

            <p className="text-xs text-gray-500">customr</p>
          </div>
        </div>

        {/* Logout */}
        <button
          className="
          hidden
          md:flex

          items-center
          gap-2

          px-4
          py-2

          rounded-lg

          bg-red-500
          hover:bg-red-600

          text-white
        "
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
