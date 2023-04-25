import { FC } from 'preact/compat'
import { h } from 'preact'

export const CloseIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ts-h-6 ts-w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)
