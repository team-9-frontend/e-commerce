import { render, screen } from '@testing-library/react'
import RecentOrders from 'apps/dashboard/src/components/stats/RecentOrders'
import { describe, expect, it } from 'vitest'

const recentOrders = [
  {
    _id: '1',
    user: { username: 'amr123' },
    items: [{ name: 'Wireless Mouse' }],
    status: 'delivered',
    totalPrice: 49.5,
  },
  {
    _id: '2',
    user: {},
    items: [],
    status: 'pending',
    totalPrice: 20,
  },
]

describe('RecentOrders', () => {
  it('يعرض عدد الأوردرات الصحيح في البادج', () => {
    render(<RecentOrders recentOrders={recentOrders} />)
    expect(screen.getByText('2 orders')).toBeInTheDocument()
  })

  it('يعرض اسم اليوزر والمنتج والحالة والسعر بشكل صحيح', () => {
    render(<RecentOrders recentOrders={recentOrders} />)
    expect(screen.getByText('amr123')).toBeInTheDocument()
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument()
    expect(screen.getByText('delivered')).toBeInTheDocument()
    expect(screen.getByText('$49.50')).toBeInTheDocument()
  })

  it('يستخدم "Guest" و"Order item" كـ fallback لو مفيش يوزر أو منتجات', () => {
    render(<RecentOrders recentOrders={recentOrders} />)
    expect(screen.getByText('Guest')).toBeInTheDocument()
    expect(screen.getByText('Order item')).toBeInTheDocument()
  })

  it('يعرض "0 orders" لو recentOrders مصفوفة فاضية', () => {
    render(<RecentOrders recentOrders={[]} />)
    expect(screen.getByText('0 orders')).toBeInTheDocument()
  })

  it('ما بيكراشش ويعرض "0 orders" لو recentOrders = undefined', () => {
    render(<RecentOrders recentOrders={undefined} />)
    expect(screen.getByText('0 orders')).toBeInTheDocument()
  })
})
