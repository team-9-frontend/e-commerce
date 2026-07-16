import { render, screen } from '@testing-library/react'
import Products from 'apps/store/src/pages/store/Products'
import { describe, expect, it } from 'vitest'

describe('Products', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Products />)
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })
})
