import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Wishlist from './Wishlist'

describe('Wishlist', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Wishlist />)
    expect(screen.getByText('Wishlist Page')).toBeInTheDocument()
  })
})
