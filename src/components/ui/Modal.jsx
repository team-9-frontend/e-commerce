import { LuX } from 'react-icons/lu'

import { cn } from '@/utils'

export default function Modal({ children, className, isOpen, setIsOpen, onClose, title }) {
  if (!isOpen) return null

  const handleClose = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  return (
    <div className="fixed inset-0 z-100 flex cursor-default items-center justify-center bg-black/50">
      <div
        className={cn('card w-full max-w-md p-6', className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>

          <button
            onClick={handleClose}
            className="cursor-pointer text-neutral-500 hover:text-red-600 dark:hover:text-red-400"
          >
            <LuX size={24} />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}
