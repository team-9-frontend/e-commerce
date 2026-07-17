import { render, screen } from '@testing-library/react'
import Payment from 'apps/store/src/pages/checkout/Payment'
import { describe, expect, it } from 'vitest'

describe('Payment', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Payment />)
    expect(screen.getByText('Payment Page')).toBeInTheDocument()
  })
})
