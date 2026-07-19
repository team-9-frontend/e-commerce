
import { useCurrentUser } from '@repo/api'

export default function Profile() {
  const { data, isLoading, error } = useCurrentUser()

  if (isLoading) return <h2>Loading...</h2>

  if (error) return <h2>Error loading profile</h2>

  return (
    <div>
      <h1>Profile Page</h1>

      <p>Name: {data?.username}</p>
      <p>Email: {data?.email}</p>
      <p>Role: {data?.role}</p>
    </div>
  )
}