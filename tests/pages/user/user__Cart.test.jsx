import { render, screen } from '@testing-library/react'
import Cart from 'apps/store/src/pages/user/Cart'
import { describe, expect, it } from 'vitest'

describe('Cart', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Cart />)
    expect(screen.getByText('Cart Page')).toBeInTheDocument()
  })
})
