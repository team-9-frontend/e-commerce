export const productsKeys = {
  all: ['products'],
  lists: () => [...productsKeys.all, 'list'],
  list: (params) => [...productsKeys.lists(), params],
  details: () => [...productsKeys.all, 'detail'],
  detail: (id) => [...productsKeys.details(), id],
  searches: () => [...productsKeys.all, 'search'],
  search: (params) => [...productsKeys.searches(), params],
}
