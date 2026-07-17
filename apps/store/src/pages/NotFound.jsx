import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex-center flex-1 flex-col font-medium">
      <h1 className="text-center text-9xl font-bold">404</h1>
      <p className="mb-4 text-center text-2xl text-neutral-500">Page not found</p>
      <Link to="/" className="text-xl">
        Go Home
      </Link>
    </div>
  )
}
