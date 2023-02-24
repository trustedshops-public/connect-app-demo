import { h, Fragment } from 'preact'
import { FC, useEffect, useState } from 'preact/compat'
import _ from 'lodash'
import ChannelSelectionForm from '@/modules/dashboard/channelSelectionForm'
import Button, { ButtonThemes } from '@/components/controls/buttun'
import { dispatchAction, EVENTS } from '@/eventsLib'
import TextWithLink from '@/components/layouts/textWithLink'
import { ScrinSpinner } from '@/components/layouts/spinner'
import tabIcon from '@/assets/settings-tab-icon.svg'
import warnIcon from '@/assets/settings-tab-warn-icon.svg'
import { DASHBOADR_KEYS } from '@/locales/types'
import useStore from '@/store/useStore'
import { selectorChannels } from '@/store/selector'
import warnIconOrange from '@/assets/warning-sign.svg'
import ApproveDisconnectModal from './approveDisconnectModal'

interface Props {
  phrasesByKey: DASHBOADR_KEYS
}

const Divider = <div className="ts-h-[1px] ts-w-full ts-mb-6 ts-bg-gray-100" />

const SettingsTab: FC<Props> = ({ phrasesByKey }) => {
  const {
    isDisconnectLoading,
    selectedChannels,
    isLoadingSave,
    initialSelectedChannels,
    shopChannels,
  } = useStore(selectorChannels)

  const {
    setIsLoadingSave,
    setShowChannelModal,
    setIsDisconnectLoading,
    saveTrustbadgesAfterRemappingChannels,
  } = useStore()

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    setIsButtonDisabled(_.isEqual(initialSelectedChannels, selectedChannels))
  }, [initialSelectedChannels, selectedChannels])

  const saveChannelsInBL = () => {
    setIsLoadingSave(true)
    dispatchAction({
      action: EVENTS.SAVE_MAPPED_CHANNEL,
      payload: selectedChannels,
    })

    setShowChannelModal(false)
    selectedChannels.forEach(channel => {
      if (
        initialSelectedChannels.some(
          item =>
            item.eTrustedChannelRef === channel.eTrustedChannelRef &&
            item.salesChannelRef === channel.salesChannelRef
        )
      ) {
        return
      }
      saveTrustbadgesAfterRemappingChannels(channel)
    })
  }

  const onDisconnect = () => {
    setIsDisconnectLoading(true)
    dispatchAction({ action: EVENTS.DISCONNECTED, payload: null })
  }

  return (
    <div className="ts-w-full ts-bg-white ts-p-8 ts-shadow-md ts-rounded-b">
      {(isLoadingSave || isDisconnectLoading) && <ScrinSpinner />}
      <div className="ts-w-full ts-flex ts-gap-8">
        <div className="ts-min-w-20 ts-h-20">
          <img className="ts-w-20 ts-h-20" src={tabIcon} alt="tab-icon" />
        </div>

        <div className="ts-w-[calc(100%-112px)]">
          <p className="ts-text-default ts-text-md ts-font-bold ts-mb-4">
            {phrasesByKey.application_settings_title}
          </p>
          <p className="ts-text-default ts-text-sm ts-mb-6">
            {phrasesByKey.application_settings_description}
          </p>
          {shopChannels && !!shopChannels.length && (
            <>
              {Divider}
              <p className="ts-text-default ts-text-md ts-font-bold ts-mb-4">
                {phrasesByKey.application_settings_channel_title}
              </p>
              <p className="ts-text-default ts-text-sm ts-mb-6 ">
                {phrasesByKey.application_settings_channel_description}
              </p>

              <div className="ts-mb-6 ts-flex ts-flex-col ts-gap-6">
                <ChannelSelectionForm phrasesByKey={phrasesByKey} />

                <div className="ts-flex ts-items-start">
                  <img className=" ts-mr-[5px]" src={warnIconOrange} alt="warn-icon" />
                  <TextWithLink
                    id={'use_orderstatus'}
                    url={''}
                    text={phrasesByKey.application_settings_channel_caution}
                    textStyle="ts-text-default ts-text-sm ts-italic"
                  />
                </div>

                <div className="ts-flex ts-justify-end">
                  <Button
                    id={'settingsSaveChannels'}
                    label={phrasesByKey.global_button_submit}
                    theme={ButtonThemes.Primary}
                    onClick={saveChannelsInBL}
                    disabled={isButtonDisabled}
                  />
                </div>
              </div>
            </>
          )}

          {Divider}

          <div className="ts-flex ts-flex-col">
            <p className="ts-text-default ts-text-md ts-font-bold ts-mb-4">
              {phrasesByKey.application_settings_disconnect_title}
            </p>

            <div className="ts-flex ts-justify-between ts-mb-4">
              <div className="ts-flex ts-items-center">
                <img className="ts-mr-2" src={warnIcon} alt="warn-icon" />
                <p className="ts-text-default ts-text-sm">
                  {phrasesByKey.application_settings_disconnect_description}
                </p>
              </div>
              <div>
                <Button
                  id={'settingsDisconnectOpenModal'}
                  label={phrasesByKey.application_settings_disconnect_button}
                  theme={ButtonThemes.Warning}
                  onClick={() => setShowModal(true)}
                />
              </div>
            </div>

            <TextWithLink
              id={'disconnect_help'}
              url={phrasesByKey.application_settings_disconnect_help_url_1}
              text={phrasesByKey.application_settings_disconnect_help_text}
              textStyle="ts-text-default ts-text-sm"
            />
          </div>
        </div>
      </div>
      <ApproveDisconnectModal
        phrasesByKey={phrasesByKey}
        showModal={showModal}
        handleCancel={setShowModal}
        onDisconnect={onDisconnect}
      />
    </div>
  )
}

export default SettingsTab
