import { useCallback, useEffect, useMemo, useState } from 'react'
import { ordersService } from '@/api/services/ordersService'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Button from '@/components/ui/Button'

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString()
  } catch {
    return d
  }
}

function getStatusClass(status) {
  const base = 'inline-flex rounded-full px-3 py-1 text-xs font-semibold'
  switch (status?.toLowerCase()) {
    case 'pending':
      return `${base} bg-amber-100 text-amber-800`
    case 'processing':
      return `${base} bg-sky-100 text-sky-800`
    case 'confirmed':
      return `${base} bg-blue-100 text-blue-800`
    case 'shipped':
      return `${base} bg-indigo-100 text-indigo-800`
    case 'delivered':
      return `${base} bg-emerald-100 text-emerald-800`
    case 'cancelled':
      return `${base} bg-rose-100 text-rose-800`
    default:
      return `${base} bg-slate-100 text-slate-800`
  }
}

function OrderRow({ order, onOpen }) {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
      <td className="px-4 py-4 text-sm">#{order._id.slice(-6).toUpperCase()}</td>
      <td className="px-4 py-4 text-sm">
        <div className="font-semibold">{order.user?.username || order.user?.email || 'Guest'}</div>
        <div className="text-xs text-slate-500">{order.user?._id ?? 'anonymous'}</div>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600">{formatDate(order.createdAt)}</td>
      <td className="px-4 py-4 text-sm">
        <span className={getStatusClass(order.status)}>{order.status}</span>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600">{order.paymentMethod}</td>
      <td className="px-4 py-4 text-sm font-semibold">${order.totalPrice}</td>
      <td className="px-4 py-4 text-sm">
        <Button variant="outline" size="sm" onClick={() => onOpen(order)}>
          Details
        </Button>
      </td>
    </tr>
  )
}

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

const paymentStatusOptions = [
  { value: '', label: 'All payment status' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
]

const paymentMethodOptions = [
  { value: '', label: 'All methods' },
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [filters, setFilters] = useState({ status: '', paymentStatus: '', paymentMethod: '', search: '' })
  const [selected, setSelected] = useState(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await ordersService.getAllOrders()
      setOrders(res?.orders ?? res?.data ?? res ?? [])
    } catch (err) {
      setError(err?.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = filters.search.trim().toLowerCase()
      const matchesQuery =
        !query ||
        order._id.toLowerCase().includes(query) ||
        order.user?.username?.toLowerCase().includes(query) ||
        order.user?.name?.toLowerCase().includes(query) ||
        order.user?.email?.toLowerCase().includes(query) ||
        order.shippingAddress?.fullName?.toLowerCase().includes(query) ||
        order.shippingAddress?.address?.toLowerCase().includes(query) ||
        order.items?.some((item) => item.name?.toLowerCase().includes(query))

      const matchesStatus = !filters.status || order.status === filters.status
      const matchesPaymentStatus = !filters.paymentStatus || order.paymentStatus === filters.paymentStatus
      const matchesPaymentMethod = !filters.paymentMethod || order.paymentMethod === filters.paymentMethod

      return matchesQuery && matchesStatus && matchesPaymentStatus && matchesPaymentMethod
    })
  }, [orders, filters])

  const totals = useMemo(() => ({ total: orders.length, filtered: filteredOrders.length }), [orders.length, filteredOrders.length])

  async function handleUpdateStatus(id, status) {
    try {
      await ordersService.updateOrderStatus(id, { status })
      fetchOrders()
      setSelected((prev) => (prev?._id === id ? { ...prev, status } : prev))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('updateStatus', err)
      alert('Failed to update status')
    }
  }

  return (
    <div className="container my-6">
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Admin · Management</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">Orders</h1>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-3 text-sm text-slate-600">
            {totals.filtered} / {totals.total} orders shown
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Input
            placeholder="Search ID, customer, item..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          />
          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            className="min-w-[160px]"
          />
          <Select
            options={paymentStatusOptions}
            value={filters.paymentStatus}
            onChange={(e) => setFilters((prev) => ({ ...prev, paymentStatus: e.target.value }))}
            className="min-w-[160px]"
          />
          <Select
            options={paymentMethodOptions}
            value={filters.paymentMethod}
            onChange={(e) => setFilters((prev) => ({ ...prev, paymentMethod: e.target.value }))}
            className="min-w-[160px]"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setFilters({ status: '', paymentStatus: '', paymentMethod: '', search: '' })}>
            Reset filters
          </Button>
          <span className="text-sm text-slate-500">Use filters to narrow the order list instantly.</span>
        </div>
      </div>

      {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.1em]">Order</th>
              <th className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.1em]">Customer</th>
              <th className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.1em]">Date</th>
              <th className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.1em]">Status</th>
              <th className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.1em]">Payment</th>
              <th className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.1em]">Total</th>
              <th className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.1em]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                  Loading orders...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                  No orders match the selected filters.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => <OrderRow key={order._id} order={order} onOpen={setSelected} />)
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Order details</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">#{selected._id.slice(-6).toUpperCase()}</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Customer</h3>
                <p className="mt-3 font-semibold text-slate-900">{selected.user?.username || selected.user?.email || 'Guest'}</p>
                <p className="text-sm text-slate-600">{selected.user?.email}</p>
                <p className="mt-4 text-sm text-slate-600">{selected.shippingAddress?.fullName}</p>
                <p className="text-sm text-slate-600">{selected.shippingAddress?.address}</p>
                <p className="text-sm text-slate-600">{selected.shippingAddress?.city}, {selected.shippingAddress?.country}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Summary</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>${selected.subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax</span>
                    <span>${selected.tax}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>${selected.shippingFee}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 font-semibold flex items-center justify-between">
                    <span>Total</span>
                    <span>${selected.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Items</h3>
              <div className="mt-4 space-y-3">
                {selected.items?.map((item) => (
                  <div key={item.product} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.quantity} × ${item.price}</p>
                    </div>
                    <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1 text-sm text-slate-600">
                <p>Status: <span className="font-semibold text-slate-900">{selected.status}</span></p>
                <p>Payment: <span className="font-semibold text-slate-900">{selected.paymentStatus}</span></p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Select
                  options={statusOptions}
                  value={selected.status}
                  onChange={(e) => handleUpdateStatus(selected._id, e.target.value)}
                  className="min-w-[160px]"
                />
                <Button variant="primary" size="md" onClick={() => setSelected(null)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
