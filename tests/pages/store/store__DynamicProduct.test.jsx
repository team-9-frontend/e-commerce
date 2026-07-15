import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import DynamicProduct from '@/pages/storeDynamicProduct'

describe('DynamicProduct', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<DynamicProduct />)
    expect(screen.getByText('Product Page')).toBeInTheDocument()
  })
})
