import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ThemeProvider } from '@repo/utils'

/**
 * بيرندر أي كومبوننت وهو ملفوف بكل الـ providers الحقيقية اللي main.jsx بيستخدمها:
 * QueryClientProvider (عشان hooks زي useCurrentUser/useLogin) + ThemeProvider + Router.
 *
 * كل تست بياخد QueryClient جديد تمامًا عشان الـ cache متتسربش بين التستات.
 */
export function renderWithProviders(ui, { route = '/', ...renderOptions } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
          {ui}
        </ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>,
    renderOptions,
  )
}

// oxlint-disable-next-line react/only-export-components -- ده ملف utilities مش component، الـ re-export مقصود
export * from '@testing-library/react'
