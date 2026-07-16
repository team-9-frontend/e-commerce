import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Orders from '@/pages/dashboard/Orders'

describe('Orders', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Orders />)
    expect(screen.getByText('Orders Page')).toBeInTheDocument()
  })
})
