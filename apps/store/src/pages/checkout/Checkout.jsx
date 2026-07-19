import { useNavigate } from 'react-router-dom'
import { Button, FormField } from '@repo/ui'
import { useForm } from '@repo/utils/forms'

export default function Checkout() {
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm({
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

  return (
  <div className="min-h-screen bg-gray-50 py-10">
    <div className="mx-auto max-w-6xl px-6">
   <div className="mb-10">

<div className="mb-10 rounded-2xl bg-blue-100 p-6 shadow-md border border-blue-100">
  <h1 className="text-center text-4xl font-bold text-gray-800">
    Checkout
  </h1>

  <p className="mt-2 text-center text-gray-500">
    Complete your shipping details and continue to payment
  </p>
</div>
</div>
      <div className="grid gap-8 lg:grid-cols-3">

        {/* Shipping Form */}
        <form
          onSubmit={handleSubmit((data) => {
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
          })}
          className="space-y-5 rounded-2xl bg-white p-8 shadow-md lg:col-span-2"
        >
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Shipping Address
          </h2>

          <FormField 
            label="Full Name" 
            name="fullName" 
            register={register} 
          />

          <FormField 
            label="Phone" 
            name="phone" 
            register={register} 
          />

          <FormField 
            label="Country" 
            name="country" 
            register={register} 
          />

          <FormField 
            label="City" 
            name="city" 
            register={register} 
          />

          <FormField
            label="Address"
            name="address"
            type="textarea"
            register={register}
          />

          <FormField
            label="Postal Code"
            name="postalCode"
            register={register}
          />

          <FormField
            label="Customer Note"
            name="customerNote"
            type="textarea"
            register={register}
          />

          <Button
            type="submit"
            className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-700"
          >
            Continue To Payment
          </Button>

        </form>


        {/* Order Summary */}
        <div className="h-fit rounded-2xl bg-white p-8 shadow-md">

          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-4 text-gray-600">

            <div className="flex justify-between border-b pb-3">
              <span>Items</span>
              <span>-</span>
            </div>


            <div className="flex justify-between border-b pb-3">
              <span>Subtotal</span>
              <span>$-</span>
            </div>


            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>$-</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
) }