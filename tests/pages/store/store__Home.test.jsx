import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from '@/pages/store/Home'

describe('Home', () => {
  it('يعرض النص الصحيح للصفحة', () => {
    render(<Home />)
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })
})
