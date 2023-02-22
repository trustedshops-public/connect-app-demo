import { ComponentChildren, h } from 'preact'
import { useRef, useState } from 'preact/hooks'
import { FC } from 'preact/compat'
import { ChevronDownIcon } from '@/components/layouts/icons'

interface Props {
  children: ComponentChildren
  defaultValue: Nullable<string | undefined>
  placeholder?: string
  disabled?: boolean
  isError?: boolean
  id?: string
}

const Select: FC<Props> = ({ children, defaultValue, placeholder, disabled, isError, id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectPlaceholder = placeholder || 'Select ...'
  const btnRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="ts-relative">
      <button
        ref={btnRef}
        id={`select_${id}`}
        data-testid={`select_${id}`}
        onClick={() => {
          setIsOpen(!isOpen)
          !isOpen && btnRef && btnRef.current && btnRef.current.focus()
        }}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 400)
        }}
        disabled={disabled}
        className={`ts-flex ts-justify-between ts-items-center ts-h-8 ts-w-full ts-border-solid	ts-border ts-rounded focus:ts-outline-none focus:ts-ring-2 focus:ts-ring-blue-800 focus:ts-border-transparent ts-pl-2 ts-pr-1
        ${disabled && 'ts-opacity-25 ts-cursor-not-allowed'}
         ${
           isError
             ? 'ts-bg-backgroundError ts-border-red-500'
             : 'ts-bg-gradient-to-b ts-appearance-none ts-from-gray-light-100 ts-to-gray-light-200 ts-border-gray-border hover:ts-outline-none hover:ts-border-gray-400 hover:ts-bg-gradient-to-b hover:ts-appearance-none hover:ts-from-white hover:ts-to-gray-light-300'
         }`}
      >
        <p
          id={`selectValue_${id}`}
          data-testid={`selectValue_ ${id}`}
          className="ts-text-default ts-font-normal ts-text-sm ts-truncate"
        >
          {defaultValue || selectPlaceholder}
        </p>
        <ChevronDownIcon
          customClass={`"ts-fill-current ts-h-6 ts-w-6 ts-transform ${
            isOpen && 'ts--rotate-180'
          } ts-transition ts-duration-150 ts-ease-in-out"`}
        />
      </button>
      {isOpen && (
        <div className="ts-absolute ts-w-full ts-bg-white ts-border ts-rounded ts-max-h-80 ts-overflow-auto ts-shadow-md ts-z-10">
          <ul id={`listContainer_${id}`} data-testid={`listContainer_${id}`}>
            {children}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Select
