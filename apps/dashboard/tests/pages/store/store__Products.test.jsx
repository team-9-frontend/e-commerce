import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Products from '@/pages/store/Products'

describe('Products', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Products />)
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })
})
