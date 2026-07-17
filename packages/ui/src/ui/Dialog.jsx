import { LuX } from 'react-icons/lu'

import { cn } from '@repo/utils'

import { Button } from './Button'

export function Dialog({
  children,
  className,
  isOpen,
  setIsOpen,
  onClose,
  title,
  position = 'center',
}) {
  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-100 flex bg-black/50 transition-all',
        position === 'bottom' && 'items-end justify-stretch',
        position === 'top' && 'items-start justify-stretch',
        position === 'right' && 'items-stretch justify-end',
        position === 'left' && 'items-stretch justify-start',
        position === 'center' && 'items-center justify-center p-6',
        isOpen ? 'opacity-100' : 'invisible opacity-0',
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          'card flex w-full max-w-md flex-col gap-4 overflow-scroll p-6 transition-all',
          position === 'bottom' && 'max-w-none translate-y-full rounded',
          position === 'top' && 'max-w-none -translate-y-full rounded',
          position === 'right' && 'translate-x-full rounded',
          position === 'left' && '-translate-x-full rounded',
          position === 'center' && !isOpen && 'scale-80',
          isOpen ? 'translate-0 opacity-100' : 'invisible opacity-0',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm tracking-wider text-neutral-950 uppercase">{title}</h2>

          <Button
            onClick={handleClose}
            variant="ghostDanger"
            size="md-square"
            className="text-neutral-500"
          >
            <LuX />
          </Button>
        </div>

        {children}
      </div>
    </div>
  )
}
