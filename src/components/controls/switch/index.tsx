import { FC } from 'preact/compat'
import { h } from 'preact'

interface Props {
  isToggle: boolean
  setIsToggle: (isToggled: boolean) => void
  labelOn: string | undefined
  labelOff: string | undefined
  disabled?: boolean
  id?: string
}

const Switch: FC<Props> = ({ labelOn, labelOff, isToggle, disabled, setIsToggle, id }) => {
  return (
    <div
      id={`switch_${id}`}
      className={`ts-flex ts-gap-2 ts-items-center ts-w-28 ${disabled && 'ts-opacity-25'}`}
    >
      <div
        id={`switch_button_${id}`}
        className={`ts-w-switch ts-h-switch ts-flex ts-items-center ts-border ts-rounded-full ts-cursor-pointer
        ${isToggle ? 'ts-bg-green-500 ts-border-green-600' : ' ts-bg-gray-100 ts-border-gray-200'} 
        ${disabled && 'ts-cursor-not-allowed'}`}
        onClick={() => {
          if (disabled) return
          setIsToggle(!isToggle)
        }}
      >
        <div
          className={`ts-bg-white ts--left-1 ts-h-5 ts-w-5 ts-border ts-border-gray-200 ts-rounded-full ts-shadow-switch ts-transform ts-duration-200 ts-ease-in-out
          ${isToggle ? 'ts-transform ts-translate-x-switch' : null}`}
        />
      </div>
      <p id={`switch_label_${id}`} className="ts-text-sm ts-text-default">
        {isToggle ? labelOn : labelOff}
      </p>
    </div>
  )
}

export default Switch
