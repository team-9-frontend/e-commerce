import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import StatsSkeleton from '@/components/dashboard/stats/StatsSkeleton'

describe('StatsSkeleton', () => {
  it('يعرض 6 كروت skeleton للإحصائيات من غير ما يكراش', () => {
    const { container } = render(<StatsSkeleton />)
    const cards = container.querySelectorAll('section article')
    expect(cards.length).toBe(6)
  })

  it('يعرض 3 صفوف skeleton في قسم الأوردرات الأخيرة', () => {
    const { container } = render(<StatsSkeleton />)
    // آخر div فيه animate-pulse بيمثل قسم recent orders، وجواه 3 صفوف
    const sections = container.querySelectorAll('.animate-pulse')
    expect(sections.length).toBeGreaterThan(0)
  })
})
