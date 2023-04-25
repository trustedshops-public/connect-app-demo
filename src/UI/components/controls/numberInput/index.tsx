import { FC, useEffect, useState } from 'preact/compat'
import Input from '../input'
import { h } from 'preact'
import './style.css' // TODO: https://github.com/tailwindlabs/tailwindcss/issues/1101

interface Props {
  value: string | number | undefined
  onChange: (value: string) => void
  min?: string | number
  max?: string | number
  disabled?: boolean
  id?: string
}

const NumberInput: FC<Props> = ({ value = '', min, max, disabled, onChange, id }) => {
  const [val, setVal] = useState<number | string>(validateValue(value).toString())

  useEffect(() => {
    if (!value) return

    setVal(validateValue(value).toString())
  }, [value])

  function validateValue(value: string | number): number | string {
    if (value !== '' && min !== undefined && max !== undefined) {
      if (Number(value) < Number(min)) {
        value = min
      }
      if (Number(value) > Number(max)) {
        value = max
      }
    }
    return value
  }

  const onChangeValue = (value: string | number): string => {
    value = validateValue(value)
    setVal(value.toString())
    return value.toString()
  }

  return (
    <div className={`ts-relative ts-w-full`}>
      <Input
        id={`number_${id}`}
        type="number"
        value={val.toString()}
        onChange={onChangeValue}
        min={min?.toString()}
        max={max?.toString()}
        disabled={disabled}
        onBlur={() => onChange(val.toString())}
        customClass="[appearance:textfield] "
      />
      <div className="ts-absolute ts-right-0 ts-h-8 ts-top-0 ts-rounded-r">
        <button
          id={`input_number_increment_${id}`}
          data-testid={`input_number_increment_${id}`}
          disabled={disabled}
          onClick={() => {
            onChange(onChangeValue(+val + 1))
          }}
          className={`ts-h-4 ts-w-6 ts-bg-gray-400 ts-flex ts-items-center ts-justify-center ts-border ts-border-gray-100 ts-rounded-tr ts-bg-gradient-to-b ts-appearance-none ts-from-gray-light-500 ts-to-gray-light-200 hover:ts-outline-none hover:ts-bg-gradient-to-b hover:ts-from-white hover:ts-gray-light-500
            ${disabled && 'ts-opacity-25 ts-cursor-not-allowed'}`}
        >
          +
        </button>
        <button
          id={`input_number_decrement_${id}`}
          data-testid={`input_number_decrement_${id}`}
          disabled={disabled}
          onClick={() => {
            onChange(onChangeValue(+val - 1))
          }}
          className={`ts-h-4 ts-w-6 ts-bg-gray-400 ts-flex ts-items-center ts-justify-center ts-border ts-border-gray-100 ts-rounded-br ts-bg-gradient-to-b ts-appearance-none ts-from-gray-light-500 ts-to-gray-light-200 hover:ts-outline-none hover:ts-bg-gradient-to-b hover:ts-from-white hover:ts-gray-light-500
            ${disabled && 'ts-opacity-25 ts-cursor-not-allowed'}`}
        >
          -
        </button>
      </div>
    </div>
  )
}

export default NumberInput
