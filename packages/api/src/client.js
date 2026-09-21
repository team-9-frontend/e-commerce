import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = error.response?.data ?? { message: error.message }
    return Promise.reject(customError)
  },
)

export default api
