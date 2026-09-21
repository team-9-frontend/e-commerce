import axios from 'axios'

const api = axios.create({
  baseURL: 'https://e-commerce-api-3wara.vercel.app/',
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
