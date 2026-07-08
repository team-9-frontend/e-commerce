import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'

import { StrictMode } from 'react'

import { ThemeProvider } from 'next-themes'

import '@/index.css'
import AppRoutes from '@/routes'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error(`Global Query Error: ${error.message}`),
  }),
  mutationCache: new MutationCache({
    onError: (error) => console.error(`Global Mutation Error: ${error.message}`),
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
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)

// enable tanstack query devtools
window.__TANSTACK_QUERY_CLIENT__ = queryClient
