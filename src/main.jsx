import { createRoot } from 'react-dom/client'

import { StrictMode } from 'react'

import { ThemeProvider } from 'next-themes'

import UserContextProvider from '@/context/UserContextProvider'
import '@/index.css'
import AppRoutes from '@/routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme={undefined}
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </ThemeProvider>
  </StrictMode>,
)
