import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { login } from '@/api/authApi'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data } = await login({
        email,
        password,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      alert('Login Successfully')

      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || 'Login Failed')
      // console.log(error);

      console.log(error.response.data)
      console.log(error.response.status)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="mb-2 block">Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border p-3 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block">Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border p-3 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
