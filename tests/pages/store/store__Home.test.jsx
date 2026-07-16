import { render, screen } from '@testing-library/react'
import Home from 'apps/store/src/pages/store/Home'
import { describe, expect, it } from 'vitest'

describe('Home', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Home />)
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })
})
