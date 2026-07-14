import Button from './Button'
import Dialog from './Dialog'

export default function ConfirmDialog({
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
    onClose?.()
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
      <p className="mb-6 text-center text-neutral-500">{message}</p>

      <div className="flex gap-4">
        <Button onClick={handleClose} variant="outline" className="flex-center flex-1">
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={isLoading}
          variant="outlineDanger"
          className="flex-center flex-1"
        >
          {!isLoading ? 'Confirm' : 'Loading...'}
        </Button>
      </div>
    </Dialog>
  )
}
