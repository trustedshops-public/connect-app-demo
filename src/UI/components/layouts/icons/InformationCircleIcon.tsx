import { h } from 'preact'
import { FC } from 'preact/compat'

interface Props {
  customClass?: string
}

export const InformationCircleIcon: FC<Props> = ({ customClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`ts-h-4 ts-w-4 ${customClass}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
