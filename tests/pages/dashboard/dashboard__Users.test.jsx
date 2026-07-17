import { render, screen } from '@testing-library/react'
import Users from 'apps/dashboard/src/pages/dashboard/Users'
import { describe, expect, it } from 'vitest'

describe('Users', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Users />)
    expect(screen.getByText('Users Page')).toBeInTheDocument()
  })
})
