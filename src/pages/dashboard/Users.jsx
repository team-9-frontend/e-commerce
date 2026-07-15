import { useState } from 'react'
import { FaEdit, FaPlus, FaShieldAlt, FaUser } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { FiX } from 'react-icons/fi'
import { HiUsers } from 'react-icons/hi'
import { IoShieldCheckmarkSharp } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { useAddUser, useDeleteUser, useGetAllUsers, useUpdateUser } from '../../api/hooks/useUsers'

export default function AdminUsers() {
  const { data, isLoading, error } = useGetAllUsers()
  const addUser = useAddUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()
  const [openAdd, setOpenAdd] = useState(false)
  const [openedit, setOpenedit] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [search, setSearch] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  })

  const [editData, setEditData] = useState({
    username: '',
    phone: '',
    avatar: '',
  })
  const handleOpenEdit = (user) => {
    setSelectedUser(user)

    setEditData({
      username: user.username,
      phone: user.phone,
      avatar: user.avatar || '',
    })

    setOpenEdit(true)
  }
  const handleEditchange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }
  const handleUpdate = (e) => {
    e.preventDefault()

    if (!selectedUser) return

    updateUser.mutate({
      id: selectedUser._id,
      data: editData,
    })
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addUser.mutate(formData, {
      onSuccess: () => {
        setOpenAdd(false)

        setFormData({
          username: '',
          email: '',
          password: '',
          phone: '',
        })
      },
    })
  }

  const users = data?.users || []

  const totalUsers = users.length

  const admins = users.filter((user) => user.role === 'admin').length

  const customers = users.filter((user) => user.role === 'customer').length

  const verified = users.filter((user) => user.isVerified).length

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  )
  console.log(data)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Error loading users</h2>
  }
  console.log(openAdd)

  return (
    <div className="p-6">
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">USER MANAGEMENT</h1>

            <p className="text-gray-500 dark:text-gray-400">Manage User</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 rounded-xl border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />

            <button
              onClick={() => setOpenAdd(!openAdd)}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              <span className="flex items-center gap-2">
                <FaPlus /> Add User
              </span>
            </button>
          </div>
        </div>
      </div>
      {openAdd && (
        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-8 flex items-start justify-between border-b border-gray-200 pb-6 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-indigo-100 p-4 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <FaUser size={26} />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Create New User
                </h2>

                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Fill in the details below to create a new user
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpenAdd(false)}
              className="rounded-xl p-2 text-2xl text-gray-500 transition hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
            >
              <FiX />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                  USERNAME
                </label>

                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                  EMAIL
                </label>

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@gmail.com"
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                  PASSWORD
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                  PHONE
                </label>

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g+12123444"
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>
            <div className="mt-8 flex justify-end gap-3">
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
                className="rounded-xl bg-gray-500 px-6 py-3 text-white"
              >
                Clear
              </button>

              <button type="submit" className="rounded-xl bg-indigo-600 px-6 py-3 text-white">
                {addUser.isPending ? 'Saving...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-lg dark:bg-gray-900 dark:shadow-gray-900/30">
          <div>
            <h3 className="text-gray-500 dark:text-gray-400">Total Users</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
          </div>

          <div className="rounded-xl bg-blue-100 p-4 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <HiUsers size={28} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-lg dark:bg-gray-900 dark:shadow-gray-900/30">
          <div>
            <h3 className="text-gray-500 dark:text-gray-400">Admins</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{admins}</p>
          </div>

          <div className="rounded-xl bg-red-100 p-4 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <FaShieldAlt size={28} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-lg dark:bg-gray-900 dark:shadow-gray-900/30">
          <div>
            <h3 className="text-gray-500 dark:text-gray-400">Customers</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{customers}</p>
          </div>

          <div className="rounded-xl bg-green-100 p-4 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <HiUsers size={28} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-lg dark:bg-gray-900 dark:shadow-gray-900/30">
          <div>
            <h3 className="text-gray-500 dark:text-gray-400">Verified</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{verified}</p>
          </div>

          <div className="rounded-xl bg-cyan-100 p-4 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
            <FaUser size={28} />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
        {' '}
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            {' '}
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Verified</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.username} className="h-12 w-12 rounded-full" />

                    <div>
                      <h3 className="font-semibold">{user.username}</h3>

                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      user.role === 'admin'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  {user.isVerified ? (
                    <span className="flex items-center gap-2 font-medium text-green-600 dark:text-green-400">
                      <FaCheck className="text-sm" />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 font-medium text-red-600 dark:text-red-400">
                      <FiX className="text-sm" />
                      No
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(user)}
                      className="rounded bg-blue-500 px-3 py-2 text-white"
                    >
                      <FaEdit />
                    </button>
                    <button className="rounded bg-green-500 px-3 py-2 text-white">
                      <IoShieldCheckmarkSharp />{' '}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this user?')) {
                          deleteUser.mutate(user._id)
                        }
                      }}
                      className="rounded bg-red-500 px-3 py-2 text-white"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900">
            <button
              onClick={() => setOpenedit(false)}
              className="absolute top-5 right-5 text-2xl text-gray-500 transition hover:text-red-500"
            >
              <FiX />
            </button>

            <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Edit User</h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">
                  USERNAME
                </label>

                <input
                  type="text"
                  name="username"
                  value={editData.username}
                  onChange={handleEditchange}
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">
                  PHONE
                </label>

                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditchange}
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">
                  AVATER URL
                </label>

                <input
                  type="text"
                  name="avatar"
                  value={editData.avatar}
                  onChange={handleEditchange}
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
