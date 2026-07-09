import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductView from './ProductView'

describe('ProductView', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<ProductView />)
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })
})
