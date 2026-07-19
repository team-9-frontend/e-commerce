import { useEffect, useState } from 'react'

import { api } from '@repo/api'

export default function AdminProductAdd() {
  const [products, setProducts] = useState([])
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    name: '',
    shortDescription: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: [],
  })

  // get products
  const load = async () => {
    try {
      const res = await api.get('/products')

      console.log(res.data)

      setProducts(res.data.products || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // set & edit products
  const submit = async (e) => {
    e.preventDefault()

    const fd = new FormData()

    fd.append('name', form.name)
    fd.append('shortDescription', form.shortDescription)
    fd.append('description', form.description)
    fd.append('price', form.price)
    fd.append('stock', form.stock)
    fd.append('category', form.category)

    form.images.forEach((img) => {
      fd.append('images', img)
    })

    if (editId) {
      await api.patch(`/products/update/${editId}`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } else {
      await api.post('/products', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }

    setForm({
      name: '',
      shortDescription: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      images: [],
    })

    setEditId(null)
    load()
  }

  // deleteProduct
  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`)
    load()
  }

  // editProduct
  const editProduct = (product) => {
    setEditId(product._id)

    setForm({
      name: product.name || '',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      price: product.price || '',
      stock: product.stock || '',
      category: product.category || '',
      images: [],
    })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products CRUD</h1>

      <form onSubmit={submit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Short Description"
            value={form.shortDescription}
            onChange={(e) =>
              setForm({
                ...form,
                shortDescription: e.target.value,
              })
            }
          />
        </div>

        <div>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setForm({
                ...form,
                images: Array.from(e.target.files),
              })
            }
          />
        </div>

        <button type="submit">{editId ? 'Update Product' : 'Add Product'}</button>
      </form>

      <hr />

      <h2>Products List</h2>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <h3>{product.name}</h3>

          <p>Price: {product.price}</p>

          <button onClick={() => editProduct(product)}>Edit</button>

          <button onClick={() => deleteProduct(product._id)} style={{ marginLeft: '10px' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
