import { FC } from 'preact/compat'
import { h } from 'preact'

interface Props {
  label: string
  isWarning?: boolean
}

const Tag: FC<Props> = ({ label, isWarning }: Props) => {
  return (
    <div
      className={`ts-px-1 ts-h-4 ts-flex ts-items-center ts-w-max ts-text-xxs ts-text-white ts-rounded ${
        isWarning ? 'ts-bg-red-500' : 'ts-bg-green-500'
      }`}
    >
      {label}
    </div>
  )
}

export default Tag
