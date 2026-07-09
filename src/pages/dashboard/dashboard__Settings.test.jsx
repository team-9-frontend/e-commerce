import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Settings from './Settings'

describe('Settings', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Settings />)
    expect(screen.getByText('Settings Page')).toBeInTheDocument()
  })
})
