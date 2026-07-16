import { render, screen } from '@testing-library/react'
import Checkout from 'apps/store/src/pages/checkout/Checkout'
import { describe, expect, it } from 'vitest'

describe('Checkout', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Checkout />)
    expect(screen.getByText('Checkout Page')).toBeInTheDocument()
  })
})
