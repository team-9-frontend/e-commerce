import { LuGlobe, LuHeart, LuMessageCircle } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Shop', to: '/products' },
  { label: 'My Orders', to: '/orders' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Profile', to: '/profile' },
]

const socialLinks = [
  { icon: <LuGlobe />, to: '#', label: 'Website' },
  { icon: <LuMessageCircle />, to: '#', label: 'Chat' },
  { icon: <LuHeart />, to: '#', label: 'Favorites' },
]

export default function Footer() {
  return (
    <footer className="flex border-t border-neutral-200 bg-white shadow dark:bg-neutral-100 dark:shadow-none">
      <div className="container flex flex-col gap-8 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-start gap-2">
            <Link to="/" className="font-fancy pt-1 text-xl font-bold text-neutral-950">
              LOOM <span className="text-yellow-500 italic">&amp;</span> LININ
            </Link>

            <p className="max-w-sm text-sm text-neutral-500">
              Shop the future, delivered today. Premium products at the best prices with fast
              delivery across Egypt.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4">
            <h2 className="font-medium capitalize">quick links</h2>

            <div className="flex flex-col gap-2">
              {quickLinks.map(({ to, label }) => (
                <Link
                  key={label}
                  to={to}
                  className="hover:text-accent-600 dark:hover:text-accent-400 text-sm text-neutral-500"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-medium capitalize">follow us</h2>

            <div className="flex gap-2">
              {socialLinks.map(({ icon, to, label }) => (
                <Link
                  key={label}
                  href={to}
                  className="hover:text-accent-600 hover:bg-accent-500/15 dark:hover:text-accent-400 flex-center size-10 rounded-full bg-neutral-100 text-lg text-neutral-500"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-8 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} Koda Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
