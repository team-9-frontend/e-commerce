import { LuLoaderCircle } from 'react-icons/lu'

import { Button } from './Button'
import { Dialog } from './Dialog'

export function ConfirmDialog({
  className,
  isOpen,
  setIsOpen,
  onClose,
  onConfirm,
  isLoading,
  title = 'Confirm Action',
  message = 'Are you sure?',
}) {
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleConfirm = () => {
    onConfirm?.()
  }

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={onClose}
      title={title}
      className={className}
    >
      <div className="flex flex-col gap-6">
        <p className="text-center text-neutral-500">{message}</p>

        <div className="flex gap-4">
          <Button onClick={handleClose} variant="outline" className="flex-1">
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            variant="outlineDanger"
            className="flex-1"
          >
            {!isLoading ? 'Confirm' : <LuLoaderCircle className="h-[1.5em] animate-spin" />}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
