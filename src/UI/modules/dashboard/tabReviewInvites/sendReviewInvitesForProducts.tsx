import { h } from 'preact'
import { FC } from 'preact/compat'
import Switch from '@/components/controls/switch'
import { TabInfoBox } from '@/components/layouts/infoBox'
import TextWithLink from '@/components/layouts/textWithLink'
import productsIcon from '@/assets/invites-tab-products-icon.svg'
import { DASHBOADR_KEYS } from '@/locales/types'
import { IMappedChannel } from '@/baseLayers/types'

interface Props {
  phrasesByKey: DASHBOADR_KEYS
  isToggle: boolean
  handleToggle: () => void
  selectedShopChannels: IMappedChannel
}

const SendReviewInvitesForProducts: FC<Props> = ({
  phrasesByKey,
  isToggle,
  handleToggle,
  selectedShopChannels,
}) => {
  return (
    <div className="ts-p-8 ts-mb-8 ts-w-full ts-flex ts-flex-col ts-items-end ts-bg-white ts-shadow-md ts-rounded-b">
      <div className="ts-w-full ts-flex ts-gap-8">
        <div className="ts-min-w-20 ts-h-20">
          <img className="ts-w-20 ts-h-20" src={productsIcon} alt="tab-icon" />
        </div>

        <div className="ts-w-[calc(100%-112px)]">
          <div className="ts-flex ts-items-start ts-justify-between">
            <p className="ts-text-default ts-text-md ts-font-bold ts-mb-4">
              {phrasesByKey.application_invites_product_title}
            </p>

            <Switch
              id={'reviewInvites'}
              disabled={!selectedShopChannels.eTrustedChannelRef}
              isToggle={isToggle}
              setIsToggle={handleToggle}
              labelOn={phrasesByKey.global_slider_active}
              labelOff={phrasesByKey.global_slider_inactive}
            />
          </div>

          <TextWithLink
            id={'product_description'}
            url={phrasesByKey.application_invites_product_description_url_1}
            text={phrasesByKey.application_invites_product_description_text}
            textStyle="ts-text-default ts-text-sm ts-mb-4"
          />
        </div>
      </div>
      <div className="ts-w-[calc(100%-112px)]">
        <TabInfoBox>
          <TextWithLink
            id={'product_help'}
            url={phrasesByKey.application_invites_product_help_url_1}
            text={phrasesByKey.application_invites_product_help_text}
            textStyle="ts-text-default ts-text-sm"
          />
        </TabInfoBox>
      </div>
    </div>
  )
}

export default SendReviewInvitesForProducts
