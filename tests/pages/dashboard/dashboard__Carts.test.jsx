import { render, screen } from '@testing-library/react'
import Carts from 'apps/dashboard/src/pages/dashboard/Carts'
import { describe, expect, it } from 'vitest'

describe('Carts', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Carts />)
    expect(screen.getByText('Cart overview')).toBeInTheDocument()
  })
})
