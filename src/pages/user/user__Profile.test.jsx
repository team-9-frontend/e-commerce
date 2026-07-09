import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Profile from './Profile'

describe('Profile', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Profile />)
    expect(screen.getByText('Profile Page')).toBeInTheDocument()
  })
})
