import { render, screen } from '@testing-library/react'
import DynamicOrder from 'apps/store/src/pages/user/DynamicOrder'
import { describe, expect, it } from 'vitest'

describe('DynamicOrder', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<DynamicOrder />)
    expect(screen.getByText('Orders page')).toBeInTheDocument()
  })
})
