import { Navigate } from 'react-router-dom'

import { useStoreAuth } from '../hooks/useStoreAuth'

export default function StoreProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useStoreAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/storelogin" replace />
  }

  return children
}