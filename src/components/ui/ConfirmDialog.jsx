import Button from './Button'
import Dialog from './Dialog'

export default function ConfirmDialog({
  className,
  isOpen,
  setIsOpen,
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
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen} title={title} className={className}>
      <div className="flex flex-col gap-6">
        <p className="text-center text-neutral-500">{message}</p>

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
      </div>
    </Dialog>
  )
}
