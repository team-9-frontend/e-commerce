import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export * from 'date-fns'
export * from 'next-themes'
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
