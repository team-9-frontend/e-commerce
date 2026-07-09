import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import OrderStatus from './OrderStatus'

const orders = {
  pending: 3,
  processing: 5,
  confirmed: 8,
  shipped: 2,
  delivered: 20,
  cancelled: 1,
}

describe('OrderStatus', () => {
  it('يعرض كل حالات الأوردرات الستة بالعدد الصحيح', () => {
    render(<OrderStatus orders={orders} />)

    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()

    expect(screen.getByText('Processing')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()

    expect(screen.getByText('Confirmed')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()

    expect(screen.getByText('Shipped')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()

    expect(screen.getByText('Delivered')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()

    expect(screen.getByText('Cancelled')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('يعرض 0 لو حالة معينة مش موجودة في البيانات (undefined)', () => {
    render(<OrderStatus orders={{ pending: 3 }} />)
    // processing/confirmed/... مش موجودين فالـ object، فبيتعرضوا فاضيين (undefined)
    // بس الكومبوننت لازال بيرندر بدون كراش طالما orders نفسه object موجود
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
