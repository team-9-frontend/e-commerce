import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import Products from 'apps/dashboard/src/pages/dashboard/Products'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

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
