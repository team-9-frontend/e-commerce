import { useEffect, useRef, useState } from 'react'

import { LuHeart, LuMoon, LuSearch, LuShoppingCart, LuSun, LuUser, LuX } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useCurrentUser, useGetCart } from '@repo/api'
import { Button, FormField, Tooltip } from '@repo/ui'
import { cn, useTheme } from '@repo/utils'

export default function Header() {
const { theme, setTheme } = useTheme()
const [search, setSearch] = useState(false)
const [mobileSearch, setMobileSearch] = useState(false)

const searchRef = useRef(null)
const mobileSearchRef = useRef(null)

const navigate = useNavigate()
// const { data: user } = useCurrentUser()
// const { data: cart } = useGetCart()

const { data: user } = useCurrentUser()

const {
  data: cart,
  isError: cartError,
} = useGetCart()

const { pathname } = useLocation()

useEffect(() => {
if (search) {
searchRef.current?.focus()
}
}, [search])

useEffect(() => {
if (mobileSearch) {
mobileSearchRef.current?.focus()
}
}, [mobileSearch])

const handleSearch = (event) => {
if (event.key === 'Enter') {
event.preventDefault()


  const value = event.target.value.trim()

  if (value) {
    navigate(`/products?search=${encodeURIComponent(value)}`)
    setSearch(false)
    setMobileSearch(false)
  }
}


}

return ( <header className="border-b border-neutral-200 bg-white shadow dark:bg-neutral-100 dark:shadow-none"> <div className="container flex min-h-16 items-center justify-between gap-2 py-3 sm:gap-4">
{/* Logo */} <Link
       to="/"
       className="font-fancy shrink-0 pt-1 text-lg font-bold text-neutral-950 sm:text-xl"
     > <span className="hidden sm:inline">
LOOM <span className="text-yellow-500 italic">&</span> LININ </span>


      <span className="sm:hidden">
        L<span className="text-yellow-500 italic">&amp;</span>L
      </span>
    </Link>

    {/* Navigation */}
    <nav className="flex items-center gap-1 sm:gap-2">
      <Link to="/" className="text-inherit">
        <Button
          variant="ghost"
          size="sm"
          className={cn('text-sm sm:text-md', pathname === '/' && 'bg-neutral-200')}
        >
          Home
        </Button>
      </Link>

      <Link to="/products" className="text-inherit">
        <Button
          variant="ghost"
          size="sm"
          className={cn('text-sm sm:text-md', pathname === '/products' && 'bg-neutral-200')}
        >
          <span className="hidden sm:inline">Shop</span>
          <LuShoppingCart className="sm:hidden" />
        </Button>
      </Link>

      <Link to="/orders" className="hidden text-inherit sm:block">
        <Button
          variant="ghost"
          size="sm"
          className={cn('text-md', pathname === '/orders' && 'bg-neutral-200')}
        >
          Orders
        </Button>
      </Link>
    </nav>

    {/* Desktop Search */}
    <div className="hidden flex-1 justify-end sm:flex">
      <div
        className={cn(
          'grid max-w-xs grid-cols-[0fr_auto] items-center gap-0 transition-all',
          search && 'grid-cols-[1fr_auto] gap-2',
        )}
      >
        <div className="overflow-hidden">
          <FormField
            ref={searchRef}
            placeholder="Search products..."
            className={cn(
              'w-full py-1 text-sm opacity-0 transition-all',
              search && 'opacity-100',
            )}
            onKeyDown={handleSearch}
          />
        </div>

        <Button
          variant="ghost"
          size="md-square"
          onClick={() => setSearch((previous) => !previous)}
        >
          {search ? <LuX /> : <LuSearch />}
          <Tooltip position="bottom">
            {search ? 'Close Search' : 'Search Products'}
          </Tooltip>
        </Button>
      </div>
    </div>

    {/* Actions */}
    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
      {/* Mobile Search */}
      <Button
        variant="ghost"
        size="md-square"
        className="sm:hidden"
        onClick={() => setMobileSearch((previous) => !previous)}
      >
        {mobileSearch ? <LuX /> : <LuSearch />}
        <Tooltip position="bottom">
          {mobileSearch ? 'Close Search' : 'Search'}
        </Tooltip>
      </Button>

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

          {!!cart?.itemCount && !!user && !cartError && (
            <span className="bg-accent-600 dark:bg-accent-400 flex-center absolute -top-1.5 -right-2 size-5 rounded-full text-[10px] text-neutral-50 transition-all group-hover:-top-2 dark:text-neutral-950 sm:size-6 sm:text-xs">
              {cart.itemCount}
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
        <Tooltip position="bottom">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Tooltip>
      </Button>

      <Link to={user ? '/profile' : '/login'} className="text-inherit">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex gap-2 text-md',
            pathname === (user ? '/profile' : '/login') && 'bg-neutral-200',
          )}
        >
          <LuUser />

          <span className="hidden max-w-24 truncate font-medium md:inline">
            {user?.username || 'Login'}
          </span>
        </Button>
      </Link>
    </div>
  </div>

  {/* Mobile Search Input */}
  {mobileSearch && (
    <div className="border-t border-neutral-200 px-4 py-3 sm:hidden">
      <FormField
        ref={mobileSearchRef}
        placeholder="Search products..."
        className="w-full"
        onKeyDown={handleSearch}
      />
    </div>
  )}
</header>


)
}
