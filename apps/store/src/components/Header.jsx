import { LuHeart, LuMoon, LuSearch, LuShoppingCart, LuSun, LuUser } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useCurrentUser } from '@repo/api'
import { Button, Tooltip } from '@repo/ui'
import { useTheme } from '@repo/utils'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const { data: user, isLoading } = useCurrentUser()

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2 shadow dark:bg-neutral-100 dark:shadow-none">
      <Link to="/" className="font-fancy pt-1 text-xl font-bold text-neutral-950 max-sm:hidden">
        LOOM <span className="text-yellow-500 italic">&amp;</span> LININ
      </Link>

      <div className="flex-center gap-2">
        <Link to="/" className="text-inherit">
          <Button variant="ghost" size="sm" className="text-md">
            Home
          </Button>
        </Link>

        <Link to="/products" className="text-inherit max-sm:hidden">
          <Button variant="ghost" size="sm" className="text-md">
            Shop
          </Button>
        </Link>

        <Link to="/wishlist" className="text-inherit max-sm:hidden">
          <Button variant="ghost" size="sm" className="text-md">
            Wishlist
          </Button>
        </Link>
      </div>

      <div className="flex-center gap-2">
        <Link to="/products" className="text-inherit">
          <Button variant="ghost" size="md-square">
            <LuSearch />
            <Tooltip position="bottom">Search</Tooltip>
          </Button>
        </Link>

        <Link to="/wishlist" className="text-inherit">
          <Button variant="ghost" size="md-square">
            <LuHeart />
            <Tooltip position="bottom">Wishlist</Tooltip>
          </Button>
        </Link>

        <Link to="/cart" className="text-inherit">
          <Button variant="ghost" size="md-square">
            <LuShoppingCart />
            <Tooltip position="bottom">Cart</Tooltip>
          </Button>
        </Link>

        <Button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          variant="ghost"
          size="md-square"
        >
          {theme === 'dark' ? <LuSun /> : <LuMoon />}
          <Tooltip position="bottom">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</Tooltip>
        </Button>

        {!user && !isLoading ? (
          <Link to="/login" className="text-inherit">
            <Button variant="ghost" size="sm" className="text-md flex gap-2">
              <LuUser />

              <h3 className="font-medium">login</h3>
            </Button>
          </Link>
        ) : (
          <Link to="/profile" className="text-inherit">
            <Button variant="ghost" size="sm" className="text-md flex gap-2">
              <LuUser />

              <h3 className="font-medium">{!isLoading ? user?.username : 'profile'}</h3>
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
