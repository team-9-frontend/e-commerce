import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TopProducts from '@/components/dashboard/stats/TopProducts'

const topProducts = [
  { _id: '1', image: '/img1.jpg', name: 'Wireless Mouse', totalSold: 45, revenue: 900 },
  { _id: '2', image: '/img2.jpg', name: 'Keyboard', totalSold: 30, revenue: 600 },
]

describe('TopProducts', () => {
  it('ÙŠØ¹Ø±Ø¶ ÙƒÙ„ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª Ø¨Ø§Ù„Ø§Ø³Ù… ÙˆØ¹Ø¯Ø¯ Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª ÙˆØ§Ù„Ø¥ÙŠØ±Ø§Ø¯', () => {
    render(<TopProducts topProducts={topProducts} />)

    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument()
    expect(screen.getByText('45 units sold • revenue: $900')).toBeInTheDocument()

    expect(screen.getByText('Keyboard')).toBeInTheDocument()
    expect(screen.getByText('30 units sold • revenue: $600')).toBeInTheDocument()
  })

  it('ÙŠØ¹Ø±Ø¶ ØµÙˆØ±Ø© ÙƒÙ„ Ù…Ù†ØªØ¬ Ø¨Ø§Ù„Ù€ src ÙˆØ§Ù„Ù€ alt Ø§Ù„ØµØ­ÙŠØ­ÙŠÙ†', () => {
    render(<TopProducts topProducts={topProducts} />)
    const img = screen.getByAltText('Wireless Mouse')
    expect(img).toHaveAttribute('src', '/img1.jpg')
  })

  it('Ù…Ø§ Ø¨ÙŠÙƒØ±Ø§Ø´Ø´ Ù„Ùˆ topProducts = undefined', () => {
    const { container } = render(<TopProducts topProducts={undefined} />)
    expect(container).toBeInTheDocument()
  })

  it('Ù…Ø§ Ø¨ÙŠØ¹Ø±Ø¶Ø´ Ø£ÙŠ Ù…Ù†ØªØ¬Ø§Øª Ù„Ùˆ topProducts Ù…ØµÙÙˆÙØ© ÙØ§Ø¶ÙŠØ©', () => {
    render(<TopProducts topProducts={[]} />)
    expect(screen.queryByText(/units sold/)).not.toBeInTheDocument()
  })
})


