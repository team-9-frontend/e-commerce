import { useEffect } from 'react'

import { LuArrowLeft } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'

import { useGetCart } from '@repo/api'
import { Button, FormField } from '@repo/ui'
import { useForm } from '@repo/utils/forms'

export default function Checkout() {
  const navigate = useNavigate()
  const { data: cart } = useGetCart()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      phone: '',
      country: '',
      city: '',
      address: '',
      postalCode: '',
      customerNote: '',
    },
  })

  const onSubmit = (data) => {
    navigate('/payment', {
      state: {
        shippingAddress: {
          fullName: data.fullName,
          phone: data.phone,
          country: data.country,
          city: data.city,
          address: data.address,
          postalCode: data.postalCode,
        },
        customerNote: data.customerNote,
      },
    })
  }

  useEffect(() => {
    if (!cart?.itemCount) return navigate('/cart')
  }, [cart, navigate])

  return (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <div className="card relative flex items-center justify-between gap-4 p-4">
        <div className="from-accent-500/10 pointer-events-none absolute inset-0 bg-linear-to-l via-transparent to-transparent" />

        <div className="flex gap-4">
          <div className="bg-accent-600 dark:bg-accent-400 w-2 rounded-full" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold sm:text-3xl">Checkout</h2>
            <p className="text-sm text-neutral-500">
              Complete your shipping details and continue to payment
            </p>
          </div>
        </div>

        <Link to="/cart">
          <Button variant="ghost">
            <LuArrowLeft /> Go Back
          </Button>
        </Link>
      </div>

      <div className="flex items-start gap-4 max-lg:flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="card flex w-full flex-col gap-4 p-4">
          <h2 className="text-xl font-bold sm:text-2xl">Shipping Address</h2>

          <div className="flex gap-4">
            <FormField
              name="fullName"
              label="Full Name"
              placeholder="Full Name"
              register={register}
              rules={{
                required: 'Full name is required',
              }}
              error={errors.fullName}
              parentClassName="w-full"
            />

            <FormField
              name="phone"
              label="Phone"
              placeholder="Phone"
              register={register}
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{1,14}$/i,
                  message: 'Invalid phone number',
                },
              }}
              error={errors.phone}
              parentClassName="w-full"
            />
          </div>

          <div className="flex gap-4">
            <FormField
              name="country"
              label="Country"
              placeholder="Country"
              register={register}
              rules={{
                required: 'Country is required',
              }}
              error={errors.country}
              parentClassName="w-full"
            />

            <FormField
              name="city"
              label="City"
              placeholder="City"
              register={register}
              rules={{
                required: 'City is required',
              }}
              error={errors.city}
              parentClassName="w-full"
            />
          </div>

          <FormField
            name="address"
            label="Address"
            placeholder="Address"
            register={register}
            rules={{
              required: 'Address is required',
            }}
            type="textarea"
            rows={2}
            error={errors.address}
          />

          <FormField
            name="postalCode"
            label="Postal Code"
            placeholder="Postal Code"
            register={register}
            rules={{
              required: 'Postal code is required',
            }}
            error={errors.postalCode}
          />

          <FormField
            name="customerNote"
            label="Order Notes (Optional)"
            placeholder="Order Notes"
            register={register}
            type="textarea"
            rows={2}
            error={errors.customerNote}
          />

          <button type="submit" className="hidden"></button>
        </form>

        <div className="card flex w-full min-w-96 flex-col gap-4 p-4 lg:w-1/4">
          <h2 className="text-lg">Order Summary</h2>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm text-neutral-600">
              <span>Subtotal</span>
              <span>${cart?.subtotal || 0}</span>
            </div>

            <div className="flex items-center justify-between border-t border-neutral-200 pt-2 text-sm font-medium text-neutral-950">
              <span>Total</span>
              <span className="text-accent-600 dark:text-accent-400">${cart?.total || 0}</span>
            </div>
          </div>

          <Button variant="primary" className="w-full normal-case" onClick={handleSubmit(onSubmit)}>
            Continue To Payment
          </Button>
        </div>
      </div>
    </div>
  )
}
