import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import DynamicOrder from './DynamicOrder'

describe('DynamicOrder', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<DynamicOrder />)
    expect(screen.getByText('Orders page')).toBeInTheDocument()
  })
})
