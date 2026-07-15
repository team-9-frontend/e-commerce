import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Payment from '@/pages/checkout/Payment'

describe('Payment', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Payment />)
    expect(screen.getByText('Payment Page')).toBeInTheDocument()
  })
})
