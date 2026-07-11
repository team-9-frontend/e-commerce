import { describe, expect, it } from 'vitest'

import { authKeys } from '@/api/keys/authKeys'
import { cartKeys } from '@/api/keys/cartKeys'
import { orderKeys } from '@/api/keys/orderKeys'
import { productKeys } from '@/api/keys/productKeys'
import { reviewKeys } from '@/api/keys/reviewKeys'
import { userKeys } from '@/api/keys/userKeys'
import { wishlistKeys } from '@/api/keys/wishlistKeys'

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

describe('orderKeys', () => {
  it('builds user keys', () => {
    expect(orderKeys.user.all).toEqual(['user', 'orders'])
    expect(orderKeys.user.list({ page: 1 })).toEqual(['user', 'orders', 'list', { page: 1 }])
    expect(orderKeys.user.detail('5')).toEqual(['user', 'orders', 'details', '5'])
  })

  it('builds admin keys', () => {
    expect(orderKeys.admin.all).toEqual(['admin', 'orders'])
    expect(orderKeys.admin.dashboard).toEqual(['admin', 'orders', 'stats'])
    expect(orderKeys.admin.list({ status: 'pending' })).toEqual([
      'admin',
      'orders',
      'list',
      { status: 'pending' },
    ])
    expect(orderKeys.admin.detail('9')).toEqual(['admin', 'orders', 'details', '9'])
  })

  it('builds adminCarts key', () => {
    expect(orderKeys.adminCarts({ page: 2 })).toEqual(['admin', 'carts', 'list', { page: 2 }])
  })
})

describe('productKeys', () => {
  it('builds all key variants', () => {
    expect(productKeys.all).toEqual(['products'])
    expect(productKeys.lists()).toEqual(['products', 'list'])
    expect(productKeys.list({ page: 1 })).toEqual(['products', 'list', { page: 1 }])
    expect(productKeys.details()).toEqual(['products', 'detail'])
    expect(productKeys.detail('1')).toEqual(['products', 'detail', '1'])
    expect(productKeys.searches()).toEqual(['products', 'search'])
    expect(productKeys.search({ query: 'shoe' })).toEqual(['products', 'search', { query: 'shoe' }])
  })
})

describe('reviewKeys', () => {
  it('builds all and list keys', () => {
    expect(reviewKeys.all).toEqual(['reviews'])
    expect(reviewKeys.list('p1')).toEqual(['reviews', 'p1'])
  })
})

describe('userKeys', () => {
  it('builds all key variants', () => {
    expect(userKeys.all).toEqual(['admin', 'users'])
    expect(userKeys.lists()).toEqual(['admin', 'users', 'list'])
    expect(userKeys.details()).toEqual(['admin', 'users', 'detail'])
    expect(userKeys.detail('7')).toEqual(['admin', 'users', 'detail', '7'])
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
