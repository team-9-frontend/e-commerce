import { Link, useLocation } from 'react-router-dom'

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <div className="flex-center flex-1 flex-col font-medium">
      <h1 className="text-center text-9xl font-bold">404</h1>
      <p className="text-muted mb-4 text-center text-2xl">Page not found</p>
      <Link to={pathname.includes('/dashboard') ? '/dashboard' : '/'} className="text-xl">
        Go Home
      </Link>
    </div>
  )
}
