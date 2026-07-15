import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Products from '@/pages/dashboard/Products'

describe('Products', () => {
  it('???? ???? ?????? ??????', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </QueryClientProvider>,
    )
    expect(screen.getByText('Products')).toBeInTheDocument()
  })
})

