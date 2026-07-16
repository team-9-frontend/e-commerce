import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Cart from '@/pages/user/Cart'

describe('Cart', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Cart />)
    expect(screen.getByText('Cart Page')).toBeInTheDocument()
  })
})
