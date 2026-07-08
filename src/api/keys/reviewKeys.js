export const reviewKeys = {
  all: ['reviews'],
  list: (productId) => [...reviewKeys.all, productId],
}
