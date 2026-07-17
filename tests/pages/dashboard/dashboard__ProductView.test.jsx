import { render, screen } from '@testing-library/react'
import ProductView from 'apps/dashboard/src/pages/dashboard/ProductView'
import { describe, expect, it } from 'vitest'

describe('ProductView', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<ProductView />)
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })
})
