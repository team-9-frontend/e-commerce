import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex-center flex-1 flex-col">
      <h1 className="text-center text-9xl font-bold">404</h1>
      <p className="text-muted mb-4 text-center text-2xl">Page not found</p>
      <Link to="/" className="text-accent-600 text-xl hover:underline">
        Go Home
      </Link>
    </div>
  )
}
