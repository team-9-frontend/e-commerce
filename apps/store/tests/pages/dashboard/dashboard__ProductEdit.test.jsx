import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ProductEdit from '@/pages/dashboard/ProductEdit'

describe('ProductEdit', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<ProductEdit />)
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })
})
