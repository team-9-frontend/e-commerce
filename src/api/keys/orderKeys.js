export const orderKeys = {
  user: {
    all: ['user', 'orders'],
    list: (params) => [...orderKeys.user.all, 'list', params],
    detail: (id) => [...orderKeys.user.all, 'details', id],
  },
  admin: {
    all: ['admin', 'orders'],
    dashboard: ['admin', 'orders', 'states'],
    list: (params) => [...orderKeys.admin.all, 'list', params],
    detail: (id) => [...orderKeys.admin.all, 'details', id],
  },
  adminCarts: (params) => ['admin', 'carts', 'list', params],
}
