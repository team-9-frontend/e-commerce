import { useState } from 'react'

import { LuTrash2, LuX } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'

import { useCreateProduct, useUpdateProduct } from '@repo/api'
import { Button, FormField } from '@repo/ui'
import { cn } from '@repo/utils'
import { Controller, useForm } from '@repo/utils/forms'
import { toast } from '@repo/utils/toasts'

export default function ProductForm({ product, dialog }) {
  const { mutate: createProduct, isPending: creatingProduct } = useCreateProduct()
  const { mutate: editProduct, isPending: editingProduct } = useUpdateProduct()

  const [tagInput, setTagInput] = useState('')

  const { pathname } = useLocation()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name || '',
      shortDescription: product?.shortDescription || '',
      description: product?.description || '',
      price: product?.price || 0,
      discountPrice: product?.discountPrice || 0,
      stock: product?.stock || 0,
      sku: product?.sku || '',
      category: product?.category || '',
      subcategory: product?.subcategory || '',
      brand: product?.brand || '',
      tags: product?.tags || [],
      featured: product?.featured || false,
      isActive: product?.isActive || false,
      images: product?.images.map((image) => image.url) || [],
    },
  })

  const onSubmit = async (data) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach((image) => formData.append('images', image))
      } else if (key === 'tags') {
        formData.append('tags', JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    })

    console.log(formData)

    if (product) {
      editProduct({ id: product._id, data: formData })
    } else {
      createProduct(formData)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-4', !dialog && 'card p-4')}
    >
      <Controller
        name="images"
        control={control}
        render={({ field }) => {
          const currentImages = field.value || []

          return (
            <div className="flex flex-col gap-2">
              <label className="flex-center w-fit cursor-pointer gap-1 text-sm font-medium text-neutral-600 capitalize">
                Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                className="block w-full text-sm text-neutral-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-neutral-200"
                onChange={(e) => {
                  const files = Array.from(e.target.files)
                  const total = currentImages.length + files.length

                  if (total > 5) {
                    toast.error('You can only upload a maximum of 5 images.')
                    e.target.value = ''
                    return
                  }

                  if (files.length > 0) field.onChange([...currentImages, ...files])
                  e.target.value = ''
                }}
              />

              {currentImages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {currentImages.map((image, i) => {
                    const src = image instanceof File ? URL.createObjectURL(image) : image

                    return (
                      <div key={i} className="group card relative size-48 shadow-none">
                        <img src={src} alt={`preview-${i}`} className="size-full object-cover" />

                        <Button
                          type="button"
                          variant="custom"
                          size="md-square"
                          className="invisible absolute top-0 right-0 z-10 mt-4 mr-4 rounded-full border-none bg-neutral-50 opacity-0 transition-all group-hover:visible group-hover:opacity-100 hover:text-red-600 dark:hover:text-red-400"
                          onClick={() => {
                            field.onChange(currentImages.filter((_, index) => index !== i))
                          }}
                        >
                          <LuTrash2 />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}

              {errors.images && (
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.images.message}
                </span>
              )}
            </div>
          )
        }}
      />

      <FormField
        name="name"
        label="Product Name"
        placeholder="Product Name"
        register={register}
        rules={{
          required: 'Product name is required',
        }}
        error={errors.name}
      />

      <FormField
        name="shortDescription"
        label="Short Description"
        placeholder="Short Description"
        register={register}
        rules={{
          required: 'Short description is required',
          minLength: { value: 10, message: 'Must be at least 10 characters' },
        }}
        error={errors.shortDescription}
      />

      <FormField
        name="description"
        label="Description"
        placeholder="Description"
        register={register}
        rules={{
          required: 'Description is required',
          minLength: { value: 20, message: 'Must be at least 20 characters' },
        }}
        error={errors.description}
        type="textarea"
        rows={5}
      />

      <div className="flex gap-2">
        <FormField
          name="price"
          label="Price"
          placeholder="Price"
          register={register}
          rules={{
            required: 'Price is required',
          }}
          error={errors.price}
          type="number"
          min={0}
          className="flex-1"
        />

        <FormField
          name="discountPrice"
          label="Discount Price"
          placeholder="Discount Price"
          register={register}
          error={errors.discountPrice}
          type="number"
          min={0}
          className="flex-1"
        />
      </div>

      <div className="flex gap-2">
        <FormField
          name="stock"
          label="Stock"
          placeholder="Stock"
          register={register}
          rules={{
            required: 'Stock is required',
          }}
          error={errors.stock}
          type="number"
          min={0}
          className="flex-1"
        />

        <FormField
          name="sku"
          label="SKU"
          placeholder="SKU"
          register={register}
          error={errors.sku}
          className="flex-1"
        />
      </div>

      <div className="flex gap-2">
        <FormField
          name="category"
          label="Category"
          placeholder="Category"
          register={register}
          rules={{
            required: 'Category is required',
          }}
          error={errors.category}
          type="select"
          options={['electronics', 'phones', 'fashion', 'home', 'beauty', 'sports']}
          hiddenOption="Select Category"
          className="flex-1"
        />

        <FormField
          name="subcategory"
          label="Subcategory"
          placeholder="Subcategory"
          register={register}
          error={errors.subcategory}
          className="flex-1"
        />
      </div>

      <FormField
        name="brand"
        label="Brand"
        placeholder="Brand"
        register={register}
        error={errors.brand}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => {
          const currentTags = field.value || []

          return (
            <div className="flex flex-col gap-2">
              <FormField
                label="Tags"
                placeholder="Type a tag and press Enter"
                error={errors.tags}
                {...field}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()

                    const newTag = tagInput.trim()
                    if (newTag && !currentTags.includes(newTag)) {
                      field.onChange([...currentTags, newTag])
                    }
                    setTagInput('')
                  }
                }}
              />

              {currentTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentTags.map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-200"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => {
                          const filtered = currentTags.filter((t) => t !== tag)
                          field.onChange(filtered)
                        }}
                        className="ml-1 cursor-pointer text-neutral-500 hover:text-neutral-900"
                      >
                        <LuX />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        }}
      />

      <div className="flex flex-col">
        <FormField
          type="checkbox"
          name="isActive"
          label="Active"
          register={register}
          className="flex-row-reverse justify-end gap-4 [[type='checkbox']]:cursor-pointer"
        />

        <FormField
          type="checkbox"
          name="featured"
          label="Featured"
          register={register}
          className="flex-row-reverse justify-end gap-4 [[type='checkbox']]:cursor-pointer"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={editingProduct || creatingProduct}>
          {editingProduct || creatingProduct ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button type="reset" variant="ghostDanger" onClick={reset}>
          Reset
        </Button>
        {pathname === '/products' || (
          <Link to="/products">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
        )}
      </div>
    </form>
  )
}
