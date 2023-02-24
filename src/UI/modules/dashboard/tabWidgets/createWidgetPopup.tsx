import { FC } from 'preact/compat'
import { h } from 'preact'
import Modal from '@/components/layouts/modal'
import Button, { ButtonThemes } from '@/components/controls/buttun'
import popupIcon from '@/assets/widgets-popup-icon.svg'
import { DASHBOADR_KEYS } from '@/locales/types'

interface Props {
  phrasesByKey: DASHBOADR_KEYS
  channelRef: string
  modalIsOpen: boolean
  setOpenModal: (value: boolean) => void
}

const CreateWidgetPopup: FC<Props> = ({ channelRef, phrasesByKey, setOpenModal, modalIsOpen }) => (
  <Modal
    showModal={modalIsOpen}
    footerContent={
      <div className="ts-flex ts-gap-2">
        <Button
          id={'cancelCreateWidgetPopup'}
          label={phrasesByKey.global_button_cancel}
          theme={ButtonThemes.Secondary}
          onClick={() => setOpenModal(false)}
        />
        <Button
          id={'submitCreateWidgetPopup'}
          label={phrasesByKey.application_widgets_popup_submit_text}
          theme={ButtonThemes.Primary}
          onClick={() => {
            window.open(
              `${phrasesByKey.application_widgets_popup_submit_url_1}?channels=${channelRef}`
            )
            setOpenModal(false)
          }}
        />
      </div>
    }
  >
    <div className="ts-w-full ts-flex ts-items-start">
      <img className="ts-w-20 ts-h-20" src={popupIcon} alt="widgets-popup-icon" />

      <div className="ts-ml-6">
        <p className="ts-text-default ts-text-md ts-font-bold ts-mb-6">
          {phrasesByKey.application_widgets_popup_title}
        </p>

        <p className="ts-whitespace-pre-wrap ts-text-default ts-text-sm ts-mb-4">
          {phrasesByKey.application_widgets_popup_text}
        </p>
      </div>
    </div>
  </Modal>
)

export default CreateWidgetPopup
