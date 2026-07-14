import Button from './Button'
import Modal from './Modal'

export default function ConfirmDialog({
  isOpen,
  setIsOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure?',
}) {
  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  const handleConfirm = () => {
    setIsOpen(false)
    onConfirm?.()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onClose} title={title}>
      <p className="mb-6 text-center text-neutral-500">{message}</p>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleClose} className="flex-center flex-1">
          Cancel
        </Button>

        <Button variant="outlineDanger" onClick={handleConfirm} className="flex-center flex-1">
          Confirm
        </Button>
      </div>
    </Modal>
  )
}
