import { useEffect } from 'react'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

import { useCurrentUser } from '@repo/api'
import { cn } from '@repo/utils'

export default function MainLayout() {
  const { data: user, isLoading, isError } = useCurrentUser()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (pathname === '/profile' || pathname === '/wishlist' || pathname === '/cart') {
  //     if (isLoading) return
  //     if (!user) return navigate('/login')
  //   }
  // }, [user, isLoading, navigate, pathname])



        useEffect(() => {
          const protectedRoutes = [
            '/profile',
            '/wishlist',
            '/cart',
            '/orders',
            '/checkout',
            '/payment',
          ]

          const isProtected = protectedRoutes.some((route) =>
            pathname.startsWith(route),
          )

          if (isLoading) return

          if (isProtected && !user) {
            navigate('/login')
          }
        }, [user, isLoading, navigate, pathname])





  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className={cn('flex flex-1 flex-col', pathname !== '/' && 'container')}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
