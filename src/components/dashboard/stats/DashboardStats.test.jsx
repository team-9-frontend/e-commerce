import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import DashboardStats from './DashboardStats'

const baseProps = {
  totalOrders: 120,
  pendingOrders: 15,
  revenue: 5000,
  salesForMonth: 800,
  topProduct: { name: 'Wireless Mouse', totalSold: 45 },
  users: 300,
}

describe('DashboardStats', () => {
  it('يعرض كل الكروت الستة بالقيم والعناوين الصحيحة', () => {
    render(<DashboardStats {...baseProps} />)

    expect(screen.getByText('Total Orders')).toBeInTheDocument()
    expect(screen.getByText('120')).toBeInTheDocument()

    expect(screen.getByText('Pending Orders')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()

    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$5000')).toBeInTheDocument()

    expect(screen.getByText('This Month')).toBeInTheDocument()
    expect(screen.getByText('$800')).toBeInTheDocument()

    expect(screen.getByText('Top Product')).toBeInTheDocument()
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument()
    expect(screen.getByText('45 sold')).toBeInTheDocument()

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('300')).toBeInTheDocument()
  })

  it('ما بيكراشش لو topProduct مش موجود (undefined)', () => {
    render(<DashboardStats {...baseProps} topProduct={undefined} />)
    expect(screen.getByText('Top Product')).toBeInTheDocument()
  })

  it('يعرض قيمة 0 عادي لو totalOrders أو pendingOrders = 0', () => {
    render(<DashboardStats {...baseProps} totalOrders={0} pendingOrders={0} />)
    const zeros = screen.getAllByText('0')
    expect(zeros.length).toBe(2)
  })
})
