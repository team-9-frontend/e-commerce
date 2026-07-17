import { render, screen } from '@testing-library/react'
import ProductCreate from 'apps/dashboard/src/pages/dashboard/ProductCreate'
import { describe, expect, it } from 'vitest'

describe('ProductCreate', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<ProductCreate />)
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })
})
