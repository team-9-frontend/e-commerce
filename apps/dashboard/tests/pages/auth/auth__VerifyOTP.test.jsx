import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import VerifyOTP from '@/pages/auth/VerifyOTP'

describe('VerifyOTP', () => {
  it('???? ???? ?????? ??????', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <VerifyOTP />
        </MemoryRouter>
      </QueryClientProvider>,
    )
    expect(screen.getByText('Verify OTP')).toBeInTheDocument()
  })
})
