import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'

import { StrictMode } from 'react'

import { ThemeProvider } from 'next-themes'

import UserContextProvider from '@/context/UserContextProvider'
import '@/index.css'
import AppRoutes from '@/routes'

const queryClient = new QueryClient()

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
        <UserContextProvider>
          <AppRoutes />
        </UserContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
