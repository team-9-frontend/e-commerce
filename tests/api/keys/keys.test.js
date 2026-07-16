import { describe, expect, it } from 'vitest'

import {
  authKeys,
  cartKeys,
  ordersKeys,
  productsKeys,
  reviewsKeys,
  usersKeys,
  wishlistKeys,
} from '@repo/api'

describe('authKeys', () => {
  it('has the expected static keys', () => {
    expect(authKeys.currentUser).toEqual(['user'])
    expect(authKeys.adminTest).toEqual(['user', 'adminTest'])
  })
})

describe('cartKeys', () => {
  it('has the expected static key', () => {
    expect(cartKeys.all).toEqual(['user', 'cart'])
  })
})

describe('ordersKeys', () => {
  it('builds user keys', () => {
    expect(ordersKeys.user.all).toEqual(['user', 'orders'])
    expect(ordersKeys.user.list({ page: 1 })).toEqual(['user', 'orders', 'list', { page: 1 }])
    expect(ordersKeys.user.detail('5')).toEqual(['user', 'orders', 'details', '5'])
  })

  it('builds admin keys', () => {
    expect(ordersKeys.admin.all).toEqual(['admin', 'orders'])
    expect(ordersKeys.admin.dashboard).toEqual(['admin', 'orders', 'stats'])
    expect(ordersKeys.admin.list({ status: 'pending' })).toEqual([
      'admin',
      'orders',
      'list',
      { status: 'pending' },
    ])
    expect(ordersKeys.admin.detail('9')).toEqual(['admin', 'orders', 'details', '9'])
  })

  it('builds adminCarts key', () => {
    expect(ordersKeys.adminCarts({ page: 2 })).toEqual(['admin', 'carts', 'list', { page: 2 }])
  })
})

describe('productsKeys', () => {
  it('builds all key variants', () => {
    expect(productsKeys.all).toEqual(['products'])
    expect(productsKeys.lists()).toEqual(['products', 'list'])
    expect(productsKeys.list({ page: 1 })).toEqual(['products', 'list', { page: 1 }])
    expect(productsKeys.details()).toEqual(['products', 'detail'])
    expect(productsKeys.detail('1')).toEqual(['products', 'detail', '1'])
    expect(productsKeys.searches()).toEqual(['products', 'search'])
    expect(productsKeys.search({ query: 'shoe' })).toEqual([
      'products',
      'search',
      { query: 'shoe' },
    ])
  })
})

describe('reviewsKeys', () => {
  it('builds all and list keys', () => {
    expect(reviewsKeys.all).toEqual(['reviews'])
    expect(reviewsKeys.list('p1')).toEqual(['reviews', 'p1'])
  })
})

describe('usersKeys', () => {
  it('builds all key variants', () => {
    expect(usersKeys.all).toEqual(['admin', 'users'])
    expect(usersKeys.lists()).toEqual(['admin', 'users', 'list'])
    expect(usersKeys.details()).toEqual(['admin', 'users', 'detail'])
    expect(usersKeys.detail('7')).toEqual(['admin', 'users', 'detail', '7'])
  })
})

describe('wishlistKeys', () => {
  it('has the expected static keys', () => {
    expect(wishlistKeys.user).toEqual(['user', 'wishlist'])
    expect(wishlistKeys.admin.all).toEqual(['admin', 'wishlist'])
    expect(wishlistKeys.admin.list).toEqual(['admin', 'wishlist', 'all'])
    expect(wishlistKeys.admin.stats).toEqual(['admin', 'wishlist', 'stats'])
  })
})
