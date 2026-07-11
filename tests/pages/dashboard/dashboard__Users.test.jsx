import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Users from '@/pages/dashboard/Users'

describe('Users', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Users />)
    expect(screen.getByText('Users Page')).toBeInTheDocument()
  })
})
