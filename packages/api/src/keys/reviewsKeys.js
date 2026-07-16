export const reviewsKeys = {
  all: ['reviews'],
  list: (productId) => [...reviewsKeys.all, productId],
}
