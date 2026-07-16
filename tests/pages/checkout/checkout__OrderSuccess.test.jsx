import { render, screen } from '@testing-library/react'
import OrderSuccess from 'apps/store/src/pages/checkout/OrderSuccess'
import { describe, expect, it } from 'vitest'

describe('OrderSuccess', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<OrderSuccess />)
    expect(screen.getByText('Order Success Page')).toBeInTheDocument()
  })
})
