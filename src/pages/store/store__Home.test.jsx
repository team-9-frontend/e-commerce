import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Home />)
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })
})
