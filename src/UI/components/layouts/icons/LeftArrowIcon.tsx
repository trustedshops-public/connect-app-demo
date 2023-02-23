import { FC } from 'preact/compat'
import { h } from 'preact'

export const LeftArrowIcon: FC<{ color?: string }> = ({ color = 'ts-text-gray-200' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`ts-h-8 ts-w-8 ${color}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)
