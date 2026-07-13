import { cn } from '../../utils'

export default function Modal({ isOpen, onClose, title, children, className }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={cn('w-full max-w-md rounded-lg bg-white p-6 shadow-lg', className)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Body */}
        {children}
      </div>
    </div>
  )
}
