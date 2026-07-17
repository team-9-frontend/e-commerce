import { render, screen } from '@testing-library/react'
import Wishlist from 'apps/store/src/pages/user/Wishlist'
import { describe, expect, it } from 'vitest'

describe('Wishlist', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Wishlist />)
    expect(screen.getByText('Wishlist Page')).toBeInTheDocument()
  })
})
