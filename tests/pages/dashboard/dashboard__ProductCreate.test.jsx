import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductCreate from '@/pages/dashboard/ProductCreate'

describe('ProductCreate', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<ProductCreate />)
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })
})
