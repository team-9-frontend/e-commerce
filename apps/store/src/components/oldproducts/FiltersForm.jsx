import { useEffect } from 'react'

import { Button, FormField } from '@repo/ui'
import { cn } from '@repo/utils'
import { useSearchParamsForm } from '@repo/utils/forms'

export default function FiltersForm({ className }) {
  const {
    register,
    handleSubmit,
    updateParams,
    setValue,
    trigger,
    urlValues,
    formState: { errors },
  } = useSearchParamsForm({
    mode: 'onChange',
    unDebouncedFields: ['category', 'sort'],
    defaultValues: {
      category: '',
      minprice: '',
      maxprice: '',
      sort: '',
    },
  })

  const { minprice, maxprice } = urlValues

  useEffect(() => {
    if (minprice || maxprice) {
      trigger(['minprice', 'maxprice'])
    }
  }, [minprice, maxprice, urlValues])

  return (
    <form
      className={cn('card flex flex-col gap-4 p-4', className)}
      onSubmit={handleSubmit(updateParams)}
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-medium capitalize">category</h2>

        <FormField
          type="radio"
          name="category"
          label="all"
          value=""
          register={register}
          className="flex-row-reverse justify-end gap-4 [[type='radio']]:cursor-pointer"
        />

        {['electronics', 'phones', 'fashion', 'home', 'beauty', 'sports'].map((category) => (
          <FormField
            key={category}
            type="radio"
            name="category"
            label={category}
            value={category}
            register={register}
            className="flex-row-reverse justify-end gap-4 [[type='radio']]:cursor-pointer"
          />
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-medium capitalize">price range</h2>

        <div className="flex w-64 gap-2">
          <FormField
            type="number"
            min={0}
            name="minprice"
            placeholder="Min"
            register={register}
            rules={{
              pattern: { value: /^[0-9]+$/, message: 'Invalid value' },
              validate: (value, formValues) => {
                if (!value || !formValues.maxprice) return true
                return (
                  Number(value) <= Number(formValues.maxprice) || 'Min cannot be bigger than Max'
                )
              },
            }}
            className="flex-1"
          />

          <FormField
            type="number"
            min={0}
            name="maxprice"
            placeholder="Max"
            register={register}
            rules={{
              pattern: { value: /^[0-9]+$/, message: 'Invalid value' },
              validate: (value, formValues) => {
                if (!value || !formValues.minprice) return true
                return (
                  Number(value) >= Number(formValues.minprice) || 'Min cannot be bigger than Max'
                )
              },
            }}
            className="flex-1"
          />
        </div>

        {(errors.minprice || errors.maxprice) && (
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            {errors.minprice?.message || errors.maxprice?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-medium capitalize">sort by</h2>

        <FormField
          name="sort"
          register={register}
          type="select"
          options={['newest', 'top rated', 'price: low to high', 'price: high to low']}
          defaultOption="default"
          className="w-full"
        />
      </div>

      <Button
        type="reset"
        onClick={() => {
          setValue('category', '')
          setValue('minprice', '')
          setValue('maxprice', '')
          setValue('sort', '')
        }}
      >
        Reset Filters
      </Button>
    </form>
  )
}
