import { h, Fragment } from 'preact'
import { FC, useEffect, useState } from 'preact/compat'

import { TabInfoBox } from '@/components/layouts/infoBox'
import TextWithLink, { TextWithBold } from '@/components/layouts/textWithLink'
import timeIcon from '@/assets/invites-tab-time-icon.svg'
import { DASHBOADR_KEYS } from '@/locales/types'
import { IMappedChannel } from '@/baseLayers/types'
import Button, { ButtonThemes } from '@/components/controls/buttun'
import { Radio } from '@/components/controls/radio'
import useStore from '@/store/useStore'
import { selectorInfoOfSystem } from '@/store/selector'
import _ from 'lodash'
import warnIcon from '@/assets/warning-sign.svg'
interface Props {
  phrasesByKey: DASHBOADR_KEYS
  saveChanges: () => void
  changeUseTimeOfSendReviewInvites: (v: {
    isEstimatedDeliveryDate: boolean
    isEventsByOrderStatusShipped: boolean
  }) => void
  selectedShopChannels: IMappedChannel
  typesReviewInvites: {
    isEstimatedDeliveryDate: boolean
    isEventsByOrderStatusShipped: boolean
  }
  initialDateToSendReviewInvites: {
    isEstimatedDeliveryDate: boolean
    isEventsByOrderStatusShipped: boolean
  }
  isMappedTypesErorr: boolean
}

const SendReviewInvitesRightTime: FC<Props> = ({
  phrasesByKey,
  saveChanges,
  changeUseTimeOfSendReviewInvites,
  selectedShopChannels,
  initialDateToSendReviewInvites,
  typesReviewInvites,
  isMappedTypesErorr,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { infoOfSystem } = useStore(selectorInfoOfSystem)

  useEffect(() => {
    setIsButtonDisabled(_.isEqual(typesReviewInvites, initialDateToSendReviewInvites))
  }, [typesReviewInvites, initialDateToSendReviewInvites])

  return (
    <div className="ts-p-8 ts-mb-8 ts-w-full ts-flex ts-flex-col ts-items-end ts-bg-white ts-shadow-md ts-rounded">
      <div className="ts-w-full ts-flex ts-gap-8">
        <div className="ts-min-w-20 ts-h-20">
          <img className="ts-w-20 ts-h-20" src={timeIcon} alt="tab-icon" />
        </div>

        <div className="ts-w-[calc(100%-112px)]">
          <p className="ts-text-default ts-text-md ts-font-bold ts-mb-4">
            {phrasesByKey.application_invites_send_title}
          </p>

          <p className="ts-text-default ts-text-sm ts-mb-4 ts-whitespace-pre-wrap">
            {phrasesByKey.application_invites_send_descriptionIntro.replace(
              '[%s]shopsystem[%s]',
              infoOfSystem.nameOfSystem
            )}
          </p>

          <div className="ts-flex ts-flex-col ts-mb-5">
            <Radio
              id="use_standard"
              value={
                !typesReviewInvites.isEstimatedDeliveryDate &&
                !typesReviewInvites.isEventsByOrderStatusShipped
                  ? 'use_standard'
                  : ''
              }
              onClick={() =>
                changeUseTimeOfSendReviewInvites({
                  isEstimatedDeliveryDate: false,
                  isEventsByOrderStatusShipped: false,
                })
              }
              disabled={!selectedShopChannels.eTrustedChannelRef}
            >
              <div id="use_standard_text_block">
                <p
                  id="use_standard_text"
                  className="ts-text-default ts-text-sm ts-whitespace-pre-wrap"
                >
                  <TextWithBold
                    text={phrasesByKey.application_invites_send_radioButton_standard_text}
                  />
                </p>
              </div>
            </Radio>
            <TextWithLink
              id={'use_send'}
              url={phrasesByKey.application_invites_send_radioButton_use_note_url_1}
              text={phrasesByKey.application_invites_send_radioButton_standard_note_text}
              textStyle="ts-mt-1 ts-tracking-tight ts-ml-6 ts-mb-4 ts-text-default ts-text-sm ts-italic"
            />

            {infoOfSystem.allowsEstimatedDeliveryDate && (
              <>
                <Radio
                  id="use_deliverydate"
                  value={typesReviewInvites.isEstimatedDeliveryDate ? 'use_deliverydate' : ''}
                  onClick={() =>
                    changeUseTimeOfSendReviewInvites({
                      isEstimatedDeliveryDate: true,
                      isEventsByOrderStatusShipped: false,
                    })
                  }
                  disabled={!selectedShopChannels.eTrustedChannelRef}
                >
                  <div id="use_deliverydate_text_block">
                    <p id="use_deliverydate_text" className="ts-text-default ts-text-sm ">
                      <TextWithBold
                        text={phrasesByKey.application_invites_send_radioButton_deliverydate_text}
                      />
                    </p>
                  </div>
                </Radio>
                <TextWithLink
                  id={'use_send'}
                  url={phrasesByKey.application_invites_send_radioButton_use_note_url_1}
                  text={phrasesByKey.application_invites_send_radioButton_deliverydate_note_text}
                  textStyle="ts-mt-1 ts-tracking-tight ts-ml-6 ts-mb-4 ts-text-default ts-text-sm ts-italic"
                />
              </>
            )}

            {infoOfSystem.allowsEventsByOrderStatus && (
              <>
                <Radio
                  id="use_orderstatus"
                  value={typesReviewInvites.isEventsByOrderStatusShipped ? 'use_orderstatus' : ''}
                  onClick={() =>
                    changeUseTimeOfSendReviewInvites({
                      isEstimatedDeliveryDate: false,
                      isEventsByOrderStatusShipped: true,
                    })
                  }
                  disabled={!selectedShopChannels.eTrustedChannelRef}
                >
                  <div id="use_orderstatus_text_block">
                    <p id="use_orderstatus_text" className="ts-text-default ts-text-sm ">
                      <TextWithBold
                        text={phrasesByKey.application_invites_send_radioButton_orderstatus_text}
                      />
                    </p>
                  </div>
                </Radio>
                <TextWithLink
                  id={'use_orderstatus_note'}
                  url={phrasesByKey.application_invites_send_radioButton_use_note_url_1}
                  text={phrasesByKey.application_invites_send_radioButton_orderstatus_note_text}
                  textStyle="ts-mt-1 ts-tracking-tight ts-ml-6 ts-text-default ts-text-sm ts-italic"
                />
                {isMappedTypesErorr && (
                  <TextWithLink
                    id={'orderstatus_note_check_text'}
                    url={phrasesByKey.application_invites_send_help_url_1}
                    text={
                      // eslint-disable-next-line max-len
                      phrasesByKey.application_invites_send_radioButton_orderstatus_note_check_text
                    }
                    textStyle="ts-ml-6 ts-tracking-tight ts-text-default ts-text-sm ts-italic ts-text-error"
                  />
                )}
                <div className="ts-ml-6 ts-mt-4 ts-flex ts-items-start">
                  <img className="ts-mr-1" src={warnIcon} alt="warn-icon" />
                  <TextWithLink
                    id={'use_orderstatus'}
                    url={[
                      phrasesByKey.application_invites_send_radioButton_orderstatus_warning_url_1,
                      phrasesByKey.application_invites_send_radioButton_orderstatus_warning_url_2,
                    ]}
                    text={
                      phrasesByKey.application_invites_send_radioButton_orderstatus_warning_text
                    }
                    textStyle="ts-text-default ts-tracking-tight ts-text-sm ts-italic"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="ts-w-[calc(100%-112px)]">
        <TabInfoBox>
          <TextWithLink
            id={'send_help'}
            url={phrasesByKey.application_invites_send_help_url_1}
            text={phrasesByKey.application_invites_send_help_text}
            textStyle="ts-text-default ts-text-sm"
          />
        </TabInfoBox>
      </div>
      <div className="ts-w-full ts-mt-5 ts-flex ts-justify-end">
        <Button
          id={'saveReviewInvites'}
          label={phrasesByKey.global_button_submit}
          theme={ButtonThemes.Primary}
          onClick={saveChanges}
          disabled={!selectedShopChannels.eTrustedChannelRef || isButtonDisabled}
        />
      </div>
    </div>
  )
}

export default SendReviewInvitesRightTime
