import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Carts from './Carts'

describe('Carts', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Carts />)
    expect(screen.getByText('Cart Page')).toBeInTheDocument()
  })
})
