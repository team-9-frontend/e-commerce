import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import ForgotPassword from '@/pages/auth/ForgotPassword'

describe('ForgotPassword', () => {
  it('???? ???? ?????? ??????', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </QueryClientProvider>,
    )
    expect(screen.getByText('Forgot Password')).toBeInTheDocument()
  })
})


