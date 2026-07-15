import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Tooltip from '@/components/ui/Tooltip'

describe('Tooltip', () => {
  it('يعرض المحتوى اللي جواه', () => {
    render(<Tooltip position="bottom">Logout</Tooltip>)
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it.each([
    ['bottom', 'top-full'],
    ['top', 'bottom-full'],
    ['right', 'left-full'],
    ['left', 'right-full'],
  ])('لما position="%s" يضيف كلاس "%s"', (position, expectedClass) => {
    render(<Tooltip position={position}>hint text</Tooltip>)
    expect(screen.getByText('hint text')).toHaveClass(expectedClass)
  })

  it('يقدر ياخد className إضافي من برا (زي ما بيستخدمه Sidebar لإخفائه شرطيًا)', () => {
    render(
      <Tooltip position="right" className="hidden">
        hint
      </Tooltip>,
    )
    expect(screen.getByText('hint')).toHaveClass('hidden')
  })
})
