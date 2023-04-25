import { ComponentChildren, h } from 'preact'
import { FC } from 'preact/compat'

interface Props {
  children: ComponentChildren
  value: string | number
  id: string | number
  disabled?: boolean
  customClass?: string
  onClick?: () => void
}

const Radio: FC<Props> = ({ value, id, disabled, children, customClass, onClick }) => {
  return (
    <div
      onClick={() => {
        if (disabled || typeof onClick === 'undefined') return
        onClick()
      }}
      className={`ts-flex ts-cursor-pointer ${customClass} ${
        disabled && 'ts-opacity-25 ts-cursor-not-allowed'
      }`}
      id={id.toString()}
    >
      <input type="radio" id={id.toString()} className="ts-hidden" />

      <div
        id={id.toString()}
        className={`ts-flex ts-items-center ts-justify-center ts-h-[18px] ts-w-[18px] ts-rounded-full active:ts-bg-green-400 focus:ts-border-green-600
            ${
              value === id.toString()
                ? 'ts-border ts-border-green-600 ts-bg-green-500'
                : 'ts-border ts-border-gray-500'
            }`}
      >
        <div
          id={id.toString()}
          className="ts-h-1/2 ts-w-1/2 ts-rounded-full ts-bg-white ts-m-auto"
        />
      </div>

      <label
        id={id.toString()}
        className="ts-text-base ts-font-medium ts-text-default ts-ml-2 ts-block ts-cursor-pointer"
      >
        {children}
      </label>
    </div>
  )
}

export default Radio
