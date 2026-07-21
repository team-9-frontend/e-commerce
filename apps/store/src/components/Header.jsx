import { useRef, useState } from 'react'

import { LuHeart, LuMoon, LuSearch, LuShoppingCart, LuSun, LuUser, LuX } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useCurrentUser, useGetCart } from '@repo/api'
import { Button, FormField, Tooltip } from '@repo/ui'
import { cn, useTheme } from '@repo/utils'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [search, setSearch] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  const { data: user } = useCurrentUser()
  const { data: cart } = useGetCart()

  const { pathname } = useLocation()

  return (
    <header className="border-b border-neutral-200 bg-white shadow dark:bg-neutral-100 dark:shadow-none">
      <div className="container flex items-center justify-between gap-8 py-4">
        <Link to="/" className="font-fancy pt-1 text-xl font-bold text-neutral-950 max-lg:hidden">
          LOOM <span className="text-yellow-500 italic">&amp;</span> LININ
        </Link>

        <div className="flex-center gap-2">
          <Link to="/" className="text-inherit">
            <Button
              variant="ghost"
              size="sm"
              className={cn('text-md', pathname === '/' && 'bg-neutral-200')}
            >
              Home
            </Button>
          </Link>

          <Link to="/products" className="text-inherit max-sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              className={cn('text-md', pathname === '/products' && 'bg-neutral-200')}
            >
              Shop
            </Button>
          </Link>

          <Link to="/orders" className="text-inherit max-sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              className={cn('text-md', pathname === '/orders' && 'bg-neutral-200')}
            >
              Orders
            </Button>
          </Link>
        </div>

        <div className="flex-center gap-2">
          <div
            className={cn(
              'grid grid-cols-[0fr_auto] items-center justify-end gap-0 transition-all max-sm:hidden',
              search && 'grid-cols-[1fr_auto] gap-2',
            )}
          >
            <div className="overflow-hidden">
              <FormField
                ref={searchRef}
                placeholder="search..."
                className={cn(
                  'w-full py-1 text-sm opacity-0 transition-all',
                  search && 'opacity-100',
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()

                    navigate(`/products?search=${e.target.value}`)
                  }
                }}
              />
            </div>

            <Button
              variant="ghost"
              size="md-square"
              onClick={() => {
                setSearch(!search)
                searchRef.current.focus()
              }}
            >
              {search ? (
                <LuX />
              ) : (
                <>
                  <LuSearch />
                  <Tooltip position="bottom">Search</Tooltip>
                </>
              )}
            </Button>
          </div>

          <Link to="/wishlist" className="text-inherit">
            <Button
              variant="ghost"
              size="md-square"
              className={cn(pathname === '/wishlist' && 'bg-neutral-200')}
            >
              <LuHeart />
              <Tooltip position="bottom">Wishlist</Tooltip>
            </Button>
          </Link>

          <Link to="/cart" className="group relative text-inherit">
            <Button
              variant="ghost"
              size="md-square"
              className={cn(pathname === '/cart' && 'bg-neutral-200')}
            >
              <LuShoppingCart />
              <Tooltip position="bottom">Cart</Tooltip>
              {!!cart?.itemCount && !!user && (
                <span className="bg-accent-600 dark:bg-accent-400 flex-center absolute -top-1.5 -right-2 aspect-square size-6 rounded-full text-xs text-neutral-50 transition-all group-hover:-top-2 dark:text-neutral-950">
                  {cart?.itemCount}
                </span>
              )}
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

          <Link to={user ? '/profile' : '/login'} className="text-inherit">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'text-md flex gap-2',
                pathname === (user ? '/profile' : '/login') && 'bg-neutral-200',
              )}
            >
              <LuUser />
              <span className="font-medium">{user?.username || 'login'}</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
