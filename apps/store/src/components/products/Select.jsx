import { useEffect, useRef, useState } from 'react'

import { LuChevronDown } from 'react-icons/lu'

import { cn } from '@repo/utils'

export default function Select({
options = [],
value,
onChange,
placeholder = 'Select option...',
className,
buttonClassName,
menuClassName,
optionClassName,
}) {
const [isOpen, setIsOpen] = useState(false)
const menuRef = useRef(null)

useEffect(() => {
const handleClickOutside = (event) => {
if (menuRef.current && !menuRef.current.contains(event.target)) {
setIsOpen(false)
}
}


const handleEscape = (event) => {
  if (event.key === 'Escape') {
    setIsOpen(false)
  }
}

document.addEventListener('mousedown', handleClickOutside)
document.addEventListener('keydown', handleEscape)

return () => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
}


}, [])

const normalizedOptions = options.map((opt) =>
typeof opt === 'object' ? opt : { label: opt, value: opt },
)

const selectedOption = normalizedOptions.find((opt) => opt.value === value)

const handleSelect = (val) => {
onChange?.(val)
setIsOpen(false)
}

return (
<div className={cn('relative w-full', className)} ref={menuRef}>
<button
type="button"
onClick={() => setIsOpen((prev) => !prev)}
aria-expanded={isOpen}
aria-haspopup="listbox"
className={cn(
'focus:border-accent-500 flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-950 transition duration-200 focus:outline-none dark:border-neutral-300/50 dark:bg-neutral-200',
buttonClassName,
)}
> <span>{selectedOption ? selectedOption.label : placeholder}</span>


    <LuChevronDown
      className={cn(
        'h-4 w-4 text-neutral-500 transition-transform duration-200',
        isOpen && 'rotate-180',
      )}
    />
  </button>

  {isOpen && normalizedOptions.length > 0 && (
    <div
      role="listbox"
      className={cn(
        'absolute z-50 mt-1.5 w-full rounded-lg border border-neutral-200 bg-neutral-50 p-1 shadow-lg focus:outline-none',
        menuClassName,
      )}
    >
      <div className="max-h-60 overflow-auto">
        {normalizedOptions.map((option) => {
          const isSelected = option.value === value

          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-start text-sm transition duration-150',
                isSelected
                  ? 'bg-accent-500/10 text-accent-500 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-200/50 hover:text-neutral-950',
                optionClassName,
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )}
</div>


)
}
