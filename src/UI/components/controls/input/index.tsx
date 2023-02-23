/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, VNode } from 'preact'
import { FC } from 'preact/compat'
import { Path, UseFormRegister } from 'react-hook-form'
interface Props {
  label?: string
  type: string
  value: string
  onChange: (value: string) => void
  min?: string
  max?: string
  disabled?: boolean
  customClass?: string
  id?: string
  onBlur: () => void
}

const Input: FC<Props> = ({
  label,
  type,
  value,
  min,
  max,
  disabled,
  customClass,
  onChange,
  id,
  onBlur,
}) => {
  return (
    <label className="ts-flex ts-flex-col ts-text-durkLabel ts-font-normal ts-text-sm">
      {label}
      <input
        id={`input_${id}`}
        data-testid={`select_${id}`}
        min={min}
        max={max}
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e): void => {
          onChange((e.target as HTMLInputElement).value)
        }}
        onBlur={() => onBlur()}
        className={`ts-shadow-input ts-text-sm ts-text-default ts-border-gray-border ts-rounded ts-h-8 ts-p-2 focus:ts-outline-none focus:ts-ring-2 focus:ts-ring-blue-800 focus:ts-border-transparent disabled:ts-bg-gradient-to-b disabled:ts-appearance-none disabled:ts-from-gray-light-400 disabled:ts-to-gray-light-400 disabled:ts-text-secondary disabled:ts-text-opacity-50 disabled:ts-border-gray-600 disabled:ts-cursor-not-allowed
        ${customClass && customClass}
        `}
      />
    </label>
  )
}

export interface IFormValues {
  clientId: string
  clientSecret: string
  moveUp: number
}

type InputProps = {
  label: string
  register: UseFormRegister<IFormValues>
  required: boolean
  registerName: Path<IFormValues>
  type?: string
  disabled?: boolean
  isError?: boolean
  customClass?: string
  iconAfterLabel?: VNode
  id?: string
}

export const InputH: FC<InputProps> = ({
  label,
  register,
  required,
  registerName,
  type,
  disabled,
  isError,
  customClass,
  iconAfterLabel,
  id,
}) => (
  <label
    id={`input_Wrapper_${id}`}
    data-testid={`input_Wrapper_${id}`}
    className="ts-flex ts-flex-col ts-text-durkLabel ts-font-normal ts-text-sm"
  >
    <div
      id={`input_label_${id}`}
      data-testid={`input_label_${id}`}
      className="ts-flex ts-items-center ts-gap-1"
    >
      {label}
      {iconAfterLabel && <div>{iconAfterLabel}</div>}
    </div>
    <input
      id={`input_${id}`}
      data-testid={`input_${id}`}
      type={type}
      disabled={disabled}
      {...register(registerName, { required })}
      className={`ts-shadow-input ts-text-sm ts-border-gray-border ts-rounded ts-h-8 ts-p-2 ts-mt-1 disabled:ts-bg-gradient-to-b disabled:ts-appearance-none disabled:ts-from-gray-light-400 disabled:ts-to-gray-light-400 disabled:ts-text-secondary disabled:ts-text-opacity-50 disabled:ts-border-gray-600 disabled:ts-cursor-not-allowed
                ${customClass && customClass}
                ${
                  isError
                    ? 'ts-bg-backgroundError ts-border ts-border-red-500 focus:ts-outline-none focus:ts-ring-2 focus:ts-ring-red-900 focus:ts-border-transparent'
                    : 'focus:ts-outline-none focus:ts-ring-2 focus:ts-ring-blue-800 focus:ts-border-transparent'
                }
                `}
    />
  </label>
)

export default Input
