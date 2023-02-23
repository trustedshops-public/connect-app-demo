import { ComponentChildren, h } from 'preact'
import { FC } from 'preact/compat'

interface Props {
  children: ComponentChildren
  isActive?: boolean
  customClass?: string
}

const BackgroundCard: FC<Props> = ({ children, isActive, customClass }) => {
  return (
    <div
      className={`ts-shadow-md ts-rounded ts-w-full ts-h-auto 
      ${
        isActive
          ? 'ts-h-auto ts-w-full ts-bg-white'
          : 'ts-max-w-backgroundCard ts-bg-backgroundCard ts-mt-4 ts-mx-auto'
      }
      ${customClass}`}
    >
      {children}
    </div>
  )
}

export default BackgroundCard
