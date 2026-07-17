import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

export * from '@tanstack/react-query'

export * from './hooks/useAuth'
export * from './hooks/useCart'
export * from './hooks/useOrders'
export * from './hooks/useProducts'
export * from './hooks/useReviews'
export * from './hooks/useUsers'
export * from './hooks/useWishlist'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error.response?.status === 401) return false
        return failureCount < 3
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.response?.status === 401) return
      console.error(`Global Query Error: ${error.message}`)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error.response?.status === 401) return
      console.error(`Global Mutation Error: ${error.message}`)
    },
  }),
})
