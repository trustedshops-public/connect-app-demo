import { ComponentChildren, VNode, h } from 'preact'
import { FC, useState } from 'preact/compat'

interface Props {
  children: ComponentChildren
  content: string | VNode
  isInfo?: boolean
}

const Tooltip: FC<Props> = ({ children, content, isInfo }) => {
  let timeout: ReturnType<typeof setTimeout>
  const [isOpen, setIsOpen] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setIsOpen(true)
    }, 100)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setIsOpen(false)
  }

  return (
    <div className="ts-relative ts-w-max ts-pr-4" onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}

      {isOpen && (
        <div className="ts-flex">
          <div
            className={`ts-w-max ts-p-3 ts-absolute ts-left-10 ts-top-1/2 ts-z-50 ts-transform ts-translate-x-0 ts--translate-y-2/4 ts-rounded ts-bg-white
            ${
              isInfo
                ? 'ts-max-w-tooltip ts-w-max ts-text-light ts-bg-gray-700 ts-text-xs'
                : 'ts-border ts-border-gray-700 ts-box-border'
            }`}
          >
            <div className="ts-w-3 ts-overflow-hidden ts-absolute ts--left-3 ts-top-1/2 ts-z-10 ts--translate-y-2/4">
              <div
                className={`ts-h-4 ts-bg-white ts--rotate-45 ts-transform ts-origin-top-right ${
                  isInfo ? 'ts-bg-gray-700' : 'ts-border ts-border-gray-700 ts-box-border'
                }`}
              />
            </div>

            {content}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
