import { FC } from 'preact/compat'
import { h } from 'preact'

export const CheckIcon: FC<{ color?: string }> = ({ color = 'ts-text-green-500' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`ts-h-8 ts-w-8 ${color}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)
