import { h } from 'preact'
import { FC } from 'preact/compat'
import Button, { ButtonThemes } from '@/components/controls/buttun'
import Modal from '@/components/layouts/modal'
import { dispatchAction, EVENTS } from '@/eventsLib'
import settingsImg from '@/assets/Feature_related_Settings.svg'

import ChannelSelectionForm from './channelSelectionForm'
import { DASHBOADR_KEYS } from '@/locales/types'
import useStore from '@/store/useStore'
import { selectorChannels } from '@/store/selector'

interface Props {
  phrasesByKey: Nullable<DASHBOADR_KEYS>
  showModal: boolean
  setShowModal: (value: boolean) => void
}

const ChannelSelectModal: FC<Props> = ({ phrasesByKey, showModal, setShowModal }) => {
  const { setIsLoadingSave } = useStore()
  const { selectedChannels } = useStore(selectorChannels)

  const saveChannelsInBL = () => {
    setIsLoadingSave(true)
    dispatchAction({
      action: EVENTS.SAVE_MAPPED_CHANNEL,
      payload: selectedChannels,
    })
    setShowModal(false)
  }

  return (
    <Modal
      showModal={showModal}
      footerContent={
        <div className="ts-flex ts-gap-2">
          <Button
            id={'saveChannelsModal'}
            label={phrasesByKey && phrasesByKey.channelSelect_submit}
            theme={ButtonThemes.Primary}
            disabled={!selectedChannels.length}
            onClick={() => saveChannelsInBL()}
          />
        </div>
      }
    >
      <div className="ts-font-sans ts-flex ts-w-max">
        <span className="ts-w-20 ts-h-20">
          <img src={settingsImg} alt="settings" />
        </span>
        <div className="ts-ml-8">
          <p className="ts-mb-8 ts-text-default ts-text-md ts-font-bold">
            {phrasesByKey?.channelSelect_titel}
          </p>

          <ChannelSelectionForm phrasesByKey={phrasesByKey} />
          <p className="ts-text-default ts-text-sm ts-font-normal ts-mt-6">
            {phrasesByKey?.channelSelect_info}
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default ChannelSelectModal
