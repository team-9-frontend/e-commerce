# API layer

```
api/
├── client.js         axios instance (was axios.js)
├── keys/             query key factories, one source of truth per domain
├── services/         plain axios calls, no react-query, usable outside React
├── hooks/             useQuery / useMutation wrappers, one file per domain
└── index.js          barrel file: import { useGetCart } from '@/api'
```

Drop this `api/` folder wherever your old flat files lived (e.g. `src/api/`)
and update import paths accordingly.

## Breaking changes from the old flat files

1. **`useDeleteProduct`** no longer takes `id` when the hook is created.
   Pass it to `mutate` instead, matching `useRemoveCartItem` / `useDeleteUser`:

   ```js
   // before
   const { mutate } = useDeleteProduct(id)
   mutate()

   // after
   const { mutate } = useDeleteProduct()
   mutate(id)
   ```

2. **`useGetWishlistStates` → `useGetWishlistStats`.** The query key was
   already `'stats'`; only the exported hook name had the typo.

3. **`useUpdateOrderStatus`** now sends the PATCH body directly instead of
   double-wrapping it as `{ data }`. Update your backend/consumers if they
   relied on the old wrapped shape — this was very likely an existing bug.

4. **Reviews cache key** moved from `['products', 'reviews', id]` to
   `['reviews', id]`. The first load after deploying will refetch reviews
   once. Product create/update/delete mutations no longer incidentally
   invalidate reviews as a side effect.

5. **`useUpdateUserRole`** now resolves to `res.data` instead of the raw
   axios response, for consistency with every other mutation.

## Non-breaking fixes

- Removed a stray `enabled: !!id` option from `useRemoveCartItem` and
  `useDeleteProduct` — `enabled` isn't a valid `useMutation` option and was
  silently ignored.
- `useAddToWishlist` / `useRemoveFromWishlist` / `useClearWishlist` now also
  invalidate the admin wishlist views (`useGetAllWishlist`,
  `useGetWishlistStats`), so admin screens stay in sync with user changes.
