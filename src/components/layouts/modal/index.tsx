import { ComponentChildren, VNode, h, Fragment } from 'preact'
import { FC } from 'preact/compat'
import BackgroundCard from '@/components/layouts/backgroundCard'

interface Props {
  children?: ComponentChildren
  showModal: boolean
  footerContent?: VNode
}

const Modal: FC<Props> = ({ children, showModal, footerContent }) => {
  return (
    <>
      {showModal && (
        <>
          <div className="ts-justify-center ts-items-center ts-flex ts-overflow-x-hidden ts-overflow-y-auto ts-fixed ts-inset-0 ts-z-50 ts-outline-none focus:ts-outline-none">
            <div className="ts-relative ts-w-auto ts-my-6 ts-mx-auto">
              <BackgroundCard isActive>
                <div className="ts-relative ts-p-8 ts-flex-auto">{children}</div>
                <div className="ts-flex ts-items-center ts-justify-end ts-h-16 ts-p-4 ts-bg-gray-light-400 ts-rounded-b">
                  {footerContent}
                </div>
              </BackgroundCard>
            </div>
          </div>
          <div className="ts-opacity-50 ts-fixed ts-inset-0 ts-z-40 ts-bg-black" />
        </>
      )}
    </>
  )
}

export default Modal
