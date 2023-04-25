import { VNode, h } from 'preact'
import { FC } from 'preact/compat'

export enum ButtonThemes {
  Link = 'Link',
  Primary = 'Primary',
  Warning = 'Warning',
  Secondary = 'Secondary',
}

interface Props {
  label: Nullable<string | VNode>
  type?: string
  theme?: ButtonThemes
  disabled?: boolean
  onClick?: (value: Event) => void
  className?: string
  id?: string
}

const Button: FC<Props> = ({
  label = '',
  type,
  theme = ButtonThemes.Primary,
  disabled,
  onClick,
  className,
  id,
}) => {
  if (theme === ButtonThemes.Link) {
    return (
      <button
        id={`button_${id}`}
        data-testid={`button_${id}`}
        type={type}
        className="ts-text-primary ts-text-sm ts-font-normal disabled:ts-text-secondary disabled:ts-cursor-not-allowed"
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    )
  }
  return (
    <button
      id={`button_${id}`}
      data-testid={`button_${id}`}
      disabled={disabled}
      className={`ts-h-8 ts-w-max ts-px-4 ts-py-2 ts-rounded ts-border ts-text-sm ts-font-bold ts-flex ts-items-center
      ts-justify-center disabled:ts-bg-gradient-to-b disabled:ts-appearance-none disabled:ts-from-gray-light-400
      disabled:ts-to-gray-light-400 disabled:ts-text-secondary disabled:ts-text-opacity-50 disabled:ts-border-gray-600 disabled:ts-cursor-not-allowed
      ${
        theme === ButtonThemes.Secondary
          ? 'ts-text-blue-700 ts-bg-gradient-to-b ts-appearance-none ts-from-gray-light-500 ts-to-gray-100 ts-border-gray-200 hover:ts-outline-none hover:ts-bg-gradient-to-b hover:ts-from-white hover:ts-gray-light-500 active:ts-outline-none active:ts-bg-gradient-to-b active:ts-from-gray-100 active:ts-to-gray-light-500 '
          : theme === ButtonThemes.Warning
          ? 'ts-text-red-900 ts-border-red-800 hover:ts-outline-none ts-bg-gradient-to-b ts-appearance-none ts-from-gray-light-500 ts-to-gray-100 hover:ts-bg-gradient-to-b hover:ts-from-white hover:ts-gray-light-500 active:ts-outline-none active:ts-bg-gradient-to-b active:ts-from-gray-100 active:ts-to-gray-light-500'
          : 'ts-text-white ts-bg-gradient-to-b ts-appearance-none ts-from-blue-500 ts-to-blue-700 ts-border-blue-800 hover:ts-outline-none hover:ts-bg-gradient-to-b hover:ts-from-blue-400 hover:ts-to-blue-600 hover:ts-border-blue-700 active:ts-outline-none active:ts-bg-gradient-to-b active:ts-from-blue-700 active:ts-to-blue-500 active:ts-border-blue-800 ts-transition-all'
      } ${className}`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
