import api from '../client'

export const usersService = {
  getAll: () => api.get('/users/all').then((res) => res.data),
  getById: (id) => api.get(`/users/${id}`).then((res) => res.data),

  add: (data) => api.post('/users/add', data).then((res) => res.data),
  update: (id, data) => api.patch(`/users/${id}`, data).then((res) => res.data),
  remove: (id) => api.delete(`/users/${id}`).then((res) => res.data),
}
/*
{
  openAdd && (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="grid gap-8 lg:grid-cols-2">

        <div>
          <h2 className="mb-5 text-2xl font-bold dark:text-white">Add User</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="rounded-xl border p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-xl border p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="rounded-xl border p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-xl border p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </form>
        </div>


        <div className="flex flex-col">
          <h2 className="mb-5 text-2xl font-bold dark:text-white">Actions</h2>

          <div className="grid grid-cols-2 gap-3">
            <button className="rounded-xl bg-indigo-600 py-3 text-white">Create</button>

            <button
              type="button"
              onClick={() =>
                setFormData({
                  username: '',
                  email: '',
                  password: '',
                  phone: '',
                })
              }
              className="rounded-xl bg-gray-500 py-3 text-white"
            >
              Clear
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-xl bg-green-600 py-3 text-white"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setOpenAdd(false)}
              className="rounded-xl bg-red-600 py-3 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
*/
