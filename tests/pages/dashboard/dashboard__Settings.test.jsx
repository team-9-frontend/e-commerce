import { render, screen } from '@testing-library/react'
import Settings from 'apps/dashboard/src/pages/dashboard/Settings'
import { describe, expect, it } from 'vitest'

describe('Settings', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Settings />)
    expect(screen.getByText('Preferences and integrations')).toBeInTheDocument()
  })
})
