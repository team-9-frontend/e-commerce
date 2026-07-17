export const ordersKeys = {
  user: {
    all: ['user', 'orders'],
    list: (params) => [...ordersKeys.user.all, 'list', params],
    detail: (id) => [...ordersKeys.user.all, 'details', id],
  },
  admin: {
    all: ['admin', 'orders'],
    dashboard: ['admin', 'orders', 'stats'],
    list: (params) => [...ordersKeys.admin.all, 'list', params],
    detail: (id) => [...ordersKeys.admin.all, 'details', id],
  },
  adminCarts: (params) => ['admin', 'carts', 'list', params],
}
