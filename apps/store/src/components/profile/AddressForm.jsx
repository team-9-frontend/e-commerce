import { LuPlus } from 'react-icons/lu'

import { Button, FormField } from '@repo/ui'
import { useForm } from '@repo/utils/forms'

export default function AddressForm() {
  const {
    register: addressRegister,
    handleSubmit: addressHandleSubmit,
    formState: { errors: addressErrors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      country: '',
      city: '',
      street: '',
      building: '',
      postalCode: '',
    },
  })

  const onAddressSubmit = () => {
    toast.success('Address added')
  }

  return (
    <form onSubmit={addressHandleSubmit(onAddressSubmit)} className="card flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Address</h2>
      <p className="text-sm text-neutral-500">No address added yet.</p>

      <div className="flex gap-4">
        <FormField
          name="country"
          placeholder="Country"
          register={addressRegister}
          rules={{
            required: 'Country is required',
          }}
          error={addressErrors.country}
          parentClassName="w-full"
        />

        <FormField
          name="city"
          placeholder="City"
          register={addressRegister}
          rules={{
            required: 'City is required',
          }}
          error={addressErrors.city}
          parentClassName="w-full"
        />
      </div>
      <div className="flex gap-4">
        <FormField
          name="street"
          placeholder="Street"
          register={addressRegister}
          rules={{
            required: 'Street is required',
          }}
          error={addressErrors.address}
          parentClassName="w-full"
        />

        <FormField
          name="building"
          placeholder="Postal Code"
          register={addressRegister}
          rules={{
            required: 'Postal code is required',
          }}
          error={addressErrors.postalCode}
          parentClassName="w-full"
        />
      </div>

      <FormField
        name="postalCode"
        placeholder="Postal Code"
        register={addressRegister}
        rules={{
          required: 'Postal code is required',
        }}
        error={addressErrors.postalCode}
      />

      <Button type="submit" className="w-fit">
        <LuPlus /> Add Address
      </Button>
    </form>
  )
}
