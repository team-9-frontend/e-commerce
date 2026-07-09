import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ForgotPassword from './ForgotPassword'

describe('ForgotPassword', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<ForgotPassword />)
    expect(screen.getByText('Forgot Password Page')).toBeInTheDocument()
  })
})
