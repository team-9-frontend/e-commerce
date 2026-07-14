import { clsx } from 'clsx'
import reactToast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const toast = {
  success: (message) => reactToast.success(message),
  error: (message) => reactToast.error(message),
  loading: (message) => reactToast.loading(message),
  custom: (message) => reactToast(message),
}
