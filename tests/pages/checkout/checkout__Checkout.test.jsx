import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Checkout from '@/pages/checkout/Checkout'

describe('Checkout', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Checkout />)
    expect(screen.getByText('Checkout Page')).toBeInTheDocument()
  })
})
