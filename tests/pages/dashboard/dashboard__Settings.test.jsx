import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Settings from '@/pages/dashboard/Settings'

describe('Settings', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Settings />)
    expect(screen.getByText('Preferences and integrations')).toBeInTheDocument()
  })
})

