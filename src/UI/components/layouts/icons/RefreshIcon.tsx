import { FC } from 'preact/compat'
import { h } from 'preact'

interface Props {
  customClass?: string
  color?: string
}

export const RefreshIcon: FC<Props> = ({ customClass }) => {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ts-h-4 ts-w-4 ${customClass}`}
    >
      <path
        d="M320 146C320 146 344.36 134 256 134C224.355 134 193.421 143.384 167.109 160.965C140.797 178.546 120.289 203.534 108.179 232.771C96.0693 262.007 92.9008 294.177 99.0744 325.214C105.248 356.251 120.487 384.761 142.863 407.137C165.239 429.513 193.749 444.752 224.786 450.926C255.823 457.099 287.993 453.931 317.229 441.821C346.466 429.711 371.454 409.203 389.035 382.891C406.616 356.579 416 325.645 416 294"
        stroke="#005AA0"
        stroke-width="32"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M256 58L336 138L256 218"
        stroke="#005AA0"
        stroke-width="32"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
