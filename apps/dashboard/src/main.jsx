import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import AppRoutes from '@/routes'

import { queryClient, QueryClientProvider } from '@repo/api'
import { ThemeProvider } from '@repo/utils'
import { Toaster } from '@repo/utils/toasts'

import '@/index.css'

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
