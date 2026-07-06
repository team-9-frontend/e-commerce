import {
  FaCalendarAlt,
  FaClock,
  FaCrown,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
} from 'react-icons/fa'

export default function DashboardStats({
  totalOrders,
  pendingOrders,
  revenue,
  salesForMonth,
  topProduct,
  users,
}) {
  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders,
      description: 'All orders received',
      icon: FaShoppingCart,
      color: 'bg-green-500',
    },
    {
      label: 'Pending Orders',
      value: pendingOrders,
      description: 'Awaiting action',
      icon: FaClock,
      color: 'bg-orange-500',
    },
    {
      label: 'Revenue',
      value: `$${revenue}`,
      description: 'Total gross revenue',
      icon: FaDollarSign,
      color: 'bg-indigo-500',
    },
    {
      label: 'This Month',
      value: `$${salesForMonth}`,
      description: 'Monthly sales target',
      icon: FaCalendarAlt,
      color: 'bg-cyan-500',
    },
    {
      label: 'Top Product',
      value: topProduct?.name,
      description: `${topProduct?.totalSold} sold`,
      icon: FaCrown,
      color: 'bg-purple-500',
    },
    {
      label: 'Users',
      value: users,
      description: 'Registered customers',
      icon: FaUsers,
      color: 'bg-gray-500',
    },
  ]
  return (
    <section className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className={`card relative flex justify-between gap-3 overflow-hidden rounded-2xl bg-white p-6 pb-10 shadow-xl dark:bg-neutral-100`}
        >
          <div className={`absolute top-0 left-0 ${stat.color} h-1 w-full`} />
          <div className="relative">
            <h2 className="text-accent-900 mb-3 text-sm font-semibold sm:text-base">
              {' '}
              {stat.label}
            </h2>
            <span className="mb-2 block text-xl font-bold sm:text-2xl">{stat.value}</span>
            <span className="text-xs text-gray-500 sm:text-sm">{stat.description}</span>
          </div>
          <div
            className={`${stat.color} flex-center size-10 shrink-0 rounded-lg sm:size-14 sm:rounded-2xl`}
          >
            <stat.icon className="text-lg text-white sm:text-2xl" />
          </div>
        </article>
      ))}
    </section>
  )
}
