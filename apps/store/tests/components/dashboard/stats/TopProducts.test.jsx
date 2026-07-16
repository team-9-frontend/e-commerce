import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TopProducts from '@/components/stats/TopProducts'

const topProducts = [
  { _id: '1', image: '/img1.jpg', name: 'Wireless Mouse', totalSold: 45, revenue: 900 },
  { _id: '2', image: '/img2.jpg', name: 'Keyboard', totalSold: 30, revenue: 600 },
]

describe('TopProducts', () => {
  it('يعرض كل المنتجات بالاسم وعدد المبيعات والإيراد', () => {
    render(<TopProducts topProducts={topProducts} />)

    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument()
    expect(screen.getByText('45 units sold - $900 revenue')).toBeInTheDocument()

    expect(screen.getByText('Keyboard')).toBeInTheDocument()
    expect(screen.getByText('30 units sold - $600 revenue')).toBeInTheDocument()
  })

  it('يعرض صورة كل منتج بالـ src والـ alt الصحيحين', () => {
    render(<TopProducts topProducts={topProducts} />)
    const img = screen.getByAltText('Wireless Mouse')
    expect(img).toHaveAttribute('src', '/img1.jpg')
  })

  it('ما بيكراشش لو topProducts = undefined', () => {
    const { container } = render(<TopProducts topProducts={undefined} />)
    expect(container).toBeInTheDocument()
  })

  it('ما بيعرضش أي منتجات لو topProducts مصفوفة فاضية', () => {
    render(<TopProducts topProducts={[]} />)
    expect(screen.queryByText(/units sold/)).not.toBeInTheDocument()
  })
})
