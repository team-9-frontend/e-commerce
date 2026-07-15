import { StrictMode } from 'react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import '@/index.css'
import AppRoutes from '@/routes'

const queryClient = new QueryClient({
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme={undefined}
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)

// enable tanstack query devtools
window.__TANSTACK_QUERY_CLIENT__ = queryClient
