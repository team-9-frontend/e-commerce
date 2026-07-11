import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Register from '@/pages/auth/Register'

describe('Register', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Register />)
    expect(screen.getByText('Register Page')).toBeInTheDocument()
  })
})
