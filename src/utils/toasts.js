import reactToast from 'react-hot-toast'

export const toast = {
  success: (message) => reactToast.success(message),
  error: (message) => reactToast.error(message),
  loading: (message) => reactToast.loading(message),
  custom: (message) => reactToast(message),
}
