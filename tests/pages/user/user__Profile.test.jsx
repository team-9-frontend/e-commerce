import { render, screen } from '@testing-library/react'
import Profile from 'apps/store/src/pages/user/Profile'
import { describe, expect, it } from 'vitest'

describe('Profile', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Profile />)
    expect(screen.getByText('Profile Page')).toBeInTheDocument()
  })
})
