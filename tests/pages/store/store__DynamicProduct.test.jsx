import { render, screen } from '@testing-library/react'
import DynamicProduct from 'apps/store/src/pages/store/DynamicProduct'
import { describe, expect, it } from 'vitest'

describe('DynamicProduct', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<DynamicProduct />)
    expect(screen.getByText('Product Page')).toBeInTheDocument()
  })
})
