export const usersKeys = {
  all: ['admin', 'users'],
  lists: () => [...usersKeys.all, 'list'],
  details: () => [...usersKeys.all, 'detail'],
  detail: (id) => [...usersKeys.details(), id],
}
