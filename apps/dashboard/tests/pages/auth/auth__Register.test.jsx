import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import Register from '@/pages/auth/Register'

describe('Register', () => {
  it('???? ???? ?????? ??????', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </QueryClientProvider>,
    )
    expect(screen.getByText('Create Account')).toBeInTheDocument()
  })
})
