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
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--color-neutral-950)',
              color: 'var(--color-neutral-50)',
              border: 'var(--color-neutral-800)',
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)

// enable tanstack query devtools
window.__TANSTACK_QUERY_CLIENT__ = queryClient
