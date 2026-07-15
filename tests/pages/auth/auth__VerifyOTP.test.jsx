import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import VerifyOTP from '@/pages/auth/VerifyOTP'

describe('VerifyOTP', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<VerifyOTP />)
    expect(screen.getByText('Verify OTP Page')).toBeInTheDocument()
  })
})
