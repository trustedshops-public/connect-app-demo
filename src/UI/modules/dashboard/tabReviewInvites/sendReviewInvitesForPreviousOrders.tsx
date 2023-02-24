import { h } from 'preact'
import { FC } from 'preact/compat'

import { TabInfoBox } from '@/components/layouts/infoBox'
import TextWithLink from '@/components/layouts/textWithLink'
import exportIcon from '@/assets/invites-tab-export-icon.svg'
import { DASHBOADR_KEYS } from '@/locales/types'
import { IMappedChannel } from '@/baseLayers/types'
import Button, { ButtonThemes } from '@/components/controls/buttun'
import NumberInput from '@/components/controls/numberInput'

interface Props {
  phrasesByKey: DASHBOADR_KEYS
  numberOfDays: number
  changeNumberOfDays: (v: number) => void
  onExport: (v: string, salesChannelRef: string) => void
  selectedShopChannels: IMappedChannel
}

const SendReviewInvitesForPreviousOrders: FC<Props> = ({
  phrasesByKey,
  selectedShopChannels,
  numberOfDays,
  changeNumberOfDays,
  onExport,
}) => {
  return (
    <div className="ts-p-8 ts-mb-4 ts-w-full ts-flex ts-flex-col ts-items-end ts-bg-white ts-shadow-md ts-rounded">
      <div className="ts-w-full ts-flex ts-gap-8">
        <div className="ts-min-w-20 ts-h-20">
          <img className="ts-w-20 ts-h-20" src={exportIcon} alt="tab-icon" />
        </div>

        <div className="ts-w-[calc(100%-112px)]">
          <p className="ts-text-default ts-text-md ts-font-bold ts-mb-4">
            {phrasesByKey.application_invites_send_export_title}
          </p>

          <p className="ts-text-default ts-text-sm ts-mb-4 ts-whitespace-pre-wrap">
            {phrasesByKey.application_invites_send_export_description}
          </p>

          <p className="ts-text-default ts-text-sm ts-font-bold ts-mb-4">
            {phrasesByKey.application_invites_send_export_step_1_title}
          </p>

          <div className="ts-flex ts-justify-between ts-mb-5">
            <div className="ts-flex ts-items-center">
              <p className="ts-text-default ts-text-sm ts-mr-2">
                {phrasesByKey.application_invites_send_export_step_1_option}
              </p>

              <div className="ts-w-14">
                <NumberInput
                  id={'numberOfDays'}
                  disabled={!selectedShopChannels.eTrustedChannelRef}
                  min={0}
                  max={90}
                  value={numberOfDays}
                  onChange={value => changeNumberOfDays(+value)}
                />
              </div>
            </div>

            <Button
              id={'exportCSV'}
              label={phrasesByKey.application_invites_send_export_button}
              theme={ButtonThemes.Primary}
              onClick={() =>
                onExport(
                  selectedShopChannels?.eTrustedChannelRef,
                  selectedShopChannels.salesChannelRef
                )
              }
              disabled={!selectedShopChannels.eTrustedChannelRef}
            />
          </div>

          <div className="ts-flex ts-flex-col ts-mb-5">
            <p className="ts-text-default ts-text-sm ts-font-bold ts-mb-4">
              {phrasesByKey.application_invites_send_export_step_2_title}
            </p>

            <TextWithLink
              id={'send_export_description'}
              url={[
                phrasesByKey.application_invites_send_export_step_2_description_url_1,
                phrasesByKey.application_invites_send_export_step_2_description_url_2,
              ]}
              text={phrasesByKey.application_invites_send_export_step_2_description_text}
              textStyle="ts-text-default ts-text-sm"
            />
          </div>
        </div>
      </div>

      <div className="ts-w-[calc(100%-112px)]">
        <TabInfoBox>
          <TextWithLink
            id={'send_export_help'}
            url={phrasesByKey.application_invites_send_export_help_url_1}
            text={phrasesByKey.application_invites_send_export_help_text}
            textStyle="ts-text-default ts-text-sm"
          />
        </TabInfoBox>
      </div>
    </div>
  )
}

export default SendReviewInvitesForPreviousOrders
