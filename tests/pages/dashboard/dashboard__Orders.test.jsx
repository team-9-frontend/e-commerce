import { render, screen } from '@testing-library/react'
import Orders from 'apps/dashboard/src/pages/dashboard/Orders'
import { describe, expect, it } from 'vitest'

describe('Orders', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Orders />)
    expect(screen.getByText('Orders Page')).toBeInTheDocument()
  })
})
