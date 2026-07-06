import { createRoot } from 'react-dom/client'

import { StrictMode } from 'react'

import { ThemeProvider } from 'next-themes'

import '@/index.css'
import { AuthProvider } from '@/context/AuthContext'
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
       <AuthProvider>
      <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
