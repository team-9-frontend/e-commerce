import { render, screen } from '@testing-library/react'
import Orders from 'apps/store/src/pages/user/Orders'
import { describe, expect, it } from 'vitest'

describe('Orders', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Orders />)
    expect(screen.getByText('Orders page')).toBeInTheDocument()
  })
})
