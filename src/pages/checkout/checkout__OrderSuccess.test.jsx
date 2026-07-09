import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import OrderSuccess from './OrderSuccess'

describe('OrderSuccess', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<OrderSuccess />)
    expect(screen.getByText('Order Success Page')).toBeInTheDocument()
  })
})
