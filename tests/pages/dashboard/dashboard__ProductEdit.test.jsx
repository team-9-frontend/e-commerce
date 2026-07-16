import { render, screen } from '@testing-library/react'
import ProductEdit from 'apps/dashboard/src/pages/dashboard/ProductEdit'
import { describe, expect, it } from 'vitest'

describe('ProductEdit', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<ProductEdit />)
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })
})
