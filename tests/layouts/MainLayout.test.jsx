import { render, screen } from '@testing-library/react'
import MainLayout from 'apps/store/src/layouts/MainLayout'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

describe('MainLayout', () => {
  it('يعرض محتوى الـ Outlet جوه الـ layout', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div>Page Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('Page Content')).toBeInTheDocument()
  })
})
