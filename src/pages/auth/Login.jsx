import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { login } from '@/api/authApi'
import { cn } from '@/utils/cn'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await login({ email, password })
      if (!data.success) return alert(data.message)
      if (data.user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex-center flex-1">
        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-950 dark:bg-neutral-100">
          <h1 className="mb-2 text-center text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted mb-8 text-center">Please log in to continue.</p>

          <form onSubmit={handleLogin} className="grid grid-cols-[auto_1fr] gap-4">
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <label>Email:</label>

              <input
                type="email"
                placeholder="Enter your email"
                className="focus:border-accent-500 w-full rounded-lg border border-neutral-200 px-4 py-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <label>Password:</label>

              <input
                type="password"
                placeholder="Enter your password"
                className="focus:border-accent-500 w-full rounded-lg border border-neutral-200 px-4 py-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'bg-accent-500 hover:bg-accent-600 dark:hover:bg-accent-400 col-span-2 cursor-pointer rounded-lg px-4 py-2 text-neutral-50 disabled:opacity-50 dark:text-neutral-950',
                loading && 'cursor-default opacity-50',
              )}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
