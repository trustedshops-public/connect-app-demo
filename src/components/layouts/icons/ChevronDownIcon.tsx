import { FC } from 'preact/compat'
import { h } from 'preact'
interface Props {
  customClass?: string
}

export const ChevronDownIcon: FC<Props> = ({ customClass }) => {
  return (
    <span>
      <svg
        className={`ts-text-default ${customClass}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </span>
  )
}

export const ChevronDownIconSolid: FC<Props> = ({ customClass }) => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`ts-text-default ${customClass}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )
}
